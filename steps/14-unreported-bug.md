---
step: 14
title: "The Bug Nobody Reported"
points: 20
module: "Bonus"
versions: ["medium", "long"]
personas: ["developers", "data-scientists", "ai-engineers"]
---

# Step 14 — The Bug Nobody Reported (20 pts)

## Learn

Silent bugs never throw — they surface as passing comments. Jordan's, while
eyeballing the table: "to find the largest payments, I have to eyeball the
table." No sort-by-amount in the UI; the comparator underneath compares
cents as strings. Reproduce via endpoint, record expected-vs-got, describe
the symptom (not the fix), ask "where else?", prove it with a
would-have-failed test.

## Implement

1. Reproduce: `curl "http://localhost:3000/api/payments?sort=amount&direction=desc"`
   — spot `99200` above six-figure amounts. Expected: numeric descending.
2. Trace: which file and line, why string comparison breaks it, same-shape
   search elsewhere in the codebase.
3. Fix + failing-then-passing test + top-rows check. Ship the PR with the
   Step 7 skill (no ticket ID — this one was never filed).
4. Stretch (diagnosis only, no code changes): HLN-102's three properties via
   the bug-investigator — one written diagnosis per symptom.

## Complete

- [ ] Mark complete
- [ ] I got the expected outcome
