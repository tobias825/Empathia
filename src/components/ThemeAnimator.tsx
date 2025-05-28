
"use client";

import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';

const ICON_SIZE = 48; // Initial size of the animating icon

const ThemeAnimator: React.FC = () => {
  const { animationDetails, completeThemeChange } = useTheme();

  if (!animationDetails.isAnimating || !animationDetails.iconType) {
    return null;
  }

  const IconComponent = animationDetails.iconType === 'sun' ? Sun : Moon;

  // We use CSS variables for start positions to be used in CSS animations
  const style: React.CSSProperties = {
    '--start-x': `${animationDetails.startX}px`,
    '--start-y': `${animationDetails.startY}px`,
    '--icon-size': `${ICON_SIZE}px`,
    position: 'fixed',
    left: 'var(--start-x)',
    top: 'var(--start-y)',
    width: 'var(--icon-size)',
    height: 'var(--icon-size)',
    transformOrigin: 'center center', // Ensures scaling is from the center of the icon
  } as React.CSSProperties;
  

  return (
    <div 
      className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden" // Ensure icon doesn't cause scrollbars
    >
      <IconComponent
        style={style}
        className={cn(
          'theme-transition-icon',
          `theme-transition-${animationDetails.iconType}`,
           // Ensure color is visible on potentially changing background temporarily
          animationDetails.iconType === 'sun' ? 'text-yellow-400' : 'text-slate-400'
        )}
        size={ICON_SIZE}
        onAnimationEnd={completeThemeChange}
      />
    </div>
  );
};

export default ThemeAnimator;
