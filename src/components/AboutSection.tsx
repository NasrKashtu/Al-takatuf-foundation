import { useApp } from '@/contexts/AppContext';

const AboutSection = () => {
  const { t } = useApp();

  return (
    <section id="about" className="py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 animate-fade-in">
          {t('aboutUs')}
        </h2>
        <p className="text-lg md:text-xl mb-10 max-w-4xl mx-auto leading-relaxed animate-fade-in text-start">
          {t('aboutUsDesc')}
        </p>
        <button className="bg-primary-foreground text-primary px-8 py-3 rounded-md hover:bg-primary-foreground/90 transition-colors duration-300 font-semibold hover-scale">
          {t('moreInfo')}
        </button>
      </div>
    </section>
  );
};

export default AboutSection;
