"use client";

import { aggregateFlag, setAggregate } from "@/lib/progress";
import { useStrings } from "@/lib/i18n-client";
import { useProgress } from "./ProgressProvider";

export default function StepProgress({ slug }: { slug: string }) {
  const { state, ready, writable, update, catalog } = useProgress();
  const { t } = useStrings();
  const step = state.steps[slug];
  const revealExpectedResult = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const tab = document.getElementById(`${slug}-tab-implement`);
    tab?.click();
    requestAnimationFrame(() => document.getElementById("expected-result")?.scrollIntoView({ behavior: "smooth" }));
  };
  return (
    <section aria-label={t.selfReportTitle} className="mt-4 rounded-xl bg-white p-4 shadow-sm">
      <h2 className="font-semibold">{t.selfReportTitle}</h2>
      <p className="my-2 text-sm">
        {t.selfReportIntro} <a href="#expected-result" onClick={revealExpectedResult} className="underline">{t.selfReportExpectedResult}</a>{" "}
        {t.selfReportOutcome}
      </p>
      {step?.legacy && <p className="mb-2 text-sm">{t.selfReportLegacy}</p>}
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" disabled={!ready || !writable} checked={aggregateFlag(step, "complete")} onChange={event => {
          const checked = event.target.checked;
          update(current => setAggregate(current, catalog, slug, "complete", checked));
        }} />
        {t.markStepComplete}
      </label>
    </section>
  );
}