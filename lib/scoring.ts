import { challenges, questions } from "@/lib/data";
import type { QuizAnswer, QuizResult } from "@/types";

export function calculateQuizResult(answers: QuizAnswer[]): QuizResult {
  const scores = Object.fromEntries(challenges.map((item) => [item.id, 0]));

  answers.forEach((answer) => {
    const question = questions.find((item) => item.id === answer.questionId);
    if (question) {
      scores[question.challengeId] += answer.score;
    }
  });

  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const primaryChallengeId = sorted[0]?.[0] ?? challenges[0].id;
  const alternativeChallengeIds = sorted
    .filter(([id]) => id !== primaryChallengeId)
    .slice(0, 3)
    .map(([id]) => id);

  return { primaryChallengeId, alternativeChallengeIds, scores };
}
