/* ==========================================================================
   Derivatives for the service hero photographs.

   Input : design/service-images/<slug>.<png|jpg|jpeg|webp>   (one per service)
   Output: assets/img/services/<slug>-{480,800,1200}.{webp,avif}

   Why three widths and not one: the hero is the largest element above the fold
   on a service page, so it is the LCP candidate. A phone rendering it at ~360
   CSS pixels has no business downloading the desktop file — that single choice
   saves more than every other image tweak combined.

   Why AVIF and WebP and no JPEG fallback: every browser that reaches this site
   supports WebP. Carrying a JPEG chain would add a third encode and a larger
   file for nobody.

   The source images are cropped square by the pipeline, because the hero slot
   is square on every breakpoint. Cropping here rather than in CSS means the
   bytes for the discarded edges are never sent.

   Run: node build/make-service-images.js
   ========================================================================== */
"use strict";

const fs = require("node:fs");
const path = require("node:path");
const { execFileSync } = require("node:child_process");

const root = path.resolve(__dirname, "..");
const sourceDir = path.join(root, "design", "service-images");
const outDir = path.join(root, "assets", "img", "services");
const WIDTHS = [480, 800, 1200];
const SLUGS = require("./services").map((s) => s.slug);

function has(binary) {
  try { execFileSync("command", ["-v", binary], { shell: true, stdio: "ignore" }); return true; }
  catch { return false; }
}

if (!fs.existsSync(sourceDir)) {
  console.error(`❌ مجلد المصادر غير موجود: ${path.relative(root, sourceDir)}`);
  process.exit(1);
}

// sips ships with macOS and handles the resize and the WebP encode. cwebp and
// avifenc are optional and produce smaller files when present.
const useCwebp = has("cwebp");
const useAvif = has("avifenc");
if (!useAvif) {
  console.warn("⚠️  avifenc غير متاح — لن تُنتج نسخ AVIF. المتصفح سيقع على WebP، وهو مقبول.");
}

fs.mkdirSync(outDir, { recursive: true });
let made = 0;
const missing = [];

for (const slug of SLUGS) {
  const source = ["png", "jpg", "jpeg", "webp"]
    .map((ext) => path.join(sourceDir, `${slug}.${ext}`))
    .find((candidate) => fs.existsSync(candidate));
  if (!source) { missing.push(slug); continue; }

  for (const width of WIDTHS) {
    const png = path.join(outDir, `.${slug}-${width}.png`);
    // Square crop to the shorter side, then resize. -Z alone would letterbox.
    execFileSync("sips", ["-s", "format", "png", "-c", String(width), String(width),
      source, "--out", png], { stdio: "ignore" });

    const webp = path.join(outDir, `${slug}-${width}.webp`);
    if (useCwebp) execFileSync("cwebp", ["-quiet", "-q", "82", png, "-o", webp]);
    else execFileSync("sips", ["-s", "format", "webp", "-s", "formatOptions", "82", png, "--out", webp], { stdio: "ignore" });

    if (useAvif) {
      execFileSync("avifenc", ["--min", "24", "--max", "34", "-s", "6",
        png, path.join(outDir, `${slug}-${width}.avif`)], { stdio: "ignore" });
    }
    fs.unlinkSync(png);
    made += 1;
  }
  const kb = (w) => (fs.statSync(path.join(outDir, `${slug}-${w}.webp`)).size / 1024).toFixed(0);
  console.log(`  ✓ ${slug.padEnd(14)} ${WIDTHS.map((w) => `${w}px ${kb(w)}KB`).join(" · ")}`);
}

if (missing.length) {
  console.log(`\n  ⏳ بانتظار مصادر: ${missing.join(", ")}`);
  console.log(`     ضع كل صورة باسم السلك في ${path.relative(root, sourceDir)}/`);
}
console.log(`\n✅ ${made} ملفًا في ${path.relative(root, outDir)}/`);
