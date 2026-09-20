// src/components/EncargoModal.jsx
import React from 'react';

export default function EncargoModal({ encargo, al_cerrar }) {
  if (!encargo) return null;

  const fases = ['Boceto', 'Lineart', 'Color', 'Terminado'];
  const esta_terminado = encargo.fase === fases.length - 1;

  return (
    // Fondo oscuro con desenfoque. Al hacer clic fuera de la caja blanca, se cierra.
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm transition-all"
      onClick={al_cerrar}
    >
      {/* Detenemos la propagación aquí para que dar clic dentro del modal no lo cierre */}
      <div 
        className="bg-[var(--color-com-bg)] rounded-3xl p-8 max-w-2xl w-full border border-white/50 shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={al_cerrar} 
          className="absolute top-6 right-6 p-2 text-gray-400 hover:text-[var(--color-com-text)] bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>

        <header className="mb-8 pr-10">
          <h2 className="font-serif text-3xl font-bold text-[var(--color-com-text)] mb-2">
            {encargo.cliente}
          </h2>
          <div className="flex items-center gap-3">
            <span className="font-sans text-sm text-gray-400">Encargo #{encargo.id}</span>
            <span className={`${esta_terminado ? 'bg-[var(--color-com-text)]' : 'bg-[var(--color-com-accent)]'} text-white text-xs px-3 py-1 rounded-full font-sans font-medium tracking-wide`}>
              Fase actual: {fases[encargo.fase]}
            </span>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h3 className="font-sans text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Descripción completa</h3>
            <p className="font-sans text-gray-600 text-sm leading-relaxed p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
              {encargo.descripcion}
            </p>
            
            {/* Espacio preparado para futuras expansiones (Notas del artista) */}
            <h3 className="font-sans text-xs font-semibold text-gray-500 uppercase tracking-wider mt-6 mb-3">Notas de Referencia</h3>
            <textarea 
              className="w-full font-sans text-gray-600 text-sm leading-relaxed p-4 bg-white rounded-2xl border border-gray-100 shadow-sm resize-none outline-none focus:ring-2 focus:ring-[var(--color-com-accent)]" 
              rows="3" 
              placeholder="Añade enlaces o notas extra aquí (Próximamente)..."
              disabled
            ></textarea>
          </div>

          <div className="flex flex-col gap-6">
            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
              <span className="block font-sans text-[10px] uppercase tracking-wider text-gray-400 mb-1">Fecha de Entrega</span>
              <span className="font-sans text-lg font-medium text-[var(--color-com-text)]">{encargo.fecha}</span>
            </div>
            
            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
              <span className="block font-sans text-[10px] uppercase tracking-wider text-gray-400 mb-1">Valor Total</span>
              <span className="font-sans text-2xl font-bold text-[var(--color-com-action)]">${encargo.precio}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}