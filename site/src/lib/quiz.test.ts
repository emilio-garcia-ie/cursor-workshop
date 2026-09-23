import { describe, expect, it } from "vitest";
import { gradeQuiz, parseQuiz } from "./quiz";

const validSample = `## Quiz

#### Q1: What is the canonical money unit in Hearthline?

- [ ] Dollars with two decimals
- [x] Integer cents
- [ ] Floats rounded at the edge
- [ ] Strings

**Explanation:** Money is integer cents. No floats, ever.

#### Q2: Which screen does not exist yet?

- [x] Inspections
- [ ] Payments
- [ ] Maintenance
- [ ] Dashboard

**Explanation:** Inspections is the Build Battle at the end.
`;

describe("quiz markdown parser", () => {
  it("parses five questions with options, correct index, and explanation", () => {
    const quiz = parseQuiz(validSample);
    expect(quiz.questions).toHaveLength(2);
    expect(quiz.questions[0]).toEqual({
      question: "What is the canonical money unit in Hearthline?",
      options: ["Dollars with two decimals", "Integer cents", "Floats rounded at the edge", "Strings"],
      correct: 1,
      explanation: "Money is integer cents. No floats, ever.",
    });
    expect(quiz.questions[1].correct).toBe(0);
  });

  it("rejects a quiz with fewer than one question", () => {
    expect(() => parseQuiz("## Quiz\n\nNo questions here.")).toThrow(/at least one question/);
  });

  it("rejects a question with fewer than two options", () => {
    const bad = `## Quiz

#### Q1: Only one option?

- [x] Sole option

**Explanation:** Not enough options.
`;
    expect(() => parseQuiz(bad)).toThrow(/at least two options/);
  });

  it("rejects a question with more than one correct answer", () => {
    const bad = `## Quiz

#### Q1: Two correct?

- [x] A
- [x] B
- [ ] C

**Explanation:** Ambiguous.
`;
    expect(() => parseQuiz(bad)).toThrow(/exactly one correct/);
  });

  it("rejects a question with no correct answer", () => {
    const bad = `## Quiz

#### Q1: None correct?

- [ ] A
- [ ] B

**Explanation:** Missing the marker.
`;
    expect(() => parseQuiz(bad)).toThrow(/exactly one correct/);
  });

  it("rejects a question without an explanation", () => {
    const bad = `## Quiz

#### Q1: Missing explanation?

- [ ] A
- [x] B

No explanation line follows.
`;
    expect(() => parseQuiz(bad)).toThrow(/explanation/);
  });

  it("returns an empty quiz for content with no ## Quiz heading", () => {
    expect(parseQuiz("# No quiz here\n\n## Learn\n\ncontent")).toEqual({ questions: [] });
  });

  it("grades a full answer array", () => {
    const quiz = parseQuiz(validSample);
    expect(gradeQuiz(quiz, [1, 0])).toBe(2);
    expect(gradeQuiz(quiz, [0, 1])).toBe(0);
    expect(gradeQuiz(quiz, [1, 1])).toBe(1);
  });

  it("rejects a mismatched answer count in grading", () => {
    const quiz = parseQuiz(validSample);
    expect(() => gradeQuiz(quiz, [1])).toThrow(/count/);
  });
});