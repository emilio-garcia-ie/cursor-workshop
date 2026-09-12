import fs from "node:fs";
import path from "node:path";

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

/** All 33 steps, ordered by step number. Reads ../steps/*.md (Repo B source). */
export function getSteps(): StepMeta[] {
  return fs
    .readdirSync(STEPS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(STEPS_DIR, file), "utf8");
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

export function getStep(slug: string): StepMeta | undefined {
  return getSteps().find((s) => s.slug === slug);
}
