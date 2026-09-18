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

### Exercise kit — competing explanations for wrong order

**Starter input:** Use a fresh learner branch at the original starter revision,
not Step 14's already-fixed branch. Read `src/domains/payments/queries.ts`,
`tests/sort-bug.test.ts`, and the amount-order case in `tests/api.test.ts`.
Run `npm test -- tests/sort-bug.test.ts` to establish the planted contract.

```text
In Debug Mode, investigate why 900 cents can appear before 150000 cents in
amount-descending results. Before editing behavior, propose at least three
hypotheses and the observation that would distinguish each. Instrument only
synthetic amount comparisons. No full payment objects, secrets, or remote calls.
Stop after reproduction so I can review the evidence before a learner-only fix.
```

**Worked example:** Distinguish (A) string comparison, (B) reversed direction,
and (C) formatting-only display error. A trace of `900` and `150000` entering
as numbers, becoming `"900"` and `"150000"`, then taking the lexical branch
supports A. If the raw API array is already wrong, C cannot explain it alone.
Reversed numeric order would not produce the full planted four-record sequence.

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

**Expected diff or deliverable:** A hypothesis/evidence table, RED/GREEN output,
and a minimal learner patch limited to the sort helper and relevant assertions.
No shared-console edits. If runtime instrumentation is unavailable, submit a
source-only diagnosis explicitly marked as such, not a completed Debug run.

**Hints:** Record raw values before formatted currency. Freeze the fixture;
changing both data and comparator destroys the comparison.

**Solution:** Replace lexical comparison with numeric subtraction on a copied
array. Show the new sequence `[150000, 90000, 1500, 900]`, unchanged input order,
and no debug transport/log statements in the final learner diff.

> Screenshot placeholder: hypothesis IDs beside synthetic trace values,
> numeric-order verification, and the instrumentation-free final diff.

## Pro tips

- Ask what observation would disprove the favorite hypothesis before collecting logs.
- Verify after cleanup as well as before it; temporary diagnostics are part of the diff.

### Common mistakes

- Claiming a counter race without finding a counter or asynchronous write path.
- Starting from Step 14's repaired branch and reporting an unreproduced baseline defect.
- Logging complete payment records when four synthetic integers answer the question.

## Advanced

**Stretch:** Keep the comparator unchanged in another learner copy and change
only the fixture to equal amounts. Explain why that case cannot distinguish
lexical from numeric sorting; add a discriminating pair instead of more logs.

## Complete

- [ ] Mark complete
- [ ] I got the expected outcome
