import { useCallback, useEffect, useState } from 'react';

const SESSION_KEY = 'altakathuf_admin_session';

// Dev fallback only — set VITE_ADMIN_PASSWORD in a .env file for real use.
const EXPECTED = import.meta.env.VITE_ADMIN_PASSWORD ?? 'takatuf-admin';

export function useAdminAuth() {
  const [authed, setAuthed] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return sessionStorage.getItem(SESSION_KEY) === '1';
  });

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === SESSION_KEY) setAuthed(e.newValue === '1');
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const login = useCallback((password: string) => {
    if (password === EXPECTED) {
      sessionStorage.setItem(SESSION_KEY, '1');
      setAuthed(true);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem(SESSION_KEY);
    setAuthed(false);
  }, []);

  return { authed, login, logout };
}
