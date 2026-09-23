import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";

export interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}
export interface Quiz { questions: QuizQuestion[] }

/** Score an answer array against the quiz's correct indices (0..N). */
export function gradeQuiz(quiz: Quiz, answers: number[]): number {
  if (answers.length !== quiz.questions.length) throw new Error("Answer count must match question count");
  return answers.filter((a, i) => Number.isInteger(a) && a === quiz.questions[i].correct).length;
}

interface Draft { question: string; options: string[]; correct: number; explanation?: string }

function textOf(node: { type?: string; value?: string; children?: Array<unknown> }): string {
  if (node.type === "text" || node.type === "inlineCode") return node.value ?? "";
  if (node.children) return node.children.map(c => textOf(c as { type?: string; value?: string; children?: Array<unknown> })).join("");
  return "";
}

/** Parse the `## Quiz` section of a step body. Returns an empty quiz if absent. */
export function parseQuiz(body: string): Quiz {
  const tree = unified().use(remarkParse).use(remarkGfm).parse(body);
  const questions: QuizQuestion[] = [];
  let inQuiz = false;
  let sawQuizHeading = false;
  let current: Draft | null = null;

  const flush = () => {
    if (current) {
      if (current.options.length < 2) throw new Error("Quiz question must have at least two options");
      if (current.correct < 0) throw new Error("Quiz question must have exactly one correct option");
      if (!current.explanation) throw new Error("Quiz question must have an explanation");
      questions.push({ ...current, explanation: current.explanation });
      current = null;
    }
  };

  for (const node of tree.children) {
    if (node.type === "heading") {
      const text = node.children.map(c => textOf(c as { type?: string; value?: string; children?: Array<unknown> })).join("").trim();
      if (node.depth === 2) {
        if (text === "Quiz") { inQuiz = true; sawQuizHeading = true; flush(); continue; }
        if (inQuiz) { flush(); inQuiz = false; break; }
        continue;
      }
      if (inQuiz && node.depth === 4) {
        flush();
        const question = text.replace(/^Q\d+\s*[:.]\s*/, "").trim();
        if (question) current = { question, options: [], correct: -1 };
        continue;
      }
      continue;
    }
    if (!inQuiz) continue;
    if (node.type === "list" && current) {
      const draft = current;
      node.children.forEach((item: unknown) => {
        const listItem = item as { checked?: boolean | null; children?: Array<unknown> };
        const para = (listItem.children ?? []).find(c => (c as { type?: string }).type === "paragraph");
        const text = para ? textOf(para as { type?: string; value?: string; children?: Array<unknown> }).trim() : "";
        if (!text) return;
        draft.options.push(text);
        if (listItem.checked === true) {
          if (draft.correct >= 0) throw new Error("Quiz question must have exactly one correct option");
          draft.correct = draft.options.length - 1;
        }
      });
      continue;
    }
    if (node.type === "paragraph" && current) {
      const draft = current;
      const line = node.children.map(c => textOf(c as { type?: string; value?: string; children?: Array<unknown> })).join("").trim();
      const expl = line.match(/^\*{0,2}Explanation:\*{0,2}\s*(.+)$/);
      if (expl) draft.explanation = expl[1];
    }
  }
  flush();
  if (sawQuizHeading && questions.length === 0) throw new Error("Quiz must contain at least one question");
  return { questions };
}