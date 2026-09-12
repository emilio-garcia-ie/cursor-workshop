"use client";

import { useEffect, useState } from "react";

const KEY = "hearthline-progress-v1";

type Progress = Record<string, { complete?: boolean; outcome?: boolean }>;

function readAll(): Progress {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "{}") as Progress;
  } catch {
    return {};
  }
}

/** Persisted per-step checkboxes (Mark complete + outcome). */
export default function StepProgress({ slug }: { slug: string }) {
  const [state, setState] = useState({ complete: false, outcome: false });

  useEffect(() => {
    const all = readAll();
    if (all[slug]) setState({ complete: !!all[slug].complete, outcome: !!all[slug].outcome });
  }, [slug]);

  const toggle = (k: "complete" | "outcome") => {
    const next = { ...state, [k]: !state[k] };
    setState(next);
    const all = readAll();
    all[slug] = next;
    localStorage.setItem(KEY, JSON.stringify(all));
  };

  return (
    <div className="mt-4 flex flex-wrap gap-4 rounded-xl bg-white p-4 shadow-sm">
      <label className="flex items-center gap-2 text-sm font-semibold">
        <input
          type="checkbox"
          checked={state.complete}
          onChange={() => toggle("complete")}
        />
        Mark complete
      </label>
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={state.outcome}
          onChange={() => toggle("outcome")}
        />
        I got the expected outcome
      </label>
    </div>
  );
}
