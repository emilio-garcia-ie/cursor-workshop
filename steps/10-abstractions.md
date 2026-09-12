---
step: 10
title: "Choosing the Right Abstraction"
points: 5
module: "Guardrails"
versions: ["medium", "long"]
personas: ["developers", "ai-engineers", "forward-deployed"]
---

# Step 10 — Choosing the Right Abstraction (5 pts)

## Learn

Five mechanisms, five jobs — the matrix:

- **Rules** — per-session project context (conventions, standards)[1].
- **Skills** — on-demand task expertise (`hearthline-pr`, `spec`)[9].
- **MCP** — external tools, DBs, APIs (GitHub, tickets, chat)[3].
- **Hooks** — deterministic lifecycle automation (test-before-push)[5].
- **Subagents** — isolated investigation (reviewers, bug hunts)[15].

When to reach for which: context that is always true → rule; task you repeat
→ skill; system outside the repo → MCP; check that must never be skipped →
hook; investigation that deserves its own context → subagent.

## Implement

Reading-only step. Run the same checklist three ways and compare: the
`hearthline-pr` skill (your context) vs the org-standards reviewer
(subagent, own read-only context) vs the built-in review (generic). Same
job, three costs, three guarantees[20]. Then pick your first adoption for
your own codebase and write down why.

## Advanced

Rollout playbook: Day 1 rules (senior-authored) → Week 1 MCP → Week 2 hooks
+ skills → Week 3 subagents → ongoing sharing. Track: time-to-first-commit,
PR cycle time, pre-CI vs CI vs production bugs, tokens per engineer per
month, developer satisfaction[30].

## Complete

- [ ] Mark complete
- [ ] I got the expected outcome
