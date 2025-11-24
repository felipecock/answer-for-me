import React from 'react';
import { useTranslation } from 'react-i18next';
import { ActionButton } from './ActionButton';

interface SettingsMenuProps {
  onClose: () => void;
}

export const SettingsMenu: React.FC<SettingsMenuProps> = ({ onClose }) => {
  const { t, i18n } = useTranslation();
  const current = i18n.language;

  const changeLanguage = (lng: 'en' | 'es') => {
    if (lng !== current) {
      i18n.changeLanguage(lng);
    }
  };

  return (
    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-20">
      <div className="bg-a4m-bg border border-a4m-gray rounded-xl p-6 w-full max-w-sm shadow-xl relative">
        <h2 className="text-2xl font-bold mb-4 text-a4m-text">{t('ui.settingsTitle')}</h2>
        <div className="mb-6">
          <p className="text-sm text-gray-300 mb-2">{t('ui.chooseLanguage')}</p>
          <div className="flex flex-col gap-2">
            <button
              onClick={() => changeLanguage('en')}
              className={`text-left px-4 py-2 rounded-md border ${current==='en' ? 'bg-a4m-primary text-white border-a4m-primary' : 'bg-a4m-gray/40 text-gray-200 border-a4m-gray/60'}`}
            >{t('ui.english')}</button>
            <button
              onClick={() => changeLanguage('es')}
              className={`text-left px-4 py-2 rounded-md border ${current==='es' ? 'bg-a4m-primary text-white border-a4m-primary' : 'bg-a4m-gray/40 text-gray-200 border-a4m-gray/60'}`}
            >{t('ui.spanish')}</button>
          </div>
        </div>
        <ActionButton
          ariaLabel={t('ui.closeSettings')}
          onClick={onClose}
          className="a4m__btn--primary w-full"
        >{t('ui.closeSettings')}</ActionButton>
      </div>
    </div>
  );
};