import fs from "node:fs";
import path from "node:path";
import { createHash } from "node:crypto";
import { splitStepTabs } from "./tabs";
import type { Catalog } from "./progress";
import type { Locale } from "./i18n";

export interface StepMeta {
  slug: string;
  step: number;
  title: string;
  points: number;
  module: string;
  versions: string[];
  personas: string[];
  body: string;
}

const STEPS_DIR = path.join(process.cwd(), "..", "steps");

function stepsDir(locale: Locale): string {
  return locale === "es" ? path.join(STEPS_DIR, "es") : STEPS_DIR;
}

function parseFrontmatter(raw: string): { meta: Record<string, string>; body: string } {
  const m = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  const meta: Record<string, string> = {};
  if (!m) return { meta, body: raw };
  for (const line of m[1].split("\n")) {
    const i = line.indexOf(":");
    if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim().replace(/^"|"$/g, "");
  }
  return { meta, body: m[2] };
}

function parseList(v: string): string[] {
  return v.replace(/^\[|\]$/g, "").split(",").map((s) => s.trim().replace(/^"|"$/g, "")).filter(Boolean);
}

/** All 33 steps, ordered by step number. Reads ../steps/*.md (EN) or ../steps/es/*.md (ES). ES falls back to EN until the ES tree exists. */
export function getSteps(locale: Locale = "en"): StepMeta[] {
  const dir = stepsDir(locale);
  const files = fs.existsSync(dir) ? fs.readdirSync(dir).filter(f => f.endsWith(".md")) : [];
  if (locale === "es" && files.length === 0) return getSteps("en");
  return files
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), "utf8");
      const { meta, body } = parseFrontmatter(raw);
      return {
        slug: file.replace(/\.md$/, ""),
        step: Number(meta.step),
        title: meta.title ?? file,
        points: Number(meta.points ?? 0),
        module: meta.module ?? "",
        versions: parseList(meta.versions ?? ""),
        personas: parseList(meta.personas ?? ""),
        body,
      };
    })
    .sort((a, b) => a.step - b.step);
}

export function getProgressCatalog(steps = getSteps()): Catalog {
  return steps.map(step => ({
    slug: step.slug,
    step: step.step,
    points: step.points,
    sections: splitStepTabs(step.body).map(tab => ({
      id: tab.id,
      label: tab.label,
      revision: createHash("sha256").update(tab.body).digest("hex").slice(0, 16),
    })),
  }));
}

export function getStep(slug: string, locale: Locale = "en"): StepMeta | undefined {
  return getSteps(locale).find((s) => s.slug === slug);
}
