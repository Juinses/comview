// src/contexto/encargos_context.jsx
import React, { createContext, useState, useEffect } from 'react';
import { obtener_encargos, guardar_encargos } from '../servicios/almacenamiento';

// 1. Creamos el contexto (la frecuencia de radio)
export const ContextoEncargos = createContext();

// 2. Creamos el Proveedor (la antena que emite la señal)
export const ProveedorEncargos = ({ children }) => {
  // Movemos toda la lógica de datos aquí adentro
  const [encargos, set_encargos] = useState(() => obtener_encargos());

  useEffect(() => {
    guardar_encargos(encargos);
  }, [encargos]);

  const avanzar_fase = (id_encargo) => {
    set_encargos(encargos.map(encargo => {
      if (encargo.id === id_encargo && encargo.fase < 3) {
        return { ...encargo, fase: encargo.fase + 1 };
      }
      return encargo;
    }));
  };

  const archivar_encargo = (id_encargo) => {
    set_encargos(encargos.map(encargo => 
      encargo.id === id_encargo ? { ...encargo, es_historial: true } : encargo
    ));
  };

  const restaurar_encargo = (id_encargo) => {
    set_encargos(encargos.map(encargo => 
      encargo.id === id_encargo ? { ...encargo, es_historial: false } : encargo
    ));
  };

  const guardar_encargo = (nuevo_encargo) => {
    const id_generado = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    set_encargos([...encargos, { ...nuevo_encargo, id: id_generado, fase: 0, es_historial: false }]);
  };
  
  const mover_encargo = (id_encargo, nueva_fase) => {
    set_encargos(encargos.map(encargo => 
      encargo.id === id_encargo ? { ...encargo, fase: nueva_fase } : encargo
    ));
  };

  // 3. Empaquetamos todo lo que queremos "transmitir" en un objeto `value`
  return (
    <ContextoEncargos.Provider value={{
      encargos,
      avanzar_fase,
      archivar_encargo,
      restaurar_encargo,
      guardar_encargo,
      mover_encargo,
    }}>
      {children}
    </ContextoEncargos.Provider>
  );
};