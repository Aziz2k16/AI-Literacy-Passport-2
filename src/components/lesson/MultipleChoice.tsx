import React from 'react';
import { motion } from 'motion/react';

interface MultipleChoiceProps {
  choices: string[];
  selectedIndex: number | null;
  onSelect: (index: number) => void;
  disabled?: boolean;
}

export const MultipleChoice: React.FC<MultipleChoiceProps> = ({
  choices,
  selectedIndex,
  onSelect,
  disabled = false,
}) => {
  return (
    <div className="grid grid-cols-1 gap-3 w-full my-4">
      {choices.map((choice, idx) => {
        const isSelected = selectedIndex === idx;

        return (
          <motion.button
            key={idx}
            whileHover={{ scale: disabled ? 1 : 1.01 }}
            whileTap={{ scale: disabled ? 1 : 0.98 }}
            onClick={() => !disabled && onSelect(idx)}
            disabled={disabled}
            className={`w-full p-4 md:p-5 rounded-2xl border text-left font-medium text-sm md:text-base transition duration-200 flex items-center justify-between ${
              isSelected
                ? 'glass bg-cyan-500/25 border-cyan-300 text-white shadow-lg shadow-cyan-500/20'
                : 'glass-button text-white/90 border-white/10'
            }`}
          >
            <div className="flex items-center gap-3">
              <span
                className={`w-8 h-8 rounded-xl flex items-center justify-center font-mono font-bold text-xs border ${
                  isSelected
                    ? 'bg-cyan-300 text-slate-950 border-white/40'
                    : 'glass text-white/60 border-white/10'
                }`}
              >
                {String.fromCharCode(65 + idx)}
              </span>
              <span>{choice}</span>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
};
