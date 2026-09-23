import fs from "node:fs";
import path from "node:path";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { mdComponentsFor } from "@/components/md";
import { fixStepLinks, linkCitations } from "@/lib/citations";
import { strings, type Locale } from "@/lib/i18n";

export default function GlossaryView({ locale }: { locale: Locale }) {
  const t = strings(locale);
  const file = locale === "es" ? "glossary.es.md" : "glossary.md";
  const raw = fs.readFileSync(
    path.join(process.cwd(), "..", file),
    "utf8"
  );
  const body = raw.replace(/^#\s+[^\n]+\n/, "");
  return (
    <main className="mx-auto max-w-3xl px-4 pb-16">
      <h1 className="mt-6 font-serif text-4xl">{t.glossaryTitle}</h1>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponentsFor(locale)}>
        {fixStepLinks(linkCitations(body, locale), locale)}
      </ReactMarkdown>
    </main>
  );
}
