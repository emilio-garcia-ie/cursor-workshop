---
step: 22
title: "Test-Driven Agentic Development"
points: 15
module: "Debug & Test"
versions: ["medium", "long"]
personas: ["developers", "ai-engineers"]
---

# Step 22 — Test-Driven Agentic Development (15 pts)

## Learn

TDD requires an observed failing acceptance assertion before the implementation
change. An existing green assertion is useful regression coverage, not a RED
phase. The starter already passes empty selection, requested column order,
and CSV escaping in `tests/csv.test.ts`; `src/lib/csv.ts` implements them.
Do not claim that repeating `toCSV([{ id: "pay-0001" }], [])` discovers a failure.

HLN-101's sensitive default columns remain deliberately planted in
`src/domains/payments/export.ts`. Use that unmet requirement for a real
learner-only RED/GREEN cycle. Tests and hooks have different scope: Cursor
hooks cover registered events, not every external push or every business
standard[5]. Never substitute an assumed hook for running the tests yourself.

## Implement

If Step 5 already removed the leak in this copy, stop and select the untouched
learner base. Do not reintroduce a bug into the shared starter merely to get RED.

1. In the learner copy, change the existing planted default-column unit test's
   title and assertions to the acceptance contract below. Keep operational
   columns covered. Also change only the corresponding default-export API
   assertion to require absence of both sensitive headers.

```ts
expect(DEFAULT_EXPORT_COLUMNS).not.toContain("bank_account_last4");
expect(DEFAULT_EXPORT_COLUMNS).not.toContain("routing_number");
```

2. Run `npm test -- tests/export-columns.test.ts tests/api.test.ts`. Capture
   the failures showing the sensitive names were found. A missing import,
   syntax error, or dependency failure does not count as RED.
3. Hand the failing assertions to the agent: "Make these pass by changing only
   default export selection. Do not change the tests, CSV helper, UI, comparator,
   or bucketing logic. Preserve explicit empty selection and requested order."
4. Inspect the patch. Run the focused tests, `npm test -- tests/csv.test.ts`,
   and full `npm test`. Record GREEN only after the full learner suite passes.

### Exercise kit — an honest RED after Step 5

#### Starter code path

Read `docs/tickets/HLN-101.md`, `tests/csv.test.ts`,
`tests/export-columns.test.ts`, `tests/api.test.ts`, and the export
helper/route. Dependencies must be installed. Create an **isolated fresh
learner branch from the original starter revision**, not your completed
Step-5 branch; record that revision and a clean initial diff. Do not reset or
edit the shared console or overwrite earlier learner work. Run `npm test` and
confirm the current planted default-column assertions pass before proceeding.

#### Expected diff

The default-column array and the two learner test-contract transitions. CSV,
amount sorting, bucketing, and the shared baseline remain unchanged. Submit
base revision, RED output, GREEN output, and the reviewed diff.

#### Hints

- Read the ternary in the route before changing it.
- Do not keep both "must contain" and "must not contain" assertions for the same learner contract.
- An already-passing assertion is regression coverage, not a RED phase; the RED must fail on the acceptance contract.

#### Solution approach

An omitted `columns` parameter takes `DEFAULT_EXPORT_COLUMNS`; `?columns=`
becomes an explicit empty selection. Removing sensitive defaults should change
the first case's header, not turn the second into a default export. Requested
`status,id` must stay in that order. This bounded exercise does not complete
HLN-101's UI or authorize access policy for explicitly requested sensitive
columns. Remove `bank_account_last4` and `routing_number` from the learner's
default list, preserving operational columns and their order. Keep existing
empty-selection/escaping tests as regression checks, not newly claimed RED tests.

#### Expected result

You have the learner-only default-column change with its RED and GREEN outputs,
and the full learner `npm test` passes with the CSV helper and shared baseline
unchanged.

> Screenshot placeholder: failing sensitive-header assertions before the array
> edit, passing focused/full runs afterward, and the isolated learner base ID.

#### Stretch goal

Add a route regression for a requested `status,id` header and an invalid
overlong query, using the existing Vitest route-test style. State whether each
was already supported; passing new coverage is not evidence of a newly
implemented feature. Future e2e/contract README directories are not executed
test suites.

### Common mistakes

- **Mistake 1:** Reusing Step 5's fixed branch and calling an already-passing test RED.
- **Mistake 2:** Weakening assertions or deleting unrelated planted contracts to make the suite green.
- **Mistake 3:** Claiming empty-selection tests were missing when they already exist and pass.

## Pro tips

- **Pro tip 1:** Name RED artifacts by the violated requirement, not merely a red terminal color.
- **Pro tip 2:** Keep characterization-to-acceptance test transitions explicit in the review diff.

## Advanced

TDD requires an observed failing acceptance assertion before the implementation
change. Tests and hooks have different scope: Cursor hooks cover registered
events, not every external push or every business standard[5]. Never substitute
an assumed hook for running the tests yourself.

## Quiz

#### Q1: What does TDD require before the implementation change?

- [x] An observed failing acceptance assertion
- [ ] An assumed hook that reports failure
- [ ] A green regression suite
- [ ] A renamed test title

**Explanation:** TDD requires an observed failing acceptance assertion before the implementation change; an assumed hook or green test is not RED.

#### Q2: Where are HLN-101's sensitive default columns deliberately planted?

- [x] In the default export selection in `src/domains/payments/export.ts`
- [ ] In `src/lib/csv.ts`
- [ ] In `tests/csv.test.ts`
- [ ] In `docs/tickets/HLN-101.md`

**Explanation:** The sensitive default columns remain planted in the default export selection in `src/domains/payments/export.ts`.

#### Q3: Why is an already-passing assertion useful but not a RED phase?

- [ ] Because passing tests can still fail later
- [x] Because it is regression coverage, and RED must fail on the acceptance contract, such as the sensitive defaults
- [ ] Because tests should never be edited
- [ ] Because green always means implemented

**Explanation:** An already-passing assertion is regression coverage, not a RED phase; the RED must fail on the unmet HLN-101 acceptance contract.

#### Q4: What is wrong with reusing Step 5's fixed branch and calling an already-passing test RED?

- [x] An already-passing assertion is regression coverage, not a RED phase on the acceptance contract
- [ ] The branch name is too long
- [ ] Fixed branches run faster
- [ ] The full suite must stay green during RED

**Explanation:** Reusing a fixed branch cannot produce a real RED, because the assertion already passes; RED must fail on the acceptance contract.

#### Q5: What does completion require in this step?

- [x] A learner-only default-column change with RED and GREEN outputs and the full learner `npm test` passing with the CSV helper and shared baseline unchanged
- [ ] A reintroduced leak in the shared starter to force RED
- [ ] Weakened assertions to keep the suite green
- [ ] A new hook to replace running the tests

**Explanation:** Completion is the learner-only default-column change with RED and GREEN outputs, leaving the CSV helper and shared baseline unchanged.

## Complete

- [ ] Mark complete
