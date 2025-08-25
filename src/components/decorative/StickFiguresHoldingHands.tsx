
"use client";

import React from 'react';

export const StickFiguresHoldingHands = () => (
  <svg width="180" height="70" viewBox="0 0 180 70" xmlns="http://www.w3.org/2000/svg" className="text-primary/70 dark:text-primary/60 group-hover:text-primary transition-colors duration-300">
    <style>{`
      .person-group circle { transition: fill 0.3s ease; }
      .person-group line { transition: stroke 0.3s ease; }
      .person-group:hover circle { fill: hsl(var(--accent)); }
      .person-group:hover line { stroke: hsl(var(--accent)); }
    `}</style>
    <g className="person-group">
      <circle cx="30" cy="20" r="8" fill="currentColor" />
      <line x1="30" y1="28" x2="30" y2="50" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
      <line x1="18" y1="38" x2="30" y2="35" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
      <line x1="42" y1="38" x2="30" y2="35" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
      <line x1="30" y1="50" x2="20" y2="60" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
      <line x1="30" y1="50" x2="40" y2="60" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
    </g>    
    <g className="person-group">
      <circle cx="90" cy="20" r="8" fill="currentColor" />
      <line x1="90" y1="28" x2="90" y2="50" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
      <line x1="78" y1="38" x2="90" y2="35" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
      <line x1="102" y1="38" x2="90" y2="35" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
      <line x1="90" y1="50" x2="80" y2="60" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
      <line x1="90" y1="50" x2="100" y2="60" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
    </g>
    <g className="person-group">
      <circle cx="150" cy="20" r="8" fill="currentColor" />
      <line x1="150" y1="28" x2="150" y2="50" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
      <line x1="138" y1="38" x2="150" y2="35" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
      <line x1="162" y1="38" x2="150" y2="35" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
      <line x1="150" y1="50" x2="140" y2="60" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
      <line x1="150" y1="50" x2="160" y2="60" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
    </g>
    <line x1="42" y1="36" x2="78" y2="36" stroke="currentColor" strokeWidth="2.5" strokeDasharray="3 3" strokeLinecap="round"/>
    <line x1="102" y1="36" x2="138" y2="36" stroke="currentColor" strokeWidth="2.5" strokeDasharray="3 3" strokeLinecap="round"/>
  </svg>
);
