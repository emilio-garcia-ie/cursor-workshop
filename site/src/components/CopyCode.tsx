"use client";

import { useRef, useState, type ReactNode } from "react";

export default function CopyCode({ children }: { children: ReactNode }) {
  const code = useRef<HTMLPreElement>(null);
  const [status, setStatus] = useState("");
  return <div className="my-2">
    <div className="flex items-center gap-3 text-sm">
      <button type="button" className="rounded border border-stone-400 px-3 py-1" onClick={async () => {
        try {
          if (!navigator.clipboard?.writeText) throw new Error("Clipboard unavailable");
          await navigator.clipboard.writeText(code.current?.textContent ?? "");
          setStatus("Copied.");
        } catch { setStatus("Copy failed. Select the code and copy it manually."); }
      }}>Copy code</button>
      <span role="status">{status}</span>
    </div>
    <pre ref={code} className="my-2 overflow-x-auto rounded-lg bg-stone-900 p-3 font-mono text-[13px] leading-relaxed text-white [&_code]:bg-transparent [&_code]:p-0 [&_code]:text-white">{children}</pre>
  </div>;
}
