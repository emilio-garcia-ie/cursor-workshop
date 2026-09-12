# Fact-check log

Schema: `specs/fact-check-schema.md`. One row per distinct verifiable claim.

| Step | Claim | Source | Checked | Verdict |
|------|-------|--------|---------|---------|
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
| 6 | Secrets via `${env:NAME}` interpolation, never hardcoded | [4] | 2026-09-11 | confirmed |
| 6 | Team dashboard distributes shared MCP servers | [28] | 2026-09-11 | confirmed |
| 7 | Skill = SKILL.md + refs/scripts/assets; description triggers | [9] | 2026-09-11 | confirmed |
| 7 | `git worktree add` isolates branches in second folders | [19] | 2026-09-11 | confirmed |
| 8 | Background agents run async/parallel work | [15] | 2026-09-11 | confirmed |
| 8 | Built-in review is generic (agent-review surface) | [20] | 2026-09-11 | confirmed |
| 9 | `hooks.json` version 1, project vs user paths | [5] | 2026-09-11 | confirmed |
| 9 | `beforeShellExecution` + command matcher; exit 2 blocks | [5] | 2026-09-11 | confirmed |
| 9 | Project hooks run from repo root (`.cursor/hooks/...` paths) | [5] | 2026-09-11 | confirmed |
| 10 | Rules/skills/MCP/hooks/subagents role matrix | [1][9][3][5][15] | 2026-09-11 | confirmed |
| 10 | Rollout + success metrics reference team analytics | [30] | 2026-09-11 | confirmed |
| 2,5,11 | Sort-desc first row 99200; export defaults sensitive (seed behavior) | repo (`npm test`, `curl …/api/payments?sort=amount…`) | 2026-09-11 | confirmed |
| 16 | Tab multi-line completions; Cmd+K inline edit | [10][11] | 2026-09-11 | confirmed |
| 17 | Plan Mode plans savable to workspace (`.cursor/plans/`) | [8] | 2026-09-11 | confirmed |
| 18 | Parallel agents incl. worktree/cloud/SSH; background agents | [15][19] | 2026-09-11 | confirmed |
| 19 | Side chats inherit main context without interrupting | [33] | 2026-09-11 | confirmed |
| 20 | Debug Mode hypothesis→instrument→reproduce→pinpoint→fix | [18] | 2026-09-11 | confirmed |
| 21 | Integrated browser runs app for agent; Design Mode annotate/select | [16][17] | 2026-09-11 | confirmed |
| 22 | Empty-selection export returns empty file (repo behavior) | repo (`tests/csv.test.ts`) | 2026-09-11 | confirmed |
| 23 | Image input + generation into `assets/` | [25] | 2026-09-11 | confirmed |
| 24 | Code-graph MCP shape follows stdio `mcpServers` pattern | [3][4] | 2026-09-11 | confirmed |
| 25 | Plugins bundle distrib.; team marketplace admin flow | [28] | 2026-09-11 | confirmed |
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
| 32 | Canvas renders team content where they work | [25] | 2026-09-11 | confirmed |
