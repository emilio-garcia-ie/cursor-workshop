# Glossary format (contract for glossary.md)

- H2 per term: `## Term`.
- Body: 1–3 sentence definition in Hearthline/Cursor context.
- Final line: `Appears in: [Step N](steps/NN-slug.md)` — one link minimum,
  every link must resolve to an existing step file.
- Terms required: all prompt §5 terms (Cents, UTC bucketing, Bounded
  context, Aggregate (DDD), Ubiquitous language, Lease, Rent roll,
  Work order, SLA, Delinquency, Occupancy) plus any mechanism term used
  by ≥2 steps.

## Example

```markdown
## Rent roll

The sum of active monthly rents, in integer cents. The Dashboard screen
shows it via `monthlyRentRoll()`.

Appears in: [Step 1](steps/01-day-one.md), [Step 2](steps/02-clone-and-run.md)
```
