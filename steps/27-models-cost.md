---
step: 27
title: "Model Routing and Cost"
points: 10
module: "Team & Scale"
versions: ["medium", "long"]
personas: ["developers", "ai-engineers", "forward-deployed"]
---

# Step 27 — Model Routing and Cost (10 pts)

## Learn

The September 16 source names Auto's modes **Cost, Balance, Intelligence**—not
Balanced—and bills requests at the routed model's list price[13]. Availability
and billing depend on plan. Pro, Pro Plus, and Ultra have Cursor Models and
Other Models pools; Start excludes Other Models and Auto[13]. Teams and
Enterprise third-party requests add a Cursor Token Rate, including applicable
Auto routes[13]. Do not turn a dated rate table into a timeless price promise.

Compare cost per accepted outcome, not just the cheapest response. Separate
model usage, included allowance, billed overage, latency, and human review time.
The Enterprise-only Analytics API provides usage metrics[30]; it does not
supply every delivery-quality measure and is not required for this worksheet.

## Implement

### Exercise kit — a fair two-run comparison

#### Starter code path

Use the same learner revision and read-only prompt twice.
Read `src/domains/payments/queries.ts` and `tests/sort-bug.test.ts`. Choose a
small supervised usage budget before running anything. If eligible model or
usage visibility is unavailable, complete the rubric and mark measurements
missing rather than inventing them.

```text
Explain the amount comparator for [900, 150000, 90000, 1500]. Return actual
order, correct numeric order, source evidence, and a non-mutation check.
Do not edit files or call remote services. Distinguish the unreported sort
finding from the actual HLN-102 monthly-total ticket.
```

1. On an eligible account, use Auto **Balance** for one run[13]. Record the
   displayed selection, actual model if exposed, date, plan, and usage evidence.
2. Run the identical prompt with an available explicit model[13] in a fresh
   session with the same files. Do not compare a typo fix with a hard diagnosis
   and call the difference a model-quality result.
3. Grade each against four checks: lexical order, numeric order, non-mutation,
   and correct ticket scope. Record elapsed time and human review effort.
4. Inspect available usage in editor settings or the usage dashboard[13].
   Record measured values with units; label an unavailable per-run cost unknown.

#### Expected diff

Two comparable run rows with prompt/revision, model selection, correctness
score, review time, dated usage evidence, and a tentative routing decision.
Leave unavailable fields blank with an explanation.

#### Hints

- Read the source rates and plan qualifications[13] at evaluation time.
- Do not infer cache savings or hidden model identity from a quick response.

#### Solution approach

Suppose two hypothetical attempts cost $0.03 and $0.09. If only the second
meets all four checks, total cost per accepted result is $0.12, not $0.03.
These are worksheet numbers, not Cursor prices or observed results. Included
usage consumption also need not equal an immediate invoice. Select the
lower-cost option only among runs that meet acceptance. If cost attribution is
unavailable or the sample is too small, conclude "insufficient evidence" and
retain a provisional policy rather than a savings claim.

#### Expected result

You have two comparable, correctly scored run rows with dated usage evidence
and a routing decision, and any unavailable measurement is left blank with an
explanation.

> Screenshot placeholder: redacted routing labels and usage evidence beside
> the same-task scoring table; hide account identifiers and payment details.

#### Stretch goal

Repeat a few matched tasks before proposing a team policy. Track quality
failures independently of adoption metrics. Max Mode is documented only for
legacy request-based plans[13]; do not add it as a universal workshop
requirement or describe it as globally removed.

## Pro tips

- **Pro tip 1:** Include retries and review effort when deciding whether a cheap
  run was economical.
- **Pro tip 2:** Date rate assumptions and distinguish measured cost from an
  illustrative calculation.

### Common mistakes

- **Mistake 1:** Writing Auto/Balanced instead of the documented Balance
  label[13].
- **Mistake 2:** Assuming Auto, both usage pools, or identical surcharges exist
  on every plan[13].
- **Mistake 3:** Declaring one model superior after comparing different tasks or
  missing cost data.

## Advanced

Cost decisions are provisional. A routing preference that holds for one task
and one plan does not generalize to another without a fresh, comparable
measurement; rate tables are dated evidence, not a timeless contract.

## Quiz

#### Q1: What are the documented Auto modes in the September 16 source?

- [ ] Standard, Plus, and Ultra
- [ ] Balanced, Cost, and Speed
- [x] Cost, Balance, and Intelligence
- [ ] Auto, Balance, and Max

**Explanation:** The source names Auto's modes Cost, Balance, and Intelligence, not "Balanced", and bills at the routed model's list price.

#### Q2: Which file and test does the learner read for the two-run comparison?

- [ ] src/app/api/payments/export/route.ts and tests/api.test.ts
- [x] src/domains/payments/queries.ts and tests/sort-bug.test.ts
- [ ] docs/tickets/HLN-101.md and tests/csv.test.ts
- [ ] src/lib/csv.ts and tests/money.test.ts

**Explanation:** The starter code path reads src/domains/payments/queries.ts and tests/sort-bug.test.ts for the read-only prompt.

#### Q3: Two runs cost $0.03 and $0.09, and only the $0.09 run meets all four checks. What is the cost per accepted result?

- [ ] $0.03
- [ ] $0.09
- [x] $0.12
- [ ] Insufficient evidence

**Explanation:** The step computes total cost per accepted result as $0.12 because both attempts are counted, not the cheaper single-run price.

#### Q4: Which label is called out as a documented mistake in this step?

- [ ] Auto Balance
- [ ] Auto Cost
- [x] Auto Balanced
- [ ] Auto Intelligence

**Explanation:** Writing "Auto/Balanced" instead of the documented Balance label is listed as mistake 1.

#### Q5: What must the learner do when per-run cost visibility is unavailable?

- [ ] Estimate the cost from the response length
- [x] Leave the field blank with an explanation
- [ ] Use the previous month's invoice
- [ ] Infer it from the plan name

**Explanation:** The expected result leaves unavailable measurements blank with an explanation rather than inventing them.

## Complete

- [ ] Mark complete