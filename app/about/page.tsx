"use client";

import { motion } from "framer-motion";
import NavbarTwo from "@/components/HeaderTwo";
import LuxuryFooter from "@/components/LuxuryFooter";
import { ArrowRight, Instagram, Twitter, Facebook, Youtube } from "lucide-react";

const AboutPage = () => {
  // Timeline data
  const timeline = [
    {
      year: "2010",
      title: "Foundation",
      description: "Extreme Collections was born in a small Milan studio, with a vision to redefine luxury streetwear.",
      image: "https://i.pinimg.com/736x/5a/3e/6a/5a3e6a6c8a1a9b1e8e3e6a6c8a1a9b1e.jpg"
    },
    {
      year: "2012",
      title: "First Flagship Store",
      description: "Opened our first boutique in downtown Milan, introducing the 'Extreme Luxury' concept to the world.",
      image: "https://i.pinimg.com/736x/77/ea/a2/77eaa2802affc0b41489388e2d2bdc2e.jpg"
    },
    {
      year: "2015",
      title: "Global Expansion",
      description: "Launched international shipping and opened stores in Paris, New York, and Tokyo.",
      image: "https://i.pinimg.com/736x/da/e1/00/dae1000ddbd86a468c90685ac6603879.jpg"
    },
    {
      year: "2018",
      title: "Collaboration Era",
      description: "Partnered with top artists and designers to create limited edition collections that sold out within hours.",
      image: "https://i.pinimg.com/736x/57/6e/ef/576eefe23318e35580853471036bbc8d.jpg"
    },
    {
      year: "2022",
      title: "Sustainability Pledge",
      description: "Committed to 100% sustainable and ethical production by 2025 without compromising our signature luxury.",
      image: "https://i.pinimg.com/736x/c8/0b/cb/c80bcbf585310970bc9a68e1ba7e96f1.jpg"
    },
    {
      year: "Present",
      title: "The Future",
      description: "Continuing to push boundaries in fashion with innovative designs and unparalleled quality.",
      image: "https://i.pinimg.com/736x/97/82/56/978256ac60bc5ed25e6dfeda175bd14d.jpg"
    }
  ];

  // Team members
  const team = [
    {
      name: "Alessandro Rossi",
      role: "Founder & Creative Director",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      quote: "Fashion is the armor to survive reality."
    },
    {
      name: "Sophia Chen",
      role: "Head Designer",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      quote: "Every stitch tells a story of rebellion and refinement."
    },
    {
      name: "James Laurent",
      role: "Global Brand Director",
      image: "https://randomuser.me/api/portraits/men/75.jpg",
      quote: "Luxury should be felt, not just seen."
    },
    {
      name: "Isabella Moretti",
      role: "Sustainability Officer",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
      quote: "True style respects the earth that creates it."
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      <NavbarTwo />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-woman-looking-through-the-clothes-in-a-store-39845-large.mp4" type="video/mp4" />
        </video>
        
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-20 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#f4b500] to-[#d4a017]">
              Imani Homes and Imports
            </span>
          </h1>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Where bold design meets uncompromising quality. Redefining luxury for the rebellious at heart.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-[#f4b500] hover:bg-[#d4a017] text-black font-bold rounded-full flex items-center gap-2 mx-auto"
          >
            Explore Our Story <ArrowRight size={18} />
          </motion.button>
        </motion.div>
      </section>

      {/* Mission Statement */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
  initial={{ opacity: 0, x: -50 }}
  whileInView={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.6 }}
  viewport={{ once: true }}
>
  <h2 className="text-4xl font-bold text-gray-900 mb-6">
    Our <span className="text-[#f4b500]">Philosophy</span>
  </h2>

  <p className="text-lg text-gray-600 mb-4">
    At <strong>Extreme Collection</strong>, fashion is more than just clothing it's a bold statement of identity, confidence, and self-expression.
  </p>

  <p className="text-lg text-gray-600 mb-4">
    We’re a boutique that brings together the finest <strong>streetwear and luxury casualwear</strong> from both Kenyan and international brands. From hidden gems to exclusive finds, our curated selections make shopping effortless, stylish, and personal.
  </p>

  <p className="text-lg text-gray-600 mb-4">
    We champion upcoming designers, giving them a platform to shine ensuring our clients access rare, high-quality items they won’t find anywhere else. Every piece we stock is chosen with intention, blending trend, quality, and story.
  </p>

  <p className="text-lg text-gray-600 mb-8">
    At Extreme Collection, you don’t just shop <strong>you shop your style</strong>.
  </p>

  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className="px-6 py-3 border-2 border-black text-black font-bold rounded-full hover:bg-black hover:text-white transition-colors"
  >
    Meet The Team
  </motion.button>
</motion.div>

          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="relative h-64 rounded-xl overflow-hidden">
              <img 
                src="https://i.pinimg.com/736x/9a/3e/6a/9a3e6a6c8a1a9b1e8e3e6a6c8a1a9b1e.jpg" 
                alt="Extreme Collections design" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end p-4">
                <span className="text-white font-medium">Milan Atelier</span>
              </div>
            </div>
            <div className="relative h-64 rounded-xl overflow-hidden">
              <img 
                src="https://i.pinimg.com/736x/8e/3e/6a/8e3e6a6c8a1a9b1e8e3e6a6c8a1a9b1e.jpg" 
                alt="Extreme Collections design" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end p-4">
                <span className="text-white font-medium">Handcrafted Details</span>
              </div>
            </div>
            <div className="relative h-64 rounded-xl overflow-hidden col-span-2">
              <img 
                src="https://i.pinimg.com/736x/97/82/56/978256ac60bc5ed25e6dfeda175bd14d.jpg" 
                alt="Extreme Collections design" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end p-4">
                <span className="text-white font-medium">Sustainable Luxury</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Timeline Section *
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center text-gray-900 mb-16"
          >
            Our <span className="text-[#f4b500]">Journey</span>
          </motion.h2>
          
          <div className="relative">
            {/* Vertical line *
            <div className="absolute left-1/2 h-full w-0.5 bg-[#f4b500] transform -translate-x-1/2 z-0"></div>
            
            {/* Timeline items *
            <div className="space-y-16">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`relative flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} items-center`}
                >
                  {/* Year *
                  <div className="w-1/2 px-8">
                    <div className={`text-2xl font-bold ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                      {item.year}
                    </div>
                  </div>
                  
                  {/* Dot *
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-[#f4b500] border-4 border-white z-10"></div>
                  
                  {/* Content *
                  <div className="w-1/2 px-8">
                    <div className={`bg-white p-6 rounded-xl shadow-lg ${index % 2 === 0 ? 'ml-auto' : 'mr-auto'}`}>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-gray-600 mb-4">{item.description}</p>
                      <div className="h-48 overflow-hidden rounded-lg">
                        <img 
                          src={item.image} 
                          alt={item.title} 
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>*/}
      {/* Timeline Section */}
<section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
  <div className="max-w-4xl mx-auto">
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="text-4xl font-bold text-center text-gray-900 mb-16"
    >
      Our <span className="text-[#f4b500]">Journey</span>
    </motion.h2>
    
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-1/2 h-full w-0.5 bg-[#f4b500] transform -translate-x-1/2 z-0"></div>
      
      {/* Timeline items */}
      <div className="space-y-16">
        {timeline.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            className={`relative flex flex-col items-center md:flex-row md:${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} md:items-start`}
          >
            {/* Year */}
            <div className="w-full md:w-1/2 px-4 md:px-8 text-center md:text-left">
              <div className={`text-2xl font-bold md:text-3xl`}>
                {item.year}
              </div>
            </div>
            
            {/* Dot */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-[#f4b500] border-4 border-white z-10 mt-4 md:mt-0"></div>
            
            {/* Content */}
            <div className="w-full md:w-1/2 px-4 md:px-8 mt-4 md:mt-0">
              <div className="bg-white p-4 md:p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <div className="h-48 overflow-hidden rounded-lg">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
</section>

      {/* Team Section *
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            The <span className="text-[#f4b500]">Visionaries</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Meet the creative minds who turn rebellion into wearable art
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <p className="text-white italic">"{member.quote}"</p>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                <p className="text-[#f4b500] font-medium mb-2">{member.role}</p>
                <div className="flex justify-center space-x-4 mt-4">
                  <a href="#" className="text-gray-400 hover:text-[#f4b500]">
                    <Instagram size={18} />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-[#f4b500]">
                    <Twitter size={18} />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-[#f4b500]">
                    <Facebook size={18} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>*/}

      {/* Sustainability Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black text-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">
              <span className="text-[#f4b500]">Sustainable</span> Luxury
            </h2>
            <p className="text-lg text-gray-300 mb-6">
              Our commitment to the planet is as strong as our designs. By 2025, 100% of our materials will be sustainably sourced without compromising our signature quality.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start">
                <span className="text-[#f4b500] mr-2">✓</span>
                <span>Ethically sourced materials from certified suppliers</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#f4b500] mr-2">✓</span>
                <span>Carbon-neutral shipping worldwide</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#f4b500] mr-2">✓</span>
                <span>Zero-waste production facilities</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#f4b500] mr-2">✓</span>
                <span>Recycling program for all Extreme Collections garments</span>
              </li>
            </ul>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 bg-[#f4b500] hover:bg-[#d4a017] text-black font-bold rounded-full"
            >
              Our Sustainability Report
            </motion.button>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative h-96 rounded-xl overflow-hidden"
          >
            <img 
              src="https://i.pinimg.com/736x/c7/c5/b4/c7c5b45f89d252187a48e8517c23bc01.jpg" 
              alt="Sustainable fashion" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
              <div>
                <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                  <div className="bg-[#f4b500] h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
                <p className="text-white">85% of our 2025 sustainability goals achieved</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#1a1a1a] to-[#2c2c2c] text-white text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-4xl font-bold mb-6">Join the Extreme Movement</h2>
          <p className="text-xl text-gray-300 mb-8">
            Subscribe to our newsletter for exclusive drops, early access, and 15% off your first order.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-1 px-4 py-3 rounded-full bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#f4b500] text-white placeholder-gray-400"
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 bg-[#f4b500] hover:bg-[#d4a017] text-black font-bold rounded-full"
            >
              Subscribe
            </motion.button>
          </div>
          <div className="flex justify-center space-x-6 mt-8">
            <a href="#" className="text-gray-300 hover:text-[#f4b500]">
              <Instagram size={24} />
            </a>
            <a href="#" className="text-gray-300 hover:text-[#f4b500]">
              <Twitter size={24} />
            </a>
            <a href="#" className="text-gray-300 hover:text-[#f4b500]">
              <Facebook size={24} />
            </a>
            <a href="#" className="text-gray-300 hover:text-[#f4b500]">
              <Youtube size={24} />
            </a>
          </div>
        </motion.div>
      </section>

      <LuxuryFooter />
    </div>
  );
};

export default AboutPage;

