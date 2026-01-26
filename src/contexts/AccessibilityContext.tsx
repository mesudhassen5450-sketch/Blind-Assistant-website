import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type MagnificationLevel = '1x' | '1.25x' | '1.5x' | '1.75x' | '2x';
type Theme = 'dark' | 'light' | 'high-contrast';
type Language = 'en' | 'am' | 'om';

interface AccessibilityContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  magnification: MagnificationLevel;
  setMagnification: (level: MagnificationLevel) => void;
  increaseMagnification: () => void;
  decreaseMagnification: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

const magnificationLevels: MagnificationLevel[] = ['1x', '1.25x', '1.5x', '1.75x', '2x'];

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('theme') as Theme) || 'dark';
    }
    return 'dark';
  });

  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('language') as Language) || 'en';
    }
    return 'en';
  });

  const [magnification, setMagnificationState] = useState<MagnificationLevel>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('magnification') as MagnificationLevel) || '1x';
    }
    return '1x';
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('light', 'high-contrast');
    if (theme !== 'dark') {
      root.classList.add(theme);
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('lang', language);
    // All current supported languages (EN, AM, OM) are LTR
    root.setAttribute('dir', 'ltr');
    localStorage.setItem('language', language);
  }, [language]);

  useEffect(() => {
    const root = document.documentElement;
    magnificationLevels.forEach(level => {
      root.classList.remove(`magnify-${level.replace('.', '-')}`);
    });
    root.classList.add(`magnify-${magnification.replace('.', '-')}`);
    localStorage.setItem('magnification', magnification);
  }, [magnification]);

  const setTheme = (newTheme: Theme) => setThemeState(newTheme);
  const setLanguage = (lang: Language) => setLanguageState(lang);

  const setMagnification = (level: MagnificationLevel) => {
    setMagnificationState(level);
  };

  const increaseMagnification = () => {
    const currentIndex = magnificationLevels.indexOf(magnification);
    if (currentIndex < magnificationLevels.length - 1) {
      setMagnificationState(magnificationLevels[currentIndex + 1]);
    }
  };

  const decreaseMagnification = () => {
    const currentIndex = magnificationLevels.indexOf(magnification);
    if (currentIndex > 0) {
      setMagnificationState(magnificationLevels[currentIndex - 1]);
    }
  };

  return (
    <AccessibilityContext.Provider
      value={{
        theme,
        setTheme,
        language,
        setLanguage,
        magnification,
        setMagnification,
        increaseMagnification,
        decreaseMagnification,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
}
