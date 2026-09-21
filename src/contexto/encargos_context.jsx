// src/contexto/encargos_context.jsx
import React, { createContext, useState, useEffect } from 'react';
import { obtener_encargos, crear_encargo, actualizar_estado_encargo } from '../servicios/almacenamiento';
import { obtener_usuario_actual } from '../servicios/autenticacion';

export const ContextoEncargos = createContext();

export const ProveedorEncargos = ({ children }) => {
  const [encargos, set_encargos] = useState([]);
  const [usuario, set_usuario] = useState(null);
  const [cargando, set_cargando] = useState(true);

  useEffect(() => {
    const cargar_datos = async () => {
      const user = await obtener_usuario_actual();
      set_usuario(user);
      if (user) {
        const data = await obtener_encargos();
        set_encargos(data);
      }
      set_cargando(false);
    };
    cargar_datos();
  }, []);

  const guardar_encargo = async (nuevo_encargo) => {
    if (!usuario) return;
    const creado = await crear_encargo(nuevo_encargo, usuario.id);
    set_encargos([creado, ...encargos]);
  };

  const mover_encargo = async (id_encargo, nueva_fase) => {
    set_encargos(prev => prev.map(e => e.id === id_encargo ? { ...e, fase: nueva_fase } : e));
    await actualizar_estado_encargo(id_encargo, { fase: nueva_fase });
  };

  const avanzar_fase = async (id_encargo) => {
    const encargo = encargos.find(e => e.id === id_encargo);
    if (encargo && encargo.fase < 3) {
      const nueva_fase = encargo.fase + 1;
      set_encargos(prev => prev.map(e => e.id === id_encargo ? { ...e, fase: nueva_fase } : e));
      await actualizar_estado_encargo(id_encargo, { fase: nueva_fase });
    }
  };

  const archivar_encargo = async (id_encargo) => {
    set_encargos(prev => prev.map(e => e.id === id_encargo ? { ...e, es_historial: true } : e));
    await actualizar_estado_encargo(id_encargo, { es_historial: true });
  };

  const restaurar_encargo = async (id_encargo) => {
    set_encargos(prev => prev.map(e => e.id === id_encargo ? { ...e, es_historial: false } : e));
    await actualizar_estado_encargo(id_encargo, { es_historial: false });
  };

  // Vuelve a pedir el usuario a Supabase (para reflejar cambios de perfil recién guardados)
  const refrescar_usuario = async () => {
    const user = await obtener_usuario_actual();
    set_usuario(user);
  };

  return (
    <ContextoEncargos.Provider value={{
      encargos, guardar_encargo, mover_encargo, avanzar_fase, archivar_encargo, restaurar_encargo, usuario, cargando, refrescar_usuario
    }}>
      {children}
    </ContextoEncargos.Provider>
  );
};