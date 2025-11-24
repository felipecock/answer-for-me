import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import es from './locales/es.json';

const resources = {
  en: { translation: en },
  es: { translation: es },
};

// Detect previously selected language or fallback to browser preference
const STORAGE_KEY = 'a4m_lang';
let userLang = localStorage.getItem(STORAGE_KEY) as 'en' | 'es' | null;
if (!userLang) {
  userLang = navigator.language.startsWith('es') ? 'es' : 'en';
  localStorage.setItem(STORAGE_KEY, userLang);
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: userLang,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

// Persist language changes
i18n.on('languageChanged', (lng) => {
  try {
    localStorage.setItem(STORAGE_KEY, lng);
  } catch {
    // ignore persistence issues
  }
});

export default i18n;
