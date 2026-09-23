#!/usr/bin/env node
/**
 * Anchor-parity check for bilingual content, per PHASE3-PLAN P5-4:
 * - bibliography.es.md must expose the exact same [n] anchors as bibliography.md
 * - glossary.es.md must cover the same number of term entries as glossary.md
 *   (headings are termbase-translated, so only cardinality is comparable).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function read(file) {
  return fs.readFileSync(path.join(root, file), "utf8");
}

let failures = 0;

const enAnchors = read("bibliography.md").split("\n").filter((l) => /^\[\d+\]/.test(l)).map((l) => l.match(/^\[(\d+)\]/)[1]);
const esAnchors = read("bibliography.es.md").split("\n").filter((l) => /^\[\d+\]/.test(l)).map((l) => l.match(/^\[(\d+)\]/)[1]);
for (const a of enAnchors.filter((a) => !esAnchors.includes(a))) {
  failures++;
  console.error(`bibliography.es.md: missing anchor [${a}]`);
}
for (const a of esAnchors.filter((a) => !enAnchors.includes(a))) {
  failures++;
  console.error(`bibliography.es.md: extra anchor [${a}]`);
}

const enTerms = read("glossary.md").split("\n").filter((l) => /^##\s+/.test(l)).length;
const esTerms = read("glossary.es.md").split("\n").filter((l) => /^##\s+/.test(l)).length;
if (enTerms !== esTerms) {
  failures++;
  console.error(`glossary.es.md: expected ${enTerms} term headings, found ${esTerms}`);
}

if (failures > 0) {
  console.error(`anchor-parity check FAILED: ${failures} mismatch(es)`);
  process.exit(1);
}
console.log(`anchor-parity check PASSED: ${enAnchors.length} bibliography anchors exact, ${esTerms}/${enTerms} glossary entries`);
