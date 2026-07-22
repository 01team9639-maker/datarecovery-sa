#!/bin/bash
# تجربة فورم التواصل محلياً قبل رفعه على Hostinger.
# يشغّل PHP داخل Docker ويلتقط الإيميلات بملفات (بدل إرسالها فعلياً).
set -Eeuo pipefail
IFS=$'\n\t'
umask 077
cd "$(dirname "$0")" || exit 1
export PATH="/usr/local/bin:/opt/homebrew/bin:/usr/bin:/bin:$PATH"

echo "▶︎ التأكد من Docker…"
if ! docker info >/dev/null 2>&1; then
  open -a Docker
  for i in $(seq 1 20); do docker info >/dev/null 2>&1 && break; sleep 5; done
fi
docker info >/dev/null 2>&1 || { echo "✗ Docker مش شغّال. افتح Docker Desktop وجرّب مرة ثانية."; read -r; exit 1; }

TMP_BASE=${TMPDIR:-/private/tmp}
TMP_BASE=${TMP_BASE%/}
W=$(mktemp -d "$TMP_BASE/z2o-formtest.XXXXXX")
CONTAINER="z2o-formtest-${W##*.}"

cleanup() {
  set +e
  docker rm -f "$CONTAINER" >/dev/null 2>&1
  case "$W" in
    "$TMP_BASE"/z2o-formtest.*) rm -rf -- "$W" ;;
    *) echo "✗ رفض تنظيف مسار مؤقت غير متوقع: $W" >&2 ;;
  esac
}
trap cleanup EXIT
trap 'exit 129' HUP
trap 'exit 130' INT
trap 'exit 143' TERM

echo "▶︎ تجهيز الملفات…"
mkdir -m 700 "$W/mail"
cp -R index.html ar en assets send.php .user.ini "$W"/ 2>/dev/null
cat > "$W/catchmail.sh" <<'SH'
#!/bin/sh
set -eu
umask 077
message=$(mktemp /app/mail/message.XXXXXX.eml)
cat > "$message"
SH
chmod +x "$W/catchmail.sh"
cat > "$W/inbox.php" <<'PHP'
<?php
header('Content-Type: text/html; charset=UTF-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');
header('Referrer-Policy: no-referrer');
header("Content-Security-Policy: default-src 'none'; style-src 'unsafe-inline'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'");
$files = glob(__DIR__.'/mail/*.eml'); rsort($files);
echo '<!doctype html><meta charset="utf-8"><meta http-equiv="refresh" content="5"><title>Local inbox</title><style>body{font-family:system-ui;max-width:820px;margin:32px auto;padding:0 16px;background:#011e22;color:#fff}h1{color:#12c7d7}pre{background:#031214;border:1px solid #1c4547;padding:16px;border-radius:10px;white-space:pre-wrap;word-break:break-word;line-height:1.7}h2{color:#12c7d7;font-size:1rem;margin-top:28px}.e{color:#8fb0b2}</style>';
echo '<h1>📥 صندوق الاختبار المحلي — '.count($files).' رسالة</h1><p class=e>يتحدّث كل 5 ثواني.</p>';
if(!$files) echo '<p class=e>ما في رسائل بعد.</p>';
foreach($files as $f){
  $raw=file_get_contents($f);$s='';$display=$raw;
  if(preg_match('/^Subject:\s*(.*)$/mi',$raw,$m)){$s=trim($m[1]);if(function_exists('mb_decode_mimeheader'))$s=mb_decode_mimeheader($s);}
  $parts=preg_split('/\r?\n\r?\n/',$raw,2);
  if(is_array($parts)&&count($parts)===2&&preg_match('/^Content-Transfer-Encoding:\s*base64$/mi',$parts[0])){$decoded=base64_decode(preg_replace('/\s+/','',$parts[1]),true);if(is_string($decoded))$display=$parts[0]."\n\n".$decoded;}
  echo '<h2>'.htmlspecialchars($s,ENT_QUOTES|ENT_SUBSTITUTE,'UTF-8').'</h2><pre>'.htmlspecialchars($display,ENT_QUOTES|ENT_SUBSTITUTE,'UTF-8').'</pre>';
}
PHP

echo "▶︎ تشغيل السيرفر…"
docker run -d --rm --name "$CONTAINER" \
  --publish 127.0.0.1:8123:8123 \
  --mount "type=bind,src=$W,dst=/app,readonly" \
  --mount "type=bind,src=$W/mail,dst=/app/mail" \
  --workdir /app \
  --read-only \
  --tmpfs /tmp:rw,noexec,nosuid,nodev,mode=1777,size=16m \
  --cap-drop ALL \
  --security-opt no-new-privileges:true \
  --pids-limit 64 \
  --memory 128m \
  --cpus 0.50 \
  --user "$(id -u):$(id -g)" \
  --env Z2O_RATE_STATE_DIR=/tmp/z2o-rate-state \
  --env Z2O_TEST_ALLOWED_ORIGIN=http://127.0.0.1:8123 \
  php:8.2-cli \
  php -c /app/.user.ini -d sendmail_path=/app/catchmail.sh -S 0.0.0.0:8123 >/dev/null
READY=0
for _ in $(seq 1 15); do
  if curl --silent --show-error --fail --output /dev/null http://127.0.0.1:8123/en/contact.html; then
    READY=1
    break
  fi
  sleep 1
done
if [ "$READY" -ne 1 ]; then
  echo "✗ خادم الاختبار لم يصبح جاهزًا." >&2
  docker logs "$CONTAINER" >&2 || true
  exit 1
fi
open "http://127.0.0.1:8123/ar/contact.html"
open "http://127.0.0.1:8123/inbox.php"
echo ""
echo "════════════════════════════════════════════════════"
echo "  ✅ جاهز! افتح بالمتصفح:"
echo "     الفورم:       http://127.0.0.1:8123/ar/contact.html"
echo "     (إنجليزي):    http://127.0.0.1:8123/en/contact.html"
echo "     صندوق الوارد: http://127.0.0.1:8123/inbox.php"
echo ""
echo "  عبّي الفورم واضغط إرسال، وشوف الإيميل بصندوق الوارد."
echo "  اضغط Ctrl+C هون لإيقاف السيرفر."
echo "════════════════════════════════════════════════════"
while docker ps --filter "name=^/${CONTAINER}$" --format '{{.Names}}' | grep -Fxq "$CONTAINER"; do sleep 3; done
