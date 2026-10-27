# Chih Lin Chien — Personal Notes & Projects

A static, English personal website built with React, TypeScript, Vite, and custom CSS. A sidebar and a single reading column organize the introduction, project notes, and background. Profile and project copy lives in `src/content.ts`; styling and responsive layouts live in `src/styles.css`. Project imagery comes from the owner's repositories.

Motion includes a staggered introduction, one-time scroll reveals, link and image hover interactions, and a CSS reading-progress line in supporting browsers. Content remains visible without IntersectionObserver. The reduced-motion preference disables motion and immediately reveals any waiting content, including when the preference changes during a visit.

The Course research section summarizes the owner's coursework literature review on LLM résumé-screening bias, with expandable method notes and locally hosted course report/slides. The summary and document paths are maintained in `src/content.ts` alongside the project content.

## Develop

Use Node.js 24 (see `.nvmrc`) and the existing checkout. Cloud tasks already have an isolated workspace; no additional Git worktree is needed.

```bash
cd /workspace/brainjien.github.io
npm ci
npm run dev -- --host 0.0.0.0 --port 5173 --strictPort
```

The application is served at `/brainjien.github.io/`. For an internal readiness check, request `http://127.0.0.1:5173/brainjien.github.io/`, then verify that the browser renders the name, four projects, and contact section without failed local assets. A successful HTTP response alone does not check React rendering.

The project-local `.npmrc` keeps npm's cache in the ignored `.cache/npm/` directory so installation also works in cloud machines with a read-only home directory. No credentials, environment variables, databases, or backend services are required.

## Validate

```bash
npm run typecheck
npm run build
npm test
```

Browser tests run against the **production build** at the GitHub Pages project path and cover desktop, tablet, mobile, and 320px screens. They verify local imagery/fonts, rendering without runtime GitHub access, navigation, links, keyboard access, reduced motion, and overflow. Screenshots and the HTML report are written to ignored `test-results/` and `playwright-report/` directories.

Tests use `/usr/bin/chromium` when available. Otherwise install Playwright Chromium with `npx playwright install chromium`. You can also set `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` to an existing Chromium binary. Use `npm run build` before `npm test` to ensure the tests exercise the latest output.

To inspect the production build manually:

```bash
npm run preview -- --host 0.0.0.0 --port 4173 --strictPort
```

## Publish when reviewed

The workflow in `.github/workflows/pages.yml` runs **only by manual dispatch**. After committing and pushing the reviewed website to the default branch, select **GitHub Actions** as the repository's Pages source in Settings → Pages. In Actions, run **Publish portfolio to GitHub Pages**.

The project URL is `https://brianjien.github.io/brainjien.github.io/`. The account is spelled **brianjien** and the repository **brainjien.github.io**. Vite's `base` deliberately matches that project path. Publishing at an account-root URL or custom domain requires updating the base and canonical metadata.

## Content and licenses

See `ASSET_SOURCES.md` for source attribution and font license notices. The original résumé is not distributed. The website makes no runtime requests to GitHub, analytics services, or external fonts. External project and social destinations open only when visitors choose their links.
