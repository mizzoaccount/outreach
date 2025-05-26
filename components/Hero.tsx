"use client";
import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Eye,
  Instagram,
  ShoppingBag,
  Twitter,
} from "lucide-react";

const HeroSection = () => {
  const [hovered, setHovered] = useState(false);
  const [current, setCurrent] = useState(0);
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const constraintsRef = useRef(null);

  const images = [
    {
      url: "https://i.pinimg.com/474x/99/c2/1a/99c21a7b75dd0d5f8f1e17b3547531ea.jpg",
      shape: "rounded-[30%_70%_70%_30%_/_30%_30%_70%_70%]",
      size: "w-64 h-80 md:w-72 md:h-96",
      rotate: "-rotate-6",
      overlay: "bg-[#f4b500]/20",
    },
    {
      url: "https://i.pinimg.com/236x/e9/fa/bf/e9fabfce6ae935e36868c4ba6ca98d83.jpg",
      shape: "rounded-tl-[100px] rounded-br-[100px]",
      size: "w-72 h-64 md:w-80 md:h-72",
      rotate: "rotate-3",
      overlay: "bg-[#1a1a1a]/50",
    },
    {
      url: "https://i.pinimg.com/236x/36/e5/52/36e55270678f71bdb222eeeb8651ee23.jpg",
      shape: "rounded-full",
      size: "w-56 h-56 md:w-64 md:h-64",
      rotate: "rotate-0",
      overlay: "bg-[#ffffff]/20",
    },
    {
      url: "https://i.pinimg.com/236x/64/35/c2/6435c222aaa4c8286b99cee765bbcbbd.jpg",
      shape: "rounded-[40px]",
      size: "w-60 h-72 md:w-68 md:h-80",
      rotate: "rotate-2",
      overlay: "bg-[#0a0a0a]/60",
    },
    {
      url: "https://i.pinimg.com/236x/56/2b/0e/562b0edbf09f5ddbd502f3790706bc93.jpg",
      shape: "rounded-tr-[150px] rounded-bl-[150px]",
      size: "w-80 h-60 md:w-96 md:h-72",
      rotate: "-rotate-3",
      overlay: "bg-[#f4b500]/10",
    },
  ];

  useEffect(() => {
    const controls = animate(count, 100, {
      duration: 30,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "linear",
    });
    return controls.stop;
  }, []);

  const nextSlide = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white min-h-screen">
  
      
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
      </div>
  );
};

export default HeroSection;
