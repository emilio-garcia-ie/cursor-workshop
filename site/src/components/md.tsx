import type { Components } from "react-markdown";
import CopyCode from "./CopyCode";
import { kitLabel, type Locale } from "@/lib/i18n";

/** Shared markdown rendering: superscript citations, code blocks, tables. Headings keep structural English ids; display labels localize. */
export function mdComponentsFor(locale: Locale): Components {
  return {
    h2: ({ children }) => (
      <h2 className="mb-2 mt-6 font-serif text-2xl">{children}</h2>
    ),
    h3: ({ children }) => {
      const raw = String(children);
      return (
        <h3 id={raw.trim().toLowerCase().replace(/\s+/g, "-")} className="mb-1 mt-4 text-sm font-bold uppercase tracking-widest text-stone-500">
          {kitLabel(locale, raw)}
        </h3>
      );
    },
    h4: ({ children }) => {
      const raw = String(children);
      return (
        <h4 id={raw.trim().toLowerCase().replace(/\s+/g, "-")} className="mb-1 mt-4 font-semibold">
          {kitLabel(locale, raw)}
        </h4>
      );
    },
    p: ({ children }) => <p className="my-2 leading-relaxed">{children}</p>,
    ul: ({ children }) => <ul className="my-2 list-disc space-y-1 pl-5">{children}</ul>,
    ol: ({ children }) => <ol className="my-2 list-decimal space-y-1 pl-5">{children}</ol>,
    a: ({ href, children }) => {
      const cite = href?.startsWith("/bibliography#") || href?.startsWith("/es/bibliography#");
      return (
        <a
          href={href}
          className={
            cite
              ? "align-super text-xs font-bold no-underline"
              : "underline"
          }
          style={cite ? { color: "var(--cursor-orange)" } : undefined}
        >
          {cite ? `[${children}]` : children}
        </a>
      );
    },
    code: ({ children }) => (
      <code className="rounded bg-stone-900/[0.07] px-1.5 py-0.5 font-mono text-[13px]">
        {children}
      </code>
    ),
    pre: ({ children }) => <CopyCode>{children}</CopyCode>,
  };
}

export const mdComponents: Components = mdComponentsFor("en");