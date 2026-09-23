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

### Exercise kit — numeric order, learner copy only

#### Starter code path

Start a separate learner branch from the unmodified starter revision. Read
`src/domains/payments/queries.ts`, `tests/sort-bug.test.ts`, and the
planted-order case in `tests/api.test.ts`. Record the base revision and run
`npm test` before changing anything. Existing tests intentionally assert the
wrong order; a passing baseline is expected.

#### Expected diff

The comparator plus the two relevant learner test cases; no sort UI, unrelated
cleanup, ticket edits, or shared-starter changes.

#### Hints

- Compare numbers before formatting.
- Copy the array before sorting.
- A full-suite failure from an old planted expectation means the test contract needs an explicit, reviewed transition, not that the new comparator is wrong.

#### Solution approach

For `[900, 150000, 90000, 1500]`, the planted comparator returns
`[90000, 900, 150000, 1500]`. Numeric descending must return
`[150000, 90000, 1500, 900]`; this four-record fixture is stronger evidence
than eyeballing a single seeded top row. The implementation can return
`[...payments].sort((a, b) => b.amountCents - a.amountCents)`. The unit
fixture proves magnitude ordering; the API test proves the route uses it.
Record RED and GREEN commands separately.

#### Expected result

You have the numeric-descending comparator and the two updated learner test
cases on your own branch, and `/api/payments?sort=amount&direction=desc`
returns amounts in strictly descending numeric order.

> Screenshot placeholder: the four-record RED/GREEN assertion output and
> reviewed comparator diff, with the actual ticket titles visible separately.

#### Stretch goal

Search for similar string comparisons and classify each as valid text ordering
or suspicious numeric ordering. Do not fix other findings.

### Common mistakes

- **Mistake 1:** Calling this an HLN-102 repair because of a stale code comment.
- **Mistake 2:** Adding a green numeric test after the comparator is already fixed and calling it RED.
- **Mistake 3:** Deleting all planted-bug tests instead of changing only this learner exercise's contract.

### Pro tips

- **Pro tip 1:** Include both a prefix pair (`900`, `90000`) and a digit-length pair (`900`, `150000`).
- **Pro tip 2:** Keep the shared starter untouched so the next learner can reproduce the defect.

## Quiz

#### Q1: Why can a silent ordering defect be dangerous?

- [ ] It always crashes the server
- [x] It returns valid JSON that answers the wrong business question
- [ ] It fails every unit test
- [ ] It blocks the export route

**Explanation:** A silent ordering defect can return valid JSON and still answer the wrong business question.

#### Q2: Where does the starter's amount comparator compare integer cents as strings?

- [ ] `src/app/payments/page.tsx`
- [ ] `src/lib/money.ts`
- [x] `src/domains/payments/queries.ts`
- [ ] `tests/sort-bug.test.ts`

**Explanation:** The planted amount comparator lives in `src/domains/payments/queries.ts`, while the Payments page has no sort control.

#### Q3: Why must this sort defect be treated as an unreported finding rather than an HLN-102 repair?

- [ ] Because HLN-102 is already fixed
- [ ] Because sorting is not a payments concern
- [x] Because the actual HLN-102 ticket concerns monthly totals and is diagnosis-only, and the code comment is a historical label
- [ ] Because HLN-101 covers sorting

**Explanation:** The code comment labeling the defect HLN-102 conflicts with the actual diagnosis-only monthly-totals ticket, so sorting stays an unreported finding.

#### Q4: What is wrong with adding a green numeric test after the comparator is already fixed and calling it RED?

- [ ] Nothing, because green is the goal of RED
- [x] The RED phase must capture a failing assertion before the fix; a green test after the fix does not demonstrate RED
- [ ] Tests cannot be edited on a learner branch
- [ ] The assertion should be weakened instead

**Explanation:** RED must be captured before the fix, so a green test added after the comparator is fixed does not prove a RED phase.

#### Q5: What is required to complete this step?

- [ ] A new sort control on the Payments page
- [x] A numeric-descending comparator and the two updated learner test cases on your own branch, with the API returning strictly descending order
- [ ] An edit to the shared starter ticket titles
- [ ] A committed, pushed pull request with a new ticket ID

**Explanation:** Completion is the learner-only comparator and two updated test cases with the API returning amounts in strictly descending numeric order.

## Complete

- [ ] Mark complete
