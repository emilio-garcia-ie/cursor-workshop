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

A knowledge graph is nodes (functions, files, modules) and edges (calls,
imports, dependencies). The agent queries the graph instead of re-reading
files: paths and dependents instead of grep. Value concentrates in
relationship questions across large codebases.

## Implement

1. Add a code-graph MCP server to `.cursor/mcp.json` under `mcpServers`
   (stdio shape, per Step 6)[3][4].
2. Index the repo.
3. Ask a relationship question twice — with and without the graph — and
   compare: "Show me the path between a payment record and the lease it
   belongs to. Then show me everything that touches the cents convention."
4. Decide: keep it (supplement, not replacement) or cut it. Record why.

## Pro tips

- Re-index on commit cadence, not continuously.
- Start code-only; keep secrets and docs out of the index.

## Advanced

Token savings vary; the durable value is paths and dependents — the queries
grep can't answer. Supplement to rules and skills, never a substitute: the
graph knows structure, the rules know intent.

## Complete

- [ ] Mark complete
- [ ] I got the expected outcome
