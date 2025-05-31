
import { useApp } from '@/contexts/AppContext';

const Footer = () => {
  const { t, language } = useApp();

  return (
    <footer className="bg-gray-800 dark:bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* About Section */}
          <div className={`${language === 'ar' ? 'text-right' : 'text-left'}`}>
            <h3 className="text-xl font-bold mb-4 text-teal-400">{t('footerAbout')}</h3>
            <p className="text-gray-300 leading-relaxed">
              {t('footerAboutText')}
            </p>
          </div>

          {/* Services Section */}
          <div className={`${language === 'ar' ? 'text-right' : 'text-left'}`}>
            <h3 className="text-xl font-bold mb-4 text-teal-400">{t('footerServices')}</h3>
            <ul className="space-y-2">
              <li><a href="#services" className="text-gray-300 hover:text-teal-400 transition-colors duration-300">{t('footerCoaching')}</a></li>
              <li><a href="#services" className="text-gray-300 hover:text-teal-400 transition-colors duration-300">{t('footerWorkshops')}</a></li>
              <li><a href="#services" className="text-gray-300 hover:text-teal-400 transition-colors duration-300">{t('footerCommunity')}</a></li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className={`${language === 'ar' ? 'text-right' : 'text-left'}`}>
            <h3 className="text-xl font-bold mb-4 text-teal-400">{t('footerContactInfo')}</h3>
            <div className="space-y-2 text-gray-300">
              <p>{t('footerPhone')}</p>
              <p>{t('footerEmail')}</p>
              <p className="leading-relaxed">{t('footerAddress')}</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className={`${language === 'ar' ? 'text-right' : 'text-left'}`}>
            <h3 className="text-xl font-bold mb-4 text-teal-400">{t('followUs')}</h3>
            <div className="space-y-2">
              <a href="#home" className="block text-gray-300 hover:text-teal-400 transition-colors duration-300">{t('home')}</a>
              <a href="#about" className="block text-gray-300 hover:text-teal-400 transition-colors duration-300">{t('about')}</a>
              <a href="#services" className="block text-gray-300 hover:text-teal-400 transition-colors duration-300">{t('services')}</a>
              <a href="#contact" className="block text-gray-300 hover:text-teal-400 transition-colors duration-300">{t('contact')}</a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 pt-8">
          <div className={`flex flex-col md:flex-row justify-between items-center ${language === 'ar' ? 'text-right' : 'text-left'}`}>
            <div className="mb-4 md:mb-0">
              <span className="text-gray-400">{t('copyright')}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-teal-400 font-bold text-lg">{t('siteName')}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
