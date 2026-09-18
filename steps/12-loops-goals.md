---
step: 12
title: "Loops & Goals"
points: 10
module: "Bonus"
versions: ["short", "medium", "long"]
personas: ["developers", "ai-engineers", "forward-deployed"]
---

# Step 12 — Loops & Goals (10 pts)

## Learn

`/goal` supplies a long-lived objective; `/loop` adds recurring check-ins[32].
Neither replaces an acceptance test or a human's decision about scope. Cloud
subscriptions can react to PRs, Slack threads, or schedules; subscriptions
are cloud-only in the cited release[32]. This kit needs one supervised local
check, not a deployed recurring job.

A skill-backed Custom Mode keeps that skill in context throughout a session;
ordinary slash invocation is per-message[9][32]. Optionally compare those two
ways of supplying a playbook. A pinned skill is context, not a scheduler or
an authorization boundary.

## Implement

### Exercise kit — a bounded health check

**Starter input:** Use your learner copy of the console, with dependencies
installed and the current branch and clean/dirty status recorded. Read
`package.json`, `tests/sort-bug.test.ts`, and `tests/export-columns.test.ts`:
the suite deliberately characterizes planted bugs. Green does not mean those
business defects are fixed. Do not alter the shared starter or its tests.

```text
/goal Perform one supervised payments health check in this learner checkout.
Run npm test once. If green, report the command, counts, and "green; no edits".
If red, report the first failed assertion and its source location; stop.
Do not change source, tests, configuration, branches, or remote state.
Do not commit, push, or keep retrying. Completion is one evidence report.
```

**Worked example:** A passing string-sort characterization is a green health
check but not evidence of numeric order. Your report should say both things:
`sort contract passes; numeric-order defect intentionally remains`. If the
command cannot start because dependencies are absent, classify that as a
setup failure, not a failing product assertion.

**Expected deliverable:** One run record with checkout, command, exit status,
assertion counts, known-defect caveat, and an unchanged tracked diff. Record
actual counts, not a copied historical baseline.

**Hints:** Inspect the test expectation before asking for a repair. Ask what
condition stops the goal before considering a cadence.

**Solution:** A green run ends without a patch. A red run ends with a diagnosis
handoff, not an unlimited repair loop. After reviewing that result, you may
*draft* a `/loop` request for recurring checks[32]; do not leave it running as
part of this kit. Specify an owner, review time, spend ceiling, and stop rule.

**Stretch:** Use Step 7's learner `pr` skill with valid name/description
frontmatter as an optional Custom Mode through **Use as Mode**[9][32]. If you
have only the legacy Markdown playbook, prepare a valid learner copy first;
do not claim the original file is mode-ready. Compare the badge and session
context with a single invocation[9]. Do not submit a PR; explain why a PR
playbook is not necessarily the right health-check playbook.

### Common mistakes

- Treating the planted-bug tests as acceptance tests for correct business behavior.
- Asking to "rerun until green," which hides setup failures and encourages scope drift.
- Assuming a branch name prevents remote actions; review permissions separately.

### Pro tips

- Keep successful checks quiet but retain the command and exit status as evidence.
- Separate detection from repair: a reviewer can authorize a later learner-only patch.

> Screenshot placeholder: the completed one-run report beside unchanged diff
> status; include the goal's stop condition, not credentials or billing details.

## Complete

- [ ] Mark complete
- [ ] I got the expected outcome
