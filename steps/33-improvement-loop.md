---
step: 33
title: "Improvement Loop"
points: 15
module: "Bonus"
versions: ["long"]
personas: ["forward-deployed", "ai-engineers"]
---

# Step 33 — Improvement Loop (15 pts)

## Learn

Log outcomes, grade replies, retrain weekly, propose new plays. The
compounding asset isn't the skill — it's the log of what converted. Same
shape as Step 12's loop (goal + cadence + fences), pointed at outreach[32].

## Implement

Context: Hearthline sales logs which outreach styles converted. After two
weeks, the skill proposes a new play.

1. Define the log schema: prospect, play used, reply (y/n), reply quality
   (1–5), converted (y/n).
2. Schedule the review: a cloud-agent subscription that wakes weekly, grades
   the log, and proposes exactly one new play with its predicted metric[32].
3. Human approves or kills. Approved plays join the voice skill (Step 31);
   killed ones stay in the log with the reason.

## Complete

- [ ] Mark complete
- [ ] I got the expected outcome
