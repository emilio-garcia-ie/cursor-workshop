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

#### Starter code path

Use a learner console checkout with a known base and clean tracked diff. If an
approved CLI is already installed, record `agent --version` using the documented
version check[23]. Otherwise submit the prompt and setup blocker; do not claim a
CLI run occurred. Read `docs/tickets/HLN-108.md` and the export route before
evaluating generated documentation.

```sh
agent -p --mode=ask "Read src/app/api/payments/export/route.ts and src/lib/csv.ts. Describe omitted columns versus explicit empty columns, response type, and validation failure status. Cite file:line. Do not edit, install, connect tools, or create remote artifacts."
```

The Ask mode and print flags above are documented[22]. Scope prompts do not
replace runtime permissions; use only approved local access.

1. Run the single approved command and record exit status plus output. Check
   the cited source lines manually; command success is not answer correctness.
2. Inspect the tracked diff afterward. The deliverable is the analysis, not a
   code patch or a new automation that watches every ticket.
3. Grade the answer against the actual route and `tests/api.test.ts`. Run
   `npm test -- tests/api.test.ts` separately if dependencies are available.
4. Draft a manual pipeline: selected ticket → bounded analysis → human review
   → separately authorized learner patch → tests. Do not schedule it or push.

#### Expected diff

Version/setup status, one command result, verified contract summary, and
unchanged source diff. Report unavailable authentication or execution honestly;
never paste an API key into the evidence.

#### Hints

- A structured output format such as JSON is documented[24], but its presence
  does not make source claims correct.
- Validate content independently.

#### Solution approach

A correct answer distinguishes omitted `columns` (defaults) from `columns=`
(empty CSV), identifies `text/csv` on success and status 400 for an invalid
query, and labels sensitive defaults as a planted defect. An answer claiming
authentication or a new selection dialog is not supported by the route. Keep
the default exercise read-only and use `agent`, not the editor launcher. Reject
hallucinated endpoint guarantees and retain missing runtime evidence. Any future
`--force` run needs explicit write scope and diff review[24], plus independently
verified hook coverage for that runtime[5][31].

#### Expected result

You have a recorded CLI analysis with verified source citations, an unchanged
tracked diff, and an honest setup/version report, and no file was edited or
credential exposed.

> Screenshot placeholder: CLI version, redacted analysis with source locations,
> exit status, and unchanged diff; never show authentication values.

#### Stretch goal

Request the same analysis in JSON using `--output-format json`[24]. Compare
parsing failures with substantive mistakes, and define a stop condition for
each. Do not invent SDK or ACP behavior from an uninspected navigation link.

## Pro tips

- **Pro tip 1:** Test one selected ticket before designing a batch watcher.
- **Pro tip 2:** Separate process success, schema validity, source accuracy, and
  test success.

### Common mistakes

- **Mistake 1:** Using the editor's assumed `cursor -p` command in place of
  documented `agent`[22].
- **Mistake 2:** Adding `--force` to read-only analysis or assuming output text
  proves no side effects[24].
- **Mistake 3:** Claiming all interactive hooks and reviewers automatically gate
  a headless pipeline.

## Advanced

A headless pipeline is still a human-reviewed process. Automating the command
does not automate the review gate, and a passing exit status is not a passing
answer; keep the two separate in every draft pipeline.

## Quiz

#### Q1: What is the documented Cursor CLI executable for non-interactive output?

- [ ] cursor -p
- [x] agent with -p/--print
- [ ] code --print
- [ ] cursor --cli

**Explanation:** The documented executable is agent, with interactive sessions, Ask/Plan modes, and non-interactive -p/--print output.

#### Q2: Which ticket does the CLI analysis read before evaluating generated documentation?

- [ ] HLN-101
- [ ] HLN-103
- [x] HLN-108
- [ ] HLN-109

**Explanation:** The starter code path reads docs/tickets/HLN-108.md and the export route before evaluating generated documentation.

#### Q3: Why does a successful exit status not prove the CLI answer is correct?

- [ ] Because the CLI always returns exit 0
- [x] Because process success and source accuracy are separate checks
- [ ] Because HLN-108 is unrelated to the route
- [ ] Because the model never reads files

**Explanation:** Command success is not answer correctness, so the cited source lines must be verified manually.

#### Q4: Which command substitution is a documented mistake in this step?

- [ ] agent -p --mode=ask
- [ ] agent -p --mode=plan
- [x] cursor -p instead of the documented agent executable
- [ ] agent --version

**Explanation:** Using the editor's assumed cursor -p command in place of the documented agent executable is mistake 1.

#### Q5: What must remain true about the tracked diff after the CLI analysis?

- [ ] It shows a new automation file
- [x] It is unchanged, because the deliverable is the analysis, not a patch
- [ ] It contains the exported CSV
- [ ] It must include --force edits

**Explanation:** The expected result keeps the tracked diff unchanged and delivers the analysis, not a code patch or new automation.

## Complete

- [ ] Mark complete