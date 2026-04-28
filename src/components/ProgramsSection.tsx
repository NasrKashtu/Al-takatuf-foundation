import { useApp } from '@/contexts/AppContext';
import { useReveal } from '@/hooks/useReveal';

const ProgramsSection = () => {
  const { t } = useApp();
  const reveal = useReveal<HTMLDivElement>();

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
    <section id="programs" className="py-24 md:py-28 bg-background">
      <div ref={reveal.ref} className={`container mx-auto px-4 ${reveal.className}`}>
        <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
          {t('programs')}
        </h2>

        <div className="grid md:grid-cols-3 gap-6 stagger-children">
          {programs.map((program, index) => (
            <article
              key={index}
              style={{ '--i': index } as React.CSSProperties}
              className="group bg-card rounded-2xl shadow-sm-soft hover:shadow-lg-soft overflow-hidden transition-shadow duration-300 border border-border flex flex-col"
            >
              <div className="h-48 bg-muted overflow-hidden">
                <img
                  src={program.image}
                  alt={program.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-center ken-burns"
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
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgramsSection;
