// src/components/KanbanColumn.jsx
import React from 'react';
import { useDroppable } from '@dnd-kit/core';

export default function KanbanColumn({ id_columna, titulo, children }) {
  const { isOver, setNodeRef } = useDroppable({
    id: id_columna,
  });

  return (
    <div 
      ref={setNodeRef} 
      className={`flex flex-col rounded-3xl transition-all duration-300 min-h-[450px] overflow-hidden border border-[var(--color-com-border)]
        ${isOver 
          ? 'bg-[var(--color-com-surface-alt)] shadow-inner ring-2 ring-[var(--color-com-accent)]/40' 
          : 'bg-[var(--color-com-card)] shadow-sm'
        }`}
    >
      {/* Cabecera Orgánica de la columna */}
      <div className="bg-[var(--color-com-accent)] py-3 px-5 flex items-center justify-between">
        <h2 className="font-sans text-lg font-bold text-white tracking-wide">
          {titulo}
        </h2>
        <span className="bg-white/20 text-white text-xs px-2.5 py-1 rounded-full font-bold shadow-sm">
          {React.Children.count(children)}
        </span>
      </div>
      
      {/* Zona de soltar tarjetas (cuerpo de la columna) */}
      <div className="flex-1 p-4 flex flex-col gap-4 overflow-y-auto">
        {children}
      </div>
    </div>
  );
}