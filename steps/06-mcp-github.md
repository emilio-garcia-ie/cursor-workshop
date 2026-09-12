---
step: 6
title: "MCP: Connect GitHub"
points: 20
module: "Building"
versions: ["short", "medium", "long"]
personas: ["developers", "ai-engineers", "forward-deployed"]
---

# Step 6 — MCP: Connect GitHub (20 pts)

## Learn

MCP connects Cursor to external systems — browsers, DBs, tickets, APIs —
via `mcp.json` with an `mcpServers` wrapper[3][4]. Two shapes: **local**
(`command` + `args`, e.g. Playwright) vs **remote** (`url` + headers/token,
e.g. GitHub). Prefer a CLI (`gh`, `aws`) when one exists — zero context
cost and no per-tool listing.

## Implement

1. Add the GitHub remote server to `.cursor/mcp.json` (create it — the repo
   deliberately doesn't ship one; tokens are per-learner):

```json
{
  "mcpServers": {
    "github": {
      "url": "https://api.githubcopilot.com/mcp",
      "headers": { "Authorization": "Bearer ${env:GITHUB_TOKEN}" }
    }
  }
}
```

   Interpolate secrets from the environment (`${env:NAME}`), never hardcode[4].
2. Authenticate from Customize → MCP[6]; confirm status shows connected.
3. Verify: `Using the GitHub connection, show me the open pull requests on
   this repo.` Then check what the server costs in context.
4. Push `HLN-101-export-options` to your fork and open the PR from the
   template (`@.cursor/skills/pr/SKILL.md`), only verified claims.

## Pro tips

- Customize → MCP shows connected / needs-auth / failed per server[6].
- Scope tokens fine-grained; toggle idle servers off instead of deleting[3].
- Remote URLs are restricted to configured patterns on managed teams[4].

## Advanced

First integrations most teams want: Git, hosting, DB (read-only), chat,
tickets, internal APIs — project-scoped in `.cursor/mcp.json`, secrets via
env interpolation[4]. Build your own MCP servers for proprietary APIs; team
admins can distribute shared servers from the dashboard[28].

## Complete

- [ ] Mark complete
- [ ] I got the expected outcome
