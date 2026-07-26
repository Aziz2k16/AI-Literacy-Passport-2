import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useProgress } from '../../context/ProgressContext';
import { useTheme } from '../../context/ThemeContext';
import { useUser } from '../../context/UserContext';
import {
  Flame,
  Heart,
  Zap,
  Coins,
  Sun,
  Moon,
  Compass,
  Award,
  MessageSquare,
  User,
  Settings,
  Sparkles,
  BookOpen,
} from 'lucide-react';
import { motion } from 'motion/react';

export const Header: React.FC = () => {
  const { progress } = useProgress();
  const { profile } = useUser();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const navItems = [
    { path: '/home', label: 'Learn', icon: Compass },
    { path: '/prompt-coach', label: 'Prompt Coach', icon: MessageSquare, highlight: true },
    { path: '/practice', label: 'Practice', icon: Sparkles, badge: progress.incorrectQuestions.length },
    { path: '/leaderboard', label: 'Leagues', icon: Award },
    { path: '/profile', label: 'Passport', icon: User },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#0f172a]/70 backdrop-blur-xl border-b border-white/10 text-white transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link to="/home" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-2xl glass flex items-center justify-center text-white shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition duration-200 border border-white/20">
              <Compass className="w-5 h-5 text-indigo-400 animate-pulse" />
            </div>
            <div>
              <span className="text-lg font-black tracking-tight text-white flex items-center gap-1.5">
                AI LITERACY PASSPORT
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative flex items-center gap-2 px-3.5 py-2 rounded-2xl text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'glass text-cyan-300 bg-white/15 border-white/25 shadow-lg shadow-cyan-500/10'
                      : 'text-slate-300 hover:text-white hover:bg-white/10'
                  } ${item.highlight ? 'border border-cyan-400/40 bg-cyan-500/10' : ''}`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-300' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="ml-1 px-2 py-0.5 text-xs font-bold rounded-full bg-cyan-400 text-slate-950 shadow-sm">
                      {item.badge}
                    </span>
                  )}
                  {item.highlight && (
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Top Bar Game Stats & Theme Toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Streak */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-1.5 glass px-3 py-1.5 text-xs sm:text-sm font-bold text-amber-400 shadow-sm"
              title="Daily Streak"
            >
              <Flame className="w-4 h-4 fill-amber-400 animate-bounce" />
              <span>{progress.streak}</span>
            </motion.div>

            {/* Gems / Coins */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-1.5 glass px-3 py-1.5 text-xs sm:text-sm font-bold text-blue-400 shadow-sm"
              title="Coins / Gems"
            >
              <Coins className="w-4 h-4 text-blue-400" />
              <span>{progress.coins}</span>
            </motion.div>

            {/* Hearts */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-1.5 glass px-3 py-1.5 text-xs sm:text-sm font-bold text-rose-400 shadow-sm"
              title="Hearts / Lives"
            >
              <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
              <span>{progress.hearts}</span>
            </motion.div>

            {/* XP */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="hidden sm:flex items-center gap-1.5 glass px-3 py-1.5 text-xs sm:text-sm font-bold text-cyan-300 shadow-sm"
              title="Total XP"
            >
              <Zap className="w-4 h-4 fill-cyan-400" />
              <span>{progress.xp} XP</span>
            </motion.div>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 text-slate-300 hover:text-white glass-button rounded-xl transition duration-150"
              title="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Settings Link */}
            <Link
              to="/settings"
              className="p-2.5 text-slate-300 hover:text-white glass-button rounded-xl transition duration-150"
              title="Settings"
            >
              <Settings className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0f172a]/90 border-t border-white/10 backdrop-blur-xl py-2 px-3 flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center gap-0.5 text-xs font-medium ${
                isActive ? 'text-cyan-300 font-bold' : 'text-slate-400'
              }`}
            >
              <div className={`p-1.5 rounded-xl ${isActive ? 'glass text-cyan-300 bg-white/20 border-white/30' : ''}`}>
                <Icon className="w-5 h-5" />
              </div>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </header>
  );
};
