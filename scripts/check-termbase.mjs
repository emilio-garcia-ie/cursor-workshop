#!/usr/bin/env node
/**
 * Offline termbase consistency check for ES content. Verifies that banned EN
 * terms do not appear untranslated in ES prose. Scope follows the translation
 * contract (curriculum-standards / i18n task): fenced code, inline code, and
 * structural English headings (parser + display-localizer contract) are never
 * translated, and terms whose approved ES form equals the EN form (e.g.
 * variable -> variable) cannot be "untranslated".
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const termbase = fs.readFileSync(path.join(root, "i18n", "termbase.csv"), "utf8");
const rows = termbase.split("\n").slice(1).filter(Boolean).map(line => line.split(","));
const translate = new Map(rows
  .filter(([, es]) => es && !/^(Hearthline|Cursor|keep|do not translate|Hook)/i.test(es) && !es.includes("keep English"))
  .map(([en, es]) => [en.toLowerCase(), es]));

// Terms that must NOT appear untranslated in ES prose (with word boundaries, case-insensitive).
const banned = [
  ...translate.keys(),
  "operator console",
  "acceptance criteria",
  "planted bug",
  "expected result",
  "self-report",
  "knowledge check",
  "work order",
  "trust boundary",
  "spend ceiling",
  "stop condition",
].filter(term => term && term.length > 3 && !/^(cursor|hearthline|hook|skill|ticket|plugin|marketplace|prompt|diff|worktree|checkout|canvas|composer|failclosed|red|green|auto|plan mode|print mode|dashboard|forecasts)$/.test(term));

const targets = process.argv.length > 2
  ? process.argv.slice(2)
  : ["steps/es", "glossary.es.md", "bibliography.es.md", "fact-check.es.md"];

// Structural English headings stay in source per the parser + display-localizer
// contract (H2 tab labels, H3/H4 exercise-kit vocabulary, closer).
const STRUCTURAL_HEADINGS = [
  "The project", "Learn", "Implement", "Pro tips", "Advanced", "Terminology",
  "Quiz", "Complete", "Common mistakes", "Diagrams", "Exercise kit",
  "Starter code path", "Minimal working example", "Expected diff", "Hints",
  "Solution approach", "Expected result", "Stretch goal",
];

/** Reduce an ES step file to the prose the contract actually requires translated. */
function proseOnly(raw) {
  const noFrontmatter = raw.replace(/^---[\s\S]*?---/, "");
  const noCode = noFrontmatter
    .replace(/```[\s\S]*?```/g, "")
    .replace(/`[^`]*`/g, "")
    .replace(/https?:\/\/\S+/g, "")
    .replace(/\]\([^)]*\)/g, "]");
  return noCode
    .split("\n")
    .filter((line) => {
      const m = line.match(/^#{1,6}\s+(.*)$/);
      if (!m) return true;
      const heading = m[1].trim();
      return !STRUCTURAL_HEADINGS.some(
        (label) => heading === label || heading.startsWith(`${label} —`) || heading.startsWith(`${label}:`),
      );
    })
    .join("\n");
}

let failures = 0;
for (const target of targets) {
  const full = path.join(root, target);
  if (!fs.existsSync(full)) continue;
  const files = fs.statSync(full).isDirectory()
    ? fs.readdirSync(full).filter(f => f.endsWith(".md")).map(f => path.join(full, f))
    : [full];
  for (const file of files) {
    const text = fs.readFileSync(file, "utf8");
    const body = proseOnly(text);
    for (const term of new Set(banned)) {
      const expectedEs = translate.get(term);
      // Self-translating terms (approved ES form equals EN, e.g. variable -> variable)
      // cannot appear "untranslated".
      if (expectedEs && expectedEs.toLowerCase() === term) continue;
      const pattern = new RegExp(`\\b${term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "gi");
      const matches = body.match(pattern);
      if (matches) {
        failures += matches.length;
        const es = expectedEs ?? "(missing termbase entry)";
        console.error(`${path.relative(root, file)}: untranslated "${term}" x${matches.length} (expected "${es}")`);
      }
    }
  }
}

if (failures > 0) {
  console.error(`termbase check FAILED: ${failures} untranslated term occurrences`);
  process.exit(1);
}
console.log("termbase check PASSED: no banned untranslated terms in ES content");