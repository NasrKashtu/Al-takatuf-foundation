
import { Calendar, Video, Image, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useApp } from '@/contexts/AppContext';

const BlogSection = () => {
  const { t, language } = useApp();
  
  const activities = [
    {
      id: 1,
      title: t('youthEducation'),
      description: t('youthEducationDesc'),
      date: "2025-6-04",
      category: t('empowerment'),
      media: {
        type: "image",
        url: "/public/images/BlogSection/Screenshot 2025-08-04 013217.png",
        alt: "Students learning computer skills"
      },
      location: t('communityCenter'),
      link: "https://www.facebook.com/share/p/1J68FwMfjY/"
    },
    {
      id: 2,
      title: t('communityCleanup'),
      description: t('communityCleanupDesc'),
      date: "2025-3-29",
      category: t('environment'),
      media: {
        type: "video",
        url: "/public/images/BlogSection/photo_2025-07-31_17-22-17.jpg",
        alt: "Community volunteers cleaning"
      },
      location: t('centralPark'),
      link: "https://www.facebook.com/profile.php?id=61574523478564"
    },
    {
      id: 3,
      title: t('womenEmpowerment'),
      description: t('womenEmpowermentDesc'),
      date: "2025-03-22",
      category: t('relief'),
      media: {
        type: "image",
        url: "/public/images/BlogSection/Screenshot 2025-08-03 232806.png",
        alt: "Women entrepreneurs speaking"
      },
      location: t('Umm al Aranib'),
      link: "https://www.facebook.com/share/p/1ZFeGsykjh/"
    },
    {
      id: 4,
      title: t('healthAwareness'),
      description: t('healthAwarenessDesc'),
      date: "2024-11-28",
      category: t('empowerment'),
      media: {
        type: "video",
        url: "/public/images/BlogSection/Screenshot 2025-08-03 234116.png",
        alt: "Health checkup camp"
      },
      location: t('Umm al Aranib'),
      link: "https://www.facebook.com/share/p/15rAkfSz7H/"
    },
    {
      id: 5,
      title: t('childrenArt'),
      description: t('childrenArtDesc'),
      date: "2024-11-20",
      category: t('empowerment'),
      media: {
        type: "image",
        url: "/public/images/BlogSection/Screenshot 2025-08-03 235320.png",
        alt: "Children doing arts and crafts"
      },
      location: t('altakathufCenter'),
      link: "https://www.facebook.com/profile.php?id=61574523478564"
    },
    {
      id: 6,
      title: t('foodDistribution'),
      description: t('foodDistributionDesc'),
      date: "2025-03-25",
      category: t('relief'),
      media: {
        type: "video",
        url: "/public/images/BlogSection/Screenshot 2025-08-03 231716.png",
        alt: "Food distribution activity"
      },
      location: t('variousNeighborhoods'),
      link: "https://www.facebook.com/share/p/1J5MJdagVs/"
    }
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      [t('education')]: 'bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800',
      [t('environment')]: 'bg-green-50 text-green-600 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800',
      [t('empowerment')]: 'bg-purple-50 text-purple-600 border-purple-200 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-800',
      [t('health')]: 'bg-red-50 text-red-600 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800',
      [t('children')]: 'bg-yellow-50 text-yellow-600 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800',
      [t('relief')]: 'bg-orange-50 text-orange-600 border-orange-200 dark:bg-orange-900/20 dark:text-orange-400 dark:border-orange-800'
    };
    return colors[category] || 'bg-gray-50 text-gray-600 border-gray-200 dark:bg-gray-700 dark:text-gray-400 dark:border-gray-600';
  };

  return (
    <section id="blog" className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-100 mb-4 animate-fade-in">
            {t('blog')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto animate-fade-in">
            {t('blogDescription')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {activities.map((activity, index) => (
            <Card 
              key={activity.id} 
              className="hover-scale bg-white dark:bg-gray-700 shadow-lg border-0 overflow-hidden animate-fade-in group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative aspect-video overflow-hidden">
                <img 
                  src={activity.media.url} 
                  alt={activity.media.alt}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className={`absolute top-3 ${language === 'ar' ? 'left-3' : 'right-3'}`}>
                  {activity.media.type === 'video' ? (
                    <div className="bg-black/70 text-white p-2 rounded-full">
                      <Video size={16} />
                    </div>
                  ) : (
                    <div className="bg-black/70 text-white p-2 rounded-full">
                      <Image size={16} />
                    </div>
                  )}
                </div>
              </div>
              
              <CardHeader className="pb-2">
                <div className={`flex items-center justify-between mb-3 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                  <span className={`text-sm font-medium px-3 py-1 rounded-full border ${getCategoryColor(activity.category)}`}>
                    {activity.category}
                  </span>
                  <div className={`flex items-center text-gray-500 dark:text-gray-400 text-sm ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                    <Calendar size={14} className={language === 'ar' ? 'ml-1' : 'mr-1'} />
                    {formatDate(activity.date)}
                  </div>
                </div>
                <CardTitle className={`text-lg font-bold text-gray-800 dark:text-gray-100 line-clamp-2 group-hover:text-teal-600 transition-colors ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                  {activity.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="pt-0 flex flex-col flex-grow">
                <p className={`text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3 flex-grow ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                  {activity.description}
                </p>
                <div className={`flex items-center justify-between mt-auto ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                  <span className={`text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-600 px-2 py-1 rounded ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                    📍 {activity.location}
                  </span>
                  <a href={activity.link} target="_blank" rel="noopener noreferrer" className={`text-teal-600 hover:text-teal-700 font-medium text-sm flex items-center transition-colors group ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                    {t('readMore')}
                    <ArrowRight size={16} className={`${language === 'ar' ? 'mr-1 rotate-180' : 'ml-1'} transition-transform group-hover:${language === 'ar' ? '-translate-x-1' : 'translate-x-1'}`} />
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <a href="https://www.facebook.com/profile.php?id=61574523478564" target="_blank" rel="noopener noreferrer">
            <button className="bg-teal-600 text-white px-8 py-3 rounded-full hover:bg-teal-700 transition-colors duration-300 font-medium animate-fade-in">
              {t('viewAllActivities')}
            </button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
