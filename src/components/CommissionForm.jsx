// src/components/CommissionForm.jsx
import React, { useState } from 'react';
import { createPortal } from 'react-dom';

export default function CommissionForm({ on_guardar, al_cerrar }) {
  const [nuevo_encargo, set_nuevo_encargo] = useState({ 
    cliente: '', 
    tipo_arte: '', 
    fecha: '', 
    precio: '',
    fase_inicial: 0, 
    descripcion: '' 
  });
  const max_desc = 100;

  const manejar_envio = (e) => {
    e.preventDefault();
    
    // Fortificamos el paquete: convertimos precio a número real y declaramos es_historial
    const datos_limpios = {
      cliente: nuevo_encargo.cliente,
      tipo_arte: nuevo_encargo.tipo_arte,
      fecha: nuevo_encargo.fecha,
      precio: parseFloat(nuevo_encargo.precio) || 0,
      descripcion: nuevo_encargo.descripcion,
      fase: nuevo_encargo.fase_inicial,
      es_historial: false 
    };
    
    on_guardar(datos_limpios);
  };

  const actualizar_campo = (campo, valor) => {
    set_nuevo_encargo(prev => ({ ...prev, [campo]: valor }));
  };

  // Dibujamos el modal directamente en el body usando createPortal
  return createPortal(
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[var(--color-com-text)]/15 backdrop-blur-sm transition-all overflow-y-auto"
      onClick={al_cerrar}
    >
      <div 
        className="bg-[var(--color-com-card)] rounded-3xl p-8 max-w-[420px] w-full border border-[var(--color-com-border)] shadow-2xl shadow-[var(--color-com-action)]/10 relative my-8" 
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Botón de Cierre */}
        <button 
          type="button" 
          onClick={al_cerrar} 
          className="absolute top-6 right-6 p-2 text-[var(--color-com-muted)] hover:text-[var(--color-com-action)] bg-[var(--color-com-surface-alt)] hover:bg-[var(--color-com-divider)] rounded-full transition-colors shadow-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>

        {/* Encabezado */}
        <div className="text-center mb-8 mt-2">
          <h2 className="font-serif text-3xl font-bold text-[var(--color-com-action)]">Nuevo Encargo</h2>
          <p className="font-sans text-sm text-[var(--color-com-muted)] mt-1">Añadir una nueva comisión a tu lista</p>
        </div>
        
        <form onSubmit={manejar_envio} className="flex flex-col gap-5">
          
          {/* Nombre del Cliente */}
          <div>
            <label className="block font-sans text-[11px] font-bold text-[var(--color-com-action)] uppercase tracking-wider mb-2">Nombre del Cliente</label>
            <input required type="text" placeholder="Ej. Elena Vance" 
              className="w-full bg-[var(--color-com-surface-alt)] border-2 border-transparent text-[var(--color-com-text)] px-4 py-3.5 rounded-2xl outline-none focus:bg-white focus:border-[var(--color-com-accent)] focus:shadow-[0_0_0_4px_rgba(138,154,134,0.15)] font-sans text-sm transition-all placeholder-[var(--color-com-muted)]/60" 
              value={nuevo_encargo.cliente} onChange={e => actualizar_campo('cliente', e.target.value)} />
          </div>

          {/* Tipo de Arte (Personalizable con Datalist) */}
          <div>
            <label className="block font-sans text-[11px] font-bold text-[var(--color-com-action)] uppercase tracking-wider mb-2">Tipo de Arte</label>
            <input 
              required 
              type="text" 
              list="sugerencias_arte"
              placeholder="Ej. Character Design, Emote..." 
              className="w-full bg-[var(--color-com-surface-alt)] border-2 border-transparent text-[var(--color-com-text)] px-4 py-3.5 rounded-2xl outline-none focus:bg-white focus:border-[var(--color-com-accent)] focus:shadow-[0_0_0_4px_rgba(138,154,134,0.15)] font-sans text-sm transition-all placeholder-[var(--color-com-muted)]/60" 
              value={nuevo_encargo.tipo_arte} 
              onChange={e => actualizar_campo('tipo_arte', e.target.value)} 
            />
            <datalist id="sugerencias_arte">
              <option value="Character Design" />
              <option value="Bust" />
              <option value="Full Illustration" />
              <option value="Reference Sheet" />
              <option value="Emotes / Badges" />
            </datalist>
          </div>

          {/* Fecha y Precio */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-sans text-[11px] font-bold text-[var(--color-com-action)] uppercase tracking-wider mb-2">Entrega Est.</label>
              <input required type="date" 
                className="w-full bg-[var(--color-com-surface-alt)] border-2 border-transparent text-[var(--color-com-text)] px-4 py-3.5 rounded-2xl outline-none focus:bg-white focus:border-[var(--color-com-accent)] focus:shadow-[0_0_0_4px_rgba(138,154,134,0.15)] font-sans text-sm transition-all" 
                value={nuevo_encargo.fecha} onChange={e => actualizar_campo('fecha', e.target.value)} />
            </div>
            <div>
              <label className="block font-sans text-[11px] font-bold text-[var(--color-com-action)] uppercase tracking-wider mb-2">Precio ($ USD)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-com-action)] font-sans text-sm font-bold">$</span>
                <input required type="number" min="0" step="0.01" placeholder="0.00" 
                  className="w-full bg-[var(--color-com-surface-alt)] border-2 border-transparent text-[var(--color-com-text)] pl-8 pr-4 py-3.5 rounded-2xl outline-none focus:bg-white focus:border-[var(--color-com-accent)] focus:shadow-[0_0_0_4px_rgba(138,154,134,0.15)] font-sans text-sm transition-all" 
                  value={nuevo_encargo.precio} onChange={e => actualizar_campo('precio', e.target.value)} />
              </div>
            </div>
          </div>

          {/* Fase Inicial */}
          <div>
            <label className="block font-sans text-[11px] font-bold text-[var(--color-com-action)] uppercase tracking-wider mb-2">Fase Inicial</label>
            <div className="flex bg-[var(--color-com-surface-alt)] border border-[var(--color-com-divider)] rounded-2xl p-1.5 shadow-inner">
              {['Boceto', 'Lineart', 'Color'].map((fase, index) => (
                <button 
                  type="button" 
                  key={fase} 
                  onClick={() => actualizar_campo('fase_inicial', index)}
                  className={`flex-1 font-sans text-sm font-bold py-2.5 rounded-xl transition-all duration-300 ${
                    nuevo_encargo.fase_inicial === index 
                      ? 'bg-[var(--color-com-action)] text-white shadow-md transform scale-[1.02]' 
                      : 'text-[var(--color-com-muted)] hover:text-[var(--color-com-action)] hover:bg-white/60'
                  }`}
                >
                  {fase}
                </button>
              ))}
            </div>
          </div>

          {/* Notas / Descripción */}
          <div className="relative">
            <label className="block font-sans text-[11px] font-bold text-[var(--color-com-action)] uppercase tracking-wider mb-2">Notas / Descripción</label>
            <textarea required maxLength={max_desc} placeholder="Detalles, enlaces de referencia o notas importantes..." 
              className="w-full bg-[var(--color-com-surface-alt)] border-2 border-transparent text-[var(--color-com-text)] px-4 py-3.5 rounded-2xl outline-none focus:bg-white focus:border-[var(--color-com-accent)] focus:shadow-[0_0_0_4px_rgba(138,154,134,0.15)] font-sans text-sm resize-none transition-all h-24 placeholder-[var(--color-com-muted)]/60" 
              value={nuevo_encargo.descripcion} onChange={e => actualizar_campo('descripcion', e.target.value)}></textarea>
            <div className="absolute bottom-4 right-4 flex items-center gap-1.5 bg-[var(--color-com-card)]/90 px-2 py-1 rounded-md shadow-sm backdrop-blur-sm border border-[var(--color-com-divider)]">
              <span className={`text-[10px] font-sans font-bold ${nuevo_encargo.descripcion.length === max_desc ? 'text-red-400' : 'text-[var(--color-com-muted)]'}`}>
                {nuevo_encargo.descripcion.length}/{max_desc}
              </span>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex gap-4 mt-2">
            <button 
              type="button" 
              onClick={al_cerrar} 
              className="flex-1 bg-[var(--color-com-surface-alt)] hover:bg-[var(--color-com-divider)] text-[var(--color-com-action)] font-sans text-sm font-bold py-4 rounded-2xl transition-colors"
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="flex-1 bg-[var(--color-com-action)] hover:bg-[var(--color-com-action-hover)] text-white font-sans text-sm font-bold py-4 rounded-2xl transition-all shadow-md shadow-[var(--color-com-action)]/20 hover:shadow-lg hover:-translate-y-0.5"
            >
              + Crear Comisión
            </button>
          </div>

        </form>
      </div>
    </div>,
    document.body
  );
}