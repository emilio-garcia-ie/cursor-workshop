# Registro de verificación de hechos

Esquema: `specs/fact-check-schema.md`. Una fila por afirmación verificable
distinta. Las filas `confirmed` del 16 de septiembre confirman solo la
afirmación respaldada por la fuente enunciada, no la implementación ni el
comportamiento en runtime. Las afirmaciones contradictorias anteriores se
reemplazan por afirmaciones más estrechas y respaldadas; los cambios de prosa
pendientes y las afirmaciones sin verificar se rastrean en el libro mayor B03
en `FRESHNESS-2026-09.md`. En B03 no se cortó ni corrigió prosa. Los veredictos
del repo anteriores conservan sus fechas originales; no se repitieron. Los
números de paso también identifican la ubicación prevista de cobertura nueva.

| Paso | Afirmación | Fuente | Verificado | Veredicto |
|------|------------|--------|------------|-----------|
| 1–3 | Project rules live in `.cursor/rules` as versioned `.mdc` | [1] | 2026-09-11 | confirmed |
| 3 | Four rule types: Always/Intelligently/Specific-Files/Manually | [1] | 2026-09-11 | confirmed |
| 3 | Plain `.md` in rules dir ignored; AGENTS.md is the simple alternative | [1] | 2026-09-11 | confirmed |
| 3 | `/create-rule` generates rule file with frontmatter | [1] | 2026-09-11 | confirmed |
| 3 | Rules guidance: keep under ~500 lines, prefer globs | [1] | 2026-09-11 | confirmed |
| 4 | Applied rule contents included at start of model context | [1] | 2026-09-11 | confirmed |
| 4 | Toggle unused MCP servers off in Customize | [3][6] | 2026-09-11 | confirmed |
| 5 | Plan Mode proposes plan for approval pre-code | [8] | 2026-09-11 | confirmed |
| 5 | Keyboard/mode keys per shortcuts reference | [12] | 2026-09-11 | confirmed |
| 6 | MCP configured via `mcp.json` with `mcpServers` wrapper | [3][4] | 2026-09-11 | confirmed |
| 6 | Local stdio (command/args) vs remote (url/headers) shapes | [4] | 2026-09-11 | confirmed |
| 6 | MCP config supports `${env:NAME}` interpolation in command, args, env, url and headers | [3] | 2026-09-16 | confirmed |
| 6 | Admins can link Team MCPs to the Default marketplace; this alone does not install or enable them for everyone | [28] | 2026-09-16 | confirmed |
| 7 | Skill = SKILL.md + refs/scripts/assets; description triggers | [9] | 2026-09-11 | confirmed |
| 7,18 | Worktrees give agents isolated Git checkouts | [19] | 2026-09-16 | confirmed |
| 8 | Background agents run async/parallel work | [15] | 2026-09-11 | confirmed |
| 8,10 | Agent Review reads repository `BUGBOT.md` rules | [20] | 2026-09-16 | confirmed |
| 9 | `hooks.json` version 1, project vs user paths | [5] | 2026-09-11 | confirmed |
| 9 | `beforeShellExecution` + command matcher; exit 2 blocks | [5] | 2026-09-11 | confirmed |
| 9 | Project hooks run from repo root (`.cursor/hooks/...` paths) | [5] | 2026-09-11 | confirmed |
| 10 | Subagents operate in their own context window and return results to the parent | [34] | 2026-09-16 | confirmed |
| 10 | Analytics API provides team usage metrics and is available only to Enterprise teams | [30] | 2026-09-16 | confirmed |
| 2,5,11 | Sort-desc first row 99200; export defaults sensitive (seed behavior) | repo (`npm test`, `curl …/api/payments?sort=amount…`) | 2026-09-11 | confirmed |
| 16 | Tab multi-line completions; Cmd+K inline edit | [10][11] | 2026-09-11 | confirmed |
| 17 | Plans default to the home directory; Save to workspace moves them to the workspace | [8] | 2026-09-16 | confirmed |
| 18 | UI-native worktrees are in the Agents Window; the IDE uses Worktree Skills commands | [19] | 2026-09-16 | confirmed |
| 19 | Side chats use parent history as hidden reference context and keep their own visible transcript | [33] | 2026-09-16 | confirmed |
| 20 | Debug Mode hypothesis→instrument→reproduce→pinpoint→fix | [18] | 2026-09-11 | confirmed |
| 21 | Integrated browser runs app for agent; Design Mode annotate/select | [16][17] | 2026-09-11 | confirmed |
| 22 | Empty-selection export returns empty file (repo behavior) | repo (`tests/csv.test.ts`) | 2026-09-11 | confirmed |
| 23 | Composer 2.5's documented tools include image generation from text descriptions or reference images | [14] | 2026-09-16 | confirmed |
| 24 | Code-graph MCP shape follows stdio `mcpServers` pattern | [3][4] | 2026-09-11 | confirmed |
| 25 | Plugins bundle components; Dashboard → Plugins supports team marketplace import from a GitHub repository | [28] | 2026-09-16 | confirmed |
| 26 | Privacy Mode, MCP perms, Enterprise enforcement exist | [29][4] | 2026-09-11 | confirmed |
| 27 | Auto routing; model/rate source is pricing page | [13] | 2026-09-11 | confirmed |
| 28 | CLI install/auth, `-p` one-shot, `--force`, headless | [22][23][24] | 2026-09-11 | confirmed |
| 29 | Harness definition; rules kept short | [1] | 2026-09-11 | confirmed |
| 12 | `/goal` long-lived objectives; `/loop` recurring check-ins | [32] | 2026-09-11 | confirmed |
| 12,33 | Cloud subscriptions: PRs, Slack threads, scheduled tasks | [32] | 2026-09-11 | confirmed |
| 13 | Subagents on own machines; swarm pattern for parallel fixing | [32] | 2026-09-11 | confirmed |
| 13 | Background agents for parallel/isolated work | [15] | 2026-09-11 | confirmed |
| 14 | Buggy sort observable via `GET /api/payments?sort=amount` | repo (`curl`, `tests/api.test.ts`) | 2026-09-11 | confirmed |
| 15 | Slack `@cursor` steering; follow-ups wait for next tool call | [32] | 2026-09-11 | confirmed |
| 15 | Slack integration surface exists | [26] | 2026-09-11 | confirmed |
| 31 | Voice skill + MCP sources follow rules/skills/MCP shapes | [1][9][3] | 2026-09-11 | confirmed |
| 32 | Shared canvases give teammates read-only snapshots; paid plan, team membership and storage-compatible privacy mode are required | [25] | 2026-09-16 | confirmed |
| 8 | Project subagents are Markdown files with YAML frontmatter in `.cursor/agents/` | [34] | 2026-09-16 | confirmed |
| 8 | Subagent fields include name, description, model, readonly and is_background; model defaults to inherit | [34] | 2026-09-16 | confirmed |
| 8 | Subagent `readonly: true` restricts file edits and state-changing shell commands | [34] | 2026-09-16 | confirmed |
| 8,13 | Subagents start with clean context supplied by the parent; their checkout is shared by default unless isolation is requested | [34] | 2026-09-16 | confirmed |
| 9 | Hook exit 0 consumes JSON output; exits other than 0 or 2 fail open by default | [5] | 2026-09-16 | confirmed |
| 9 | `failClosed: true` blocks hook failures; permission hooks block invalid JSON or invalid responses even when false | [5] | 2026-09-16 | confirmed |
| 9 | Command-hook type defaults to command; command and version are required | [5] | 2026-09-16 | confirmed |
| 6,24 | The MCP STDIO configuration table requires `type: "stdio"` and command; args and env are optional | [3] | 2026-09-16 | confirmed |
| 27 | Auto modes are Cost, Balance and Intelligence; all bill at the routed model's list price | [13] | 2026-09-16 | confirmed |
| 27 | Pro, Pro Plus and Ultra have Cursor Models and Other Models usage pools; Start excludes Other Models | [13] | 2026-09-16 | confirmed |
| 27 | Teams and Enterprise third-party requests add a Cursor Token Rate, including Auto routes to third-party models | [13] | 2026-09-16 | confirmed |
| 8 | Agent Review offers Quick and Deep review depths with different cost levels | [20] | 2026-09-16 | confirmed |
| 25 | Cursor Plugins use `.cursor-plugin/plugin.json`; root `plugin.json` identifies Agent Plugins | [28][35] | 2026-09-16 | confirmed |
| 25 | Cursor Plugins support agents and hooks in addition to skills and MCP; Agent Plugins package skills and MCP | [28][35] | 2026-09-16 | confirmed |
| 25 | A Cursor Plugin manifest requires string name; component paths are optional and replace discovery when supplied | [35] | 2026-09-16 | confirmed |
| 25 | Default Cursor Plugin component discovery includes `agents/`, `hooks/hooks.json` and `mcp.json` | [35] | 2026-09-16 | confirmed |
| 25 | Repo-root `.cursor-plugin/marketplace.json` requires name, owner with name, and plugins; plugin entries require name | [35] | 2026-09-16 | confirmed |
| 25 | Marketplace plugin source accepts a path string or an object with path and options | [35] | 2026-09-16 | confirmed |
| 25 | Default Off is opt-in; Default On allows opt-out; Required plugins cannot be uninstalled | [28] | 2026-09-16 | confirmed |
| 25 | Teams supports up to one team marketplace; Enterprise supports unlimited and restricts marketplace addition to admins | [28] | 2026-09-16 | confirmed |
| 25 | GitHub Auto Refresh requires the Cursor GitHub App and re-indexes at most once every ten minutes | [28] | 2026-09-16 | confirmed |
| 7,25 | Publishing a personal skill creates one hosted plugin; teammates opt in and referenced skills are not bundled | [28] | 2026-09-16 | confirmed |
| 25 | Customize installs plugins at project or user scope; public marketplace submission requires a public Git repo and review | [28][35] | 2026-09-16 | confirmed |
| 4,13,18,33 | Projects beta maintains shared context; its coordinator delegates implementation rather than writing code | [36] | 2026-09-16 | confirmed |
| 33 | Projects coordinators can watch Slack channels, run on a schedule or follow PRs | [36] | 2026-09-16 | confirmed |
| 18,26 | My Machines connects a personal laptop or VM; team pools queue work for available workers | [36] | 2026-09-16 | confirmed |
| 18 | Self-hosted workers support computer use on Linux and Mac with the required desktop packages | [36] | 2026-09-16 | confirmed |
| 2,15,18 | Cloud Agents can start without third-party SCM and save work in an Origin repo | [36] | 2026-09-16 | confirmed |
| 2,18 | Origin-hosted repos use Origin as source of truth; synced GitHub repos keep GitHub as source of truth | [36] | 2026-09-16 | confirmed |
| 7,12 | A skill used as a Custom Mode stays in context for the whole session | [9] | 2026-09-16 | confirmed |
| 6,24 | MCP supports prompts, resources, roots and elicitation; MCP Apps return interactive UI with tool output | [3] | 2026-09-16 | confirmed |
| 4,7 | Skill paths scopes file matching; legacy skill globs remains an accepted fallback | [9] | 2026-09-16 | confirmed |
| 7 | Personal Cloud Agent skill sync is opt-in and limited to `~/.cursor/skills/`, subject to team admin controls | [9] | 2026-09-16 | confirmed |
| 7 | Skill roots are searched recursively for nested `SKILL.md` files | [9] | 2026-09-16 | confirmed |
| 19 | Side chats are local-only and cannot spawn nested side chats | [33] | 2026-09-16 | confirmed |
| 15,26 | Slack follow-up authority depends on Team follow-ups; Disabled allows only the owner | [26] | 2026-09-16 | confirmed |
| 15,18 | Slack prompts can select named environments, workers and team pools | [26] | 2026-09-16 | confirmed |
| 9,26,33 | Cloud hooks start in a writable environment, not early read-only turns; local user hooks are unavailable | [31] | 2026-09-16 | confirmed |
| 3 | `.cursorrules` is legacy with future deprecation announced; migration guidance recommends a new rule | [2] | 2026-09-16 | confirmed |
| 27 | Max Mode is available only on legacy request-based plans | [13] | 2026-09-16 | confirmed |
| 1,4 | Toggle the Agent sidepanel with Cmd+I on macOS or Ctrl+I on Windows/Linux | [12] | 2026-09-16 | confirmed |
| 2 | Origin hosting is optional here; Origin-hosted and synced GitHub repos have different sources of truth | [36] | 2026-09-16 | confirmed |
| 2,5,11 | The starter paths include tracked package.json, tests/api.test.ts, tests/csv.test.ts, and src/app/payments/page.tsx | repo (`git ls-files -- package.json tests/api.test.ts tests/csv.test.ts src/app/payments/page.tsx` → all four paths) | 2026-09-16 | confirmed |
| 3 | Rules guide only applicable tasks after reaching the checkout; they do not update every session regardless of scope | [1][2] | 2026-09-16 | corrected |
| 3 | Rules do not apply to Tab, Inline Edit, or Bugbot PR reviews | [2] | 2026-09-16 | confirmed |
| 3 | New work should use project rules; legacy .cursorrules has announced future deprecation, not verified removal | [2] | 2026-09-16 | confirmed |
| 3 | File-scoped rules attach for matching referenced files; manually applied rules require explicit mention | [1] | 2026-09-16 | confirmed |
| 4 | Applied rules enter parent context; skill bodies load progressively and subagents receive their own parent-supplied context | [1][9][34] | 2026-09-16 | corrected |
| 4 | Nested project skills can scope to their directory; file-scoped skill discovery uses paths | [9] | 2026-09-16 | confirmed |
| 4 | The optional Projects beta coordinator delegates implementation; it is distinct from the local repository exercise | [36] | 2026-09-16 | confirmed |
| 5 | Open the mode menu with Cmd+. on macOS or Ctrl+. on Windows/Linux, then select Plan | [8][12] | 2026-09-16 | corrected |
| 5 | Shift+Tab rotates Agent modes; confirm the selected label before sending the request | [12] | 2026-09-16 | corrected |
| 6 | Use explicit type stdio for the local MCP process, not as a universal requirement for remote transports | [3] | 2026-09-16 | corrected |
| 6 | The environment-interpolated Authorization example is supported by the MCP reference, not established by MCP Help | [3][4] | 2026-09-16 | corrected |
| 6 | Linking a Team MCP to the Default marketplace is availability, not automatic installation or enablement for everyone | [28] | 2026-09-16 | corrected |
| 6 | Customize MCPs toggles servers; MCP Logs appear in Output, opened with Cmd+Shift+U or Ctrl+Shift+U | [4] | 2026-09-16 | corrected |
| 6 | MCP Apps can return interactive UI; this kit needs only a read-only tool request | [3] | 2026-09-16 | confirmed |
| 7 | UI-native Cursor worktrees are an Agents Window feature; IDE Worktree Skills and raw Git are separate interfaces | [19] | 2026-09-16 | corrected |
| 7 | Skill YAML requires name and description; the name must match the containing folder | [9] | 2026-09-16 | confirmed |
| 7 | Explicit slash invocation uses /skill-name; description-based automatic selection depends on relevance | [9] | 2026-09-16 | confirmed |
| 7 | New file-scoped skills use paths; leaving paths unset supports repo-wide availability | [9] | 2026-09-16 | confirmed |
| 7 | A Custom Mode keeps a valid-frontmatter skill in context for the session and shows an active input badge | [9] | 2026-09-16 | confirmed |
| 7 | Versioning a project skill does not automatically sync personal home-directory skills to remote runtimes | [9] | 2026-09-16 | confirmed |
| 7 | Personal cloud sync and opt-in teammate skill publication are separate from checking a skill into the project | [9][28] | 2026-09-16 | confirmed |
| 8 | A project reviewer's readonly boolean belongs in YAML frontmatter, not a Markdown permission bullet | [34] | 2026-09-16 | corrected |
| 8 | Subagents inherit parent tools, including MCP; context separation is not independent tool permission isolation | [34] | 2026-09-16 | corrected |
| 8 | Readonly restricts writes; it does not establish truthful findings or guaranteed safety of inherited remote tools | [34] | 2026-09-16 | corrected |
| 8,10 | Built-in Agent Review can use organization standards supplied through repository BUGBOT.md | [20] | 2026-09-16 | corrected |
| 8 | Agent Review documents Quick/Deep cost levels, not a free first-pass entitlement | [20] | 2026-09-16 | corrected |
| 8,10 | /agent-review explicitly starts a manual review without relying on an automatic task/commit trigger | [20] | 2026-09-16 | confirmed |
| 8 | A subagent's model may be restricted by plan or admin policy; inherit is the documented default | [34] | 2026-09-16 | confirmed |
| 8 | Project subagent discovery is limited to the current project; a definition in a tooling worktree is not global | [34] | 2026-09-16 | confirmed |
| 9 | Exit 0 means hook success and consumes permission JSON; a valid deny response can still block the action | [5] | 2026-09-16 | corrected |
| 9 | Exit 2 blocks; other non-zero hook exits fail open unless failClosed is true | [5] | 2026-09-16 | corrected |
| 9,10 | beforeShellExecution gates covered Cursor-triggered shell events, not every external-terminal or server-side Git push | [5] | 2026-09-16 | corrected |
| 9 | Permission hooks block invalid JSON/schema; failClosed additionally blocks failures such as crashes and timeouts | [5] | 2026-09-16 | corrected |
| 9 | Explicit type command states the default; hook timeout values are seconds | [5] | 2026-09-16 | confirmed |
| 9 | afterFileEdit runs after the edit rather than preventing that edit | [5] | 2026-09-16 | confirmed |
| 9,10 | Cloud hook coverage begins in a writable environment and excludes early read-only turns and local home-directory hooks | [31] | 2026-09-16 | confirmed |
| 10 | Subagent context isolation does not imply checkout isolation; the checkout is shared by default | [34] | 2026-09-16 | corrected |
| 10 | Enterprise-only Analytics API usage metrics do not establish every delivery or satisfaction metric in the adoption worksheet | [30] | 2026-09-16 | corrected |
| 10 | Side chats cannot nest and are available only locally | [33] | 2026-09-16 | confirmed |
| 10 | Shared Canvas snapshots are read-only for teammates and require paid-plan, team, and compatible privacy eligibility | [25] | 2026-09-16 | confirmed |
| 10 | Slack thread follow-up authority is governed by team policy, not merely access to the thread | [26] | 2026-09-16 | confirmed |
| 11 | The shipping kit starts from tracked PR and release-note skill files | repo (`git ls-files -- .cursor/skills/pr/SKILL.md .cursor/skills/release-note/SKILL.md` → both paths) | 2026-09-16 | confirmed |
| 4,6 | Model choice and plan affect usage cost; the prose no longer promises zero-cost CLI work or a universal 2–3x saving | [13] | 2026-09-16 | corrected |
| 12 | Cloud subscriptions are cloud-only in the cited release; the workshop uses one supervised check rather than a deployed job | [32] | 2026-09-16 | corrected |
| 12 | Ordinary skill invocation is per-message; a skill-backed Custom Mode stays in context for the session | [9][32] | 2026-09-16 | confirmed |
| 12 | Use as Mode selects a skill-backed Custom Mode; an active mode has an input badge | [9][32] | 2026-09-16 | confirmed |
| 13,18 | Separate subagent context does not guarantee separate files; the checkout is shared unless isolation is requested | [34] | 2026-09-16 | corrected |
| 13,18 | Separate-machine cloud subagents are supported, not an automatic property of every delegation | [32][34] | 2026-09-16 | corrected |
| 13,18,33 | Projects beta offers shared context and a delegating coordinator; this workshop does not require provisioning a Project | [36] | 2026-09-16 | confirmed |
| 15 | Slack launches Cloud Agents; an existing agent thread receives follow-ups subject to Team follow-ups policy | [26] | 2026-09-16 | corrected |
| 15 | Slack autopr=false disables automatic PR creation | [26] | 2026-09-16 | confirmed |
| 15 | Explicit Slack repo and branch options avoid relying on recent-activity selection | [26] | 2026-09-16 | confirmed |
| 15 | Slack setup includes app installation, repository selection, usage-based pricing, and privacy confirmation | [26] | 2026-09-16 | confirmed |
| 15,26,29,33 | Cloud hooks exclude early read-only turns and local home-directory hooks; local configuration is not universal coverage | [31] | 2026-09-16 | corrected |
| 15,18 | Origin is optional hosting; this workshop retains GitHub rather than requiring a source-control migration | [36] | 2026-09-16 | confirmed |
| 16 | Tab accepts a completion and Escape rejects it; Inline Edit uses Cmd+K on Mac or Ctrl+K on Windows/Linux | [10][11] | 2026-09-16 | confirmed |
| 16 | Project rules do not apply to Tab or Inline Edit; the edit request must state its constraints | [2] | 2026-09-16 | confirmed |
| 17 | Save to workspace moves a plan into the workspace; .cursor/plans/ is an explicitly chosen workshop destination | [8] | 2026-09-16 | corrected |
| 18 | UI-native worktrees belong to the Agents Window; IDE Worktree Skills and raw Git are separate workflows | [19] | 2026-09-16 | corrected |
| 18,26 | My Machines connects a personal machine; team pools queue tasks for available workers and are optional here | [36] | 2026-09-16 | confirmed |
| 19 | /side opens a side chat; @-mentioning it brings its context back to the parent | [33] | 2026-09-16 | confirmed |
| 19 | Side chats are local-only durable children, not disposable cloud threads; nesting is unsupported | [33] | 2026-09-16 | corrected |
| 19 | Closing a side chat archives it rather than deleting its conversation | [33] | 2026-09-16 | corrected |
| 20 | Debug Mode uses a local debug server for instrumentation, then reproduction, analysis, verification, and cleanup | [18] | 2026-09-16 | confirmed |
| 20 | Debug Mode makes targeted fixes; the workshop no longer promises a typical 2–3-line patch | [18] | 2026-09-16 | corrected |
| 21 | Native browser navigation, clicks, screenshots, and console inspection need no external browser-tool installation | [16] | 2026-09-16 | confirmed |
| 21 | Design Mode selects elements and code context in the Agents Window browser; no unverified drag/props flow is required | [17] | 2026-09-16 | corrected |
| 21 | Browser network inspection is surface-limited in the cited documentation | [16] | 2026-09-16 | confirmed |
| 22,25,26 | Registered Cursor hook events do not enforce every business standard or every external-terminal push | [5] | 2026-09-16 | corrected |
| 23 | Image generation is supported by Composer tool evidence, not the Canvas source | [14][25] | 2026-09-16 | corrected |
| 23 | assets/ is a workshop-chosen image destination, not a documented Cursor default or automatic public-serving directory | [14] | 2026-09-16 | corrected |
| 23 | Vision-capable models can read images; generation accepts text or reference-image input | [14] | 2026-09-16 | confirmed |
| 24 | MCP protocol support does not establish an installed code-graph server or a tested connection | [3][4] | 2026-09-16 | corrected |
| 24 | MCP Apps return interactive UI; prompts, resources, roots, and elicitation extend protocol capabilities beyond tools | [3] | 2026-09-16 | confirmed |
| 25 | Reviewer-plus-hook packaging requires Cursor Plugin format, not root Agent Plugin format | [28][35] | 2026-09-16 | corrected |
| 25 | Default Off is opt-in, Default On permits opt-out, and Required prevents uninstall for the configured audience | [28] | 2026-09-16 | corrected |
| 25 | Semantic version metadata is documented; consumer pinning and immutable installed versions are not established here | [35] | 2026-09-16 | corrected |
| 25 | Default discovery includes agents/ and hooks/hooks.json; a minimal Cursor Plugin manifest requires name | [35] | 2026-09-16 | confirmed |
| 25 | A repo-root marketplace manifest requires name, owner.name, and plugins; the kit uses an explicit local source path | [35] | 2026-09-16 | confirmed |
| 25 | Private team import and reviewed public marketplace submission are separate flows | [28][35] | 2026-09-16 | confirmed |
| 25 | Project readonly restrictions do not prove packaged restriction behavior or installed hook-path resolution | [34][35] | 2026-09-16 | corrected |
| 25 | Publishing a personal skill creates one plugin; teammates opt in and referenced skills are not automatically bundled | [28] | 2026-09-16 | confirmed |
| 26,31 | MCP environment interpolation is supported by the MCP reference, not established by MCP Help | [3][4] | 2026-09-16 | corrected |
| 27 | Auto modes are Cost, Balance, and Intelligence; the corrected workshop label is Balance | [13] | 2026-09-16 | corrected |
| 27 | Start excludes Auto and Other Models; Pro, Pro Plus, and Ultra include both documented usage pools | [13] | 2026-09-16 | confirmed |
| 27 | Teams and Enterprise third-party requests add a Cursor Token Rate, including applicable Auto routes | [13] | 2026-09-16 | confirmed |
| 27 | Usage pools are visible in editor settings and the usage dashboard; missing per-run cost must remain unknown | [13] | 2026-09-16 | confirmed |
| 27,33 | Enterprise Analytics API usage metrics do not establish sales conversion or every delivery-quality measure | [30] | 2026-09-16 | corrected |
| 27 | Max Mode is legacy-plan-only, not a universal requirement or a globally removed feature | [13] | 2026-09-16 | confirmed |
| 28 | The documented Cursor CLI executable is agent, not the assumed cursor -p editor command | [22][24] | 2026-09-16 | corrected |
| 28 | agent --version is the documented installation verification command | [23] | 2026-09-16 | confirmed |
| 28 | CLI Ask mode uses --mode=ask and supports non-interactive -p output | [22] | 2026-09-16 | confirmed |
| 28 | Print mode proposes edits without --force; --force allows direct file modifications without confirmation | [24] | 2026-09-16 | corrected |
| 28 | Headless CLI supports CURSOR_API_KEY and JSON output; neither establishes source accuracy or runtime hook coverage | [24] | 2026-09-16 | confirmed |
| 29 | Rules, skills, subagents, and registered hooks have distinct scopes; presence on disk is not universal activation | [1][9][34][5] | 2026-09-16 | corrected |
| 30 | Project rules supply scoped guidance, not an automatic guarantee of correct domain architecture | [1] | 2026-09-16 | corrected |
| 31 | Slack integration documentation establishes Cloud Agent invocation, not a generic Slack MCP server installation | [26] | 2026-09-16 | corrected |
| 32 | Canvas sharing is a read-only teammate snapshot with paid-plan, team, privacy, and policy conditions, not public access | [25] | 2026-09-16 | corrected |
| 33 | Scheduled cloud subscriptions and optional Projects coordination do not require deploying automation for this manual kit | [32][36] | 2026-09-16 | confirmed |
| 14 | Actual HLN-102 is diagnosis-only monthly totals, not the sort repair label in comments | repo (`Read docs/tickets/HLN-102.md:1–16` → monthly totals, no fix; `Read src/domains/payments/queries.ts:6–8` → conflicting label) | 2026-09-16 | corrected |
| 14,20 | The sort helper compares stringified cents; its unit and API tests intentionally characterize lexical order | repo (`Read src/domains/payments/queries.ts:10–16; tests/sort-bug.test.ts:22–31; tests/api.test.ts:26–40` → lexical comparator and assertions) | 2026-09-16 | confirmed |
| 16 | formatCents is in src/lib/money.ts and its negative assertion is in tests/money.test.ts, not the CSV helper | repo (`Read src/lib/money.ts:2–7; tests/money.test.ts:13–16` → formatter and minus-sign expectation) | 2026-09-16 | corrected |
| 17 | Forecasts renders metric cards, not an existing occupancy chart | repo (`Read src/app/forecasts/page.tsx:20–33` → three metric cards) | 2026-09-16 | corrected |
| 19 | Renewal tests cover year/month transitions; the helper preserves the day and does not establish a month-end policy | repo (`Read src/domains/leasing/lib/renewal-date.ts:5–10; tests/renewal-date.test.ts:4–15` → day preserved, no month-end assertion) | 2026-09-16 | confirmed |
| 20 | The inspected export route is synchronous and contains no global-counter race | repo (`Read src/app/api/payments/export/route.ts:22–42` → synchronous GET, no counter or delayed write) | 2026-09-16 | corrected |
| 21 | The starter Export action is a search-aware anchor, not an export dialog | repo (`Read src/app/payments/page.tsx:26–31` → anchor with search-aware export href) | 2026-09-16 | corrected |
| 21 | Payments requests 20 visible rows; export requests up to 10000 rows with the same supplied search | repo (`Read src/app/payments/page.tsx:10–11; src/app/api/payments/export/route.ts:32` → pageSize 20 and 10000) | 2026-09-16 | confirmed |
| 22 | Empty CSV selection and requested order are already implemented and asserted; repeating them is not new RED evidence | repo (`Read src/lib/csv.ts:5–15; tests/csv.test.ts:4–19` → empty/order/escaping implementation and assertions) | 2026-09-16 | corrected |
| 22 | Omitted export columns use defaults; explicit empty columns produces an empty selection | repo (`Read src/app/api/payments/export/route.ts:28–31; tests/api.test.ts:50–55` → distinct omitted/empty branches) | 2026-09-16 | confirmed |
| 22 | Default export columns still contain two sensitive names and the learner kit changes only their acceptance contract | repo (`Read src/domains/payments/export.ts:6–15; tests/export-columns.test.ts:7–16` → planted sensitive names and characterization) | 2026-09-16 | confirmed |
| 21,24,26,29 | .cursor/mcp.example.json and hooks.opt-in.json are examples, not evidence of authenticated connections or active registration | repo (`Read .cursor/mcp.example.json; .cursor/hooks.opt-in.json` → example entries and opt-in definitions only) | 2026-09-16 | confirmed |
| 23,30 | HLN-103 states Inspections is not implemented and requests a new domain with a spec first | repo (`Read docs/tickets/HLN-103.md:1–17` → feature absent, spec-first and new-domain requirements) | 2026-09-16 | confirmed |
| 29 | The test-generator playbook distinguishes real tests from README-only future integration, e2e, and contract suites | repo (`Read .cursor/skills/test-generator/SKILL.md:12–17` → baseline versus future-suite distinction) | 2026-09-16 | confirmed |
| 30 | The existing spec playbook requires explicit design approval before implementation and has no YAML frontmatter | repo (`Read .cursor/skills/spec/SKILL.md:1–12` → Markdown heading and approval gate) | 2026-09-16 | corrected |
| 32 | The store has Property, Lease, Payment, and WorkOrder shapes; fictional Crestview worksheet values are not seeded telemetry | repo (`Read src/data/store.ts:3–65` → interfaces and named seed properties, no Crestview entry) | 2026-09-16 | corrected |
| 3–9,16–18,20–22,26,29,33 | Sixteen H1 point labels now match active frontmatter; all 33 allocations remain unchanged at 520 total | repo (workshop: `Read tracks.md:51–86; steps/*:4,10` → active allocations and matching H1 labels) | 2026-09-17 | corrected |
| 13 | Step 13 is long-only in versions frontmatter, matching canonical tracks; its ID, title, and points are unchanged | repo (workshop: `Read tracks.md:5–9; steps/13-workflows.md:2–7` → medium excludes 13; versions is long-only) | 2026-09-17 | corrected |
| 1 | Retained personas arrays express instructional emphasis; tracks.md controls actual persona/version picker membership | repo (workshop: `Read tracks.md:17–37; steps/01-day-one.md:14–20` → canonical intersection distinguished from emphasis) | 2026-09-17 | corrected |
| 1,5 | The nearby sort anomaly is an unreported finding, not HLN-102; that ticket requires monthly-total diagnosis without a fix | repo (`Read docs/tickets/HLN-101.md:1–18; HLN-102.md:1–16; src/domains/payments/queries.ts:6–8` → export, diagnosis-only totals, stale sort label) | 2026-09-17 | corrected |
| 5,11 | Safe-default acceptance replaces planted expectations in both export-columns.test.ts and api.test.ts, retaining other coverage | repo (`Read tests/export-columns.test.ts:7–16; tests/api.test.ts:43–55` → sensitive unit/API assertions and explicit-empty coverage) | 2026-09-17 | corrected |
| 11 | The core shipping kit uses tracked PR/release-note playbooks or an existing learner skill; no new repository or push is required | repo (`Read .cursor/skills/pr/SKILL.md:1–17; .cursor/skills/release-note/SKILL.md:1–10` → prose playbooks; workshop Step 11 → local drafts/approval only) | 2026-09-17 | corrected |
| 11 | Matching Cursor shell hooks use exit 0 permission JSON, exit 2 deny, and fail-open other exits unless failClosed is true | [5] | 2026-09-16 | corrected |
| 9,11 | Diagram 07 now distinguishes JSON allow/deny/ask, exit 2, failClosed, and ordinary Git CLI outside Cursor's event coverage | [5] | 2026-09-16 | corrected |
