
import { Calendar, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const BlogSection = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Empowering Youth Through Education: Our 2024 Impact Report",
      excerpt: "Discover how Al-Takathuf has transformed the lives of over 500 young people through our comprehensive education programs this year.",
      date: "2024-12-15",
      category: "Impact Report",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=250&fit=crop",
      readTime: "5 min read"
    },
    {
      id: 2,
      title: "Community Development Workshop: Building Stronger Neighborhoods",
      excerpt: "Join us for our upcoming workshop series focused on sustainable community development strategies and local leadership training.",
      date: "2024-12-10",
      category: "Events",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=250&fit=crop",
      readTime: "3 min read"
    },
    {
      id: 3,
      title: "Success Story: From Participant to Community Leader",
      excerpt: "Meet Sarah, who started as a program participant and now leads our women's empowerment initiative in her local community.",
      date: "2024-12-05",
      category: "Success Stories",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=250&fit=crop",
      readTime: "4 min read"
    },
    {
      id: 4,
      title: "Digital Skills Training: Bridging the Technology Gap",
      excerpt: "Our new digital literacy program is helping community members develop essential technology skills for the modern workforce.",
      date: "2024-11-28",
      category: "Programs",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=250&fit=crop",
      readTime: "6 min read"
    },
    {
      id: 5,
      title: "Partnership Announcement: Collaborating for Greater Impact",
      excerpt: "We're excited to announce our new partnership with local universities to expand educational opportunities in underserved communities.",
      date: "2024-11-20",
      category: "Announcements",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop",
      readTime: "3 min read"
    },
    {
      id: 6,
      title: "Volunteer Spotlight: Making a Difference Together",
      excerpt: "Celebrating our dedicated volunteers who give their time and expertise to support our mission of community empowerment.",
      date: "2024-11-15",
      category: "Community",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=250&fit=crop",
      readTime: "4 min read"
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

  return (
    <section id="blog" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 animate-fade-in">
            Latest News & Stories
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in">
            Stay updated with our latest initiatives, success stories, and community impact reports
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {blogPosts.map((post, index) => (
            <Card 
              key={post.id} 
              className="hover-scale bg-white shadow-lg border-0 overflow-hidden animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="aspect-video overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-teal-600 font-medium bg-teal-50 px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                  <span className="text-sm text-gray-500">{post.readTime}</span>
                </div>
                <CardTitle className="text-lg font-bold text-gray-800 line-clamp-2 hover:text-teal-600 transition-colors">
                  {post.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-500 text-sm">
                    <Calendar size={16} className="mr-2" />
                    {formatDate(post.date)}
                  </div>
                  <button className="text-teal-600 hover:text-teal-700 font-medium text-sm flex items-center transition-colors">
                    <FileText size={16} className="mr-1" />
                    Read More
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <button className="bg-teal-600 text-white px-8 py-3 rounded-full hover:bg-teal-700 transition-colors duration-300 font-medium animate-fade-in">
            View All Articles
          </button>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
