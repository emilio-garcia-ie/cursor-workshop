---
step: 19
title: "Side Chats: Ask Without Derailing"
points: 10
module: "The Fast Loop"
versions: ["long"]
personas: ["developers", "data-scientists"]
---

# Step 19 — Side Chats: Ask Without Derailing (10 pts)

## Learn

A side chat opens a parallel conversation that inherits the main chat's
context without interrupting it[33]. Ask the question where it arises; pull
the answer back with `@` when it matters.

## Implement

1. Start a long task (refactor the renewal-date logic in
   `src/domains/leasing/lib/renewal-date.ts`).
2. Open a side chat: "Why does the renewal calculation use UTC day math
   instead of server local time?" (Answer: `.cursor/rules/time.mdc`.)
3. Pull the explanation back into the main thread with `@` and continue.

## Pro tips

- Side chats are for questions, not work. Work changes files; questions
  change understanding.
- Close them when answered — stale threads are context debt.

## Advanced

Side chats as a context-management pattern: the main thread stays a clean
build log while curiosity gets its own disposable context. Same economics
as Step 4, applied mid-task.

## Complete

- [ ] Mark complete
- [ ] I got the expected outcome
