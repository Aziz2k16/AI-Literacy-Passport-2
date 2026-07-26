import React from 'react';
import { Header } from '../components/common/Header';
import { useProgress } from '../context/ProgressContext';
import { useUser } from '../context/UserContext';
import { Award, Flame, Zap, Shield, Trophy, Sparkles } from 'lucide-react';

export const LeaderboardPage: React.FC = () => {
  const { progress } = useProgress();
  const { profile } = useUser();

  const mockLeaderboard = [
    { name: profile.name, xp: progress.xp, isUser: true, rank: 1, avatar: '👤' },
    { name: 'Sarah Chen', xp: Math.max(0, progress.xp - 25), isUser: false, rank: 2, avatar: '👩‍🏫' },
    { name: 'Marcus Vance', xp: Math.max(0, progress.xp - 50), isUser: false, rank: 3, avatar: '👨‍💻' },
    { name: 'Elena Rostova', xp: Math.max(0, progress.xp - 90), isUser: false, rank: 4, avatar: '✨' },
    { name: 'Devon Kim', xp: Math.max(0, progress.xp - 120), isUser: false, rank: 5, avatar: '🚀' },
    { name: 'Chloe Taylor', xp: Math.max(0, progress.xp - 180), isUser: false, rank: 6, avatar: '🎨' },
  ].sort((a, b) => b.xp - a.xp);

  const getRankBadge = (rank: number) => {
    switch (rank) {
      case 1:
        return '🥇';
      case 2:
        return '🥈';
      case 3:
        return '🥉';
      default:
        return `#${rank}`;
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-100 pb-24 md:pb-12 relative overflow-hidden">
      {/* Background ambient glowing orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-amber-500/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[120px] pointer-events-none" />

      <Header />

      <main className="max-w-3xl mx-auto px-4 pt-8 space-y-6 relative z-10">
        {/* League Banner */}
        <div className="p-6 md:p-8 glass bg-gradient-to-r from-amber-950/30 via-slate-900/50 to-yellow-950/30 border border-amber-500/40 shadow-2xl flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black text-2xl shadow-lg shadow-amber-500/30">
              <Trophy className="w-8 h-8" />
            </div>
            <div>
              <span className="text-xs font-mono uppercase font-bold text-amber-300">
                Weekly Competition
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-white">{progress.league} League</h1>
              <p className="text-xs text-white/70 mt-0.5">Top 3 learners advance to the next league every Sunday!</p>
            </div>
          </div>
        </div>

        {/* Leaderboard Table */}
        <div className="p-6 md:p-8 glass shadow-2xl space-y-3">
          <h2 className="text-lg font-bold text-white mb-4">Weekly Leaderboard</h2>

          {mockLeaderboard.map((item, idx) => {
            const rankNum = idx + 1;
            return (
              <div
                key={idx}
                className={`p-4 glass-button flex items-center justify-between gap-4 border transition ${
                  item.isUser
                    ? 'bg-cyan-500/20 border-cyan-400/60 text-cyan-200 shadow-lg'
                    : 'bg-white/5 border-white/10 text-white/90'
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className="w-8 font-mono font-extrabold text-base text-center">
                    {getRankBadge(rankNum)}
                  </span>

                  <span className="text-2xl">{item.avatar}</span>

                  <div>
                    <span className="font-bold text-sm block text-white">
                      {item.name} {item.isUser && '(You)'}
                    </span>
                    <span className="text-xs text-white/50 font-mono">Rank #{rankNum}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1 font-mono font-black text-cyan-300 text-sm">
                  <Zap className="w-4 h-4 fill-cyan-300" />
                  <span>{item.xp} XP</span>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};
