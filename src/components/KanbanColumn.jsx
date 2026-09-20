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
      className={`flex flex-col gap-4 p-4 rounded-3xl transition-colors duration-300 min-h-[300px] border-2 
        ${isOver ? 'bg-[var(--color-com-bg)] border-dashed border-[var(--color-com-accent)]' : 'bg-transparent border-transparent'}`}
    >
      <div className="flex items-center justify-between mb-2 px-2">
        <h2 className="font-serif text-lg font-bold text-[var(--color-com-text)]">{titulo}</h2>
        <span className="bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded-full font-bold">
          {React.Children.count(children)}
        </span>
      </div>
      {children}
    </div>
  );
}