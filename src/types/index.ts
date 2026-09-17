export type DimensionKey =
  | 'AX' // Attachment Anxiety
  | 'AV' // Attachment Avoidance
  | 'SE' // Security
  | 'ER' // Emotional Reliance
  | 'IN' // Intimacy Need
  | 'CO' // Communication
  | 'CF' // Conflict Regulation
  | 'BO' // Boundaries & Autonomy
  | 'IE' // Implicit Expectations
  | 'RO' // Romantic Idealism
  | 'CM' // Commitment Orientation
  | 'PR' // Pragmatic Orientation
  | 'AS' // Alternative Sensitivity
  | 'SC'; // Social Comparison

export type NormalizedScores = Record<DimensionKey, number>;

export type CodeStatus = 'unused' | 'active' | 'completed' | 'disabled';

export interface RedemptionCode {
  id: string;
  code: string;
  codeHash: string;
  status: CodeStatus;
  createdAt: number;
  activatedAt?: number;
  completedAt?: number;
  lastActivityAt: number;
  sessionId?: string;
}

export type GenderOption = '女性' | '男性' | '非二元 / 其他' | '不愿透露';
export type SexualOrientationOption =
  | '异性恋'
  | '同性恋'
  | '双性恋'
  | '泛性恋'
  | '无性恋'
  | '不确定'
  | '其他'
  | '不愿透露';
export type PartnerGenderPrefOption = '男性' | '女性' | '不限性别' | '其他' | '不愿透露';
export type RelationshipStatusOption =
  | '单身'
  | '暧昧 / 正在约会'
  | '恋爱中'
  | '已婚 / 长期伴侣'
  | '刚结束一段关系'
  | '不愿透露';

export interface Demographics {
  gender: GenderOption;
  sexualOrientation: SexualOrientationOption;
  partnerGenderPreference: PartnerGenderPrefOption;
  relationshipStatus: RelationshipStatusOption;
}

export interface Question {
  id: number;
  text: string;
}

export type AnswerValue = 1 | 2 | 3 | 4 | 5;

export type UserAnswers = Record<number, AnswerValue>;

export interface AttachmentProfile {
  type: 'Secure' | 'Anxious' | 'Avoidant' | 'FearfulAvoidant' | 'Mixed';
  titleZh: string;
  titleEn: string;
  description: string;
  axScore: number;
  avScore: number;
  quadrantDescription: string;
}

export interface RelationshipArchetype {
  id: string;
  nameZh: string;
  nameEn: string;
  tagline: string;
  summary: string;
  prototype: Partial<Record<DimensionKey, number>>;
  strengths: string[];
  vulnerabilities: string[];
}

export interface LovePhilosophy {
  type: 'RomanticBuilder' | 'PragmaticBuilder' | 'ExperienceOriented' | 'RomanticExplorer';
  nameZh: string;
  nameEn: string;
  description: string;
  keyMotto: string;
}

export interface DetectedInsight {
  id: string;
  title: string;
  body: string;
  loopSteps?: string[];
  reflectionQuestion?: string;
}

export interface AssessmentResult {
  codeId: string;
  completedAt: number;
  normalizedScores: NormalizedScores;
  attachmentProfile: AttachmentProfile;
  primaryArchetype: RelationshipArchetype;
  secondaryArchetype: RelationshipArchetype;
  lovePhilosophy: LovePhilosophy;
  detectedInsights: DetectedInsight[];
  radarData: {
    axis: string;
    key: string;
    value: number;
    description: string;
  }[];
  demographics?: Demographics;
  triggers: string[];
  conflictPattern: {
    title: string;
    description: string;
    tendency: string;
  };
  whatYouNeed: string[];
  loveVsReality: {
    title: string;
    description: string;
  };
  alternativeEvaluation: {
    title: string;
    description: string;
  };
  blindSpots: string[];
  strengths: string[];
  growthGuide: {
    title: string;
    action: string;
  }[];
  shareCard: {
    keywords: string[];
    insightQuote: string;
  };
}

export interface AssessmentSession {
  id: string;
  codeId: string;
  code: string;
  demographics?: Demographics;
  answers: UserAnswers;
  currentQuestion: number;
  startedAt: number;
  lastActivityAt: number;
  completedAt?: number;
  result?: AssessmentResult;
}
