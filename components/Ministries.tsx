"use client"
import { motion } from 'framer-motion';
import SectionTitle from '../ui/SectionTitle';
import Button from '../ui/Button';

const Ministries = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <SectionTitle 
          title="Our Ministries" 
          subtitle="Reaching Through Different Avenues" 
          center
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Thompson Bible Workshop */}
          <motion.div
            id="thompson"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl overflow-hidden shadow-lg"
          >
            <div className="p-8">
              <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Thompson Bible Workshop</h3>
              <p className="text-gray-600 mb-6">
                Equipping leaders with powerful Bible study tools and resources to effectively teach God's Word 
                in their communities. Our workshops provide practical training in biblical interpretation and 
                application.
              </p>
              <Button 
                href="https://aptministries.org/" 
                variant="outline" 
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit Workshop
              </Button>
            </div>
          </motion.div>
          
          {/* Kahawa Media */}
          <motion.div
            id="kahawa"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl overflow-hidden shadow-lg"
          >
            <div className="p-8">
              <div className="w-16 h-16 bg-blue-700 rounded-lg flex items-center justify-center mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Kahawa Media Ministries</h3>
              <p className="text-gray-600 mb-6">
                Creative Christian storytelling through film, audio, and digital media. We produce content that 
                communicates biblical truth in culturally relevant ways to reach the digital generation with 
                the Gospel.
              </p>
              <Button 
                href="https://kahawamedia.com/" 
                variant="outline" 
                target="_blank"
                rel="noopener noreferrer"
              >
                Explore Kahawa Media
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Ministries;