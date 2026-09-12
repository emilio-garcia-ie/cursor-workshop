import { getSteps } from "@/lib/curriculum";
import {
  PERSONAS,
  PERSONA_STEPS,
  VERSIONS,
  stepsFor,
  type Persona,
  type Version,
} from "@/lib/tracks";

const MODULE_COLORS: Record<string, string> = {
  Foundations: "module-foundations",
  Building: "module-building",
  Guardrails: "module-guardrails",
  "The Fast Loop": "module-fast-loop",
  "Debug & Test": "module-debug-test",
  "Team & Scale": "module-team-scale",
  Bonus: "module-bonus",
};

function href(version: string, persona: string): string {
  const q = new URLSearchParams();
  if (version !== "long") q.set("version", version);
  if (persona !== "all") q.set("persona", persona);
  const s = q.toString();
  return s ? `/?${s}` : "/";
}

export default function Home({
  searchParams,
}: {
  searchParams?: { version?: string; persona?: string };
}) {
  const version = (searchParams?.version ?? "long") as Version;
  const persona = (searchParams?.persona ?? "all") as Persona | "all";
  const allowed = stepsFor(VERSIONS.includes(version) ? version : "long");
  const emphasis =
    persona !== "all" && (PERSONAS as readonly string[]).includes(persona)
      ? PERSONA_STEPS[persona]
      : null;

  const steps = getSteps().filter(
    (s) =>
      (!allowed || allowed.includes(s.step)) &&
      (!emphasis || emphasis.includes(s.step))
  );
  const total = steps.reduce((s, x) => s + x.points, 0);

  return (
    <main className="mx-auto max-w-5xl px-4 pb-16">
      <h1 className="mt-6 font-serif text-3xl sm:text-4xl">
        Join Hearthline on day one. Ship a real feature. Learn every Cursor surface.
      </h1>
      <div className="mt-4 flex flex-wrap gap-2 text-sm">
        <span className="font-semibold">Version:</span>
        {VERSIONS.map((v) => (
          <a
            key={v}
            href={href(v, persona)}
            className={`rounded-full px-3 py-1 ${
              version === v ? "bg-stone-900 font-semibold text-white" : "bg-white shadow-sm"
            }`}
          >
            {v}
          </a>
        ))}
        <span className="ml-2 font-semibold">Persona:</span>
        {["all", ...PERSONAS].map((p) => (
          <a
            key={p}
            href={href(version, p)}
            className={`rounded-full px-3 py-1 ${
              persona === p ? "bg-stone-900 font-semibold text-white" : "bg-white shadow-sm"
            }`}
          >
            {p}
          </a>
        ))}
      </div>
      <p className="mt-3 text-sm">
        {steps.length} steps · {total} points · {version}
        {persona !== "all" ? ` · ${persona}` : ""}.
      </p>
      <ol className="mt-4 space-y-2">
        {steps.map((s) => (
          <li
            key={s.slug}
            data-step={s.step}
            className="flex items-center gap-3 rounded-xl bg-white p-3 shadow-sm"
          >
            <span
              aria-hidden
              className={`h-8 w-2 shrink-0 rounded-full ${MODULE_COLORS[s.module] ?? "bg-stone-200"}`}
            />
            <a className="font-semibold underline" href={`/steps/${s.slug}`}>
              Step {s.step} — {s.title}
            </a>
            <span className="ml-auto shrink-0 font-mono text-sm">{s.points} pts</span>
          </li>
        ))}
      </ol>
    </main>
  );
}
