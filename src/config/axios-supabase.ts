const supabaseUrl: string = process.env.NEXT_PUBLIC_API_SUPABASE!;
const supabaseAnonKey: string = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

import { createClient } from '@supabase/supabase-js';
console.log('supabaseUrl', supabaseUrl);
console.log('supabaseAnonKey', supabaseAnonKey);

const supabase = createClient(supabaseUrl, supabaseAnonKey);
export default supabase;