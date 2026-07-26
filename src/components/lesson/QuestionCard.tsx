import React, { useState } from 'react';
import { Question } from '../../types';
import { MultipleChoice } from './MultipleChoice';
import { TrueFalse } from './TrueFalse';
import { FillPrompt } from './FillPrompt';
import { SpotMistake } from './SpotMistake';
import { PromptRewrite } from './PromptRewrite';
import { OrderSteps } from './OrderSteps';
import { HelpCircle } from 'lucide-react';

interface QuestionCardProps {
  question: Question;
  selectedAnswer: any;
  onAnswerSelect: (answer: any) => void;
  isSubmitted: boolean;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  selectedAnswer,
  onAnswerSelect,
  isSubmitted,
}) => {
  const renderQuestionType = () => {
    switch (question.type) {
      case 'true-false':
        return (
          <TrueFalse
            selectedIndex={selectedAnswer}
            onSelect={onAnswerSelect}
            disabled={isSubmitted}
          />
        );
      case 'fill-prompt':
        return (
          <FillPrompt
            codeOrPrompt={question.codeOrPrompt}
            choices={question.choices || []}
            selectedIndex={selectedAnswer}
            onSelect={onAnswerSelect}
            disabled={isSubmitted}
          />
        );
      case 'spot-mistake':
        return (
          <SpotMistake
            scenario={question.scenario}
            choices={question.choices || []}
            selectedIndex={selectedAnswer}
            onSelect={onAnswerSelect}
            disabled={isSubmitted}
          />
        );
      case 'prompt-rewrite':
        return (
          <PromptRewrite
            choices={question.choices || []}
            selectedIndex={selectedAnswer}
            onSelect={onAnswerSelect}
            disabled={isSubmitted}
          />
        );
      case 'order-steps':
        return (
          <OrderSteps
            initialChoices={question.choices || []}
            onChangeOrder={onAnswerSelect}
            disabled={isSubmitted}
          />
        );
      case 'multiple-choice':
      default:
        return (
          <MultipleChoice
            choices={question.choices || []}
            selectedIndex={selectedAnswer}
            onSelect={onAnswerSelect}
            disabled={isSubmitted}
          />
        );
    }
  };

  return (
    <div className="w-full glass p-6 md:p-8 shadow-2xl text-slate-100 border border-white/15">
      {/* Question Header */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full glass text-cyan-300 border border-cyan-400/40">
          {question.type.replace('-', ' ')}
        </span>
        <span className="text-xs font-mono font-bold text-amber-300">+{question.xp} XP</span>
      </div>

      <h2 className="text-lg md:text-xl font-extrabold text-white leading-snug mb-4">
        {question.question}
      </h2>

      {/* Render specialized type component */}
      {renderQuestionType()}
    </div>
  );
};
