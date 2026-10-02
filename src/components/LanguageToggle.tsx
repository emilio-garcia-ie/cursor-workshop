"use client";

import { useEffect, useState } from "react";
import { localePath, otherLocale, strings, type Locale } from "@/lib/i18n";
import { useStrings } from "@/lib/i18n-client";

/** Quiet utility control in the header. Swaps to the equivalent page in the other locale and remembers the choice. */
export default function LanguageToggle() {
  const { locale } = useStrings();
  const [path, setPath] = useState("");
  useEffect(() => {
    let alive = true;
    Promise.resolve().then(() => {
      if (alive) setPath(window.location.pathname + window.location.search);
    });
    return () => { alive = false; };
  }, []);
  if (!path) return null;
  const target = otherLocale(locale);
  const href = localePath(target, path);
  return (
    <button
      type="button"
      aria-label={strings(locale).languageLabel}
      onClick={() => {
        try { window.localStorage.setItem("hearthline-locale", target); } catch {}
        window.location.assign(href);
      }}
      className="rounded border border-stone-400 px-3 py-1 text-xs font-semibold"
    >
      {strings(locale).languageLabel}
    </button>
  );
}

export function preferredLocale(): Locale | null {
  try {
    const saved = window.localStorage.getItem("hearthline-locale");
    return saved === "es" || saved === "en" ? saved : null;
  } catch { return null; }
}