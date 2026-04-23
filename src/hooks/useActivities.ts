import { useCallback, useEffect, useState } from 'react';
import {
  ACTIVITIES_CHANGE_EVENT,
  Activity,
  SEED_ACTIVITIES,
  loadActivities,
  saveActivities,
} from '@/lib/activities';

export function useActivities() {
  const [activities, setActivities] = useState<Activity[]>(() => loadActivities());

  // Sync across same-tab custom events (saves) and cross-tab storage events.
  useEffect(() => {
    const refresh = () => setActivities(loadActivities());
    window.addEventListener(ACTIVITIES_CHANGE_EVENT, refresh);
    window.addEventListener('storage', refresh);
    return () => {
      window.removeEventListener(ACTIVITIES_CHANGE_EVENT, refresh);
      window.removeEventListener('storage', refresh);
    };
  }, []);

  const persist = useCallback((next: Activity[]) => {
    setActivities(next);
    saveActivities(next);
  }, []);

  const add = useCallback(
    (input: Omit<Activity, 'id' | 'createdAt' | 'updatedAt'>): Activity => {
      const now = Date.now();
      const activity: Activity = {
        ...input,
        id:
          typeof crypto !== 'undefined' && 'randomUUID' in crypto
            ? crypto.randomUUID()
            : `a-${now}-${Math.random().toString(36).slice(2, 8)}`,
        createdAt: now,
        updatedAt: now,
      };
      setActivities((prev) => {
        const next = [activity, ...prev];
        saveActivities(next);
        return next;
      });
      return activity;
    },
    [],
  );

  const update = useCallback((id: string, patch: Partial<Activity>) => {
    setActivities((prev) => {
      const next = prev.map((a) =>
        a.id === id ? { ...a, ...patch, updatedAt: Date.now() } : a,
      );
      saveActivities(next);
      return next;
    });
  }, []);

  const remove = useCallback((id: string) => {
    setActivities((prev) => {
      const next = prev.filter((a) => a.id !== id);
      saveActivities(next);
      return next;
    });
  }, []);

  const resetToSeed = useCallback(() => {
    persist(SEED_ACTIVITIES);
  }, [persist]);

  return { activities, add, update, remove, resetToSeed };
}
