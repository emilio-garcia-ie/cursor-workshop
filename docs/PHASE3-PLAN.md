# PHASE 3 PLAN — Bilingual workshop, quizzes, file progress, single self-report, narrative + UI quality, step navigation

## 1. Goal and non-goals

**Goal:** Deliver a site + console where (a) ES/EN is selectable for **full content**, (b) each step ends with a **5-question self-graded quiz**, (c) progress auto-persists to **one overwritable file** (File System Access API) with localStorage + fixed-name export fallback, (d) completion is a **single, clearly-defined whole-step self-report**, (e) step pages end with **Next/Previous navigation** (finished state on step 33), (f) step narrative is **consistent, explicit, story-kept, why/what/where/how** for every learner action, (g) **ui-ux-pro-max** and **anti-slop** skills are installed; anti-slop runs **DURING** with curriculum prose exempt from its em-dash ban.

**Non-goals:** No DB, accounts, telemetry. Vercel deploy stays on hold. 520-point budget unchanged. Planted console bugs stay. Console stays Next 14/React 18. No full em-dash cleanup of curriculum prose. FS Access is Chrome/Edge-only with graceful fallback.

## 2. Verified baseline

- Site: Next 16.3.5 / React 19 / ESLint 9 flat / vitest 4.1.11; 54/54 unit + production browser suite PASS; 42-page build; home route dynamic (ƒ). 5 em-dashes in `site/src/`.
- Curriculum: 33 steps, 520 pts; each has Learn/Implement + exercise kit + `## Complete` list; only 14/33 have `#### Expected result`; **113 em-dashes** in `steps/`. No step-footer navigation.
- Console: Next 14.2.35, 80/80 tests, `.cursor` harness, tickets HLN-101–109. 10 em-dashes in learner docs.
- Skills verified from upstream: ui-ux-pro-max (`search.py`, `--design-system --persist`), anti-slop v3.2.9 (R-01–R-38, ENERGY/RHYTHM/MOTION dials, Delivery Gate, DURING/AFTER modes, R-37 requires `DESIGN.md`).

## 3. Critical review corrections

1. Narrative pass precedes translation (avoids re-editing ES twice).
2. Bilingual via `/es/*` path prefix; ES steps in `steps/es/*.md` with **identical frontmatter** → progress/tracks stay locale-independent.
3. Self-report conflates "did the work" and "verified outcome" → one whole-step checkbox; outcome = verified `Expected result` (guaranteed present by narrative pass).
4. FS Access handle must persist via **IndexedDB** (localStorage can't store a `FileSystemFileHandle`); fallback path preserved for Firefox/Safari.
5. anti-slop R-02 is a UI/copy filter; curriculum/console docs treated as documentation (exempt per its carve-out logic); site UI copy fully compliant. `DESIGN.md` created first (R-37).
6. Quiz is low-stakes, self-graded, instant feedback, no points (retrieval practice evidence).
7. ES is generated translation + termbase consistency check; documented as not native-reviewed (C-5).

## 4. Locked decisions

| Concern | Decision | Rationale |
|---|---|---|
| Bilingual scope | Full content (steps, glossary, bibliography, fact-check, quiz, UI); console README + tickets | User choice |
| Locale routing | `/es/*`; toggle persists; EN at bare paths | Shareable URLs; Next convention |
| Quiz | 5 MCQs/step, self-graded, local persistence, no points | User choice; retrieval practice |
| Progress | FS Access + IndexedDB, overwrite one `progress.json`, auto-load remembered file; localStorage + fixed-name fallback | User's merged answer; Vercel serverless can't persist files |
| Self-report | One whole-step checkbox; outcome = verified Expected result; per-tab removed | User choice |
| Navigation | Prev + Next step footer; finished state on 33; locale-aware | Predictable back nav; R-24/R-26 |
| Skills | Vendored into `cursor-workshop/.cursor/skills/` with license attribution | Self-contained; "the website should install" |
| anti-slop mode | DURING; curriculum/console docs exempt R-02; site UI compliant; DESIGN.md (R-37) | User choice |
| Console language | README + tickets bilingual; rules/skills/agents/hooks stay EN | Human-facing translated, machine-facing stable |
| ES provenance | Generated + termbase; documented not native-edited | Evidence over claims |
| Repos | Feature branch per repo; no direct-to-main; truthful messages | Existing policy |

## 5. Phase Order and dependency graph

P0 skills+direction → P1 narrative EN → P2 self-report + navigation → P3 quiz EN → P4 progress file → P5 bilingual site → P6 bilingual console → P7 QA + release gate.

---

## P0 — Skills install and design direction

### P0-1 — Install anti-slop + ui-ux-pro-max skills

**Requires:** None

**Outcome:** Both skills vendored under `cursor-workshop/.cursor/skills/`, unmodified, with attribution README (source + MIT licenses).

**Evidence:** Upstream verified (anti-slop `skills/`, ui-ux-pro-max `.claude/skills/ui-ux-pro-max/`). Completion proof is the vendored folder tree plus a runnable `search.py`.

**Steps:**

1. Copy anti-slop core + ui/copywriting/human/layoutmobile into `.cursor/skills/`.
2. Copy ui-ux-pro-max (SKILL.md, data/, references/, scripts/).
3. Write `.cursor/skills/README.md` (source, commit, MIT).
4. Verify `search.py` runs with `python3`.

**Required test:** `python3 .cursor/skills/ui-ux-pro-max/scripts/search.py "educational tutorial site warm minimal" --design-system`

**DoD tests:**

1. Confirm both trees exist with expected files (`ls .cursor/skills/` shows antislop* + ui-ux-pro-max).
2. Run the `search.py --design-system` command and confirm it returns a design system.
3. Run `git diff --stat .cursor/skills/` (new files only; no upstream file edited).
4. Confirm `.cursor/skills/README.md` exists with source URLs and MIT licenses.

**Expected result:** Skills usable and attributed.

**Task DoD:** Skills vendored, runnable, unmodified, attributed.

**Stop:** No redesign yet.

### P0-2 — Create DESIGN.md (R-37)

**Requires:** P0-1

**Outcome:** `site/DESIGN.md` documents identity, palette (cream `#faf6ef`, ink `#1c1917`, cursor-orange `#f54e00`, 7 module pastels), typography (Berkeley Mono brand + system sans), dials ENERGY 2 / RHYTHM 2 / MOTION 1, one-line reasons per decision (R-31), incl. footer-nav arrow purpose (R-08).

**Evidence:** `globals.css` tokens and module colors are the observed identity source. Completion proof is the DESIGN.md content matching those tokens with a stated reason per field.

**Steps:**

1. Draft DESIGN.md from the observed identity including a Design Read line and dial values.
2. Cross-check palette/typography via ui-ux-pro-max `--design-system` and `--domain color`/`--domain typography` queries.
3. Record a one-line reason for every design field (color, layout, typography, spacing, arrow).
4. Confirm DESIGN.md references the live `globals.css` tokens.

**Required test:** Read `site/DESIGN.md`; every design field has a reason.

**DoD tests:**

1. Confirm DESIGN.md covers identity, palette, typography, dials, and reasons.
2. Confirm palette values match `globals.css` (`--cream`, `--ink`, `--cursor-orange`, module pastels).
3. Run the anti-slop liveliness block for dials ENERGY 2 / RHYTHM 2 / MOTION 1 and confirm consistency.

**Expected result:** Reviewable direction.

**Task DoD:** DESIGN.md created and consistent with the live design.

**Stop:** No UI implementation.

### P0-3 — Clean site UI copy to anti-slop

**Requires:** P0-2

**Outcome:** The 5 em-dashes in `site/src/` removed; no R-15/R-16 violations in UI copy.

**Evidence:** grep count baseline `grep -ro "—" site/src/ | wc -l` = 5 (verified). Completion proof is grep returning 0 plus green suites.

**Steps:**

1. Locate each em-dash in `site/src/` and rewrite per R-02 (comma, period, colon, or parentheses).
2. Scan UI copy for generic CTAs (R-15) and AI buzzwords (R-16); rewrite any found.
3. Run lint, typecheck, and unit tests.

**Required test:** `grep -rn "—" site/src/` returns 0.

**DoD tests:**

1. Run the grep and confirm zero em-dashes remain in `site/src/`.
2. Run `npm run lint` and `npm run typecheck` in `site/` and confirm clean.
3. Run `npm test` in `site/` and confirm 54/54 pass.
4. Confirm no curriculum file (`steps/`) was modified.

**Expected result:** Compliant UI copy.

**Task DoD:** Filter-clean; no behavior change.

**Stop:** Do not touch curriculum prose.

**P0 GATE:** Skills runnable; DESIGN.md reviewed by user.

---

## P1 — Narrative enhancement (EN)

### P1-1 — Narrative standard + why/what/where/how checklist

**Requires:** P0-3

**Outcome:** `curriculum-standards.md` defines consistent voice, Hearthline story thread, a 4W+H clause for every learner action, and a mandatory `#### Expected result` per step; anti-slop DURING pointer added to `AGENTS.md`.

**Evidence:** Only 14/33 steps have Expected result; "expected outcome" has no referent (verified grep). Completion proof is the standard file plus the AGENTS.md pointer.

**Steps:**

1. Write `curriculum-standards.md` with the 4W+H template (Why, What, Where, How) and voice/story rules.
2. Define the one-line `Expected result` format that feeds the self-report in P2.
3. Append the anti-slop DURING pointer block to `AGENTS.md` (curriculum-exempt note).
4. Validate the template against 2 sample steps.

**Required test:** Read the standard; all steps must satisfy the checklist after P1-2.

**DoD tests:**

1. Confirm `curriculum-standards.md` exists and defines 4W+H + Expected result format.
2. Confirm `AGENTS.md` contains the anti-slop pointer.
3. Confirm the template applied to 2 sample steps passes the checklist.
4. Confirm no step file was edited.

**Expected result:** Reviewable contract.

**Task DoD:** Standard + pointer committed; no step edits.

**Stop:** No step edits.

### P1-2 — Rewrite all 33 steps to the standard

**Requires:** P1-1

**Outcome:** Every step body in `steps/` is consistent in voice, keeps the Hearthline story, gives why/what/where/how for each action, and ends with an explicit `#### Expected result`; frontmatter byte-identical; `## Complete` list converted to a parser-compatible single line.

**Evidence:** Baseline 33 files / 14 with Expected result; P1-1 is the contract. Completion proof is 33 files each with `#### Expected result` and zero frontmatter diff.

**Steps:**

1. Preserve frontmatter exactly (step/points/module/versions/personas).
2. Apply the 4W+H template to every imperative action; keep story + exercise kit.
3. Convert the closing `## Complete` list to a single parser-compatible line.
4. Ensure each step has `#### Expected result` aligned with the self-report language.
5. Run `npm test` after every batch of ~5 steps.

**Required test:** `npm test` (54/54) + step round-trip.

**DoD tests:**

1. Run `grep -l "#### Expected result" steps/*.md | wc -l` and confirm 33.
2. Run `git diff --stat` on steps frontmatter and confirm zero frontmatter changes.
3. Run `npm test` in `site/` and confirm 54/54 green.
4. Manually review 6 sampled steps for 4W+H + story consistency.
5. Run `npm run build` in `site/` and confirm it passes.

**Expected result:** 33 consistent explicit steps.

**Task DoD:** Narrative complete, test-stable, frontmatter untouched.

**Stop:** No translation yet.

**P1 GATE:** Standard + 33 steps conform; suites green; user samples.

---

## P2 — Single self-report + step navigation

### P2-1 — RED: dual self-report → one whole-step model

**Requires:** P1-2

**Outcome:** Failing tests assert: no per-tab checkboxes; exactly one self-report checkbox linking to Expected result; outcome flag explained.

**Evidence:** `StepTabs.tsx:58-67` per-tab boxes; `StepProgress.tsx:15-21` whole-step + outcome; `tabs.ts:49-60` drops Complete list; `browser.mjs:22-50` asserts old behavior.

**Steps:**

1. Update unit tests to assert tab output drops the `## Complete` list items.
2. Update `browser.mjs` to assert one self-report checkbox + zero per-tab checkboxes.
3. Run only the updated tests and capture failures scoped to the removed surface.

**Required test:** `npm test` + `QA_PRODUCTION=1 npm run test:browser` (scoped failures).

**DoD tests:**

1. Run the updated tests and confirm failures are only about the self-report surface.
2. Run `git diff --name-only` and confirm only test files changed.

**Expected result:** Tests fail for the right reason.

**Task DoD:** RED valid; no component changed.

**Stop:** No implementation.

### P2-2 — GREEN: implement single self-report

**Requires:** P2-1

**Outcome:** StepTabs shows no completion checkboxes; StepProgress shows one checkbox referencing the step's Expected result anchor; `outcome` flag retained but explained; progress model unchanged.

**Evidence:** P2-1 RED defines behavior; `setAggregate`/`aggregateFlag` reused from `progress.ts`.

**Steps:**

1. Edit `StepTabs.tsx`: remove the per-tab checkbox block; keep the revision-review note.
2. Edit `StepProgress.tsx`: single checkbox "Mark step complete (self-report)" linking to the `#expected-result` anchor.
3. Add an anchor id to `#### Expected result` in the markdown renderer.
4. Run unit + browser suites.

**Required test:** `npm test` (54/54) + `QA_PRODUCTION=1 npm run test:browser` PASS.

**DoD tests:**

1. Run both suites and confirm all updated tests pass.
2. Run `grep -rn "Mark .* complete (self-report)" site/src/components/` and confirm only the single whole-step control.
3. Run `npm run typecheck` and `npm run lint` and confirm clean.

**Expected result:** One clear self-report.

**Task DoD:** Implemented; old double-ask removed; suites green.

**Stop:** No quiz yet.

### P2-3 — Next-step navigation footer

**Requires:** P2-2

**Outcome:** Step pages end with Prev (secondary) + Next (primary, "Next: Step N — Title"); step 33 shows "All steps complete" → home; locale-aware; preserves `?version`/`?persona`.

**Evidence:** `getSteps()` ordered by step number (`curriculum.ts:36-55`); no footer exists today.

**Steps:**

1. Add `src/lib/navigation.ts` (prev/next via index ±1, null-safe at boundaries; locale-prefixed hrefs; query preservation).
2. Render the footer after self-report with specific labels (R-15).
3. Step 33 → finished state linking to `/` (or `/es`).
4. Add unit tests (boundaries, locale, query) + browser assertion.

**Required test:** `npm test` + `QA_PRODUCTION=1 npm run test:browser`.

**DoD tests:**

1. Run nav unit tests and confirm first/last boundaries pass.
2. Browser: confirm step 1 Next navigates to `/steps/02-clone-and-run`.
3. Browser: confirm step 33 shows the finished state with no dead link.
4. After P5-1, confirm the ES route navigates to `/es/steps/...`.
5. Run lint/typecheck/build and confirm green.

**Expected result:** Full-track walk via footers in either language.

**Task DoD:** Footer implemented, locale-ready, no dead controls.

**Stop:** No nav redesign elsewhere.

**P2 GATE:** One self-report + footer verified in browser; suites green.

---

## P3 — Per-step quiz (EN)

### P3-1 — RED: quiz markdown spec + parser

**Requires:** P2-2

**Outcome:** Failing parser tests for `## Quiz`: 5 questions (question, 4 options, correct index, explanation), validated/normalized in `quiz.ts`; Quiz added to tab labels.

**Evidence:** `tabs.ts` treats unknown H2s as body; a Quiz tab needs a recognized label.

**Steps:**

1. Write the quiz markdown grammar in `src/lib/quiz.ts`.
2. Add `Quiz` to the labels map in `tabs.ts`.
3. Add `quiz.test.ts` with a canonical sample and malformed cases.

**Required test:** `npm test` scoped to quiz (expected failures).

**DoD tests:**

1. Run the quiz tests and confirm failures are only missing-parser behavior.
2. Run `git diff --name-only` and confirm no production renderer changed.

**Expected result:** Parser tests fail for missing implementation.

**Task DoD:** RED valid.

**Stop:** No quiz UI.

### P3-2 — GREEN: Quiz component

**Requires:** P3-1

**Outcome:** `Quiz.tsx` client component: 5 MCQs, submit grading, instant per-question feedback + explanation + score, attempts persisted (no points), accessible (radio group, focus, ARIA). Progress schema gains a `quiz` map (validate + migrate).

**Evidence:** P3-1 parser contract; anti-slop R-26/R-32/R-35 apply.

**Steps:**

1. Implement `Quiz.tsx` and wire into the StepTabs quiz tab.
2. Extend progress v2 schema/validator with a `quiz` map.
3. Add unit tests for grading, score, persistence, and validation.

**Required test:** `npm test` + `npm run build`.

**DoD tests:**

1. Run parser + grading + persistence tests and confirm green.
2. Browser: confirm quiz tab is keyboard-navigable, submit shows feedback, reload restores answers.
3. Run `npm run lint` and `npm run typecheck` and confirm clean.

**Expected result:** Working self-graded quiz per step.

**Task DoD:** Quiz + schema complete, tested.

**Stop:** No quiz content yet.

### P3-3 — Author 33 quizzes (EN)

**Requires:** P3-2

**Outcome:** Each step ends with `## Quiz` containing 5 validated questions aligned to that step (distractors from Common mistakes).

**Evidence:** P3-2 grammar; P1 narrative is the source.

**Steps:**

1. Author one quiz per step.
2. Validate each via the parser.
3. Run suites and confirm 33 quiz tabs render.

**Required test:** `npm test` + `npm run build`.

**DoD tests:**

1. Confirm all 33 steps contain a valid 5-question `## Quiz`.
2. Run all unit + browser tests and confirm green.
3. Manually review 3 sampled quizzes against their step content.

**Expected result:** 165 validated EN questions.

**Task DoD:** Quizzes authored/parsed/rendered.

**Stop:** No translation yet.

**P3 GATE:** Quiz on all 33 pages; suites green; samples reviewed.

---

## P4 — Progress: one overwritable file + auto pickup

### P4-1 — RED: progress file adapter spec

**Requires:** P3-2

**Outcome:** Failing tests define `ProgressFileAdapter`: `pickFile`, `readRemembered` (IndexedDB handle → auto-load), `saveToFile` (overwrite same handle), `forget`; fallback when FS Access unavailable.

**Evidence:** `ProgressTools.tsx` is manual export/import only; handles can't live in localStorage.

**Steps:**

1. Write `fileProgress.ts` with the adapter interface + IndexedDB store + permission flow.
2. Add `fileProgress.test.ts` with mocked pickers + handle store; assert overwrite = same handle, remembered-open = same file.
3. Run only the new tests.

**Required test:** `npm test` scoped to `fileProgress.test.ts`.

**DoD tests:**

1. Run the adapter tests and confirm failures are only missing-adapter behavior.
2. Run `git diff --name-only` and confirm no production code changed.

**Expected result:** Adapter tests fail for the right reason.

**Task DoD:** RED valid.

**Stop:** No UI wiring.

### P4-2 — GREEN: adapter + IndexedDB + fallback

**Requires:** P4-1

**Outcome:** Adapter implemented; save overwrites one `progress.json`; load auto-reads remembered file without a picker; fallback = localStorage + fixed-name export/import.

**Evidence:** P4-1 tests; Vercel statelessness (server route rejected); Chrome/Edge-only scope documented.

**Steps:**

1. Implement the adapter + IndexedDB + permission flow.
2. Keep the fixed filename fallback (`hearthline-progress.json`).
3. Wire ProgressTools UI ("Save to progress file", auto-load on revisit, unsupported-state copy).

**Required test:** `npm test` + `QA_PRODUCTION=1 npm run test:browser` (stubbed FS Access).

**DoD tests:**

1. Run adapter unit tests and confirm green.
2. Browser (stub picker): confirm save writes the same mocked handle twice (overwrite), reload auto-reads.
3. Confirm fallback export/import still works and old browser checks pass.
4. Run lint/typecheck/build and confirm green.

**Expected result:** Progress auto-saves/auto-loads one remembered file.

**Task DoD:** Adapter + UI complete, both paths tested.

**Stop:** No i18n yet.

**P4 GATE:** Both paths tested in-browser; suites green.

---

## P5 — Bilingual (site, full content)

### P5-1 — Locale routing + UI string i18n

**Requires:** P3-3, P4-2

**Outcome:** `/es/*` routes; toggle persists (localStorage + URL); all UI strings from EN/ES catalog; `lang` attr + metadata switch; step-footer links locale-correct (P2-3).

**Evidence:** Hardcoded strings across 6 components; `generateStaticParams` currently has one dimension.

**Steps:**

1. Add `src/lib/i18n.ts` (string catalog + locale helper) and a `LocaleProvider`.
2. Refactor components to use the catalog.
3. Add a locale dimension to `generateStaticParams` for step pages.
4. Add i18n completeness tests.
5. Assert footer nav locale-correctness in ES.

**Required test:** `npm test` + `npm run build` (page count doubles).

**DoD tests:**

1. Run the completeness test and confirm every EN string has an ES value.
2. Browser: confirm the toggle persists across reload.
3. Browser: confirm `lang="es"` on ES pages.
4. Browser: confirm footer links are locale-correct in `/es`.
5. Run build/typecheck/lint and confirm green.

**Expected result:** Locale-aware site + working toggle.

**Task DoD:** Routing + i18n complete; no content translated.

**Stop:** No content translation.

### P5-2 — ES termbase + checker

**Requires:** P5-1

**Outcome:** `i18n/termbase.csv` (≥40 EN→ES terms) + `scripts/check-termbase.mjs` (offline, CI/test-run).

**Evidence:** Recurring domain vocabulary; consistency is the main translation risk.

**Steps:**

1. Build the termbase from 3 sample steps.
2. Add the checker script.
3. Document the guard.

**Required test:** `node scripts/check-termbase.mjs`.

**DoD tests:**

1. Confirm the termbase has ≥40 entries.
2. Run the checker and confirm it passes clean.
3. Confirm the checker is referenced in a test/CI path.

**Expected result:** Consistent ES vocabulary.

**Task DoD:** Termbase + checker committed.

**Stop:** Begin translation after.

### P5-3 — Translate 33 steps + quizzes to ES

**Requires:** P5-2

**Outcome:** `steps/es/<slug>.md` for all 33, identical frontmatter, translated bodies/quizzes; Expected results + quizzes aligned.

**Evidence:** P5-1 loader reads `steps/es/`; P5-2 termbase.

**Steps:**

1. Generate ES files applying termbase terms.
2. Add a frontmatter-equality script.
3. Verify ES quiz parse + render.

**Required test:** `npm test` + `npm run build` + frontmatter check.

**DoD tests:**

1. Confirm 33 ES step files exist with matching frontmatter.
2. Confirm each ES file passes the quiz/tabs parser.
3. Browser/build: confirm `/es/steps/*` renders.
4. Run the termbase checker and confirm pass.
5. Review 3 sampled ES steps for fidelity (documented: generated, not native-edited).

**Expected result:** Full bilingual step content.

**Task DoD:** ES steps/quizzes complete.

**Stop:** No ship yet.

### P5-4 — Glossary, bibliography, fact-check, track labels

**Requires:** P5-3

**Outcome:** `glossary.es.md`, `bibliography.es.md`, `fact-check.es.md`; `/es/glossary`, `/es/bibliography` served; bibliography anchors stable; picker labels localized.

**Evidence:** Pages read files via `fs`; `#n` anchors are citation targets.

**Steps:**

1. Add ES files preserving anchors/URLs.
2. Locale-select in the two pages.
3. Localize tracks/persona labels.

**Required test:** `npm test` + build + anchor-parity script.

**DoD tests:**

1. Confirm ES glossary/bibliography/fact-check render.
2. Run the anchor-parity check and confirm bibliography anchors match EN.
3. Confirm citation links resolve.
4. Run the build and confirm green.

**Expected result:** Bilingual supporting pages.

**Task DoD:** Supporting content bilingual, anchor-safe.

**Stop:** No console work yet.

**P5 GATE:** `/es/*` fully renders; EN unaffected (regression run).

---

## P6 — Bilingual (console)

### P6-1 — Console README + language entry

**Requires:** P5-4

**Outcome:** `README.es.md` mirrors README; cross-links; console mini-termbase; note rules/skills stay EN.

**Evidence:** README is learner-facing (Step 2 first-read).

**Steps:**

1. Translate README to ES and add language links.
2. Add the code-facing-stays-EN note.

**Required test:** Read both files; links resolve; console `npm test` 80/80.

**DoD tests:**

1. Confirm `README.es.md` exists and mirrors structure.
2. Confirm cross-links are present.
3. Run console `npm test` and confirm 80/80 green.

**Expected result:** Bilingual console README.

**Task DoD:** README translated; suite green.

**Stop:** No rules/skills translation.

### P6-2 — Learner-facing tickets bilingual

**Requires:** P6-1

**Outcome:** HLN-101–109 tickets gain ES versions with acceptance criteria meaning-identical.

**Evidence:** Tickets are the learner contract; criteria must not drift.

**Steps:**

1. Add `docs/tickets/es/<ticket>.md` for HLN-101..109.
2. Add cross-link headers; add a parity script.

**Required test:** Parity script + console `npm test`.

**DoD tests:**

1. Confirm all 9 tickets have ES versions.
2. Run the parity script and confirm acceptance criteria match.
3. Run console `npm test` and confirm 80/80 green.

**Expected result:** Bilingual learner tickets.

**Task DoD:** Tickets bilingual, parity checked.

**Stop:** No further workshop changes.

**P6 GATE:** Console bilingual surface complete; parity checked.

---

## P7 — QA, anti-slop gate, release

### P7-1 — Full deterministic verification

**Requires:** P5-4, P6-2

**Outcome:** Workshop: unit (i18n, quiz, file adapter, nav), browser suite (EN+ES, both progress paths, quiz, self-report, footer nav), typecheck, lint, ~80-page build. Console: 80/80 + build. Audit 0 both.

**Evidence:** P5/P6 gates passed; verification proof is clean suites + audit 0.

**Steps:**

1. Run all suites in both repos from clean installs.
2. Run `npm audit` in both repos.

**Required test:** Full suites + audit.

**DoD tests:**

1. Confirm all workshop suites pass.
2. Confirm console 80/80 passes.
3. Confirm `npm audit` reports 0 in both repos.
4. Confirm both builds pass.

**Expected result:** Everything green deterministically.

**Task DoD:** Deterministic verification complete.

**Stop:** No ship.

### P7-2 — anti-slop Delivery Gate + browser QA (both locales)

**Requires:** P7-1

**Outcome:** Delivery Gate PASS/FAIL report (4 blocks) + click-through evidence incl. footer nav (R-35); screenshots 390/1440px EN+ES; keyboard/contrast checks.

**Evidence:** anti-slop R-35/32/25; ui-ux-pro-max UX checklist.

**Steps:**

1. Run the anti-slop Delivery Gate against the site UI/copy; fix FAILs and re-run.
2. Run ui-ux-pro-max `--domain ux` checks for the quiz/self-report/progress/toggle surfaces.
3. Capture and inspect screenshots for EN+ES, mobile+desktop.

**Required test:** Gate report + `QA_PRODUCTION=1 npm run test:browser` both locales.

**DoD tests:**

1. Confirm the Delivery Gate report is all-PASS with evidence lines.
2. Inspect screenshots and confirm no 390px overflow.
3. Confirm keyboard nav on quiz/toggle/progress/nav.

**Expected result:** Clean evidence-backed gate.

**Task DoD:** Gate + visual QA signed.

**Stop:** No commit yet.

### P7-3 — Traceability + docs + branch commits

**Requires:** P7-2

**Outcome:** QA-SIGNOFF updated (bilingual, quiz, file progress, single self-report, nav, skills install, ES provenance, deferred QA); workshop + console branches committed + pushed; no direct-to-main.

**Evidence:** Repo policies (branch per deliverable); prior D02 practice.

**Steps:**

1. Update `QA-SIGNOFF.md`, `BUILD-BASELINE.md`, site/console READMEs.
2. Branch + commit + push both repos.
3. Record the vendored skills + licenses.

**Required test:** `git status --short` clean; push succeeds.

**DoD tests:**

1. Confirm docs are truthful and consistent.
2. Confirm branches pushed, main untouched.
3. Run the secrets grep and confirm no matches.

**Expected result:** Released branches with traceability.

**Task DoD:** Committed, pushed, documented.

**Stop:** No merge/deploy.

### P7-4 — Whole-system DoD sign-off

**Requires:** P7-3

**Outcome:** Signed DoD covering every feature end-to-end both languages, both progress paths, one self-report, 33 quizzes, nav, narrative standard, skills, anti-slop gate, audit 0; Vercel on hold pending user review.

**Evidence:** P7-1..P7-3 artifacts.

**Steps:**

1. Run the final DoD checklist.
2. Surface remaining limitations.
3. Await user decision on merge + Vercel.

**Required test:** DoD checklist all boxed with evidence.

**DoD tests:**

1. Confirm every DoD item has evidence.
2. Confirm limitations are explicit (generated ES, FS Access scope, deferred QA).
3. Confirm release gates are notified to the user.

**Expected result:** Shippable Phase-3 state awaiting user release decisions.

**Task DoD:** Signed off.

**Stop:** Await user release decisions.

---

## Whole-System DoD

- ES/EN selectable site (content + UI) + console (README + tickets).
- 33 × 5 self-graded quizzes, no points impact, persisted locally.
- Progress overwrites one remembered `progress.json` (FS Access) with auto-pickup; localStorage + fixed-name fallback intact.
- Exactly one whole-step self-report per step; outcome tied to present `Expected result`.
- Prev/Next footer on every step; finished state on step 33; locale-aware; no dead links.
- Narrative standard applied to all 33 EN steps; frontmatter untouched; story + 4W+H explicit.
- anti-slop + ui-ux-pro-max installed with attribution; anti-slop DURING gate PASS; site UI copy em-dash-free.
- All deterministic suites green (clean install), audit 0, branches pushed, main untouched.
- Limitations documented: generated ES (termbase-checked, not native-edited); FS Access Chrome/Edge-only; deferred real-device/screen-reader/cross-browser QA; Vercel on hold.

**Volatile to re-check at execution:** skill commit SHAs at vendor time; FS Access API availability; Next 16 patch releases.