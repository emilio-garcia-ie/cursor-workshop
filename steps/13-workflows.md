---
step: 13
title: "Dynamic Workflows"
points: 10
module: "Bonus"
versions: ["medium", "long"]
personas: ["ai-engineers", "forward-deployed"]
---

# Step 13 — Dynamic Workflows (10 pts)

## Learn

Fan out, verify, synthesize. Split the investigation across parallel
investigators (background agents, or subagents each on its own machine with
clean context[32]), let a second round refute against the code, then merge
the survivors. Three honest tests for reaching for it: the work splits
across people, being wrong is expensive, one pass misses things.

## Implement

Run the HLN-102 diagnosis as a swarm: one investigator per symptom (Honolulu
/ Anchorage / Guam totals), plus timezone handling and refund accumulation
angles — each in its own environment so findings don't collide[32][15]. Then
a skeptic round: each survivor must point at file, line, and symptom mapping
in the actual code. Synthesize only what survives. Do not change code.

## Complete

- [ ] Mark complete
- [ ] I got the expected outcome
