"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useProgress } from "./ProgressProvider";
import { sectionNeedsReview, setSection, visitSection } from "@/lib/progress";

export default function StepTabs({ slug, tabs }: { slug: string; tabs: { id: string; label: string; content: ReactNode }[] }) {
  const { state, catalog, ready, writable, update } = useProgress();
  const [active, setActive] = useState(tabs[0].id);
  const initialized = useRef(false);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  useEffect(() => {
    if (!ready || initialized.current) return;
    initialized.current = true;
    const hash = window.location.hash.slice(1);
    const last = state.lastVisited;
    const requested = tabs.some(t => t.id === hash) ? hash : last?.slug === slug ? last.section : tabs[0].id;
    const selected = tabs.some(t => t.id === requested) ? requested : tabs[0].id;
    setActive(selected);
    if (writable) update(current => visitSection(current, catalog, slug, selected));
  }, [ready, writable, state.lastVisited, tabs, slug, catalog, update]);
  const select = (id: string) => {
    setActive(id);
    window.history.replaceState(null, "", `#${id}`);
    if (ready && writable) update(current => visitSection(current, catalog, slug, id));
  };
  useEffect(() => {
    const syncHash = () => {
      const id = window.location.hash.slice(1);
      if (tabs.some(t => t.id === id)) {
        setActive(id);
        if (ready && writable) update(current => visitSection(current, catalog, slug, id));
      }
    };
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, [tabs, catalog, slug, ready, writable, update]);
  return <section className="mt-6" aria-label="Step sections">
    <div role="tablist" aria-label="Step sections" className="flex flex-wrap gap-2 border-b border-stone-300 pb-2">
      {tabs.map((tab, index) => <button key={tab.id} ref={element => { buttons.current[index] = element; }} type="button" role="tab" id={`${slug}-tab-${tab.id}`} aria-controls={`${slug}-panel-${tab.id}`} aria-selected={active === tab.id} tabIndex={active === tab.id ? 0 : -1}
        className={`rounded px-3 py-2 text-sm font-semibold ${active === tab.id ? "bg-stone-900 text-white" : "bg-white"}`}
        onClick={() => select(tab.id)} onKeyDown={event => {
          let target = index;
          if (event.key === "ArrowRight") target = (index + 1) % tabs.length;
          else if (event.key === "ArrowLeft") target = (index - 1 + tabs.length) % tabs.length;
          else if (event.key === "Home") target = 0;
          else if (event.key === "End") target = tabs.length - 1;
          else return;
          event.preventDefault(); select(tabs[target].id); buttons.current[target]?.focus();
        }}>{tab.label}{state.steps[slug]?.sections[tab.id]?.completed ? " · Completed" : ""}</button>)}
    </div>
    {tabs.map(tab => {
      const progress = state.steps[slug]?.sections[tab.id];
      const meta = catalog.find(s => s.slug === slug)!.sections.find(s => s.id === tab.id)!;
      const review = sectionNeedsReview(progress, meta);
      return <div key={tab.id} role="tabpanel" id={`${slug}-panel-${tab.id}`} aria-labelledby={`${slug}-tab-${tab.id}`} hidden={active !== tab.id} tabIndex={0} className="pt-3">
        {tab.content}
        <div className="mt-5 rounded border border-stone-300 p-3">
          <label className="flex items-center gap-2 text-sm font-semibold">
            <input type="checkbox" checked={progress?.completed ?? false} disabled={!ready || !writable} onChange={event => {
              const checked = event.target.checked;
              update(current => setSection(current, catalog, slug, tab.id, checked));
            }} />
            Mark {tab.label} complete (self-report)
          </label>
          {review && <div className="mt-2 text-sm"><p>Content changed since your self-report. Your completion is retained; review is recommended, not proof of lost mastery.</p><button type="button" disabled={!ready || !writable} className="mt-2 underline" onClick={() => update(current => setSection(current, catalog, slug, tab.id, true))}>I reviewed this revision</button></div>}
        </div>
      </div>;
    })}
  </section>;
}
