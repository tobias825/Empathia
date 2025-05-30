
"use client";

import { cn } from '@/lib/utils';
import React from 'react';

interface FloatingShapesProps {
  variant?: 'chat' | 'layout';
  className?: string;
}

const SoftCircle = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" className={cn("fill-current w-3 h-3", className)}>
    <circle cx="10" cy="10" r="9" />
  </svg>
);

const SoftLine = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 30 10" xmlns="http://www.w3.org/2000/svg" className={cn("stroke-current w-5 h-2", className)} fill="none" strokeWidth="2" strokeLinecap="round">
    <path d="M2 5 Q 15 2, 28 5" />
  </svg>
);

export const FloatingShapes: React.FC<FloatingShapesProps> = ({ variant = 'layout', className }) => {
  if (variant === 'chat') {
    return (
      <div className={cn("absolute inset-0 pointer-events-none overflow-hidden", className)}>
        <SoftCircle className="text-accent/20 absolute top-[5%] left-[8%] opacity-70" />
        <SoftLine className="text-primary/15 absolute top-[12%] right-[10%] opacity-60 transform rotate-[15deg] w-6 h-2.5" />
        <SoftCircle className="text-secondary/30 absolute bottom-[8%] left-[12%] opacity-70 w-2.5 h-2.5" />
        <SoftLine className="text-accent/15 absolute bottom-[15%] right-[5%] opacity-60 transform rotate-[-10deg] w-7" />
        <SoftCircle className="text-primary/15 absolute top-[60%] left-[5%] opacity-60 w-3.5 h-3.5" />
        <SoftLine className="text-secondary/20 absolute bottom-[5%] right-[25%] opacity-50 transform rotate-[5deg]" />
        <SoftCircle className="text-accent/20 absolute top-[30%] right-[15%] opacity-70 w-2 h-2" />
        <SoftLine className="text-primary/10 absolute bottom-[30%] left-[20%] opacity-50 transform rotate-[20deg] w-4" />
      </div>
    );
  }

  // Default layout variant
  return (
    <div className={cn("absolute inset-0 pointer-events-none overflow-hidden", className)}>
      <SoftCircle className="text-primary/10 absolute top-[8%] left-[15%] opacity-50 w-5 h-5" />
      <SoftLine className="text-accent/05 absolute top-[20%] right-[10%] opacity-40 w-10 h-4 transform rotate-[-5deg]" />
      <SoftCircle className="text-secondary/15 absolute bottom-[12%] left-[8%] opacity-50 w-4 h-4" />
      <SoftLine className="text-primary/05 absolute bottom-[8%] right-[20%] opacity-40 w-8 h-3 transform rotate-[10deg]" />
      <SoftCircle className="text-accent/10 absolute top-[65%] right-[5%] opacity-40 w-5 h-5" />
      <SoftLine className="text-secondary/05 absolute bottom-[35%] left-[30%] opacity-30 w-9 h-3.5 transform rotate-[8deg]" />
       <SoftCircle className="text-primary/10 absolute top-[40%] left-[45%] opacity-40 w-3 h-3" />
       <SoftLine className="text-accent/05 absolute top-[55%] right-[40%] opacity-30 w-6 h-2.5 transform rotate-[12deg]" />
    </div>
  );
};
