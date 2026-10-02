---
step: 20
title: "Debug Mode: Hypothesis Before Fix"
points: 10
module: "Debug & Test"
versions: ["medium", "long"]
personas: ["developers", "data-scientists"]
---

# Step 20 — Debug Mode: Hypothesis Before Fix (10 pts)

## Learn

Debug Mode is a different loop: hypothesis → instrument → reproduce →
pinpoint → fix[18]. It typically produces 2–3 line fixes — runtime evidence
beats speculation.

## Implement

1. Introduce a race: in the payments export, read a global counter, delay,
   write it back without re-reading. Parallel exports occasionally drop one.
2. Enter Debug Mode and describe it: "The payments export occasionally misses
   one payment when multiple exports run at the same time. The count in the
   response does not match the number of rows."[18]
3. Read the hypotheses. Reproduce by running two exports in parallel.
4. Fix, verify, let the agent strip the instrumentation logs.

## Pro tips

- Debug Mode is for bugs that resist reasoning — reach for it after the
  obvious reads, not before[18].
- One variable per reproduction. Change two things and you learn nothing.

## Advanced

Runtime evidence beats speculation: traces, counters, and parallel runs over
theories. The discipline transfers — hypothesis-first debugging works with
or without the agent.

## Complete

- [ ] Mark complete
- [ ] I got the expected outcome
