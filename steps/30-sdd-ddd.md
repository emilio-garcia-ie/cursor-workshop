---
step: 30
title: "SDD + DDD: Spec Before Code, Boundaries Before Spec"
points: 10
module: "Team & Scale"
versions: ["long"]
personas: ["developers", "ai-engineers"]
---

# Step 30 — SDD + DDD: Spec Before Code, Boundaries Before Spec (10 pts)

## Learn

For this workshop, spec-driven development makes acceptance explicit before
implementation; domain boundaries determine where that behavior belongs.
The console's `.cursor/rules/boundaries.mdc` names Property, Leasing,
Operations, and Payments and requires cross-domain use of public `index.ts`
APIs. Additional placeholder domains do not imply implemented runtime services.
Project rules provide scoped guidance[1], not an automatic guarantee of correct
architecture or a universal claim that agent context is "flat".

HLN-103 requests a spec for recurring inspections as a new domain. It mentions
an existing job runner; the inspected source does not establish such a runner.
Treat its identity/interface as an unresolved prerequisite, not permission to
invent a cron API or silently add infrastructure.

## Implement

### Exercise kit — an implementable boundary decision

**Starter input:** Read `docs/tickets/HLN-103.md`,
`.cursor/rules/boundaries.mdc`, `.cursor/skills/spec/SKILL.md`, and the public
Property, Leasing, and Operations indexes. Use the existing spec playbook as
reference; do not assume this legacy file has valid skill frontmatter or that
an automatic invocation occurred. Create artifacts only in a learner copy.

```text
Draft specs/inspections/requirements.md, design.md, and tasks.md for HLN-103.
Inspections is a new domain. Cite actual public integration points and distinguish
proposed APIs from existing exports. Identify the job runner as unresolved unless
you find its implementation. Include recurrence, duplicate-run, timezone, and
approval decisions. Do not implement, schedule jobs, or change the shared baseline.
```

**Worked example:** "Create a quarterly inspection" is ambiguous without a
calendar anchor, property timezone, and duplicate-run policy. A useful proposed
contract specifies a stable occurrence identity such as property + schedule +
due day; that is a design proposal, not an existing schema. It must state what
happens when the same scheduled event is processed twice.

1. Write requirements with observable outcomes and explicit open decisions.
   Distinguish move-in/out events from quarterly/annual recurrence.
2. Draw an import-direction table: proposed Inspections owns inspection state;
   other domains are accessed through public indexes. List missing public APIs
   as proposed changes rather than importing internal services.
3. Write tasks mapped to acceptance criteria, each with input, expected diff,
   test, and stop condition. Block scheduler integration until its real contract
   or an approved replacement design is available.
4. Ask the reviewer to check only the spec and boundary map. Resolve unsupported
   assumptions in the files; stop before implementation approval.

**Expected deliverable:** Three learner spec files, an integration map, test
matrix, and unresolved-prerequisite list. No domain implementation, cron job,
new dependency, or planted-bug repair belongs in this exercise.

**Hints:** Read exports rather than guessing from a domain name. Requirements
can be precise while leaving a dependency blocked; that is better than fake code.

**Solution:** A defensible design keeps Inspections separate, proposes tests for
one occurrence, duplicate delivery, and property-local scheduling, and refuses
to fabricate the job runner. Tasks independent of that runner can be reviewed;
implementation remains gated on explicit approval and resolved contracts.

> Screenshot placeholder: requirement-to-task map beside public-domain imports
> and the visibly unresolved scheduler dependency.

## Pro tips

- Mark each API as existing or proposed in the design itself.
- Resolve acceptance changes in the spec before asking a worker to code around them.

### Common mistakes

- Implementing immediately despite the spec playbook's approval gate.
- Importing another domain's internal service because its public API is inconvenient.
- Treating a ticket's "existing job runner" phrase as proof of an available implementation.

## Advanced

**Stretch:** Compare a rejected design that puts Inspections inside Property
with the separate-domain proposal. Explain ownership, duplicate prevention,
and integration tradeoffs using actual exports; avoid claiming rules alone
will enforce the chosen architecture[1].

## Complete

- [ ] Mark complete
- [ ] I got the expected outcome
