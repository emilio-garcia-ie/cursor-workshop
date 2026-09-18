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

### Exercise kit

#### Starter code path

`hearthline-operator-console/package.json`, `package-lock.json`,
`README.md`, and `src/app/api/payments/export/route.ts`. Review setup in
these files before approving installation. Run commands in your clone, not
in the workshop site's `site/` directory.

#### Minimal working example

Keep the dev server in one terminal. In a second terminal in the same
clone, collect a baseline without editing application code:

```bash
git branch --show-current
npm test
curl -i 'http://localhost:3000/api/payments/export?columns=status,id'
git status --short
```

The explicit `columns` request is a useful narrow probe even before the
column-selection UI exists. This is local generated case-study data, not
permission to export a real customer's payments.

#### Expected diff

No application diff. The branch should be `HLN-101-export-options`; record
any install-generated lockfile change and investigate it rather than
silently including it in the feature. Keep baseline outputs in your notes.

#### Hints

- “Connection refused” means verify the dev server and its printed port
  before changing the route. If it chose another port, use that port.
- A browser page loading does not prove the export endpoint works. Inspect
  the HTTP status and CSV header independently.
- Tests describe the current seed, including intentional defects; green is
  a baseline, not evidence that HLN-101 has been implemented.

#### Solution approach

Confirm the branch, approve the reviewed setup, start the app, and run the
small HTTP probe. Trace `GET` from the export route to the payment service
and CSV helper. Write down that route-to-helper path with file references
before asking for a feature plan.

#### Expected result

All five screens are reachable. The explicit export request should return
HTTP 200 and begin with `status,id`; save the actual status/header and test
summary, or the exact blocker. Do not repair baseline failures incidentally.

[SCREENSHOT: Payments screen beside the terminal's branch name, test summary, and CSV response header]

#### Stretch goal

Restart the dev server and repeat the same read-only request. Compare the
responses to understand deterministic seeding without relying on a created
record surviving a restart.

### Common mistakes

- **Mistake 1:** Running setup in `cursor-workshop/site`. Check the package
  name and current directory before installing.
- **Mistake 2:** Editing before branching. Confirm the ticket branch first;
  do not move or discard someone else's existing changes.
- **Mistake 3:** Treating a green baseline as acceptance evidence for the
  new dialog. Capture the baseline now and compare after Step 5.

## Pro tips

- **Pro tip 1:** Keep a second terminal for probes so server logs stay visible.
- **Pro tip 2:** Save exact commands and output; “it worked” is not a baseline.

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

Optional hosting distinction: Cloud Agents can start without third-party
source control and save work in Origin. Origin-hosted repositories use
Origin as source of truth; synced GitHub repositories keep GitHub as source
of truth[36]. This workshop still uses the GitHub case-study workflow; no
hosting migration is required.

## Complete

- [ ] Mark complete
- [ ] I got the expected outcome
