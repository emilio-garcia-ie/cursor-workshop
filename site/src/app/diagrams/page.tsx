const DIAGRAMS = [
  "01-workshop-arc",
  "02-rules-hierarchy",
  "03-context-budget",
  "04-plan-loop",
  "05-mcp-shapes",
  "06-skill-anatomy",
  "07-hook-lifecycle",
  "08-rollout-playbook",
  "09-ddd-boundaries",
  "10-hearthline-domains",
];

export default function DiagramsPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 pb-16">
      <h1 className="mt-6 font-serif text-4xl">Diagrams</h1>
      {DIAGRAMS.map((d) => (
        <figure key={d} className="mt-4 rounded-xl bg-white p-4 shadow-sm">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`/diagrams/${d}.svg`} alt={d} className="w-full" />
          <figcaption className="mt-1 font-mono text-xs text-stone-500">
            diagrams/{d}.mmd
          </figcaption>
        </figure>
      ))}
    </main>
  );
}
