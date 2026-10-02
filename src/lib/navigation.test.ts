import { describe, expect, it } from "vitest";
import { getSteps } from "./curriculum";
import { isLastStep, stepHref, stepNav } from "./navigation";

const steps = getSteps();

describe("step navigation", () => {
  it("returns previous/next by index across the full curriculum", () => {
    const mid = stepNav("02-clone-and-run", steps);
    expect(mid.previous?.slug).toBe("01-day-one");
    expect(mid.next?.slug).toBe("03-rules");
  });

  it("returns null at the first boundary", () => {
    const first = stepNav(steps[0].slug, steps);
    expect(first.previous).toBeNull();
    expect(first.next?.slug).toBe(steps[1].slug);
  });

  it("returns null at the last boundary", () => {
    const last = stepNav(steps[steps.length - 1].slug, steps);
    expect(last.next).toBeNull();
    expect(last.previous?.slug).toBe(steps[steps.length - 2].slug);
  });

  it("returns nulls for an unknown slug", () => {
    expect(stepNav("does-not-exist", steps)).toEqual({ previous: null, next: null });
  });

  it("builds EN hrefs bare", () => {
    expect(stepHref("01-day-one", "en")).toBe("/steps/01-day-one");
  });

  it("builds ES hrefs with /es prefix", () => {
    expect(stepHref("01-day-one", "es")).toBe("/es/steps/01-day-one");
  });

  it("preserves a version/persona query string", () => {
    expect(stepHref("01-day-one", "en", "?version=short&persona=developers")).toBe("/steps/01-day-one?version=short&persona=developers");
    expect(stepHref("01-day-one", "es", "?version=long")).toBe("/es/steps/01-day-one?version=long");
  });

  it("ignores an empty or single-character query", () => {
    expect(stepHref("01-day-one", "en", "")).toBe("/steps/01-day-one");
    expect(stepHref("01-day-one", "en", "?")).toBe("/steps/01-day-one");
  });

  it("flags only the final step as last", () => {
    const all = steps.map(s => isLastStep(s.slug, steps));
    expect(all.filter(Boolean)).toHaveLength(1);
    expect(all[all.length - 1]).toBe(true);
    expect(all[all.length - 2]).toBe(false);
  });
});