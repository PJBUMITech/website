#!/usr/bin/env node
/**
 * Post-process Next static export for cPanel:
 * 1. Rename `_next` → `next` (underscore folders are often hidden / blocked)
 * 2. Rewrite /_next/ asset URLs → /next/
 * 3. Ensure external site.js is referenced for static-host interactivity
 * 4. Drop non-runtime clutter
 */
import fs from "node:fs";
import path from "node:path";

const outDir = path.resolve("out");
const contactEmail =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "inquiries@pjbumitech.com";

function walk(dir, onFile) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) walk(full, onFile);
    else onFile(full);
  }
}

function rewriteAssetPaths(content) {
  return content
    .replaceAll("/_next/", "/next/")
    .replaceAll("./_next/", "/next/")
    .replaceAll('"/_next/', '"/next/')
    .replaceAll("'/_next/", "'/next/");
}

if (!fs.existsSync(outDir)) {
  console.error("out/ not found — run next build first");
  process.exit(1);
}

const nextDir = path.join(outDir, "_next");
const renamedDir = path.join(outDir, "next");
if (fs.existsSync(nextDir)) {
  if (fs.existsSync(renamedDir)) {
    fs.rmSync(renamedDir, { recursive: true, force: true });
  }
  fs.renameSync(nextDir, renamedDir);
  console.log("Renamed out/_next → out/next");
}

for (const junk of ["images.zip", ".DS_Store"]) {
  const target = path.join(outDir, junk);
  if (fs.existsSync(target)) fs.rmSync(target, { recursive: true, force: true });
}

walk(outDir, (file) => {
  const base = path.basename(file);
  if (base === ".DS_Store") {
    fs.rmSync(file);
    return;
  }
  if (base.startsWith("__next") || (base.endsWith(".txt") && base !== "robots.txt")) {
    fs.rmSync(file);
    return;
  }

  if (!/\.(html|js|css|json|xml|webmanifest)$/i.test(base)) return;

  const before = fs.readFileSync(file, "utf8");
  const after = rewriteAssetPaths(before);
  if (after !== before) fs.writeFileSync(file, after);
});

const siteScriptTag = `<script src="/site.js" defer></script>`;

function injectSiteEnhancements(html) {
  let out = html;
  if (!out.includes('src="/site.js"') && !out.includes("src='/site.js'")) {
    out = out.replace("</body>", `${siteScriptTag}</body>`);
  }
  if (!out.includes("data-contact-email")) {
    out = out.replace(
      /<body([^>]*)>/i,
      `<body$1 data-contact-email="${contactEmail}">`,
    );
  }
  return out;
}

for (const htmlFile of ["index.html", "404.html"]) {
  const filePath = path.join(outDir, htmlFile);
  if (!fs.existsSync(filePath)) continue;
  const html = injectSiteEnhancements(fs.readFileSync(filePath, "utf8"));
  fs.writeFileSync(filePath, html);
}

// Nested route HTML files
walk(outDir, (file) => {
  if (!file.endsWith(`${path.sep}index.html`)) return;
  if (file === path.join(outDir, "index.html")) return;
  const html = injectSiteEnhancements(fs.readFileSync(file, "utf8"));
  fs.writeFileSync(file, html);
});

if (!fs.existsSync(path.join(outDir, "site.js"))) {
  console.warn("Warning: out/site.js missing — copy from public/site.js");
}

fs.writeFileSync(
  path.join(outDir, ".htaccess"),
  `# PJBUMI Tech static site (cPanel)
Options -Indexes
DirectoryIndex index.html

# JavaScript MIME (some hosts need this)
AddType application/javascript .js
AddType text/css .css

<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteCond %{REQUEST_FILENAME} -f [OR]
  RewriteCond %{REQUEST_FILENAME} -d
  RewriteRule ^ - [L]
  RewriteRule ^(.+)/$ $1/index.html [L]
</IfModule>
`
);

console.log("cPanel export ready in out/");
