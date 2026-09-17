import { NormalizedScores, LovePhilosophy } from '../types';

export function determineLovePhilosophy(normalizedScores: NormalizedScores): LovePhilosophy {
  const ro = normalizedScores.RO;
  const cm = normalizedScores.CM;
  const pr = normalizedScores.PR;

  // Derive descriptive orientation
  if (cm >= 50 && ro >= pr) {
    return {
      type: 'RomanticBuilder',
      nameZh: '浪漫长期主义',
      nameEn: 'Romantic Builder',
      description:
        '你相信真正深沉的爱需要长期的悉心浇灌与共同守护，同时你保留着对浪漫、诗意与灵魂共振的美好信念。对你而言，长久的坚守从来不是因为无可奈何，而是因为心怀热爱。',
      keyMotto: '“以浪漫为引，用岁月为注，在长久的陪伴中持续选择彼此。”',
    };
  }

  if (cm >= 50 && pr > ro) {
    return {
      type: 'PragmaticBuilder',
      nameZh: '现实长期主义',
      nameEn: 'Pragmatic Builder',
      description:
        '你深知爱情无法脱离柴米油盐的现实土壤。你珍视承诺与陪伴的厚重感，但更强调消费观、住房、家庭分工与人生规划的稳健对齐。对你来说，打理好生活细节就是最深沉的情话。',
      keyMotto: '“爱是彼此托付的默契，更是携手抵御现实风浪的务实担当。”',
    };
  }

  if (cm < 50 && ro >= 50) {
    return {
      type: 'RomanticExplorer',
      nameZh: '浪漫体验型',
      nameEn: 'Romantic Explorer',
      description:
        '你重视当下心动的纯粹与浓烈。你渴望在关系中体验到深度的情感回响与精神交融，不愿过早让沉重的形式与世俗责任消磨掉初遇时的鲜活光彩。',
      keyMotto: '“珍视每一次心跳与真诚相逢，让爱意在自由与坦率中自然流动。”',
    };
  }

  // Default / Experience-oriented
  return {
    type: 'ExperienceOriented',
    nameZh: '体验导向型',
    nameEn: 'Experience-Oriented',
    description:
      '你将亲密关系看作一段充满生机的共同旅程。你更看重相处过程中的快乐、成长与彼此尊重，不愿被“必须天长地久”的执念绑架，而是忠实于两个人在当下是否互相滋养。',
    keyMotto: '“相遇是一场珍贵的风景，重要的不是走到终点，而是沿途彼此照亮。”',
  };
}
