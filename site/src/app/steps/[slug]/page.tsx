import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getStep, getSteps } from "@/lib/curriculum";
import { linkCitations, referencedDiagrams } from "@/lib/citations";
import { mdComponents } from "@/components/md";
import StepProgress from "@/components/StepProgress";

export function generateStaticParams() {
  return getSteps().map((s) => ({ slug: s.slug }));
}

export default function StepPage({ params }: { params: { slug: string } }) {
  const step = getStep(params.slug);
  if (!step) notFound();
  const diagrams = referencedDiagrams(step.body);

  return (
    <main className="mx-auto max-w-3xl px-4 pb-16">
      <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-stone-500">
        {step.module} · {step.points} pts
      </p>
      <h1 className="mt-2 font-serif text-4xl">
        Step {step.step} — {step.title}
      </h1>
      <StepProgress slug={step.slug} />
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents}>
        {linkCitations(step.body)}
      </ReactMarkdown>
      {diagrams.length > 0 && (
        <section className="mt-6">
          <h2 className="font-serif text-2xl">Diagrams</h2>
          {diagrams.map((d) => (
            <figure key={d} className="mt-3 rounded-xl bg-white p-4 shadow-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/diagrams/${d}.svg`} alt={d} className="w-full" />
              <figcaption className="mt-1 font-mono text-xs text-stone-500">
                diagrams/{d}.mmd
              </figcaption>
            </figure>
          ))}
        </section>
      )}
    </main>
  );
}
