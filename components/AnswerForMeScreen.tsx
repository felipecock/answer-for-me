import React, { useEffect, useState, useRef } from 'react';
import { CallerInfo } from '../types';
import { ActionButton } from './ActionButton';
import { MicrophoneIcon, PhoneXMarkIcon, UserCircleIcon } from './icons';
import { ANSWERFORME_GREETING_TEXT, ANSWERFORME_GREETING_AUDIO_SRC } from '../constants';

interface AnswerForMeScreenProps {
  callerInfo: CallerInfo;
  onTakeOverCall: () => void;
  onHangUp: () => void;
}

export const AnswerForMeScreen: React.FC<AnswerForMeScreenProps> = ({ callerInfo, onTakeOverCall, onHangUp }) => {
  const [isPlayingGreeting, setIsPlayingGreeting] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(ANSWERFORME_GREETING_AUDIO_SRC);
    audioRef.current.play().catch(error => console.warn("Audio play failed:", error)); // Autoplay might be blocked

    const audioDurationSimulator = ANSWERFORME_GREETING_TEXT.length * 70; // Approximate duration
    
    const timer = setTimeout(() => {
      setIsPlayingGreeting(false);
    }, audioDurationSimulator);

    return () => {
      clearTimeout(timer);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-between h-full p-8 a4m__body rounded-lg shadow-2xl">
      <div className="text-center">
        <UserCircleIcon className="w-24 h-24 mx-auto" style={{ color: 'var(--a4m-primary)' }} />
        <h2 className="text-3xl font-bold">{callerInfo.name}</h2>
        <p className="text-xl text-gray-400">{callerInfo.number}</p>
        {isPlayingGreeting && (
          <p className="text-lg text-yellow-400 mt-4 animate-pulse">Reproduciendo saludo...</p>
        )}
      </div>

      <div className="my-6 p-4 bg-gray-700 rounded-lg text-center">
        <p className="text-lg text-gray-200">{ANSWERFORME_GREETING_TEXT}</p>
        {!isPlayingGreeting && (
           <p className="text-md text-blue-300 mt-3">Esperando respuesta del llamante...</p>
        )}
      </div>
      
      <div className="grid grid-cols-2 gap-6 w-full max-w-xs mt-10">
        <div className="flex flex-col items-center">
          <ActionButton
            onClick={onHangUp}
            ariaLabel="Colgar llamada"
            className="a4m__btn--rounded bg-red-500 hover:bg-red-600 active:bg-red-700 text-white focus:ring-red-400"
          >
            <PhoneXMarkIcon className="w-8 h-8" />
          </ActionButton>
          <span className="mt-2 text-sm text-gray-300">Colgar</span>
        </div>
        <div className="flex flex-col items-center">
          <ActionButton
            onClick={onTakeOverCall}
            ariaLabel="Tomar llamada"
            className="a4m__btn--rounded bg-green-500 hover:bg-green-600 active:bg-green-700 text-white focus:ring-green-400"
            disabled={isPlayingGreeting}
          >
            <MicrophoneIcon className="w-8 h-8" />
          </ActionButton>
          <span className="mt-2 text-sm text-gray-300">Tomar llamada</span>
        </div>
      </div>
    </div>
  );
};
