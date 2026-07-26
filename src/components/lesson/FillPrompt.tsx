import React from 'react';
import { motion } from 'motion/react';
import { Terminal } from 'lucide-react';

interface FillPromptProps {
  codeOrPrompt?: string;
  choices: string[];
  selectedIndex: number | null;
  onSelect: (index: number) => void;
  disabled?: boolean;
}

export const FillPrompt: React.FC<FillPromptProps> = ({
  codeOrPrompt,
  choices,
  selectedIndex,
  onSelect,
  disabled = false,
}) => {
  return (
    <div className="w-full my-4">
      {/* Code / Prompt Terminal Box */}
      {codeOrPrompt && (
        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-sm text-cyan-300 leading-relaxed mb-6 shadow-inner relative overflow-hidden">
          <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-800 text-xs text-slate-500">
            <Terminal className="w-4 h-4 text-cyan-400" />
            <span>Prompt Slot Insertion</span>
          </div>
          <p className="whitespace-pre-wrap">{codeOrPrompt}</p>
        </div>
      )}

      {/* Choices Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {choices.map((choice, idx) => {
          const isSelected = selectedIndex === idx;

          return (
            <motion.button
              key={idx}
              whileHover={{ scale: disabled ? 1 : 1.02 }}
              whileTap={{ scale: disabled ? 1 : 0.98 }}
              onClick={() => !disabled && onSelect(idx)}
              disabled={disabled}
              className={`p-4 rounded-2xl border-2 text-center font-bold text-sm transition duration-200 ${
                isSelected
                  ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200 shadow-lg shadow-cyan-500/10'
                  : 'bg-slate-800/60 border-slate-700/80 text-slate-200 hover:bg-slate-800'
              }`}
            >
              <span>{choice}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};
