import React, { useState, useEffect, useCallback, useRef } from 'react'; // Added useRef
import { useTranslation } from 'react-i18next';
import { CallState, CallerInfo } from './types';
import { IncomingCallScreen } from './components/IncomingCallScreen';
import { AnswerForMeScreen } from './components/AnswerForMeScreen';
import { CallActiveScreen } from './components/CallActiveScreen';
import { ActionButton } from './components/ActionButton';
import { PhoneIcon } from './components/icons';

const App: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [callState, setCallState] = useState<CallState>(CallState.IDLE);
  const [currentCaller, setCurrentCaller] = useState<CallerInfo | null>(null);
  const [isMicrophoneActive, setIsMicrophoneActive] = useState<boolean>(false);
  const [callDuration, setCallDuration] = useState<number>(0);
  const callTimerRef = useRef<NodeJS.Timeout | null>(null);

  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
      .toString()
      .padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  const startCallTimer = useCallback(() => {
    setCallDuration(0);
    if (callTimerRef.current) clearInterval(callTimerRef.current);
    callTimerRef.current = setInterval(() => {
      setCallDuration((prev) => prev + 1);
    }, 1000);
  }, []);

  const stopCallTimer = useCallback(() => {
    if (callTimerRef.current) {
      clearInterval(callTimerRef.current);
      callTimerRef.current = null;
    }
  }, []);

  const requestMicrophone = async (): Promise<boolean> => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      // In a real app, you'd use this stream. For now, just confirm access.
      stream.getTracks().forEach((track) => track.stop()); // Release mic immediately
      setIsMicrophoneActive(true);
      return true;
    } catch (err) {
      console.error('Error accessing microphone:', err);
      setIsMicrophoneActive(false);
      alert('No se pudo acceder al micrófono. Por favor, revisa los permisos.');
      return false;
    }
  };

  const handleSimulateIncomingCall = () => {
    const unknownCallers = [
      { id: '1', name: t('unknownCallerName', 'Unknown Number'), number: t('unknownCallerNumber', 'Unknown') },
      { id: '2', name: t('suspiciousCallName', 'Suspicious Call'), number: '+1-555-0100' },
      { id: '3', name: t('privateCallName', 'Private'), number: t('privateCallNumber', 'Hidden') },
    ];
    setCurrentCaller(
      unknownCallers[Math.floor(Math.random() * unknownCallers.length)]
    );
    setCallState(CallState.INCOMING_CALL);
  };

  const resetCallState = useCallback(() => {
    setCallState(CallState.IDLE);
    setCurrentCaller(null);
    setIsMicrophoneActive(false);
    stopCallTimer();
    setCallDuration(0);
  }, [stopCallTimer]);

  const handleEndCallDisplay = useCallback(() => {
    setCallState(CallState.CALL_ENDED_DISPLAY);
    stopCallTimer();
    setTimeout(() => {
      resetCallState();
    }, 2000); // Display "Call Ended" for 2 seconds
  }, [resetCallState, stopCallTimer]);

  const handleAnswerCall = async () => {
    const micGranted = await requestMicrophone();
    if (micGranted) {
      setCallState(CallState.LIVE_CALL);
      startCallTimer();
    } else {
      // If mic not granted, perhaps don't proceed or show error
      // For now, it shows an alert and LIVE_CALL will show mic as inactive
      setCallState(CallState.LIVE_CALL); // Still go to live call screen to show mic status
      startCallTimer(); // Start timer anyway
    }
  };

  const handleAnswerWithAnswerForMe = () => {
    setCallState(CallState.ANSWERFORME_ACTIVE);
  };

  const handleRejectCall = () => {
    handleEndCallDisplay();
  };

  const handleTakeOverCall = async () => {
    const micGranted = await requestMicrophone();
    if (micGranted) {
      setCallState(CallState.LIVE_CALL);
      startCallTimer();
    } else {
      setCallState(CallState.LIVE_CALL);
      startCallTimer();
    }
  };

  const handleHangUp = () => {
    handleEndCallDisplay();
  };

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      stopCallTimer();
    };
  }, [stopCallTimer]);

  const renderContent = () => {
    if (
      !currentCaller &&
      callState !== CallState.IDLE &&
      callState !== CallState.CALL_ENDED_DISPLAY
    ) {
      // Should not happen, but as a fallback
      resetCallState();
      return null;
    }

    switch (callState) {
      case CallState.IDLE:
        return (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <h1 className="text-4xl font-bold a4m__gradient bg-clip-text text-transparent">
              {t('appName')}
            </h1>
            <h2 className="text-2xl text-a4m-accent mb-8 italic font-light">
              {t('appNameSubtitle', 'Call Assistant')}
            </h2>
            <p className="mb-8 text-lg text-gray-300">
              {t('readyToFilter', 'Ready to filter your calls.')}
            </p>
            <ActionButton
              onClick={handleSimulateIncomingCall}
              ariaLabel={t('simulateIncomingCall', 'Simulate incoming call')}
              className="a4m__btn--primary"
            >
              <PhoneIcon className="w-6 h-6" />
              <span>{t('simulateIncomingCall', 'Simulate Incoming Call')}</span>
            </ActionButton>
            <div className="mt-4">
              <button
                className="text-sm underline text-a4m-text"
                onClick={() =>
                  i18n.changeLanguage(i18n.language === 'en' ? 'es' : 'en')
                }
              >
                {i18n.language === 'en' ? 'Español' : 'English'}
              </button>
            </div>
          </div>
        );
      case CallState.INCOMING_CALL:
        return currentCaller ? (
          <IncomingCallScreen
            callerInfo={currentCaller}
            onAnswer={handleAnswerCall}
            onAnswerWithAnswerForMe={handleAnswerWithAnswerForMe}
            onReject={handleRejectCall}
          />
        ) : null;
      case CallState.ANSWERFORME_ACTIVE:
        return currentCaller ? (
          <AnswerForMeScreen
            callerInfo={currentCaller}
            onTakeOverCall={handleTakeOverCall}
            onHangUp={handleHangUp}
          />
        ) : null;
      case CallState.LIVE_CALL:
        return currentCaller ? (
          <CallActiveScreen
            callerInfo={currentCaller}
            isMicrophoneActive={isMicrophoneActive}
            onHangUp={handleHangUp}
            callDuration={formatDuration(callDuration)}
          />
        ) : null;
      case CallState.CALL_ENDED_DISPLAY:
        return (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <h2 className="text-3xl font-bold text-gray-300">
              {t('callEnded', 'Call Ended')}
            </h2>
          </div>
        );
      default:
        // Should not happen with current states, but good for safety
        resetCallState();
        return (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <p className="text-xl text-red-400">
              {t('unknownState', 'Unknown state. Restarting...')}
            </p>
          </div>
        );
    }
  };

  return (
    <div className="mx-auto p-4 max-w-lg h-screen flex flex-col justify-center">
      <div className="bg-red text-a4m-text rounded-xl shadow-2xl overflow-hidden bg-a4m-bg a4m__main-container">
        {renderContent()}
      </div>
    </div>
  );
};

export default App;
