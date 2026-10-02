---
step: 31
title: "GTM Stack"
points: 15
module: "Bonus"
versions: ["long"]
personas: ["forward-deployed", "ai-engineers"]
---

# Step 31 — GTM Stack (15 pts)

## Learn

The GTM paradigm: three signals (who to talk to, what to say, when it
matters), taught to Cursor as a voice skill with connected sources. Same
mechanisms as engineering — rules for voice, MCP for sources, skills for
plays — pointed at pipeline instead of code.

## Implement

Context: Hearthline sales is trying to land **Crestview Properties**, a
fictional 120-unit property manager in Portland.

1. Teach Cursor the sales voice: a rule with three sample messages that
   converted, three that didn't, and the difference.
2. Connect the sources: Gmail MCP, Slack MCP[26], call transcripts — each
   as an `mcpServers` entry with env-interpolated secrets[3][4].
3. Build the voice skill (`hearthline-voice`): given a prospect, draft the
   first touch in-voice with one cited customer proof point.

## Complete

- [ ] Mark complete
- [ ] I got the expected outcome
