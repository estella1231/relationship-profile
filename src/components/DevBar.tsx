import React, { useState } from 'react';
import { UserAnswers, AnswerValue } from '../types';
import { runComprehensiveTests, TestResultItem } from '../scoring/runTests';
import { Sparkles, Terminal, CheckCircle2, XCircle, ChevronDown, ChevronUp, ShieldCheck } from 'lucide-react';

interface DevBarProps {
  onApplyAutofill: (answers: UserAnswers) => void;
  onOpenAdmin: () => void;
}

export const DevBar: React.FC<DevBarProps> = ({ onApplyAutofill, onOpenAdmin }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [testResults, setTestResults] = useState<{ allPassed: boolean; results: TestResultItem[] } | null>(null);
  const [showTests, setShowTests] = useState(false);

  const fillNeutral = () => {
    const ans: UserAnswers = {};
    for (let i = 1; i <= 62; i++) ans[i] = 3;
    onApplyAutofill(ans);
  };

  const fillHighAnxiety = () => {
    const ans: UserAnswers = {};
    // High AX: Q1, Q13, Q22, Q31, Q35, Q43, Q50, Q56, etc. = 5
    // Low SE: Q4, Q8, Q14, Q24 = 1
    for (let i = 1; i <= 62; i++) {
      if ([1, 6, 11, 13, 16, 20, 22, 31, 35, 41, 43, 47, 50, 53, 56].includes(i)) {
        ans[i] = 5;
      } else if ([4, 8, 14, 19, 24, 42, 44].includes(i)) {
        ans[i] = 1;
      } else {
        ans[i] = 4;
      }
    }
    onApplyAutofill(ans);
  };

  const fillHighAvoidance = () => {
    const ans: UserAnswers = {};
    // High AV: Q3, Q10, Q18, Q26, Q33, Q38, Q45, Q54, Q58, Q60 = 5
    // Low IN, High BO
    for (let i = 1; i <= 62; i++) {
      if ([3, 7, 10, 18, 26, 33, 38, 45, 54, 58, 60].includes(i)) {
        ans[i] = 5;
      } else if ([16, 29, 41, 48].includes(i)) {
        ans[i] = 1;
      } else {
        ans[i] = 3;
      }
    }
    onApplyAutofill(ans);
  };

  const fillSecure = () => {
    const ans: UserAnswers = {};
    // High SE, High CO, High CF, Low AX, Low AV
    for (let i = 1; i <= 62; i++) {
      if ([4, 8, 14, 19, 24, 28, 34, 37, 40, 42, 44, 46, 48, 52, 57, 59, 61].includes(i)) {
        ans[i] = 5;
      } else if ([1, 3, 5, 6, 11, 13, 15, 20, 22, 31, 33, 35, 43, 50, 56].includes(i)) {
        ans[i] = 1;
      } else {
        ans[i] = 3;
      }
    }
    onApplyAutofill(ans);
  };

  const fillRandom = () => {
    const ans: UserAnswers = {};
    for (let i = 1; i <= 62; i++) {
      ans[i] = (Math.floor(Math.random() * 5) + 1) as AnswerValue;
    }
    onApplyAutofill(ans);
  };

  const handleRunTests = () => {
    const res = runComprehensiveTests();
    setTestResults(res);
    setShowTests(true);
  };

  return (
    <div className="fixed bottom-3 right-3 z-50 select-none">
      {/* Test results modal */}
      {showTests && testResults && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#292529]/40 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-[#FFFFFF] rounded-[24px] p-6 border border-[#F2E4E8] shadow-2xl max-h-[85vh] flex flex-col">
            <div className="flex justify-between items-center pb-3 border-b border-[#F2E4E8]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#EFA8B8]" />
                <h3 className="text-base font-bold text-[#292529]">
                  自动化测试套件 (Unit Tests)
                </h3>
              </div>
              <span
                className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                  testResults.allPassed
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-rose-50 text-rose-700 border border-rose-200'
                }`}
              >
                {testResults.allPassed ? '✓ 全部 8 组测试通过' : '有测试未通过'}
              </span>
            </div>

            <div className="flex-1 overflow-y-auto py-4 space-y-3">
              {testResults.results.map((t, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-[14px] bg-[#FFF7F8] border border-[#F2E4E8] text-xs flex items-start gap-2.5"
                >
                  {t.passed ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <div className="font-semibold text-[#292529]">{t.name}</div>
                    <div className="text-[#777077] mt-0.5 leading-relaxed">{t.message}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-[#F2E4E8] text-right">
              <button
                onClick={() => setShowTests(false)}
                className="px-4 py-2 rounded-full bg-[#EFA8B8] text-[#FFFFFF] text-xs font-medium hover:bg-[#e595a6]"
              >
                关闭测试面板
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Dev pill button */}
      <div className="flex flex-col items-end">
        {isOpen && (
          <div className="mb-2 p-3 bg-[#FFFFFF] rounded-[20px] border border-[#F2E4E8] shadow-[0_8px_30px_rgba(41,37,41,0.12)] w-60 space-y-2 text-xs">
            <div className="font-semibold text-[#292529] flex justify-between items-center pb-1 border-b border-[#F2E4E8]">
              <span>🛠️ 开发快捷填充</span>
              <button
                onClick={onOpenAdmin}
                className="text-[11px] text-[#EFA8B8] hover:underline"
              >
                /admin 后台
              </button>
            </div>

            <div className="grid grid-cols-2 gap-1.5 pt-1">
              <button
                onClick={fillNeutral}
                className="p-1.5 rounded-lg bg-[#FFF7F8] hover:bg-[#FFF1F4] text-left border border-[#F2E4E8]"
              >
                全中立 (3分)
              </button>
              <button
                onClick={fillSecure}
                className="p-1.5 rounded-lg bg-[#FFF7F8] hover:bg-[#FFF1F4] text-left border border-[#F2E4E8]"
              >
                安全型预设
              </button>
              <button
                onClick={fillHighAnxiety}
                className="p-1.5 rounded-lg bg-[#FFF7F8] hover:bg-[#FFF1F4] text-left border border-[#F2E4E8]"
              >
                焦虑倾向预设
              </button>
              <button
                onClick={fillHighAvoidance}
                className="p-1.5 rounded-lg bg-[#FFF7F8] hover:bg-[#FFF1F4] text-left border border-[#F2E4E8]"
              >
                回避倾向预设
              </button>
              <button
                onClick={fillRandom}
                className="p-1.5 rounded-lg bg-[#FFF7F8] hover:bg-[#FFF1F4] text-left border border-[#F2E4E8] col-span-2"
              >
                随机作答 (1–5)
              </button>
            </div>

            <button
              onClick={handleRunTests}
              className="w-full mt-2 py-1.5 px-2 rounded-lg bg-[#FFF1F4] text-[#EFA8B8] font-medium border border-[#F2E4E8] hover:bg-[#FFFFFF] flex items-center justify-center gap-1"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>运行归一化/矩阵单测</span>
            </button>
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FFFFFF]/90 backdrop-blur-sm border border-[#F2E4E8] text-[#777077] hover:text-[#292529] hover:bg-[#FFF1F4] text-xs shadow-md transition-all"
        >
          <Terminal className="w-3.5 h-3.5 text-[#EFA8B8]" />
          <span>Dev Tools</span>
          {isOpen ? <ChevronDown className="w-3 h-3" /> : <ChevronUp className="w-3 h-3" />}
        </button>
      </div>
    </div>
  );
};
