
import { useState } from 'react';
import { Menu, X, Home } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import LanguageThemeSwitcher from './LanguageThemeSwitcher';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t, language } = useApp();

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-sm z-50 transition-all duration-300">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div 
            className={`flex items-center gap-3 cursor-pointer text-2xl font-bold text-gray-700 dark:text-gray-200 animate-fade-in ${language === 'ar' ? 'flex-row-reverse' : ''}`}
            onClick={() => scrollToSection('home')}
          >
            <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center">
              <Home size={18} className="text-white" />
            </div>
            <span>ALTAKATHUF</span>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 items-center">
            <button 
              onClick={() => scrollToSection('home')}
              className="text-white bg-teal-600 px-4 py-2 rounded-full hover:bg-teal-700 transition-colors duration-300"
            >
              {t('home')}
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="text-gray-600 dark:text-gray-300 hover:text-teal-600 transition-colors duration-300"
            >
              {t('about')}
            </button>
            <button 
              onClick={() => scrollToSection('services')}
              className="text-gray-600 dark:text-gray-300 hover:text-teal-600 transition-colors duration-300"
            >
              {t('services')}
            </button>
            <button 
              onClick={() => scrollToSection('blog')}
              className="text-gray-600 dark:text-gray-300 hover:text-teal-600 transition-colors duration-300"
            >
              {t('blog')}
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-gray-600 dark:text-gray-300 hover:text-teal-600 transition-colors duration-300"
            >
              {t('contact')}
            </button>
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
              <button 
                onClick={() => scrollToSection('home')}
                className="text-white bg-teal-600 px-4 py-2 rounded-full text-center"
              >
                {t('home')}
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="text-gray-600 dark:text-gray-300 px-4 py-2 text-center"
              >
                {t('about')}
              </button>
              <button 
                onClick={() => scrollToSection('services')}
                className="text-gray-600 dark:text-gray-300 px-4 py-2 text-center"
              >
                {t('services')}
              </button>
              <button 
                onClick={() => scrollToSection('blog')}
                className="text-gray-600 dark:text-gray-300 px-4 py-2 text-center"
              >
                {t('blog')}
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-gray-600 dark:text-gray-300 px-4 py-2 text-center"
              >
                {t('contact')}
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
