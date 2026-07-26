import React from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import curriculumData from '../../data/curriculum.json';
import { useProgress } from '../../context/ProgressContext';
import { NodeButton } from './NodeButton';
import { ByteMascot } from '../common/ByteMascot';
import { Unit } from '../../types';
import { Lock, CheckCircle2, Award, Sparkles, BookOpen } from 'lucide-react';

export const LearningMap: React.FC = () => {
  const { progress } = useProgress();
  const navigate = useNavigate();

  // Offset sequence for curved path: [0, 45, 75, 45, 0, -45, -75, -45]
  const offsets = [0, 50, 80, 50, 0, -50, -80, -50];

  return (
    <div className="w-full max-w-2xl mx-auto py-6 px-4 flex flex-col items-center">
      {/* Byte Mascot Encouragement Banner */}
      <div className="w-full mb-8">
        <ByteMascot
          emotion="excited"
          speechBubble={`Keep going, ${progress.completedLessons.length > 0 ? 'AI Explorer!' : 'ready to learn AI?'
            } Complete lessons to earn Passport Stamps!`}
          className="w-full justify-center"
        />
      </div>

      {/* Units Map */}
      <div className="w-full space-y-12">
        {curriculumData.units.map((unit, unitIdx) => {
          const isUnitUnlocked = progress.unlockedUnits.includes(unit.id);
          const isUnitCompleted = progress.completedUnits.includes(unit.id);

          return (
            <div key={unit.id} className="relative flex flex-col items-center">
              {/* Unit Header Card */}
              <motion.div
                whileHover={{ scale: 1.01 }}
                className={`w-full p-6 rounded-3xl border shadow-xl relative overflow-hidden mb-8 transition-all duration-300 ${
                  isUnitUnlocked
                    ? 'glass bg-gradient-to-r from-indigo-600/30 via-slate-900/60 to-purple-600/30 text-white border-white/20'
                    : 'glass bg-slate-900/40 border-white/5 text-white/40 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl glass flex items-center justify-center font-black text-2xl border border-white/20 text-indigo-300 shadow-lg">
                      {unitIdx + 1}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] uppercase font-mono tracking-widest font-extrabold px-2.5 py-0.5 rounded-full glass border border-indigo-400/30 text-indigo-300">
                          {unit.stampTitle}
                        </span>
                        {isUnitCompleted && (
                          <span className="flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-400 text-slate-950 shadow-sm">
                            <CheckCircle2 className="w-3 h-3" />
                            Completed
                          </span>
                        )}
                      </div>
                      <h2 className="text-xl font-extrabold tracking-tight text-white">{unit.title}</h2>
                      <p className="text-xs text-white/70 mt-1 max-w-md">{unit.description}</p>
                    </div>
                  </div>

                  {!isUnitUnlocked && <Lock className="w-6 h-6 text-white/40" />}
                </div>
              </motion.div>

              {/* Path of Lessons */}
              <div className="relative flex flex-col items-center w-full py-2">
                {/* Connecting SVG Path Line */}
                <div className="absolute top-0 bottom-0 w-1 bg-slate-800/80 -z-0 rounded-full" />

                {unit.lessons.map((lesson, lessonIdx) => {
                  const isCompleted = progress.completedLessons.includes(lesson.id);
                  const isUnlocked =
                    isUnitUnlocked &&
                    (lessonIdx === 0 ||
                      progress.completedLessons.includes(unit.lessons[lessonIdx - 1].id));

                  // Current node is the first unlocked but non-completed lesson
                  const isCurrent =
                    isUnlocked &&
                    !isCompleted &&
                    (lessonIdx === 0 ||
                      progress.completedLessons.includes(unit.lessons[lessonIdx - 1].id));

                  const offset = offsets[(unitIdx * 5 + lessonIdx) % offsets.length];

                  return (
                    <NodeButton
                      key={lesson.id}
                      lessonId={lesson.id}
                      title={lesson.title}
                      isCompleted={isCompleted}
                      isUnlocked={isUnlocked}
                      isCurrent={isCurrent}
                      offset={offset}
                      onClick={() => navigate(`/lesson/${unit.id}/${lesson.id}`)}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
