---
step: 32
title: "Customer Canvas"
points: 15
module: "Bonus"
versions: ["long"]
personas: ["forward-deployed", "vibecoders"]
---

# Step 32 — Customer Canvas (15 pts)

## Learn

Canvases are interactive artifacts rendered beside chat, with a saved view
that can be reopened and revised[25]. A useful customer discussion artifact
still needs source labels, units, dates, and limitations. Rendering a chart
does not verify the numbers or turn a prototype into an operational product.

Shared canvases are read-only snapshots for teammates. Sharing requires a
paid plan, team membership, compatible privacy settings, and enabled team
policy[25]. Do not promise that an external prospect can open a shared link.
The kit defaults to an internal fictional draft, not publication or a
meeting-booked automation.

## Implement

### Exercise kit — a canvas without invented benchmarks

**Starter input:** Reuse fictional Crestview from Step 31. Define an explicit
synthetic worksheet, independent of the real console seed:

```text
Snapshot label: fictional demo, not customer telemetry
Units: 120; active leases: 108
Payment records this sample period: 100; late records: 12
Open work orders at snapshot: 18
External industry benchmark: unavailable
Workshop discussion target: 95% occupancy, not an industry statistic
```

Read `src/data/store.ts` for actual Property/Lease/Payment/WorkOrder field
shapes and `src/app/forecasts/page.tsx` for its current metric-card calculations.
Do not call the worksheet numbers seeded Crestview data or infer implemented
late-fee automation from a payment-status field.

1. Draft a one-page canvas brief: snapshot/source labels, three measures,
   limitations, and three proposed discussion actions. Ask for a canvas if
   available[25]; otherwise submit the same content as an offline worksheet.
2. Recompute all displayed values manually. Use denominators in labels, not
   just a percentage badge. Keep unavailable industry comparison explicitly empty.
3. Map each discussion action to current source or label it a proposal: review
   occupancy assumptions (Forecasts), investigate late records (Payments), and
   prioritize open work (Maintenance). Do not claim automated optimization.
4. Review internally without publishing. Record rendering/sharing availability
   separately; a content draft can be complete while runtime sharing is untested.

**Worked example:** Occupancy is `108 / 120 = 90%`; the gap to the chosen 95%
target is `-5 percentage points`. Late-record share is `12 / 100 = 12%`, not a
rent-delinquency dollar rate. Eighteen open orders are a count, not an SLA breach
rate without due dates and a defined observation time.

**Expected deliverable:** A rendered canvas or clearly labeled offline layout,
a calculation sheet, three evidence-bound discussion actions, and an audience/
sharing decision. No real prospect analytics or automatic meeting trigger.

**Hints:** Add "fictional demo" to each panel, not just a footer. Do not compare
synthetic values with an industry benchmark that has not been sourced.

**Solution:** Show the three correctly labeled measures and the workshop target
as an assumption. Use available screens as discussion aids, not guarantees of
late-fee automation, maintenance triage, or predictive forecasting features.

**Stretch:** Replace the occupancy denominator with "unknown." The canvas
should display insufficient data rather than zero or a confident percentage.
If you later share internally, verify eligibility and reviewer access first[25].

### Common mistakes

- Presenting the fictional 120-unit worksheet as actual seeded customer telemetry.
- Converting payment-record share into a dollar delinquency claim.
- Assuming a shared Canvas link is public or available on every account[25].

### Pro tips

- Put source, timestamp, unit, and denominator next to every displayed number.
- Separate current prototype surfaces from proposed customer optimization actions.

> Screenshot placeholder: fictional canvas with labeled denominators, manual
> calculations, and unavailable benchmark; no external customer-share claim.

## Complete

- [ ] Mark complete
- [ ] I got the expected outcome
