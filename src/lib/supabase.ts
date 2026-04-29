import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

if (!url || !key) {
  // Loud failure in dev so misconfig isn't masked. The admin gate also
  // surfaces a friendly message if these are missing.
  console.warn(
    '[supabase] VITE_SUPABASE_URL and/or VITE_SUPABASE_ANON_KEY are missing. ' +
      'Auth and the admin panel will not work until both are set.',
  );
}

export const supabase = createClient(url ?? 'http://localhost', key ?? 'anon', {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    flowType: 'pkce',
  },
});

export const isSupabaseConfigured = Boolean(url && key);

export interface AdminRow {
  id: string;
  email: string;
  created_at: string;
  added_by_email: string | null;
}
