import React from 'react';
import { motion } from 'motion/react';
import { Stamp } from '../../types';
import { Globe, Compass, Award, Flame, Plane, Lock, CheckCircle2 } from 'lucide-react';

interface PassportStampCardProps {
  stamp: Stamp;
  onClick?: () => void;
}

export const PassportStampCard: React.FC<PassportStampCardProps> = ({ stamp, onClick }) => {
  const isUnlocked = Boolean(stamp.unlockedAt);

  const getIcon = () => {
    switch (stamp.icon) {
      case 'Globe':
        return <Globe className="w-8 h-8" />;
      case 'Compass':
        return <Compass className="w-8 h-8" />;
      case 'Award':
        return <Award className="w-8 h-8" />;
      case 'Flame':
        return <Flame className="w-8 h-8" />;
      case 'Plane':
      default:
        return <Plane className="w-8 h-8" />;
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05, rotate: isUnlocked ? [0, -1, 1, 0] : 0 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`relative p-5 glass transition-all duration-300 cursor-pointer overflow-hidden ${
        isUnlocked
          ? 'bg-gradient-to-br from-indigo-950/40 via-slate-900/60 to-purple-950/40 border-amber-400/50 shadow-xl shadow-amber-500/10'
          : 'bg-slate-900/40 border-white/5 opacity-50 grayscale'
      }`}
    >
      {/* Stamp Ink Ring & Background Motif */}
      <div className="absolute inset-0 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:12px_12px] opacity-10" />

      {/* Unlocked / Locked Badge */}
      <div className="flex items-center justify-between mb-3 relative z-10">
        <span
          className={`text-[10px] uppercase font-mono tracking-widest px-2.5 py-0.5 rounded-full ${
            isUnlocked
              ? 'glass text-amber-300 border border-amber-400/40'
              : 'glass text-white/40 border border-white/5'
          }`}
        >
          {isUnlocked ? 'STAMPED' : 'LOCKED'}
        </span>
        {isUnlocked ? (
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
        ) : (
          <Lock className="w-4 h-4 text-white/40" />
        )}
      </div>

      {/* Stamp Icon Box */}
      <div className="flex flex-col items-center justify-center text-center my-2 relative z-10">
        <div
          className={`w-16 h-16 rounded-2xl flex items-center justify-center border-2 mb-3 shadow-lg ${
            isUnlocked
              ? 'node-done text-white border-white/30 shadow-indigo-500/30'
              : 'glass text-white/30 border-white/10'
          }`}
        >
          {getIcon()}
        </div>

        <h4 className="font-extrabold text-sm text-white group-hover:text-amber-300 transition">
          {stamp.title}
        </h4>
        <p className="text-xs text-white/70 mt-1 line-clamp-2">{stamp.description}</p>
      </div>

      {/* Stamped Date Footer */}
      {isUnlocked && stamp.unlockedAt && (
        <div className="mt-3 pt-2 border-t border-amber-400/20 flex items-center justify-between text-[10px] font-mono text-amber-300/80">
          <span>VISA VERIFIED</span>
          <span>{new Date(stamp.unlockedAt).toLocaleDateString()}</span>
        </div>
      )}
    </motion.div>
  );
};
