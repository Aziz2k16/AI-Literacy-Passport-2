import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Coins, Sparkles, RefreshCw, X } from 'lucide-react';
import { useProgress } from '../../context/ProgressContext';
import { useNavigate } from 'react-router-dom';

interface HeartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HeartModal: React.FC<HeartModalProps> = ({ isOpen, onClose }) => {
  const { progress, refillHearts, addCoins } = useProgress();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const costToRefill = 20;
  const canAfford = progress.coins >= costToRefill;

  const handleRefillWithCoins = () => {
    if (canAfford) {
      addCoins(-costToRefill);
      refillHearts();
      onClose();
    }
  };

  const handlePracticeForHearts = () => {
    refillHearts();
    onClose();
    navigate('/practice');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl text-slate-100"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full bg-rose-500/20 border border-rose-500/40 flex items-center justify-center mb-4 text-rose-500 animate-pulse">
              <Heart className="w-10 h-10 fill-rose-500" />
            </div>

            <h3 className="text-2xl font-black text-slate-100">Need More Hearts?</h3>
            <p className="text-sm text-slate-400 mt-2">
              Hearts allow you to keep answering lesson questions. Refill now or earn hearts through practice.
            </p>

            <div className="w-full space-y-3 mt-6">
              {/* Option 1: Refill with coins */}
              <button
                onClick={handleRefillWithCoins}
                disabled={!canAfford}
                className={`w-full py-3.5 px-4 rounded-2xl font-bold flex items-center justify-between border transition ${
                  canAfford
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 border-emerald-400 shadow-lg shadow-emerald-500/20'
                    : 'bg-slate-800 border-slate-700 text-slate-500 cursor-not-allowed'
                }`}
              >
                <div className="flex items-center gap-2">
                  <RefreshCw className="w-5 h-5" />
                  <span>Refill Full Hearts (5)</span>
                </div>
                <div className="flex items-center gap-1 font-mono font-black text-sm">
                  <Coins className="w-4 h-4 text-amber-300" />
                  <span>{costToRefill} Coins</span>
                </div>
              </button>

              {/* Option 2: Practice mode */}
              <button
                onClick={handlePracticeForHearts}
                className="w-full py-3.5 px-4 rounded-2xl font-bold bg-slate-800 hover:bg-slate-700 text-cyan-400 border border-cyan-500/30 flex items-center justify-center gap-2 transition"
              >
                <Sparkles className="w-5 h-5" />
                <span>Practice to Earn Hearts (Free)</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
