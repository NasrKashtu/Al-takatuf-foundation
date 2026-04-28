import { useState, useEffect } from 'react';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import LanguageThemeSwitcher from './LanguageThemeSwitcher';

const NAV_ITEMS = [
  { id: 'home', label: 'home' },
  { id: 'about', label: 'about' },
  { id: 'mission-vision', label: 'ourMissionAndVision' },
  { id: 'programs', label: 'programs' },
  { id: 'blog', label: 'blog' },
  { id: 'contact', label: 'contact' },
] as const;

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const { t } = useApp();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120;
      setIsScrolled(window.scrollY > 8);

      for (const item of NAV_ITEMS) {
        const element = document.getElementById(item.id);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll while the fullscreen mobile menu is open.
  useEffect(() => {
    if (!isMenuOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, [isMenuOpen]);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const navButtonClass = (section: string) => {
    const base = `relative px-3.5 py-1.5 text-sm font-medium rounded-full transition-colors whitespace-nowrap ${focusRing}`;
    return activeSection === section
      ? `${base} bg-primary/10 text-primary`
      : `${base} text-foreground/70 hover:text-foreground hover:bg-foreground/5`;
  };

  return (
    <>
      {/* Floating pill header — detached from the top edge, glass surface,
          shadow lifts on scroll. z-50 so the morphing hamburger stays above
          the open mobile menu (which is z-40). */}
      <header
        className="fixed top-3 sm:top-4 inset-x-0 z-50 flex justify-center pointer-events-none px-3"
        aria-label="Site header"
      >
        <div
          className={`pointer-events-auto flex items-center gap-2 sm:gap-3 h-14 ps-2 pe-1.5 rounded-full
            bg-background/70 dark:bg-background/60 backdrop-blur-xl
            ring-1 ring-border/70 dark:ring-border/40
            transition-shadow duration-300
            ${isScrolled ? 'shadow-md-soft' : 'shadow-sm-soft'}`}
        >
          {/* Brand */}
          <button
            onClick={() => scrollToSection('home')}
            className={`flex items-center gap-2.5 ps-2 pe-3 h-11 rounded-full text-sm font-semibold text-foreground hover:bg-foreground/5 transition-colors ${focusRing}`}
            aria-label={t('siteName')}
          >
            <span className="w-8 h-8 flex items-center justify-center rounded-full overflow-hidden ring-1 ring-primary/20">
              <img
                src="/favicon.png"
                alt=""
                className="w-full h-full object-cover"
              />
            </span>
            <span className="hidden sm:inline truncate max-w-[12rem]">
              {t('siteName')}
            </span>
          </button>

          {/* Desktop nav — middle */}
          <nav
            aria-label="Primary"
            className="hidden lg:flex items-center gap-0.5 px-1 border-s border-border/60 ms-1 ps-2"
          >
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={navButtonClass(item.id)}
                aria-current={activeSection === item.id ? 'page' : undefined}
              >
                {t(item.label)}
              </button>
            ))}
          </nav>

          {/* End actions */}
          <div className="flex items-center gap-1.5 ms-auto ps-1 sm:ps-2 sm:border-s border-border/60">
            <LanguageThemeSwitcher />
            <Button
              onClick={() => scrollToSection('contact')}
              size="sm"
              className="hidden sm:inline-flex h-9 rounded-full px-4"
            >
              {t('getInvolved')}
            </Button>
            <button
              type="button"
              onClick={() => setIsMenuOpen((o) => !o)}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-nav"
              className={`hamburger lg:hidden h-10 w-10 rounded-full text-foreground hover:bg-foreground/5 transition-colors ${focusRing} ${isMenuOpen ? 'is-open' : ''}`}
            >
              <span aria-hidden="true" />
              <span aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile fullscreen menu — close affordance is the morphing hamburger
          in the floating pill above. z-40 so the pill (z-50) stays on top. */}
      {isMenuOpen && (
        <div
          id="mobile-nav"
          className="fixed inset-0 z-40 lg:hidden bg-background/95 backdrop-blur-xl animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-label={t('siteName')}
        >
          <div className="container mx-auto px-4 h-full flex flex-col justify-center">
            <nav
              aria-label="Primary"
              className="flex flex-col gap-1"
            >
              {NAV_ITEMS.map((item, i) => {
                const active = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    aria-current={active ? 'page' : undefined}
                    className={`text-start text-3xl sm:text-4xl font-bold py-3 px-2 rounded-md transition-colors duration-300 ${
                      active ? 'text-primary' : 'text-foreground/85 hover:text-foreground'
                    } ${focusRing}`}
                    style={{
                      animation: 'fadeIn 500ms cubic-bezier(0.32,0.72,0,1) backwards',
                      animationDelay: `${80 + i * 60}ms`,
                    }}
                  >
                    {t(item.label)}
                  </button>
                );
              })}
              <Button
                onClick={() => scrollToSection('contact')}
                className="mt-8 h-12 text-base font-semibold rounded-full self-start px-7"
              >
                {t('getInvolved')}
              </Button>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
