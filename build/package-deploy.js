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
  // Arabic is the root-level site; English is nested under /en/.
  "index.html",
  "contact.html",
  "about.html",
  "faq.html",
  "privacy.html",
  // Served by ErrorDocument (.htaccess) and Netlify's default 404 handler. It is
  // the safety net for inbound links from the previous site, so it must ship.
  "404.html",
  "services",
  "cities",
  "articles",
  "en",
  "assets",
  "robots.txt",
  "sitemap.xml",
  "site.webmanifest",
  "llms.txt",
];

// The blog is built by a separate Hugo pipeline and pushed into blog/ here, so
// it is absent on a fresh clone and present after any blog deploy. Required
// entries throw when missing; this one must not.
const optionalAllowlist = ["blog"];

// Deliberately never deployed. Listing them explicitly is what lets the check
// below tell "we decided not to ship this" apart from "nobody thought about it".
const privateEntries = [
  "build", "tests", "design", "dist", "node_modules",
  "README.md", "LIBRARIES.md", "netlify.toml", "test-form.command",
  "package.json", "package-lock.json",
];

const targetAllowlist = targetName === "hostinger"
  ? [...commonAllowlist, "send.php", ".htaccess", ".user.ini"]
  : commonAllowlist;

/* Every top-level entry must be a deliberate decision — shipped or withheld.
   Before this check, `blog/` was dropped in complete silence: the copy loop
   walks the allowlist rather than the tree, so an unlisted directory is never
   visited and never reported. Building the blog and deploying produced a site
   with no blog and not one line of output saying so.
   Failing loudly here costs one line in a list; the silent version costs an
   afternoon of wondering why the server disagrees with the repository. */
function assertNothingSilentlyDropped() {
  // كل ما هو قرار صريح لأي هدف — لا للهدف الحالي وحده. send.php يُنشر على
  // Hostinger ولا يُنشر على Netlify، وكلاهما قرار مُتخذ لا إغفال.
  const known = new Set([
    ...commonAllowlist, "send.php", ".htaccess", ".user.ini",
    ...optionalAllowlist, ...privateEntries,
  ]);
  const unknown = fs.readdirSync(root)
    .filter((entry) => !entry.startsWith(".") && !known.has(entry));
  if (unknown.length) {
    throw new Error(
      `Top-level entries are neither deployed nor explicitly withheld: ${unknown.join(", ")}.\n` +
      "Add each to commonAllowlist (ship it) or privateEntries (withhold it) in build/package-deploy.js."
    );
  }
}

let copiedFiles = 0;
// .webp is allowed ahead of the lab/testimonial photography: photo() emits WebP
// only, so the format is permitted here rather than on the day the art lands.
const publicAssetExtensions = new Set([".css", ".js", ".png", ".svg", ".woff2", ".webp", ".avif", ".ico"]);
const htmlSections = ["services/", "cities/", "articles/", "en/", "blog/"];
// Hugo emits these alongside the blog's HTML; they are public by design.
const blogAssetExtensions = new Set([".css", ".woff2", ".webp", ".avif", ".xml", ".txt", ".png", ".svg"]);

function assertPublicFile(relative) {
  const portable = relative.split(path.sep).join("/");
  const extension = path.extname(relative).toLowerCase();
  if (htmlSections.some((prefix) => portable.startsWith(prefix)) && extension === ".html") return;
  if (portable.startsWith("assets/") && publicAssetExtensions.has(extension)) return;
  // The blog ships its own .htaccess (404/410 and cache rules for /blog/ alone).
  if (portable.startsWith("blog/") && (blogAssetExtensions.has(extension) || portable.endsWith("/.htaccess"))) return;
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

/* Same guarantees as copyAllowlisted — no symlinks, every file checked against
   the allowlist — but it permits the single hidden file the blog legitimately
   ships: its own .htaccess. Everything else hidden is still refused. */
function copyBlogTree(source, destination) {
  const stat = fs.lstatSync(source);
  if (stat.isSymbolicLink()) {
    throw new Error(`Refusing symbolic link in deployment input: ${path.relative(root, source)}`);
  }
  if (stat.isDirectory()) {
    fs.mkdirSync(destination, { recursive: true, mode: 0o755 });
    for (const entry of fs.readdirSync(source)) {
      if (entry === ".DS_Store") continue;
      if (entry.startsWith(".") && entry !== ".htaccess") {
        throw new Error(`Refusing hidden deployment input: ${path.relative(root, path.join(source, entry))}`);
      }
      copyBlogTree(path.join(source, entry), path.join(destination, entry));
    }
    return;
  }
  assertPublicFile(path.relative(root, source));
  fs.mkdirSync(path.dirname(destination), { recursive: true, mode: 0o755 });
  fs.copyFileSync(source, destination);
  fs.chmodSync(destination, 0o644);
  copiedFiles += 1;
}

fs.rmSync(output, { recursive: true, force: true });
fs.mkdirSync(output, { recursive: true, mode: 0o755 });

assertNothingSilentlyDropped();

for (const relative of targetAllowlist) {
  const source = path.join(root, relative);
  if (!fs.existsSync(source)) {
    throw new Error(`Missing required deployment input: ${relative}`);
  }
  copyAllowlisted(source, path.join(output, relative));
}

// The blog directory carries a dot-prefixed .htaccess, which copyAllowlisted
// refuses everywhere else — a hidden file inside a content tree is normally a
// mistake. Here it is the blog's own server rules, so it is copied explicitly.
for (const relative of optionalAllowlist) {
  const source = path.join(root, relative);
  if (!fs.existsSync(source)) continue;
  copyBlogTree(source, path.join(output, relative));
}

console.log(`Packaged ${copiedFiles} allowlisted files for ${targetName} in ${path.relative(root, output)}/`);
