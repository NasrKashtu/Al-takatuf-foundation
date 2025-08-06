
import { Globe, Moon, Sun } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const LanguageThemeSwitcher = () => {
  const { language, theme, setLanguage, setTheme } = useApp();

  return (
    <div className="flex items-center gap-2">
      {/* Language Switcher */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => {
          console.log('Language switch clicked');
          setLanguage(language === 'en' ? 'ar' : 'en');
        }}
        className="gap-2"
      >
        <Globe size={16} />
        {language === 'en' ? 'EN' : 'AR'}
      </Button>

      {/* Theme Switcher */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      >
        {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
      </Button>
    </div>
  );
};

export default LanguageThemeSwitcher;
