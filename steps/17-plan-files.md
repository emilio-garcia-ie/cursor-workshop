---
step: 17
title: "Plan Files: Plans That Outlive the Session"
points: 10
module: "The Fast Loop"
versions: ["medium", "long"]
personas: ["developers", "ai-engineers"]
---

# Step 17 — Plan Files: Plans That Outlive the Session (10 pts)

## Learn

Plan Mode produces a Markdown plan you can edit directly — "Save to
workspace" stores it in `.cursor/plans/`[8]. Searchable, referenceable with
`@`, committable. A plan becomes documentation, not a moment.

## Implement

1. Enter Plan Mode: describe adding a "variance" column to the occupancy
   chart on Forecasts[8].
2. Save to workspace. Confirm: `ls .cursor/plans/`.
3. Reference it in a new chat with `@.cursor/plans/<file>`.
4. Search for it from the file tree.

## Pro tips

- Commit plan files with the feature — future you will thank present you.
- One plan per ticket keeps archaeology clean.

## Advanced

Plans as artifacts: the plan file is the design doc Step 5 promised, now
durable. Planner output, worker execution, reviewer judgement — separated in
time, reunited in git.

## Complete

- [ ] Mark complete
- [ ] I got the expected outcome
