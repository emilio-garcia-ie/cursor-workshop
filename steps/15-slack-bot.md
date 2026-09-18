---
step: 15
title: "The Bot That Ships While You Sleep"
points: 10
module: "Bonus"
versions: ["long"]
personas: ["forward-deployed", "ai-engineers"]
---

# Step 15 — The Bot That Ships While You Sleep (10 pts)

## Learn

Mentioning `@cursor` in Slack can launch a Cloud Agent; in an existing agent
thread it can supply a follow-up[26]. Thread access is not universal authority:
**Team follow-ups** controls who may continue the agent, and Disabled limits
follow-ups to the owner[26]. Steering messages wait for the next tool call
rather than interrupting the current action[32].

Cloud-only subscriptions can watch threads, PRs, and schedules; the release
also describes agents following PRs they create[32]. This is capability, not
permission to ship without review. Early cloud read-only turns have no hooks,
and local home-directory hooks are unavailable there[31].

## Implement

### Exercise kit — a reviewed Slack handoff

**Starter input:** Use a fictional Jordan report: "Payments export includes
bank details; please investigate HLN-101." Read the actual ticket and
`src/app/api/payments/export/route.ts` in the learner copy. This kit defaults
to an **offline draft**. An installed Slack app, eligible tenant, billing,
repository access, and administrator approval are prerequisites for an
optional live run[26]; none is assumed from a config example.

```text
@cursor autopr=false Investigate HLN-101 in the approved learner repository.
Read the ticket and export route. Return file:line evidence, missing inputs,
and a proposed test. Do not edit, create a PR, push, send messages elsewhere,
or schedule recurring work. Stop after the diagnosis for human review.
```

**Worked example:** The expected diagnosis traces omitted `columns` to
`DEFAULT_EXPORT_COLUMNS` in `src/domains/payments/export.ts`, which contains
`bank_account_last4` and `routing_number`. A reply that promises a browser-only
CSV fix misses the ticket's server-side, beyond-visible-page requirement.

**Expected deliverable:** A handoff worksheet with requester, approved repo
and base branch, allowed action, expected output, stop condition, and reviewer.
For a live run, also record selected runtime and the observed follow-up policy;
for the offline path mark those fields "not tested".

**Hints:** Explicit repository and branch selection avoids relying on recent
agent activity[26]. The documented `autopr=false` option disables automatic
PR creation[26]; still inspect actual run behavior rather than trusting prose.

**Solution:** Approve only the diagnosis artifact. A later authorized repair
belongs on a learner branch with HLN-101 tests and human review. Do not turn a
successful answer into permission for a subscription or production change.

**Stretch:** Draft one scope-preserving steering message: "Also distinguish
omitted columns from an explicit empty selection." If a live run is approved,
observe its handling at the next tool call[32]; do not simulate a successful
remote run in the evidence log.

### Common mistakes

- Assuming anyone who can read a Slack thread can direct its agent[26].
- Treating a Slack integration as a generic Slack MCP server configuration.
- Letting an unattended PR workflow change the shared workshop's planted bugs.

### Pro tips

- Keep diagnosis and write authorization as separate handoffs with named reviewers.
- Record the selected environment; prompts can name environments, workers, and
  team pools, but the workshop does not require any of them[26].

Optional hosting note: Cloud Agents can start without third-party source
control and save work in Origin[36]. Keep this workshop's existing GitHub
case-study choice; do not migrate or create a new hosted repo for this kit.

> Screenshot placeholder: redacted approved handoff and diagnosis, or the
> offline worksheet clearly labeled "Slack runtime not tested".

## Complete

- [ ] Mark complete
- [ ] I got the expected outcome
