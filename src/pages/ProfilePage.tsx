import React from 'react';
import { Header } from '../components/common/Header';
import { useProgress } from '../context/ProgressContext';
import { useUser } from '../context/UserContext';
import { PassportStampCard } from '../components/common/PassportStampCard';
import {
  User,
  Compass,
  Award,
  Flame,
  Zap,
  Clock,
  CheckCircle2,
  Share2,
  Download,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';
import { motion } from 'motion/react';

export const ProfilePage: React.FC = () => {
  const { progress } = useProgress();
  const { profile } = useUser();

  const minutesStudied = Math.floor(progress.totalStudyTimeSeconds / 60);
  const accuracyPercent =
    progress.totalQuestionsAnswered > 0
      ? Math.round((progress.correctAnswersCount / progress.totalQuestionsAnswered) * 100)
      : 100;

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-100 pb-24 md:pb-12 relative overflow-hidden">
      {/* Background ambient glowing orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />

      <Header />

      <main className="max-w-4xl mx-auto px-4 pt-8 space-y-8 relative z-10">
        {/* Passport Identity Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative glass bg-gradient-to-br from-indigo-950/40 via-slate-900/60 to-purple-950/40 p-6 md:p-8 border-2 border-amber-400/50 shadow-2xl overflow-hidden"
        >
          {/* Passport Background Stamp Watermark */}
          <div className="absolute right-4 top-4 w-48 h-48 rounded-full border-4 border-amber-400/10 flex items-center justify-center -rotate-12 pointer-events-none">
            <Compass className="w-32 h-32 text-amber-400/10" />
          </div>

          {/* Passport Header */}
          <div className="flex items-center justify-between border-b border-amber-400/30 pb-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold">
                <Compass className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-amber-300 font-extrabold block">
                  PASSPORT OF AI FLUENCY
                </span>
                <span className="text-xs text-white/60 font-mono">GLOBAL AI LITERACY AUTHORITY</span>
              </div>
            </div>

            <div className="text-right font-mono text-[10px] text-amber-300/80">
              <p>NO: PASSPORT-{profile.name.toUpperCase().slice(0, 3)}-2026</p>
              <p>STATUS: VERIFIED</p>
            </div>
          </div>

          {/* User Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="flex items-center gap-4 md:col-span-2">
              <div className="w-20 h-20 rounded-2xl node-done border-2 border-amber-300 flex items-center justify-center font-black text-3xl text-white shadow-lg shrink-0">
                {profile.name.charAt(0).toUpperCase()}
              </div>

              <div>
                <h1 className="text-2xl font-black text-white">{profile.name}</h1>
                <p className="text-xs text-amber-300 font-mono mt-0.5">
                  Level {progress.level} • {progress.league} League
                </p>
                <p className="text-xs text-white/70 mt-1 capitalize">
                  Goal: {profile.learningGoal} • {profile.dailyGoalMinutes} mins/day
                </p>
              </div>
            </div>

            {/* Level XP Bar */}
            <div className="glass p-4 rounded-2xl border border-amber-400/30 space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-white/70">Level {progress.level} Progress</span>
                <span className="text-cyan-300 font-bold">{progress.xp % 100} / 100 XP</span>
              </div>

              <div className="w-full h-2 bg-slate-950/80 rounded-full overflow-hidden border border-white/10">
                <div
                  className="h-full bg-gradient-to-r from-amber-400 to-cyan-400 transition-all duration-300"
                  style={{ width: `${(progress.xp % 100)}%` }}
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Passport Stamps Grid */}
        <div className="p-6 md:p-8 glass shadow-2xl space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-black text-white flex items-center gap-2">
                <Award className="w-6 h-6 text-amber-400" />
                <span>Passport Stamps ({progress.stamps.filter((s) => s.unlockedAt).length} / {progress.stamps.length})</span>
              </h2>
              <p className="text-xs text-white/70 mt-1">
                Stamps are officially issued upon completing units and achieving learning milestones.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {progress.stamps.map((stamp) => (
              <PassportStampCard key={stamp.id} stamp={stamp} />
            ))}
          </div>
        </div>

        {/* Detailed Learning Stats */}
        <div className="p-6 md:p-8 glass space-y-4">
          <h2 className="text-lg font-bold text-white">Learning Statistics</h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 glass text-center border border-white/10">
              <Flame className="w-6 h-6 text-amber-400 mx-auto mb-2" />
              <span className="text-2xl font-black text-white">{progress.streak} Days</span>
              <span className="text-[10px] text-white/60 block font-mono">STREAK</span>
            </div>

            <div className="p-4 glass text-center border border-white/10">
              <Zap className="w-6 h-6 text-cyan-300 mx-auto mb-2" />
              <span className="text-2xl font-black text-white">{progress.xp} XP</span>
              <span className="text-[10px] text-white/60 block font-mono">TOTAL XP</span>
            </div>

            <div className="p-4 glass text-center border border-white/10">
              <CheckCircle2 className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
              <span className="text-2xl font-black text-white">{progress.completedLessons.length}</span>
              <span className="text-[10px] text-white/60 block font-mono">LESSONS DONE</span>
            </div>

            <div className="p-4 glass text-center border border-white/10">
              <Clock className="w-6 h-6 text-indigo-400 mx-auto mb-2" />
              <span className="text-2xl font-black text-white">{accuracyPercent}%</span>
              <span className="text-[10px] text-white/60 block font-mono">ACCURACY</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
