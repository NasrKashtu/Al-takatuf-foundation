import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Calendar,
  ExternalLink,
  LayoutDashboard,
  ListChecks,
  Lock,
  LogOut,
  Moon,
  Sun,
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
    <div className="min-h-screen flex items-center justify-center bg-muted/40 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-card border border-border rounded-xl shadow-md-soft p-8 space-y-6"
      >
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center">
            <Lock size={22} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">Admin</h1>
            <p className="text-sm text-muted-foreground">
              Enter the admin password to continue.
            </p>
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="admin-password" className="text-start block">
            Password
          </Label>
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
          />
          {error && (
            <p id="admin-error" className="text-sm text-destructive">
              Incorrect password.
            </p>
          )}
        </div>

        <Button type="submit" className="w-full h-10">
          Sign in
        </Button>

        <Link
          to="/"
          className="flex items-center justify-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft size={14} className="rtl:rotate-180" />
          Back to site
        </Link>
      </form>
    </div>
  );
};

// -----------------------------------------------------------------------------
// Chrome

const AdminHeader = ({ onLogout }: { onLogout: () => void }) => (
  <header className="bg-card border-b border-border sticky top-0 z-20 backdrop-blur-sm bg-card/95">
    <div className="container mx-auto px-4 h-14 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3 min-w-0">
        <div className="h-8 w-8 rounded-md bg-primary/10 text-primary flex items-center justify-center shrink-0">
          <Lock size={16} />
        </div>
        <span className="font-semibold text-foreground truncate">
          Altakathuf · Admin
        </span>
      </div>
      <div className="flex items-center gap-2">
        <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
          <Link to="/">
            <ExternalLink size={14} />
            View site
          </Link>
        </Button>
        <Button variant="outline" size="sm" onClick={onLogout}>
          <LogOut size={14} />
          <span className="hidden sm:inline">Log out</span>
        </Button>
      </div>
    </div>
  </header>
);

const Sidebar = ({
  tab,
  onChange,
}: {
  tab: Tab;
  onChange: (t: Tab) => void;
}) => {
  const items: { id: Tab; label: string; icon: React.ElementType }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'activities', label: 'Activities', icon: ListChecks },
  ];

  return (
    <nav
      aria-label="Admin sections"
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
  const { language, setLanguage, theme, setTheme } = useApp();

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
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Overview of the content currently rendered on the public site.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Activities" value={activities.length} />
        <StatCard
          label="Categories in use"
          value={byCategory.filter((c) => c.count > 0).length}
        />
        <StatCard
          label="Most recent"
          value={recent[0]?.date ?? '—'}
          small
        />
      </div>

      <section className="bg-card border border-border rounded-lg p-5">
        <h2 className="font-semibold text-foreground mb-3">By category</h2>
        <ul className="grid gap-2 sm:grid-cols-2">
          {byCategory.map(({ key, count }) => (
            <li
              key={key}
              className="flex items-center justify-between py-1.5 px-3 rounded-md hover:bg-muted/50"
            >
              <span className="flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: `hsl(var(--cat-${key}))` }}
                />
                <span className="text-sm text-foreground">
                  {CATEGORY_LABELS[key].en}
                </span>
              </span>
              <span className="text-sm font-semibold text-muted-foreground">
                {count}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-card border border-border rounded-lg p-5">
        <h2 className="font-semibold text-foreground mb-3">Recent activities</h2>
        {recent.length === 0 ? (
          <p className="text-sm text-muted-foreground">No activities yet.</p>
        ) : (
          <ul className="divide-y divide-border">
            {recent.map((a) => (
              <li key={a.id} className="py-2.5 flex items-center gap-3">
                <Calendar size={14} className="text-muted-foreground shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-foreground truncate">
                    {a.titleEn}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {a.date} · {CATEGORY_LABELS[a.category].en}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="bg-card border border-border rounded-lg p-5">
        <h2 className="font-semibold text-foreground mb-3">Preview controls</h2>
        <p className="text-sm text-muted-foreground mb-3">
          Switch the live site's language and theme without leaving admin.
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
            Light
          </Button>
          <Button
            variant={theme === 'dark' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTheme('dark')}
          >
            <Moon size={14} />
            Dark
          </Button>
        </div>
      </section>
    </div>
  );
};

const ActivitiesTab = () => (
  <div className="space-y-4">
    <div>
      <h1 className="text-2xl font-bold text-foreground">Activities</h1>
      <p className="text-sm text-muted-foreground mt-1">
        Create, edit, and delete the posts that appear in the "Activities &
        Impact" section.
      </p>
    </div>
    <ActivitiesPanel />
  </div>
);

const StatCard = ({
  label,
  value,
  small,
}: {
  label: string;
  value: string | number;
  small?: boolean;
}) => (
  <div className="bg-card border border-border rounded-lg p-5">
    <div className="text-sm text-muted-foreground">{label}</div>
    <div
      className={`${small ? 'text-lg' : 'text-2xl'} font-bold text-foreground mt-1`}
    >
      {value}
    </div>
  </div>
);

export default Admin;
