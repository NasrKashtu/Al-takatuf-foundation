import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';

const FAQSection = () => {
  const { t } = useApp();
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    { question: t('faqQ1'), answer: t('faqA1') },
    { question: t('faqQ2'), answer: t('faqA2') },
    { question: t('faqQ3'), answer: t('faqA3') },
  ];

  return (
    <section className="py-20 bg-muted/40">
      <div className="container mx-auto px-4 text-start">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12 animate-fade-in">
          {t('faq')}
        </h2>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-lg border border-border bg-card overflow-hidden"
              >
                <button
                  className="w-full p-4 flex items-center justify-between text-foreground hover:bg-muted/50 transition-colors"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  aria-expanded={isOpen}
                >
                  <span className="font-medium text-start">
                    {faq.question}
                  </span>
                  <ChevronDown
                    size={20}
                    className={`text-muted-foreground transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 border-t border-border animate-accordion-down">
                    <p className="pt-4 text-muted-foreground leading-relaxed text-start">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
