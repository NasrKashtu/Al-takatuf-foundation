
import { useApp } from '@/contexts/AppContext';
import { Mail, Phone, MapPin } from 'lucide-react';

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

          {/* Programs Section */}
          <div className={`${language === 'ar' ? 'text-right' : 'text-left'}`}>
            <h3 className="text-xl font-bold mb-4 text-teal-400">{t('footerPrograms')}</h3>
            <ul className="space-y-2">
              <li><a href="#programs" className="text-gray-300 hover:text-teal-400 transition-colors duration-300">{t('footerCoaching')}</a></li>
              <li><a href="#programs" className="text-gray-300 hover:text-teal-400 transition-colors duration-300">{t('footerWorkshops')}</a></li>
              <li><a href="#programs" className="text-gray-300 hover:text-teal-400 transition-colors duration-300">{t('footerCommunity')}</a></li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className={`${language === 'ar' ? 'text-right' : 'text-left'}`}>
            <h3 className="text-xl font-bold mb-4 text-teal-400">{t('footerContactInfo')}</h3>
            <div className="space-y-2 text-gray-300">
              <div className="flex items-center gap-2">
                <MapPin className="text-teal-400" />
                <span>بلدية الشرقية/أم الأرانب</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="text-teal-400" />
                <span>+218 92-0252670</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="text-teal-400" />
                <span>altakatef1@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Follow Us Section */}
          <div className={`${language === 'ar' ? 'text-right' : 'text-left'}`}>
            <h3 className="text-xl font-bold mb-4 text-teal-400">{t('followUs')}</h3>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/profile.php?id=61574523478564" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-teal-400 transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="https://twitter.com/yourprofile" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-teal-400 transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </a>
              <a href="https://www.linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-teal-400 transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
              <a href="https://t.me/yourprofile" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-teal-400 transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-send"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
              </a>
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
