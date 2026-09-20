import React from 'react';

export default function ComissionCard({ encargo, on_avanzar, on_archivar, on_restaurar, vista_actual }) {
  const fases = ['Boceto', 'Lineart', 'Color', 'Terminado'];
  const esta_terminado = encargo.fase === fases.length - 1;

  return (
    <div className={`bg-white rounded-2xl p-6 max-w-sm w-full border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all hover:-translate-y-1 flex flex-col h-full relative group ${vista_actual === 'historial' ? 'opacity-80 hover:opacity-100' : ''}`}>
      
      {/* Botón dinámico: Archivar o Restaurar */}
      {vista_actual === 'activas' ? (
        <button 
          onClick={() => on_archivar(encargo.id)}
          className="absolute top-4 right-4 p-1.5 text-gray-300 hover:bg-red-50 hover:text-red-400 rounded-lg transition-all opacity-0 group-hover:opacity-100"
          title="Archivar encargo"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
        </button>
      ) : (
        <button 
          onClick={() => on_restaurar(encargo.id)}
          className="absolute top-4 right-4 p-1.5 text-gray-300 hover:bg-green-50 hover:text-green-500 rounded-lg transition-all opacity-0 group-hover:opacity-100"
          title="Restaurar al tablero"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
        </button>
      )}

      <div className="flex justify-between items-start mb-4 pr-8">
        <div>
          <h3 className="font-serif text-xl font-bold text-[var(--color-com-text)]">
            {encargo.cliente}
          </h3>
          <p className="font-sans text-xs text-gray-400 mt-1">Encargo #{encargo.id}</p>
        </div>
        <span className={`${esta_terminado ? 'bg-[var(--color-com-text)]' : 'bg-[var(--color-com-accent)]'} text-white text-xs px-3 py-1 rounded-full font-sans font-medium tracking-wide transition-colors mt-1`}>
          {fases[encargo.fase]}
        </span>
      </div>

      <p className="font-sans text-gray-600 text-sm mb-6 leading-relaxed flex-grow">
        {encargo.descripcion}
      </p>

      <div className="flex justify-between items-center border-t border-gray-100 pt-4 mb-4">
        <div className="flex flex-col">
          <span className="font-sans text-[10px] uppercase tracking-wider text-gray-400">Entrega</span>
          <span className="font-sans text-sm font-medium text-[var(--color-com-text)]">{encargo.fecha}</span>
        </div>
        <div className="flex flex-col text-right">
          <span className="font-sans text-[10px] uppercase tracking-wider text-gray-400">Precio</span>
          <span className="font-sans text-sm font-medium text-[var(--color-com-text)]">${encargo.precio}</span>
        </div>
      </div>

      {/* Si está en el historial, deshabilitamos el botón de avanzar para que sea solo vista */}
      <button 
        onClick={() => on_avanzar(encargo.id)}
        disabled={esta_terminado || vista_actual === 'historial'}
        className={`w-full font-sans font-medium py-3 rounded-xl transition-all flex justify-center items-center gap-2
          ${(esta_terminado || vista_actual === 'historial')
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
            : 'bg-[var(--color-com-action)] hover:opacity-90 text-white'
          }`}
      >
        {esta_terminado ? 'Encargo Completado' : 'Avanzar estado'}
      </button>
    </div>
  );
}