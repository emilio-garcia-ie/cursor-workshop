---
step: 7
title: "Your First Skill: The PR Format"
points: 20
module: "Building"
versions: ["short", "medium", "long"]
personas: ["developers", "ai-engineers", "forward-deployed"]
---

# Step 7 — Your First Skill: The PR Format (20 pts)

## Learn

A skill bundles prompts, scripts, and references into one reusable unit[9]:
`SKILL.md` (required — name + description trigger it), plus `references/`,
`scripts/`, `assets/` loaded on demand. The description is the trigger copy:
vague description, never triggers. The repo ships `pr/`, `spec/`,
`release-note/` skills; personal ones live outside the repo.

## Implement

1. Isolate the work with the raw Git command
   `git worktree add ../hearthline-pr-skill -b tooling/hearthline-pr-skill main`.
   Check `git worktree list` first; reuse the intended worktree if it already
   exists. This creates a tooling branch from `main`, not from feature work.
   Cursor's UI-native worktrees belong to the Agents Window; IDE Worktree
   Skills are a separate interface to isolated checkouts[19].
2. Read `.cursor/skills/pr/SKILL.md` — trigger, steps, rules.
3. Create `hearthline-pr` under `.cursor/skills/hearthline-pr/`: title
   `<TICKET-ID>: …`, what-changed paragraph, verified commands + output,
   honest checkboxes, not-done section. Read diff + log + `docs/tickets/`.
   Never invent verification.
4. Test it against `HLN-101-export-options` without copying the feature into
   the tooling branch. Draft only; Step 11 owns approval to publish.

### Exercise kit

#### Starter code path

`hearthline-operator-console/.cursor/skills/pr/SKILL.md`. It contains Priya's
format as prose; use it as source material, not proof that the required skill
frontmatter is already present. Author the new skill in the tooling worktree.

#### Minimal working example

Create `.cursor/skills/hearthline-pr/SKILL.md` in that worktree. The required
`name` and `description` frontmatter follow the skill schema[9]:

```markdown
---
name: hearthline-pr
description: Draft or rewrite a Hearthline PR description from a ticket, diff, and actual verification evidence.
---
Read the supplied ticket and diff. Ask which checkout contains the changes.
Title the draft TICKET-ID: imperative summary.
Include business impact, changes, verified commands with actual output,
and a not-done section. Missing evidence stays explicitly unverified.
Draft only. Do not commit, push, or open a PR.
```

Open the tooling worktree as the Cursor project so the new project skill
is discoverable[9]. Invoke `/hearthline-pr` explicitly[9]. Supply the feature checkout's absolute
path, ticket, and real command outputs. If the feature is uncommitted, read
its working and staged diffs as well as committed changes; `main...HEAD`
alone does not include uncommitted work. Do not silently review the tooling
branch's own diff and label it HLN-101.

#### Expected diff

One new skill file in `../hearthline-pr-skill/.cursor/skills/hearthline-pr/`.
No application changes and no published PR. The PR body stays a draft with
verified and not-done sections that reflect the evidence actually supplied.

#### Hints

- Positive trigger: “Draft the HLN-101 PR description from this diff.”
  Negative trigger: “Explain UTC bucketing; do not draft a PR.” Run separately.
- Inspect whether the skill was invoked; a similar-looking answer is not
  proof of discovery. Required frontmatter matters[9].
- Leave `paths` unset for this repo-wide PR task. For file-specific skills,
  use `paths`; legacy skill `globs` remains accepted, not preferred[9].

#### Solution approach

Run explicit invocation first, then the positive and negative trigger
prompts in fresh chats. Record invocation, title format, business impact,
actual evidence, and missing checks. Withhold build output once: the correct
result says build unverified, never “passed.” Fix the description or body
based on the failure and repeat the same probes.

#### Expected result

A discoverable skill and a PR draft that Priya can trace to the right
checkout. No checkmark without evidence. Record any failed trigger rather
than claiming automatic selection is guaranteed.

[SCREENSHOT: hearthline-pr invocation beside a draft with actual test evidence and an unverified build entry]

#### Stretch goal

Use the skill as a Custom Mode and compare a follow-up request with ordinary
slash invocation. A Custom Mode retains the skill for the whole session[9];
record the active badge and whether that persistence helps this task.

### Common mistakes

- **Mistake 1:** Copying prose without YAML frontmatter. Supply the documented
  name and description and verify discovery[9].
- **Mistake 2:** Reviewing the tooling branch as if it were the feature.
  Name the source checkout and inspect all relevant diff states.
- **Mistake 3:** Filling a verification template with plausible results.
  Missing output means unverified; rerun the check or leave it unchecked.

## Pro tips

- **Pro tip 1:** Write descriptions around the task that should trigger them,
  then keep one positive and one negative prompt as regression probes.
- **Pro tip 2:** Make “no evidence supplied” a first-class evaluation case.
- Skill roots are searched recursively for `SKILL.md`; nested project skills
  can be directory-scoped[9]. Check the intended scope, not only the filename.

## Advanced

A skill is a standard that travels (checked into `.cursor/skills/`). Do
boring, repetitive ones first — PR format, release notes, migration
checklists. One good skill beats ten clever prompts.

Do not confuse versioning with remote availability. Personal Cloud Agent
sync is opt-in, limited to `~/.cursor/skills/`, and subject to team controls[9].
Publishing a personal skill to a team produces a hosted plugin; teammates
opt in and referenced skills are not automatically bundled[28]. This kit
requires neither sync nor publishing.

## Complete

- [ ] Mark complete
- [ ] I got the expected outcome
