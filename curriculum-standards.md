# Curriculum narrative standard

This file is the contract for every step in `steps/*.md` (and its future ES
mirror). A step conforms when it satisfies every rule below. It extends the
mechanical contract in `specs/step-schema.md`, which remains the source of
truth for frontmatter and tab structure.

## 1. Voice and consistency

1. Second person, direct, plain. Address the learner as "you". No marketing
   voice, no superlatives, no first-person-plural editorializing ("we will
   learn") except when quoting the Hearthline characters.
2. Characters are fixed and consistent across every step:
   - **Priya Raman**, engineering lead. Demands shipped, specific work; prefers
     specs before code; runs the shipment conversation.
   - **Jordan Osei**, head of customer operations. Files real complaints and
     owns the business request.
   - **Maya Chen**, data scientist. Owns Forecasts; uses Python/notebooks.
   - The learner is "you", the newest engineer on the console team.
3. The Hearthline story thread stays present in every step: the work always
   connects back to a named person, a ticket, a screen, or a business outcome
   (money movement for small property managers). No step is a dry feature list.
4. Terminology matches the glossary and the console repo. Never rename a file,
   route, or screen unless the console repo itself does.

## 2. Why / What / Where / How for every learner action

Every imperative the learner is asked to perform must answer four questions in
the step body:

- **Why**: the business or engineering reason (which character needs this, and
  what breaks if it is skipped).
- **What**: the deliverable, named and observable (a handoff, a branch, a test,
  a PR, a config file).
- **Where**: the exact location (file path, route, screen, repo). Paths must
  match the console repo.
- **How**: the concrete steps to produce it, in order.

Style rule: prefer one sentence per clause rather than a dense paragraph.
Where the answer to "where" is a path, render it as inline code.

## 3. Exercise kit (mandatory per step)

Every step's Implement section keeps the exercise kit with these H4
subsections, in this order:

1. `#### Starter code path` — Where to begin (paths only).
2. `#### Minimal working example` — optional; a small already-supported pattern.
3. `#### Expected diff` — the scope of change expected, or "None".
4. `#### Hints` — at least three.
5. `#### Solution approach` — a short strategy, not a full answer.
6. `#### Expected result` — one observable sentence, the basis for the
   self-report in P2.
7. `#### Stretch goal` — optional; never adds points or scope.

Use the H4 (`####`) subsection headings exactly. Do not use bold inline labels
such as `**Starter input:**` as substitutes; content from those may be
preserved, but the headings must match the H4 vocabulary above so every step
renders and parses identically.

### Expected result format

The `#### Expected result` subsection must be one observable sentence in the
shape:

> You have [deliverable], and [observable check] is true.

Example: "You have a three-line handoff, and `git status --short` shows no
untracked changes in the console checkout."

This sentence is the referent for the whole-step self-report: the learner
marks the step complete when they have verified this result.

## 4. Supporting sections

1. `### Common mistakes` — at least three, each named (`**Mistake 1:**`).
2. Pro tips — at least two, each named (`**Pro tip 1:**`). Standard steps
   render them in the `## Pro tips` tab; bonus steps (Learn + Implement only)
   render them as `### Pro tips` inside Implement.
3. `#### Stretch goal` — optional; never adds points or scope.
4. `[SCREENSHOT: ...]` lines stay where they are; they are placeholders
   rendered by the site.

## 5. Complete closer

The closing `## Complete` section contains a single parser-compatible line,
which the site's tab splitter strips from rendered content (the self-report is
a React control, not a markdown checkbox):

```markdown
## Complete

- [ ] Mark complete
```

The old second line (`- [ ] I got the expected outcome`) is removed. The
self-report checkbox in the UI links to this step's `#### Expected result`.

## 6. Anti-slop and copy rules

- anti-slop applies DURING all curriculum and site work (pointer in
  `AGENTS.md`).
- Curriculum prose and this documentation are **exempt** from the anti-slop
  R-02 em-dash ban (documentation carve-out). Em dashes are permitted in step
  prose where they aid reading.
- Site UI copy (nav, buttons, labels, quiz, progress text) must contain **no
  em dashes** and no generic CTAs or AI buzzwords (R-15/R-16).
- `site/DESIGN.md` supplies the design direction (R-37); the step pages follow
  its component intent.

## 7. Frontmatter invariant

Frontmatter (`step`, `points`, `module`, `versions`, `personas`) is byte-
identical between the EN step and its ES mirror. Points and modules never
change in a narrative edit.