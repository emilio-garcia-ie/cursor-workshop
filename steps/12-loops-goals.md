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

A goal is a standing objective with a definition of done — `/goal` gives the
agent a long-lived objective to work towards until complete[32]. A loop is
the rhythm that re-checks it: `/loop` for recurring check-ins[32]. Cloud
agents can hold a goal across long sessions and pick up scheduled tasks on
their own[31][32].

## Implement

```text
/goal the payments test suite stays green. Run npm test in the repo. If
anything fails, diagnose it, fix it on a branch called
maintenance/payments-health, rerun until green. If green, reply "green"
and do nothing.
```

Pair it with `/loop` for the recurring check-in cadence[32]. Safety fences
that earn autonomy: a done-line ("reply green and do nothing"), a branch
(never `main`), and a quiet no-op.

## Complete

- [ ] Mark complete
- [ ] I got the expected outcome
