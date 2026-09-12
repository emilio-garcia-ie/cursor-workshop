---
step: 21
title: "Browser and Design Mode: Fix What You See"
points: 10
module: "Debug & Test"
versions: ["long"]
personas: ["vibecoders", "developers"]
---

# Step 21 — Browser and Design Mode: Fix What You See (10 pts)

## Learn

The integrated browser runs your app where the agent can see it[16]. Design
Mode lets you select elements, annotate, drag to reorder, inspect props, and
adjust styles — the agent finds the code[17].

## Implement

1. Open the browser panel; navigate to `/payments` (dev server running).
2. Enter Design Mode. Select the export button. Annotate: "Make this the
   primary action. It should stand out in the toolbar."[17]
3. Let the agent edit. Verify in the browser.
4. Test a flow end to end: ask the agent to click through, download the
   export, and verify the row count matches[16].

## Pro tips

- Fastest UI fix loop available: see it, annotate it, verify it[17].
- Keep the dev server on the seeded data so counts are deterministic.

## Advanced

The browser is an execution environment, not a viewer: flows, downloads,
and counts are all assertable by the agent[16]. The visual loop closes with
Design Mode feeding implementation and the browser verifying it.

## Complete

- [ ] Mark complete
- [ ] I got the expected outcome
