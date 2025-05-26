"use client"
import { motion } from "framer-motion";
import { 
  Phone, Mail, MessageSquare, 
  CreditCard, Shield, FileText,
  Instagram, Twitter, Youtube, 
  ChevronRight
} from "lucide-react";
import { FaPinterest } from "react-icons/fa";

const LuxuryFooter = () => {
  return (
    <footer className="relative bg-[#0a0a0a] text-gray-300 pt-20 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Floating decorative elements */}
      <motion.div 
        className="absolute top-20 left-10 w-24 h-24 bg-[#f4b500]/10 rounded-full blur-xl"
        animate={{
          x: [0, 15, 0],
          y: [0, 20, 0],
          rotate: [0, 10, 0]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      <motion.div 
        className="absolute bottom-32 right-16 w-20 h-20 bg-[#f4b500]/05 rounded-full blur-lg"
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, -5, 0]
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-white mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#f4b500] to-[#ffffff]">
               Imani Imports
              </span>
            </h3>
            <p className="mb-6">
              Redefining luxury fashion with exclusive designer pieces crafted with precision and passion.
            </p>
            <div className="flex space-x-4">
              {[Instagram, Twitter, Youtube, FaPinterest].map((Icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  className="text-gray-400 hover:text-[#f4b500] transition-colors"
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon size={20} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold text-white mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {['About Us', 'Shipping & Returns', 'FAQs', 'Contact'].map((link, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <a href="#" className="hover:text-[#f4b500] transition-colors flex items-center">
                    <ChevronRight size={14} className="mr-2 text-[#f4b500]" /> {link}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Customer Support */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold text-white mb-6">Customer Support</h4>
            <ul className="space-y-4">
              <motion.li whileHover={{ x: 5 }}>
                <a href="tel:+18005551234" className="flex items-center hover:text-[#f4b500] transition-colors">
                  <Phone size={16} className="mr-3 text-[#f4b500]" /> +1 (800) 555-1234
                </a>
              </motion.li>
              <motion.li whileHover={{ x: 5 }}>
                <a href="mailto:service@imanihomesandimports.com" className="flex items-center hover:text-[#f4b500] transition-colors">
                  <Mail size={16} className="mr-3 text-[#f4b500]" /> service@imanihomesandimports.com
                </a>
              </motion.li>
              <motion.li whileHover={{ x: 5 }}>
                <a href="#" className="flex items-center hover:text-[#f4b500] transition-colors">
                  <MessageSquare size={16} className="mr-3 text-[#f4b500]" /> Live Chat
                </a>
              </motion.li>
            </ul>
          </motion.div>

          {/* Payment & Legal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold text-white mb-6">Payment Methods</h4>
            <div className="flex flex-wrap gap-3 mb-8">
              {['Visa', 'MasterCard', 'PayPal', 'Apple Pay', 'Crypto'].map((method, index) => (
                <motion.div
                  key={index}
                  className="bg-[#1a1a1a] px-3 py-2 rounded-md text-xs"
                  whileHover={{ y: -3 }}
                >
                  {method}
                </motion.div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 text-sm">
              <motion.a 
                href="#" 
                className="flex items-center hover:text-[#f4b500] transition-colors"
                whileHover={{ x: 3 }}
              >
                <Shield size={14} className="mr-2" /> Privacy Policy
              </motion.a>
              <motion.a 
                href="#" 
                className="flex items-center hover:text-[#f4b500] transition-colors"
                whileHover={{ x: 3 }}
              >
                <FileText size={14} className="mr-2" /> Terms of Service
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="h-px bg-gradient-to-r from-transparent via-[#f4b500]/30 to-transparent my-12"
        />

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center text-sm text-gray-500"
        >
          © {new Date().getFullYear()} Extreme Collections. All rights reserved.
        </motion.div>
      </div>
    </footer>
  );
};

export default LuxuryFooter;