"use strict";

const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const targetName = process.argv[2];
const supportedTargets = new Set(["hostinger", "netlify"]);

if (!supportedTargets.has(targetName)) {
  throw new Error("Usage: node build/package-deploy.js <hostinger|netlify>");
}

const distRoot = path.join(root, "dist");
const output = path.join(distRoot, targetName);
if (path.dirname(output) !== distRoot) {
  throw new Error("Refusing to write outside the deployment output directory");
}

const commonAllowlist = [
  "index.html",
  "ar",
  "en",
  "assets",
  "robots.txt",
  "sitemap.xml",
  "site.webmanifest",
  "llms.txt",
];
const targetAllowlist = targetName === "hostinger"
  ? [...commonAllowlist, "send.php", ".htaccess", ".user.ini"]
  : commonAllowlist;

let copiedFiles = 0;
const publicAssetExtensions = new Set([".css", ".js", ".png", ".svg", ".woff2"]);

function assertPublicFile(relative) {
  const portable = relative.split(path.sep).join("/");
  const extension = path.extname(relative).toLowerCase();
  if ((portable.startsWith("ar/") || portable.startsWith("en/")) && extension === ".html") return;
  if (portable.startsWith("assets/") && publicAssetExtensions.has(extension)) return;
  if (targetAllowlist.includes(portable)) return;
  throw new Error(`Refusing unexpected deployment file: ${portable}`);
}

function copyAllowlisted(source, destination) {
  const stat = fs.lstatSync(source);
  if (stat.isSymbolicLink()) {
    throw new Error(`Refusing symbolic link in deployment input: ${path.relative(root, source)}`);
  }
  if (stat.isDirectory()) {
    fs.mkdirSync(destination, { recursive: true, mode: 0o755 });
    for (const entry of fs.readdirSync(source)) {
      if (entry === ".DS_Store") continue;
      if (entry.startsWith(".")) {
        throw new Error(`Refusing hidden deployment input: ${path.relative(root, path.join(source, entry))}`);
      }
      copyAllowlisted(path.join(source, entry), path.join(destination, entry));
    }
    return;
  }
  if (!stat.isFile()) {
    throw new Error(`Refusing non-file deployment input: ${path.relative(root, source)}`);
  }
  assertPublicFile(path.relative(root, source));
  fs.mkdirSync(path.dirname(destination), { recursive: true, mode: 0o755 });
  fs.copyFileSync(source, destination);
  fs.chmodSync(destination, stat.mode & 0o111 ? 0o755 : 0o644);
  copiedFiles += 1;
}

fs.rmSync(output, { recursive: true, force: true });
fs.mkdirSync(output, { recursive: true, mode: 0o755 });

for (const relative of targetAllowlist) {
  const source = path.join(root, relative);
  if (!fs.existsSync(source)) {
    throw new Error(`Missing required deployment input: ${relative}`);
  }
  copyAllowlisted(source, path.join(output, relative));
}

console.log(`Packaged ${copiedFiles} allowlisted files for ${targetName} in ${path.relative(root, output)}/`);
