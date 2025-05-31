
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';

const FAQSection = () => {
  const { t, language } = useApp();
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: t('faqQ1'),
      answer: t('faqA1')
    },
    {
      question: t('faqQ2'),
      answer: t('faqA2')
    },
    {
      question: t('faqQ3'),
      answer: t('faqA3')
    }
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className={`container mx-auto px-4 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
        <h2 className="text-4xl font-bold text-center text-gray-800 dark:text-gray-100 mb-16 animate-fade-in">
          {t('faq')}
        </h2>
        
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div key={index} className="mb-4">
              <button
                className="w-full bg-teal-600 dark:bg-teal-700 text-white p-4 rounded-lg flex items-center justify-between hover:bg-teal-700 dark:hover:bg-teal-600 transition-colors duration-300"
                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
              >
                <span className={`font-medium ${language === 'ar' ? 'text-right' : 'text-left'}`}>{faq.question}</span>
                {openIndex === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openIndex === index && (
                <div className="bg-white dark:bg-gray-700 p-4 rounded-b-lg border-l-4 border-teal-600 dark:border-teal-500 animate-accordion-down">
                  <p className={`text-gray-600 dark:text-gray-300 leading-relaxed ${language === 'ar' ? 'text-right' : 'text-left'}`}>{faq.answer}</p>
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
