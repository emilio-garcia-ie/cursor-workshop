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

A plugin bundles rules, skills, subagents, commands, and MCP servers into
one distributable unit[28]. Team admins import a repo, set defaults, and
control access — standards that travel instead of wiki pages that rot[29].

## Implement

1. Package the org-standards reviewer (Step 8) and the pre-push hook
   (Step 9) as a plugin per the plugins reference[28].
2. Publish to a test marketplace. Set "Enabled by default".
3. Consume it with a second account. Confirm the hook blocks a bad push
   there too.

## Pro tips

- Start with one plugin. Distribute standards, not opinions[28].
- Version plugins like code — consumers pin, you changelog.

## Advanced

Governance at scale: one blessed reviewer and one blocking hook, everywhere,
updated once. Compare with the Week-2-per-repo rollout from Step 10.

## Complete

- [ ] Mark complete
- [ ] I got the expected outcome
