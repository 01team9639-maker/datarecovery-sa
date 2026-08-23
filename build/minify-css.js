/* ==========================================================================
   CSS minifier — comments and insignificant whitespace only.

   main.css is authored by hand and stays the source of truth; this writes the
   `.min.css` that pages actually link. Deliberately conservative: quoted
   strings (the inline SVG data URI among them) are copied byte for byte, and
   whitespace is only dropped around `{ } ; ,` plus after `:`. Space *before*
   a colon is left alone because `.a :hover` and `.a:hover` are different
   selectors, and no byte count is worth that class of bug.
   ========================================================================== */
"use strict";
const fs = require("fs");
const path = require("path");

function squeeze(text) {
  return text
    .replace(/\s+/g, " ")
    .replace(/ *([{};,]) */g, "$1")
    .replace(/: +/g, ":")
    .replace(/;}/g, "}");
}

function minifyCss(css) {
  let out = "";
  let buf = "";
  let i = 0;
  const n = css.length;
  const flush = () => { out += squeeze(buf); buf = ""; };

  while (i < n) {
    const c = css[i];
    if (c === '"' || c === "'") {
      flush();
      let j = i + 1;
      while (j < n && css[j] !== c) { j += css[j] === "\\" ? 2 : 1; }
      out += css.slice(i, Math.min(j + 1, n));
      i = j + 1;
      continue;
    }
    if (c === "/" && css[i + 1] === "*") {
      const end = css.indexOf("*/", i + 2);
      // A comment separates tokens (`1px/*x*/solid`), so it becomes a space
      // rather than nothing; the squeeze collapses it wherever it was noise.
      buf += " ";
      i = end === -1 ? n : end + 2;
      continue;
    }
    buf += c;
    i++;
  }
  flush();
  return out.trim();
}

/** Build the single stylesheet the pages link.
 *
 * fonts.css is folded in ahead of main.css instead of shipping as its own
 * <link>. It was a second render-blocking request for 1.9 KB, and Lighthouse
 * charged it ~150 ms; the @font-face rules only carry relative `../fonts/`
 * URLs, which resolve identically from the same directory. Order matters —
 * the faces must be declared before anything asks for the family. */
function buildMinifiedCss(root) {
  const dir = path.join(root, "assets", "css");
  const read = (name) => fs.readFileSync(path.join(dir, name), "utf8");
  const bundle = minifyCss(read("fonts.css")) + "\n" + minifyCss(read("main.css")) + "\n";

  const target = path.join(dir, "main.min.css");
  let current = null;
  try { current = fs.readFileSync(target, "utf8"); } catch (e) { /* first run */ }
  // Only touch the file when it changes, so mtimes stay stable across runs.
  if (current !== bundle) fs.writeFileSync(target, bundle);

  // fonts.min.css was its own file before the bundle; leaving it behind would
  // ship a stylesheet nothing links.
  const stale = path.join(dir, "fonts.min.css");
  if (fs.existsSync(stale)) fs.unlinkSync(stale);
}

module.exports = { minifyCss, buildMinifiedCss };
