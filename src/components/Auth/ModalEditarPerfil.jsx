// src/components/Auth/ModalEditarPerfil.jsx
import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { actualizar_perfil, subir_avatar } from '../../servicios/autenticacion';


export default function ModalEditarPerfil({ usuario, al_cerrar, al_actualizar }) {
  const [nombre, set_nombre] = useState(usuario?.user_metadata?.nombre || '');
  const [archivo_avatar, set_archivo_avatar] = useState(null);
  const [vista_previa, set_vista_previa] = useState(usuario?.user_metadata?.avatar_url || null);
  const [guardando, set_guardando] = useState(false);
  const [mensaje_error, set_mensaje_error] = useState('');

  const manejar_seleccion_archivo = (evento) => {
    const archivo = evento.target.files[0];
    if (!archivo) return;
    set_archivo_avatar(archivo);
    set_vista_previa(URL.createObjectURL(archivo));
  };

  const manejar_guardar = async (evento) => {
    evento.preventDefault();
    set_mensaje_error('');
    set_guardando(true);

    try {
      const cambios = { nombre };

      if (archivo_avatar) {
        const url_avatar = await subir_avatar(usuario.id, archivo_avatar);
        cambios.avatar_url = url_avatar;
      }

      await actualizar_perfil(cambios);
      await al_actualizar();
      al_cerrar();
    } catch (error) {
      set_mensaje_error(error.message || 'No se pudo guardar el perfil.');
    } finally {
      set_guardando(false);
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm transition-all"
      onClick={al_cerrar}
    >
      <form
        onSubmit={manejar_guardar}
        onClick={(e) => e.stopPropagation()}
        className="bg-[var(--color-com-bg)] rounded-3xl p-8 max-w-md w-full border border-white/50 shadow-2xl relative"
      >
        <button
          type="button"
          onClick={al_cerrar}
          className="absolute top-6 right-6 p-2 text-gray-400 hover:text-[var(--color-com-text)] bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>

        <h2 className="font-serif text-2xl font-bold text-[var(--color-com-text)] mb-6">Editar Perfil</h2>

        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 rounded-full overflow-hidden bg-white border border-gray-100 shadow-sm mb-3 flex items-center justify-center">
            {vista_previa ? (
              <img src={vista_previa} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
            )}
          </div>
          <label className="text-xs font-sans font-medium text-[var(--color-com-action)] cursor-pointer hover:underline">
            Cambiar foto
            <input type="file" accept="image/*" className="hidden" onChange={manejar_seleccion_archivo} />
          </label>
        </div>

        <div className="mb-6">
          <label className="block font-sans text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Nombre / alias
          </label>
          <input
            type="text"
            maxLength={30}
            placeholder="Tu nombre de artista"
            className="w-full bg-[#FDFBF7] border border-gray-200 text-[var(--color-com-text)] p-3 rounded-xl outline-none focus:ring-2 focus:ring-[var(--color-com-accent)] font-sans text-sm transition-all"
            value={nombre}
            onChange={(e) => set_nombre(e.target.value)}
          />
        </div>

        {mensaje_error && <p className="font-sans text-xs text-red-500 mb-4">{mensaje_error}</p>}

        <button
          type="submit"
          disabled={guardando}
          className="w-full bg-[var(--color-com-action)] hover:opacity-90 disabled:opacity-60 text-white font-sans font-medium py-3.5 rounded-xl transition-all shadow-sm"
        >
          {guardando ? 'Guardando...' : 'Guardar cambios'}
        </button>
      </form>
    </div>,
    document.body
  );
}