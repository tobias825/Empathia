
"use client";

import React from 'react';

export const CalmingSwirls = () => (
  <svg width="120" height="60" viewBox="0 0 120 60" xmlns="http://www.w3.org/2000/svg" className="text-accent/60 dark:text-accent/50 group-hover:text-accent transition-colors duration-300">
     <style>{`
      .swirl-path { transition: stroke 0.3s ease, opacity 0.3s ease; }
      g:hover .swirl-path { stroke: hsl(var(--primary)); opacity: 1; }
    `}</style>
    <g>
      <path d="M10 30 Q 25 10, 40 30 T 70 30 Q 85 50, 100 30 T 110 30" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" className="swirl-path"/>
      <path d="M15 40 Q 30 20, 45 40 T 75 40 Q 90 60, 105 40 T 115 40" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.6" className="swirl-path"/>
    </g>
  </svg>
);
