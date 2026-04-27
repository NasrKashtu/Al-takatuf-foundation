import { useState, useEffect } from 'react';
import { useApp } from '@/contexts/AppContext';

const slideData = [
  {
    image: "/images/Slider/Screenshot 2025-07-31 143243.png",
    titleKey: 'slide1Title',
    descriptionKey: 'slide1Desc'
  },
  {
    image: "/images/Slider/Screenshot 2025-08-04 012641.png",
    titleKey: 'slide2Title',
    descriptionKey: 'slide2Desc'
  },
  {
    image: "/images/Slider/Slider Image.png",
    titleKey: 'slide3Title',
    descriptionKey: 'slide3Desc'
  }
];

const ImageSlider = () => {
  const { t, language } = useApp();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => setCurrentSlide((prev) => (prev + 1) % slideData.length),
      4000,
    );
    return () => clearInterval(timer);
  }, []);

  const isRTL = language === 'ar';

  return (
    // Slider uses LTR internally so translateX math is direction-independent;
    // the inner caption reads in the active language naturally.
    <section dir="ltr" className="py-16 bg-muted/40">
      <div className="container mx-auto px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 animate-fade-in">
            {t('sliderTitle')}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto animate-fade-in">
            {t('sliderDesc')}
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto px-4">
          <div className="overflow-hidden rounded-xl shadow-lg-soft">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {slideData.map((slide, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <div className="relative" dir={isRTL ? 'rtl' : 'ltr'}>
                    <img
                      src={slide.image}
                      alt={t(slide.titleKey)}
                      loading={index === 0 ? 'eager' : 'lazy'}
                      decoding="async"
                      className="w-full h-96 md:h-[570px] object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <div className="text-center text-white p-8 max-w-4xl">
                        <h3 className="text-3xl md:text-4xl font-bold mb-6">{t(slide.titleKey)}</h3>
                        <p className="text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">{t(slide.descriptionKey)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center mt-6">
            {slideData.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-4 h-4 rounded-md transition-all duration-300 mx-1.5 ${
                  currentSlide === index
                    ? 'bg-primary scale-110'
                    : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImageSlider;
