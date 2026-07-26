import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ByteMascot } from '../components/common/ByteMascot';
import {
  Compass,
  Sparkles,
  Award,
  Zap,
  Globe,
  Flame,
  MessageSquare,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  Users,
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Compass,
      title: 'Bite-Sized Skill Paths',
      desc: 'Master AI literacy, LLM mechanics, and tokens in 5-minute interactive daily lessons.',
      color: 'from-cyan-500 to-blue-600',
    },
    {
      icon: MessageSquare,
      title: 'Gemini AI Prompt Coach',
      desc: 'Receive real-time 1–5 scoring, clarity audits, and instant prompt optimizations.',
      color: 'from-indigo-500 to-purple-600',
    },
    {
      icon: Award,
      title: 'Passport Stamps & XP',
      desc: 'Earn travel-inspired passport stamps, climb weekly leagues, and maintain streaks.',
      color: 'from-amber-500 to-orange-600',
    },
    {
      icon: ShieldCheck,
      title: 'Spot AI Mistakes',
      desc: 'Develop sharp auditing skills to spot AI hallucinations and use AI ethically.',
      color: 'from-emerald-500 to-teal-600',
    },
  ];

  const stats = [
    { value: '15+', label: 'Interactive Lessons' },
    { value: '100%', label: 'Beginner Friendly' },
    { value: '5 Min', label: 'Daily Habit' },
    { value: 'Gemini 3.6', label: 'AI Powered' },
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'High School Teacher',
      text: 'AI Literacy Passport helped my entire classroom understand prompting in two days. The passport stamps made students eager to practice!',
      avatar: '👩‍🏫',
    },
    {
      name: 'Marcus Vance',
      role: 'Product Manager',
      text: 'The AI Prompt Coach transformed how I draft specifications. I score 5/5 on clarity every time now!',
      avatar: '👨‍💻',
    },
    {
      name: 'Elena Rostova',
      role: 'Lifelong Learner',
      text: 'It feels like Duolingo for AI! The streak counter and Byte the robot keep me coming back every morning.',
      avatar: '✨',
    },
  ];

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-100 overflow-x-hidden relative">
      {/* Background ambient glowing orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[140px] pointer-events-none" />

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center text-center z-10">
        {/* Top Mascot Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 inline-flex items-center gap-2 px-4 py-2 glass text-cyan-300 text-xs font-mono font-bold uppercase tracking-wider shadow-xl border border-white/20"
        >
          <Sparkles className="w-4 h-4 text-cyan-300" />
          <span>The Duolingo for AI Literacy</span>
        </motion.div>

        {/* Hero Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight max-w-4xl leading-tight text-white"
        >
          Your stamped passport to becoming{' '}
          <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-300 bg-clip-text text-transparent">
            fluent in AI.
          </span>
        </motion.h1>

        {/* Tagline & Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 text-lg sm:text-xl text-white/70 max-w-2xl leading-relaxed"
        >
          Learn how AI works, master prompt engineering, spot hallucinations, and build practical AI skills through bite-sized gamified lessons, daily challenges, and a Gemini-powered Prompt Coach.
        </motion.p>

        {/* Animated Byte Robot Mascot & CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-10 flex flex-col items-center gap-8"
        >
          <ByteMascot
            size="xl"
            emotion="excited"
            speechBubble="Hi! I'm Byte. Ready to earn your first AI Passport Stamp?"
          />

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <button
              onClick={() => navigate('/onboarding')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl glass-button bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 hover:from-cyan-300 hover:to-indigo-500 text-slate-950 font-black text-lg flex items-center justify-center gap-3 shadow-xl shadow-cyan-500/25 transition duration-200 transform hover:scale-105 border border-white/30"
            >
              <span className="text-white">Get Started Free</span>
              <ArrowRight className="w-5 h-5 stroke-[3] text-white" />
            </button>

            <button
              onClick={() => navigate('/home')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl glass hover:bg-white/15 text-white font-bold text-lg transition duration-200"
            >
              <span>Explore Skill Path</span>
            </button>
          </div>
        </motion.div>
      </section>

      {/* Stats Counter Bar */}
      <section className="border-y border-white/10 glass bg-white/5 py-10 relative z-10">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((st, i) => (
            <div key={i} className="p-4">
              <span className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-cyan-300 to-indigo-300 bg-clip-text text-transparent">
                {st.value}
              </span>
              <p className="text-xs sm:text-sm font-medium text-white/70 mt-1">{st.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Feature Showcase Grid */}
      <section className="py-20 px-4 max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            Why Learn AI with AI Literacy Passport?
          </h2>
          <p className="text-white/70 mt-3">
            Designed like a world-class learning game. Zero technical background required.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, i) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={i}
                whileHover={{ y: -6 }}
                className="p-6 glass hover:bg-white/10 shadow-xl transition duration-300 flex flex-col justify-between border border-white/15"
              >
                <div>
                  <div
                    className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${feat.color} text-white flex items-center justify-center font-bold mb-5 shadow-lg border border-white/20`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{feat.title}</h3>
                  <p className="text-xs text-white/70 leading-relaxed">{feat.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 border-t border-white/10 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-white">Loved by Learners Worldwide</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {testimonials.map((t, i) => (
              <div key={i} className="p-6 glass shadow-lg border border-white/12">
                <p className="text-sm text-white/80 italic mb-4">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{t.avatar}</span>
                  <div>
                    <h4 className="font-bold text-sm text-white">{t.name}</h4>
                    <p className="text-xs text-indigo-300">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-20 px-4 text-center max-w-4xl mx-auto relative z-10">
        <div className="p-10 glass bg-gradient-to-r from-blue-600/20 via-indigo-600/20 to-purple-600/20 border border-white/20 shadow-2xl relative overflow-hidden">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
            Start Your Journey to AI Fluency Today
          </h2>
          <p className="text-white/80 text-sm max-w-xl mx-auto mb-8">
            Join thousands of students, professionals, and lifelong learners stamping their passport to the future.
          </p>

          <button
            onClick={() => navigate('/onboarding')}
            className="px-10 py-4 rounded-2xl glass-button bg-white text-slate-950 font-black text-lg shadow-xl shadow-cyan-500/30 transition transform hover:scale-105 border border-white/40"
          >
            Claim Your Passport
          </button>
        </div>
      </section>
    </div>
  );
};
