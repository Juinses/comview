import React from 'react';

export default function Header({ mostrar_formulario, set_mostrar_formulario, vista_actual, set_vista_actual }) {
  return (
    <nav className="relative z-10 w-full max-w-5xl mx-auto px-6 py-4 mt-2">
      <div className="bg-white/60 backdrop-blur-md border border-white/40 shadow-sm rounded-2xl flex justify-between items-center px-6 py-3">
        
        <div className="flex items-center gap-2 cursor-pointer">
          <span className="font-serif text-2xl font-bold text-[var(--color-com-text)] tracking-tight">
            ComView
          </span>
        </div>

        <div className="hidden md:flex gap-8 items-center">
          
          {/* Botón: Mis Encargos */}
          <button 
            onClick={() => set_vista_actual('activas')}
            className={`flex flex-col items-center gap-1 group transition-colors ${vista_actual === 'activas' ? 'text-[var(--color-com-action)]' : 'text-gray-400 hover:text-[var(--color-com-text)]'}`}
          >
            <svg className="w-5 h-5 group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
            <span className="text-[10px] uppercase font-bold tracking-wider">Activas</span>
          </button>
          
          {/* Botón: Historial (Antes Galería) */}
          <button 
            onClick={() => set_vista_actual('historial')}
            className={`flex flex-col items-center gap-1 group transition-colors ${vista_actual === 'historial' ? 'text-[var(--color-com-action)]' : 'text-gray-400 hover:text-[var(--color-com-text)]'}`}
          >
            <svg className="w-5 h-5 group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
            <span className="text-[10px] uppercase font-bold tracking-wider">Historial</span>
          </button>
          
          <button className="flex flex-col items-center gap-1 text-gray-400 hover:text-[var(--color-com-text)] group transition-colors">
            <svg className="w-5 h-5 group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
            <span className="text-[10px] uppercase font-bold tracking-wider">Perfil</span>
          </button>
        </div>

        <button 
          onClick={() => set_mostrar_formulario(!mostrar_formulario)}
          className="bg-[var(--color-com-action)] text-white text-sm font-medium px-4 py-2 rounded-xl hover:opacity-90 transition-opacity"
        >
          {mostrar_formulario ? 'Cancelar' : '+ Nuevo Encargo'}
        </button>

      </div>
    </nav>
  );
}