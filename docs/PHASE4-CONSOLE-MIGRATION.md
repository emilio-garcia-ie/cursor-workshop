# PHASE4 — Console dependency migration (audit 0)

Plan date: 2026-09-23. Plan owner: user. Executor: agent, on explicit
authorization. Skill: atomic-executable-plan.

## 1. Goal and non-goals

**Goal:** migrate `hearthline-operator-console` from next@14.2.35 /
react@18 / vitest@3 / eslint-config-next@14 to next@16.3.6 / react@19 /
vitest@5 / eslint@9 (flat config) + eslint-config-next@16.3.6 so that
`npm audit` and `npm audit --omit=dev` both report 0, with all 80 tests,
the three planted-bug contracts, the bilingual surface (README.es +
tickets/es + parity), the learner quickstart, and the 13-route build intact.

**Non-goals:** no feature or UI changes beyond peer-required compatibility;
no Tremor redesign unless peers force it (fallback decided in M02); no
workshop-site changes; no deployment; no merge to main (feature branch +
push only); no changes to the planted bugs or their contract tests.

## 2. Verified baseline (inspected 2026-09-23)

Facts verified by direct inspection this session (machine-local):

- `package.json`: next 14.2.35, react ^18, vitest ^3.2.7, eslint ^8,
  eslint-config-next 14.2.35, @tremor/react ^3.18.7, tailwindcss ^3.4.1,
  typescript ^5, zod ^4.6.2. `npm run lint` = `next lint`.
- `npm audit` (2026-09-23, clean install): **7 findings** — critical: next
  GHSA-9g9p-9gw9-jx7f (Image Optimizer DoS), GHSA-h25m-26qc-wcjf (RSC
  deserialization DoS), GHSA-ggv3-7p47-pfv8 (request smuggling in rewrites);
  high: glob GHSA-5j98-mcp5-4vw2 via @next/eslint-plugin-next, bundled
  PostCSS file-read advisories; moderate: @vitest/mocker GHSA-82fw-gwwq-j7x9
  via vitest 2.1.0–4.1.10.
- `npm view next dist-tags` (2026-09-23): `latest` = 16.3.6; `next-14` =
  14.2.35 = **final 14.x** → no non-breaking remediation exists (verified,
  not assumed). `npm audit fix --force` proposes next@16.3.6 + vitest@5.0.1.
- Suite: 80/80 vitest, build 13 routes, `check:parity` 9/9 — all from a
  clean install on 2026-09-23. Branch `phase-b-console-bilingual` pushed;
  main untouched.
- Known pre-existing baseline: standalone `tsc --noEmit` fails TS2802 in
  `tests/seed.test.ts` (tsconfig has no target); `next build` type-checking
  passes (Phase-2 QA-SIGNOFF).
- Migration surfaces (inspected): `searchParams`/`params` used in 6 files —
  `src/app/payments/page.tsx`, `src/app/properties/page.tsx`,
  `src/app/api/payments/route.ts`, `src/app/api/payments/export/route.ts`,
  `src/app/api/properties/route.ts`, `src/app/api/maintenance/route.ts`.
  `.eslintrc.json` exists; no `eslint.config.*`. `vitest.config.ts` is an
  alias-only config. `next.config.mjs` is empty. Six hook scripts in
  `.cursor/hooks/` invoke the toolchain: `ci-gate.sh:23` spawns
  `["run","lint",…]`, `test`, `build` (npm scripts), `post-edit-lint.sh:25-27`
  spawns `node_modules/eslint/bin/eslint.js --no-cache --max-warnings 0 --
  <file>`, `post-agent-test.sh:20` checks `node_modules/vitest/vitest.mjs`.
  @tremor/react is imported by 5 page files.
- Precedent: the workshop site completed the same class of migration
  (next@16.3.5 + react@19 + eslint 9 flat config) on 2026-09-17 and
  re-verified audit 0 on 2026-09-23; its `eslint.config.mjs` and async-
  params pattern are proven shapes the console can mirror.

## 3. Critical review and corrections

- The bump cannot be split per-package (peer-locked: next 16 requires
  react 19; eslint-config-next 16 requires eslint 9). Correction: one
  coordinated dependency task (M03), then per-surface repair tasks. M03
  ends in a deliberately red intermediate state that it must name and
  record; the Phase B gate (M08) is where everything must be green.
- `next lint` is removed in next 16, so the ci-gate hook (`run lint`) and
  the `post-edit-lint` hook (direct eslint bin) break with the bump; the
  flat-config switch (M04) and the hook-toolchain alignment (M06) are
  separate tasks because lint config and hook/test changes fail and review
  independently.
- @tremor/react 3.x peer support for react 19 is UNVERIFIED — a blocking
  verification checkpoint (M02) with a written fallback (raise within ^3;
  else replace Tremor primitives with local equivalents in the 5 pages).
- vitest 3→5 skips major 4; breaking changes must be read at M02 before
  M06 touches the config or tests.
- Honesty of the security claim: the DoD is audit 0 for BOTH `npm audit`
  and `--omit=dev`, not "fewer findings"; `npm overrides` hacks are excluded
  (they would not fix the next criticals and misrepresent the state).

## 4. Locked decisions and unresolved blocking decisions

| Concern | Decision | Evidence or rationale |
|---|---|---|
| Runtime | Node ≥ 20.9 (machine: v22.22.3) | Next 16 requirement; site runs 22 |
| Dependencies | npm + package-lock; single coordinated bump (M03) | peer-locked set; no overrides |
| Stack targets | next@16.3.6, react@19, react-dom@19, vitest@5, eslint@9 + eslint-config-next@16.3.6, tailwind v3 + @tremor/react ^3 (M02 checkpoint) | audit-0 targets proposed by `npm audit fix --force` + dist-tags, 2026-09-23 |
| Tests | vitest 5, offline, 80/80 must stay at 80 | planted-bug contracts + hook behavior tests are the migration net |
| Lint | eslint 9 flat config mirroring the workshop site's `eslint.config.mjs`; `lint` script becomes `eslint .` | `next lint` removed in 16 (site evidence) |
| Source of truth | feature branch `phase4-console-migration`; no direct-to-main | repo policy (QA-SIGNOFF open items) |
| External services | none; console stays local-only, never deployed | verified non-goal |

Unresolved until M02: @tremor/react react-19 peer support (blocking
checkpoint; fallback written above).

## 5. Phase order / dependency graph

M01 baseline + branch → M02 volatile verification (GATE A: decisions locked)
→ M03 coordinated bump → M04 eslint flat config → M05 next-16 source
compat → M06 vitest 5 + hooks alignment → M07 Tremor runtime verification →
M08 clean-install full gates (GATE B) → M09 docs + push (GATE C).

## 6. Atomic execution contract

Tasks below follow the atomic-executable-plan standard: each has one primary
outcome, complete steps, one required test, numbered DoD tests, and a stop
boundary. RED/GREEN pairing does not apply (this is a migration; the 80/80
suite is the standing red/green net and must never be weakened to pass).

## 7. Task cards

### M01 — Baseline snapshot + migration branch

**Requires:** None

**Outcome:** A migration branch exists and the pre-migration state of every gate is recorded.

**Evidence:** Branch `phase-b-console-bilingual` is the current pushed tip (git, 2026-09-23); the old-stack gates measured 80/80, 13 routes, audit 7, parity 9/9 today. Completion evidence is a dated baseline record plus the new branch name.

**Steps:**

1. In the console repo, run `git checkout -b phase4-console-migration` (off `phase-b-console-bilingual`).
2. Run `rm -rf node_modules && npm install`.
3. Run and record verbatim outputs: `npm audit` (expect 7 findings as listed in §2), `npm test` (expect 80/80), `npm run build` (expect 13 routes), `npm run check:parity` (expect 9/9), `npm run lint` (expect green via `next lint`).
4. Write the recorded outputs to `docs/PHASE4-NOTES.md` under a "M01 baseline (date)" heading and commit it.

**Required test:** `npm test`

**DoD tests:**

1. `git branch --show-current` prints `phase4-console-migration`.
2. `docs/PHASE4-NOTES.md` exists and contains dated M01 outputs for audit, test, build, parity, lint.
3. `npm test` printed 80 passed (80) on the old stack during this task.
4. `git status --short` is clean after the commit.

**Expected result:** All five baseline gates reproduce their §2 values.

**Task DoD:** Branch created off the correct tip; baseline recorded and committed; no dependency or source file changed.

**Stop:** Do not install, upgrade, or edit any dependency or source file.

### M02 — Volatile verification checkpoint (blocking; GATE A)

**Requires:** M01

**Outcome:** Dated primary-source verification of every volatile target, and the Tremor decision (pin or fallback) is made and recorded.

**Evidence:** §2 flags @tremor/react react-19 peers as unverified and vitest 5 breaking changes as unread; next 16.3.6 async-params scope for route handlers needs confirmation. Completion evidence is the M02 section of `docs/PHASE4-NOTES.md`.

**Steps:**

1. Run `npm view @tremor/react@'>=3.18 <4' version` and `npm view @tremor/react versions --json | tail -30`; then check the peerDependencies of the newest 3.x (e.g. `npm view @tremor/react@<latest-3.x> peerDependencies --json`). Record the react peer range.
2. Decide and record: (a) a ^3 release supports react 19 → pin it for M03; or (b) none does → the fallback (local replacements in the 5 pages listed in §2) is armed for M07.
3. Read the vitest 5 (and 4) breaking-changes notes (GitHub releases or changelog bundled in the package). List every delta that affects `vitest.config.ts`, globals, or the hook scripts' `vitest/vitest.mjs` path check.
4. Confirm from next 16 documentation/release notes: (a) `next lint` removal, (b) `params`/`searchParams` become Promises in pages, and whether Request-based route handlers without dynamic segments are affected; reconcile against the 6 files listed in §2.
5. Record all findings with dates under "M02 verification (date)" in `docs/PHASE4-NOTES.md` and commit.

**Required test:** Review of `docs/PHASE4-NOTES.md` M02 section containing dated findings for items 1–4.

**DoD tests:**

1. The notes record the @tremor/react peer range with the exact command output and the pin-or-fallback decision.
2. The notes list the concrete vitest 3→5 deltas relevant to this repo.
3. The notes state the confirmed async-params scope (file list) and the `next lint` removal.
4. Every finding carries a verification date; the section is committed.

**Expected result:** All four volatile targets verified against current primary sources; Tremor decision locked.

**Task DoD:** Verification recorded and committed; no dependency or source file changed.

**Stop:** Do not start the dependency bump. **GATE A:** execution may not proceed to M03 until every DoD test above passes.

### M03 — Coordinated dependency bump

**Requires:** M02

**Outcome:** `package.json` + lock are on the new stack and both audits report 0, with the post-install red state named and recorded.

**Evidence:** §2 audit output + `npm audit fix --force` proposal (next@16.3.6, vitest@5.0.1); M02 locked the Tremor pin. Completion evidence is the manifest diff, both audit outputs, and the red-state record.

**Steps:**

1. Run `npm install next@16.3.6 react@19 react-dom@19 eslint@^9 eslint-config-next@16.3.6 vitest@5 @types/react@^19 @types/react-dom@^19` plus the @tremor/react pin from M02 if one was chosen.
2. Run `npm audit` and `npm audit --omit=dev`; both must print 0 vulnerabilities.
3. Run `npm ls next react react-dom eslint eslint-config-next vitest` and record the tree.
4. Probe and record the expected red state: `npm run lint` (expected: flat-config/lint failure), `npm run build` (expected: async-params type errors or equivalent), `npm test` (expected: vitest 5 deltas or hook-invocation failures). Name each failing gate and its cause; do not fix anything.
5. Commit the manifest + lock + the "M03 red state (date)" notes section.

**Required test:** `npm audit`

**DoD tests:**

1. `npm audit` prints 0 vulnerabilities.
2. `npm audit --omit=dev` prints 0 vulnerabilities.
3. `npm ls` shows next 16.3.6, react 19, vitest 5, eslint 9, eslint-config-next 16.3.6.
4. The notes record each expected-red gate with its observed cause.
5. Only `package.json`, `package-lock.json`, and `docs/PHASE4-NOTES.md` changed.

**Expected result:** Audits are 0; the repo is knowingly red on lint/build/test for the exact reasons recorded.

**Task DoD:** New stack installed and committed; audit 0 both trees; red state documented; no source or config fixes attempted.

**Stop:** Do not write `eslint.config.mjs`, fix source files, or adjust tests here.

### M04 — ESLint 9 flat config

**Requires:** M03

**Outcome:** `npm run lint` is green using eslint 9 flat config.

**Evidence:** M03 red state shows lint failing on legacy config; the workshop site's `eslint.config.mjs` (next 16 + eslint 9) is the proven shape. Completion evidence is a green `eslint .` run plus the config diff.

**Steps:**

1. Create `eslint.config.mjs` mirroring the workshop site's flat config (eslint-config-next; ignores for `.next`, `node_modules`).
2. Delete `.eslintrc.json`.
3. Change the `lint` script to `"lint": "eslint ."`.
4. Run `npm run lint`. Fix only what the new config legitimately flags: mechanical fixes only, each listed in the notes; any rule disagreement is recorded, not silently disabled.
5. Commit config + mechanical fixes + notes.

**Required test:** `npm run lint`

**DoD tests:**

1. `npm run lint` exits 0.
2. `test -f .eslintrc.json` fails and `test -f eslint.config.mjs` succeeds.
3. `grep '"lint"' package.json` prints the `eslint .` script.
4. The notes list every source fix made for the new config, and the diff contains no logic changes.
5. `npm test` still shows the M03 red state unchanged or improved — no new breakage introduced by this task.

**Expected result:** Lint green under flat config with only listed mechanical fixes.

**Task DoD:** Flat config green; legacy config gone; fixes listed; no unrelated changes.

**Stop:** Do not touch build errors or test failures.

### M05 — Next 16 source compatibility (async params/searchParams)

**Requires:** M04

**Outcome:** `npm run build` compiles to the same 13 routes on next 16.

**Evidence:** §2 lists the 6 files using `params`/`searchParams`; M02 confirmed the exact async scope; the workshop site's async-params pattern is the proven fix shape. Completion evidence is the build output plus a diff limited to compatibility shims.

**Steps:**

1. Convert page-level `searchParams`/`params` props in `src/app/payments/page.tsx` and `src/app/properties/page.tsx` to Promises and await them, mirroring the site's `(en)` page wrappers.
2. Apply the M02-confirmed route-handler changes (if any) to the four API routes; if M02 established Request-based handlers are unaffected, record that and change nothing.
3. Run `npm run build`; iterate only on compile/type errors directly caused by the bump. Record any change in the TS2802 standalone-`tsc` baseline behavior in the notes.
4. Run `npm test`; domain/CSV/API unit tests must pass (hook-toolchain failures from M03/M06 scope may remain — record which).
5. Commit.

**Required test:** `npm run build`

**DoD tests:**

1. `npm run build` compiles and generates 13 routes.
2. `git diff --name-only` since M04 shows only the 6 compatibility files (or fewer) plus notes.
3. `npm test` domain-layer suites pass; any remaining failures are only the M06-scoped hook/vitest deltas, named in the notes.
4. The TS2802 baseline re-check result is recorded in the notes.

**Expected result:** Build green at 13 routes with a minimal compatibility diff.

**Task DoD:** next-16 build compatibility achieved; domain tests green; TS2802 status documented.

**Stop:** Do not update hook scripts or vitest config.

### M06 — Vitest 5 + hook toolchain alignment

**Requires:** M05

**Outcome:** `npm test` is 80/80 on vitest 5, with hook scripts and their behavior tests aligned to the new invocations.

**Evidence:** M02 recorded the vitest deltas; §2 lists the hook invocation sites (`ci-gate.sh:23` npm `run lint`, `post-edit-lint.sh:25-27` eslint bin, `post-agent-test.sh:20` vitest.mjs check). Completion evidence is a green 80/80 run plus a hooks diff that never weakens a protection assertion.

**Steps:**

1. Adjust `vitest.config.ts` per the M02 deltas (alias config is expected to survive; verify).
2. Update hook scripts for the new toolchain: the `lint` npm script is now `eslint .` (ci-gate needs no change if it calls the script; verify and record); re-verify `post-edit-lint.sh`'s direct `eslint/bin/eslint.js --no-cache --max-warnings 0 -- <file>` invocation against eslint 9 arg parsing; re-verify `post-agent-test.sh`'s `vitest/vitest.mjs` path against the vitest 5 package layout.
3. Update `tests/hooks/*` expectations only where they assert invocation details that legitimately changed (e.g. command names); every test must still prove that a real seeded failure blocks and a real pass allows — the protection level must not drop.
4. Run `npm test`; iterate to 80/80. If a test's semantics required change, justify it in the notes (one line per test).
5. Commit.

**Required test:** `npm test`

**DoD tests:**

1. `npm test` prints 80 passed (80) — same count as the M01 baseline.
2. Every hook behavior test still blocks its seeded real failure (the suite asserts this; no test was deleted, skipped, or had its failure case removed).
3. `git diff --name-only` since M05 shows only `vitest.config.ts`, `.cursor/hooks/*`, `tests/hooks/*`, and notes.
4. Each changed hook/test expectation has a one-line justification in the notes.

**Expected result:** 80/80 green with hook protections intact.

**Task DoD:** Vitest 5 green at the baseline count; hooks aligned; protections proven; changes justified.

**Stop:** Do not perform the runtime screen verification here.

### M07 — Tremor + screens runtime verification

**Requires:** M06

**Outcome:** All five screens render correctly with Tremor on react 19 (or the M02 fallback is implemented and then verified).

**Evidence:** §2 lists the 5 Tremor page files; M02 locked pin-or-fallback. Completion evidence is a dated inspection record of each screen.

**Steps:**

1. If M02 chose the fallback: replace Tremor primitives with local equivalents in the 5 pages (bounded to the page layer; domains untouched), mirroring existing markup semantics.
2. Run `npm run build && npm start` (or `npm run dev`).
3. Open each screen — `/`, `/payments`, `/properties`, `/maintenance`, `/forecasts` — and confirm it renders its data (tables/cards/metrics) with no console errors.
4. Record per-screen observations (with any console output) under "M07 (date)" in the notes; commit.

**Required test:** Named inspection: five screens render (manual/deterministic server check — the console has no browser suite by design).

**DoD tests:**

1. The notes record each of the five screens rendering, dated.
2. No runtime errors were observed on any screen.
3. If the fallback was executed, `git diff --name-only` shows page-layer files only and the notes justify each replacement.

**Expected result:** Five screens render with live seed data and no errors.

**Task DoD:** Runtime compatibility proven (or fallback implemented and proven); observations recorded.

**Stop:** Do not run the full clean-install gate here.

### M08 — Phase B gate: clean-install full verification

**Requires:** M07

**Outcome:** Every console gate is green from a clean install on the new stack.

**Evidence:** M03–M07 turned each recorded red surface green; this gate aggregates. Completion evidence is the dated M08 record.

**Steps:**

1. `rm -rf node_modules && npm install`.
2. Run and record: `npm audit` (0), `npm audit --omit=dev` (0), `npm test` (80/80), `npm run build` (13 routes), `npm run lint` (green), `npm run check:parity` (9/9).
3. Verify the learner quickstart still works as documented in `README.md` (install → dev server starts → tests) and record it.
4. Write the "M08 gate (date)" section in the notes; commit.

**Required test:** The full step-2 sequence, in order, in one session.

**DoD tests:**

1. All six step-2 commands pass with the expected values listed above.
2. The quickstart verification (step 3) is recorded.
3. `git status --short` is clean after committing the notes.

**Expected result:** All gates green from a clean install.

**Task DoD:** Phase B gate passed with a complete dated record. **GATE B.**

**Stop:** No documentation edits beyond the notes record.

### M09 — Docs, traceability, push (GATE C)

**Requires:** M08

**Outcome:** Truthful docs in both repos; branch pushed; main untouched.

**Evidence:** M08's gate record; BUILD-BASELINE E02 currently pins the console to next@14.2.35 (inspected 2026-09-23) and must be superseded, not contradicted. Completion evidence is the doc diffs plus push output.

**Steps:**

1. In the console repo: update `README.md` only if the learner-visible content changed (quickstart commands should be unchanged); run `npm run check:parity` again after any README touch.
2. In the workshop repo: update `BUILD-BASELINE.md` (supersede the E02 console pins with an E04 section: new pins + audit 0 + dates) and `QA-SIGNOFF.md` (close the Phase-3 "Dependency status" deviation with the migration record; move the console advisories from open to resolved).
3. Run the secrets grep in the console repo: `grep -rniE "FIRECRAWL_API_KEY|sk-[a-zA-Z0-9]{8}" --exclude-dir=node_modules --exclude-dir=.next .` — expect no real matches.
4. Commit the console branch and push: `git add -A && git commit && git push -u origin phase4-console-migration`.
5. Commit + push the workshop docs change on its current phase branch.
6. Record branch names and commit SHAs in the notes.

**Required test:** `git push` succeeds for both repos; `git status --short` clean in both.

**DoD tests:**

1. `npm audit` still prints 0 in the console after the doc changes.
2. BUILD-BASELINE documents the new console pins with dates and supersedes E02 explicitly.
3. QA-SIGNOFF records the 7→0 remediation with dates.
4. Secrets grep shows no real matches.
5. Both repos: `git status --short` empty; branches pushed; `git log origin/main..HEAD` confirms no main commits.

**Expected result:** Docs truthful and dated; branches pushed; main untouched.

**Task DoD:** Traceability complete. **GATE C.**

**Stop:** No merge to main; no deployment. Await user review and release decisions.

## 8. Phase gate criteria

- **GATE A (after M02):** every volatile target verified against primary sources with dates; Tremor decision locked; notes committed.
- **GATE B (M08):** audit 0 (both trees), 80/80, 13-route build, lint green, parity 9/9, quickstart verified — all from a clean install.
- **GATE C (M09):** docs updated truthfully in both repos, secrets grep clean, branches pushed, main untouched, limitations explicit.

## 9. Whole-system DoD

- `npm audit` and `npm audit --omit=dev` both report 0 vulnerabilities in the console from a clean install.
- 80/80 tests (count preserved), 13-route build, lint green, ticket parity 9/9 — all from a clean install.
- The three planted bugs and their contract tests are untouched (diff shows no `src/domains` changes; if the Tremor fallback executed, changes are page-layer only and justified).
- Learner quickstart (`npm install`, `npm run dev`, `npm test`) verified end-to-end.
- Bilingual surface (README.es.md, tickets/es, parity script) intact and green.
- TS2802 standalone-`tsc` baseline re-checked and its post-migration status documented.
- BUILD-BASELINE and QA-SIGNOFF updated truthfully with dates; branches pushed; main untouched; no secrets committed.
- Remaining limitations explicit: real-device, screen-reader, release-Safari QA remain deferred exactly as recorded in QA-SIGNOFF; the console is still never deployed.

## 10. Volatile references (re-check at execution)

- `next` dist-tag `latest` (16.3.6 as of 2026-09-23) and `eslint-config-next` matching version.
- `vitest` 5.0.1 and its breaking-changes notes.
- `@tremor/react` ^3 peer-dependency range for react 19 (the M02 checkpoint).
- Node minimum for next 16 (≥20.9 per next docs at plan time).

Execution requires explicit user authorization. Do not start M01 without it.
