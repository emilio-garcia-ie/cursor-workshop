---
step: 21
title: "Browser and Design Mode: Fix What You See"
points: 15
module: "Debug & Test"
versions: ["long"]
personas: ["vibecoders", "developers"]
---

# Step 21 — Browser and Design Mode: Fix What You See (15 pts)

## Learn

Cursor's native browser supports navigation, interaction, screenshots, and
console inspection without installing an external browser tool[16]. Design
Mode lives in the Agents Window browser: select an element and prompt against
it and its code context[17]. Network inspection has a surface limitation in
the cited documentation; do not assume every browser layout exposes it[16].

A screenshot proves appearance at a particular viewport, not export correctness.
The starter Payments export is an anchor in `src/app/payments/page.tsx`, already
styled dark. There is no export dialog until the learner implements HLN-101.
Choose a concrete improvement rather than asking to build a nonexistent flow.

## Implement

1. Capture the initial page at a recorded narrow and wide viewport. Use Design
   Mode's element selection to target the link[17], then review the source diff.
2. Return to normal browsing. Verify the label, keyboard focus visibility, and
   search query preservation. Check that the table and search remain usable.
3. Follow the export link on synthetic seeded data. Record the requested URL,
   response content type, and the actual CSV contents. If a browser download
   is inaccessible, inspect the local route response separately and label that
   evidence API-only; do not claim the browser downloaded it.
4. Run `npm test -- tests/api.test.ts` and the full `npm test` in the learner
   checkout. Do not "fix" the sensitive-default characterization in this kit.

### Exercise kit — accessible export action with evidence

#### Starter code path

Use a learner copy with dependencies and its dev server running. Read the
Payments page and export route. Record the server's actual port and branch;
do not open another owner's server or start a duplicate. The
`.cursor/mcp.example.json` file is only an example, not an active browser
configuration; this kit uses the native browser[16]. Drive the change with:

```text
On /payments, select the existing Export link. Rename it Export CSV, add a
visible keyboard-focus treatment, and retain its search-aware href. Preserve
server-side export behavior and the planted defaults. Do not add a dialog,
change API routes, or alter data. Work only in this learner checkout.
```

#### Expected diff

A Payments-page-only patch, before/after viewport evidence, focus check, and
export behavior record. Explicitly mark missing browser capabilities or
download evidence as unverified.

#### Hints

- Inspect the anchor's `href` before and after.
- Keep viewport and seed constant when judging the visual change.
- CSV fields can contain quoted newlines; a naive line count is not a general CSV record parser.

#### Solution approach

Searching for a synthetic payment ID must remain present in the export URL
after the label change. The Payments page requests 20 rows; the export route
requests up to 10000. A downloaded file having more rows than the visible page
can be correct. Compare against the same filter's full result, not the number
of table rows currently rendered. Change action labeling/focus presentation
without changing the query or export endpoint. The unchanged route tests
establish baseline behavior; a screenshot and keyboard check establish the
separate visual acceptance.

#### Expected result

You have the Payments-page-only patch with before/after viewport evidence and
an export behavior record, and `npm test` passes in the learner checkout.

> Screenshot placeholder: same-viewport before/after Export CSV action and
> keyboard focus, accompanied by redacted response evidence from synthetic data.

#### Stretch goal

Review the same learner patch at a narrow viewport with a long search value.
If overflow appears, propose a scoped layout change and new acceptance
evidence; do not redesign the entire dashboard.

### Common mistakes

- **Mistake 1:** Testing a Step-5 dialog that has not been implemented in this learner branch.
- **Mistake 2:** Equating 20 visible rows with the entire filtered export.
- **Mistake 3:** Claiming a download or network inspection succeeded from a screenshot alone.

## Pro tips

- **Pro tip 1:** Keep visual acceptance and data acceptance as separate checklist rows.
- **Pro tip 2:** Record the actual port, branch, viewport, and filter beside every screenshot.

## Advanced

The native browser and Design Mode make appearance an inspectable surface, but
appearance is not data correctness[16][17]. Keep visual acceptance and data
acceptance as separate evidence rows.

## Quiz

#### Q1: What does Cursor's native browser support without an external browser tool?

- [x] Navigation, interaction, screenshots, and console inspection
- [ ] Only screenshots at one viewport
- [ ] Only network inspection
- [ ] Only form filling

**Explanation:** The native browser supports navigation, interaction, screenshots, and console inspection without installing an external browser tool.

#### Q2: Which element in which file does this step's Design Mode exercise target?

- [x] The existing Export link in `src/app/payments/page.tsx`
- [ ] A Step-5 export dialog that has not been implemented
- [ ] The export route in `src/app/api/payments/export/route.ts`
- [ ] The `.cursor/mcp.example.json` browser configuration

**Explanation:** The exercise targets the existing Export link in the Payments page, which is already styled dark, and there is no export dialog until HLN-101 is implemented.

#### Q3: Why can a downloaded CSV with more rows than the visible page be correct?

- [ ] Because the page hides extra rows
- [x] Because the page requests 20 rows while the export route requests up to 10000 for the same filter
- [ ] Because CSV files are never filtered
- [ ] Because exports ignore search queries

**Explanation:** The visible page requests 20 rows while the export route requests up to 10000, so compare against the same filter's full result.

#### Q4: Why is it wrong to claim a browser download succeeded from a screenshot alone?

- [x] Because a screenshot proves appearance at a viewport, not download or data correctness
- [ ] Because screenshots are always deleted
- [ ] Because downloads cannot be verified
- [ ] Because the network panel is always available

**Explanation:** A screenshot proves appearance at a particular viewport, not export correctness, so missing download evidence must be marked unverified.

#### Q5: What must the completed patch contain?

- [x] A Payments-page-only change with before/after viewport evidence and an export behavior record, with `npm test` passing
- [ ] A new export dialog with API changes
- [ ] A redesigned dashboard layout
- [ ] A change to the planted sensitive-default characterization

**Explanation:** Completion is a Payments-page-only patch with visual and export evidence, without adding a dialog, changing routes, or altering planted defaults.

## Complete

- [ ] Mark complete
