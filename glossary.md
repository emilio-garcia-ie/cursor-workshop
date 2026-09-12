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

Cursor mode that proposes a plan for approval before code changes. Plans can
be saved to `.cursor/plans/` and referenced later.

Appears in: [Step 5](steps/05-build-a-feature.md), [Step 17](steps/17-plan-files.md)

## MCP server

An external tool/data source connected via `.cursor/mcp.json`
(`mcpServers`): stdio command or remote URL, secrets via `${env:NAME}`.

Appears in: [Step 6](steps/06-mcp-github.md), [Step 24](steps/24-knowledge-graphs.md), [Step 31](steps/31-gtm-stack.md)

## Hook

A script the agent loop runs before/after an event. `beforeShellExecution`
with exit code 2 blocks (e.g. push on red tests).

Appears in: [Step 9](steps/09-hooks.md), [Step 11](steps/11-ship.md), [Step 29](steps/29-harness.md)

## Skill

A reusable `SKILL.md` unit (name + description trigger, body on demand):
`hearthline-pr`, `spec`, `release-note`, voice skills.

Appears in: [Step 7](steps/07-first-skill.md), [Step 11](steps/11-ship.md), [Step 31](steps/31-gtm-stack.md)

## Subagent

A separate agent session with own context and permissions; background agents
run it async/parallel. Reviewers stay read-only.

Appears in: [Step 8](steps/08-org-reviewer.md), [Step 13](steps/13-workflows.md), [Step 18](steps/18-agents-window.md)

## Deterministic seed

Fixed-seed (`20260911`) generated data: identical records and identical bugs
on every boot. Anything created lasts until restart.

Appears in: [Step 2](steps/02-clone-and-run.md), [Step 22](steps/22-tdd.md)
