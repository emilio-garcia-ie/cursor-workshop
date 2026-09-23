"use client";

import { useState } from "react";
import { setQuiz } from "@/lib/progress";
import type { Quiz as QuizData, QuizQuestion } from "@/lib/quiz";
import { format } from "@/lib/i18n";
import { useStrings } from "@/lib/i18n-client";
import { useProgress } from "./ProgressProvider";

export default function Quiz({ slug, quiz }: { slug: string; quiz: QuizData }) {
  const { state, catalog, ready, writable, update } = useProgress();
  const { t } = useStrings();
  const saved = state.quiz?.[slug];
  const [answers, setAnswers] = useState<number[]>(() => saved?.answers ?? []);
  const [submitted, setSubmitted] = useState(() => saved?.graded ?? false);

  if (quiz.questions.length === 0) return null;

  const graded = submitted || (saved?.graded ?? false);
  const shownAnswers = saved?.graded ? saved.answers : answers;
  const score = saved?.graded ? saved.score : submitted ? shownAnswers.map((a, i) => a === quiz.questions[i].correct).filter(Boolean).length : 0;

  const grade = () => {
    const chosen = shownAnswers.map((a, i) => a === quiz.questions[i].correct).filter(Boolean).length;
    setSubmitted(true);
    if (ready && writable) update(current => setQuiz(current, catalog, slug, shownAnswers, chosen));
  };

  return (
    <section aria-label={t.quizTitle} className="mt-6 rounded-xl bg-white p-4 shadow-sm">
      <h2 className="font-semibold">{t.quizTitle}</h2>
      <p className="my-2 text-sm">{t.quizIntro}</p>
      <form onSubmit={event => { event.preventDefault(); grade(); }} className="mt-3 space-y-5">
        {quiz.questions.map((q, qi) => <Question key={qi} index={qi} q={q} value={shownAnswers[qi]} graded={graded} onSelect={index => {
          const next = [...shownAnswers]; next[qi] = index; setAnswers(next);
        }} />)}
        {!graded ? (
          <button type="submit" disabled={!ready || !writable || shownAnswers.some(a => a === undefined)} className="rounded bg-stone-900 px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50">{t.gradeAnswers}</button>
        ) : (
          <p role="status" className="text-sm">{format(t.quizScore, { score, total: quiz.questions.length })}</p>
        )}
      </form>
    </section>
  );
}

function Question({ index, q, value, graded, onSelect }: {
  index: number; q: QuizQuestion; value: number | undefined; graded: boolean; onSelect: (i: number) => void;
}) {
  const { t } = useStrings();
  return (
    <fieldset>
      <legend className="text-sm font-semibold">{index + 1}. {q.question}</legend>
      <div className="mt-2 space-y-1" role="radiogroup" aria-label={q.question}>
        {q.options.map((option, oi) => {
          const selected = value === oi;
          const correct = graded && oi === q.correct;
          const wrong = graded && selected && oi !== q.correct;
          return (
            <label key={oi} className={`flex items-center gap-2 rounded border px-3 py-2 text-sm ${correct ? "border-green-600 bg-green-50" : wrong ? "border-red-600 bg-red-50" : "border-stone-300"}`}>
              <input
                type="radio" name={`quiz-${index}`} disabled={graded}
                checked={selected}
                onChange={() => onSelect(oi)}
                className="h-4 w-4"
              />
              <span>{option}</span>
              {correct && <span className="ml-auto text-xs font-semibold text-green-800">{t.quizCorrect}</span>}
              {wrong && <span className="ml-auto text-xs font-semibold text-red-800">{t.quizWrong}</span>}
            </label>
          );
        })}
      </div>
      {graded && <p className="mt-1 text-sm">{q.explanation}</p>}
    </fieldset>
  );
}