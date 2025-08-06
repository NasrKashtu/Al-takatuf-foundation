import { useState, useEffect } from 'react';
import { useApp } from '@/contexts/AppContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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
    image: "/images/Slider/Screenshot 2025-07-31 142643.png",
    titleKey: 'slide3Title',
    descriptionKey: 'slide3Desc'
  }
];

const ImageSlider = () => {
  const { t, language } = useApp();
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slideData.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slideData.length) % slideData.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section dir={language === 'ar' ? 'rtl' : 'ltr'} className="py-12 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-8">
        <div className={`text-center mb-12 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
          <h2 dir={language === 'ar' ? 'rtl' : 'ltr'} className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-6 animate-fade-in text-center">
            {t('sliderTitle')}
          </h2>
          <p dir={language === 'ar' ? 'rtl' : 'ltr'} className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto animate-fade-in text-center">
            {t('sliderDesc')}
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto px-4">
          <div className="overflow-hidden rounded-xl shadow-2xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ 
                transform: language === 'ar' 
                  ? `translateX(${currentSlide * 100}%)` 
                  : `translateX(-${currentSlide * 100}%)` 
              }}
            >
              {slideData.map((slide, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <div className="relative">
                    <img 
                      src={slide.image}
                      alt={t(slide.titleKey)}
                      className="w-full h-96 md:h-[500px] object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <div className={`text-center text-white p-8 max-w-4xl ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                        <h3 className="text-4xl font-bold mb-6 text-center">{t(slide.titleKey)}</h3>
                        <p className="text-xl leading-relaxed max-w-3xl mx-auto text-center">{t(slide.descriptionKey)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button 
            onClick={prevSlide} 
            className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/75 transition-colors z-10"
            aria-label="Previous Slide"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={nextSlide} 
            className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/75 transition-colors z-10"
            aria-label="Next Slide"
          >
            <ChevronRight size={24} />
          </button>

          {/* Dots */}
          <div className="flex justify-center mt-6">
            {slideData.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-4 h-4 rounded-md transition-all duration-300 mx-1.5 ${
                  currentSlide === index 
                    ? 'bg-teal-600 scale-110' 
                    : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
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
