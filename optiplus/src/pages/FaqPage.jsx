import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const FaqPage = () => {
  const faqs = [
    {
      category: "Eye Testing",
      questions: [
        {
          question: "Is eye testing really free at OptiPlus?",
          answer: "Yes! We offer completely free comprehensive eye examinations using state-of-the-art equipment. We believe everyone should have access to quality eye care."
        },
        {
          question: "How long does an eye test take?",
          answer: "A comprehensive eye examination typically takes 30-45 minutes. This allows us to thoroughly check your eye health and vision."
        },
        {
          question: "What should I bring to my eye test?",
          answer: "Please bring your current glasses or contact lenses, a list of any medications you're taking, and any relevant medical history."
        }
      ]
    },
    {
      category: "Appointments",
      questions: [
        {
          question: "How do I book an appointment?",
          answer: "You can book an appointment through our website's booking system, call us directly, or visit any of our branches. Online booking is available 24/7 for your convenience."
        },
        {
          question: "What if I need to reschedule my appointment?",
          answer: "You can reschedule your appointment by calling us or through our online booking system. We appreciate at least 24 hours notice for any changes."
        }
      ]
    },
    {
      category: "Products & Services",
      questions: [
        {
          question: "Do you offer frame adjustments?",
          answer: "Yes, we provide free frame adjustments and minor repairs for glasses purchased from OptiPlus. For frames purchased elsewhere, there may be a small fee."
        },
        {
          question: "How long does it take to get new glasses?",
          answer: "Typically, new glasses are ready within 7-10 working days, depending on the lens type and prescription. Some simple prescriptions may be ready sooner."
        },
        {
          question: "Do you offer contact lens fittings?",
          answer: "Yes, we provide professional contact lens fittings and consultations. Our experts will help you choose the most suitable type of contact lenses for your needs."
        }
      ]
    },
    {
      category: "After Care",
      questions: [
        {
          question: "How often should I have my eyes tested?",
          answer: "We recommend having your eyes tested every 1-2 years. However, if you notice any changes in your vision, you should book an appointment immediately."
        },
        {
          question: "What if I'm not happy with my new glasses?",
          answer: "We have a satisfaction guarantee policy. If you're not completely satisfied with your glasses, please return within 30 days and we'll make it right."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
            <p className="text-xl text-blue-100">Find answers to common questions about our services</p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {faqs.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: categoryIndex * 0.1 }}
              className="mb-12"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{category.category}</h2>
              <div className="space-y-4">
                {category.questions.map((faq, index) => (
                  <details
                    key={index}
                    className="group bg-white rounded-lg shadow-md"
                  >
                    <summary className="flex items-center justify-between cursor-pointer p-6">
                      <h3 className="text-lg font-medium text-gray-900 pr-6">{faq.question}</h3>
                      <ChevronDown className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" />
                    </summary>
                    <div className="px-6 pb-6 text-gray-600">
                      <p>{faq.answer}</p>
                    </div>
                  </details>
                ))}
              </div>
            </motion.div>
          ))}

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12 text-center bg-white p-8 rounded-lg shadow-md"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Still have questions?</h2>
            <p className="text-gray-600 mb-6">
              Can't find the answer you're looking for? Contact our team for assistance.
            </p>
            <div className="space-x-4">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Contact Us
              </Link>
              <Link
                to="/book"
                className="inline-flex items-center justify-center px-6 py-3 border border-blue-600 text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50"
              >
                Book Appointment
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default FaqPage;