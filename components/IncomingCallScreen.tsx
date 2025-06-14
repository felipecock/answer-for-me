import React from 'react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center justify-between h-full p-8 a4m__body rounded-lg shadow-2xl">
      <div className="text-center">
        <UserCircleIcon className="w-24 h-24 mx-auto" style={{ color: 'var(--a4m-primary)' }} />
        <h2 className="text-3xl font-bold">{callerInfo.name}</h2>
        <p className="text-xl text-gray-400">{callerInfo.number}</p>
        <p className="text-lg text-yellow-400 mt-2 animate-pulse">{t('incomingCall')}</p>
      </div>

      <div className="grid grid-cols-3 gap-6 w-full max-w-md mt-10">
        <div className="flex flex-col items-center">
          <ActionButton
            onClick={onReject}
            ariaLabel={t('reject')}
            className="a4m__btn a4m__btn--rounded bg-red-500 hover:bg-red-600 active:bg-red-700 text-white focus:ring-red-400"
          >
            <PhoneXMarkIcon className="w-8 h-8" />
          </ActionButton>
          <span className="mt-2 text-sm text-gray-300">{t('reject')}</span>
        </div>

        <div className="flex flex-col items-center">
          <ActionButton
            onClick={onAnswerWithAnswerForMe}
            ariaLabel={t('answerWithA4M')}
            className="a4m__btn a4m__btn--rounded bg-a4m-primary hover:bg-a4m-accent active:bg-a4m-gray text-white focus:ring-a4m-primary"
          >
            <SparklesIcon className="w-8 h-8" />
          </ActionButton>
          <span className="mt-2 text-sm text-center text-gray-300">{t('answerWithA4M')}</span>
        </div>
        
        <div className="flex flex-col items-center">
          <ActionButton
            onClick={onAnswer}
            ariaLabel={t('answer')}
            className="a4m__btn a4m__btn--rounded bg-green-500 hover:bg-green-600 active:bg-green-700 text-white focus:ring-green-400"
          >
            <PhoneIcon className="w-8 h-8" />
          </ActionButton>
          <span className="mt-2 text-sm text-gray-300">{t('answer')}</span>
        </div>
      </div>
    </div>
  );
};
