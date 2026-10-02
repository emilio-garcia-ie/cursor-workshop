import { getSteps } from "@/lib/curriculum";

export default function StepsIndex() {
  const steps = getSteps();
  return (
    <main className="mx-auto max-w-3xl px-4 pb-16">
      <h1 className="mt-6 font-serif text-4xl">All steps</h1>
      <ol className="mt-4 space-y-2">
        {steps.map((s) => (
          <li key={s.slug} className="rounded-xl bg-white p-3 shadow-sm">
            <a className="font-semibold underline" href={`/steps/${s.slug}`}>
              Step {s.step} — {s.title}
            </a>{" "}
            <span className="font-mono text-sm">({s.points} pts · {s.module})</span>
          </li>
        ))}
      </ol>
    </main>
  );
}
