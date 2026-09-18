---
step: 4
title: "Context: What Cursor Remembers"
points: 20
module: "Foundations"
versions: ["medium", "long"]
personas: ["developers", "data-scientists", "ai-engineers", "forward-deployed"]
---

# Step 4 — Context: What Cursor Remembers (20 pts)

## Learn

Context is the evidence and instructions available for this task, not a
promise that the agent remembers the whole repository. Applied rule contents
are included at the start of model context[1]. Skills load progressively[9];
subagents receive their own context supplied by the parent[34]. Decide what
each task needs rather than attaching the entire onboarding tour.

Category details (what fills it, how to keep it small):

- **System prompt** — fixed overhead. Budget around it.
- **Tools** — built-ins plus MCP servers. Toggle unused MCP servers off in
  Customize[3][6]. A CLI may simplify one task, but commands and output still
  become task context; do not budget them as free.
- **Rules** — `alwaysApply` rules attach broadly; scoped rules attach on
  match[1]. This is why Step 3 preferred globs.
- **Skills / subagents** — skill descriptions support discovery and bodies
  load when invoked[9]. A subagent needs a bounded handoff of its own[34].
- **Conversation** — prompts, replies, files read, and command output.
  Keep a compact task handoff rather than assuming old details stay usable.
- **Free space** — leave room for the next investigation and its evidence.
  Measure the result instead of inferring quality from a meter alone.

## Implement

After the exploring you just did, take stock of the session: what is taking
up space right now, and what from the tour can go? Start a fresh chat for the
next task. Carry forward the decisions and evidence the next task needs,
not an assumed cost multiplier for every old message.

### Exercise kit

#### Starter code path

`hearthline-operator-console/docs/tickets/HLN-101.md`,
`src/app/api/payments/export/route.ts`, `src/domains/payments/export.ts`,
and `src/lib/csv.ts`. These four files are a deliberately small evidence set.

#### Minimal working example

Open the sidepanel with `Cmd+I` / `Ctrl+I`[12]. Use this prompt in a fresh
chat, explicitly attaching the four files above:

```text
Explain the export column flow using only these four files.
Do not edit. Distinguish omitted columns from an explicitly empty selection.
Return a file:line reference for each conclusion and list missing evidence.
Do not infer table pagination behavior from the CSV helper.
```

Repeat in a separate fresh chat with only the ticket attached. Keep the
question and model the same. Ask for missing evidence before allowing more
reads. This tests evidence sufficiency, not which model sounds confident.

#### Expected diff

None in application or configuration files. Keep an A/B table in chat:
inputs supplied, additional files actually read, unsupported conclusions,
and whether the empty-selection question was answered correctly.

#### Hints

- Being present on disk is not proof a file was read. Inspect file reads
  and the cited passages before accepting the answer.
- A ticket-only response should identify missing implementation evidence;
  a confident implementation claim without a read is a failure.
- If the agent reads outside the allowed set, record the deviation. Do not
  describe that run as a successful restricted-context experiment.

#### Solution approach

Trace the omitted-column default, the explicit selection, and the CSV
output using the four-file run. For the ticket-only run, accept a statement
of requirements plus a request to inspect the implementation. Compare
correctness and scope first; record token usage only if the UI supplies it.

#### Expected result

A compact handoff that identifies its evidence and uncertainty. No claimed
indexing exclusion, access control, or percentage saving follows from this
experiment; asking not to read a file is not a security boundary.

[SCREENSHOT: Four-file context selection and A/B evidence table, including one missing-evidence response]

#### Stretch goal

Remove `src/lib/csv.ts` from the first prompt. Can the agent explain the
route's selection parsing while honestly declining to prove CSV quoting?

### Common mistakes

- **Mistake 1:** Attaching all of `src` for a four-file question. Start small
  and let a demonstrated evidence gap justify the next read.
- **Mistake 2:** Calling a file reference proof of retrieval. Open the cited
  passage and verify that it supports the conclusion.
- **Mistake 3:** Carrying the answer between A/B chats. Keep the experiments
  independent or mark the comparison contaminated.

## Pro tips

- **Pro tip 1:** Preserve a decision/evidence handoff, not the whole tour.
- **Pro tip 2:** Ask “what could you not establish?” before asking for edits.

- Check context before starting anything large; clear between unrelated tasks.
- Point at specific files with `@` instead of broad "explore the repo".
- Name sessions you will return to instead of keeping them open all day.
- Review what MCP servers cost you and disconnect the idle heavy ones[3].

## Advanced

The architecture map from Step 2 can become an onboarding artifact, but
it can still go stale: retain the file references and recheck them after
changes. Measure your own context experiment rather than assuming a 2–3x
saving; model choice and plan affect usage costs[13]. Skill `paths` scopes
discovery to matching files, and nested project
skills can scope to their directory; neither implies every personal skill
follows a remote session[9].

Optional distinction: Cursor **Projects beta** maintains shared context and
uses a coordinator that delegates implementation[36]. That named product
is different from this repository project. The local four-file exercise
requires no Projects provisioning.

## Complete

- [ ] Mark complete
- [ ] I got the expected outcome
