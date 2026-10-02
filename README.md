# cursor-workshop (unofficial)

"You join Hearthline on day one, clone the operator console, and ship a
real feature while learning every Cursor surface in the order you would
actually reach for it. Unofficial. Cited throughout. Built for
vibecoders, developers, data scientists, AI engineers, and
forward-deployed engineers."

> **Unofficial.** This is one person's version of how to teach Cursor. It is
> not affiliated with, endorsed by, or sponsored by Cursor (Anysphere).
> Cursor feature names belong to their owners; docs are cited, not copied.

- Case-study repo: `hearthline-operator-console` (sibling directory / repo).
- Curriculum: `steps/` (33 steps, 440 points, four-tab structure).
- Sources: `bibliography.md`. Claim log: `fact-check.md`.
- Terms: `glossary.md`. Diagrams: `diagrams/*.mmd`.
- Versions & personas: `tracks.md`. Interactive site: `site/`.

---

## Commands

- `npm run dev` — local dev server
- `npm run build` / `npm start` — production build and serve
- `npm run test` — Vitest unit contracts (tab splitting, quiz parser, progress model, progress file adapter, step navigation, track filters)
- `npm run test:browser` — Playwright check (migration → recovery → export/import → Resume) plus axe ARIA audits and WCAG contrast sampling on 6 pages. Uses the installed Google Chrome binary by default; set `QA_BROWSER=webkit` or `QA_BROWSER=firefox` to run another engine (install with `npx -y playwright@1.58.2 install webkit firefox`). Set `QA_PRODUCTION=1` to run against `next start` instead of dev; set `QA_SCREENSHOT_DIR` to save 390px/1440px screenshots; set `QA_HOST=localhost` to serve on localhost instead of 127.0.0.1.
- `npm run lint`, `npm run typecheck` — gate scripts
- `npm run check:termbase` — offline ES termbase check: banned EN terms must not appear untranslated in ES prose (`steps/es/`, `glossary.es.md`, `bibliography.es.md`, `fact-check.es.md`). `npm test` runs the same check as a unit gate.
- `npm run check:anchors` — bibliography `#n` anchor parity (exact) and glossary entry-count parity between ES and EN files.

## Bilingual content (EN/ES)

- EN serves at bare paths; ES under `/es/*`. UI strings localize through `src/lib/i18n.ts`; ES steps live in `steps/es/*.md` with frontmatter byte-identical to EN except `title:`. ES supporting files (`glossary.es.md`, `bibliography.es.md`, `fact-check.es.md`) are termbase-checked siblings of the EN originals; the EN fact-check ledger is the authoritative verification record.
- Structural headings (tab labels, exercise-kit headings) stay English inside ES source files; only the displayed label localizes, keeping parser and `#expected-result` anchors stable. Citations on ES pages resolve to `/es/bibliography#n`; glossary step links map to `/es/steps/...`.
