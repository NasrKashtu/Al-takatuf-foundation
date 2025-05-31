
import { useState, useEffect } from 'react';
import { useApp } from '@/contexts/AppContext';

const ImageSlider = () => {
  const { t, language } = useApp();
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&h=400&fit=crop",
      title: t('slide1Title'),
      description: t('slide1Desc')
    },
    {
      image: "https://images.unsplash.com/photo-1559027006-b4923fa90207?w=800&h=400&fit=crop",
      title: t('slide2Title'),
      description: t('slide2Desc')
    },
    {
      image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800&h=400&fit=crop",
      title: t('slide3Title'),
      description: t('slide3Desc')
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4 animate-fade-in">
            {t('sliderTitle')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto animate-fade-in">
            {t('sliderDesc')}
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden rounded-lg shadow-lg">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {slides.map((slide, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <div className="relative">
                    <img 
                      src={slide.image} 
                      alt={slide.title}
                      className="w-full h-96 object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <div className={`text-center text-white p-6 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                        <h3 className="text-3xl font-bold mb-4">{slide.title}</h3>
                        <p className="text-lg max-w-2xl mx-auto">{slide.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Slide indicators */}
          <div className="flex justify-center mt-6 space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  currentSlide === index 
                    ? 'bg-teal-600' 
                    : 'bg-gray-300 dark:bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImageSlider;
