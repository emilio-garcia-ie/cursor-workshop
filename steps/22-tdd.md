---
step: 22
title: "Test-Driven Agentic Development"
points: 10
module: "Debug & Test"
versions: ["medium", "long"]
personas: ["developers", "ai-engineers"]
---

# Step 22 — Test-Driven Agentic Development (10 pts)

## Learn

TDD with an agent: the test is the prompt. Write, run, fail, hand to the
agent, pass. The test is a specification the agent can read — precise where
prose is vague.

## Implement

1. Write the failing test (HLN-101 criterion, already pinned in this repo's
   `tests/csv.test.ts` — read it first):

```ts
expect(toCSV([{ id: "pay-0001" }], [])).toBe("");
```

   Empty selection returns an empty file, not a header-only file.
2. Hand it to the agent: "Make this test pass. Do not change the test."
3. Verify. Read the minimal implementation.
4. Repeat with the second criterion: column order in the output matches the
   requested order.

## Pro tips

- One behavior per test. The agent fixes what the test names.
- Keep the repo's suite green throughout — the push hook enforces it anyway.

## Advanced

TDD as harness verification: the suite is the executable half of your
standards doc. Every standard with a test is enforced; every standard
without one is a wish.

## Complete

- [ ] Mark complete
- [ ] I got the expected outcome
