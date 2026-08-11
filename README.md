# PJBUMI Tech Website

Modern corporate landing site for **PJBUMI Technologies**, rebuilt with Next.js and Tailwind CSS.

## Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS v4

## Develop

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
```

Static files are written to `out/` (root paths — cPanel or custom domain).

| Command | Use case |
|---------|----------|
| `npm run build:pages` | GitHub project URL: `https://<org>.github.io/website/` |
| `npm run build:pages:domain` | Custom domain at root: `https://www.pjbumitech.com/` |
| `npm run build:cpanel` | cPanel zip export |
| `npm run build:jekyll:pages` | Jekyll site for `github.io/website/` |
| `npm run build:jekyll:domain` | Jekyll site for custom domain |

## Deploy (GitHub Pages)

Repo: [https://github.com/PJBUMITech/website](https://github.com/PJBUMITech/website)

### Two deploy methods

| Method | Build | Best for |
|--------|-------|----------|
| **Next.js export** (default) | `build:pages` | Same stack as dev; React components are source of truth |
| **Jekyll** | `build:jekyll:pages` | Native GitHub Pages pipeline; content in `jekyll/_data/` |

The Next.js export adds **`out/.nojekyll`** so GitHub does not run Jekyll over `_next/` assets. The Jekyll method builds a real Jekyll site under `jekyll/` (see `jekyll/README.md`).

### Option A — GitHub Actions (Next.js, recommended)

1. Push this repo to GitHub (public repo required on free org plan).
2. **Settings → Pages → Build and deployment**
   - Source: **GitHub Actions**
3. Push to `main` — workflow `.github/workflows/deploy-pages.yml` builds and deploys automatically.

Pushes to `main` build for the **custom domain root** (`pjbumitech.com`) by default.

For the project URL (`github.io/website/`) instead: **Actions → Deploy to GitHub Pages → Run workflow** and check **Build for github.io/website/**.

### Option B — Manual deploy (`gh-pages` branch)

**Project URL** (`github.io/website/`):

```bash
npm run deploy:pages
```

**Custom domain** (after `public/CNAME` exists):

```bash
cp public/CNAME.example public/CNAME   # edit domain if needed
npm run deploy:pages:domain
```

Then **Settings → Pages → Deploy from branch → `gh-pages` / `/`**.

### Custom domain setup

Target example: **`www.pjbumitech.com`** (or apex `pjbumitech.com`).

#### 1. Create the CNAME file

```bash
cp public/CNAME.example public/CNAME
```

Edit `public/CNAME` to your chosen hostname (one line, no `https://`):

```
www.pjbumitech.com
```

Commit and deploy with **`npm run build:pages:domain`** (or Actions with custom domain checked).

#### 2. DNS at your domain registrar

**If using `www` (recommended):**

| Type | Name | Value |
|------|------|-------|
| CNAME | `www` | `pjbumitech.github.io` |

**If using apex `pjbumitech.com` (no www):**

| Type | Name | Value |
|------|------|-------|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |

(GitHub’s current Pages IP addresses — confirm in [GitHub Docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site).)

#### 3. Configure GitHub

1. **Settings → Pages → Custom domain** → enter `www.pjbumitech.com` → Save  
2. Wait for DNS check (can take up to 24–48 hours, often minutes).  
3. Enable **Enforce HTTPS** once the certificate is issued.

#### 4. Build for custom domain

Important: custom domains are served from the **site root**, not `/website/`. Always build with:

```bash
npm run build:pages:domain
# or
GITHUB_PAGES=true GITHUB_PAGES_CUSTOM_DOMAIN=true npm run build
node scripts/fix-github-pages-export.mjs
```

Using the wrong build (`build:pages` without custom domain) will break CSS/JS on your domain.

### Default project URL (no custom domain)

Live preview: [https://pjbumitech.github.io/website/](https://pjbumitech.github.io/website/)

```bash
npm run deploy:pages
```

### Option C — Jekyll (manual or Actions)

Requires Ruby 3.x. First time:

```bash
cd jekyll && bundle install && cd ..
```

**Project URL:**

```bash
npm run deploy:jekyll:pages
```

**Custom domain** (with `public/CNAME`):

```bash
npm run deploy:jekyll:domain
```

**GitHub Actions:** **Actions → Deploy to GitHub Pages (Jekyll) → Run workflow** — choose `pages` or `domain`. This workflow is manual only so it does not overwrite the default Next.js deploy on every push.

## Deploy (cPanel)

```bash
npm run build:cpanel
```

Upload `pjbumi-tech-cpanel.zip` to `public_html` and extract. Confirm `index.html`, `next/`, `images/`, and `.htaccess` are at the document root.

## Notes

- Imagery is under `public/images/`.
- Contact form provider is selected at **build time**:
  - **Default:** [FormSubmit](https://formsubmit.co) → `NEXT_PUBLIC_CONTACT_EMAIL` (currently working).
  - **Optional:** [Web3Forms](https://web3forms.com) — set `NEXT_PUBLIC_CONTACT_PROVIDER=web3forms` and `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`.
  - Local: copy `.env.example` → `.env.local`.
  - GitHub Actions: set repo **Variables** `NEXT_PUBLIC_CONTACT_PROVIDER` / `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` (provider defaults to `formsubmit`).
- Internal project status: `/internal/projects` (not linked publicly).
