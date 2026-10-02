"use client";

import { useEffect, useState } from "react";
import { exportProgress, importProgress, MAX_IMPORT_BYTES, type Progress } from "@/lib/progress";
import { isFileSystemAccessSupported, pickSaveFile, readRemembered, readRememberedFile, remember, saveToFile } from "@/lib/fileProgress";
import { format } from "@/lib/i18n";
import { useStrings } from "@/lib/i18n-client";
import { useProgress } from "./ProgressProvider";

export default function ProgressTools() {
  const { state, catalog, ready, error, update, refresh, hasSnapshot, recovery } = useProgress();
  const { t } = useStrings();
  const retired = Object.entries(state.steps).flatMap(([slug, step]) => Object.entries(step.sections)
    .filter(([id]) => !catalog.find(current => current.slug === slug)?.sections.some(section => section.id === id))
    .map(([id, section]) => ({ slug, id, completed: section.completed })));
  const [pending, setPending] = useState<Progress | null>(null);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [fileSupported, setFileSupported] = useState(false);
  const [fileId, setFileId] = useState<string | null>(null);
  useEffect(() => {
    let alive = true;
    Promise.resolve().then(() => {
      if (!alive || !isFileSystemAccessSupported()) return;
      setFileSupported(true);
      readRemembered().then(id => { if (alive) setFileId(id); }).catch(() => {});
    });
    return () => { alive = false; };
  }, []);
  const saveToFileFlow = async () => {
    setBusy(true); setMessage("");
    try {
      let id = fileId;
      const hadFile = Boolean(id);
      if (!id) {
        id = await pickSaveFile();
        await remember(id);
        setFileId(id);
      }
      await saveToFile(id, exportProgress(state, catalog));
      setMessage(hadFile ? t.saveOverwritten : t.saveChosen);
    } catch (err) { setMessage(format(t.saveFailed, { reason: err instanceof Error ? err.message : "Nothing was written." })); }
    finally { setBusy(false); }
  };
  const loadFromFileFlow = async () => {
    setBusy(true); setMessage("");
    try {
      const raw = await readRememberedFile();
      if (raw === null) { setMessage(t.noRememberedFile); return; }
      if (new TextEncoder().encode(raw).byteLength > MAX_IMPORT_BYTES) throw new Error("Progress JSON must be at most 1 MB");
      setPending(importProgress(raw, catalog));
      setMessage(t.fileReadConfirm);
    } catch (err) { setMessage(format(t.fileLoadRejected, { reason: err instanceof Error ? err.message : "Cannot read file" })); }
    finally { setBusy(false); }
  };
  const download = (rawRecovery = false) => {
    try {
      if (rawRecovery ? !recovery : !hasSnapshot) return;
      const blob = new Blob([rawRecovery ? recovery!.raw : exportProgress(state, catalog)], { type: rawRecovery ? "text/plain;charset=utf-8" : "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url; link.download = rawRecovery ? `${recovery!.key}-raw-recovery.txt` : "hearthline-progress-v2.json"; link.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      setMessage(rawRecovery ? t.recoveryDownloaded : error ? t.snapshotDownloaded : t.exportDownloaded);
    } catch { setMessage(t.exportFailed); }
  };
  return (
    <section aria-label={t.storageSelfReportNote} className="my-4 rounded-xl border border-stone-300 p-4 text-sm">
      <p>{t.storageSelfReportNote}</p>
      <p className="mt-2">{t.storageLocalNote}</p>
      <p className="mt-2">{t.storageSyncNote}</p>
      {error && <p role="alert" className="mt-2 font-semibold text-red-800">{error}</p>}
      <div className="mt-3 flex flex-wrap items-center gap-3">
        {fileSupported && <button type="button" disabled={!ready || !hasSnapshot || busy} onClick={saveToFileFlow} className="rounded bg-stone-900 px-3 py-2 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50">{fileId ? t.overwriteFile : t.saveToFile}</button>}
        {fileSupported && fileId && <button type="button" disabled={!ready || busy} onClick={loadFromFileFlow} className="rounded border border-stone-500 px-3 py-2 disabled:cursor-not-allowed disabled:opacity-50">{t.loadFromFile}</button>}
        <button type="button" disabled={!ready || !hasSnapshot} onClick={() => download()} className="rounded border border-stone-500 px-3 py-2">{error && hasSnapshot ? t.exportSnapshot : t.exportProgress}</button>
        {recovery && <button type="button" onClick={() => download(true)} className="rounded border border-stone-500 px-3 py-2">{t.rawRecovery} ({recovery.key})</button>}
        <label className="flex flex-wrap items-center gap-2">{t.importLabel}
          <input type="file" accept=".json,application/json" disabled={!ready || busy} className="max-w-full" onChange={async event => {
            const file = event.target.files?.[0]; event.target.value = "";
            setPending(null); setMessage("");
            if (!file) return;
            setBusy(true);
            try {
              if (file.size > MAX_IMPORT_BYTES) throw new Error("Progress JSON must be at most 1 MB");
              setPending(importProgress(await file.text(), catalog));
            } catch (err) { setMessage(format(t.importRejected, { reason: err instanceof Error ? err.message : "Cannot read file" })); }
            finally { setBusy(false); }
          }} />
        </label>
        {error && <button type="button" onClick={refresh} className="underline">{t.retryStorage}</button>}
      </div>
      {!fileSupported && <p className="mt-2">{t.fileUnsupported}</p>}
      {recovery && <p className="mt-2">{t.rawRecoveryNote}</p>}
      {retired.length > 0 && <details className="mt-3"><summary>{t.retiredSummary}</summary><p>{t.retiredNote}</p><ul>{retired.map(section => <li key={`${section.slug}/${section.id}`}>{section.slug} · {section.id}: {section.completed ? t.retiredComplete : t.retiredNotComplete}</li>)}</ul></details>}
      {pending && <div role="group" aria-label={t.confirmTitle} className="mt-3 rounded border border-amber-700 p-3">
        <p>{t.confirmBody}</p>
        <button type="button" className="mr-3 mt-2 rounded bg-stone-900 px-3 py-2 text-white" onClick={() => {
          if (update(() => pending, true)) { setPending(null); setMessage(t.importedSaved); }
        }}>{t.confirmReplace}</button>
        <button type="button" onClick={() => setPending(null)} className="underline">{t.cancelImport}</button>
      </div>}
      <p role="status" className="mt-2">{busy ? t.busyNote : message}</p>
    </section>
  );
}