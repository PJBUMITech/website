# Jekyll site (alternative deploy)

Native [Jekyll](https://jekyllrb.com/) build for GitHub Pages. Content lives in `_data/` and `_includes/`; styling is synced from the Next.js Tailwind build.

## Build locally

Requires Ruby 3.x and Bundler:

```bash
cd jekyll && bundle install && cd ..
npm run build:jekyll:pages    # github.io/website/
npm run build:jekyll:domain   # custom domain at root
```

Output: `jekyll/_site/`

## Deploy

```bash
npm run deploy:jekyll:pages
# or
npm run deploy:jekyll:domain
```

Or use **Actions → Deploy to GitHub Pages (Jekyll)** (manual workflow).

## Content updates

Edit YAML in `_data/` or HTML in `_includes/`, then rebuild. CSS/fonts/images are copied automatically from the Next.js build — run `npm run build:jekyll` after changing Tailwind styles in `src/`.
