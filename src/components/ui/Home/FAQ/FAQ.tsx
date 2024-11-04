import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { IoChevronDownOutline } from "react-icons/io5";
import { MdOutlineQuestionAnswer } from "react-icons/md";

const FAQItem = ({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="border-b border-gray-200 last:border-0"
    >
      <motion.button
        className="w-full py-4 px-6 flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <span className="text-lg font-medium text-gray-800">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <IoChevronDownOutline className="w-6 h-6 text-blue-600" />
        </motion.div>
      </motion.button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="p-6 text-gray-600 bg-gray-50">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export const FAQ = () => {
  const faqs = [
    {
      question: "How do I book a service?",
      answer:
        "You can book a service by navigating to the Services page and selecting your desired service and time slot. Our intuitive booking system will guide you through the process step by step.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept a wide range of payment methods including credit cards (Visa, MasterCard, American Express), debit cards, and popular online payment gateways like PayPal and Stripe.",
    },
    {
      question: "Can I reschedule my booking?",
      answer:
        "Yes, you can easily reschedule your booking through your account dashboard or by contacting our support team at least 24 hours before your scheduled time. We'll be happy to help you find a more suitable time slot.",
    },
  ];

  return (
    <motion.section
      className="py-16 px-4 bg-white"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <MdOutlineQuestionAnswer className="w-16 h-16 mx-auto mb-4 text-black" />
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600">
            Find quick answers to common questions about our services
          </p>
        </motion.div>
        <motion.div
          className="bg-white rounded-lg shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};
