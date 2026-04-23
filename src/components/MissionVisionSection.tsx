import { useApp } from '@/contexts/AppContext';

const MissionVisionSection = () => {
  const { t } = useApp();

  return (
    <section id="mission-vision" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-foreground text-center">
          {t('ourMissionAndVision')}
        </h2>
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div className="bg-muted/40 p-8 rounded-lg border border-border shadow-sm-soft animate-fade-in">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-primary">
              {t('ourMission')}
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t('missionText')}
            </p>
          </div>
          <div className="bg-muted/40 p-8 rounded-lg border border-border shadow-sm-soft animate-fade-in">
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
