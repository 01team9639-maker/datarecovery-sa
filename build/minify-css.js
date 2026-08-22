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

/** Rewrite every `<name>.css` in assets/css as `<name>.min.css`. */
function buildMinifiedCss(root) {
  const dir = path.join(root, "assets", "css");
  for (const file of fs.readdirSync(dir).sort()) {
    if (!file.endsWith(".css") || file.endsWith(".min.css")) continue;
    const src = fs.readFileSync(path.join(dir, file), "utf8");
    const target = path.join(dir, file.replace(/\.css$/, ".min.css"));
    const next = minifyCss(src) + "\n";
    // Only touch the file when it changes, so mtimes stay stable across runs.
    let current = null;
    try { current = fs.readFileSync(target, "utf8"); } catch (e) { /* first run */ }
    if (current !== next) fs.writeFileSync(target, next);
  }
}

module.exports = { minifyCss, buildMinifiedCss };
