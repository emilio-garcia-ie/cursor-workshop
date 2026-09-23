---
step: 19
title: "Side Chats: Ask Without Derailing"
points: 10
module: "The Fast Loop"
versions: ["long"]
personas: ["developers", "data-scientists"]
---

# Step 19 — Side Chats: Ask Without Derailing (10 pts)

## Learn

Side chats are durable child conversations: the parent history is hidden
reference context, not a second visible copy of the transcript[33]. Open one
with `/side` and bring its findings back by @-mentioning it in the parent[33].
They are **local-only**, cannot nest, and closing archives rather than deletes
them[33]. Do not promise the same workflow in a Cloud Agent.

Use a side question to resolve uncertainty without turning the main task into
an unrelated discussion. Hidden parent context still needs verification
against current files; a plausible explanation is not a passing test.

## Implement

1. Open the side chat locally[33]. Inspect the cited function and rule rather
   than accepting "UTC is safer" as the complete explanation.
2. Ask one follow-up about month-end policy. Keep it an open requirement if
   the rule/test does not specify a decision; do not invent clamping behavior.
3. @-mention the side chat in the parent[33]. Ask the parent to retain a
   behavior-preserving refactor scope and list month-end semantics separately.
4. Run `npm test -- tests/renewal-date.test.ts` in the learner copy. Record the
   unchanged diff and the coverage limitation alongside the actual result.

### Exercise kit — investigate without silently refactoring

#### Starter code path

In a local learner session, read `src/domains/leasing/lib/renewal-date.ts`,
`tests/renewal-date.test.ts`, and `.cursor/rules/time.mdc`. Start the main
task as a **refactor proposal**, not permission to edit: "Explain how to
clarify renewal-date names without changing behavior; wait for approval." Keep
the shared baseline unchanged. Open the investigation with:

```text
/side Why does this renewal helper use calendar-day arithmetic rather than
server-local Date arithmetic? Read the time rule and tests. Give one supported
example and one untested edge case. Do not edit files or expand the task.
```

#### Expected diff

A parent proposal, a cited side answer, and a short handoff separating current
behavior, tested behavior, and unresolved policy. No production or test patch
is required.

#### Hints

- Look for any actual Date construction in the helper before explaining it.
- A string that looks like a date is not proof that every generated day exists.
- A clean side-chat transcript still inherits hidden parent context; verify it against current files[33].

#### Solution approach

The existing December case maps `2026-12-01` plus two months to `2027-02-01`.
The helper preserves the input day number; that does not establish valid
month-end behavior for January 31 plus one month. Distinguish the design
intent in the time rule from coverage actually present in the tests. Return
the December example and the untested month-end question. The parent can
proceed with naming-only planning, but changing calendar semantics needs a
separate specification and learner-only tests.

#### Expected result

You have the parent proposal, the cited side answer, and the
behavior-versus-policy handoff, and `npm test -- tests/renewal-date.test.ts`
passes with an unchanged tracked diff.

> Screenshot placeholder: parent proposal, local side question, and imported
> conclusion; the parent history need not appear in the child transcript[33].

#### Stretch goal

Repeat the question in a fresh ordinary conversation with only the three
source files. Compare what must be supplied explicitly versus the side chat's
parent reference context[33]. Judge answer accuracy, not transcript size.

### Common mistakes

- **Mistake 1:** Expecting side chats to work in Cloud Agents or to spawn nested side chats[33].
- **Mistake 2:** Treating a clean child transcript as proof that it has no parent context[33].
- **Mistake 3:** Fixing a newly noticed month-end issue during a behavior-preserving refactor.

## Pro tips

- **Pro tip 1:** Bring back the smallest useful conclusion plus source paths, not every tangent.
- **Pro tip 2:** Archive an answered side chat deliberately; closing is not deletion[33].

## Advanced

Side chats keep a parent task on track, but the same question in a fresh
conversation has to carry its own context explicitly[33]. The comparison
judges answer accuracy, not transcript size.

## Quiz

#### Q1: How do you open a side chat and bring its findings back?

- [x] Open with `/side` and @-mention the side chat in the parent
- [ ] Open with `/ask` and paste a screenshot
- [ ] Open with a new tab and copy the transcript
- [ ] Open with `/loop` and close the parent

**Explanation:** Side chats are opened with `/side`, and findings come back by @-mentioning the side chat in the parent.

#### Q2: Which helper and rule does this step's side chat inspect?

- [x] `src/domains/leasing/lib/renewal-date.ts` and `.cursor/rules/time.mdc`
- [ ] `src/lib/money.ts` and `.cursor/rules/money.mdc`
- [ ] `src/domains/payments/queries.ts` and `docs/tickets/HLN-101.md`
- [ ] `src/app/forecasts/page.tsx` and `src/lib/csv.ts`

**Explanation:** The side chat reads the renewal-date helper, its tests, and the time rule.

#### Q3: Why does the December example not prove month-end correctness?

- [ ] Because December has 31 days
- [ ] Because the test file is missing
- [x] Because the helper preserves the input day number, which does not establish behavior for January 31 plus one month
- [ ] Because the time rule forbids calendar arithmetic

**Explanation:** The helper preserves the input day number, which does not establish valid month-end behavior for a January 31 input plus one month.

#### Q4: Why is a clean child transcript not proof that it has no parent context?

- [ ] Because transcripts are always redacted
- [x] Because side chats inherit the parent history as hidden reference context
- [ ] Because closing a side chat deletes it
- [ ] Because side chats nest inside each other

**Explanation:** The parent history is hidden reference context, so a clean child transcript is not proof that it has no parent context.

#### Q5: What does completion require in this step?

- [x] A parent proposal, a cited side answer, and a behavior-versus-policy handoff, with the renewal test passing and an unchanged tracked diff
- [ ] A merged month-end policy fix
- [ ] A production refactor of the renewal-date names
- [ ] A deleted side chat with no record

**Explanation:** Completion requires the handoff artifacts and a passing renewal test with an unchanged tracked diff, not a behavior patch.

## Complete

- [ ] Mark complete
