import { Calendar, Video, Image, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useApp } from '@/contexts/AppContext';

const BlogSection = () => {
  const { t } = useApp();
  
  const activities = [
    {
      id: 1,
      title: "Youth Education Workshop - Digital Skills Training",
      description: "Our latest workshop helped 50+ young people develop essential computer and internet skills for better employment opportunities.",
      date: "2024-12-15",
      category: "Education",
      media: {
        type: "image",
        url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=250&fit=crop",
        alt: "Students learning computer skills"
      },
      location: "Community Center, Downtown"
    },
    {
      id: 2,
      title: "Community Clean-up Drive",
      description: "Volunteers from across the city joined us for a neighborhood beautification project, cleaning parks and planting trees.",
      date: "2024-12-10",
      category: "Environment",
      media: {
        type: "video",
        url: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=250&fit=crop",
        alt: "Community volunteers cleaning"
      },
      location: "Central Park Area"
    },
    {
      id: 3,
      title: "Women's Empowerment Seminar",
      description: "Inspiring session with successful women entrepreneurs sharing their journey and mentoring local women to start their own businesses.",
      date: "2024-12-05",
      category: "Empowerment",
      media: {
        type: "image",
        url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=250&fit=crop",
        alt: "Women entrepreneurs speaking"
      },
      location: "Business Hub"
    },
    {
      id: 4,
      title: "Health Awareness Campaign",
      description: "Free health checkups and awareness sessions about preventive healthcare reached over 200 community members.",
      date: "2024-11-28",
      category: "Health",
      media: {
        type: "video",
        url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=250&fit=crop",
        alt: "Health checkup camp"
      },
      location: "Mobile Health Unit"
    },
    {
      id: 5,
      title: "Children's Art & Craft Workshop",
      description: "Creative sessions for underprivileged children, providing art supplies and teaching various craft techniques to boost creativity.",
      date: "2024-11-20",
      category: "Children",
      media: {
        type: "image",
        url: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=250&fit=crop",
        alt: "Children doing arts and crafts"
      },
      location: "Al-Takathuf Center"
    },
    {
      id: 6,
      title: "Food Distribution Drive",
      description: "Monthly food distribution program serving 150+ families in need, providing essential groceries and fresh produce.",
      date: "2024-11-15",
      category: "Relief",
      media: {
        type: "video",
        url: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=400&h=250&fit=crop",
        alt: "Food distribution activity"
      },
      location: "Various Neighborhoods"
    }
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Education': 'bg-blue-50 text-blue-600 border-blue-200',
      'Environment': 'bg-green-50 text-green-600 border-green-200',
      'Empowerment': 'bg-purple-50 text-purple-600 border-purple-200',
      'Health': 'bg-red-50 text-red-600 border-red-200',
      'Children': 'bg-yellow-50 text-yellow-600 border-yellow-200',
      'Relief': 'bg-orange-50 text-orange-600 border-orange-200'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-50 text-gray-600 border-gray-200';
  };

  return (
    <section id="blog" className="py-20 bg-gray-50 dark:bg-gray-800">
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
                <div className="absolute top-3 right-3">
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
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-sm font-medium px-3 py-1 rounded-full border ${getCategoryColor(activity.category)}`}>
                    {activity.category}
                  </span>
                  <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                    <Calendar size={14} className="mr-1" />
                    {formatDate(activity.date)}
                  </div>
                </div>
                <CardTitle className="text-lg font-bold text-gray-800 dark:text-gray-100 line-clamp-2 group-hover:text-teal-600 transition-colors">
                  {activity.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="pt-0">
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                  {activity.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-600 px-2 py-1 rounded">
                    📍 {activity.location}
                  </span>
                  <button className="text-teal-600 hover:text-teal-700 font-medium text-sm flex items-center transition-colors group">
                    {t('readMore')}
                    <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <button className="bg-teal-600 text-white px-8 py-3 rounded-full hover:bg-teal-700 transition-colors duration-300 font-medium animate-fade-in">
            {t('viewAllActivities')}
          </button>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
