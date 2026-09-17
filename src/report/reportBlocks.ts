import {
  NormalizedScores,
  AttachmentProfile,
  RelationshipArchetype,
  LovePhilosophy,
  DetectedInsight,
  Demographics,
  AssessmentResult,
  UserAnswers,
} from '../types';
import { getRadarDimensions } from '../scoring/scoreAssessment';

export function assembleAssessmentResult(
  codeId: string,
  answers: UserAnswers,
  normalizedScores: NormalizedScores,
  attachment: AttachmentProfile,
  primaryArchetype: RelationshipArchetype,
  secondaryArchetype: RelationshipArchetype,
  lovePhilosophy: LovePhilosophy,
  insights: DetectedInsight[],
  demographics?: Demographics
): AssessmentResult {
  const radarData = getRadarDimensions(normalizedScores);

  // 07 What Triggers You: pick top 3 based on scores
  const triggers: string[] = [];
  if (normalizedScores.AX > 55) {
    triggers.push('未被解释的日常互动变短、语气降温或情绪留白');
  }
  if (normalizedScores.AV > 55) {
    triggers.push('对方过密的情感追问、要求即时坦白脆弱或空间被挤压');
  }
  if (normalizedScores.IE > 55) {
    triggers.push('已经给出了含蓄暗示，但对方毫无察觉或需要自己亲口催促');
  }
  if (normalizedScores.SC > 55) {
    triggers.push('外界他人伴侣条件的鲜明对比或社交圈中的高光范本');
  }
  if (normalizedScores.CF < 45) {
    triggers.push('争执后毫无解释地搁置沉默、或假装若无其事的“翻篇”');
  }
  if (normalizedScores.ER > 60) {
    triggers.push('自己付出很多心力却没有收到对等心意的落差感');
  }
  // Guarantee exactly top 3 triggers
  if (triggers.length < 3) {
    triggers.push('关系长期缺乏清晰共同目标的模糊感');
    triggers.push('彼此对生活节奏与界限认知的显著不同步');
  }
  const topTriggers = triggers.slice(0, 3);

  // 08 Conflict Pattern
  let conflictTendency = '稳健协商型';
  let conflictTitle = '理性对话与情绪修复的平衡者';
  let conflictDesc =
    '面对分歧时，你通常能够倾听对方的核心关切，并尝试在情绪降温后探寻解决路径。你既不盲目激化矛盾，也不习惯长期冷战。';

  if (normalizedScores.CF < 45 && normalizedScores.AX > 55) {
    conflictTendency = '即时确认追求型';
    conflictTitle = '难以忍受未解决的沉默与情绪悬空';
    conflictDesc =
      '发生摩擦时，伴侣的回避或延期讨论容易让你感到坐立不安。比起争执本身，你更恐惧的是“连接中断”的状态，往往希望在当下立刻澄清彼此的想法。';
  } else if (normalizedScores.CF < 45 && normalizedScores.AV > 55) {
    conflictTendency = '防御性抽离型';
    conflictTitle = '在情绪过载时迅速降下沟通闸门';
    conflictDesc =
      '当争端带有强烈的指责或情绪高压时，你的身心会本能地感到疲惫与抗拒，倾向于先退回自己的独立空间，以独处阻断情绪的继续蔓延。';
  } else if (normalizedScores.CF >= 65) {
    conflictTendency = '高韧性调节型';
    conflictTitle = '能够容纳分歧并保有建设性视角';
    conflictDesc =
      '你懂得区分“事情上的分歧”与“情感上的否定”。即使暂时没有达成一致，也能给彼此留出缓冲余地，并在合适的时机重新开启对话。';
  }

  // 09 What You Actually Need
  const whatYouNeed: string[] = [];
  if (normalizedScores.SE < 50 || normalizedScores.AX > 55) {
    whatYouNeed.push('清晰可预期的安全感：无需反复揣摩的日常确定性与积极反馈');
  }
  if (normalizedScores.IN > 60) {
    whatYouNeed.push('深度的情感共振：能够被真正看见与接纳的灵魂陪伴');
  }
  if (normalizedScores.BO > 60 || normalizedScores.AV > 50) {
    whatYouNeed.push('不被侵犯的个人领地：即便在最亲密时也能保留自我节奏的自由');
  }
  if (normalizedScores.IE > 55) {
    whatYouNeed.push('被默契关照的温柔：在细节处能够主动被感知到的在意');
  }
  if (normalizedScores.CO > 60) {
    whatYouNeed.push('开诚布公的透明度：有事直说、不用伪装与兜圈子的清爽沟通');
  }
  if (whatYouNeed.length < 3) {
    whatYouNeed.push('共同向前的生命节律：彼此鼓励成长并共享长远蓝图的默契');
  }

  // 10 Love vs Reality
  let loveRealityTitle = '平衡现实基础与浪漫心意的协调者';
  let loveRealityDesc =
    '你理解经济观念、生活节奏与未来规划对关系的实际影响，同时也珍视彼此间真挚的喜爱。在步入深入阶段时，你倾向于将现实议题视作双方共同经营的协作课题，而非不可逾越的高墙。';

  if (normalizedScores.PR >= 65) {
    loveRealityTitle = '以现实基石守护长久温存的清醒者';
    loveRealityDesc =
      '对你而言，消费观、家庭分工与生活水准的契合度直接决定了关系的幸福底色。你不是现实功利，而是深知缺乏扎实土壤的浪漫极易枯萎；解决好现实难题，才是对感情最大的负责。';
  } else if (normalizedScores.RO >= 65) {
    loveRealityTitle = '秉持纯粹初心、愿意超越世俗阻碍的理想主义者';
    loveRealityDesc =
      '你相信深厚的情感联结具有穿透现实风浪的力量。在面对生活条件或规划差异时，你更愿意相信双方的相爱能激发创造力与妥协的意愿，不愿过早被功利的考量定义幸福。';
  }

  // 11 When Someone "Better" Appears
  let altTitle = '内心定力与当下满足感相互护航';
  let altDesc =
    '当外界出现符合理想条件的参照对象时，你通常能够觉察到这种对比的心理机制，但不会轻易将其演变为对现有关系的怀疑。你的安全感与对现有选择的认同构成了坚固的堤坝。';

  if (normalizedScores.AS > 60) {
    altTitle = '敏锐感知外界可能性，借对比审视内心真实的契合度';
    altDesc =
      '你对生命中可能出现的“另一种可能”保持着天然的敏感度。遇到优秀的人并不代表不忠，而是会触发你对“眼前生活是否真的是我最渴望的模样”的深层自省。理解这种敏锐，有助于你更清晰地确认自己到底想要什么。';
  } else if (normalizedScores.SC > 60) {
    altTitle = '容易受到外部参照系牵引，需留意外界评价对满意度的稀释';
    altDesc =
      '在周围环境展示出更高配置的伴侣样本时，你内心对“足够好”的门槛可能会悄然提升。值得常向内探寻：如果没有这些外界的映照，我原本对当下的彼此是否足够欢喜？';
  }

  // 12 Blind Spots (2 to 4)
  const blindSpots: string[] = [];
  if (normalizedScores.IE > 55) {
    blindSpots.push('将“TA主动想到”赋予过高的证明价值，有时因未被看破的沉默暗自委屈');
  }
  if (normalizedScores.AX > 60) {
    blindSpots.push('容易将伴侣正常的情绪低落或忙碌，归因为对自己的关爱降温');
  }
  if (normalizedScores.AV > 60) {
    blindSpots.push('在感到压力或脆弱时习惯先行闭关，可能在无意中给伴侣留下“被拒之门外”的受挫感');
  }
  if (normalizedScores.AS > 60) {
    blindSpots.push('在关系遭遇必经的平淡琐碎时，容易向往未曾体验过的远方滤镜');
  }
  if (blindSpots.length < 2) {
    blindSpots.push('偶尔为了维持表面的和平而推迟表达真实的分歧，积累了隐性心理负荷');
    blindSpots.push('在关系中承担过多未曾言明的期待，导致彼此步调产生微妙落差');
  }
  const selectedBlindSpots = blindSpots.slice(0, 3);

  // 13 Strengths in Love (Mandatory 3)
  const strengths = [
    primaryArchetype.strengths[0] || '真诚投入且具有深刻的情感感知力',
    primaryArchetype.strengths[1] || '重视承诺与共同建设，在亲密关系中拥有极高责任感',
    primaryArchetype.strengths[2] || '具备清晰的自省意愿，能在相互交流中持续探索成长',
  ];

  // 14 Growth Guide (3-5 concrete behavioral steps)
  const growthGuide = [
    {
      title: '从“隐形期待”走向“明晰指引”',
      action: '当需要陪伴或安慰时，尝试用一句话具体表达：“我今天有点疲惫，想听你陪我聊十分钟或者抱抱我”，而不是等待对方猜测。',
    },
    {
      title: '区分“客观事实”与“内心假设”',
      action: '察觉到对方回复变慢或语气稍有时，先在心里写下：事实是“TA回复较晚”，我的假设是“TA不在乎我了”。在得到真实证据前，不让假设主导情绪。',
    },
    {
      title: '为个人节奏留足“安全留白”',
      action: '在两人的日常生活之外，每周保留至少3-5小时完全属于自己的心流时间（阅读、爱好或与独立朋友相处），巩固自己的精神主轴。',
    },
    {
      title: '用“暂停与约定”重构冲突对话',
      action: '当觉察到对话开始情绪过载或想关闸撤离时，主动说出：“我现在情绪有点满，我想先去洗把脸/冷静30分钟，我们晚上8点再继续好吗？”以确定感化解恐慌。',
    },
  ];

  // 15 Share Card Content
  const keywords = [
    primaryArchetype.nameZh.slice(0, 4),
    attachment.titleZh.slice(0, 3),
    lovePhilosophy.nameZh.slice(0, 4),
  ];

  const insightQuote = primaryArchetype.tagline;

  return {
    codeId,
    completedAt: Date.now(),
    normalizedScores,
    attachmentProfile: attachment,
    primaryArchetype,
    secondaryArchetype,
    lovePhilosophy,
    detectedInsights: insights,
    radarData,
    demographics,
    triggers: topTriggers,
    conflictPattern: {
      title: conflictTitle,
      description: conflictDesc,
      tendency: conflictTendency,
    },
    whatYouNeed,
    loveVsReality: {
      title: loveRealityTitle,
      description: loveRealityDesc,
    },
    alternativeEvaluation: {
      title: altTitle,
      description: altDesc,
    },
    blindSpots: selectedBlindSpots,
    strengths,
    growthGuide,
    shareCard: {
      keywords,
      insightQuote,
    },
  };
}
