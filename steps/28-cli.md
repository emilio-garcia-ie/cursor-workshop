---
step: 28
title: "Cursor in the Terminal and Headless"
points: 10
module: "Team & Scale"
versions: ["long"]
personas: ["ai-engineers", "forward-deployed"]
---

# Step 28 — Cursor in the Terminal and Headless (10 pts)

## Learn

The Cursor CLI brings the agent to the terminal, scripts, CI, and remote
boxes: interactive, plan/ask modes, one-shot `--print`, `--force` for
unattended file changes, headless automation[22][23][24]. Authenticate once;
`CURSOR_API_KEY` lives in the environment, never in the repo.

## Implement

1. Install and authenticate the CLI[23].
2. One-shot read: `cursor -p "summarize the changes in src/domains/payments/queries.ts"`[22].
3. One-shot write: `cursor -p --force "add JSDoc to every export in src/lib/money.ts"` — then `git diff` to review what it did[24].
4. Wire step 3 into a script that runs on every new ticket file in
   `docs/tickets/`.

## Pro tips

- CLI is for CI, scripting, remote — the IDE is for thinking[22].
- `--force` without review is how incidents happen. Diff everything[24].

## Advanced

Headless mode is the bridge to automation: ticket in → spec + implementation
+ tests out, gated by the same hooks and reviewers as interactive work[24].
That pipeline is Step 13's loop wearing work clothes.

## Complete

- [ ] Mark complete
- [ ] I got the expected outcome
