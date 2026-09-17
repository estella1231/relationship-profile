import { calculateNormalizedScores, determineAttachmentProfile, THEORETICAL_RANGES } from './scoreAssessment';
import { determineArchetypes } from './archetypes';
import { determineLovePhilosophy } from './lovePhilosophy';
import { detectInsights } from './insightRules';
import { ALL_DIMENSIONS } from './scoringMatrix';
import { UserAnswers } from '../types';

export interface TestResultItem {
  name: string;
  passed: boolean;
  message: string;
  details?: unknown;
}

export function runComprehensiveTests(): { allPassed: boolean; results: TestResultItem[] } {
  const results: TestResultItem[] = [];

  // Test 1: Theoretical ranges validity
  let rangesValid = true;
  for (const dim of ALL_DIMENSIONS) {
    const range = THEORETICAL_RANGES[dim];
    if (!range || range.max <= range.min || isNaN(range.min) || isNaN(range.max)) {
      rangesValid = false;
      break;
    }
  }
  results.push({
    name: 'Theoretical Ranges Verification',
    passed: rangesValid,
    message: rangesValid
      ? 'All 14 dimensions have valid, positive non-zero min-max spans.'
      : 'Some dimensions have invalid min-max ranges.',
  });

  // Test 2: All 1s Answers
  const all1s: UserAnswers = {};
  for (let i = 1; i <= 62; i++) all1s[i] = 1;
  const scores1 = calculateNormalizedScores(all1s);
  let all1sValid = true;
  for (const dim of ALL_DIMENSIONS) {
    const v = scores1[dim];
    if (isNaN(v) || v < 0 || v > 100) {
      all1sValid = false;
      break;
    }
  }
  results.push({
    name: 'All 1 Answers Normalization',
    passed: all1sValid,
    message: all1sValid ? 'All scores for answers=1 stay strictly within [0, 100].' : 'Scores for all 1s produced NaN or out-of-bounds.',
    details: scores1,
  });

  // Test 3: All 3s Answers (Neutral)
  const all3s: UserAnswers = {};
  for (let i = 1; i <= 62; i++) all3s[i] = 3;
  const scores3 = calculateNormalizedScores(all3s);
  let all3sValid = true;
  for (const dim of ALL_DIMENSIONS) {
    const v = scores3[dim];
    if (isNaN(v) || v < 40 || v > 60) {
      // With linear weights around neutral (3), normalized score should center near 50
      all3sValid = false;
      break;
    }
  }
  results.push({
    name: 'All 3 Answers (Neutral Center)',
    passed: all3sValid,
    message: all3sValid ? 'All dimensions for answers=3 center near 50% without deviation.' : 'Neutral answers deviate unexpectedly.',
    details: scores3,
  });

  // Test 4: All 5s Answers
  const all5s: UserAnswers = {};
  for (let i = 1; i <= 62; i++) all5s[i] = 5;
  const scores5 = calculateNormalizedScores(all5s);
  let all5sValid = true;
  for (const dim of ALL_DIMENSIONS) {
    const v = scores5[dim];
    if (isNaN(v) || v < 0 || v > 100) {
      all5sValid = false;
      break;
    }
  }
  results.push({
    name: 'All 5 Answers Normalization',
    passed: all5sValid,
    message: all5sValid ? 'All scores for answers=5 stay strictly within [0, 100].' : 'Scores for all 5s produced NaN or out-of-bounds.',
    details: scores5,
  });

  // Test 5: Attachment Classification
  const secureAttach = determineAttachmentProfile({ ...scores3, AX: 30, AV: 30 });
  const anxiousAttach = determineAttachmentProfile({ ...scores3, AX: 75, AV: 30 });
  const avoidantAttach = determineAttachmentProfile({ ...scores3, AX: 30, AV: 75 });
  const fearfulAttach = determineAttachmentProfile({ ...scores3, AX: 75, AV: 75 });
  const mixedAttach = determineAttachmentProfile({ ...scores3, AX: 50, AV: 50 });

  const attachmentPassed =
    secureAttach.type === 'Secure' &&
    anxiousAttach.type === 'Anxious' &&
    avoidantAttach.type === 'Avoidant' &&
    fearfulAttach.type === 'FearfulAvoidant' &&
    mixedAttach.type === 'Mixed';

  results.push({
    name: 'Attachment Classification (4 Quadrants + Mixed)',
    passed: attachmentPassed,
    message: attachmentPassed
      ? 'Attachment profile correctly identifies Secure, Anxious, Avoidant, Fearful-Avoidant and Mixed.'
      : 'Attachment logic classification mismatch.',
  });

  // Test 6: Archetype Distance Calculation
  const archResult = determineArchetypes(scores3);
  const archetypePassed =
    Boolean(archResult.primary) &&
    Boolean(archResult.secondary) &&
    archResult.primary.id !== archResult.secondary.id &&
    archResult.ranked.length === 10;

  results.push({
    name: 'Archetype Euclidean Distance Ranking',
    passed: archetypePassed,
    message: archetypePassed
      ? 'Successfully ranked 10 archetypes and determined Primary and Secondary influences.'
      : 'Archetype distance calculation failed.',
  });

  // Test 7: Love Philosophy
  const roPhil = determineLovePhilosophy({ ...scores3, RO: 80, CM: 70, PR: 40 });
  const prPhil = determineLovePhilosophy({ ...scores3, RO: 40, CM: 70, PR: 80 });
  const expPhil = determineLovePhilosophy({ ...scores3, RO: 40, CM: 30, PR: 40 });
  const philPassed =
    roPhil.type === 'RomanticBuilder' &&
    prPhil.type === 'PragmaticBuilder' &&
    expPhil.type === 'ExperienceOriented';

  results.push({
    name: 'Love Philosophy Orientation Logic',
    passed: philPassed,
    message: philPassed
      ? 'Correctly derives Romantic Builder, Pragmatic Builder, and Experience-Oriented.'
      : 'Love philosophy orientation failed.',
  });

  // Test 8: Deterministic Cross-Question Insights
  // Trigger Insight 1: Q6>=4 && Q20>=4 && (Q28<=3 || Q23>=4)
  const insightTestAnswers: UserAnswers = { ...all3s, 6: 5, 20: 5, 28: 2 };
  const detected = detectInsights(insightTestAnswers, scores3);
  const hasInsight1 = detected.some((d) => d.id === 'insight-1');

  results.push({
    name: 'Cross-Question Insight Engine Determinism',
    passed: hasInsight1,
    message: hasInsight1
      ? 'Insight 1 (Hidden Expectations) triggered reliably according to exact question condition.'
      : 'Insight rule did not trigger as expected.',
  });

  const allPassed = results.every((r) => r.passed);
  return { allPassed, results };
}
