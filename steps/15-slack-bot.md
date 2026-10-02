---
step: 15
title: "The Bot That Ships While You Sleep"
points: 10
module: "Bonus"
versions: ["long"]
personas: ["forward-deployed", "ai-engineers"]
---

# Step 15 — The Bot That Ships While You Sleep (10 pts)

## Learn

Cloud agents subscribe to event sources — PRs, Slack threads, scheduled
tasks — and wake when something happens[32]. In Slack: `@cursor check back
in an hour and keep going until that feedback is in`[32]. Steering messages
don't interrupt the run; follow-ups wait for the next tool call[32].

## Implement

1. Connect the Slack integration[26].
2. Jordan files a bug in `#hearthline-ops`. Mention `@cursor` with the
   thread: read it, diagnose against the repo, open a PR.
3. The cloud agent subscribes to the PR it created and drives it to
   completion — fixing CI and addressing bot comments on its own[32].
4. Steer it mid-run once; confirm the follow-up waited instead of
   interrupting[32].

## Complete

- [ ] Mark complete
- [ ] I got the expected outcome
