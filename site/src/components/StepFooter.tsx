import Link from "next/link";
import { isLastStep, stepHref, stepNav, type Locale } from "@/lib/navigation";
import { format, strings } from "@/lib/i18n";

export default function StepFooter({ slug, locale = "en", searchParams }: {
  slug: string;
  locale?: Locale;
  searchParams?: string;
}) {
  const { previous, next } = stepNav(slug);
  if (!previous && !next) return null;
  const t = strings(locale);
  const finished = isLastStep(slug);
  return (
    <nav aria-label={t.stepNavLabel} className="mt-8 border-t border-stone-300 pt-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        {previous ? (
          <Link href={stepHref(previous.slug, locale, searchParams)} className="rounded border border-stone-500 px-4 py-2 text-sm">
            {format(t.previousLabel, { step: previous.step, title: previous.title })}
          </Link>
        ) : <span aria-hidden />}
        {next ? (
          <Link href={stepHref(next.slug, locale, searchParams)} className="rounded bg-stone-900 px-4 py-2 text-sm font-semibold text-white">
            {format(t.nextLabel, { step: next.step, title: next.title })}
          </Link>
        ) : finished ? (
          <Link href={locale === "es" ? "/es" : "/"} className="rounded bg-stone-900 px-4 py-2 text-sm font-semibold text-white">
            {t.allStepsComplete}
          </Link>
        ) : null}
      </div>
    </nav>
  );
}