# QA sign-off

## Phase 2 sign-off (2026-09-17) — supersedes S05 (2026-09-11) for current state

Method: production `next start` + Playwright (`tests/browser.mjs`) + Vitest +
headless-Chrome screenshots. All commands run sequentially in this repo.

### Automated checks (verified 2026-09-17)

- 54/54 Vitest unit tests (tab splitting incl. all schema exceptions, progress
  model incl. v1→v2 migration, malformed v2 snapshot preservation, section
  reconciliation for removed/renamed sections, strict import validation,
  filter regressions).
- Production browser suite PASS (`QA_PRODUCTION=1 npm run test:browser`):
  migration with retained v1 backup, malformed-v2 raw recovery (byte-exact),
  disabled empty export, export/import/reload round-trip, invalid-import
  no-op, cancelled-import no-op, keyboard-accessible tabs, copy-failure
  feedback, single H1, citations/diagrams present, Resume/filter fallback,
  multi-tab storage sync, slug reset, totals 215/355/520 (step 6 = 25 pts),
  pageerror listeners on every page — no client errors.
- Build completes its 42-page generation phase; lint and typecheck clean.
  The route report includes a dynamic home page. This is not a verified
  serverless static export.
- Screenshots regenerated at 390px and 1440px (Step 6 shows 25 points,
  matching the 520-point budget) and inspected.

### Case-study suite (2026-09-17)

- hearthline-operator-console: 80/80 tests (33 baseline + 47 hook behavior
  tests), lint clean, build clean (13 routes), clean-snapshot install+tests
  verified in a temporary index snapshot. Planted bugs intact and asserted by
  contract tests. Known baseline: standalone `tsc --noEmit` fails TS2802 in
  tests/seed.test.ts (tsconfig has no target); `next build` type-checking
  passes; `--target es2017` diagnostic passes. Not changed (additive-only).

### Deferred to post-publish (explicit, not implied green)

- Real-device touch check (iOS Safari / Android Chrome).
- Screen-reader pass on pickers, tabs, and checkboxes (keyboard ARIA tabs are
  implemented and browser-tested; no screen-reader run was made).
- Storage-denial/quota fault injection in a real browser (pure unit tests
  cover the logic; no browser fault-injection run).
- Cross-browser QA (Chrome only).

### Dependency remediation (2026-09-17)

- `npm audit` on `site/` previously reported a critical Next.js advisory
  (`<15.5.x`, RCE-class) plus a high PostCSS advisory. The site upgraded to
  `next@16.3.5` + `react@19.3.0` + `eslint@9` flat config (ESLint 10+ required
  by `eslint-config-next` 16; `next lint` removed in 16, replaced by
  `eslint .`). Vitest bumped to 4.1.11 for a patched `@vitest/mocker`
  (GHSA-82fw-gwwq-j7x9). `npm audit` and `npm audit --omit=dev` both report
  **0 vulnerabilities**.
- The upgrade added async `params`/`searchParams` handling on the home and
  step pages, `eslint.config.mjs` flat config (removing `.eslintrc.json`),
  `.npmrc` (`legacy-peer-deps=true`; npm 10.9.8 arborist throws a peer-set
  null-edgesOut error when resolving vitest 4 without it), and a `Link`
  migration in the layout for `@next/next/no-html-link-for-pages`.
- The learner-cloned **hearthline-operator-console remains on next@14.2.35 /
  react@18** (untouched, additive-only). BUILD-BASELINE E02 pins still apply
  to the console, not the site.

### Open release blockers (2026-09-17)

- Authenticated MCP connections, live Cursor hook/agent enforcement and
  team-marketplace installation remain unverified. Added MCP and hook
  registration files are opt-in examples, not active integrations.
- No Phase-2 commits, pushes or public-clone release verification occurred.
  Vercel deployment remains on hold for user review.
- Pre-existing console baseline: standalone `tsc --noEmit` fails TS2802 in
  tests/seed.test.ts (no tsconfig target); `next build` type-checking passes.
  Diagnostic workaround `--target es2017` passes. Not changed (additive-only).

## S05 historical record (2026-09-11) — v1 state

- 42/42 static pages; disclaimer on all sampled routes; citation links;
  filter diff exact vs tracks.md (185-pt short track, pre-budget-raise);
  screenshots inspected. localStorage click-test deferred then — now closed
  by the production browser suite above.
