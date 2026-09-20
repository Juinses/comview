// src/servicios/respaldo.js

export const descargar_respaldo = (encargos) => {
  // 1. Convertimos nuestra lista de encargos a texto JSON formateado (con sangrías)
  const datos_json = JSON.stringify(encargos, null, 2);
  
  // 2. Creamos un "Blob" (un objeto de datos en bruto) que el navegador entiende como un archivo
  const blob = new Blob([datos_json], { type: 'application/json' });
  
  // 3. Creamos una URL temporal que apunte a ese archivo
  const url_archivo = URL.createObjectURL(blob);
  
  // 4. Truco clásico de JS: Creamos un enlace invisible, le damos clic programáticamente y lo borramos
  const enlace_descarga = document.createElement('a');
  enlace_descarga.href = url_archivo;
  
  // Le ponemos un nombre orgánico con la fecha actual
  const fecha_hoy = new Date().toISOString().split('T')[0];
  enlace_descarga.download = `comview_respaldo_${fecha_hoy}.json`;
  
  document.body.appendChild(enlace_descarga);
  enlace_descarga.click();
  
  // Limpiamos la basura de la memoria
  document.body.removeChild(enlace_descarga);
  URL.revokeObjectURL(url_archivo);
};