---
step: 20
title: "Debug Mode: Hypothesis Before Fix"
points: 15
module: "Debug & Test"
versions: ["medium", "long"]
personas: ["developers", "data-scientists"]
---

# Step 20 — Debug Mode: Hypothesis Before Fix (15 pts)

## Learn

Debug Mode follows hypotheses → instrumentation → reproduction → log analysis
→ targeted fix → verification and cleanup[18]. It can help investigate timing
problems, but does not guarantee a particular patch size[18]. First establish
that the supposed behavior actually exists in the code.

The console export route is synchronous in
`src/app/api/payments/export/route.ts`; it does not contain the global-counter
race previously described by this exercise. Do not invent that runtime defect
or plant a new one. Use the existing amount-order defect in a disposable
learner copy, preserving the shared baseline and HLN-102's diagnosis-only scope.

## Implement

1. Review the proposed instrumentation before running it. Debug Mode documents
   a local debug server for its logs[18]; restrict captured fields to synthetic
   amounts, types, branch result, and a hypothesis ID.
2. Reproduce with `[900, 150000, 90000, 1500]` through the existing unit fixture.
   Preserve the trace and explicitly accept/reject/defer each hypothesis.
3. After review, perform Step 14's learner-only test-contract transition:
   numeric expected order first (RED), comparator second (GREEN), and the
   corresponding API assertion. Do not repair export or bucketing defects.
4. Re-run the same reproduction and full `npm test`. Remove temporary
   instrumentation and inspect the final diff; verify again after cleanup[18].

### Exercise kit — competing explanations for wrong order

#### Starter code path

Use a fresh learner branch at the original starter revision, not Step 14's
already-fixed branch. Read `src/domains/payments/queries.ts`,
`tests/sort-bug.test.ts`, and the amount-order case in `tests/api.test.ts`.
Run `npm test -- tests/sort-bug.test.ts` to establish the planted contract,
then drive the investigation with:

```text
In Debug Mode, investigate why 900 cents can appear before 150000 cents in
amount-descending results. Before editing behavior, propose at least three
hypotheses and the observation that would distinguish each. Instrument only
synthetic amount comparisons. No full payment objects, secrets, or remote calls.
Stop after reproduction so I can review the evidence before a learner-only fix.
```

#### Expected diff

A hypothesis/evidence table, RED/GREEN output, and a minimal learner patch
limited to the sort helper and relevant assertions. No shared-console edits.
If runtime instrumentation is unavailable, submit a source-only diagnosis
explicitly marked as such, not a completed Debug run.

#### Hints

- Record raw values before formatted currency.
- Freeze the fixture; changing both data and comparator destroys the comparison.
- Confirm the planted amount-order defect exists in the current branch before hypothesizing about it.

#### Solution approach

Distinguish (A) string comparison, (B) reversed direction, and (C)
formatting-only display error. A trace of `900` and `150000` entering as
numbers, becoming `"900"` and `"150000"`, then taking the lexical branch
supports A. If the raw API array is already wrong, C cannot explain it alone.
Reversed numeric order would not produce the full planted four-record sequence.
Replace lexical comparison with numeric subtraction on a copied array. Show
the new sequence `[150000, 90000, 1500, 900]`, unchanged input order, and no
debug transport/log statements in the final learner diff.

#### Expected result

You have the hypothesis table with RED/GREEN evidence and a learner-only sort
patch, and the final diff contains no debug instrumentation or transport
statements.

> Screenshot placeholder: hypothesis IDs beside synthetic trace values,
> numeric-order verification, and the instrumentation-free final diff.

#### Stretch goal

Keep the comparator unchanged in another learner copy and change only the
fixture to equal amounts. Explain why that case cannot distinguish lexical
from numeric sorting; add a discriminating pair instead of more logs.

### Common mistakes

- **Mistake 1:** Claiming a counter race without finding a counter or asynchronous write path.
- **Mistake 2:** Starting from Step 14's repaired branch and reporting an unreproduced baseline defect.
- **Mistake 3:** Logging complete payment records when four synthetic integers answer the question.

## Pro tips

- **Pro tip 1:** Ask what observation would disprove the favorite hypothesis before collecting logs.
- **Pro tip 2:** Verify after cleanup as well as before it; temporary diagnostics are part of the diff.

## Advanced

Debug Mode sequences hypotheses, instrumentation, reproduction, log analysis,
and verification; a fix is only credible with the evidence that distinguishes
the competing explanations[18]. First establish that the supposed behavior
actually exists in the code.

## Quiz

#### Q1: What is the Debug Mode sequence?

- [x] Hypotheses, instrumentation, reproduction, log analysis, targeted fix, verification and cleanup
- [ ] Fix, test, log, reproduce, verify
- [ ] Instrumentation, fix, cleanup, hypothesis
- [ ] Reproduction, hypothesis, patch, deploy

**Explanation:** Debug Mode follows hypotheses to instrumentation, reproduction, log analysis, targeted fix, then verification and cleanup.

#### Q2: What does the exercise say about the console export route?

- [x] `src/app/api/payments/export/route.ts` is synchronous and does not contain the global-counter race
- [ ] `src/app/api/payments/export/route.ts` owns the counter race
- [ ] `src/domains/payments/queries.ts` is the export route
- [ ] The route must be made asynchronous

**Explanation:** The export route is synchronous and does not contain the previously described global-counter race, so that defect must not be invented.

#### Q3: Which evidence best supports the string-comparison hypothesis for wrong amount order?

- [x] A trace of 900 and 150000 entering as numbers, becoming strings, then taking the lexical branch
- [ ] A screenshot of the Payments page
- [ ] A hypothesis with no observed values
- [ ] A formatted-currency display difference alone

**Explanation:** A trace showing numbers becoming strings and then taking the lexical branch supports hypothesis A, while a display-only error cannot explain a wrong raw array.

#### Q4: Why must you not claim a counter race without finding a counter or async write path?

- [x] Because the export route is synchronous, and first the supposed behavior must actually exist in the code
- [ ] Because races are impossible in JavaScript
- [ ] Because counters are never logged
- [ ] Because the ticket requires a race claim

**Explanation:** The route is synchronous and has no global counter, so the race claim must be dropped and the actual existing defect investigated.

#### Q5: What must the final learner diff contain?

- [ ] Full payment objects and debug transport statements
- [ ] A new asynchronous counter
- [x] The sort patch with no debug instrumentation or transport statements after cleanup
- [ ] A changed shared baseline

**Explanation:** After cleanup the final diff contains no debug instrumentation or transport statements, only the learner sort patch and its evidence.

## Complete

- [ ] Mark complete
