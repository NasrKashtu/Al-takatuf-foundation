
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-sm z-50 transition-all duration-300">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-gray-700 animate-fade-in">
            ALTAKATHUF
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#home" className="text-white bg-teal-600 px-4 py-2 rounded-full hover:bg-teal-700 transition-colors duration-300">
              HOME
            </a>
            <a href="#about" className="text-gray-600 hover:text-teal-600 transition-colors duration-300">
              ABOUT US
            </a>
            <a href="#services" className="text-gray-600 hover:text-teal-600 transition-colors duration-300">
              SERVICES
            </a>
            <a href="#blog" className="text-gray-600 hover:text-teal-600 transition-colors duration-300">
              BLOG
            </a>
            <a href="#contact" className="text-gray-600 hover:text-teal-600 transition-colors duration-300">
              CONTACT
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 animate-slide-in-right">
            <div className="flex flex-col space-y-4">
              <a href="#home" className="text-white bg-teal-600 px-4 py-2 rounded-full text-center">HOME</a>
              <a href="#about" className="text-gray-600 px-4 py-2 text-center">ABOUT US</a>
              <a href="#services" className="text-gray-600 px-4 py-2 text-center">SERVICES</a>
              <a href="#blog" className="text-gray-600 px-4 py-2 text-center">BLOG</a>
              <a href="#contact" className="text-gray-600 px-4 py-2 text-center">CONTACT</a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
