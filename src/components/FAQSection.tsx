
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "What services do you offer?",
      answer: "We offer personalized coaching programs, goal setting workshops, and mindfulness retreats to help individuals achieve their personal goals."
    },
    {
      question: "How can personalized coaching help me?",
      answer: "Our personalized coaching programs are designed to unlock your potential through tailored strategies and one-on-one guidance."
    },
    {
      question: "What sets Altakathif apart from other personal development organizations?",
      answer: "We focus on personalized solutions and innovative approaches, ensuring each client receives attention tailored to their unique needs and goals."
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-16 animate-fade-in">
          Frequently Asked Questions
        </h2>
        
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div key={index} className="mb-4">
              <button
                className="w-full bg-teal-600 text-white p-4 rounded-lg flex items-center justify-between hover:bg-teal-700 transition-colors duration-300"
                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
              >
                <span className="font-medium text-left">{faq.question}</span>
                {openIndex === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openIndex === index && (
                <div className="bg-white p-4 rounded-b-lg border-l-4 border-teal-600 animate-accordion-down">
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
