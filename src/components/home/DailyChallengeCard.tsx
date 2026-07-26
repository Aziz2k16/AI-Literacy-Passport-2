import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, CheckCircle2, Clock, Zap, ArrowRight, X } from 'lucide-react';
import { fetchDailyChallenge } from '../../services/apiService';
import { DailyChallenge } from '../../types';
import { useProgress } from '../../context/ProgressContext';
import { playCorrectSound, playWrongSound } from '../../services/soundService';

export const DailyChallengeCard: React.FC = () => {
  const { progress, completeDailyChallenge } = useProgress();
  const [challenge, setChallenge] = useState<DailyChallenge | null>(null);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const todayStr = new Date().toISOString().split('T')[0];
  const isCompletedToday = progress.lastDailyChallengeCompletedDate === todayStr;

  useEffect(() => {
    let isMounted = true;
    async function load() {
      try {
        const data = await fetchDailyChallenge();
        if (isMounted) setChallenge(data);
      } catch (e) {
        console.error('Failed to load daily challenge:', e);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    load();
    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="w-full bg-slate-900/60 border border-slate-800 rounded-3xl p-5 animate-pulse flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-slate-800" />
          <div className="space-y-2">
            <div className="w-32 h-4 bg-slate-800 rounded" />
            <div className="w-48 h-3 bg-slate-800/60 rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (!challenge) return null;

  const handleSubmit = (idx: number) => {
    if (submitted) return;
    setSelectedIndex(idx);
    setSubmitted(true);

    if (idx === challenge.correctAnswerIndex) {
      playCorrectSound();
      completeDailyChallenge(challenge.xpReward);
    } else {
      playWrongSound();
    }
  };

  return (
    <>
      {/* Daily Challenge Card Banner */}
      <motion.div
        whileHover={{ scale: 1.01 }}
        className={`w-full relative overflow-hidden glass p-6 transition-all duration-300 shadow-xl ${
          isCompletedToday
            ? 'bg-gradient-to-r from-emerald-600/20 via-slate-900/60 to-teal-600/20 border-emerald-400/40'
            : 'bg-gradient-to-r from-blue-600/20 via-slate-900/60 to-indigo-600/20 border-blue-400/40'
        }`}
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center font-bold shadow-lg ${
                isCompletedToday
                  ? 'node-done text-white border border-white/20'
                  : 'node-active text-white border border-white/20'
              }`}
            >
              <Sparkles className="w-7 h-7 text-white" />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs uppercase font-mono tracking-wider font-black text-indigo-400">
                  Daily Challenge
                </span>
                <span className="text-[10px] px-2.5 py-0.5 rounded-full glass text-cyan-300 border border-white/10">
                  +{challenge.xpReward} XP
                </span>
              </div>
              <h3 className="font-extrabold text-lg text-white mt-0.5">
                {isCompletedToday ? 'Daily Challenge Completed!' : challenge.topic}
              </h3>
            </div>
          </div>

          <button
            onClick={() => setIsOpen(true)}
            className={`px-5 py-3 rounded-2xl font-bold text-sm flex items-center gap-2 transition duration-200 ${
              isCompletedToday
                ? 'glass-button text-emerald-300 border-emerald-500/40'
                : 'glass-button bg-gradient-to-r from-blue-500/80 to-indigo-600/80 text-white shadow-lg shadow-blue-500/20 border-white/20'
            }`}
          >
            <span>{isCompletedToday ? 'Review' : 'Play Challenge'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>

      {/* Challenge Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg glass-panel p-8 text-slate-100"
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 p-2 text-white/70 hover:text-white glass-button rounded-full"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 text-indigo-400 font-mono text-xs uppercase font-extrabold mb-3">
                <Sparkles className="w-4 h-4" />
                <span>Today's Challenge • {challenge.topic}</span>
              </div>

              <h3 className="text-xl font-bold text-white mb-6 leading-snug">
                {challenge.question}
              </h3>

              {/* Options */}
              <div className="space-y-3">
                {challenge.options.map((option, idx) => {
                  let btnStyle =
                    'glass-button text-white/90 hover:bg-white/15 border-white/15';

                  if (submitted) {
                    if (idx === challenge.correctAnswerIndex) {
                      btnStyle = 'glass bg-emerald-500/25 border-emerald-400 text-emerald-200 font-bold';
                    } else if (idx === selectedIndex) {
                      btnStyle = 'glass bg-rose-500/25 border-rose-400 text-rose-200';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSubmit(idx)}
                      disabled={submitted}
                      className={`w-full p-4 rounded-2xl text-left text-sm font-medium transition flex items-center justify-between ${btnStyle}`}
                    >
                      <span>{option}</span>
                      {submitted && idx === challenge.correctAnswerIndex && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 ml-2" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation feedback */}
              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 rounded-2xl glass bg-white/5 text-xs text-white/80 leading-relaxed border border-white/10"
                >
                  <p className="font-bold text-cyan-300 mb-1">Explanation:</p>
                  <p>{challenge.explanation}</p>
                </motion.div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
