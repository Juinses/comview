import React from 'react';

export const LeafTopLeft = () => (
  <svg className="absolute top-0 left-0 text-[var(--color-com-action)] opacity-10 w-48 h-48 md:w-64 md:h-64 pointer-events-none -translate-x-10 -translate-y-10" viewBox="0 0 100 100" fill="currentColor">
    <path d="M 0,0 C 40,0 70,30 70,70 C 40,90 10,60 0,0 Z" />
    <path d="M 10,10 C 50,0 80,30 50,80 C 20,60 0,40 10,10 Z" opacity="0.5"/>
  </svg>
);

export const LeafBottomRight = () => (
  <svg className="absolute bottom-0 right-0 text-[var(--color-com-accent)] opacity-10 w-56 h-56 md:w-72 md:h-72 pointer-events-none translate-x-10 translate-y-10" viewBox="0 0 100 100" fill="currentColor">
    <path d="M 100,100 C 60,100 30,70 30,30 C 60,10 90,40 100,100 Z" />
    <path d="M 90,90 C 50,100 20,70 50,20 C 80,40 100,60 90,90 Z" opacity="0.5"/>
  </svg>
);