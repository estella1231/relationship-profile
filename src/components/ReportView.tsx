import React, { useState } from 'react';
import { AssessmentResult } from '../types';
import { AttachmentMap } from './AttachmentMap';
import { RadarChart } from './RadarChart';
import { ShareCard } from './ShareCard';
import {
  Heart,
  Shield,
  Sparkles,
  Compass,
  AlertCircle,
  RefreshCw,
  Zap,
  ArrowRight,
  Eye,
  CheckCircle2,
  TrendingUp,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface ReportViewProps {
  result: AssessmentResult;
  onRetest?: () => void;
}

export const ReportView: React.FC<ReportViewProps> = ({ result, onRetest }) => {
  const [showAllArchetypes, setShowAllArchetypes] = useState(false);

  const {
    primaryArchetype,
    secondaryArchetype,
    attachmentProfile,
    lovePhilosophy,
    detectedInsights,
    radarData,
    triggers,
    conflictPattern,
    whatYouNeed,
    loveVsReality,
    alternativeEvaluation,
    blindSpots,
    strengths,
    growthGuide,
  } = result;

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-8 space-y-8 bg-[#FFFFFF] min-h-screen">
      {/* 01 Hero Result */}
      <section className="bg-gradient-to-b from-[#FFF7F8] via-[#FFFFFF] to-[#FFF7F8] rounded-[24px] p-6 border border-[#F2E4E8] shadow-[0_6px_28px_rgba(239,168,184,0.08)] text-center relative overflow-hidden">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF1F4] text-[#EFA8B8] text-xs font-medium tracking-wide mb-3 border border-[#F2E4E8]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>01 · 你的核心关系画像</span>
        </div>

        <h1 className="text-3xl font-bold text-[#292529] font-serif-zh tracking-tight mt-1 mb-1">
          {primaryArchetype.nameZh}
        </h1>
        <p className="text-xs font-heading tracking-widest text-[#777077] uppercase mb-4">
          {primaryArchetype.nameEn}
        </p>

        {/* Tagline quote */}
        <div className="p-4 rounded-[18px] bg-[#FFFFFF] border border-[#F2E4E8] shadow-sm mb-5">
          <p className="text-sm text-[#292529] font-serif-zh leading-relaxed italic">
            “{primaryArchetype.tagline}”
          </p>
        </div>

        <p className="text-sm text-[#777077] leading-relaxed text-left">
          {primaryArchetype.summary}
        </p>

        {/* Secondary influence badge */}
        <div className="mt-5 pt-4 border-t border-[#F2E4E8] flex items-center justify-between text-left">
          <div>
            <span className="text-xs text-[#777077] block font-mono">SECONDARY INFLUENCE</span>
            <span className="text-sm font-semibold text-[#292529]">
              次要影响：{secondaryArchetype.nameZh}
            </span>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-[#FFF7F8] text-[#777077] border border-[#F2E4E8]">
            复合特质
          </span>
        </div>
      </section>

      {/* 02 Attachment Map */}
      <section className="space-y-3">
        <div className="flex items-center gap-2 px-1">
          <div className="w-6 h-6 rounded-full bg-[#FFF1F4] text-[#EFA8B8] flex items-center justify-center text-xs font-mono font-bold">
            02
          </div>
          <h3 className="text-lg font-bold text-[#292529] font-serif-zh">依恋倾向二维坐标</h3>
        </div>
        <AttachmentMap profile={attachmentProfile} />
        <div className="p-4 rounded-[18px] bg-[#FFF7F8] border border-[#F2E4E8] text-xs text-[#777077] leading-relaxed">
          <span className="font-semibold text-[#292529]">自省指引：</span>
          依恋倾向不是固化的心理标签，而是一种神经记忆。当遇到高稳定度、积极给予反馈的伴侣时，依恋坐标会自然向更为放松的安全区间移动。
        </div>
      </section>

      {/* 03 Relationship Radar */}
      <section className="space-y-3">
        <div className="flex items-center gap-2 px-1">
          <div className="w-6 h-6 rounded-full bg-[#FFF1F4] text-[#EFA8B8] flex items-center justify-center text-xs font-mono font-bold">
            03
          </div>
          <h3 className="text-lg font-bold text-[#292529] font-serif-zh">六维关系功能雷达</h3>
        </div>
        <RadarChart data={radarData} />
      </section>

      {/* 04 Love Philosophy */}
      <section className="bg-[#FFFFFF] rounded-[24px] p-6 border border-[#F2E4E8] shadow-[0_4px_20px_rgba(239,168,184,0.06)] space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[#FFF1F4] text-[#EFA8B8] flex items-center justify-center text-xs font-mono font-bold">
              04
            </div>
            <h3 className="text-lg font-bold text-[#292529] font-serif-zh">爱情哲学与长期取向</h3>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-[#FFF1F4] text-[#292529] font-medium border border-[#F2E4E8]">
            {lovePhilosophy.nameZh}
          </span>
        </div>

        <div className="p-4 rounded-[18px] bg-[#FFF7F8] border border-[#F2E4E8]">
          <div className="text-xs font-mono text-[#777077] uppercase mb-1">Philosophy Motto</div>
          <p className="text-sm font-serif-zh text-[#292529] font-medium italic">
            {lovePhilosophy.keyMotto}
          </p>
        </div>

        <p className="text-sm text-[#777077] leading-relaxed">
          {lovePhilosophy.description}
        </p>
      </section>

      {/* 05 When You Fall in Love */}
      <section className="bg-[#FFFFFF] rounded-[24px] p-6 border border-[#F2E4E8] shadow-[0_4px_20px_rgba(239,168,184,0.06)] space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-[#FFF1F4] text-[#EFA8B8] flex items-center justify-center text-xs font-mono font-bold">
            05
          </div>
          <h3 className="text-lg font-bold text-[#292529] font-serif-zh">当你真正投入一段爱时</h3>
        </div>

        <div className="space-y-3 text-sm text-[#777077] leading-relaxed">
          <p>
            在进入一段关系的初期，你的心理机制通常呈现出清晰的层次感。
            {result.normalizedScores.AX > 55
              ? ' 你会开始本能地在日常细节中寻找“我被偏爱”的微小证据，对信息的回复时差与情绪浓淡极为敏感。'
              : ' 你倾向于保持相对平和的观望与自洽，在日常互动中稳步验证彼此的契合度。'}
          </p>
          <p>
            {result.normalizedScores.AV > 55
              ? ' 随着关系逐渐走向深度，伴侣对你的情感要求或深入探究可能会本能地触发你的防线，你需要确保自己随时拥有可以退回的自由空间。'
              : ' 当确认对方的真诚后，你愿意逐渐卸下心理防备，展现出自己细腻温存的真实内心。'}
          </p>
        </div>
      </section>

      {/* 06 Your Relationship Loop */}
      <section className="bg-[#FFFFFF] rounded-[24px] p-6 border border-[#F2E4E8] shadow-[0_4px_20px_rgba(239,168,184,0.06)] space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-[#FFF1F4] text-[#EFA8B8] flex items-center justify-center text-xs font-mono font-bold">
            06
          </div>
          <h3 className="text-lg font-bold text-[#292529] font-serif-zh">你的内在互动循环</h3>
        </div>

        {/* Check if Reassurance loop exists or provide baseline relational loop */}
        {detectedInsights.find((i) => i.loopSteps) ? (
          <div className="p-4 rounded-[20px] bg-[#FFF7F8] border border-[#F2E4E8] space-y-3">
            <div className="text-xs font-semibold text-[#292529]">
              {detectedInsights.find((i) => i.loopSteps)?.title}
            </div>
            <div className="flex flex-col gap-2 relative">
              {detectedInsights
                .find((i) => i.loopSteps)
                ?.loopSteps?.map((step, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-[#FFFFFF] border border-[#EFA8B8] text-[#EFA8B8] flex items-center justify-center text-xs font-mono">
                      {idx + 1}
                    </div>
                    <div className="text-xs font-medium text-[#292529] bg-[#FFFFFF] px-3 py-1.5 rounded-full border border-[#F2E4E8] flex-1">
                      {step}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ) : (
          <div className="p-4 rounded-[18px] bg-[#FFF7F8] border border-[#F2E4E8] text-xs text-[#777077] leading-relaxed">
            <div className="font-semibold text-[#292529] mb-1">互动节奏特征：</div>
            你的情感运转呈现出较好的情境弹性：在捕捉到外界分歧或需求时，倾向于先自我评估与观察，随后依据伴侣的态度选择适度的确认或表达。
          </div>
        )}

        {/* Other detected insights */}
        {detectedInsights.filter((i) => !i.loopSteps).length > 0 && (
          <div className="space-y-3 pt-2">
            <div className="text-xs text-[#777077] font-mono uppercase">DETECTED PATTERNS / 交叉情境特征</div>
            {detectedInsights
              .filter((i) => !i.loopSteps)
              .slice(0, 3)
              .map((ins) => (
                <div key={ins.id} className="p-3.5 rounded-[16px] bg-[#FFF1F4]/40 border border-[#F2E4E8]">
                  <div className="text-xs font-semibold text-[#292529] mb-1 flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-[#EFA8B8]" />
                    {ins.title}
                  </div>
                  <p className="text-xs text-[#777077] leading-relaxed">{ins.body}</p>
                  {ins.reflectionQuestion && (
                    <div className="mt-2 text-[11px] text-[#EFA8B8] font-medium italic">
                      💡 {ins.reflectionQuestion}
                    </div>
                  )}
                </div>
              ))}
          </div>
        )}
      </section>

      {/* 07 What Triggers You */}
      <section className="bg-[#FFFFFF] rounded-[24px] p-6 border border-[#F2E4E8] shadow-[0_4px_20px_rgba(239,168,184,0.06)] space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-[#FFF1F4] text-[#EFA8B8] flex items-center justify-center text-xs font-mono font-bold">
            07
          </div>
          <h3 className="text-lg font-bold text-[#292529] font-serif-zh">最易触动你的关系敏感点</h3>
        </div>

        <p className="text-xs text-[#777077]">
          在亲密互动中，以下情境最容易在无意中消耗你的情绪能量或唤醒内在警报：
        </p>

        <div className="space-y-2.5">
          {triggers.map((trig, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 p-3.5 rounded-[16px] bg-[#FFF7F8] border border-[#F2E4E8]"
            >
              <div className="w-5 h-5 rounded-full bg-[#FFF1F4] text-[#EFA8B8] flex items-center justify-center text-xs font-bold mt-0.5 shrink-0">
                {idx + 1}
              </div>
              <div className="text-xs text-[#292529] leading-relaxed font-medium">{trig}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 08 Conflict Pattern */}
      <section className="bg-[#FFFFFF] rounded-[24px] p-6 border border-[#F2E4E8] shadow-[0_4px_20px_rgba(239,168,184,0.06)] space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[#FFF1F4] text-[#EFA8B8] flex items-center justify-center text-xs font-mono font-bold">
              08
            </div>
            <h3 className="text-lg font-bold text-[#292529] font-serif-zh">冲突应对模式</h3>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-[#FFF1F4] text-[#292529] font-medium border border-[#F2E4E8]">
            {conflictPattern.tendency}
          </span>
        </div>

        <div className="p-4 rounded-[18px] bg-[#FFF7F8] border border-[#F2E4E8]">
          <h4 className="text-sm font-semibold text-[#292529] mb-1.5">{conflictPattern.title}</h4>
          <p className="text-xs text-[#777077] leading-relaxed">{conflictPattern.description}</p>
        </div>
      </section>

      {/* 09 What You Actually Need */}
      <section className="bg-[#FFFFFF] rounded-[24px] p-6 border border-[#F2E4E8] shadow-[0_4px_20px_rgba(239,168,184,0.06)] space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-[#FFF1F4] text-[#EFA8B8] flex items-center justify-center text-xs font-mono font-bold">
            09
          </div>
          <h3 className="text-lg font-bold text-[#292529] font-serif-zh">你真正在意的核心需求</h3>
        </div>

        <div className="space-y-2">
          {whatYouNeed.map((need, idx) => (
            <div key={idx} className="flex items-start gap-2.5 p-3 rounded-[14px] bg-[#FFF7F8] border border-[#F2E4E8]">
              <CheckCircle2 className="w-4 h-4 text-[#EFA8B8] shrink-0 mt-0.5" />
              <span className="text-xs text-[#292529] leading-relaxed">{need}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 10 Love vs Reality */}
      <section className="bg-[#FFFFFF] rounded-[24px] p-6 border border-[#F2E4E8] shadow-[0_4px_20px_rgba(239,168,184,0.06)] space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-[#FFF1F4] text-[#EFA8B8] flex items-center justify-center text-xs font-mono font-bold">
            10
          </div>
          <h3 className="text-lg font-bold text-[#292529] font-serif-zh">爱情与现实的衡量坐标</h3>
        </div>

        <div className="p-4 rounded-[18px] bg-[#FFF7F8] border border-[#F2E4E8]">
          <h4 className="text-sm font-semibold text-[#292529] mb-1.5">{loveVsReality.title}</h4>
          <p className="text-xs text-[#777077] leading-relaxed">{loveVsReality.description}</p>
        </div>
      </section>

      {/* 11 When Someone “Better” Appears */}
      <section className="bg-[#FFFFFF] rounded-[24px] p-6 border border-[#F2E4E8] shadow-[0_4px_20px_rgba(239,168,184,0.06)] space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-[#FFF1F4] text-[#EFA8B8] flex items-center justify-center text-xs font-mono font-bold">
            11
          </div>
          <h3 className="text-lg font-bold text-[#292529] font-serif-zh">当更符合理想的参照物出现时</h3>
        </div>

        <div className="p-4 rounded-[18px] bg-[#FFF7F8] border border-[#F2E4E8]">
          <h4 className="text-sm font-semibold text-[#292529] mb-1.5">{alternativeEvaluation.title}</h4>
          <p className="text-xs text-[#777077] leading-relaxed">{alternativeEvaluation.description}</p>
        </div>
      </section>

      {/* 12 Relationship Blind Spots */}
      <section className="bg-[#FFFFFF] rounded-[24px] p-6 border border-[#F2E4E8] shadow-[0_4px_20px_rgba(239,168,184,0.06)] space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-[#FFF1F4] text-[#EFA8B8] flex items-center justify-center text-xs font-mono font-bold">
            12
          </div>
          <h3 className="text-lg font-bold text-[#292529] font-serif-zh">值得觉察的关系盲点</h3>
        </div>

        <div className="space-y-2.5">
          {blindSpots.map((spot, idx) => (
            <div key={idx} className="flex items-start gap-3 p-3.5 rounded-[16px] bg-[#FFF7F8] border border-[#F2E4E8]">
              <AlertCircle className="w-4 h-4 text-[#EFA8B8] shrink-0 mt-0.5" />
              <p className="text-xs text-[#292529] leading-relaxed">{spot}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 13 Strengths in Love (Mandatory) */}
      <section className="bg-gradient-to-b from-[#FFF1F4]/40 to-[#FFFFFF] rounded-[24px] p-6 border border-[#F2E4E8] shadow-[0_4px_20px_rgba(239,168,184,0.08)] space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-[#EFA8B8] text-[#FFFFFF] flex items-center justify-center text-xs font-mono font-bold">
            13
          </div>
          <h3 className="text-lg font-bold text-[#292529] font-serif-zh">你在爱中最可贵的优势</h3>
        </div>

        <div className="space-y-3">
          {strengths.map((str, idx) => (
            <div key={idx} className="p-3.5 rounded-[16px] bg-[#FFFFFF] border border-[#F2E4E8] shadow-xs flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-[#FFF1F4] text-[#EFA8B8] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                ★
              </div>
              <p className="text-xs text-[#292529] font-medium leading-relaxed">{str}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 14 Growth Guide */}
      <section className="bg-[#FFFFFF] rounded-[24px] p-6 border border-[#F2E4E8] shadow-[0_4px_20px_rgba(239,168,184,0.06)] space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-[#FFF1F4] text-[#EFA8B8] flex items-center justify-center text-xs font-mono font-bold">
            14
          </div>
          <h3 className="text-lg font-bold text-[#292529] font-serif-zh">具象化行动锦囊</h3>
        </div>

        <div className="space-y-3">
          {growthGuide.map((step, idx) => (
            <div key={idx} className="p-4 rounded-[18px] bg-[#FFF7F8] border border-[#F2E4E8]">
              <div className="text-xs font-semibold text-[#292529] mb-1.5 flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-[#EFA8B8]" />
                {step.title}
              </div>
              <p className="text-xs text-[#777077] leading-relaxed">{step.action}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 15 Share Card */}
      <section className="space-y-3">
        <div className="flex items-center gap-2 px-1">
          <div className="w-6 h-6 rounded-full bg-[#FFF1F4] text-[#EFA8B8] flex items-center justify-center text-xs font-mono font-bold">
            15
          </div>
          <h3 className="text-lg font-bold text-[#292529] font-serif-zh">专属自省卡片</h3>
        </div>
        <ShareCard result={result} />
      </section>

      {/* Footer Disclaimer */}
      <div className="pt-6 pb-12 border-t border-[#F2E4E8] text-center space-y-3">
        <p className="text-[11px] text-[#777077] max-w-md mx-auto leading-relaxed">
          本测试用于亲密关系模式的自我探索与娱乐/教育参考，不构成心理、医疗或其他专业诊断。
          每一种倾向都是你在成长过程中形成的宝贵适应策略，理解它们，是为了更从容地去爱。
        </p>
        {onRetest && (
          <button
            onClick={onRetest}
            className="text-xs text-[#EFA8B8] hover:text-[#e595a6] underline inline-flex items-center gap-1 transition-colors"
          >
            <RefreshCw className="w-3 h-3" />
            返回首页或重新测试
          </button>
        )}
      </div>
    </div>
  );
};
