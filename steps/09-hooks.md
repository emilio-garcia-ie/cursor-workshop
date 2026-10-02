---
step: 9
title: "Hooks: Make the Review Non-Optional"
points: 15
module: "Guardrails"
versions: ["short", "medium", "long"]
personas: ["developers", "ai-engineers", "forward-deployed"]
---

# Step 9 — Hooks: Make the Review Non-Optional (15 pts)

## Learn

Hooks observe and control the agent loop from `hooks.json` (`version: 1`) at
project (`.cursor/hooks.json`) or user level[5][6]. `beforeShellExecution`
fires before shell commands with the full command string available to match
on; a command hook exits `2` to block, `0` to allow. `afterFileEdit` reacts
after edits (formatters, audits). The difference that matters: a rule is
guidance (usually followed); a hook is enforcement (non-zero exit blocks).

## Implement

1. Add to `.cursor/hooks.json` (already scaffolded — read it first):

```json
{
  "version": 1,
  "hooks": {
    "beforeShellExecution": [
      { "command": ".cursor/hooks/pre-push-check.sh", "matcher": "git push" }
    ]
  }
}
```

   Project hooks run from the repo root, so paths look like
   `.cursor/hooks/...`, not `./hooks/...`[5].
2. Read `.cursor/hooks/pre-push-check.sh`: on `git push` it runs `npm test`;
   failure prints a reason and exits 2.
3. Prove it blocks: temporarily break one money test, try to push, watch the
   denial with its reason. Then restore the test.

Anything "please remember to…" is a hook candidate: format-on-save, blocking
generated-file edits, audit logs, deploy notifications.

## Advanced

Three to four hooks maximum — guidance versus friction is a real trade-off.
Hooks are reviewable, testable, auditable: the compliance-friendly layer of
your harness. Advice doesn't survive deadlines; enforcement does.

## Complete

- [ ] Mark complete
- [ ] I got the expected outcome
