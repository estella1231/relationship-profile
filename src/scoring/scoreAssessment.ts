import { DimensionKey, NormalizedScores, UserAnswers, AttachmentProfile } from '../types';
import { SCORING_MATRIX, ALL_DIMENSIONS } from './scoringMatrix';

interface DimensionRange {
  min: number;
  max: number;
}

// Pre-calculate theoretical min and max for all dimensions across 62 questions
export function calculateTheoreticalRanges(): Record<DimensionKey, DimensionRange> {
  const ranges: Record<DimensionKey, DimensionRange> = {} as Record<DimensionKey, DimensionRange>;

  for (const dim of ALL_DIMENSIONS) {
    let min = 0;
    let max = 0;

    for (let q = 1; q <= 62; q++) {
      const weights = SCORING_MATRIX[q];
      if (weights && weights[dim] !== undefined) {
        const w = weights[dim]!;
        if (w > 0) {
          min += w * 1;
          max += w * 5;
        } else if (w < 0) {
          min += w * 5;
          max += w * 1;
        }
      }
    }

    ranges[dim] = { min, max };
  }

  return ranges;
}

export const THEORETICAL_RANGES = calculateTheoreticalRanges();

/**
 * Calculates raw weighted sums and normalizes each dimension strictly to 0..100
 */
export function calculateNormalizedScores(answers: UserAnswers): NormalizedScores {
  const rawScores: Record<DimensionKey, number> = {} as Record<DimensionKey, number>;

  for (const dim of ALL_DIMENSIONS) {
    rawScores[dim] = 0;
  }

  for (let q = 1; q <= 62; q++) {
    const ans = answers[q] ?? 3; // default to 3 if unanswered
    const weights = SCORING_MATRIX[q];
    if (weights) {
      for (const dim of ALL_DIMENSIONS) {
        if (weights[dim] !== undefined) {
          rawScores[dim] += weights[dim]! * ans;
        }
      }
    }
  }

  const normalized: NormalizedScores = {} as NormalizedScores;

  for (const dim of ALL_DIMENSIONS) {
    const { min, max } = THEORETICAL_RANGES[dim];
    const span = max - min;
    let score = 50;
    if (span > 0) {
      score = ((rawScores[dim] - min) / span) * 100;
    }
    // Clamp to 0..100
    normalized[dim] = Math.max(0, Math.min(100, score));
  }

  return normalized;
}

/**
 * Attachment Profile determination using normalized AX and AV
 */
export function determineAttachmentProfile(normalizedScores: NormalizedScores): AttachmentProfile {
  const ax = normalizedScores.AX;
  const av = normalizedScores.AV;

  if (ax < 45 && av < 45) {
    return {
      type: 'Secure',
      titleZh: '安全型倾向',
      titleEn: 'Secure-leaning',
      description:
        '在亲密关系中，你通常对亲近与个人空间抱有自然的信任感。你既能够享受情感联结，也不会因短暂的距离感到过度不安。',
      axScore: ax,
      avScore: av,
      quadrantDescription: '低焦虑 × 低回避：情感充盈而富有弹性',
    };
  }

  if (ax > 60 && av < 45) {
    return {
      type: 'Anxious',
      titleZh: '焦虑型倾向',
      titleEn: 'Anxious-leaning',
      description:
        '你对关系的温度与细微变化有敏锐的雷达。你渴望被深深确认与回应，当不确定性出现时，容易迅速调动注意力寻找安全感。',
      axScore: ax,
      avScore: av,
      quadrantDescription: '高焦虑 × 低回避：敏锐感知，渴望深切确认',
    };
  }

  if (ax < 45 && av > 60) {
    return {
      type: 'Avoidant',
      titleZh: '回避型倾向',
      titleEn: 'Avoidant-leaning',
      description:
        '你极其重视个人边界与心理自主。面对情感过载或高密度的需要时，你倾向于本能地退回自己的安全岛屿，通过距离保持内在掌控感。',
      axScore: ax,
      avScore: av,
      quadrantDescription: '低焦虑 × 高回避：自我蓄能，偏好安全距离',
    };
  }

  if (ax > 60 && av > 60) {
    return {
      type: 'FearfulAvoidant',
      titleZh: '恐惧-回避型倾向',
      titleEn: 'Fearful-Avoidant-leaning',
      description:
        '你内心深处强烈渴望真挚纯粹的亲密，但在真正靠近时又会对潜在的失控、失望产生本能的警惕，呈现出“渴望靠近却又想后退”的拉扯。',
      axScore: ax,
      avScore: av,
      quadrantDescription: '高焦虑 × 高回避：深切渴望与自我防御的张力',
    };
  }

  // Nuanced mixed / moderate profile
  let nuanceDetail = '在焦虑与回避两个维度上均处于适度区间。';
  if (ax >= 45 && ax <= 60 && av < 45) {
    nuanceDetail = '既能体会到对亲近的向往与偶尔的不安，又保持着基本的情感自洽与信任。';
  } else if (av >= 45 && av <= 60 && ax < 45) {
    nuanceDetail = '对亲密持有开放态度，同时在特定情境下会温和地维护自己的独立空间。';
  } else if (ax >= 45 && ax <= 60 && av >= 45 && av <= 60) {
    nuanceDetail = '在不同阶段会根据伴侣的反馈与现实情境动态调节亲密度与个人边界，具有情境调节特质。';
  }

  return {
    type: 'Mixed',
    titleZh: '混合/情境调节倾向',
    titleEn: 'Context-Adaptive Profile',
    description: nuanceDetail,
    axScore: ax,
    avScore: av,
    quadrantDescription: '中度区间：依伴侣互动与信任基础动态调节',
  };
}

/**
 * 6-axis User-facing Radar:
 * Security = SE
 * Intimacy = IN
 * Emotional Independence = 100 - ER
 * Communication = CO
 * Conflict Regulation = CF
 * Boundaries = BO
 */
export function getRadarDimensions(normalizedScores: NormalizedScores) {
  return [
    {
      axis: '安全感容量',
      key: 'SE',
      value: Math.round(normalizedScores.SE),
      description: '对关系内在稳定性的底色信任度',
    },
    {
      axis: '亲密渴望',
      key: 'IN',
      value: Math.round(normalizedScores.IN),
      description: '对深度陪伴、相互袒露的需求强度',
    },
    {
      axis: '情感独立度',
      key: 'Independence',
      value: Math.round(100 - normalizedScores.ER),
      description: '不依赖单一来源获得自我认同与情绪支撑的能力',
    },
    {
      axis: '表达坦诚度',
      key: 'CO',
      value: Math.round(normalizedScores.CO),
      description: '直接说出真实感受与明确诉求的意愿',
    },
    {
      axis: '冲突韧性',
      key: 'CF',
      value: Math.round(normalizedScores.CF),
      description: '面对争执与不确定时承托分歧、平稳修复的弹性',
    },
    {
      axis: '边界清晰度',
      key: 'BO',
      value: Math.round(normalizedScores.BO),
      description: '在关系中保留独立生活、节奏与个人空间的主动性',
    },
  ];
}
