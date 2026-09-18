# Tracks: versions and personas (single source for site pickers)

Step total: **520 pts** (modules **80/80/70/55/65/70/100**, including Bonus).

## Versions (nesting: short ⊂ medium ⊂ long)

- **short (4h):** 1, 2, 3, 5, 6, 7, 8, 9, 11, 12
- **medium (6h):** short + 4, 10, 14, 16, 17, 20, 22, 25, 27, 29
- **long (8h):** all 33 steps (1–33)

| Version | Steps | Active points (all personas) |
|---|---|---|
| short | 10 | 215 |
| medium | 20 | 355 |
| long | 33 | 520 |

## Personas (intersect with the selected version, including long)

- **vibecoders:** 1, 2, 3, 5, 16, 17, 21, 23
- **developers:** 1–11, 16–22 (core engineering path)
- **data-scientists:** 1, 2, 4, 5, 18, 22, 24 + Forecasts screen
- **ai-engineers:** 6, 7, 8, 9, 13, 24, 29, 30
- **forward-deployed:** 25, 26, 27, 31, 32, 33 + 5, 11

## Rules

- Pickers filter the step list to EXACTLY these sets (S03 diff-checks this).
- With a selected persona, visible steps = version set ∩ persona set, including
  long. With all personas selected, visible steps = version set. Long shows
  all 33 steps only with all personas selected.
- Bonus steps 12–15 appear in short only as Step 12; medium includes 12 and
  14; long includes all bonus steps, still subject to the persona intersection.
- IDs, slugs, version/persona memberships and all 33 steps are unchanged.
  The canonical picker sets above are mirrored in `site/src/lib/tracks.ts`;
  frontmatter membership arrays are retained, not used to redefine these sets.
- Displayed points and progress use step frontmatter; filtered totals sum only
  the selected intersection, not the entire curriculum.

## Active Phase B budget — 2026-09-17

The assessed exercise kits are now present in all 33 steps. Exactly **16 steps**
receive **+5 pts**: **3, 4, 5, 6, 7, 8, 9, 16, 17, 18, 20, 21, 22, 26, 29, 33**.
The remaining 17 allocations are unchanged. Points represent assessed work,
not a claim that product runtimes or learner exercises have passed verification.
Corrections and footnotes alone do not earn additional points.

The baseline column is historical (pre-activation **440 pts**); the active
column is authoritative. Kit labels describe the implemented prose, including
source-only/offline alternatives rather than unverified indexing or enforcement.

| Step | Historical baseline pts | Increase | Active pts | Assessed kit / unchanged allocation |
|---|---|---|---|---|
| 1 | 5 | 0 | 5 | Retain |
| 2 | 30 | 0 | 30 | Retain |
| 3 | 20 | 5 | 25 | Rule scope test and evaluation |
| 4 | 15 | 5 | 20 | Four-file versus ticket-only context/evidence experiment |
| 5 | 30 | 5 | 35 | Reviewed multi-file feature diff and acceptance evidence |
| 6 | 20 | 5 | 25 | MCP configuration, read-only request and unavailable/permission cases |
| 7 | 15 | 5 | 20 | Skill trigger/scope evaluation and optional Custom Mode comparison |
| 8 | 15 | 5 | 20 | Readonly reviewer evidence and restriction tests |
| 9 | 15 | 5 | 20 | Hook exit/JSON/failure-path matrix |
| 10 | 5 | 0 | 5 | Retain |
| 11 | 25 | 0 | 25 | Retain |
| 12 | 10 | 0 | 10 | Retain |
| 13 | 10 | 0 | 10 | Retain |
| 14 | 20 | 0 | 20 | Retain |
| 15 | 10 | 0 | 10 | Retain |
| 16 | 10 | 5 | 15 | Tab versus selected-range inline-edit diff review |
| 17 | 10 | 5 | 15 | Saved plan handoff at an explicitly chosen path |
| 18 | 10 | 5 | 15 | Isolated parallel tasks and result integration |
| 19 | 10 | 0 | 10 | Retain |
| 20 | 10 | 5 | 15 | Hypothesis, instrumentation, reproduction and cleanup |
| 21 | 10 | 5 | 15 | Browser evidence and visual iteration |
| 22 | 10 | 5 | 15 | Real acceptance RED/GREEN and edge-case regression evidence |
| 23 | 10 | 0 | 10 | Retain |
| 24 | 10 | 0 | 10 | Retain |
| 25 | 10 | 0 | 10 | Retain |
| 26 | 10 | 5 | 15 | Offline trust-boundary, authorization and output-redaction review |
| 27 | 10 | 0 | 10 | Retain |
| 28 | 10 | 0 | 10 | Retain |
| 29 | 10 | 5 | 15 | Harness evaluation with held-out regression evidence |
| 30 | 10 | 0 | 10 | Retain |
| 31 | 15 | 0 | 15 | Retain |
| 32 | 15 | 0 | 15 | Retain |
| 33 | 15 | 5 | 20 | Measured improvement loop and reviewable freshness evidence |
| **Total** | **440** | **80** | **520** | **Active** |

| Module | Steps | Historical baseline pts | Increase | Active pts |
|---|---|---|---|---|
| Foundations | 1–4 | 70 | 10 | 80 |
| Building | 5–7 | 65 | 15 | 80 |
| Guardrails | 8–11 | 60 | 10 | 70 |
| The Fast Loop | 16–19 | 40 | 15 | 55 |
| Debug & Test | 20–24 | 50 | 15 | 65 |
| Team & Scale | 25–30 | 60 | 10 | 70 |
| Bonus | 12–15, 31–33 | 95 | 5 | 100 |
| **Total** | **1–33** | **440** | **80** | **520** |

Arithmetic: **16 × 5 = 80; historical 440 + 80 = active 520**.
Module cross-check: **80 + 80 + 70 + 55 + 65 + 70 + 100 = 520**.
Version memberships stay **10 ⊂ 20 ⊂ 33** steps; the budget adds no steps.
