// src/components/Login.jsx
import React, { useState } from 'react';
import { iniciar_sesion, registrar_usuario } from '../servicios/autenticacion';

export default function Login() {
  const [email, set_email] = useState('');
  const [password, set_password] = useState('');
  const [es_registro, set_es_registro] = useState(false);

  const manejar_acceso = async (e) => {
    e.preventDefault();
    try {
      if (es_registro) {
        await registrar_usuario(email, password);
        alert("Registro exitoso. Ahora inicia sesión.");
        set_es_registro(false);
      } else {
        await iniciar_sesion(email, password);
        window.location.reload();
      }
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-com-bg)] p-6 relative overflow-hidden">
      
      {/* Decoración sutil de fondo para evitar el minimalismo estéril */}
      <div className="absolute top-0 left-0 w-64 h-64 opacity-20 pointer-events-none -translate-x-10 -translate-y-10 text-[var(--color-com-action)]">
         <svg viewBox="0 0 100 100" fill="currentColor">
          <path d="M 0,0 C 40,0 70,30 70,70 C 40,90 10,60 0,0 Z" />
        </svg>
      </div>

      <form 
        onSubmit={manejar_acceso} 
        className="bg-[var(--color-com-card)] p-8 sm:p-10 rounded-3xl shadow-[0_10px_30px_-5px_rgba(92,58,88,0.08)] border border-[var(--color-com-border)] max-w-sm w-full z-10 relative"
      >
        {/* Logo / Encabezado */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <svg className="w-8 h-8 text-[var(--color-com-action)]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM11 19.93C7.05 19.43 4 16.05 4 12C4 7.95 7.05 4.57 11 4.07V19.93ZM13 4.07C16.95 4.57 20 7.95 20 12C20 16.05 16.95 19.43 13 19.93V4.07Z" />
          </svg>
          <h2 className="font-serif text-3xl font-bold text-[var(--color-com-text)] tracking-tight">
            ComView
          </h2>
        </div>

        {/* Toggle tipo pastilla orgánica */}
        <div className="flex bg-[var(--color-com-action)] rounded-full p-1 mb-8 shadow-inner">
          <button 
            type="button" 
            onClick={() => set_es_registro(false)} 
            className={`flex-1 py-2 rounded-full text-sm font-medium transition-all ${!es_registro ? 'bg-[var(--color-com-accent)] text-[var(--color-com-accent-dark)] shadow-sm' : 'text-white/80 hover:text-white'}`}
          >
            Iniciar Sesión
          </button>
          <button 
            type="button" 
            onClick={() => set_es_registro(true)} 
            className={`flex-1 py-2 rounded-full text-sm font-medium transition-all ${es_registro ? 'bg-[var(--color-com-accent)] text-[var(--color-com-accent-dark)] shadow-sm' : 'text-white/80 hover:text-white'}`}
          >
            Registrarse
          </button>
        </div>

        {/* Inputs Cómodos */}
        <div className="space-y-4 mb-8">
          <div className="relative">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-com-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <input 
              type="email" 
              placeholder="Correo electrónico" 
              required 
              value={email} 
              onChange={e => set_email(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-[var(--color-com-surface-alt)] border border-transparent focus:bg-white focus:border-[var(--color-com-accent)] outline-none transition-all font-sans text-sm text-[var(--color-com-text)] placeholder-[var(--color-com-muted)]" 
            />
          </div>

          <div className="relative">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-com-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <input 
              type="password" 
              placeholder="Contraseña" 
              required 
              value={password} 
              onChange={e => set_password(e.target.value)}
              className="w-full pl-12 pr-12 py-3.5 rounded-2xl bg-[var(--color-com-surface-alt)] border border-transparent focus:bg-white focus:border-[var(--color-com-accent)] outline-none transition-all font-sans text-sm text-[var(--color-com-text)] placeholder-[var(--color-com-muted)]" 
            />
            {/* Ícono simulado de "ver contraseña" */}
            <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--color-com-muted)] hover:text-[var(--color-com-text)] transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Botón Principal Cómodo */}
        <button 
          type="submit" 
          className="w-full bg-[var(--color-com-action)] hover:bg-[var(--color-com-action-hover)] text-white font-sans font-medium py-4 rounded-2xl transition-all flex justify-center items-center gap-2"
        >
          {es_registro ? 'Registrarme' : 'Ingresar a mi Estudio'}
        </button>

        {/* Enlaces inferiores */}
        <div className="flex justify-between mt-6 px-1">
          <p className="text-xs font-sans text-[var(--color-com-muted)] hover:text-[var(--color-com-text)] cursor-pointer transition-colors">
            ¿Olvidaste tu contraseña?
          </p>
        </div>
      </form>
    </div>
  );
}