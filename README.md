# NADI Billing marketing website

Next.js App Router, TypeScript, Tailwind CSS. The Phase 1 homepage follows the existing Stitch design and the approved content in `task.md`.

## Run

Requires Node.js 22 LTS or newer and npm.

```powershell
npm.cmd ci
npm.cmd run dev
```

Open http://localhost:3000. On shells without PowerShell's script execution restriction, `npm` also works.

## Checks

```powershell
npm.cmd run lint
npm.cmd run typecheck
npm.cmd run build
npm.cmd run test:e2e
```

Browser checks run against the production build and launch installed Google Chrome headlessly. Set `PLAYWRIGHT_CHANNEL=msedge` to use installed Edge, or install Chrome for Playwright with `npx playwright install chrome`. They cover desktop/mobile navigation, FAQ, capacity handoff, demo flows, routes, horizontal overflow at six viewport widths, and automated accessibility checks. Screenshots and HTML reports are written to `test-results/` and `playwright-report/`.

The three specified fonts are served locally to visitors through `next/font/google`; the first build needs access to Google Fonts. Dependencies are locked in `package-lock.json`.

## Environment

Copy `.env.example` to `.env.local` and fill in values when available:

- `NEXT_PUBLIC_SITE_URL`: actual public site origin, for canonical URLs and the sitemap. When unset, the site omits canonical URLs and the sitemap is empty instead of publishing a fictional domain. Rebuild after setting it.
- `NADI_DEMO_URL`: optional real application demo link. `/demo` always includes the local guided process simulation.

## Architecture

- `src/app`: homepage, global layout, feature/pricing/demo routes, secondary route foundations, metadata endpoints, and not-found page.
- `src/components/layout`: logo, accessible navigation, and footer.
- `src/components/sections`: thirteen individually scoped homepage sections.
- `src/components/marketing`: product illustration, capacity selection, demo explorer, flow steps, and page introduction.
- `src/components/ui`: icons, button links, and section headings.
- `src/data`: approved content, navigation, demo flows, and secondary page summaries.
- `src/lib/metadata.ts`: reusable metadata and public-origin helpers.
- `design/stitch`: original source exports and inspection notes.

Server Components are the default. Only navigation, capacity selection, and the process simulator need client state. The FAQ uses native HTML disclosures and works without JavaScript. No backend, contact submission, payment processing, analytics, or customer data is involved.

## Remaining work

Complete the dedicated Stitch feature/pricing screens and secondary page content. Confirm the actual tariff schedule, application demo URL, public origin, and legal/support content before publishing. The current capacity selector intentionally contains no unapproved prices.

See [the Stitch inspection notes](design/stitch/README.md) for source identifiers, design tokens, and documented differences.
