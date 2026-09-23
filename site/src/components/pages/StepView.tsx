import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getStep, getSteps, getProgressCatalog } from "@/lib/curriculum";
import { splitStepTabs } from "@/lib/tabs";
import { parseQuiz } from "@/lib/quiz";
import StepTabs from "@/components/StepTabs";
import ProgressTools from "@/components/ProgressTools";
import StepFooter from "@/components/StepFooter";
import Quiz from "@/components/Quiz";
import { ProgressProvider } from "@/components/ProgressProvider";
import { format, strings, type Locale } from "@/lib/i18n";
import { moduleLabel } from "@/lib/tracks";
import { LocaleProvider } from "@/lib/i18n-client";
import { linkCitations, referencedDiagrams } from "@/lib/citations";
import { mdComponentsFor } from "@/components/md";
import StepProgress from "@/components/StepProgress";

export function stepStaticParams(locale: Locale) {
  return getSteps(locale).map((s) => ({ slug: s.slug }));
}

export default function StepView({ locale, slug, searchParams }: {
  locale: Locale;
  slug: string;
  searchParams: { version?: string; persona?: string };
}) {
  const t = strings(locale);
  const step = getStep(slug, locale);
  if (!step) notFound();
  const diagrams = referencedDiagrams(step.body);
  const query = new URLSearchParams(searchParams).toString();
  const quiz = parseQuiz(step.body);
  const mdComponents = mdComponentsFor(locale);
  const tabs = splitStepTabs(step.body).map(tab => ({
    id: tab.id,
    label: tab.label,
    content: tab.id === "quiz"
      ? <Quiz slug={step.slug} quiz={quiz} />
      : <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents}>{linkCitations(tab.body, locale)}</ReactMarkdown>,
  }));

  return (
    <LocaleProvider locale={locale}>
      <main className="mx-auto max-w-3xl px-4 pb-16">
        <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-stone-500">
          {format(t.eyebrowLine, { module: moduleLabel(locale, step.module), points: step.points })}
        </p>
        <h1 className="mt-2 font-serif text-4xl">
          {format(t.stepLinkLabel, { step: step.step, title: step.title })}
        </h1>
        <ProgressProvider catalog={getProgressCatalog()}>
          <StepTabs key={step.slug} slug={step.slug} tabs={tabs} />
          <StepProgress slug={step.slug} />
          <ProgressTools />
        </ProgressProvider>
        {diagrams.length > 0 && (
          <section className="mt-6">
            <h2 className="font-serif text-2xl">{t.diagramsTitle}</h2>
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
        <StepFooter slug={slug} locale={locale} searchParams={query ? `?${query}` : undefined} />
      </main>
    </LocaleProvider>
  );
}