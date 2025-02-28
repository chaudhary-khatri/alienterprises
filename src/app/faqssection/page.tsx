import React from "react";

type FAQItem = {
  question: string;
  answer: string;
};

const faqItems: FAQItem[] = [
  {
    question: "What types of machinery do you offer?",
    answer: "We offer a wide range of machinery including brick makers, trenchers, pole erection machines, and more, designed for various construction needs.",
  },
  {
    question: "How can I book a product for purchase?",
    answer: "You can book a product directly through our website or contact our sales team for more personalized assistance.",
  },
  {
    question: "Do you offer after-sales support?",
    answer: "Yes, we provide full after-sales support, including maintenance, repairs, and customer service for any issues with the machinery.",
  },
  {
    question: "Where are your products available?",
    answer: "Our products are available nationwide, with specific availability in different regions. You can check our interactive map for more details.",
  },
  {
    question: "What is your warranty policy?",
    answer: "We offer a standard warranty on all of our machines. For more detailed information, please refer to the product documentation or contact us directly.",
  },
];

const FAQsSection: React.FC = () => {
  return (
    <section id="faq" className="py-12 bg-gray-200">
      <div className="max-w-screen-lg mx-auto px-4 sm:px-6">
        <h2 className="text-3xl font-bold text-teal-700 text-center mb-6">FAQs</h2>
        <div className="space-y-4">
          {faqItems.map((faq, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
            >
              <h3 className="text-xl font-semibold text-teal-700 mb-2">{faq.question}</h3>
              <p className="text-gray-700">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQsSection;
