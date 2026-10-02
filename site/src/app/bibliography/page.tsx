import fs from "node:fs";
import path from "node:path";

/** Bibliography entries rendered with stable #n anchors for citations. */
export default function BibliographyPage() {
  const raw = fs.readFileSync(
    path.join(process.cwd(), "..", "bibliography.md"),
    "utf8"
  );
  const entries = raw
    .split("\n")
    .filter((l) => /^\[\d+\]/.test(l))
    .map((l) => {
      const n = l.match(/^\[(\d+)\]/)?.[1] ?? "";
      return { n, text: l };
    });

  return (
    <main className="mx-auto max-w-3xl px-4 pb-16">
      <h1 className="mt-6 font-serif text-4xl">Bibliography</h1>
      <p className="mt-2 text-sm">
        All URLs fetched HTTP 200 on 2026-09-11 unless noted.
      </p>
      <ol className="mt-4 space-y-2">
        {entries.map((e) => (
          <li key={e.n} id={e.n} className="rounded-xl bg-white p-3 text-sm shadow-sm">
            <span className="font-mono font-bold">[{e.n}]</span>{" "}
            {e.text.replace(/^\[\d+\]\s*/, "")}
          </li>
        ))}
      </ol>
    </main>
  );
}
