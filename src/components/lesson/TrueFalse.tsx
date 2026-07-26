import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, XCircle } from 'lucide-react';

interface TrueFalseProps {
  selectedIndex: number | null; // 0 for True, 1 for False
  onSelect: (index: number) => void;
  disabled?: boolean;
}

export const TrueFalse: React.FC<TrueFalseProps> = ({ selectedIndex, onSelect, disabled = false }) => {
  const options = [
    { label: 'True', icon: CheckCircle2, color: 'emerald' },
    { label: 'False', icon: XCircle, color: 'rose' },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 w-full my-6">
      {options.map((opt, idx) => {
        const isSelected = selectedIndex === idx;
        const Icon = opt.icon;

        return (
          <motion.button
            key={opt.label}
            whileHover={{ scale: disabled ? 1 : 1.03 }}
            whileTap={{ scale: disabled ? 1 : 0.97 }}
            onClick={() => !disabled && onSelect(idx)}
            disabled={disabled}
            className={`p-6 rounded-3xl border-2 font-extrabold text-lg flex flex-col items-center justify-center gap-3 transition duration-200 ${
              isSelected
                ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200 shadow-xl shadow-cyan-500/20'
                : 'bg-slate-800/60 border-slate-700/80 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Icon className={`w-10 h-10 ${isSelected ? 'text-cyan-400' : 'text-slate-500'}`} />
            <span>{opt.label}</span>
          </motion.button>
        );
      })}
    </div>
  );
};
