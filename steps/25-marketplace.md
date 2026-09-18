---
step: 25
title: "Team Marketplace: Standards That Travel"
points: 10
module: "Team & Scale"
versions: ["medium", "long"]
personas: ["ai-engineers", "forward-deployed"]
---

# Step 25 — Team Marketplace: Standards That Travel (10 pts)

## Learn

Two real formats matter: **Agent Plugins** use root `plugin.json` and package
skills/MCP; **Cursor Plugins** use `.cursor-plugin/plugin.json` and additionally
support rules, agents, commands, hooks, and variables[28][35]. A reviewer plus
hook therefore needs the Cursor Plugin format, not an invented universal bundle.

Distribution is not universal enforcement. **Default Off** is opt-in;
**Default On** installs by default but allows opt-out; **Required** prevents
uninstall for the configured audience[28]. Access is a separate setting[28].
Required installation does not prove a packaged hook runs in every runtime or
blocks external-terminal pushes[5][31]. Version metadata is documented[35];
consumer pinning and immutable installed versions are not established here.

## Implement

### Exercise kit — learner-authored package, no rollout

**Starter input:** Review your Step-8 reviewer and Step-9 hook evidence in the
learner copy. Existing scripts under `.cursor/hooks/` and an opt-in registration
example are practice material, not proof of active tenant enforcement. Do not
edit the shared `.cursor/hooks.json`, install a plugin, or provision a marketplace.
Create the following package only in a separate learner tooling directory:

```text
learner-marketplace/
  .cursor-plugin/marketplace.json
  plugins/hearthline-standards/
    .cursor-plugin/plugin.json
    agents/org-standards.md
    hooks/hooks.json
    hooks/pre-push-check.sh
```

Default Cursor Plugin discovery includes `agents/` and `hooks/hooks.json`[35].
For `plugins/hearthline-standards/.cursor-plugin/plugin.json`:

```json
{
  "name": "hearthline-standards",
  "version": "0.1.0"
}
```

For the learner repository-root `.cursor-plugin/marketplace.json`, use an
explicit local plugin source; name, owner name, and plugins are required[35]:

```json
{
  "name": "hearthline-workshop",
  "owner": { "name": "Workshop learner" },
  "plugins": [
    { "name": "hearthline-standards", "source": "./plugins/hearthline-standards" }
  ]
}
```

**Worked example:** Copying a project hook command such as
`.cursor/hooks/pre-push-check.sh` into this package does not prove it resolves
from an installed plugin. Mark installed-path resolution **unverified** rather
than claiming a package listing is an execution test. Likewise, the project
reviewer's `readonly: true` has documented write restrictions[34], but their
preservation through packaging must be tested independently.

1. Copy only reviewed learner components; inspect all command paths and avoid
   secrets or machine-specific absolute paths. Do not register the draft package.
2. Parse both JSON manifests locally and verify each referenced component exists.
   Compare names and layout with the documented fields[35]. Parsing is not
   Cursor installation validation.
3. Produce an acceptance matrix: manifest parsing, component discovery,
   installed hook path, readonly restriction, hook allow/deny/failure behavior,
   second-account installation, and cloud coverage. Mark only checks actually
   performed as passed; runtime rows remain blocked for separate approval.
4. Draft a distribution choice of **Default Off**, with an explicit test audience
   and removal/recovery owner. No actual publication or account changes occur.

**Expected deliverable:** Learner package, valid JSON, path inventory, and an
honest acceptance matrix—not a claim that standards now apply everywhere.

**Hints:** Hook exit 0 consumes JSON decisions, exit 2 blocks, other nonzero
exits fail open by default; failure-blocking intent needs `failClosed`[5].
Review these semantics separately from packaging and never test by really pushing.

**Solution:** Use the Cursor Plugin manifest and explicit marketplace source
shown above. Retain unverified runtime cells. Optional future private import
uses Dashboard → Plugins → Add Marketplace → Import from Repo → Add to
Marketplace, then access settings[28]. Public marketplace submission is a
separate reviewed public-repository flow[35]; neither is required by this kit.

> Screenshot placeholder: learner package tree, parsed manifest results, and
> acceptance matrix with installation/enforcement rows visibly unverified.

## Pro tips

- Start with opt-in distribution and one reviewed component set before broadening access.
- Record source revision and version metadata for reproducibility without promising pinning.

### Common mistakes

- Using root `plugin.json` for the reviewer/hook package[28][35].
- Calling Default On non-optional or equating Required with universal enforcement[28].
- Reporting second-account success without actually testing installation and execution.

## Advanced

**Stretch:** Compare package distribution with personal skill publication:
publishing one personal skill creates one plugin, teammates opt in, and
referenced skills are not bundled automatically[28]. Explain which missing
resources would make a published playbook incomplete. Do not publish it.

## Complete

- [ ] Mark complete
- [ ] I got the expected outcome
