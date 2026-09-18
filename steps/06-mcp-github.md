---
step: 6
title: "MCP: Connect GitHub"
points: 25
module: "Building"
versions: ["short", "medium", "long"]
personas: ["developers", "ai-engineers", "forward-deployed"]
---

# Step 6 — MCP: Connect GitHub (25 pts)

## Learn

MCP connects Cursor to external systems — browsers, DBs, tickets, APIs —
via `mcp.json` with an `mcpServers` wrapper[3][4]. **Local STDIO** starts a
process with `type: "stdio"`, `command`, and optional `args`/`env`; a
**remote** connection uses a URL and the server's authentication scheme[3].
Configuration, authentication, and authorization are three separate checks:
a valid JSON file is not a working connection, and a working connection is
not permission to publish. A CLI can be simpler for a one-off task; its
commands and output still consume context. Do not promise zero cost:
model choice and plan determine usage charges[13].

## Implement

1. Read `.cursor/mcp.example.json` first. In your learner checkout, create
   `.cursor/mcp.json` with only the GitHub connection you intend to use.
   The wrapper and environment interpolation are documented by Cursor[3];
   verify the provider endpoint and token permissions before connecting:

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

   Interpolate secrets from the environment (`${env:NAME}`), never hardcode[3].
2. Authenticate from Customize → MCP[6]; confirm status shows connected.
3. Verify: `Using the GitHub connection, show me the open pull requests on
   this repo.` Then check what the server costs in context.
4. Prepare the PR draft for `HLN-101-export-options` from
   `.cursor/skills/pr/SKILL.md`, using only verified claims. Push and open
   the PR only after Step 11's separate approval.

### Minimal working example: local versus remote

For a local server, use the explicit STDIO shape below[3]. This is the
Playwright starter already illustrated in `.cursor/mcp.example.json`, not
an instruction to install it for the GitHub exercise. Review and approve
the executable/package separately; schema support is not a connection test.

```json
{
  "mcpServers": {
    "playwright": {
      "type": "stdio",
      "command": "npx",
      "args": ["@playwright/mcp", "--isolated"]
    }
  }
}
```

### Exercise kit

#### Starter code path

`hearthline-operator-console/.cursor/mcp.example.json`. Work in your learner
checkout; do not copy all four servers or any secret values into the PR.

#### Expected diff

One local `.cursor/mcp.json` connection, plus a sanitized verification note
in the PR draft. Keep credentials out of both. Check `git status --short`
and `git diff -- .cursor/mcp.json` before sharing; an untracked file will
not appear in that diff, so inspect it directly too.

#### Hints

- Start with `Using GitHub, list open PRs for OWNER/REPO. Read only; do not
  create, comment, merge, or push.` Replace OWNER/REPO with your fork.
- If the environment variable is absent, supply it through your approved
  secret setup; never ask the agent to print it. Interpolation is supported
  in `url`, `headers`, `command`, `args`, and `env`[3].
- Treat a denied call as a permissions problem to investigate, not an
  invitation to broaden access. Record the sanitized error and stop.

#### Solution approach

Validate the JSON, open Customize → MCP[6], check the connection, and make
one read-only request. Compare the returned PR numbers with your fork's PR
list. Repeat with the server disabled: the agent should report that the
connection is unavailable rather than invent results. Record expected and
observed behavior separately; do not claim authentication passed from a
screenshot of valid JSON.

#### Expected result

A real PR list, including an honestly empty list, or a clearly recorded
connection/permission blocker. No write operation is required to pass this
kit; the publishing action above waits for Step 11's approval.

[SCREENSHOT: Customize MCP connection and sanitized read-only PR result; no token or Authorization header visible]

#### Stretch goal

Compare the same read-only task with your approved GitHub CLI workflow.
Record setup effort and evidence quality, not an assumed token saving.

### Common mistakes

- **Mistake 1:** Copying a token into JSON. Use environment interpolation[3]
  and inspect the staged diff for accidental credentials.
- **Mistake 2:** Treating remote URL settings as a STDIO process. Keep the
  transport shapes separate; the explicit STDIO type is not a universal
  requirement for every remote transport[3].
- **Mistake 3:** Calling a connected server a team rollout. Verify each
  intended user's access and installation separately[28].

## Pro tips

- **Pro tip 1:** Connect one server at a time so a failure has one likely owner.
- **Pro tip 2:** Keep the first request read-only and independently checkable.

- Use Customize → MCPs to toggle servers; inspect MCP Logs in the Output
  panel with `Cmd+Shift+U` on macOS or `Ctrl+Shift+U` on Windows/Linux[4].
- Scope tokens fine-grained; toggle idle servers off instead of deleting[3].
- Ask your admin which endpoints and operations are permitted; do not infer
  a universal managed-team URL policy from a successful local connection.

## Advanced

First integrations most teams want: Git, hosting, DB (read-only), chat,
tickets, internal APIs — project-scoped in `.cursor/mcp.json`, secrets via
env interpolation[3]. Team admins can link Team MCPs to the Default
marketplace, but linking alone does not install or enable them for everyone[28].
MCP also supports resources, prompts, and interactive MCP Apps; this exercise
needs only a read-only tool call, not another server installation[3].

## Complete

- [ ] Mark complete
- [ ] I got the expected outcome
