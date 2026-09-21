// src/components/Auth/ModalEditarPerfil.jsx
import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { actualizar_perfil, subir_avatar } from '../../servicios/autenticacion';

export default function ModalEditarPerfil({ usuario, al_cerrar, al_actualizar }) {
  const [nombre, set_nombre] = useState(usuario?.user_metadata?.nombre || '');
  const [rol, set_rol] = useState(usuario?.user_metadata?.rol || 'Ilustrador Freelance & Creador de Personajes');
  
  const [tarifa_boceto, set_tarifa_boceto] = useState(usuario?.user_metadata?.tarifa_boceto || '20');
  const [tarifa_lineart, set_tarifa_lineart] = useState(usuario?.user_metadata?.tarifa_lineart || '40');
  const [tarifa_color, set_tarifa_color] = useState(usuario?.user_metadata?.tarifa_color || '80');

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
      if (!usuario || !usuario.id) throw new Error('Usuario no identificado.');

      const cambios = { nombre, rol, tarifa_boceto, tarifa_lineart, tarifa_color };

      if (archivo_avatar) {
        cambios.avatar_url = await subir_avatar(usuario.id, archivo_avatar);
      }

      await actualizar_perfil(cambios);
      if (al_actualizar) await al_actualizar();
      al_cerrar();
    } catch (error) {
      set_mensaje_error(error.message || 'Error al guardar el perfil.');
    } finally {
      set_guardando(false);
    }
  };

  return createPortal(
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[var(--color-com-text)]/10 backdrop-blur-sm transition-all overflow-y-auto"
      onClick={al_cerrar}
    >
      <form 
        onSubmit={manejar_guardar}
        className="bg-[var(--color-com-card)] rounded-3xl p-8 max-w-3xl w-full border border-[var(--color-com-border)] shadow-[var(--shadow-warm)] relative my-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          type="button"
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); al_cerrar(); }} 
          className="absolute top-6 right-6 p-2 text-[var(--color-com-muted)] hover:text-[var(--color-com-text)] bg-[var(--color-com-bg)] hover:bg-[var(--color-com-surface-alt)] rounded-full transition-colors shadow-sm"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>

        <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
          <div className="relative group">
            <div className="w-28 h-28 rounded-full border-4 border-[var(--color-com-accent)] overflow-hidden bg-[var(--color-com-bg)] relative shadow-sm">
              {vista_previa ? (
                <img src={vista_previa} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <img src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${usuario?.email || 'artista'}`} alt="Avatar" className="w-full h-full object-cover" />
              )}
              <div className="absolute inset-0 bg-[var(--color-com-action)]/10 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer flex items-center justify-center">
                 <svg className="w-8 h-8 text-[var(--color-com-action)] drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </div>
              <input type="file" accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" onChange={manejar_seleccion_archivo} title="Cambiar avatar" />
            </div>
            <span className="absolute -bottom-2 -right-4 bg-[var(--color-com-accent)] text-[var(--color-com-accent-dark)] text-[10px] font-bold px-3 py-1 rounded-full border-2 border-[var(--color-com-card)] shadow-sm">
              Disponible
            </span>
          </div>

          <div className="text-center md:text-left flex-1 w-full">
            <input
              type="text" maxLength={30} placeholder="Tu nombre de artista"
              value={nombre} onChange={(e) => set_nombre(e.target.value)}
              className="font-serif text-3xl md:text-4xl font-bold text-[var(--color-com-action)] mb-1 bg-transparent border-b-2 border-transparent hover:border-[var(--color-com-border)] focus:border-[var(--color-com-accent)] outline-none w-full transition-colors placeholder:text-[var(--color-com-muted)]/50 px-1"
            />
            <input
              type="text" maxLength={50} placeholder="Ej: Ilustrador Freelance & Creador de Personajes"
              value={rol} onChange={(e) => set_rol(e.target.value)}
              className="font-sans text-[var(--color-com-text)] text-sm font-medium mt-1 px-1 bg-transparent border-b border-transparent hover:border-[var(--color-com-border)] focus:border-[var(--color-com-accent)] outline-none w-full transition-colors placeholder:text-[var(--color-com-muted)]/50"
            />
          </div>
        </div>

        {mensaje_error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-xl mb-6 font-sans text-sm border border-red-100 flex items-center gap-2">
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            {mensaje_error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          
          {/* NUEVA COLUMNA IZQUIERDA REBALANCEADA */}
          <div className="bg-[var(--color-com-bg)] p-6 rounded-3xl border border-[var(--color-com-border)] flex flex-col justify-between">
            <div>
              <h3 className="font-serif text-lg font-bold text-[var(--color-com-text)] mb-6">Mi Cuenta</h3>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-[var(--color-com-surface-alt)] w-10 h-10 rounded-full flex items-center justify-center text-[var(--color-com-muted)] shadow-sm flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </div>
                <div className="overflow-hidden">
                  <p className="font-sans text-xs text-[var(--color-com-muted)] mb-0.5">Email de Supabase</p>
                  <p className="font-sans text-sm font-medium text-[var(--color-com-text)] truncate">{usuario?.email || 'usuario@comview.art'}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-[var(--color-com-surface-alt)] w-10 h-10 rounded-full flex items-center justify-center text-[var(--color-com-muted)] shadow-sm flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                </div>
                <div>
                  <p className="font-sans text-xs text-[var(--color-com-muted)] mb-0.5">Miembro desde</p>
                  <p className="font-sans text-sm font-medium text-[var(--color-com-text)]">2026</p>
                </div>
              </div>
            </div>

            {/* Falso pie de tarjeta para darle peso abajo */}
            <div className="mt-8 pt-5 border-t border-[var(--color-com-border)] flex items-center gap-2">
               <div className="w-2 h-2 rounded-full bg-[var(--color-com-accent)] animate-pulse"></div>
               <span className="font-sans text-xs font-medium text-[var(--color-com-muted)]">Bóveda Sincronizada</span>
            </div>
          </div>

          {/* Columna Derecha (Sin cambios) */}
          <div className="flex flex-col gap-6">
            <div className="bg-[var(--color-com-bg)] p-6 rounded-3xl border border-[var(--color-com-border)]">
              <h3 className="font-serif text-lg font-bold text-[var(--color-com-text)] mb-4">Tarifas Base & Tipos de Arte</h3>
              <div className="flex justify-between items-center text-center">
                
                <div className="flex flex-col items-center gap-2">
                  <div className="bg-[var(--color-com-surface-alt)] w-12 h-12 rounded-full flex items-center justify-center border border-[var(--color-com-border)] shadow-sm">
                    <span className="text-xl">✏️</span>
                  </div>
                  <span className="font-sans text-xs font-medium text-[var(--color-com-text)]">Boceto</span>
                  <div className="flex items-center bg-[var(--color-com-surface-alt)] rounded-full px-2 py-0.5 border border-transparent focus-within:border-[var(--color-com-accent)] focus-within:bg-white transition-colors cursor-text">
                    <span className="text-[10px] text-[var(--color-com-muted)]">$</span>
                    <input 
                      type="text" maxLength={4}
                      value={tarifa_boceto}
                      onChange={(e) => set_tarifa_boceto(e.target.value.replace(/[^0-9]/g, ''))}
                      className="w-8 bg-transparent text-[10px] text-[var(--color-com-muted)] outline-none text-center font-medium"
                    />
                    <span className="text-[10px] text-[var(--color-com-muted)] ml-0.5">USD</span>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-2">
                  <div className="bg-[var(--color-com-surface-alt)] w-12 h-12 rounded-full flex items-center justify-center border border-[var(--color-com-border)] shadow-sm">
                    <span className="text-xl">✒️</span>
                  </div>
                  <span className="font-sans text-xs font-medium text-[var(--color-com-text)]">Lineart</span>
                  <div className="flex items-center bg-[var(--color-com-surface-alt)] rounded-full px-2 py-0.5 border border-transparent focus-within:border-[var(--color-com-accent)] focus-within:bg-white transition-colors cursor-text">
                    <span className="text-[10px] text-[var(--color-com-muted)]">$</span>
                    <input 
                      type="text" maxLength={4}
                      value={tarifa_lineart}
                      onChange={(e) => set_tarifa_lineart(e.target.value.replace(/[^0-9]/g, ''))}
                      className="w-8 bg-transparent text-[10px] text-[var(--color-com-muted)] outline-none text-center font-medium"
                    />
                    <span className="text-[10px] text-[var(--color-com-muted)] ml-0.5">USD</span>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-2">
                  <div className="bg-[var(--color-com-surface-alt)] w-12 h-12 rounded-full flex items-center justify-center border border-[var(--color-com-border)] shadow-sm">
                    <span className="text-xl">🖌️</span>
                  </div>
                  <span className="font-sans text-xs font-medium text-[var(--color-com-text)]">Color Completo</span>
                  <div className="flex items-center bg-[var(--color-com-surface-alt)] rounded-full px-2 py-0.5 border border-transparent focus-within:border-[var(--color-com-accent)] focus-within:bg-white transition-colors cursor-text">
                    <span className="text-[10px] text-[var(--color-com-muted)]">$</span>
                    <input 
                      type="text" maxLength={4}
                      value={tarifa_color}
                      onChange={(e) => set_tarifa_color(e.target.value.replace(/[^0-9]/g, ''))}
                      className="w-8 bg-transparent text-[10px] text-[var(--color-com-muted)] outline-none text-center font-medium"
                    />
                    <span className="text-[10px] text-[var(--color-com-muted)] ml-0.5">USD</span>
                  </div>
                </div>

              </div>
            </div>
            
            <div className="bg-[var(--color-com-bg)] p-6 rounded-3xl border border-[var(--color-com-border)]">
              <h3 className="font-serif text-lg font-bold text-[var(--color-com-text)] mb-4">Estadísticas del Mes</h3>
              <div className="flex justify-around items-center">
                <div className="text-center flex items-center gap-3">
                  <span className="text-4xl font-serif font-bold text-[var(--color-com-text)]">4</span>
                  <div className="text-left leading-tight">
                    <span className="text-xl block">🤝</span>
                    <span className="font-sans text-[10px] text-[var(--color-com-muted)] uppercase tracking-wider">Completadas</span>
                  </div>
                </div>
                <div className="w-px h-10 bg-[var(--color-com-divider)]"></div>
                <div className="text-center flex items-center gap-3">
                  <span className="text-3xl font-serif font-bold text-[var(--color-com-action)]">$450</span>
                  <div className="text-left leading-tight">
                    <span className="text-xl block">💰</span>
                    <span className="font-sans text-[10px] text-[var(--color-com-muted)] uppercase tracking-wider">Entregados</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-4">
          <button 
            type="submit" disabled={guardando} 
            className="bg-[var(--color-com-action)] hover:bg-[var(--color-com-action-hover)] disabled:opacity-60 disabled:cursor-not-allowed text-white font-sans font-medium px-8 py-3.5 rounded-full transition-all shadow-sm flex items-center gap-2"
          >
            {guardando ? 'Guardando...' : <>Guardar Cambios <span>🍃</span></>}
          </button>
        </div>
      </form>
    </div>,
    document.body
  );
}