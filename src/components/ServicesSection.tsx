
import { useApp } from '@/contexts/AppContext';

const ServicesSection = () => {
  const { t } = useApp();
  
  const services = [
    {
      title: "Personalized Coaching Programs",
      description: "Unlock your full potential with personalized coaching programs. Achieve success like never before.",
      image: "/lovable-uploads/5423893f-ab27-4536-8347-461f0c701962.png",
      buttonText: t('moreInfo')
    },
    {
      title: "Goal Setting Workshops",
      description: "Set and achieve your goals with our goal setting workshops. Transform your life today.",
      image: "/lovable-uploads/5423893f-ab27-4536-8347-461f0c701962.png",
      buttonText: t('moreInfo')
    },
    {
      title: "Mindfulness Retreats",
      description: "Recharge and reconnect with our mindfulness retreats. Prioritize self-care and well-being.",
      image: "/lovable-uploads/5423893f-ab27-4536-8347-461f0c701962.png",
      buttonText: t('moreInfo')
    }
  ];

  return (
    <section id="services" className="py-12 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-800 dark:text-gray-100 mb-16 animate-fade-in">
          {t('services')}
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="group hover-scale bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="h-64 bg-gray-200 dark:bg-gray-700 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-teal-100 to-teal-200 dark:from-teal-800 dark:to-teal-900 flex items-center justify-center">
                  <span className="text-teal-600 dark:text-teal-300 text-lg font-medium">Service Image</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3 group-hover:text-teal-600 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                  {service.description}
                </p>
                <button className="bg-teal-600 text-white px-6 py-2 rounded hover:bg-teal-700 transition-colors duration-300">
                  {service.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
