import { motion } from "framer-motion";
import { IoMailOutline, IoSendOutline } from 'react-icons/io5';
import { useState } from "react";
import { toast } from "sonner";

export const Newsletter = () => {
    const [email, setEmail] = useState('');
  
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      email && toast.success(`Subscribed with email: ${email}`);
      setEmail('');
    };
  
    return (
      <motion.section 
        className="py-16 px-4 bg-gradient-to-br from-gray-50 to-indigo-50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto text-center">
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <IoMailOutline className="w-16 h-16 mx-auto mb-4 text-black" />
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Stay Updated
            </h2>
            <p className="text-lg text-gray-600">
              Join our newsletter and get the latest updates, exclusive offers, and expert tips 
              delivered directly to your inbox.
            </p>
          </motion.div>
          
          <motion.form 
            onSubmit={handleSubmit} 
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full px-6 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                required
              />
            </div>
            <motion.button
              type="submit"
              className="inline-flex items-center justify-center px-8 py-3 btn-custom text-white rounded-lg overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="flex items-center">
                Subscribe
                <motion.span
                  className="ml-2"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <IoSendOutline className="w-5 h-5" />
                </motion.span>
              </span>
            </motion.button>
          </motion.form>
        </div>
      </motion.section>
    );
  };