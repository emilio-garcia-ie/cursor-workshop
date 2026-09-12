# Fact-check log schema (contract for fact-check.md)

One Markdown table. One row per distinct verifiable claim. Columns:

| Step | Claim | Source | Checked | Verdict |
|------|-------|--------|---------|---------|

- `Step`: step number(s) where the claim appears.
- `Claim`: the exact assertion (≤140 chars).
- `Source`: bibliography number(s), e.g. `[4]`, or `repo` for claims verified
  against `hearthline-operator-console` (command + output recorded in row).
- `Checked`: ISO date the source was last fetched or the repo behavior run.
- `Verdict`: `confirmed` | `corrected` | `cut` (cut = claim removed from prose).

## Example

| Step | Claim | Source | Checked | Verdict |
|------|-------|--------|---------|---------|
| 3 | Rules cap at ~500 lines guidance | [4] | 2026-09-11 | confirmed |
| 11 | Sort desc returns 99200 first on seed | repo (`curl …/api/payments?sort=amount…`) | 2026-09-11 | confirmed |
