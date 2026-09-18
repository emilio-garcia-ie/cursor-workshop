"use client";

import { resumeTarget, summarize } from "@/lib/progress";
import { useProgress } from "./ProgressProvider";

export default function ProgressSummary({ selectedSlugs }: { selectedSlugs: string[] }) {
  const { state, ready, catalog } = useProgress();
  if (!ready) return <p role="status" className="mt-3 text-sm">Loading local progress…</p>;
  const selected = catalog.filter(s => selectedSlugs.includes(s.slug));
  const summary = summarize(state, selected);
  const target = resumeTarget(state, selected);
  const step = selected.find(s => s.slug === target?.slug);
  const section = step?.sections.find(s => s.id === target?.section);
  return <section aria-label="Selected track progress" className="mt-4 rounded-xl bg-white p-4 shadow-sm">
    <p>{summary.remaining} steps remaining · {summary.earned} points earned (self-reported) · {summary.completed} steps complete</p>
    <p className="mt-2 text-sm">Completion counts once per step: whole-step self-report (including legacy flags) or all sections reported complete. Outcome alone earns no points. Revisions retain completion and may request review.</p>
    {target && step && section ? <>
      <a className="mt-3 inline-block font-semibold underline" href={`/steps/${target.slug}#${target.section}`}>{target.reason === "last-visited" ? "Continue" : "Start next unfinished"}: Step {step.step} · {section.label}</a>
      <p className="text-sm">{target.reason === "last-visited" ? "Last visited section within your selected track/persona." : "No saved location in this selection; showing its first unfinished step."}</p>
    </> : <p className="mt-2">{selected.length ? "All selected steps are reported complete. Revisit any step below." : "No steps match this selection."}</p>}
  </section>;
}
