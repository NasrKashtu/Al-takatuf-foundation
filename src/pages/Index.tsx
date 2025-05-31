
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import ImageSlider from '@/components/ImageSlider';
import BlogSection from '@/components/BlogSection';
import FAQSection from '@/components/FAQSection';
import TestimonialSection from '@/components/TestimonialSection';
import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <HeroSection />
      <ServicesSection />
      <ImageSlider />
      <BlogSection />
      <FAQSection />
      <TestimonialSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
