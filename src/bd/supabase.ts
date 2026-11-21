import { createClient } from '@supabase/supabase-js';

// Leemos las variables que pusiste en tu archivo .env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

// Exportamos la conexión única para usarla en todo el proyecto
export const supabase = createClient(supabaseUrl, supabaseKey);
