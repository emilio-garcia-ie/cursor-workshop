# Freshness audit and B03 classification — 2026-09-16

**Current status — 2026-09-17:** Phase B metadata activates **520 points** across the unchanged 33 steps, with all-persona short/medium/long totals **215/355/520**. All 33 exercise kits are present; specific prose corrections and residual blockers are reconciled in the completion ledger at the end. Earlier B01/B03/B04 sections are explicitly historical snapshots, including their pre-activation 440-point baseline and then-pending statuses; the September 17 ledger supersedes implementation status, not source provenance. The September 16 **G-B0 source-only pass** is retained; runtime acceptance and release/QA sign-off are not claimed.

## Result and scope

**32/33 bibliography sources content-verified; 1/33 unavailable/unverified ([28]).** This count means substantive source text was retrieved and inspected for the claims recorded below, not that all curriculum assertions passed. Official docs index and changelog were also captured. **B01 evidence coverage is partial; G-B0 has NOT passed.** No B02–B04, case-study, curriculum, bibliography, or fact-check changes were made.

Audit date: **2026-09-16**, using the supplied environment date. September 11 was **5 days ago**, not more than 14 days ago. The staleness statements at `../cursor-training/PHASE2-PLAN.md:13` and `:110` are incorrect. This audit was nevertheless explicitly requested. Bibliography [32] records publication on August 19 rather than an individual access date; the bibliography's introductory September 11 fetch assertion is separate.

Read inputs: `AGENTS.md`, `bibliography.md`, `fact-check.md`, `specs/fact-check-schema.md`, the authorized plan, all 33 step titles and targeted full-text feature searches, and relevant source-body passages. This is a bounded source/coverage audit, not an exhaustive line-by-line validation of every step or every API endpoint. No local secrets or `.env` files were read. Public documentation's example references to environment files were not executed.

## Evidence storage and method

- **R** = existing `/Users/emilio/Documents/cursor-workshop/.firecrawl/`. Ten prior successful captures were reused read-only: [1], [5], [9], [15], [22], [27], [29], [30], [32], [33]. Their September 16 filesystem timestamps and the supplied prior-batch context support same-day reuse; markdown captures contain no independently preserved original response headers or fetch timestamp metadata.
- **T** = `/var/folders/lv/p8_qbzys5634z90y2w4kk3lw0000gn/T/opencode/freshness-b01/`. New captures are preserved here because Git reported `.firecrawl/` **NOT ignored** (`git check-ignore .firecrawl` had no match; status showed `?? .firecrawl/`). `.gitignore` was not edited. The Firecrawl status command initially ran in the adjacent workspace and its ignore indication was not evidence about this repository.
- Firecrawl retrieved actual markdown bodies, not HEAD/status-only responses. Recorded support comes from substantive body text, not navigation titles or a successful CLI exit alone. Videos and UI execution were not verified; several captures report media download errors despite usable article text.
- **HTTP unknown** means the markdown-only capture/CLI output did not expose an origin response code. No 200 is inferred. The one HTTP 404 below was explicitly returned by WebFetch.
- [11] and [12] encountered a Firecrawl rate-limit error, then succeeded after waiting. The first retry's error logs were overwritten by success; the tool transcript preserves the rate-limit messages. No origin HTTP code is inferred from the rate-limit error.
- Execution deviation: [1], [5], [9] were unnecessarily fetched again before switching to full reuse. [11]/[12] received an additional attempt after this run's rate-limit failure, beyond the intended single retry of the prior failed batch. Subsequent requests were spaced and concurrency never exceeded two. This is not represented as perfect retry-policy compliance.
- [28]'s Firecrawl attempt did not produce a capture before the enclosing command timed out after 115 seconds. WebFetch fallback returned HTTP 404 for the exact bibliography URL. Do not interpret a URL failure as product deprecation. Stop at the timebox; no further retries.

## All 33 bibliography entries

Every date in this table is the current **2026-09-16 access/inspection date**. R rows reuse the prior same-day fetch; T rows were fetched during this run. Support is deliberately narrower than an unconditional fact-check verdict.

| ID | Source URL | Access date | Retrieval / HTTP | Evidence | Supported claim or explicit limitation |
|---|---|---|---|---|---|
| [1] | https://cursor.com/docs/rules | 2026-09-16 | VERIFIED; HTTP unknown; reused | R/cursor.com-docs-rules.md:72–141,220–235 | Project `.mdc` rules, four application modes, context inclusion, `/create-rule`, and under-500-line guidance supported. Nested AGENTS.md and team precedence also documented. |
| [2] | https://cursor.com/help/customization/rules.md | 2026-09-16 | VERIFIED; HTTP unknown | T/cap-01-b.md:9–109 | Rule creation and scopes supported; `.cursorrules` is legacy and will be deprecated, not stated already removed. Rules do not apply to Tab/Inline Edit/Bugbot PR reviews. |
| [3] | https://cursor.com/docs/mcp | 2026-09-16 | VERIFIED; HTTP unknown | T/cap-03-a.md:132–151,167–357 | `mcpServers`, command/args, URL/headers and `${env:NAME}` supported. Table calls stdio `type` required while examples omit it: schema ambiguity, not a clean A01 gate. |
| [4] | https://cursor.com/help/customization/mcp.md | 2026-09-16 | VERIFIED; HTTP unknown | T/cap-04-a.md:25–96 | Project/global JSON, precedence, local/remote shapes supported. Existing fact-check cites [4] for env interpolation, but this capture does not establish it; [3] does. Auto-review approval behavior needs qualification. |
| [5] | https://cursor.com/docs/hooks | 2026-09-16 | VERIFIED; HTTP unknown; reused | R/cursor.com-docs-hooks.md:231–235,454–509,844–848 | Version 1, project-root execution and exit 2 blocking supported. Other non-zero exits fail open by default; exit 0 uses JSON decision, not unconditional allow. Step 9 conflicts. |
| [6] | https://cursor.com/docs/customize-cursor.md | 2026-09-16 | VERIFIED; HTTP unknown | T/cap-06-a.md:1–33 | Customize manages plugins, MCP, rules, skills, subagents and hooks by scope. Each subagent has its own context. No detailed permission schema established. |
| [7] | https://cursor.com/docs/reference/third-party-hooks.md | 2026-09-16 | VERIFIED; HTTP unknown | T/cap-07-a.md:9–35,137–169,199–249 | Third-party imports toggle, event mappings and exit-2 semantics supported; compatibility is not complete. Merge-precedence prose differs from [5]; do not generalize conflict handling. |
| [8] | https://cursor.com/docs/agent/plan-mode.md | 2026-09-16 | VERIFIED; HTTP unknown | T/cap-08-a.md:1–15 | Reviewable pre-code plan and Save to workspace supported. Exact `.cursor/plans/` destination asserted in Step 17 is NOT established by this body. |
| [9] | https://cursor.com/docs/skills.md | 2026-09-16 | VERIFIED; HTTP unknown; reused | R/cursor.com-docs-skills.md.md:25–29,59–78,168–218 | SKILL.md, description-based selection and progressive resources supported. `paths`, pinned skill Custom Modes and restricted personal cloud sync extend current coverage. Legacy `globs` still accepted. |
| [10] | https://cursor.com/help/ai-features/tab | 2026-09-16 | VERIFIED; HTTP unknown | T/cap-10-a.md:9–34 | Multi-line completion, Tab acceptance, jump-in-file and cross-file edits supported. Rendered modifier labels are merged; do not copy `CmdCtrl` literally. |
| [11] | https://cursor.com/help/ai-features/inline-edit | 2026-09-16 | VERIFIED; HTTP unknown; recovered after rate limit | T/cap-11-a.md:9–32 | Selection-based Cmd/Ctrl+K edits and promotion to Agent supported. Modifier extraction is imperfect. |
| [12] | https://cursor.com/help/customization/keyboard-shortcuts | 2026-09-16 | VERIFIED; HTTP unknown; recovered after rate limit | T/cap-12-a.md:9–32 | Shift+Tab mode rotation, inline-edit and sidepanel shortcuts supported; platform key glyph rendering is merged. |
| [13] | https://cursor.com/docs/models-and-pricing | 2026-09-16 | VERIFIED; HTTP unknown | T/cap-13.md:101–218 | Two usage pools, current rates, Auto Cost/Balance/Intelligence and legacy-only Max Mode documented. Step 27 says Balanced; source says Balance. Pricing depends on plan, including third-party token surcharge. |
| [14] | https://cursor.com/docs/models/cursor-composer-2-5 | 2026-09-16 | VERIFIED; HTTP unknown | T/cap-14.md:103–196 | Composer 2.5, 200k context, standard/fast rates and agent tools documented. Source describes image generation but does not establish an `assets/` default. |
| [15] | https://cursor.com/help/ai-features/background-agents | 2026-09-16 | VERIFIED; HTTP unknown; reused | R/cursor.com-help-ai-features-background-agents.md:9–23,69–75 | Background agents are called Cloud Agents and run on dedicated VMs asynchronously. Does not establish custom `.cursor/agents` frontmatter or `readonly: true`. |
| [16] | https://cursor.com/docs/agent/tools/browser | 2026-09-16 | VERIFIED; HTTP unknown | T/cap-16.md:82–173 | Native browser interaction, screenshots, console logs and network traffic supported; network feature has a surface-specific limitation. Media not verified. |
| [17] | https://cursor.com/docs/agent/design-mode | 2026-09-16 | VERIFIED; HTTP unknown | T/cap-17.md:72–76,120–136 | Agents Window browser selection, visual/voice prompting and Design Mode toggle supported. Media not verified. |
| [18] | https://cursor.com/docs/agent/debug-mode | 2026-09-16 | VERIFIED; HTTP unknown | T/cap-18.md:72–112 | Hypothesis → instrumentation → reproduction → log analysis → targeted fix → verification/cleanup supported. |
| [19] | https://cursor.com/docs/configuration/worktrees | 2026-09-16 | VERIFIED; HTTP unknown | T/cap-19.md:82–133 | Isolated Git checkouts and worktrees.json supported. UI-native workflow is Agents Window only; IDE uses skills. Specific raw Git command behavior not independently tested. |
| [20] | https://cursor.com/docs/agent/agent-review | 2026-09-16 | VERIFIED; HTTP unknown | T/cap-20.md:72–105 | Agent Review reads BUGBOT.md, has Quick/Deep depths and moves settings in 3.11. Contradicts categorical claim that built-in review cannot know organization standards; does not verify 'free first pass'. |
| [21] | https://cursor.com/docs/agent/tools/terminal | 2026-09-16 | VERIFIED; HTTP unknown | T/cap-21.md:82–99 | Run Modes control terminal approvals/sandbox; CURSOR_AGENT supports shell-theme troubleshooting. Full sandbox policy is on a linked, uninspected page. |
| [22] | https://cursor.com/docs/cli/overview | 2026-09-16 | VERIFIED; HTTP unknown; reused | R/cursor.com-docs-cli-overview.md:72–158 | Interactive agent, print mode, Plan/Ask, cloud handoff, resume and sandbox controls supported. |
| [23] | https://cursor.com/docs/cli/installation | 2026-09-16 | VERIFIED; HTTP unknown | T/cap-23.md:72–98,177–185 | macOS/Linux/WSL and native Windows installers, version check and update documented. Extracted PATH examples concatenate shell lines; do not copy blindly. Nothing installed. |
| [24] | https://cursor.com/docs/cli/headless | 2026-09-16 | VERIFIED; HTTP unknown | T/cap-24.md:72–113,159–161 | `-p`, `--force`/`--yolo`, output formats and API-key setup documented. Source says print without force proposes rather than applies edits. Not execution-tested. |
| [25] | https://cursor.com/docs/agent/tools/canvas | 2026-09-16 | VERIFIED; HTTP unknown | T/cap-25.md:82–133 | Interactive, saved canvases and team sharing supported. Does NOT support Step 23's image generation into `assets/`; sharing requires paid/team eligibility and compatible privacy mode. |
| [26] | https://cursor.com/docs/integrations/slack | 2026-09-16 | VERIFIED; HTTP unknown | T/cap-26.md:72–112,162–179 | @cursor launches and follow-ups supported; follow-up authority depends on team policy. Named environments, worker/pool selection extend coverage. |
| [27] | https://cursor.com/marketplace | 2026-09-16 | VERIFIED; HTTP unknown; reused | R/cursor.com-marketplace.md:45–109 | Real plugin and automation listings present. Catalog presence does not validate every third-party listing or plugin safety. |
| [28] | https://cursor.com/docs/plugins.md | 2026-09-16 | UNVERIFIED/BLOCKED; Firecrawl incomplete; WebFetch HTTP 404 | No content capture; WebFetch tool result | Plugin/team-marketplace procedural claims depending solely on this entry remain blocked. Other pages establish general existence only. Canonical extensionless link discovered, not fetched within timebox. |
| [29] | https://cursor.com/docs/enterprise.md | 2026-09-16 | VERIFIED; HTTP unknown; reused | R/cursor.com-docs-enterprise.md.md:18–80,109–128 | Enterprise privacy, identity and centralized controls documented; plan distinctions matter. No tenant settings or compliance certificates independently tested. |
| [30] | https://cursor.com/docs/account/teams/analytics-api.md | 2026-09-16 | VERIFIED; HTTP unknown; reused | R/cursor.com-docs-account-teams-analytics-api.md.md:1–15,79–101 | Adoption/edit/Tab metrics supported; API is Enterprise-only with scoped authentication. No credentialed API call made; full endpoint schemas not audited. |
| [31] | https://cursor.com/docs/cloud-agent | 2026-09-16 | VERIFIED; HTTP unknown | T/cap-31.md:116–140,180–227 | Isolated VMs, parallel tasks, MCP and repository hooks supported. Early read-only turns lack hooks; multi-repo lacks long-running; sharing and billing have conditions. |
| [32] | https://cursor.com/changelog/08-19-26 | 2026-09-16 | VERIFIED; HTTP unknown; reused | R/cursor.com-changelog-08-19-26.md:64–102 | Cloud-only subscriptions, pinned Custom Modes, separate-machine subagents, `/goal`, `/loop` pairing and steering supported. Full article title differs from bibliography shorthand. |
| [33] | https://cursor.com/help/ai-features/side-chats.md | 2026-09-16 | VERIFIED; HTTP unknown; reused | R/cursor.com-help-ai-features-side-chats.md.md:1–54 | Durable child threads with hidden parent reference context, @-mention return path and local-only availability supported; nesting unsupported. |

## Discovery and comparison against curriculum coverage

Known entry point **https://cursor.com/docs** was fetched to **T/index.json** on 2026-09-16 (markdown + links; HTTP unknown). Its navigation explicitly links **https://cursor.com/changelog**, along with Projects, Origin, Grok Bot, SDK, Security Agents and PR Routing & Approval. These links also appear in reused docs navigation (for example R/cursor.com-docs-rules.md:15–61). No changelog URL was guessed.

**https://cursor.com/changelog** was fetched to **T/changelog.md** on 2026-09-16 (HTTP unknown). Actual release bodies were inspected, including September 10 Projects, September 2 self-hosted machines, August 27 start-from-scratch, August 19 harness improvements, and August 17 Origin. Latest visible release is September 10: no release newer than the September 11 bibliography date was observed on this landing page. Older pagination and hidden releases were not exhaustively checked.

NEW below means **new to the audited curriculum coverage**, not necessarily released in the last five days. CHANGED includes needed qualifications/corrections relative to existing prose, not an asserted historical source diff. No September 11 source-body snapshot was available for a trustworthy textual before/after diff.

### NEW / missing coverage

| Finding | Body evidence | Current coverage and affected files |
|---|---|---|
| Projects beta: persistent shared context, coordinator delegates rather than writes code, event subscriptions | T/changelog.md:66–128; https://cursor.com/changelog/projects | No named Projects coverage in step search. Distinct from a repository project. Compare `steps/04-context.md`, `steps/13-workflows.md`, `steps/18-agents-window.md`, `steps/33-improvement-loop.md`. |
| Self-hosted My Machines and team pools, dynamic scheduling and computer use | T/changelog.md:130–156; https://cursor.com/changelog/self-hosted-machines | `steps/18-agents-window.md` covers parallel agents, not this named runtime/pool surface; `steps/26-security.md` needs runtime-policy distinction before expansion. |
| Origin hosting and start without third-party source control | T/changelog.md:158–202,284–326; https://cursor.com/changelog/start-from-scratch and https://cursor.com/changelog/origin-code-hosting | No Origin coverage found. Relevant to `steps/02-clone-and-run.md`, `steps/15-slack-bot.md`, `steps/18-agents-window.md`. Existing GitHub case-study choice remains valid, not deprecated. |
| Skill-backed Custom Modes pinned for a session | [9]:25–29,216–229; [32]:80–84 | No Custom Mode match across steps. `steps/07-first-skill.md` and `steps/12-loops-goals.md` are adjacent coverage; normal slash invocation is per-message, pinned mode per-session. |
| MCP Apps and protocol capabilities beyond tools | [3]:140–157; [4]:9–13 | `steps/06-mcp-github.md` and `steps/24-knowledge-graphs.md` cover tools, not interactive MCP Apps. |

### CHANGED / correction candidates

| Severity | Existing assertion / coverage | Verified difference and dependency |
|---|---|---|
| Critical | `steps/09-hooks.md:17–19`: exit 0 allows; 'non-zero exit blocks' | [5]:231–235,509,844–848: exit 2 blocks; other non-zero exits fail open by default; successful exit consumes a JSON permission decision. `failClosed: true` is needed to block other failure modes. Block A05 and B10 hook/enforcement expansion until semantics are corrected and tested; do not infer that every hook is a security boundary. |
| High | `steps/08-org-reviewer.md:20–21`: 'Free first pass', built-in review 'knows nothing of cents or UTC'; `steps/10-abstractions.md:30`: generic review contrast | [20]:84–105 says Agent Review reads repository BUGBOT.md rules and offers Quick/Deep cost levels. Generic-by-necessity assertion is unsound; free entitlement unverified. Block this contrast and cost claim in B10 pending correction. |
| High | MCP JSON shapes in `steps/06-mcp-github.md` and planned A01 | [3]:292 calls stdio `type` required but [3]/[4] examples omit it. Core wrapper/interpolation verified, exact minimum schema unresolved. A01 runtime/schema gate remains blocked; do not simply label all MCP gates passed. |
| Medium | `steps/27-models-cost.md:21`: Auto/Balanced | [13]:208–212 uses Cost, Balance, Intelligence and routed-model billing. Two pools, plan eligibility and token surcharge merit qualification, not hardcoded timeless rates. |
| Medium | `steps/07-first-skill.md`, `steps/04-context.md` | [9] adds path-scoped/nested skills and distinguishes local skills, personal cloud sync and team publishing. Do not imply all home-directory skills automatically follow cloud/remote sessions. |
| Medium | `steps/18-agents-window.md`, `steps/07-first-skill.md` | [19]:84 distinguishes UI-native Agents Window worktrees from IDE skill commands. Preserve raw Git workflow as a separate mechanism; no raw Git command was run here. |
| Medium | `steps/19-side-chats.md`, `steps/32-customer-canvas.md`, `steps/10-abstractions.md` | [33] side chats local-only/no nesting; [25] shared canvases are team/read-only snapshots with plan/privacy restrictions; [30] Analytics API Enterprise-only. Do not broaden availability from generic feature existence. |
| Medium | `steps/15-slack-bot.md`, `steps/26-security.md`, `steps/33-improvement-loop.md` | [26] follow-up permissions are policy-dependent; [31]/[5] cloud hook coverage differs from local, including unprotected early read-only turns. |

### DEPRECATED / legacy

- **`.cursorrules`: legacy, announced future deprecation, not verified removed.** [2]:86–93 explicitly recommends `.mdc` migration. Relevant rule-teaching file: `steps/03-rules.md`. No `.cursorrules` usage was found in steps, so no existing exercise was proven invalidated. Do not remove or change case-study config on this evidence.
- **Skill `globs`: legacy fallback, still accepted**, with `paths` recommended in [9]:180–210. Relevant file: `steps/07-first-skill.md`; no demonstrated current use requiring removal. This is not deprecation of rule-file `globs`.
- **Max Mode: legacy-plan-only**, not globally removed, per [13]:214–218. Relevant file: `steps/27-models-cost.md`; no Max Mode match found in steps.
- No fully removed feature was verified. Failed URL [28], Cloud Agents naming and optional migration of dynamic rules to skills are not sufficient evidence of feature removal.

### UNVERIFIED and blocked downstream work

1. **[28] unavailable:** exact team-marketplace setup, import manifests, installation modes and publication steps cannot be signed off. Block dependent portions of B03/B04/B10, especially `steps/25-marketplace.md` and the [28]-only distribution claim in fact-check Step 6. Candidate canonical URL **https://cursor.com/docs/plugins** is explicitly linked from the docs index and marketplace; its full body still needs verification. General existence is corroborated by [3], [6], [27], [29], but is not a substitute for procedure verification.
2. **Plan storage:** `steps/17-plan-files.md:15,22–23` claims exact `.cursor/plans/` behavior. [8] confirms save-to-workspace, not the directory. Block that path-specific B10 exercise until primary help or controlled UI evidence establishes the destination.
3. **Image source mismatch:** `steps/23-images.md:15,25` cites [25] for generation into `assets/`; [25] is canvases. [14] lists image generation but not the destination. Block the destination/default claim until a dedicated primary source or UI verification is obtained.
4. **Custom subagent schema:** [15] does not verify `.cursor/agents/` or `readonly: true` in `steps/08-org-reviewer.md:23`. Official **https://cursor.com/docs/subagents** was discovered in the index, but body/schema was not fetched here. Block A04 and related B10 configuration claims pending a schema check. Read-only permissions do not establish that a model's report is necessarily trustworthy.
5. **Index-only discoveries:** Grok Bot (**https://cursor.com/docs/grok-bot**), SDK (**https://cursor.com/docs/sdk/typescript**, **https://cursor.com/docs/sdk/python**), Security Agents (**https://cursor.com/docs/security-agents**), PR Routing & Approval (**https://cursor.com/docs/approval-agents**) and CLI ACP (**https://cursor.com/docs/cli/acp**) are official linked surfaces, not body-verified functionality in this audit. No implementation claims or new exercises authorized from link titles alone. Treat as B03 research candidates, blocked until bodies are read.
6. **Source inconsistencies:** [7] claims higher-priority hook responses win while [5] describes deny/ask/allow merging and last-response handling for other fields; [20] says automatic review after task in one paragraph and after commit in another. These fine-grained behaviors require targeted verification before teaching them as guarantees.
7. **Media, tenant eligibility, runtime behavior and comprehensive historical diff** remain unverified. This audit cannot certify credentials, actual plugin installation, hook enforcement, cloud provisioning or local UI shortcuts merely from documentation.

## Validation and handoff

- Named inspection: bibliography IDs **[1]–[33] each appear once as a source row**; each has URL, access date, HTTP observation/unknown status, and supported claim or blocker. 32 VERIFIED + 1 UNVERIFIED = 33.
- Report records all ten reused evidence paths and the temporary capture root. No new capture was written into the unignored repository `.firecrawl/`.
- `npm run lint -- --no-cache`: passed, no ESLint warnings/errors.
- `npm run typecheck -- --incremental false`: passed. These checks do not validate source truth or clear any freshness gate.
- No build, dependency install, credentialed API test, commit or push was run. Cache-writing options were disabled for checks to respect scope.
- Pre-existing worktree changes were `site/package.json` and untracked `.firecrawl/`; they were not modified by this audit. Only this report is an intended repository addition. Temporary fetch helper/logs/captures remain under T as partial evidence.
- Fact-check schema was read: its allowed verdicts are `confirmed`, `corrected`, `cut`. This report's VERIFIED/UNVERIFIED labels describe source evidence, not new fact-check rows; no claim was silently marked confirmed or cut. Corrections are proposals for later authorized work.
- **Handoff status: partial evidence preserved; do not start Phase A or claim G-B0 passes.** B02–B04 and remaining claim/schema verification are still outstanding. The literal all-HTTP-status requirement cannot be passed when origin codes are unavailable; 'HTTP unknown' is honest coverage, not a fabricated success code.

## Additive B01 follow-up — 2026-09-16

This section supersedes only the specific evidence blockers identified below; the initial audit above remains a historical record. **Canonical replacement content for [28] is now verified, and custom subagent schema is source-supported.** Exact bibliography URL `https://cursor.com/docs/plugins.md` remains recorded as failed, not retroactively fetched successfully. Coverage is therefore **32/33 exact bibliography URLs plus a verified canonical replacement for [28]**, not 33 successful exact-URL fetches. No curriculum assertion is automatically confirmed by that count; G-B0 remains not passed.

### Follow-up provenance

Firecrawl scrape skill loaded. Two requested pages fetched concurrently (maximum two requests); one linked reference fetched subsequently. No retries, browser interaction, credentials, installation, hook execution, push, or subagent runtime test. The six-minute research bound was respected; no broader discovery crawl was attempted.

At entry, `git check-ignore -v .firecrawl` succeeded against `.gitignore:9:.firecrawl/`. This differs from the initial audit's unignored state: `.gitignore` was already modified when this follow-up began and was not edited here. All three new capture paths below also passed `git check-ignore -v` against that rule. R and T retain their definitions above; cached MCP/hooks/plan/model passages were reused read-only, not refetched.

| Evidence alias | Official source / discovery | Capture and inspection | Retrieval provenance |
|---|---|---|---|
| P | https://cursor.com/docs/plugins — previously discovered and explicitly requested | R/cursor.com-docs-plugins.md; full captured body read, including distribution, publication and FAQ | 2026-09-16; Firecrawl scrape ID `01a0ac3f-f064-7770-870c-00c8b5e40dbf`; HTTP unknown |
| S | https://cursor.com/docs/subagents — previously discovered and explicitly requested | R/cursor.com-docs-subagents.md; full captured body read, including schema, restrictions and FAQ | 2026-09-16; Firecrawl scrape ID `01a0ac3f-f067-7469-9b3d-3b2aa3c61909`; HTTP unknown |
| PR | https://cursor.com/docs/reference/plugins — linked at P:432 | R/cursor.com-docs-reference-plugins.md:72–566; substantive reference body read, including manifest and submission sections | 2026-09-16; Firecrawl scrape ID `01a0ac40-910b-7080-bf29-48d359d2e4f4`; HTTP unknown |

P and S contain media-download errors alongside usable text; videos were not verified. Scrape IDs identify retrieval jobs, not origin status codes. PR's format tabs expose an Agent Plugin example rather than both example layouts; Cursor Plugin claims below rely on explicit prose/tables, not an assumed hidden tab. Extracted code arrays sometimes contain rendering backslashes; snippets below are transcribed cleanly from documented fields, not claimed to be byte-identical downloadable schemas. No independent JSON-schema validator was run.

### Stable findings and downstream action mappings

These IDs are assigned once here and should be retained in later corrections. “Resolved” means the named source question is answered, not that implementation, tenant eligibility, or a Phase A/B gate has passed. Actions are mappings to existing work, not authorization to execute it.

| Finding ID / earlier blocker | Classification and precise disposition | Mapped action / affected steps |
|---|---|---|
| **B01-F01** / Unverified 1, [28] | **RESOLVED: canonical plugin/distribution procedures and manifest fields.** P and PR establish package formats, team import, access, installation modes and publication. **BLOCKED:** actual two-account installation/enforcement, tenant permissions, version-pinning claim, and plugin-delivered readonly behavior. Exact failed URL remains failed. | **B01-A01 → B03/B04/B10**, `steps/25-marketplace.md:14–24,29–34`; distribution claim in Step 6/fact-check requires later citation repair. Select Cursor Plugin format for reviewer + hook; replace “Enabled by default” with documented **Default On**, distinguish opt-out from **Required**, and qualify “everywhere.” This is correction/qualification, not evidence of a renamed or deprecated mode. |
| **B01-F02** / Unverified 4 | **RESOLVED: project `.cursor/agents/`, YAML frontmatter and boolean `readonly: true`** via S:155–202. **BLOCKED:** runtime restriction verification and any claim that readonly makes reports trustworthy. PR's shorter agent table does not separately specify readonly preservation after packaging. | **B01-A02 → A04/B10**, `steps/08-org-reviewer.md:14–16,23–26,36–39`, Step 25 packaging. Source-only A04 schema dependency is clear; execution gate is not. Correct the conflation of restricted writes with truthful reports; do not describe inherited tools as independently configured permission isolation. |
| **B01-F03** / MCP correction row | **RESOLVED: documented STDIO shape by choosing explicit `"type": "stdio"`**, satisfying [3]'s required-field table rather than relying on omitted fields in examples. Minimum omission/inference behavior is not needed for this workshop choice. **BLOCKED:** connection/authentication, installed-server compatibility and runtime A01 acceptance. | **B01-A03 → A01/B10**, `steps/06-mcp-github.md`, adjacent Step 24 integrations. Use `mcpServers` wrapper, explicit STDIO type, command, optional args/env; `${env:NAME}` is supported by [3], not established by [4]. Do not apply STDIO's type requirement to all remote transports. This is conservative schema alignment, not a demonstrated release change. |
| **B01-F04** / critical hook correction | **RESOLVED: command-hook schema and exit/JSON semantics from cached [5].** Choose explicit `"type": "command"`; it is documented with default `command`, **not a required missing field**. **BLOCKED:** Step 9 correction, actual hook failure-path tests, source-merge contradiction, and universal/non-optional enforcement claims. | **B01-A04 → A05/B10**, `steps/09-hooks.md:14–19,23–41`, Steps 25/26. Preserve version 1 and project-root paths; for failure-blocking intent specify `failClosed: true`, handle JSON permission decisions, and distinguish Cursor-triggered hooks from a Git/server-side pre-push control. No claim that arbitrary external shell pushes are covered. |
| **B01-F05** / Unverified 2 | **RESOLVED AS WORKSHOP CONVENTION:** choose `.cursor/plans/` for committed plans; [8]:15 establishes home-directory default and Save to workspace, not this exact workspace subdirectory. **BLOCKED only if retaining a product-default/automatic-destination assertion.** Existing prose remains uncorrected. | **B01-A05 → B10**, `steps/17-plan-files.md:14–23`. Later say “For this workshop, save or move the plan to `.cursor/plans/`,” then verify that chosen file and reference it. Do not claim Save to workspace necessarily selects that directory. No product path migration or deprecation inferred. |
| **B01-F06** / Unverified 3 | **RESOLVED AS WORKSHOP CONVENTION:** choose `assets/` as an artifact destination, explicitly request/save/move the generated file there. [14]:173–175 supports text/reference image generation; [25] is the wrong generation source. **BLOCKED:** automatic/default assets destination, actual generation/model availability and application asset-serving assumptions. | **B01-A06 → B10**, `steps/23-images.md:14–15,23–27`. Correct citation and instruct the chosen destination explicitly; do not present `assets/` as a Cursor default or automatically public web directory. This is workshop prose/source correction, not a release change. |

### Relevant source snippets and schema support

**B01-F01 — marketplace distribution and packaging**

- P:74: “Plugins package rules, skills, agents, commands, MCP servers, and hooks into distributable bundles.” P:124–143 distinguishes **Agent Plugins** (root `plugin.json`, skills/MCP) from **Cursor Plugins** (`.cursor-plugin/plugin.json`, additionally rules/agents/commands/hooks/variables). Step 25's reviewer plus hook requires the latter documented format.
- P:206–218: Teams supports **up to 1** team marketplace; Enterprise **unlimited**, with only admins adding marketplaces on Enterprise. P:271–279 supplies **Dashboard → Plugins → Add Marketplace → Import from Repo → Add to Marketplace → Marketplace Settings / Marketplace Access → save**. P:287–294 qualifies Auto Refresh: GitHub App required, at most one re-index per ten minutes; full-manifest imports discover new plugins, individually added entries require re-import for new plugins.
- P:255–257: “**Default Off**: Developers can find the plugin and choose whether to install it”; “**Default On**: The plugin is installed by default, but developers can opt out”; “**Required**: The plugin is always installed and cannot be uninstalled.” Access is a separate setting (P:241–249). P:222–239 explicitly says linking Team MCPs does not install/enable them for everyone and warns deletion can remove the linked server from both local and Cloud Agents.
- P:309–325: personal skill publication on Teams/Enterprise packs one skill into one hosted plugin; teammates' installs are **opt-in**, author receives it automatically, dependent skills are not bundled. Admin publishing policy at P:259–267 can restrict new publication. This is not equivalent to automatic synchronization of every personal skill.
- P:329–338 documents **Customize → Install → project or user scope**. PR:110–138 requires a Cursor Plugin manifest with string `name`; component path fields are optional. PR:203–215 documents default `agents/`, `hooks/hooks.json`, and `mcp.json` discovery; explicit component paths replace the corresponding discovery.
- PR:438,469–497: repository-root `.cursor-plugin/marketplace.json` requires string `name`, object `owner` with required `name`, and array `plugins` (manifest ≤10 MB). Each plugin entry requires `name`; documented `source` accepts a path string or an object with `path` and options. Include an explicit local plugin source in the workshop rather than inferring omitted-source behavior. PR:499–505 describes per-plugin manifest lookup and merging; conflicting precedence wording elsewhere in the reference is not needed if metadata is not duplicated.
- PR:531–566 documents **public** marketplace submission through a public Git repository and review, including local testing as a checklist item. That is distinct from private team import. P:407–426 local development requires allowed local imports (off by default on Enterprise), reload, and constrained symlink targets. None of these flows was executed. Step 25:29's “consumers pin” is not established by the inspected bodies; semantic `version` metadata alone is not proof of a pinning UI or immutable installation.

**B01-F02 — readonly subagent schema (documented, not runtime tested)**

S:159 identifies `.cursor/agents/` as project scope; S:170–202 supplies Markdown + YAML frontmatter and the fields below:

| Field | Documented type/default | Support |
|---|---|---|
| `name` | optional string; filename-derived default | S:198; lowercase letters/hyphens |
| `description` | optional string | S:199; delegation hints |
| `model` | optional string, default `inherit` | S:200; model/plan/admin qualifications at S:239–247 |
| `readonly` | optional boolean, default `false` | S:201: “restricted write permissions (no file edits, no state-changing shell commands)” |
| `is_background` | optional boolean, default `false` | S:202; nonblocking parent behavior |

A source-supported proposed frontmatter for the existing Step 8 task (not created or invoked here):

```yaml
---
name: org-standards
description: Reviews code against documented organization standards.
model: inherit
readonly: true
---
```

This is not a `type: readonly` schema, nor proof of zero side effects through every inherited remote tool. S:580 says subagents inherit parent tools, including MCP; cloud subagents use team-configured MCP instead. S:321 says the parent's checkout is shared by default unless isolation is requested. S:98 says the parent supplies context to a clean subagent context. Restricted writes do not validate reasoning or prevent misleading reports. PR:287–319 only lists name/description for packaged agents: carrying the readonly restriction through installation remains a specifically unverified integration claim, not an asserted unsupported field or deprecation.

**B01-F03/F04 — explicit documented `type`, two different schemas**

- Cached [3], T/cap-03-a.md:286–298: STDIO **`type` required**, example value `"stdio"`; **`command` required**, `args`, `env`, `envFile` optional. T:319–357 supports interpolation. Use explicit `"type": "stdio"` inside the named `mcpServers` entry. PR:389–410 separately documents transport inference for Cursor Plugins and shows an explicit STDIO type for Agent Plugins; this does not prove every project config can omit it. No need to resolve omission to choose the documented explicit form.
- Cached [5], R/cursor.com-docs-hooks.md:499–510: **`version` required**, positive integer (use 1); per script **`command` required**, **`type` is `"command" | "prompt"`, default `"command"`**; `failClosed` boolean defaults false, `timeout` is seconds, matcher is regex. A proposed project-hook definition using explicit documented values is:

```json
{
  "version": 1,
  "hooks": {
    "beforeShellExecution": [
      {
        "type": "command",
        "command": ".cursor/hooks/pre-push-check.sh",
        "matcher": "git push",
        "failClosed": true
      }
    ]
  }
}
```

This only records schema support; it is not a deployed or tested guard, and the narrow matcher is not a comprehensive push detector. Plugin-relative execution paths must be validated separately; do not blindly reuse a project-root path after packaging.

[5]:231–235: exit **0** means success and consumes JSON, exit **2** blocks, other exits fail open by default. [5]:844–874 gives `permission: "allow" | "deny" | "ask"` with user/agent messages for before-shell/MCP output; invalid JSON/schema blocks these permission hooks. `failClosed: true` also blocks crashes/timeouts/nonzero/no-output failures ([5]:509). These are corrections to Step 9's “0 to allow” and “non-zero exit blocks,” not evidence that hook semantics recently changed. [5]:454–459 supports project-root working directory and `.cursor/hooks/...` paths. Third-party merge precedence remains unresolved; no universal enforcement guarantee follows from this configuration.

**B01-F05/F06 — chosen paths, not product defaults**

[8], T/cap-08-a.md:15: “Plans are saved by default in your home directory. Click ‘Save to workspace’ to move it to your workspace.” Exact `.cursor/plans/` destination is not stated. [14], T/cap-14.md:173–175: “Generate images from text descriptions or reference images.” It does not name `assets/`. The workshop may choose those directories without further primary research; later prose must instruct saving/moving there and label them **WORKSHOP conventions**. Current step wording and [25] citation still require correction before publication.

### Resolved versus remaining handoff

**Resolved source/design questions:** canonical plugin replacement and documented import/distribution/manifests (B01-F01); project readonly subagent fields (B01-F02); explicit STDIO MCP shape (B01-F03); explicit command-hook type plus permission/failure semantics (B01-F04); path-specific exercises can proceed as chosen conventions rather than unverified defaults (B01-F05/F06). Proposed corrections are not yet applied.

**Remaining blockers:** runtime A01/A04/A05 acceptance; plugin installation, plugin-delivered readonly and hook paths/enforcement across a second account; Step 8 built-in-review pricing/generic contrast and trustworthiness claim; Step 9 semantics; Step 25 pinning and universal rollout/enforcement claims; unchanged source inconsistencies and index-only discoveries in the initial audit; tenant/model availability, media, HTTP origin codes and historical source diff. B02–B04 remain outstanding. No new release since September 11 was established here; newly inspected capabilities are new evidence/coverage, not newly dated releases. No new deprecation or removal finding is made.

Validation: `npm run lint -- --no-cache` and `npm run typecheck -- --incremental false` both passed during this follow-up; neither proves product behavior. Entry and validation Git status retained pre-existing changes to `.gitignore`, `site/package.json`, untracked `.cursor/rules/curriculum-freshness.mdc` and `.cursor/skills/`, plus this untracked report. Only this report was edited; the three evidence captures are ignored. Steps, console, plan, bibliography and fact-check were not edited. No commit or push. **B01 remains a partial audit; G-B0 has NOT passed.**

## Historical B03 snapshot — classification, evidence repair and draft budget (2026-09-16)

### Scope and evidence contract

Executed B03 only against the authorized prompt and `PHASE2-PLAN.md:162–190`, with the user's narrower four-file ownership. Read AGENTS, both schemas, citation format, B01 report/follow-up, B02 skill/checklist, current tracks/site filter, frontmatter points and affected prose. B02 artifacts exist; this is not a B02 or G-B0 sign-off. At entry `.gitignore`, `fact-check.md`, `site/package.json`, the B02 artifacts and this report were already dirty/untracked. Preserve those other owners' work. No step, site, console, plan, cached capture or frontmatter edits are part of B03.

All source inspections below reused **September 16, 2026 cached primary captures**, without external requests. R/T/P/S/PR keep the definitions above. `[28]` now resolves to canonical P; the failed `.md` URL remains a failed historical fetch. New stable entries are **[34] = S, [35] = PR, [36] = T/changelog.md**. Existing [1]–[33] are not renumbered. Unknown HTTP origin codes, media failures and capture timestamp limitations remain unchanged.

`confirmed` in fact-check now means **the narrower assertion is supported by source text**; it never means a pending exercise ran or step wording changed. The appended bare-URL/`corrected`/`cut` rows were replaced or consolidated into the single schema table. Original contradictory Step 8 review, Step 17 path and Step 23 image-source rows were replaced, not left confirmed alongside their opposites. Step 6 interpolation now cites [3]; duplicate distribution rows were consolidated under [28]. Worktree/parallel and Canvas/analytics availability rows were narrowed. Repo-only historical checks were not rerun or redated.

### Cached primary evidence inspected for B03 rows

This index covers the September 16 fact-check assertions and classifications added here; retained September 11 rows are not represented as reverified by B03.

| Sources | Cached body inspected | Assertion families / limits |
|---|---|---|
| [2] | T/cap-01-b.md:86–93 | Legacy `.cursorrules`, future deprecation, migration guidance; not removal |
| [3] | T/cap-03-a.md:132–165,167–217,286–357 | Transports, Apps/protocol capabilities, wrapper, explicit STDIO type and interpolation; runtime not tested |
| [5] | R/cursor.com-docs-hooks.md:231–235,424,450–510,844–874 | Exit/JSON semantics, failClosed, command default and project paths; merge conflict with [7] stays unresolved |
| [7] | T/cap-07-a.md:9–35 | Imports and conflicting merge precedence; no blanket compatibility guarantee |
| [8] | T/cap-08-a.md:3–15 | Home default and Save to workspace, not `.cursor/plans/` |
| [9] | R/cursor.com-docs-skills.md.md:60–123,168–218,276–310 | Nested/path-scoped skills, legacy fallback, pinned modes, sync versus publishing |
| [13] | T/cap-13.md:101–118,153–174,192–218 | Usage pools, eligibility, Auto labels, token surcharge, legacy Max Mode |
| [14] | T/cap-14.md:145–175 | Image generation from text/reference images, not a default destination |
| [19] | T/cap-19.md:82–133 | Isolated checkouts, Agents Window versus IDE; no raw Git execution proof |
| [20] | T/cap-20.md:72–105 | BUGBOT.md, Quick/Deep, setting relocation; task/commit trigger contradiction unresolved; no free entitlement |
| [25] | T/cap-25.md:82–133 | Canvas rendering/sharing restrictions, not image generation |
| [26] | T/cap-26.md:72–179 | Slack invocation, environment/worker/pool selection and policy-dependent follow-ups |
| [28] | P:74,124–143,206–338,405–432 | Formats, team MCP linking, access/install modes, refresh, skill publishing, local imports; no pinning proof |
| [30] | R/cursor.com-docs-account-teams-analytics-api.md.md:1–15 | Enterprise-only usage metrics API; no credentialed request |
| [31] | T/cap-31.md:180–227 | Writable-environment hook coverage, absent home-directory hooks, sharing limits and billing |
| [33] | R/cursor.com-help-ai-features-side-chats.md.md:1–54 | Hidden parent context, local-only availability, no nesting |
| [34] | S:74–107,155–202,319–327 | Project schema, readonly restrictions, context/checkout distinction; no restriction execution proof |
| [35] | PR:78–138,203–215,287–319,438–505,531–566 | Manifests/discovery/source paths, public submission versus private import; packaged readonly still unverified |
| [36] | T/changelog.md:66–202,284–326 | Projects, self-hosted workers/pools/computer use, Origin/start-from-scratch; no tenant provisioning |

### Complete classification and pending correction ledger

Existing **B01-F01–F06** and their **B01-A01–A06** mappings remain stable. Previously unnumbered findings receive **FR-2026-01–25** once here. Split rows keep every subfinding visible; aliases below map the original grouped rows. All statuses describe **downstream work**, not completed implementation. `None` means no new console artifact is needed for the selected disposition, not that propagation or runtime checks passed. No new dedicated step is proposed: deepen within the existing 33 or use a bounded footnote; unsupported surfaces are deferred.

| Stable ID | Category / original finding | Evidence | Disposition and rationale | Affected steps | Counterpart only if needed | Downstream status |
|---|---|---|---|---|---|---|
| FR-2026-01 | NEW: Projects beta, shared context, coordinator, subscriptions | [36], T/changelog.md:66–128 | Deepen existing orchestration/context and improvement loop; distinguish named product from repository project. No standalone beta-dependent step. | 4,13,18,33 | None; use existing case-study task/context in an optional exercise, no provisioning requirement | Pending B10; beta/runtime eligibility unverified |
| FR-2026-02 | NEW: My Machines, team pools, scheduling and computer use | [36], T/changelog.md:130–156 | Footnote runtime alternatives and policy boundary; avoid adding mandatory infrastructure to the local workshop. | 18,26 | None; self-hosted deployment deferred | Pending B10 footnote; runtime unverified |
| FR-2026-03 | NEW: Origin hosting/start without third-party SCM | [36], T/changelog.md:158–202,284–326 | Footnote optional hosting and source-of-truth distinction; retain the GitHub case study. No migration. | 2,15,18 | None | Pending B10 footnote |
| FR-2026-04 | NEW: skill-backed session-pinned Custom Modes | [9], R/skills:216–218; initial [32] evidence | Deepen existing skill exercise with per-message versus session comparison; no extra step. | 7,12 | None; reuse existing PR skill | Pending B10; invocation not run |
| FR-2026-05 | NEW: MCP Apps/protocol beyond tools | [3], T/cap-03-a.md:140–157 | Footnote interactive UI and other capabilities; do not install an Apps server solely for a survey. | 6,24 | None; interactive demo deferred | Pending B10 footnote |
| B01-F04 | CHANGED critical: hook exits/JSON/enforcement (B01-A04) | [5], R/hooks:231–235,499–510,844–874 | Critical correction: replace 0=allow/nonzero=block, explain failClosed and Cursor-only event boundary. Explicit command type is a default, not missing required field. | 9,25,26 | A05: minimal invalidation-scoped existing hook/config correction if needed, plus non-destructive failure matrix; not executed | Pending B10 prose and A05 runtime; block unsafe enforcement expansion |
| FR-2026-06 | CHANGED: generic/free built-in review contrast | [20], T/cap-20.md:84–105 | Critical correction: replace categorical ignorance with BUGBOT.md support; remove or qualify free claim in a later content edit. Price entitlement not established. | 8,10 | None for correction; future review can use existing ORG-STANDARDS, no BUGBOT.md addition required here | Pending B10; free claim still unverified and prose untouched |
| B01-F03 | CHANGED: MCP STDIO shape/interpolation (B01-A03) | [3], T/cap-03-a.md:286–357 | Deepen/correct using explicit stdio type and wrapper; source-only table ambiguity avoided, not a runtime gate pass. Interpolation citation repaired to [3]. | 6,24 | A01 planned `.cursor/mcp.json` with explicit STDIO type; connection/auth checks required | Pending A01/B10; schema choice recorded, runtime blocked |
| FR-2026-07 | CHANGED: Auto/Balanced, pools and plan-dependent costs | [13], T/cap-13.md:101–118,153–174,192–212 | Correct to Balance; deepen qualification of pools, plan eligibility and third-party surcharge without freezing timeless rates. | 27 | None | Pending B10; current Balanced prose untouched |
| FR-2026-08 | CHANGED: path-scoped/nested skills, sync versus publishing | [9], R/skills:60–123,168–218,276–310; [28]:309–325 | Deepen scope/trigger kit and distinguish local, opted-in personal cloud sync and opt-in teammate publishing. | 4,7,25 | A03 planned scoped skill/evaluation fixture if exercise needs it; no new remote sync infrastructure | Pending A03/B10 |
| FR-2026-09 | CHANGED: UI-native worktrees versus IDE skills/raw Git | [19], T/cap-19.md:82–133 | Deepen isolation exercise; separate product UI from raw Git workflow. Replace overbroad fact row with supported checkout assertion. | 7,18 | None; learner-created temporary checkout only | Pending B10; raw Git exercise not executed |
| FR-2026-10 | CHANGED: side chats local-only/no nesting | [33], R/side-chats:1–54 | Footnote availability and distinguish hidden parent context from transcript copying. | 19 | None | Pending B10 |
| FR-2026-11 | CHANGED: shared Canvas eligibility and snapshots | [25], T/cap-25.md:103–111 | Footnote read-only team snapshot, paid/team/privacy requirements; do not imply unrestricted customer sharing. | 32 | None | Pending B10; sharing not run |
| FR-2026-12 | CHANGED: Analytics API Enterprise-only | [30], R/analytics:1–15 | Footnote API availability separately from general analytics; keep metric worksheet usable without credentials. | 10,27,33 | None | Pending B10; no API call |
| FR-2026-13 | CHANGED: Slack follow-ups and runtime selection | [26], T/cap-26.md:95–179 | Deepen policy-dependent authority; footnote named environment/worker/pool options. Do not imply thread access authorizes all actions. | 15,26 | None; tenant policy verification deferred to authorized practice | Pending B10; tenant behavior unverified |
| FR-2026-14 | CHANGED: cloud/local hook coverage | [31], T/cap-31.md:188–196; [5] | Critical qualification: early read-only turns have no hooks; local home hooks unavailable. Narrow universal enforcement language. | 9,15,26,33 | A05 cloud/local test matrix only if cloud practice is retained | Pending B10/A05; runtime not verified |
| FR-2026-15 | DEPRECATED/legacy: `.cursorrules` future deprecation | [2], T/cap-01-b.md:86–93 | Footnote migration to project rules; not removed. No existing use found by B01, so no invalidated current exercise. Block only future legacy-as-preferred teaching. | 3 | None; do not alter existing console rules | Pending B10 footnote; no current removal required |
| FR-2026-16 | DEPRECATED/legacy: skill globs fallback | [9], R/skills:180–210 | Footnote paths for new skills; globs still accepted. Not a rule-file globs deprecation. No demonstrated current use to remove. | 7 | A03 should use paths for new scoped skills; no migration counterpart | Pending B10/A03; no current removal required |
| FR-2026-17 | DEPRECATED/legacy: Max Mode legacy plans only | [13], T/cap-13.md:214–218 | Footnote eligibility; not removed globally. No current Max Mode exercise found; block only universal-availability additions. | 27 | None | Pending B10 footnote |
| B01-F01 | UNVERIFIED 1: failed [28], now canonical body-supported (B01-A01) | [28][35], P/PR ranges above | Deepen/correct distribution: use Cursor Plugin format for reviewer+hook, Default On versus Required, access, private import versus public submission. Bibliography repaired, prose not repaired. | 6,25 | B04/A04/A05: minimal package/marketplace manifests around reviewer+hook only if practice retained; second-account tests before rollout claims | Pending B04/B10; pinning, package readonly, paths/enforcement and tenant install remain unverified |
| B01-F05 | UNVERIFIED 2: exact plan destination (B01-A05) | [8], T/cap-08-a.md:15 | Correct as workshop convention: explicitly save/move to `.cursor/plans/`; do not claim automatic/default product destination. | 17 | None; learner artifact, not console scaffolding | Pending B10 prose; default-path claim blocked |
| B01-F06 | UNVERIFIED 3: image source/default assets path (B01-A06) | [14], T/cap-14.md:173–175; [25] mismatch | Correct source to [14], explicitly request/save/move to chosen assets directory; generation and serving behavior require separate verification. | 23 | None; learner artifact | Pending B10 prose; default-path claim blocked |
| B01-F02 | UNVERIFIED 4: subagent schema/read-only trust (B01-A02) | [34], S:155–202,319–327; [35]:287–319 | Deepen with source-supported project frontmatter; distinguish write restriction, shared checkout, context isolation and report correctness. No guaranteed trustworthy report. | 8,13,25 | A04 proposed reviewers; B04 packaged restriction test if packaging retained | Pending A04/B10; schema documented, restriction/runtime integration unverified |
| FR-2026-18 | UNVERIFIED 5: Grok Bot index link only | Initial index discovery, no inspected body | Defer; no feature claim or exercise from a navigation title. | 15 candidate | None | Pending future primary-body research; blocked |
| FR-2026-19 | UNVERIFIED 5: TypeScript/Python SDK index links only | Initial index discovery, no inspected bodies | Defer both SDK surfaces; do not infer API behavior or add SDK code. | 28,29 candidates | None | Pending future primary-body research; blocked |
| FR-2026-20 | UNVERIFIED 5: Security Agents index link only | Initial index discovery, no inspected body | Defer; no automated security guarantee from link title. | 26 candidate | None | Pending future primary-body research; blocked |
| FR-2026-21 | UNVERIFIED 5: PR Routing & Approval index link only | Initial index discovery, no inspected body | Defer; keep existing manual review practice. | 8,11 candidates | None | Pending future primary-body research; blocked |
| FR-2026-22 | UNVERIFIED 5: CLI ACP index link only | Initial index discovery, no inspected body | Defer; no protocol implementation or CLI command invention. | 28 candidate | None | Pending future primary-body research; blocked |
| FR-2026-23 | UNVERIFIED 6: hook source-merge inconsistency | [5], R/hooks:424 versus [7], T/cap-07-a.md:35 | Defer merge guarantees; independently test/research before a multi-source exercise. Explicit single-source shape does not resolve conflict. | 9,25,26 | A05 multi-source failure test only if retained | Pending verification; blocked |
| FR-2026-24 | UNVERIFIED 6: Agent Review task/commit auto-trigger inconsistency | [20], T/cap-20.md:88 versus :94 | Defer automatic trigger guarantee; teach a verified manual invocation instead in later prose. | 8,10 | None | Pending B10/targeted verification; blocked |
| FR-2026-25 | UNVERIFIED 7: media, tenant eligibility, runtime, HTTP codes and historical diff | B01 method/limitations and follow-up provenance | Defer verification-dependent claims; no release recency from capture dates, no runtime success from docs or lint. Preserve unknowns; no blanket certification. | All 1–33; especially 6,8,9,16–18,21,23,25–28,32 | None in B03; individual acceptance checks remain with owning tasks | Pending verification; G-B0 not passed |

R/skills, R/hooks, R/side-chats and R/analytics in the ledger are shorthand for the full R filenames in the evidence index above. No additional source IDs are assigned to unread index-only pages. Those remain research candidates, not bibliography-backed feature claims.

### Specific prose corrections still pending

The ledger is the pending record, not a second fact-check verdict table. All actions below remain **pending B10** (with runtime dependencies as above):

- **B01-F04:** `steps/09-hooks.md:17–19,23–41` still says exit 0 allows/nonzero blocks; replace with success/JSON, exit 2, failure defaults and scope. Specify failClosed for failure-blocking intent and test without an actual push. A schema/source correction alone does not deploy enforcement.
- **FR-2026-06 / B01-F02:** `steps/08-org-reviewer.md:14–26,36–39` and `steps/10-abstractions.md:30` retain generic/free/trust claims. Teach BUGBOT.md support, remove unsupported free entitlement unless verified, cite [34] for project frontmatter, and separate readonly from truthfulness.
- **B01-F03 / B01-F01:** Step 6 still needs source/capability qualifications and explicit STDIO shape when a local example is introduced; team linking alone is not rollout. Step 24 must not treat a compatible shape as a tested server.
- **B01-F05:** `steps/17-plan-files.md:14–23` still asserts Save to workspace selects `.cursor/plans/`; label the directory a workshop choice and explicitly save/move before checking it.
- **B01-F06:** `steps/23-images.md:14–15,23–27` still cites Canvas [25] for automatic assets output. Use [14] for generation, explicitly choose the path, and separately verify availability/output/application serving.
- **FR-2026-07:** `steps/27-models-cost.md:21` still says Balanced. Change to Balance with dated/plan-qualified costing in the content task.
- **B01-F01:** `steps/25-marketplace.md:20–24,29,33–34` still says Enabled by default, consumers pin and everywhere. Select the documented Cursor Plugin format [35], use Default On/Required precisely, and remove or qualify unverified pinning/universal enforcement only when editing prose. Do not report this as a product rename or completed rollout.
- **FR-2026-08–17:** scope/availability/legacy footnotes remain unapplied. Existing GitHub choice and rule-file globs are not deprecated. No fully removed feature was established.

### Coverage proof and budget decision

Named inspection crosswalk (each original finding is covered, even when split):

- **NEW: 5/5** original rows → FR-2026-01–05.
- **CHANGED: 8/8** original rows → B01-F04; FR-2026-06; B01-F03; FR-2026-07; FR-2026-08; FR-2026-09; FR-2026-10/11/12 (side chats/Canvas/analytics); FR-2026-13/14 (Slack/cloud hooks).
- **DEPRECATED/legacy: 3/3** feature bullets → FR-2026-15–17. The final negative finding (no verified removal) is retained above, not converted into a removal task.
- **UNVERIFIED: 7/7** original groups → B01-F01; B01-F05; B01-F06; B01-F02; FR-2026-18–22 (all six linked URLs, including both SDKs); FR-2026-23/24; FR-2026-25.
- **Follow-up stable findings: 6/6** → B01-F01–F06 retained verbatim as IDs with B01-A01–A06 action mappings; resolved source questions do not close pending implementation.
- Total classification ledger: **31 unique rows = 6 retained B01 IDs + 25 new FR IDs**. Every row includes disposition/rationale, affected step(s), counterpart need and pending downstream status. Repeated findings across initial and follow-up sections are aliases, not double-counted completion.
- Follow-up residuals are explicit: pinning/package readonly/installation/paths in B01-F01/F02; MCP runtime in F03; hook failures/enforcement/merge in F04 and FR-2026-23; convention versus default in F05/F06; free review in FR-2026-06; tenant/media/runtime/HTTP/historical diff in FR-2026-25. B01 source-table-only cautions remain recorded as limitations, not silently promoted to confirmed behavior.

`tracks.md` now contains the **PROPOSED / NOT ACTIVE** 33-row draft and module table. Add 5 points to steps **3,4,5,6,7,8,9,16,17,18,20,21,22,26,29,33** for future assessed kits only. **16 × 5 = 80; 440 + 80 = 520.** Draft modules: **80 + 80 + 70 + 55 + 65 + 70 + 100 = 520**. Current modules remain **70 + 65 + 60 + 40 + 50 + 60 + 95 = 440**. No frontmatter/active total change is authorized here. Budget activation belongs to B10 with content and all displayed totals synchronized.

Version sets remain 10 short, 20 medium, 33 long with strict nesting. Persona sets are unchanged. `tracks.md` now states **selected version ∩ selected persona, including long**, matching `site/src/app/page.tsx:36–45`; long shows all 33 only for all personas. The typo Stepnuitotal is fixed to Step total; medium bonus membership is clarified without changing sets. Site comments/frontmatter are not edited or newly certified.

### B03 validation and stop boundary

1. **Fact-check/schema PASS:** read-only Python assertions found exactly one five-column table, **86 distinct claims**, maximum claim length **127 ≤ 140**, valid bibliography sources or preserved repo evidence, ISO checked dates, and no `cut`/`corrected` verdicts implying unperformed prose edits. The old Step 10 broad role-matrix row is now a narrower own-context/parent-result assertion sourced to [34], not background-agent help [15].
2. **Bibliography PASS:** IDs **[1]–[36]** each occur once in order, existing IDs preserved, canonical [28] repaired, each new [34]/[35]/[36] has matching September 16 fact-check rows. No unread index-only URL was presented as a verified entry.
3. **Classification PASS (B03 only):** the named coverage crosswalk covers all **5 NEW + 8 CHANGED + 3 DEPRECATED + 7 UNVERIFIED** original groups and all **6 follow-up IDs**. Automated assertions found exactly **31 unique ledger rows**, the expected 6 B01 + 25 FR IDs, seven columns per row, and a pending downstream status in every row. This proves accounting, not implementation.
4. **Budget/membership PASS:** all 33 draft rows match current frontmatter points, with +5 on exactly the 16 selected steps and zero elsewhere. Current **440**, increase **80**, draft **520**; module totals match both tables. The eight version/persona membership lines match HEAD unchanged; strict version nesting is **10 < 20 < 33**. Selected-persona intersection including long matches the inspected site filter; no browser/runtime filter test claimed.
5. **Scope PASS:** all 33 step files (including frontmatter and prose) are byte-identical to HEAD. Git status shows only the intended bibliography/fact-check/tracks changes and already-untracked report in B03 ownership, alongside pre-existing `.gitignore`, `site/package.json` and B02 artifacts. Those other-owner paths were not edited here. No console or plan edits. `git diff --check` passed.
6. **Site checks PASS:** `npm run lint -- --no-cache` returned no warnings/errors; `npm run typecheck -- --incremental false` exited 0. No lint cache or incremental typecheck output requested. These checks do not prove citations, product behavior, tenant eligibility or runtime permissions.

**B03 DoD complete: evidence repairs, full classification and inactive budget proposal only. G-B0 had NOT passed at this checkpoint.** B04 propagation, B10 prose corrections/budget activation and A01/A04/A05 runtime acceptance remained pending as mapped above. No commit, push, install, build, external fetch or runtime product test was performed in B03.

## Historical B04 disposition and G-B0 source gate — 2026-09-16

Classification decisions are complete; the ledger's Pending column intentionally tracks downstream implementation, not an undecided disposition. No extra console artifact is required solely by newly discovered coverage: Projects, Origin, machines, Custom Modes and MCP Apps remain optional discussion or reuse existing exercises. No extra HLN-110 ticket, infrastructure deployment or existing-config change is justified by this audit. Proposed A01/A03/A04/A05 artifacts remain the mapped practice surfaces for the original enhancement scope; they are not implemented by this disposition.

Plugin practice is a learner-authored local package, not a provisioned team marketplace. Keep second-account installation and tenant enforcement unverified. Hooks will have separate opt-in registration examples; do not modify existing hooks.json. No product removal or change invalidating that config has been established. Do not expand unverified index-only discoveries into exercises.

G-B0 SOURCE GATE PASS: all 33 starting entries have explicit evidence or canonical-replacement disposition; all 31 finding IDs are classified and mapped to pending tasks; B02 skill/reference/rule files exist; proposed budget is 520 while current 440 remains unchanged; B04 counterpart decisions above cover the findings. Source gate is not runtime acceptance, complete prose correction, or release readiness.

Console baseline: npm test passed 33 tests; lint passed; npm run build passed with 13 routes. Standalone tsc --noEmit --incremental false failed TS2802 in existing tests/seed.test.ts because tsconfig has no target. Diagnostic tsc with --target es2017 passed after build finished; it did not change configuration or fix the baseline. A concurrent typecheck/build attempt also raced on generated .next/types; subsequent checks must run sequentially. Retain the default-target failure as an open baseline limitation, not a green standalone check. Existing console files and planted bugs remain unchanged. No commits, pushes, integration connections or Vercel deployment.

## Phase B metadata activation and completion ledger — 2026-09-17

This pass owns step **frontmatter points only**, `tracks.md`, `AGENTS.md`,
`.cursor/rules/curriculum.mdc`, `README.md`, `glossary.md`, and this completion
record. All 33 bodies were read as implemented by their content owners, not
edited here. Site code, bibliography, fact-check, plans, QA sign-off, dated
BUILD-BASELINE/QA records and console artifacts were not changed by this pass.
No product session, connection, external fetch, install, build, commit, push,
publication or deployment was performed.

### Active budget and evidence

- **520 points**, exactly +5 on **3,4,5,6,7,8,9,16,17,18,20,21,22,26,29,33**;
  all other points, IDs, titles, slugs and membership arrays retained.
- Modules in curriculum order: **80/80/70/55/65/70/100**. Arithmetic:
  **80 + 80 + 70 + 55 + 65 + 70 + 100 = 520**; historical **440 + 16 × 5 = 520**.
- Canonical all-persona versions: **short 10 steps / 215 points**, **medium
  20 / 355**, **long 33 / 520**. Strict nesting: **10 < 20 < 33**, with every
  short ID in medium and every medium ID in long. Persona intersections remain
  canonical in `tracks.md` and mirrored by `site/src/lib/tracks.ts`.
- Read `site/src/app/page.tsx:47–53,86–89` and
  `site/src/lib/curriculum.ts:35–66`: summaries/catalog points derive from
  frontmatter, not a hardcoded total. No site changes were needed here.
- The fact-check table contains **204 existing claim rows** at this checkpoint,
  not 168. No rows were added, redated, or certified here. Existing additions
  at `fact-check.md:99–200` support the mechanism/prose corrections, and
  `fact-check.md:201–216` record the repo-specific correction evidence.
  Bibliography IDs **[1]–[36]** remain unchanged. Citations below reuse those
  existing assertions and September 16 provenance; this is prose inspection,
  not a new source fetch or runtime verification.
- Step 4's actual kit assesses four-file versus ticket-only evidence, not
  indexing exclusion. Step 26 is an offline defensive worksheet, not deployed
  enforcement. Active budget labels now describe those actual deliverables.
- Glossary plan-path, hook and subagent definitions were narrowed to existing
  fact-check support (`fact-check.md:123–137,159`). Minimal cross-step mechanism
  entries were added for Custom Mode, Projects beta, worktrees, Cloud Agents,
  machines/pools, Origin, Agent Review, side chats, MCP Apps, Cursor Plugins,
  Tab/Inline Edit, cloud subscriptions, Canvas and Analytics API; the workshop
  harness definition links to Step 29. No unsupported new feature claim added.

### Reconciled finding statuses

“Implemented” below means the **specific cited prose** is present. It does not
mean the learner performed the exercise, an external service was verified, or
an A-task runtime gate passed. Historical IDs and action mappings above remain
unchanged; blocked work is not silently counted as completion.

| Stable ID | Specific implemented correction and local evidence | Residual status |
|---|---|---|
| FR-2026-01 | Optional Projects beta/coordinator distinguished from local repository work in `steps/04-context.md:130–133`, `13-workflows.md:20–23`, `18-agents-window.md:86–92`, `33-improvement-loop.md:14–24`; fact-check:108,150,200 | Prose implemented; beta eligibility/provisioning/runtime pending |
| FR-2026-02 | Optional My Machines/team pools and execution-policy boundary in Steps 18:86–92 and 26:89–95; fact-check:161 | Core footnote implemented; scheduling/computer-use subcoverage remains deferred, self-hosted runtime pending |
| FR-2026-03 | Optional Origin/source-of-truth qualification and retained GitHub choice in Steps 2:157–161, 15:78–80, 18:89–92; fact-check:100,156 | Prose implemented; hosting/migration not exercised or required |
| FR-2026-04 | Per-message skill versus session-pinned Custom Mode comparison in Steps 7:99–103 and 12:20–23,61–66; fact-check:120,146–147 | Prose implemented; invocation/badge observations pending |
| FR-2026-05 | MCP Apps/protocol capabilities qualified in Steps 6:142–143 and 24:20–24; fact-check:115,175 | Prose implemented; interactive demo deferred |
| B01-F04 | Exit 0/JSON, exit 2, failure defaults, failClosed and harmless seven-case matrix in Step 9:14–26,143–165; Step 25:91–93 and Step 26:89–95 limit scope; fact-check:131–137,170 | Specific prose implemented; A05 failure/enforcement runtime pending; Step 11 and lifecycle diagram propagation still need review below |
| FR-2026-06 | BUGBOT.md support, Quick/Deep costs and no free-entitlement assumption in Steps 8:24–28 and 10:34–39; fact-check:126–128 | Prose implemented; free entitlement unverified, review comparison not run |
| B01-F03 | Explicit local STDIO wrapper/type, interpolation source and config-versus-connection distinction in Steps 6:14–22,50–67 and 24:71–74; fact-check:111–115,174 | Prose implemented; A01 endpoint/auth/permission runtime pending |
| FR-2026-07 | Cost/Balance/Intelligence, dated pools and plan-dependent charges in Step 27:14–24,43–51; fact-check:185–188 | Prose implemented; actual account pricing/usage measurements pending |
| FR-2026-08 | Nested/path-scoped discovery and personal sync versus opt-in publishing in Steps 4:125–128, 7:80–81,119–132, 25:117–120; fact-check:107,119–122,183 | Prose implemented; A03 discovery/evaluation and remote sync/publication not verified |
| FR-2026-09 | UI-native worktrees separated from IDE Skills/raw Git in Steps 7:22–27 and 18:14–23; bounded integration kit at 18:27–71; fact-check:116,148–149,160 | Prose implemented; UI/raw-Git exercise and combined learner runtime pending |
| FR-2026-10 | Hidden parent context, local-only/no nesting and archive semantics in Step 19:14–18,45–52; fact-check:162–164 | Prose implemented; local interaction pending |
| FR-2026-11 | Read-only teammate snapshot, paid/team/privacy/policy qualifications in Step 32:19–23,54–55; fact-check:199 | Prose implemented; rendering/sharing/recipient access pending |
| FR-2026-12 | Enterprise-only usage API separated from outcome metrics in Steps 10:121–126, 27:21–24, 33:20–24; fact-check:139,189 | Prose implemented; no credentialed API call, business outcome measurements pending |
| FR-2026-13 | Slack follow-up authority, offline default, named runtime options in Step 15:14–18,29–34,74–76 and Step 26:89–95; fact-check:151–154 | Prose implemented; tenant policy/follow-up/runtime behavior pending |
| FR-2026-14 | Cloud writable-turn/home-hook exclusions in Steps 9:193–198, 15:20–23, 26:89–95, 33:20–24; fact-check:155 | Prose implemented; A05 cloud/local runtime matrix pending |
| FR-2026-15 | Legacy .cursorrules future deprecation, not removal, in Step 3:140–144; fact-check:104 | Footnote implemented; no current removal required |
| FR-2026-16 | New skill paths versus accepted legacy globs fallback in Step 7:80–81; fact-check:90,119 | Footnote implemented; A03 discovery runtime pending; rule globs not deprecated |
| FR-2026-17 | Max Mode legacy-plan-only, not universal or globally removed, in Step 27:85–88; fact-check:190 | Footnote implemented; account eligibility not tested |
| B01-F01 | Cursor Plugin format, Default On/Required, no pinning promise, private/public distinction in Step 25:14–24,36–99 and Step 6:138–143; fact-check:176–183 | Prose/package instructions implemented; B04/A04/A05 second-account install, installed paths, packaged readonly, pinning and enforcement remain unverified |
| B01-F05 | Explicit workshop-chosen save/move destination in Step 17:14–18,45–58; fact-check:159,204 | Prose and glossary correction implemented; actual plan-save/handoff runtime pending; automatic subdirectory claim remains unsupported |
| B01-F06 | Generation cites [14], chosen assets path and separate serving validation in Step 23:14–22,49–69; fact-check:171–173 | Prose implemented; generation, actual format/path and application serving pending |
| B01-F02 | YAML readonly, inherited tools/shared checkout, evidence versus truth and packaging caveat in Step 8:14–20,49–65,93–107,135–143 and Steps 13/25; fact-check:123–125,138,148–149,182 | Prose implemented; A04 local restriction and packaged/runtime integration pending |
| FR-2026-18 | No new Grok Bot procedure introduced | Future primary-body research pending; blocked |
| FR-2026-19 | No SDK code introduced; Step 28:85–87 rejects inference from uninspected links | Both SDK primary-body checks pending; blocked |
| FR-2026-20 | Step 26 remains an offline defensive specification, not a Security Agents guarantee | Future primary-body research pending; blocked |
| FR-2026-21 | Manual review remains in Steps 8/11; no PR Routing & Approval guarantee added | Future primary-body research pending; blocked |
| FR-2026-22 | Step 28:85–87 explicitly avoids invented ACP behavior | Future primary-body research pending; blocked |
| FR-2026-23 | Step 9:195–198 explicitly avoids a multi-source merge guarantee | Source conflict and A05 multi-source runtime verification remain pending; blocked |
| FR-2026-24 | Manual /agent-review in Steps 8:24–28 and 10:53–60 avoids the automatic trigger claim; fact-check:128 | Manual-invocation prose implemented; task/commit source contradiction and targeted runtime remain unresolved |
| FR-2026-25 | Kits explicitly separate source-only/offline alternatives from observed results and keep missing evidence unverified | Media/screenshots, tenant eligibility, product runtimes, origin HTTP codes and historical diff remain pending; source gate is not release acceptance |

### Verification and unresolved propagation

- Read-only assertions passed all **33** frontmatter schemas, ordered top-level
  tab exceptions, exact completion closers and exercise-depth markers: starter,
  deliverable/diff, hints, solution, stretch, screenshot placeholder, at least
  three common mistakes and pro tips. This is structural/content presence, not
  instructional QA sign-off or proof that screenshots/runtimes were exercised.
- Step numeric citations resolve to the unique ordered **36 bibliography IDs**;
  glossary numeric citations resolve too, and every glossary Step link resolves
  to the corresponding numbered file. This does not reverify source accuracy.
- Exact +5 selection and unchanged non-point frontmatter were compared with HEAD.
  The active 33-row allocation table matches frontmatter. Existing site tests
  verify canonical version/persona intersections and stable catalog slugs/sections.
- `npm test`: **47 tests passed** across three files. `npm run lint -- --no-cache`:
  **passed**. `npm run typecheck -- --incremental false`: **passed**. No build was
  started; main-owner build and browser/release verification remain pending here.
- Retained metadata discrepancy: Step **13** includes `medium` in frontmatter,
  while the canonical medium picker excludes it. This predates activation and
  is intentionally unchanged under the membership freeze; canonical totals use
  `tracks.md`/site sets, not that array. Any reconciliation needs owner approval.
- All **16 incremented steps** retain their historical point numbers in raw H1
  body headings (`steps/*:10`). Bodies are outside this pass's ownership. The
  inspected site tab parser removes that H1 and renders frontmatter points;
  raw Markdown heading reconciliation remains pending with the content owner.
- Specific residual prose conflicts remain outside this pass's edit authority:
  Steps 1:111–112 and 5:36–38 still associate the sort anomaly with HLN-102,
  despite Step 14:20–26 and `fact-check.md:201` distinguishing the actual
  diagnosis-only monthly-total ticket. Step 11:14–16,27–28,133–136 retains broad
  rules/hook enforcement language despite Step 9's narrower event boundary.
  Do not mark these propagation corrections complete.
- No budget number occurs in diagram sources, so no arbitrary diagram changes
  or rendered-asset rebuild was made. `diagrams/07-hook-lifecycle.mmd:2–4`
  remains a simplified push/test flow without exit-0 denial, failure policy or
  explicit Cursor-event qualification. Its source/rendered semantic update is
  deferred for coordinated content review, not certified accurate by this pass.
- Repository total search found no remaining active 440 instruction outside
  clearly historical tables/snapshots. `BUILD-BASELINE.md:16` remains the dated
  440-point baseline; `QA-SIGNOFF.md:19` contains viewport width 1440, not a budget.
  Historical B03/B04 budget text is retained explicitly as historical, not active.
- G-B0's prior **source-only** pass is retained without escalation. A01/A03/A04/A05
  runtime acceptance, plugin rollout, deferred discovery research, media and
  tenant checks, main build/browser checks, and release/QA sign-off remain open.

