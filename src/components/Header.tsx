
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import LanguageThemeSwitcher from './LanguageThemeSwitcher';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { t, language } = useApp();

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'mission-vision', 'programs', 'blog', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const getButtonClass = (section: string) => {
    const baseClass = "px-4 py-2 rounded-full transition-colors duration-300 whitespace-nowrap";
    if (activeSection === section) {
      return `${baseClass} text-white bg-teal-600`;
    }
    return `${baseClass} text-gray-600 dark:text-gray-300 hover:text-teal-600`;
  };

  return (
    <header 
      dir="rtl"
      className="fixed top-0 left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-sm z-50 transition-all duration-300"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-reverse space-x-4">
            <div className="ml-4"> 
              <LanguageThemeSwitcher />
            </div>
            <button 
              onClick={() => scrollToSection('contact')}
              className={getButtonClass('contact')}
            >
              {t('contact')}
            </button>
            <button 
              onClick={() => scrollToSection('blog')}
              className={getButtonClass('blog')}
            >
              {t('blog')}
            </button>
            <button 
              onClick={() => scrollToSection('programs')}
              className={getButtonClass('programs')}
            >
              {t('programs')}
            </button>
            <button 
              onClick={() => scrollToSection('mission-vision')}
              className={getButtonClass('mission-vision')}
            >
              {t('ourMissionAndVision')}
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className={getButtonClass('about')}
            >
              {t('about')}
            </button>
            <button 
              onClick={() => scrollToSection('home')}
              className={getButtonClass('home')}
            >
              {t('home')}
            </button>
          </nav>

          <div 
            className="flex items-center gap-3 cursor-pointer text-xl font-bold text-gray-700 dark:text-gray-200 animate-fade-in"
            onClick={() => scrollToSection('home')}
          >
            <div className="w-10 h-10 flex items-center justify-center rounded-md overflow-hidden">
              <img 
                src="/favicon.png"
                alt="Altakathuf Logo" 
                className="w-full h-full object-cover"
              />
            </div>
            <span>{t('siteName')}</span>
          </div>
          
          {/* Mobile Menu Button and Switchers */}
          <div className="md:hidden flex items-center gap-2">
            <button 
              className="text-gray-700 dark:text-gray-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div className="ml-4">
              <LanguageThemeSwitcher />
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 animate-slide-in-left">
            <div className="flex flex-col space-y-4">
              <button 
                onClick={() => scrollToSection('home')}
                className={`${getButtonClass('home')} text-center`}
              >
                {t('home')}
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className={`${getButtonClass('about')} text-center`}
              >
                {t('about')}
              </button>
              <button 
                onClick={() => scrollToSection('mission-vision')}
                className={`${getButtonClass('mission-vision')} text-center`}
              >
                {t('ourMissionAndVision')}
              </button>
              <button 
                onClick={() => scrollToSection('programs')}
                className={`${getButtonClass('programs')} text-center`}
              >
                {t('programs')}
              </button>
              <button 
                onClick={() => scrollToSection('blog')}
                className={`${getButtonClass('blog')} text-center`}
              >
                {t('blog')}
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className={`${getButtonClass('contact')} text-center`}
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
