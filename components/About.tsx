"use client"

import { motion } from 'framer-motion';
import Image from 'next/image';
//import SectionTitle from '../ui/SectionTitle';

const About = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/*<SectionTitle title="Who We Are" subtitle="Our Mission & Vision" />*/}
        
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:w-1/2"
          >
            <div className="relative rounded-xl overflow-hidden shadow-2xl">
              <Image
                src="/images/about.jpg"
                alt="Lighthouse Outreaches Ministry"
                width={600}
                height={400}
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent"></div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:w-1/2"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              Sharing the Light of Christ
            </h3>
            <p className="text-gray-600 mb-6">
              Lighthouse Outreaches is a faith-based ministry dedicated to spreading the Gospel and making disciples 
              in underserved communities. Founded on the principles of love, faith, and service, we reach out to 
              those who have not yet heard the Good News of Jesus Christ.
            </p>
            
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg mb-6">
              <p className="text-blue-800 font-medium italic">
                "To share the Gospel, build believers, and reach the unreached."
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-100 p-4 rounded-lg">
                <h4 className="font-bold text-blue-800 mb-2">Our Vision</h4>
                <p className="text-blue-700 text-sm">
                  A world where every person has the opportunity to hear and respond to the Gospel.
                </p>
              </div>
              <div className="bg-blue-100 p-4 rounded-lg">
                <h4 className="font-bold text-blue-800 mb-2">Our Approach</h4>
                <p className="text-blue-700 text-sm">
                  Combining evangelism, discipleship, and practical help to transform communities.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;