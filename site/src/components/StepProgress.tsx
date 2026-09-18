"use client";

import { aggregateFlag, setAggregate } from "@/lib/progress";
import { useProgress } from "./ProgressProvider";

export default function StepProgress({ slug }: { slug: string }) {
  const { state, ready, writable, update, catalog } = useProgress();
  const step = state.steps[slug];
  return (
    <section aria-label="Step self-report" className="mt-4 rounded-xl bg-white p-4 shadow-sm">
      <h2 className="font-semibold">Step self-report</h2>
      <p className="my-2 text-sm">Mark the whole step complete independently, or complete each section. Points are counted once per step; outcome is a separate self-report.</p>
      {step?.legacy && <p className="mb-2 text-sm">Previous version flags are preserved. They do not mark any section learned.</p>}
      <div className="flex flex-wrap gap-4">
        {(["complete", "outcome"] as const).map(key => <label key={key} className="flex items-center gap-2 text-sm">
          <input type="checkbox" disabled={!ready || !writable} checked={aggregateFlag(step, key)} onChange={event => {
            const checked = event.target.checked;
            update(current => setAggregate(current, catalog, slug, key, checked));
          }} />
          {key === "complete" ? "Mark whole step complete (self-report)" : "I got the expected outcome"}
        </label>)}
      </div>
    </section>
  );
}
