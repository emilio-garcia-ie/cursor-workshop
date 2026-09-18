# Freshness checklist

The five phases of a curriculum refresh, with the classification matrix.
Run in order; each phase produces evidence recorded in the refresh report.

## 1. Discover

- Inventory ALL current entries in `bibliography.md` (the count changes over
  time; never assume a fixed number such as 33).
- Fetch each source URL and record: URL, access date, retrieval method, and
  what body content supports or contradicts. Substantive body text is the
  evidence bar; a reachable URL or HTTP 200 alone does not verify content.
- Fetch the docs index and the Cursor changelog landing page. Never guess
  URLs; only follow links discovered in fetched pages.
- Record HTTP observations honestly. If the origin status is not visible,
  write "HTTP unknown" instead of fabricating a success code.
- Reuse a prior capture only when its date is inside the rolling window and
  its provenance is recorded.

## 2. Classify

- Label findings "new to coverage" when the audited curriculum does not
  cover them. Do not call anything "newly shipped" without release evidence
  from a fetched changelog or dated release note.
- A failed or unavailable URL is not deprecation evidence; classify the
  dependent claims as blocked/unverified instead.
- Apply the classification matrix to every finding and assign a stable ID
  (see SKILL.md resume protocol).

### Classification matrix

| Class | Use when | Default action |
|---|---|---|
| Critical correction | Existing prose contradicts verified source behavior, or a safety/enforcement claim is wrong | Propose fix; block dependent exercises until corrected |
| Deepen | Existing step is correct but materially incomplete versus sources | Propose in-place additions to the existing step |
| New optional | New-to-coverage feature learners could adopt but do not need | Propose new step or bonus step; requires budget impact review |
| Footnote | Small qualification or scoping note; no practice surface needed | Propose one-line addition or bibliography note |
| Defer | Evidence incomplete, source unavailable, or value low | Record in ledger as pending; stays pending until resolved |

Case-study (hands-on) additions are classified only when the practice
exercises genuinely need the feature; otherwise default to footnote or
defer.

## 3. Cite

- Follow `references/bibliography-policy.md` for the 14-day window,
  third-party tagging, and the re-fetch protocol.
- Every new or changed mechanism claim gets a citation marker resolving to a
  bibliography entry and a `fact-check.md` row (claim/source/date/verdict).
- Match new entries on URL before adding; no duplicate bibliography entries
  on re-run.

## 4. Propagate

- Propose, in the report, each step edit, new bibliography entry, fact-check
  row, and any case-study counterpart. Apply only after approval.
- Changed step files are marked `needs-review` in a way that adds review
  context; it must not erase or reset learner progress (progress is keyed
  separately from review state).
- Case-study changes are additive-only; the sole exception is documented
  freshness invalidation of existing config, which itself needs a fact-check
  row.
- Never fix the 3 planted bugs; they are teaching artifacts.

## 5. Sync and gate

- After approval, sync `site/` rendering with any curriculum data changes so
  tracks, points, and step lists stay consistent.
- Run the site gates and record exact commands and results in the report:
  `npm run lint -- --no-cache` and `npm run typecheck -- --incremental false`.
- A failing gate blocks dependent work and marks the refresh incomplete; the
  change ledger records what remains open so the next run can resume.
- Final report includes: per-source evidence table, classification table
  with stable IDs, change ledger, and gate results. Findings are reported
  before any change is applied; the default posture is audit-only until
  approval.
