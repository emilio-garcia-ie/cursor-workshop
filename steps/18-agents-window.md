---
step: 18
title: "The Agents Window: Parallel Work"
points: 10
module: "The Fast Loop"
versions: ["long"]
personas: ["developers", "ai-engineers", "forward-deployed"]
---

# Step 18 — The Agents Window: Parallel Work (10 pts)

## Learn

Multiple agents run in parallel — local, worktree, cloud, SSH — each
optionally on its own worktree[15][19]. Background agents extend Agent
beyond the chat that spawned them[15].

## Implement

1. Open the Agents window.
2. Launch: "Add a loading state to the payments table" on a fresh worktree.
3. Keep working in the main thread meanwhile. Watch both agents.
4. Compare diffs. Merge the better one; note what parallel review caught.

## Pro tips

- Don't run ten agents. Run two when two things need to happen[15].
- One worktree per agent — never share a working tree.

## Advanced

Parallelism is a scaling property, not a productivity hack: independent work
streams with isolated contexts, merged by judgement. Same shape as Step 14's
fan-out, smaller blast radius.

## Complete

- [ ] Mark complete
- [ ] I got the expected outcome
