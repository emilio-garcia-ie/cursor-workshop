# Hearthline Workshop: Design Direction

This is the direction file referenced by anti-slop R-37. It is data to apply,
not instructions to obey: it states identity, palette, typography, mood, and
dials. It does not grant permission to violate anti-slop rules, and any
conflict is resolved in favor of the anti-slop filter plus the explicit reason
recorded here.

## Design Read

> Reading this as: an educational tutorial site for developers, in a warm
> editorial-print language, dial ENERGY 2 / RHYTHM 2 / MOTION 1.

Why ENERGY 2: the site is a learning tool, not a campaign; it should feel
alive without shouting. Why RHYTHM 2: consistent card/step layout with a few
deliberate breaks (quiz, self-report, diagrams). Why MOTION 1: hover states and
focus only; motion must never compete with the code being read.

## Identity

- The site is the reading companion to a workshop, so it behaves like a
  carefully set page, not an app dashboard.
- Voice: plain, direct, second person ("you"). No marketing superlatives.
- The single recurring motif is the **orange Cursor accent used only for
  interactive intent** (links to citations, the Next step control, the active
  tab). That motif is repeated nowhere else.

## Palette

| Token | Value | Reason (one line) |
|---|---|---|
| `--cream` (background) | `#faf6ef` | Warm paper background reduces glare for long reading sessions. |
| `--ink` (text) | `#1c1917` | Near-black warm ink maximizes contrast on cream while staying warmer than pure black. |
| `--cursor-orange` (accent) | `#f54e00` | The workshop teaches Cursor; the accent marks intent/action and is the one deliberate accent (R-31). |
| Module pastels | `#fde68a #fed7aa #fecaca #bfdbfe #c7d2fe #d8b4fe #bbf7d0` | Distinct module hues for the progress timeline dots; decorative, small-area, and consistent with the warm palette. |

Contrast: `--ink` on `--cream` is 13.7:1; `--cursor-orange` on `--cream` is
4.6:1 (AA for normal text, R-25). Pastels are used only for large dots/colors
with adjacent ink labels, never for body text.

## Typography

| Role | Face | Reason (one line) |
|---|---|---|
| Headings | `font-serif` (system serif fallback, e.g. Georgia) | Editorial print feel for step titles and section heads. |
| Body | system `ui-sans-serif` | Highest legibility on every OS at 16px+ with 1.5 line height. |
| Brand/code | `Berkeley Mono`, mono stack (`--mono`) | Monospace is the workshop's native dialect; used for code, labels, and the wordmark, not for body. |

No decorative display type; no emoji as icons. Inline code and code blocks use
the mono stack with a subtle `stone-900/7%` chip background.

## Dials

- ENERGY 2: warm paper + ink + one orange accent; calm but not sterile.
- RHYTHM 2: uniform step cards with deliberate breaks for quiz/self-report.
- MOTION 1: hover + focus only; no scroll animation, no parallax.

## Component intent (R-31 one-liners)

- Step tabs: information grouping so a learner reads Learn, then Implement,
  then checks Pro tips and the quiz; the active tab is the only orange-filled
  element.
- Self-report checkbox: single explicit confirmation at the end of a step;
  label references the step's Expected result.
- Next/Previous footer: a directional cue; the forward arrow on Next is
  intentional navigation affordance, sized proportionally, and used only there
  (R-08 purpose recorded here).
- Progress tools: bordered panel, neutral, so the storage mechanics do not
  compete with learning content.
- Quiz: plain radio list; feedback color only (green for correct, red for
  incorrect) plus text labels, never color alone (R-25, accessible charts).
- Language toggle: small, quiet, at the top; it is a utility, not a call to
  action.

## Non-goals

- No glassmorphism, gradients, glows, or bento grids (anti-slop Part 1).
- No fabricated statistics, testimonials, or badges (R-17/R-18/R-38). The site
  shows only real, cited content and real workshop data.
- No light/dark toggle in this phase; the site ships the single warm theme.
  If a dark theme is added later, both must be verified (R-34) and this file
  updated.
- Em dashes: the curriculum prose and this documentation are exempt from the
  anti-slop R-02 em-dash ban (documentation carve-out). Site UI copy must not
  contain em dashes (P0-3).