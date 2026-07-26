import React from 'react';
import { motion } from 'motion/react';
import { Check, Lock, Star, Play, Sparkles } from 'lucide-react';

interface NodeButtonProps {
  lessonId: string;
  title: string;
  isCompleted: boolean;
  isUnlocked: boolean;
  isCurrent: boolean;
  offset: number; // horizontal offset for snake/curved path
  onClick: () => void;
}

export const NodeButton: React.FC<NodeButtonProps> = ({
  lessonId,
  title,
  isCompleted,
  isUnlocked,
  isCurrent,
  offset,
  onClick,
}) => {
  return (
    <div
      className="relative flex flex-col items-center my-4 z-10"
      style={{ transform: `translateX(${offset}px)` }}
    >
      {/* Connecting Path line above node */}
      <div className="path-line my-1 opacity-60" />

      {/* Current Active Floating Banner */}
      {isCurrent && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: [0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute -top-10 px-3 py-1 rounded-full bg-cyan-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-cyan-400/40 flex items-center gap-1 z-20 border border-white/40"
        >
          <Play className="w-3 h-3 fill-slate-950" />
          <span>START</span>
        </motion.div>
      )}

      {/* Main Node Button */}
      <motion.button
        whileHover={{ scale: isUnlocked ? 1.1 : 1 }}
        whileTap={{ scale: isUnlocked ? 0.92 : 1 }}
        onClick={isUnlocked ? onClick : undefined}
        disabled={!isUnlocked}
        className={`relative flex items-center justify-center transition-all duration-300 ${
          isCompleted
            ? 'w-20 h-20 rounded-full node-done border-4 border-white/20 text-white'
            : isCurrent
            ? 'w-24 h-24 rounded-full node-active border-4 border-white/30 text-white'
            : isUnlocked
            ? 'w-20 h-20 rounded-full glass border-4 border-white/20 text-indigo-300 hover:border-white/40'
            : 'w-20 h-20 rounded-full glass border-4 border-white/5 opacity-40 text-slate-500 cursor-not-allowed'
        }`}
      >
        {/* Glow halo for current */}
        {isCurrent && (
          <div className="absolute -inset-2 rounded-full bg-teal-400/20 blur-lg animate-pulse" />
        )}

        {/* Status Icon */}
        <div className="relative z-10 flex flex-col items-center justify-center">
          {isCompleted ? (
            <Check className="w-8 h-8 stroke-[3]" />
          ) : isCurrent ? (
            <Play className="w-10 h-10 fill-current ml-1" />
          ) : isUnlocked ? (
            <Star className="w-7 h-7 text-indigo-300 fill-indigo-300/30" />
          ) : (
            <Lock className="w-7 h-7 text-slate-400" />
          )}
        </div>
      </motion.button>

      {/* Title Label below */}
      <div className="mt-2 text-center max-w-[140px]">
        <span
          className={`text-xs font-bold block truncate px-2.5 py-0.5 rounded-full ${
            isCurrent
              ? 'glass text-cyan-300 font-black border border-cyan-400/40'
              : isCompleted
              ? 'text-indigo-300 font-bold'
              : isUnlocked
              ? 'text-white/80'
              : 'text-white/40'
          }`}
        >
          {title}
        </span>
      </div>
    </div>
  );
};
