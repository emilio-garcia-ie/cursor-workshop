---
step: 1
title: "Day One: Meet the Team"
points: 5
module: "Foundations"
versions: ["short", "medium", "long"]
personas: ["vibecoders", "developers", "data-scientists", "ai-engineers", "forward-deployed"]
---

# Step 1 — Day One: Meet the Team (5 pts)

## The project

**Track contract:** `../tracks.md` is the source of truth for version and
persona picker membership. Frontmatter `versions` mirrors those version sets;
retained `personas` arrays describe instructional emphasis, not picker metadata.
Where emphasis differs, use the canonical track: visible steps are the selected
version intersected with the selected persona, including long. Emphasis does
not add a step to a track or change its points.

Hearthline is a residential property management platform in Austin, Texas —
~40 people, Series A, ~200 property-management customers. The product you
will work in is called **the operator console**: the internal tool staff use
to watch money move for small businesses that collect rent.

The console has five screens. Click each one before you meet anyone:

- **Dashboard** — occupancy, delinquency, upcoming renewals, open work orders
- **Properties** — searchable list of properties, drill into units
- **Payments** — every payment, searchable, with export. Your first ticket lives here
- **Maintenance** — work orders, vendor assignment, SLA tracking
- **Forecasts** — occupancy and revenue projections (Maya's domain)

One screen does **not** exist yet: **Inspections** (scheduled inspections
with checklists and photos). Building it is the Build Battle at the end.

## Implement

Welcome to Hearthline. You joined the team that owns the operator console.

- **Priya Raman**, engineering lead. Hands you a ticket on day one and expects
  shipment. Particular about PR format. Prefers specs before code.
- **Jordan Osei**, head of customer operations. Her team lives in the console.
  She files the real complaints and notices patterns nobody else does.
- **Maya Chen**, data scientist. Builds Forecasts. Uses notebooks and Python.
  Curious how Cursor handles non-web code.

How this team works (Priya keeps it short):

1. Read `.cursor/rules/root.mdc`, then `.cursor/rules/money.mdc` and
   `.cursor/rules/time.mdc`. Project rules live in `.cursor/rules` as
   `.mdc` files and are version-controlled[1].
2. Tickets live in `docs/tickets/`. Yours (HLN-101) has your name on it.
3. Questions: ping Priya. Good luck.

### From a request to a boundary

Jordan describes a problem; Priya turns it into acceptance criteria. Your
job is not to improve every nearby payment function. It is to make the
requested change and show evidence that it works. HLN-101 is the export
options ticket; money and time conventions are constraints on that work,
not permission to repair every planted bug during onboarding.

If the app is not running yet, use the source tour here and do the screen
click-through after Step 2. Open the Agent sidepanel with `Cmd+I` on macOS
or `Ctrl+I` on Windows/Linux[12]. Give it a bounded first request:

```text
Read docs/tickets/HLN-101.md and .cursor/rules/root.mdc.
Do not edit or run setup. Tell Priya:
1. What Jordan needs.
2. Which acceptance criteria define done.
3. What the ticket explicitly says about server-side export.
Cite the file and passage for each answer; flag anything you cannot verify.
```

### Exercise kit

#### Starter code path

`hearthline-operator-console/docs/tickets/HLN-101.md`, alongside
`hearthline-operator-console/.cursor/rules/root.mdc`, `money.mdc`, and
`time.mdc`. These are your inputs, not files to rewrite today.

#### Expected diff

None. Keep a three-line handoff in chat. Run `git status --short` in your
learner console checkout before and after; existing changes should remain
unchanged. Priya asked for understanding before implementation.

#### Hints

- Separate the requester from the reviewer: Jordan owns the complaint;
  Priya owns the shipment conversation.
- Read the ticket's Notes as carefully as its checkboxes.
- If the agent adds a requirement, ask which passage supports it.

#### Solution approach

Read the ticket yourself, compare its four acceptance criteria with the
agent's summary, and correct any invented scope. Name the export route as
an investigation starting point, not a solution you have already verified.

#### Expected result

You have a three-line handoff that covers selectable columns, sensitive
fields excluded by default, requested order, and an empty file for empty
selection, and it explains why exporting only the visible table page is
insufficient.

[SCREENSHOT: HLN-101 beside the three-line handoff, with the server-side export note visible]

### Common mistakes

- **Mistake 1:** Starting with edits. Today the deliverable is an accurate
  handoff, not a surprise feature branch.
- **Mistake 2:** Treating the model's summary as the ticket. Check every
  criterion against the source before saying you understand it.
- **Mistake 3:** Fixing a nearby sort anomaly immediately. Record it as the
  unreported sort finding for Step 14, not HLN-102. The actual HLN-102 ticket
  concerns monthly totals and permits diagnosis only; keep this request
  traceable to HLN-101.

### Working habits

- **Pro tip 1:** Ask for an explicit “not in scope” sentence before coding.
- **Pro tip 2:** Keep the business request and the engineering constraint
  together; either alone makes an incomplete handoff.

#### Stretch goal

Explain the same ticket once to Jordan without implementation jargon and
once to Priya with the server-side constraint. Neither version may add scope.

## Quiz

#### Q1: What is Hearthline's operator console?

- [ ] A public website customers use to pay rent
- [x] An internal tool staff use to watch money move for property-management customers
- [ ] A data-science notebook environment
- [ ] A property listing marketplace

**Explanation:** The operator console is the internal tool staff use to watch money move for small businesses that collect rent.

#### Q2: Which screen does not exist yet?

- [ ] Payments
- [ ] Forecasts
- [x] Inspections
- [ ] Maintenance

**Explanation:** Inspections, scheduled inspections with checklists and photos, is the screen that does not exist yet and becomes the Build Battle.

#### Q3: Why should the money and time conventions be treated as constraints on HLN-101 rather than a license to repair every planted bug?

- [ ] Because fixing planted bugs is forbidden in the workshop
- [x] Because the ticket defines a bounded change and the conventions support it, not a mandate to repair unrelated defects during onboarding
- [ ] Because money and time conventions are optional guidance
- [ ] Because only Maya may touch money code

**Explanation:** HLN-101 is the export options ticket; money and time conventions constrain that work, not permission to repair every planted bug.

#### Q4: What is the correct deliverable for day one?

- [ ] A fully implemented export dialog
- [ ] A surprise feature branch
- [x] A three-line handoff that summarizes the ticket and its evidence
- [ ] A list of every bug in the codebase

**Explanation:** Day one's deliverable is an accurate three-line handoff, not a surprise feature branch.

#### Q5: Which item must the three-line handoff cover?

- [ ] A full audit of all planted bugs
- [ ] A rewrite of the payments page
- [x] Why exporting only the visible table page is insufficient
- [ ] A server-side export implementation

**Explanation:** The handoff must explain why exporting only the visible table page is insufficient, alongside the ticket's column and sensitivity points.

## Complete

- [ ] Mark complete
