import { ArrowRight } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  const { t } = useApp();

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section
      id="home"
      className="relative overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32"
    >
      {/* Soft ambient background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/60 via-background to-background dark:from-secondary/30" />
        <div className="animate-blob-drift-1 absolute -top-24 -left-24 h-[32rem] w-[32rem] rounded-full bg-primary/15 blur-3xl dark:bg-primary/10" />
        <div className="animate-blob-drift-2 absolute top-1/3 -right-32 h-[28rem] w-[28rem] rounded-full bg-primary/10 blur-3xl dark:bg-primary/5" />
      </div>

      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          {/* Eyebrow tagline */}
          <div
            className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary animate-fade-in"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            {t('heroTagline')}
          </div>

          {/* Headline */}
          <h1
            className="mt-6 text-4xl sm:text-5xl md:text-display-sm lg:text-display font-bold tracking-tight text-foreground animate-fade-in"
            style={{ animationDelay: '80ms' }}
          >
            {t('welcome')}
          </h1>

          {/* Subhead */}
          <p
            className="mx-auto mt-6 max-w-2xl text-lg md:text-xl leading-relaxed text-muted-foreground animate-fade-in"
            style={{ animationDelay: '160ms' }}
          >
            {t('description')}
          </p>

          {/* CTAs — primary uses nested-icon "button-in-button" pattern with
              magnetic hover translate on the inner pill. */}
          <div
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 animate-fade-in"
            style={{ animationDelay: '240ms' }}
          >
            <Button
              size="lg"
              onClick={() => scrollTo('contact')}
              className="group w-full sm:w-auto h-14 ps-7 pe-2 text-base font-semibold rounded-full shadow-md-soft hover:shadow-lg-soft"
            >
              <span>{t('getInvolved')}</span>
              <span
                aria-hidden="true"
                className="ms-1 inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary-foreground/15 ring-1 ring-primary-foreground/15 transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5"
              >
                <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </span>
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => scrollTo('about')}
              className="w-full sm:w-auto h-14 px-7 text-base font-semibold rounded-full"
            >
              {t('learnMore')}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
