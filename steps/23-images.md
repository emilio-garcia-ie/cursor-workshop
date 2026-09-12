---
step: 23
title: "Image Input and Generation"
points: 10
module: "Debug & Test"
versions: ["long"]
personas: ["vibecoders", "developers"]
---

# Step 23 — Image Input and Generation (10 pts)

## Learn

Cursor accepts image input — screenshot a UI bug instead of describing it —
and generates images into `assets/`[25]. Screenshots for bugs, generation
for assets, reference images for branded variants.

## Implement

1. Screenshot to fix: break the payments table (make one header wrap),
   screenshot it, paste it in: "Fix this. The header should stay on one
   line." Verify in the browser (Step 21).
2. Generate an asset: "Generate an icon for the Inspections screen — a
   clipboard with a checkmark, muted, rounded, minimal." Confirm it lands
   in `assets/`[25].
3. Reference-driven generation: upload a dashboard you like and ask for a
   Hearthline-branded version under `.cursor/rules/components.mdc` constraints.

## Pro tips

- Annotate screenshots before pasting (arrow + one sentence beats a paragraph).
- Generated assets still go through review like any other file.

## Advanced

The visual loop closes with Design Mode (Step 21): screenshot → annotate →
generate/fix → verify in browser. Round trip in minutes, not tickets.

## Complete

- [ ] Mark complete
- [ ] I got the expected outcome
