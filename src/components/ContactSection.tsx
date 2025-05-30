
import { useState } from 'react';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission here
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-4 animate-fade-in">
          Contact us
        </h2>
        <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
          Reach out to us today to start your journey towards personal growth and empowerment.
        </p>
        
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="animate-fade-in">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600 focus:border-transparent transition-all duration-300"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                  Email address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600 focus:border-transparent transition-all duration-300"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600 focus:border-transparent transition-all duration-300 resize-none"
                  required
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="bg-teal-600 text-white px-8 py-3 rounded-lg hover:bg-teal-700 transition-colors duration-300 font-medium hover-scale"
              >
                Submit form
              </button>
            </form>
          </div>
          
          {/* Map and Social Media */}
          <div className="animate-fade-in">
            <div className="bg-gradient-to-br from-blue-100 to-blue-200 h-64 rounded-lg mb-6 flex items-center justify-center">
              <span className="text-blue-600 text-lg font-medium">Interactive Map</span>
            </div>
            
            <div className="flex space-x-4 justify-center">
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
