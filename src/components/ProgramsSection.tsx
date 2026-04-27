import { useApp } from '@/contexts/AppContext';

const ProgramsSection = () => {
  const { t } = useApp();

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
    <section id="programs" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12 animate-fade-in">
          {t('programs')}
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {programs.map((program, index) => (
            <div
              key={index}
              className="group hover-scale bg-card rounded-lg shadow-sm-soft hover:shadow-lg-soft overflow-hidden transition-all duration-300 border border-border flex flex-col"
            >
              <div className="h-48 bg-muted overflow-hidden">
                <img
                  src={program.image}
                  alt={program.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow h-64">
                <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-300 text-start">
                  {program.title}
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed flex-grow text-start">
                  {program.description}
                </p>
                <div className="text-start">
                  <a
                    href="https://www.facebook.com/profile.php?id=61574523478564"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="bg-primary text-primary-foreground px-6 py-2 rounded-md hover:bg-primary/90 transition-colors duration-300 w-full font-medium">
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
