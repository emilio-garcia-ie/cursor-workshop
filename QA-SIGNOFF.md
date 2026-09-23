# QA sign-off

## Phase 3 sign-off (2026-09-23) — current state; supersedes Phase 2 below for currency

Method: clean `rm -rf node_modules && npm install` in both repos, then all
suites sequentially. Site: Vitest + production `next start` + Playwright
(`tests/browser.mjs`, EN+ES assertions). Console: Vitest + `next build`.

### Automated checks (verified 2026-09-23, from clean installs)

- Workshop site: 88/88 Vitest (i18n catalog parity + em-dash ban, citation
  linking incl. ES prefixes, tab/quiz parsers, progress model incl. migration
  + file adapter, navigation, track filters, ES termbase gate over
  steps/es + glossary/bibliography/fact-check ES files).
- `npm run check:termbase` PASSED (0 banned untranslated terms across all ES
  content). `npm run check:anchors` PASSED (36/36 bibliography `#n` anchors
  exact; 32/32 glossary entries).
- Typecheck clean, lint clean, `npm audit` 0 vulnerabilities.
- Build: 78 static pages (33 EN steps + 33 ES steps + EN/ES home + steps
  index + glossary + bibliography + diagrams).
- Production browser suite PASS: Phase-2 coverage retained plus ES locale
  (`lang="es"`, localized UI, `/es/steps/*` footer links, persistent language
  toggle) and new ES supporting-page assertions (Glosario h1 with `/es/steps/`
  links, Bibliografía h1 with stable `#n` anchors, `/es/bibliography#`
  citations on ES step pages). 390px no-overflow asserted for EN home, ES
  home, and ES step. No client errors on any page.
- Screenshots captured at 390/1440px: EN home, ES home, ES step
  (`phase-c-*{,-es}{-step}{-mobile,-desktop}.png`). Note: the automated
  run asserts no horizontal overflow; pixel-level human inspection of the
  PNGs is left to the reviewer (this session's tooling does not render
  images).
- hearthline-operator-console: 80/80 tests; `npm run build` clean (13 routes);
  ticket parity PASSED (9/9 ES mirrors, IDs, cross-links, criteria counts);
  README.es.md + docs/tickets/es/HLN-101..109 live.

### anti-slop Delivery Gate (2026-09-23) — site UI/copy, both locales

Block 1 — Hard Gate (all answers no):
- R-02 PASS: no em dash in any UI string (unit-tested `i18n.test.ts`; ES
  curriculum prose is under the documentation carve-out, DESIGN.md records it).
- R-03 PASS: 390px `scrollWidth <= innerWidth` asserted for EN home, ES home,
  ES step in the production browser suite.
- R-17 PASS: only real workshop numbers (33 steps / 520 pts / 215/355
  totals) asserted in-browser from the actual curriculum files.
- R-18 PASS: no testimonials anywhere.
- R-23 PASS: no new visual assets; only pre-existing curriculum diagrams.
- R-24 PASS: nav links (steps, glossary, bibliography; ES equivalents) all
  built and visited in the suite.
- R-25 PASS: ink/cream 13.7:1, accent/cream 4.6:1 documented in DESIGN.md;
  pastels are decorative dots with adjacent ink labels, never text.
- R-26 PASS: every control clicked in the suite with real behavior (grade,
  save/overwrite/load, export/import, copy + failure fallback, checkboxes,
  toggle).
- R-27 PASS: loading ("Loading local progress…"), error (role=alert + retry +
  raw recovery), empty ("No steps match this selection") states exercised.
- R-28 PASS: no FAQ section.
- R-32 PASS: keyboard tab/arrow navigation asserted; radio inputs native;
  explicit `:focus-visible` accent outline added this phase.
- R-33 PASS: everything is source React components; no injected scripts.
- R-34 PASS: no theme toggle (single warm theme is a documented DESIGN.md
  non-goal; nothing to break).
- R-35 PASS: recorded click-through = `QA_PRODUCTION=1 npm run test:browser`
  full pass; build green; no client errors.
- R-36/R-38 PASS: no fabricated security/performance/customer claims; all
  data cited or computed from the repo; personas are openly fictional
  (disclaimer on every page).

Block 2 — Purpose-Gate (technique + written reason):
- R-01/07/10/13/19/22 PASS: no gradients, background patterns, glassmorphism,
  glows, template animations, or stock illustrations.
- R-04 PASS: no icons (documented non-goal).
- R-06 PASS: mono stack + editorial kicker have written brand reasons in the
  DESIGN.md typography table (code-is-native-dialect / print-kicker roles).
- R-08 PASS: arrow appears only on the Next control with its written reason
  in DESIGN.md (R-08 note).
- R-09 PASS: no decorative capsules; the version/persona pills are real
  filter controls with real hrefs.
- R-12/R-14 PASS: single subtle card elevation and uniform step rows follow
  the declared RHYTHM 2 with its deliberate breaks (quiz, self-report,
  diagrams).

Block 3 — Liveliness (all yes):
- Dials declared (ENERGY 2 / RHYTHM 2 / MOTION 1) and output consistent;
  focal point per screen (serif H1 + active accent element); structural
  whitespace; exactly one accent (orange = interactive intent); identity
  motif (accent-only-for-intent) repeated; Design Read declared in DESIGN.md.

Block 4 — Craftsmanship & Quality Locks (all answers no):
- C-1..C-5 PASS: decisions carry one-line reasons (DESIGN.md R-31 notes);
  no dead elements; no template filler sections; no state/breakpoint/no-mouse
  failures (suite-asserted); no fabricated claims.
- R-05/R-11/R-15/R-16/R-20/R-21/R-29/R-30/R-31 PASS: layout is a reading
  companion (tabbed steps), not an AI template; radius variation exists
  (cards vs filter pills); CTAs are specific actions; no AI buzzwords; the
  design is not logo-swappable generic; dark mode not forced (documented
  single theme); palette is a documented system (cream/ink/accent + labeled
  module dot pastels); no product clone; every major decision has a
  one-line reason.

### Deferred to post-publish (explicit, not implied green)

- Real-device touch check (iOS Safari / Android Chrome).
- Screen-reader pass on tabs, quiz, progress tools, and the language toggle
  (ARIA roles + keyboard paths are implemented and browser-tested; no
  screen-reader run was made).
- Cross-browser QA (Chrome only; headless via installed Google Chrome).
- Human pixel inspection of the 390/1440 PNGs by the reviewer.

### Dependency status (2026-09-23)

- Workshop site: `npm audit` 0 (next@16.3.5, vitest@4.1.11 above the
  GHSA-82fw range).
- hearthline-operator-console: `npm audit` reports 7 findings (1 critical in
  next@14.2.35 DoS/request-smuggling advisories; high in bundled PostCSS and
  in glob via eslint-config-next; moderate in @vitest/mocker via vitest 3).
  `next@14.2.35` is the latest 14.x (dist-tag `next-14`), so the only
  remediation is a breaking upgrade (next@16 + react@19 + vitest@5 +
  eslint-config-next@16) that the locked console contract (planted bugs,
  80/80 suite, learner clone path) excludes from this phase. Deviation is
  accepted knowingly and surfaced for the user's release decision; the
  console is local-only, never deployed, and the vulnerable surfaces
  (Image Optimizer remotePatterns, rewrites, attacker-controlled CSS) are
  not exercised by the workshop.

### Open release items (2026-09-23)

- Phase-3 work committed on feature branches and pushed; no merges to main;
  main untouched in both repos.
- Vercel deployment remains on hold pending user review.
- Authenticated MCP connections, live Cursor hook/agent enforcement, and
  team-marketplace installation remain unverified (opt-in examples only).
- Pre-existing console baseline: standalone `tsc --noEmit` fails TS2802 in
  tests/seed.test.ts; `next build` type-checking passes. Not changed.

## Phase 2 sign-off (2026-09-17) — supersedes S05 (2026-09-11) for its record

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
