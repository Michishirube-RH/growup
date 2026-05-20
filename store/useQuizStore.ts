"use client";

import { create } from "zustand";
import { calculateQuizResult } from "@/lib/scoring";
import { questions } from "@/lib/data";
import type { QuizAnswer, QuizResult } from "@/types";

interface QuizStore {
  answers: QuizAnswer[];
  result: QuizResult | null;
  setAnswer: (questionIndex: number, answerIndex: number) => void;
  resetQuiz: () => void;
  calculateResult: () => QuizResult;
}

export const useQuizStore = create<QuizStore>((set, get) => ({
  answers: [],
  result: null,
  setAnswer: (questionIndex, answerIndex) => {
    const question = questions[questionIndex];
    if (!question) return;

    const answer: QuizAnswer = {
      questionId: question.id,
      answerIndex,
      score: question.options[answerIndex]?.score ?? 0,
    };

    const answers = [...get().answers];
    answers[questionIndex] = answer;
    set({ answers, result: null });
  },
  resetQuiz: () => set({ answers: [], result: null }),
  calculateResult: () => {
    const result = calculateQuizResult(get().answers);
    set({ result });
    return result;
  },
}));
