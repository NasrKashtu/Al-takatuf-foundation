import { useApp } from '@/contexts/AppContext';
import { useReveal } from '@/hooks/useReveal';

const MissionVisionSection = () => {
  const { t } = useApp();
  const reveal = useReveal<HTMLDivElement>();

  return (
    <section id="mission-vision" className="py-24 md:py-28 bg-background">
      <div ref={reveal.ref} className={`container mx-auto px-4 ${reveal.className}`}>
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-foreground text-center">
          {t('ourMissionAndVision')}
        </h2>
        <div className="grid md:grid-cols-2 gap-8 items-start stagger-children">
          <div
            style={{ '--i': 0 } as React.CSSProperties}
            className="bg-muted/40 p-8 rounded-2xl border border-border shadow-sm-soft hover:shadow-md-soft transition-shadow duration-300"
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-primary">
              {t('ourMission')}
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t('missionText')}
            </p>
          </div>
          <div
            style={{ '--i': 1 } as React.CSSProperties}
            className="bg-muted/40 p-8 rounded-2xl border border-border shadow-sm-soft hover:shadow-md-soft transition-shadow duration-300"
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-primary">
              {t('ourVision')}
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t('visionText')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionVisionSection;
