export const PROGRESS_KEY = "hearthline-progress-v2";
export const LEGACY_KEY = "hearthline-progress-v1";
export const MAX_IMPORT_BYTES = 1024 * 1024;

export interface SectionMeta { id: string; label: string; revision: string }
export interface ProgressStep { slug: string; step: number; points: number; sections: SectionMeta[] }
export type Catalog = readonly ProgressStep[];
export interface SectionProgress { completed: boolean; revision: string; needsReview?: boolean }
export interface Flags { complete?: boolean; outcome?: boolean }
export interface StepState extends Flags { sections: Record<string, SectionProgress>; legacy?: Flags }
export interface Progress { version: 2; steps: Record<string, StepState>; lastVisited?: { slug: string; section: string } }
export interface ProgressStorage { getItem(key: string): string | null; setItem(key: string, value: string): void; removeItem(key: string): void }

export function emptyProgress(): Progress { return { version: 2, steps: {} }; }

function record(value: unknown): asserts value is Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value) || ![Object.prototype, null].includes(Object.getPrototypeOf(value))) throw new Error("Expected a plain object");
  if (Object.keys(value).some(key => ["__proto__", "constructor", "prototype"].includes(key))) throw new Error("Forbidden object key");
}
function fields(value: Record<string, unknown>, allowed: string[]) {
  if (Object.keys(value).some(key => !allowed.includes(key))) throw new Error("Unknown progress field");
}
function flags(value: Record<string, unknown>) {
  for (const key of ["complete", "outcome"]) {
    if (Object.hasOwn(value, key) && typeof value[key] !== "boolean") throw new Error("Progress flags must be boolean");
  }
}
function stepMeta(catalog: Catalog, slug: string) {
  const step = catalog.find(s => s.slug === slug);
  if (!step) throw new Error(`Unknown step: ${slug}`);
  return step;
}
function sectionMeta(catalog: Catalog, slug: string, id: string) {
  const section = stepMeta(catalog, slug).sections.find(s => s.id === id);
  if (!section) throw new Error(`Unknown section: ${id}`);
  return section;
}
export function validateProgress(value: unknown, catalog: Catalog): Progress {
  record(value); fields(value, ["version", "steps", "lastVisited"]);
  if (value.version !== 2) throw new Error("Unsupported progress version");
  record(value.steps);
  for (const [slug, step] of Object.entries(value.steps)) {
    stepMeta(catalog, slug); record(step); fields(step, ["sections", "complete", "outcome", "legacy"]); flags(step);
    if (Object.hasOwn(step, "legacy")) { record(step.legacy); fields(step.legacy, ["complete", "outcome"]); flags(step.legacy); }
    record(step.sections);
    for (const [id, section] of Object.entries(step.sections)) {
      sectionMeta(catalog, slug, id); record(section); fields(section, ["completed", "revision", "needsReview"]);
      if (typeof section.completed !== "boolean" || typeof section.revision !== "string" || !section.revision.length || section.revision.length > 128) throw new Error("Invalid section progress");
      if (Object.hasOwn(section, "needsReview") && typeof section.needsReview !== "boolean") throw new Error("Invalid review flag");
    }
  }
  if (Object.hasOwn(value, "lastVisited")) {
    record(value.lastVisited); fields(value.lastVisited, ["slug", "section"]);
    if (typeof value.lastVisited.slug !== "string" || typeof value.lastVisited.section !== "string") throw new Error("Invalid last visit");
    sectionMeta(catalog, value.lastVisited.slug, value.lastVisited.section);
  }
  return JSON.parse(JSON.stringify(value)) as Progress;
}

const publishedSlugs = [
  "01-day-one", "02-clone-and-run", "03-rules", "04-context", "05-build-a-feature", "06-mcp-github", "07-first-skill", "08-org-reviewer", "09-hooks", "10-abstractions", "11-ship", "12-loops-goals", "13-workflows", "14-unreported-bug", "15-slack-bot", "16-fast-loop", "17-plan-files", "18-agents-window", "19-side-chats", "20-debug-mode", "21-browser-design", "22-tdd", "23-images", "24-knowledge-graphs", "25-marketplace", "26-security", "27-models-cost", "28-cli", "29-harness", "30-sdd-ddd", "31-gtm-stack", "32-customer-canvas", "33-improvement-loop",
];
const publishedSections = new Map(publishedSlugs.map((slug, index) => {
  const number = index + 1;
  const ids = number === 1 ? ["the-project", "implement"]
    : [12, 13, 14, 15, 31, 32, 33].includes(number) ? ["learn", "implement"]
    : [9, 10].includes(number) ? ["learn", "implement", "advanced"]
    : ["learn", "implement", number === 11 ? "terminology" : "pro-tips", "advanced"];
  return [slug, ids] as const;
}));

export function reconcileProgress(value: unknown, catalog: Catalog): Progress {
  const historical = catalog.map(step => ({
    ...step,
    sections: [...step.sections, ...(publishedSections.get(step.slug) ?? [])
      .filter(id => !step.sections.some(section => section.id === id))
      .map(id => ({ id, label: id, revision: "retired" }))],
  }));
  const state = validateProgress(value, historical);
  for (const [slug, step] of Object.entries(state.steps)) {
    for (const [id, section] of Object.entries(step.sections)) {
      if (!stepMeta(catalog, slug).sections.some(current => current.id === id)) section.needsReview = true;
    }
  }
  return state;
}

export function importProgress(raw: string, catalog: Catalog): Progress {
  if (new TextEncoder().encode(raw).byteLength > MAX_IMPORT_BYTES) throw new Error("Progress JSON must be at most 1 MB");
  return reconcileProgress(JSON.parse(raw), catalog);
}
export function exportProgress(state: Progress, catalog: Catalog): string {
  const raw = JSON.stringify(reconcileProgress(state, catalog), null, 2);
  if (new TextEncoder().encode(raw).byteLength > MAX_IMPORT_BYTES) throw new Error("Progress JSON must be at most 1 MB");
  return raw;
}

export function saveProgress(storage: ProgressStorage, state: Progress, catalog: Catalog) {
  const raw = exportProgress(state, catalog);
  const prior = storage.getItem(PROGRESS_KEY);
  try {
    storage.setItem(PROGRESS_KEY, raw);
    if (storage.getItem(PROGRESS_KEY) !== raw) throw new Error("Storage verification failed");
  } catch (error) {
    try {
      if (storage.getItem(PROGRESS_KEY) !== prior) {
        if (prior === null) storage.removeItem(PROGRESS_KEY);
        else storage.setItem(PROGRESS_KEY, prior);
      }
    } catch {
      throw new Error("Saving and rollback failed. Keep this page open and export your progress before retrying.");
    }
    throw error;
  }
}

export interface Recovery { key: string; raw: string }
export interface ProgressLoad { state: Progress; writable: boolean; error: string | null; hasSnapshot: boolean; recovery: Recovery | null }

export function loadProgress(storage: ProgressStorage | null, catalog: Catalog, previous?: Progress): ProgressLoad {
  let state = previous ?? emptyProgress();
  let hasSnapshot = previous !== undefined;
  let recovery: Recovery | null = null;
  try {
    if (!storage) throw new Error("Browser storage is unavailable");
    const raw = storage.getItem(PROGRESS_KEY);
    if (raw !== null) {
      recovery = { key: PROGRESS_KEY, raw };
      return { state: importProgress(raw, catalog), writable: true, error: null, hasSnapshot: true, recovery: null };
    }
    const legacy = storage.getItem(LEGACY_KEY);
    if (legacy !== null) {
      recovery = { key: LEGACY_KEY, raw: legacy };
      if (new TextEncoder().encode(legacy).byteLength > MAX_IMPORT_BYTES) throw new Error("Legacy progress is too large");
      const old: unknown = JSON.parse(legacy); record(old);
      const migrated = emptyProgress();
      for (const [slug, item] of Object.entries(old)) {
        stepMeta(catalog, slug); record(item); fields(item, ["complete", "outcome"]); flags(item);
        migrated.steps[slug] = { sections: {}, legacy: { ...item } as Flags };
      }
      state = migrated;
      hasSnapshot = true;
      saveProgress(storage, state, catalog);
    } else {
      state = emptyProgress();
    }
    return { state, writable: true, error: null, hasSnapshot: true, recovery: null };
  } catch (error) {
    return { state, writable: false, hasSnapshot, recovery, error: `${error instanceof Error ? error.message : "Cannot read progress"}. ${hasSnapshot ? "Showing the last valid snapshot, not the unreadable stored data." : "No valid progress snapshot is available; empty display is not a backup."} Download raw recovery data if available or retry storage access.` };
  }
}

function updateStep(state: Progress, catalog: Catalog, slug: string, update: (step: StepState) => StepState): Progress {
  stepMeta(catalog, slug);
  return { ...state, steps: { ...state.steps, [slug]: update(state.steps[slug] ?? { sections: {} }) } };
}
export function setSection(state: Progress, catalog: Catalog, slug: string, id: string, completed: boolean): Progress {
  const section = sectionMeta(catalog, slug, id);
  if (typeof completed !== "boolean") throw new Error("Completion must be boolean");
  return updateStep(state, catalog, slug, step => ({ ...step, sections: { ...step.sections, [id]: { completed, revision: section.revision, needsReview: false } } }));
}
export function setAggregate(state: Progress, catalog: Catalog, slug: string, key: keyof Flags, value: boolean): Progress {
  if (!["complete", "outcome"].includes(key) || typeof value !== "boolean") throw new Error("Invalid aggregate flag");
  return updateStep(state, catalog, slug, step => ({ ...step, [key]: value }));
}
export function visitSection(state: Progress, catalog: Catalog, slug: string, section: string): Progress {
  sectionMeta(catalog, slug, section);
  return { ...state, lastVisited: { slug, section } };
}
export function sectionNeedsReview(progress: SectionProgress | undefined, section: SectionMeta): boolean {
  return progress?.completed === true && (progress.needsReview === true || progress.revision !== section.revision);
}
export function aggregateFlag(step: StepState | undefined, key: keyof Flags): boolean {
  return step?.[key] ?? step?.legacy?.[key] ?? false;
}
export function stepCompleted(state: Progress, step: ProgressStep): boolean {
  return aggregateFlag(state.steps[step.slug], "complete") || (step.sections.length > 0 && step.sections.every(s => state.steps[step.slug]?.sections[s.id]?.completed === true));
}
export function summarize(state: Progress, selected: Catalog) {
  const steps = Array.from(new Map(selected.map(s => [s.slug, s])).values());
  const completed = steps.filter(s => stepCompleted(state, s));
  return { completed: completed.length, remaining: steps.length - completed.length, earned: completed.reduce((sum, s) => sum + s.points, 0) };
}
export function resumeTarget(state: Progress, selected: Catalog) {
  const last = state.lastVisited;
  const visited = selected.find(s => s.slug === last?.slug);
  if (last && visited?.sections.some(s => s.id === last.section)) return { ...last, reason: "last-visited" as const };
  const next = selected.find(s => !stepCompleted(state, s));
  if (!next) return null;
  const section = next.sections.find(s => !state.steps[next.slug]?.sections[s.id]?.completed) ?? next.sections[0];
  return section ? { slug: next.slug, section: section.id, reason: "first-unfinished" as const } : null;
}
