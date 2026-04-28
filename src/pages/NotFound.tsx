import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useApp } from '@/contexts/AppContext';

const NotFound = () => {
  const { t } = useApp();

  return (
    <main className="relative min-h-[100dvh] flex items-center justify-center bg-background overflow-hidden">
      {/* Ambient background — same family as the hero */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/40 via-background to-background dark:from-secondary/20" />
        <div className="absolute -top-32 -start-32 h-[28rem] w-[28rem] rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-0 -end-32 h-[24rem] w-[24rem] rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-md text-center">
          <p
            className="font-bold text-primary/80 leading-none tabular-nums tracking-tight"
            style={{ fontSize: 'clamp(5rem, 18vw, 9rem)' }}
          >
            {t('notFoundCode')}
          </p>
          <h1 className="mt-2 text-2xl sm:text-3xl font-bold text-foreground">
            {t('notFoundTitle')}
          </h1>
          <p className="mt-3 text-base text-muted-foreground">
            {t('notFoundDesc')}
          </p>

          <div className="mt-8">
            <Button asChild size="lg" className="h-11 px-7 font-semibold">
              <Link to="/">
                <ArrowLeft size={16} className="rtl:rotate-180" />
                {t('notFoundBackHome')}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
