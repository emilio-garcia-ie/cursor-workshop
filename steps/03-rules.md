---
step: 3
title: "Rules: Set Up & Customize"
points: 25
module: "Foundations"
versions: ["short", "medium", "long"]
personas: ["vibecoders", "developers", "data-scientists", "ai-engineers", "forward-deployed"]
---

# Step 3 — Rules: Set Up & Customize (25 pts)

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

### Why scope matters

A rule supplies instructions, not a runtime permission gate. Always rules
attach broadly; file-scoped rules attach when matching files are referenced,
and manually applied rules require an explicit mention[1]. A well-written
money rule can still be absent from the wrong task. Test inclusion and the
answer separately instead of judging both from one lucky response.

### Exercise kit

#### Starter code path

`hearthline-operator-console/.cursor/rules/root.mdc` and
`hearthline-operator-console/.cursor/rules/money.mdc`; use
`src/domains/payments/lib/fee-calc.ts` as the file-scope probe.

#### Minimal working example

Use `/create-rule`[1] as a draft generator, not an excuse to duplicate the
same standards twice. Compare this file-scoped example with `money.mdc`:

```mdc
---
description: Integer-cent arithmetic in domain library functions
globs: src/domains/**/lib/**
alwaysApply: false
---
Store and calculate money as integer cents.
Reject a proposed conversion to floating-point dollars inside domain logic.
```

The `globs` and `alwaysApply` fields select the rule's application behavior[1].
For this exercise, keep the money starter and add only the requested Release
Standards body to the existing root rule; preserve its current frontmatter.

#### Expected diff

One Release Standards section in `root.mdc`: test commands plus actual
output, no direct main commits, and one-line business impact. If the
creation command produced a duplicate draft rule, reconcile that draft
before staging; do not leave two competing versions.

#### Hints

- Positive probe: ask for an explanation of `fee-calc.ts`, not a fix.
- Negative probe: in a fresh chat, ask about `README.md` without mentioning
  the money rule. Inspect attached rules, not just the wording of the answer.
- The root rule can also mention cents. An answer about cents is not proof
  that the scoped rule loaded.

#### Solution approach

Run both probes before and after your root-body edit. Record referenced
files, attached rule names, and the resulting answer. Then explicitly
mention the money rule and compare. Accept the exercise only when you can
explain why a rule attached, or record the unexpected behavior for review.

#### Expected result

A small root-rule diff and a three-case inclusion record (matching file,
nonmatching file, explicit mention). No money calculation changes.

[SCREENSHOT: Matching-file chat with attached money rule beside the nonmatching-file probe]

#### Stretch goal

Rewrite one vague instruction into a testable request with a counterexample.
Have a teammate predict which probe should attach it before running it.

### Common mistakes

- **Mistake 1:** Making every rule Always Apply. Narrow scope where possible
  so unrelated work does not carry every instruction[1].
- **Mistake 2:** Saving a project rule as an ordinary `.md` file. Use the
  documented `.mdc` rule format or the separate `AGENTS.md` alternative[1].
- **Mistake 3:** Calling a correct answer proof of attachment. Inspect the
  rule context and repeat with a negative probe.

## Pro tips

- **Pro tip 1:** Keep the positive and negative probe prompts with the review.
- **Pro tip 2:** Review rule changes as behavior changes, not just prose polish.

- Keep rules under ~500 lines; split large ones[1].
- Prefer `globs` over `alwaysApply` — pay context only where it applies.
- `@path/to/file` over pasting contents.
- Run a probe task, then check what actually loaded before trusting it.

## Advanced

Own rules like CI: platform owns root, service teams own scoped files,
PR-reviewed. The file must reach the learner's checkout and match the
application scope before it can guide a task[1]. Rules do not apply to Tab,
Inline Edit, or Bugbot PR reviews[2]. `.cursorrules` is legacy with future
deprecation announced, not already removed; use project rules for new work[2].

## Complete

- [ ] Mark complete
- [ ] I got the expected outcome
