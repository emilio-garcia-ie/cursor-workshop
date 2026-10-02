import fs from "node:fs";
import path from "node:path";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { mdComponents } from "@/components/md";
import { fixStepLinks, linkCitations } from "@/lib/citations";

export default function GlossaryPage() {
  const raw = fs.readFileSync(
    path.join(process.cwd(), "..", "glossary.md"),
    "utf8"
  );
  return (
    <main className="mx-auto max-w-3xl px-4 pb-16">
      <h1 className="mt-6 font-serif text-4xl">Glossary</h1>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents}>
        {fixStepLinks(linkCitations(raw))}
      </ReactMarkdown>
    </main>
  );
}
