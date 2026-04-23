import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
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

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const { t, language } = useApp();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
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

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const navButtonClass = (section: string) => {
    const base =
      'relative px-3 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap';
    if (activeSection === section) {
      return `${base} text-primary`;
    }
    return `${base} text-foreground/70 hover:text-foreground`;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/90 backdrop-blur-md border-b border-border shadow-sm-soft'
          : 'bg-background/60 backdrop-blur-sm'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo — logical start */}
          <button
            onClick={() => scrollToSection('home')}
            className="flex items-center gap-3 text-lg font-bold text-foreground hover:text-primary transition-colors"
            aria-label={t('siteName')}
          >
            <div className="w-9 h-9 flex items-center justify-center rounded-full overflow-hidden ring-2 ring-primary/10">
              <img
                src="/favicon.png"
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <span className="hidden sm:inline">{t('siteName')}</span>
          </button>

          {/* Desktop nav — middle */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={navButtonClass(item.id)}
              >
                {t(item.label)}
                {activeSection === item.id && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-primary"
                  />
                )}
              </button>
            ))}
          </nav>

          {/* End actions */}
          <div className="flex items-center gap-2">
            <Button
              onClick={() => scrollToSection('contact')}
              size="sm"
              className="hidden sm:inline-flex h-9"
            >
              {t('getInvolved')}
            </Button>
            <LanguageThemeSwitcher />
            <button
              className="lg:hidden p-2 rounded-md text-foreground hover:bg-muted transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {isMenuOpen && (
          <nav
            className="lg:hidden border-t border-border py-3 animate-fade-in"
          >
            <div className="flex flex-col gap-1">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`${
                    activeSection === item.id
                      ? 'bg-primary/10 text-primary'
                      : 'text-foreground/80 hover:bg-muted'
                  } px-4 py-2.5 rounded-md text-sm font-medium text-start transition-colors`}
                >
                  {t(item.label)}
                </button>
              ))}
              <Button
                onClick={() => scrollToSection('contact')}
                className="mt-2 w-full h-11 text-base font-semibold sm:hidden"
              >
                {t('getInvolved')}
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
