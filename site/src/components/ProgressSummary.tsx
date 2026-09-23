"use client";

import { resumeTarget, summarize } from "@/lib/progress";
import { format, tabLabel } from "@/lib/i18n";
import { useStrings } from "@/lib/i18n-client";
import { useProgress } from "./ProgressProvider";

export default function ProgressSummary({ selectedSlugs }: { selectedSlugs: string[] }) {
  const { state, ready, catalog } = useProgress();
  const { locale, t } = useStrings();
  if (!ready) return <p role="status" className="mt-3 text-sm">{t.loadingProgress}</p>;
  const selected = catalog.filter(s => selectedSlugs.includes(s.slug));
  const summary = summarize(state, selected);
  const target = resumeTarget(state, selected);
  const step = selected.find(s => s.slug === target?.slug);
  const section = step?.sections.find(s => s.id === target?.section);
  const sectionLabel = section ? tabLabel(locale, section.label) : "";
  const label = target ? format(target.reason === "last-visited" ? t.continueLabel : t.startNextLabel, { step: step?.step ?? "", section: sectionLabel }) : "";
  return <section aria-label={t.summaryRemaining} className="mt-4 rounded-xl bg-white p-4 shadow-sm">
    <p>{format(t.summaryLine, { remaining: summary.remaining, earned: summary.earned, completed: summary.completed })}</p>
    <p className="mt-2 text-sm">{t.summaryNote}</p>
    {target && step && section ? <>
      <a className="mt-3 inline-block font-semibold underline" href={`${locale === "es" ? "/es" : ""}/steps/${target.slug}#${target.section}`}>{label}</a>
      <p className="text-sm">{target.reason === "last-visited" ? t.lastVisitedNote : t.firstUnfinishedNote}</p>
    </> : <p className="mt-2">{selected.length ? t.allDoneNote : t.noMatchNote}</p>}
  </section>;
}