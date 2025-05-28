
"use client";

import React, { createContext, useState, useContext, useEffect, useRef, type Dispatch, type SetStateAction } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_KEY = 'empathia_theme';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('light'); // Default to light
  const isMounted = useRef(false);

  useEffect(() => {
    // Client-side only effect for initial theme load
    const storedTheme = localStorage.getItem(THEME_KEY) as Theme | null;
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    let initialTheme: Theme;
    if (storedTheme) {
      initialTheme = storedTheme;
    } else if (prefersDark) {
      initialTheme = 'dark';
    } else {
      initialTheme = 'light';
    }
    setThemeState(initialTheme);
    // Apply initial class after ensuring we're on client and theme is set
    if (initialTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    isMounted.current = true;
  }, []);

  const actualSetTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem(THEME_KEY, newTheme);
  };

  const toggleTheme = () => {
    if (!isMounted.current) return;
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    actualSetTheme(nextTheme);
  };
  
  // Ensure theme class is correct if theme changes externally or on load
  // This effect runs after initial mount and when theme state changes
  useEffect(() => {
    if (!isMounted.current) return; // Only run after initial theme set from localStorage/prefers

    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);


  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
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
