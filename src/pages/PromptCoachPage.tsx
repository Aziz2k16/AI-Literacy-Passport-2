import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Header } from '../components/common/Header';
import { useProgress } from '../context/ProgressContext';
import { analyzePromptWithCoach } from '../services/apiService';
import { CoachAnalysis } from '../types';
import { ByteMascot } from '../components/common/ByteMascot';
import {
  MessageSquare,
  Sparkles,
  Copy,
  Check,
  RotateCcw,
  Star,
  AlertCircle,
  Clock,
  Send,
  Zap,
  Lightbulb,
} from 'lucide-react';
import { playFanfareSound } from '../services/soundService';

export const PromptCoachPage: React.FC = () => {
  const { coachHistory, saveCoachAnalysis, addXP } = useProgress();

  const [inputPrompt, setInputPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentAnalysis, setCurrentAnalysis] = useState<CoachAnalysis | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const samplePrompts = [
    'Write an email to my manager about taking Friday off.',
    'Explain how solar panels work.',
    'Give me a recipe for dinner.',
    'Act as a Senior Developer and review my Python function.',
  ];

  const handleAnalyze = async (textToAnalyze?: string) => {
    const promptText = (textToAnalyze || inputPrompt).trim();
    if (!promptText) {
      setErrorMsg('Please enter or select a draft prompt first!');
      return;
    }

    setErrorMsg(null);
    setLoading(true);
    setCurrentAnalysis(null);

    try {
      const result = await analyzePromptWithCoach(promptText);
      setCurrentAnalysis(result);
      saveCoachAnalysis(result);
      addXP(15);
      playFanfareSound();
    } catch (err: any) {
      setErrorMsg('Failed to analyze prompt. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (currentAnalysis?.improvedPrompt) {
      navigator.clipboard.writeText(currentAnalysis.improvedPrompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-100 pb-24 md:pb-12 relative overflow-hidden">
      {/* Ambient glowing background orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />

      <Header />

      <main className="max-w-4xl mx-auto px-4 pt-8 space-y-8 relative z-10">
        {/* Page Title */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-6 glass shadow-xl">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-extrabold uppercase text-indigo-400 mb-1">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>Flagship Gemini AI Feature</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">AI Prompt Coach</h1>
            <p className="text-sm text-white/70 mt-1">
              Enter any draft prompt to receive 1–5 scoring, clarity audits, and a boosted rewrite powered by Gemini.
            </p>
          </div>

          <ByteMascot
            emotion="excited"
            speechBubble="Paste your prompt below and I'll help you score 5/5!"
            className="shrink-0"
          />
        </div>

        {/* Input Card */}
        <div className="p-6 sm:p-8 glass shadow-2xl space-y-5">
          <label className="block text-sm font-bold text-white">
            Enter Your Draft Prompt:
          </label>

          <textarea
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            rows={4}
            placeholder="e.g., Draft an email to my manager asking for a salary review..."
            className="w-full p-4 glass-input placeholder-white/40 font-medium text-sm transition leading-relaxed resize-none"
          />

          {errorMsg && (
            <div className="flex items-center gap-2 text-rose-400 text-xs font-medium">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Quick Sample Prompts */}
          <div>
            <span className="text-xs text-white/60 font-bold block mb-2">Try a sample prompt:</span>
            <div className="flex flex-wrap gap-2">
              {samplePrompts.map((sample, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setInputPrompt(sample);
                    handleAnalyze(sample);
                  }}
                  className="text-xs px-3 py-1.5 glass-button text-slate-200 hover:text-white transition text-left"
                >
                  "{sample}"
                </button>
              ))}
            </div>
          </div>

          {/* Analyze Button */}
          <div className="pt-2 flex justify-end">
            <button
              onClick={() => handleAnalyze()}
              disabled={loading}
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl glass bg-gradient-to-r from-indigo-500/80 via-purple-600/80 to-pink-500/80 hover:from-indigo-400 hover:to-pink-400 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-xl shadow-indigo-500/25 border border-white/20 transition transform hover:scale-102 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin" />
                  <span>Analyzing with Gemini...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Coach My Prompt (+15 XP)</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Loading Animation */}
        {loading && (
          <div className="p-8 glass text-center flex flex-col items-center justify-center gap-4 animate-pulse">
            <ByteMascot emotion="thinking" />
            <p className="text-sm font-bold text-indigo-300">Gemini is analyzing clarity, specificity, and context...</p>
          </div>
        )}

        {/* Analysis Results */}
        {currentAnalysis && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 md:p-8 glass bg-gradient-to-b from-indigo-950/40 to-slate-900/60 border border-indigo-400/40 shadow-2xl space-y-6"
          >
            {/* Header & Overall Score */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
              <div>
                <span className="text-xs font-mono font-extrabold text-indigo-400 uppercase tracking-wider">
                  Analysis Complete
                </span>
                <h3 className="text-xl font-black text-white">Prompt Score Breakdown</h3>
              </div>

              <div className="px-4 py-2 glass text-indigo-300 font-extrabold text-lg flex items-center gap-1.5 border border-indigo-400/40">
                <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                <span>{currentAnalysis.overallScore} / 5.0</span>
              </div>
            </div>

            {/* Score Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { label: 'Clarity', score: currentAnalysis.clarityScore },
                { label: 'Specificity', score: currentAnalysis.specificityScore },
                { label: 'Context', score: currentAnalysis.contextScore },
              ].map((sc, i) => (
                <div
                  key={i}
                  className="p-4 glass text-center border border-white/10"
                >
                  <span className="text-xs text-white/60 font-mono block mb-1">{sc.label}</span>
                  <div className="flex items-center justify-center gap-1 text-amber-400">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${
                          star <= sc.score ? 'fill-amber-400 text-amber-400' : 'text-slate-600'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-bold text-white mt-1 block">{sc.score} / 5</span>
                </div>
              ))}
            </div>

            {/* Improved Prompt Box */}
            <div className="p-5 glass bg-slate-950/60 border border-indigo-400/30 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase text-indigo-300 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-cyan-300" />
                  <span>Improved Prompt:</span>
                </span>

                <button
                  onClick={handleCopy}
                  className="px-3 py-1.5 glass-button text-xs font-bold text-white flex items-center gap-1.5 transition"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied!' : 'Copy Prompt'}</span>
                </button>
              </div>

              <p className="text-sm font-mono text-cyan-300 leading-relaxed whitespace-pre-wrap">
                {currentAnalysis.improvedPrompt}
              </p>
            </div>

            {/* Coach Explanation & Tips */}
            <div className="p-4 glass bg-white/5 border border-white/10 text-xs text-white/80 leading-relaxed space-y-2">
              <div className="flex items-start gap-2">
                <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <p>{currentAnalysis.explanation}</p>
              </div>

              {currentAnalysis.tips && currentAnalysis.tips.length > 0 && (
                <div className="pt-2 border-t border-white/10">
                  <span className="font-bold text-indigo-300 block mb-1">Key Action Tips:</span>
                  <ul className="list-disc list-inside space-y-1 text-white/70">
                    {currentAnalysis.tips.map((tip, idx) => (
                      <li key={idx}>{tip}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* History Log */}
        {coachHistory.length > 0 && (
          <div className="p-6 glass space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-indigo-400" />
              <span>Prompt Coach History</span>
            </h3>

            <div className="space-y-3">
              {coachHistory.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setCurrentAnalysis(item)}
                  className="p-4 glass-button cursor-pointer transition flex items-center justify-between gap-4 border border-white/10"
                >
                  <div className="truncate">
                    <p className="text-xs font-mono text-slate-200 truncate">"{item.originalPrompt}"</p>
                    <span className="text-[10px] text-white/50">
                      {new Date(item.timestamp).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-amber-400 font-bold text-xs shrink-0">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{item.overallScore}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
