---
step: 27
title: "Model Routing and Cost"
points: 10
module: "Team & Scale"
versions: ["medium", "long"]
personas: ["developers", "ai-engineers", "forward-deployed"]
---

# Step 27 — Model Routing and Cost (10 pts)

## Learn

Auto mode routes each task to a suitable model; explicit selection overrides
it. Models and per-token rates live on the pricing page — check current
numbers there, not here[13]. Frontier models for hard problems (HLN-102
diagnosis), cheap/fast for mechanical edits.

## Implement

1. Set routing to Auto/Balanced. Make a small edit (typo fix).
2. Force a frontier model for the HLN-102 diagnosis. Note the quality delta.
3. Check the cost in the session usage view. Record both runs' cost and
   outcome in one line each.

## Pro tips

- Auto for most work, explicit for hard problems[13].
- Cost per engineer per month is a Step-10 rollout metric — start measuring
  now[30].

## Advanced

Model routing as cost discipline: route by task hardness, review spend
weekly, keep the frontier for diagnosis and design. The harness (Step 29)
matters more than the model underneath it.

## Complete

- [ ] Mark complete
- [ ] I got the expected outcome
