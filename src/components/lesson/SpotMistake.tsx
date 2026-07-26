import React from 'react';
import { motion } from 'motion/react';
import { AlertCircle } from 'lucide-react';

interface SpotMistakeProps {
  scenario?: string;
  choices: string[];
  selectedIndex: number | null;
  onSelect: (index: number) => void;
  disabled?: boolean;
}

export const SpotMistake: React.FC<SpotMistakeProps> = ({
  scenario,
  choices,
  selectedIndex,
  onSelect,
  disabled = false,
}) => {
  return (
    <div className="w-full my-4">
      {/* Scenario Box */}
      {scenario && (
        <div className="p-5 rounded-2xl bg-amber-950/30 border border-amber-500/40 text-amber-200 text-sm leading-relaxed mb-6 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold uppercase font-mono text-xs text-amber-400 block mb-1">
              Case Study / Scenario:
            </span>
            <p className="italic">{scenario}</p>
          </div>
        </div>
      )}

      {/* Choices */}
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
              className={`w-full p-4 rounded-2xl border-2 text-left font-medium text-sm transition duration-200 flex items-center justify-between ${
                isSelected
                  ? 'bg-amber-500/20 border-amber-400 text-amber-200 shadow-lg shadow-amber-500/10'
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
