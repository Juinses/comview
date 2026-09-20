import React, { useState } from 'react';

export default function CommissionForm({ on_guardar }) {
  const [nuevo_encargo, set_nuevo_encargo] = useState({ cliente: '', descripcion: '', fecha: '', precio: '' });
  const max_desc = 100;

  const manejar_envio = (e) => {
    e.preventDefault();
    on_guardar(nuevo_encargo);
    set_nuevo_encargo({ cliente: '', descripcion: '', fecha: '', precio: '' });
  };

  return (
    <form onSubmit={manejar_envio} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm mb-8 transition-all max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="font-serif text-2xl font-bold text-[var(--color-com-text)]">Añadir nuevo encargo</h2>
        <p className="font-sans text-xs text-gray-400 mt-1">Completa los detalles para tu tablero.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
        <div>
          <label className="block font-sans text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Cliente</label>
          <input required type="text" maxLength="25" placeholder="Ej: Alex Mercel" 
            className="w-full bg-[#FDFBF7] border border-gray-200 text-[var(--color-com-text)] p-3 rounded-xl outline-none focus:ring-2 focus:ring-[var(--color-com-accent)] font-sans text-sm transition-all" 
            value={nuevo_encargo.cliente} onChange={e => set_nuevo_encargo({...nuevo_encargo, cliente: e.target.value})} />
        </div>
        
        <div>
          <label className="block font-sans text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Precio ($)</label>
          <input required type="number" max="9999" placeholder="Ej: 50" 
            className="w-full bg-[#FDFBF7] border border-gray-200 text-[var(--color-com-text)] p-3 rounded-xl outline-none focus:ring-2 focus:ring-[var(--color-com-accent)] font-sans text-sm transition-all" 
            value={nuevo_encargo.precio} onChange={e => set_nuevo_encargo({...nuevo_encargo, precio: e.target.value})} />
        </div>

        <div className="md:col-span-2">
          <label className="block font-sans text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Fecha de Entrega</label>
          <input required type="text" maxLength="15" placeholder="Ej: 10 Nov, 2026" 
            className="w-full bg-[#FDFBF7] border border-gray-200 text-[var(--color-com-text)] p-3 rounded-xl outline-none focus:ring-2 focus:ring-[var(--color-com-accent)] font-sans text-sm transition-all" 
            value={nuevo_encargo.fecha} onChange={e => set_nuevo_encargo({...nuevo_encargo, fecha: e.target.value})} />
        </div>

        <div className="md:col-span-2 relative">
          <label className="block font-sans text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Descripción del arte</label>
          <textarea required maxLength={max_desc} placeholder="Detalles de la comisión..." 
            className="w-full bg-[#FDFBF7] border border-gray-200 text-[var(--color-com-text)] p-3 rounded-xl outline-none focus:ring-2 focus:ring-[var(--color-com-accent)] font-sans text-sm resize-none transition-all" rows="3"
            value={nuevo_encargo.descripcion} onChange={e => set_nuevo_encargo({...nuevo_encargo, descripcion: e.target.value})}></textarea>
          <span className={`absolute bottom-3 right-3 text-xs font-sans ${nuevo_encargo.descripcion.length === max_desc ? 'text-red-400' : 'text-gray-400'}`}>
            {nuevo_encargo.descripcion.length}/{max_desc}
          </span>
        </div>
      </div>

      <button type="submit" className="w-full bg-[var(--color-com-accent)] hover:bg-[#7a9677] text-white font-sans font-medium py-3.5 rounded-xl transition-colors shadow-sm">
        Añadir al tablero
      </button>
    </form>
  );
}