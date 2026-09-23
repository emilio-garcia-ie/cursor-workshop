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

#### Starter code path

Use your learner copy of the console, with dependencies installed and the
current branch and clean/dirty status recorded. Read `package.json`,
`tests/sort-bug.test.ts`, and `tests/export-columns.test.ts`: the suite
deliberately characterizes planted bugs. Green does not mean those business
defects are fixed. Do not alter the shared starter or its tests. Drive the
single supervised check with:

```text
/goal Perform one supervised payments health check in this learner checkout.
Run npm test once. If green, report the command, counts, and "green; no edits".
If red, report the first failed assertion and its source location; stop.
Do not change source, tests, configuration, branches, or remote state.
Do not commit, push, or keep retrying. Completion is one evidence report.
```

#### Expected diff

One run record with checkout, command, exit status, assertion counts,
known-defect caveat, and an unchanged tracked diff. Record actual counts, not
a copied historical baseline.

#### Hints

- Inspect the test expectation before asking for a repair.
- Ask what condition stops the goal before considering a cadence.
- Keep this a supervised local check; cloud subscriptions are outside this kit's scope[32].

#### Solution approach

A passing string-sort characterization is a green health check but not
evidence of numeric order. Your report should say both things:
`sort contract passes; numeric-order defect intentionally remains`. If the
command cannot start because dependencies are absent, classify that as a
setup failure, not a failing product assertion. A green run ends without a
patch; a red run ends with a diagnosis handoff, not an unlimited repair loop.
After reviewing that result, you may *draft* a `/loop` request for recurring
checks[32]; do not leave it running as part of this kit. Specify an owner,
review time, spend ceiling, and stop rule.

#### Expected result

You have the one-run health-check report, and `git status --short` reports an
unchanged tracked diff from the recorded base revision.

> Screenshot placeholder: the completed one-run report beside unchanged diff
> status; include the goal's stop condition, not credentials or billing details.

#### Stretch goal

Use Step 7's learner `pr` skill with valid name/description frontmatter as an
optional Custom Mode through **Use as Mode**[9][32]. If you have only the
legacy Markdown playbook, prepare a valid learner copy first; do not claim the
original file is mode-ready. Compare the badge and session context with a
single invocation[9]. Do not submit a PR; explain why a PR playbook is not
necessarily the right health-check playbook.

### Common mistakes

- **Mistake 1:** Treating the planted-bug tests as acceptance tests for correct business behavior.
- **Mistake 2:** Asking to "rerun until green," which hides setup failures and encourages scope drift.
- **Mistake 3:** Assuming a branch name prevents remote actions; review permissions separately.

### Pro tips

- **Pro tip 1:** Keep successful checks quiet but retain the command and exit status as evidence.
- **Pro tip 2:** Separate detection from repair: a reviewer can authorize a later learner-only patch.

## Quiz

#### Q1: What do `/goal` and `/loop` add to a session?

- [ ] Acceptance tests that decide scope
- [ ] A cloud subscription and a deployed job
- [x] A long-lived objective and recurring check-ins
- [ ] Automatic authorization to change remote state

**Explanation:** `/goal` supplies a long-lived objective and `/loop` adds recurring check-ins, but neither replaces an acceptance test or a human decision about scope.

#### Q2: Which tests deliberately characterize planted bugs in this kit?

- [x] `tests/sort-bug.test.ts` and `tests/export-columns.test.ts`
- [ ] `src/domains/payments/bucketing.ts` and `src/domains/payments/refund-service.ts`
- [ ] `tests/money.test.ts` and `src/lib/money.ts`
- [ ] `.cursor/rules/root.mdc` and `docs/tickets/HLN-101.md`

**Explanation:** The kit points to `tests/sort-bug.test.ts` and `tests/export-columns.test.ts` because the suite deliberately characterizes planted bugs.

#### Q3: Why is a green `npm test` run not proof that the payments business defects are fixed?

- [ ] Because green output is always a setup failure
- [x] Because the suite characterizes planted bugs, and green only means those assertions pass
- [ ] Because the command must be run twice to count
- [ ] Because Hearthline requires a cloud subscription for green results

**Explanation:** The tests deliberately characterize planted bugs, so green means the planted assertions pass, not that the business defects are fixed.

#### Q4: Why should a red run end with a diagnosis handoff rather than an unlimited rerun-until-green loop?

- [ ] Because git forbids running the suite more than once
- [ ] Because a red result proves the test suite is broken
- [x] Because rerunning until green hides setup failures and encourages scope drift
- [ ] Because the goal command only works once

**Explanation:** Rerunning until green hides setup failures and encourages scope drift, so a red run ends with a diagnosis handoff, not an unlimited repair loop.

#### Q5: What does this kit require for completion?

- [ ] A deployed recurring check with a spend ceiling
- [x] One health-check report and an unchanged tracked diff from the recorded base revision
- [ ] A committed patch that fixes the planted defects
- [ ] A cloud subscription watching the pull request

**Explanation:** Completion is one evidence report and an unchanged tracked diff, not a deployed recurring job or a patch.

## Complete

- [ ] Mark complete
