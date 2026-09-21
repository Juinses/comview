// src/components/BarraHistorial.jsx
import React from 'react';

export default function BarraHistorial({ busqueda, set_busqueda, filtro_activo, set_filtro_activo }) {
  const filtros = ['Todas', 'Este mes', 'Mayor valor'];

  return (
    <div className="flex flex-col md:flex-row gap-4 items-center justify-center mb-10 max-w-4xl mx-auto w-full transition-all duration-300">
      
      {/* Buscador estilo pastilla */}
      <div className="relative flex-1 w-full">
        <svg className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-com-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
        <input 
          type="text" 
          placeholder="Buscar en el historial por cliente..." 
          value={busqueda}
          onChange={(e) => set_busqueda(e.target.value)}
          className="w-full pl-14 pr-6 py-3.5 rounded-full bg-[var(--color-com-card)] border border-[var(--color-com-border)] focus:border-[var(--color-com-accent)] outline-none transition-all font-sans text-sm text-[var(--color-com-text)] placeholder-[var(--color-com-muted)] shadow-sm"
        />
      </div>

      {/* Botones de Filtro Rápidos */}
      <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
        {filtros.map((filtro) => (
          <button
            key={filtro}
            onClick={() => set_filtro_activo(filtro)}
            className={`px-5 py-2.5 rounded-full font-sans text-sm font-medium whitespace-nowrap transition-all border ${
              filtro_activo === filtro 
                ? 'bg-[var(--color-com-surface-alt)] border-[var(--color-com-border)] text-[var(--color-com-text)] shadow-sm' 
                : 'bg-transparent border-transparent text-[var(--color-com-muted)] hover:bg-[var(--color-com-card)] hover:border-[var(--color-com-border)]'
            }`}
          >
            {filtro}
          </button>
        ))}
      </div>
    </div>
  );
}