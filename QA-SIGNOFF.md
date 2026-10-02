# QA sign-off (S05)

Date: 2026-09-11. Method: production `next start` + headless-Chrome
screenshots + curl assertions (no interactive browser available).

## Automated checks (all passing)

- 42/42 static pages build (`/`, `/steps`, 33× `/steps/[slug]`, `/glossary`,
  `/bibliography`, `/diagrams`).
- Home + step + glossary + bibliography + diagrams routes: HTTP 200.
- Disclaimer string present in served HTML (home + step verified).
- Citation link `/bibliography#4` present on Step 6 page; Mark-complete and
  outcome checkbox text present.
- Version/persona filtering exact vs tracks.md via curl: short [1,2,3,5,6,7,
  8,9,11,12], medium (20), vibecoders (8) — all match.
- Step 30 page embeds `10-hearthline-domains.svg`.
- Mobile 390px screenshot (`/tmp/qa-mobile.png`): no horizontal overflow;
  pickers wrap; short list shows "10 steps · 185 points".
- Desktop 1440px screenshot (`/tmp/qa-desktop.png`, Step 6): serif title,
  progress checkboxes, superscript citations, dark code block, JSON block.

## Deferred to post-publish (explicit, not implied green)

- Real-device touch check (iOS Safari / Android Chrome).
- localStorage persistence across reload (code-reviewed; needs a live click).
- Screen-reader pass on pickers and checkboxes.

## Known non-defects

- Mobile nav title wraps to 3 lines at 390px — acceptable, no overflow.
- Bibliography carries 33 entries (see G4 note: [33] Side Chats added
  during authoring; superset of the required 32).
