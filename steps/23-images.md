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

#### Starter code path

Use a screenshot of your learner Payments page at a recorded
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

1. Submit the screenshot to an available vision-capable model[14]. Check its
   description against the real page before accepting any proposed UI patch.
2. Request the concept image[14]. Inspect actual dimensions, format, legibility
   at small size, and whether the shape meets the brief. If generation is
   unavailable, retain the prompt and mark output "not generated".
3. Explicitly place the file at the chosen learner destination and verify its
   existence. Do not claim the model's initial output directory was `assets/`.
4. Write an artifact review with source/reference ownership, requested versus
   actual properties, accepted/rejected details, and integration still pending.

#### Expected diff

Screenshot annotation, generation prompt, reviewed image or honest
availability blocker, and actual chosen path. No shared-console edits, new
route, or production asset-serving claim.

#### Hints

- Use your own synthetic reference rather than a third party's customer screen.
- Check the file itself, not just an image preview in chat.

#### Solution approach

An attractive clipboard image is a design concept, not a working Inspections
screen; HLN-103 says that feature does not exist yet. If output is WebP,
renaming the suffix to `.png` does not convert it; preserve the actual format
and record the mismatch with the requested deliverable. Accept a concept only
after checking the brief and the actual file, save or move it explicitly into
learner `assets/`, and keep the application unchanged. A later integration task
must decide serving path, sizing, accessibility, and fallback behavior before
changing the UI.

#### Expected result

You have an annotated screenshot, a generation prompt, and a reviewed concept
image (or an honest availability blocker) placed at a recorded learner path,
and the shared console and its application are unchanged.

> Screenshot placeholder: redacted input annotation and generated concept
> preview beside verified file format/dimensions and chosen learner path.

#### Stretch goal

Use an owned reference image to request a second variant[14]. Compare
silhouette, palette, and small-size readability with a fixed rubric. Do not
equate visual similarity with permission to reuse a third-party design.

## Pro tips

- **Pro tip 1:** Pair an annotated region with a measurable request, such as a
  readable action label.
- **Pro tip 2:** Review generated imagery as source material, not automatic
  evidence of a shipped feature.

### Common mistakes

- **Mistake 1:** Citing Canvas[25] for generation instead of the image-tool
  evidence[14].
- **Mistake 2:** Treating `assets/` as an automatic Cursor destination or a
  public web directory.
- **Mistake 3:** Claiming an Inspections UI exists because an icon concept was
  generated.

## Advanced

Image generation and application integration are different steps. The concept
belongs in the learner's `assets/` for review; wiring it into a route, choosing
serving and sizing, and adding accessibility and fallbacks are separate,
future decisions. Nothing in this kit changes the shared console.

## Quiz

#### Q1: Which documented Cursor surface supports image generation from text or reference images?

- [ ] Canvas
- [x] Composer 2.5's image-tool evidence
- [ ] The Payments route
- [ ] The public web server

**Explanation:** Composer 2.5's documented tools include image generation from text or reference images, while Canvas is a different artifact surface.

#### Q2: Where does the learner explicitly place the reviewed concept image in this step?

- [ ] src/app/assets/
- [x] assets/ in the learner copy
- [ ] .cursor/rules/
- [ ] The shared console's public directory

**Explanation:** The kit says to explicitly request, save, or move the generated image to assets/ in the learner copy, a workshop-chosen destination rather than a Cursor default.

#### Q3: Why is the generated clipboard/checkmark concept not evidence that an Inspections screen exists?

- [ ] Because generated images are always placeholder watermarks
- [ ] Because only Maya may preview new screens
- [x] Because HLN-103 states the Inspections feature does not exist yet
- [ ] Because Canvas renders are automatically rejected

**Explanation:** A concept image is a design artifact, not a working screen, and HLN-103 says the Inspections feature does not exist yet.

#### Q4: The generation tool returns a WebP file but the deliverable expects a PNG. What should you do?

- [ ] Rename the suffix to .png and report success
- [x] Preserve the actual format and record the mismatch with the requested deliverable
- [ ] Convert it by re-saving in the chat preview
- [ ] Discard it and claim generation was unavailable

**Explanation:** Renaming a WebP suffix to .png does not convert the file, so the actual format must be preserved and the mismatch recorded.

#### Q5: What must remain unchanged after completing this step?

- [ ] The learner's assets/ folder
- [ ] The generation prompt
- [x] The shared console and its application
- [ ] The annotated screenshot

**Explanation:** The expected result keeps the shared console and its application unchanged, with only learner artifacts added.

## Complete

- [ ] Mark complete