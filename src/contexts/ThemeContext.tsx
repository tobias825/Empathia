
"use client";

import React, { createContext, useState, useContext, useEffect, useRef, type Dispatch, type SetStateAction } from 'react';
import type { LucideProps } from 'lucide-react'; // For icon props

type Theme = 'light' | 'dark';

interface AnimationDetails {
  isAnimating: boolean;
  iconType: 'sun' | 'moon' | null;
  startX: number;
  startY: number;
  targetTheme: Theme | null;
}

interface ThemeContextType {
  theme: Theme;
  animationDetails: AnimationDetails;
  toggleTheme: (event?: React.MouseEvent<HTMLButtonElement>) => void;
  completeThemeChange: () => void;
  // No longer exposing setTheme directly to prevent bypassing animation
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_KEY = 'empathia_theme';
const initialAnimationDetails: AnimationDetails = {
  isAnimating: false,
  iconType: null,
  startX: 0,
  startY: 0,
  targetTheme: null,
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('light'); // Default to light
  const [animationDetails, setAnimationDetails] = useState<AnimationDetails>(initialAnimationDetails);
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

  const toggleTheme = (event?: React.MouseEvent<HTMLButtonElement>) => {
    if (animationDetails.isAnimating || !isMounted.current) return;

    const button = event?.currentTarget;
    const rect = button?.getBoundingClientRect();
    const iconSize = button ? Math.min(button.offsetWidth, button.offsetHeight) * 0.8 : 24; // Estimate icon size from button

    // Position icon to start from center of the button
    const sX = rect ? rect.left + (rect.width - iconSize) / 2 : (window.innerWidth - iconSize) / 2;
    const sY = rect ? rect.top + (rect.height - iconSize) / 2 : (window.innerHeight - iconSize) / 2;

    const nextTheme = theme === 'light' ? 'dark' : 'light';
    const iconToAnimate = theme === 'light' ? 'moon' : 'sun';

    setAnimationDetails({
      isAnimating: true,
      iconType: iconToAnimate,
      startX: sX,
      startY: sY,
      targetTheme: nextTheme,
    });
  };

  const completeThemeChange = () => {
    if (animationDetails.targetTheme) {
      actualSetTheme(animationDetails.targetTheme);
    }
    setAnimationDetails(initialAnimationDetails); // Reset animation state
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
    <ThemeContext.Provider value={{ theme, animationDetails, toggleTheme, completeThemeChange }}>
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
