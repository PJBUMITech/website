#!/usr/bin/env node
/**
 * Post-process Next static export for GitHub Pages:
 * 1. Ensure `.nojekyll` (disables Jekyll — required for `_next/` assets)
 * 2. Copy `public/CNAME` when deploying to a custom domain
 * 3. Inject external `site.js` for header / menu / contact form
 */
import fs from "node:fs";
import path from "node:path";

const outDir = path.resolve("out");
const publicDir = path.resolve("public");
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

if (!fs.existsSync(outDir)) {
  console.error("out/ not found — run npm run build:pages first");
  process.exit(1);
}

// Disable Jekyll (GitHub Pages would otherwise ignore `_next/`)
fs.writeFileSync(
  path.join(outDir, ".nojekyll"),
  "# Skip Jekyll — static Next.js export\n",
);

// Custom domain (copy public/CNAME → out/CNAME)
const cnameSrc = path.join(publicDir, "CNAME");
if (fs.existsSync(cnameSrc)) {
  fs.copyFileSync(cnameSrc, path.join(outDir, "CNAME"));
  console.log(`Copied CNAME → out/CNAME (${fs.readFileSync(cnameSrc, "utf8").trim()})`);
}

const siteScriptTag = `<script src="/site.js" defer></script>`;
const siteScriptTagProject = `<script src="/website/site.js" defer></script>`;

function injectIntoHtml(html) {
  const isProjectSite =
    html.includes("/website/_next") || html.includes('"/website/');
  const scriptTag = isProjectSite ? siteScriptTagProject : siteScriptTag;

  let out = html;
  if (!out.includes("site.js")) {
    out = out.replace("</body>", `${scriptTag}</body>`);
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
  fs.writeFileSync(filePath, injectIntoHtml(fs.readFileSync(filePath, "utf8")));
}

walk(outDir, (file) => {
  if (!file.endsWith(`${path.sep}index.html`)) return;
  if (file === path.join(outDir, "index.html")) return;
  fs.writeFileSync(file, injectIntoHtml(fs.readFileSync(file, "utf8")));
});

console.log("GitHub Pages export ready in out/");
