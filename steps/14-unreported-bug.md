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

Silent ordering defects can return valid JSON and still answer the wrong
business question. Here the starter's amount comparator compares integer
cents as strings. The Payments page has an Amount header, not an amount-sort
control (`src/app/payments/page.tsx`). Reproduce through the API rather than
pretending a UI interaction exists.

**Ticket reconciliation:** Read the actual files in `docs/tickets/` before
assigning an ID. HLN-101 concerns export options; HLN-102 concerns three
properties' monthly totals and is diagnosis-only. Neither is a numeric-sort
repair ticket. Comments in `queries.ts` and `tests/sort-bug.test.ts` label the
sort defect "HLN-102 / Step 12"; that historical label conflicts with the
actual ticket. For this exercise, treat sorting as the **unreported sort
finding**, and do not relabel or edit the shared ticket or baseline.

## Implement

### Exercise kit — numeric order, learner copy only

**Starter input:** Start a separate learner branch from the unmodified starter
revision. Read `src/domains/payments/queries.ts`, `tests/sort-bug.test.ts`,
and the planted-order case in `tests/api.test.ts`. Record the base revision
and run `npm test` before changing anything. Existing tests intentionally
assert the wrong order; a passing baseline is expected.

**Worked example:** For `[900, 150000, 90000, 1500]`, the planted comparator
returns `[90000, 900, 150000, 1500]`. Numeric descending must return
`[150000, 90000, 1500, 900]`. This four-record fixture is stronger evidence
than eyeballing a single seeded top row.

1. On the learner branch only, change the sort test's name and expected order
   to numeric descending. Retain the non-mutation assertion. Run
   `npm test -- tests/sort-bug.test.ts`; capture the assertion failure, not
   an import or dependency error.
2. Ask for the smallest comparator fix, preserving the input array. Do not
   let the agent weaken or delete the new acceptance assertion.
3. Update the learner-only planted API assertion to numeric monotonicity and
   numeric maximum first. Then run `npm test -- tests/sort-bug.test.ts tests/api.test.ts`
   and the full `npm test`. Leave the export and bucketing bug contracts intact.
4. If a learner dev server is already running, query its actual port with
   `/api/payments?sort=amount&direction=desc&pageSize=100`; compare every adjacent
   amount, not just the first. Draft a review description without inventing a
   ticket ID; no commit, push, or PR submission is required.

**Expected diff:** The comparator plus the two relevant learner test cases;
no sort UI, unrelated cleanup, ticket edits, or shared-starter changes.

**Hints:** Compare numbers before formatting. Copy the array before sorting.
A full-suite failure from an old planted expectation means the test contract
needs an explicit, reviewed transition, not that the new comparator is wrong.

**Solution:** The implementation can return
`[...payments].sort((a, b) => b.amountCents - a.amountCents)`.
The unit fixture proves magnitude ordering; the API test proves the route
uses it. Record RED and GREEN commands separately.

**Stretch:** Search for similar string comparisons and classify each as valid
text ordering or suspicious numeric ordering. Do not fix other findings.

### Common mistakes

- Calling this an HLN-102 repair because of a stale code comment.
- Adding a green numeric test after the comparator is already fixed and calling it RED.
- Deleting all planted-bug tests instead of changing only this learner exercise's contract.

### Pro tips

- Include both a prefix pair (`900`, `90000`) and a digit-length pair (`900`, `150000`).
- Keep the shared starter untouched so the next learner can reproduce the defect.

> Screenshot placeholder: the four-record RED/GREEN assertion output and
> reviewed comparator diff, with the actual ticket titles visible separately.

## Complete

- [ ] Mark complete
- [ ] I got the expected outcome
