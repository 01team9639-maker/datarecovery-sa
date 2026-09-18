"use strict";
/* ==========================================================================
   ransomware-assessment.php — مولَّد من هنا، لا يُحرَّر يدويًّا.

   قوائم القيم المسموحة تُشتقّ من build/ransomware-section.js نفسه الذي يرسم
   النموذج، فلا تنحرف القائمتان. التفاصيل التشغيلية في رأس ملف PHP الناتج.
   ========================================================================== */

module.exports = function ransomwareAssessmentPhp({ text, origins }) {
  const f = text.ar.assessment.fields;
  const keys = (o) => Object.keys(o);
  const list = (arr) => "[" + arr.map((v) => `'${v}'`).join(", ") + "]";
  const labels = (name) => {
    const ar = text.ar.assessment.fields[name].opts, en = text.en.assessment.fields[name].opts;
    return "[" + keys(ar).map((k) => `'${k}' => ['ar' => '${ar[k]}', 'en' => '${en[k]}']`).join(", ") + "]";
  };

  return `<?php
/**
 * ransomware-assessment.php — طلبات تقييم حالة هجوم فدية (/ransomware/assessment/).
 *
 * ⚠️  GENERATED FILE — produced by build/ransomware-assessment-php.js from the
 *     same data that renders the form. Edit the builder and re-run
 *     node build/generate.js.
 *
 * ──────────────────────────── التشغيل ────────────────────────────
 * النموذج لا يستقبل شيئًا حتى يُنشئ المالك ملف إعداد خاصًّا خارج جذر الموقع:
 *
 *   <المجلد الأب لجذر الموقع>/.z2o-private/ransomware-assessment/config.json
 *   (أو مسار مطلق في متغير البيئة Z2O_ASSESS_DIR)
 *
 *   {
 *     "enabled": true,
 *     "notify_to": "cases@example.com",        ← جهة الاستلام المعتمدة (قرار المالك)
 *     "notify_from": "noreply@datarecovery-sa.com",
 *     "notify_include_contact": false,          ← true: الاسم ووسيلة التواصل في الإشعار
 *     "retention_days": 0,                      ← 0: بلا حذف تلقائي؛ N: يُحذف ما هو أقدم
 *     "allowed_origins": []                     ← أصول إضافية (معاينة) فوق الإنتاج
 *   }
 *
 * بلا هذا الملف (أو enabled ≠ true أو بريد استلام غير صالح): ?status=1 يُجيب
 * ready:false، فتعرض الصفحة وسائل التواصل المباشرة بدل النموذج، وأي POST يُردّ
 * 503 unavailable. لا نجاح شكلي في أي مسار.
 *
 * التخزين: requests/<REF>.json (0600) — الطلب كاملًا، وهو المرجع الوحيد لوصف
 * الحالة. الإشعار بالبريد يحمل الرقم المرجعي والتصنيفات فقط (لا الوصف)، والاسم
 * ووسيلة التواصل فقط إن فُعّل notify_include_contact. فشل الإشعار بعد الحفظ لا
 * يُفشل الطلب: يُسجَّل في pending/ ويُعاد عند الطلبات التالية.
 *
 * التكرار: request_key يولّده المتصفح مرة لكل تعبئة؛ keys/<sha256>.ref يربطه
 * بالرقم المرجعي تحت قفل ملف، فالنقر المزدوج وإعادة المحاولة بعد انقطاع الردّ
 * يعيدان الرقم نفسه ولا يُنشئان طلبًا ثانيًا.
 *
 * الحماية: Origin مسموح + رمز HMAC قصير العمر من ?status=1 (لا يُقرأ عبر
 * الأصول، فهو يمنع CSRF) + حدود معدّل لكل عنوان وإجمالية + حقل مصيدة. لا رفع
 * ملفات. لا تُكتب المدخلات في السجلات.
 */
declare(strict_types=1);

const RW_MAX_POST = 32768;
const RW_TOKEN_TTL = 7200;       // ثانيتان إلى ساعتين: عمر رمز النموذج
const RW_TOKEN_MIN_AGE = 2;
const RW_IP_WINDOW = 600;        // 5 طلبات جديدة لكل عنوان في 10 دقائق
const RW_IP_LIMIT = 5;
const RW_ALL_WINDOW = 3600;      // 60 طلبًا جديدًا إجمالًا في الساعة
const RW_ALL_LIMIT = 60;
const RW_MAX_DESC = 1000;

$ALLOWED_ORIGINS = ${list(origins)};
$CUSTOMER_TYPES = ${list(keys(f.customerType.opts))};
$CONTACT_METHODS = ${list(keys(f.contactMethod.opts))};
$AFFECTED = ${list(keys(f.affected.opts))};
$IMPACTS = ${list(keys(f.impact.opts))};
$LABELS = [
    'customer_type' => ${labels("customerType")},
    'contact_method' => ${labels("contactMethod")},
    'affected' => ${labels("affected")},
    'impact' => ${labels("impact")},
];

header_remove('X-Powered-By');
header('Content-Type: application/json; charset=UTF-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store, max-age=0');
header('Referrer-Policy: no-referrer');
header('X-Frame-Options: DENY');
header('Cross-Origin-Opener-Policy: same-origin');
header('Cross-Origin-Resource-Policy: same-origin');
header("Content-Security-Policy: default-src 'none'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'");

function rw_out(int $status, array $body): void {
    http_response_code($status);
    echo json_encode($body, JSON_UNESCAPED_SLASHES);
    exit;
}

/* ------------------------------ المجلد الخاص ------------------------------ */
function rw_base_dir(): string {
    $env = getenv('Z2O_ASSESS_DIR');
    if (is_string($env) && trim($env) !== '') {
        $dir = rtrim(trim($env), '/');
        if ($dir === '' || $dir[0] !== '/' || strpos($dir, "\\0") !== false) {
            throw new RuntimeException('Invalid assessment directory configuration.');
        }
        return $dir;
    }
    return dirname(__DIR__) . '/.z2o-private/ransomware-assessment';
}

function rw_within(string $path, string $root): bool {
    $path = rtrim($path, '/');
    $root = rtrim($root, '/');
    return $path === $root || strpos($path, $root . '/') === 0;
}

/** المجلد الخاص يجب أن يكون خارج جذر الموقع، وليس رابطًا رمزيًّا، وصلاحياته 07xx. */
function rw_private_dir(string $dir, bool $create): ?string {
    if (is_link($dir)) throw new RuntimeException('Assessment directory must not be a symlink.');
    if (!is_dir($dir)) {
        if (!$create) return null;
        if (!@mkdir($dir, 0700, true) && !is_dir($dir)) throw new RuntimeException('Assessment directory unavailable.');
        @chmod($dir, 0700);
    }
    $real = realpath($dir);
    if ($real === false) throw new RuntimeException('Assessment directory cannot be resolved.');
    $roots = [realpath(__DIR__)];
    $docRoot = trim((string) ($_SERVER['DOCUMENT_ROOT'] ?? ''));
    if ($docRoot !== '') $roots[] = realpath($docRoot);
    foreach ($roots as $root) {
        if (is_string($root) && $root !== '' && rw_within($real, $root)) {
            throw new RuntimeException('Assessment directory must be outside the public document root.');
        }
    }
    $perms = @fileperms($real);
    if ($perms === false || ($perms & 0077) !== 0) throw new RuntimeException('Assessment directory permissions are too broad.');
    if (!is_writable($real)) throw new RuntimeException('Assessment directory is not writable.');
    return $real;
}

function rw_config(): ?array {
    $base = rw_private_dir(rw_base_dir(), false);
    if ($base === null) return null;
    $file = $base . '/config.json';
    if (!is_file($file) || is_link($file)) return null;
    $cfg = json_decode((string) file_get_contents($file), true);
    if (!is_array($cfg) || ($cfg['enabled'] ?? false) !== true) return null;
    $to = (string) ($cfg['notify_to'] ?? '');
    if (filter_var($to, FILTER_VALIDATE_EMAIL) === false || preg_match('/[\\r\\n]/', $to)) return null;
    $cfg['base'] = $base;
    return $cfg;
}

function rw_subdir(array $cfg, string $name): string {
    $dir = rw_private_dir($cfg['base'] . '/' . $name, true);
    if ($dir === null) throw new RuntimeException('Assessment subdirectory unavailable.');
    return $dir;
}

function rw_secret(array $cfg): string {
    $file = $cfg['base'] . '/secret.key';
    if (is_link($file)) throw new RuntimeException('Secret must not be a symlink.');
    if (!is_file($file)) {
        $tmp = $cfg['base'] . '/secret.' . bin2hex(random_bytes(8)) . '.tmp';
        $h = @fopen($tmp, 'x+b');
        if ($h === false) throw new RuntimeException('Secret cannot be created.');
        fwrite($h, random_bytes(32));
        fclose($h);
        @chmod($tmp, 0600);
        if (!@link($tmp, $file) && !is_file($file)) { @unlink($tmp); throw new RuntimeException('Secret cannot be stored.'); }
        @unlink($tmp);
    }
    $secret = (string) file_get_contents($file);
    if (strlen($secret) !== 32) throw new RuntimeException('Secret is invalid.');
    return $secret;
}

/* --------------------------------- الرمز --------------------------------- */
function rw_token(string $secret): string {
    $ts = (string) time();
    $nonce = bin2hex(random_bytes(12));
    return $ts . '.' . $nonce . '.' . hash_hmac('sha256', 'rw1|' . $ts . '|' . $nonce, $secret);
}

function rw_token_ok(string $token, string $secret): bool {
    if (!preg_match('/^(\\d{9,11})\\.([0-9a-f]{24})\\.([0-9a-f]{64})$/', $token, $m)) return false;
    $age = time() - (int) $m[1];
    if ($age < RW_TOKEN_MIN_AGE || $age > RW_TOKEN_TTL) return false;
    return hash_equals(hash_hmac('sha256', 'rw1|' . $m[1] . '|' . $m[2], $secret), $m[3]);
}

/* -------------------------------- المدخلات -------------------------------- */
function rw_str($v): string { return is_string($v) ? $v : ''; }

function rw_len(string $s): int { return (int) preg_match_all('/./su', $s); }

function rw_digits(string $s): string {
    static $map = null;
    if ($map === null) {
        $map = [];
        for ($i = 0; $i < 10; $i++) {
            $map[html_entity_decode('&#' . (0x0660 + $i) . ';', ENT_QUOTES, 'UTF-8')] = (string) $i;
            $map[html_entity_decode('&#' . (0x06F0 + $i) . ';', ENT_QUOTES, 'UTF-8')] = (string) $i;
        }
    }
    return strtr($s, $map);
}

/** نصّ صالح UTF-8 بلا محارف تحكم (يُبقي السطر الجديد حيث يُسمح). */
function rw_text(string $v, bool $multiline): ?string {
    if ($v !== '' && preg_match('//u', $v) !== 1) return null;
    $v = str_replace("\\r\\n", "\\n", $v);
    $v = preg_replace($multiline ? '/[\\x00-\\x09\\x0B-\\x1F\\x7F]/u' : '/[\\x00-\\x1F\\x7F]/u', '', $v);
    return trim((string) $v);
}

function rw_validate(array $in, array &$bad): array {
    global $CUSTOMER_TYPES, $CONTACT_METHODS, $AFFECTED, $IMPACTS;
    $r = [];
    $name = rw_text(rw_str($in['name'] ?? null), false);
    if ($name === null || $name === '' || rw_len($name) > 100) $bad[] = 'rw-name';
    $r['name'] = (string) $name;

    $type = rw_str($in['customer_type'] ?? null);
    if (!in_array($type, $CUSTOMER_TYPES, true)) $bad[] = 'rw-customer';
    $r['customer_type'] = $type;
    $company = rw_text(rw_str($in['company'] ?? null), false);
    $r['company'] = ($type === 'business' && $company !== null) ? mb_substr_safe($company, 150) : '';

    $method = rw_str($in['contact_method'] ?? null);
    if (!in_array($method, $CONTACT_METHODS, true)) $bad[] = 'rw-method';
    $r['contact_method'] = $method;

    $cc = preg_replace('/[\\s-]/', '', rw_digits(rw_str($in['phone_cc'] ?? null)));
    $cc = preg_replace('/^(?:\\+|00)/', '', (string) $cc);
    $num = preg_replace('/[\\s().-]/', '', rw_digits(rw_str($in['phone'] ?? null)));
    $num = ltrim((string) $num, '0');
    $phoneGiven = trim(rw_str($in['phone'] ?? null)) !== '';
    $phoneOk = preg_match('/^[1-9]\\d{0,2}$/', (string) $cc) === 1 && preg_match('/^\\d{6,14}$/', $num) === 1
        && strlen($cc . $num) >= 8 && strlen($cc . $num) <= 15;
    if (($method === 'call' || $method === 'whatsapp') && !$phoneGiven) $bad[] = 'rw-phone';
    elseif ($phoneGiven && !$phoneOk) $bad[] = 'rw-phone';
    $r['phone'] = $phoneGiven && $phoneOk ? '+' . $cc . $num : '';

    $email = trim(rw_str($in['email'] ?? null));
    $emailOk = $email !== '' && strlen($email) <= 254 && filter_var($email, FILTER_VALIDATE_EMAIL) !== false
        && preg_match('/[\\r\\n]/', $email) !== 1;
    if ($method === 'email' && $email === '') $bad[] = 'rw-email';
    elseif ($email !== '' && !$emailOk) $bad[] = 'rw-email';
    $r['email'] = $emailOk ? $email : '';

    $aff = $in['affected'] ?? [];
    $aff = is_array($aff) ? array_values(array_unique(array_filter($aff, 'is_string'))) : [];
    if (!$aff || array_diff($aff, $AFFECTED)) $bad[] = 'rw-affected';
    $r['affected'] = array_values(array_intersect($AFFECTED, $aff));

    $impact = rw_str($in['impact'] ?? null);
    if (!in_array($impact, $IMPACTS, true)) $bad[] = 'rw-impact';
    $r['impact'] = $impact;

    $desc = rw_text(rw_str($in['description'] ?? null), true);
    if ($desc === null || $desc === '' || rw_len($desc) > RW_MAX_DESC) $bad[] = 'rw-desc';
    $r['description'] = (string) $desc;

    if (rw_str($in['privacy_ack'] ?? null) !== '1') $bad[] = 'rw-consent';

    $discovered = rw_text(rw_str($in['discovered'] ?? null), false);
    $backups = rw_text(rw_str($in['backups'] ?? null), false);
    $ext = rw_text(rw_str($in['extension'] ?? null), false);
    $devices = preg_replace('/\\D/', '', rw_digits(rw_str($in['devices'] ?? null)));
    $r['details'] = [
        'discovered' => $discovered === null ? '' : mb_substr_safe($discovered, 100),
        'devices' => substr((string) $devices, 0, 6),
        'backups' => $backups === null ? '' : mb_substr_safe($backups, 200),
        'extension' => $ext === null ? '' : mb_substr_safe($ext, 40),
    ];
    $lang = rw_str($in['lang'] ?? null);
    $r['lang'] = $lang === 'en' ? 'en' : 'ar';
    return $r;
}

function mb_substr_safe(string $s, int $max): string {
    if (rw_len($s) <= $max) return $s;
    preg_match('/^.{0,' . $max . '}/su', $s, $m);
    return $m[0] ?? '';
}

/* ------------------------------- حدود المعدّل ------------------------------- */
function rw_rate_admit(array $cfg, string $secret): bool {
    $dir = rw_subdir($cfg, 'rate');
    $h = @fopen($dir . '/state.json', 'c+b');
    if ($h === false) throw new RuntimeException('Rate state unavailable.');
    try {
        if (!flock($h, LOCK_EX)) throw new RuntimeException('Rate state lock failed.');
        $raw = stream_get_contents($h);
        $state = json_decode((string) $raw, true);
        if (!is_array($state)) $state = ['ip' => [], 'all' => []];
        $now = time();
        $fp = substr(hash_hmac('sha256', (string) ($_SERVER['REMOTE_ADDR'] ?? ''), $secret), 0, 32);
        $state['all'] = array_values(array_filter((array) ($state['all'] ?? []), function ($t) use ($now) { return is_int($t) && $t > $now - RW_ALL_WINDOW; }));
        $ips = [];
        foreach ((array) ($state['ip'] ?? []) as $k => $list) {
            $list = array_values(array_filter((array) $list, function ($t) use ($now) { return is_int($t) && $t > $now - RW_IP_WINDOW; }));
            if ($list) $ips[$k] = $list;
        }
        $mine = $ips[$fp] ?? [];
        $admit = count($mine) < RW_IP_LIMIT && count($state['all']) < RW_ALL_LIMIT;
        if ($admit) { $mine[] = $now; $ips[$fp] = $mine; $state['all'][] = $now; }
        $state['ip'] = $ips;
        ftruncate($h, 0);
        rewind($h);
        fwrite($h, json_encode($state));
        fflush($h);
        return $admit;
    } finally {
        flock($h, LOCK_UN);
        fclose($h);
    }
}

/* --------------------------------- الإشعار --------------------------------- */
function rw_header_text(string $v): string {
    return '=?UTF-8?B?' . base64_encode(preg_replace('/[\\r\\n]+/', ' ', $v)) . '?=';
}

function rw_notify(array $cfg, array $rec): bool {
    global $LABELS;
    $l = 'ar';
    $label = function (string $field, string $value) use ($l) {
        global $LABELS;
        return $LABELS[$field][$value][$l] ?? $value;
    };
    $lines = [
        'طلب تقييم حالة هجوم فدية',
        'الرقم المرجعي: ' . $rec['ref'],
        'الوقت (UTC): ' . $rec['created_at'],
        'لغة الصفحة: ' . $rec['lang'],
        'صفة الطلب: ' . $label('customer_type', $rec['customer_type']),
        'وسيلة التواصل: ' . $label('contact_method', $rec['contact_method']),
        'المتأثر: ' . implode('، ', array_map(function ($a) use ($label) { return $label('affected', $a); }, $rec['affected'])),
        'التأثير: ' . $label('impact', $rec['impact']),
    ];
    if (($cfg['notify_include_contact'] ?? false) === true) {
        $lines[] = 'الاسم: ' . $rec['name'];
        if ($rec['company'] !== '') $lines[] = 'الجهة: ' . $rec['company'];
        if ($rec['phone'] !== '') $lines[] = 'الهاتف: ' . $rec['phone'];
        if ($rec['email'] !== '') $lines[] = 'البريد: ' . $rec['email'];
    }
    $lines[] = '';
    $lines[] = 'الطلب كاملًا، بما فيه الوصف، محفوظ على الخادم في requests/' . $rec['ref'] . '.json ولا يُنسخ إلى البريد.';
    $from = (string) ($cfg['notify_from'] ?? '');
    if (filter_var($from, FILTER_VALIDATE_EMAIL) === false || preg_match('/[\\r\\n]/', $from)) $from = 'noreply@datarecovery-sa.com';
    $headers = [
        'From: ' . rw_header_text('Zero 2 One — تقييم الفدية') . ' <' . $from . '>',
        'MIME-Version: 1.0',
        'Content-Type: text/plain; charset=UTF-8',
        'Content-Transfer-Encoding: base64',
        'X-Z2O-Form: ransomware-assessment',
    ];
    return @mail((string) $cfg['notify_to'], rw_header_text('طلب تقييم فدية ' . $rec['ref']),
        chunk_split(base64_encode(implode("\\n", $lines))), implode("\\r\\n", $headers));
}

/** يعيد محاولة إشعارات فشلت بعد الحفظ؛ ثلاثة على الأكثر في كل طلب. */
function rw_retry_pending(array $cfg): void {
    $pending = rw_subdir($cfg, 'pending');
    $requests = rw_subdir($cfg, 'requests');
    $done = 0;
    foreach ((array) glob($pending . '/RW-*') as $marker) {
        if ($done >= 3) break;
        if (!is_file($marker) || filemtime($marker) > time() - 300) continue;
        $ref = basename($marker);
        if (!preg_match('/^RW-\\d{8}-[A-Z2-7]{6}$/', $ref)) { @unlink($marker); continue; }
        $rec = json_decode((string) @file_get_contents($requests . '/' . $ref . '.json'), true);
        $done++;
        if (!is_array($rec)) { @unlink($marker); continue; }
        if (rw_notify($cfg, $rec)) @unlink($marker); else @touch($marker);
    }
}

function rw_purge(array $cfg): void {
    $keys = rw_subdir($cfg, 'keys');
    foreach ((array) glob($keys . '/*.ref') as $i => $file) {
        if ($i > 200) break;
        if (is_file($file) && filemtime($file) < time() - 172800) @unlink($file);
    }
    $days = (int) ($cfg['retention_days'] ?? 0);
    if ($days <= 0) return;
    $requests = rw_subdir($cfg, 'requests');
    foreach ((array) glob($requests . '/RW-*.json') as $i => $file) {
        if ($i > 200) break;
        if (is_file($file) && filemtime($file) < time() - $days * 86400) @unlink($file);
    }
}

function rw_ref(): string {
    $alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
    $out = '';
    $bytes = random_bytes(6);
    for ($i = 0; $i < 6; $i++) $out .= $alphabet[ord($bytes[$i]) % 32];
    return 'RW-' . gmdate('Ymd') . '-' . $out;
}

function rw_origin(string $origin): ?string {
    if ($origin === '' || preg_match('/[\\x00-\\x20\\x7F]/', $origin) === 1) return null;
    $p = parse_url($origin);
    if (!is_array($p) || isset($p['user']) || isset($p['pass']) || isset($p['query']) || isset($p['fragment'])
        || (isset($p['path']) && $p['path'] !== '' && $p['path'] !== '/')) return null;
    $scheme = strtolower((string) ($p['scheme'] ?? ''));
    $host = strtolower((string) ($p['host'] ?? ''));
    if (($scheme !== 'https' && $scheme !== 'http') || $host === '') return null;
    $port = $p['port'] ?? ($scheme === 'https' ? 443 : 80);
    return $scheme . '://' . $host . ':' . $port;
}

/* ================================== الطلب ================================== */
try {
    $method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

    if ($method === 'GET' && isset($_GET['status'])) {
        $cfg = rw_config();
        if ($cfg === null) rw_out(200, ['ready' => false]);
        $secret = rw_secret($cfg);
        rw_retry_pending($cfg);
        rw_out(200, ['ready' => true, 'token' => rw_token($secret)]);
    }

    if ($method !== 'POST') {
        header('Allow: GET, POST');
        rw_out(405, ['ok' => false, 'error' => 'method']);
    }
    if ((int) ($_SERVER['CONTENT_LENGTH'] ?? 0) > RW_MAX_POST) rw_out(413, ['ok' => false, 'error' => 'server']);

    $cfg = rw_config();
    if ($cfg === null) rw_out(503, ['ok' => false, 'error' => 'unavailable']);

    $allowed = array_filter(array_map('rw_origin', array_merge($ALLOWED_ORIGINS, array_filter((array) ($cfg['allowed_origins'] ?? []), 'is_string'))));
    $origin = rw_origin((string) ($_SERVER['HTTP_ORIGIN'] ?? ''));
    if ($origin === null || !in_array($origin, $allowed, true)) rw_out(403, ['ok' => false, 'error' => 'origin']);

    if (rw_str($_POST['website'] ?? null) !== '') rw_out(400, ['ok' => false, 'error' => 'server']);

    $secret = rw_secret($cfg);
    if (!rw_token_ok(rw_str($_POST['token'] ?? null), $secret)) rw_out(403, ['ok' => false, 'error' => 'token']);

    $requestKey = rw_str($_POST['request_key'] ?? null);
    if (preg_match('/^[0-9a-fA-F-]{32,36}$/', $requestKey) !== 1) rw_out(422, ['ok' => false, 'error' => 'validation', 'fields' => []]);

    $bad = [];
    $data = rw_validate($_POST, $bad);
    if ($bad) rw_out(422, ['ok' => false, 'error' => 'validation', 'fields' => array_values(array_unique($bad))]);

    $keys = rw_subdir($cfg, 'keys');
    $requests = rw_subdir($cfg, 'requests');
    $keyFile = $keys . '/' . hash('sha256', strtolower($requestKey)) . '.ref';
    $kh = @fopen($keyFile, 'c+b');
    if ($kh === false) throw new RuntimeException('Idempotency key unavailable.');
    $notify = null;
    try {
        if (!flock($kh, LOCK_EX)) throw new RuntimeException('Idempotency lock failed.');
        $existing = trim((string) stream_get_contents($kh));
        if (preg_match('/^RW-\\d{8}-[A-Z2-7]{6}$/', $existing) === 1 && is_file($requests . '/' . $existing . '.json')) {
            rw_out(200, ['ok' => true, 'ref' => $existing, 'duplicate' => true]);
        }
        if (!rw_rate_admit($cfg, $secret)) rw_out(429, ['ok' => false, 'error' => 'rate']);

        do { $ref = rw_ref(); } while (file_exists($requests . '/' . $ref . '.json'));
        $record = array_merge(['ref' => $ref, 'created_at' => gmdate('Y-m-d\\TH:i:s\\Z')], $data,
            ['privacy_ack' => true, 'form' => 'ransomware_assessment']);
        $tmp = $requests . '/.' . $ref . '.' . bin2hex(random_bytes(6)) . '.tmp';
        $rh = @fopen($tmp, 'x+b');
        if ($rh === false) throw new RuntimeException('Request file cannot be created.');
        $json = json_encode($record, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT);
        $written = fwrite($rh, (string) $json);
        fflush($rh);
        fclose($rh);
        @chmod($tmp, 0600);
        if ($written !== strlen((string) $json) || !@rename($tmp, $requests . '/' . $ref . '.json')) {
            @unlink($tmp);
            throw new RuntimeException('Request could not be stored.');
        }
        ftruncate($kh, 0);
        rewind($kh);
        fwrite($kh, $ref);
        fflush($kh);
        $notify = $record;
    } finally {
        flock($kh, LOCK_UN);
        fclose($kh);
    }

    // الحفظ تمّ؛ ما بعده لا يُفشل الطلب.
    try {
        if (!rw_notify($cfg, $notify)) {
            @touch(rw_subdir($cfg, 'pending') . '/' . $notify['ref']);
            error_log('ransomware-assessment: notification failed, queued ' . $notify['ref']);
        }
        rw_retry_pending($cfg);
        rw_purge($cfg);
    } catch (Throwable $e) {
        error_log('ransomware-assessment: post-save step failed for ' . $notify['ref']);
    }
    rw_out(200, ['ok' => true, 'ref' => $notify['ref']]);
} catch (Throwable $e) {
    error_log('ransomware-assessment: ' . get_class($e) . ': ' . $e->getMessage());
    rw_out(500, ['ok' => false, 'error' => 'server']);
}
`;
};
