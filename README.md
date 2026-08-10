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

## Build (local)

```bash
npm run build
```

Static files are written to `out/`.

## Deploy

### GitHub Pages

Pushes to `main` deploy automatically via GitHub Actions.

Site URL: [https://pjbumitech.github.io/website/](https://pjbumitech.github.io/website/)

Local production build for Pages:

```bash
GITHUB_PAGES=true npm run build
```

### Notes

- Imagery is stored under `public/images/`.
- Contact form currently validates client-side only; wire it to your preferred mail/API endpoint before production use.
- Project status lives at `/internal/projects` for internal use only (not linked from the public nav; blocked in `robots.txt`).
