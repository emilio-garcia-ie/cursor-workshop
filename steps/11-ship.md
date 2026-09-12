---
step: 11
title: "Review, Commit & Ship"
points: 25
module: "Guardrails"
versions: ["short", "medium", "long"]
personas: ["vibecoders", "developers", "data-scientists", "ai-engineers", "forward-deployed"]
---

# Step 11 — Review, Commit & Ship (25 pts)

## Learn

Closing the loop: dry-run locally (build, serve, checks) → group diffs and
write the why-message (you approve) → rules and hooks enforce standards →
reviewer first pass → pre-written rollback (signals, trigger, owner). Cursor
does the tedious half; you keep judgement.

## Implement

1. Decide what ships together. Correct answer: **two PRs**. The feature stays
   on `HLN-101-export-options`; the tooling (org-standards reviewer, push
   hook + settings) moves to `../hearthline-pr-skill` on
   `tooling/hearthline-pr-skill` (the skill file is already there).
2. Review prompt: `Review all changes vs main. Then npm test, npm run build.
   Commit with a message following hearthline-pr. Show me the message first.`
3. Flow: `commit` → `git push -u origin HLN-101-export-options` (the hook
   runs tests; green lets it through) → PR → merge → deploy.
4. Rollback: ask for the exact revert commands for your merged PR and keep
   them with the release note (Step 7's `release-note` skill).

## Terminology

- **Commit** — private snapshot. **Push** — public share. **PR** — review ask.
- **Worktree** — second folder/branch pair (`git worktree add`)[19].
- **Diff** — evidence. **Staging** — one-story commits.

## Advanced

Reviewer first pass means seniors spend time on design, not nits, and juniors
stay unblocked[20]. The push hook plus review is a pre-CI quality gate that
fits existing branch protections; `git log`/`git diff` is the full audit
trail. Pre-written rollback plans cut mean time to recovery.

## Complete

- [ ] Mark complete
- [ ] I got the expected outcome
