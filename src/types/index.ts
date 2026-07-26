export type QuestionType =
  | 'multiple-choice'
  | 'true-false'
  | 'fill-prompt'
  | 'spot-mistake'
  | 'prompt-rewrite'
  | 'order-steps';

export interface Question {
  id: string;
  type: QuestionType;
  question: string;
  scenario?: string;
  codeOrPrompt?: string;
  choices?: string[];
  answer: string | number | string[]; // string choice, index, or ordered array
  explanation: string;
  xp: number;
  difficulty: 'easy' | 'medium' | 'hard';
  fillOptions?: string[]; // for fill-prompt
  mistakeHighlight?: string; // for spot-mistake
}

export interface Lesson {
  id: string;
  unitId: string;
  title: string;
  description: string;
  icon: string;
  xpReward: number;
  estimatedMinutes: number;
  questions: Question[];
}

export interface Unit {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  xpReward: number;
  stampId: string;
  stampTitle: string;
  stampDescription: string;
  lessons: Lesson[];
}

export interface Curriculum {
  units: Unit[];
}

export interface UserProfile {
  name: string;
  avatar: string;
  dailyGoalMinutes: number; // e.g. 5, 10, 15, 20
  experienceLevel: 'beginner' | 'intermediate' | 'advanced';
  learningGoal: 'career' | 'school' | 'creativity' | 'curiosity';
  createdAt: string;
  hasCompletedOnboarding: boolean;
  hasTakenPlacementTest: boolean;
}

export interface Stamp {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
  category: 'unit' | 'achievement';
  color: string;
}

export interface UserProgress {
  xp: number;
  level: number;
  coins: number;
  hearts: number;
  maxHearts: number;
  streak: number;
  longestStreak: number;
  lastActiveDate: string; // YYYY-MM-DD
  completedLessons: string[]; // lessonIds
  completedUnits: string[]; // unitIds
  unlockedUnits: string[]; // unitIds
  stamps: Stamp[];
  incorrectQuestions: Question[]; // for practice mode
  totalStudyTimeSeconds: number;
  totalQuestionsAnswered: number;
  correctAnswersCount: number;
  league: 'Bronze' | 'Silver' | 'Gold' | 'Platinum' | 'Diamond';
  lastDailyChallengeCompletedDate?: string;
}

export interface CoachAnalysis {
  id: string;
  timestamp: string;
  originalPrompt: string;
  clarityScore: number;
  specificityScore: number;
  contextScore: number;
  overallScore: number;
  improvedPrompt: string;
  explanation: string;
  tips?: string[];
}

export interface DailyChallenge {
  date: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  difficulty: string;
  topic: string;
  xpReward: number;
}
