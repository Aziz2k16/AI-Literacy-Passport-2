import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowUp, ArrowDown, GripVertical, CheckCircle2 } from 'lucide-react';

interface OrderStepsProps {
  initialChoices: string[];
  onChangeOrder: (orderedItems: string[]) => void;
  disabled?: boolean;
}

export const OrderSteps: React.FC<OrderStepsProps> = ({
  initialChoices,
  onChangeOrder,
  disabled = false,
}) => {
  const [items, setItems] = useState<string[]>([]);

  useEffect(() => {
    // Shuffle initial choices for the exercise
    const shuffled = [...initialChoices].sort(() => 0.5 - Math.random());
    setItems(shuffled);
    onChangeOrder(shuffled);
  }, [initialChoices]);

  const moveUp = (index: number) => {
    if (index === 0 || disabled) return;
    const next = [...items];
    const temp = next[index - 1];
    next[index - 1] = next[index];
    next[index] = temp;
    setItems(next);
    onChangeOrder(next);
  };

  const moveDown = (index: number) => {
    if (index === items.length - 1 || disabled) return;
    const next = [...items];
    const temp = next[index + 1];
    next[index + 1] = next[index];
    next[index] = temp;
    setItems(next);
    onChangeOrder(next);
  };

  return (
    <div className="w-full my-4 space-y-2.5">
      <p className="text-xs text-slate-400 mb-2">Use arrow buttons to arrange items into correct sequence:</p>
      {items.map((item, idx) => (
        <motion.div
          key={item}
          layout
          className="p-3.5 rounded-2xl bg-slate-800 border border-slate-700/80 flex items-center justify-between gap-3 text-sm font-medium text-slate-200 shadow-sm"
        >
          <div className="flex items-center gap-3">
            <span className="w-7 h-7 rounded-xl bg-cyan-500/20 text-cyan-400 font-bold font-mono text-xs flex items-center justify-center shrink-0">
              {idx + 1}
            </span>
            <span>{item}</span>
          </div>

          {!disabled && (
            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={() => moveUp(idx)}
                disabled={idx === 0}
                className="p-1.5 rounded-lg bg-slate-900 text-slate-300 hover:text-cyan-400 disabled:opacity-30 disabled:hover:text-slate-300"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
              <button
                onClick={() => moveDown(idx)}
                disabled={idx === items.length - 1}
                className="p-1.5 rounded-lg bg-slate-900 text-slate-300 hover:text-cyan-400 disabled:opacity-30 disabled:hover:text-slate-300"
              >
                <ArrowDown className="w-4 h-4" />
              </button>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
};
