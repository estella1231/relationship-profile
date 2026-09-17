import React from 'react';
import { AttachmentProfile } from '../types';

interface AttachmentMapProps {
  profile: AttachmentProfile;
}

interface CoordinateInterpretation {
  body: string[];
  quote: string;
  reflection: string;
}

const INTERPRETATIONS: Record<string, CoordinateInterpretation> = {
  FearfulAvoidant: {
    body: [
      '你在亲密关系中可能同时存在较强的连接需求与距离防御。',
      '你并不是简单地“不想靠近”。相反，你可能非常在乎关系，也容易受到关系变化的影响；但当自己越来越依赖一个人、需要暴露脆弱，或感觉失去主动权时，你又可能本能地想退回一点。',
      '因此，你有时会体验到一种看似矛盾的状态：',
    ],
    quote: '“我希望你靠近我，但当你真的太靠近时，我又需要一点距离。”',
    reflection:
      '当你想退开时，你真正需要的是空间，还是在确认“即使我退开一点，这段关系仍然安全”？',
  },
  Secure: {
    body: [
      '你在亲密关系中展现出较高的心理弹性与信任基础。',
      '你通常既能够自然地表达爱意与依恋，坦然接纳彼此的脆弱与不完美，也能在对方需要个人边界时保持内心的安定，较少陷入持续的过度猜忌或逃避退缩。',
      '因此，你在关系中常常体验到一种平和而坚定的常态：',
    ],
    quote: '“我渴望与你建立深刻的连接，同时也信任彼此拥有独立完整的自我。”',
    reflection:
      '当伴侣出现强烈的焦虑索取或回避冷淡时，留意自己是否容易将对方的情绪反应误读为对感情的否定，保持温和但坚定的沟通节奏是你的核心力量。',
  },
  Anxious: {
    body: [
      '你在亲密关系中对情感连接具有极高的敏感度与投入度。',
      '你渴望深度的情感融合与即时确认，往往能敏锐捕捉到伴侣情绪与言行中的微小波动；但当缺乏明确的情感回应时，内心容易迅速升起被忽视或失去连接的不安感。',
      '因此，你常常体验到这样一种心理对话：',
    ],
    quote: '“我很在乎我们之间的每一次靠近，未被即时回应的沉默容易让我感到孤单与焦虑。”',
    reflection:
      '当你感到强烈的不安想急切寻求确认时，尝试先停顿三秒觉察自己的呼吸——问问自己：此刻真正需要的是对方立即的解释，还是先给自己一份内在的安抚与肯定？',
  },
  Avoidant: {
    body: [
      '你在亲密关系中高度珍视自主性与个人心理空间的完整。',
      '你习惯依靠自身的力量消化压力与情绪，对情绪化的冲突或过度的情感依附保持本能的警惕；当关系进展得过于紧密或被要求暴露过多脆弱时，你会倾向于退回自己的保护壳中恢复秩序。',
      '因此，你常常体会到这样一种防御机制：',
    ],
    quote: '“我可以真诚地爱你，但我必须先确保自己拥有不被打扰的独立边界。”',
    reflection:
      '当感受到压力想要本能后撤时，尝试先向伴侣传递一句简单的安全信号（如“我现在需要一点时间整理自己，晚些时候我们再聊”），让彼此都保有安全感。',
  },
  Mixed: {
    body: [
      '你在依恋坐标中处于较为灵活的过渡缓冲地带。',
      '你的亲密模式并非固定在单一极端，而是高度情境化——在面对提供充足确定感的伴侣时，你能呈现出松弛稳定的安全特质；而在面对忽冷忽热或高压冲突的情境中，可能会交替激活焦虑索求或回避防御的应对机制。',
      '因此，你在关系中体验到的是一种探索与调节的过程：',
    ],
    quote: '“我的安全感不仅源于自身，也在随着互动对方的稳定度与反馈方式动态演变。”',
    reflection:
      '观察在不同的关系场景下，究竟是哪些具体的情境动作会把你推向“紧抓不放”，哪些又会触发你的“退避自保”？认清这些触发阀门能帮助你自如调节。',
  },
};

const clamp = (val: number, min = 0, max = 100) => Math.min(Math.max(val, min), max);

export const AttachmentMap: React.FC<AttachmentMapProps> = ({ profile }) => {
  const { axScore, avScore, titleZh, type } = profile;

  // Mathematically correct plot coordinates
  // X: Anxiety (0 on left, 100 on right)
  // Y: Avoidance (0 at bottom, 100 at top) => top = 100 - AV
  const pointX = clamp(axScore, 0, 100);
  const pointY = 100 - clamp(avScore, 0, 100);

  // Dynamic tooltip avoidance:
  // If near top (<26%), place tooltip below point. Otherwise place above.
  const isNearTop = pointY < 26;
  const tooltipVertical = isNearTop ? 'top-full mt-3' : 'bottom-full mb-3';

  // If near right (>74%), shift tooltip left. If near left (<26%), shift right. Otherwise center.
  let tooltipHorizontal = '-translate-x-1/2 left-1/2';
  if (pointX > 74) {
    tooltipHorizontal = '-translate-x-[85%] left-1/2';
  } else if (pointX < 26) {
    tooltipHorizontal = '-translate-x-[15%] left-1/2';
  }

  const interpretation = INTERPRETATIONS[type] || INTERPRETATIONS.Mixed;

  return (
    <div className="w-full bg-[#FFFFFF] rounded-[24px] p-5 sm:p-7 border border-[#F2E4E8] shadow-[0_6px_28px_rgba(239,168,184,0.08)] space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-1">
        <div>
          <span className="text-[11px] tracking-[0.2em] text-[#777077] uppercase font-mono font-semibold block">
            ATTACHMENT COORDINATES
          </span>
          <h4 className="text-xl sm:text-2xl font-bold text-[#292529] font-serif-zh mt-0.5">
            依恋倾向二维坐标图
          </h4>
        </div>
        <div className="self-start sm:self-center">
          <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-[#FFF1F4] text-[#292529] text-xs sm:text-sm font-medium border border-[#F2E4E8] shadow-2xs">
            {titleZh}
          </span>
        </div>
      </div>

      {/* Subtitle */}
      <p className="text-xs sm:text-sm text-[#777077] leading-relaxed">
        横轴反映对关系不确定性的关注度（依恋焦虑），纵轴反映对亲密距离的防御度（依恋回避）。
      </p>

      {/* Main Large Chart Container */}
      <div className="w-full max-w-[620px] mx-auto select-none pt-2">
        {/* Top Y-Axis Indicator */}
        <div className="flex items-center justify-between text-[11px] text-[#777077] mb-2 pl-9 sm:pl-11 pr-2">
          <div className="flex items-center gap-1.5 font-medium text-[#777077]">
            <span>依恋回避度（AV）</span>
            <span className="text-[#EFA8B8] font-bold text-xs">↑</span>
          </div>
          <span className="font-mono text-[10px] text-[#9A919A] tracking-wider">0 → 100</span>
        </div>

        {/* Plot Matrix + Y-Axis Ticks */}
        <div className="flex items-stretch">
          {/* Y Axis Numeric Ticks Column (0, 25, 50, 75, 100) */}
          <div className="relative w-8 sm:w-10 shrink-0 text-right pr-2 text-[10px] sm:text-[11px] font-mono text-[#9A919A]">
            <span className="absolute right-2.5 top-0 -translate-y-1/2">100</span>
            <span className="absolute right-2.5 top-1/4 -translate-y-1/2">75</span>
            <span className="absolute right-2.5 top-1/2 -translate-y-1/2 font-semibold text-[#777077]">50</span>
            <span className="absolute right-2.5 top-3/4 -translate-y-1/2">25</span>
            <span className="absolute right-2.5 top-full -translate-y-1/2">0</span>
          </div>

          {/* Inner Plot Area (Main Coordinate Stage) */}
          <div className="relative flex-1 aspect-square rounded-[22px] sm:rounded-[26px] overflow-hidden border border-[#E8DCE0] shadow-[0_4px_24px_rgba(239,168,184,0.06)] bg-[#FFFFFF]">
            {/* 1. Four Quadrants */}
            {/* TOP LEFT: 回避倾向区 (Pale neutral/lilac) */}
            <div className="absolute left-0 top-0 w-1/2 h-1/2 bg-[#F8F6FA] p-3 sm:p-4 flex flex-col justify-start items-start">
              <span className="text-xs sm:text-sm font-semibold text-[#6C636D] font-serif-zh tracking-wide">
                回避倾向区
              </span>
              <span className="text-[10px] sm:text-[11px] text-[#918792] mt-0.5 leading-tight">
                重视独立
              </span>
              <span className="text-[10px] sm:text-[11px] text-[#918792] leading-tight">
                保持距离
              </span>
            </div>

            {/* TOP RIGHT: 恐惧-回避区 (Slightly stronger pale pink) */}
            <div className="absolute left-1/2 top-0 w-1/2 h-1/2 bg-[#FFF0F3] p-3 sm:p-4 flex flex-col justify-start items-end text-right">
              <span className="text-xs sm:text-sm font-semibold text-[#85535F] font-serif-zh tracking-wide">
                恐惧-回避区
              </span>
              <span className="text-[10px] sm:text-[11px] text-[#A67581] mt-0.5 leading-tight">
                渴望亲密
              </span>
              <span className="text-[10px] sm:text-[11px] text-[#A67581] leading-tight">
                又害怕亲密
              </span>
            </div>

            {/* BOTTOM LEFT: 安全倾向区 (Extremely pale sage) */}
            <div className="absolute left-0 top-1/2 w-1/2 h-1/2 bg-[#F3F7F4] p-3 sm:p-4 flex flex-col justify-end items-start">
              <span className="text-xs sm:text-sm font-semibold text-[#546E59] font-serif-zh tracking-wide">
                安全倾向区
              </span>
              <span className="text-[10px] sm:text-[11px] text-[#7A947F] mt-0.5 leading-tight">
                相对轻松
              </span>
              <span className="text-[10px] sm:text-[11px] text-[#7A947F] leading-tight">
                信任稳定
              </span>
            </div>

            {/* BOTTOM RIGHT: 焦虑倾向区 (Extremely pale warm pink) */}
            <div className="absolute left-1/2 top-1/2 w-1/2 h-1/2 bg-[#FFF6F7] p-3 sm:p-4 flex flex-col justify-end items-end text-right">
              <span className="text-xs sm:text-sm font-semibold text-[#8B5663] font-serif-zh tracking-wide">
                焦虑倾向区
              </span>
              <span className="text-[10px] sm:text-[11px] text-[#AB7B88] mt-0.5 leading-tight">
                高度关注
              </span>
              <span className="text-[10px] sm:text-[11px] text-[#AB7B88] leading-tight">
                害怕失去
              </span>
            </div>

            {/* 2. Light Dashed Grid Lines (25, 75) */}
            <div className="absolute left-0 right-0 top-1/4 border-b border-dashed border-[#EAE0E4]/90 pointer-events-none" />
            <div className="absolute left-0 right-0 top-3/4 border-b border-dashed border-[#EAE0E4]/90 pointer-events-none" />
            <div className="absolute top-0 bottom-0 left-1/4 border-r border-dashed border-[#EAE0E4]/90 pointer-events-none" />
            <div className="absolute top-0 bottom-0 left-3/4 border-r border-dashed border-[#EAE0E4]/90 pointer-events-none" />

            {/* 3. 50/50 Visual Reference Lines */}
            <div className="absolute left-0 right-0 top-1/2 border-b-2 border-dashed border-[#D6C2C9] pointer-events-none z-10" />
            <div className="absolute top-0 bottom-0 left-1/2 border-r-2 border-dashed border-[#D6C2C9] pointer-events-none z-10" />

            {/* Center Reference Node */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#C9B3BC] z-10 pointer-events-none opacity-80" />

            {/* 4. User Result Point (Visual Priority #1) */}
            <div
              className="absolute z-30"
              style={{
                left: `${pointX}%`,
                top: `${pointY}%`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              {/* Outer soft glow ring with subtle pulse */}
              <div className="relative flex items-center justify-center">
                <span className="absolute -inset-2.5 rounded-full bg-[#EFA8B8]/30 animate-ping duration-1000" />
                <span className="absolute -inset-4 rounded-full border border-[#EFA8B8]/40 animate-pulse duration-700" />

                {/* Circular ring & white center */}
                <div className="w-6 h-6 rounded-full border-[3px] border-[#EFA8B8] bg-[#FFFFFF] shadow-[0_0_20px_rgba(239,168,184,0.85)] flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-[#EFA8B8]" />
                </div>

                {/* Floating label (Auto-positions to avoid point and bounds) */}
                <div
                  className={`absolute ${tooltipVertical} ${tooltipHorizontal} px-3 py-1 rounded-full bg-[#292529]/92 text-[#FFFFFF] font-mono text-xs font-semibold whitespace-nowrap shadow-[0_6px_18px_rgba(41,37,41,0.22)] backdrop-blur-xs flex items-center gap-1.5 border border-white/20 pointer-events-none transition-all`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#EFA8B8] shrink-0" />
                  <span>
                    AX {Math.round(axScore)} · AV {Math.round(avScore)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* X Axis Numeric Ticks (0, 25, 50, 75, 100) */}
        <div className="pl-8 sm:pl-10 mt-2">
          <div className="relative w-full h-4 text-[10px] sm:text-[11px] font-mono text-[#9A919A]">
            <span className="absolute left-0 -translate-x-1/2">0</span>
            <span className="absolute left-1/4 -translate-x-1/2">25</span>
            <span className="absolute left-1/2 -translate-x-1/2 font-semibold text-[#777077]">50</span>
            <span className="absolute left-3/4 -translate-x-1/2">75</span>
            <span className="absolute left-full -translate-x-1/2">100</span>
          </div>
        </div>

        {/* X Axis Title */}
        <div className="pl-8 sm:pl-10 mt-1 flex items-center justify-center gap-1.5 text-[11px] font-medium text-[#777077]">
          <span>依恋焦虑度（AX）</span>
          <span className="text-[#EFA8B8] font-bold text-xs">→</span>
          <span className="font-mono text-[10px] text-[#9A919A] ml-1 tracking-wider">0 → 100</span>
        </div>
      </div>

      {/* 5. Premium Interpretation Card */}
      <div className="p-5 sm:p-6 bg-gradient-to-b from-[#FFF7F8] to-[#FFFFFF] rounded-[20px] border border-[#F2E4E8] shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#EFA8B8]" />
          <h5 className="text-sm sm:text-base font-bold text-[#292529] font-serif-zh tracking-wide">
            你的坐标解读
          </h5>
        </div>

        <div className="space-y-2 text-xs sm:text-[13px] text-[#4A454A] leading-relaxed">
          {interpretation.body.map((para, idx) => (
            <p key={idx}>{para}</p>
          ))}
        </div>

        <div className="p-3.5 sm:p-4 rounded-[16px] bg-[#FFFFFF] border border-[#F2E4E8] shadow-2xs">
          <p className="text-xs sm:text-sm font-serif-zh text-[#292529] font-medium italic text-center leading-relaxed">
            {interpretation.quote}
          </p>
        </div>

        <div className="pt-2 border-t border-[#F2E4E8]/80 text-xs sm:text-[12.5px] text-[#777077] leading-relaxed">
          <span className="font-semibold text-[#292529]">值得观察：</span>
          <span>{interpretation.reflection}</span>
        </div>
      </div>
    </div>
  );
};
