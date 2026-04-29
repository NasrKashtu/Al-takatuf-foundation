import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Calendar,
  ExternalLink,
  Folder,
  LayoutDashboard,
  ListChecks,
  Loader2,
  Lock,
  LogOut,
  Moon,
  Settings as SettingsIcon,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Sun,
  TrendingUp,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { useApp } from '@/contexts/AppContext';
import { useActivities } from '@/hooks/useActivities';
import { CATEGORY_KEYS, CATEGORY_LABELS } from '@/lib/activities';
import ActivitiesPanel from '@/components/admin/ActivitiesPanel';
import SettingsPanel from '@/components/admin/SettingsPanel';
import SEO from '@/components/SEO';

type Tab = 'dashboard' | 'activities' | 'settings';

const Admin = () => {
  const auth = useAdminAuth();
  const [tab, setTab] = useState<Tab>('dashboard');

  if (auth.status === 'loading')
    return (
      <>
        <SEO title="Admin" path="/admin" noindex />
        <LoadingGate />
      </>
    );
  if (auth.status === 'misconfigured')
    return (
      <>
        <SEO title="Admin" path="/admin" noindex />
        <MisconfiguredGate />
      </>
    );
  if (auth.status === 'signed_out')
    return (
      <>
        <SEO title="Admin" path="/admin" noindex />
        <LoginGate onGoogle={auth.signInWithGoogle} />
      </>
    );
  if (auth.status === 'not_allowlisted')
    return (
      <>
        <SEO title="Admin" path="/admin" noindex />
        <NotAllowlistedGate email={auth.email ?? ''} onSignOut={auth.signOut} />
      </>
    );

  return (
    <div className="min-h-screen bg-muted/40">
      <SEO title="Admin" path="/admin" noindex />
      <AdminHeader email={auth.email ?? ''} onLogout={auth.signOut} />
      <div className="container mx-auto px-4 py-6 lg:py-8">
        <div className="grid lg:grid-cols-[220px_1fr] gap-6">
          <Sidebar tab={tab} onChange={setTab} />
          <main className="min-w-0">
            {tab === 'dashboard' && <DashboardTab />}
            {tab === 'activities' && <ActivitiesTab />}
            {tab === 'settings' && <SettingsTab />}
          </main>
        </div>
      </div>
    </div>
  );
};

// -----------------------------------------------------------------------------
// Gates

const LoadingGate = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <Loader2 className="h-6 w-6 animate-spin text-primary" />
  </div>
);

const MisconfiguredGate = () => (
  <div className="min-h-screen flex items-center justify-center bg-background px-6">
    <div className="max-w-md text-center space-y-3">
      <ShieldAlert className="mx-auto h-10 w-10 text-amber-500" />
      <h1 className="text-2xl font-bold text-foreground">Auth not configured</h1>
      <p className="text-sm text-muted-foreground">
        Set <code className="font-mono">VITE_SUPABASE_URL</code> and{' '}
        <code className="font-mono">VITE_SUPABASE_ANON_KEY</code> in the deploy
        environment, then redeploy. See <code className="font-mono">.env.example</code>.
      </p>
    </div>
  </div>
);

const LoginGate = ({ onGoogle }: { onGoogle: () => void | Promise<void> }) => {
  const { t } = useApp();

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-background">
      <aside
        aria-hidden="true"
        className="relative overflow-hidden lg:w-1/2 min-h-[280px] lg:min-h-screen bg-primary text-primary-foreground"
      >
        <img
          src="/images/Slider/Slider Image.png"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-30"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-primary/70" />
        <div className="absolute -top-32 -start-32 h-80 w-80 rounded-full bg-white/10 blur-3xl animate-pulse" />
        <div
          className="absolute -bottom-32 -end-32 h-96 w-96 rounded-full bg-secondary/30 blur-3xl animate-pulse"
          style={{ animationDelay: '1.5s' }}
        />

        <div className="relative h-full flex flex-col justify-between p-8 sm:p-10 lg:p-14 min-h-[280px] lg:min-h-screen">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-white/15 backdrop-blur-sm ring-2 ring-white/25 overflow-hidden flex items-center justify-center">
              <img src="/favicon.png" alt="" className="h-full w-full object-cover" />
            </div>
            <div className="leading-tight">
              <p className="text-xs uppercase tracking-wider opacity-80">
                {t('adminLoginEyebrow')}
              </p>
              <p className="font-semibold">{t('siteName')}</p>
            </div>
          </div>

          <div className="space-y-5 max-w-md py-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm px-3 py-1 text-xs ring-1 ring-white/20">
              <Sparkles size={12} />
              <span>{t('adminBrand')}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
              {t('adminWelcomeTitle')}
            </h1>
            <p className="text-base sm:text-lg text-primary-foreground/85 leading-relaxed">
              {t('adminWelcomeDesc')}
            </p>
          </div>

          <p className="text-xs text-primary-foreground/70">{t('copyright')}</p>
        </div>
      </aside>

      <main className="lg:w-1/2 flex items-center justify-center p-6 sm:p-10 lg:p-12">
        <div className="w-full max-w-sm space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              <ShieldCheck size={14} className="text-primary" />
              <span>{t('adminLoginEyebrow')}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
              {t('adminSignIn')}
            </h2>
            <p className="text-sm text-muted-foreground">{t('adminLoginDesc')}</p>
          </div>

          <Button
            type="button"
            onClick={() => void onGoogle()}
            className="w-full h-11 text-base font-semibold"
            variant="outline"
          >
            <GoogleIcon />
            {t('adminGoogleSignIn')}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            {t('adminGoogleOnlyHint')}
          </p>

          <Link
            to="/"
            className="flex items-center justify-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={14} className="rtl:rotate-180" />
            {t('adminBackToSite')}
          </Link>
        </div>
      </main>
    </div>
  );
};

const NotAllowlistedGate = ({
  email,
  onSignOut,
}: {
  email: string;
  onSignOut: () => void | Promise<void>;
}) => {
  const { t } = useApp();
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="max-w-md text-center space-y-4">
        <ShieldAlert className="mx-auto h-10 w-10 text-amber-500" />
        <h1 className="text-2xl font-bold text-foreground">
          {t('adminNotAllowlistedTitle')}
        </h1>
        <p className="text-sm text-muted-foreground">
          {t('adminNotAllowlistedDesc')}{' '}
          <span className="font-mono text-foreground">{email}</span>
        </p>
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <Button onClick={() => void onSignOut()}>{t('adminSignOutAndRetry')}</Button>
          <Button variant="outline" asChild>
            <Link to="/">{t('adminBackToSite')}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
    <path
      fill="#4285F4"
      d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"
    />
    <path
      fill="#34A853"
      d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"
    />
    <path
      fill="#FBBC05"
      d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"
    />
    <path
      fill="#EA4335"
      d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"
    />
  </svg>
);

// -----------------------------------------------------------------------------
// Chrome

const AdminHeader = ({
  email,
  onLogout,
}: {
  email: string;
  onLogout: () => void | Promise<void>;
}) => {
  const { t } = useApp();
  return (
    <header className="bg-card border-b border-border sticky top-0 z-20 backdrop-blur-sm bg-card/95">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="h-8 w-8 rounded-md bg-primary/10 text-primary flex items-center justify-center shrink-0">
            <Lock size={16} />
          </div>
          <span className="font-semibold text-foreground truncate">
            {t('adminBrand')}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span
            className="hidden sm:inline-block text-xs text-muted-foreground truncate max-w-[200px]"
            title={email}
          >
            {email}
          </span>
          <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
            <Link to="/">
              <ExternalLink size={14} />
              {t('adminViewSite')}
            </Link>
          </Button>
          <Button variant="outline" size="sm" onClick={() => void onLogout()}>
            <LogOut size={14} />
            <span className="hidden sm:inline">{t('adminLogout')}</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

const Sidebar = ({
  tab,
  onChange,
}: {
  tab: Tab;
  onChange: (t: Tab) => void;
}) => {
  const { t } = useApp();
  const items: { id: Tab; label: string; icon: React.ElementType }[] = [
    { id: 'dashboard', label: t('adminDashboard'), icon: LayoutDashboard },
    { id: 'activities', label: t('adminActivities'), icon: ListChecks },
    { id: 'settings', label: t('adminSettings'), icon: SettingsIcon },
  ];

  return (
    <nav
      aria-label={t('adminSectionsLabel')}
      className="bg-card border border-border rounded-lg p-2 h-max lg:sticky lg:top-20"
    >
      <ul className="flex lg:flex-col gap-1">
        {items.map((item) => {
          const Icon = item.icon;
          const active = tab === item.id;
          return (
            <li key={item.id} className="flex-1 lg:flex-initial">
              <button
                onClick={() => onChange(item.id)}
                aria-current={active ? 'page' : undefined}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  active
                    ? 'bg-primary/10 text-primary'
                    : 'text-foreground/70 hover:bg-muted hover:text-foreground'
                }`}
              >
                <Icon size={16} />
                {item.label}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

// -----------------------------------------------------------------------------
// Tabs

const DashboardTab = () => {
  const { activities } = useActivities();
  const { language, setLanguage, theme, setTheme, t } = useApp();

  const byCategory = CATEGORY_KEYS.map((key) => ({
    key,
    count: activities.filter((a) => a.category === key).length,
  }));

  const recent = [...activities]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">{t('adminDashboard')}</h1>
        <p className="text-sm text-muted-foreground mt-1">
          {t('adminDashboardDesc')}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard
          label={t('adminActivities')}
          value={activities.length}
          icon={ListChecks}
          tone="primary"
        />
        <StatCard
          label={t('adminCategoriesInUse')}
          value={byCategory.filter((c) => c.count > 0).length}
          icon={Folder}
          tone="emerald"
        />
        <StatCard
          label={t('adminMostRecent')}
          value={recent[0]?.date ?? '—'}
          icon={TrendingUp}
          tone="amber"
          small
        />
      </div>

      <section className="bg-card border border-border rounded-lg p-5 shadow-sm">
        <h2 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          <Folder size={16} className="text-muted-foreground" />
          {t('adminByCategory')}
        </h2>
        <ul className="grid gap-3 sm:grid-cols-2">
          {byCategory.map(({ key, count }) => {
            const max = Math.max(1, ...byCategory.map((c) => c.count));
            const pct = (count / max) * 100;
            return (
              <li key={key} className="space-y-1.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="flex items-center gap-2 min-w-0">
                    <span
                      aria-hidden="true"
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: `hsl(var(--cat-${key}))` }}
                    />
                    <span className="text-sm text-foreground truncate">
                      {CATEGORY_LABELS[key][language]}
                    </span>
                  </span>
                  <span className="text-sm font-semibold text-foreground tabular-nums">
                    {count}
                  </span>
                </div>
                <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${pct}%`,
                      backgroundColor: `hsl(var(--cat-${key}))`,
                    }}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="bg-card border border-border rounded-lg p-5 shadow-sm">
        <h2 className="font-semibold text-foreground mb-3 flex items-center gap-2">
          <Calendar size={16} className="text-muted-foreground" />
          {t('adminRecentActivities')}
        </h2>
        {recent.length === 0 ? (
          <p className="text-sm text-muted-foreground">{t('adminNoActivitiesYet')}</p>
        ) : (
          <ul className="divide-y divide-border">
            {recent.map((a) => (
              <li key={a.id} className="py-2.5 flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: `hsl(var(--cat-${a.category}))` }}
                />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-foreground truncate">
                    {language === 'ar' ? a.titleAr : a.titleEn}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {a.date} · {CATEGORY_LABELS[a.category][language]}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="bg-card border border-border rounded-lg p-5 shadow-sm">
        <h2 className="font-semibold text-foreground mb-3 flex items-center gap-2">
          <Sparkles size={16} className="text-muted-foreground" />
          {t('adminPreviewControls')}
        </h2>
        <p className="text-sm text-muted-foreground mb-3">
          {t('adminPreviewControlsDesc')}
        </p>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={language === 'en' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setLanguage('en')}
          >
            English
          </Button>
          <Button
            variant={language === 'ar' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setLanguage('ar')}
          >
            العربية
          </Button>
          <span aria-hidden="true" className="mx-1 w-px self-stretch bg-border" />
          <Button
            variant={theme === 'light' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTheme('light')}
          >
            <Sun size={14} />
            {t('adminLight')}
          </Button>
          <Button
            variant={theme === 'dark' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTheme('dark')}
          >
            <Moon size={14} />
            {t('adminDark')}
          </Button>
        </div>
      </section>
    </div>
  );
};

const ActivitiesTab = () => {
  const { t } = useApp();
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-foreground">{t('adminActivities')}</h1>
        <p className="text-sm text-muted-foreground mt-1">
          {t('adminActivitiesDesc')}
        </p>
      </div>
      <ActivitiesPanel />
    </div>
  );
};

const SettingsTab = () => {
  const { t } = useApp();
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-foreground">{t('adminSettings')}</h1>
        <p className="text-sm text-muted-foreground mt-1">
          {t('adminSettingsDesc')}
        </p>
      </div>
      <SettingsPanel />
    </div>
  );
};

type StatTone = 'primary' | 'emerald' | 'amber';

const TONE_STYLES: Record<StatTone, { bg: string; text: string }> = {
  primary: { bg: 'bg-primary/10', text: 'text-primary' },
  emerald: { bg: 'bg-emerald-500/10', text: 'text-emerald-600 dark:text-emerald-400' },
  amber: { bg: 'bg-amber-500/10', text: 'text-amber-600 dark:text-amber-400' },
};

const StatCard = ({
  label,
  value,
  small,
  icon: Icon,
  tone = 'primary',
}: {
  label: string;
  value: string | number;
  small?: boolean;
  icon?: React.ElementType;
  tone?: StatTone;
}) => {
  const styles = TONE_STYLES[tone];
  return (
    <div className="bg-card border border-border rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-sm text-muted-foreground">{label}</div>
          <div
            className={`${small ? 'text-lg' : 'text-2xl'} font-bold text-foreground mt-1 truncate tabular-nums`}
          >
            {value}
          </div>
        </div>
        {Icon && (
          <div
            className={`h-10 w-10 rounded-lg flex items-center justify-center shrink-0 ${styles.bg} ${styles.text}`}
          >
            <Icon size={18} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
