
import React from 'react';
import { CallerInfo } from '../types';
import { ActionButton } from './ActionButton';
import { PhoneIcon, PhoneXMarkIcon, SparklesIcon, UserCircleIcon } from './icons';

interface IncomingCallScreenProps {
  callerInfo: CallerInfo;
  onAnswer: () => void;
  onAnswerWithAnswerForMe: () => void;
  onReject: () => void;
}

export const IncomingCallScreen: React.FC<IncomingCallScreenProps> = ({ callerInfo, onAnswer, onAnswerWithAnswerForMe, onReject }) => {
  return (
    <div className="flex flex-col items-center justify-between h-full p-8 bg-gray-800 rounded-lg shadow-2xl">
      <div className="text-center">
        <UserCircleIcon className="w-24 h-24 mx-auto text-blue-400 mb-4" />
        <h2 className="text-3xl font-bold">{callerInfo.name}</h2>
        <p className="text-xl text-gray-400">{callerInfo.number}</p>
        <p className="text-lg text-yellow-400 mt-2 animate-pulse">Llamada entrante...</p>
      </div>

      <div className="grid grid-cols-3 gap-6 w-full max-w-md mt-10">
        <div className="flex flex-col items-center">
          <ActionButton
            onClick={onReject}
            ariaLabel="Rechazar llamada"
            className="bg-red-500 hover:bg-red-600 active:bg-red-700 text-white focus:ring-red-400"
          >
            <PhoneXMarkIcon className="w-8 h-8" />
          </ActionButton>
          <span className="mt-2 text-sm text-gray-300">Rechazar</span>
        </div>

        <div className="flex flex-col items-center">
          <ActionButton
            onClick={onAnswerWithAnswerForMe}
            ariaLabel="Contestar con AnswerForMe"
            className="bg-purple-500 hover:bg-purple-600 active:bg-purple-700 text-white focus:ring-purple-400"
          >
            <SparklesIcon className="w-8 h-8" />
          </ActionButton>
          <span className="mt-2 text-sm text-center text-gray-300">Contestar con AnswerForMe</span>
        </div>
        
        <div className="flex flex-col items-center">
          <ActionButton
            onClick={onAnswer}
            ariaLabel="Contestar llamada"
            className="bg-green-500 hover:bg-green-600 active:bg-green-700 text-white focus:ring-green-400"
          >
            <PhoneIcon className="w-8 h-8" />
          </ActionButton>
          <span className="mt-2 text-sm text-gray-300">Contestar</span>
        </div>
      </div>
    </div>
  );
};
