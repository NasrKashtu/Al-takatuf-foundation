import { Globe, Moon, Sun } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';

const LanguageThemeSwitcher = () => {
  const { language, theme, setLanguage, setTheme } = useApp();

  return (
    <div className="flex items-center gap-2">
      {/* Language Switcher */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
        className="gap-2"
        aria-label={language === 'en' ? 'Switch to Arabic' : 'Switch to English'}
      >
        <Globe size={16} />
        {language === 'en' ? 'EN' : 'AR'}
      </Button>

      {/* Theme Switcher */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
      >
        {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
      </Button>
    </div>
  );
};

export default LanguageThemeSwitcher;
