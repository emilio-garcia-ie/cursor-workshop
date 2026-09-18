# Bibliography policy

Rules for `bibliography.md` and `fact-check.md` during a curriculum refresh.
The citation marker contract itself is `specs/citation-format.md`; the
fact-check row schema is `specs/fact-check-schema.md`.

## Rolling 14-day freshness window

- The freshness window is a rolling 14 days measured from the LAST
  SUCCESSFUL CONTENT VERIFICATION of each source, not from the audit date
  and not from a fixed calendar anchor.
- "Successful content verification" means substantive source text was
  retrieved and inspected for the claims it supports. A HEAD request, a
  reachable URL, or an HTTP 200 without body inspection does not reset the
  window.
- Before citing, check each entry's last verification date. Any entry older
  than 14 days must be re-verified before new claims may cite it.
- Record access dates per entry; never bulk-stamp entries that were not all
  fetched.

## Re-fetch protocol

1. List every current bibliography URL (the set is whatever exists today;
   do not assume a fixed count).
2. Re-fetch each URL, preferring the canonical URL recorded in the entry.
   Never guess or construct URLs; only fetch URLs that appear in fetched
   content or the existing bibliography.
3. Record per entry: access date, retrieval method, HTTP observation (or
   "HTTP unknown" if not visible), and the body evidence supporting or
   contradicting curriculum claims.
4. A failed fetch means the source is UNAVAILABLE, not deprecated. Do not
   infer feature removal from a timeout, rate limit, or 404 on one URL.
5. Unavailable sources block only the work that depends on them; unrelated
   findings may still be reported. Stop retrying at the timebox and record
   the blocker.
6. Reuse a prior capture read-only only when its verification date is inside
   the 14-day window and its provenance is recorded; otherwise re-fetch.
7. Update the entry's access date only for entries actually re-fetched and
   re-verified during this run.

## Third-party tagging

- Claims that are neither Cursor docs nor this repo carry `[third-party]`
  immediately after the citation marker, per `specs/citation-format.md`
  (example: `[12][third-party]`).
- Third-party sources get the same freshness treatment: 14-day rolling
  window, body-based verification, honest HTTP recording.

## Entry lifecycle and deduplication

- New entries: append with the next unused number; format matches existing
  entries (`[n] Author. "Title." Venue. URL. Accessed YYYY-MM-DD.`).
- Before adding an entry, match on URL against ALL current entries; if the
  URL exists, update that entry instead of adding a duplicate. Re-runs must
  never create duplicate bibliography entries.
- An entry whose URL is unreachable is marked unavailable/unverified in the
  refresh report; it stays in the bibliography unless a later verified
  finding justifies removal.
- Every mechanism claim added by a refresh carries at least one `[n]`
  resolving to an existing entry; every new claim gets a `fact-check.md`
  row with claim, source, checked date, and verdict (`confirmed`,
  `corrected`, or `cut`).
- Verdicts in fact-check are claim-level decisions; a source being reachable
  is not a verdict.
