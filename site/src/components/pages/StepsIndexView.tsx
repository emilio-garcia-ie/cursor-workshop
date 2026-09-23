import Link from "next/link";
import { getSteps } from "@/lib/curriculum";
import { format, strings, type Locale } from "@/lib/i18n";
import { moduleLabel } from "@/lib/tracks";
import { LocaleProvider } from "@/lib/i18n-client";

export default function StepsIndexView({ locale }: { locale: Locale }) {
  const t = strings(locale);
  const steps = getSteps(locale);
  const prefix = locale === "es" ? "/es" : "";
  return (
    <LocaleProvider locale={locale}>
      <main className="mx-auto max-w-3xl px-4 pb-16">
        <h1 className="mt-6 font-serif text-4xl">{t.allSteps}</h1>
        <ol className="mt-4 space-y-2">
          {steps.map((s) => (
            <li key={s.slug} className="rounded-xl bg-white p-3 shadow-sm">
              <Link className="font-semibold underline" href={`${prefix}/steps/${s.slug}`}>
                {format(t.stepLinkLabel, { step: s.step, title: s.title })}
              </Link>{" "}
              <span className="font-mono text-sm">{format(t.indexEntry, { points: s.points, module: moduleLabel(locale, s.module) })}</span>
            </li>
          ))}
        </ol>
      </main>
    </LocaleProvider>
  );
}