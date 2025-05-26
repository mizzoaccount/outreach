/*"use client";
import { motion } from "framer-motion";
import SectionTitle from "../ui/SectionTitle";
import Card from "../ui/Card";
import { useEffect, useState } from "react";

type Perspective = {
  id: number;
  title: string;
  excerpt: string;
  icon: string;
};

const Perspectives = () => {
  const [perspectives, setPerspectives] = useState<Perspective[]>([]);

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/devotions");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Received data:", data);

      // Make sure to set only the array to state
      setPerspectives(data.devotions);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  fetchData();
}, []);



  return (
    <section id="perspectives" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <SectionTitle 
          title="Fresh Reflections" 
          subtitle="Devotionals & Perspectives" 
          center
        />
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {perspectives.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card>
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-gray-600 mb-4">{item.excerpt}</p>
                <a 
                  href="#" 
                  className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center"
                >
                  Read More
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </a>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Perspectives;*/

"use client";
import { motion } from "framer-motion";
import SectionTitle from "../ui/SectionTitle";
import { useEffect, useState } from "react";
import { BookOpen, Calendar, Cross, Hash } from "lucide-react";
import Modal from "../ui/Modal";

type Devotion = {
  _id: string;
  title: string;
  theme: string;
  week: string;
  dayNumber: number;
  date: string;
  mainScripture: string;
  focusScripture: string;
  focusReference: string;
  reflection: string;
  actionPoint: string;
  prayer: string;
  createdAt: string;
  updatedAt: string;
};

const Perspectives = () => {
  const [devotions, setDevotions] = useState<Devotion[]>([]);
  const [selectedDevotion, setSelectedDevotion] = useState<Devotion | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/devotions");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setDevotions(data.devotions);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const openModal = (devotion: Devotion) => {
    setSelectedDevotion(devotion);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDevotion(null);
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <section id="perspectives" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <SectionTitle 
          title="Fresh Reflections" 
          subtitle="Devotionals & Perspectives" 
          center
        />
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {devotions.map((devotion, index) => (
            <motion.div
              key={devotion._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
                <div className="p-6 flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <BookOpen className="text-blue-600 h-5 w-5" />
                    </div>
                    <span className="text-sm font-medium text-blue-600">
                      {devotion.theme}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
                    {devotion.title}
                  </h3>
                  
                  <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(devotion.date)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Hash className="h-4 w-4" />
                      <span>Day {devotion.dayNumber}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {devotion.reflection}
                  </p>
                  
                  <div className="mt-auto">
                    <button
                      onClick={() => openModal(devotion)}
                      className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center group"
                    >
                      Read More
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Modal for full devotion */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {selectedDevotion && (
          <div className="max-h-[80vh] overflow-y-auto p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {selectedDevotion.title}
                </h2>
                <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(selectedDevotion.date)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Hash className="h-4 w-4" />
                    <span>Day {selectedDevotion.dayNumber}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600"
              >
                <Cross className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-700 mb-2">Main Scripture</h3>
                <p className="text-gray-800 italic">{selectedDevotion.mainScripture}</p>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-700 mb-2">Focus Scripture</h3>
                <p className="text-gray-800 italic">{selectedDevotion.focusScripture}</p>
                <p className="text-gray-600 mt-1">{selectedDevotion.focusReference}</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Reflection</h3>
                <div className="prose prose-sm text-gray-700">
                  {selectedDevotion.reflection.split('\n').map((paragraph, i) => (
                    <p key={i} className="mb-4">{paragraph}</p>
                  ))}
                </div>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg">
                <h3 className="font-semibold text-yellow-700 mb-2">Action Point</h3>
                <p className="text-gray-800">{selectedDevotion.actionPoint}</p>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-700 mb-2">Prayer</h3>
                <p className="text-gray-800 italic">{selectedDevotion.prayer}</p>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
};

export default Perspectives;