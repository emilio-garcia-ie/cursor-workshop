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

Closing the loop: inspect local diffs and checks → draft the why-message →
review evidence → propose rollback (signals, trigger, owner). Rules guide
applicable work; a registered hook can gate covered Cursor shell events,
not all Git commands or pushes from an ordinary external terminal[1][5].
The core exercise ends with local review and approval, not publication.

## Implement

1. Separate two review stories: HLN-101 feature changes and any learner-authored
   tooling changes from Steps 7–9. Use the existing learner checkout(s); no new
   repository or worktree setup is required here. `../hearthline-pr-skill` was
   Step 7's learner-created worktree path, not a pre-existing external repo.
   If it was not created, use the tracked `.cursor/skills/pr/SKILL.md` playbook
   directly. Do not assume a `hearthline-pr` skill already exists or is active.
2. Review prompt: `Read .cursor/skills/pr/SKILL.md and docs/tickets/HLN-101.md.
   Review committed, working, and staged changes. Propose checks and a PR draft
   with actual evidence. Do not edit, stage, commit, push, merge, or deploy.
   Wait for approval before running local checks.`
3. After approving the local check commands, run the preflight below. Draft
   separate feature and tooling descriptions; if no tooling diff exists, record
   it as not done rather than inventing a second PR. Approve only the reviewed
   local artifacts. No commit, push, submitted PR, merge, or deployment is required.
4. Read `.cursor/skills/release-note/SKILL.md` as a format for a **draft** release
   note and rollback proposal. Its shipped-change trigger does not mean this
   exercise shipped. Keep publication and rollback execution unapproved.

### Exercise kit

#### Starter code path

`hearthline-operator-console/.cursor/skills/pr/SKILL.md`,
`.cursor/skills/release-note/SKILL.md`, `docs/tickets/HLN-101.md`,
`tests/api.test.ts`, `tests/export-columns.test.ts`, and `tests/csv.test.ts`.
The tracked playbooks are prose, not proof of discoverable skill frontmatter.
If Step 7's learner-authored `hearthline-pr` exists, verify its checkout and
invocation before using it[9]; otherwise explicitly read the tracked playbook.
Keep feature acceptance and tooling proposal evidence separate.

#### Minimal working example

After local approval, run this preflight in the intended learner console
checkout and inspect the output. Repeat only for another existing checkout
whose diff is part of your review:

```bash
git branch --show-current
git status --short
git diff main...HEAD --stat
git diff main...HEAD
git diff
git diff --cached
npm test
npm run lint -- --no-cache
npm run build
```

Run build after the earlier checks finish, not concurrently with a separate
typecheck. These are the console's scripts; do not substitute the workshop
site's checks for feature acceptance. The preflight performs no staging,
commit, push, merge, or deployment. Missing dependencies, approval, or outputs
remain blockers; a draft cannot label an unperformed check passed.

#### Expected diff

Two separable review stories where both exist: HLN-101 feature/UI/route/tests,
and the learner tooling skill/reviewer/opt-in hook proposal. Inspect committed,
working, and staged changes before proposing file lists; do not stage them in
this core exercise. Never use a blanket add to scoop up secrets or unrelated
work. A worktree shares its repository; it is not a new external repository.

#### Hints

- `main...HEAD` covers committed branch work, not uncommitted edits. Read
  the working and staged diffs too before saying “all changes reviewed.”
- The existing API and default-column unit tests deliberately expect sensitive
  defaults. The learner feature must replace those expectations with the
  ticket's safe defaults; do not keep opposite assertions or delete coverage.
- A previously green log is not evidence for the latest edit. Rerun approved
  checks after the final accepted fix and attach actual output to the PR draft.

#### Solution approach

Map each HLN-101 criterion to its test and UI/HTTP evidence. Confirm tooling
files are absent from the feature story and feature fixes absent from the
tooling story. Run approved preflight sequentially, record blockers, then have
Priya approve the exact local diff, proposed file list, and message. Keep
HLN-102's monthly-total diagnosis and Step 14's unreported sort finding separate;
neither is permission for an unrelated repair in this review.

For rollback rehearsal, record the intended owner, trigger signal, and restore
verification. If a merged change already exists, inspect its actual commit and
deployment before drafting matching revert commands; otherwise leave those
identifiers pending. A squash commit and a merge commit require different
consideration. Review the proposal without executing a guessed hash or mainline.

#### Expected result

You have a reviewed feature PR draft and a separate tooling draft where
tooling changes exist, each with business impact, scoped diffs, actual check
output, explicitly not-done items, and a rollback proposal, and every check
is marked only with evidence.

[SCREENSHOT: Local feature draft and tooling draft or not-done entry, with verification outputs and rollback owner]

### Common mistakes

- **Mistake 1:** Mixing tooling with the customer feature. Review separate
  file lists, even when the proposals currently share a learner checkout.
- **Mistake 2:** Approving a commit message without reviewing its exact diff.
  Match the proposed snapshot to the evidence and ticket first.
- **Mistake 3:** Calling a build log a deployment. Record local approval,
  publishing, and post-release checks separately; unperformed steps stay unchecked.

### Working habits

- **Pro tip 1:** Read the diff once for behavior and once for scope; those
  passes catch different mistakes.
- **Pro tip 2:** Write rollback signals and ownership before requesting
  approval, while the change and its risks are still fresh.

#### Stretch goal

Have a teammate use only your PR draft to explain what would ship, what would
not, and how to verify a rollback. Revise sentences that require oral history.
This is still a local review, not authorization to publish.

## Terminology

- **Commit** — local snapshot. **Push** — transfer commits to a remote. **PR** — review request.
- **Worktree** — another checkout/branch in the same repository[19].
- **Diff** — evidence. **Staging** — selecting the next commit's snapshot.

## Advanced

Agent Review can provide a first pass, but its findings still need human
validation[20]. For a registered, matching `beforeShellExecution` hook, exit 0
uses the JSON permission decision, exit 2 denies, and other nonzero exits fail
open unless `failClosed: true`[5]. Passing tests alone is not universal push
permission. Ordinary Git CLI commands outside Cursor are not covered by this
Cursor event hook; Git/server-side controls are separate. No hook runtime gate
is claimed here. A future commit, push, PR submission, merge, or deployment
requires its own explicit approval and actual evidence, outside this core kit.

## Quiz

#### Q1: What does the core exercise end with?

- [ ] A merged pull request
- [ ] A deployed feature
- [x] Local review and approval, not publication
- [ ] A pushed branch

**Explanation:** The core exercise ends with local review and approval; commit, push, PR, merge, and deploy stay unapproved.

#### Q2: Where must the preflight checks run?

- [ ] The workshop site's directory
- [x] The intended learner console checkout
- [ ] A new external repository
- [ ] A CI pipeline on GitHub

**Explanation:** The preflight uses the console's own scripts in the learner checkout, not the workshop site's checks.

#### Q3: Why must the tooling changes be kept out of the feature story?

- [ ] Because tooling files never pass lint
- [ ] Because HLN-102 requires them
- [x] Because Priya must approve the exact feature diff and tooling proposals need their own evidence
- [ ] Because worktrees forbid edits

**Explanation:** Review separate file lists; mixing tooling with the customer feature conflates two approval stories and risks scooping up unrelated work.

#### Q4: Which is a common mistake the step warns against?

- [ ] Reading working and staged diffs too
- [ ] Rerunning approved checks after the final fix
- [x] Calling a build log a deployment
- [ ] Drafting a rollback with an owner

**Explanation:** Record local approval, publishing, and post-release checks separately; a build log is not a deployment.

#### Q5: What must every check in the PR drafts be marked with?

- [ ] The draft's word count
- [ ] The reviewer's opinion
- [x] Actual evidence from the run, with not-done items explicit
- [ ] The date of the ticket

**Explanation:** Each check is marked only with evidence; not-done items are explicit and the rollback proposal records owner, signal, and trigger.

## Complete

- [ ] Mark complete
