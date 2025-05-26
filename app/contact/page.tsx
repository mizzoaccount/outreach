"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import NavbarTwo from "@/components/HeaderTwo";
import LuxuryFooter from "@/components/LuxuryFooter";
import { Mail, Phone, MapPin, Clock, ChevronDown, ChevronUp, Check, X } from "lucide-react";

const ContactPage = () => {
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [formErrors, setFormErrors] = useState({
    name: false,
    email: false,
    subject: false,
    message: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const toggleAccordion = (index: number) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user types
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: false
      }));
    }
  };

  const validateForm = () => {
    const errors = {
      name: !formData.name.trim(),
      email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email),
      subject: !formData.subject.trim(),
      message: !formData.message.trim()
    };
    setFormErrors(errors);
    return !Object.values(errors).some(error => error);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitSuccess(true);
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: ""
        });
        // Hide success message after 5 seconds
        setTimeout(() => setSubmitSuccess(false), 5000);
      }, 1500);
    }
  };

  // FAQ data
  const faqs = [
    {
      question: "What are your customer service hours?",
      answer: "Our customer service team is available Monday to Friday from 9:00 AM to 6:00 PM CET, and Saturday from 10:00 AM to 4:00 PM CET. We're closed on Sundays and major holidays."
    },
    {
      question: "How can I track my order?",
      answer: "Once your order ships, you'll receive a confirmation email with a tracking number and link. You can also track your order by logging into your account on our website."
    },
    {
      question: "What is your return policy?",
      answer: "We offer free returns within 30 days of purchase. Items must be unworn, undamaged, and with all original tags attached. Final sale items are not eligible for return."
    },
    {
      question: "Do you offer international shipping?",
      answer: "Yes, we ship worldwide with DHL Express. Delivery times vary by destination but typically range from 2-5 business days after dispatch. All import duties and taxes are calculated at checkout."
    },
    {
      question: "How do I care for my Extreme Collections items?",
      answer: "Each item comes with specific care instructions. Generally, we recommend dry cleaning for our luxury pieces. Avoid machine washing and ironing directly on embellishments or prints."
    }
  ];

  // Store locations
  const stores = [
    {
      city: "Milan",
      address: "Via Monte Napoleone, 15, 20121 Milano MI, Italy",
      phone: "+39 02 123 4567",
      hours: "Mon-Sat: 10:00 AM - 8:00 PM, Sun: 11:00 AM - 6:00 PM"
    },
    {
      city: "Paris",
      address: "16 Rue du Faubourg Saint-Honoré, 75008 Paris, France",
      phone: "+33 1 23 45 67 89",
      hours: "Mon-Sat: 10:00 AM - 8:00 PM, Sun: Closed"
    },
    {
      city: "New York",
      address: "767 5th Ave, New York, NY 10153, United States",
      phone: "+1 212-123-4567",
      hours: "Mon-Sat: 10:00 AM - 8:00 PM, Sun: 11:00 AM - 7:00 PM"
    },
    {
      city: "Tokyo",
      address: "5 Chome-3-1 Minamiaoyama, Minato City, Tokyo 107-0062, Japan",
      phone: "+81 3-1234-5678",
      hours: "Mon-Sun: 10:00 AM - 8:00 PM"
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      <NavbarTwo />
      
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <img
          src="https://i.pinimg.com/736x/97/82/56/978256ac60bc5ed25e6dfeda175bd14d.jpg"
          alt="Extreme Collections store"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-20 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#f4b500] to-[#d4a017]">
              Contact Us
            </span>
          </h1>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            We're here to help. Reach out for inquiries, styling advice, or just to say hello.
          </p>
        </motion.div>
      </section>

      {/* Contact Methods */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Email */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:border-[#f4b500]/50 transition-all"
          >
            <div className="bg-[#f4b500]/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
              <Mail className="text-[#f4b500] w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Email Us</h3>
            <p className="text-gray-600 mb-4">For general inquiries and customer service</p>
            <a href="mailto:contact@extremecollections.com" className="text-[#f4b500] hover:text-[#d4a017] font-medium">
              contact@extremecollections.com
            </a>
          </motion.div>

          {/* Phone */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:border-[#f4b500]/50 transition-all"
          >
            <div className="bg-[#f4b500]/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
              <Phone className="text-[#f4b500] w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Call Us</h3>
            <p className="text-gray-600 mb-4">Speak directly with our style consultants</p>
            <a href="tel:+18005551234" className="text-[#f4b500] hover:text-[#d4a017] font-medium">
              +1 (800) 555-1234
            </a>
          </motion.div>

          {/* Stores */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:border-[#f4b500]/50 transition-all"
          >
            <div className="bg-[#f4b500]/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
              <MapPin className="text-[#f4b500] w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Visit Us</h3>
            <p className="text-gray-600 mb-4">Experience Extreme Collections in person</p>
            <a href="#stores" className="text-[#f4b500] hover:text-[#d4a017] font-medium">
              Find a store near you
            </a>
          </motion.div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Send Us a <span className="text-[#f4b500]">Message</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Have a question or special request? Fill out the form below and we'll get back to you within 24 hours.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-xl shadow-lg"
          >
            {submitSuccess && (
              <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg flex items-start gap-3">
                <Check className="text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-bold">Message sent successfully!</p>
                  <p className="text-sm">We'll get back to you within 24 hours.</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg border ${formErrors.name ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-[#f4b500] focus:border-transparent`}
                    placeholder="Your name"
                  />
                  {formErrors.name && (
                    <p className="mt-1 text-sm text-red-500">Please enter your name</p>
                  )}
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg border ${formErrors.email ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-[#f4b500] focus:border-transparent`}
                    placeholder="your.email@example.com"
                  />
                  {formErrors.email && (
                    <p className="mt-1 text-sm text-red-500">Please enter a valid email</p>
                  )}
                </div>
              </div>
              <div className="mb-6">
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Subject <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-lg border ${formErrors.subject ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-[#f4b500] focus:border-transparent`}
                  placeholder="What's this about?"
                />
                {formErrors.subject && (
                  <p className="mt-1 text-sm text-red-500">Please enter a subject</p>
                )}
              </div>
              <div className="mb-8">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-lg border ${formErrors.message ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-[#f4b500] focus:border-transparent`}
                  placeholder="Your message here..."
                ></textarea>
                {formErrors.message && (
                  <p className="mt-1 text-sm text-red-500">Please enter your message</p>
                )}
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitting}
                className="w-full bg-[#f4b500] hover:bg-[#d4a017] text-black font-bold py-4 rounded-full transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Store Locations */}
      <section id="stores" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Our <span className="text-[#f4b500]">Boutiques</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Visit us in person to experience Extreme Collections luxury firsthand
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="h-full min-h-96 rounded-xl overflow-hidden shadow-lg"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2796.906627061012!2d9.1893953155672!3d45.46681397910113!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4786c6a5e1e1f5e5%3A0x1a3b0d8f8f8f8f8f!2sVia%20Monte%20Napoleone%2C%2020121%20Milano%20MI%2C%20Italy!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              className="min-h-96"
            ></iframe>
          </motion.div>

          {/* Store List */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {stores.map((store, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:border-[#f4b500]/50 transition-all">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{store.city}</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="text-[#f4b500] mt-0.5 flex-shrink-0" size={18} />
                    <p className="text-gray-600">{store.address}</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="text-[#f4b500] mt-0.5 flex-shrink-0" size={18} />
                    <p className="text-gray-600">{store.phone}</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="text-[#f4b500] mt-0.5 flex-shrink-0" size={18} />
                    <p className="text-gray-600">{store.hours}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black text-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">
              <span className="text-[#f4b500]">Frequently</span> Asked Questions
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Quick answers to common questions about Extreme Collections
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-800 last:border-0 pb-4">
                <button
                  onClick={() => toggleAccordion(index)}
                  className="flex justify-between items-center w-full text-left py-4 focus:outline-none"
                >
                  <h3 className="text-lg font-medium text-white">{faq.question}</h3>
                  {activeAccordion === index ? (
                    <ChevronUp className="text-[#f4b500]" />
                  ) : (
                    <ChevronDown className="text-[#f4b500]" />
                  )}
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${activeAccordion === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <p className="text-gray-300 pb-4">{faq.answer}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#1a1a1a] to-[#2c2c2c] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            Still have questions?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
          >
            Our customer service team is ready to assist you with any inquiries.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href="tel:+18005551234"
              className="px-8 py-4 bg-[#f4b500] hover:bg-[#d4a017] text-black font-bold rounded-full"
            >
              Call Now
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href="#contact-form"
              className="px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-black font-bold rounded-full transition-colors"
            >
              Message Us
            </motion.a>
          </motion.div>
        </div>
      </section>

      <LuxuryFooter />
    </div>
  );
};

export default ContactPage;