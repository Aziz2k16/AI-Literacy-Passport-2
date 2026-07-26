import React from 'react';
import { motion } from 'motion/react';
import { Bot, Sparkles, Heart, Flame, Award, CheckCircle2 } from 'lucide-react';

interface ByteMascotProps {
  emotion?: 'happy' | 'excited' | 'thinking' | 'encouraging' | 'celebrate';
  speechBubble?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSparkles?: boolean;
  onClick?: () => void;
  className?: string;
}

export const ByteMascot: React.FC<ByteMascotProps> = ({
  emotion = 'happy',
  speechBubble,
  size = 'md',
  showSparkles = true,
  onClick,
  className = '',
}) => {
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
    xl: 'w-32 h-32',
  };

  const iconSizes = {
    sm: 20,
    md: 32,
    lg: 48,
    xl: 64,
  };

  const getEmotionBadge = () => {
    switch (emotion) {
      case 'excited':
      case 'celebrate':
        return <Sparkles className="w-4 h-4 text-amber-400 fill-amber-400 animate-pulse" />;
      case 'encouraging':
        return <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />;
      default:
        return null;
    }
  };

  return (
    <div className={`relative inline-flex items-center gap-3 ${className}`} onClick={onClick}>
      {/* Robot Mascot Container */}
      <motion.div
        whileHover={{ scale: 1.08, rotate: [0, -3, 3, 0] }}
        whileTap={{ scale: 0.95 }}
        animate={
          emotion === 'celebrate' || emotion === 'excited'
            ? { y: [0, -8, 0], rotate: [0, -4, 4, 0] }
            : { y: [0, -3, 0] }
        }
        transition={{
          repeat: Infinity,
          repeatType: 'reverse',
          duration: emotion === 'celebrate' ? 1.2 : 3,
        }}
        className={`relative ${sizeClasses[size]} rounded-2xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 p-0.5 shadow-lg shadow-cyan-500/20 cursor-pointer flex items-center justify-center group`}
      >
        {/* Glow halo */}
        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-cyan-400 to-indigo-500 opacity-30 blur-md group-hover:opacity-70 transition duration-300" />

        {/* Robot Head Body */}
        <div className="relative w-full h-full bg-slate-900 rounded-2xl flex items-center justify-center overflow-hidden border border-cyan-400/30">
          {/* Circuit Lines Background */}
          <div className="absolute inset-0 bg-[radial-gradient(#06b6d4_1px,transparent_1px)] [background-size:8px_8px] opacity-20" />

          {/* Robot Eyes & Face */}
          <div className="relative flex flex-col items-center justify-center">
            {/* Antenna */}
            <div className="absolute -top-3 w-1.5 h-2 bg-cyan-400 rounded-full flex items-center justify-center">
              <div className="w-2.5 h-2.5 -top-2 absolute bg-cyan-300 rounded-full animate-ping opacity-75" />
            </div>

            {/* Eyes */}
            <div className="flex items-center gap-2 mb-0.5">
              <motion.div
                animate={emotion === 'thinking' ? { scaleY: [1, 0.2, 1] } : { scaleY: 1 }}
                transition={{ repeat: Infinity, duration: 4 }}
                className="w-2.5 h-3.5 bg-cyan-300 rounded-full shadow-[0_0_8px_#22d3ee]"
              />
              <motion.div
                animate={emotion === 'thinking' ? { scaleY: [1, 0.2, 1] } : { scaleY: 1 }}
                transition={{ repeat: Infinity, duration: 4, delay: 0.1 }}
                className="w-2.5 h-3.5 bg-cyan-300 rounded-full shadow-[0_0_8px_#22d3ee]"
              />
            </div>

            {/* Smile / Mouth */}
            <div className="w-4 h-1 bg-cyan-400/80 rounded-full mt-0.5" />
          </div>

          {/* Emotion Badge */}
          <div className="absolute top-1 right-1">{getEmotionBadge()}</div>
        </div>
      </motion.div>

      {/* Speech Bubble */}
      {speechBubble && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, x: -10 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          className="relative max-w-xs bg-slate-900/90 dark:bg-slate-800/90 border border-cyan-500/30 text-slate-100 text-sm font-medium px-4 py-3 rounded-2xl shadow-xl backdrop-blur-md"
        >
          {/* Arrow */}
          <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-0 h-0 border-y-8 border-y-transparent border-r-8 border-r-slate-900 dark:border-r-slate-800" />
          <p className="leading-snug text-slate-200">{speechBubble}</p>
        </motion.div>
      )}
    </div>
  );
};
