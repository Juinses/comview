// src/components/MenuPerfil.jsx
import React, { useContext, useState } from 'react';
import { ContextoEncargos } from '../contexto/encargos_context';
import ModalEditarPerfil from './Auth/ModalEditarPerfil';

export default function MenuPerfil() {
  const { usuario, refrescar_usuario } = useContext(ContextoEncargos);
  const [mostrar_modal, set_mostrar_modal] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          set_mostrar_modal(true);
        }}
        className="flex flex-col items-center gap-1 text-[var(--color-com-muted)] hover:text-[var(--color-com-text)] group transition-colors focus:outline-none"
        title="Editar perfil"
      >
        {usuario?.user_metadata?.avatar_url ? (
          <img
            src={usuario.user_metadata.avatar_url}
            alt="Tu avatar"
            className="w-5 h-5 rounded-full object-cover group-hover:-translate-y-1 transition-transform border border-[var(--color-com-border)] shadow-sm"
          />
        ) : (
          <svg className="w-5 h-5 group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
        )}
        <span className="text-[10px] uppercase font-bold tracking-wider">Perfil</span>
      </button>

      {mostrar_modal && (
        <ModalEditarPerfil
          usuario={usuario}
          al_cerrar={() => set_mostrar_modal(false)}
          al_actualizar={refrescar_usuario}
        />
      )}
    </>
  );
}