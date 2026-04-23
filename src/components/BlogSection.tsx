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
      date: '2025-6-04',
      category: t('empowerment'),
      media: {
        type: 'image',
        url: '/images/BlogSection/Screenshot 2025-08-04 013217.png',
        alt: 'Students learning computer skills',
      },
      location: t('communityCenter'),
      link: 'https://www.facebook.com/share/p/1J68FwMfjY/',
    },
    {
      id: 2,
      title: t('communityCleanup'),
      description: t('communityCleanupDesc'),
      date: '2025-3-29',
      category: t('environment'),
      media: {
        type: 'video',
        url: '/images/BlogSection/photo_2025-07-31_17-22-17.jpg',
        alt: 'Community volunteers cleaning',
      },
      location: t('centralPark'),
      link: 'https://www.facebook.com/profile.php?id=61574523478564',
    },
    {
      id: 3,
      title: t('womenEmpowerment'),
      description: t('womenEmpowermentDesc'),
      date: '2025-03-22',
      category: t('relief'),
      media: {
        type: 'image',
        url: '/images/BlogSection/Screenshot 2025-08-03 232806.png',
        alt: 'Women entrepreneurs speaking',
      },
      location: t('Umm al Aranib'),
      link: 'https://www.facebook.com/share/p/1ZFeGsykjh/',
    },
    {
      id: 4,
      title: t('healthAwareness'),
      description: t('healthAwarenessDesc'),
      date: '2024-11-28',
      category: t('empowerment'),
      media: {
        type: 'video',
        url: '/images/BlogSection/Screenshot 2025-08-03 234116.png',
        alt: 'Health checkup camp',
      },
      location: t('Umm al Aranib'),
      link: 'https://www.facebook.com/share/p/15rAkfSz7H/',
    },
    {
      id: 5,
      title: t('childrenArt'),
      description: t('childrenArtDesc'),
      date: '2024-11-20',
      category: t('empowerment'),
      media: {
        type: 'image',
        url: '/images/BlogSection/Screenshot 2025-08-03 235320.png',
        alt: 'Children doing arts and crafts',
      },
      location: t('altakathufCenter'),
      link: 'https://www.facebook.com/profile.php?id=61574523478564',
    },
    {
      id: 6,
      title: t('foodDistribution'),
      description: t('foodDistributionDesc'),
      date: '2025-03-25',
      category: t('relief'),
      media: {
        type: 'video',
        url: '/images/BlogSection/Screenshot 2025-08-03 231716.png',
        alt: 'Food distribution activity',
      },
      location: t('variousNeighborhoods'),
      link: 'https://www.facebook.com/share/p/1J5MJdagVs/',
    },
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Per-category color coding — intentionally distinct from brand palette.
  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      [t('education')]:
        'bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800',
      [t('environment')]:
        'bg-green-50 text-green-600 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800',
      [t('empowerment')]:
        'bg-purple-50 text-purple-600 border-purple-200 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-800',
      [t('health')]:
        'bg-red-50 text-red-600 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800',
      [t('children')]:
        'bg-yellow-50 text-yellow-600 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800',
      [t('relief')]:
        'bg-orange-50 text-orange-600 border-orange-200 dark:bg-orange-900/20 dark:text-orange-400 dark:border-orange-800',
    };
    return colors[category] || 'bg-muted text-muted-foreground border-border';
  };

  return (
    <section id="blog" className="py-16 bg-muted/40">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 animate-fade-in">
            {t('blog')}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in">
            {t('blogDescription')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {activities.map((activity, index) => (
            <Card
              key={activity.id}
              className="hover-scale bg-card border border-border shadow-sm-soft hover:shadow-lg-soft overflow-hidden animate-fade-in group transition-shadow"
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={activity.media.url}
                  alt={activity.media.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 end-3">
                  <div className="bg-black/60 backdrop-blur-sm text-white p-2 rounded-full">
                    {activity.media.type === 'video' ? (
                      <Video size={16} />
                    ) : (
                      <Image size={16} />
                    )}
                  </div>
                </div>
              </div>

              <CardHeader className="pb-2">
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`text-sm font-medium px-3 py-1 rounded-full border ${getCategoryColor(
                      activity.category
                    )}`}
                  >
                    {activity.category}
                  </span>
                  <div className="flex items-center text-muted-foreground text-sm gap-1">
                    <Calendar size={14} />
                    {formatDate(activity.date)}
                  </div>
                </div>
                <CardTitle className="text-lg font-bold text-foreground line-clamp-2 group-hover:text-primary transition-colors text-start">
                  {activity.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="pt-0 flex flex-col flex-grow">
                <p className="text-muted-foreground text-sm mb-4 line-clamp-3 flex-grow text-start">
                  {activity.description}
                </p>
                <div className="flex items-center justify-between mt-auto gap-2">
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded text-start">
                    📍 {activity.location}
                  </span>
                  <a
                    href={activity.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80 font-medium text-sm inline-flex items-center gap-1 transition-colors shrink-0"
                  >
                    {t('readMore')}
                    <ArrowRight
                      size={16}
                      className="rtl:rotate-180 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5"
                    />
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <a
            href="https://www.facebook.com/profile.php?id=61574523478564"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="bg-primary text-primary-foreground px-8 py-3 rounded-full hover:bg-primary/90 transition-colors duration-300 font-medium animate-fade-in">
              {t('viewAllActivities')}
            </button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
