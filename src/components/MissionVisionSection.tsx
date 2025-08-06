import { useApp } from '@/contexts/AppContext';

const MissionVisionSection = () => {
  const { t, language } = useApp();

  return (
    <section id="mission-vision" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-gray-800 dark:text-white text-center">{t('ourMissionAndVision')}</h2>
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-lg shadow-lg animate-fade-in-left">
            <h3 className="text-3xl font-bold mb-4 text-teal-600 dark:text-teal-400">{t('ourMission')}</h3>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              {t('missionText')}
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-lg shadow-lg animate-fade-in-right">
            <h3 className="text-3xl font-bold mb-4 text-teal-600 dark:text-teal-400">{t('ourVision')}</h3>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              {t('visionText')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionVisionSection;
