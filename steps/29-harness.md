---
step: 29
title: "The Harness: How It All Fits"
points: 15
module: "Team & Scale"
versions: ["medium", "long"]
personas: ["ai-engineers", "forward-deployed"]
---

# Step 29 — The Harness: How It All Fits (15 pts)

## Learn

Use "harness" here to mean the instructions, supplied context, available tools,
model selection, and verification around a task. This is a workshop organizing
model, not a claim that one directory configures every runtime. Project rules
supply scoped guidance[1]; skills provide reusable instructions/resources[9];
subagents have their own context[34]; hooks respond to registered events[5].
Each can be present on disk without being active or correctly scoped.

Improve one component at a time and measure regressions. A shorter prompt is
not automatically a better harness, and a green planted-bug suite is not proof
that the agent understood a new acceptance requirement.

## Implement

### Exercise kit — evaluate a test-generation handoff

#### Starter code path

Read `.cursor/skills/test-generator/SKILL.md`,
`docs/tickets/HLN-109.md`, `tests/api.test.ts`, and the README-only
`tests/integration/`, `tests/e2e/`, and `tests/contract/` directories in your
learner copy. Inventory `.cursor/rules/`, `.cursor/agents/`, `.cursor/hooks/`,
`.cursor/hooks.json`, `.cursor/hooks.opt-in.json`, and `.cursor/mcp.example.json`.
Do not confuse scripts or examples with active registration or authenticated MCP.

```text
Design tests for HLN-109 without editing code. Read the ticket and existing
route tests first. Return input, expected result, test layer, existing coverage,
and missing implementation for each case. Preserve all planted-bug contracts.
Do not call external tools or claim README-only suites have run.
```

1. Run the bounded prompt once in a fresh learner session. Score whether it
   identifies existing empty-selection coverage, full-export versus visible-page
   scope, absent selection UI, and preserved sensitive-default behavior.
2. In a learner-owned copy of the playbook, add one concise requirement:
   "Before proposing a test, cite the existing assertion or mark it absent;
   separate characterization from new acceptance." Skills use `SKILL.md` with
   descriptive frontmatter[9]; retain the existing test-generator structure.
3. Repeat with identical source revision, prompt, and model selection. Record
   the one playbook diff and both outputs. Do not modify the shared skill.
4. Evaluate two held-out prompts: "Document existing export behavior" and
   "Explain month-end renewal policy." The first must preserve known defects;
   the second must identify uncertainty, not fabricate a tested calendar policy.

#### Expected diff

An inventory with present/registered/runtime-tested columns, one learner
playbook diff, baseline/revised/held-out scores, and a keep/revert decision.
Record actual failures and missing runtime evidence.

#### Hints

- Use a four-check rubric with source evidence, not subjective fluency.
- A malformed skill or an unavailable model is setup failure, not a poor task
  score.

#### Solution approach

A response proposing a new failing empty-selection unit test misses
`tests/csv.test.ts`. The improved response should label that case "already
covered; regression only" and identify absent browser-dialog coverage as future
work. A polished list of ten duplicate tests scores worse than three accurately
classified cases. Keep the change only if it improves coverage classification
without inventing features or weakening contracts. If the baseline already
passes all checks, report no demonstrated improvement rather than manufacturing
a gain. An example configuration remains an example until separately activated
and tested.

#### Expected result

You have a harness inventory, one learner playbook diff, matched and held-out
scores, and a keep/revert decision, and the shared `.cursor/` configuration is
unchanged.

> Screenshot placeholder: inventory activation states, single playbook diff,
> and matched/held-out score table with linked source assertions.

#### Stretch goal

Compare a human review checkpoint with an optional registered hook. Document
exactly which event it sees and what failures block[5]. Do not run a push,
install a new hook, or assume local hook coverage carries into cloud read-only
turns[31]. A measurement worksheet is sufficient for this comparison.

## Pro tips

- **Pro tip 1:** Keep evaluation fixtures outside the prompt that teaches the
  desired answer.
- **Pro tip 2:** Change one instruction at a time so a regression has an
  identifiable cause.

### Common mistakes

- **Mistake 1:** Claiming every `.cursor/` file is active enforcement.
- **Mistake 2:** Scoring generated text without checking existing assertions
  and unavailable UI.
- **Mistake 3:** Optimizing the training example while dropping held-out safety
  or scope checks.

## Advanced

The harness is an experiment with one variable at a time. A single playbook
diff compared on held-out inputs is evidence; a collection of enabled files is
not, until each is separately activated and measured.

## Quiz

#### Q1: What does the harness mean in this step?

- [ ] A single directory that configures every runtime
- [x] The instructions, supplied context, available tools, model selection, and verification around a task
- [ ] The Cursor installation folder
- [ ] A green test suite only

**Explanation:** Harness here is the instructions, supplied context, available tools, model selection, and verification around a task, not one directory.

#### Q2: Which skill does the learner read before designing tests for the ticket?

- [ ] .cursor/skills/pr/SKILL.md
- [ ] .cursor/skills/spec/SKILL.md
- [x] .cursor/skills/test-generator/SKILL.md
- [ ] .cursor/skills/release-note/SKILL.md

**Explanation:** The starter code path reads .cursor/skills/test-generator/SKILL.md and docs/tickets/HLN-109.md.

#### Q3: Why is a green planted-bug suite not proof that the agent understood a new acceptance requirement?

- [ ] Because planted bugs are removed
- [x] Because passing existing tests does not show understanding of a new requirement
- [ ] Because only Maya grades suites
- [ ] Because tests never run in this step

**Explanation:** A shorter prompt or a green existing suite is not automatically better, so understanding of a new acceptance requirement must be measured.

#### Q4: Which approach is called out as a common mistake when evaluating the generated test plan?

- [ ] Citing existing assertions in the plan
- [x] Scoring generated text without checking existing assertions and unavailable UI
- [ ] Using a four-check rubric
- [ ] Recording missing runtime evidence

**Explanation:** Scoring generated text without checking existing assertions and unavailable UI is mistake 2.

#### Q5: What must remain unchanged in the shared console after this exercise?

- [ ] The learner playbook diff
- [x] The shared .cursor/ configuration
- [ ] The held-out score table
- [ ] The inventory columns

**Explanation:** The expected result requires the shared .cursor/ configuration to remain unchanged, with only learner-owned files allowed to differ.

## Complete

- [ ] Mark complete