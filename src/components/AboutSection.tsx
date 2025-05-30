
const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-teal-600 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-8 animate-fade-in">About us</h2>
        <p className="text-xl mb-8 max-w-4xl mx-auto leading-relaxed animate-fade-in">
          Altakathif is dedicated to helping individuals reach their full potential and achieve their personal goals. 
          With a focus on personalized solutions and innovative approaches, we are committed to empowering our clients 
          to succeed in all areas of their lives.
        </p>
        <button className="bg-gray-800 text-white px-8 py-3 rounded hover:bg-gray-900 transition-colors duration-300 font-medium hover-scale">
          Discover Now
        </button>
      </div>
    </section>
  );
};

export default AboutSection;
