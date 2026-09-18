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

**Starter input:** In the learner copy, read `src/data/store.ts`,
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

**Worked example:** The export route calls `listPayments` and `toCSV`, and
reads `DEFAULT_EXPORT_COLUMNS`. `Payment.leaseId` is a data reference; it does
not prove that exporting invokes a lease service. A graph that labels every
relationship "calls" would tell the wrong story even with correct filenames.

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

**Expected deliverable:** A typed relationship map, two answered impact
questions, and a keep/defer decision with evidence. No active MCP file or
production code changes are necessary.

**Hints:** Trace the actual import even when it bypasses a public domain index;
record that as existing structure, not a pattern to copy. Check index freshness
before judging an apparently missing edge.

**Solution:** Keep the confirmed route → listing/defaults/CSV relationships;
reject an invented export → lease-service call unless source establishes it.
A small repository may not justify a new indexer's cost or access surface.

If a later approved provider uses local STDIO, the documented project shape
uses `mcpServers`, explicit `type: "stdio"`, and `command`; environment
interpolation is supported[3]. A compatible shape is not a tested server,
and STDIO's fields are not a universal remote-transport requirement[3][4].

> Screenshot placeholder: source adjacency table beside the verified imports;
> label any optional indexed result with its revision and unverified edges.

## Pro tips

- Distinguish data references from executable calls before counting graph accuracy.
- Record the indexed revision so a stale answer does not masquerade as a source defect.

### Common mistakes

- Assuming MCP availability means a code-graph service is already installed.
- Treating a `leaseId` field as proof of a runtime join.
- Claiming token savings without measuring comparable tasks and index overhead.

## Advanced

**Stretch:** Ask which tests would notice a default-column change versus a
currency-formatting change. Verify the answer against `tests/export-columns.test.ts`,
`tests/api.test.ts`, and `tests/money.test.ts`; identify the limitations of a
pure import graph for predicting behavioral coverage.

## Complete

- [ ] Mark complete
- [ ] I got the expected outcome
