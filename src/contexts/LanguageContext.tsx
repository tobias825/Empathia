
"use client";
import type { Dispatch, SetStateAction } from 'react';
import React, { createContext, useState, useContext, useEffect } from 'react';

type Language = 'en' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: Dispatch<SetStateAction<Language>>;
  t: (translations: Record<Language, string> | Record<string, Record<Language, string>>, key?: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LANGUAGE_KEY = 'sereno_ai_language';

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('es'); // Default to Spanish

  useEffect(() => {
    const storedLanguage = localStorage.getItem(LANGUAGE_KEY) as Language | null;
    if (storedLanguage && (storedLanguage === 'en' || storedLanguage === 'es')) {
      setLanguage(storedLanguage);
    }
    // Set initial lang attribute on html element
    document.documentElement.lang = storedLanguage || 'es';
  }, []);

  useEffect(() => {
    localStorage.setItem(LANGUAGE_KEY, language);
    document.documentElement.lang = language;
  }, [language]);

  const t = (
    translations: Record<Language, string> | Record<string, Record<Language, string>>,
    key?: string
  ): string => {
    if (key && typeof translations[key] === 'object') {
      const keyTranslations = translations[key] as Record<Language, string>;
      return keyTranslations[language] || keyTranslations['es']; // Fallback to Spanish
    }
    if (!key && typeof translations === 'object' && translations[language] !== undefined) {
       const directTranslations = translations as Record<Language, string>;
      return directTranslations[language] || directTranslations['es']; // Fallback to Spanish
    }
    // Fallback for simple string or missing key
    return typeof translations === 'string' ? translations : (translations['es'] as string) || (key ? String(key) : '');
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
