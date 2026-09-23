---
step: 10
title: "Choosing the Right Abstraction"
points: 5
module: "Guardrails"
versions: ["medium", "long"]
personas: ["developers", "ai-engineers", "forward-deployed"]
---

# Step 10 — Choosing the Right Abstraction (5 pts)

## Learn

Five mechanisms, five jobs — choose the missing capability, not the most
impressive name. A rule can describe a review standard without performing
a review; a tool connection can retrieve a PR without authorizing a merge.
Keep instructions, execution, and verification separate.

| Mechanism | Job | Hearthline example | Boundary |
|---|---|---|---|
| Rules | Applicable context and conventions[1] | Integer cents | Guidance, not an execution gate; scope matters[1][2] |
| Skills | Reusable task procedure[9] | Draft Priya's PR format | Invocation is not proof the checklist was completed |
| MCP | External capabilities[3] | Read GitHub PRs | Connection is not authorization for every operation |
| Hooks | Lifecycle checks and permission decisions[5] | Gate a covered Cursor shell event | Exit/JSON/failure policy and event coverage matter[5] |
| Subagents | Delegated work in a separate context[34] | Standards report | Separate context is not a separate checkout or guaranteed truth[34] |

When to reach for which: convention → rule; repeated task → skill; external
system → MCP; check at a supported event → hook; focused investigation →
subagent. Sometimes the right answer is an ordinary test plus human review,
not a sixth layer of agent configuration.

## Implement

Reading-only step: no application or configuration edits. Compare the
`hearthline-pr` skill, org-standards subagent, and Agent Review on the same
feature diff. They are not three identical reviewers: PR formatting, a
standards report, and a dedicated code review have different jobs. Agent
Review reads `BUGBOT.md` and offers Quick/Deep depths[20]; the custom
reviewer's `readonly` restriction is separate from report correctness[34].

### Exercise kit

#### Starter code path

`hearthline-operator-console/.cursor/skills/pr/SKILL.md`,
`.cursor/agents/org-standards.md`, `.cursor/hooks.json`, and
`docs/ORG-STANDARDS.md`. Use the learner-authored versions from Steps 7–9
where available; if those kits are incomplete, compare definitions only
and label invocation results unverified.

#### Minimal working example

Run `git diff main...HEAD --stat`, `git diff`, and `git diff --cached` in
the feature checkout to identify committed, working, and staged changes.
Supply the same chosen diff and evidence to each comparison. Use
`/hearthline-pr` for the skill[9] and explicitly request delegation to
org-standards[34] from the tooling project where their definitions live,
supplying the feature path. Run `/agent-review` manually in the feature
checkout[20]. Record review depth, accessible diff, and available standards
rather than assuming equal inputs.

```text
For the supplied HLN-101 diff, identify which checks you actually performed.
Separate formatting, standard violations, and functional correctness.
Cite evidence for findings. Mark missing test output unverified.
Do not edit, commit, push, or open a PR.
```

#### Expected diff

None. Produce a comparison in chat with columns: mechanism, actual inputs,
actions taken, useful findings, unsupported assertions, missing evidence,
and observed usage if available. Do not invent a dollar or token figure.

#### Hints

- A correctly formatted PR can still describe broken code. Grade the skill
  on honest formatting, not on catching every functional bug.
- A hook may run a test command without a reviewer reading the business
  requirement. Keep those checks separate in the comparison.
- If `BUGBOT.md` is absent, record that; do not call Agent Review incapable
  of organization-specific instructions[20].

#### Solution approach

First classify three needs: “money must be cents,” “draft this PR,” and
“check this supported shell event.” Select rule, skill, and hook respectively,
then name the evidence each one cannot provide. Add “retrieve external PR
metadata” (MCP) and “independent-context review” (subagent). Compare real
outputs only after this classification, so novelty does not choose for you.

#### Expected result

You have five justified mechanism choices with one rejected alternative for
each, and the three-run comparison records any honest gap rather than an
automatic correctness or enforcement guarantee.

[SCREENSHOT: Five-mechanism decision table beside the three-run comparison with missing evidence marked]

### Common mistakes

- **Mistake 1:** Using a rule as proof a check ran. Require actual output.
- **Mistake 2:** Calling a built-in review generic by necessity. Check its
  available `BUGBOT.md` input and selected depth[20].
- **Mistake 3:** Assuming local configuration follows every runtime. Verify
  scope, team policy, and surface-specific availability before rollout.

### Pro tips

- **Pro tip 1:** Choose one owner and one observable outcome per mechanism.
- **Pro tip 2:** Compare on the same diff; changed inputs invalidate a
  confident “this reviewer is better” conclusion.

#### Stretch goal

Remove one proposed mechanism from your own adoption choice. Explain which
risk is still covered by ordinary tests or human review and which is not.

## Advanced

Treat the rollout sequence as a suggestion: rules first, then one useful
integration, then measured skills/hooks, then focused reviewers. Track
PR cycle time and escaped bugs from your own delivery records, and collect
developer feedback directly. Cursor's Analytics API supplies usage metrics
and is **Enterprise-only**; it does not establish every metric in that
worksheet[30]. No credentialed API call is required here.

Availability is not implied by the matrix. Side chats are local-only and
cannot nest[33]. Shared canvases are read-only team snapshots with paid-plan,
team-membership, and storage-compatible privacy requirements[25]. Slack
follow-up authority depends on team policy[26]. Cloud hooks do not cover
early read-only turns and do not receive local home-directory hooks[31].
These qualifications matter when choosing a runtime; none is a mandatory
integration for this reading-only step.

## Quiz

#### Q1: Which mechanism fits the convention "money must be integer cents"?

- [ ] A hook
- [ ] A subagent
- [x] A rule
- [ ] An MCP server

**Explanation:** A convention like integer cents is guidance, so a rule supplies applicable context; it is not an execution gate.

#### Q2: Where does Agent Review find organization-specific instructions?

- [ ] .cursor/agents/
- [x] BUGBOT.md
- [ ] .cursor/hooks.json
- [ ] docs/tickets/

**Explanation:** Agent Review reads repository BUGBOT.md rules and offers Quick and Deep depths with different cost levels.

#### Q3: Why should a team choose the missing capability rather than the most impressive mechanism name?

- [ ] Because names determine cost
- [ ] Because newer mechanisms always win
- [x] Because each mechanism has one job, and a rule, connection, or hook cannot substitute for the capability that is actually missing
- [ ] Because only subagents can be reviewed

**Explanation:** A rule can describe a review without performing one, and a connection can retrieve a PR without authorizing a merge; pick the missing capability.

#### Q4: Which is a common mistake the step warns against?

- [ ] Comparing on the same diff
- [x] Using a rule as proof a check ran
- [ ] Recording missing test output as unverified
- [ ] Choosing one owner per mechanism

**Explanation:** A rule is guidance, not proof of execution; require actual output before claiming a check ran.

#### Q5: What does the expected result require?

- [x] Five justified mechanism choices with one rejected alternative each
- [ ] A merged configuration for all five mechanisms
- [ ] A token usage figure for every run
- [ ] A sixth mechanism added to the matrix

**Explanation:** The deliverable is five justified choices, each with a rejected alternative, and an honest three-run comparison that records gaps.

## Complete

- [ ] Mark complete
