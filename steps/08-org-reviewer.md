---
step: 8
title: "Subagents: Your Org-Standards Reviewer"
points: 15
module: "Guardrails"
versions: ["short", "medium", "long"]
personas: ["developers", "ai-engineers", "forward-deployed"]
---

# Step 8 — Subagents: Your Org-Standards Reviewer (15 pts)

## Learn

A subagent is a separate session: own context, own permissions. That
separation is the point — focus, specialization, safety. Background agents
extend the same idea to async and parallel work[15].

## Implement

1. Free first pass: run the built-in review on your branch (generic — it
   knows nothing of cents or UTC)[20].
2. Read `docs/ORG-STANDARDS.md` and `.cursor/agents/bug-investigator.md`.
3. Create `.cursor/agents/org-standards.md` (`readonly: true`): cite standard
   item number, file, line, and fix for each finding. Read-only tools only.
4. Run it on `HLN-101-export-options`. Fix findings in the main session —
   the reviewer reports, it never edits.

## Pro tips

- Agents cost name + description until invoked.
- Cheap models for mechanical review passes; frontier for HLN-102 diagnosis[13].
- Stop runaway background work explicitly; don't just look away[15].

## Advanced

Written standards become enforced standards. Read-only is a design decision:
a reviewer that can't edit can't smuggle in changes — its report is
trustworthy. Context isolation scales to multi-specialist reviews
(security, performance, standards) running in parallel[15].

## Complete

- [ ] Mark complete
- [ ] I got the expected outcome
