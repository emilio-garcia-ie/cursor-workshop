---
step: 17
title: "Plan Files: Plans That Outlive the Session"
points: 15
module: "The Fast Loop"
versions: ["medium", "long"]
personas: ["developers", "ai-engineers"]
---

# Step 17 — Plan Files: Plans That Outlive the Session (15 pts)

## Learn

Plan Mode researches the code and produces a reviewable plan before coding[8].
Plans default to the home directory; **Save to workspace** moves the plan
into the workspace[8]. The exact `.cursor/plans/` subdirectory is a
**WORKSHOP-chosen destination**, not a documented automatic product default.
Explicitly save or move your learner artifact there and verify the real path.

A durable plan must survive a fresh reader. It needs the current implementation,
a precise requested change, decisions, dependencies, tests, and stop conditions
—not just a list of hopeful verbs. The Forecasts screen currently renders
metric cards in `src/app/forecasts/page.tsx`, not an occupancy chart.

## Implement

1. Review the generated plan against the actual page. Remove invented chart
   components, analytics endpoints, and unstated benchmark claims.
2. Use Save to workspace[8], then explicitly save or move the artifact to
   `.cursor/plans/occupancy-variance.md` in the learner copy. Verify the file
   exists at that chosen path; do not infer its location from the button label.
3. Start a fresh conversation and supply that exact file as context. Ask the
   reader to restate the formula, unknowns, proposed file scope, and first test
   without implementing. Compare the answer with the saved bytes.
4. Revise any ambiguity in the file, not only in the old chat. Inspect the diff:
   the plan should be the only added artifact for this exercise.

### Exercise kit — a plan another session can audit

#### Starter code path

Read the Forecasts page and `src/domains/property/index.ts` in your learner
copy. Ask Plan Mode[8] for a proposal only:

```text
Plan an occupancy variance card beside the existing Forecasts metric cards.
Use a workshop target of 95%, labeled as an assumption, not industry data.
Variance is actual occupancy minus target, in percentage points. No chart exists
in the starter. Explain the zero-unit case, data inputs, tests, and exact files.
Do not implement or change the shared starter. Stop for design approval.
```

#### Expected diff

A saved plan with source paths, formula and units, zero-unit behavior, test
cases, a bounded proposed diff, reviewer, and approval gate. Attach the
fresh-session handoff response and actual file path.

#### Hints

- Write "target supplied by workshop" next to 95%.
- Ask the second reader what it still needs before coding; missing inputs are useful output.
- Verify the real saved path; the button label does not guarantee `.cursor/plans/`[8].

#### Solution approach

Actual `92.5%` against the chosen `95%` target gives `-2.5 percentage points`,
not `-2.5% relative change`. The target is a new exercise input, not a field
already present in the store. A zero-unit portfolio needs an explicit "N/A"
decision rather than division by zero. A sufficient handoff names the existing
cards, proposes a pure variance calculation with explicit unavailable-data
behavior, and lists tests for below/on/above target plus zero units. It does
not create a new chart or pretend implementation has passed. Save/move
explicitly to the chosen directory.

#### Expected result

You have the plan saved at `.cursor/plans/occupancy-variance.md` in the learner
copy, and a fresh reader restates the formula and the open decisions correctly
from the file alone.

> Screenshot placeholder: file tree showing the chosen plan path beside the
> fresh reader's formula and unresolved-decision summary.

#### Stretch goal

Change the workshop target to an unresolved stakeholder input. Can the plan
still identify independent preparatory work and an honest stop point? A useful
plan exposes the dependency rather than silently choosing a production default.

### Common mistakes

- **Mistake 1:** Claiming Save to workspace necessarily selects `.cursor/plans/`[8].
- **Mistake 2:** Planning a variance column in a chart that the starter does not have.
- **Mistake 3:** Mixing percentage points with relative percentage change or invented benchmarks.

## Pro tips

- **Pro tip 1:** Review the saved file independently of the generating chat; context may hide omissions.
- **Pro tip 2:** Version a plan with a future approved feature, but do not commit during this kit.

## Advanced

A plan is a reviewable design artifact that must survive a fresh reader. When
the target is an open stakeholder input, a good plan names the dependency and
an honest stop point instead of silently choosing a production default.

## Quiz

#### Q1: What does Plan Mode do before coding?

- [ ] It edits the smallest file immediately
- [x] It researches the code and produces a reviewable plan before coding
- [ ] It runs the test suite to guess a fix
- [ ] It commits a draft branch

**Explanation:** Plan Mode researches the code and produces a reviewable plan before any code is written.

#### Q2: Where must the plan artifact be saved in this workshop?

- [ ] The default home-directory location
- [x] `.cursor/plans/occupancy-variance.md` in the learner copy
- [ ] `docs/tickets/HLN-102.md`
- [ ] Any folder the button label suggests

**Explanation:** The exact `.cursor/plans/` subdirectory is a workshop-chosen destination, so the file must be explicitly saved or moved there and verified.

#### Q3: How is a 92.5% actual against a 95% target expressed?

- [ ] As a -2.5% relative change
- [ ] As a 2.5% occupancy rate
- [x] As -2.5 percentage points, since variance is actual occupancy minus target
- [ ] As an industry benchmark

**Explanation:** Variance is actual occupancy minus target in percentage points, so the result is -2.5 percentage points, not a relative percentage change.

#### Q4: Why is it wrong to plan a variance column in a chart the starter does not have?

- [ ] Because charts are faster to build later
- [x] Because no chart exists in the starter, and the plan must not invent chart components or unstated benchmarks
- [ ] Because variance cannot be shown visually
- [ ] Because the plan must include an analytics endpoint

**Explanation:** The starter has no occupancy chart, so a plan that invents chart components or benchmarks is out of scope.

#### Q5: When is this kit complete?

- [x] When the plan is saved at the chosen path and a fresh reader restates the formula and open decisions from the file alone
- [ ] When the variance card is implemented and committed
- [ ] When Plan Mode finishes typing a draft
- [ ] When the 95% target is treated as industry data

**Explanation:** Completion requires the plan at the chosen path and a fresh reader who restates the formula and open decisions correctly from the file alone.

## Complete

- [ ] Mark complete
