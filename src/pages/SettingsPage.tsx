import React, { useState } from 'react';
import { Header } from '../components/common/Header';
import { useProgress } from '../context/ProgressContext';
import { useUser } from '../context/UserContext';
import { useTheme } from '../context/ThemeContext';
import {
  Settings,
  Download,
  Upload,
  RotateCcw,
  Sun,
  Moon,
  Clock,
  User,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { progress, exportData, importData, resetProgress } = useProgress();
  const { profile, updateProfile, resetUser } = useUser();
  const { theme, toggleTheme } = useTheme();

  const [importJson, setImportJson] = useState('');
  const [msg, setMsg] = useState<string | null>(null);

  const handleExport = () => {
    const jsonStr = exportData();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ai_passport_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    setMsg('Progress exported successfully!');
  };

  const handleImport = () => {
    if (!importJson.trim()) return;
    const ok = importData(importJson);
    if (ok) {
      setMsg('Progress imported successfully!');
      setImportJson('');
    } else {
      setMsg('Error importing JSON. Please verify format.');
    }
  };

  const handleFullReset = () => {
    if (window.confirm('Are you sure you want to reset all progress, stamps, and user data?')) {
      resetProgress();
      resetUser();
      window.location.href = '/';
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-100 pb-24 md:pb-12 relative overflow-hidden">
      {/* Background ambient glowing orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />

      <Header />

      <main className="max-w-3xl mx-auto px-4 pt-8 space-y-6 relative z-10">
        <div className="p-6 md:p-8 glass shadow-xl flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-white flex items-center gap-2">
              <Settings className="w-6 h-6 text-cyan-400" />
              <span>App Settings & Data</span>
            </h1>
            <p className="text-xs text-white/70 mt-1">Manage preferences, theme, and data backups.</p>
          </div>
        </div>

        {msg && (
          <div className="p-4 glass bg-cyan-950/60 border border-cyan-400/40 text-cyan-300 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{msg}</span>
          </div>
        )}

        {/* User Preferences */}
        <div className="p-6 md:p-8 glass space-y-4">
          <h2 className="text-lg font-bold text-white">Preferences</h2>

          {/* Name */}
          <div className="flex items-center justify-between p-3.5 glass-panel border border-white/10">
            <span className="text-sm font-bold text-white">Display Name</span>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => updateProfile({ name: e.target.value })}
              className="px-3 py-1.5 glass-input text-xs font-mono font-bold text-white focus:outline-none focus:border-cyan-400"
            />
          </div>

          {/* Daily Goal */}
          <div className="flex items-center justify-between p-3.5 glass-panel border border-white/10">
            <span className="text-sm font-bold text-white">Daily Goal (Minutes)</span>
            <select
              value={profile.dailyGoalMinutes}
              onChange={(e) => updateProfile({ dailyGoalMinutes: Number(e.target.value) })}
              className="px-3 py-1.5 glass-input text-xs font-mono font-bold text-white focus:outline-none focus:border-cyan-400"
            >
              <option value={5} className="bg-slate-900 text-white">5 Minutes</option>
              <option value={10} className="bg-slate-900 text-white">10 Minutes</option>
              <option value={15} className="bg-slate-900 text-white">15 Minutes</option>
              <option value={20} className="bg-slate-900 text-white">20 Minutes</option>
            </select>
          </div>

          {/* Theme */}
          <div className="flex items-center justify-between p-3.5 glass-panel border border-white/10">
            <span className="text-sm font-bold text-white">Appearance Theme</span>
            <button
              onClick={toggleTheme}
              className="px-4 py-1.5 glass-button text-xs font-bold text-cyan-300 flex items-center gap-2 border border-white/20"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4" />}
              <span>{theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</span>
            </button>
          </div>
        </div>

        {/* Data Backup & Export / Import */}
        <div className="p-6 md:p-8 glass space-y-4">
          <h2 className="text-lg font-bold text-white">Data Management</h2>

          <div className="space-y-3">
            <button
              onClick={handleExport}
              className="w-full p-4 glass-button text-white font-bold text-sm flex items-center justify-between transition border border-white/10"
            >
              <div className="flex items-center gap-3">
                <Download className="w-5 h-5 text-cyan-300" />
                <span>Export Progress Backup (JSON)</span>
              </div>
            </button>

            <div className="p-4 glass-panel space-y-2 border border-white/10">
              <span className="text-xs font-bold text-white/80 block">Import Backup JSON:</span>
              <textarea
                value={importJson}
                onChange={(e) => setImportJson(e.target.value)}
                rows={2}
                placeholder="Paste backup JSON string here..."
                className="w-full p-3 glass-input text-xs font-mono text-white placeholder-white/40 focus:outline-none focus:border-cyan-400"
              />
              <button
                onClick={handleImport}
                className="px-4 py-2 glass-button bg-cyan-400 text-slate-950 font-black text-xs flex items-center gap-2 transition border border-white/30"
              >
                <Upload className="w-4 h-4" />
                <span>Restore Progress</span>
              </button>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="p-6 md:p-8 glass bg-rose-950/20 border border-rose-500/40 space-y-3">
          <h2 className="text-lg font-bold text-rose-400 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            <span>Danger Zone</span>
          </h2>

          <button
            onClick={handleFullReset}
            className="w-full p-4 glass-button bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 text-rose-300 font-extrabold text-sm flex items-center justify-between transition"
          >
            <div className="flex items-center gap-3">
              <RotateCcw className="w-5 h-5" />
              <span>Reset All Progress & Account Data</span>
            </div>
          </button>
        </div>
      </main>
    </div>
  );
};
