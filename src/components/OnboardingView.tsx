import React, { useState } from 'react';
import {
  Demographics,
  GenderOption,
  SexualOrientationOption,
  PartnerGenderPrefOption,
  RelationshipStatusOption,
} from '../types';
import { ArrowRight, Lock, HeartHandshake } from 'lucide-react';

interface OnboardingViewProps {
  initialDemographics?: Demographics;
  onComplete: (demographics: Demographics) => void;
  onBackToHome: () => void;
}

const GENDER_OPTIONS: GenderOption[] = ['女性', '男性', '非二元 / 其他', '不愿透露'];
const ORIENTATION_OPTIONS: SexualOrientationOption[] = [
  '异性恋',
  '同性恋',
  '双性恋',
  '泛性恋',
  '无性恋',
  '不确定',
  '其他',
  '不愿透露',
];
const PARTNER_PREF_OPTIONS: PartnerGenderPrefOption[] = [
  '男性',
  '女性',
  '不限性别',
  '其他',
  '不愿透露',
];
const STATUS_OPTIONS: RelationshipStatusOption[] = [
  '单身',
  '暧昧 / 正在约会',
  '恋爱中',
  '已婚 / 长期伴侣',
  '刚结束一段关系',
  '不愿透露',
];

export const OnboardingView: React.FC<OnboardingViewProps> = ({
  initialDemographics,
  onComplete,
  onBackToHome,
}) => {
  const [gender, setGender] = useState<GenderOption>(initialDemographics?.gender || '不愿透露');
  const [sexualOrientation, setSexualOrientation] = useState<SexualOrientationOption>(
    initialDemographics?.sexualOrientation || '不愿透露'
  );
  const [partnerGenderPreference, setPartnerGenderPreference] = useState<PartnerGenderPrefOption>(
    initialDemographics?.partnerGenderPreference || '不愿透露'
  );
  const [relationshipStatus, setRelationshipStatus] = useState<RelationshipStatusOption>(
    initialDemographics?.relationshipStatus || '单身'
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete({
      gender,
      sexualOrientation,
      partnerGenderPreference,
      relationshipStatus,
    });
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-[#FFFFFF] via-[#FFF7F8] to-[#FFFFFF] py-8 px-4 flex flex-col justify-between items-center">
      <div className="w-full max-w-md space-y-6 my-auto">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="text-2xl">💌</div>
          <h1 className="text-2xl font-bold text-[#292529] font-serif-zh">在开始之前</h1>
          <p className="text-xs text-[#777077] leading-relaxed max-w-xs mx-auto">
            这些信息可以帮助我们调整报告中的表达方式。它们不会改变你的依恋倾向评分。
          </p>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Question A: Gender */}
          <div className="bg-[#FFFFFF] p-4 rounded-[20px] border border-[#F2E4E8] shadow-xs">
            <label className="block text-xs font-semibold text-[#292529] mb-2.5">
              A. 你的性别
            </label>
            <div className="grid grid-cols-2 gap-2">
              {GENDER_OPTIONS.map((opt) => (
                <button
                  type="button"
                  key={opt}
                  onClick={() => setGender(opt)}
                  className={`py-2 px-3 rounded-[14px] text-xs font-medium border transition-all text-center ${
                    gender === opt
                      ? 'bg-[#FFF1F4] border-[#EFA8B8] text-[#292529] shadow-xs'
                      : 'bg-[#FFF7F8] border-[#F2E4E8] text-[#777077] hover:bg-[#FFFFFF]'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Question B: Sexual Orientation */}
          <div className="bg-[#FFFFFF] p-4 rounded-[20px] border border-[#F2E4E8] shadow-xs">
            <label className="block text-xs font-semibold text-[#292529] mb-2.5">
              B. 你的性取向
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {ORIENTATION_OPTIONS.map((opt) => (
                <button
                  type="button"
                  key={opt}
                  onClick={() => setSexualOrientation(opt)}
                  className={`py-2 px-2.5 rounded-[14px] text-xs font-medium border transition-all text-center whitespace-nowrap ${
                    sexualOrientation === opt
                      ? 'bg-[#FFF1F4] border-[#EFA8B8] text-[#292529] shadow-xs'
                      : 'bg-[#FFF7F8] border-[#F2E4E8] text-[#777077] hover:bg-[#FFFFFF]'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Question C: Partner gender pref */}
          <div className="bg-[#FFFFFF] p-4 rounded-[20px] border border-[#F2E4E8] shadow-xs">
            <label className="block text-xs font-semibold text-[#292529] mb-2.5">
              C. 你通常与什么性别的人建立恋爱关系？
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {PARTNER_PREF_OPTIONS.map((opt) => (
                <button
                  type="button"
                  key={opt}
                  onClick={() => setPartnerGenderPreference(opt)}
                  className={`py-2 px-3 rounded-[14px] text-xs font-medium border transition-all text-center ${
                    partnerGenderPreference === opt
                      ? 'bg-[#FFF1F4] border-[#EFA8B8] text-[#292529] shadow-xs'
                      : 'bg-[#FFF7F8] border-[#F2E4E8] text-[#777077] hover:bg-[#FFFFFF]'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Question D: Relationship Status */}
          <div className="bg-[#FFFFFF] p-4 rounded-[20px] border border-[#F2E4E8] shadow-xs">
            <label className="block text-xs font-semibold text-[#292529] mb-2.5">
              D. 你目前的感情状态
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {STATUS_OPTIONS.map((opt) => (
                <button
                  type="button"
                  key={opt}
                  onClick={() => setRelationshipStatus(opt)}
                  className={`py-2 px-2.5 rounded-[14px] text-xs font-medium border transition-all text-center ${
                    relationshipStatus === opt
                      ? 'bg-[#FFF1F4] border-[#EFA8B8] text-[#292529] shadow-xs'
                      : 'bg-[#FFF7F8] border-[#F2E4E8] text-[#777077] hover:bg-[#FFFFFF]'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Privacy Note */}
          <div className="flex items-start gap-2 p-3 bg-[#FFF7F8] rounded-[16px] border border-[#F2E4E8] text-[11px] text-[#777077] leading-relaxed">
            <Lock className="w-3.5 h-3.5 text-[#EFA8B8] shrink-0 mt-0.5" />
            <div>
              <span className="font-medium text-[#292529]">严格隐私承诺：</span>
              我们无需姓名、手机号或邮箱。上述背景仅用于生成更具温度的中立语境（如统一使用“TA/对方”），绝不会出现在任何外部展示或评分修改中。
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-4 px-6 rounded-full bg-[#EFA8B8] hover:bg-[#e595a6] text-[#FFFFFF] font-medium text-sm transition-all shadow-[0_6px_20px_rgba(239,168,184,0.32)] active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <span>进入62题深度测试</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center pt-2">
          <button
            type="button"
            onClick={onBackToHome}
            className="text-xs text-[#777077] hover:text-[#292529] underline transition-colors"
          >
            返回首页
          </button>
        </div>
      </div>
    </div>
  );
};
