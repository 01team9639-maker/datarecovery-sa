#!/bin/bash
# =============================================================================
# Redirect-map test — boots a real Apache against the Hostinger deploy package
# and asserts that every legacy URL lands on the right page.
#
# This exists because the rules are order-sensitive and encoding-sensitive, and
# both bugs are invisible by reading:
#   * the generic /ar/ strip is [L], so it silently swallows the Arabic-slug
#     rules if they are placed after it, turning one 404 into another;
#   * in .htaccess context Apache matches the DECODED path, so a percent-encoded
#     Arabic pattern (%D9%87%D8%A7...) never matches anything, ever.
# Both were caught here, not by review.
#
# Run: bash tests/redirect-map.sh
# =============================================================================
set -u
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PORT=8098
WORK=$(mktemp -d /tmp/redirect-map.XXXXXX)
B="http://127.0.0.1:$PORT"
pass=0; fail=0

if [ ! -x /usr/sbin/httpd ] || [ ! -f /usr/libexec/apache2/mod_rewrite.so ]; then
  echo "SKIP: Apache with mod_rewrite not available on this machine."
  exit 0
fi

cleanup() { /usr/sbin/httpd -f "$WORK/httpd.conf" -k stop 2>/dev/null; sleep 1; rm -rf "$WORK"; }
trap cleanup EXIT

# Test the real artifact, not the working tree: this is what gets uploaded.
( cd "$ROOT" && node build/generate.js >/dev/null && node build/package-deploy.js hostinger >/dev/null ) || { echo "build failed"; exit 1; }
mkdir -p "$WORK/site" "$WORK/logs"
cp -R "$ROOT/dist/hostinger/." "$WORK/site/"
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

enc() { python3 -c "import urllib.parse,sys; print(urllib.parse.quote(sys.argv[1]))" "$1"; }

# expect <path> <status> [redirect-target]
expect() {
  local path="$1" want_code="$2" want_to="${3:-}"
  local code to
  code=$(curl -s -o /dev/null -m 8 -w '%{http_code}' "$B$path")
  to=$(curl -s -o /dev/null -m 8 -w '%{redirect_url}' "$B$path" | sed "s|$B||")
  if [ "$code" = "$want_code" ] && { [ -z "$want_to" ] || [ "$to" = "$want_to" ]; }; then
    pass=$((pass+1))
  else
    fail=$((fail+1))
    echo "  FAIL $path"
    echo "       want: $want_code $want_to"
    echo "       got:  $code $to"
  fi
}

echo "Legacy URLs confirmed in Google's index (2026-08-12):"
expect "/ar/$(enc 'raid-استعادة-البيانات-من-أنظمة')/" 301 /services/raid-servers.html
expect "/ar/$(enc 'كيف-تستعيد-بياناتك-من-قرص-صلب-هارد-ديسك')/" 301 /services/hdd.html
expect "/hard-drive-data-recovery/" 301 /services/hdd.html
expect "/solid-state-drive-data-recovery-services/" 301 /services/ssd-nvme.html

echo "Arabic keyword map:"
expect "/ar/$(enc 'استعادة-البيانات-بعد-فيروس-الفدية')/" 301 /services/ransomware.html
expect "/ar/$(enc 'استرجاع-بيانات-الجوال')/" 301 /services/phones.html
expect "/ar/$(enc 'استعادة-تسجيلات-كاميرا-مراقبة')/" 301 /services/cctv.html
expect "/ar/$(enc 'استرجاع-فلاش-ميموري')/" 301 /services/memory-cards.html

echo "English keyword map:"
expect "/ransomware-recovery/" 301 /services/ransomware.html
expect "/raid-data-recovery/" 301 /services/raid-servers.html
expect "/sd-card-recovery/" 301 /services/memory-cards.html
expect "/mobile-phone-recovery/" 301 /services/phones.html
expect "/cctv-dvr-recovery/" 301 /services/cctv.html
expect "/nvme-ssd-services/" 301 /services/ssd-nvme.html

echo "Generic /ar/ strip still works:"
expect "/ar/" 301 /
expect "/ar/contact.html" 301 /contact.html

echo "Live pages must never be hijacked:"
for p in / /en/ /contact.html /privacy.html /404.html \
         /services/hdd.html /services/phones.html /services/memory-cards.html \
         /cities/riyadh.html /cities/jeddah.html /cities/dammam.html \
         /articles/ /articles/what-is-raid.html /en/articles/ /en/cities/dammam.html \
         /assets/css/main.css /sitemap.xml /robots.txt /llms.txt; do
  expect "$p" 200
done

echo "/blog/ is reserved for the separate Hugo blog — the keyword map must not touch it:"
# The blog now ships inside the deploy package, so its index must serve.
expect "/blog/" 200
# A missing blog URL containing a service word must fall to the blog's own 404 —
# never a 301 into /services/. That redirect would silently swallow every typo
# and broken link inside the blog.
expect "/blog/what-is-raid/" 404

echo "Unrelated junk falls through to the 404 page, not a soft redirect:"
expect "/wp-admin/" 404
expect "/some/random/path" 404

echo "Source and config stay unreachable:"
expect "/build/site.js" 404
expect "/tests/redirect-map.sh" 404
expect "/.htaccess" 404

echo "Security headers are present:"
for h in Content-Security-Policy Strict-Transport-Security X-Frame-Options X-Content-Type-Options Referrer-Policy; do
  if curl -sI -m 8 "$B/" | grep -qi "^$h:"; then pass=$((pass+1)); else fail=$((fail+1)); echo "  FAIL missing header: $h"; fi
done

echo "Custom 404 page is served with the service list:"
if [ "$(curl -s -m 8 "$B/nope-xyz" | grep -c 'service__title')" -ge 6 ]; then pass=$((pass+1)); else fail=$((fail+1)); echo "  FAIL 404 page did not list the services"; fi

echo
echo "PASS: $pass   FAIL: $fail"
[ "$fail" -eq 0 ]
