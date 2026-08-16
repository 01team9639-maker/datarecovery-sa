#!/bin/bash
# =============================================================================
# Post-deploy check against the LIVE site.
#
# Run this after every deploy. On 2026-08-11 the live site was serving none of
# the .htaccess rules — /ar/ returned 404, /.user.ini returned 200, and not one
# security header was present. The rules themselves are correct (proved by
# tests/redirect-map.sh, which runs them under a real Apache); what failed was
# getting the file onto the server. This script tells you which of the two you
# are looking at.
#
# Run: bash tests/live-check.sh [https://datarecovery-sa.com]
# =============================================================================
set -u
SITE="${1:-https://datarecovery-sa.com}"
pass=0; fail=0; htaccess_ok=1

code() { curl -s -o /dev/null -m 15 -w '%{http_code}' "$SITE$1"; }
dest() { curl -s -o /dev/null -m 15 -w '%{redirect_url}' "$SITE$1"; }

check() { # check <label> <actual> <expected>
  if [ "$2" = "$3" ]; then pass=$((pass+1)); printf "  ok    %-46s %s\n" "$1" "$2"
  else fail=$((fail+1)); printf "  FAIL  %-46s got %s, want %s\n" "$1" "$2" "$3"; fi
}

# محجوب = 404 أو 403، والفرق بينهما لا يعني شيئًا للزائر.
# قاعدة إعادة الكتابة تعطي 404، و<FilesMatch> بـRequire all denied تعطي 403،
# وأيّهما يسبق الآخر يختلف بين Apache وLiteSpeed التي تشغّلها Hostinger. اشتراط
# رمز بعينه يجعل الفحص يرسب على فرق في المحرّك لا على ثغرة.
blocked() { # blocked <label> <actual>
  case "$2" in
    404|403) pass=$((pass+1)); printf "  ok    %-46s %s (محجوب)\n" "$1" "$2" ;;
    *) fail=$((fail+1)); printf "  FAIL  %-46s %s — يجب أن يكون محجوبًا\n" "$1" "$2" ;;
  esac
}

echo "Checking $SITE"
echo
echo "1. Is .htaccess in effect at all?"
if curl -sI -m 15 "$SITE/" | grep -qi "^x-frame-options:"; then
  echo "  ok    security headers present — .htaccess is being applied"
  pass=$((pass+1))
else
  echo "  FAIL  no security headers — .htaccess is NOT in effect"
  echo "        Everything below will fail for that one reason. Fix this first:"
  echo "          • hPanel → File Manager → enable 'show hidden files'"
  echo "          • re-upload .htaccess from dist/hostinger/"
  echo "          • if it is present and still ignored, AllowOverride is off —"
  echo "            ask Hostinger support to enable it for the document root"
  fail=$((fail+1)); htaccess_ok=0
fi

echo
echo "2. Pages that must load"
for p in / /en/ /contact.html /privacy.html /404.html \
         /services/hdd.html /services/phones.html /services/memory-cards.html \
         /cities/riyadh.html /cities/jeddah.html /cities/dammam.html \
         /articles/ /en/articles/; do
  check "$p" "$(code "$p")" 200
done

echo
echo "2ب. المدونة — تُبنى بخط نشر منفصل، ففشلها هنا لا يعني عطلًا في الموقع"
for p in /blog/ /blog/en/ /blog/categories/ /blog/sitemap.xml /blog/index.xml; do
  check "$p" "$(code "$p")" 200
done

echo
echo "3. Legacy URLs that must redirect (not 404)"
RAID="/ar/raid-%D8%A7%D8%B3%D8%AA%D8%B9%D8%A7%D8%AF%D8%A9-%D8%A7%D9%84%D8%A8%D9%8A%D8%A7%D9%86%D8%A7%D8%AA-%D9%85%D9%86-%D8%A3%D9%86%D8%B8%D9%85%D8%A9/"
HDD="/ar/%D9%83%D9%8A%D9%81-%D8%AA%D8%B3%D8%AA%D8%B9%D9%8A%D8%AF-%D8%A8%D9%8A%D8%A7%D9%86%D8%A7%D8%AA%D9%83-%D9%85%D9%86-%D9%82%D8%B1%D8%B5-%D8%B5%D9%84%D8%A8-%D9%87%D8%A7%D8%B1%D8%AF-%D8%AF%D9%8A%D8%B3%D9%83/"
check "/ar/ (prefix strip)"          "$(code /ar/)" 301
check "/ar/raid-… (Osool RAID page)" "$(code "$RAID")" 301
check "/ar/كيف-تستعيد-… (Osool HDD)" "$(code "$HDD")" 301
check "/hard-drive-data-recovery/"   "$(code /hard-drive-data-recovery/)" 301
check "/solid-state-drive-…/"        "$(code /solid-state-drive-data-recovery-services/)" 301
[ "$htaccess_ok" = "1" ] && {
  printf "        → /ar/raid-… lands on: %s\n" "$(dest "$RAID")"
  printf "        → /ar/كيف-تستعيد-… lands on: %s\n" "$(dest "$HDD")"
}

echo
echo "4. Nothing private is readable"
blocked "/.user.ini"    "$(code /.user.ini)"
blocked "/.htaccess"    "$(code /.htaccess)"
blocked "/build/site.js" "$(code /build/site.js)"
blocked "/tests/live-check.sh" "$(code /tests/live-check.sh)"
blocked "/design/logo-source.svg" "$(code /design/logo-source.svg)"
blocked "/README.md" "$(code /README.md)"
check "/send.php (GET must be rejected)" "$(code /send.php)" 405

echo
echo "5. Unknown URLs reach the custom 404, not a soft redirect to the homepage"
check "/definitely-not-a-page-xyz" "$(code /definitely-not-a-page-xyz)" 404
if curl -s -m 15 "$SITE/definitely-not-a-page-xyz" | grep -q "service__title"; then
  echo "  ok    the 404 page lists the services"; pass=$((pass+1))
else
  echo "  FAIL  the 404 page is not ours (host default?)"; fail=$((fail+1))
fi

echo
echo "PASS: $pass   FAIL: $fail"
[ "$fail" -eq 0 ]
