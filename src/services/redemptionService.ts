import {
  RedemptionCode,
  AssessmentSession,
  Demographics,
  UserAnswers,
  AssessmentResult,
} from '../types';
import { calculateNormalizedScores, determineAttachmentProfile } from '../scoring/scoreAssessment';
import { determineArchetypes } from '../scoring/archetypes';
import { determineLovePhilosophy } from '../scoring/lovePhilosophy';
import { detectInsights } from '../scoring/insightRules';
import { assembleAssessmentResult } from '../report/reportBlocks';

// Simple client-side pseudo-hash for abstraction demonstration
function pseudoHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return 'h_' + Math.abs(hash).toString(36) + '_' + str.length;
}

// Characters excluding ambiguous 0, O, 1, I, L
const SAFE_CHARS = '23456789ABCDEFGHJKMNPQRSTUVWXYZ';

function generateRandomCode(): string {
  let result = '';
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * SAFE_CHARS.length);
    result += SAFE_CHARS[randomIndex];
  }
  return `RLP-${result}`;
}

const STORAGE_KEY_CODES = 'rlp_redemption_codes_v1';
const STORAGE_KEY_SESSIONS = 'rlp_assessment_sessions_v1';
const CURRENT_SESSION_CODE_KEY = 'rlp_current_active_code';

export interface IRedemptionService {
  validateCode(code: string): Promise<{ success: boolean; message: string; session?: AssessmentSession; status?: string }>;
  startAssessment(code: string, demographics?: Demographics): Promise<AssessmentSession>;
  saveProgress(code: string, answers: UserAnswers, currentQuestion: number): Promise<void>;
  completeAssessment(code: string, demographics?: Demographics): Promise<AssessmentResult>;
  getSession(code: string): Promise<AssessmentSession | null>;
  getCurrentActiveCode(): string | null;
  setCurrentActiveCode(code: string | null): void;

  // Admin capabilities
  getAllCodes(): Promise<RedemptionCode[]>;
  generateCodes(count: number): Promise<RedemptionCode[]>;
  toggleDisableCode(codeId: string): Promise<boolean>;
  resetDemoCodes(): Promise<void>;
}

class RedemptionServiceImpl implements IRedemptionService {
  private codes: Map<string, RedemptionCode> = new Map();
  private sessions: Map<string, AssessmentSession> = new Map();

  constructor() {
    this.initStorage();
  }

  private initStorage() {
    try {
      const storedCodes = localStorage.getItem(STORAGE_KEY_CODES);
      const storedSessions = localStorage.getItem(STORAGE_KEY_SESSIONS);

      if (storedCodes) {
        const parsed = JSON.parse(storedCodes) as RedemptionCode[];
        parsed.forEach((c) => this.codes.set(c.code.toUpperCase(), c));
      }

      if (storedSessions) {
        const parsed = JSON.parse(storedSessions) as AssessmentSession[];
        parsed.forEach((s) => this.sessions.set(s.code.toUpperCase(), s));
      }
    } catch {
      // Storage unavailable or fallback
    }

    // Always ensure DEMO codes exist
    this.ensureDemoSeed('RLP-DEMO01');
    this.ensureDemoSeed('RLP-DEMO02');
    this.ensureDemoSeed('RLP-DEMO03');
    this.ensureDemoSeed('RLP-K8F3Q2');
  }

  private ensureDemoSeed(code: string) {
    const upper = code.toUpperCase();
    if (!this.codes.has(upper)) {
      const now = Date.now();
      const newCode: RedemptionCode = {
        id: 'seed_' + upper,
        code: upper,
        codeHash: pseudoHash(upper),
        status: 'unused',
        createdAt: now,
        lastActivityAt: now,
      };
      this.codes.set(upper, newCode);
      this.persist();
    }
  }

  private persist() {
    try {
      localStorage.setItem(STORAGE_KEY_CODES, JSON.stringify(Array.from(this.codes.values())));
      localStorage.setItem(STORAGE_KEY_SESSIONS, JSON.stringify(Array.from(this.sessions.values())));
    } catch {
      // Storage limits or sandbox warning
    }
  }

  getCurrentActiveCode(): string | null {
    try {
      return localStorage.getItem(CURRENT_SESSION_CODE_KEY);
    } catch {
      return null;
    }
  }

  setCurrentActiveCode(code: string | null): void {
    try {
      if (code) {
        localStorage.setItem(CURRENT_SESSION_CODE_KEY, code.toUpperCase().trim());
      } else {
        localStorage.removeItem(CURRENT_SESSION_CODE_KEY);
      }
    } catch {
      // Ignored
    }
  }

  async validateCode(inputCode: string): Promise<{
    success: boolean;
    message: string;
    session?: AssessmentSession;
    status?: string;
  }> {
    const code = inputCode.trim().toUpperCase();
    if (!code) {
      return { success: false, message: '请输入兑换码' };
    }

    const record = this.codes.get(code);
    if (!record) {
      return { success: false, message: '兑换码无效，请检查输入或联系客服' };
    }

    if (record.status === 'disabled') {
      return { success: false, message: '该兑换码已被停用' };
    }

    const session = this.sessions.get(code);

    if (record.status === 'completed') {
      return {
        success: true,
        message: '该兑换码已生成深度画像报告，可随时重新查阅',
        session,
        status: 'completed',
      };
    }

    if (record.status === 'active') {
      return {
        success: true,
        message: '检测到未完成的测试进度，将为你恢复答题',
        session,
        status: 'active',
      };
    }

    return {
      success: true,
      message: '兑换码验证成功，可以开始测试',
      session,
      status: 'unused',
    };
  }

  async startAssessment(inputCode: string, demographics?: Demographics): Promise<AssessmentSession> {
    const code = inputCode.trim().toUpperCase();
    let record = this.codes.get(code);
    const now = Date.now();

    if (!record) {
      record = {
        id: 'code_' + Date.now() + Math.random().toString(36).substring(2, 6),
        code,
        codeHash: pseudoHash(code),
        status: 'active',
        createdAt: now,
        activatedAt: now,
        lastActivityAt: now,
      };
      this.codes.set(code, record);
    } else {
      record.status = record.status === 'completed' ? 'completed' : 'active';
      record.activatedAt = record.activatedAt || now;
      record.lastActivityAt = now;
    }

    let session = this.sessions.get(code);
    if (!session) {
      session = {
        id: 'sess_' + Date.now() + Math.random().toString(36).substring(2, 6),
        codeId: record.id,
        code,
        demographics,
        answers: {},
        currentQuestion: 1,
        startedAt: now,
        lastActivityAt: now,
      };
    } else {
      if (demographics) {
        session.demographics = demographics;
      }
      session.lastActivityAt = now;
    }

    this.sessions.set(code, session);
    this.setCurrentActiveCode(code);
    this.persist();

    return session;
  }

  async saveProgress(inputCode: string, answers: UserAnswers, currentQuestion: number): Promise<void> {
    const code = inputCode.trim().toUpperCase();
    const session = this.sessions.get(code);
    const record = this.codes.get(code);
    const now = Date.now();

    if (session) {
      session.answers = { ...session.answers, ...answers };
      session.currentQuestion = currentQuestion;
      session.lastActivityAt = now;
    }
    if (record) {
      record.lastActivityAt = now;
    }

    this.persist();
  }

  async completeAssessment(inputCode: string, demographics?: Demographics): Promise<AssessmentResult> {
    const code = inputCode.trim().toUpperCase();
    const session = this.sessions.get(code);
    const record = this.codes.get(code);
    const now = Date.now();

    const answers = session?.answers || {};
    const finalDemo = demographics || session?.demographics;

    // Run scoring pipeline
    const normalizedScores = calculateNormalizedScores(answers);
    const attachmentProfile = determineAttachmentProfile(normalizedScores);
    const { primary, secondary } = determineArchetypes(normalizedScores);
    const lovePhilosophy = determineLovePhilosophy(normalizedScores);
    const detectedInsights = detectInsights(answers, normalizedScores);

    const result = assembleAssessmentResult(
      record?.id || code,
      answers,
      normalizedScores,
      attachmentProfile,
      primary,
      secondary,
      lovePhilosophy,
      detectedInsights,
      finalDemo
    );

    if (session) {
      session.completedAt = now;
      session.lastActivityAt = now;
      session.result = result;
    }

    if (record) {
      record.status = 'completed';
      record.completedAt = now;
      record.lastActivityAt = now;
    }

    this.persist();
    return result;
  }

  async getSession(inputCode: string): Promise<AssessmentSession | null> {
    const code = inputCode.trim().toUpperCase();
    return this.sessions.get(code) || null;
  }

  async getAllCodes(): Promise<RedemptionCode[]> {
    return Array.from(this.codes.values()).sort((a, b) => b.createdAt - a.createdAt);
  }

  async generateCodes(count: number): Promise<RedemptionCode[]> {
    const now = Date.now();
    const newCodes: RedemptionCode[] = [];

    for (let i = 0; i < count; i++) {
      let code = generateRandomCode();
      while (this.codes.has(code)) {
        code = generateRandomCode();
      }

      const rec: RedemptionCode = {
        id: 'code_' + now + '_' + i + '_' + Math.random().toString(36).substring(2, 6),
        code,
        codeHash: pseudoHash(code),
        status: 'unused',
        createdAt: now,
        lastActivityAt: now,
      };

      this.codes.set(code, rec);
      newCodes.push(rec);
    }

    this.persist();
    return newCodes;
  }

  async toggleDisableCode(codeId: string): Promise<boolean> {
    for (const record of this.codes.values()) {
      if (record.id === codeId) {
        record.status = record.status === 'disabled' ? 'unused' : 'disabled';
        record.lastActivityAt = Date.now();
        this.persist();
        return record.status === 'disabled';
      }
    }
    return false;
  }

  async resetDemoCodes(): Promise<void> {
    this.ensureDemoSeed('RLP-DEMO01');
    this.ensureDemoSeed('RLP-DEMO02');
    this.ensureDemoSeed('RLP-DEMO03');
    this.ensureDemoSeed('RLP-K8F3Q2');
  }
}

export const redemptionService: IRedemptionService = new RedemptionServiceImpl();
