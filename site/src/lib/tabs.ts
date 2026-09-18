import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";

export interface StepTab {
  id: string;
  label: string;
  body: string;
}

const labels = new Map([
  ["The project", "the-project"], ["Learn", "learn"], ["Implement", "implement"],
  ["Pro tips", "pro-tips"], ["Terminology", "terminology"], ["Advanced", "advanced"],
]);

export function splitStepTabs(body: string): StepTab[] {
  const tree = unified().use(remarkParse).use(remarkGfm).parse(body);
  const tabs: StepTab[] = [];
  let prefix = "";
  let complete = false;
  let removedTitle = false;
  const definitions: string[] = [];
  const append = (text: string) => {
    if (tabs.length) tabs[tabs.length - 1].body += text;
    else prefix += text;
  };
  for (let i = 0; i < tree.children.length; i++) {
    const node = tree.children[i];
    const start = node.position!.start.offset!;
    const end = tree.children[i + 1]?.position?.start.offset ?? body.length;
    const raw = body.slice(start, end);
    if (node.type === "definition") {
      definitions.push(raw);
      continue;
    }
    if (node.type === "heading" && node.depth === 1 && !removedTitle) {
      removedTitle = true;
      continue;
    }
    if (node.type === "heading" && node.depth === 2) {
      const label = node.children.map(c => c.type === "text" ? c.value : "").join("");
      const id = labels.get(label);
      if (id) {
        if (tabs.some(t => t.id === id)) throw new Error(`Duplicate section: ${label}`);
        tabs.push({ id, label, body: tabs.length ? "" : prefix });
        complete = false;
        continue;
      }
      if (label === "Complete") {
        complete = true;
        continue;
      }
    }
    if (complete && node.type === "list") {
      for (const item of node.children) {
        const text = body.slice(item.position!.start.offset!, item.position!.end.offset!);
        if (!/^- \[[ xX]\] (Mark complete|I got the expected outcome)\s*$/.test(text)) append(text + "\n\n");
      }
      continue;
    }
    append(raw);
  }
  if (!tabs.length) throw new Error("Step has no recognized sections");
  return tabs.map(tab => ({ ...tab, body: tab.body + "\n\n" + definitions.join("\n") }));
}
