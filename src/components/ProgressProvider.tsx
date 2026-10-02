"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { emptyProgress, loadProgress, saveProgress, PROGRESS_KEY, LEGACY_KEY, type Catalog, type Progress, type ProgressStorage, type Recovery } from "@/lib/progress";

function browserStorage(): ProgressStorage | null {
  try { return window.localStorage; } catch { return null; }
}
function useProgressStore(catalog: Catalog) {
  const [state, setState] = useState<Progress>(emptyProgress);
  const [ready, setReady] = useState(false);
  const [writable, setWritable] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const current = useRef<Progress | undefined>(undefined);
  const [hasSnapshot, setHasSnapshot] = useState(false);
  const [recovery, setRecovery] = useState<Recovery | null>(null);
  const refresh = useCallback(() => {
    const result = loadProgress(browserStorage(), catalog, current.current);
    if (result.hasSnapshot) current.current = result.state;
    setHasSnapshot(result.hasSnapshot); setRecovery(result.recovery);
    setState(result.state); setWritable(result.writable); setError(result.error); setReady(true);
  }, [catalog]);
  useEffect(() => {
    refresh();
    const sync = (event: StorageEvent) => {
      if (event.storageArea === browserStorage() && [null, PROGRESS_KEY, LEGACY_KEY].includes(event.key)) refresh();
    };
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, [refresh]);
  const update = useCallback((change: (state: Progress) => Progress, replace = false): boolean => {
    if (!ready) return false;
    try {
      const storage = browserStorage();
      if (!storage) throw new Error("Storage is unavailable. Nothing was saved.");
      const latest = loadProgress(storage, catalog, current.current);
      if (!replace && !latest.writable) {
        setRecovery(latest.recovery); setWritable(false);
        throw new Error(latest.error ?? "Cannot save progress");
      }
      const next = change(replace ? current.current ?? emptyProgress() : latest.state);
      saveProgress(storage, next, catalog);
      current.current = next; setState(next); setHasSnapshot(true); setRecovery(null); setWritable(true); setError(null);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Saving failed. Existing progress is unchanged.");
      return false;
    }
  }, [catalog, ready]);
  return { state, ready, writable, error, update, refresh, catalog, hasSnapshot, recovery };
}
const ProgressContext = createContext<ReturnType<typeof useProgressStore> | null>(null);
export function ProgressProvider({ catalog, children }: { catalog: Catalog; children: ReactNode }) {
  const store = useProgressStore(catalog);
  return <ProgressContext.Provider value={store}>{children}</ProgressContext.Provider>;
}
export function useProgress() {
  const value = useContext(ProgressContext);
  if (!value) throw new Error("ProgressProvider is required");
  return value;
}
