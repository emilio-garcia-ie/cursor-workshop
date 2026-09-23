---
step: 16
title: "Tab and Cmd+K: The Fast Loop"
points: 15
module: "The Fast Loop"
versions: ["medium", "long"]
personas: ["vibecoders", "developers", "data-scientists"]
---

# Step 16 — Tab and Cmd+K: The Fast Loop (15 pts)

## Learn

Tab suggests multi-line and related-file edits; Tab accepts a suggestion and
Escape rejects it[10]. Inline Edit targets selected code with Cmd+K on macOS
or Ctrl+K on Windows/Linux[11]. Use completion when the next pattern is clear,
selected-range editing for a bounded transformation, and Agent for a task
whose scope needs investigation. Project rules do not apply to Tab or Inline
Edit, so state the relevant constraints in the edit request[2].

The formatter is in `src/lib/money.ts`, not `src/lib/csv.ts`. Its tests live
in `tests/money.test.ts`. Formatting is an edge concern: changing presentation
must not turn stored integer cents into floating-point dollars.

## Implement

1. In `tests/money.test.ts`, begin a new case for `-123456` and inspect Tab's
   suggestion before accepting[10]. Require `($1,234.56)`, not `-$1,234.56`.
   Update the old negative assertion only in your learner copy. Capture RED
   with `npm test -- tests/money.test.ts` before touching implementation.
2. Select only `formatCents` and invoke Inline Edit[11]:

```text
Render negative integer cents with parentheses around the existing currency
format. Preserve zero, positives, truncation, grouping, and two decimal digits.
Do not change toCents, callers, imports, or the stored representation.
```

3. Inspect the entire diff, not only the highlighted range. Run the focused
   tests and then `npm test`. Preserve the patch as your inline-edit result.
4. In a second clean learner copy at the same base, give Agent the same
   requirement and tests. Compare scope, rejected edits, review time, and
   correctness; do not invent a token-cost saving.

### Exercise kit — compare two edit surfaces

#### Starter code path

In a disposable learner branch, read `formatCents` and its existing
negative-value assertion. Record the clean base revision. The new workshop
requirement is accounting-style negatives: `-500` becomes `($5.00)`; zero and
positive values remain unchanged. This is not an existing baseline requirement,
and you must not change the shared console.

#### Expected diff

`src/lib/money.ts` plus targeted assertions in `tests/money.test.ts`; `toCents`
and payment storage stay byte-for-byte unchanged.

#### Hints

- Check `0`, `900`, `-500`, and `-123456`.
- Explicitly reject completions that update business logic to accommodate a display-only change.
- State the relevant constraints in the request; project rules do not constrain Tab or Inline Edit[2].

#### Solution approach

Preserve the absolute-value formatting and wrap the final `$1,234.56` string
for negative input. Merely replacing `-` with `(` leaves a missing closing
parenthesis; formatting `Math.abs(cents / 100)` too early can change rounding
behavior. Construct the existing unsigned currency string, then return
`cents < 0 ? `(${formatted})` : formatted`. Retain the original truncation,
grouping, and padding steps. The learner test change expresses the new contract.

#### Expected result

You have the parentheses-format change in `src/lib/money.ts` with the updated
`tests/money.test.ts`, and the full `npm test` passes with `toCents` and
payment storage byte-for-byte unchanged.

> Screenshot placeholder: selected formatter, proposed inline diff, and the
> four input/output assertions; distinguish Tab's test edit from Inline Edit.

#### Stretch goal

Compare a one-function change with a hypothetical locale-wide formatting
requirement. List the callers and contracts that would make the second task
unsuitable for blind selected-range editing. Do not expand the patch just to
demonstrate a larger Agent run.

### Common mistakes

- **Mistake 1:** Looking for `formatCents` in the CSV helper instead of the money module.
- **Mistake 2:** Keeping the old `-$5.00` expectation while claiming the new contract is green.
- **Mistake 3:** Assuming rules automatically constrain Inline Edit or Tab[2].

## Pro tips

- **Pro tip 1:** Save both runs' starting revision and prompt so the comparison is fair.
- **Pro tip 2:** Read every accepted completion: a plausible test name can hide a wrong expected value.

## Advanced

Scope decides the tool: a one-function change fits selected-range editing,
while a locale-wide change spans callers and contracts and needs an agent with
a reviewable plan, not blind completion.

## Quiz

#### Q1: How do you accept or reject a Tab suggestion?

- [x] Tab accepts and Escape rejects
- [ ] Enter accepts and Cmd+K rejects
- [ ] Escape accepts and Tab rejects
- [ ] Clicking accepts and typing rejects

**Explanation:** Tab accepts a suggestion and Escape rejects it.

#### Q2: Which file contains the formatter `formatCents` and its tests?

- [x] `src/lib/money.ts` and `tests/money.test.ts`
- [ ] `src/lib/csv.ts` and `tests/csv.test.ts`
- [ ] `src/domains/payments/queries.ts` and `tests/sort-bug.test.ts`
- [ ] `src/app/payments/page.tsx` and `tests/api.test.ts`

**Explanation:** The formatter is in `src/lib/money.ts` with tests in `tests/money.test.ts`, not in the CSV helper.

#### Q3: Why must the formatting change not alter the stored representation?

- [ ] Because formatting runs before any test
- [x] Because stored integer cents must not become floating-point dollars
- [ ] Because the CSV module owns all money code
- [ ] Because Tab cannot edit production files

**Explanation:** Changing presentation must not turn stored integer cents into floating-point dollars.

#### Q4: Which mistake would make the new contract appear green while staying wrong?

- [x] Keeping the old `-$5.00` expectation while claiming the parentheses contract is green
- [ ] Checking zero and positive values
- [ ] Inspecting the whole diff before accepting
- [ ] Recording the base revision before editing

**Explanation:** Keeping the old negative expectation while claiming the new accounting-style contract is green hides the real contract change.

#### Q5: What must remain byte-for-byte unchanged after this step?

- [ ] The formatter `formatCents`
- [ ] The learner test assertions
- [x] `toCents` and payment storage
- [ ] The import lines of `src/lib/money.ts`

**Explanation:** `toCents` and payment storage stay byte-for-byte unchanged while the formatter and the learner tests change.

## Complete

- [ ] Mark complete
