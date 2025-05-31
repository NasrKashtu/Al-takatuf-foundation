
import { useApp } from '@/contexts/AppContext';

const TestimonialSection = () => {
  const { t, language } = useApp();

  return (
    <section className="py-20 bg-teal-600 dark:bg-teal-700 text-white">
      <div className={`container mx-auto px-4 text-center ${language === 'ar' ? 'text-right' : 'text-left'}`}>
        <h2 className="text-4xl font-bold mb-8 text-center">{t('testimonials')}</h2>
        <p className="text-xl mb-12 text-center text-teal-100">{t('testimonialsDesc')}</p>
        
        <blockquote className="text-2xl md:text-3xl font-light italic mb-8 max-w-4xl mx-auto leading-relaxed animate-fade-in text-center">
          "{t('testimonialText')}"
        </blockquote>
        <cite className="text-teal-200 text-lg">- {t('testimonialAuthor')}</cite>
      </div>
    </section>
  );
};

export default TestimonialSection;
