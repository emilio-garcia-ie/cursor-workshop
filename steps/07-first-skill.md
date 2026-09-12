---
step: 7
title: "Your First Skill: The PR Format"
points: 15
module: "Building"
versions: ["short", "medium", "long"]
personas: ["developers", "ai-engineers", "forward-deployed"]
---

# Step 7 — Your First Skill: The PR Format (15 pts)

## Learn

A skill bundles prompts, scripts, and references into one reusable unit[9]:
`SKILL.md` (required — name + description trigger it), plus `references/`,
`scripts/`, `assets/` loaded on demand. The description is the trigger copy:
vague description, never triggers. The repo ships `pr/`, `spec/`,
`release-note/` skills; personal ones live outside the repo.

## Implement

1. Isolate the work: `git worktree add ../hearthline-pr-skill -b tooling/hearthline-pr-skill` (worktrees keep tooling off your feature branch[19]).
2. Read `.cursor/skills/pr/SKILL.md` — trigger, steps, rules.
3. Create `hearthline-pr` under `.cursor/skills/hearthline-pr/`: title
   `<TICKET-ID>: …`, what-changed paragraph, verified commands + output,
   honest checkboxes, not-done section. Read diff + log + `docs/tickets/`.
   Never invent verification.
4. Test it on `HLN-101-export-options`: run the skill, confirm the PR body
   matches Priya's format, then open the real PR.

## Pro tips

- New skill files are auto-detected — no restart[9].
- Write the description for the trigger, not for humans.
- Check the context cost of what your skill pulls in.

## Advanced

A skill is a standard that travels (checked into `.cursor/skills/`). Do
boring, repetitive ones first — PR format, release notes, migration
checklists. One good skill beats ten clever prompts.

## Complete

- [ ] Mark complete
- [ ] I got the expected outcome
