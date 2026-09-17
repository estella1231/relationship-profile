import React, { useEffect, useState } from 'react';
import { Sparkles, Heart } from 'lucide-react';

interface LoadingAnimationProps {
  onFinish: () => void;
}

const PHASES = [
  '正在计算你的14个隐性关系指标…',
  '正在匹配依恋坐标与六维功能雷达…',
  '正在关联跨情境潜意识互动模式…',
  '正在整理你的专属关系画像…',
];

export const LoadingAnimation: React.FC<LoadingAnimationProps> = ({ onFinish }) => {
  const [phaseIndex, setPhaseIndex] = useState(0);

  useEffect(() => {
    const phaseTimer = setInterval(() => {
      setPhaseIndex((prev) => {
        if (prev < PHASES.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 700);

    const finishTimer = setTimeout(() => {
      onFinish();
    }, 3000);

    return () => {
      clearInterval(phaseTimer);
      clearTimeout(finishTimer);
    };
  }, [onFinish]);

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-[#FFFFFF] via-[#FFF7F8] to-[#FFFFFF] flex flex-col justify-center items-center px-4">
      <div className="w-full max-w-sm flex flex-col items-center text-center space-y-6">
        {/* Breathing Halo Center */}
        <div className="relative w-24 h-24 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-[#FFF1F4] animate-ping opacity-50 duration-1000" />
          <div className="absolute -inset-2 rounded-full border border-[#F2E4E8] animate-pulse duration-700" />
          <div className="w-16 h-16 rounded-full bg-[#FFFFFF] border-2 border-[#EFA8B8] flex items-center justify-center shadow-[0_4px_24px_rgba(239,168,184,0.3)]">
            <Heart className="w-7 h-7 text-[#EFA8B8] animate-bounce" />
          </div>
        </div>

        {/* Text */}
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-[#292529] font-serif-zh tracking-wide">
            正在整理你的关系画像…
          </h2>
          <p className="text-xs text-[#777077] transition-all duration-300 min-h-[1.5rem]">
            {PHASES[phaseIndex]}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-48 h-1 bg-[#F2E4E8] rounded-full overflow-hidden">
          <div className="h-full bg-[#EFA8B8] rounded-full animate-[progress_3s_ease-in-out_forwards]" />
        </div>
      </div>
    </div>
  );
};
