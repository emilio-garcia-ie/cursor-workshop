---
step: 26
title: "Security and Governance"
points: 10
module: "Team & Scale"
versions: ["long"]
personas: ["ai-engineers", "forward-deployed"]
---

# Step 26 — Security and Governance (10 pts)

## Learn

What leaves the machine, and under whose control: Privacy Mode, MCP server
permissions, Cloud Agent storage implications, and Enterprise enforcement
(allow-lists, required rules)[29][4]. AI guidance is never your only
security control.

## Implement

1. Verify Privacy Mode is on in your workspace.
2. Audit `.cursor/mcp.json`: for each server, what can it access and write?
   Cut anything you can't justify[4].
3. Write a governance rule (User or Team level): secrets never in rules,
   explicit approval for Cloud Agents on sensitive repos[29].

## Pro tips

- Secrets out of rules, into env interpolation (`${env:NAME}`)[4].
- Review MCP server code before connecting it to sensitive systems[3].

## Advanced

Vendor risk review for agentic tools: data flow, retention, admin controls,
exit plan. Write it down once; re-run it per vendor, per year[29].

## Complete

- [ ] Mark complete
- [ ] I got the expected outcome
