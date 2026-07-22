"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.join(__dirname, "..");
const read = (relative) => fs.readFileSync(path.join(root, relative), "utf8");
const htmlFiles = [];

function collectHtml(relative) {
  const absolute = path.join(root, relative);
  for (const entry of fs.readdirSync(absolute, { withFileTypes: true })) {
    const child = path.join(relative, entry.name);
    if (entry.isDirectory()) collectHtml(child);
    else if (entry.isFile() && entry.name.endsWith(".html")) htmlFiles.push(child);
  }
}

htmlFiles.push("index.html");
collectHtml("ar");
collectHtml("en");

for (const file of htmlFiles) {
  const html = read(file);
  assert.equal(/<script\b(?![^>]*\bsrc=)(?![^>]*type="application\/ld\+json")[^>]*>/i.test(html), false, `${file} has executable inline script`);
  assert.equal(/<style(?:\s|>)/i.test(html), false, `${file} has an inline style block`);
  assert.equal(/\sstyle\s*=/i.test(html), false, `${file} has an inline style attribute`);
  assert.equal(/\son[a-z]+\s*=/i.test(html), false, `${file} has an inline event handler`);
}

const firstPartyJs = ["assets/js/bootstrap.js", "assets/js/lang-redirect.js", "assets/js/main.js", "assets/js/anim.js"]
  .map(read)
  .join("\n");
assert.equal(/\b(?:innerHTML|outerHTML|insertAdjacentHTML|document\.write)\b/.test(firstPartyJs), false, "first-party runtime JS has an HTML injection sink");
assert.equal(/\b(?:eval|Function)\s*\(/.test(firstPartyJs), false, "first-party runtime JS has a dynamic code sink");

const php = read("send.php");
const admission = php.indexOf("$rate = rate_limit_admit(");
const firstMail = php.indexOf("@mail(");
assert.ok(admission > 0 && firstMail > admission, "atomic admission must occur before the first mail side effect");
assert.ok(php.includes("flock($lock, LOCK_EX)"), "rate state must use one exclusive lock");
assert.ok(php.includes("rate_write_state($directory, $stateFile, $state);"), "admission must persist state atomically");
assert.ok(php.includes("hash_hmac('sha256', $ip, $ipSecret)"), "persisted IP fingerprints must use a private HMAC key");
assert.equal(php.includes("$rateFile"), false, "legacy unlocked per-IP file limiter must be absent");
assert.ok(php.includes("$MAX_POST + 1"), "raw JSON reads must be bounded before parsing");
assert.equal(/HTTP_(?:X_FORWARDED_FOR|FORWARDED|CF_CONNECTING_IP)/.test(php), false, "untrusted forwarding headers must not select the client bucket");
assert.ok(php.includes("header_remove('X-Powered-By')"), "handler must suppress the PHP version response header");
assert.equal(php.includes("X-Mailer: PHP/"), false, "mail must not disclose the PHP runtime version");
assert.ok(php.includes("HTTP_SEC_FETCH_SITE") && php.includes("HTTP_ORIGIN"), "handler must reject browser cross-site submissions");
assert.equal(php.includes("HTTP_HOST"), false, "Origin checks must use a fixed allowlist instead of an attacker-controlled Host header");
assert.ok(php.includes("Content-Transfer-Encoding: base64"), "UTF-8 mail bodies must use bounded standard MIME encoding");
assert.ok(php.includes("preg_match('//u', $v) === 1"), "UTF-8 validation must work without mbstring");
assert.ok(php.includes("rate_assert_private_location"), "rate state must be rejected inside the document root");

const generator = read("build/generate.js");
assert.ok(generator.includes("\\u003C"), "JSON-LD serializer must escape script-closing characters");
assert.ok(generator.includes("rate_limit_admit("), "durable generator source must contain the rate limiter");

const netlify = read("netlify.toml");
const cspLine = netlify.split("\n").find((line) => line.includes("Content-Security-Policy")) || "";
assert.ok(cspLine.includes("script-src 'self'"), "CSP must restrict scripts to self");
assert.ok(cspLine.includes("style-src 'self'"), "CSP must restrict styles to self");
assert.ok(cspLine.includes("require-trusted-types-for 'script'"), "CSP must enforce Trusted Types for script sinks");
assert.equal(cspLine.includes("unsafe-inline"), false, "CSP must not allow unsafe-inline");
assert.equal(cspLine.includes("unsafe-eval"), false, "CSP must not allow unsafe-eval");
assert.ok(netlify.includes('publish = "dist/netlify"'), "Netlify must publish an allowlisted output, never the repository root");
assert.ok(netlify.includes("node build/package-deploy.js netlify"), "Netlify must build the static deployment allowlist");
assert.equal(/vendor\/\*"[\s\S]{0,180}immutable/.test(netlify), false, "non-versioned vendor JS must not receive immutable caching");

const apache = read(".htaccess");
const apacheCsp = apache.match(/Header always set Content-Security-Policy "([^"]+)"/);
const netlifyCsp = cspLine.match(/Content-Security-Policy = "([^"]+)"/);
assert.ok(apacheCsp && netlifyCsp, "both PHP and Netlify deployments must define CSP");
assert.equal(apacheCsp[1], netlifyCsp[1], "Hostinger and Netlify CSP policies must remain identical");
assert.ok(apache.includes('Header always set Strict-Transport-Security "max-age=31536000"'), "Hostinger deployment must send HSTS");
assert.ok(apache.includes("RewriteRule (^|/)\\.(?!well-known"), "Hostinger deployment must deny hidden files except ACME challenges");

const deployBuilder = read("build/package-deploy.js");
assert.ok(deployBuilder.includes('"hostinger"') && deployBuilder.includes('"netlify"'), "deployment builder must define both supported targets");
assert.ok(deployBuilder.includes('"send.php"') && deployBuilder.includes('".htaccess"') && deployBuilder.includes('".user.ini"'), "PHP deployment must explicitly include its handler and server rules");
assert.ok(deployBuilder.includes("isSymbolicLink"), "deployment builder must reject symbolic links");
assert.ok(deployBuilder.includes("publicAssetExtensions") && deployBuilder.includes("Refusing hidden deployment input"), "deployment builder must reject future hidden or unexpected files inside public trees");

const localTest = read("test-form.command");
assert.ok(localTest.includes("127.0.0.1:8123:8123"), "local test port must bind only to loopback");
assert.ok(localTest.includes("mktemp -d"), "local test workspace must be unpredictable");
assert.equal(localTest.includes("W=/private/tmp/z2o-formtest"), false, "predictable local test workspace must be absent");
assert.ok(localTest.includes("curl --silent --show-error --fail"), "local test server must pass a readiness check before opening the browser");

const phpIni = read(".user.ini");
assert.ok(phpIni.includes("post_max_size = 64K"), "PHP must reject oversized form bodies before application parsing");
assert.ok(phpIni.includes("expose_php = Off"), "PHP runtime version disclosure must be disabled at configuration level");

const hostingerDist = path.join(root, "dist", "hostinger");
const netlifyDist = path.join(root, "dist", "netlify");
if (fs.existsSync(hostingerDist) && fs.existsSync(netlifyDist)) {
  assert.ok(fs.existsSync(path.join(hostingerDist, "send.php")), "Hostinger package must contain the PHP handler");
  assert.ok(fs.existsSync(path.join(hostingerDist, ".htaccess")) && fs.existsSync(path.join(hostingerDist, ".user.ini")), "Hostinger package must contain server hardening files");
  for (const forbidden of ["send.php", ".htaccess", ".user.ini", "build", "tests", "design"]) {
    assert.equal(fs.existsSync(path.join(netlifyDist, forbidden)), false, `Netlify package must exclude ${forbidden}`);
  }
}

console.log(`PASS: strict CSP, allowlisted deployment, ${htmlFiles.length} HTML files without executable inline code, atomic limiter ordering, bounded body reads, and loopback-only tooling.`);
