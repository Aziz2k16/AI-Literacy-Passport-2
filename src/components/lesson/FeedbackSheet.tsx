import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, XCircle, ArrowRight, Lightbulb } from 'lucide-react';

interface FeedbackSheetProps {
  isCorrect: boolean;
  explanation: string;
  xpEarned: number;
  onNext: () => void;
}

export const FeedbackSheet: React.FC<FeedbackSheetProps> = ({
  isCorrect,
  explanation,
  xpEarned,
  onNext,
}) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className={`fixed bottom-0 left-0 right-0 z-50 p-6 md:p-8 border-t-2 shadow-2xl glass transition-all duration-300 ${
          isCorrect
            ? 'bg-slate-950/90 border-emerald-500/80 text-white'
            : 'bg-slate-950/90 border-rose-500/80 text-white'
        }`}
      >
        <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-lg border border-white/20 ${
                isCorrect
                  ? 'bg-emerald-500 text-slate-950 shadow-emerald-500/30'
                  : 'bg-rose-500 text-white shadow-rose-500/30'
              }`}
            >
              {isCorrect ? (
                <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
              ) : (
                <XCircle className="w-8 h-8 stroke-[2.5]" />
              )}
            </div>

            <div>
              <div className="flex items-center gap-3">
                <h3
                  className={`text-xl font-extrabold ${
                    isCorrect ? 'text-emerald-400' : 'text-rose-400'
                  }`}
                >
                  {isCorrect ? 'Excellent Job!' : 'Not Quite Right'}
                </h3>
                {isCorrect && (
                  <span className="text-xs font-mono font-black px-2.5 py-0.5 rounded-full glass text-emerald-300 border border-emerald-500/40">
                    +{xpEarned} XP
                  </span>
                )}
              </div>

              <div className="flex items-start gap-2 mt-2 text-sm text-white/90 leading-relaxed">
                <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <p>{explanation}</p>
              </div>
            </div>
          </div>

          <button
            onClick={onNext}
            className={`w-full md:w-auto px-8 py-4 rounded-2xl glass-button font-black text-base flex items-center justify-center gap-2 transition duration-200 shadow-xl shrink-0 border border-white/30 ${
              isCorrect
                ? 'bg-gradient-to-r from-emerald-400 to-teal-500 text-slate-950 shadow-emerald-500/20'
                : 'bg-gradient-to-r from-rose-500 to-red-600 text-white shadow-rose-500/20'
            }`}
          >
            <span>Continue</span>
            <ArrowRight className="w-5 h-5 stroke-[3]" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
