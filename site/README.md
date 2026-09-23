# Hearthline workshop site

Next.js 16 site for the cursor-workshop curriculum (`../steps/*.md`). Step pages are prerendered; the filtered home page is dynamic. Run with a Next.js server, not an assumed static export.

## Commands

- `npm run dev` — local dev server
- `npm run build` / `npm start` — production build and serve
- `npm run test` — Vitest unit contracts (tab splitting, quiz parser, progress model, progress file adapter, step navigation, track filters)
- `npm run test:browser` — Playwright check (migration → recovery → export/import → Resume). Uses the installed Google Chrome binary; no browser download. Set `QA_PRODUCTION=1` to run against `next start` instead of dev; set `QA_SCREENSHOT_DIR` to save 390px/1440px screenshots.
- `npm run lint`, `npm run typecheck` — gate scripts
- `npm run check:termbase` — offline ES termbase check: banned EN terms must not appear untranslated in ES prose (`steps/es/`, `glossary.es.md`, `bibliography.es.md`, `fact-check.es.md`). `npm test` runs the same check as a unit gate.
- `npm run check:anchors` — bibliography `#n` anchor parity (exact) and glossary entry-count parity between ES and EN files.

## Bilingual content (EN/ES)

- EN serves at bare paths; ES under `/es/*`. UI strings localize through `src/lib/i18n.ts`; ES steps live in `steps/es/*.md` with frontmatter byte-identical to EN except `title:`. ES supporting files (`glossary.es.md`, `bibliography.es.md`, `fact-check.es.md`) are termbase-checked siblings of the EN originals; the EN fact-check ledger is the authoritative verification record.
- Structural headings (tab labels, exercise-kit headings) stay English inside ES source files; only the displayed label localizes, keeping parser and `#expected-result` anchors stable. Citations on ES pages resolve to `/es/bibliography#n`; glossary step links map to `/es/steps/...`.

## Progress storage (v2)

- Storage keys: `hearthline-progress-v2` (current), `hearthline-progress-v1` (legacy backup, read-only).
- Schema: `{ version: 2, steps: { [slug]: { sections: { [sectionId]: { completed, revision, needsReview? } }, complete?, outcome?, legacy? } }, quiz?: { [slug]: { answers: number[], score, graded } }, lastVisited?: { slug, section } }`.
- Progress file (Chrome/Edge): "Save to hearthline-progress.json" picks one file once; every later save overwrites it in place, and the remembered file loads back without a file chooser. The handle is stored locally in IndexedDB; no data leaves the browser.
- Fallback (other browsers): Export progress JSON (fixed name `hearthline-progress-v2.json`) and Import progress JSON manually.
- Migration: on first load, valid v1 `{ complete?, outcome? }` flags are copied into `legacy` per step; the v1 key is retained as a backup and never deleted by the site. Malformed, oversized, or invalid v1 data is rejected without writing v2; nothing is inferred as section completions.
- Completion is one explicit whole-step self-report, tied to the step's Expected result section. Viewing a tab records only `lastVisited`; it never marks content complete. Points are counted once per step; legacy aggregate flags count as completion but do not mark sections learned. Each step ends with a 5-question self-graded quiz (no points impact; attempts stored under `quiz`).
- Content revisions (section removal/rename): persisted progress for retired section IDs is reconciled against a published-history table, kept as `needsReview` history and never inferred as completion of a new section; obsolete `lastVisited` targets fall back to the first unfinished section. Strict imports use the same reconciliation so a legitimate older backup still imports, while fabricated unknown sections/fields remain rejected.
- Import accepts versioned JSON only (`version: 2`), strict-shaped, at most 1 MB by UTF-8 byte length, with unknown slugs/sections/fields rejected before any state change. Importing requires an explicit confirmation; a failed write rolls back.
- If stored v2 data becomes unreadable, the UI keeps the last valid snapshot, states that empty display is not a backup, and offers a raw recovery download of the exact original bytes; with no valid snapshot, the snapshot-export button is disabled.
- Progress is local-only: no accounts, backend, or telemetry, and it is not proof of learning or mastery.
- Same-browser/profile/origin resume is the Phase-2 MVP scope. Export JSON before clearing browser storage or moving to another origin; import it manually to restore compatible progress.
- Reconsider account-based sync only after demonstrated cross-device needs and explicit cost/privacy approval. Across-session return rates alone do not establish cross-device demand; no telemetry is collected in Phase 2.
