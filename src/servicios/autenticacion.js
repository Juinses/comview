// src/servicios/autenticacion.js
import { cliente_supabase } from './supabase_cliente';

export const registrar_usuario = async (email, password) => {
  const { data, error } = await cliente_supabase.auth.signUp({
    email,
    password,
  });
  if (error) throw error;
  return data.user;
};

export const iniciar_sesion = async (email, password) => {
  const { data, error } = await cliente_supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  return data.user;
};

export const cerrar_sesion = async () => {
  const { error } = await cliente_supabase.auth.signOut();
  if (error) throw error;
};

export const obtener_usuario_actual = async () => {
  const { data: { user } } = await cliente_supabase.auth.getUser();
  return user;
};

// Actualiza nombre/alias y/o avatar_url guardados en user_metadata
export const actualizar_perfil = async (cambios) => {
  const { data, error } = await cliente_supabase.auth.updateUser({
    data: cambios, // ej: { nombre: 'Juinses', avatar_url: 'https://...' }
  });
  if (error) throw error;
  return data.user;
};

// Sube el archivo al bucket 'Avatares', en una carpeta por usuario, y devuelve la URL pública
export const subir_avatar = async (id_usuario, archivo) => {
  const extension = archivo.name.split('.').pop();
  const ruta_archivo = `${id_usuario}/avatar.${extension}`;

  console.log('[subir_avatar] id_usuario:', id_usuario);
  console.log('[subir_avatar] ruta_archivo:', ruta_archivo);

  const { data: { user } } = await cliente_supabase.auth.getUser();
  console.log('[subir_avatar] usuario autenticado ahora mismo (auth.uid esperado):', user?.id);

  const { error: error_subida } = await cliente_supabase.storage
    .from('Avatares')
    .upload(ruta_archivo, archivo, { upsert: true });

  if (error_subida) throw error_subida;

  const { data } = cliente_supabase.storage
    .from('Avatares')
    .getPublicUrl(ruta_archivo);

  return `${data.publicUrl}?t=${Date.now()}`;
};