import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { useUser } from '../context/UserContext';
import { useProgress } from '../context/ProgressContext';
import { ByteMascot } from '../components/common/ByteMascot';
import { CheckCircle2, XCircle, ArrowRight, Brain, Award, Sparkles } from 'lucide-react';
import { playCorrectSound, playWrongSound, playFanfareSound } from '../services/soundService';

interface PlacementQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const PLACEMENT_QUESTIONS: PlacementQuestion[] = [
  {
    id: 'pt-1',
    question: 'What is Generative AI?',
    options: [
      'A software that copies and pastes articles from the web',
      'AI models capable of creating new content like text, code, images, and audio based on learned patterns',
      'A physical cleaning robot',
      'A spreadsheet calculation tool'
    ],
    correctIndex: 1,
    explanation: 'Generative AI creates original text, audio, images, and code based on probability learned from training data.'
  },
  {
    id: 'pt-2',
    question: 'What is a "Token" in Large Language Models?',
    options: [
      'A physical coin used for digital payments',
      'A basic chunk of text (word fragment or punctuation) processed by the model',
      'An encrypted password',
      'A website link'
    ],
    correctIndex: 1,
    explanation: 'Tokens are the fundamental chunks of text used by transformers for language processing.'
  },
  {
    id: 'pt-3',
    question: 'What does "Context Window" mean?',
    options: [
      'The size of your browser window',
      'The maximum amount of active memory tokens the AI can consider in a conversation at one time',
      'The screen brightness setting',
      'The speed of internet Wi-Fi'
    ],
    correctIndex: 1,
    explanation: 'The context window dictates how much previous conversation history the AI retains before forgetting earlier details.'
  },
  {
    id: 'pt-4',
    question: 'What is an "AI Hallucination"?',
    options: [
      'When the AI generates colorful artwork',
      'When an AI confidently presents fabricated or incorrect information as factual truth',
      'When the computer server crashes',
      'When the AI speaks in French'
    ],
    correctIndex: 1,
    explanation: 'Hallucination occurs because LLMs predict statistically plausible text patterns rather than looking up verified truth databases.'
  },
  {
    id: 'pt-5',
    question: 'Which element is NOT part of a standard high-quality prompt structure?',
    options: [
      'Task Instruction',
      'Context & Constraints',
      'Output Format',
      'Providing your social security number'
    ],
    correctIndex: 3,
    explanation: 'Never share personal secrets or sensitive IDs with AI models.'
  },
  {
    id: 'pt-6',
    question: 'What is "Role Prompting"?',
    options: [
      'Asking the AI to play an actor in a movie',
      'Instructing the AI to adopt a specific expert persona (e.g., "Act as a Senior UX Designer")',
      'Changing your user avatar',
      'Installing software updates'
    ],
    correctIndex: 1,
    explanation: 'Assigning a role steers the AI to utilize specialized industry vocabulary and deep analytical perspectives.'
  },
  {
    id: 'pt-7',
    question: 'What is "Few-Shot Prompting"?',
    options: [
      'Sending 10 prompts per second',
      'Providing concrete input-output examples in your prompt to demonstrate the exact desired pattern',
      'Taking screenshots of AI responses',
      'Deleting prompt history'
    ],
    correctIndex: 1,
    explanation: 'Few-shot prompting shows input->output pairs to dramatically reduce formatting errors.'
  },
  {
    id: 'pt-8',
    question: 'What phrase is famous for triggering Chain-of-Thought reasoning?',
    options: [
      'Give me the answer right now!',
      '"Let\'s think step by step."',
      'Don\'t explain anything.',
      'Guess quickly.'
    ],
    correctIndex: 1,
    explanation: '"Let\'s think step by step" forces the model to allocate token space for intermediate logical reasoning.'
  },
  {
    id: 'pt-9',
    question: 'What is the primary role of a "System Instruction"?',
    options: [
      'To set global high-level rules, persona, and boundaries that govern the AI across all turns',
      'To charge credit cards',
      'To turn on dark mode',
      'To send emails automatically'
    ],
    correctIndex: 0,
    explanation: 'System instructions define foundational guardrails and behavior for the assistant.'
  },
  {
    id: 'pt-10',
    question: 'What is the Golden Rule of AI Literacy when using AI for important decisions?',
    options: [
      'Trust everything the AI says without checking',
      'Verify critical facts, citations, and sources independently with primary authoritative documents',
      'Only use AI at night',
      'Never type numbers into prompts'
    ],
    correctIndex: 1,
    explanation: 'Always verify critical facts, medical, financial, or academic outputs with verified sources.'
  }
];

export const PlacementTestPage: React.FC = () => {
  const { completePlacementTest } = useUser();
  const { addXP, unlockUnit } = useProgress();
  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQ = PLACEMENT_QUESTIONS[currentIndex];

  const handleSelectOption = (idx: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(idx);

    if (idx === currentQ.correctIndex) {
      playCorrectSound();
      setScore((prev) => prev + 1);
    } else {
      playWrongSound();
    }

    // Auto advance
    setTimeout(() => {
      if (currentIndex + 1 < PLACEMENT_QUESTIONS.length) {
        setCurrentIndex((prev) => prev + 1);
        setSelectedOption(null);
      } else {
        finishTest();
      }
    }, 1200);
  };

  const finishTest = () => {
    setIsCompleted(true);
    completePlacementTest();
    playFanfareSound();

    const finalScore = score + (selectedOption === currentQ.correctIndex ? 1 : 0);

    // Unlocking units based on placement performance
    if (finalScore >= 8) {
      unlockUnit('unit-1');
      unlockUnit('unit-2');
      unlockUnit('unit-3');
      addXP(150);
    } else if (finalScore >= 5) {
      unlockUnit('unit-1');
      unlockUnit('unit-2');
      addXP(100);
    } else {
      unlockUnit('unit-1');
      addXP(50);
    }
  };

  if (isCompleted) {
    const finalScore = score;
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl text-center"
        >
          <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-cyan-400 to-indigo-600 text-slate-950 flex items-center justify-center font-bold text-3xl shadow-xl shadow-cyan-500/20 mb-6">
            <Award className="w-10 h-10 text-white" />
          </div>

          <h2 className="text-3xl font-black text-slate-100">Placement Complete!</h2>
          <p className="text-slate-400 mt-2 text-sm">
            You scored <span className="text-cyan-400 font-extrabold">{finalScore} / 10</span>
          </p>

          <div className="my-6 p-4 rounded-2xl bg-slate-800/80 border border-slate-700">
            <ByteMascot
              emotion="excited"
              speechBubble={
                finalScore >= 8
                  ? 'Outstanding! You unlocked all Units and earned 150 Bonus XP!'
                  : finalScore >= 5
                  ? 'Great job! You unlocked Unit 1 & Unit 2 and earned 100 Bonus XP!'
                  : 'Solid effort! You earned 50 Bonus XP and unlocked Unit 1.'
              }
              className="w-full justify-center"
            />
          </div>

          <button
            onClick={() => navigate('/home')}
            className="w-full py-4 rounded-2xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black text-base flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 transition"
          >
            <span>Go to Learning Map</span>
            <ArrowRight className="w-5 h-5 stroke-[3]" />
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl">
        {/* Progress Bar */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
            Placement Test • Question {currentIndex + 1} of 10
          </span>
          <span className="text-xs font-mono font-bold text-slate-400">Score: {score}</span>
        </div>

        <div className="w-full h-2 bg-slate-800 rounded-full mb-8 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cyan-400 to-indigo-500 transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / 10) * 100}%` }}
          />
        </div>

        {/* Question Title */}
        <h3 className="text-lg md:text-xl font-extrabold text-slate-100 mb-6 leading-snug">
          {currentQ.question}
        </h3>

        {/* Options */}
        <div className="space-y-3">
          {currentQ.options.map((option, idx) => {
            const isSelected = selectedOption === idx;
            const isCorrect = idx === currentQ.correctIndex;

            let btnStyle = 'bg-slate-800/80 border-slate-700/80 text-slate-200 hover:bg-slate-800';
            if (selectedOption !== null) {
              if (isCorrect) {
                btnStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-300 font-bold';
              } else if (isSelected) {
                btnStyle = 'bg-rose-950/80 border-rose-500 text-rose-300';
              }
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelectOption(idx)}
                disabled={selectedOption !== null}
                className={`w-full p-4 rounded-2xl border-2 text-left font-medium text-sm transition flex items-center justify-between ${btnStyle}`}
              >
                <span>{option}</span>
                {selectedOption !== null && isCorrect && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 ml-2" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
