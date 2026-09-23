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

#### Starter code path

Review your Step-8 reviewer and Step-9 hook evidence in the
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

#### Expected diff

Learner package, valid JSON, path inventory, and an honest acceptance
matrix, not a claim that standards now apply everywhere.

#### Hints

- Hook exit 0 consumes JSON decisions, exit 2 blocks, other nonzero exits fail
  open by default; failure-blocking intent needs `failClosed`[5].
- Review these semantics separately from packaging and never test by really
  pushing.

#### Solution approach

Use the Cursor Plugin manifest and explicit marketplace source shown above.
Copying a project hook command such as `.cursor/hooks/pre-push-check.sh` into
this package does not prove it resolves from an installed plugin; mark
installed-path resolution **unverified** rather than claiming a package listing
is an execution test. Likewise, the project reviewer's `readonly: true` has
documented write restrictions[34], but preservation through packaging must be
tested independently. Retain unverified runtime cells. Optional future private
import uses Dashboard → Plugins → Add Marketplace → Import from Repo → Add to
Marketplace, then access settings[28]. Public marketplace submission is a
separate reviewed public-repository flow[35]; neither is required by this kit.

#### Expected result

You have the learner package with valid JSON, a path inventory, and an
acceptance matrix whose runtime rows are honestly unverified, and no plugin was
installed or marketplace provisioned.

> Screenshot placeholder: learner package tree, parsed manifest results, and
> acceptance matrix with installation/enforcement rows visibly unverified.

#### Stretch goal

Compare package distribution with personal skill publication: publishing one
personal skill creates one plugin, teammates opt in, and referenced skills are
not bundled automatically[28]. Explain which missing resources would make a
published playbook incomplete. Do not publish it.

## Pro tips

- **Pro tip 1:** Start with opt-in distribution and one reviewed component set
  before broadening access.
- **Pro tip 2:** Record source revision and version metadata for reproducibility
  without promising pinning.

### Common mistakes

- **Mistake 1:** Using root `plugin.json` for the reviewer/hook package[28][35].
- **Mistake 2:** Calling Default On non-optional or equating Required with
  universal enforcement[28].
- **Mistake 3:** Reporting second-account success without actually testing
  installation and execution.

## Advanced

Packaging is a delivery mechanism, not a proof of enforcement. Whether a
standards package is Default Off, Default On, or Required only describes
installation; running a hook in every runtime, honoring access settings, and
surviving a second account still have to be tested where they actually apply.

## Quiz

#### Q1: Which plugin format is required for a package that combines a reviewer agent with a hook?

- [ ] A universal bundle format
- [x] The Cursor Plugin format using .cursor-plugin/plugin.json
- [ ] Agent Plugins using root plugin.json only
- [ ] A skills-only package

**Explanation:** The Cursor Plugin format supports rules, agents, commands, hooks, and variables, which a reviewer plus hook requires.

#### Q2: Where does the marketplace manifest live in the learner package?

- [ ] plugins/hearthline-standards/plugin.json
- [x] learner-marketplace/.cursor-plugin/marketplace.json
- [ ] .cursor/hooks.json
- [ ] src/app/payments/page.tsx

**Explanation:** The package layout places the marketplace manifest at learner-marketplace/.cursor-plugin/marketplace.json with an explicit local plugin source.

#### Q3: Why is a Required distribution not proof that a standards hook actually enforces standards?

- [ ] Because Required only controls the export route
- [ ] Because Required packages cannot contain hooks
- [x] Because Required only prevents uninstall and does not prove a packaged hook runs in every runtime
- [ ] Because Priya must approve every hook run

**Explanation:** Required installation is an install policy, and it does not prove a packaged hook runs in every runtime or blocks external-terminal pushes.

#### Q4: What does the step say about marking the acceptance matrix row for second-account installation?

- [ ] It can be marked passed based on the package listing
- [ ] It should be deleted to save space
- [x] It must remain unverified unless installation and execution were actually tested
- [ ] It proves the hook executes in cloud

**Explanation:** Reporting second-account success without actually testing installation and execution is a listed common mistake.

#### Q5: What must NOT happen during this step?

- [ ] Parsing both JSON manifests locally
- [ ] Drafting a Default Off distribution choice
- [x] Installing the plugin or provisioning a marketplace
- [ ] Producing an acceptance matrix

**Explanation:** The expected result requires that no plugin is installed and no marketplace is provisioned, with runtime rows honestly unverified.

## Complete

- [ ] Mark complete