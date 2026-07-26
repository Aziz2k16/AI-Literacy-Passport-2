import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Header } from '../components/common/Header';
import { LearningMap } from '../components/home/LearningMap';
import { DailyChallengeCard } from '../components/home/DailyChallengeCard';
import { useProgress } from '../context/ProgressContext';
import { useUser } from '../context/UserContext';
import { HeartModal } from '../components/common/HeartModal';
import {
  MessageSquare,
  Sparkles,
  Award,
  Flame,
  Coins,
  Heart,
  Zap,
  ArrowRight,
  Compass,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { progress } = useProgress();
  const { profile } = useUser();
  const navigate = useNavigate();
  const [isHeartModalOpen, setIsHeartModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-100 pb-24 md:pb-12 relative overflow-hidden">
      {/* Ambient glowing background orbs for frosted glass depth */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[40%] right-[10%] w-[400px] h-[400px] bg-teal-500/15 rounded-full blur-[140px] pointer-events-none" />

      <Header />

      <main className="max-w-5xl mx-auto px-4 pt-6 space-y-8 relative z-10">
        {/* Top Quick Status & Daily Goal Banner */}
        <div className="glass p-6 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-500 p-0.5 shadow-lg shadow-indigo-500/30">
              <div className="w-full h-full rounded-[14px] bg-[#0f172a] flex items-center justify-center font-black text-2xl text-cyan-300">
                {profile.name.charAt(0).toUpperCase()}
              </div>
            </div>
            <div>
              <h1 className="text-xl font-black text-white tracking-tight">
                Welcome back, {profile.name}!
              </h1>
              <p className="text-xs text-white/70 mt-0.5">
                Daily Goal: {profile.dailyGoalMinutes} Mins • League:{' '}
                <span className="text-amber-400 font-bold">{progress.league}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            {/* Prompt Coach Shortcut */}
            <button
              onClick={() => navigate('/prompt-coach')}
              className="flex-1 md:flex-none px-5 py-3 rounded-2xl glass-button bg-gradient-to-r from-indigo-600/80 to-purple-600/80 hover:from-indigo-500 hover:to-purple-500 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/25 border border-white/20"
            >
              <MessageSquare className="w-4 h-4 text-cyan-300" />
              <span>AI Prompt Coach</span>
            </button>

            {/* Heart refill trigger */}
            {progress.hearts < 5 && (
              <button
                onClick={() => setIsHeartModalOpen(true)}
                className="px-4 py-3 rounded-2xl glass border border-rose-500/40 text-rose-300 font-bold text-xs flex items-center gap-1.5 hover:bg-rose-500/20 transition"
              >
                <Heart className="w-4 h-4 fill-rose-500" />
                <span>Refill</span>
              </button>
            )}
          </div>
        </div>

        {/* Daily Challenge Card */}
        <DailyChallengeCard />

        {/* Interactive Skill Path Map */}
        <div className="glass p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="text-center max-w-md mx-auto mb-8">
            <span className="text-xs font-mono uppercase font-extrabold text-indigo-400 tracking-widest px-3 py-1 rounded-full glass border border-indigo-500/30">
              SKILL PATH progression
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-3 tracking-tight">
              Your AI Learning Path
            </h2>
          </div>

          <LearningMap />
        </div>
      </main>

      <HeartModal isOpen={isHeartModalOpen} onClose={() => setIsHeartModalOpen(false)} />
    </div>
  );
};
