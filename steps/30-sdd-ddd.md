---
step: 30
title: "SDD + DDD: Spec Before Code, Boundaries Before Spec"
points: 10
module: "Team & Scale"
versions: ["long"]
personas: ["developers", "ai-engineers"]
---

# Step 30 — SDD + DDD: Spec Before Code, Boundaries Before Spec (10 pts)

## Learn

Spec-driven development: the spec is the prompt. Domain-driven design: model
around the business domain — Property, Leasing, Operations, Payments, each
behind its `index.ts` (diagram `10-hearthline-domains`). Default agent
context is flat, which breaks DDD; the fix is rules
(`boundaries.mdc`)[1].

## Implement

1. Read `.cursor/rules/boundaries.mdc`. Confirm it maps all four domains.
2. Write the HLN-103 spec (recurring inspections) with the `spec` skill:
   `specs/inspections/requirements.md`, `design.md`, `tasks.md`. Inspections
   becomes a NEW domain — not a sub-module of Property.
3. Implement per the spec. Run the boundary reviewer (Step 8's
   org-standards): zero cross-domain internal imports.

## Pro tips

- Fix the spec first. Boundaries are rules, not suggestions.
- Requirement + architecture = reliable harness input.

## Advanced

SDD + DDD combine: the spec says what, the boundaries say where. An agent
with both writes code that looks like the team wrote it — because the
team's decisions are load-bearing files, not chat history.

## Complete

- [ ] Mark complete
- [ ] I got the expected outcome
