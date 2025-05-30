
const HeroSection = () => {
  return (
    <section id="home" className="min-h-screen pt-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6 animate-fade-in">
            Welcome to Altakathif
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in">
            Altakathif is a personal organization dedicated to providing unique solutions for personal growth and development. 
            We strive to empower individuals to reach their full potential and achieve their goals.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
