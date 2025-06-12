import React from 'react';
import { CallerInfo } from '../types';
import { ActionButton } from './ActionButton';
import { MicrophoneIcon, PhoneXMarkIcon, UserCircleIcon } from './icons';

interface CallActiveScreenProps {
  callerInfo: CallerInfo;
  isMicrophoneActive: boolean;
  onHangUp: () => void;
  callDuration: string;
}

export const CallActiveScreen: React.FC<CallActiveScreenProps> = ({ callerInfo, isMicrophoneActive, onHangUp, callDuration }) => {
  return (
    <div className="flex flex-col items-center justify-between h-full p-8 a4m__body rounded-lg shadow-2xl">
      <div className="text-center">
        <UserCircleIcon className="w-24 h-24 mx-auto" style={{ color: 'var(--a4m-accent)' }} />
        <h2 className="text-3xl font-bold">{callerInfo.name}</h2>
        <p className="text-xl text-gray-400">{callerInfo.number}</p>
        <p className="text-2xl text-white mt-4">{callDuration}</p>
      </div>

      <div className="my-6 flex items-center space-x-2 p-3 bg-gray-700 rounded-lg">
        <MicrophoneIcon className={`w-6 h-6 ${isMicrophoneActive ? 'text-green-400 animate-pulse' : 'text-red-400'}`} />
        <span className={`text-sm ${isMicrophoneActive ? 'text-green-300' : 'text-red-300'}`}>
          Micrófono: {isMicrophoneActive ? 'Activado' : 'Desactivado (Error o no permitido)'}
        </span>
      </div>
      
      <div className="flex flex-col items-center mt-10">
        <ActionButton
          onClick={onHangUp}
          ariaLabel="Colgar llamada"
          className="a4m__btn--rounded bg-red-500 hover:bg-red-600 active:bg-red-700 text-white focus:ring-red-400"
        >
          <PhoneXMarkIcon className="w-10 h-10" />
        </ActionButton>
        <span className="mt-2 text-sm text-gray-300">Colgar</span>
      </div>
    </div>
  );
};
