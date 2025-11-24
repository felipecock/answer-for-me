import React, { useState, useEffect, useCallback, useRef } from 'react'; // Added useRef
import { useTranslation } from 'react-i18next';
import { CallState, CallerInfo } from './types';
import { IncomingCallScreen } from './components/IncomingCallScreen';
import { AnswerForMeScreen } from './components/AnswerForMeScreen';
import { CallActiveScreen } from './components/CallActiveScreen';
import { ActionButton } from './components/ActionButton';
import { PhoneIcon, GearIcon } from './components/icons';
import { SettingsMenu } from './components/SettingsMenu';

const App: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [callState, setCallState] = useState<CallState>(CallState.IDLE);
  const [currentCaller, setCurrentCaller] = useState<CallerInfo | null>(null);
  const [isMicrophoneActive, setIsMicrophoneActive] = useState<boolean>(false);
  const [callDuration, setCallDuration] = useState<number>(0);
  const [showSettings, setShowSettings] = useState<boolean>(false);
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
      { id: '1', name: t('callers.unknownCallerName'), number: t('callers.unknownCallerNumber') },
      { id: '2', name: t('callers.suspiciousCallName'), number: '+1-555-0100' },
      { id: '3', name: t('callers.privateCallName'), number: t('callers.privateCallNumber') },
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
              {t('app.name')}
            </h1>
            <h2 className="text-2xl text-a4m-accent mb-8 italic font-light">
              {t('app.subtitle')}
            </h2>
            <p className="mb-8 text-lg text-gray-300">
              {t('ui.readyToFilter')}
            </p>
            <ActionButton
              onClick={handleSimulateIncomingCall}
              ariaLabel={t('ui.simulateIncomingCall')}
              className="a4m__btn--primary"
            >
              <PhoneIcon className="w-6 h-6" />
              <span>{t('ui.simulateIncomingCall')}</span>
            </ActionButton>
            <div className="mt-6">
              <button
                className="text-sm text-a4m-text flex items-center gap-2 border border-a4m-gray px-3 py-2 rounded-md hover:bg-a4m-gray/30"
                onClick={() => setShowSettings(true)}
              >
                <GearIcon className="w-5 h-5" /> {t('ui.openSettings')}
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
              {t('ui.callEnded')}
            </h2>
          </div>
        );
      default:
        // Should not happen with current states, but good for safety
        resetCallState();
        return (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <p className="text-xl text-red-400">
              {t('ui.unknownState')}
            </p>
          </div>
        );
    }
  };

  return (
    <div className="mx-auto p-4 max-w-lg h-screen flex flex-col justify-center relative">
      <div className="bg-red text-a4m-text rounded-xl shadow-2xl overflow-hidden bg-a4m-bg a4m__main-container relative">
        {/* Settings toggle floating button (visible in any state) */}
        <button
          aria-label={t('ui.openSettings')}
          onClick={() => setShowSettings(true)}
          className="absolute top-3 right-3 p-2 rounded-md bg-a4m-gray/40 hover:bg-a4m-gray/60 focus:outline-none"
        >
            <GearIcon className="w-6 h-6" />
        </button>
        {renderContent()}
        {showSettings && <SettingsMenu onClose={() => setShowSettings(false)} />}
      </div>
    </div>
  );
};

export default App;
