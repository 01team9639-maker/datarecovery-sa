<?php
/**
 * send.php — contact-form handler (plain PHP mail(), Hostinger-friendly).
 *
 * ⚠️  GENERATED FILE — produced by build/generate.js from the very same data
 *     that renders the form, so the whitelists can never drift out of sync.
 *     Edit build/site.js (contact.*) and re-run: node build/generate.js
 */
declare(strict_types=1);

/* ----------------------------- configuration ----------------------------- */
$TO_EMAIL     = 'info@datarecovery-sa.com';
$FROM_EMAIL   = 'noreply@datarecovery-sa.com';
$FROM_NAME    = 'Zero 2 One Data Recovery';
$ALLOWED_ORIGINS = ['https://datarecovery-sa.com', 'https://www.datarecovery-sa.com'];
$IP_COOLDOWN_SECONDS = 30;   // one admitted valid attempt per observed IP
$MAIL_RATE_WINDOWS = [       // fixed-recipient aggregate attempt budgets
    ['seconds' => 60,    'limit' => 5],
    ['seconds' => 3600,  'limit' => 30],
    ['seconds' => 86400, 'limit' => 100],
];
$MAX_POST = 65536;           // hard cap on request body size
const Z2O_RATE_STATE_VERSION = 1;
const Z2O_RATE_STATE_MAX_BYTES = 65536;

/* Allowed values = exactly the <option> / radio values rendered in the form,
   for BOTH the Arabic and English pages. */
$ALLOWED = [
    'urgency' => ['عادي', 'مستعجل', 'طارئ', 'Normal', 'Urgent', 'Emergency'],
    'device'  => ['هارد ديسك (HDD)', 'SSD / NVMe', 'RAID أو سيرفر', 'كاميرات مراقبة (DVR/NVR)', 'بطاقة ذاكرة أو فلاش', 'هاتف جوال', 'أخرى', 'Hard drive (HDD)', 'RAID or server', 'CCTV recorder (DVR/NVR)', 'Memory card or flash drive', 'Mobile phone', 'Other'],
    'issue'   => ['الجهاز لا يظهر', 'حذف ملفات أو فورمات', 'صوت غريب أو سقوط', 'هجوم فدية أو تشفير', 'تلف منطقي أو نظام ملفات', 'أخرى', 'Device not detected', 'Deleted files or format', 'Strange noise or a drop', 'Ransomware or encryption', 'Logical or file-system damage', 'Other'],
    'tried'   => ['نعم', 'لا', 'Yes', 'No'],
];
$EMERGENCY = ['طارئ', 'Emergency'];   // urgency values that flag the mail as urgent

/* ------------------------------- plumbing -------------------------------- */
header_remove('X-Powered-By');
header('Content-Type: application/json; charset=UTF-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');
header('Referrer-Policy: no-referrer');
header('X-Frame-Options: DENY');
header('X-XSS-Protection: 0');
header('Cross-Origin-Opener-Policy: same-origin');
header('Cross-Origin-Resource-Policy: same-origin');
header('Origin-Agent-Cluster: ?1');
header('X-Permitted-Cross-Domain-Policies: none');
header('Permissions-Policy: accelerometer=(), autoplay=(), camera=(), display-capture=(), document-domain=(), encrypted-media=(), fullscreen=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), midi=(), payment=(), picture-in-picture=(), publickey-credentials-get=(), screen-wake-lock=(), sync-xhr=(), usb=(), xr-spatial-tracking=()');
header("Content-Security-Policy: default-src 'none'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'; object-src 'none'");

$LANG = 'ar';

function msg(string $ar, string $en): string {
    global $LANG;
    return $LANG === 'en' ? $en : $ar;
}

/** A JS-disabled browser navigates to send.php directly; give it HTML, not JSON.
 *  Our fetch() sends "application/json"; a plain form navigation sends text/html. */
function client_prefers_html(): bool {
    $accept = strtolower((string) ($_SERVER['HTTP_ACCEPT'] ?? ''));
    return strpos($accept, 'text/html') !== false && strpos($accept, 'application/json') === false;
}

function respond(bool $ok, string $message, int $status = 200): void {
    global $LANG;
    http_response_code($status);
    if (client_prefers_html()) {
        header('Content-Type: text/html; charset=UTF-8');
        header("Content-Security-Policy: default-src 'none'; base-uri 'none'; style-src 'self'; font-src 'self'; img-src 'self' data:; form-action 'none'; frame-ancestors 'none'");
        $dir  = $LANG === 'en' ? 'ltr' : 'rtl';
        $home = $LANG === 'en' ? '/en/' : '/';   // Arabic is served from the site root
        $head = $ok ? ($LANG === 'en' ? 'Thank you' : 'شكراً لك')
                    : ($LANG === 'en' ? 'Something went wrong' : 'حدث خطأ');
        $back = $LANG === 'en' ? 'Back to the site' : 'العودة إلى الموقع';
        $e = static function (string $s): string { return htmlspecialchars($s, ENT_QUOTES, 'UTF-8'); };
        echo '<!DOCTYPE html><html lang="' . $e($LANG) . '" dir="' . $dir . '"><head>'
            . '<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1">'
            . '<meta name="robots" content="noindex"><title>' . $e($head) . '</title>'
            . '<link rel="stylesheet" href="/assets/css/fonts.css?v=888ddaf6">'
            . '<link rel="stylesheet" href="/assets/css/main.css?v=a6e01cff"></head>'
            . '<body class="section--dark form-fallback"><main class="container">'
            . '<h1 class="section-title">' . $e($head) . '</h1><p class="note">' . $e($message) . '</p>'
            . '<p><a class="btn btn--accent" href="' . $e($home) . '">' . $e($back) . '</a></p>'
            . '</main></body></html>';
        exit;
    }
    header('Content-Type: application/json; charset=UTF-8');
    echo json_encode(['success' => $ok, 'message' => $message], JSON_UNESCAPED_UNICODE);
    exit;
}

/** Strip anything that could forge extra mail headers. */
function no_header_injection(string $v): string {
    return trim(str_replace(["\r", "\n", "\0", '%0a', '%0d', '%0A', '%0D'], '', $v));
}

/** Drop control characters but keep newlines/tabs (used for the details box). */
function clean_text(string $v): string {
    $v = str_replace("\0", '', $v);
    $out = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', '', $v);
    return trim($out === null ? $v : $out);
}

function mb_len(string $v): int {
    if (function_exists('mb_strlen')) return mb_strlen($v, 'UTF-8');
    $count = preg_match_all('/./us', $v, $unused);
    return is_int($count) ? $count : strlen($v);
}

function valid_utf8(string $v): bool {
    return function_exists('mb_check_encoding')
        ? mb_check_encoding($v, 'UTF-8')
        : preg_match('//u', $v) === 1;
}

/** Arabic/Persian numerals -> ASCII, so phone numbers typed in Arabic work. */
function ascii_digits(string $v): string {
    $from = ['٠','١','٢','٣','٤','٥','٦','٧','٨','٩','۰','۱','۲','۳','۴','۵','۶','۷','۸','۹'];
    $to   = ['0','1','2','3','4','5','6','7','8','9','0','1','2','3','4','5','6','7','8','9'];
    return str_replace($from, $to, $v);
}

/** RFC 2047 encoded-word for non-ASCII header values (subject, display name). */
function encode_header(string $v): string {
    if (preg_match('/^[\x20-\x7E]*$/', $v) === 1) return $v;   // pure ASCII
    if (function_exists('mb_encode_mimeheader')) {
        return mb_encode_mimeheader($v, 'UTF-8', 'B', "\r\n");
    }
    return '=?UTF-8?B?' . base64_encode($v) . '?=';
}

/**
 * Display name for From/Reply-To. RFC 5322 says a display-name containing
 * specials (: @ , < > etc.) must be a quoted-string; non-ASCII must be an
 * encoded-word. Getting this wrong yields a malformed header.
 */
function encode_display_name(string $v): string {
    if ($v === '') return '';
    if (preg_match('/^[\x20-\x7E]*$/', $v) === 1) {
        return '"' . str_replace(['\\', '"'], ['\\\\', '\\"'], $v) . '"';
    }
    return encode_header($v);           // encoded-word is already header-safe
}

function normalize_origin(string $origin): ?string {
    if ($origin === '' || preg_match('/[\x00-\x20\x7F]/', $origin) === 1) return null;
    $parts = parse_url($origin);
    if (!is_array($parts) || isset($parts['user']) || isset($parts['pass'])
        || isset($parts['query']) || isset($parts['fragment'])
        || (isset($parts['path']) && $parts['path'] !== '' && $parts['path'] !== '/')) return null;
    $scheme = strtolower((string) ($parts['scheme'] ?? ''));
    $host = strtolower((string) ($parts['host'] ?? ''));
    if (($scheme !== 'https' && $scheme !== 'http') || $host === '') return null;
    $port = $parts['port'] ?? ($scheme === 'https' ? 443 : 80);
    if (!is_int($port) || $port < 1 || $port > 65535) return null;
    return $scheme . '://' . $host . ':' . $port;
}

function field(array $in, string $key): string {
    return isset($in[$key]) && is_string($in[$key]) ? $in[$key] : '';
}

/**
 * Rate-limit state lives outside the public document root. Deployments that
 * cannot write to the parent directory must set Z2O_RATE_STATE_DIR to an
 * absolute private directory shared by every PHP worker for this site.
 */
function rate_state_directory(string $recipient): string {
    $configured = getenv('Z2O_RATE_STATE_DIR');
    if (is_string($configured) && trim($configured) !== '') {
        $configured = rtrim(trim($configured), '/');
        if ($configured === '' || $configured[0] !== '/' || strpos($configured, "\0") !== false) {
            throw new RuntimeException('Invalid rate-limit state directory configuration.');
        }
        return $configured;
    }
    $namespace = substr(hash('sha256', __DIR__ . "\0" . $recipient), 0, 24);
    return dirname(__DIR__) . '/.z2o-rate-' . $namespace;
}

function rate_path_within(string $path, string $root): bool {
    $path = rtrim($path, '/');
    $root = rtrim($root, '/');
    return $path === $root || strpos($path, $root . '/') === 0;
}

/** Reject state paths inside either the application or configured document root. */
function rate_assert_private_location(string $path): void {
    $roots = [realpath(__DIR__)];
    $documentRoot = trim((string) ($_SERVER['DOCUMENT_ROOT'] ?? ''));
    if ($documentRoot !== '') $roots[] = realpath($documentRoot);
    foreach ($roots as $root) {
        if (is_string($root) && $root !== '' && rate_path_within($path, $root)) {
            throw new RuntimeException('Rate-limit state directory must be outside the public document root.');
        }
    }
}

/** Create or verify a private non-symlink state directory. */
function rate_secure_directory(string $directory): string {
    if (is_link($directory)) {
        throw new RuntimeException('Rate-limit state directory must not be a symlink.');
    }
    $probe = $directory;
    while (!file_exists($probe) && dirname($probe) !== $probe) $probe = dirname($probe);
    $probeReal = realpath($probe);
    if (is_string($probeReal)) rate_assert_private_location($probeReal);

    if (!is_dir($directory)) {
        if (file_exists($directory) || (!@mkdir($directory, 0700, true) && !is_dir($directory))) {
            throw new RuntimeException('Rate-limit state directory is unavailable.');
        }
        @chmod($directory, 0700);
    }
    clearstatcache(true, $directory);
    if (is_link($directory) || !is_dir($directory) || !is_writable($directory)) {
        throw new RuntimeException('Rate-limit state directory is not private and writable.');
    }
    $permissions = @fileperms($directory);
    if ($permissions === false || (($permissions & 0077) !== 0)) {
        throw new RuntimeException('Rate-limit state directory permissions are too broad.');
    }
    $real = realpath($directory);
    if ($real === false) {
        throw new RuntimeException('Rate-limit state directory cannot be resolved.');
    }
    rate_assert_private_location($real);
    return $real;
}

/** Load or atomically create the private HMAC key used for IP fingerprints. */
function rate_ip_secret(string $directory): string {
    $secretFile = $directory . '/ip-key.bin';
    if (is_link($secretFile)) {
        throw new RuntimeException('Rate-limit fingerprint key must not be a symlink.');
    }
    if (!file_exists($secretFile)) {
        try {
            $secret = random_bytes(32);
            $temporary = $directory . '/ip-key.' . bin2hex(random_bytes(12)) . '.tmp';
        } catch (Throwable $e) {
            throw new RuntimeException('Rate-limit fingerprint key could not be generated.', 0, $e);
        }
        $handle = @fopen($temporary, 'x+b');
        if ($handle === false) {
            throw new RuntimeException('Rate-limit fingerprint key cannot be created.');
        }
        $closed = false;
        try {
            @chmod($temporary, 0600);
            $offset = 0;
            while ($offset < strlen($secret)) {
                $written = @fwrite($handle, substr($secret, $offset));
                if (!is_int($written) || $written <= 0) {
                    throw new RuntimeException('Rate-limit fingerprint key write failed.');
                }
                $offset += $written;
            }
            if (!@fflush($handle)) {
                throw new RuntimeException('Rate-limit fingerprint key flush failed.');
            }
            if (function_exists('fsync') && !@fsync($handle)) {
                throw new RuntimeException('Rate-limit fingerprint key sync failed.');
            }
            @fclose($handle);
            $closed = true;
            if (!@rename($temporary, $secretFile)) {
                throw new RuntimeException('Rate-limit fingerprint key replacement failed.');
            }
            @chmod($secretFile, 0600);
        } finally {
            if (!$closed && is_resource($handle)) @fclose($handle);
            if (is_file($temporary) && !is_link($temporary)) @unlink($temporary);
        }
    }

    clearstatcache(true, $secretFile);
    $permissions = @fileperms($secretFile);
    $size = @filesize($secretFile);
    if (is_link($secretFile) || !is_file($secretFile) || $size !== 32
        || $permissions === false || (($permissions & 0077) !== 0)) {
        throw new RuntimeException('Rate-limit fingerprint key is unsafe.');
    }
    $secret = @file_get_contents($secretFile, false, null, 0, 33);
    if (!is_string($secret) || strlen($secret) !== 32) {
        throw new RuntimeException('Rate-limit fingerprint key cannot be read safely.');
    }
    return $secret;
}

function rate_empty_state(string $namespace): array {
    return [
        'version' => Z2O_RATE_STATE_VERSION,
        'namespace' => $namespace,
        'attempts' => [],
        'ips' => [],
    ];
}

/** Read and strictly validate the bounded on-disk rate state. */
function rate_read_state(string $stateFile, string $namespace): array {
    if (is_link($stateFile)) {
        throw new RuntimeException('Invalid rate-limit state file.');
    }
    if (!file_exists($stateFile)) return rate_empty_state($namespace);
    if (!is_file($stateFile)) {
        throw new RuntimeException('Invalid rate-limit state file.');
    }
    $size = @filesize($stateFile);
    $permissions = @fileperms($stateFile);
    if ($size === false || $size > Z2O_RATE_STATE_MAX_BYTES
        || $permissions === false || (($permissions & 0077) !== 0)) {
        throw new RuntimeException('Rate-limit state file is invalid or oversized.');
    }
    $raw = @file_get_contents($stateFile, false, null, 0, Z2O_RATE_STATE_MAX_BYTES + 1);
    if (!is_string($raw) || strlen($raw) > Z2O_RATE_STATE_MAX_BYTES) {
        throw new RuntimeException('Rate-limit state file cannot be read safely.');
    }
    try {
        $state = json_decode($raw, true, 32, JSON_THROW_ON_ERROR);
    } catch (Throwable $e) {
        throw new RuntimeException('Rate-limit state file is corrupt.', 0, $e);
    }
    if (!is_array($state)
        || ($state['version'] ?? null) !== Z2O_RATE_STATE_VERSION
        || !hash_equals($namespace, is_string($state['namespace'] ?? null) ? $state['namespace'] : '')
        || !is_array($state['attempts'] ?? null)
        || !is_array($state['ips'] ?? null)
        || count($state['attempts']) > 1000
        || count($state['ips']) > 1000) {
        throw new RuntimeException('Rate-limit state schema is invalid.');
    }
    foreach ($state['attempts'] as $timestamp) {
        if (!is_int($timestamp) || $timestamp < 0) {
            throw new RuntimeException('Rate-limit attempt state is invalid.');
        }
    }
    foreach ($state['ips'] as $key => $timestamp) {
        if (!is_string($key) || preg_match('/^[a-f0-9]{64}$/', $key) !== 1 || !is_int($timestamp) || $timestamp < 0) {
            throw new RuntimeException('Rate-limit IP state is invalid.');
        }
    }
    return $state;
}

/** Atomically replace the state file while the caller holds the global lock. */
function rate_write_state(string $directory, string $stateFile, array $state): void {
    try {
        $json = json_encode($state, JSON_UNESCAPED_SLASHES | JSON_THROW_ON_ERROR);
        $suffix = bin2hex(random_bytes(12));
    } catch (Throwable $e) {
        throw new RuntimeException('Rate-limit state could not be encoded.', 0, $e);
    }
    if (!is_string($json) || strlen($json) > Z2O_RATE_STATE_MAX_BYTES) {
        throw new RuntimeException('Rate-limit state exceeds its safety bound.');
    }
    $temporary = $directory . '/state.' . $suffix . '.tmp';
    $handle = @fopen($temporary, 'x+b');
    if ($handle === false) {
        throw new RuntimeException('Rate-limit temporary state file cannot be created.');
    }
    $closed = false;
    try {
        @chmod($temporary, 0600);
        $offset = 0;
        $length = strlen($json);
        while ($offset < $length) {
            $written = @fwrite($handle, substr($json, $offset));
            if (!is_int($written) || $written <= 0) {
                throw new RuntimeException('Rate-limit state write failed.');
            }
            $offset += $written;
        }
        if (!@fflush($handle)) {
            throw new RuntimeException('Rate-limit state flush failed.');
        }
        if (function_exists('fsync') && !@fsync($handle)) {
            throw new RuntimeException('Rate-limit state sync failed.');
        }
        @fclose($handle);
        $closed = true;
        if (!@rename($temporary, $stateFile)) {
            throw new RuntimeException('Rate-limit state replacement failed.');
        }
        @chmod($stateFile, 0600);
        clearstatcache(true, $stateFile);
        $permissions = @fileperms($stateFile);
        if ($permissions === false || (($permissions & 0077) !== 0) || is_link($stateFile)) {
            throw new RuntimeException('Rate-limit state file permissions are unsafe.');
        }
    } finally {
        if (!$closed && is_resource($handle)) @fclose($handle);
        if (is_file($temporary) && !is_link($temporary)) @unlink($temporary);
    }
}

/**
 * Atomically admit one valid mail attempt under the per-IP and shared windows.
 * Admission is persisted before mail() and is intentionally not rolled back if
 * the transport fails, preventing retry storms from bypassing the budget.
 */
function rate_limit_admit(
    string $ip,
    string $recipient,
    string $directory,
    int $now,
    int $ipCooldown,
    array $windows
): array {
    if ($now < 0 || $ipCooldown < 1 || !$windows) {
        throw new RuntimeException('Rate-limit policy is invalid.');
    }
    $maxWindow = 0;
    foreach ($windows as $window) {
        $seconds = $window['seconds'] ?? null;
        $limit = $window['limit'] ?? null;
        if (!is_int($seconds) || !is_int($limit) || $seconds < 1 || $limit < 1) {
            throw new RuntimeException('Rate-limit window is invalid.');
        }
        $maxWindow = max($maxWindow, $seconds);
    }

    $directory = rate_secure_directory($directory);
    $lockFile = $directory . '/state.lock';
    $stateFile = $directory . '/state.json';
    if (is_link($lockFile)) {
        throw new RuntimeException('Rate-limit lock file must not be a symlink.');
    }
    $lock = @fopen($lockFile, 'c+b');
    if ($lock === false) {
        throw new RuntimeException('Rate-limit lock cannot be opened.');
    }
    @chmod($lockFile, 0600);
    clearstatcache(true, $lockFile);
    $lockPermissions = @fileperms($lockFile);
    if (is_link($lockFile) || $lockPermissions === false || (($lockPermissions & 0077) !== 0)) {
        @fclose($lock);
        throw new RuntimeException('Rate-limit lock permissions are unsafe.');
    }
    if (!@flock($lock, LOCK_EX)) {
        @fclose($lock);
        throw new RuntimeException('Rate-limit lock cannot be acquired.');
    }

    try {
        $ipSecret = rate_ip_secret($directory);
        $namespace = hash_hmac('sha256', $recipient, $ipSecret);
        $state = rate_read_state($stateFile, $namespace);
        $oldestAllowed = $now - $maxWindow;
        $attempts = [];
        foreach ($state['attempts'] as $timestamp) {
            if ($timestamp > $oldestAllowed) $attempts[] = $timestamp;
        }
        sort($attempts, SORT_NUMERIC);

        $ips = [];
        foreach ($state['ips'] as $key => $timestamp) {
            if (($now - $timestamp) < $ipCooldown) $ips[$key] = $timestamp;
        }

        $ipKey = hash_hmac('sha256', $ip, $ipSecret);
        $retryAfter = 0;
        $scope = '';
        if (isset($ips[$ipKey])) {
            $retryAfter = max($retryAfter, $ips[$ipKey] + $ipCooldown - $now);
            $scope = 'ip';
        }
        foreach ($windows as $window) {
            $windowAttempts = [];
            $cutoff = $now - $window['seconds'];
            foreach ($attempts as $timestamp) {
                if ($timestamp > $cutoff) $windowAttempts[] = $timestamp;
            }
            if (count($windowAttempts) >= $window['limit']) {
                $wait = $windowAttempts[0] + $window['seconds'] - $now;
                if ($wait > $retryAfter) {
                    $retryAfter = $wait;
                    $scope = 'global';
                }
            }
        }
        if ($retryAfter > 0) {
            return ['allowed' => false, 'retryAfter' => max(1, $retryAfter), 'scope' => $scope];
        }

        $attempts[] = $now;
        $ips[$ipKey] = $now;
        ksort($ips, SORT_STRING);
        $state['attempts'] = $attempts;
        $state['ips'] = $ips;
        rate_write_state($directory, $stateFile, $state);
        return ['allowed' => true, 'retryAfter' => 0, 'scope' => ''];
    } finally {
        @flock($lock, LOCK_UN);
        @fclose($lock);
    }
}

/* Test harnesses can load the real rate-limit functions without handling HTTP. */
if (defined('Z2O_LIBRARY_ONLY') && Z2O_LIBRARY_ONLY === true) return;

/* --------------------------- request gatekeeping -------------------------- */
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    respond(false, msg('طريقة الطلب غير مدعومة.', 'Unsupported request method.'), 405);
}

/* Browser-side CSRF defense; non-browser clients that omit these hints still
   pass through the normal validation, honeypot, and atomic rate budgets. */
$fetchSite = strtolower(trim((string) ($_SERVER['HTTP_SEC_FETCH_SITE'] ?? '')));
if ($fetchSite === 'cross-site') {
    respond(false, msg('مصدر الطلب غير مسموح.', 'Cross-site submissions are not allowed.'), 403);
}
$origin = trim((string) ($_SERVER['HTTP_ORIGIN'] ?? ''));
if ($origin !== '') {
    $allowedOrigins = $ALLOWED_ORIGINS;
    $testOrigin = getenv('Z2O_TEST_ALLOWED_ORIGIN');
    if (PHP_SAPI === 'cli-server' && is_string($testOrigin) && $testOrigin !== '') {
        $allowedOrigins[] = $testOrigin;
    }
    $normalizedOrigin = normalize_origin($origin);
    $originAllowed = false;
    if (is_string($normalizedOrigin)) {
        foreach ($allowedOrigins as $allowedOrigin) {
            $normalizedAllowed = normalize_origin($allowedOrigin);
            if (is_string($normalizedAllowed) && hash_equals($normalizedAllowed, $normalizedOrigin)) {
                $originAllowed = true;
                break;
            }
        }
    }
    if (!$originAllowed) {
        respond(false, msg('مصدر الطلب غير مسموح.', 'Cross-origin submissions are not allowed.'), 403);
    }
}

$len = (int) ($_SERVER['CONTENT_LENGTH'] ?? 0);
if ($len > $MAX_POST) {
    respond(false, msg('حجم الطلب كبير جدًا.', 'Request body is too large.'), 413);
}

$in = $_POST;
if (!$in) {                                     // allow a bounded JSON body too
    $contentType = strtolower((string) ($_SERVER['CONTENT_TYPE'] ?? ''));
    $mediaType = trim(explode(';', $contentType, 2)[0]);
    if ($mediaType !== 'application/json') {
        respond(false, msg('نوع البيانات غير مدعوم.', 'Unsupported content type.'), 415);
    }
    $rawResult = @file_get_contents('php://input', false, null, 0, $MAX_POST + 1);
    if (!is_string($rawResult)) {
        respond(false, msg('تعذّرت قراءة الطلب.', 'The request body could not be read.'), 400);
    }
    if (strlen($rawResult) > $MAX_POST) {
        respond(false, msg('حجم الطلب كبير جدًا.', 'Request body is too large.'), 413);
    }
    try {
        $decoded = json_decode($rawResult, true, 16, JSON_THROW_ON_ERROR);
        if (is_array($decoded)) $in = $decoded;
    } catch (Throwable $e) {
        respond(false, msg('صيغة JSON غير صالحة.', 'Invalid JSON body.'), 400);
    }
}
if (!is_array($in) || !$in) {
    respond(false, msg('لم تصل أي بيانات.', 'No data received.'), 400);
}
if (count($in) > 16) {
    respond(false, msg('عدد الحقول غير صالح.', 'Too many request fields.'), 400);
}

/* every value must be valid UTF-8 before we touch it */
foreach ($in as $v) {
    if (!is_string($v)) {
        respond(false, msg('صيغة الحقول غير صالحة.', 'Invalid request field shape.'), 400);
    }
    if (!valid_utf8($v)) {
        respond(false, msg('ترميز البيانات غير صالح.', 'Invalid character encoding.'), 400);
    }
}

$LANG = field($in, 'lang') === 'en' ? 'en' : 'ar';

/* honeypot — bots fill it, humans never see it. Pretend success, send nothing. */
if (trim(field($in, 'website')) !== '') {
    respond(true, msg('تم استلام طلبك.', 'Your request was received.'));
}

$remoteAddress = trim((string) ($_SERVER['REMOTE_ADDR'] ?? ''));
$ip = filter_var($remoteAddress, FILTER_VALIDATE_IP) !== false ? $remoteAddress : 'unknown';

/* ------------------------------- validation ------------------------------- */
$errors = [];

$name = no_header_injection(clean_text(field($in, 'name')));
if (mb_len($name) < 2 || mb_len($name) > 100) {
    $errors[] = msg('الاسم يجب أن يكون بين 2 و100 حرف.', 'Name must be between 2 and 100 characters.');
}

$phoneRaw = ascii_digits(clean_text(field($in, 'phone')));
$phoneNorm = null;
$p = preg_replace('/[^\d+]/', '', str_replace([' ', '-', '(', ')', '.'], '', $phoneRaw));
if (is_string($p)) {
    if (strpos($p, '00966') === 0)                 $p = '+' . substr($p, 2);
    elseif (strpos($p, '966') === 0)               $p = '+' . $p;
    if (preg_match('/^0(5\d{8})$/', $p, $m))      $phoneNorm = '+966' . $m[1];
    elseif (preg_match('/^\+966(5\d{8})$/', $p, $m)) $phoneNorm = '+966' . $m[1];
}
if ($phoneNorm === null) {
    $errors[] = msg('رقم الجوال غير صحيح. استخدم صيغة 05XXXXXXXX أو +9665XXXXXXXX.',
                    'Invalid mobile number. Use 05XXXXXXXX or +9665XXXXXXXX.');
}

$emailRaw = no_header_injection(clean_text(field($in, 'email')));
$email = null;
if ($emailRaw !== '') {
    if (strlen($emailRaw) > 254 || !filter_var($emailRaw, FILTER_VALIDATE_EMAIL)) {
        $errors[] = msg('صيغة البريد الإلكتروني غير صحيحة.', 'Invalid email address.');
    } else {
        $email = $emailRaw;
    }
}

$details = clean_text(field($in, 'details'));
if (mb_len($details) < 10 || mb_len($details) > 5000) {
    $errors[] = msg('تفاصيل الحالة يجب أن تكون بين 10 و5000 حرف.',
                    'Case details must be between 10 and 5000 characters.');
}

/* strict whitelist — a forged <option> value is rejected, not just "not empty" */
$picked = [];
foreach (['urgency', 'device', 'issue', 'tried'] as $key) {
    $val = clean_text(field($in, $key));
    if (!in_array($val, $ALLOWED[$key], true)) {
        $errors[] = msg('قيمة غير مسموحة في الحقل: ' . $key, 'Invalid value for field: ' . $key);
        $picked[$key] = '';
    } else {
        $picked[$key] = $val;
    }
}

if ($errors) {
    respond(false, implode(' ', $errors), 422);
}

/* Every fully valid attempt consumes both budgets before any mail side effect. */
try {
    $rate = rate_limit_admit(
        $ip,
        $TO_EMAIL,
        rate_state_directory($TO_EMAIL),
        time(),
        $IP_COOLDOWN_SECONDS,
        $MAIL_RATE_WINDOWS
    );
} catch (Throwable $e) {
    error_log('Contact-form rate limiter unavailable: ' . $e->getMessage());
    header('Retry-After: 60');
    respond(false, msg('الخدمة مشغولة مؤقتًا. الرجاء المحاولة لاحقًا أو التواصل عبر واتساب.',
                       'The service is temporarily busy. Please try later or contact us on WhatsApp.'), 503);
}
if (!$rate['allowed']) {
    $wait = (int) $rate['retryAfter'];
    header('Retry-After: ' . $wait);
    respond(false, msg("تم بلوغ حد الإرسال الآمن. الرجاء المحاولة بعد {$wait} ثانية.",
                       "The safe submission limit was reached. Please try again in {$wait}s."), 429);
}

/* --------------------------- compose the email ---------------------------- */
$isEmergency = in_array($picked['urgency'], $EMERGENCY, true);

$labels = $LANG === 'en'
    ? ['name' => 'Name', 'phone' => 'Mobile', 'email' => 'Email', 'urgency' => 'Urgency',
       'device' => 'Device', 'issue' => 'Issue', 'tried' => 'Tried software', 'details' => 'Details',
       'meta' => 'Submission', 'page' => 'Page language', 'time' => 'Time',
       'none' => '(not provided)']
    : ['name' => 'الاسم', 'phone' => 'الجوال', 'email' => 'البريد', 'urgency' => 'الاستعجال',
       'device' => 'نوع الجهاز', 'issue' => 'نوع المشكلة', 'tried' => 'جرّب برامج استرجاع', 'details' => 'التفاصيل',
       'meta' => 'بيانات الإرسال', 'page' => 'لغة الصفحة', 'time' => 'الوقت',
       'none' => '(غير مذكور)'];

$subject = ($isEmergency ? '🚨 ' : '')
    . msg('طلب استعادة بيانات', 'Data recovery request')
    . ' — ' . $picked['device'] . ' — ' . $name;

try {
    $when = (new DateTime('now', new DateTimeZone('Asia/Riyadh')))->format('Y-m-d H:i');
} catch (Throwable $e) {
    $when = gmdate('Y-m-d H:i') . ' UTC';
}

$lines = [
    $labels['name']    . ': ' . $name,
    $labels['phone']   . ': ' . $phoneNorm,
    $labels['email']   . ': ' . ($email ?? $labels['none']),
    $labels['urgency'] . ': ' . $picked['urgency'] . ($isEmergency ? ' 🚨' : ''),
    $labels['device']  . ': ' . $picked['device'],
    $labels['issue']   . ': ' . $picked['issue'],
    $labels['tried']   . ': ' . $picked['tried'],
    '',
    str_repeat('-', 40),
    $labels['details'] . ':',
    $details,
    str_repeat('-', 40),
    '',
    $labels['meta'] . ':',
    '  ' . $labels['page'] . ': ' . $LANG,
    '  ' . $labels['time'] . ': ' . $when . ' (Asia/Riyadh)',
];
$body = chunk_split(base64_encode(implode("\r\n", $lines)), 76, "\r\n");

$headers = [
    'From: ' . encode_display_name($FROM_NAME) . ' <' . $FROM_EMAIL . '>',
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: base64',
];
if ($email !== null) {
    // Reply straight to the customer when they gave an address
    array_splice($headers, 1, 0, ['Reply-To: ' . encode_display_name($name) . ' <' . $email . '>']);
}
if ($isEmergency) {
    $headers[] = 'X-Priority: 1 (Highest)';
    $headers[] = 'Importance: High';
}

$headerStr = implode("\r\n", $headers);
$encSubject = encode_header($subject);

$sent = @mail($TO_EMAIL, $encSubject, $body, $headerStr, '-f' . $FROM_EMAIL);
if (!$sent) {                                  // some hosts reject the -f switch
    $sent = @mail($TO_EMAIL, $encSubject, $body, $headerStr);
}

if (!$sent) {
    respond(false, msg('تعذّر إرسال الرسالة حاليًا. الرجاء التواصل عبر واتساب.',
                       'The message could not be sent right now. Please reach us on WhatsApp.'), 500);
}

respond(true, msg('تم استلام طلبك. سنعود إليك بأسرع وقت خلال ساعات العمل.',
                  'Your request was received. We will get back to you shortly during working hours.'));
