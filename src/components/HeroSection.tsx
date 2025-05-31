
import { useApp } from '@/contexts/AppContext';

const HeroSection = () => {
  const { t } = useApp();

  return (
    <section id="home" className="pt-16 pb-4 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 dark:text-gray-100 mb-6 animate-fade-in">
            {t('welcome')}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-4 max-w-3xl mx-auto leading-relaxed animate-fade-in">
            {t('description')}
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
