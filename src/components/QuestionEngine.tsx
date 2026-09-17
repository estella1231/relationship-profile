import React, { useState, useEffect, useRef } from 'react';
import { QUESTIONS } from '../data/questions';
import { UserAnswers, AnswerValue } from '../types';
import { ArrowLeft, Save, Check } from 'lucide-react';

interface QuestionEngineProps {
  initialAnswers: UserAnswers;
  initialQuestionIndex?: number;
  onSaveProgress: (answers: UserAnswers, currentQuestion: number) => void;
  onComplete: (answers: UserAnswers) => void;
  onBackToHome: () => void;
}

export const QuestionEngine: React.FC<QuestionEngineProps> = ({
  initialAnswers,
  initialQuestionIndex = 1,
  onSaveProgress,
  onComplete,
  onBackToHome,
}) => {
  const [answers, setAnswers] = useState<UserAnswers>(initialAnswers);
  const [currentIndex, setCurrentIndex] = useState<number>(
    Math.min(Math.max(initialQuestionIndex, 1), 62)
  );
  const [savedTick, setSavedTick] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const transitionTimerRef = useRef<NodeJS.Timeout | null>(null);

  const total = QUESTIONS.length; // 62
  const currentQ = QUESTIONS[currentIndex - 1];
  const currentAnswer = answers[currentQ?.id];

  useEffect(() => {
    return () => {
      if (transitionTimerRef.current) {
        clearTimeout(transitionTimerRef.current);
      }
    };
  }, []);

  const handleSelect = (val: AnswerValue) => {
    if (isTransitioning) return;

    const updated = { ...answers, [currentQ.id]: val };
    setAnswers(updated);
    setSavedTick(true);
    setTimeout(() => setSavedTick(false), 1200);

    setIsTransitioning(true);

    // Smoothly advance after ~250ms
    transitionTimerRef.current = setTimeout(() => {
      onSaveProgress(updated, currentIndex);
      if (currentIndex < total) {
        setCurrentIndex((prev) => prev + 1);
        setIsTransitioning(false);
      } else {
        setIsTransitioning(false);
        onComplete(updated);
      }
    }, 250);
  };

  const handlePrev = () => {
    if (currentIndex > 1) {
      if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current);
      setIsTransitioning(false);
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const progressPercent = Math.round(((currentIndex - 1) / total) * 100);

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-[#FFFFFF] via-[#FFF7F8] to-[#FFFFFF] flex flex-col justify-between items-center px-4 py-6 md:py-10">
      {/* Top Navigation & Progress */}
      <header className="w-full max-w-md flex flex-col gap-3">
        <div className="flex justify-between items-center text-xs text-[#777077]">
          <button
            onClick={currentIndex === 1 ? onBackToHome : handlePrev}
            className="flex items-center gap-1 py-1.5 px-3 rounded-full hover:bg-[#FFF1F4] hover:text-[#292529] transition-all"
            aria-label="返回上一题或首页"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{currentIndex === 1 ? '退出测试' : '上一题'}</span>
          </button>

          <div className="flex items-center gap-2">
            {savedTick && (
              <span className="inline-flex items-center gap-1 text-[11px] text-[#EFA8B8] animate-in fade-in duration-200">
                <Check className="w-3 h-3" />
                已自动保存
              </span>
            )}
            <span className="font-mono font-medium text-[#292529]">
              Question {currentIndex} / {total}
            </span>
          </div>
        </div>

        {/* Custom Progress Bar */}
        <div className="w-full h-1.5 bg-[#F2E4E8] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#EFA8B8] to-[#e595a6] rounded-full transition-all duration-300 ease-out"
            style={{ width: `${Math.max(progressPercent, 2)}%` }}
          />
        </div>
      </header>

      {/* Center Question Screen */}
      <main className="w-full max-w-md my-auto py-8 flex flex-col justify-center">
        {/* Mindset prompt before question 1 */}
        {currentIndex === 1 && (
          <div className="mb-6 p-4 rounded-[18px] bg-[#FFF1F4] border border-[#F2E4E8] text-center animate-in fade-in duration-300">
            <p className="text-xs text-[#292529] font-serif-zh leading-relaxed">
              “请选择最接近你真实反应的答案，
              <br />
              而不是你认为更正确的答案。”
            </p>
          </div>
        )}

        {/* Question Text Container */}
        <div
          key={currentQ.id}
          className="bg-[#FFFFFF] rounded-[24px] p-6 md:p-8 border border-[#F2E4E8] shadow-[0_8px_30px_rgba(239,168,184,0.08)] transition-all duration-200"
        >
          <div className="text-xs font-mono text-[#EFA8B8] uppercase tracking-widest mb-2 font-semibold">
            SCENARIO {currentIndex}
          </div>
          <h2 className="text-base md:text-lg text-[#292529] font-medium leading-relaxed tracking-wide font-serif-zh">
            {currentQ.text}
          </h2>
        </div>
      </main>

      {/* Bottom Response Circles Container */}
      <footer className="w-full max-w-md pb-4">
        <div className="bg-[#FFFFFF] rounded-[24px] p-5 border border-[#F2E4E8] shadow-[0_6px_24px_rgba(239,168,184,0.06)]">
          {/* Label Endpoints */}
          <div className="flex justify-between items-center text-xs font-medium text-[#777077] px-2 mb-3">
            <span>非常不符合</span>
            <span>非常符合</span>
          </div>

          {/* 5 Response Circles */}
          <div
            className="flex justify-between items-center gap-1 sm:gap-2 px-1"
            role="radiogroup"
            aria-label="选择符合程度，从非常不符合到非常符合"
          >
            {([1, 2, 3, 4, 5] as AnswerValue[]).map((val) => {
              const isSelected = currentAnswer === val;
              // Subtle scale differentiation for visual hierarchy
              const sizeClasses =
                val === 1 || val === 5
                  ? 'w-12 h-12'
                  : val === 2 || val === 4
                  ? 'w-11 h-11'
                  : 'w-10 h-10';

              return (
                <button
                  key={val}
                  type="button"
                  onClick={() => handleSelect(val)}
                  role="radio"
                  aria-checked={isSelected}
                  aria-label={
                    val === 1
                      ? '非常不符合'
                      : val === 2
                      ? '比较不符合'
                      : val === 3
                      ? '一般或不确定'
                      : val === 4
                      ? '比较符合'
                      : '非常符合'
                  }
                  className={`min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full transition-all duration-200 cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EFA8B8] active:scale-95 ${sizeClasses} ${
                    isSelected
                      ? 'bg-[#EFA8B8] text-[#FFFFFF] shadow-[0_4px_14px_rgba(239,168,184,0.45)] ring-4 ring-[#FFF1F4]'
                      : 'bg-[#FFF7F8] border border-[#F2E4E8] hover:bg-[#FFF1F4] hover:border-[#EFA8B8]'
                  }`}
                >
                  <div
                    className={`rounded-full transition-all duration-200 ${
                      isSelected
                        ? 'w-3 h-3 bg-[#FFFFFF]'
                        : 'w-2.5 h-2.5 bg-[#777077]/40'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          <div className="flex justify-between items-center text-[10.5px] text-[#777077]/80 px-2 mt-2 font-mono">
            <span>DISAGREE</span>
            <span>AGREE</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
