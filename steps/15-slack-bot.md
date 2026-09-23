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

#### Starter code path

Use a fictional Jordan report: "Payments export includes bank details; please
investigate HLN-101." Read the actual ticket and
`src/app/api/payments/export/route.ts` in the learner copy. This kit defaults
to an **offline draft**. An installed Slack app, eligible tenant, billing,
repository access, and administrator approval are prerequisites for an
optional live run[26]; none is assumed from a config example. Drive the
diagnosis with:

```text
@cursor autopr=false Investigate HLN-101 in the approved learner repository.
Read the ticket and export route. Return file:line evidence, missing inputs,
and a proposed test. Do not edit, create a PR, push, send messages elsewhere,
or schedule recurring work. Stop after the diagnosis for human review.
```

#### Expected diff

A handoff worksheet with requester, approved repo and base branch, allowed
action, expected output, stop condition, and reviewer. For a live run, also
record selected runtime and the observed follow-up policy; for the offline
path mark those fields "not tested".

#### Hints

- Explicit repository and branch selection avoids relying on recent agent activity[26].
- The documented `autopr=false` option disables automatic PR creation[26]; still inspect actual run behavior rather than trusting prose.
- Trace omitted `columns` to `DEFAULT_EXPORT_COLUMNS` before trusting a browser-only answer.

#### Solution approach

The expected diagnosis traces omitted `columns` to `DEFAULT_EXPORT_COLUMNS`
in `src/domains/payments/export.ts`, which contains `bank_account_last4` and
`routing_number`. A reply that promises a browser-only CSV fix misses the
ticket's server-side, beyond-visible-page requirement. Approve only the
diagnosis artifact. A later authorized repair belongs on a learner branch with
HLN-101 tests and human review. Do not turn a successful answer into permission
for a subscription or production change.

#### Expected result

You have the completed handoff worksheet with requester, approved repo,
allowed action, and stop condition, and the diagnosis artifact is the only
output approved for review.

> Screenshot placeholder: redacted approved handoff and diagnosis, or the
> offline worksheet clearly labeled "Slack runtime not tested".

#### Stretch goal

Draft one scope-preserving steering message: "Also distinguish omitted columns
from an explicit empty selection." If a live run is approved, observe its
handling at the next tool call[32]; do not simulate a successful remote run in
the evidence log.

### Common mistakes

- **Mistake 1:** Assuming anyone who can read a Slack thread can direct its agent[26].
- **Mistake 2:** Treating a Slack integration as a generic Slack MCP server configuration.
- **Mistake 3:** Letting an unattended PR workflow change the shared workshop's planted bugs.

### Pro tips

- **Pro tip 1:** Keep diagnosis and write authorization as separate handoffs with named reviewers.
- **Pro tip 2:** Record the selected environment; prompts can name environments, workers, and team pools, but the workshop does not require any of them[26].

Optional hosting note: Cloud Agents can start without third-party source
control and save work in Origin[36]. Keep this workshop's existing GitHub
case-study choice; do not migrate or create a new hosted repo for this kit.

## Quiz

#### Q1: What controls who may continue a Cloud Agent in an existing Slack thread?

- [ ] Anyone who can read the thread
- [x] The Team follow-ups setting, where Disabled limits follow-ups to the owner
- [ ] The repository branch name
- [ ] The Slack workspace administrator only

**Explanation:** Thread access is not universal authority; Team follow-ups controls who may continue the agent, and Disabled limits follow-ups to the owner.

#### Q2: Where does the expected diagnosis find the sensitive default columns?

- [ ] In the browser-visible CSV
- [x] In `DEFAULT_EXPORT_COLUMNS` inside `src/domains/payments/export.ts`
- [ ] In the Slack thread settings
- [ ] In `src/app/api/payments/export/route.ts` only

**Explanation:** The diagnosis traces omitted `columns` to `DEFAULT_EXPORT_COLUMNS` in `src/domains/payments/export.ts`, which contains `bank_account_last4` and `routing_number`.

#### Q3: Why is a browser-only CSV answer insufficient for Jordan's HLN-101 report?

- [ ] Because browsers cannot download CSV files
- [ ] Because the ticket requires a Slack reply
- [x] Because the sensitive columns come from the server-side default export selection beyond the visible page
- [ ] Because Jordan only accepts screenshots

**Explanation:** The omitted columns trace to a server-side default export list, so the diagnosis must address the beyond-visible-page requirement.

#### Q4: Why is it a mistake to assume anyone who can read a Slack thread can direct its agent?

- [ ] Because reading a thread is always allowed
- [x] Because Team follow-ups controls continuation, and Disabled limits follow-ups to the owner
- [ ] Because agents ignore Slack messages
- [ ] Because threads are deleted after one reply

**Explanation:** Thread access is not universal authority, so read access does not grant permission to continue the agent.

#### Q5: For the offline path, what must the handoff worksheet record for runtime fields?

- [ ] The live run's console output
- [x] Mark them not tested, and approve only the diagnosis artifact
- [ ] A simulated successful remote run
- [ ] The real worker and team pool names

**Explanation:** For the offline path, runtime fields are marked not tested and the diagnosis artifact is the only output approved for review.

## Complete

- [ ] Mark complete
