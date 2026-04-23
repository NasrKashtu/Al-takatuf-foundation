import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Lock, LogOut, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { useApp } from '@/contexts/AppContext';

const BLOG_KEYS = [
  { title: 'youthEducation', desc: 'youthEducationDesc' },
  { title: 'communityCleanup', desc: 'communityCleanupDesc' },
  { title: 'womenEmpowerment', desc: 'womenEmpowermentDesc' },
  { title: 'healthAwareness', desc: 'healthAwarenessDesc' },
  { title: 'childrenArt', desc: 'childrenArtDesc' },
  { title: 'foodDistribution', desc: 'foodDistributionDesc' },
] as const;

const PROGRAM_KEYS = [
  { title: 'program1Title', desc: 'program1Desc' },
  { title: 'program2Title', desc: 'program2Desc' },
  { title: 'program3Title', desc: 'program3Desc' },
] as const;

const LoginGate = ({ onSubmit }: { onSubmit: (pw: string) => boolean }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = onSubmit(password);
    if (!ok) {
      setError(true);
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/40 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-card border border-border rounded-lg shadow-md-soft p-8 space-y-6"
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

        <div className="space-y-2">
          <label
            htmlFor="admin-password"
            className="block text-sm font-medium text-foreground text-start"
          >
            Password
          </label>
          <input
            id="admin-password"
            type="password"
            autoFocus
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (error) setError(false);
            }}
            className="w-full px-4 py-2.5 border border-input bg-background text-foreground rounded-lg placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/30 focus:outline-none transition-colors"
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

const Dashboard = ({ onLogout }: { onLogout: () => void }) => {
  const { t, language, setLanguage, theme, setTheme } = useApp();

  return (
    <div className="min-h-screen bg-muted/40">
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
              <Lock size={16} />
            </div>
            <span className="font-semibold text-foreground">
              Altakathuf · Admin
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Link
              to="/"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-md hover:bg-muted"
            >
              View site
            </Link>
            <Button
              variant="outline"
              size="sm"
              onClick={onLogout}
              className="h-8"
            >
              <LogOut size={14} />
              Log out
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        <section>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Content preview. Editing and publishing will ship in a follow-up once
            a backend is in place.
          </p>
        </section>

        <section className="grid gap-4 sm:grid-cols-3">
          <StatCard label="Blog activities" value={BLOG_KEYS.length} />
          <StatCard label="Programs" value={PROGRAM_KEYS.length} />
          <StatCard
            label="Active locale"
            value={language === 'ar' ? 'Arabic' : 'English'}
          />
        </section>

        <section className="bg-card border border-border rounded-lg p-5 space-y-3">
          <h2 className="font-semibold text-foreground">Preview controls</h2>
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
            <span className="mx-2 w-px bg-border" />
            <Button
              variant={theme === 'light' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTheme('light')}
            >
              Light
            </Button>
            <Button
              variant={theme === 'dark' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTheme('dark')}
            >
              Dark
            </Button>
          </div>
        </section>

        <section>
          <h2 className="font-semibold text-foreground mb-3">Blog activities</h2>
          <div className="grid gap-3 md:grid-cols-2">
            {BLOG_KEYS.map((item) => (
              <article
                key={item.title}
                className="bg-card border border-border rounded-lg p-4"
              >
                <h3 className="font-medium text-foreground text-start line-clamp-1">
                  {t(item.title)}
                </h3>
                <p className="text-sm text-muted-foreground mt-1 text-start line-clamp-2">
                  {t(item.desc)}
                </p>
                <p className="text-xs text-muted-foreground/70 mt-2 font-mono">
                  {item.title}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section>
          <h2 className="font-semibold text-foreground mb-3">Programs</h2>
          <div className="grid gap-3 md:grid-cols-3">
            {PROGRAM_KEYS.map((item) => (
              <article
                key={item.title}
                className="bg-card border border-border rounded-lg p-4"
              >
                <h3 className="font-medium text-foreground text-start line-clamp-1">
                  {t(item.title)}
                </h3>
                <p className="text-sm text-muted-foreground mt-1 text-start line-clamp-3">
                  {t(item.desc)}
                </p>
                <p className="text-xs text-muted-foreground/70 mt-2 font-mono">
                  {item.title}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-card border border-border rounded-lg p-5">
          <h2 className="font-semibold text-foreground">Where content lives</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Until a backend is wired up, site copy is sourced from{' '}
            <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded">
              src/contexts/AppContext.tsx
            </code>
            . Edit the <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded">translations</code>{' '}
            object there and redeploy.
          </p>
        </section>
      </main>
    </div>
  );
};

const StatCard = ({ label, value }: { label: string; value: string | number }) => (
  <div className="bg-card border border-border rounded-lg p-5">
    <div className="text-sm text-muted-foreground">{label}</div>
    <div className="text-2xl font-bold text-foreground mt-1">{value}</div>
  </div>
);

const Admin = () => {
  const { authed, login, logout } = useAdminAuth();
  if (!authed) return <LoginGate onSubmit={login} />;
  return <Dashboard onLogout={logout} />;
};

export default Admin;
