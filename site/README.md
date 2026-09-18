# Hearthline workshop site

Next.js 16 site for the cursor-workshop curriculum (`../steps/*.md`). Step pages are prerendered; the filtered home page is dynamic. Run with a Next.js server, not an assumed static export.

## Commands

- `npm run dev` — local dev server
- `npm run build` / `npm start` — production build and serve
- `npm run test` — Vitest unit contracts (tab splitting, progress model, track filters)
- `npm run test:browser` — Playwright check (migration → recovery → export/import → Resume). Uses the installed Google Chrome binary; no browser download. Set `QA_PRODUCTION=1` to run against `next start` instead of dev; set `QA_SCREENSHOT_DIR` to save 390px/1440px screenshots.
- `npm run lint`, `npm run typecheck` — gate scripts

## Progress storage (v2)

- Storage keys: `hearthline-progress-v2` (current), `hearthline-progress-v1` (legacy backup, read-only).
- Schema: `{ version: 2, steps: { [slug]: { sections: { [sectionId]: { completed, revision, needsReview? } }, complete?, outcome?, legacy? } }, lastVisited?: { slug, section } }`.
- Migration: on first load, valid v1 `{ complete?, outcome? }` flags are copied into `legacy` per step; the v1 key is retained as a backup and never deleted by the site. Malformed, oversized, or invalid v1 data is rejected without writing v2; nothing is inferred as section completions.
- Completion is an explicit self-report per section or per whole step. Viewing a tab records only `lastVisited`; it never marks content complete. Points are counted once per step; legacy aggregate flags count as completion but do not mark sections learned.
- Content revisions (section removal/rename): persisted progress for retired section IDs is reconciled against a published-history table, kept as `needsReview` history and never inferred as completion of a new section; obsolete `lastVisited` targets fall back to the first unfinished section. Strict imports use the same reconciliation so a legitimate older backup still imports, while fabricated unknown sections/fields remain rejected.
- Import accepts versioned JSON only (`version: 2`), strict-shaped, at most 1 MB by UTF-8 byte length, with unknown slugs/sections/fields rejected before any state change. Importing requires an explicit confirmation; a failed write rolls back.
- If stored v2 data becomes unreadable, the UI keeps the last valid snapshot, states that empty display is not a backup, and offers a raw recovery download of the exact original bytes; with no valid snapshot, the snapshot-export button is disabled.
- Progress is local-only: no accounts, backend, or telemetry, and it is not proof of learning or mastery.
- Same-browser/profile/origin resume is the Phase-2 MVP scope. Export JSON before clearing browser storage or moving to another origin; import it manually to restore compatible progress.
- Reconsider account-based sync only after demonstrated cross-device needs and explicit cost/privacy approval. Across-session return rates alone do not establish cross-device demand; no telemetry is collected in Phase 2.
