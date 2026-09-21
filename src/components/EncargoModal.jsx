// src/components/EncargoModal.jsx
import React, { useState } from 'react';

export default function EncargoModal({ encargo, al_cerrar, al_actualizar }) {
  if (!encargo) return null;

  const [datos_editables, set_datos_editables] = useState({
    descripcion: encargo.descripcion || '',
    notas: encargo.notas || ''
  });
  const [guardando, set_guardando] = useState(false);

  const fases = ['Boceto', 'Lineart', 'Color', 'Terminado'];
  const esta_terminado = encargo.fase === fases.length - 1;

  const manejar_cambio = (campo, valor) => {
    set_datos_editables(prev => ({ ...prev, [campo]: valor }));
  };

  const manejar_guardado = async () => {
    if (al_actualizar) {
      set_guardando(true);
      try {
        await al_actualizar(encargo.id, datos_editables);
      } finally {
        set_guardando(false);
        al_cerrar();
      }
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[var(--color-com-text)]/20 backdrop-blur-md transition-all"
      onClick={al_cerrar}
    >
      <div 
        className="bg-[var(--color-com-card)] rounded-[2rem] p-8 max-w-3xl w-full border border-[var(--color-com-border)] shadow-2xl shadow-[var(--color-com-action)]/10 relative overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botón de cierre sutil */}
        <button 
          onClick={al_cerrar} 
          className="absolute top-6 right-6 p-2 text-[var(--color-com-muted)] hover:text-[var(--color-com-action)] bg-[var(--color-com-surface-alt)] hover:bg-[var(--color-com-divider)] rounded-full transition-colors shadow-sm z-10"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>

        {/* Encabezado Principal */}
        <header className="mb-8 pr-10 border-b border-[var(--color-com-divider)] pb-6 flex-shrink-0">
          <h2 className="font-serif text-4xl font-bold text-[var(--color-com-action)] mb-3">
            {encargo.cliente}
          </h2>
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-sans text-sm font-medium text-[var(--color-com-muted)]">Encargo #{encargo.id.slice(0,6)}</span>
            <span className="text-[var(--color-com-divider)]">•</span>
            <span className={`${esta_terminado ? 'bg-[var(--color-com-text)]' : 'bg-[var(--color-com-accent)]'} text-white text-xs px-3 py-1.5 rounded-full font-sans font-bold tracking-wide shadow-sm`}>
              {fases[encargo.fase]}
            </span>
            {encargo.tipo_arte && (
              <>
                <span className="text-[var(--color-com-divider)]">•</span>
                <span className="font-sans text-sm font-bold text-[var(--color-com-accent-dark)] bg-[var(--color-com-accent)]/20 px-3 py-1.5 rounded-full">
                  {encargo.tipo_arte}
                </span>
              </>
            )}
          </div>
        </header>

        {/* Cuerpo de la Ficha Técnica */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 overflow-y-auto pr-2 pb-2">
          
          <div className="md:col-span-2 space-y-6">
            {/* Descripción Editable */}
            <div>
              <h3 className="font-sans text-[11px] font-bold text-[var(--color-com-action)] uppercase tracking-wider mb-3">Descripción de la obra</h3>
              <textarea 
                className="w-full font-sans text-[var(--color-com-text)] text-sm leading-relaxed p-5 bg-[var(--color-com-surface-alt)] rounded-2xl border-2 border-transparent resize-none outline-none focus:bg-white focus:border-[var(--color-com-accent)] focus:shadow-[0_0_0_4px_rgba(138,154,134,0.15)] transition-all"
                rows="3"
                value={datos_editables.descripcion}
                onChange={(e) => manejar_cambio('descripcion', e.target.value)}
              ></textarea>
            </div>
            
            {/* Notas de Referencia Editables */}
            <div>
              <h3 className="font-sans text-[11px] font-bold text-[var(--color-com-action)] uppercase tracking-wider mb-3">Notas de Referencia</h3>
              <textarea 
                className="w-full font-sans text-[var(--color-com-text)] text-sm leading-relaxed p-5 bg-[var(--color-com-surface-alt)] rounded-2xl border-2 border-transparent resize-none outline-none focus:bg-white focus:border-[var(--color-com-accent)] focus:shadow-[0_0_0_4px_rgba(138,154,134,0.15)] transition-all placeholder-[var(--color-com-muted)]/60" 
                rows="4" 
                placeholder="Añade enlaces a Pinterest, Drive o notas extra aquí..."
                value={datos_editables.notas}
                onChange={(e) => manejar_cambio('notas', e.target.value)}
              ></textarea>
            </div>
          </div>

          {/* Panel Lateral de Valores y Botón */}
          <div className="flex flex-col gap-5">
            <div className="bg-[var(--color-com-surface-alt)] p-6 rounded-2xl border-2 border-transparent shadow-sm flex flex-col justify-center">
              <span className="block font-sans text-[10px] font-bold text-[var(--color-com-action)] uppercase tracking-wider mb-1.5">Fecha de Entrega</span>
              <span className="font-sans text-2xl font-bold text-[var(--color-com-text)]">{encargo.fecha}</span>
            </div>
            
            <div className="bg-[var(--color-com-surface-alt)] p-6 rounded-2xl border-2 border-transparent shadow-sm flex flex-col justify-center">
              <span className="block font-sans text-[10px] font-bold text-[var(--color-com-action)] uppercase tracking-wider mb-1.5">Valor Total</span>
              <span className="font-sans text-4xl font-bold text-[var(--color-com-action)]">${encargo.precio}</span>
            </div>

            {/* Botón de Guardar Cambios explícito */}
            <button 
              onClick={manejar_guardado}
              disabled={guardando}
              className="mt-auto bg-[var(--color-com-action)] hover:bg-[var(--color-com-action-hover)] disabled:opacity-60 text-white font-sans text-sm font-bold py-4 rounded-2xl transition-all shadow-md shadow-[var(--color-com-action)]/20 hover:shadow-lg flex justify-center items-center gap-2"
            >
              {guardando ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  Guardando...
                </>
              ) : (
                'Guardar Cambios'
              )}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}