
import { useApp } from '@/contexts/AppContext';

const AboutSection = () => {
  const { t, language } = useApp();

  return (
    <section id="about" className="py-20 bg-teal-600 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-8 animate-fade-in">{t('aboutUs')}</h2>
        <p className={`text-xl mb-8 max-w-4xl mx-auto leading-relaxed animate-fade-in ${language === 'ar' ? 'text-right' : 'text-left'}`}>
          {t('aboutUsDesc')}
        </p>
        <button className="bg-gray-800 text-white px-8 py-3 rounded hover:bg-gray-900 transition-colors duration-300 font-medium hover-scale">
          {t('moreInfo')}
        </button>
      </div>
    </section>
  );
};

export default AboutSection;
