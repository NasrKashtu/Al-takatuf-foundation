
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import LanguageThemeSwitcher from './LanguageThemeSwitcher';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useApp();

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-sm z-50 transition-all duration-300">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-gray-700 dark:text-gray-200 animate-fade-in">
            ALTAKATHUF
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 items-center">
            <a href="#home" className="text-white bg-teal-600 px-4 py-2 rounded-full hover:bg-teal-700 transition-colors duration-300">
              {t('home')}
            </a>
            <a href="#about" className="text-gray-600 dark:text-gray-300 hover:text-teal-600 transition-colors duration-300">
              {t('about')}
            </a>
            <a href="#services" className="text-gray-600 dark:text-gray-300 hover:text-teal-600 transition-colors duration-300">
              {t('services')}
            </a>
            <a href="#blog" className="text-gray-600 dark:text-gray-300 hover:text-teal-600 transition-colors duration-300">
              {t('blog')}
            </a>
            <a href="#contact" className="text-gray-600 dark:text-gray-300 hover:text-teal-600 transition-colors duration-300">
              {t('contact')}
            </a>
            <LanguageThemeSwitcher />
          </nav>

          {/* Mobile Menu Button and Switchers */}
          <div className="md:hidden flex items-center gap-2">
            <LanguageThemeSwitcher />
            <button 
              className="text-gray-700 dark:text-gray-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 animate-slide-in-right">
            <div className="flex flex-col space-y-4">
              <a href="#home" className="text-white bg-teal-600 px-4 py-2 rounded-full text-center">{t('home')}</a>
              <a href="#about" className="text-gray-600 dark:text-gray-300 px-4 py-2 text-center">{t('about')}</a>
              <a href="#services" className="text-gray-600 dark:text-gray-300 px-4 py-2 text-center">{t('services')}</a>
              <a href="#blog" className="text-gray-600 dark:text-gray-300 px-4 py-2 text-center">{t('blog')}</a>
              <a href="#contact" className="text-gray-600 dark:text-gray-300 px-4 py-2 text-center">{t('contact')}</a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
