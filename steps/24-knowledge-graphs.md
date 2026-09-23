---
step: 24
title: "Knowledge Graphs: When They Earn Their Keep"
points: 10
module: "Debug & Test"
versions: ["long"]
personas: ["data-scientists", "ai-engineers"]
---

# Step 24 — Knowledge Graphs: When They Earn Their Keep (10 pts)

## Learn

A code graph represents entities and relationships: files import modules,
functions call functions, records reference other records. These are different
edge types. A graph result is an index-derived hypothesis until you verify it
against source; it cannot establish business intent or runtime reachability
just because two names are connected.

Cursor supports MCP tools and other protocol capabilities, including prompts,
resources, roots, elicitation, and interactive MCP Apps[3]. That does not supply
a built-in code-graph server. The console's `.cursor/mcp.example.json` is an
example, not active configuration or a verified connection. No graph provider,
indexer, credentials, or remote service is required for this exercise.

## Implement

### Exercise kit — build and challenge a small relationship map

#### Starter code path

In the learner copy, read `src/data/store.ts`,
`src/domains/payments/payment-service.ts`, `src/domains/payments/queries.ts`,
`src/domains/payments/export.ts`, `src/app/api/payments/export/route.ts`, and
`src/lib/csv.ts`. Produce a source-only map first. Do not upload the repository
or modify the shared baseline.

```text
Map how the export route gets payments, chooses columns, and serializes cells.
For every edge give type (import, call, or data reference) and file:line evidence.
Then explain Payment.leaseId without claiming it is a runtime join. Return
missing edges and uncertainties. Do not install tools or change configuration.
```

1. Draw a small adjacency table with node, edge type, destination, and source
   location. Keep formatting (`formatCents`) separate from raw CSV `amount_cents`.
2. Answer "What changes if the default column list changes?" using the map.
   Inspect actual callers and tests to confirm the proposed impact.
3. Optionally compare against an **already approved** code-graph tool. Record
   provider/version, indexed revision, exclusions, returned edges, and source
   checks. Do not install an unspecified server merely to complete the table.
4. Score both approaches on correct edges, false edges, missing edges, and
   inspection time. Without a graph tool, submit the source map and explicitly
   label the tool comparison untested.

#### Expected diff

A typed relationship map, two answered impact questions, and a keep/defer
decision with evidence. No active MCP file or production code changes are
necessary.

#### Hints

- Trace the actual import even when it bypasses a public domain index; record
  that as existing structure, not a pattern to copy.
- Check index freshness before judging an apparently missing edge.

#### Solution approach

The export route calls `listPayments` and `toCSV`, and reads
`DEFAULT_EXPORT_COLUMNS`. `Payment.leaseId` is a data reference; it does not
prove that exporting invokes a lease service. A graph that labels every
relationship "calls" would tell the wrong story even with correct filenames.
Keep the confirmed route → listing/defaults/CSV relationships; reject an
invented export → lease-service call unless source establishes it. A small
repository may not justify a new indexer's cost or access surface.

If a later approved provider uses local STDIO, the documented project shape
uses `mcpServers`, explicit `type: "stdio"`, and `command`; environment
interpolation is supported[3]. A compatible shape is not a tested server,
and STDIO's fields are not a universal remote-transport requirement[3][4].

#### Expected result

You have a typed source adjacency map, two answered impact questions, and a
keep/defer decision with evidence, and no MCP file or production code was
changed.

> Screenshot placeholder: source adjacency table beside the verified imports;
> label any optional indexed result with its revision and unverified edges.

#### Stretch goal

Ask which tests would notice a default-column change versus a
currency-formatting change. Verify the answer against `tests/export-columns.test.ts`,
`tests/api.test.ts`, and `tests/money.test.ts`; identify the limitations of a
pure import graph for predicting behavioral coverage.

## Pro tips

- **Pro tip 1:** Distinguish data references from executable calls before
  counting graph accuracy.
- **Pro tip 2:** Record the indexed revision so a stale answer does not
  masquerade as a source defect.

### Common mistakes

- **Mistake 1:** Assuming MCP availability means a code-graph service is
  already installed.
- **Mistake 2:** Treating a `leaseId` field as proof of a runtime join.
- **Mistake 3:** Claiming token savings without measuring comparable tasks and
  index overhead.

## Advanced

The graph is a search aid, not a verdict. Every edge you report should be
re-verifiable in source, and every savings or coverage claim should come from
a measured comparison on the same task, not from the shape of the diagram.

## Quiz

#### Q1: What does an edge in the source-based code graph represent in this step?

- [ ] A claim that two features share a business goal
- [x] A typed relationship such as import, call, or data reference with source evidence
- [ ] A runtime guarantee that one service reaches another
- [ ] Proof that two names share intent

**Explanation:** The step's graph uses typed edges such as import, call, and data reference that are verified against source, and it cannot establish business intent or runtime reachability on its own.

#### Q2: Which file does the learner read to trace the export data flow?

- [ ] docs/tickets/HLN-103.md
- [x] src/app/api/payments/export/route.ts
- [ ] .cursor/mcp.example.json
- [ ] src/app/forecasts/page.tsx

**Explanation:** The starter code path lists src/app/api/payments/export/route.ts among the files to read when building the relationship map.

#### Q3: Why must Payment.leaseId be reported as a data reference rather than as proof of a runtime join?

- [ ] Because leaseId is never used anywhere in the console
- [ ] Because data references are less important than imports
- [x] Because a data reference does not prove that exporting invokes a lease service
- [ ] Because Jordan requested that lease data stay private

**Explanation:** The export route does not call a lease service, so labeling that relationship "calls" would misstate the actual flow.

#### Q4: A teammate claims the example .cursor/mcp.example.json proves a code-graph service is available. What does the step say?

- [ ] It is a verified, active connection
- [x] It is an example, not active configuration or a verified connection
- [ ] It is required for the exercise to pass
- [ ] It proves a remote indexer is installed

**Explanation:** The console's .cursor/mcp.example.json is example material, not active configuration or a verified connection, and no graph provider is required.

#### Q5: Which deliverable belongs to this step's expected result?

- [ ] A newly installed code-graph server with credentials
- [ ] A rewritten production export route
- [x] A typed source adjacency map with an answered impact question and a keep/defer decision
- [ ] An active MCP configuration file

**Explanation:** The expected result is a typed source map, answered impact questions, and a keep/defer decision with no MCP file or production code changed.

## Complete

- [ ] Mark complete