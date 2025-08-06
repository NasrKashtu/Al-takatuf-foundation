import { useApp } from '@/contexts/AppContext';

const ProgramsSection = () => {
  const { t, language } = useApp();
  
  const programs = [
    {
      title: t('program1Title'),
      description: t('program1Desc'),
      buttonText: t('moreInfo'),
      image: "/images/BlogSection/Screenshot 2025-08-04 013217.png"
    },
    {
      title: t('program2Title'),
      description: t('program2Desc'),
      buttonText: t('moreInfo'),
      image: "/images/BlogSection/photo_2025-07-31_17-22-17.jpg"
    },
    {
      title: t('program3Title'),
      description: t('program3Desc'),
      buttonText: t('moreInfo'),
      image: "/images/BlogSection/Screenshot 2025-08-03 234116.png"
    }
  ];

  return (
    <section id="programs" className="py-12 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-800 dark:text-gray-100 mb-12 animate-fade-in">
          {t('programs')}
        </h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          {programs.map((program, index) => (
            <div 
              key={index}
              className="group hover-scale bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 flex flex-col"
            >
              <div className="h-48 bg-gray-200 dark:bg-gray-700 overflow-hidden">
                <img src={program.image} alt={program.title} className="w-full h-full object-cover object-center"/>
              </div>
              <div className="p-6 flex flex-col flex-grow h-64">
                <h3 className={`text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3 group-hover:text-teal-600 transition-colors duration-300 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                  {program.title}
                </h3>
                <p className={`text-gray-600 dark:text-gray-300 mb-6 leading-relaxed flex-grow ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                  {program.description}
                </p>
                <div className={`${language === 'ar' ? 'text-right' : 'text-left'}`}>
                  <a href="https://www.facebook.com/profile.php?id=61574523478564" target="_blank" rel="noopener noreferrer">
                    <button className="bg-teal-600 text-white px-6 py-2 rounded hover:bg-teal-700 transition-colors duration-300 w-full">
                      {program.buttonText}
                    </button>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgramsSection;
