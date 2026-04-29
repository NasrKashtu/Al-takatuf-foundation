import { useCallback, useEffect, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

type Status = 'loading' | 'signed_out' | 'not_allowlisted' | 'authed' | 'misconfigured';

interface AdminAuthState {
  status: Status;
  session: Session | null;
  email: string | null;
  /** True iff the user is signed in AND their email is in the admins table. */
  authed: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  refresh: () => Promise<void>;
}

export function useAdminAuth(): AdminAuthState {
  const [session, setSession] = useState<Session | null>(null);
  const [allowlisted, setAllowlisted] = useState<boolean | null>(null);
  const [bootstrapped, setBootstrapped] = useState(false);

  const checkAllowlist = useCallback(async (s: Session | null) => {
    if (!s) {
      setAllowlisted(null);
      return;
    }
    // RLS only returns rows visible to the caller. If the caller isn't an
    // admin, the count is 0 — which is exactly the signal we want.
    const { count, error } = await supabase
      .from('admins')
      .select('id', { count: 'exact', head: true });
    if (error) {
      console.warn('[admins] allowlist check failed:', error.message);
      setAllowlisted(false);
      return;
    }
    setAllowlisted((count ?? 0) > 0);
  }, []);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setBootstrapped(true);
      return;
    }
    let alive = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!alive) return;
      setSession(data.session);
      void checkAllowlist(data.session).finally(() => {
        if (alive) setBootstrapped(true);
      });
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
      void checkAllowlist(s);
    });

    return () => {
      alive = false;
      sub.subscription.unsubscribe();
    };
  }, [checkAllowlist]);

  const signInWithGoogle = useCallback(async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/admin`,
        queryParams: { prompt: 'select_account' },
      },
    });
  }, []);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
  }, []);

  const refresh = useCallback(async () => {
    await checkAllowlist(session);
  }, [checkAllowlist, session]);

  let status: Status;
  if (!isSupabaseConfigured) status = 'misconfigured';
  else if (!bootstrapped) status = 'loading';
  else if (!session) status = 'signed_out';
  else if (allowlisted === false) status = 'not_allowlisted';
  else status = 'authed';

  return {
    status,
    session,
    email: session?.user.email ?? null,
    authed: status === 'authed',
    signInWithGoogle,
    signOut,
    refresh,
  };
}
