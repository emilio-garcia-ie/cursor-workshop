import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { linkCitations, referencedDiagrams } from "./citations";
import { getSteps, getProgressCatalog } from "./curriculum";
import { splitStepTabs } from "./tabs";
import { SHORT, MEDIUM, PERSONAS, PERSONA_STEPS, VERSIONS, stepsFor } from "./tracks";

function numbers(text: string): number[] {
  return text.split(",").flatMap(part => {
    const match = part.trim().match(/^(\d+)(?:[–-](\d+))?$/);
    if (!match) throw new Error(`Invalid track range: ${part}`);
    const start = Number(match[1]);
    return Array.from({ length: Number(match[2] ?? start) - start + 1 }, (_, index) => start + index);
  });
}

describe("curriculum rendering and filter regressions", () => {
  it("links prose citations without altering nested fences, inline code, links or images", () => {
    const code = "````md\n## Implement\n```ts\nconst ids = [1];\n```\n````";
    const body = `Claim[1] and **fact[2]**.\n\n${code}\n\nInline \`ids[3]\`, [4](https://example.com/docs), ![5](/image.svg).`;
    const result = linkCitations(body);
    expect(result).toContain("Claim[1](/bibliography#1)");
    expect(result).toContain("**fact[2](/bibliography#2)**");
    expect(result).toContain(code);
    expect(result).toContain("`ids[3]`");
    expect(result).toContain("[4](https://example.com/docs)");
    expect(result).toContain("![5](/image.svg)");
    expect(linkCitations(result)).toBe(result);
    const es = linkCitations(body, "es");
    expect(es).toContain("Claim[1](/es/bibliography#1)");
    expect(es).toContain("**fact[2](/es/bibliography#2)**");
    expect(linkCitations(es, "es")).toBe(es);
  });

  it("keeps diagram references discoverable inside their parsed sections", () => {
    const tabs = splitStepTabs("# Title\n## Learn\nSee diagrams/01-workshop-arc.mmd\n## Implement\nSee diagrams/05-mcp-shapes.mmd\n## Complete\n- [ ] Mark complete\n- [ ] I got the expected outcome");
    expect(referencedDiagrams(tabs[0].body)).toEqual(["01-workshop-arc"]);
    expect(referencedDiagrams(tabs[1].body)).toEqual(["05-mcp-shapes"]);
  });

  it("keeps stable slugs and semantic section ids for all 33 source steps", () => {
    const steps = getSteps();
    const catalog = getProgressCatalog(steps);
    expect(catalog).toHaveLength(33);
    expect(catalog.map(s => s.slug)).toEqual(steps.map(s => s.slug));
    expect(new Set(catalog.map(s => s.slug)).size).toBe(33);
    for (const step of catalog) {
      expect(step.sections.length).toBeGreaterThanOrEqual(2);
      expect(step.sections.every(s => /^[a-z]+(?:-[a-z]+)*$/.test(s.id) && /^[a-f0-9]{16}$/.test(s.revision))).toBe(true);
    }
    expect(getProgressCatalog(steps)).toEqual(catalog);
  });

  it("matches canonical version/persona intersections for every selection", () => {
    const text = readFileSync("../tracks.md", "utf8");
    const short = numbers(text.match(/\*\*short \(4h\):\*\* ([\d, ]+)/)![1]);
    const medium = [...short, ...numbers(text.match(/\*\*medium \(6h\):\*\* short \+ ([\d, ]+)/)![1])].sort((a, b) => a - b);
    expect(SHORT).toEqual(short);
    expect(MEDIUM).toEqual(medium);
    const expectedPersonas = Object.fromEntries(PERSONAS.map(persona => {
      const line = text.split("\n").find(l => l.startsWith(`- **${persona}:**`))!;
      const raw = line.split("** ")[1].split(" (")[0].replace(" + Forecasts screen", "").replace(" + ", ", ");
      return [persona, numbers(raw).sort((a, b) => a - b)];
    }));
    const all = Array.from({ length: 33 }, (_, i) => i + 1);
    for (const version of VERSIONS) {
      const expectedVersion = version === "short" ? short : version === "medium" ? medium : all;
      for (const persona of ["all", ...PERSONAS] as const) {
        const expected = expectedVersion.filter(n => persona === "all" || expectedPersonas[persona].includes(n));
        const actual = getSteps().filter(s => (stepsFor(version)?.includes(s.step) ?? true) && (persona === "all" || PERSONA_STEPS[persona].includes(s.step))).map(s => s.step);
        expect(actual, `${version}/${persona}`).toEqual(expected);
      }
    }
  });
});
