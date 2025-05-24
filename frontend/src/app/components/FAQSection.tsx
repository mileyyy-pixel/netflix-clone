import { useState } from "react";
import { Plus, X } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "What is Netflix?",
    answer: "Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices."
  },
  {
    question: "How much does Netflix cost?",
    answer: "Watch Netflix on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee. Plans range from ₹149 to ₹649 a month."
  },
  {
    question: "Where can I watch?",
    answer: "Watch anywhere, anytime. Sign in with your Netflix account to watch instantly on the web at netflix.com from your personal computer or on any internet-connected device."
  },
  {
    question: "How do I cancel?",
    answer: "Netflix is flexible. There are no pesky contracts and no commitments. You can easily cancel your account online in two clicks."
  },
  {
    question: "What can I watch on Netflix?",
    answer: "Netflix has an extensive library of feature films, documentaries, TV shows, anime, award-winning Netflix originals, and more."
  },
  {
    question: "Is Netflix good for kids?",
    answer: "The Netflix Kids experience is included in your membership to give parents control while kids enjoy family-friendly TV shows and movies."
  }
];

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAnswer = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-16 transform -translate-y-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-xl md:text-2xl font-bold text-white mb-4 -translate-x-4">
          Frequently Asked Questions
        </h2>
        
        <div className="space-y-4 -translate-x-4">
          {faqData.map((item, index) => (
            <div
              key={index}
              className="bg-[#303030] rounded-lg overflow-hidden transition-colors duration-300 hover:bg-[#404040] w-full"
            >
              <button
                className="w-full text-left"
                onClick={() => toggleAnswer(index)}
                aria-expanded={activeIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <div className="flex justify-between items-center p-6">
                  <h3 className="text-lg md:text-xl font-semibold text-white pr-8">
                    {item.question}
                  </h3>
                  <span className="text-2xl flex-shrink-0 text-white transition-transform duration-300">
                    {activeIndex === index ? (
                      <X className="w-6 h-6" />
                    ) : (
                      <Plus className="w-6 h-6" />
                    )}
                  </span>
                </div>
              </button>
              
              <div
                id={`faq-answer-${index}`}
                className={`overflow-hidden transition-all duration-300 ease-in-out items-center ${
                  activeIndex === index ? "max-h-96" : "max-h-0"
                }`}
                role="region"
                aria-labelledby={`faq-question-${index}`}
              >
                <div className="p-6 pt-0 text-base md:text-lg text-gray-300 bg-[#1e1e1e] transform translate-y-4">
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;