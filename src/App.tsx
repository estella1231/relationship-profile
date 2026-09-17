import React, { useState, useEffect } from 'react';
import { LandingPage } from './components/LandingPage';
import { RedemptionModal } from './components/RedemptionModal';
import { OnboardingView } from './components/OnboardingView';
import { QuestionEngine } from './components/QuestionEngine';
import { LoadingAnimation } from './components/LoadingAnimation';
import { ReportView } from './components/ReportView';
import { AdminPanel } from './components/AdminPanel';
import { DevBar } from './components/DevBar';
import { redemptionService } from './services/redemptionService';
import {
  AssessmentSession,
  AssessmentResult,
  Demographics,
  UserAnswers,
} from './types';

export default function App() {
  const [currentView, setCurrentView] = useState<
    'landing' | 'onboarding' | 'questions' | 'loading' | 'report' | 'admin'
  >('landing');

  const [activeCode, setActiveCode] = useState<string | null>(null);
  const [currentSession, setCurrentSession] = useState<AssessmentSession | null>(null);
  const [completedResult, setCompletedResult] = useState<AssessmentResult | null>(null);
  const [isRedemptionOpen, setIsRedemptionOpen] = useState(false);

  // Initialize session on mount
  useEffect(() => {
    // Check if URL contains #admin
    if (window.location.hash === '#admin') {
      setCurrentView('admin');
      return;
    }

    const savedCode = redemptionService.getCurrentActiveCode();
    if (savedCode) {
      setActiveCode(savedCode);
      redemptionService.getSession(savedCode).then((sess) => {
        if (sess) {
          setCurrentSession(sess);
          if (sess.result) {
            setCompletedResult(sess.result);
          }
        }
      });
    }
  }, []);

  const handleStartFromLanding = () => {
    // If we have an active code that hasn't completed, resume or go to onboarding
    if (activeCode && currentSession && !currentSession.result) {
      if (!currentSession.demographics) {
        setCurrentView('onboarding');
      } else {
        setCurrentView('questions');
      }
      return;
    }

    // Otherwise prompt for redemption code
    setIsRedemptionOpen(true);
  };

  const handleResumeSession = () => {
    if (currentSession?.result) {
      setCompletedResult(currentSession.result);
      setCurrentView('report');
    } else if (currentSession?.demographics) {
      setCurrentView('questions');
    } else {
      setCurrentView('onboarding');
    }
  };

  const handleCodeValidated = (
    code: string,
    session?: AssessmentSession,
    status?: string
  ) => {
    setActiveCode(code);
    redemptionService.setCurrentActiveCode(code);

    if (session) {
      setCurrentSession(session);
      if (session.result) {
        setCompletedResult(session.result);
        setCurrentView('report');
        return;
      }
      if (session.demographics) {
        setCurrentView('questions');
        return;
      }
    }

    // New code: proceed to onboarding
    setCurrentView('onboarding');
  };

  const handleOnboardingComplete = async (demographics: Demographics) => {
    const code = activeCode || 'RLP-DEMO01';
    const sess = await redemptionService.startAssessment(code, demographics);
    setCurrentSession(sess);
    setCurrentView('questions');
  };

  const handleSaveProgress = async (answers: UserAnswers, currentQuestion: number) => {
    if (activeCode) {
      await redemptionService.saveProgress(activeCode, answers, currentQuestion);
      if (currentSession) {
        setCurrentSession({
          ...currentSession,
          answers,
          currentQuestion,
        });
      }
    }
  };

  const handleAssessmentFinished = async (answers: UserAnswers) => {
    const code = activeCode || 'RLP-DEMO01';
    setCurrentView('loading');

    // Run completion calculation in background
    setTimeout(async () => {
      const result = await redemptionService.completeAssessment(code, currentSession?.demographics);
      setCompletedResult(result);
    }, 500);
  };

  const handleLoadingFinish = () => {
    setCurrentView('report');
  };

  const handleRetest = () => {
    setCurrentView('landing');
  };

  // Dev bar autofill
  const handleApplyAutofill = async (answers: UserAnswers) => {
    let code = activeCode;
    if (!code) {
      code = 'RLP-DEMO01';
      setActiveCode(code);
      redemptionService.setCurrentActiveCode(code);
      await redemptionService.startAssessment(code, {
        gender: '女性',
        sexualOrientation: '异性恋',
        partnerGenderPreference: '男性',
        relationshipStatus: '恋爱中',
      });
    }

    await handleSaveProgress(answers, 62);
    await handleAssessmentFinished(answers);
  };

  const handleInspectResult = async (code: string) => {
    const sess = await redemptionService.getSession(code);
    if (sess?.result) {
      setCompletedResult(sess.result);
      setCurrentView('report');
    } else {
      // Calculate on the fly if needed
      const res = await redemptionService.completeAssessment(code);
      setCompletedResult(res);
      setCurrentView('report');
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#FFFFFF] text-[#292529] relative selection:bg-[#FFF1F4]">
      {currentView === 'landing' && (
        <LandingPage
          onStart={handleStartFromLanding}
          onEnterCode={() => setIsRedemptionOpen(true)}
          hasExistingSession={Boolean(currentSession)}
          onResume={handleResumeSession}
        />
      )}

      {currentView === 'onboarding' && (
        <OnboardingView
          initialDemographics={currentSession?.demographics}
          onComplete={handleOnboardingComplete}
          onBackToHome={() => setCurrentView('landing')}
        />
      )}

      {currentView === 'questions' && (
        <QuestionEngine
          initialAnswers={currentSession?.answers || {}}
          initialQuestionIndex={currentSession?.currentQuestion || 1}
          onSaveProgress={handleSaveProgress}
          onComplete={handleAssessmentFinished}
          onBackToHome={() => setCurrentView('landing')}
        />
      )}

      {currentView === 'loading' && (
        <LoadingAnimation onFinish={handleLoadingFinish} />
      )}

      {currentView === 'report' && completedResult && (
        <ReportView result={completedResult} onRetest={handleRetest} />
      )}

      {currentView === 'admin' && (
        <AdminPanel
          onBackToApp={() => {
            window.location.hash = '';
            setCurrentView('landing');
          }}
          onInspectResult={handleInspectResult}
        />
      )}

      {/* Redemption Code Dialog */}
      <RedemptionModal
        isOpen={isRedemptionOpen}
        onClose={() => setIsRedemptionOpen(false)}
        onCodeValidated={handleCodeValidated}
      />

      {/* Floating Developer Tools */}
      <DevBar
        onApplyAutofill={handleApplyAutofill}
        onOpenAdmin={() => setCurrentView('admin')}
      />
    </div>
  );
}
