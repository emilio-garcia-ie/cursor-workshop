---
step: 3
title: "Rules: Set Up & Customize"
points: 20
module: "Foundations"
versions: ["short", "medium", "long"]
personas: ["vibecoders", "developers", "data-scientists", "ai-engineers", "forward-deployed"]
---

# Step 3 — Rules: Set Up & Customize (20 pts)

## Learn

Cursor supports four rule types: Project Rules in `.cursor/rules`,
User Rules (global), Team Rules (dashboard, Team/Enterprise plans), and
`AGENTS.md` — a plain-markdown alternative for simple cases[1].

Project rules are `.mdc` files with frontmatter. Four application types[1]:

- **Always Apply** (`alwaysApply: true`) — every session.
- **Apply Intelligently** (description, no globs) — Agent pulls it when relevant.
- **Apply to Specific Files** (`globs`) — auto-attached on file match.
- **Apply Manually** — only via `@`-mention.

The Hearthline hierarchy (open each file — click any rule to read a real example):

- `.cursor/rules/root.mdc` — team standards, every session (`alwaysApply`)
- `.cursor/rules/money.mdc` — integer cents (`globs: src/domains/**/lib/**`)
- `.cursor/rules/time.mdc` — UTC storage and bucketing
- `.cursor/rules/api-routes.mdc` — Zod validation for routes
- `.cursor/rules/components.mdc` — Tremor + Tailwind screens
- `.cursor/rules/boundaries.mdc` — public `index.ts` only
- `AGENTS.md` — the simple alternative at the repo root[1]

### Marketing sub-tab

The same hierarchy in a content repo: broad voice rules at the root, channel
folders carrying only what is true there. Layers, not piles.

## Implement

1. Read `src/domains/payments/.cursor/rules/` — wait, there is none. The
   payments conventions live in the shared `money.mdc`/`time.mdc`. Note what
   belongs at root level vs what deserves its own scoped file.
2. In chat, run `/create-rule` and describe the Release Standards idea below.
   `/create-rule` generates the file with proper frontmatter[1].
3. Add a **Release Standards** section to `root.mdc`: test evidence required,
   no direct `main` commits, one-line business impact per change.

## Pro tips

- Keep rules under ~500 lines; split large ones[1].
- Prefer `globs` over `alwaysApply` — pay context only where it applies.
- `@path/to/file` over pasting contents.
- Run a probe task, then check what actually loaded before trusting it.

## Advanced

Own rules like CI: platform owns root, service teams own scoped files,
PR-reviewed. Updating the file updates every future session automatically —
which is why vague rules are worse than none.

## Complete

- [ ] Mark complete
- [ ] I got the expected outcome
