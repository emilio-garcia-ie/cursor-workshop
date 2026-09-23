---
step: 18
title: "The Agents Window: Parallel Work"
points: 15
module: "The Fast Loop"
versions: ["long"]
personas: ["developers", "ai-engineers", "forward-deployed"]
---

# Step 18 — The Agents Window: Parallel Work (15 pts)

## Learn

Worktrees give tasks isolated Git checkouts. Cursor's UI-native worktree flow
is in the Agents Window; the IDE uses Worktree Skills commands[19]. Raw Git
worktrees are a separate workflow, not evidence that a particular Cursor UI
was exercised. Cloud Agents run asynchronously on dedicated VMs[15]; that is
another runtime choice, not a prerequisite for two local tasks.

Isolation reduces accidental shared-file edits, but it does not make results
compatible. Define ownership and an integration check before launching workers.
Do not confuse independent subagent context with checkout isolation: subagents
share a checkout by default unless isolation is requested[34].

## Implement

1. Inspect each worktree's status and diff independently. Verify no paths
   outside its ownership were changed and record any rejected suggestions.
2. Run `npm test -- tests/money.test.ts` for B and the full suite in each
   learner checkout as appropriate. Dependencies belong to that checkout;
   do not assume the other worker's installation proves setup[19].
3. Apply only the reviewed diffs to a third learner integration checkout at
   the same base. Run `npm test` and inspect the Payments labels there.
4. Produce a keep/reject decision for each diff with integration evidence.
   Do not merge or commit into the shared starter.

### Exercise kit — two non-overlapping improvements

#### Starter code path

Use a clean learner revision of the console. Read `src/app/payments/page.tsx`
and `tests/money.test.ts`. Create two learner worktrees through the Agents
Window if available[19]; record their actual paths, branch names, and identical
base revision. If unavailable, perform the tasks sequentially in separate
learner copies and label the UI path untested. Never use the shared baseline
as a worker checkout. Launch both workers with:

```text
Worker A owns only src/app/payments/page.tsx. Give the search input an explicit
accessible name and use button text "Export CSV" on the existing export link.
Preserve its href, search parameter propagation, data query, and table behavior.
Worker B owns only tests/money.test.ts. Add positive edge-case coverage for
formatCents(1), formatCents(101), and formatCents(123456). No production edits.
Both: no commits, pushes, dependency changes, or planted-bug repairs.
```

#### Expected diff

A two-worker ownership table, base/path evidence, individual diffs, combined
diff, and actual verification results.

#### Hints

- Check `git status --short` in each actual checkout.
- A screenshot of two chats does not establish isolated filesystems.
- Subagents share the parent checkout unless isolation is requested; do not treat them as worktrees[34].

#### Solution approach

A's allowed diff changes labeling, not the export route. B's expected outputs
are `$0.01`, `$1.01`, and `$1,234.56`. If A also changes `money.ts`, reject
that out-of-scope edit before combining results. Two clean individual test
runs do not replace a combined-checkout run. Accept A's labels only if the
export URL is unchanged; accept B's assertions only if they check the existing
integer-cent formatter. Integration should contain exactly the two owned
paths, with all planted contracts intact.

#### Expected result

You have the two-worker ownership table with individual and combined diffs,
and the integration checkout passes `npm test` with exactly the two owned
paths changed.

> Screenshot placeholder: two distinct worktree paths and bounded diffs, plus
> the combined learner checkout's test result.

#### Stretch goal

Explain when the optional **Projects** beta coordinator/shared context would
help a larger set of tasks[36]. These are optional runtime alternatives, not
new workshop infrastructure requirements.

### Common mistakes

- **Mistake 1:** Launching two chats in one checkout and calling that isolation.
- **Mistake 2:** Comparing different base revisions or silently missing dependencies.
- **Mistake 3:** Accepting isolated green runs without checking the combined result.

## Pro tips

- **Pro tip 1:** Allocate paths before prompts; review any worker request to expand ownership.
- **Pro tip 2:** Keep a separate integration checkout so neither worker silently becomes the base.

## Advanced

**My Machines** connects a personal machine; team pools queue tasks for
available workers[36]. Origin can host work without third-party source control,
and Origin-hosted repositories and synced GitHub repositories have different
sources of truth[36]. These are optional runtime alternatives, not new
workshop infrastructure requirements. Retain this workshop's GitHub case study
and do not migrate it.

## Quiz

#### Q1: What do worktrees give parallel tasks?

- [ ] A shared checkout with one dependency install
- [x] Isolated Git checkouts that reduce accidental shared-file edits
- [ ] Automatic merge to the shared baseline
- [ ] A single combined diff with no integration step

**Explanation:** Worktrees give tasks isolated Git checkouts, and isolation reduces accidental shared-file edits.

#### Q2: Which files do Workers A and B own in this kit?

- [x] A owns `src/app/payments/page.tsx`; B owns `tests/money.test.ts`
- [ ] A owns `src/lib/money.ts`; B owns `src/app/payments/page.tsx`
- [ ] Both workers own `tests/money.test.ts`
- [ ] A owns the export route; B owns `src/lib/money.ts`

**Explanation:** Worker A owns only the Payments page and Worker B owns only the money tests, with no production edits for B.

#### Q3: Why must the combined integration checkout replace two clean individual runs?

- [ ] Because individual runs always lie
- [x] Because isolation does not make results compatible, and integration evidence needs the combined run
- [ ] Because the shared baseline cannot run tests
- [ ] Because reviewers only accept screenshots

**Explanation:** Isolation reduces accidental shared-file edits but does not make results compatible, so a combined-checkout run is the integration evidence.

#### Q4: Why is launching two chats in one checkout not isolation?

- [ ] Because chats are always serial
- [x] Because subagents share the parent checkout by default unless isolation is requested
- [ ] Because worktrees are forbidden here
- [ ] Because a screenshot of two chats proves isolation

**Explanation:** Subagents share a checkout by default unless isolation is requested, so two chats in one checkout are not isolated.

#### Q5: What must the integration checkout show at completion?

- [x] `npm test` passing with exactly the two owned paths changed and all planted contracts intact
- [ ] A merge into the shared starter
- [ ] Both workers editing the same files
- [ ] A third path owned by the integration step

**Explanation:** The integration checkout passes `npm test` with exactly the two owned paths changed and all planted contracts intact.

## Complete

- [ ] Mark complete
