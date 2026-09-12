---
step: 2
title: "Clone It and Run It"
points: 30
module: "Foundations"
versions: ["short", "medium", "long"]
personas: ["vibecoders", "developers", "data-scientists", "ai-engineers", "forward-deployed"]
---

# Step 2 — Clone It and Run It (30 pts)

## Learn

Cloning a repository and executing its setup are separate decisions. Review
manifests, lockfiles, scripts, hooks, and configuration before you run them.

This project is a **Next.js 14** app in TypeScript with **Tailwind** and
Tremor components. Data lives in an in-memory store seeded deterministically
at boot (`src/data/`), so every learner gets identical records and identical
bugs. Anything you create lasts until the dev server restarts.

Two conventions explain most of the code, both written in the project rules:
money is **integer cents**, and storage and bucketing are **UTC**. Every
planted bug breaks one of them.

## Implement

Your first ticket is **HLN-101**. Three things stand between you and it: the
code, a branch, and a running app.

### 1. Fork, clone, branch

```bash
git clone ../hearthline-operator-console
cd hearthline-operator-console
git switch -c HLN-101-export-options
```

(After publish: fork on GitHub first, then clone your fork. The branch is
named after the ticket — that is how work gets traced to the request.)

### 2. Install and run

```bash
npm install
npm run dev
# open http://localhost:3000
```

Click through all five screens. Notice what is missing: **Inspections**
(and Cards-style gaps are deliberate — remember them for the Build Battle).

### 3. Read the ticket

Open `docs/tickets/HLN-101.md` with `@docs/tickets/HLN-101.md` and summarize
it in three lines: what it asks for, and what the notes warn about. Read it
yourself too — the notes exist because someone already lost an afternoon to
the trap they describe.

### 4. Get your bearings

```text
@src I want to understand this codebase. Investigate the project and describe
the four domains (Property, Leasing, Operations, Payments), the tech stack,
and where the payments export flows end to end.
```

## Pro tips

- Security-read before `npm install`: what scripts run, what network access
  they need, whether any postinstall hook exists.
- Branch before the first edit, always — named for the ticket.
- `@`-reference the ticket file instead of pasting it.
- Read the repo's own rules before prompting (`root.mdc` is `alwaysApply`[1]).
- `git log --oneline -20` — commit style and live code areas.

## Advanced

Outcome-prompting ("install and run") drops time-to-first-run from a morning
to minutes. The reviewable part matters more: read what installation executes
before approving — that habit, plus a lockfile, is the difference between an
agent that accelerates your team and one that widens the supply-chain surface.

## Complete

- [ ] Mark complete
- [ ] I got the expected outcome
