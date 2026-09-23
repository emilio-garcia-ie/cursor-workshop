---
step: 5
title: "Build a Feature"
points: 35
module: "Building"
versions: ["short", "medium", "long"]
personas: ["vibecoders", "developers", "data-scientists", "ai-engineers", "forward-deployed"]
---

# Step 5 — Build a Feature (35 pts)

## Learn

Request (Jordan's words) vs ticket (`docs/tickets/HLN-101.md` + acceptance
criteria) vs **Plan Mode** (proposed plan, approved pre-code)[8]. A sentence
is cheap to fix in the plan; a 400-line diff is an afternoon.

## Implement

1. Open the mode menu with `Cmd+.` on macOS or `Ctrl+.` on Windows/Linux,
   then select Plan; `Shift+Tab` rotates modes[12]. Confirm the visible Plan
   label before requesting the plan[8]. Choose a model available under your
   plan and team policy rather than assuming one is required[13].
2. Prompt: `@docs/tickets/HLN-101.md read the ticket and propose a plan:
   column selection in the export dialog, sensitive columns excluded by
   default, order preserved, empty selection returns an empty file.`
3. Approve the plan. Build route-handler validation first
   (`src/app/api/payments/export/route.ts` already validates with Zod —
   extend it), then the dialog.
4. The export fix reuses the query builder behind `GET /api/payments`
   (the paginated table can't export client-side — the ticket notes say so).
   CSV ordering and empty selection are covered in `tests/csv.test.ts`;
   default-column acceptance belongs in `tests/export-columns.test.ts` and
   `tests/api.test.ts`. Run `npm test` twice.
5. Verify with the repo's review flow (Step 11's checklist).

Watch for it: while testing `?sort=amount&direction=desc` you may notice the
order looks wrong (a $9.00 payment outranking $1,500.00). Record the
**unreported sort finding** for Step 14; do not fix it here. HLN-102 is the
monthly-totals diagnosis-only ticket, not a sort repair. The old HLN-102 sort
label in starter comments is historical and conflicts with the actual ticket.

### From plan to evidence

A useful plan maps each acceptance criterion to a code seam and a test.
Here the seam is server-side: the dialog chooses columns, the route validates
the request, and the CSV helper preserves that choice. Review the plan before
building[8]; ask which existing behavior is already covered rather than
rewriting a passing helper to make the diff look substantial.

### Exercise kit

#### Starter code path

`hearthline-operator-console/src/app/api/payments/export/route.ts`,
`src/domains/payments/export.ts`, `src/app/payments/page.tsx`,
`src/lib/csv.ts`, and `tests/csv.test.ts`; read the ticket alongside them.
Locate the current export control in the Payments page before adding a dialog.

#### Minimal working example

In the learner checkout, this existing test pattern demonstrates the two
CSV contracts without requiring a browser:

```ts
expect(toCSV([{ id: "p1", status: "late" }], ["status", "id"]))
  .toBe("status,id\nlate,p1\n");
expect(toCSV([{ id: "p1" }], [])).toBe("");
```

Use the existing Vitest imports and `toCSV` import in `tests/csv.test.ts`;
these assertions illustrate already-covered behavior, not new coverage.
In the learner feature, replace the planted sensitive-default expectations
in `tests/export-columns.test.ts` and `tests/api.test.ts` with safe-default
assertions for both bank fields; retain operational-column coverage and the
API's explicit-empty-selection case. Do not keep contradictory tests
or delete the regression coverage. Probe a running learner app with:

```bash
npm test -- tests/csv.test.ts
curl -i 'http://localhost:3000/api/payments/export?columns=status,id'
curl -i 'http://localhost:3000/api/payments/export?columns='
npm test
```

#### Expected diff

The default column list excludes both bank fields; the Payments UI exposes
selection; the route validates allowed column names and preserves order;
feature tests cover defaults, subset order, and explicitly empty selection.
Keep query reuse server-side. No payment-sort or UTC-bucketing repair belongs
in this diff: leave the HLN-102 narrative intact.

#### Hints

- Omitted `columns` means defaults; `columns=` means the user's empty
  selection. Do not collapse both into the same fallback.
- The existing CSV tests already cover ordering and empty output. A green
  helper test cannot prove the dialog or default export is safe.
- Compare the export with more than one visible page of matching payments;
  a client-only CSV can pass a tiny fixture while missing most rows.

#### Solution approach

Approve a criterion-to-test plan, add a failing assertion for sensitive
defaults, then make the smallest implementation change. Extend validation
without changing the public column names. Wire the dialog to the server
request and verify each criterion in the UI and HTTP response. Run the
whole suite twice as requested above and preserve actual outputs.

#### Expected result

No bank fields are selected by default; a `status,id` request produces that
header order; an explicit empty selection yields a zero-length body, not
headers. A full filtered export is not limited to the visible table page.
Record a failure as a failure, not a checked box in the PR draft.

[SCREENSHOT: Export dialog with sensitive fields unchecked beside ordered CSV and empty-response evidence]

#### Stretch goal

Add a route-level invalid-column case and verify a clear rejection rather
than a silently empty CSV column. Keep the sort anomaly out of scope.

### Common mistakes

- **Mistake 1:** Building before reviewing the plan. Correct the boundary
  while it is a sentence, not after the UI is wired to the wrong data.
- **Mistake 2:** Exporting the paginated browser rows. Reuse the server-side
  query path identified in the ticket.
- **Mistake 3:** Treating empty selection as “select defaults.” Keep omission
  and explicit emptiness distinct through UI, route, and helper.

## Pro tips

- **Pro tip 1:** Review one acceptance criterion per diff pass; write down its
  test evidence before moving on.
- **Pro tip 2:** Use `Shift+Tab` to rotate modes[12], but read the selected
  mode label before sending an implementation request.
- Steering keys differ by platform — confirm yours in keyboard shortcuts[12].

## Advanced

Plan = reviewable design doc. Seniors catch wrong abstractions, juniors learn
decomposition. Corrections live in the plan, where they are cheap — not in
the diff, where they are expensive.

## Quiz

#### Q1: What is Plan Mode in this step?

- [ ] A summary of the ticket written by Jordan
- [x] A proposed plan for the feature that is reviewed and approved before code
- [ ] The final PR description
- [ ] A list of planted bugs to fix

**Explanation:** Plan Mode is the proposed plan, approved pre-code, so a correction is cheap while it is still a sentence.

#### Q2: Where does the export request's validation live?

- [ ] src/lib/csv.ts
- [ ] src/app/payments/page.tsx
- [x] src/app/api/payments/export/route.ts
- [ ] tests/csv.test.ts

**Explanation:** The route handler already validates with Zod; extend it there first, then build the dialog.

#### Q3: Why must the export reuse the server-side query path rather than the visible table rows?

- [ ] Because client-side code cannot read money fields
- [x] Because the paginated table cannot export all matching payments, only the visible page
- [ ] Because the browser has no CSV support
- [ ] Because the table shows generated data

**Explanation:** The ticket notes say the paginated table cannot export client-side; reuse the query path so the full filtered export is complete.

#### Q4: Which is a common mistake the step warns against?

- [ ] Reviewing one acceptance criterion per diff pass
- [ ] Recording the sort anomaly for Step 14
- [x] Treating an empty selection as "select defaults"
- [ ] Running npm test twice

**Explanation:** Omitted columns mean defaults; columns= means the user's empty selection, and the two must stay distinct through UI, route, and helper.

#### Q5: What must an explicit empty selection produce?

- [ ] The default bank fields
- [x] A zero-length body, not headers
- [ ] A header-only CSV
- [ ] An error page

**Explanation:** The explicit empty selection yields a zero-length body, not headers, per the expected result.

## Complete

- [ ] Mark complete
