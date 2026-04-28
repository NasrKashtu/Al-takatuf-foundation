import { useState } from 'react';
import { Facebook, Linkedin } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import InteractiveMap from './InteractiveMap';
import { toast } from 'sonner';

const ContactSection = () => {
  const { t, language } = useApp();
  const isRTL = language === 'ar';
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormData({ name: '', email: '', message: '' });
    toast.success(
      isRTL ? 'تم إرسال رسالتك. شكراً لتواصلك.' : 'Thanks — we received your message.'
    );
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const inputBase =
    'w-full px-4 py-3 border border-input bg-background text-foreground rounded-lg placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/30 focus:outline-none transition-colors text-start';

  const socialBtn =
    'bg-primary text-primary-foreground p-3 rounded-full hover:bg-primary/90 transition-colors duration-300 hover:scale-105';

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-4 animate-fade-in">
          {t('contactUs')}
        </h2>
        <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
          {t('contactDesc')}
        </p>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="animate-fade-in">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-foreground font-medium mb-2 text-start"
                >
                  {t('name')} *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={inputBase}
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-foreground font-medium mb-2 text-start"
                >
                  {t('email')} *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={inputBase}
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-foreground font-medium mb-2 text-start"
                >
                  {t('message')} *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleInputChange}
                  className={`${inputBase} resize-none`}
                  required
                />
              </div>

              <div className="flex justify-start">
                <button
                  type="submit"
                  className="bg-primary text-primary-foreground px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors duration-300 font-medium hover-scale"
                >
                  {t('submitForm')}
                </button>
              </div>
            </form>
          </div>

          {/* Map and Social Media */}
          <div className="animate-fade-in">
            <InteractiveMap />

            <div className="flex gap-4 justify-center mt-6">
              <a
                href="https://www.facebook.com/profile.php?id=61574523478564"
                target="_blank"
                rel="noopener noreferrer"
                className={socialBtn}
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://www.linkedin.com/company/al-takathuf-foundation-for-community-development/"
                target="_blank"
                rel="noopener noreferrer"
                className={socialBtn}
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
