import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import curriculumData from '../data/curriculum.json';
import { Lesson, Question } from '../types';
import { useProgress } from '../context/ProgressContext';
import { QuestionCard } from '../components/lesson/QuestionCard';
import { FeedbackSheet } from '../components/lesson/FeedbackSheet';
import { Confetti, triggerConfetti } from '../components/common/Confetti';
import { HeartModal } from '../components/common/HeartModal';
import { playCorrectSound, playWrongSound, playFanfareSound } from '../services/soundService';
import {
  Heart,
  Zap,
  X,
  ArrowRight,
  CheckCircle2,
  Award,
  Sparkles,
  RotateCcw,
  Home,
} from 'lucide-react';

export const LessonPage: React.FC = () => {
  const { unitId, lessonId } = useParams<{ unitId: string; lessonId: string }>();
  const navigate = useNavigate();
  const { progress, addXP, loseHeart, completeLesson, addIncorrectQuestion } = useProgress();

  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<any>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [scoreCount, setScoreCount] = useState(0);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [showHeartModal, setShowHeartModal] = useState(false);
  const [startTime] = useState<number>(Date.now());

  useEffect(() => {
    if (unitId && lessonId) {
      const targetUnit = curriculumData.units.find((u) => u.id === unitId);
      if (targetUnit) {
        const targetLesson = targetUnit.lessons.find((l) => l.id === lessonId);
        if (targetLesson) {
          setLesson(targetLesson as Lesson);
        }
      }
    }
  }, [unitId, lessonId]);

  if (!lesson) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4">
        <div className="p-8 bg-slate-900 border border-slate-800 rounded-3xl text-center">
          <p className="text-slate-400">Lesson not found.</p>
          <button
            onClick={() => navigate('/home')}
            className="mt-4 px-6 py-2.5 bg-cyan-400 text-slate-950 font-bold rounded-2xl"
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }

  const currentQ = lesson.questions[currentQIndex];

  const handleCheckAnswer = () => {
    if (selectedAnswer === null || isSubmitted) return;

    let correct = false;

    if (currentQ.type === 'order-steps') {
      const targetArray = currentQ.answer as string[];
      const userArray = selectedAnswer as string[];
      correct =
        Array.isArray(userArray) &&
        userArray.length === targetArray.length &&
        userArray.every((val, idx) => val === targetArray[idx]);
    } else {
      correct = selectedAnswer === currentQ.answer;
    }

    setIsCorrect(correct);
    setIsSubmitted(true);

    if (correct) {
      playCorrectSound();
      setScoreCount((prev) => prev + 1);
      addXP(currentQ.xp);
    } else {
      playWrongSound();
      addIncorrectQuestion(currentQ);
      const hasHeartsLeft = loseHeart();
      if (!hasHeartsLeft) {
        setShowHeartModal(true);
      }
    }
  };

  const handleNextQuestion = () => {
    if (currentQIndex + 1 < lesson.questions.length) {
      setCurrentQIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsSubmitted(false);
    } else {
      // Lesson Complete!
      const accuracy = scoreCount / lesson.questions.length;
      completeLesson(lesson.id, lesson.unitId, accuracy);
      triggerConfetti();
      playFanfareSound();
      setShowCompleteModal(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-100 flex flex-col justify-between pb-28 md:pb-12 relative overflow-hidden">
      {/* Background ambient glowing orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />

      {/* Top Bar */}
      <header className="p-4 max-w-4xl mx-auto w-full flex items-center justify-between gap-4 relative z-10">
        <button
          onClick={() => navigate('/home')}
          className="p-2 text-white/70 hover:text-white rounded-2xl glass-button transition"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Progress Bar */}
        <div className="flex-1 h-3 glass rounded-full border border-white/10 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cyan-400 to-indigo-500 transition-all duration-300"
            style={{ width: `${((currentQIndex + 1) / lesson.questions.length) * 100}%` }}
          />
        </div>

        {/* Hearts */}
        <div className="flex items-center gap-1.5 font-bold text-rose-400 glass px-3 py-1.5 rounded-2xl text-sm border border-rose-500/30">
          <Heart className="w-5 h-5 fill-rose-500" />
          <span>{progress.hearts}</span>
        </div>
      </header>

      {/* Question Content */}
      <main className="max-w-2xl mx-auto w-full px-4 my-auto relative z-10">
        <QuestionCard
          question={currentQ}
          selectedAnswer={selectedAnswer}
          onAnswerSelect={setSelectedAnswer}
          isSubmitted={isSubmitted}
        />

        {/* Check Answer Button (before submission) */}
        {!isSubmitted && (
          <div className="mt-6 flex justify-end">
            <button
              onClick={handleCheckAnswer}
              disabled={selectedAnswer === null}
              className={`w-full sm:w-auto px-8 py-4 rounded-2xl font-black text-base shadow-xl transition duration-200 border border-white/30 ${
                selectedAnswer !== null
                  ? 'glass-button bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 shadow-cyan-500/20'
                  : 'glass text-white/40 border border-white/5 cursor-not-allowed'
              }`}
            >
              Check Answer
            </button>
          </div>
        )}
      </main>

      {/* Feedback Sheet (after submission) */}
      {isSubmitted && (
        <FeedbackSheet
          isCorrect={isCorrect}
          explanation={currentQ.explanation}
          xpEarned={currentQ.xp}
          onNext={handleNextQuestion}
        />
      )}

      {/* Lesson Complete Celebration Modal */}
      <AnimatePresence>
        {showCompleteModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full max-w-md glass border border-cyan-400/50 rounded-3xl p-8 shadow-2xl text-center relative overflow-hidden"
            >
              <div className="w-20 h-20 mx-auto rounded-3xl node-done text-white flex items-center justify-center font-bold text-3xl shadow-xl shadow-cyan-500/30 mb-6 border border-white/30">
                <Award className="w-10 h-10 text-white animate-bounce" />
              </div>

              <h2 className="text-3xl font-black text-white">Lesson Complete!</h2>
              <p className="text-sm text-cyan-300 font-medium mt-1">{lesson.title}</p>

              {/* Reward stats */}
              <div className="grid grid-cols-2 gap-3 my-6">
                <div className="p-4 glass text-center border border-white/10">
                  <span className="text-xs text-white/60 font-mono block">XP EARNED</span>
                  <span className="text-2xl font-black text-cyan-300">+{lesson.xpReward}</span>
                </div>
                <div className="p-4 glass text-center border border-white/10">
                  <span className="text-xs text-white/60 font-mono block">ACCURACY</span>
                  <span className="text-2xl font-black text-emerald-400">
                    {Math.round((scoreCount / lesson.questions.length) * 100)}%
                  </span>
                </div>
              </div>

              <button
                onClick={() => navigate('/home')}
                className="w-full py-4 rounded-2xl glass-button bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 text-slate-950 font-black text-base flex items-center justify-center gap-2 shadow-xl shadow-cyan-500/25 transition border border-white/30"
              >
                <Home className="w-5 h-5 stroke-[3]" />
                <span className="text-white">Return to Skill Path</span>
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <HeartModal isOpen={showHeartModal} onClose={() => setShowHeartModal(false)} />
    </div>
  );
};
