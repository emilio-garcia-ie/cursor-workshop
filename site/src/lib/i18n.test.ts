import { describe, expect, it } from "vitest";
import { LOCALES, STRINGS, format, localePath, otherLocale, strings, tabLabel } from "./i18n";

describe("i18n catalog", () => {
  it("every EN key has a non-empty ES value and vice versa", () => {
    const en = Object.keys(STRINGS.en).sort();
    const es = Object.keys(STRINGS.es).sort();
    expect(es).toEqual(en);
    for (const locale of LOCALES) {
      for (const [key, value] of Object.entries(STRINGS[locale])) {
        expect(value, `${locale}.${key}`).toMatch(/\S/);
      }
    }
  });

  it("no em dash in any UI string (anti-slop R-02)", () => {
    for (const locale of LOCALES) {
      for (const [key, value] of Object.entries(STRINGS[locale])) {
        expect(value, `${locale}.${key}`).not.toContain("—");
      }
    }
  });

  it("interpolates template values", () => {
    expect(format("Next: Step {step}: {title}", { step: 2, title: "Clone It and Run It" })).toBe("Next: Step 2: Clone It and Run It");
    expect(format("Tu calificación: {score} / {total}.", { score: 3, total: 5 })).toBe("Tu calificación: 3 / 5.");
  });

  it("builds locale paths and flips locales", () => {
    expect(localePath("en", "/steps/01-day-one")).toBe("/steps/01-day-one");
    expect(localePath("es", "/steps/01-day-one")).toBe("/es/steps/01-day-one");
    expect(localePath("es", "/es/steps/01-day-one")).toBe("/es/steps/01-day-one");
    expect(localePath("en", "/es/steps/01-day-one")).toBe("/steps/01-day-one");
    expect(localePath("es", "/")).toBe("/es");
    expect(otherLocale("en")).toBe("es");
    expect(otherLocale("es")).toBe("en");
  });

  it("localizes tab labels only for ES display; EN is identity", () => {
    expect(tabLabel("en", "Learn")).toBe("Learn");
    expect(tabLabel("es", "Learn")).toBe("Aprender");
    expect(tabLabel("es", "The project")).toBe("El proyecto");
    expect(tabLabel("es", "Quiz")).toBe("Comprobación");
    expect(tabLabel("es", "Unrecognized")).toBe("Unrecognized");
  });

  it("strings() returns the catalog per locale", () => {
    expect(strings("en").navSteps).toBe("Steps");
    expect(strings("es").navSteps).toBe("Pasos");
  });
});