import { describe, expect, it } from "vitest";
import { getSteps } from "./curriculum";
import { splitStepTabs } from "./tabs";

function split(body: string) {
  return splitStepTabs(body);
}

describe("step tabs contract", () => {
  it.each([
    [1, ["The project", "Implement", "Quiz"]],
    [2, ["Learn", "Implement", "Pro tips", "Advanced", "Quiz"]],
    [9, ["Learn", "Implement", "Advanced", "Quiz"]],
    [10, ["Learn", "Implement", "Advanced", "Quiz"]],
    [11, ["Learn", "Implement", "Terminology", "Advanced", "Quiz"]],
    ...[12, 13, 14, 15].map(n => [n, ["Learn", "Implement", "Quiz"]]),
    ...[31, 32, 33].map(n => [n, ["Learn", "Implement", "Quiz"]]),
  ])("honors step %s schema", (number, labels) => {
    const step = getSteps().find(s => s.step === number)!;
    expect(split(step.body).map(t => t.label)).toEqual(labels);
  });

  it("preserves nested fenced headings, citations, diagrams and reference definitions", () => {
    const code = "````md\n## Advanced\n```ts\nconst ids = [1];\n```\n## Complete\n````";
    const body = `# Step title\n\nIntro\n\n## Learn\n\n${code}\n\n> ## Implement\n\nSee [guide][ref] and claim[1], diagrams/01-workshop-arc.mmd\n\n## Implement\n\nDo it\n\n## Complete\n\n- [ ] Mark complete\n- [ ] I got the expected outcome\n\n[ref]: https://example.com/docs\n`;
    const tabs = split(body);
    expect(tabs.map(t => t.id)).toEqual(["learn", "implement"]);
    expect(tabs[0].body).toContain(code);
    expect(tabs[0].body).toContain("Intro");
    expect(tabs[0].body).toContain("> ## Implement");
    expect(tabs[0].body).toContain("claim[1]");
    expect(tabs[0].body).toContain("01-workshop-arc.mmd");
    expect(tabs[0].body).toContain("[ref]: https://example.com/docs");
    expect(tabs.map(t => t.body).join("")).not.toContain("# Step title");
    expect(tabs.map(t => t.body).join("")).not.toContain("- [ ] Mark complete");
  });

  it("keeps unexpected content rather than silently discarding it", () => {
    const tabs = split("# Title\n## Learn\nA\n## Notes\nB\n## Implement\nC\n## Complete\n- [ ] Mark complete\n- [ ] I got the expected outcome\n\nKeep this explanation.");
    expect(tabs[0].body).toContain("## Notes\nB");
    expect(tabs[1].body).toContain("Keep this explanation.");
  });
});
