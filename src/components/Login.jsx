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
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-com-bg)] p-6">
      <form onSubmit={manejar_acceso} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 max-w-sm w-full transition-all">
        <h2 className="font-serif text-2xl font-bold text-[var(--color-com-text)] mb-6 text-center">
          {es_registro ? 'Crear Bóveda' : 'Acceder a ComView'}
        </h2>
        <input type="email" placeholder="Correo" required 
          className="w-full mb-4 p-3 rounded-xl bg-[#FDFBF7] border border-gray-200 outline-none focus:ring-2 focus:ring-[var(--color-com-accent)] font-sans text-sm" 
          value={email} onChange={e => set_email(e.target.value)} />
        <input type="password" placeholder="Contraseña" required 
          className="w-full mb-6 p-3 rounded-xl bg-[#FDFBF7] border border-gray-200 outline-none focus:ring-2 focus:ring-[var(--color-com-accent)] font-sans text-sm" 
          value={password} onChange={e => set_password(e.target.value)} />
        <button type="submit" className="w-full bg-[var(--color-com-action)] hover:opacity-90 text-white font-sans font-medium py-3 rounded-xl transition-opacity">
          {es_registro ? 'Registrarse' : 'Entrar'}
        </button>
        <p className="text-center mt-6 text-xs font-sans text-gray-400 cursor-pointer hover:text-[var(--color-com-text)] transition-colors" 
           onClick={() => set_es_registro(!es_registro)}>
          {es_registro ? '¿Ya tienes cuenta? Inicia sesión' : '¿Nuevo artista? Regístrate'}
        </p>
      </form>
    </div>
  );
}