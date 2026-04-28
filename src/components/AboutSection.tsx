import { useApp } from '@/contexts/AppContext';
import { useReveal } from '@/hooks/useReveal';

const FACEBOOK_URL = 'https://www.facebook.com/profile.php?id=61574523478564';

const AboutSection = () => {
  const { t } = useApp();
  const reveal = useReveal<HTMLDivElement>();

  return (
    <section id="about" className="py-24 md:py-28 bg-primary text-primary-foreground">
      <div ref={reveal.ref} className={`container mx-auto px-4 text-center ${reveal.className}`}>
        <h2 className="text-3xl md:text-4xl font-bold mb-8">
          {t('aboutUs')}
        </h2>
        <p className="text-lg md:text-xl mb-10 max-w-4xl mx-auto leading-relaxed text-start">
          {t('aboutUsDesc')}
        </p>
        <a
          href={FACEBOOK_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-primary-foreground text-primary px-8 py-3 rounded-full hover:bg-primary-foreground/90 transition-colors duration-300 font-semibold hover:scale-[1.02] active:scale-[0.98]"
        >
          {t('moreInfo')}
        </a>
      </div>
    </section>
  );
};

export default AboutSection;
