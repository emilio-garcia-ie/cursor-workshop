# Improved Prompt: Build a High-Quality Cursor Curriculum

---

## Role
Senior Developer Advocate & Technical Writer, expert in **Cursor IDE** (Anysphere). You teach developers to use Cursor deeply, accurately, and practically.

---

## Task
The **v1 build is complete** (see Current State). Your task is **Phase 2: depth enhancement** — take the existing, verified, shipped curriculum and deepen it from "accurate overview" to "definitive treatment":

1. **Deepen cursor-workshop content** — expand the 33 steps using the Enhancement Targets table below (Tab, Cmd+K, Chat, Agent, indexing, debug, security, real-world scenarios). Keep every existing guarantee intact (citations, fact-check rows, track sync, 440-pt total or renegotiate explicitly).
2. **Enhance hearthline-operator-console** — audit the case study against the Case Study Enhancement Audit table; propose and implement specific additions (new rules, skills, agents, hooks, MCP entries, tickets HLN-104–109, test structures) so the codebase teaches Cursor more effectively.
3. **Keep the curriculum living** — run the freshness pass (P-B0): diff Cursor's docs/changelog against the current bibliography, classify each new/changed feature (new step vs deepen existing vs footnote), and propagate hands-on counterparts into the case study. The reusable mechanism is the `curriculum-refresh` skill (see "Living Curriculum" below).
4. **Re-verify everything you touch** — any claim you add gets a bibliography entry + fact-check row; any site-visible change re-runs the QA gates.

**This is implementation work.** Phase 1's audit is done; execute against the remaining gaps. Work through the `atomic-executable-plan` skill: produce an atomic execution plan for Phase 2 first, then implement phase-by-phase with gates.

---

## Current State (Read First — Phase 1 is DONE)

### What Already Exists and Is Verified

| Repo | Path | Role | Status |
|------|------|------|--------|
| **cursor-workshop v1** | `/Users/emilio/Documents/cursor-workshop` | The curriculum + interactive site | ✅ Built, committed, pushed to `github.com/emilio-garcia-ie/cursor-workshop` |
| **hearthline-operator-console** | `/Users/emilio/Documents/hearthline-operator-console` | Case study learners clone | ✅ Built, 33 tests green, pushed to `github.com/emilio-garcia-ie/hearthline-operator-console` |
| **cursor-training** | `/Users/emilio/Documents/cursor-training` | Source repo: Claude-Code workshop evidence (`workshop/src/workshopContent.js` — canonical 14-step pedagogy evidence), `.env` (secrets — never commit), `workshop/` (React replica), `IMPROVED_PROMPT.md` (this file) | Reference only |

**⚠️ Secrets rule (applies to every repo):** `/Users/emilio/Documents/cursor-training/.env` holds `FIRECRAWL_API_KEY` — never read it into commits, never copy it, never attach it. Pre-push secrets grep is mandatory on both repos.

**cursor-workshop v1 guarantees (do not regress):**
- 33 steps in `steps/` (`NN-slug.md`), 4-tab structure per `specs/step-schema.md`, points total **440** (modules 70/65/60/40/50/60 + bonus 95)
- Every mechanism claim cited `[n]` → `bibliography.md` (33 entries, all URLs fetched HTTP 200 on 2026-09-11; re-verify if >14 days old); fact-check log in `fact-check.md` (23 rows)
- `tracks.md` is the single source for version/persona sets (short 10 ⊂ medium 20 ⊂ long 33); `site/src/lib/tracks.ts` mirrors it — keep in sync or refactor to import
- `glossary.md` (17 terms, zero dead links), `diagrams/*.mmd` + rendered SVGs (10)
- Next.js 14.2.35 site in `site/`: 42 static pages, `/steps/[slug]` with citation superscripts + embedded diagrams, home page version/persona pickers, `StepProgress.tsx` (localStorage `hearthline-progress-v1`), persistent `Disclaimer.tsx` (unofficial workshop) on every route
- QA-SIGNOFF.md records the S05 pass; deferred checks (real-device touch, localStorage cross-reload click-test, screen-reader) are still open

**hearthline-operator-console guarantees (do not regress):**
- Deterministic seed (SEED=20260911), 5 screens, 4 Zod API routes, 4 bounded domains (Property, Leasing, Operations, Payments)
- **Three planted bugs that ARE the workshop — never fix in the repo**: `src/domains/payments/queries.ts` (string comparator on amountCents), `src/domains/payments/export.ts` (DEFAULT_EXPORT_COLUMNS leaks `bank_account_last4`/`routing_number`), `src/domains/payments/bucketing.ts` (server-local date). Bug-contract tests assert buggy behavior; only update them if/when a workshop step legitimately fixes a bug
- `.cursor/` harness: 6 rules (`root, money, time, api-routes, components, boundaries`), 3 skills (`pr, spec, release-note`), 2 agents (`bug-investigator, org-standards`), `hooks.json` + `pre-push-check.sh` (exit 2 blocks, verified both directions). Note: `.cursor/mcp.json` **does not exist yet** — the prompt said it should; adding it is a Phase 2 item
- Tickets `docs/tickets/HLN-101|102|103.md` + `docs/ORG-STANDARDS.md`
- Version pins: next@14.2.35, @tremor/react@3.18.7 (Tailwind v3 pairing), tailwindcss@3.4.19, typescript@5.9.3, zod@4.6.2, vitest@3 — do not bump

**Known deviations already accepted in v1:** bonus totals 95 → 440 pts; bibliography has 33 entries ([33] Side Chats); Step 13 uses swarm/subagent mechanics and Step 24 a generic code-graph because no citable Cursor doc exists for the originally named tools. Do not silently change these.

---

## What cursor-training Gets Right (Pedagogical Model to Keep)
- **4-tab per step**: Learn (concept) → Implement (hands-on) → Pro tips (workflow) → Advanced (strategic)
- **Narrative flow**: "You join Hearthline on day one..." — character-driven, realistic scenario
- **Progressive disclosure**: Each step builds on the last; tickets drive the work
- **Interactive UI**: `site/` (Next.js) with tabs, copy buttons, "Mark Complete", pickers
- **Command blocks**: Copy-pasteable prompts

## Living Curriculum: Freshness Pass & curriculum-refresh Skill

The workshop must **evolve with Cursor**, and the two repos evolve together: a new Cursor feature requires (a) curriculum coverage and (b) a hands-on counterpart in the case study. This is a repeatable, few-step procedure — implement it as a reusable skill inside the workshop repo so any agent can re-run it after every Cursor release.

### Build in Phase 2 (P-A)

```
cursor-workshop/
  .cursor/
    skills/
      curriculum-refresh/
        SKILL.md                      ← trigger: "refresh curriculum", "check for new cursor features"
        references/
          freshness-checklist.md      ← the 5-step procedure below
          bibliography-policy.md      ← re-fetch rules, [third-party] tagging, 14-day staleness
    rules/
      curriculum-freshness.mdc        ← every claim must trace to a fetched doc URL + access date
```

### The 5-step refresh procedure (idempotent, reusable forever)

1. **Discover** — fetch the Cursor changelog + docs index; diff against `bibliography.md` → list of new/changed/deprecated features
2. **Classify** — per feature: new dedicated step / deepen an existing step / footnote in an existing step (decision matrix lives in the checklist)
3. **Cite** — bibliography entry + `fact-check.md` row before writing any content; no invention
4. **Propagate** — if hands-on practice needs it, add the counterpart to `hearthline-operator-console` (new rule/skill/agent/hook/mcp entry/ticket), using the Case Study Enhancement Audit table as the coverage map
5. **Sync & gate** — update `tracks.md` + `site/src/lib/tracks.ts`, re-run the track-diff check, `npm run build` both repos, secrets grep, then push

### Freshness guarantees (add to constraints)

- Bibliography URLs are stale if unfetched >14 days; P-B0 re-fetches all 33 + the changelog
- Deprecations found during the pass get a fact-check row and a same-phase fix (a step teaching a removed feature is blocked from shipping)
- New features with no citable doc page get `⚠️ [VERIFY]` treatment, never silent invention

---

## Phase 2 Enhancement Targets (cursor-workshop content gaps)

| Gap | Current | Enhancement Needed |
|-----|---------|-------------------|
| **Tab autocomplete** | Light | Multi-line, next-edit prediction, acceptance/rejection, `.cursorignore` |
| **Cmd+K inline edit** | Scattered | Dedicated treatment: range selection, instruction prompting, diff review, iteration |
| **Cmd+L Chat** | Scattered | Context control (`@file`, `@folder`, `@codebase`, `@web`), conversation branching |
| **Composer/Agent** | Light | Multi-file edits, terminal integration, background mode, checkpoint/rewind |
| **Codebase indexing** | Implicit | `.cursorignore`, re-index triggers, symbol navigation, cross-ref |
| **Debug Mode** | One step | Breakpoints, watch expressions, terminal output parsing, browser tool |
| **Design Mode** | One step | Visual editing, component playground, CSS iteration |
| **Background Agents** | One step | Async delegation, specialization, cost control, result aggregation |
| **Rules depth** | Good structure | Rule testing, evals, inheritance, team vs personal, governance |
| **MCP** | Basic GitHub | Playwright, DB, Slack, custom servers, env interpolation, security |
| **Skills** | Good | Skill evals, versioning, marketplace, asset bundling, trigger tuning |
| **Hooks** | Basic | Pre-commit, post-edit, post-agent, CI integration, failure modes |
| **Security** | One step | Prompt injection, allowlists, OWASP LLM01, data exfiltration, secrets |
| **Real-world scenarios** | Few | Legacy refactor, migration, unfamiliar codebase, doc generation, test generation |
| **Exercises** | Checkboxes only | Starter code, expected diff, hints, solutions, stretch goals |

---

## Case Study Enhancement Audit (hearthline-operator-console)

| Area | Current State | Gaps | Proposed Enhancement |
|------|---------------|------|---------------------|
| **Rules** | 6 `.mdc` files | No rules for: Tab behavior, Agent instructions, Skill triggers, Hook patterns, Security, Debug config | Add `agent-instructions.mdc`, `skill-triggers.mdc`, `hook-patterns.mdc`, `security.mdc`, `debug.mdc` |
| **Skills** | pr, spec, release-note | No skills for: bug investigation, migration, refactor, test gen, doc gen, code review | Add `bug-investigator`, `migration-planner`, `refactor-assistant`, `test-generator`, `doc-generator`, `code-reviewer` skills |
| **Agents** | bug-investigator, org-standards | No agents for: security review, performance review, dependency audit, release | Add `security-reviewer`, `performance-reviewer`, `dependency-auditor`, `release-manager` agents |
| **Hooks** | pre-push-check.sh only | No pre-commit, post-edit, post-agent, CI gate, skill-eval hooks | Add `pre-commit-format.sh`, `post-edit-lint.sh`, `post-agent-test.sh`, `ci-gate.sh`, `skill-eval-trigger.sh` |
| **MCP** | **missing entirely** | Prompt expects `.cursor/mcp.json` with GitHub remote + `${env:NAME}` | **Create it**: GitHub remote, Playwright (local stdio), Postgres (remote read-only), Slack (remote) — env interpolation, no real secrets |
| **Tickets** | HLN-101, 102, 103 | Missing: security, performance, migration, refactor, docs, tests | Add HLN-104 (security: secret-in-logs + injection attempt), HLN-105 (performance: N+1 on Payments, bundle regression), HLN-106 (migration: payment processor, phased), HLN-107 (refactor: extract domain service), HLN-108 (docs: generate API docs from Zod schemas), HLN-109 (tests: integration/e2e for export flow) |
| **Domains** | 4 bounded contexts | No auth, notifications, reporting | Add minimal domain stubs (`index.ts` only) — they teach boundaries without new bugs |
| **Test coverage** | 33 unit tests | No integration/e2e/contract/visual | Add `tests/integration/`, `tests/e2e/`, `tests/contract/` structure per HLN-109 |

---

## Cursor Feature Coverage (verify against bibliography before writing)

| Feature | Biblio ref | Where it deepens |
|---------|-----------|------------------|
| Rules (.mdc) | [1][2] | Rules-depth enhancements |
| Tab autocomplete | [10] | Tab gap |
| Inline Edit (Cmd+K) | [11] | Cmd+K gap |
| Plan Mode | [8] | Building module |
| MCP | [3][4] | MCP gap + new mcp.json |
| Skills | [9] | Skills gap |
| Hooks | [5][7] | Hooks gap |
| Debug Mode | [18] | Debug gap |
| Design Mode | [17] | Design gap |
| Background Agents | [15] | Agent gap |
| Browser Tool | [16] | Debug step |
| Terminal Tool | [21] | Steps 5, 9, 11 |
| CLI | [22][23][24] | CLI step |
| Canvas | [25] | Knowledge-graph step |
| Slack Integration | [26] | Marketplace step |
| Marketplace | [27][28] | Marketplace step |
| Enterprise | [29] | Enterprise step |
| Analytics | [30] | Enterprise step |
| Cloud Agents | [31][32] | CLI step |
| Side Chats | [33] | Context step |

---

## Constraints

1. **Cursor-native only** — every shortcut/command/path/feature verified against a live-fetched Cursor docs URL. Re-fetch bibliography URLs if your work is >14 days past 2026-09-11. No invention: if unsure, flag `⚠️ [VERIFY: detail]` and resolve before shipping the step.
2. **Evidence-based** — reference specific files in `cursor-workshop/steps/` and `hearthline-operator-console/.cursor/`.
3. **New claims get citations** — every added mechanism claim gets a bibliography entry + a `fact-check.md` row (schema: `specs/fact-check-schema.md`). Third-party claims tagged `[third-party]` per `specs/citation-format.md`.
4. **Preserve the case study** — the app, tickets HLN-101/102/103, planted bugs, and existing `.cursor/` config are the teaching vehicle. Planted bugs are never fixed in the repo.
5. **No regressions** — point budget per Locked Decision 1 (raised, documented in tracks.md, nesting preserved), tracks nesting, glossary links, citation format, disclaimer on every site route, 33 tests green, version pins unchanged.
6. **Publishing gates** — both repos are already public. Any push after Phase 2 work re-runs: secrets grep, structure check, track sync diff, `npm run build` (site + console), test suite. `.env` in cursor-training is never touched/committed.
7. **Format** — steps match `specs/step-schema.md`; site reads from `steps/*.md`; keep `site/src/lib/tracks.ts` in sync with `tracks.md`.
8. **Depth target for deepened steps** — concept explanation, exact shortcuts/commands, minimal working example, expected result, ≥3 common mistakes, ≥2 pro tips, exercise kit (starter code / expected diff / hints / solution / stretch), visual placeholders `[SCREENSHOT: ...]`.
9. **Freshness** — bibliography URLs stale if unfetched >14 days past 2026-09-11; deprecations block the step that teaches them until fixed; new features follow the 5-step refresh procedure via the `curriculum-refresh` skill.

---

## Suggested Phase-2 Sequencing (adapt via atomic plan)

1. **P-B0: Freshness pass** — fetch changelog + docs index, re-fetch all 33 bibliography URLs, diff → classify → build the `curriculum-refresh` skill + `curriculum-freshness.mdc` rule, record everything in `fact-check.md`. Gate: no uncited new-claim content survives into P-B.
2. **P-A: Case study expansion** — mcp.json (missing), new rules, skills, agents, hooks, tickets HLN-104–109, domain stubs, test structures. Gate: console tests still green, hook still blocks, fresh-clone boot.
3. **P-B: Content deepening** — work the Enhancement Targets table + P-B0 findings into the existing 33 steps (prefer deepening in place over new steps; new steps are fine under the raised budget per Locked Decision 1, as long as tracks.md stays consistent). Every touched step: citations re-verified, fact-check row added, exercise kit added.
4. **P-C: Site + QA** — rebuild site, re-run S03 filter diff vs tracks.md, citation/diagram checks, mobile+desktop screenshots, implement the Progress Persistence upgrades (schema v2 + migration, Resume CTA, export/import), update QA-SIGNOFF.md; run the localStorage click-test if a browser tool is available per Locked Decision 3.
5. **P-D: Ship** — commit/push both repos with truthful messages, final secrets scan, verify public clones.

---

## ✅ Locked Decisions (resolved — do not re-ask)

1. **Point budget: RAISE IT.** The 440-pt budget is renegotiated upward to reflect deepened content. The executing agent proposes the exact new total (target range 500–540) in `tracks.md`, preserving short ⊂ medium ⊂ long nesting and updating `site/src/lib/tracks.ts`, home-page point summaries, and any "440" mentions repo-wide.
2. **Case-study changes: ADDITIVE-ONLY.** New rules/skills/agents/hooks/tickets/domain stubs/tests only. Editing existing `.cursor/` config files, tickets HLN-101–103, or domain code is out of scope — unless the freshness pass (P-B0) shows a claim in an existing step is invalidated by a Cursor change, in which case: log a fact-check row, make the minimal case-study edit, and update the affected step in the same phase.
3. **Deferred QA: LEAVE DOCUMENTED, with one exception.** Device-touch and screen-reader checks remain documented manual follow-ups in QA-SIGNOFF.md. The localStorage click-test (mark complete → reload → state persists) MUST be run if an interactive browser tool is available, since it's cheap; otherwise it stays documented with the reason noted.

## Progress Persistence: no DB in Phase 2 (same-browser resume)

**Decision: no backend/database for progress.** The site is a 42-page static Next.js build with no server; the learner journey is 4–8h sessions on one machine, so cross-device sync solves a problem this product shape rarely creates (industry pattern: freeCodeCamp/Exercism started local-first, added sync on demand). Phase 3 trigger is explicit and measurable, not vibes.

**Phase 2 upgrades (implement in P-B/P-C):**
- **Schema `v2`** in `StepProgress.tsx`: section-level tracking (which of the 4 tabs are completed per step), with one-time migration from `hearthline-progress-v1` (read v1 → write v2 → retire v1 key)
- **Resume CTA** on home page: "Continue: Step 7 · Implement" derived from stored state
- **Export/import progress JSON** (button in UI): cache-clear protection + future migration path
- **Explicit Phase-3 trigger** (record in README or QA-SIGNOFF): add backend sync only if data shows >30% of learners resume across sessions (requires opt-in telemetry — itself a Phase-3 item)

**Never in Phase 2:** a database, server endpoints for progress, accounts/auth for progress, or telemetry collection.

---

**Begin by loading the `atomic-executable-plan` skill, producing the Phase-2 plan, and executing P-B0 first.**
