// pages/index.tsx
import Hero from '@/components/Hero';
import Navbar from '@/components/Header';
import FeaturedCollections from '@/components/FeaturedCollections';
import SpecialOffers from '@/components/SpecialOffers';
import DesignerShowcase from '@/components/DesignerShowcase';
import Testimonials from '@/components/Testimonials';
import CelebritySpotlight from '@/components/CelebritySpotlight';
import SocialMediaIntegration from '@/components/SicialMediaIntegration';
import NewsletterSignup from '@/components/NewsLetterSignup';
import FashionBlogSection from '@/components/FashionBlogSection';
import LuxuryFooter from '@/components/LuxuryFooter';
import AboutSection from '@/components/About';
import ContactForm from '@/components/ContactForm';
import ClientReviews from '@/components/ClientReviews';
import SafetyGuidesSection from '@/components/SafetyGuideSection';
import IndustriesServed from '@/components/IndustriesServed';
import CertificationsSection from '@/components/CertificationsSection';
import Perspectives from '@/components/Perspectives';
import About from '@/components/About';
import Ministries from '@/components/Ministries';
import Events from '@/components/Events';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
     
      <main>
         {/*<Navbar />
        <Hero />
        <AboutSection />
        <FeaturedCollections />
       <SpecialOffers />
        <DesignerShowcase />
        <Testimonials />
        <CelebritySpotlight />
        <SocialMediaIntegration />
        <NewsletterSignup />
        <FashionBlogSection />*}
        <CertificationsSection />
        <IndustriesServed />
        <SafetyGuidesSection />
        <ClientReviews />
        <ContactForm />
        <LuxuryFooter />*/}

        <Navbar />
        <Hero />
        <About />
        <Perspectives />
        <Ministries />
        <Events />
        <FeaturedCollections />
        <SpecialOffers />
        
        {/*<DesignerShowcase />
        <Testimonials />
        <CelebritySpotlight />
        <SocialMediaIntegration />
        <NewsletterSignup />
        <FashionBlogSection />*/}
        <LuxuryFooter />
      
      </main>
    
    </div>
  );
}

// pages/index.tsx
/*"use client"
import { useEffect, useRef } from 'react';
import Head from 'next/head';
import { motion, useInView, useAnimation, AnimatePresence } from 'framer-motion';
import { FiArrowRight, FiCalendar, FiDownload, FiMail, FiPhone, FiUsers, FiHeart,  FiSun, FiBook, FiDollarSign } from 'react-icons/fi';

export default function Home() {
  // Animation triggers
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const mainControls = useAnimation();
  
  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView]);

  // Stats data
  const stats = [
    { value: "2,500+", label: "Youth Empowered" },
    { value: "15", label: "Community Projects" },
    { value: "80%", label: "Women Participation" },
    { value: "5", label: "Partner Organizations" },
  ];

  // Programs data
  const programs = [
    { 
      title: "Leadership & Governance", 
      icon: <FiUsers className="w-8 h-8" />,
      description: "Building community leadership capacity and good governance practices."
    },
    { 
      title: "Youth & Women Empowerment", 
      icon: <FiHeart className="w-8 h-8" />,
      description: "Mentorship and skills development for youth and women."
    },
    { 
      title: "Agribusiness", 
      icon: <FiSun className="w-8 h-8" />,
      description: "Promoting sustainable farming and agribusiness ventures."
    },
    { 
      title: "Budget Advocacy", 
      icon: <FiDollarSign className="w-8 h-8" />,
      description: "Enhancing social accountability in public resource management."
    },
    { 
      title: "Climate Action", 
      icon: <FiSun className="w-8 h-8" />,
      description: "Environmental conservation and climate change adaptation."
    },
    { 
      title: "SRHR Education", 
      icon: <FiBook className="w-8 h-8" />,
      description: "Sexual and reproductive health rights awareness programs."
    },
  ];

  // News data
  const news = [
    {
      title: "Youth Entrepreneurship Training",
      date: "May 15, 2025",
      excerpt: "50 youth complete 3-month agribusiness training program in Kongoni Ward.",
      category: "Empowerment"
    },
    {
      title: "Tree Planting Initiative",
      date: "April 22, 2025",
      excerpt: "Community plants 1,000 trees to mark Earth Day in Likuyani.",
      category: "Environment"
    },
    {
      title: "Women's Leadership Forum",
      date: "March 8, 2025",
      excerpt: "Celebrating International Women's Day with leadership workshops.",
      category: "Empowerment"
    }
  ];

  // Events data
  const events = [
    {
      title: "Community Budget Forum",
      date: "June 5, 2025",
      time: "10:00 AM",
      location: "Kongoni Community Hall"
    },
    {
      title: "Farmers Training Day",
      date: "June 12, 2025",
      time: "8:00 AM",
      location: "LCEO Training Center"
    },
    {
      title: "SRHR Youth Workshop",
      date: "June 20, 2025",
      time: "2:00 PM",
      location: "Likuyani Secondary School"
    }
  ];

  return (
    <>
      <Head>
        <title>Likuyani Community Empowerment Organization</title>
        <meta name="description" content="Empowering communities in Likuyani through leadership, agribusiness, and social development programs." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Navigation *
      <nav className="fixed w-full bg-white shadow-md z-50">
        <div className="container mx-auto px-6 py-3 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            <div className="w-12 h-12 rounded-full bg-[#03ac56] flex items-center justify-center text-white font-bold text-xl">LCEO</div>
            <span className="ml-3 text-xl font-semibold text-gray-800">Likuyani C.E.O</span>
          </motion.div>
          
          <div className="hidden md:flex space-x-8">
            {['Home', 'About', 'Programs', 'News', 'Events', 'Get Involved', 'Donate'].map((item, index) => (
              <motion.a
                key={item}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                href="#"
                className="text-gray-700 hover:text-[#b60808] transition-colors font-medium"
              >
                {item}
              </motion.a>
            ))}
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden md:block bg-[#b60808] text-white px-6 py-2 rounded-full font-medium hover:bg-[#9ed462] transition-colors"
          >
            Contact Us
          </motion.button>
          
          <button className="md:hidden text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Hero Section *
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-r from-[#03ac56] to-[#9ed462] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[url('/images/african-pattern.png')] bg-repeat opacity-30"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center">
            <motion.div 
              className="md:w-1/2 mb-10 md:mb-0"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Empowering <span className="text-[#fe0000]">Likuyani</span> Communities
              </h1>
              <p className="text-xl mb-8">
                Building sustainable futures through leadership, agribusiness, and social development programs.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#b60808] hover:bg-[#fe0000] text-white px-8 py-3 rounded-full font-semibold shadow-lg transition-all"
                >
                  Join Our Programs
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white hover:bg-gray-100 text-[#03ac56] px-8 py-3 rounded-full font-semibold shadow-lg transition-all"
                >
                  Donate Now
                </motion.button>
              </div>
            </motion.div>
            
            <motion.div 
              className="md:w-1/2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-64 h-64 bg-[#fe0000] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
                <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-[#9ed462] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute top-20 -right-20 w-64 h-64 bg-[#03ac56] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
                
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                  <img 
                    src="/images/community-meeting.jpg" 
                    alt="Community meeting in Likuyani" 
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        
        <motion.div 
          className="absolute bottom-0 left-0 w-full h-16 bg-white"
          initial={{ height: 0 }}
          animate={{ height: 64 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <svg className="w-full h-full" viewBox="0 0 1440 100" preserveAspectRatio="none">
            <path 
              d="M0,100 C250,0 500,100 750,50 C1000,0 1250,100 1440,50 L1440,100 L0,100 Z" 
              fill="currentColor"
              className="text-white"
            ></path>
          </svg>
        </motion.div>
      </section>

      {/* About Snapshot *
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            ref={ref}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            initial="hidden"
            animate={mainControls}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              About <span className="text-[#03ac56]">Likuyani C.E.O</span>
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Likuyani Community Empowerment Organization (LCEO) is a grassroots nonprofit dedicated to sustainable community development in Kongoni Ward and surrounding areas. Founded in 2015, we work at the intersection of leadership, agriculture, and social justice.
            </p>
            <motion.a
              href="#"
              whileHover={{ x: 5 }}
              className="inline-flex items-center text-[#b60808] font-semibold"
            >
              Learn more about us <FiArrowRight className="ml-2" />
            </motion.a>
          </motion.div>
          
          {/* Stats *
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
                className="bg-gray-50 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="text-3xl font-bold text-[#fe0000] mb-2">{stat.value}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Section *
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Our <span className="text-[#03ac56]">Thematic Areas</span>
            </h2>
            <p className="text-lg text-gray-600">
              We focus on six key areas that address the most pressing needs in our community while promoting sustainable development.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="p-6">
                  <div className="w-16 h-16 mb-4 rounded-full bg-[#9ed462] bg-opacity-20 flex items-center justify-center text-[#03ac56]">
                    {program.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{program.title}</h3>
                  <p className="text-gray-600 mb-4">{program.description}</p>
                  <a href="#" className="text-[#b60808] font-medium inline-flex items-center">
                    Read more <FiArrowRight className="ml-2" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* News & Events *
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* News Section *
            <motion.div 
              className="lg:w-1/2"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800">Latest <span className="text-[#03ac56]">News</span></h2>
                <a href="#" className="text-[#b60808] font-medium">View All</a>
              </div>
              
              <div className="space-y-6">
                {news.map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-all"
                  >
                    <div className="flex items-center mb-3">
                      <span className="px-3 py-1 bg-[#9ed462] bg-opacity-20 text-[#03ac56] text-sm rounded-full">{item.category}</span>
                      <span className="ml-4 text-gray-500 text-sm">{item.date}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                    <p className="text-gray-600 mb-4">{item.excerpt}</p>
                    <a href="#" className="text-[#b60808] font-medium inline-flex items-center">
                      Read story <FiArrowRight className="ml-2" />
                    </a>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            {/* Events Section *
            <motion.div 
              className="lg:w-1/2"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800">Upcoming <span className="text-[#03ac56]">Events</span></h2>
                <a href="#" className="text-[#b60808] font-medium">View All</a>
              </div>
              
              <div className="bg-[#03ac56] bg-opacity-10 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-6">June 2025 Events</h3>
                
                <div className="space-y-6">
                  {events.map((event, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ x: 5 }}
                      className="flex items-start"
                    >
                      <div className="bg-white rounded-lg p-3 mr-4 text-center shadow-md min-w-[70px]">
                        <div className="text-[#b60808] font-bold text-lg">{event.date.split(' ')[1]}</div>
                        <div className="text-gray-600 text-sm">{event.date.split(' ')[0]}</div>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800">{event.title}</h4>
                        <div className="flex items-center text-gray-600 text-sm mt-1">
                          <FiCalendar className="mr-1" /> {event.time} • {event.location}
                        </div>
                        <a href="#" className="mt-2 inline-block text-sm text-[#03ac56] font-medium">
                          RSVP now
                        </a>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              {/* Newsletter *
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="mt-12 bg-gradient-to-r from-[#b60808] to-[#fe0000] rounded-xl p-6 text-white"
              >
                <h3 className="text-xl font-bold mb-3">Stay Updated</h3>
                <p className="mb-4 opacity-90">Subscribe to our newsletter for the latest news and updates.</p>
                <form className="flex">
                  <input 
                    type="email" 
                    placeholder="Your email address" 
                    className="flex-grow px-4 py-3 rounded-l-lg focus:outline-none text-gray-800"
                  />
                  <button 
                    type="submit" 
                    className="bg-[#03ac56] hover:bg-[#9ed462] px-6 py-3 rounded-r-lg font-medium transition-colors"
                  >
                    Subscribe
                  </button>
                </form>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action *
      <section className="py-16 bg-[#03ac56] bg-opacity-10">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden"
          >
            <div className="md:flex">
              <div className="md:w-1/2 bg-[#b60808] p-10 text-white flex flex-col justify-center">
                <h2 className="text-3xl font-bold mb-6">Ready to Make a Difference?</h2>
                <p className="mb-8 text-lg opacity-90">
                  Whether you want to volunteer, partner with us, or support our programs financially, your contribution helps transform lives in Likuyani.
                </p>
                <div className="space-y-4">
                  <motion.a
                    whileHover={{ x: 5 }}
                    href="#"
                    className="inline-flex items-center text-white font-semibold text-lg"
                  >
                    Volunteer opportunities <FiArrowRight className="ml-2" />
                  </motion.a>
                  <motion.a
                    whileHover={{ x: 5 }}
                    href="#"
                    className="inline-flex items-center text-white font-semibold text-lg"
                  >
                    Partnership information <FiArrowRight className="ml-2" />
                  </motion.a>
                  <motion.a
                    whileHover={{ x: 5 }}
                    href="#"
                    className="inline-flex items-center text-white font-semibold text-lg"
                  >
                    Donation options <FiArrowRight className="ml-2" />
                  </motion.a>
                </div>
              </div>
              
              <div className="md:w-1/2 p-10">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Contact Us Today</h3>
                <form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-gray-700 mb-2">Your Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#03ac56]"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-gray-700 mb-2">Email Address</label>
                    <input 
                      type="email" 
                      id="email" 
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#03ac56]"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-gray-700 mb-2">Your Message</label>
                    <textarea 
                      id="message" 
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#03ac56]"
                    ></textarea>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full bg-[#03ac56] hover:bg-[#9ed462] text-white py-3 rounded-lg font-semibold transition-colors"
                  >
                    Send Message
                  </motion.button>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Partners *
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our <span className="text-[#03ac56]">Partners</span></h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We collaborate with local and international organizations to maximize our impact in the community.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((item) => (
              <motion.div
                key={item}
                whileHover={{ scale: 1.05 }}
                className="bg-gray-50 rounded-xl p-6 flex items-center justify-center h-32"
              >
                <div className="text-2xl font-bold text-gray-400">Partner {item}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer *
      <footer className="bg-gray-900 text-white pt-16 pb-8">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            <div>
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-[#03ac56] flex items-center justify-center text-white font-bold text-xl">LCEO</div>
                <span className="ml-3 text-xl font-semibold">Likuyani C.E.O</span>
              </div>
              <p className="text-gray-400 mb-6">
                Empowering communities in Likuyani through sustainable development programs.
              </p>
              <div className="flex space-x-4">
                {['facebook', 'twitter', 'instagram', 'linkedin'].map((social) => (
                  <a key={social} href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#03ac56] transition-colors">
                    <span className="sr-only">{social}</span>
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
              <ul className="space-y-3">
                {['About Us', 'Our Programs', 'News & Blog', 'Events', 'Get Involved', 'Donate'].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-400 hover:text-[#9ed462] transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-6">Contact Info</h3>
              <address className="not-italic text-gray-400 space-y-3">
                <p className="flex items-center">
                  <FiMail className="mr-3 text-[#9ed462]" /> likuyanicommunityorganization@gmail.com
                </p>
                <p className="flex items-center">
                  <FiPhone className="mr-3 text-[#9ed462]" /> 0727 434 732
                </p>
                <p>Kongoni Ward, Likuyani Sub-County, Kenya</p>
              </address>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-6">Resources</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="flex items-center text-gray-400 hover:text-[#9ed462] transition-colors">
                    <FiDownload className="mr-3 text-[#9ed462]" /> Annual Reports
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center text-gray-400 hover:text-[#9ed462] transition-colors">
                    <FiDownload className="mr-3 text-[#9ed462]" /> Strategic Plans
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center text-gray-400 hover:text-[#9ed462] transition-colors">
                    <FiDownload className="mr-3 text-[#9ed462]" /> Policy Briefs
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Likuyani Community Empowerment Organization. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-500 hover:text-[#9ed462] text-sm transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-500 hover:text-[#9ed462] text-sm transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}*/

