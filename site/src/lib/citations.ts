import { unified } from "unified";
import remarkParse from "remark-parse";
import type { RootContent } from "mdast";

const KNOWN_DIAGRAMS = [
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

/** `[12]` → clickable `[12](/bibliography#12)` (styling makes them superscript). */
export function linkCitations(body: string): string {
  const tree = unified().use(remarkParse).parse(body);
  const ranges: { start: number; end: number }[] = [];
  const visit = (node: RootContent) => {
    if (["code", "inlineCode", "link", "linkReference", "definition", "image", "imageReference", "html"].includes(node.type)) return;
    if (node.type === "text" && node.position) ranges.push({ start: node.position.start.offset!, end: node.position.end.offset! });
    if ("children" in node) node.children.forEach(visit);
  };
  tree.children.forEach(visit);
  let result = body;
  for (const { start, end } of ranges.reverse()) {
    result = result.slice(0, start) + body.slice(start, end).replace(/(?<!\\)\[(\d{1,2})\](?![\]\(])/g, "[$1](/bibliography#$1)") + result.slice(end);
  }
  return result;
}

/** Glossary `](steps/NN-slug.md)` → `](/steps/NN-slug)`. */
export function fixStepLinks(body: string): string {
  return body.replace(/\]\(steps\/([^)]+?)\.md\)/g, "](/steps/$1)");
}

/** Diagram slugs referenced by name in a step body. */
export function referencedDiagrams(body: string): string[] {
  return KNOWN_DIAGRAMS.filter((d) => body.includes(d));
}
