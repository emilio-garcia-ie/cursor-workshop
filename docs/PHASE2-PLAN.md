# Phase 2 Execution Plan — Cursor Workshop Depth Enhancement

## Goal and Non-Goals

**Goal:** Deepen the shipped 33-step Cursor curriculum and its Hearthline case study to definitive-treatment status: freshness pass with reusable `curriculum-refresh` skill, additive case-study expansion, deepened steps with exercise kits, tabbed site UI, progress v2 with resume, re-QA, ship.

**Non-Goals:** fixing the 3 planted bugs in the repo; backend/database/telemetry for progress; editing tickets HLN-101–103 or existing case-study config (except freshness invalidation path); real-device or screen-reader QA; Vercel deployment.

## Verified Baseline (historical starting state; execution updates below)

- Recorded starting revision: cursor-workshop d4ac1b8, previously clean and pushed to origin/main; this is not a claim that the current worktree is clean.
- Historical starting budget: 33 steps, 440 points total (modules 70/65/60/40/50/60 + bonus 95); preserve this baseline and dated 440-point records when updating current totals.
- Starting bibliography has 33 entries with a September 11 fetch assertion; [32] lists a publication date rather than an individual access date. September 11 to September 16 is 5 days, not >14 days. The audit was explicitly requested, not triggered by age. Freshness is a rolling 14 days from each source's last successful content verification.
- Starting fact-check.md has 47 table rows; new rows must follow `specs/fact-check-schema.md` (one distinct claim per row; verdict `confirmed`, `corrected`, or `cut`). Unverified/pending dispositions belong in the freshness ledger, not invented verdicts or false confirmations.
- cursor-workshop already has `.cursor/rules/curriculum.mdc`; preserve it. The four B02 freshness files now also exist. hearthline-operator-console has `.cursor/` with 6 rules, 3 skills, 2 agents, hooks.json + pre-push-check.sh.
- Site renders steps as one Markdown blob: no tabs, no copy buttons; step H1 duplicated; "## Complete" GFM checklist rendered but inert.
- StepProgress.tsx v1 stores slug-keyed `{complete, outcome}` under `hearthline-progress-v1`; no validation, no version field, 8 documented hardening hazards.
- Starting site/package.json had only dev/build/start/lint; F02 has since added typecheck (verified in the current file). No test script yet.
- tracks.ts hard-codes track sets; "long version shows everything" is false when a persona is selected.
- Known content conflicts: Step 5 vs Step 14 HLN-102 ticket-ID contradiction; Step 5/Step 22 exercise overlap; Build Battle promised in Steps 1–2 but never delivered as a named artifact.

## Execution Status — 2026-09-16

The user authorized plan execution. The preceding plan-correction subtask changed only this plan; that local boundary does not suspend implementation. Keep integrations opt-in and Vercel deployment on hold. Record each task's evidence separately from source verification.

| Task | Truthful status and evidence |
|---|---|
| F01 | Format validator previously passed; that did not validate scope or factual accuracy. Scope audit is being corrected in this revision; re-run the validator afterward. |
| F02 | Typecheck script added; lint and typecheck passed in prior execution (also recorded in FRESHNESS validation). |
| B01 | Evidence available: 32/33 exact bibliography sources plus content-verified canonical replacement for [28]; original failed URL remains failed. Follow-up resolves source/design questions B01-F01–F06, not runtime acceptance or G-B0. |
| B02 | Four files read and verified: SKILL.md, both references, and curriculum-freshness.mdc; existing curriculum.mdc remains. Their existence is not a runtime gate pass. |
| B03/B04/G-B0 | Source inventory and 31-finding classification complete; counterpart dispositions recorded. Source gate passed, not runtime verification. |
| A01–A06 | Additive artifacts implemented; MCP delivered as mcp.example.json and hooks as separate opt-in registration. 80 tests pass (33 baseline + 47 new), lint/build pass; clean snapshot install/tests/build pass. No live integration activation. |
| B10/G-B | All 33 steps deepened, corrections reconciled, stable IDs retained. Active totals short 215 / medium 355 / long 520; glossary and hook diagram synchronized. |
| C01–C04 | 54 tests pass, site lint/typecheck/build pass; production browser tests cover migration/recovery/export/import/resume, keyboard tabs and current totals. Mobile/desktop screenshots refreshed. QA-SIGNOFF.md records exact scope. |
| G-C | Local functional checks pass. Release readiness withheld for production dependency findings; real-device/screen-reader and live integrations remain unverified. |
| D01/D02 | Incomplete. Preliminary secrets/diff checks show no reported hits; final release review and public-clone verification remain pending. No Phase-2 commits/pushes or Vercel deployment. |

Final local checks on 2026-09-17 were rerun without output pipelines: site test, lint, typecheck and build; console test, lint, build and diagnostic typecheck with ES2017; production browser suite. Console default-target standalone typecheck remains a pre-existing TS2802 failure. npm audit --omit=dev reports critical Next.js and high nested PostCSS package findings. Do not assume a static export or user risk acceptance; obtain approval for dependency remediation before deployment.

FRESHNESS's initial and follow-up handoffs retain older B02–B04 status statements; this status table records later B02 verification without rewriting that historical report. Carry B01's existing stable IDs forward rather than renumbering them.

## Critical Review and Corrections

- C1 (sequencing): The prompt placed the skill build under P-A but sequencing under P-B0; the plan builds the `curriculum-refresh` skill in Phase B0 before its first use.
- C2 (tab renderer): The 4-tab renderer is the riskiest UI change because the step schema has exceptions (Step 1 The project + Implement; Steps 9–10 no Pro tips; Step 11 Terminology; bonus steps Learn+Implement). It is therefore gated behind RED contract tests with per-exception fixtures.
- C3 (parser): The site's frontmatter parser is regex-based, not YAML; deepening tasks must not introduce inline comments in frontmatter.
- C4 (verification): The starting site lacked test/typecheck scripts; F02's typecheck now exists and passed. Use typecheck, build and lint until vitest arrives in C01; preserve historical results separately from current checks.
- C5 (progress): The v1-to-v2 migration must validate the legacy shape; silent casts caused 8 documented hazards. Same-browser resume is the chosen MVP scope, not an evidenced industry pattern. Do not repeat the unsupported freeCodeCamp/Exercism anecdote or infer cross-device demand from >30% across-session resumes. Future sync requires demonstrated cross-device needs plus explicit cost/privacy approval; no Phase-2 telemetry.
- C6 (authorization): New console artifacts are additive-only. Do not edit existing hooks.json to register additions. Deliver a separate opt-in example registration; activation requires later approval. Only a genuinely established Cursor freshness invalidation, linked to the affected claim/config and fact-check evidence, permits a minimal existing-config correction; schema support, old prose errors, and new features alone do not establish that exception.
- C7 (MCP): The requested targets are GitHub, Playwright, Postgres, and Slack. A custom server may not replace Slack. Prepared samples, authenticated connections, and external QA are distinct states; never invent endpoint URLs or run real integrations by default.
- C8 (gates): B0 verifies source inventory, classification and propagation disposition, not A's runtime acceptance. Source support permits later implementation/tests; runtime failures block dependent runtime claims, not the preceding source gate. Required offline tests cannot be replaced by passing stubs or skipped tests.
- C9 (propagation/history): Add counterparts only for demonstrated practice needs. Preserve historical 440-point evidence; update current published totals only.

## Locked Decisions

| Concern | Decision |
|---|---|
| Point budget | Raise to 500–540; exact total proposed in tracks.md, short ⊂ medium ⊂ long preserved |
| Case study | Additive-only; only evidenced freshness invalidation permits minimal existing-config edits; no new registrations in existing hooks.json |
| Integrations | Inert opt-in samples first; no activation, authenticated connections, publication, or real external activity by default |
| Deferred QA | Device/screen-reader checks documented; localStorage click-test required if interactive browser available; external QA separately conditional on approval, credentials and tenant eligibility |
| Progress | Same-browser localStorage v2 MVP with export/import, no database/telemetry; future sync only after demonstrated cross-device need and cost/privacy approval |

## Phase Order

F (foundation) → B0 (source inventory, classification, propagation disposition) → A (additive artifacts and offline runtime tests) → B (content deepening) → C (site/QA) → D (ship, only with separate explicit approval).

B0 does not depend on A runtime results or later B10 prose edits. Map those obligations forward; do not certify unresolved behavior. External QA is a separate conditional acceptance layer: absent approval or credentials, report not run and withhold connection/enforcement claims without pretending the offline/source gates failed or that external tests passed.

---

## Phase F — Foundation

### F01 — Save and validate the plan

**Requires:** None

**Outcome:** This plan file exists at `/Users/emilio/Documents/cursor-training/PHASE2-PLAN.md` and passes the skill validator.

**Evidence:** Build mode was previously blocked (plan mode); the validator is `/Users/emilio/.agents/skills/atomic-executable-plan/scripts/validate_plan.py`. Completion evidence is a zero-exit validator run.

**Steps:**

1. Read and conservatively correct the existing `/Users/emilio/Documents/cursor-training/PHASE2-PLAN.md`; preserve task IDs and unrelated content.
2. Run `python3 /Users/emilio/.agents/skills/atomic-executable-plan/scripts/validate_plan.py /Users/emilio/Documents/cursor-training/PHASE2-PLAN.md`.
3. Fix any reported validation errors and re-run until exit 0.

**Required test:** `python3 /Users/emilio/.agents/skills/atomic-executable-plan/scripts/validate_plan.py /Users/emilio/Documents/cursor-training/PHASE2-PLAN.md`

**DoD tests:**

1. Run the validator and confirm exit code 0 with no error lines.
2. Compare `git -C /Users/emilio/Documents/cursor-training status --short` with entry status and inspect the plan diff; confirm this correction changed only `PHASE2-PLAN.md`, preserving all pre-existing untracked work.

**Expected result:** Validator exits 0.

**Task DoD:** A validated plan file exists and no other file in cursor-training changed.

**Stop:** Do not start B01 in this task.

### F02 — Add typecheck script to the site

**Requires:** F01

**Outcome:** `site/package.json` gains a working `typecheck` script and its baseline result is recorded.

**Evidence:** Baseline inspection showed `site/package.json:5–10` contains only dev/build/start/lint; Phase gates need typecheck.

**Steps:**

1. Edit `/Users/emilio/Documents/cursor-workshop/site/package.json` to add `"typecheck": "tsc --noEmit"`.
2. Run `npm run typecheck` in `site/` and record the result in the task log.

**Required test:** `npm run typecheck` (working directory: `/Users/emilio/Documents/cursor-workshop/site`)

**DoD tests:**

1. `npm run typecheck` exits 0.
2. `git -C /Users/emilio/Documents/cursor-workshop diff --name-only` lists only `site/package.json`.

**Expected result:** Typecheck passes cleanly.

**Task DoD:** Script exists, passes, and only package.json changed.

**Stop:** Do not add a test script or any dependencies in this task.

---

## Phase B0 — Freshness pass

### B01 — Audit all current bibliography sources and the Cursor changelog

**Requires:** F01

**Outcome:** `cursor-workshop/FRESHNESS-2026-09.md` records each source's body evidence, verification date, HTTP observation (or unknown), and NEW/CHANGED/DEPRECATED findings versus current coverage, with unresolved claims explicitly blocked.

**Evidence:** The user explicitly requested this audit. September 11 to 16 is five days; apply a rolling 14-day window from each source's last successful content verification, not the prompt's fixed calendar anchor. Existing report and additive follow-up provide 32 exact sources plus canonical replacement evidence for [28].

**Steps:**

1. Inventory ALL current bibliography URLs (33 at the starting baseline); retain IDs and inspect existing report/capture provenance before fetching again.
2. Fetch substantive bodies for missing or stale evidence using recorded/discovered URLs only; reuse in-window verified captures with provenance. Record observed HTTP status or `HTTP unknown`, never infer 200 or reset dates from a HEAD response.
3. Inspect the fetched docs index and changelog, following discovered links; distinguish new-to-coverage from newly released features. Do not claim a historical textual diff without prior source snapshots.
4. Record NEW, CHANGED, DEPRECATED and unavailable/unverified findings with affected claims/steps; a failed URL is not product deprecation.
5. Preserve the original [28] failure and identify the verified canonical replacement separately; resume from evidence rather than repeating completed fetches.

**Required test:** Named inventory reconciliation: every current bibliography ID has one primary source row plus linked follow-up evidence, including explicit failures and replacements.

**DoD tests:**

1. Reconcile the source table against bibliography IDs: baseline 33 accounted for, 32 exact content verifications plus canonical replacement for [28], not 33 successful exact fetches; every row has provenance and honest HTTP observation.
2. Named inspection: each finding identifies affected claims/steps and its evidence or blocker; no runtime acceptance inferred from source retrieval.

**Expected result:** No URL silently skipped; failures recorded as fact-check candidates.

**Task DoD:** Freshness report exists in cursor-workshop with complete coverage.

**Stop:** Do not edit any step file in this task.

### B02 — Build the curriculum-refresh skill and freshness rule

**Requires:** B01

**Outcome:** `cursor-workshop/.cursor/skills/curriculum-refresh/` (SKILL.md plus references/freshness-checklist.md and references/bibliography-policy.md) and `cursor-workshop/.cursor/rules/curriculum-freshness.mdc` exist per the Living Curriculum section of IMPROVED_PROMPT.md.

**Evidence:** Existing `.cursor/rules/curriculum.mdc` predates this work and must remain untouched. All four requested B02 files have now been read and verified; on resume inspect them rather than recreate them. Their rolling-window, claim-level evidence and report/apply boundaries match the requested freshness mechanism.

**Steps:**

1. Create `SKILL.md` with triggers "refresh curriculum" and "check for new cursor features" and a short procedure overview.
2. Write `references/freshness-checklist.md` encoding the 5-step procedure (Discover, Classify, Cite, Propagate, Sync and gate) including the classification decision matrix.
3. Write `references/bibliography-policy.md` covering the 14-day staleness rule, `[third-party]` tagging, and the re-fetch protocol.
4. Write `rules/curriculum-freshness.mdc` scoped to `steps/**` and `bibliography.md`, requiring every claim to trace to a fetched URL with an access date.

**Required test:** Named inspection: all four files exist with the named sections.

**DoD tests:**

1. `ls cursor-workshop/.cursor/skills/curriculum-refresh` shows SKILL.md and references/ with both files.
2. `grep -c "Discover" cursor-workshop/.cursor/skills/curriculum-refresh/references/freshness-checklist.md` is at least 1, and the same for Classify, Cite, Propagate.
3. Named inspection: the rule frontmatter includes globs or description.

**Expected result:** A fresh agent could run a full refresh using only this skill.

**Task DoD:** The freshness mechanism exists and is committed-ready.

**Stop:** Do not modify any step in this task.

### B03 — Classify findings and propose the new point budget

**Requires:** B01, B02

**Outcome:** A classification table covering every freshness finding; `tracks.md` updated with a proposed total in 500–540 marked PROPOSED; new bibliography entries and fact-check rows for new claims.

**Evidence:** Locked Decision 1 requires a raised budget; `specs/fact-check-schema.md` defines the row schema; B01 produced the findings list.

**Steps:**

1. For every finding, retain stable IDs and classify critical correction, deepen, new optional, footnote, or defer; record evidence, affected claims, practice need, action owner and status in `FRESHNESS-2026-09.md`.
2. Distinguish source-resolved questions B01-F01–F06 from outstanding runtime/content obligations. Name dependent tasks and blocked claims; unavailable evidence blocks only dependent claims, not classification itself.
3. Add or repair bibliography entries only for verified sources; match URLs to avoid duplication and preserve the exact [28] failure/replacement provenance.
4. Draft the budget: sum current per-step points plus planned exercise-kit points to 500–540, marked PROPOSED in tracks.md; preserve dated 440-point baseline records and do not publish the proposed total as already implemented.
5. Add claim-level fact-check rows using `Step | Claim | Source | Checked | Verdict` and only `confirmed`, `corrected`, `cut` when justified. Keep unverified runtime assertions and pending prose corrections in the ledger, not falsely confirmed rows.

**Required test:** Named inspection: classification covers 100 percent of B01 findings.

**DoD tests:**

1. Named inspection: every NEW/CHANGED/DEPRECATED row in the report has a classification action.
2. Sum the proposed per-step totals in tracks.md; the result is between 500 and 540 and short ⊂ medium ⊂ long membership is preserved.
3. Every new bibliography entry has a matching fact-check row.

**Expected result:** Classification and budget proposal recorded.

**Task DoD:** tracks.md draft budget and fact-check rows in place.

**Stop:** Do not touch the case-study repo in this task.

### B04 — Record propagation disposition and downstream obligations

**Requires:** B03

**Outcome:** Each classified finding has a propagation disposition in FRESHNESS-2026-09.md: no practice needed, mapped additive artifact/test in Phase A, mapped content correction in B10, or deferred/blocked with reason. No console change is required to pass B04.

**Evidence:** The refresh procedure makes counterparts conditional on actual practice need. B01 follow-up separates source support from A01/A04/A05 runtime acceptance; requiring those results here would create a dependency cycle.

**Steps:**

1. Review each classification for a concrete hands-on need; record “no propagation needed” with rationale for footnotes, qualifications and deferred features. Do not manufacture artifacts for every NEW feature.
2. Map necessary artifacts and offline tests to A01–A06, and source/prose corrections to B10; retain stable finding IDs. Extra work outside those task scopes needs an approved task before implementation.
3. For any proposed existing-config exception, record evidence of genuine Cursor freshness invalidation, affected claim/config, minimal diff and paired step/fact-check correction. If not established, preserve existing files, including hooks.json; additions never justify editing it for registration.
4. Carry conditional external verification separately with approval/credentials prerequisites; do not perform it or call it passed in B0.

**Required test:** Named ledger reconciliation: every B03 finding has a propagation disposition and any required downstream owner/test.

**DoD tests:**

1. Compare B03 finding IDs against B04 dispositions; no missing or forced counterpart.
2. Inspect dependencies: B04 and G-B0 require no A runtime results, hook activation, authenticated MCP connection or B10 implementation.
3. Compare console status/diff against entry state; B04 has not modified the console. Proposed exceptions remain unexecuted and evidence-linked.

**Expected result:** Complete propagation disposition, with unresolved behavior explicitly mapped forward.

**Task DoD:** Source-phase handoff complete, not runtime propagation complete.

**Stop:** Do not implement case-study artifacts or content corrections in this task.

### G-B0 — Source inventory, classification and disposition gate

**Requires:** B01, B02, B03, B04

**Outcome:** Verification only: source inventory, classification, proposed budget and propagation disposition are complete; runtime and publication obligations remain mapped downstream.

**Evidence:** Four predecessor artifacts plus B01's additive follow-up; source-resolved findings do not prove product execution.

**Steps:**

1. Reconcile the bibliography inventory, body evidence/provenance, unavailable sources and canonical replacements; inspect all four B02 files.
2. Verify classification and propagation disposition for every finding, claim-level citation/fact-check integrity and proposed budget arithmetic.
3. Confirm unresolved runtime/content claims have downstream owners and do not cyclically block this source gate. Preserve their blockers for acceptance/publication.

**Required test:** Named reconciliation of B01–B04 proofs, source/claim ledger and downstream dependency mapping.

**DoD tests:**

1. All current bibliography entries accounted for; baseline 32 exact sources plus verified canonical replacement for [28], with honest failure/HTTP-unknown records and changelog evidence.
2. Four B02 files verified, existing curriculum.mdc preserved.
3. Every finding classified and given a propagation disposition; proposed budget 500–540 with track nesting preserved.
4. New assertions have supported claim-level citations or explicit unresolved dispositions; no fabricated confirmations.
5. No A runtime tests, credentials, hook activation or later B10 edits required to pass this source gate; those acceptance obligations remain open where applicable.

**Expected result:** All five source/disposition checks pass without certifying runtime behavior.

**Task DoD:** Source gate passed and recorded; no implementation or external gate silently cleared.

**Stop:** Do not start Phase A until this source gate passes and implementation is authorized.

---

## Phase A — Case study expansion (additive-only)

### A01 — Prepare four opt-in MCP target samples

**Requires:** G-B0

**Outcome:** Inert `hearthline-operator-console/.cursor/mcp.example.json` contains the four requested targets: GitHub remote, Playwright local stdio, Postgres remote read-only intent, and Slack remote. It uses `mcpServers`, explicit `"type": "stdio"` for Playwright, and `${env:NAME}` references without literal secrets. Prepared is not installed, authenticated, connected, or verified read-only.

**Evidence:** The audit table specifies these four targets, not a custom server replacing Slack. FRESHNESS B01-F03 establishes the chosen STDIO shape and interpolation but explicitly leaves connection/runtime acceptance unverified. The active `.cursor/mcp.json` was absent at baseline.

**Steps:**

1. Reuse B01-F03's in-window source evidence or re-fetch the recorded MCP doc if stale. Verify server-specific launch/transport details from supplied or discovered primary sources; record unresolved provider choices rather than invent packages or URLs.
2. Prepare the separate example file. Use environment placeholders for unprovided remote MCP endpoints and credentials; do not confuse a service API/database URL with an MCP endpoint. Postgres read-only access requires actual server/database permissions, not a descriptive name.
3. Parse JSON and inspect all four target shapes, interpolation and secret absence offline. If a provider contract is unresolved, label that target's sample incomplete in the task evidence rather than claiming runtime readiness.
4. Record conditional external QA separately: only after explicit approval, chosen providers, credentials and tenant eligibility may a user activate `.cursor/mcp.json`, authenticate and test bounded operations against approved test resources. No server launch, connection, database query, GitHub operation or Slack message by default.

**Required test:** `python3 -c "import json; json.load(open('.cursor/mcp.example.json'))"` in the console repo, plus named four-target source/schema inspection.

**DoD tests:**

1. JSON parses; target inventory is exactly GitHub/Playwright/Postgres/Slack; documented transport fields and environment placeholders are present with source evidence or explicit unresolved provider disposition.
2. Inspect the sample for literal secrets and invented endpoints/packages; none are present. Unspecified remote URLs remain environment references, not fabricated addresses.
3. Compare entry/exit status: no active `.cursor/mcp.json` or existing configuration was created/changed; no external activity occurred.
4. Record prepared-sample status separately from authentication, connection, least-privilege and external QA status. Unrun QA stays not run; it is never a passing connection test.

**Expected result:** Four source-aligned opt-in samples or explicitly bounded incomplete provider details; no activation or connection claims.

**Task DoD:** Sample preparation and offline checks complete with limitations recorded; authenticated integration acceptance remains conditional and separate.

**Stop:** Do not activate MCP, install/launch servers, authenticate or perform external QA without separate approval.

### A02 — Add five rules to the console

**Requires:** A01

**Outcome:** `agent-instructions.mdc`, `skill-triggers.mdc`, `hook-patterns.mdc`, `security.mdc`, `debug.mdc` exist in `.cursor/rules/`, matching the existing six rules' frontmatter style.

**Evidence:** Baseline inspection found six rules; the audit table names the five additions.

**Steps:**

1. Read `root.mdc` to capture the frontmatter conventions.
2. Write each of the five rules with appropriate globs/alwaysApply.
3. Reference the planted bugs and security tickets where relevant without fixing anything.

**Required test:** Named inspection: each file has valid frontmatter.

**DoD tests:**

1. `ls .cursor/rules | wc -l` returns 11.
2. `git -C /Users/emilio/Documents/hearthline-operator-console status --short` shows only the five new files as additions.

**Expected result:** 11 rules, additions only.

**Task DoD:** Rules committed-ready.

**Stop:** Do not create skills in this task.

### A03 — Add six skills to the console

**Requires:** A02

**Outcome:** Skills `bug-investigator`, `migration-planner`, `refactor-assistant`, `test-generator`, `doc-generator`, `code-reviewer` exist with SKILL.md files (plus references/ where teaching requires), mirroring the existing three skills' structure.

**Evidence:** Baseline inspection found skills pr, spec, release-note.

**Steps:**

1. Inspect an existing skill directory to capture its structure.
2. Write each new skill's SKILL.md with a trigger description and a procedure tied to a real ticket where applicable.
3. Do not modify the existing three skills.

**Required test:** Named inspection: each SKILL.md has a description frontmatter field.

**DoD tests:**

1. `ls .cursor/skills | wc -l` returns 9.
2. `git status --short` shows no modification to pr, spec, or release-note.

**Expected result:** Nine skills, additive only.

**Task DoD:** Skills committed-ready.

**Stop:** Do not create agents in this task.

### A04 — Add four agents to the console

**Requires:** A03

**Outcome:** `security-reviewer`, `performance-reviewer`, `dependency-auditor`, `release-manager` agent files exist, read-only in posture, matching the existing two agents' style.

**Evidence:** Baseline inspection found agents bug-investigator and org-standards.

**Steps:**

1. Reuse B01-F02's in-window subagent schema evidence; read `bug-investigator.md` for structure, but do not assume its fields prove current runtime restrictions.
2. Write the four agents with source-supported `readonly: true` and domain-scoped instructions. Do not invent tool-permission keys or equate read-only posture with report trustworthiness.
3. Record source/schema checks separately from controlled runtime write-restriction tests; any Cursor-host or plugin/two-account test requires appropriate approval and availability, and remains unverified until observed.

**Required test:** Named inspection: each file states its read-only tool restrictions.

**DoD tests:**

1. `ls .cursor/agents | wc -l` returns 6.
2. `git status --short` shows the existing two agents unmodified.

**Expected result:** Six agents, additions only.

**Task DoD:** Agents committed-ready.

**Stop:** Do not add hooks in this task.

### A05 — Add five tested hook scripts and opt-in example registration

**Requires:** A04

**Outcome:** Five new scripts (`pre-commit-format.sh`, `post-edit-lint.sh`, `post-agent-test.sh`, `ci-gate.sh`, `skill-eval-trigger.sh`) have real offline behavioral tests and a separate `.cursor/hooks.example.json` registration sample. Existing hooks.json and pre-push-check.sh remain unchanged; new hooks are not activated.

**Evidence:** Existing hooks.json registers the pre-push script. FRESHNESS B01-F04 establishes version 1, explicit command type, project-root paths and event-specific permission/failure semantics; it does not authorize registration edits or establish universal enforcement. Step 9's prose error is mapped to B10, not a prerequisite for writing correct scripts/tests here.

**Steps:**

1. Reuse in-window hooks evidence or re-fetch the recorded doc if stale. Map each script to an actually documented event and input/output contract; filenames are teaching labels, not evidence that Cursor has Git pre-commit/post-agent events. If no supported event fits, retain a manually invoked example with that limitation.
2. Add a deterministic offline test harness under `tests/hooks/` that invokes each actual new script in isolated fixtures. For every hook, test valid success, genuine underlying format/lint/test/CI/eval failure, malformed or missing input, and dependency failure; assert exit status, output contract and intended effects. First demonstrate failures attributable to missing behavior. No unconditional-success stub, `assert true`, or skipped required test counts.
3. Implement scripts to satisfy their individual contracts; run formatting only against temporary fixtures during tests. Exit 0 consumes event-appropriate output, not unconditional permission; exit 2 blocks supported blocking events, while other failures fail open by default. Use `failClosed: true` in the example where failure-blocking is intended and supported; do not claim observational hooks can veto completed actions.
4. Add `.cursor/hooks.example.json` with version 1, explicit command type, documented event/path mappings and the new registrations only. Do not edit existing hooks.json or copy the sample into an active location. Registration and activation require a later approved merge/review.
5. Run `bash -n` for all five scripts and `bash tests/hooks/run.sh` for the behavioral matrix. Record per-hook results, including successful behavior, underlying failure propagation and invalid-input/error handling. Direct script tests do not prove Cursor host timeout/failClosed behavior; any untested host behavior stays source-supported only.

**Required test:** `bash tests/hooks/run.sh` exercises all five real scripts offline without skips, plus `bash -n` on each script and JSON parsing of `.cursor/hooks.example.json`.

**DoD tests:**

1. All five scripts pass syntax checks and their own success/failure/input-error/dependency-error tests; named assertions verify actual script behavior, not just mocked runner exit codes.
2. Example JSON parses and mappings match fetched event contracts; no unsupported blanket exit/block claims. Unsupported automatic mappings are explicitly marked manual-only in task evidence.
3. Compare existing hooks.json and pre-push-check.sh byte-for-byte with task-entry state; both unchanged. Inspect status/diff for additive-only scripts, test fixtures/harness and example registration.
4. Record “scripts offline-tested; registration opt-in; not activated.” No Git/server-side push enforcement or live Cursor activation claimed; host-specific QA remains separately unrun unless approved and observed.

**Expected result:** Five behavior-tested scripts and a non-active registration example; no fake green tests or existing-config edits.

**Task DoD:** Required offline tests pass per hook; opt-in artifacts and explicit runtime limitations recorded.

**Stop:** Do not activate hooks, edit existing hooks.json, or add tickets in this task.

### A06 — Add tickets HLN-104–109, domain stubs, and test structures

**Requires:** A05

**Outcome:** Six ticket files (HLN-104 security, HLN-105 performance, HLN-106 migration, HLN-107 refactor, HLN-108 docs, HLN-109 tests) exist in docs/tickets; `src/domains/auth`, `src/domains/notifications`, `src/domains/reporting` each have an `index.ts` stub; `tests/integration`, `tests/e2e`, `tests/contract` exist with READMEs describing intended scope and no placeholder test files.

**Evidence:** Baseline inspection found tickets HLN-101–103, four domains, and 33 unit tests; the audit table specifies the additions.

**Steps:**

1. Write the six tickets in the HLN-10x style with numbered acceptance criteria.
2. Write the three domain stubs exporting only a typed interface placeholder.
3. Create the three test directories with README files only.

**Required test:** `npm test` preserves all 33 baseline unit tests; `bash tests/hooks/run.sh` passes the added A05 behavioral suite.

**DoD tests:**

1. `ls docs/tickets | wc -l` returns 9.
2. `ls src/domains | wc -l` returns 7.
3. `npm test` exits 0 with 33 passing tests from a clean run.
4. Inspect task-local additions in `tests/integration`, `tests/e2e`, and `tests/contract`: README-only structure, no fake passing placeholders. Preserve and run A05's genuine tests under `tests/hooks/`; their presence must not fail this structure check.

**Expected result:** Structure present; suite unchanged green.

**Task DoD:** All Phase A artifacts complete.

**Stop:** Do not begin content deepening in this task.

### G-A — Case study phase gate

**Requires:** A01, A02, A03, A04, A05, A06

**Outcome:** Verification only: Phase A confirmed complete and non-regressive.

**Evidence:** All six predecessor artifacts exist.

**Steps:**

1. Run the console unit suite and A05's real per-hook offline behavioral suite; verify the existing pre-push script's pass/fail paths in an isolated fixture without performing a push.
2. Run the console build and record results; do not infer host activation from script execution.
3. Prepare a clean temporary working-tree snapshot including intended uncommitted additions, excluding secrets/dependencies/build output, and run npm ci plus both suites there. A clone of HEAD alone would omit uncommitted Phase A work; public fresh-clone QA belongs to separately approved D02.
4. Run the secrets check and inspect A01/A04/A05's source, offline-test and conditional host/external QA statuses separately. Credentials, tenant/two-account installation, read-only enforcement and authenticated connections are not verified by sample JSON or frontmatter.
5. Confirm task-local additions-only scope and unchanged existing hooks.json. A separately established freshness-invalidation exception requires its own evidence and paired correction, not blanket approval.

**Required test:** `npm test`, `bash tests/hooks/run.sh` and `npm run build` in the console, repeated against the intended clean snapshot.

**DoD tests:**

1. All 33 baseline unit tests remain green and every new hook's required behavioral tests pass without fake stubs or skips; actual counts recorded, not forced to 33 if genuine tests were added.
2. `npm run build` exits 0; isolated pre-push-script pass/fail regression checks pass without external activity.
3. Clean snapshot contains intended additions and passes install/tests/build; no claim that an unchanged public clone contains this work.
4. Secrets check clean; sample/host/external statuses explicit. Unapproved or unavailable external QA is not run, not passed; associated connection/enforcement claims remain withheld.
5. Task-local diff shows only additions in `.cursor/`, `docs/tickets/`, `src/domains/`, `tests/`; existing hooks.json remains unchanged and new registration is opt-in only.

**Expected result:** All five checks pass.

**Task DoD:** Gate recorded.

**Stop:** Do not start Phase B until the gate passes.

---

## Phase B — Content deepening

### B10 — Deepen the 33 steps in six module batches

**Requires:** G-A

**Outcome:** All 33 steps deepened per the depth target (concept, exact shortcuts, working example, expected result, at least 3 common mistakes, at least 2 pro tips, exercise kit with starter code, expected diff, hints, solution, stretch, screenshot placeholders), grouped into six batches by module (70, 65, 60, 40, 50, 60 plus bonus 95), with all three audit conflicts resolved and the budget finalized.

**Evidence:** The Enhancement Targets table in IMPROVED_PROMPT.md; Constraint 8 depth target; the baseline audit conflicts (HLN-102 ticket-ID contradiction, Step 5/22 exercise overlap, Build Battle promise).

**Steps:**

1. For each batch, apply the step's Enhancement-Target row to the step content.
2. Add the exercise kit under the existing schema headings; do not add frontmatter inline comments (the frontmatter parser is regex-based).
3. Resolve the three audit conflicts: unify the HLN-102 ticket-ID narrative across Steps 5 and 14; add a prerequisite note to Step 22 covering the Step 5 overlap; deliver a named Build Battle artifact or annotate the promise in Steps 1–2.
4. Update the budget from PROPOSED to final in tracks.md once all per-step points are settled; verify the total lands in 500–540.
5. Add or update one fact-check row per distinct changed verifiable claim (multiple rows per step when needed), using only supported schema verdicts. Apply the mapped B01 corrections, including hook semantics, review claims, plugin qualifications and explicitly chosen plan/image paths; do not publish unverified defaults or enforcement claims.
6. After each batch: run the site build and the citation-resolver check.

**Required test:** `npm run build` in the site after each batch.

**DoD tests:**

1. Grep-verified: each deepened step contains at least 3 common-mistake entries, 2 pro tips, and an exercise kit.
2. Citation check: every `[n]` marker in touched steps resolves to a bibliography entry.
3. Each changed verifiable claim has schema-valid fact-check evidence; pending/unverified claims are not falsely confirmed, and B01's mapped corrections are resolved or explicitly removed/qualified before publication.
4. The tracks.md total is within 500–540 and matches the sum of frontmatter points.

**Expected result:** Six batches complete, each independently reviewable.

**Task DoD:** All 33 steps deepened or explicitly classified as already sufficient with rationale.

**Stop:** Do not start Phase C until all batches pass their per-batch checks.

### G-B — Content phase gate

**Requires:** B10

**Outcome:** Verification only: content phase confirmed complete.

**Evidence:** Batch artifacts and per-batch checks exist.

**Steps:**

1. Verify every step was either deepened or classified.
2. Verify the citation/fact-check coverage.
3. Verify the final budget matches frontmatter sums exactly.
4. Grep for Claude-Code-specific terminology leakage across steps.

**Required test:** Sum-check script or manual arithmetic over frontmatter points equals tracks.md total.

**DoD tests:**

1. All 33 steps accounted for.
2. Citation check zero misses.
3. Budget final and consistent.
4. Claude-isms grep clean.

**Expected result:** All four checks pass.

**Task DoD:** Gate recorded.

**Stop:** Do not start Phase C until the gate passes.

---

## Phase C — Site: tabs, progress v2, QA

### C01 — RED: tab-renderer contract tests

**Requires:** G-B

**Outcome:** Vitest is wired into the site with failing contract tests encoding: 4-tab split of standard steps; schema exceptions (Step 1 The project + Implement; Steps 9–10 no Pro tips; Step 11 Terminology; bonus steps Learn+Implement); copy buttons present; inert "## Complete" checklist removed from render; no duplicate H1.

**Evidence:** Baseline inspection: no tabs or copy buttons exist; the exceptions were verified per step file.

**Steps:**

1. Add vitest (pinned to v3) plus jsdom config to site/package.json and run a registry compatibility check before install.
2. Write contract tests against a pure `splitStepTabs(md)` function and component render output.
3. Run the suite and record the exact failures.

**Required test:** `npm test` in the site shows the named failures.

**DoD tests:**

1. Failures are caused only by missing functionality, not syntax or fixture errors.
2. `git diff --name-only` shows no production source changed.

**Expected result:** Valid RED state.

**Task DoD:** RED tests committed-ready.

**Stop:** Do not implement the renderer in this task.

### C02 — GREEN: implement the tab renderer and copy buttons

**Requires:** C01

**Outcome:** `splitStepTabs` util plus a tabbed step page: a per-step tab bar honoring the schema exceptions, copy buttons on code blocks, deduplicated H1, and the Complete checklist replaced by interactive StepProgress binding.

**Evidence:** C01 defines the exact contract via failing tests.

**Steps:**

1. Implement `splitStepTabs` and wire it into `steps/[slug]/page.tsx` and `md.tsx`.
2. Keep citation preprocessing and diagram embeds working.
3. Run the RED suite to green.

**Required test:** `npm test` in the site passes.

**DoD tests:**

1. The C01 suite passes including all exception fixtures.
2. `npm run build` exits 0.
3. Spot-check rendered HTML: citations still link to /bibliography#n.

**Expected result:** Tabs live with all exceptions handled.

**Task DoD:** Feature complete, suite green.

**Stop:** Do not touch progress storage in this task.

### C03 — Progress v2, migration, Resume CTA, export/import

**Requires:** C02

**Outcome:** Progress schema v2 with per-tab tracking, validated migration preserving valid v1 progress, a Resume CTA for the same browser/profile/origin, export/import buttons, and the evidence/approval conditions for any future sync decision recorded in the site README. No backend, accounts or telemetry.

**Evidence:** Baseline documented the v1 shape and 8 hardening hazards; the Progress Persistence decision requires schema v2.

**Steps:**

1. Write RED tests: migration from legacy shape (valid, malformed, null, string-coercion), tab-level toggle persistence, export/import round-trip.
2. Implement a `useProgress` hook with runtime validation, guarded writes, and slug-change reset fix.
3. Add the Resume CTA derived from stored state.
4. Record same-browser resume as the chosen MVP scope, not an industry anecdote or measured cross-device preference. Remove the inherited >30% across-session trigger from future decision text: across-session resumption does not measure cross-device demand. Reconsider sync only with demonstrated cross-device needs and explicit cost/privacy approval; no telemetry collection in Phase 2.
5. Implement to green.

**Required test:** `npm test` in the site passes including migration tests.

**DoD tests:**

1. Migration tests pass including the malformed-JSON fallback.
2. `npm run build` exits 0.
3. Component/browser test: the home page renders the Resume CTA when same-browser state exists; export/import round-trip preserves valid progress.
4. Inspect README decision text: no unsupported industry anecdote, numeric across-session proxy for cross-device demand, or Phase-2 telemetry; future sync requires demonstrated need and cost/privacy approval.

**Expected result:** v2 live with lossless v1 migration.

**Task DoD:** Persistence upgraded.

**Stop:** Do not start QA in this task.

### C04 — Site QA and QA-SIGNOFF update

**Requires:** C03

**Outcome:** The rebuilt site is verified and QA-SIGNOFF.md is updated truthfully: tabs checked, filter diff re-run, screenshots inspected, localStorage click-test run if an interactive browser tool is available, deferred items still documented with reasons, future sync need/cost/privacy approval conditions noted.

**Evidence:** QA-SIGNOFF.md records the v1 pass with three deferred checks; Locked Decision 3.

**Steps:**

1. `npm run build` and record the page count.
2. Start the local production server; curl-verify disclaimer presence, citation links and static markup. Verify client-side tabs and storage-derived Resume CTA with component/browser tests, not curl, which cannot execute localStorage behavior.
3. Re-run the filter diff versus tracks.md.
4. Take 390px and 1440px screenshots via headless Chrome and inspect the images.
5. Run the localStorage click-test if an interactive browser tool is available; otherwise document why.
6. Update QA-SIGNOFF.md.

**Required test:** `npm run build` plus the filter diff.

**DoD tests:**

1. Build exits 0.
2. Disclaimer present on all sampled routes.
3. Filter outputs equal tracks.md sets.
4. Both screenshots inspected.
5. Click-test done or documented.

**Expected result:** Sign-off current and truthful.

**Task DoD:** QA recorded.

**Stop:** Do not ship in this task.

### G-C — Site phase gate

**Requires:** C04

**Outcome:** Verification only: site phase confirmed complete.

**Evidence:** C04 artifacts exist.

**Steps:**

1. Run the full site suite: test, typecheck, lint, build.
2. Confirm the console build remains green.

**Required test:** The four site scripts plus console build.

**DoD tests:**

1. Site test/typecheck/lint/build all exit 0.
2. Console build exits 0.
3. QA-SIGNOFF reflects reality.

**Expected result:** All checks pass.

**Task DoD:** Gate recorded.

**Stop:** Do not ship until the gate passes.

---

## Phase D — Ship

### D01 — Final secrets and consistency sweep

**Requires:** G-C

**Outcome:** Both repos are free of secrets and incorrect current point-total claims; historical 440-point records are preserved and cursor-training/.env is untouched.

**Evidence:** Publishing gates require the secrets grep before every push.

**Steps:**

1. Run the secrets grep over both repos (patterns: gho_, ghp_, AKIA, sk-proj, sk-ant, fc-, CURSOR_API_KEY), excluding node_modules, .next, and lockfiles.
2. Verify `.env` in cursor-training is unmodified.
3. Inventory "440" mentions and classify each as a current published total or historical evidence. Update only current claims to the final implemented budget; preserve dated baselines, audit records and historical examples. Never blanket-replace 440.

**Required test:** The secrets grep returns zero hits.

**DoD tests:**

1. Secrets grep clean.
2. `.env` unmodified.
3. Current point-total claims consistent across README, tracks.md and site; compare historical 440-point records against entry state to confirm preservation.

**Expected result:** Clean sweep.

**Task DoD:** Sweep recorded.

**Stop:** Do not commit in this task.

### D02 — Commit and push both repos

**Requires:** D01

**Outcome:** Only after separate explicit user approval, truthful commits pushed to both public repositories and fresh clones verified. This task is not authorized by the present plan-correction request.

**Evidence:** Publishing gates and the whole-system DoD require public clones to boot and test.

**Steps:**

1. Stop unless explicit commit/push approval is recorded. Inspect each repo's status, diff, recent history and branch policy; stage only intended explicit paths, preserving unrelated work and secrets. Follow the console's branch-per-ticket policy; do not commit directly to main.
2. Commit with messages describing actual scope (freshness, case-study expansion, deepening, tabs, progress v2).
3. Push.
4. Fresh-clone each repo from GitHub; in the console run npm ci plus tests; in the site run the build.

**Required test:** Fresh-clone console tests green; fresh-clone site build green.

**DoD tests:**

1. Only after recorded approval: origin/main heads match local heads, fresh clones verified and commit messages match diffs. Unapproved execution of this task is a scope violation, not a pass.
2. Fresh clones verified.
3. Commit messages match the diffs.

**Expected result:** Public repos current.

**Task DoD:** Shipped.

**Stop:** Plan complete.

---

## Whole-System DoD

1. Source/disposition gate G-B0 and later implementation gates G-A/G-B/G-C pass with their own recorded evidence; no cyclic runtime prerequisite in B0.
2. Console: 33 baseline unit tests plus real per-hook behavioral tests pass from the intended clean snapshot; existing pre-push script's pass/fail behavior preserved in isolated tests, planted bugs intact. Existing hooks.json unchanged except any separately evidenced freshness-invalidation correction; new registration remains a separate opt-in example, not activated.
3. Site: builds; tabs honor schema exceptions; progress v2 preserves valid v1 data; filters match tracks.md; disclaimer everywhere. Same-browser persistence is the MVP decision, not an industry-derived claim; future sync requires demonstrated cross-device needs and cost/privacy approval.
4. Curriculum: every published mechanism claim has substantive source evidence inside its rolling 14-day verification window and schema-valid claim-level fact-check coverage; implemented budget 500–540 matches tracks.md/frontmatter/site while historical 440 records remain intact. Unverified assertions are qualified or removed, not marked confirmed.
5. The curriculum-refresh skill is usable standalone; propagation occurs only where practice needs it.
6. GitHub/Playwright/Postgres/Slack samples are distinguished from authenticated connections. External/host/two-account QA is separately approved and evidenced or explicitly not run, with dependent runtime claims withheld; no default real external activity or false green tests.
7. No secrets published; QA-SIGNOFF records limitations honestly. Commit/push and public fresh-clone verification occur only with separate explicit approval; truthful commit messages describe actual changes.

## Volatile References (re-check at execution)

- Cursor MCP doc schema (A01) — re-fetch and date-stamp.
- Cursor hooks event names (A05) — re-fetch; hooks.json schema may have changed since 2026-09-11.
- Cursor changelog URL path (B01).
- vitest v3 compatibility with site dependencies (C01) — registry check before install.
