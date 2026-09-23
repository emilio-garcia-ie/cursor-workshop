#!/usr/bin/env node
/** Verifies ES step files mirror EN frontmatter (title may be translated; step/points/module/versions/personas must be byte-identical) and exist 1:1. */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const enDir = path.join(root, "steps");
const esDir = path.join(root, "steps", "es");

function frontmatter(file) {
  const raw = fs.readFileSync(file, "utf8");
  const match = raw.match(/^---\n([\s\S]*?)\n---\n/);
  if (!match) throw new Error(`No frontmatter: ${file}`);
  return match[1].split("\n").map(line => {
    const i = line.indexOf(":");
    return [line.slice(0, i).trim(), line.slice(i + 1).trim()];
  });
}

let failures = 0;
const enFiles = fs.readdirSync(enDir).filter(f => f.endsWith(".md")).sort();
const esFiles = fs.existsSync(esDir) ? fs.readdirSync(esDir).filter(f => f.endsWith(".md")).sort() : [];
const enNames = new Set(enFiles);
const esNames = new Set(esFiles);

for (const f of enFiles) if (!esNames.has(f)) { console.error(`MISSING ES file: steps/es/${f}`); failures++; }
for (const f of esFiles) if (!enNames.has(f)) { console.error(`EXTRA ES file: steps/es/${f}`); failures++; }

const INVARIANT = ["step", "points", "module", "versions", "personas"];
for (const f of esFiles) {
  if (!enNames.has(f)) continue;
  const en = new Map(frontmatter(path.join(enDir, f)));
  const es = new Map(frontmatter(path.join(esDir, f)));
  for (const key of INVARIANT) {
    if (en.get(key) !== es.get(key)) {
      console.error(`FRONTMATTER MISMATCH ${f}: ${key}: EN "${en.get(key)}" vs ES "${es.get(key)}"`);
      failures++;
    }
  }
  for (const key of en.keys()) {
    if (!es.has(key)) { console.error(`FRONTMATTER MISSING ${f}: ${key}`); failures++; }
  }
}

if (failures > 0) { console.error(`frontmatter parity FAILED: ${failures}`); process.exit(1); }
console.log(`frontmatter parity PASSED: ${esFiles.length}/${enFiles.length} ES files mirror EN metadata`);