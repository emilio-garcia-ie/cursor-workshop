---
step: 4
title: "Context: What Cursor Remembers"
points: 15
module: "Foundations"
versions: ["medium", "long"]
personas: ["developers", "data-scientists", "ai-engineers", "forward-deployed"]
---

# Step 4 — Context: What Cursor Remembers (15 pts)

## Learn

Everything competes for the same window: system prompt, tools, rules, skill
and subagent descriptions, conversation, and free space. Rules you add are
included at the start of model context[1] — that is the budget you spend.

Category details (what fills it, how to keep it small):

- **System prompt** — fixed overhead. Budget around it.
- **Tools** — built-ins plus MCP servers. Prefer a CLI (`gh`, `aws`) where
  one exists: zero per-tool listing cost. Toggle unused MCP servers off in
  Customize[3][6].
- **Rules** — `alwaysApply` rules ride every session; scoped rules attach on
  match. This is why Step 3 preferred globs.
- **Skills / subagents** — descriptions load; bodies load on demand. Keep
  descriptions sharp (Steps 7–8).
- **Conversation** — prompts, replies, files read, command output. Grows
  without bound. Fresh session per task is the cheapest management there is.
- **Free space** — what is left for work. When thin, quality drops before
  anything visibly breaks.

## Implement

After the exploring you just did, take stock of the session: what is taking
up space right now, and what from the tour can go? Start a fresh chat for the
next task — old work riding along is paid for on every later message.

## Pro tips

- Check context before starting anything large; clear between unrelated tasks.
- Point at specific files with `@` instead of broad "explore the repo".
- Name sessions you will return to instead of keeping them open all day.
- Review what MCP servers cost you and disconnect the idle heavy ones[3].

## Advanced

The architecture map from Step 2 doubles as a reusable onboarding artifact —
generated from actual code, never a stale wiki. Engineers who manage context
(compact-per-task, clear-between-tasks) run 2–3x more cost-efficient than
those who let sessions grow unbounded. The pattern shines on 500K+ line
legacy codebases: data flow, dependency graphs, auth boundaries on demand.

## Complete

- [ ] Mark complete
- [ ] I got the expected outcome
