import { describe, expect, it } from "vitest";

import * as api from "./progress";
function model() {
  expect(api, "Missing validated progress v2 behavior").not.toBeNull();
  return api!;
}
const catalog = [
  { slug: "01-day-one", step: 1, points: 5, sections: [{ id: "the-project", label: "The project", revision: "r1" }, { id: "implement", label: "Implement", revision: "r1" }] },
  { slug: "02-clone-and-run", step: 2, points: 30, sections: [{ id: "learn", label: "Learn", revision: "r1" }] },
];
class MemoryStorage {
  values = new Map<string, string>();
  denied = false;
  getItem(key: string) { return this.values.get(key) ?? null; }
  setItem(key: string, value: string) { if (this.denied) throw new Error("Quota denied"); this.values.set(key, value); }
  removeItem(key: string) { if (this.denied) throw new Error("Denied"); this.values.delete(key); }
}

describe("progress recovery regressions", () => {
  it("preserves the last valid snapshot on malformed refresh and exports raw recovery bytes", () => {
    const storage = new MemoryStorage();
    const prior = api.setSection(api.emptyProgress(), catalog, "01-day-one", "implement", true);
    const raw = '  {"version":2, broken\n';
    storage.setItem(api.PROGRESS_KEY, raw);
    const result = api.loadProgress(storage, catalog, prior);
    expect(result.state).toEqual(prior);
    expect(result.hasSnapshot).toBe(true);
    expect(result.recovery).toEqual({ key: api.PROGRESS_KEY, raw });
    expect(result.writable).toBe(false);
    expect(storage.getItem(api.PROGRESS_KEY)).toBe(raw);
  });

  it("does not offer an empty fallback as a valid backup on initial failure", () => {
    const storage = new MemoryStorage(); storage.setItem(api.PROGRESS_KEY, "null");
    const result = api.loadProgress(storage, catalog);
    expect(result.hasSnapshot).toBe(false);
    expect(result.recovery?.raw).toBe("null");
  });

  it("retains snapshot on unavailable storage and preserves malformed legacy bytes", () => {
    const prior = api.setAggregate(api.emptyProgress(), catalog, "01-day-one", "complete", true);
    expect(api.loadProgress(null, catalog, prior).state).toEqual(prior);
    const storage = new MemoryStorage(); storage.setItem(api.LEGACY_KEY, "[broken");
    expect(api.loadProgress(storage, catalog).recovery).toEqual({ key: api.LEGACY_KEY, raw: "[broken" });
  });

  it.each(["removal", "rename"])("reconciles section %s without erasing self-report or inferring new completion", kind => {
    const prior = api.visitSection(api.setSection(api.emptyProgress(), catalog, "01-day-one", "implement", true), catalog, "01-day-one", "implement");
    const raw = api.exportProgress(prior, catalog);
    const revised = [{ ...catalog[0], sections: kind === "removal" ? [catalog[0].sections[0]] : [catalog[0].sections[0], { id: "practice", label: "Practice", revision: "r2" }] }, catalog[1]];
    const storage = new MemoryStorage(); storage.setItem(api.PROGRESS_KEY, raw);
    const result = api.loadProgress(storage, revised);
    expect(result.writable).toBe(true);
    expect(result.state.steps["01-day-one"].sections.implement).toEqual({ completed: true, revision: "r1", needsReview: true });
    expect(result.state.steps["01-day-one"].sections.practice).toBeUndefined();
    expect(api.resumeTarget(result.state, revised)).toMatchObject({ slug: "01-day-one", section: "the-project", reason: "first-unfinished" });
    expect(api.importProgress(raw, revised)).toEqual(result.state);
    expect(api.importProgress(api.exportProgress(result.state, revised), revised)).toEqual(result.state);
    expect(storage.getItem(api.PROGRESS_KEY)).toBe(raw);
  });

  it("reconciles a visited-only retired section without creating completion", () => {
    const revised = [{ ...catalog[0], sections: [catalog[0].sections[0]] }];
    const raw = JSON.stringify({ version: 2, steps: {}, lastVisited: { slug: "01-day-one", section: "implement" } });
    const result = api.importProgress(raw, revised);
    expect(result.steps).toEqual({});
    expect(result.lastVisited?.section).toBe("implement");
    expect(api.resumeTarget(result, revised)?.section).toBe("the-project");
  });

  it("keeps strict validation separate and rejects fabricated history in imports", () => {
    const prior = api.visitSection(api.emptyProgress(), catalog, "01-day-one", "implement");
    const revised = [{ ...catalog[0], sections: [catalog[0].sections[0]] }];
    expect(() => api.validateProgress(prior, revised)).toThrow();
    for (const section of ["advanced", "made-up", "__proto__", "constructor"]) {
      expect(() => api.importProgress(JSON.stringify({ version: 2, steps: {}, lastVisited: { slug: "01-day-one", section } }), revised)).toThrow();
    }
  });
});

describe("progress v2 contract", () => {
  it("migrates the exact v1 slug map, retaining backup without inventing section completions", () => {
    const m = model();
    const storage = new MemoryStorage();
    const old = JSON.stringify({ "01-day-one": { complete: true, outcome: false }, "02-clone-and-run": { outcome: true } });
    storage.setItem(m.LEGACY_KEY, old);
    const result = m.loadProgress(storage, catalog);
    expect(result.state.steps["01-day-one"]).toEqual({ sections: {}, legacy: { complete: true, outcome: false } });
    expect(result.state.steps["02-clone-and-run"].legacy).toEqual({ outcome: true });
    expect(storage.getItem(m.LEGACY_KEY)).toBe(old);
    expect(JSON.parse(storage.getItem(m.PROGRESS_KEY)!)).toEqual(result.state);
    expect(m.summarize(result.state, catalog)).toEqual({ completed: 1, remaining: 1, earned: 5 });
  });

  it.each(["null", "[]", '"text"', '{"01-day-one":null}', '{"01-day-one":{"complete":"false"}}', '{"01-day-one":{"outcome":1}}', '{"__proto__":{"complete":true}}', '{"unknown":{"complete":true}}', '{"version":3}', '{bad'])('rejects malformed legacy %s without writing', raw => {
    const m = model(); const storage = new MemoryStorage();
    storage.setItem(m.LEGACY_KEY, raw);
    const result = m.loadProgress(storage, catalog);
    expect(result.error).toBeTruthy();
    expect(result.writable).toBe(false);
    expect(storage.getItem(m.PROGRESS_KEY)).toBeNull();
    expect(storage.getItem(m.LEGACY_KEY)).toBe(raw);
  });

  it("exports migrated v1 flags and imports them into a fresh browser store", () => {
    const m = model(); const source = new MemoryStorage(); const target = new MemoryStorage();
    source.setItem(m.LEGACY_KEY, '{"01-day-one":{"complete":true,"outcome":true}}');
    const migrated = m.loadProgress(source, catalog);
    const imported = m.importProgress(m.exportProgress(migrated.state, catalog), catalog);
    m.saveProgress(target, imported, catalog);
    expect(m.loadProgress(target, catalog).state).toEqual(migrated.state);
    expect(imported.steps["01-day-one"].sections).toEqual({});
    expect(imported.steps["01-day-one"].legacy).toEqual({ complete: true, outcome: true });
    expect(source.getItem(m.LEGACY_KEY)).not.toBeNull();
  });

  it("retries failed migration without losing legacy data", () => {
    const m = model(); const storage = new MemoryStorage();
    storage.setItem(m.LEGACY_KEY, '{"01-day-one":{"complete":true}}');
    storage.denied = true;
    expect(m.loadProgress(storage, catalog).error).toBeTruthy();
    expect(storage.getItem(m.PROGRESS_KEY)).toBeNull();
    storage.denied = false;
    expect(m.loadProgress(storage, catalog).state.steps["01-day-one"].legacy?.complete).toBe(true);
    expect(storage.getItem(m.PROGRESS_KEY)).not.toBeNull();
  });

  it("handles unavailable storage and never overwrites an unknown v2 version", () => {
    const m = model();
    expect(m.loadProgress(null, catalog).error).toBeTruthy();
    const storage = new MemoryStorage(); storage.setItem(m.PROGRESS_KEY, '{"version":9}');
    expect(m.loadProgress(storage, catalog).writable).toBe(false);
    expect(storage.getItem(m.PROGRESS_KEY)).toBe('{"version":9}');
  });

  it("roundtrips versioned export/import with explicit completions and revision review", () => {
    const m = model();
    let state = m.setSection(m.emptyProgress(), catalog, "01-day-one", "implement", true);
    state = m.visitSection(state, catalog, "01-day-one", "implement");
    const exported = m.exportProgress(state, catalog);
    expect(m.importProgress(exported, catalog)).toEqual(state);
    const revised = catalog.map(s => ({ ...s, sections: s.sections.map(t => ({ ...t, revision: "r2" })) }));
    const imported = m.importProgress(exported, revised);
    expect(imported.steps["01-day-one"].sections.implement.completed).toBe(true);
    expect(m.sectionNeedsReview(imported.steps["01-day-one"].sections.implement, revised[0].sections[1])).toBe(true);
    expect(m.setSection(imported, revised, "01-day-one", "implement", true).steps["01-day-one"].sections.implement.revision).toBe("r2");
  });

  it.each([
    "null", "[]", '{"version":1,"steps":{}}', '{"version":2,"steps":{},"extra":1}',
    '{"version":2,"steps":{"unknown":{"sections":{}}}}',
    '{"version":2,"steps":{"constructor":{"sections":{}}}}',
    '{"version":2,"steps":{"01-day-one":{"sections":{},"complete":"true"}}}',
    '{"version":2,"steps":{"01-day-one":{"sections":{"advanced":{"completed":true,"revision":"r1"}}}}}',
    '{"version":2,"steps":{"01-day-one":{"sections":{"implement":{"completed":"true","revision":"r1"}}}}}',
    '{"version":2,"steps":{},"lastVisited":{"slug":"01-day-one","section":"advanced"}}',
  ])("strict import rejects %s", raw => { const m = model(); expect(() => m.importProgress(raw, catalog)).toThrow(); });

  it("enforces 1MB bytes before JSON parse", () => {
    expect(() => model().importProgress(" ".repeat(1024 * 1024 + 1), catalog)).toThrow(/1 MB/);
    expect(() => model().importProgress('"' + "é".repeat(600000) + '"', catalog)).toThrow(/1 MB/);
  });

  it("keeps prior stored state on failed replacement and failed verification", () => {
    const m = model(); const storage = new MemoryStorage();
    const prior = m.exportProgress(m.emptyProgress(), catalog); storage.setItem(m.PROGRESS_KEY, prior);
    const next = m.setSection(m.emptyProgress(), catalog, "01-day-one", "implement", true);
    storage.denied = true;
    expect(() => m.saveProgress(storage, next, catalog)).toThrow();
    expect(storage.getItem(m.PROGRESS_KEY)).toBe(prior);
    storage.denied = false;
    const write = storage.setItem.bind(storage); let first = true;
    storage.setItem = (key, value) => { write(key, first ? "corrupt" : value); first = false; };
    expect(() => m.saveProgress(storage, next, catalog)).toThrow();
    expect(storage.getItem(m.PROGRESS_KEY)).toBe(prior);
  });

  it("counts a step once, distinguishes viewing from completion and scopes resume", () => {
    const m = model(); let state = m.emptyProgress();
    state = m.visitSection(state, catalog, "02-clone-and-run", "learn");
    expect(m.summarize(state, catalog)).toEqual({ completed: 0, remaining: 2, earned: 0 });
    expect(m.resumeTarget(state, catalog)).toMatchObject({ slug: "02-clone-and-run", section: "learn", reason: "last-visited" });
    expect(m.resumeTarget(state, [catalog[0]])).toMatchObject({ slug: "01-day-one", section: "the-project", reason: "first-unfinished" });
    state = m.setSection(state, catalog, "01-day-one", "the-project", true);
    state = m.setSection(state, catalog, "01-day-one", "implement", true);
    state = m.setAggregate(state, catalog, "01-day-one", "complete", true);
    expect(m.summarize(state, [catalog[0], catalog[0], catalog[1]])).toEqual({ completed: 1, remaining: 1, earned: 5 });
    expect(m.resumeTarget(state, [])).toBeNull();
    const finished = m.setAggregate(state, catalog, "02-clone-and-run", "complete", true);
    expect(m.resumeTarget({ ...finished, lastVisited: undefined }, catalog)).toBeNull();
  });

  it("explicitly unmarking legacy aggregate can override the historic flag", () => {
    const m = model(); const storage = new MemoryStorage(); storage.setItem(m.LEGACY_KEY, '{"01-day-one":{"complete":true}}');
    const state = m.setAggregate(m.loadProgress(storage, catalog).state, catalog, "01-day-one", "complete", false);
    expect(state.steps["01-day-one"].legacy?.complete).toBe(true);
    expect(m.summarize(state, catalog).earned).toBe(0);
  });

  describe("quiz persistence", () => {
    it("stores a graded quiz attempt and round-trips through export/import", () => {
      const m = model();
      const state = m.setQuiz(m.emptyProgress(), catalog, "01-day-one", [0, 1, 2, 0, 3], 4);
      expect(state.quiz?.["01-day-one"]).toEqual({ answers: [0, 1, 2, 0, 3], score: 4, graded: true });
      const imported = m.importProgress(m.exportProgress(state, catalog), catalog);
      expect(imported.quiz).toEqual(state.quiz);
    });

    it("rejects malformed quiz attempts", () => {
      const m = model();
      expect(() => m.setQuiz(m.emptyProgress(), catalog, "01-day-one", [0], 1.5)).toThrow(/score/);
      expect(() => m.setQuiz(m.emptyProgress(), catalog, "01-day-one", [-1], 1)).toThrow(/answers/);
      expect(() => m.importProgress('{"version":2,"steps":{},"quiz":{"01-day-one":{"answers":[0],"score":1,"graded":"yes"}}}', catalog)).toThrow(/quiz/);
      expect(() => m.importProgress('{"version":2,"steps":{},"quiz":{"01-day-one":{"answers":[0],"score":1,"graded":true},"unknown":{"answers":[0],"score":1,"graded":true}}}', catalog)).toThrow(/Unknown step/);
    });
  });
});
