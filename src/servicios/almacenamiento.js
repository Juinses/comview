// src/servicios/almacenamiento.js

// Constante para el nombre de la llave, evita errores de tipeo
const llave_almacenamiento = 'comview_encargos';

export const obtener_encargos = () => {
  const guardados = localStorage.getItem(llave_almacenamiento);
  return guardados ? JSON.parse(guardados) : [];
};

export const guardar_encargos = (encargos_actualizados) => {
  localStorage.setItem(llave_almacenamiento, JSON.stringify(encargos_actualizados));
};