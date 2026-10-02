/** Citation + link preprocessing for curriculum markdown. */

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
  return body.replace(/\[(\d{1,2})\](?![\]\(])/g, "[$1](/bibliography#$1)");
}

/** Glossary `](steps/NN-slug.md)` → `](/steps/NN-slug)`. */
export function fixStepLinks(body: string): string {
  return body.replace(/\]\(steps\/([^)]+?)\.md\)/g, "](/steps/$1)");
}

/** Diagram slugs referenced by name in a step body. */
export function referencedDiagrams(body: string): string[] {
  return KNOWN_DIAGRAMS.filter((d) => body.includes(d));
}
