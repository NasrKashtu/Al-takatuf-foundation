import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Calendar,
  ChevronRight,
  ExternalLink,
  Folder,
  LayoutDashboard,
  ListChecks,
  Lock,
  LogOut,
  Moon,
  ShieldCheck,
  Sparkles,
  Sun,
  TrendingUp,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { useApp } from '@/contexts/AppContext';
import { useActivities } from '@/hooks/useActivities';
import { CATEGORY_KEYS, CATEGORY_LABELS } from '@/lib/activities';
import ActivitiesPanel from '@/components/admin/ActivitiesPanel';

type Tab = 'dashboard' | 'activities';

const Admin = () => {
  const { authed, login, logout } = useAdminAuth();
  const [tab, setTab] = useState<Tab>('dashboard');

  if (!authed) return <LoginGate onSubmit={login} />;

  return (
    <div className="min-h-screen bg-muted/40">
      <AdminHeader onLogout={logout} />
      <div className="container mx-auto px-4 py-6 lg:py-8">
        <div className="grid lg:grid-cols-[220px_1fr] gap-6">
          <Sidebar tab={tab} onChange={setTab} />
          <main className="min-w-0">
            {tab === 'dashboard' && <DashboardTab />}
            {tab === 'activities' && <ActivitiesTab />}
          </main>
        </div>
      </div>
    </div>
  );
};

// -----------------------------------------------------------------------------
// Login

const LoginGate = ({ onSubmit }: { onSubmit: (pw: string) => boolean }) => {
  const { t } = useApp();
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!onSubmit(password)) {
      setError(true);
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-background">
      {/* Hero panel — inline-start side */}
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

          <p className="text-xs text-primary-foreground/70">
            {t('copyright')}
          </p>
        </div>
      </aside>

      {/* Form panel */}
      <main className="lg:w-1/2 flex items-center justify-center p-6 sm:p-10 lg:p-12">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-sm space-y-6"
          aria-label={t('adminSignIn')}
        >
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

          <div className="space-y-1.5">
            <Label htmlFor="admin-password" className="text-start block">
              {t('adminPassword')}
            </Label>
            <div className="relative">
              <Lock
                size={16}
                className="absolute start-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
              />
              <Input
                id="admin-password"
                type="password"
                autoFocus
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError(false);
                }}
                aria-invalid={error}
                aria-describedby={error ? 'admin-error' : undefined}
                className="ps-9 h-11"
              />
            </div>
            {error && (
              <p id="admin-error" className="text-sm text-destructive">
                {t('adminIncorrectPassword')}
              </p>
            )}
          </div>

          <Button type="submit" className="w-full h-11 text-base font-semibold">
            {t('adminSignIn')}
            <ChevronRight size={16} className="rtl:rotate-180" />
          </Button>

          <Link
            to="/"
            className="flex items-center justify-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={14} className="rtl:rotate-180" />
            {t('adminBackToSite')}
          </Link>
        </form>
      </main>
    </div>
  );
};

// -----------------------------------------------------------------------------
// Chrome

const AdminHeader = ({ onLogout }: { onLogout: () => void }) => {
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
          <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
            <Link to="/">
              <ExternalLink size={14} />
              {t('adminViewSite')}
            </Link>
          </Button>
          <Button variant="outline" size="sm" onClick={onLogout}>
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
