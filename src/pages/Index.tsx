
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ImageSlider from '@/components/ImageSlider';
import ProgramsSection from '@/components/ProgramsSection';
import BlogSection from '@/components/BlogSection';
import FAQSection from '@/components/FAQSection';
import MissionVisionSection from '@/components/MissionVisionSection';
import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen w-full bg-white dark:bg-gray-900">
      <Header />
      <HeroSection />
      <ImageSlider />
      <ProgramsSection />
      <BlogSection />
      <FAQSection />
      <MissionVisionSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
