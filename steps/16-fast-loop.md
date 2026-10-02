---
step: 16
title: "Tab and Cmd+K: The Fast Loop"
points: 10
module: "The Fast Loop"
versions: ["medium", "long"]
personas: ["vibecoders", "developers", "data-scientists"]
---

# Step 16 — Tab and Cmd+K: The Fast Loop (10 pts)

## Learn

Tab autocomplete predicts your next edit — multi-line, multi-location — not
just the next token[10]. Cmd+K is inline edit: select code, describe the
change[11]. Rule of thumb: Tab when you know what comes next, Cmd+K when you
know what should change, Agent when you know the outcome.

## Implement

1. Open `src/lib/csv.ts`. Type a test case name; let Tab complete it[10].
2. Select `formatCents`. Cmd+K: "Handle negative values with parentheses
   instead of a minus sign."[11]
3. Make the same change with the Agent. Compare: precision and cost of the
   fast loop vs the full loop.

## Pro tips

- Tab is for patterns; Cmd+K is for precision[10][11].
- Screenshot a UI oddity and paste it with Cmd+V for visual fixes.

## Advanced

When the fast loop beats the agent (small, local, obvious edits) and when it
doesn't (cross-file reasoning, ambiguous intent). Reach for each deliberately.

## Complete

- [ ] Mark complete
- [ ] I got the expected outcome
