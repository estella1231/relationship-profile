import { UserAnswers, NormalizedScores, DetectedInsight } from '../types';

export function detectInsights(answers: UserAnswers, normalizedScores: NormalizedScores): DetectedInsight[] {
  const insights: DetectedInsight[] = [];

  const a = (q: number) => answers[q] ?? 3;

  // INSIGHT 1: Hidden Expectations
  if (a(6) >= 4 && a(20) >= 4 && (a(28) <= 3 || a(23) >= 4)) {
    insights.push({
      id: 'insight-1',
      title: '你的一部分需求，可能藏在“我没说”里面。',
      body: '你不一定喜欢直接要求亲近的人做什么。相比“我告诉你，然后你做到”，你可能更珍惜“我没有说，但你还是想到了我”。因此有些时候，真正让你失落的不是需求没有被满足，而是你发现——原来这个需求需要由你亲口说出来。',
      reflectionQuestion: '尝试把“如果TA爱我就该懂”，转换为“TA需要我的指引才能更准确地爱我”。',
    });
  }

  // INSIGHT 2: Rational Independence Gap
  if (a(14) >= 4 && a(19) >= 4 && a(41) >= 4 && a(56) >= 4) {
    insights.push({
      id: 'insight-2',
      title: '你理解空间，但不一定总能感受到空间是安全的。',
      body: '在理性认知上，你非常认同恋爱需要个人空间，也明白伴侣的独处并非冷漠；然而在情绪真实被触发（例如自己特别脆弱或不安）的那一刻，理性的开明与内在的紧绷会产生脱节，使你很难完全坦然地体验那份安全感。',
      reflectionQuestion: '当感到不安时，试着把情绪感受当作天气，不必急着用“我不该这么想”去强行压抑它。',
    });
  }

  // INSIGHT 3: Comparison Effect
  if (a(15) >= 4 && (a(5) >= 4 || a(25) >= 4)) {
    insights.push({
      id: 'insight-3',
      title: '当参照物改变，“足够好”的标准也可能改变。',
      body: '你的满意度在很大程度上会受到环境参照系的牵引。当周围出现了更耀眼的伴侣样本或潜在可能性时，原本并不困扰你的细节可能会被重新审视，促使你重新权衡眼前关系的质地。',
      reflectionQuestion: '如果那个“更好的可能性”从未出现，我原本对现在的关系满意吗？',
    });
  }

  // INSIGHT 4: Commitment Without Sunk Cost
  if (a(17) >= 4 && a(21) >= 4 && a(62) >= 4 && a(36) >= 4) {
    insights.push({
      id: 'insight-4',
      title: '你重视坚持，但并不把坚持本身当作爱。',
      body: '你愿意为一段长期关系倾注全力、共同建设，但如果彼此的人生方向发生了不可调和的根本转变，“已经在一起多久”或沉没成本本身，并不会成为你委曲求全的理由。你追求的是双方多年后依然在“主动选择彼此”，而非惯性捆绑。',
    });
  }

  // INSIGHT 5: Love and Reality
  if (normalizedScores.PR >= 65 && normalizedScores.CM >= 55) {
    insights.push({
      id: 'insight-5',
      title: '你不是不相信爱情，而是不认为爱情能够代替现实协调。',
      body: '在你的价值光谱中，花钱节奏、住房规划、家庭权责以及未来生活水准的共识，是关系最不可或缺的承重墙。你不是缺乏浪漫，而是清醒地认识到：缺乏现实基石的浪漫犹如建在流沙上的楼阁，唯有扎实的现实协调才能护航长久的温存。',
    });
  }

  // INSIGHT 6: Protective Withdrawal
  if (a(10) >= 4 && a(45) >= 4 && a(60) >= 4) {
    insights.push({
      id: 'insight-6',
      title: '当你越来越在乎时，你可能反而会先退回一点。',
      body: '当你察觉到自己正在不可逆地投入或过度依赖对方时，内心的防御机制会本能地发出警报。为了防止自己失去主导权或在未来受到重创，你有时会宁愿先收起热情、降低期待，重新向自己证明“没有TA我也能够自洽”。',
      reflectionQuestion: '在想退后自保的一瞬间，问问自己：我是在保护尊严，还是在回避被伤害的可能性？',
    });
  }

  // INSIGHT 7: Reassurance Loop
  if (a(13) >= 4 && a(22) >= 4 && a(50) >= 4 && a(56) >= 4) {
    insights.push({
      id: 'insight-7',
      title: '你的内心可能潜藏着一个“确认循环”。',
      body: '你的情感神经对环境变化高度敏感。一旦捕捉到蛛丝马迹，内在的注意力和解读系统便会全速启动，直至获得实质性的安抚或确认。',
      loopSteps: ['察觉变化', '开始注意细节', '寻找解释', '不确定感增加', '寻找确认', '短暂安心'],
    });
  }

  // INSIGHT 8: Conflict Pursuit
  if (a(31) >= 4 && a(35) >= 4 && a(37) <= 2) {
    insights.push({
      id: 'insight-8',
      title: '你可能比“争吵”本身更难接受问题暂时没有答案。',
      body: '发生摩擦时，伴侣的沉默或“晚点再谈”对你来说往往比激烈的争论更具压迫感。你很难把悬而未决的情绪搁置在半空，必须在当下得到明确的回复或态度，才能让悬着的心真正落回胸膛。',
    });
  }

  // INSIGHT 9: Conflict Shutdown
  if (a(33) >= 4 && a(38) >= 4) {
    insights.push({
      id: 'insight-9',
      title: '你的沟通可能存在一个情绪临界点。',
      body: '当分歧持续升温或对话充满情绪重负时，你的心理防御机制会在某一刻突然降下闸门。从原本的想要理清，转变为一瞬间的“疲惫、不想多说、只想独自待着”，以此隔绝继续蔓延的过载感。',
    });
  }

  // INSIGHT 10: Pursue -> Withdraw
  if (a(35) >= 4 && a(38) >= 4) {
    insights.push({
      id: 'insight-10',
      title: '你可能不是单纯的“追”或者“逃”。',
      body: '在冲突初期，你可能急切地追问、试图逼近伴侣的真实想法；但一旦这种努力遭遇阻滞或情绪负荷超标，你又会突然撤回自己的壳中，呈现出“先激烈追索、后骤然关闸”的双相动态。',
    });
  }

  // INSIGHT 11: Alternative Stability
  if (a(5) <= 2 && a(25) <= 2 && a(46) >= 4) {
    insights.push({
      id: 'insight-11',
      title: '当你确认自己的选择后，新的可能性通常不容易改变你的评价。',
      body: '你拥有一种极其可贵的内在定力。一旦建立了健康满意的契约，外界哪怕出现看似更耀眼的诱惑或幻象，也很难动摇你对现有伴侣的珍惜与认同。你懂得珍惜真实握在手中的温度。',
    });
  }

  // INSIGHT 12: Vulnerability Paradox
  if (normalizedScores.IN >= 60 && a(3) >= 4 && a(26) >= 4) {
    insights.push({
      id: 'insight-12',
      title: '你可能需要深度连接，却不一定喜欢通过“展示自己的需要”获得连接。',
      body: '你对纯粹的心灵靠近怀有强烈渴求，但真正要在伴侣面前袒露自己狼狈、脆弱或情绪低落的一面时，解释与暴露的过程会让你本能地感到疲惫与不适，往往宁可先自己扛下消化。',
    });
  }

  return insights;
}
