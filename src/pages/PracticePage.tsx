import React, { useState } from 'react';
import { Header } from '../components/common/Header';
import { useProgress } from '../context/ProgressContext';
import { QuestionCard } from '../components/lesson/QuestionCard';
import { FeedbackSheet } from '../components/lesson/FeedbackSheet';
import { Question } from '../types';
import { playCorrectSound, playWrongSound, playFanfareSound } from '../services/soundService';
import { Sparkles, Heart, Zap, CheckCircle2, RefreshCcw, ShieldCheck } from 'lucide-react';
import { ByteMascot } from '../components/common/ByteMascot';

export const PracticePage: React.FC = () => {
  const { progress, removeIncorrectQuestion, addXP, refillHearts } = useProgress();

  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<any>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const questionsToPractice = progress.incorrectQuestions;

  if (questionsToPractice.length === 0) {
    return (
      <div className="min-h-screen bg-[#0f172a] text-slate-100 pb-24 md:pb-12 relative overflow-hidden">
        {/* Ambient background glowing orbs */}
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />

        <Header />
        <main className="max-w-2xl mx-auto px-4 pt-12 text-center space-y-6 relative z-10">
          <div className="p-8 md:p-10 glass shadow-2xl flex flex-col items-center">
            <ByteMascot
              emotion="excited"
              speechBubble="Your mistakes inbox is empty! Great job mastering your weak spots!"
              className="mb-6"
            />

            <h2 className="text-2xl font-black text-white">No Weak Spots Found!</h2>
            <p className="text-sm text-white/70 mt-2 max-w-md">
              Whenever you get a question wrong during a lesson, it will automatically save here for spaced repetition practice.
            </p>

            <button
              onClick={() => refillHearts()}
              className="mt-6 px-6 py-3 glass-button bg-cyan-400 text-slate-950 font-black text-sm flex items-center gap-2 shadow-lg shadow-cyan-500/20 border border-white/30"
            >
              <Heart className="w-4 h-4 fill-slate-950" />
              <span>Refill Hearts for Free</span>
            </button>
          </div>
        </main>
      </div>
    );
  }

  const currentQ = questionsToPractice[currentIdx];

  const handleCheck = () => {
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
      addXP(15);
      removeIncorrectQuestion(currentQ.id);
    } else {
      playWrongSound();
    }
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    setIsSubmitted(false);
    if (currentIdx + 1 < questionsToPractice.length) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      setCurrentIdx(0);
      playFanfareSound();
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-100 pb-28 md:pb-12 relative overflow-hidden">
      {/* Ambient background glowing orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />

      <Header />

      <main className="max-w-2xl mx-auto px-4 pt-8 space-y-6 relative z-10">
        <div className="flex items-center justify-between p-4 glass border border-white/10">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-300">
            <Sparkles className="w-4 h-4 text-cyan-300" />
            <span>Practice Mode • Question {currentIdx + 1} of {questionsToPractice.length}</span>
          </div>

          <span className="text-xs font-mono font-bold text-amber-300">+15 XP / correct</span>
        </div>

        <QuestionCard
          question={currentQ}
          selectedAnswer={selectedAnswer}
          onAnswerSelect={setSelectedAnswer}
          isSubmitted={isSubmitted}
        />

        {!isSubmitted && (
          <div className="flex justify-end">
            <button
              onClick={handleCheck}
              disabled={selectedAnswer === null}
              className={`w-full sm:w-auto px-8 py-3.5 rounded-2xl font-black text-sm shadow-xl transition ${
                selectedAnswer !== null
                  ? 'glass-button bg-cyan-400 text-slate-950 shadow-cyan-500/20 border border-white/30'
                  : 'glass text-white/40 cursor-not-allowed border border-white/5'
              }`}
            >
              Check Practice Answer
            </button>
          </div>
        )}

        {isSubmitted && (
          <FeedbackSheet
            isCorrect={isCorrect}
            explanation={currentQ.explanation}
            xpEarned={15}
            onNext={handleNext}
          />
        )}
      </main>
    </div>
  );
};
