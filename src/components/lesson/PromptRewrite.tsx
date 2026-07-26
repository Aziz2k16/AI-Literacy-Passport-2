import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, MessageSquareCode } from 'lucide-react';

interface PromptRewriteProps {
  choices: string[];
  selectedIndex: number | null;
  onSelect: (index: number) => void;
  disabled?: boolean;
}

export const PromptRewrite: React.FC<PromptRewriteProps> = ({
  choices,
  selectedIndex,
  onSelect,
  disabled = false,
}) => {
  return (
    <div className="w-full my-4">
      <div className="text-xs font-mono font-bold uppercase text-indigo-400 mb-3 flex items-center gap-1.5">
        <MessageSquareCode className="w-4 h-4" />
        <span>Select the strongest prompt formulation:</span>
      </div>

      <div className="space-y-3">
        {choices.map((choice, idx) => {
          const isSelected = selectedIndex === idx;

          return (
            <motion.button
              key={idx}
              whileHover={{ scale: disabled ? 1 : 1.01 }}
              whileTap={{ scale: disabled ? 1 : 0.98 }}
              onClick={() => !disabled && onSelect(idx)}
              disabled={disabled}
              className={`w-full p-4 rounded-2xl border-2 text-left font-mono text-xs md:text-sm transition duration-200 ${
                isSelected
                  ? 'bg-indigo-500/20 border-indigo-400 text-indigo-200 shadow-lg shadow-indigo-500/20'
                  : 'bg-slate-800/60 border-slate-700/80 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <div className="flex items-start gap-3">
                <span
                  className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                    isSelected ? 'bg-indigo-400 text-slate-950' : 'bg-slate-900 text-slate-500'
                  }`}
                >
                  {idx + 1}
                </span>
                <p className="leading-relaxed whitespace-pre-wrap">{choice}</p>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};
