// src/servicios/supabase_cliente.js
import { createClient } from '@supabase/supabase-js';

// Obtenemos las credenciales protegidas desde el archivo .env.local
const url_supabase = import.meta.env.VITE_SUPABASE_URL;
const clave_anonima = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Creamos y exportamos la instancia del cliente para usarla en el resto de la app
export const cliente_supabase = createClient(url_supabase, clave_anonima);