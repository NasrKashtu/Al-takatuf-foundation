import type { CSSProperties } from 'react';
import { Calendar, Video, Image, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useApp } from '@/contexts/AppContext';
import { useActivities } from '@/hooks/useActivities';
import { useReveal } from '@/hooks/useReveal';
import { CATEGORY_LABELS, type CategoryKey } from '@/lib/activities';

const BlogSection = () => {
  const { t, language } = useApp();
  const { activities } = useActivities();
  const reveal = useReveal<HTMLDivElement>();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Colors come from --cat-* tokens in index.css; they swap values in .dark
  // so no per-class `dark:` overrides are needed here.
  const categoryStyle = (category: CategoryKey): CSSProperties => {
    const hue = `var(--cat-${category})`;
    return {
      backgroundColor: `hsl(${hue} / 0.12)`,
      color: `hsl(${hue})`,
      borderColor: `hsl(${hue} / 0.28)`,
    };
  };

  return (
    <section id="blog" className="py-24 md:py-28 bg-muted/40">
      <div ref={reveal.ref} className={`container mx-auto px-4 ${reveal.className}`}>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {t('blog')}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('blogDescription')}
          </p>
        </div>

        {activities.length === 0 ? (
          <p className="text-center text-muted-foreground py-16">
            {language === 'ar'
              ? 'لا توجد أنشطة حالياً.'
              : 'No activities yet.'}
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 stagger-children">
            {activities.map((activity, index) => {
              const title = language === 'ar' ? activity.titleAr : activity.titleEn;
              const description =
                language === 'ar' ? activity.descAr : activity.descEn;
              const location =
                language === 'ar' ? activity.locationAr : activity.locationEn;
              const categoryLabel =
                CATEGORY_LABELS[activity.category][language];

              return (
                <Card
                  key={activity.id}
                  style={{ '--i': index } as React.CSSProperties}
                  className="bg-card border border-border shadow-sm-soft hover:shadow-lg-soft overflow-hidden group transition-shadow flex flex-col"
                >
                  <div className="relative aspect-video overflow-hidden bg-muted">
                    {activity.mediaUrl && (
                      <img
                        src={activity.mediaUrl}
                        alt={activity.mediaAlt}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover ken-burns"
                      />
                    )}
                    <div className="absolute top-3 end-3">
                      <div className="bg-black/60 backdrop-blur-sm text-white p-2 rounded-full">
                        {activity.mediaType === 'video' ? (
                          <Video size={16} />
                        ) : (
                          <Image size={16} />
                        )}
                      </div>
                    </div>
                  </div>

                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between mb-3 gap-2">
                      <span
                        className="text-sm font-medium px-3 py-1 rounded-full border"
                        style={categoryStyle(activity.category)}
                      >
                        {categoryLabel}
                      </span>
                      <div className="flex items-center text-muted-foreground text-sm gap-1 shrink-0">
                        <Calendar size={14} />
                        {formatDate(activity.date)}
                      </div>
                    </div>
                    <CardTitle className="text-lg font-bold text-foreground line-clamp-2 group-hover:text-primary transition-colors text-start">
                      {title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="pt-0 flex flex-col flex-grow">
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3 flex-grow text-start">
                      {description}
                    </p>
                    <div className="flex items-center justify-between mt-auto gap-2">
                      {location && (
                        <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded text-start">
                          📍 {location}
                        </span>
                      )}
                      {activity.link && (
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
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        <div className="text-center">
          <a
            href="https://www.facebook.com/profile.php?id=61574523478564"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1 ps-7 pe-2 h-14 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-all duration-300 font-semibold shadow-md-soft hover:shadow-lg-soft"
          >
            <span>{t('viewAllActivities')}</span>
            <span
              aria-hidden="true"
              className="ms-1 inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary-foreground/15 ring-1 ring-primary-foreground/15 transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5"
            >
              <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
