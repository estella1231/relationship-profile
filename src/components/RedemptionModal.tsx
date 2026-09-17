import React, { useState } from 'react';
import { KeyRound, CheckCircle2, AlertCircle, ArrowRight, X, Sparkles } from 'lucide-react';
import { redemptionService } from '../services/redemptionService';
import { AssessmentSession } from '../types';

interface RedemptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCodeValidated: (code: string, session?: AssessmentSession, status?: string) => void;
}

export const RedemptionModal: React.FC<RedemptionModalProps> = ({
  isOpen,
  onClose,
  onCodeValidated,
}) => {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleValidate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cleanCode = code.trim().toUpperCase();
    if (!cleanCode) {
      setError('请输入兑换码');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await redemptionService.validateCode(cleanCode);
      if (res.success) {
        onCodeValidated(cleanCode, res.session, res.status);
        onClose();
      } else {
        setError(res.message);
      }
    } catch {
      setError('验证失败，请稍后再试');
    } finally {
      setLoading(false);
    }
  };

  const fillDemoCode = (demo: string) => {
    setCode(demo);
    setError(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#292529]/40 backdrop-blur-xs transition-opacity">
      <div className="w-full max-w-sm bg-[#FFFFFF] rounded-[24px] p-6 border border-[#F2E4E8] shadow-[0_16px_40px_rgba(41,37,41,0.12)] relative animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-full text-[#777077] hover:text-[#292529] hover:bg-[#FFF7F8] transition-colors"
          aria-label="关闭"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-full bg-[#FFF1F4] border border-[#F2E4E8] flex items-center justify-center mx-auto mb-3">
            <KeyRound className="w-6 h-6 text-[#EFA8B8]" />
          </div>
          <h3 className="text-lg font-bold text-[#292529] font-serif-zh">
            输入测试兑换码
          </h3>
          <p className="text-xs text-[#777077] mt-1 leading-relaxed">
            本测试为付费深度自省评估，请凭获取的专属激活码进入。
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleValidate} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-[#777077] mb-1.5 font-mono uppercase tracking-wider">
              REDEMPTION CODE
            </label>
            <input
              type="text"
              value={code}
              onChange={(e) => {
                setCode(e.target.value.toUpperCase());
                setError(null);
              }}
              placeholder="例如: RLP-K8F3Q2"
              className="w-full px-4 py-3 rounded-[16px] bg-[#FFF7F8] border border-[#F2E4E8] text-[#292529] font-mono text-sm tracking-widest text-center focus:bg-[#FFFFFF] focus:border-[#EFA8B8] focus:outline-none transition-all"
              autoFocus
            />
          </div>

          {error && (
            <div className="p-3 rounded-[14px] bg-[#FFF1F4] border border-[#F2E4E8] flex items-center gap-2 text-xs text-[#EFA8B8] font-medium">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-5 rounded-full bg-[#EFA8B8] hover:bg-[#e595a6] text-[#FFFFFF] font-medium text-sm transition-all shadow-[0_4px_16px_rgba(239,168,184,0.3)] active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <span>正在验证中...</span>
            ) : (
              <>
                <span>验证并继续</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Dev / Demo Quick Access */}
        <div className="mt-6 pt-4 border-t border-[#F2E4E8] text-center">
          <div className="text-[11px] text-[#777077] mb-2 flex items-center justify-center gap-1">
            <Sparkles className="w-3 h-3 text-[#EFA8B8]" />
            <span>体验演示码 (点击快速填入)：</span>
          </div>
          <div className="flex justify-center gap-2">
            {['RLP-DEMO01', 'RLP-DEMO02', 'RLP-DEMO03'].map((demo) => (
              <button
                key={demo}
                type="button"
                onClick={() => fillDemoCode(demo)}
                className="text-[10px] font-mono py-1 px-2 rounded-lg bg-[#FFF7F8] border border-[#F2E4E8] text-[#777077] hover:text-[#292529] hover:border-[#EFA8B8] transition-colors"
              >
                {demo}
              </button>
            ))}
          </div>
        </div>

        {/* Privacy reassurance */}
        <div className="mt-4 text-center">
          <p className="text-[10.5px] text-[#777077]/80">
            一次兑换激活后可随时中断并在当前设备恢复，完成后的报告支持永久随时回溯。
          </p>
        </div>
      </div>
    </div>
  );
};
