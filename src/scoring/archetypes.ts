import { NormalizedScores, RelationshipArchetype, DimensionKey } from '../types';

export const RELATIONSHIP_ARCHETYPES: RelationshipArchetype[] = [
  {
    id: 'high-sensitivity-connector',
    nameZh: '高敏感确认型',
    nameEn: 'High-Sensitivity Connector',
    tagline: '用细微的感知捕捉爱意，用深切的回应筑造安心',
    summary:
      '你对亲密关系的温度变化有着极具天赋的感知力。在相处中，你极度珍视对方的情感投入与积极回馈；一句温暖的确认能让你瞬间舒展，而隐蔽的冷淡则会唤醒你对关系的保护本能。',
    prototype: {
      AX: 82,
      IN: 78,
      ER: 75,
      SE: 32,
      AV: 30,
      CO: 45,
      IE: 70,
    },
    strengths: [
      '对伴侣的情绪起伏具备极高敏锐度，能够第一时间提供体贴的共情与陪伴',
      '在关系中投入真挚而热烈，全心全意为彼此的联结倾注心力',
      '对浪漫与情感共鸣有着深刻的理解，懂得营造真挚动人的亲密时刻',
    ],
    vulnerabilities: [
      '对微小的延迟回复或情绪波动容易过度解读，产生未经验证的内耗',
      '有时期待伴侣具备“不言自明”的默契，而忽略了直接表达的力量',
    ],
  },
  {
    id: 'deep-commitment-partner',
    nameZh: '深度投入型',
    nameEn: 'Deep Commitment Partner',
    tagline: '选定便全力托付，在共同建设中体会爱的深邃',
    summary:
      '你倾向于把长久关系视作一段需要悉心经营的共同创作。一旦认定了彼此，你便拥有极强的心力去克服现实磨合，不轻易被外界的新鲜感或对比扰动心神。',
    prototype: {
      IN: 80,
      CM: 85,
      AS: 20,
      SE: 70,
      ER: 50,
      RO: 60,
      CF: 65,
    },
    strengths: [
      '对感情具有极高的忠诚度与持续建设力，是极其令人安心的可靠伴侣',
      '面对外界其他可能性时心境坚定，不轻易被短暂诱惑动摇选择',
      '重视深度联结，愿意主动参与伴侣的生活与未来规划',
    ],
    vulnerabilities: [
      '在投入过深时，有时会难以迅速察觉两人生长步调的微小偏航',
      '对“放弃”抱有天然的心理抗拒，需要学会适度平衡沉没成本与真实感受',
    ],
  },
  {
    id: 'independent-secure-partner',
    nameZh: '独立稳定型',
    nameEn: 'Independent Secure Partner',
    tagline: '自足而舒展，在互相信任中享受两份自由的交叠',
    summary:
      '你拥有坚实的内心基底与清爽的个人边界。你把爱看作两个完整自我的相遇，既能享受深度的依偎与默契，也能坦然接受彼此各自拥有一方静谧天地。',
    prototype: {
      SE: 85,
      BO: 85,
      AX: 22,
      AV: 25,
      ER: 25,
      CO: 78,
      CF: 75,
    },
    strengths: [
      '情绪稳定性强，很少因关系的暂时留白或忙碌产生无端猜疑',
      '边界清晰自恰，既尊重伴侣的个人空间，也保持着自立的生活节奏',
      '沟通直率诚恳，能够平静、理性地面对分歧与协商',
    ],
    vulnerabilities: [
      '对于情绪起伏剧烈、渴望高频确认的伴侣，有时可能显得略微“冷静”',
      '需要留意避免让理性的自持在无意中被误解为距离感',
    ],
  },
  {
    id: 'pragmatic-builder',
    nameZh: '理性长期主义型',
    nameEn: 'Pragmatic Builder',
    tagline: '以现实为土壤，用真诚的步调稳步修筑共同未来',
    summary:
      '你不轻信虚浮的海誓山盟，而是相信一段能够经受住岁月考验的关系，必须扎根于消费观念、生活节奏与未来目标的深度契合。对你而言，把现实打理好才是最踏实的浪漫。',
    prototype: {
      CM: 85,
      PR: 88,
      SE: 72,
      RO: 35,
      BO: 65,
      CO: 68,
      AS: 35,
    },
    strengths: [
      '规划能力极强，善于把虚无缥缈的未来具象化为可行的时间表与解决方案',
      '面对生活风浪拥有强大的抗风险意识与担当精神',
      '在消费、家庭责任与职业发展上能够给予伴侣清晰可预期的支撑',
    ],
    vulnerabilities: [
      '有时可能将感情沟通简化为“问题解决”，缺少了停留在情绪本身的时间',
      '对于伴侣偶尔的浪漫随性或非理性需求，可能会本能地感到不理解',
    ],
  },
  {
    id: 'romantic-connector',
    nameZh: '浪漫共生型',
    nameEn: 'Romantic Connector',
    tagline: '相信爱的奇迹，在心意相通的默契中全然绽放',
    summary:
      '你对爱情持有纯粹而美好的向往。你渴望灵魂层面的深刻共振与细腻的体贴，愿意相信真挚的爱能够超越许多世俗障碍，让两个人合二为一。',
    prototype: {
      RO: 88,
      IN: 85,
      CM: 75,
      ER: 72,
      SE: 52,
      IE: 65,
      BO: 38,
    },
    strengths: [
      '情感充沛真挚，能赋予日常琐碎以诗意与浓烈的幸福体验',
      '极富爱人与奉献的天赋，愿意为心爱的人倾尽温柔与关怀',
      '高度重视彼此的默契与情感仪式感，让伴侣时刻感受到被珍惜',
    ],
    vulnerabilities: [
      '当现实摩擦不可避免地冲淡初期激情时，可能产生较强烈的理想幻灭感',
      '容易对伴侣投射完美滤镜，需要学会接纳平淡生活中的真实与瑕疵',
    ],
  },
  {
    id: 'cautious-connector',
    nameZh: '谨慎靠近型',
    nameEn: 'Cautious Connector',
    tagline: '内心渴望真诚的拥抱，步履却习惯在安全界限外徘徊',
    summary:
      '你并非不需要亲密，只是你的内心深处有一把无形的保护锁。在确信对方完全安全、可信且不会苛责你的脆弱之前，你习惯用一层客气或冷静的防护罩保护自己。',
    prototype: {
      IN: 68,
      AV: 78,
      SE: 45,
      AX: 40,
      CO: 38,
      BO: 70,
      ER: 35,
    },
    strengths: [
      '自我反思深刻，面对关系极少盲目冲动或轻易越界',
      '在经历考验后建立起的信任极其厚重且专一',
      '懂得在喧闹中保留内心的澄澈与克制，不把脆弱随意摊开于人前',
    ],
    vulnerabilities: [
      '在表达脆弱或请求帮助时有较强的心理阻抗，容易把情绪独自压抑消化',
      '有时会让想要进一步靠近你的伴侣感到无从着力，产生被推开的挫败',
    ],
  },
  {
    id: 'distance-protector',
    nameZh: '距离保护型',
    nameEn: 'Distance Protector',
    tagline: '守住独立的一方净土，以退为进地维持自洽与自尊',
    summary:
      '对你而言，个人的精神城堡是绝不容许失守的底线。当关系里的期待过密、要求过高或情绪压力逼近时，你会迅速退入自己的庇护所，以独立来换取内心的安宁。',
    prototype: {
      AV: 85,
      BO: 88,
      ER: 18,
      IN: 35,
      SE: 48,
      CF: 35,
      CO: 35,
    },
    strengths: [
      '具备极其出色的自我照料与自我修复能力，绝不把自身快乐依附于他人',
      '极少对伴侣进行无理的情绪索取或控制，给予彼此广阔的自由尺度',
      '在复杂关系与混乱环境中能迅速抽离冷静，保持清醒的判断力',
    ],
    vulnerabilities: [
      '在矛盾激化时容易启动“情感断联”模式，阻断了深入对话的可能',
      '容易误将伴侣正常的亲密诉求视为侵入，需要慢慢建立情感承载力',
    ],
  },
  {
    id: 'relationship-observer',
    nameZh: '关系观察型',
    nameEn: 'Relationship Observer',
    tagline: '敏锐审视彼此的位置，在对比与细节中推敲未来的方向',
    summary:
      '你在关系中像一位清醒的观察家。你会不自觉地比对彼此的互动质量、外界的参照系以及关系前后的微调，借此推导你们目前所处的状态是否依然稳固且理想。',
    prototype: {
      AX: 75,
      SC: 85,
      AS: 65,
      IN: 60,
      SE: 38,
      IE: 60,
      CO: 48,
    },
    strengths: [
      '对外界动态与人际关系的参照有着清醒认知，善于汲取优质经验',
      '观察入微，能迅速辨别出关系中潜在的隐患并提前有所预警',
      '追求更高质量的生活与伴侣成长，不甘于在平庸中随波逐流',
    ],
    vulnerabilities: [
      '容易因外界他人的幸福模板或闪光点，而反向放大人自身关系的缺憾',
      '过度的细节推敲容易演变为精神内耗，忽略了当下体验的真实滋味',
    ],
  },
  {
    id: 'experience-chooser',
    nameZh: '体验选择型',
    nameEn: 'Experience Chooser',
    tagline: '忠于当下的生命质感，在双向选择中探寻最真实的契合',
    summary:
      '你高度重视在关系中所获得的鲜活体验与精神共振。你抗拒为了坚持而坚持的沉重枷锁，更愿意追寻两个心灵在当下是否真正快乐、能否碰撞出高质量的火花。',
    prototype: {
      AS: 82,
      CM: 35,
      RO: 72,
      SE: 50,
      BO: 65,
      IN: 62,
      PR: 45,
    },
    strengths: [
      '极具生活感知力与感染力，能为亲密关系注入源源不断的新奇与趣味',
      '不轻易陷入沉没成本的泥潭，对自我真实的心境与需求足够坦率',
      '勇于探索更广阔的生活样态，不拘泥于陈旧僵化的伴侣互动模式',
    ],
    vulnerabilities: [
      '面对长期关系必经的平淡期与磨合琐碎时，容易迅速萌生质疑与撤退念头',
      '伴侣有时会因为感知到你随时保留的“选择权”而缺少长期的确定感',
    ],
  },
  {
    id: 'push-pull-connector',
    nameZh: '矛盾靠近型',
    nameEn: 'Push-Pull Connector',
    tagline: '在渴望靠近与害怕受控之间起伏，用热烈与戒备编织心结',
    summary:
      '你的内心同时存在着对极致亲密的狂热渴求与对情感失控的本能恐惧。远了会因为孤独而想要抓紧，近了又会因为窒息而本能撤离，常常经历爱意与防备的双重拉扯。',
    prototype: {
      AX: 80,
      AV: 78,
      IN: 75,
      SE: 25,
      CF: 30,
      IE: 68,
      CO: 38,
    },
    strengths: [
      '情感层次极其丰富且深邃，对人性的脆弱与复杂有着超乎寻常的理解',
      '一旦真正感受到不离不弃的坚定接纳，能爆发出极具感染力的深情',
      '对真实的亲密怀有永不熄灭的执着与向往，不断在探索中淬炼自省',
    ],
    vulnerabilities: [
      '容易在“追寻证明”与“抽身防御”两个极端之间反复横跳，消耗彼此心力',
      '需要意识到：真正的安全感不来自对方的极致妥协，而来自自身的逐步释然',
    ],
  },
];

/**
 * Calculates Euclidean distance between user's normalized scores and archetype prototypes.
 * Returns Primary and Secondary archetypes.
 */
export function determineArchetypes(normalizedScores: NormalizedScores): {
  primary: RelationshipArchetype;
  secondary: RelationshipArchetype;
  ranked: { archetype: RelationshipArchetype; distance: number }[];
} {
  const ranked = RELATIONSHIP_ARCHETYPES.map((arch) => {
    let sumSquaredDiff = 0;
    let count = 0;

    for (const [key, protoVal] of Object.entries(arch.prototype)) {
      const dim = key as DimensionKey;
      if (normalizedScores[dim] !== undefined && protoVal !== undefined) {
        const diff = (normalizedScores[dim] - protoVal) / 100; // normalize difference to 0..1 scale
        sumSquaredDiff += diff * diff;
        count++;
      }
    }

    const distance = count > 0 ? Math.sqrt(sumSquaredDiff / count) : 999;
    return { archetype: arch, distance };
  });

  // Sort ascending by distance (closest first)
  ranked.sort((a, b) => a.distance - b.distance);

  return {
    primary: ranked[0].archetype,
    secondary: ranked[1].archetype,
    ranked,
  };
}
