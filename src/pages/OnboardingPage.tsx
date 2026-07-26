import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { useUser } from '../context/UserContext';
import { ByteMascot } from '../components/common/ByteMascot';
import {
  User,
  Clock,
  Target,
  Sparkles,
  ArrowRight,
  Brain,
  Briefcase,
  GraduationCap,
  HeartHandshake,
  Compass,
} from 'lucide-react';

export const OnboardingPage: React.FC = () => {
  const { completeOnboarding } = useUser();
  const navigate = useNavigate();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [name, setName] = useState('');
  const [dailyGoalMinutes, setDailyGoalMinutes] = useState(10);
  const [experienceLevel, setExperienceLevel] = useState<'beginner' | 'intermediate' | 'advanced'>(
    'beginner'
  );
  const [learningGoal, setLearningGoal] = useState<
    'career' | 'school' | 'creativity' | 'curiosity'
  >('curiosity');

  const handleFinishOnboarding = (takePlacementTest: boolean) => {
    completeOnboarding({
      name: name.trim() || 'AI Explorer',
      dailyGoalMinutes,
      experienceLevel,
      learningGoal,
    });

    if (takePlacementTest) {
      navigate('/placement-test');
    } else {
      navigate('/home');
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background ambient glowing orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-xl glass p-6 md:p-10 shadow-2xl relative overflow-hidden z-10 border border-white/20">
        {/* Progress Dots */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`h-2 rounded-full transition-all duration-300 ${
                  s === step ? 'w-8 bg-cyan-300' : s < step ? 'w-3 bg-cyan-400/50' : 'w-3 glass opacity-40'
                }`}
              />
            ))}
          </div>
          <span className="text-xs font-mono font-bold text-white/50">Step {step} of 4</span>
        </div>

        {/* STEP 1: Name */}
        {step === 1 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <ByteMascot
              emotion="happy"
              speechBubble="Welcome! What should I call you on your AI Passport?"
              className="mb-6"
            />

            <h2 className="text-2xl font-black text-white mb-2">What is your name?</h2>
            <p className="text-sm text-white/70 mb-6">This will appear on your official Passport Profile.</p>

            <div className="relative mb-8">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name (e.g. Alex)"
                className="w-full pl-12 pr-4 py-4 glass-input placeholder-white/40 font-medium text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full py-4 glass-button bg-cyan-400 text-slate-950 font-black text-base flex items-center justify-center gap-2 transition border border-white/30"
            >
              <span>Continue</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        )}

        {/* STEP 2: Learning Goal */}
        {step === 2 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <ByteMascot
              emotion="excited"
              speechBubble="Awesome! What is your main motivation for learning AI?"
              className="mb-6"
            />

            <h2 className="text-2xl font-black text-white mb-2">Why are you learning AI?</h2>
            <p className="text-sm text-white/70 mb-6">We'll customize your daily challenge topics.</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {[
                { id: 'curiosity', label: 'General Curiosity', icon: Sparkles, desc: 'Understand the hype' },
                { id: 'career', label: 'Career Growth', icon: Briefcase, desc: 'Supercharge productivity' },
                { id: 'school', label: 'School & Studies', icon: GraduationCap, desc: 'Excel in assignments' },
                { id: 'creativity', label: 'Creative Projects', icon: Compass, desc: 'Generate art & stories' },
              ].map((item) => {
                const Icon = item.icon;
                const isSelected = learningGoal === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setLearningGoal(item.id as any)}
                    className={`p-4 rounded-2xl border text-left transition flex items-start gap-3 ${
                      isSelected
                        ? 'glass bg-cyan-500/25 border-cyan-300 text-white shadow-lg shadow-cyan-500/20'
                        : 'glass-button text-white/80 border-white/10'
                    }`}
                  >
                    <Icon className={`w-6 h-6 shrink-0 mt-0.5 ${isSelected ? 'text-cyan-300' : 'text-white/40'}`} />
                    <div>
                      <span className="font-bold text-sm block text-white">{item.label}</span>
                      <span className="text-xs text-white/60">{item.desc}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setStep(3)}
              className="w-full py-4 glass-button bg-cyan-400 text-slate-950 font-black text-base flex items-center justify-center gap-2 transition border border-white/30"
            >
              <span>Continue</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        )}

        {/* STEP 3: Daily Goal */}
        {step === 3 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <ByteMascot
              emotion="encouraging"
              speechBubble="Consistency is magic! How much time can you commit daily?"
              className="mb-6"
            />

            <h2 className="text-2xl font-black text-white mb-2">Pick your daily goal</h2>
            <p className="text-sm text-white/70 mb-6">You can change this anytime in settings.</p>

            <div className="space-y-3 mb-8">
              {[
                { mins: 5, label: '5 Minutes / day', desc: 'Casual • 1 lesson' },
                { mins: 10, label: '10 Minutes / day', desc: 'Regular • 2 lessons (Recommended)' },
                { mins: 15, label: '15 Minutes / day', desc: 'Serious • 3 lessons' },
                { mins: 20, label: '20 Minutes / day', desc: 'Intense • Rapid Mastery' },
              ].map((item) => {
                const isSelected = dailyGoalMinutes === item.mins;
                return (
                  <button
                    key={item.mins}
                    onClick={() => setDailyGoalMinutes(item.mins)}
                    className={`w-full p-4 rounded-2xl border text-left transition flex items-center justify-between ${
                      isSelected
                        ? 'glass bg-cyan-500/25 border-cyan-300 text-white font-bold shadow-lg'
                        : 'glass-button text-white/80 border-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Clock className={`w-5 h-5 ${isSelected ? 'text-cyan-300' : 'text-white/40'}`} />
                      <div>
                        <span className="block text-white text-sm">{item.label}</span>
                        <span className="text-xs text-white/60 font-normal">{item.desc}</span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setStep(4)}
              className="w-full py-4 glass-button bg-cyan-400 text-slate-950 font-black text-base flex items-center justify-center gap-2 transition border border-white/30"
            >
              <span>Continue</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        )}

        {/* STEP 4: Placement Test Option */}
        {step === 4 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <ByteMascot
              emotion="excited"
              speechBubble="Almost done! Do you already know some AI concepts?"
              className="mb-6"
            />

            <h2 className="text-2xl font-black text-white mb-2">Find your starting point</h2>
            <p className="text-sm text-white/70 mb-6">
              Take a short 10-question placement test to unlock completed units, or start from Unit 1.
            </p>

            <div className="space-y-4 mb-8">
              <button
                onClick={() => handleFinishOnboarding(true)}
                className="w-full p-5 glass-button bg-gradient-to-r from-indigo-600/80 to-purple-600/80 text-white font-extrabold text-base flex items-center justify-between shadow-xl shadow-indigo-500/25 transition border border-white/30"
              >
                <div className="flex items-center gap-3 text-left">
                  <Brain className="w-7 h-7 text-indigo-300 shrink-0" />
                  <div>
                    <span className="block">Take Placement Test (2 Mins)</span>
                    <span className="text-xs font-normal text-indigo-200">
                      Skip basics if you already know AI fundamentals
                    </span>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 shrink-0" />
              </button>

              <button
                onClick={() => handleFinishOnboarding(false)}
                className="w-full p-5 glass-button text-white font-bold text-base flex items-center justify-between transition border border-white/10"
              >
                <div className="flex items-center gap-3 text-left">
                  <Compass className="w-7 h-7 text-cyan-300 shrink-0" />
                  <div>
                    <span className="block">Start from the Beginning</span>
                    <span className="text-xs font-normal text-white/60">
                      Begin with Unit 1: What is AI Really?
                    </span>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 shrink-0" />
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
