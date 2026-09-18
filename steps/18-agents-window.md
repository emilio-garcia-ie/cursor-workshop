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

### Exercise kit — two non-overlapping improvements

**Starter input:** Use a clean learner revision of the console. Read
`src/app/payments/page.tsx` and `tests/money.test.ts`. Create two learner
worktrees through the Agents Window if available[19]; record their actual
paths, branch names, and identical base revision. If unavailable, perform the
tasks sequentially in separate learner copies and label the UI path untested.
Never use the shared baseline as a worker checkout.

```text
Worker A owns only src/app/payments/page.tsx. Give the search input an explicit
accessible name and use button text "Export CSV" on the existing export link.
Preserve its href, search parameter propagation, data query, and table behavior.
Worker B owns only tests/money.test.ts. Add positive edge-case coverage for
formatCents(1), formatCents(101), and formatCents(123456). No production edits.
Both: no commits, pushes, dependency changes, or planted-bug repairs.
```

**Worked example:** A's allowed diff changes labeling, not the export route.
B's expected outputs are `$0.01`, `$1.01`, and `$1,234.56`. If A also changes
`money.ts`, reject that out-of-scope edit before combining results. Two clean
individual test runs do not replace a combined-checkout run.

1. Inspect each worktree's status and diff independently. Verify no paths
   outside its ownership were changed and record any rejected suggestions.
2. Run `npm test -- tests/money.test.ts` for B and the full suite in each
   learner checkout as appropriate. Dependencies belong to that checkout;
   do not assume the other worker's installation proves setup[19].
3. Apply only the reviewed diffs to a third learner integration checkout at
   the same base. Run `npm test` and inspect the Payments labels there.
4. Produce a keep/reject decision for each diff with integration evidence.
   Do not merge or commit into the shared starter.

**Expected deliverable:** A two-worker ownership table, base/path evidence,
individual diffs, combined diff, and actual verification results.

**Hints:** Check `git status --short` in each actual checkout. A screenshot of
two chats does not establish isolated filesystems.

**Solution:** Accept A's labels only if the export URL is unchanged; accept B's
assertions only if they check the existing integer-cent formatter. Integration
should contain exactly the two owned paths, with all planted contracts intact.

> Screenshot placeholder: two distinct worktree paths and bounded diffs, plus
> the combined learner checkout's test result.

## Pro tips

- Allocate paths before prompts; review any worker request to expand ownership.
- Keep a separate integration checkout so neither worker silently becomes the base.

### Common mistakes

- Launching two chats in one checkout and calling that isolation.
- Comparing different base revisions or silently missing dependencies.
- Accepting isolated green runs without checking the combined result.

## Advanced

**Stretch:** Explain when the optional **Projects** beta coordinator/shared
context would help a larger set of tasks[36]. **My Machines** connects a personal
machine; team pools queue tasks for available workers[36]. These are optional
runtime alternatives, not new workshop infrastructure requirements. Origin
can host work without third-party source control; Origin-hosted repositories
and synced GitHub repositories have different sources of truth[36]. Retain
this workshop's GitHub case study and do not migrate it.

## Complete

- [ ] Mark complete
- [ ] I got the expected outcome
