"use strict";

const assert = require("node:assert/strict");
const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");
const { execFileSync } = require("node:child_process");

const root = path.resolve(__dirname, "..");
const generated = ["index.html", "send.php", "sitemap.xml", "robots.txt"];

function collectHtml(relative) {
  for (const entry of fs.readdirSync(path.join(root, relative), { withFileTypes: true })) {
    const child = path.join(relative, entry.name);
    if (entry.isDirectory()) collectHtml(child);
    else if (entry.isFile() && entry.name.endsWith(".html")) generated.push(child);
  }
}

function digest() {
  const hash = crypto.createHash("sha256");
  for (const relative of [...generated].sort()) {
    hash.update(relative);
    hash.update("\0");
    hash.update(fs.readFileSync(path.join(root, relative)));
    hash.update("\0");
  }
  return hash.digest("hex");
}

// Arabic sits at the site root; English under /en/.
generated.push("contact.html", "privacy.html", "llms.txt");
collectHtml("services");
collectHtml("en");
const before = digest();
execFileSync(process.execPath, ["build/generate.js"], { cwd: root, stdio: "pipe" });
const after = digest();
assert.equal(after, before, "page generation must be deterministic and leave committed output current");
console.log(`PASS: generator is idempotent for ${generated.length} generated artifacts (${after.slice(0, 16)}…).`);
