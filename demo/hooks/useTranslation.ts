import { useLanguage } from '../contexts/LanguageContext';
import { translations, TranslationKey } from '../utils/translations';

export const useTranslation = () => {
  const { language } = useLanguage();

  const t = (key: TranslationKey, params?: Record<string, string | number>) => {
    let translation = translations[language][key] || key;

    if (params) {
      Object.entries(params).forEach(([param, value]) => {
        translation = translation.replace(`{${param}}`, String(value));
      });
    }

    return translation;
  };

  return { t };
};

