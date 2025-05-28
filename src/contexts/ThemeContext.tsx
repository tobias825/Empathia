
"use client";

import React, { createContext, useState, useContext, useEffect, type Dispatch, type SetStateAction } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_KEY = 'empathia_theme';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('light'); // Default to light

  useEffect(() => {
    // This effect runs only on the client
    const storedTheme = localStorage.getItem(THEME_KEY) as Theme | null;
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (storedTheme) {
      setThemeState(storedTheme);
    } else if (prefersDark) {
      setThemeState('dark');
    } else {
      setThemeState('light'); // Explicitly set to light if no preference or storage
    }
  }, []);

  useEffect(() => {
    // This effect also runs only on the client
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  const toggleTheme = () => {
    setThemeState(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // Initialize with light to prevent flash of unstyled content or mismatched server/client render.
  // The actual theme is applied via useEffect on the client.
  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
