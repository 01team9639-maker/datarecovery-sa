/* ==========================================================================
   Emit the site's chrome as Hugo partials for the blog.

   The blog is a separate Hugo site living at /blog/, and the owner's rule is
   that its header, drawer, burger and footer are the site's — identical, not a
   lookalike. A visitor moving from an article to a service page must not feel
   they changed websites.

   The reference implementation this blog is adapted from solves that by
   SCRAPING the chrome out of a rendered HTML page, because that site is
   hand-written HTML with no generator. It has to count <div> balance to find
   where each block ends, and it breaks whenever the markup shifts.

   We do not have that problem: this site's chrome comes from header() and
   footer() in generate.js, so we emit the partials from the generator itself.
   No parsing, no div counting, nothing to drift.

   URLs are written ABSOLUTE against BASE rather than root-relative. The blog
   may be previewed on a different host, where a root-relative /assets/... path
   silently 404s and the page renders unstyled. Absolute URLs also mean a
   visitor who already loaded the site's CSS gets a cache hit instead of a
   second download — the asset hashes are carried through unchanged.

   Run: node build/emit-chrome.js [path-to-blog-build]
   Default target: ../datarecovery-blog-build
   ========================================================================== */
const fs = require("fs");
const path = require("path");
const { header, footer, asset, ui, config, BASE, LANGS } = require("./generate");

const target = process.argv[2] || path.join(__dirname, "..", "..", "datarecovery-blog-build");
const outDir = path.join(target, "layouts", "partials", "site");

// Root-relative -> absolute, so previews on another host still resolve.
const absolutise = (html) =>
  html
    .replace(/(href|src)="\/(?!\/)/g, `$1="${BASE}/`)
    .replace(/url\(\/(?!\/)/g, `url(${BASE}/`);

function splitHeader(html) {
  // header() returns: <header>…</header> then the floating burger, the scrim,
  // the drawer and the WhatsApp button. The blog needs them as two partials:
  // the bar at the top, and everything that floats above the page.
  const end = html.indexOf("</header>");
  if (end === -1) throw new Error("emit-chrome: could not find </header> — header() markup changed");
  const cut = end + "</header>".length;
  return { navbar: html.slice(0, cut).trim(), nav: html.slice(cut).trim() };
}

function write(rel, content) {
  const full = path.join(outDir, rel);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content.endsWith("\n") ? content : content + "\n");
  console.log("  ✓", path.relative(target, full), `(${(content.length / 1024).toFixed(1)}kb)`);
}

function build() {
  if (!fs.existsSync(target)) {
    console.error(`emit-chrome: target not found: ${target}`);
    process.exit(1);
  }
  console.log(`Emitting site chrome → ${path.relative(process.cwd(), outDir)}`);

  for (const lang of LANGS) {
    const { navbar, nav } = splitHeader(absolutise(header(lang)));
    // __LANGSWITCH__ is left in place deliberately: the blog fills it per page
    // with that article's translated URL, which only Hugo knows.
    write(`navbar-${lang}.html`, navbar);
    write(`nav-${lang}.html`, nav);
    write(`footer-${lang}.html`, absolutise(footer(lang)));
    write(`bodyattrs-${lang}.txt`, "");
  }

  // The stylesheet and script tags, with the same content hashes the site uses,
  // so the browser reuses what it already cached from the main site.
  const css = [
    `<link rel="preload" href="${BASE}/assets/fonts/alexandria-arabic.woff2" as="font" type="font/woff2" crossorigin>`,
    `<link rel="preload" href="${BASE}/assets/fonts/alexandria-latin.woff2" as="font" type="font/woff2" crossorigin>`,
    `<link rel="stylesheet" href="${BASE}${asset("assets/css/fonts.css")}">`,
    `<link rel="stylesheet" href="${BASE}${asset("assets/css/main.css")}">`,
  ].join("\n");
  write("../site-css.html", css);

  // main.js ONLY — and this is load-bearing, not an optimisation:
  //
  //   * bootstrap.js is deliberately excluded. All it does is add `.js` to
  //     <html>, which switches on rules like `.js .footer__cta`,
  //     `.js .footer__contacts`, `.js .footer__bottom { opacity: 0 }`. On the
  //     site those are revealed by anim.js/GSAP scroll triggers. The blog has
  //     no scroll-reveal layer, so shipping bootstrap.js here would hide the
  //     whole footer permanently. Without it the CSS falls back to fully
  //     visible, which is the progressive-enhancement default the site was
  //     built around.
  //   * GSAP + ScrollTrigger + anim.js are excluded with it — roughly 115 KB
  //     of JavaScript whose only job is animation the blog does not have.
  //
  // main.js itself depends on neither `.js` nor GSAP; it drives the drawer,
  // the floating burger and the footer's local-time clock, so the chrome stays
  // fully interactive.
  //
  // analytics.js ships too, and from the site's own file rather than a Hugo
  // partial. The blog previously wrote its own inline <script>, which the
  // domain-wide CSP (`script-src 'self' https://www.googletagmanager.com`,
  // no 'unsafe-inline') silently blocked — so the blog measured nothing at
  // all from launch. A same-origin file passes the policy, and sharing the
  // site's copy means one GTM container, one loading strategy, and no chance
  // of the two halves counting differently.
  const scripts = [
    `<script src="${BASE}${asset("assets/js/main.js")}" defer></script>`,
    config.gtm ? `<script src="${BASE}${asset("assets/js/analytics.js")}" async></script>` : "",
  ].filter(Boolean).join("\n");
  write("../site-scripts.html", scripts);

  // A manifest the blog's drift check reads: if the site's chrome changes and
  // nobody re-runs this script, the blog keeps shipping the old header. The
  // check compares these hashes and fails the build instead of drifting quietly.
  const crypto = require("crypto");
  const files = fs.readdirSync(outDir).filter((f) => f !== "chrome.lock.json");
  const lock = {
    generatedFrom: BASE,
    note: "Regenerate with: node build/emit-chrome.js <blog-build path>",
    files: Object.fromEntries(files.sort().map((f) => [
      f, crypto.createHash("sha256").update(fs.readFileSync(path.join(outDir, f))).digest("hex").slice(0, 16)
    ])),
  };
  write("chrome.lock.json", JSON.stringify(lock, null, 2));

  console.log("Done.");
}

build();
