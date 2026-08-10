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

Static files are written to `out/`.

For GitHub Pages builds:

```bash
GITHUB_PAGES=true npm run build
```

## Deploy (GitHub Pages)

Repo: [https://github.com/PJBUMITech/website](https://github.com/PJBUMITech/website)

Expected site URL: [https://pjbumitech.github.io/website/](https://pjbumitech.github.io/website/)

### One-time setup (required)

GitHub Pages is currently blocked because the repository is **private**. On the free org plan, Pages needs a public repo.

1. Open **Settings → General → Danger Zone** and set visibility to **Public**  
   or run: `gh repo edit PJBUMITech/website --visibility public`
2. Open **Settings → Pages**
3. Set source to **Deploy from a branch**
4. Branch: **`gh-pages`** / folder: **`/`** → Save

The `gh-pages` branch already contains the built site.

### Redeploy after changes

```bash
GITHUB_PAGES=true npm run build
npx gh-pages -d out -m "Deploy site to GitHub Pages"
```

### Optional: Actions workflow

`.github/workflows/deploy-pages.yml` is ready locally. To push it, your GitHub token needs the `workflow` scope (`gh auth refresh -s workflow`).

## Notes

- Imagery is under `public/images/`.
- Contact form uses [FormSubmit](https://formsubmit.co) to email `info@pjbumitech.com` (override with `NEXT_PUBLIC_CONTACT_EMAIL`).
  - First submission sends an activation link to that inbox — click it once to enable delivery.
- Internal project status: `/internal/projects` (not linked publicly).
