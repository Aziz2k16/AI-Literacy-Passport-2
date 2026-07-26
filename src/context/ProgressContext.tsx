import React, { createContext, useContext, useEffect, useState } from 'react';
import { CoachAnalysis, Question, Stamp, UserProgress } from '../types';
import curriculumData from '../data/curriculum.json';
import { playFanfareSound, playStreakSound } from '../services/soundService';

interface ProgressContextType {
  progress: UserProgress;
  coachHistory: CoachAnalysis[];
  addXP: (amount: number) => void;
  addCoins: (amount: number) => void;
  loseHeart: () => boolean; // returns true if remaining > 0, false if out of hearts
  refillHearts: () => void;
  completeLesson: (lessonId: string, unitId: string, scoreAccuracy: number) => void;
  unlockUnit: (unitId: string) => void;
  unlockStamp: (stamp: Stamp) => void;
  addIncorrectQuestion: (question: Question) => void;
  removeIncorrectQuestion: (questionId: string) => void;
  saveCoachAnalysis: (analysis: CoachAnalysis) => void;
  recordStudyTime: (seconds: number) => void;
  completeDailyChallenge: (xpReward: number) => void;
  resetProgress: () => void;
  exportData: () => string;
  importData: (jsonString: string) => boolean;
}

const INITIAL_STAMPS: Stamp[] = [
  {
    id: 'stamp-welcome',
    title: 'First Flight',
    description: 'Began your journey into AI literacy.',
    icon: 'Plane',
    unlockedAt: new Date().toISOString(),
    category: 'achievement',
    color: 'from-blue-500 to-indigo-600',
  },
  {
    id: 'stamp-ai-explorer',
    title: 'AI Explorer',
    description: 'Mastered Unit 1: AI, LLMs, and Tokenization.',
    icon: 'Globe',
    category: 'unit',
    color: 'from-cyan-500 to-blue-600',
  },
  {
    id: 'stamp-prompt-pilot',
    title: 'Prompt Pilot',
    description: 'Mastered Unit 2: Instructions, Context & Examples.',
    icon: 'Compass',
    category: 'unit',
    color: 'from-indigo-500 to-purple-600',
  },
  {
    id: 'stamp-ai-builder',
    title: 'AI Architect',
    description: 'Mastered Unit 3: System Prompts & Advanced Workflows.',
    icon: 'Award',
    category: 'unit',
    color: 'from-violet-600 to-fuchsia-600',
  },
  {
    id: 'stamp-streak-master',
    title: 'Streak Master',
    description: 'Maintained a 7-day learning streak.',
    icon: 'Flame',
    category: 'achievement',
    color: 'from-amber-500 to-red-500',
  },
];

const DEFAULT_PROGRESS: UserProgress = {
  xp: 0,
  level: 1,
  coins: 50,
  hearts: 5,
  maxHearts: 5,
  streak: 1,
  longestStreak: 1,
  lastActiveDate: new Date().toISOString().split('T')[0],
  completedLessons: [],
  completedUnits: [],
  unlockedUnits: ['unit-1'],
  stamps: INITIAL_STAMPS,
  incorrectQuestions: [],
  totalStudyTimeSeconds: 0,
  totalQuestionsAnswered: 0,
  correctAnswersCount: 0,
  league: 'Bronze',
};

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [progress, setProgress] = useState<UserProgress>(() => {
    try {
      const saved = localStorage.getItem('ai_passport_progress');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to parse user progress:', e);
    }
    return DEFAULT_PROGRESS;
  });

  const [coachHistory, setCoachHistory] = useState<CoachAnalysis[]>(() => {
    try {
      const saved = localStorage.getItem('ai_passport_coach_history');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to parse coach history:', e);
    }
    return [];
  });

  // Save progress
  useEffect(() => {
    localStorage.setItem('ai_passport_progress', JSON.stringify(progress));
  }, [progress]);

  // Save coach history
  useEffect(() => {
    localStorage.setItem('ai_passport_coach_history', JSON.stringify(coachHistory));
  }, [coachHistory]);

  // Check and update daily streak on startup
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const lastActive = progress.lastActiveDate;

    if (lastActive !== today) {
      const lastDate = new Date(lastActive);
      const currentDate = new Date(today);
      const diffDays = Math.floor((currentDate.getTime() - lastDate.getTime()) / (1000 * 3600 * 24));

      if (diffDays === 1) {
        // Maintained streak!
      } else if (diffDays > 1) {
        // Reset streak to 1
        setProgress((prev) => ({
          ...prev,
          streak: 1,
          lastActiveDate: today,
        }));
      }
    }
  }, []);

  const addXP = (amount: number) => {
    setProgress((prev) => {
      const newXP = prev.xp + amount;
      const newLevel = Math.floor(newXP / 100) + 1;
      const leveledUp = newLevel > prev.level;

      if (leveledUp) {
        playFanfareSound();
      }

      // League promotion logic based on XP
      let league: UserProgress['league'] = prev.league;
      if (newXP >= 1000) league = 'Diamond';
      else if (newXP >= 600) league = 'Platinum';
      else if (newXP >= 350) league = 'Gold';
      else if (newXP >= 150) league = 'Silver';

      return {
        ...prev,
        xp: newXP,
        level: newLevel,
        league,
        coins: prev.coins + Math.floor(amount / 2),
      };
    });
  };

  const addCoins = (amount: number) => {
    setProgress((prev) => ({
      ...prev,
      coins: prev.coins + amount,
    }));
  };

  const loseHeart = (): boolean => {
    let remaining = 0;
    setProgress((prev) => {
      const newHearts = Math.max(0, prev.hearts - 1);
      remaining = newHearts;
      return { ...prev, hearts: newHearts };
    });
    return remaining > 0;
  };

  const refillHearts = () => {
    setProgress((prev) => ({ ...prev, hearts: prev.maxHearts }));
  };

  const updateStreakAndDate = (prev: UserProgress): { streak: number; longestStreak: number } => {
    const today = new Date().toISOString().split('T')[0];
    if (prev.lastActiveDate === today) {
      return { streak: prev.streak, longestStreak: prev.longestStreak };
    }

    const newStreak = prev.streak + 1;
    const newLongest = Math.max(newStreak, prev.longestStreak);
    playStreakSound();

    return { streak: newStreak, longestStreak: newLongest };
  };

  const completeLesson = (lessonId: string, unitId: string, scoreAccuracy: number) => {
    setProgress((prev) => {
      const isNewCompletion = !prev.completedLessons.includes(lessonId);
      const newCompletedLessons = isNewCompletion
        ? [...prev.completedLessons, lessonId]
        : prev.completedLessons;

      const today = new Date().toISOString().split('T')[0];
      const { streak, longestStreak } = updateStreakAndDate(prev);

      // Check if entire unit is complete
      const targetUnit = curriculumData.units.find((u) => u.id === unitId);
      let newCompletedUnits = [...prev.completedUnits];
      let newUnlockedUnits = [...prev.unlockedUnits];
      let updatedStamps = [...prev.stamps];

      if (targetUnit) {
        const allLessonIds = targetUnit.lessons.map((l) => l.id);
        const hasFinishedAll = allLessonIds.every((id) => newCompletedLessons.includes(id));

        if (hasFinishedAll && !newCompletedUnits.includes(unitId)) {
          newCompletedUnits.push(unitId);
          playFanfareSound();

          // Unlock stamp for this unit
          updatedStamps = updatedStamps.map((st) => {
            if (st.id === targetUnit.stampId) {
              return { ...st, unlockedAt: new Date().toISOString() };
            }
            return st;
          });

          // Unlock next unit in sequence
          const currentUnitIndex = curriculumData.units.findIndex((u) => u.id === unitId);
          if (currentUnitIndex !== -1 && currentUnitIndex + 1 < curriculumData.units.length) {
            const nextUnitId = curriculumData.units[currentUnitIndex + 1].id;
            if (!newUnlockedUnits.includes(nextUnitId)) {
              newUnlockedUnits.push(nextUnitId);
            }
          }
        }
      }

      // 7 day streak achievement stamp check
      if (streak >= 7) {
        updatedStamps = updatedStamps.map((st) => {
          if (st.id === 'stamp-streak-master' && !st.unlockedAt) {
            return { ...st, unlockedAt: new Date().toISOString() };
          }
          return st;
        });
      }

      return {
        ...prev,
        completedLessons: newCompletedLessons,
        completedUnits: newCompletedUnits,
        unlockedUnits: newUnlockedUnits,
        stamps: updatedStamps,
        streak,
        longestStreak,
        lastActiveDate: today,
        correctAnswersCount: prev.correctAnswersCount + Math.round(scoreAccuracy * 5),
        totalQuestionsAnswered: prev.totalQuestionsAnswered + 5,
      };
    });
  };

  const unlockUnit = (unitId: string) => {
    setProgress((prev) => {
      if (prev.unlockedUnits.includes(unitId)) return prev;
      return { ...prev, unlockedUnits: [...prev.unlockedUnits, unitId] };
    });
  };

  const unlockStamp = (stampToUnlock: Stamp) => {
    setProgress((prev) => {
      const exists = prev.stamps.some((s) => s.id === stampToUnlock.id);
      let newStamps = prev.stamps;

      if (exists) {
        newStamps = prev.stamps.map((s) =>
          s.id === stampToUnlock.id ? { ...s, unlockedAt: new Date().toISOString() } : s
        );
      } else {
        newStamps = [...prev.stamps, { ...stampToUnlock, unlockedAt: new Date().toISOString() }];
      }

      playFanfareSound();
      return { ...prev, stamps: newStamps };
    });
  };

  const addIncorrectQuestion = (q: Question) => {
    setProgress((prev) => {
      if (prev.incorrectQuestions.some((item) => item.id === q.id)) return prev;
      return {
        ...prev,
        incorrectQuestions: [...prev.incorrectQuestions, q],
      };
    });
  };

  const removeIncorrectQuestion = (questionId: string) => {
    setProgress((prev) => ({
      ...prev,
      incorrectQuestions: prev.incorrectQuestions.filter((q) => q.id !== questionId),
    }));
  };

  const saveCoachAnalysis = (analysis: CoachAnalysis) => {
    setCoachHistory((prev) => [analysis, ...prev].slice(0, 30));
  };

  const recordStudyTime = (seconds: number) => {
    setProgress((prev) => ({
      ...prev,
      totalStudyTimeSeconds: prev.totalStudyTimeSeconds + seconds,
    }));
  };

  const completeDailyChallenge = (xpReward: number) => {
    const today = new Date().toISOString().split('T')[0];
    addXP(xpReward);
    setProgress((prev) => ({
      ...prev,
      lastDailyChallengeCompletedDate: today,
    }));
  };

  const resetProgress = () => {
    setProgress(DEFAULT_PROGRESS);
    setCoachHistory([]);
    localStorage.removeItem('ai_passport_progress');
    localStorage.removeItem('ai_passport_coach_history');
  };

  const exportData = (): string => {
    return JSON.stringify(
      {
        progress,
        coachHistory,
        exportDate: new Date().toISOString(),
      },
      null,
      2
    );
  };

  const importData = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.progress) {
        setProgress(parsed.progress);
        if (parsed.coachHistory) setCoachHistory(parsed.coachHistory);
        return true;
      }
    } catch (e) {
      console.error('Failed to import data:', e);
    }
    return false;
  };

  return (
    <ProgressContext.Provider
      value={{
        progress,
        coachHistory,
        addXP,
        addCoins,
        loseHeart,
        refillHearts,
        completeLesson,
        unlockUnit,
        unlockStamp,
        addIncorrectQuestion,
        removeIncorrectQuestion,
        saveCoachAnalysis,
        recordStudyTime,
        completeDailyChallenge,
        resetProgress,
        exportData,
        importData,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) throw new Error('useProgress must be used within ProgressProvider');
  return context;
};
