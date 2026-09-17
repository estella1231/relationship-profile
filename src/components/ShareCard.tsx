import React, { useState, useRef } from 'react';
import { AssessmentResult } from '../types';
import { Sparkles, Copy, Check, Share2 } from 'lucide-react';

interface ShareCardProps {
  result: AssessmentResult;
}

export const ShareCard: React.FC<ShareCardProps> = ({ result }) => {
  const [copied, setCopied] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const {
    primaryArchetype,
    attachmentProfile,
    lovePhilosophy,
    shareCard,
  } = result;

  const handleCopySummary = async () => {
    const text = `【RELATIONSHIP PROFILE · 亲密关系画像】\n核心画像：${primaryArchetype.nameZh} (${primaryArchetype.nameEn})\n依恋倾向：${attachmentProfile.titleZh}\n爱情哲学：${lovePhilosophy.nameZh}\n关键标签：#${shareCard.keywords.join(' #')}\n核心洞察：“${shareCard.insightQuote}”\n\n— 来自 62题亲密关系模式深度测试`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Shareable Card Canvas */}
      <div
        ref={cardRef}
        className="w-full max-w-[360px] bg-gradient-to-b from-[#FFFFFF] via-[#FFF9FA] to-[#FFF1F4] rounded-[24px] p-6 border-2 border-[#F2E4E8] shadow-[0_12px_36px_rgba(239,168,184,0.18)] relative overflow-hidden text-center"
      >
        {/* Subtle decorative watermark */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFF1F4] rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#F2E4E8] rounded-full blur-2xl -ml-10 -mb-10 pointer-events-none opacity-40" />

        {/* Brand header */}
        <div className="relative z-10 flex flex-col items-center mb-6">
          <div className="flex items-center gap-1.5 text-xs font-heading font-semibold tracking-[0.25em] text-[#777077] uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#EFA8B8]" />
            Relationship Profile
          </div>
          <div className="text-[11px] tracking-widest text-[#777077]/80 mt-1 font-serif-zh">
            亲密关系模式深度画像
          </div>
        </div>

        {/* Primary archetype display */}
        <div className="relative z-10 my-4">
          <div className="text-xs text-[#777077] tracking-wider mb-1 font-mono uppercase">Primary Archetype</div>
          <h2 className="text-2xl font-bold text-[#292529] font-serif-zh tracking-wide">
            {primaryArchetype.nameZh}
          </h2>
          <p className="text-xs font-heading text-[#777077] mt-0.5 tracking-wider">
            {primaryArchetype.nameEn}
          </p>
        </div>

        {/* Tags */}
        <div className="relative z-10 flex justify-center gap-2 my-4 flex-wrap">
          {shareCard.keywords.map((kw, idx) => (
            <span
              key={idx}
              className="text-xs px-2.5 py-1 rounded-full bg-[#FFFFFF] text-[#292529] font-medium border border-[#F2E4E8] shadow-sm"
            >
              #{kw}
            </span>
          ))}
        </div>

        {/* Two pillar indicators */}
        <div className="relative z-10 grid grid-cols-2 gap-2.5 my-5 text-left">
          <div className="p-3 bg-[#FFFFFF]/90 backdrop-blur-sm rounded-[16px] border border-[#F2E4E8]">
            <div className="text-[10.5px] text-[#777077] mb-0.5 font-mono">ATTACHMENT</div>
            <div className="text-xs font-semibold text-[#292529]">{attachmentProfile.titleZh}</div>
          </div>
          <div className="p-3 bg-[#FFFFFF]/90 backdrop-blur-sm rounded-[16px] border border-[#F2E4E8]">
            <div className="text-[10.5px] text-[#777077] mb-0.5 font-mono">PHILOSOPHY</div>
            <div className="text-xs font-semibold text-[#292529]">{lovePhilosophy.nameZh}</div>
          </div>
        </div>

        {/* Insight Quote */}
        <div className="relative z-10 mt-4 mb-5 px-3 py-3 rounded-[16px] bg-[#FFF1F4]/70 border border-[#F2E4E8]">
          <p className="text-xs text-[#292529] font-serif-zh italic leading-relaxed">
            “{shareCard.insightQuote}”
          </p>
        </div>

        {/* Footer notice */}
        <div className="relative z-10 pt-3 border-t border-[#F2E4E8] flex justify-between items-center text-[10px] text-[#777077]">
          <span>62题亲密关系情境深度洞察</span>
          <span className="font-mono text-[#EFA8B8]">rlprofile.app</span>
        </div>
      </div>

      {/* Share actions */}
      <div className="flex gap-3 mt-4 w-full max-w-[360px]">
        <button
          onClick={handleCopySummary}
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-full bg-[#FFFFFF] border border-[#F2E4E8] text-xs font-medium text-[#292529] hover:bg-[#FFF7F8] active:scale-[0.98] transition-all shadow-sm"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              已复制画像文本
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-[#777077]" />
              复制文字卡片
            </>
          )}
        </button>

        <button
          onClick={() => {
            if (navigator.share) {
              navigator.share({
                title: '我的亲密关系模式深度画像',
                text: `我的核心关系画像是【${primaryArchetype.nameZh}】，依恋倾向：${attachmentProfile.titleZh}。`,
              }).catch(() => {});
            } else {
              handleCopySummary();
            }
          }}
          className="flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-full bg-[#EFA8B8] text-xs font-medium text-[#FFFFFF] hover:bg-[#e595a6] active:scale-[0.98] transition-all shadow-sm"
        >
          <Share2 className="w-3.5 h-3.5 text-[#FFFFFF]" />
          截屏或分享
        </button>
      </div>
      <p className="text-[11px] text-[#777077] mt-2 text-center">
        长按上方卡片截屏，随时记录你的关系自省时刻
      </p>
    </div>
  );
};
