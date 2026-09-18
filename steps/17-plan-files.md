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

### Exercise kit — a plan another session can audit

**Starter input:** Read the Forecasts page and `src/domains/property/index.ts`
in your learner copy. Ask Plan Mode[8] for a proposal only:

```text
Plan an occupancy variance card beside the existing Forecasts metric cards.
Use a workshop target of 95%, labeled as an assumption, not industry data.
Variance is actual occupancy minus target, in percentage points. No chart exists
in the starter. Explain the zero-unit case, data inputs, tests, and exact files.
Do not implement or change the shared starter. Stop for design approval.
```

**Worked example:** Actual `92.5%` against the chosen `95%` target gives
`-2.5 percentage points`, not `-2.5% relative change`. The target is a new
exercise input, not a field already present in the store. A zero-unit portfolio
needs an explicit "N/A" decision rather than division by zero.

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

**Expected deliverable:** A saved plan with source paths, formula and units,
zero-unit behavior, test cases, a bounded proposed diff, reviewer, and approval
gate. Attach the fresh-session handoff response and actual file path.

**Hints:** Write "target supplied by workshop" next to 95%. Ask the second
reader what it still needs before coding; missing inputs are useful output.

**Solution:** A sufficient handoff names the existing cards, proposes a pure
variance calculation with explicit unavailable-data behavior, and lists tests
for below/on/above target plus zero units. It does not create a new chart or
pretend implementation has passed. Save/move explicitly to the chosen directory.

> Screenshot placeholder: file tree showing the chosen plan path beside the
> fresh reader's formula and unresolved-decision summary.

## Pro tips

- Review the saved file independently of the generating chat; context may hide omissions.
- Version a plan with a future approved feature, but do not commit during this kit.

### Common mistakes

- Claiming Save to workspace necessarily selects `.cursor/plans/`[8].
- Planning a variance column in a chart that the starter does not have.
- Mixing percentage points with relative percentage change or invented benchmarks.

## Advanced

**Stretch:** Change the workshop target to an unresolved stakeholder input.
Can the plan still identify independent preparatory work and an honest stop
point? A useful plan exposes the dependency rather than silently choosing a
production default.

## Complete

- [ ] Mark complete
- [ ] I got the expected outcome
