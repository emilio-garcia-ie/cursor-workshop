# Hearthline build baseline (E01)

Recorded: 2026-09-11. Source: inspection of /Users/emilio/Documents/cursor-training.

## Evidence inputs
- workshop-clone/src/workshopContent.js: 14 steps, 82,373 chars (import check passes).
  Order: 1 Day One / 2 Clone It / 3 CLAUDE.md / 4 Context / 5 Build a Feature /
  6 MCP GitHub / 7 PR Skill / 8 Org-standards Reviewer / 9 Hooks / 10 Abstractions /
  11 Ship / 13 Loops / 14 Workflows / 12 Bug Nobody Reported.
- .firecrawl/steps/: EMPTY (raw captures lost; module above is canonical).
- git: branch main, ZERO commits, untracked: .gitignore, WorkshopReplica.jsx,
  opencode.jsonc, workshop-clone/, workshopContent.js, workshop_structure.md.
- workshop-clone/ builds clean (Vite + React 19 + Tailwind v4 + react-markdown).

## Locked decisions (user authority 2026-09-11)
- Points total: 440 (modules 70/65/60/40/50/60 + bonus 95).
- Personas (5): vibecoders, developers, data scientists, AI engineers,
  forward-deployed engineers.
- Placement: ../hearthline-operator-console/ + ../cursor-workshop/
  (siblings of cursor-training; training repo untouched).
- Publishing: public GitHub repos + Vercel deploy, only after gates pass.

## External docs verification date
- cursor.com/docs rules, hooks, mcp verified 2026-09-11 (see plan §2).
- Re-fetch if execution of mechanism-dependent tasks is >14 days later.

## E02 version pins (registry check 2026-09-11)
- next: 14.2.35 (latest 14.x; prompt requires 14+ line — stay on 14.x, NOT 15+).
- @tremor/react: 3.18.7 (no rename found; pairs with Tailwind v3).
- tailwindcss (Repo A): 3.4.19 (v3 line — Tremor 3.x pairing; do NOT use v4 here).
- typescript: 5.9.3 (5.x line — Next 14 compatible; NOT registry-latest 7.x).
- zod: 4.6.2 (registry latest; API routes validate with Zod per ORG-STANDARDS #6).
- Cursor CLI: ships with Cursor app; install/auth per https://cursor.com/docs/cli
  (re-check at Step-28 execution time).
