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

Vision-capable models can read images, and Composer 2.5's documented tools
include image generation from text or reference images[14]. Availability must
still be checked in your session. Canvas is a different artifact surface[25];
it is not the source for an image-generation or image-output-path claim.

For this workshop, **explicitly request, save, or move** a generated image to
`assets/` in your learner copy. That is a **WORKSHOP-chosen destination**, not a
Cursor default[14]. A file there is not automatically a publicly served web
asset. Keep artifact creation separate from application integration.

## Implement

### Exercise kit — a bounded visual brief

**Starter input:** Use a screenshot of your learner Payments page at a recorded
viewport, with synthetic data only. Read `.cursor/rules/components.mdc` and
`src/app/payments/page.tsx`. Do not break the shared UI to manufacture a bug.
Mark one desired improvement on a copy of the screenshot, such as clearer
Export labeling; separate the observed state from the requested design.

```text
Read this synthetic Payments screenshot. Identify the Export action and propose
one clarity improvement without changing behavior. Separately generate a muted,
rounded clipboard/checkmark concept for a proposed Inspections feature. No text,
customer logos, or claims that Inspections already exists. Save or move the image
to my learner assets/inspections-concept.png only if the actual format is PNG;
otherwise retain its real extension and report the actual path. Do not wire it
into the application or claim assets/ is publicly served.
```

**Worked example:** An attractive clipboard image is a design concept, not a
working Inspections screen. HLN-103 says that feature does not exist yet.
If output is WebP, renaming the suffix to `.png` does not convert it; preserve
the actual format and record the mismatch with the requested deliverable.

1. Submit the screenshot to an available vision-capable model[14]. Check its
   description against the real page before accepting any proposed UI patch.
2. Request the concept image[14]. Inspect actual dimensions, format, legibility
   at small size, and whether the shape meets the brief. If generation is
   unavailable, retain the prompt and mark output "not generated".
3. Explicitly place the file at the chosen learner destination and verify its
   existence. Do not claim the model's initial output directory was `assets/`.
4. Write an artifact review with source/reference ownership, requested versus
   actual properties, accepted/rejected details, and integration still pending.

**Expected deliverable:** Screenshot annotation, generation prompt, reviewed
image or honest availability blocker, and actual chosen path. No shared-console
edits, new route, or production asset-serving claim.

**Hints:** Use your own synthetic reference rather than a third party's customer
screen. Check the file itself, not just an image preview in chat.

**Solution:** Accept a concept only after checking the brief and actual file.
Save/move it explicitly into learner `assets/`; keep the application unchanged.
A later integration task must decide serving path, sizing, accessibility, and
fallback behavior before changing the UI.

> Screenshot placeholder: redacted input annotation and generated concept
> preview beside verified file format/dimensions and chosen learner path.

## Pro tips

- Pair an annotated region with a measurable request, such as a readable action label.
- Review generated imagery as source material, not automatic evidence of a shipped feature.

### Common mistakes

- Citing Canvas[25] for generation instead of the image-tool evidence[14].
- Treating `assets/` as an automatic Cursor destination or a public web directory.
- Claiming an Inspections UI exists because an icon concept was generated.

## Advanced

**Stretch:** Use an owned reference image to request a second variant[14].
Compare silhouette, palette, and small-size readability with a fixed rubric.
Do not equate visual similarity with permission to reuse a third-party design.

## Complete

- [ ] Mark complete
- [ ] I got the expected outcome
