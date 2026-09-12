import type { Components } from "react-markdown";

/** Shared markdown rendering: superscript citations, code blocks, tables. */
export const mdComponents: Components = {
  h2: ({ children }) => (
    <h2 className="mb-2 mt-6 font-serif text-2xl">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="mb-1 mt-4 text-sm font-bold uppercase tracking-widest text-stone-500">
      {children}
    </h3>
  ),
  p: ({ children }) => <p className="my-2 leading-relaxed">{children}</p>,
  ul: ({ children }) => <ul className="my-2 list-disc space-y-1 pl-5">{children}</ul>,
  ol: ({ children }) => <ol className="my-2 list-decimal space-y-1 pl-5">{children}</ol>,
  a: ({ href, children }) => {
    const cite = href?.startsWith("/bibliography#");
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
  pre: ({ children }) => (
    <pre className="my-2 overflow-x-auto rounded-lg bg-stone-900 p-3 font-mono text-[13px] leading-relaxed text-white [&_code]:bg-transparent [&_code]:p-0 [&_code]:text-white">
      {children}
    </pre>
  ),
};
