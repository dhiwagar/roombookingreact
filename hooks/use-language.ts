'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { translations, Language, TranslationKey } from '@/lib/translations';
import React from 'react';

interface LanguageStore {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: TranslationKey) => string;
}

export const useLanguage = create<LanguageStore>()(
  persist(
    (set, get) => ({
      language: 'en',
      setLanguage: (language: Language) => set({ language }),
      t: (key: TranslationKey) => {
        const { language } = get();
        return translations[language][key] || translations.en[key] || key;
      },
    }),
    {
      name: 'villa-shanti-language',
      skipHydration: true,
    }
  )
);

export const useLanguageHydration = () => {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);

    // Listen for the custom hydration event
    const handleHydration = () => {
      setMounted(true);
    };

    window.addEventListener('zustand-hydrated', handleHydration);

    return () => {
      window.removeEventListener('zustand-hydrated', handleHydration);
    };
  }, []);

  return mounted;
};