"use client";

import { useState } from "react";
import { exportProgress, importProgress, MAX_IMPORT_BYTES, type Progress } from "@/lib/progress";
import { useProgress } from "./ProgressProvider";

export default function ProgressTools() {
  const { state, catalog, ready, error, update, refresh, hasSnapshot, recovery } = useProgress();
  const retired = Object.entries(state.steps).flatMap(([slug, step]) => Object.entries(step.sections)
    .filter(([id]) => !catalog.find(current => current.slug === slug)?.sections.some(section => section.id === id))
    .map(([id, section]) => ({ slug, id, completed: section.completed })));
  const [pending, setPending] = useState<Progress | null>(null);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const download = (rawRecovery = false) => {
    try {
      if (rawRecovery ? !recovery : !hasSnapshot) return;
      const blob = new Blob([rawRecovery ? recovery!.raw : exportProgress(state, catalog)], { type: rawRecovery ? "text/plain;charset=utf-8" : "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url; link.download = rawRecovery ? `${recovery!.key}-raw-recovery.txt` : "hearthline-progress-v2.json"; link.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      setMessage(rawRecovery ? "Original stored text downloaded unchanged for recovery. It may be malformed and is not a validated progress backup." : error ? "Last valid snapshot downloaded. It does not include unreadable stored changes." : "Export downloaded. Keep it somewhere safe.");
    } catch { setMessage("Export failed. Please retry before leaving this page."); }
  };
  return (
    <section aria-label="Progress storage" className="my-4 rounded-xl border border-stone-300 p-4 text-sm">
      <p>Progress is an explicit self-report, not proof of learning or mastery. Viewing a tab never marks it complete.</p>
      <p className="mt-2">Saved only in this browser/profile on this site. Storage may be lost when browser data is cleared or unavailable in private browsing. Export JSON regularly for a manual backup. No accounts, telemetry, or backend sync.</p>
      <p className="mt-2">Future sync is out of scope unless cross-device needs are demonstrated and cost/privacy approval is given.</p>
      {error && <p role="alert" className="mt-2 font-semibold text-red-800">{error}</p>}
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <button type="button" disabled={!ready || !hasSnapshot} onClick={() => download()} className="rounded border border-stone-500 px-3 py-2">{error && hasSnapshot ? "Export last valid snapshot JSON" : "Export progress JSON"}</button>
        {recovery && <button type="button" onClick={() => download(true)} className="rounded border border-stone-500 px-3 py-2">Download raw recovery data ({recovery.key})</button>}
        <label className="flex flex-wrap items-center gap-2">Import progress JSON (max 1 MB)
          <input type="file" accept=".json,application/json" disabled={!ready || busy} className="max-w-full" onChange={async event => {
            const file = event.target.files?.[0]; event.target.value = "";
            setPending(null); setMessage("");
            if (!file) return;
            setBusy(true);
            try {
              if (file.size > MAX_IMPORT_BYTES) throw new Error("Progress JSON must be at most 1 MB");
              setPending(importProgress(await file.text(), catalog));
            } catch (err) { setMessage(`Import rejected; existing progress unchanged. ${err instanceof Error ? err.message : "Cannot read file"}`); }
            finally { setBusy(false); }
          }} />
        </label>
        {error && <button type="button" onClick={refresh} className="underline">Retry storage access</button>}
      </div>
      {recovery && <p className="mt-2">Raw recovery contains the original stored text, unchanged, including malformed data. It is not a validated import file.</p>}
      {retired.length > 0 && <details className="mt-3"><summary>Retired section history — review recommended</summary><p>Removed or renamed sections are retained for history, not mapped to new sections or counted as their completion.</p><ul>{retired.map(section => <li key={`${section.slug}/${section.id}`}>{section.slug} · {section.id}: {section.completed ? "reported complete" : "not reported complete"}</li>)}</ul></details>}
      {pending && <div role="group" aria-label="Confirm progress replacement" className="mt-3 rounded border border-amber-700 p-3">
        <p>Replace all progress in this browser with the imported file? Export your current progress first. This also replaces the saved Resume location.</p>
        <button type="button" className="mr-3 mt-2 rounded bg-stone-900 px-3 py-2 text-white" onClick={() => {
          if (update(() => pending, true)) { setPending(null); setMessage("Progress imported and saved."); }
        }}>Confirm replace progress</button>
        <button type="button" onClick={() => setPending(null)} className="underline">Cancel import</button>
      </div>}
      <p role="status" className="mt-2">{busy ? "Reading local file…" : message}</p>
    </section>
  );
}
