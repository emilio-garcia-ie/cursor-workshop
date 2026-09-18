---
step: 31
title: "GTM Stack"
points: 15
module: "Bonus"
versions: ["long"]
personas: ["forward-deployed", "ai-engineers"]
---

# Step 31 — GTM Stack (15 pts)

## Learn

A useful outreach brief separates who to address, what evidence supports the
message, and why the timing matters. Rules can express voice[1], skills can
package a repeatable drafting procedure[9], and approved MCP tools can provide
sources[3]. Those mechanisms do not establish a particular Gmail or Slack MCP
server, credentials, or permission to send outreach.

The Slack integration source describes Cloud Agent invocation[26], not a
verified generic Slack MCP installation. Use supplied fictional evidence here.
Do not connect accounts, scrape people, send messages, or imply sample claims
are real customer proof.

## Implement

### Exercise kit — evidence-bound first touch

**Starter input:** Crestview Properties is a fictional 120-unit manager in
Portland for this exercise, not a company discovered in the console's seed.
Use this synthetic source pack:

```text
F1 — fictional prospect note: Crestview manages 120 units and wants clearer
monthly payment reporting. No budget, purchase intent, or customer result known.
F2 — code observation: the learner console has a Payments page and a server
CSV export. Default sensitive columns are a planted defect, not a selling point.
V1 — preferred voice: short, specific, one question, no urgency or guarantees.
V2 — rejected voice: "Our proven automation will cut your costs in half today."
```

1. In a learner-only artifact, write a `hearthline-voice` skill draft with
   `name` and `description` frontmatter and a short procedure[9]. Require a
   source label for every prospect or product assertion; unknowns stay unknown.
2. Ask for a first-touch draft under 80 words using only F1/F2 and V1. Keep the
   source labels in the internal review version. Do not call email or CRM tools.
3. Grade it for factual grounding, unsupported promises, tone, and a single
   low-pressure question. Reject claims of proven savings or completed Inspections.
4. Add one counterexample: the same prospect with no reporting-interest note.
   The draft must drop that claim rather than infer it from company size.

**Worked example:** "Your sample note mentions monthly payment reporting. We
have a prototype CSV workflow we can walk through; would a short requirements
conversation be useful?" is a defensible fictional draft. "We reduced a peer's
costs by 50%" has no supporting source and must be removed, not decorated with
a fabricated citation.

**Expected deliverable:** Learner skill draft, two internally source-labeled
messages, and a grading table. F1/F2 are local fixture identifiers, not numbered
bibliography entries or evidence of real sales results. Nothing is sent.

**Hints:** Separate observed prototype behavior from a customer-ready promise.
The planted export leak means any demo needs a clear limitation and synthetic data.

**Solution:** Keep the reporting-interest sentence only when F1 supplies it;
use a requirements question when the note is absent. Include no customer proof
point unless a future approved source actually provides one.

**Stretch:** Draft a source-access checklist for a future approved integration:
owner, data scope, read/write permissions, retention, and human send approval.
Environment interpolation is supported in MCP config[3], but is not evidence
that an example endpoint is authenticated or safe.

### Common mistakes

- Citing the Slack integration as proof of a generic Slack MCP server[26].
- Treating fictional prospect notes or seeded data as real customer outcomes.
- Automatically sending a polished draft before a human checks evidence and consent.

### Pro tips

- Maintain a "must not claim" list beside the approved source pack.
- Evaluate a missing-evidence case, not only the happy-path prospect brief.

> Screenshot placeholder: fictional source pack, two draft variants, and
> rejected unsupported claims; no live contact details or account tokens.

## Complete

- [ ] Mark complete
- [ ] I got the expected outcome
