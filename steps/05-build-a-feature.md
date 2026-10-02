---
step: 5
title: "Build a Feature"
points: 30
module: "Building"
versions: ["short", "medium", "long"]
personas: ["vibecoders", "developers", "data-scientists", "ai-engineers", "forward-deployed"]
---

# Step 5 — Build a Feature (30 pts)

## Learn

Request (Jordan's words) vs ticket (`docs/tickets/HLN-101.md` + acceptance
criteria) vs **Plan Mode** (proposed plan, approved pre-code)[8]. A sentence
is cheap to fix in the plan; a 400-line diff is an afternoon.

## Implement

1. Enter Plan Mode (`Cmd+Shift+P` / plan entry in Agent) and switch to a
   frontier model for planning[8][13].
2. Prompt: `@docs/tickets/HLN-101.md read the ticket and propose a plan:
   column selection in the export dialog, sensitive columns excluded by
   default, order preserved, empty selection returns an empty file.`
3. Approve the plan. Build route-handler validation first
   (`src/app/api/payments/export/route.ts` already validates with Zod —
   extend it), then the dialog.
4. The export fix reuses the query builder behind `GET /api/payments`
   (the paginated table can't export client-side — the ticket notes say so).
   Tests live in `tests/csv.test.ts`: subset in order, sensitive excluded by
   default, empty selection. Run `npm test` twice.
5. Verify with the repo's review flow (Step 11's checklist).

Watch for it: while testing `?sort=amount&direction=desc` you may notice the
order looks wrong (a $9.00 payment outranking $1,500.00). Note it, don't fix
it — that is HLN-102.

## Pro tips

- `Shift+Tab` cycles Agent modes; `Esc` stops; checkpoints rewind code+chat[12].
- `Ctrl+T` task checklist; `Ctrl+B` background; paste screenshots with `Cmd+V`[12].
- Steering keys differ by platform — confirm yours in keyboard shortcuts[12].

## Advanced

Plan = reviewable design doc. Seniors catch wrong abstractions, juniors learn
decomposition. Corrections live in the plan, where they are cheap — not in
the diff, where they are expensive.

## Complete

- [ ] Mark complete
- [ ] I got the expected outcome
