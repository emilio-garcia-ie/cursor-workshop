---
step: 29
title: "The Harness: How It All Fits"
points: 10
module: "Team & Scale"
versions: ["medium", "long"]
personas: ["ai-engineers", "forward-deployed"]
---

# Step 29 — The Harness: How It All Fits (10 pts)

## Learn

Harness = instructions + tools + model, tuned together. Yours is `.cursor/`:
rules (instructions), MCP + skills + subagents (tools), routing (model).
Cursor's own arc moved from heavy guardrails to dynamic context — your
harness should move the same way: short instructions, strong verification.

## Implement

1. Inventory your harness: list every file in `.cursor/` and classify it
   (instruction / tool / enforcement).
2. Find the missing component (most teams have rules + MCP but no hooks —
   you have all three since Step 9; verify).
3. Write one harness skill: "When starting a feature: check `specs/` for a
   spec, read the relevant rules, plan, implement with tests, run the
   verification hook." (Step 7's skill format, Step 30's spec-first rule.)

## Pro tips

- Harness matters more than prompt. Keep instructions short[1].
- Verification is what people skip — automate it (hooks) or it rots.

## Advanced

Planner / worker / judge: split the roles, connect with artifacts (plan
files, specs, reviews). Removing complexity is improvement — the best
harness change this month might be deleting a rule.

## Complete

- [ ] Mark complete
- [ ] I got the expected outcome
