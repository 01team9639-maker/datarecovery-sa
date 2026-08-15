#!/bin/bash
# =============================================================================
# اختبار سلامة النشر بمزامنة Git
#
# الرفع اليدوي ينشر `dist/hostinger/` — قائمة سماح لا تحوي مصدرًا أصلًا، فلا
# خطر فيها. أما مزامنة Git في Hostinger فتنشر **المستودع كاملًا** إلى
# public_html: build/ و tests/ و design/ و README وكل شيء.
#
# فينتقل الوضع من «المصدر غير موجود على الخادم» إلى «موجود ومحجوب بملف واحد».
# هذا الاختبار يتحقق أن الحجب يعمل فعلًا — لا أنه مكتوب فقط.
#
# يخدم **جذر المستودع** تحت Apache حقيقي، تمامًا كما ستفعل المزامنة، ويؤكد أن
# كل مسار مصدري يرجع 404 أو 403 بينما تبقى كل صفحة عامة تعمل.
#
# شغّله قبل ربط المزامنة، وبعد أي تعديل على .htaccess.
#
# Run: bash tests/git-sync-safety.sh
# =============================================================================
set -u
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PORT=8097
WORK=$(mktemp -d /tmp/git-sync-safety.XXXXXX)
B="http://127.0.0.1:$PORT"
pass=0; fail=0

if [ ! -x /usr/sbin/httpd ] || [ ! -f /usr/libexec/apache2/mod_rewrite.so ]; then
  echo "SKIP: Apache with mod_rewrite not available on this machine."
  exit 0
fi

cleanup() { /usr/sbin/httpd -f "$WORK/httpd.conf" -k stop 2>/dev/null; sleep 1; rm -rf "$WORK"; }
trap cleanup EXIT

# نسخة من المستودع كما يراه Git — لا حزمة النشر. هذا هو ما سيصل الخادم.
mkdir -p "$WORK/site" "$WORK/logs"
( cd "$ROOT" && git ls-files -z | while IFS= read -r -d '' f; do
    mkdir -p "$WORK/site/$(dirname "$f")"; cp "$ROOT/$f" "$WORK/site/$f"
  done )
chmod -R a+rX "$WORK"

cat > "$WORK/httpd.conf" << EOF
ServerName 127.0.0.1
Listen $PORT
PidFile $WORK/httpd.pid
ErrorLog $WORK/logs/error.log
CustomLog $WORK/logs/access.log common
LoadModule mpm_event_module /usr/libexec/apache2/mod_mpm_event.so
LoadModule authz_core_module /usr/libexec/apache2/mod_authz_core.so
LoadModule unixd_module /usr/libexec/apache2/mod_unixd.so
LoadModule log_config_module /usr/libexec/apache2/mod_log_config.so
LoadModule mime_module /usr/libexec/apache2/mod_mime.so
LoadModule dir_module /usr/libexec/apache2/mod_dir.so
LoadModule alias_module /usr/libexec/apache2/mod_alias.so
LoadModule rewrite_module /usr/libexec/apache2/mod_rewrite.so
LoadModule headers_module /usr/libexec/apache2/mod_headers.so
TypesConfig /private/etc/apache2/mime.types
DirectoryIndex index.html
DocumentRoot "$WORK/site"
<Directory "$WORK/site">
    AllowOverride All
    Require all granted
</Directory>
EOF

/usr/sbin/httpd -f "$WORK/httpd.conf" -k start 2>/dev/null
sleep 2

blocked() { # blocked <path>  — 404 أو 403 كلاهما مقبول
  local code; code=$(curl -s -o /dev/null -m 8 -w '%{http_code}' "$B$1")
  case "$code" in
    404|403) pass=$((pass+1)) ;;
    *) fail=$((fail+1)); echo "  ❌ مكشوف: $1 → HTTP $code" ;;
  esac
}
public() {
  local code; code=$(curl -s -o /dev/null -m 8 -w '%{http_code}' "$B$1")
  if [ "$code" = "200" ]; then pass=$((pass+1)); else fail=$((fail+1)); echo "  ❌ صفحة عامة معطّلة: $1 → HTTP $code"; fi
}

echo "كل ملف مصدري في المستودع يجب أن يكون محجوبًا:"
# يُشتق من Git لا من قائمة مكتوبة يدويًّا: أي ملف مصدري جديد يُفحص تلقائيًّا.
while IFS= read -r f; do blocked "/$f"; done < <(
  cd "$ROOT" && git ls-files | grep -E '^(build|tests|design)/|\.md$|\.command$|\.toml$|^\.'
)

echo "ومسارات المجلدات نفسها:"
for d in /build/ /tests/ /design/ /build /tests /design; do blocked "$d"; done

echo "بينما تبقى الصفحات العامة تعمل:"
for p in / /en/ /contact.html /privacy.html /404.html \
         /services/hdd.html /services/phones.html /cities/riyadh.html \
         /articles/ /assets/css/main.css /sitemap.xml /robots.txt /llms.txt; do
  public "$p"
done

echo
echo "PASS: $pass   FAIL: $fail"
if [ "$fail" -ne 0 ]; then
  echo
  echo "⚠️  لا تربط مزامنة Git قبل إصلاح ما سبق — الملفات أعلاه ستصير عامة على الإنترنت."
fi
[ "$fail" -eq 0 ]
