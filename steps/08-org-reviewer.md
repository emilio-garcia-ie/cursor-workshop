---
step: 8
title: "Subagents: Your Org-Standards Reviewer"
points: 20
module: "Guardrails"
versions: ["short", "medium", "long"]
personas: ["developers", "ai-engineers", "forward-deployed"]
---

# Step 8 — Subagents: Your Org-Standards Reviewer (20 pts)

## Learn

A subagent handles a delegated task in its own context, with a report back
to the parent. That separation buys focus, not automatic permission isolation:
subagents inherit parent tools, including MCP, and share the checkout by
default unless isolation is requested[34]. `readonly: true` restricts file
edits and state-changing shell commands; it does not make a report correct
or certify every inherited remote tool[34]. Cloud Agents are a distinct
asynchronous VM-based surface, not the source for this file schema[15].

## Implement

1. Run `/agent-review` manually on the feature checkout[20]. Agent Review
   reads repository `BUGBOT.md` rules and offers **Quick** and **Deep** depths
   with different cost levels[20]. Do not assume a free entitlement or that
   it is necessarily ignorant of organization standards. No `BUGBOT.md`
   addition is required for this exercise; record which rules exist.
2. Read `docs/ORG-STANDARDS.md`, `.cursor/agents/bug-investigator.md`, and
   the existing `.cursor/agents/org-standards.md` starter.
3. In the tooling worktree, replace the starter's prose-only permission
   bullets with real YAML frontmatter using `readonly: true`[34]. Require a
   standard item, file, line, evidence, and suggested fix for each finding.
4. Open the tooling worktree as the Cursor project so its reviewer definition
   is in project scope[34], then request review of the feature checkout's diff
   by absolute path. If access is unavailable, record that blocker rather
   than silently reviewing the tooling diff. Fix accepted findings in the
   feature's parent session only after human review.

### Exercise kit

#### Starter code path

`hearthline-operator-console/.cursor/agents/org-standards.md` and
`docs/ORG-STANDARDS.md`. The starter's `- readonly: true` bullet is prose,
not YAML frontmatter. Save the actual configuration in the tooling worktree;
leave the standards source intact.

#### Minimal working example

The documented project location is `.cursor/agents/`, with Markdown body
and YAML frontmatter[34]. Use this minimal reviewer definition:

```markdown
---
name: org-standards
description: Review a specified Hearthline diff against numbered organizational standards; report findings without fixing them.
model: inherit
readonly: true
---
Read docs/ORG-STANDARDS.md and the specified diff in the supplied checkout.
For each finding give standard number, file:line, observed evidence,
impact, suggested fix, and uncertainty. Do not invent test execution.
Report missing evidence separately. Do not edit files or request remote writes.
```

Use this parent request rather than assuming the reviewer sees the full
conversation[34]:

```text
Delegate to org-standards. Review the HLN-101 diff in the feature checkout
at the absolute path I supply, against docs/ORG-STANDARDS.md.
Read working, staged, and committed changes as needed. Report only.
Do not fix HLN-102. Return evidence and unresolved questions to this session.
```

#### Expected diff

Only the reviewer's frontmatter and bounded instructions in the tooling
branch. The review run must not change feature files. Compare
`git status --short` and `git diff` in both checkouts before and after;
pre-existing edits must remain intact.

#### Hints

- Check standard numbers against the document; plausible numbering is not
  evidence. Inspect each cited line in the current diff.
- `model: inherit` avoids naming a model unavailable to your team; actual
  model availability remains plan/admin-dependent[34].
- Separate “not checked” from “no finding.” A review without test output
  cannot truthfully report tests passed.

#### Solution approach

Validate discovery and frontmatter, run the bounded review, then inspect
every finding yourself. For a restriction probe, use a disposable learner
checkout containing a throwaway file: ask the reviewer to edit that file.
Expected: the readonly restriction prevents the edit[34]. Record the tool
result and verify the file stayed unchanged; if it changes, stop and report
the failed restriction test. Do not probe with real data or remote tools.
A request the model simply declines is not proof a tool-level restriction ran.

#### Expected result

An evidence-backed report, no reviewer-written feature diff, and a clearly
labeled restriction result: observed block, failed restriction, or not
exercised. Source support alone is not runtime acceptance.

[SCREENSHOT: Reviewer configuration and numbered finding with file:line evidence; separate unchanged-file restriction check]

#### Stretch goal

Compare Quick Agent Review with the custom reviewer on the same diff and
available standards[20]. Classify true findings, false positives, and missing
evidence; do not equate a longer report with a better one.

### Common mistakes

- **Mistake 1:** Writing `readonly` as a Markdown bullet. Use the documented
  YAML boolean in frontmatter[34].
- **Mistake 2:** Assuming built-in review cannot use team standards. It reads
  `BUGBOT.md`; compare actual inputs rather than a generic/custom label[20].
- **Mistake 3:** Trusting a report because the agent cannot edit. Verify the
  reasoning and cited evidence independently.

## Pro tips

- **Pro tip 1:** Give each finding an evidence requirement and each missing
  check an explicit unverified label.
- **Pro tip 2:** Hand off the checkout path and diff scope, not “review what
  we did.” Separate context needs explicit task input[34].
- Choose review depth and models against task complexity and available
  budget; measure useful findings rather than assuming cost buys accuracy[13][20].

## Advanced

Written standards become reviewable criteria, not automatically enforced
truth. Readonly restricts writes; it does not validate conclusions[34]. A
parent must still inspect the report before authorizing fixes. Separate
context is also not a separate checkout by default[34]. Packaged plugin
agents have their own reference format[35]; do not assume this local
restriction test proves readonly survives packaging and another user's
installation. That integration remains outside this kit.

## Complete

- [ ] Mark complete
- [ ] I got the expected outcome
