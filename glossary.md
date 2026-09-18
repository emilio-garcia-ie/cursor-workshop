# Glossary

Format contract: `specs/glossary-format.md`. Every entry links back to the
steps where it appears.

## Cents (minor units of currency)

Money stored as integers: $1,500.00 is `150000`. No floats, ever; formatting
happens only at the edge via `formatCents()`.

Appears in: [Step 2](steps/02-clone-and-run.md), [Step 3](steps/03-rules.md), [Step 14](steps/14-unreported-bug.md)

## UTC bucketing

Timestamps stored as UTC instants and converted to a property-local calendar
day only at display time, via `toPropertyLocalDay()`. Server-local dates in
logic are a bug (HLN-102).

Appears in: [Step 2](steps/02-clone-and-run.md), [Step 3](steps/03-rules.md), [Step 14](steps/14-unreported-bug.md)

## Bounded context

A domain with an explicit boundary: Property, Leasing, Operations, Payments.
Each exposes only its `index.ts`; see diagram `10-hearthline-domains`.

Appears in: [Step 2](steps/02-clone-and-run.md), [Step 10](steps/10-abstractions.md), [Step 30](steps/30-sdd-ddd.md)

## Aggregate (DDD)

A consistency boundary inside a domain (e.g. a lease with its renewals).
Change the aggregate through its root; never reach into its internals from
another domain.

Appears in: [Step 10](steps/10-abstractions.md), [Step 30](steps/30-sdd-ddd.md)

## Ubiquitous language

One shared vocabulary across code, tickets, and conversation: rent roll,
delinquency, work order, SLA. If the ticket says "rent roll" and the code
says "monthlyRevenue", rename the code.

Appears in: [Step 5](steps/05-build-a-feature.md), [Step 30](steps/30-sdd-ddd.md)

## Lease

A tenant's contract for a unit: term, monthly cents, status. ~40 active in
seed; renewals surface on the Dashboard.

Appears in: [Step 1](steps/01-day-one.md), [Step 2](steps/02-clone-and-run.md)

## Rent roll

Sum of active monthly rents in integer cents (`monthlyRentRoll()`). The
Dashboard's headline metric.

Appears in: [Step 1](steps/01-day-one.md), [Step 2](steps/02-clone-and-run.md)

## Work order

A maintenance job: title, property, status, SLA due instant. ~20 open in
seed; assignment goes through vendors.

Appears in: [Step 1](steps/01-day-one.md), [Step 18](steps/18-agents-window.md)

## SLA (Service Level Agreement)

The due instant on a work order. Past-due open orders render PAST SLA on the
Maintenance screen (`isOverdue()`, UTC compare only).

Appears in: [Step 1](steps/01-day-one.md), [Step 9](steps/09-hooks.md)

## Delinquency

Late or partial payments. Dashboard metric; the Payments screen is where
Jordan's team works them.

Appears in: [Step 1](steps/01-day-one.md), [Step 5](steps/05-build-a-feature.md)

## Occupancy

Active leases over total units, as a percentage. Forecasts projects it
forward (Maya's domain).

Appears in: [Step 1](steps/01-day-one.md), [Step 17](steps/17-plan-files.md)

## Plan Mode

Cursor mode that proposes a plan for approval before code changes[8].
Save to workspace moves a plan into the workspace; `.cursor/plans/` is this
workshop's explicitly chosen save/move destination, not an automatic default[8].

Appears in: [Step 5](steps/05-build-a-feature.md), [Step 17](steps/17-plan-files.md)

## MCP server

An external tool/data source connected via `.cursor/mcp.json`
(`mcpServers`): stdio command or remote URL, secrets via `${env:NAME}`.

Appears in: [Step 6](steps/06-mcp-github.md), [Step 24](steps/24-knowledge-graphs.md), [Step 31](steps/31-gtm-stack.md)

## Hook

A script invoked at a registered agent event: exit 0 consumes permission
JSON, exit 2 blocks, and other failures default to fail-open unless
`failClosed` applies[5]. Coverage is limited to supported Cursor events,
not every external-terminal push; cloud coverage has separate limits[5][31].

Appears in: [Step 9](steps/09-hooks.md), [Step 11](steps/11-ship.md), [Step 29](steps/29-harness.md)

## Skill

A reusable `SKILL.md` unit (name + description trigger, body on demand):
`hearthline-pr`, `spec`, `release-note`, voice skills.

Appears in: [Step 7](steps/07-first-skill.md), [Step 11](steps/11-ship.md), [Step 31](steps/31-gtm-stack.md)

## Subagent

A delegated agent with its own parent-supplied context; it inherits parent
tools and shares the checkout by default unless isolation is requested[34].
`readonly: true` restricts writes, not report errors or every inherited remote
tool; Cloud Agents are a distinct runtime surface[34][15].

Appears in: [Step 8](steps/08-org-reviewer.md), [Step 13](steps/13-workflows.md), [Step 18](steps/18-agents-window.md)

## Deterministic seed

Fixed-seed (`20260911`) generated data: identical records and identical bugs
on every boot. Anything created lasts until restart.

Appears in: [Step 2](steps/02-clone-and-run.md), [Step 22](steps/22-tdd.md)

## Custom Mode

A skill-backed mode keeps the skill in context for the session, unlike
ordinary per-message skill invocation[9][32]. Persistence is context, not
scheduling or authorization.

Appears in: [Step 7](steps/07-first-skill.md), [Step 12](steps/12-loops-goals.md)

## Projects beta

Cursor's optional shared-context product with a coordinator that delegates
implementation[36], distinct from a local repository project. The workshop
requires no provisioning.

Appears in: [Step 4](steps/04-context.md), [Step 13](steps/13-workflows.md), [Step 18](steps/18-agents-window.md), [Step 33](steps/33-improvement-loop.md)

## Worktree

An isolated Git checkout for a task; separate model context alone does not
provide one[19][34]. Cursor's UI-native flow belongs to the Agents Window;
IDE Worktree Skills and raw Git are separate workflows[19].

Appears in: [Step 7](steps/07-first-skill.md), [Step 18](steps/18-agents-window.md)

## Cloud Agent

An asynchronous VM-based agent runtime[15], not a synonym for every subagent.
Cloud hook coverage starts in writable environments and excludes early
read-only turns and local home-directory hooks[31].

Appears in: [Step 8](steps/08-org-reviewer.md), [Step 15](steps/15-slack-bot.md), [Step 18](steps/18-agents-window.md)

## My Machines and team pools

My Machines connects a personal machine; team pools queue tasks for available
workers[36]. These optional execution locations are not workshop setup requirements.

Appears in: [Step 18](steps/18-agents-window.md), [Step 26](steps/26-security.md)

## Origin

Optional hosting for Cloud Agent work without third-party source control;
Origin-hosted repositories and synced GitHub repositories have different
sources of truth[36]. This workshop retains GitHub.

Appears in: [Step 2](steps/02-clone-and-run.md), [Step 15](steps/15-slack-bot.md), [Step 18](steps/18-agents-window.md)

## Agent Review

Built-in review that can read repository `BUGBOT.md` standards and offers
Quick/Deep cost levels[20]. The workshop uses manual `/agent-review`, not
an unverified automatic-trigger or free-entitlement promise[20].

Appears in: [Step 8](steps/08-org-reviewer.md), [Step 10](steps/10-abstractions.md)

## Side chat

A local-only child conversation using parent history as hidden reference
context; it cannot nest[33]. Closing archives it, and @-mentioning it brings
its context back to the parent[33].

Appears in: [Step 10](steps/10-abstractions.md), [Step 19](steps/19-side-chats.md)

## MCP Apps

MCP responses that include interactive UI alongside tool output[3]. Protocol
support does not establish an installed or authenticated server.

Appears in: [Step 6](steps/06-mcp-github.md), [Step 24](steps/24-knowledge-graphs.md)

## Cursor Plugin

A package using `.cursor-plugin/plugin.json`, supporting agents and hooks
in addition to skills/MCP; root `plugin.json` identifies the distinct Agent
Plugin format[28][35]. Packaging is not proof of installed restrictions.

Appears in: [Step 8](steps/08-org-reviewer.md), [Step 25](steps/25-marketplace.md)

## Tab and Inline Edit

Tab suggests completions; Inline Edit targets selected code with Cmd+K or
Ctrl+K[10][11]. Project rules do not apply to either surface, so edit requests
must state relevant constraints[2].

Appears in: [Step 3](steps/03-rules.md), [Step 16](steps/16-fast-loop.md)

## Cloud subscription

Cloud-only recurring work triggered by schedules, PRs, or Slack threads in
the cited release[32]. A subscription does not supply approval to publish.

Appears in: [Step 12](steps/12-loops-goals.md), [Step 15](steps/15-slack-bot.md), [Step 33](steps/33-improvement-loop.md)

## Canvas

An interactive artifact beside chat; shared canvases are read-only teammate
snapshots with paid-plan, team, and privacy requirements[25]. A rendered
artifact does not verify its data or authorize public sharing.

Appears in: [Step 10](steps/10-abstractions.md), [Step 23](steps/23-images.md), [Step 32](steps/32-customer-canvas.md)

## Analytics API

Enterprise-only Cursor usage metrics[30], not a source for every delivery,
quality, or sales outcome. The workshop keeps those measurements in separate
worksheets and permits unavailable usage fields to remain unknown.

Appears in: [Step 10](steps/10-abstractions.md), [Step 27](steps/27-models-cost.md), [Step 33](steps/33-improvement-loop.md)

## Harness

The workshop's organizing term for instructions, context, tools, model choice,
and verification around a task, not a product-wide activation guarantee.
A component inventory must distinguish present, registered, and runtime-tested.

Appears in: [Step 29](steps/29-harness.md)
