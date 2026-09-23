---
step: 13
title: "Dynamic Workflows"
points: 10
module: "Bonus"
versions: ["long"]
personas: ["ai-engineers", "forward-deployed"]
---

# Step 13 — Dynamic Workflows (10 pts)

## Learn

Fan out only when questions are independent; synthesize evidence, not votes.
Subagents receive their own parent-supplied context, but share the parent's
checkout by default unless isolation is requested[34]. Separate-machine
cloud subagents are documented[32]; that does not mean every delegated task
automatically has a separate filesystem.

Optional coverage: **Projects** beta maintains shared context and a coordinator
that delegates implementation rather than writing code itself[36]. This
exercise uses a small local investigation; no Project or cloud runtime is
required. A human can perform the second pass if delegation is unavailable.

## Implement

### Exercise kit — HLN-102 evidence handoff

#### Starter code path

Read `docs/tickets/HLN-102.md` in the console learner copy. Its acceptance
criteria require a written diagnosis of monthly-total symptoms at Honolulu,
Anchorage, and Guam, with shared-cause analysis and **no fix in this session**.
Read `src/domains/payments/bucketing.ts` and
`src/domains/payments/refund-service.ts`; do not treat their names as proof
of a complete settlement-reporting pipeline. Give two investigators disjoint
questions, with no edit or external-tool work:

```text
A: Trace payment-day bucketing. For each property timezone, provide a concrete
UTC instant, expected local day, actual code behavior, and file:line evidence.
B: Trace refund recording and callers. Separate observed implementation from
hypotheses about monthly totals. Identify missing settlement data or call paths.
Both: Report uncertainty. Do not fix code, tests, or the planted baseline.
```

#### Expected diff

A three-row symptom matrix plus a hypothesis table: source location,
observation, proposed cause, contrary evidence, confidence, and missing
evidence. Preserve "not established" where a settlement comparison cannot be
reproduced from the available fixtures.

#### Hints

- Ask the skeptic to follow each claimed call edge in source.
- Two agents repeating the same comment count as one piece of evidence.
- A clean model context is not an isolated checkout[34].

#### Solution approach

`bucketPaymentByDay` ignores both supplied arguments and returns today's
server-local date. For `2027-01-01T08:30:00Z` in Honolulu, the expected local
day is `2026-12-31`; a report that merely says "UTC bug" is insufficient. A
refund function that returns an ID without recording a refund is a separate
observation, not proof that it caused all three totals. Retain the
argument-ignoring bucketing finding; reject a claim that the amount comparator
is automatically HLN-102's root cause. Keep any refund-to-monthly-total
connection conditional until a caller/data trace supports it. The final report
must distinguish the three property examples from three independently proven
root causes.

#### Expected result

You have the three-row symptom matrix and hypothesis table for HLN-102, and
every row names a source location with the shared baseline left unchanged.

> Screenshot placeholder: investigator reports beside the skeptic's accepted,
> rejected, and unresolved findings; show an unchanged tracked diff.

#### Stretch goal

Draft a coordinator handoff containing only the accepted findings and open
questions. Compare it with the optional Projects shared-context pattern[36],
without provisioning a Project.

### Common mistakes

- **Mistake 1:** Confusing clean model context with an isolated checkout[34].
- **Mistake 2:** Merging findings by majority vote instead of checking source and inputs.
- **Mistake 3:** Turning a diagnosis-only ticket into an unreviewed repair or fabricated settlement test.

### Pro tips

- **Pro tip 1:** Give the skeptic the source paths and observations, not just the first agent's conclusion.
- **Pro tip 2:** Cap the fan-out at two investigators until the missing evidence justifies another.

## Quiz

#### Q1: When is fanning out to multiple investigators appropriate?

- [ ] Whenever a ticket mentions more than one file
- [x] When the questions are independent, and evidence is synthesized, not votes
- [ ] Whenever the parent checkout is clean
- [ ] Whenever a cloud runtime is available

**Explanation:** Fan out only when questions are independent, and synthesize evidence rather than counting votes.

#### Q2: Which ticket does this exercise investigate, and what is its constraint?

- [x] HLN-102, a diagnosis-only investigation of monthly totals at Honolulu, Anchorage, and Guam
- [ ] HLN-101, an export options repair
- [ ] HLN-102, a numeric sort repair ticket
- [ ] The unreported sort finding from Step 12

**Explanation:** HLN-102 requires a written diagnosis of monthly-total symptoms at three properties with no fix in this session.

#### Q3: Why must the amount comparator not be automatically declared HLN-102's root cause?

- [ ] Because the comparator is not used by payments code
- [x] Because three property examples are not three independently proven root causes, and the refund connection stays conditional until traced
- [ ] Because the ticket forbids naming any root cause
- [ ] Because only the skeptic may propose causes

**Explanation:** The report must distinguish the three property examples from three independently proven root causes, and keep the refund-to-monthly-total connection conditional until a caller or data trace supports it.

#### Q4: Why does the skeptic need to follow each claimed call edge in source?

- [ ] Because agents never provide file:line evidence
- [x] Because two agents repeating the same comment count as one piece of evidence, not independent confirmation
- [ ] Because source edges are faster than reading tests
- [ ] Because majority vote is required for acceptance

**Explanation:** Two agents repeating the same comment count as one piece of evidence, so the skeptic must verify each claimed call edge in source.

#### Q5: What is the expected deliverable for this step?

- [ ] A merged fix for the bucketing defect
- [x] A three-row symptom matrix and hypothesis table for HLN-102 with every row naming a source location and the shared baseline unchanged
- [ ] A fabricated settlement test that turns green
- [ ] A coordinator handoff with no source paths

**Explanation:** The deliverable is the three-row symptom matrix and hypothesis table for HLN-102 with the shared baseline left unchanged.

## Complete

- [ ] Mark complete
