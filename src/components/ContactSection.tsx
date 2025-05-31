
import { useState } from 'react';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import InteractiveMap from './InteractiveMap';
import { toast } from 'sonner';

const ContactSection = () => {
  const { t, language } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      message: ''
    });
    
    // Show success message
    toast.success(language === 'ar' ? 'تم إرسال الرسالة بنجاح!' : 'Message sent successfully!');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-800 dark:text-gray-100 mb-4 animate-fade-in">
          {t('contactUs')}
        </h2>
        <p className={`text-center text-gray-600 dark:text-gray-300 mb-16 max-w-2xl mx-auto ${language === 'ar' ? 'text-right' : 'text-left'}`}>
          {t('contactDesc')}
        </p>
        
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="animate-fade-in">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className={`block text-gray-700 dark:text-gray-300 font-medium mb-2 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                  {t('name')} *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-600 focus:border-transparent transition-all duration-300 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 ${language === 'ar' ? 'text-right' : 'text-left'}`}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className={`block text-gray-700 dark:text-gray-300 font-medium mb-2 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                  {t('email')} *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-600 focus:border-transparent transition-all duration-300 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 ${language === 'ar' ? 'text-right' : 'text-left'}`}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="message" className={`block text-gray-700 dark:text-gray-300 font-medium mb-2 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                  {t('message')} *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-600 focus:border-transparent transition-all duration-300 resize-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 ${language === 'ar' ? 'text-right' : 'text-left'}`}
                  required
                ></textarea>
              </div>
              
              <button
                type="submit"
                className={`bg-teal-600 text-white px-8 py-3 rounded-lg hover:bg-teal-700 transition-colors duration-300 font-medium hover-scale ${language === 'ar' ? 'float-right' : 'float-left'}`}
              >
                {t('submitForm')}
              </button>
            </form>
          </div>
          
          {/* Map and Social Media */}
          <div className="animate-fade-in">
            <InteractiveMap />
            
            <div className={`flex space-x-4 justify-center mt-6 ${language === 'ar' ? 'space-x-reverse' : ''}`}>
              <a href="#" className="bg-teal-600 text-white p-3 rounded-full hover:bg-teal-700 transition-colors duration-300 hover-scale">
                <Facebook size={20} />
              </a>
              <a href="#" className="bg-teal-600 text-white p-3 rounded-full hover:bg-teal-700 transition-colors duration-300 hover-scale">
                <Twitter size={20} />
              </a>
              <a href="#" className="bg-teal-600 text-white p-3 rounded-full hover:bg-teal-700 transition-colors duration-300 hover-scale">
                <Instagram size={20} />
              </a>
              <a href="#" className="bg-teal-600 text-white p-3 rounded-full hover:bg-teal-700 transition-colors duration-300 hover-scale">
                <Youtube size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
