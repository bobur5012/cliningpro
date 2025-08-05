import { createContext, useContext } from 'react';
import { siteData } from '@/config/site-data';

export type Language = 'ru' | 'uz';

export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const getTranslation = (key: string, language: Language): string => {
  const translation = siteData.translations[key];
  if (!translation) {
    console.warn(`Translation not found for key: ${key}`);
    return key;
  }
  return translation[language] || translation.ru || key;
};