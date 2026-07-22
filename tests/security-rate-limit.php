<?php
declare(strict_types=1);

$handler = realpath(__DIR__ . '/../send.php');
if ($handler === false) {
    fwrite(STDERR, "send.php was not found.\n");
    exit(1);
}

function test_fail(string $message): never {
    fwrite(STDERR, "FAIL: {$message}\n");
    exit(1);
}

function test_assert(bool $condition, string $message): void {
    if (!$condition) test_fail($message);
}

function test_throws(callable $operation, string $message): void {
    try {
        $operation();
    } catch (RuntimeException $e) {
        return;
    }
    test_fail($message);
}

function test_directory(string $label): string {
    return rtrim(sys_get_temp_dir(), '/') . '/z2o-rate-test-' . $label . '-' . bin2hex(random_bytes(6));
}

function cleanup_directory(string $directory): void {
    $prefix = rtrim(sys_get_temp_dir(), '/') . '/z2o-rate-test-';
    if (strpos($directory, $prefix) !== 0) test_fail('refused unsafe test cleanup path');
    if (is_link($directory)) {
        @unlink($directory);
        return;
    }
    if (!is_dir($directory)) return;
    $entries = scandir($directory);
    if (!is_array($entries)) test_fail('could not list test state directory');
    foreach ($entries as $entry) {
        if ($entry === '.' || $entry === '..') continue;
        $path = $directory . '/' . $entry;
        if (is_dir($path) && !is_link($path)) test_fail('unexpected nested test directory');
        @unlink($path);
    }
    @rmdir($directory);
}

if (($argv[1] ?? '') === '--worker') {
    if (count($argv) !== 9) test_fail('worker arguments are invalid');
    define('Z2O_LIBRARY_ONLY', true);
    require $handler;
    $deadline = microtime(true) + 10;
    while (!is_file($argv[8])) {
        if (microtime(true) >= $deadline) test_fail('worker start barrier timed out');
        usleep(1000);
    }
    $result = rate_limit_admit(
        $argv[2],
        'security-test@example.test',
        $argv[3],
        (int) $argv[4],
        (int) $argv[5],
        [
            ['seconds' => 60, 'limit' => (int) $argv[6]],
            ['seconds' => 3600, 'limit' => (int) $argv[7]],
        ]
    );
    echo json_encode($result, JSON_THROW_ON_ERROR);
    exit(0);
}

define('Z2O_LIBRARY_ONLY', true);
require $handler;

/** @return array<int,array{allowed:bool,retryAfter:int,scope:string}> */
function run_workers(string $directory, array $ips, int $now, int $ipCooldown, int $minuteLimit, int $hourLimit): array {
    if (!function_exists('proc_open')) test_fail('proc_open is required for the concurrency regression');
    $barrier = test_directory('worker-barrier') . '.signal';
    $processes = [];
    foreach ($ips as $ip) {
        $pipes = [];
        $process = proc_open(
            [PHP_BINARY, __FILE__, '--worker', $ip, $directory, (string) $now, (string) $ipCooldown, (string) $minuteLimit, (string) $hourLimit, $barrier],
            [0 => ['pipe', 'r'], 1 => ['pipe', 'w'], 2 => ['pipe', 'w']],
            $pipes
        );
        if (!is_resource($process)) test_fail('could not start a rate-limit worker');
        fclose($pipes[0]);
        $processes[] = [$process, $pipes[1], $pipes[2]];
    }
    if (file_put_contents($barrier, 'start', LOCK_EX) === false) test_fail('could not release worker start barrier');

    $results = [];
    foreach ($processes as [$process, $stdout, $stderr]) {
        $output = stream_get_contents($stdout);
        $error = stream_get_contents($stderr);
        fclose($stdout);
        fclose($stderr);
        $status = proc_close($process);
        if ($status !== 0) test_fail('worker failed: ' . trim((string) $error));
        try {
            $decoded = json_decode((string) $output, true, 8, JSON_THROW_ON_ERROR);
        } catch (Throwable $e) {
            test_fail('worker returned invalid JSON');
        }
        if (!is_array($decoded) || !isset($decoded['allowed'])) test_fail('worker result schema is invalid');
        $results[] = $decoded;
    }
    @unlink($barrier);
    return $results;
}

$created = [];
try {
    test_assert(valid_utf8("مرحبا") && !valid_utf8("\xFF"), 'UTF-8 validation must work without relying on mbstring');
    test_assert(mb_len("أحمد") === 4, 'Unicode length fallback must count characters, not bytes');

    $basic = test_directory('basic');
    $created[] = $basic;
    $wideWindows = [['seconds' => 60, 'limit' => 100], ['seconds' => 3600, 'limit' => 100]];
    $first = rate_limit_admit('203.0.113.10', 'security-test@example.test', $basic, 1000, 30, $wideWindows);
    test_assert($first['allowed'] === true, 'first legitimate submission must be admitted');
    $stateBeforeIpDenial = file_get_contents($basic . '/state.json');
    $duplicate = rate_limit_admit('203.0.113.10', 'security-test@example.test', $basic, 1000, 30, $wideWindows);
    test_assert($duplicate['allowed'] === false && $duplicate['scope'] === 'ip', 'same-IP pre-mail reservation must block a duplicate');
    test_assert($duplicate['retryAfter'] === 30, 'same-IP retry interval must be exact');
    test_assert(file_get_contents($basic . '/state.json') === $stateBeforeIpDenial, 'an IP denial must not mutate rate state');
    $beforeBoundary = rate_limit_admit('203.0.113.10', 'security-test@example.test', $basic, 1029, 30, $wideWindows);
    test_assert($beforeBoundary['allowed'] === false && $beforeBoundary['retryAfter'] === 1, 'IP cooldown must block at t+29 with Retry-After 1');
    $afterCooldown = rate_limit_admit('203.0.113.10', 'security-test@example.test', $basic, 1030, 30, $wideWindows);
    test_assert($afterCooldown['allowed'] === true, 'legitimate submission must recover after the cooldown');

    $state = file_get_contents($basic . '/state.json');
    test_assert(is_string($state) && strpos($state, '203.0.113.10') === false, 'raw client IP must never be persisted');
    test_assert(strpos((string) $state, hash('sha256', '203.0.113.10')) === false, 'IP fingerprint must be keyed, not a guessable plain hash');
    test_assert((fileperms($basic) & 0777) === 0700, 'state directory must be mode 0700');
    test_assert((fileperms($basic . '/state.json') & 0777) === 0600, 'state file must be mode 0600');
    test_assert((fileperms($basic . '/state.lock') & 0777) === 0600, 'lock file must be mode 0600');
    test_assert((fileperms($basic . '/ip-key.bin') & 0777) === 0600, 'IP fingerprint key must be mode 0600');
    test_assert(filesize($basic . '/ip-key.bin') === 32, 'IP fingerprint key must have full entropy');

    $windowBoundary = test_directory('window-boundary');
    $created[] = $windowBoundary;
    $overlappingWindows = [
        ['seconds' => 60, 'limit' => 2],
        ['seconds' => 3600, 'limit' => 3],
        ['seconds' => 86400, 'limit' => 100],
    ];
    test_assert(rate_limit_admit('192.0.2.1', 'security-test@example.test', $windowBoundary, 100, 1, $overlappingWindows)['allowed'], 'first boundary attempt must pass');
    test_assert(rate_limit_admit('192.0.2.2', 'security-test@example.test', $windowBoundary, 101, 1, $overlappingWindows)['allowed'], 'second boundary attempt must pass');
    $stateBeforeGlobalDenial = file_get_contents($windowBoundary . '/state.json');
    $at59 = rate_limit_admit('192.0.2.3', 'security-test@example.test', $windowBoundary, 159, 1, $overlappingWindows);
    test_assert(!$at59['allowed'] && $at59['scope'] === 'global' && $at59['retryAfter'] === 1, 'minute window must block at t+59 with Retry-After 1');
    test_assert(file_get_contents($windowBoundary . '/state.json') === $stateBeforeGlobalDenial, 'a global denial must not mutate rate state');
    test_assert(rate_limit_admit('192.0.2.3', 'security-test@example.test', $windowBoundary, 160, 1, $overlappingWindows)['allowed'], 'minute window must reopen exactly at t+60');
    $hourBlocked = rate_limit_admit('192.0.2.4', 'security-test@example.test', $windowBoundary, 161, 1, $overlappingWindows);
    test_assert(!$hourBlocked['allowed'] && $hourBlocked['scope'] === 'global' && $hourBlocked['retryAfter'] === 3539, 'hour window must override the shorter open window with an exact retry');

    $dayBoundary = test_directory('day-boundary');
    $created[] = $dayBoundary;
    $dayWindow = [['seconds' => 86400, 'limit' => 1]];
    test_assert(rate_limit_admit('198.51.100.1', 'security-test@example.test', $dayBoundary, 10, 1, $dayWindow)['allowed'], 'first daily attempt must pass');
    $dayBlocked = rate_limit_admit('198.51.100.2', 'security-test@example.test', $dayBoundary, 86409, 1, $dayWindow);
    test_assert(!$dayBlocked['allowed'] && $dayBlocked['retryAfter'] === 1, 'daily window must block one second before expiry');
    test_assert(rate_limit_admit('198.51.100.2', 'security-test@example.test', $dayBoundary, 86410, 1, $dayWindow)['allowed'], 'daily window must reopen exactly at expiry');

    $pruning = test_directory('pruning');
    $created[] = $pruning;
    $pruneWindows = [['seconds' => 60, 'limit' => 100], ['seconds' => 120, 'limit' => 100]];
    rate_limit_admit('203.0.113.20', 'security-test@example.test', $pruning, 1000, 30, $pruneWindows);
    rate_limit_admit('203.0.113.21', 'security-test@example.test', $pruning, 1001, 30, $pruneWindows);
    rate_limit_admit('203.0.113.22', 'security-test@example.test', $pruning, 1121, 30, $pruneWindows);
    $prunedState = json_decode((string) file_get_contents($pruning . '/state.json'), true, 16, JSON_THROW_ON_ERROR);
    test_assert($prunedState['attempts'] === [1121], 'expired aggregate attempts must be pruned on the next admission');
    test_assert(count($prunedState['ips']) === 1, 'expired IP fingerprints must be pruned on the next admission');

    $sameIp = test_directory('same-ip-workers');
    $created[] = $sameIp;
    $sameResults = run_workers($sameIp, array_fill(0, 12, '198.51.100.7'), 2000, 30, 100, 100);
    $sameAllowed = count(array_filter($sameResults, static fn(array $result): bool => $result['allowed'] === true));
    test_assert($sameAllowed === 1, 'concurrent same-IP workers must admit exactly one attempt');

    $global = test_directory('global-workers');
    $created[] = $global;
    $distinctIps = [];
    for ($i = 1; $i <= 12; $i++) $distinctIps[] = '192.0.2.' . $i;
    $globalResults = run_workers($global, $distinctIps, 3000, 30, 3, 100);
    $globalAllowed = count(array_filter($globalResults, static fn(array $result): bool => $result['allowed'] === true));
    test_assert($globalAllowed === 3, 'global window must cap distinct-IP workers atomically');
    $globalBlocked = array_filter($globalResults, static fn(array $result): bool => $result['allowed'] === false && $result['scope'] === 'global');
    test_assert(count($globalBlocked) === 9, 'every excess distinct-IP worker must receive a global denial');

    $corrupt = test_directory('corrupt');
    $created[] = $corrupt;
    rate_limit_admit('203.0.113.1', 'security-test@example.test', $corrupt, 4000, 30, $wideWindows);
    file_put_contents($corrupt . '/state.json', '{broken-json');
    test_throws(
        static fn() => rate_limit_admit('203.0.113.2', 'security-test@example.test', $corrupt, 4031, 30, $wideWindows),
        'corrupt state must fail closed instead of resetting the quota'
    );

    $wrongSchema = test_directory('wrong-schema');
    $created[] = $wrongSchema;
    rate_limit_admit('203.0.113.30', 'security-test@example.test', $wrongSchema, 6000, 30, $wideWindows);
    file_put_contents($wrongSchema . '/state.json', '{"version":999,"namespace":"bad","attempts":[],"ips":[]}');
    chmod($wrongSchema . '/state.json', 0600);
    test_throws(
        static fn() => rate_limit_admit('203.0.113.31', 'security-test@example.test', $wrongSchema, 6031, 30, $wideWindows),
        'wrong state schema must fail closed'
    );

    $oversized = test_directory('oversized');
    $created[] = $oversized;
    rate_limit_admit('203.0.113.32', 'security-test@example.test', $oversized, 7000, 30, $wideWindows);
    file_put_contents($oversized . '/state.json', str_repeat('x', Z2O_RATE_STATE_MAX_BYTES + 1));
    chmod($oversized . '/state.json', 0600);
    test_throws(
        static fn() => rate_limit_admit('203.0.113.33', 'security-test@example.test', $oversized, 7031, 30, $wideWindows),
        'oversized state must fail closed'
    );

    $broadState = test_directory('broad-state');
    $created[] = $broadState;
    rate_limit_admit('203.0.113.34', 'security-test@example.test', $broadState, 8000, 30, $wideWindows);
    chmod($broadState . '/state.json', 0644);
    test_throws(
        static fn() => rate_limit_admit('203.0.113.35', 'security-test@example.test', $broadState, 8031, 30, $wideWindows),
        'state with broad permissions must fail closed'
    );

    $broadDirectory = test_directory('broad-directory');
    $created[] = $broadDirectory;
    mkdir($broadDirectory, 0755, true);
    chmod($broadDirectory, 0755);
    test_throws(
        static fn() => rate_limit_admit('203.0.113.36', 'security-test@example.test', $broadDirectory, 9000, 30, $wideWindows),
        'an existing broad directory must be rejected'
    );
    clearstatcache(true, $broadDirectory);
    test_assert((fileperms($broadDirectory) & 0777) === 0755, 'the limiter must not chmod a pre-existing shared directory');

    $insideWebroot = dirname($handler) . '/tests/z2o-rate-state-must-not-exist';
    test_throws(
        static fn() => rate_limit_admit('203.0.113.37', 'security-test@example.test', $insideWebroot, 10000, 30, $wideWindows),
        'state inside the application document root must be rejected'
    );
    test_assert(!file_exists($insideWebroot), 'rejected public state path must not be created');

    if (function_exists('symlink')) {
        $target = test_directory('symlink-target');
        $link = test_directory('symlink-link');
        $created[] = $target;
        $created[] = $link;
        mkdir($target, 0700, true);
        if (@symlink($target, $link)) {
            $rejected = false;
            try {
                rate_limit_admit('203.0.113.3', 'security-test@example.test', $link, 5000, 30, $wideWindows);
            } catch (RuntimeException $e) {
                $rejected = true;
            }
            test_assert($rejected, 'symlink state directory must be rejected');
        }

        $stateLink = test_directory('state-link');
        $created[] = $stateLink;
        rate_limit_admit('203.0.113.40', 'security-test@example.test', $stateLink, 11000, 30, $wideWindows);
        @unlink($stateLink . '/state.json');
        if (@symlink('/dev/null', $stateLink . '/state.json')) {
            test_throws(
                static fn() => rate_limit_admit('203.0.113.41', 'security-test@example.test', $stateLink, 11031, 30, $wideWindows),
                'symlink state file must fail closed'
            );
        }

        $keyLink = test_directory('key-link');
        $created[] = $keyLink;
        rate_limit_admit('203.0.113.42', 'security-test@example.test', $keyLink, 12000, 30, $wideWindows);
        @unlink($keyLink . '/ip-key.bin');
        if (@symlink('/dev/null', $keyLink . '/ip-key.bin')) {
            test_throws(
                static fn() => rate_limit_admit('203.0.113.43', 'security-test@example.test', $keyLink, 12031, 30, $wideWindows),
                'symlink fingerprint key must fail closed'
            );
        }

        $lockLink = test_directory('lock-link');
        $created[] = $lockLink;
        mkdir($lockLink, 0700, true);
        if (@symlink('/dev/null', $lockLink . '/state.lock')) {
            test_throws(
                static fn() => rate_limit_admit('203.0.113.44', 'security-test@example.test', $lockLink, 13000, 30, $wideWindows),
                'symlink lock file must fail closed'
            );
        }
    }

    echo "PASS: synchronized atomic admission, exact IP/minute/hour/day boundaries, immutable denials, pruning, private state, and fail-closed corruption handling.\n";
} finally {
    foreach (array_reverse($created) as $directory) cleanup_directory($directory);
}
