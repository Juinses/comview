// src/components/ComissionCard.jsx
import React, { useContext } from 'react';
import { ContextoEncargos } from '../contexto/encargos_context';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

export default function ComissionCard({ encargo, vista_actual, al_seleccionar }) {
  const { avanzar_fase, archivar_encargo, restaurar_encargo } = useContext(ContextoEncargos);
  const fases = ['Boceto', 'Lineart', 'Color', 'Terminado'];
  const esta_terminado = encargo.fase === fases.length - 1;

  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: encargo.id,
    disabled: vista_actual === 'historial'
  });

  const estilo_movimiento = {
    transform: isDragging 
      ? `${CSS.Translate.toString(transform)} rotate(3deg) scale(1.02)` 
      : CSS.Translate.toString(transform),
    transition: isDragging ? 'none' : 'all 0.3s cubic-bezier(0.25, 1, 0.5, 1)',
    opacity: isDragging ? 0.9 : 1,
    zIndex: isDragging ? 50 : 1,
    boxShadow: isDragging ? '0 25px 50px -12px rgba(92, 58, 88, 0.15)' : '',
  };

  return (
    <div 
      ref={setNodeRef} 
      style={estilo_movimiento}
      {...listeners} 
      {...attributes}
      onClick={() => al_seleccionar && al_seleccionar(encargo)}
      className={`bg-[var(--color-com-card)] rounded-2xl p-5 w-full border border-[var(--color-com-border)] shadow-sm transition-all flex flex-col h-full relative group cursor-pointer 
        ${vista_actual === 'historial' ? 'opacity-80 hover:opacity-100' : 'hover:-translate-y-1 hover:shadow-md'}`}
    >
      
      {/* Botones Flotantes (Archivar / Restaurar) */}
      {vista_actual === 'activas' ? (
        <button 
          onClick={(e) => { e.stopPropagation(); archivar_encargo(encargo.id); }}
          className="absolute -top-3 -right-3 p-1.5 bg-[var(--color-com-surface-alt)] border border-[var(--color-com-border)] text-[var(--color-com-muted)] hover:bg-red-50 hover:text-red-500 rounded-full transition-all opacity-0 group-hover:opacity-100 z-10 shadow-sm"
          title="Archivar encargo"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
        </button>
      ) : (
        <button 
          onClick={(e) => { e.stopPropagation(); restaurar_encargo(encargo.id); }}
          className="absolute -top-3 -right-3 p-1.5 bg-[var(--color-com-surface-alt)] border border-[var(--color-com-border)] text-[var(--color-com-muted)] hover:bg-green-50 hover:text-green-500 rounded-full transition-all opacity-0 group-hover:opacity-100 z-10 shadow-sm"
          title="Restaurar al tablero"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
        </button>
      )}

      {/* Cabecera estructurada con truncamiento para nombres largos */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1 min-w-0 pr-2">
          <h3 className="font-serif text-lg font-bold text-[var(--color-com-text)] leading-tight truncate">
            {encargo.cliente}
          </h3>
          <p className="font-sans text-[10px] text-[var(--color-com-muted)] mt-0.5">Encargo #{encargo.id?.toString().slice(0,6)}</p>
        </div>
        <span className={`flex-shrink-0 px-2.5 py-1 rounded-full font-sans text-[10px] font-bold tracking-wide transition-colors border shadow-sm
          ${esta_terminado 
            ? 'bg-[var(--color-com-text)] text-white border-[var(--color-com-text)]' 
            : 'bg-[#D4E0D1] text-[var(--color-com-accent-dark)] border-[var(--color-com-accent)]/30'}`}
        >
          {fases[encargo.fase]}
        </span>
      </div>

      <p className="font-sans text-[var(--color-com-muted)] text-xs mb-4 leading-relaxed flex-grow line-clamp-2">
        {encargo.descripcion}
      </p>

      {/* Metadatos anclados al fondo */}
      <div className="flex justify-between items-end border-t border-[var(--color-com-divider)] pt-3 mb-4 mt-auto">
        <div className="flex flex-col">
          <span className="font-sans text-[9px] uppercase tracking-wider text-[var(--color-com-muted)] mb-0.5">Entrega</span>
          <span className="font-sans text-xs font-semibold text-[var(--color-com-text)] flex items-center gap-1">
             <svg className="w-3 h-3 text-[var(--color-com-accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
             {encargo.fecha}
          </span>
        </div>
        <div className="flex flex-col text-right">
          <span className="font-sans text-[9px] uppercase tracking-wider text-[var(--color-com-muted)] mb-0.5">Precio</span>
          <span className="font-sans text-sm font-bold text-[var(--color-com-action)]">
            ${encargo.precio}
          </span>
        </div>
      </div>

      <button 
        onClick={(e) => { e.stopPropagation(); avanzar_fase(encargo.id); }}
        disabled={esta_terminado || vista_actual === 'historial'}
        className={`w-full font-sans text-xs font-semibold py-2.5 rounded-xl transition-all flex justify-center items-center gap-1.5 shadow-sm
          ${(esta_terminado || vista_actual === 'historial')
            ? 'bg-[var(--color-com-surface-alt)] text-[var(--color-com-muted)] cursor-not-allowed border border-transparent' 
            : 'bg-[var(--color-com-action)] hover:bg-[var(--color-com-action-hover)] text-white border border-transparent'
          }`}
      >
        {esta_terminado ? (
          <>
             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
             Completado
          </>
        ) : (
           <>Avanzar estado <span>→</span></>
        )}
      </button>
    </div>
  );
}