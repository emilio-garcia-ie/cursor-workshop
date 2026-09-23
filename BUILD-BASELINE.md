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

## E02 site dependency supersession (2026-09-17)

- The E02 pins above apply to the **learner-cloned hearthline-operator-console**
  (next@14.2.35 / react@18 / Tailwind v3), which is unchanged (additive-only).
- The **workshop `site/`** was upgraded to resolve `npm audit` findings
  (critical Next.js + high PostCSS): `next@16.3.5`, `react@19.3.0`,
  `eslint@9` + flat config, `vitest@4.1.11`. Audit now reports 0
  vulnerabilities. See QA-SIGNOFF.md (Dependency remediation).
- Console BUILD-BASELINE E02 pins remain authoritative for the console.

## E03 Phase-3 state (2026-09-23)

- Workshop site stack unchanged from the Phase-2 supersession (next@16.3.5 /
  react@19 / vitest@4.1.11); clean-install `npm audit` remains 0.
- Console remains on next@14.2.35 / react@18 (E02 pins). New advisories
  published since 2026-09-17 now report 7 findings (next DoS/smuggling,
  bundled PostCSS file-read, glob via eslint-config-next, @vitest/mocker via
  vitest 3). 14.2.35 is the final 14.x (`next-14` dist-tag), so no
  non-breaking remediation exists; upgrade is a future, user-approved
  migration. See QA-SIGNOFF.md (Dependency status).
- ES content contract: steps/es + glossary/bibliography/fact-check `.es.md`
  files, termbase-checked (`npm run check:termbase`) and anchor-parity-checked
  (`npm run check:anchors`), both green 2026-09-23.
