---
step: 33
title: "Improvement Loop"
points: 20
module: "Bonus"
versions: ["long"]
personas: ["forward-deployed", "ai-engineers"]
---

# Step 33 — Improvement Loop (20 pts)

## Learn

Improve a playbook through measured proposals, not an automatic claim of
"retraining" a model. Keep input evidence, output quality, human decision,
and later outcomes separate. Cloud subscriptions can run scheduled work[32];
the optional Projects beta coordinator can maintain shared context and watch
channels, schedules, or PRs[36]. Neither is required for a manual review cycle.

A scheduled proposal is not authority to publish a skill or send outreach.
Cloud hooks exclude early read-only turns and local home-directory hooks[31].
The Enterprise-only Analytics API reports Cursor usage[30], not whether a
fictional prospect converted. Use your own consented outcome worksheet for
that separate question; this kit uses synthetic data only.

## Implement

### Exercise kit — one measured playbook revision

#### Starter code path

Reuse Step 31's learner voice draft and Step 32's fictional brief. Create an
offline outcome worksheet with these required fields: record ID, source/fixture
label, play version, audience segment, sent/draft-only, reply, reply quality,
conversion, observation window, reviewer, and rejection reason. Keep unknown
outcomes unknown; do not infer silence from missing data.

```text
Synthetic cohort A: 10 fictional sends, 2 replies, 1 conversion, same window.
Synthetic cohort B: 10 fictional sends, 3 replies, 1 conversion, same window.
Held-out brief: no reporting-interest evidence; must not invent a pain point.
Review request: propose exactly one voice-playbook change. Cite supporting
records, calculate metrics, note uncertainty, and return a diff for approval.
No sending, scheduling, publishing, credential access, or shared-file edits.
```

1. Calculate the cohort metrics and note the identical conversion count. Exclude
   draft-only rows from sent-message denominators and document the choice.
2. Ask for one revision in a learner-owned skill copy, preserving source-bound
   claims and human approval. Review the diff before using it in another draft.
3. Run the original brief and the held-out missing-evidence brief with both
   versions. Grade factuality, single-question scope, unsupported promises,
   and reviewer edits using the same rubric.
4. Accept or reject the revision with a recorded reason and rollback copy.
   A rejected proposal remains in the review log; it does not silently become
   the new default. Do not publish or schedule anything.
5. Review the mechanism citations used by the playbook against the cached
   September 16 evidence paths in `FRESHNESS-2026-09.md`. If a claim lacks body
   support, flag it for later verification rather than inventing a new feature.

#### Expected diff

Synthetic outcome table, arithmetic, one proposed learner diff,
before/after held-out scores, and a human keep/revert decision. Record
freshness review as source inspection, not a new fetch or runtime test.

#### Hints

- A higher reply count can coexist with unchanged conversion.
- Keep revision evaluation separate from future business outcomes and pricing
  data.

#### Solution approach

Reply share changes from 20% to 30%, a 10-percentage-point difference;
conversion remains 10% in both cohorts. That tiny synthetic sample does not
establish causal improvement. A proposal to make the question clearer can be
tested; a claim that the new play "increases revenue" cannot be inferred.
Treat the observed difference as a hypothesis. Approve only a bounded wording
change that preserves factual grounding on both fixtures; otherwise retain the
original. Record no demonstrated improvement if both versions already satisfy
the rubric. This is playbook editing, not model training.

#### Expected result

You have a synthetic outcome table, the cohort arithmetic, one proposed learner
diff, held-out scores, and a signed keep/revert decision, and nothing was
published, scheduled, or sent.

> Screenshot placeholder: synthetic cohort calculations, single proposed skill
> diff, held-out evaluation, and signed keep/revert decision; no real prospect data.

#### Stretch goal

Draft a future weekly subscription with owner, approved log scope,
one-proposal limit, spend bound, human gate, and stop condition[32]. Compare
with optional Projects coordination[36], but do not provision either. A manual
worksheet remains a complete path through the exercise.

### Common mistakes

- **Mistake 1:** Calling a prompt/skill revision model retraining or a proven
  conversion lift.
- **Mistake 2:** Using draft-only or unknown outcomes as if they were observed
  sends and failures.
- **Mistake 3:** Letting an automated review publish its own proposal without
  human approval.

### Pro tips

- **Pro tip 1:** Preserve rejected revisions and reasons so the next review does
  not repeat them.
- **Pro tip 2:** Use a held-out missing-evidence fixture to detect persuasive
  but unsupported claims.

## Quiz

#### Q1: What must the learner keep separate when improving the playbook?

- [ ] Branch names and commit messages
- [x] Input evidence, output quality, human decision, and later outcomes
- [ ] Model names and token counts
- [ ] Drafts and final copy only

**Explanation:** The step keeps input evidence, output quality, human decision, and later outcomes separate.

#### Q2: Where does the freshness review check the mechanism citations?

- [ ] bibliography.md
- [x] FRESHNESS-2026-09.md
- [ ] docs/tickets/HLN-101.md
- [ ] .cursor/rules/root.mdc

**Explanation:** The review checks the playbook's mechanism citations against the cached September 16 evidence paths in FRESHNESS-2026-09.md.

#### Q3: Replies rise from 20% to 30% while conversion stays 10% in both synthetic cohorts. What can be concluded?

- [ ] The new play increases revenue by 10 points
- [x] The change is a hypothesis, not proven causal improvement on a tiny synthetic sample
- [ ] The old play must be deleted
- [ ] Conversion is irrelevant to outreach

**Explanation:** The tiny synthetic sample does not establish causal improvement, so the observed difference is treated as a hypothesis.

#### Q4: Which practice is called out as a common mistake when scoring the revision?

- [ ] Excluding draft-only rows from sent-message denominators
- [x] Using draft-only or unknown outcomes as if they were observed sends and failures
- [ ] Recording a rejection reason
- [ ] Keeping a rollback copy

**Explanation:** Using draft-only or unknown outcomes as if they were observed sends and failures is mistake 2.

#### Q5: What must NOT happen even though the playbook changed?

- [ ] Recording cohort arithmetic
- [ ] Proposing exactly one change
- [x] Publishing, scheduling, or sending anything
- [ ] Keeping the rejected proposal in the review log

**Explanation:** The expected result says nothing was published, scheduled, or sent, and the revision stays a human-approved learner diff.

## Complete

- [ ] Mark complete