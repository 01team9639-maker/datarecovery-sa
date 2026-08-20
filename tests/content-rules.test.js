/* ==========================================================================
   Content rules — the invariants the site audit was written against.

   These are the rules that were being broken by hand-maintained duplicates
   before the content was centralised, so they are asserted on the GENERATED
   output rather than on the source: what ships is what matters.

   Run: node --test tests/content-rules.test.js
   ========================================================================== */
const test = require("node:test");
const assert = require("node:assert");
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
// blog/ مستثنى: تبنيه Hugo بخط نشر منفصل له ثماني بوابات خاصة به، منها
// check_seo الذي يفرض القواعد نفسها. فحصه هنا يعني قاعدتين لمصدر واحد
// تنحرفان، وفشلًا في اختبار الموقع سببه ملف لا يملكه هذا المستودع.
const SKIP_DIRS = new Set(["node_modules", ".git", "build", "tests", "design", "dist", "assets", "blog"]);

function htmlFiles(dir = ROOT, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith(".") || SKIP_DIRS.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) htmlFiles(full, out);
    else if (entry.name.endsWith(".html")) out.push(full);
  }
  return out;
}

const PAGES = htmlFiles();
const rel = (p) => path.relative(ROOT, p);
const read = (p) => fs.readFileSync(p, "utf8");
// Strip tags so assertions run against what a visitor actually reads.
const textOf = (html) => html
  .replace(/<script[\s\S]*?<\/script>/gi, " ")
  .replace(/<style[\s\S]*?<\/style>/gi, " ")
  .replace(/<[^>]+>/g, " ");

test("generated pages exist", () => {
  assert.ok(PAGES.length >= 20, `expected the full site, found ${PAGES.length} pages`);
});

/* The client's hard rule: every numeral on the site, Arabic pages included, is
   written in Latin digits. Arabic-Indic digits used to creep in through
   hand-edited copy, which is exactly what this catches. */
test("no Arabic-Indic numerals anywhere", () => {
  const bad = [];
  for (const p of PAGES) {
    const m = textOf(read(p)).match(/[٠-٩۰-۹]/g);
    if (m) bad.push(`${rel(p)} → ${[...new Set(m)].join("")}`);
  }
  assert.deepStrictEqual(bad, [], `Arabic-Indic numerals found:\n${bad.join("\n")}`);
});

/* Exactly one h1 per page — the heading-hierarchy finding in the technical report. */
test("exactly one h1 per page", () => {
  const bad = [];
  for (const p of PAGES) {
    const n = (read(p).match(/<h1[\s>]/g) || []).length;
    if (n !== 1) bad.push(`${rel(p)} has ${n}`);
  }
  assert.deepStrictEqual(bad, [], `pages without exactly one h1:\n${bad.join("\n")}`);
});

/* Every internal link must resolve on disk. This is the check that would have
   caught the two homepage rows pointing at the wrong service pages, and it is
   the standing guard against re-introducing the 404s the audit was about. */
test("every internal link resolves", () => {
  const bad = [];
  for (const p of PAGES) {
    const hrefs = [...read(p).matchAll(/href="(\/[^"#?]*)"/g)].map((m) => m[1]);
    for (const href of new Set(hrefs)) {
      if (href.startsWith("/assets/")) continue;
      const target = href.endsWith("/") ? path.join(ROOT, href, "index.html") : path.join(ROOT, href);
      if (!fs.existsSync(target)) bad.push(`${rel(p)} → ${href}`);
    }
  }
  assert.deepStrictEqual(bad, [], `broken internal links:\n${bad.join("\n")}`);
});

/* Search engines truncate beyond these lengths; the audit found several pages
   over the limit once the new content landed. */
test("meta titles and descriptions stay within search limits", () => {
  const bad = [];
  for (const p of PAGES) {
    const html = read(p);
    const title = (html.match(/<title>([^<]*)<\/title>/) || [])[1] || "";
    const desc = (html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || "";
    if (title.length > 65) bad.push(`${rel(p)} title ${title.length} chars`);
    if (desc.length > 165) bad.push(`${rel(p)} description ${desc.length} chars`);
    if (!desc) bad.push(`${rel(p)} has no meta description`);
  }
  assert.deepStrictEqual(bad, [], `over-length or missing metadata:\n${bad.join("\n")}`);
});

/* The audit's headline finding: the same figure described two different ways on
   different pages (+50K as "cases handled" on the homepage but "files recovered"
   on the service pages). Every figure now renders from claims{} in site.js, so
   each value must carry exactly one label across the whole site. */
test("each headline figure carries one consistent label", () => {
  const { claims, ui } = require("../build/site.js");
  for (const lang of ["ar", "en"]) {
    const labels = Object.values(claims).map((c) => c[lang]);
    const values = Object.values(claims).map((c) => c.v);
    const pages = PAGES.filter((p) => (lang === "en") === rel(p).startsWith("en/"));
    for (const p of pages) {
      const text = textOf(read(p));
      values.forEach((v, i) => {
        // Where a figure appears, the label paired with it must be the only one used.
        if (!text.includes(v)) return;
        const others = labels.filter((_, j) => j !== i);
        for (const other of others) {
          const nearby = new RegExp(`${v.replace(/[+.*?^${}()|[\]\\]/g, "\\$&")}\\s*${other.replace(/[+.*?^${}()|[\]\\]/g, "\\$&")}`);
          assert.ok(!nearby.test(text), `${rel(p)}: "${v}" is labelled "${other}" but claims{} defines it as "${labels[i]}"`);
        }
      });
    }
    assert.ok(ui[lang].trust.length === 3, `${lang} trust strip should render 3 figures`);
  }
});

/* sameAs feeds the business entity in JSON-LD. A dead profile there is a broken
   identity signal on every page — x.com/osoolrecovery was returning 404. */
/* The rule inverted on 2026-08-20. It used to require the former trading name in
   alternateName so search engines would merge the two entities. The owner chose
   to retire that name outright instead, so the test now guards the opposite: no
   alternateName, and no profile whose handle carries the retired name — a link
   to /osooldatarecovery reintroduces it in the URL, the profile and sameAs. */
test("the retired trading name appears nowhere in identity data", () => {
  const { config } = require("../build/site.js");
  assert.equal(config.alternateNames, undefined,
    "the retired trading name must not be declared as alternateName");
  const named = config.socials.filter((s) => /osool/i.test(s.url));
  assert.deepStrictEqual(named, [],
    "a social profile whose URL carries the retired name is still in sameAs");
});
