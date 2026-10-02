import Link from "next/link";
import { getSteps, getProgressCatalog } from "@/lib/curriculum";
import { ProgressProvider } from "@/components/ProgressProvider";
import ProgressSummary from "@/components/ProgressSummary";
import ProgressTools from "@/components/ProgressTools";
import { format, strings, type Locale } from "@/lib/i18n";
import { LocaleProvider } from "@/lib/i18n-client";
import {
  PERSONAS,
  PERSONA_STEPS,
  VERSIONS,
  stepsFor,
  personaLabel,
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

function href(locale: Locale, version: string, persona: string): string {
  const q = new URLSearchParams();
  if (version !== "long") q.set("version", version);
  if (persona !== "all") q.set("persona", persona);
  const s = q.toString();
  const base = locale === "es" ? "/es" : "";
  return s ? `${base}/?${s}` : `${base}/`;
}

export default function HomeView({ locale, searchParams }: {
  locale: Locale;
  searchParams: { version?: string; persona?: string };
}) {
  const t = strings(locale);
  const requestedVersion = searchParams.version as Version;
  const requestedPersona = searchParams.persona as Persona;
  const version: Version = VERSIONS.includes(requestedVersion) ? requestedVersion : "long";
  const persona: Persona | "all" = PERSONAS.includes(requestedPersona) ? requestedPersona : "all";
  const allowed = stepsFor(VERSIONS.includes(version) ? version : "long");
  const emphasis =
    persona !== "all" && (PERSONAS as readonly string[]).includes(persona)
      ? PERSONA_STEPS[persona]
      : null;

  const steps = getSteps(locale).filter(
    (s) =>
      (!allowed || allowed.includes(s.step)) &&
      (!emphasis || emphasis.includes(s.step))
  );
  const slugs = steps.map(s => s.slug);
  const total = steps.reduce((s, x) => s + x.points, 0);
  const prefix = locale === "es" ? "/es" : "";

  return (
    <LocaleProvider locale={locale}>
      <main className="mx-auto max-w-5xl px-4 pb-16">
        <h1 className="mt-6 font-serif text-3xl sm:text-4xl">
          {t.homeHeading}
        </h1>
        <div className="mt-4 flex flex-wrap gap-2 text-sm">
          <span className="font-semibold">{t.versionLabel}</span>
          {VERSIONS.map((v) => (
            <Link
              key={v}
              href={href(locale, v, persona)}
              className={`rounded-full px-3 py-1 ${
                version === v ? "bg-stone-900 font-semibold text-white" : "bg-white shadow-sm"
              }`}
            >
              {v}
            </Link>
          ))}
          <span className="ml-2 font-semibold">{t.personaLabel}</span>
          {["all", ...PERSONAS].map((p) => (
            <Link
              key={p}
              href={href(locale, version, p)}
              className={`rounded-full px-3 py-1 ${
                persona === p ? "bg-stone-900 font-semibold text-white" : "bg-white shadow-sm"
              }`}
            >
              {p === "all" ? t.personaAll : personaLabel(locale, p)}
            </Link>
          ))}
        </div>
        <p className="mt-3 text-sm">
          {format(t.statsLine, { count: steps.length, total, version })}
          {persona !== "all" ? ` · ${personaLabel(locale, persona)}` : ""}.
        </p>
        <ProgressProvider catalog={getProgressCatalog()}>
          <ProgressSummary selectedSlugs={slugs} />
          <ProgressTools />
        </ProgressProvider>
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
              <Link className="font-semibold underline" href={`${prefix}/steps/${s.slug}`}>
                {format(t.stepLinkLabel, { step: s.step, title: s.title })}
              </Link>
              <span className="ml-auto shrink-0 font-mono text-sm">{s.points} {t.ptsModule}</span>
            </li>
          ))}
        </ol>
      </main>
    </LocaleProvider>
  );
}