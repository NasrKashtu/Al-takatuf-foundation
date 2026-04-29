import { useCallback, useEffect, useState } from 'react';
import { Loader2, Plus, Trash2, UserCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useApp } from '@/contexts/AppContext';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { supabase, type AdminRow } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const SettingsPanel = () => {
  const { t, language } = useApp();
  const { email: currentEmail } = useAdminAuth();
  const { toast } = useToast();

  const [admins, setAdmins] = useState<AdminRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [newEmail, setNewEmail] = useState('');
  const [adding, setAdding] = useState(false);
  const [pendingRemove, setPendingRemove] = useState<AdminRow | null>(null);
  const [removing, setRemoving] = useState(false);

  const fetchAdmins = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('admins')
      .select('id,email,created_at,added_by_email')
      .order('created_at', { ascending: true });
    setLoading(false);
    if (error) {
      toast({ title: t('adminToastLoadFailed'), description: error.message });
      return;
    }
    setAdmins(data ?? []);
  }, [toast, t]);

  useEffect(() => {
    void fetchAdmins();
  }, [fetchAdmins]);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newEmail.trim().toLowerCase();
    if (!EMAIL_RE.test(trimmed)) {
      toast({ title: t('adminToastInvalidEmail') });
      return;
    }
    if (admins.some((a) => a.email.toLowerCase() === trimmed)) {
      toast({ title: t('adminToastAdminExists') });
      return;
    }
    setAdding(true);
    const { error } = await supabase
      .from('admins')
      .insert({ email: trimmed, added_by_email: currentEmail });
    setAdding(false);
    if (error) {
      toast({ title: t('adminToastAddFailed'), description: error.message });
      return;
    }
    setNewEmail('');
    toast({ title: t('adminToastAdminAdded') });
    void fetchAdmins();
  };

  const handleRemove = async () => {
    if (!pendingRemove) return;
    setRemoving(true);
    const { error } = await supabase.from('admins').delete().eq('id', pendingRemove.id);
    setRemoving(false);
    if (error) {
      toast({ title: t('adminToastRemoveFailed'), description: error.message });
      return;
    }
    toast({ title: t('adminToastAdminRemoved') });
    setPendingRemove(null);
    void fetchAdmins();
  };

  const dateFormatter = new Intl.DateTimeFormat(language === 'ar' ? 'ar-LY' : 'en-GB', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="space-y-6">
      <section className="bg-card border border-border rounded-lg p-5 shadow-sm">
        <h2 className="font-semibold text-foreground mb-1 flex items-center gap-2">
          <Plus size={16} className="text-muted-foreground" />
          {t('adminAddAdmin')}
        </h2>
        <p className="text-sm text-muted-foreground mb-4">
          {t('adminAddAdminDesc')}
        </p>
        <form onSubmit={handleAdd} className="flex flex-col sm:flex-row gap-2">
          <div className="flex-1 space-y-1.5">
            <Label htmlFor="new-admin-email" className="sr-only">
              {t('adminAddAdminEmail')}
            </Label>
            <Input
              id="new-admin-email"
              type="email"
              autoComplete="off"
              placeholder={t('adminAddAdminEmail')}
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              disabled={adding}
              dir="ltr"
            />
          </div>
          <Button type="submit" disabled={adding || !newEmail.trim()}>
            {adding ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />}
            {t('adminAddAdminBtn')}
          </Button>
        </form>
      </section>

      <section className="bg-card border border-border rounded-lg p-5 shadow-sm">
        <h2 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          <UserCircle2 size={16} className="text-muted-foreground" />
          {t('adminCurrentAdmins')}
          <span className="text-xs text-muted-foreground font-normal tabular-nums">
            ({admins.length})
          </span>
        </h2>

        {loading ? (
          <div className="flex justify-center py-6">
            <Loader2 size={18} className="animate-spin text-muted-foreground" />
          </div>
        ) : admins.length === 0 ? (
          <p className="text-sm text-muted-foreground">{t('adminNoAdminsYet')}</p>
        ) : (
          <ul className="divide-y divide-border">
            {admins.map((a) => {
              const isSelf =
                currentEmail && a.email.toLowerCase() === currentEmail.toLowerCase();
              return (
                <li
                  key={a.id}
                  className="py-3 flex items-center gap-3 justify-between flex-wrap sm:flex-nowrap"
                >
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-medium text-foreground truncate" dir="ltr">
                      {a.email}
                      {isSelf && (
                        <span className="ms-2 text-xs font-normal text-primary">
                          ({t('adminYouLabel')})
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {t('adminAddedOn')} {dateFormatter.format(new Date(a.created_at))}
                      {a.added_by_email && a.added_by_email !== 'system-seed' ? (
                        <>
                          {' · '}
                          {t('adminAddedBy')} <span dir="ltr">{a.added_by_email}</span>
                        </>
                      ) : null}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    disabled={Boolean(isSelf)}
                    onClick={() => setPendingRemove(a)}
                    title={isSelf ? t('adminCannotRemoveSelf') : t('adminRemoveAdmin')}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10 disabled:opacity-40 disabled:hover:bg-transparent"
                  >
                    <Trash2 size={14} />
                    <span className="hidden sm:inline">{t('adminRemoveAdmin')}</span>
                  </Button>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <AlertDialog
        open={pendingRemove !== null}
        onOpenChange={(open) => !open && setPendingRemove(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('adminRemoveConfirmTitle')}</AlertDialogTitle>
            <AlertDialogDescription>
              {t('adminRemoveConfirmDesc')}{' '}
              <span className="font-mono text-foreground" dir="ltr">
                {pendingRemove?.email}
              </span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={removing}>{t('adminCancel')}</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault();
                void handleRemove();
              }}
              disabled={removing}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {removing ? (
                <Loader2 size={14} className="animate-spin" />
              ) : (
                <Trash2 size={14} />
              )}
              {t('adminRemoveAdmin')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default SettingsPanel;
