// src/servicios/almacenamiento.js
import { cliente_supabase } from './supabase_cliente';

// 1. Leer encargos (Asíncrono)
export const obtener_encargos = async () => {
  const { data, error } = await cliente_supabase
    .from('encargos')
    .select('*')
    .order('creado_en', { ascending: false });

  if (error) {
    console.error('Error al obtener encargos:', error.message);
    return [];
  }
  return data || [];
};

// 2. Crear nuevo encargo (Insertar fila)
export const crear_encargo = async (nuevo_encargo, id_usuario) => {
  const { data, error } = await cliente_supabase
    .from('encargos')
    .insert([{ ...nuevo_encargo, user_id: id_usuario }])
    .select(); // Pedimos que nos devuelva la fila recién creada

  if (error) throw error;
  return data[0];
};

// 3. Actualizar la fase o estado de historial (Actualización quirúrgica)
export const actualizar_estado_encargo = async (id_encargo, actualizaciones) => {
  const { error } = await cliente_supabase
    .from('encargos')
    .update(actualizaciones)
    .eq('id', id_encargo);

  if (error) throw error;
};