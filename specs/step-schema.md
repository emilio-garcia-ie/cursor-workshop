# Step-file schema (contract for steps/*.md)

Every file: `steps/<NN>-<slug>.md`, NN zero-padded (01–15, 16–33).

## Frontmatter (required keys)

```yaml
---
step: 5
title: "Build a Feature"
points: 30
module: "Building"
versions: ["short", "medium", "long"]   # subset per tracks.md
personas: ["vibecoders", "developers", "data-scientists", "ai-engineers", "forward-deployed"]
---
```

## Body tabs (exact H2 headings, in order)

- `## Learn` — EXCEPT Step 1, which uses `## The project` (mirrors the source
  workshop's join/step-1 shape: project intro + Implement, no Learn/Pro
  tips/Advanced)
- `## Implement`
- `## Pro tips` — EXCEPT Step 11 uses `## Terminology`; Steps 9–10 omit Pro tips
  (no tab at all)
- `## Advanced` — EXCEPT bonus Steps 12–15 and 31–33, which carry Learn +
  Implement only (single-concept bonus format, no Pro tips/Advanced)

## Required closers (exact text, in order, every step)

```markdown
## Complete

- [ ] Mark complete
- [ ] I got the expected outcome
```

## Example (minimal conforming step)

```markdown
---
step: 1
title: "Day One: Meet the Team"
points: 5
module: "Foundations"
versions: ["short", "medium", "long"]
personas: ["vibecoders", "developers", "data-scientists", "ai-engineers", "forward-deployed"]
---

# Step 1 — Day One: Meet the Team (5 pts)

## Learn
…
## Implement
…
## Pro tips
…
## Advanced
…

## Complete

- [ ] Mark complete
- [ ] I got the expected outcome
```
