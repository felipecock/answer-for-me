import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import es from './locales/es.json';

const resources = {
  en: { translation: en },
  es: { translation: es },
};

// Default language is English
const userLang = navigator.language.startsWith('es') ? 'es' : 'en';

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

export default i18n;
