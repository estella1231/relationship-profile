import React from 'react';
import { Sparkles, Shield, Compass, Heart, ArrowRight, KeyRound } from 'lucide-react';

interface LandingPageProps {
  onStart: () => void;
  onEnterCode: () => void;
  hasExistingSession?: boolean;
  onResume?: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStart,
  onEnterCode,
  hasExistingSession,
  onResume,
}) => {
  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-[#FFFFFF] via-[#FFF7F8] to-[#FFFFFF] flex flex-col justify-between items-center px-4 py-8 md:py-16">
      {/* Top Brand Tag */}
      <header className="w-full max-w-md flex justify-between items-center px-2">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-[#FFF1F4] border border-[#F2E4E8] flex items-center justify-center">
            <Heart className="w-3.5 h-3.5 text-[#EFA8B8]" />
          </div>
          <span className="font-heading text-xs tracking-[0.2em] text-[#777077] font-semibold">
            RELATIONSHIP PROFILE
          </span>
        </div>
        <button
          onClick={onEnterCode}
          className="text-xs text-[#777077] hover:text-[#292529] px-3 py-1.5 rounded-full border border-[#F2E4E8] bg-[#FFFFFF] transition-all flex items-center gap-1 shadow-2xs"
        >
          <KeyRound className="w-3 h-3 text-[#EFA8B8]" />
          <span>输入兑换码</span>
        </button>
      </header>

      {/* Main Hero Container */}
      <main className="w-full max-w-md my-auto py-8 text-center flex flex-col items-center">
        {/* Subtle Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF1F4] border border-[#F2E4E8] text-[#292529] text-xs font-medium mb-6">
          <Sparkles className="w-3.5 h-3.5 text-[#EFA8B8]" />
          <span>深度自我探索 · 关系模式画像</span>
        </div>

        {/* English Brand Display */}
        <h2 className="font-heading text-lg md:text-xl text-[#777077] tracking-[0.28em] uppercase font-medium mb-2">
          RELATIONSHIP PROFILE
        </h2>

        {/* Chinese Main Title */}
        <h1 className="font-serif-zh text-3xl md:text-4xl font-bold text-[#292529] tracking-tight leading-tight mb-4">
          62题亲密关系模式
          <br />
          深度测试
        </h1>

        {/* Subtitle */}
        <p className="text-sm md:text-base text-[#777077] max-w-sm mx-auto leading-relaxed mb-8">
          通过62个真实关系情境，了解你在亲密关系中的依恋倾向、情感需求、沟通方式与长期关系选择。
        </p>

        {/* 3 Metric Pills */}
        <div className="grid grid-cols-3 gap-2.5 w-full max-w-xs mb-8">
          <div className="p-2.5 rounded-[16px] bg-[#FFFFFF] border border-[#F2E4E8] shadow-xs">
            <div className="text-sm font-semibold text-[#292529]">62 题</div>
            <div className="text-[11px] text-[#777077] mt-0.5">情境问答</div>
          </div>
          <div className="p-2.5 rounded-[16px] bg-[#FFFFFF] border border-[#F2E4E8] shadow-xs">
            <div className="text-sm font-semibold text-[#292529]">8–12 分钟</div>
            <div className="text-[11px] text-[#777077] mt-0.5">心流沉浸</div>
          </div>
          <div className="p-2.5 rounded-[16px] bg-[#FFFFFF] border border-[#F2E4E8] shadow-xs">
            <div className="text-sm font-semibold text-[#292529]">15 项深度</div>
            <div className="text-[11px] text-[#777077] mt-0.5">画像洞察</div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="w-full max-w-xs space-y-3">
          {hasExistingSession && onResume ? (
            <>
              <button
                onClick={onResume}
                className="w-full py-3.5 px-6 rounded-full bg-[#EFA8B8] hover:bg-[#e595a6] text-[#FFFFFF] font-medium text-sm transition-all shadow-[0_6px_20px_rgba(239,168,184,0.35)] active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <span>继续上次的进度</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onStart}
                className="w-full py-2.5 px-4 rounded-full bg-[#FFFFFF] text-[#777077] hover:text-[#292529] border border-[#F2E4E8] text-xs transition-all"
              >
                开始新测试 (使用新兑换码)
              </button>
            </>
          ) : (
            <button
              onClick={onStart}
              className="w-full py-4 px-6 rounded-full bg-[#EFA8B8] hover:bg-[#e595a6] text-[#FFFFFF] font-medium text-base tracking-wide transition-all shadow-[0_8px_24px_rgba(239,168,184,0.38)] active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <span>开始测试</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}

          <div className="text-xs text-[#777077] italic pt-1">
            “不是给爱情打分，而是理解你在关系中的选择。”
          </div>
        </div>
      </main>

      {/* Footer Disclaimer & Four Layers Preview */}
      <footer className="w-full max-w-md text-center space-y-4 pt-4 border-t border-[#F2E4E8]">
        {/* Four Layers indicator */}
        <div className="flex justify-center gap-3 text-[11px] text-[#777077]">
          <span>Layer 1 依恋倾向</span>
          <span>·</span>
          <span>Layer 2 关系功能</span>
          <span>·</span>
          <span>Layer 3 爱情哲学</span>
          <span>·</span>
          <span>Layer 4 稳定性</span>
        </div>

        {/* Mandatory disclaimer */}
        <p className="text-[11px] text-[#777077]/80 leading-relaxed max-w-xs mx-auto">
          本测试用于亲密关系模式的自我探索与娱乐/教育参考，不构成心理、医疗或其他专业诊断。
        </p>
      </footer>
    </div>
  );
};
