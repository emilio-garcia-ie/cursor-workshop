---
step: 28
title: "Cursor in the Terminal and Headless"
points: 10
module: "Team & Scale"
versions: ["long"]
personas: ["ai-engineers", "forward-deployed"]
---

# Step 28 — Cursor in the Terminal and Headless (10 pts)

## Learn

The documented Cursor CLI executable is `agent`, with interactive sessions,
Ask/Plan modes, and non-interactive `-p`/`--print` output[22]. Do not substitute
an assumed `cursor -p` editor command. Print mode without `--force` proposes
file edits rather than applying them; `--force` permits direct file changes
without confirmation[24]. It is not necessary for this read-only kit.

Installation is platform-specific[23]. Use the official installation reference
and your organization's approval process rather than piping an unread installer
into a shell. Headless authentication can use `CURSOR_API_KEY`[24]; secret values
belong outside the repo and output artifacts. No installation or credentials
are assumed from the workshop's example MCP file.

## Implement

### Exercise kit — terminal analysis with a review gate

**Starter input:** Use a learner console checkout with a known base and clean
tracked diff. If an approved CLI is already installed, record `agent --version`
using the documented version check[23]. Otherwise submit the prompt and setup
blocker; do not claim a CLI run occurred. Read `docs/tickets/HLN-108.md` and the
export route before evaluating generated documentation.

```sh
agent -p --mode=ask "Read src/app/api/payments/export/route.ts and src/lib/csv.ts. Describe omitted columns versus explicit empty columns, response type, and validation failure status. Cite file:line. Do not edit, install, connect tools, or create remote artifacts."
```

The Ask mode and print flags above are documented[22]. Scope prompts do not
replace runtime permissions; use only approved local access.

**Worked example:** A correct answer distinguishes omitted `columns` (defaults)
from `columns=` (empty CSV), identifies `text/csv` on success and status 400 for
an invalid query, and labels sensitive defaults as a planted defect. An answer
claiming authentication or a new selection dialog is not supported by the route.

1. Run the single approved command and record exit status plus output. Check
   the cited source lines manually; command success is not answer correctness.
2. Inspect the tracked diff afterward. The deliverable is the analysis, not a
   code patch or a new automation that watches every ticket.
3. Grade the answer against the actual route and `tests/api.test.ts`. Run
   `npm test -- tests/api.test.ts` separately if dependencies are available.
4. Draft a manual pipeline: selected ticket → bounded analysis → human review
   → separately authorized learner patch → tests. Do not schedule it or push.

**Expected deliverable:** Version/setup status, one command result, verified
contract summary, and unchanged source diff. Report unavailable authentication
or execution honestly; never paste an API key into the evidence.

**Hints:** A structured output format such as JSON is documented[24], but its
presence does not make source claims correct. Validate content independently.

**Solution:** Keep the default exercise read-only and use `agent`, not the
editor launcher. Reject hallucinated endpoint guarantees and retain missing
runtime evidence. Any future `--force` run needs explicit write scope and diff
review[24], plus independently verified hook coverage for that runtime[5][31].

> Screenshot placeholder: CLI version, redacted analysis with source locations,
> exit status, and unchanged diff; never show authentication values.

## Pro tips

- Test one selected ticket before designing a batch watcher.
- Separate process success, schema validity, source accuracy, and test success.

### Common mistakes

- Using the editor's assumed `cursor -p` command in place of documented `agent`[22].
- Adding `--force` to read-only analysis or assuming output text proves no side effects[24].
- Claiming all interactive hooks and reviewers automatically gate a headless pipeline.

## Advanced

**Stretch:** Request the same analysis in JSON using `--output-format json`[24].
Compare parsing failures with substantive mistakes, and define a stop condition
for each. Do not invent SDK or ACP behavior from an uninspected navigation link.

## Complete

- [ ] Mark complete
- [ ] I got the expected outcome
