export type ChallengeLevel = "Ringan" | "Sedang" | "Fokus";

export interface DailyTask {
  day: number;
  title: string;
  detail: string;
}

export interface Challenge {
  id: string;
  title: string;
  sub: string;
  days: number;
  level: ChallengeLevel;
  icon: string;
  color: string;
  bgColor: string;
  description: string;
  tasks: DailyTask[];
}

export interface QuestionOption {
  label: string;
  text: string;
  score: number;
}

export interface Question {
  id: string;
  text: string;
  challengeId: string;
  options: QuestionOption[];
}

export interface QuizAnswer {
  questionId: string;
  answerIndex: number;
  score: number;
}

export interface QuizResult {
  primaryChallengeId: string;
  alternativeChallengeIds: string[];
  scores: Record<string, number>;
}

export interface UserProgress {
  activeChallengeId: string | null;
  currentDay: number;
  completedDays: number[];
  journals: Record<number, string>;
  badges: string[];
}
