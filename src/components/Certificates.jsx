import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef, useState } from 'react';
import CertificateCard from './CertificateCard';

const Certificates = () => {
  const scrollRef = useRef(null);
  const [showAll, setShowAll] = useState(false);

  const certs = [
    {
      title: "Web Development (Google)",
      desc: "Prepare Data for Exploration",
      date: "July 2024",
      link: "/certificates/Coursea1.pdf",
      isPdf: true
    },
    {
      title: "Data Cleaning (Google)",
      desc: "Process Data from Dirty to Clean",
      date: "April 2024",
      link: "/certificates/coursea4.pdf",
      isPdf: true
    },
    {
      title: "Data Decisions (Google)",
      desc: "Ask Questions to Make Data-Driven Decisions",
      date: "July 2024",
      link: "/certificates/Coursera 5VPQVYNWQHYP.pdf",
      isPdf: true
    },
    {
      title: "Data Processing (Google)",
      desc: "Foundations: Data, Data, Everywhere",
      date: "July 2024",
      link: "/certificates/Coursera3.pdf",
      isPdf: true
    },
    {
      title: "Data Science (Working)",
      desc: "Complete Data Science, Machine Learning Bootcamp",
      date: "In Progress",
      link: "https://www.udemy.com/course/complete-machine-learning-nlp-bootcamp-mlops-deployment/?couponCode=LETSLEARNNOW",
      isPdf: false
    }
  ];

  // Duplicate for seamless scroll
  const displayCerts = [...certs, ...certs, ...certs];

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -350, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 350, behavior: 'smooth' });
    }
  };

  return (
    <section id="certificates" className="min-h-screen py-20 px-6 flex items-center justify-center relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute left-0 top-1/4 w-64 h-64 bg-gold/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl w-full">
        <div className="text-center mb-16 flex flex-col items-center">
          <div className="relative inline-flex items-center justify-center p-[2px] mb-4 overflow-hidden rounded-xl">
            <div className="absolute w-[200%] h-[500%] bg-[conic-gradient(#C5A880_0deg,transparent_60deg,transparent_360deg)] animate-[spin_8s_linear_infinite]" />
            <h2 className="relative text-4xl font-bold bg-dark-navy px-8 py-3 rounded-xl text-center z-10">My <span className="gold-accent-text">Certifications</span></h2>
          </div>
          <p className="text-silver/60 mb-8">Continuous learning and professional development.</p>

          <div className="flex items-center justify-center gap-4">
            <button
              onMouseEnter={() => setShowAll(true)}
              onMouseLeave={() => setShowAll(false)}
              className="flex items-center gap-2 px-5 py-2 bg-dark-purple/60 border border-silver/30 text-silver rounded-full hover:bg-silver/10 transition-colors shadow-[0_0_15px_rgba(224,224,224,0.1)]"
            >
              <span className="text-sm font-semibold">See All</span>
            </button>
          </div>
        </div>

        <div className="relative min-h-[300px]">
          <AnimatePresence mode="wait">
            {showAll ? (
              <motion.div
                key="grid"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-8"
                onMouseEnter={() => setShowAll(true)}
                onMouseLeave={() => setShowAll(false)}
              >
                {certs.map((cert, idx) => (
                  <CertificateCard key={idx} cert={cert} className="h-full" />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="carousel"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                {/* Navigation Buttons */}
                <button 
                  onClick={scrollLeft}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-12 z-20 p-3 bg-dark-navy/90 border border-white/10 text-white rounded-full hover:text-gold hover:border-gold/50 transition-colors shadow-lg hidden md:block"
                >
                  <ChevronLeft size={24} />
                </button>

                {/* Scroll Container */}
                <div 
                  ref={scrollRef}
                  className="flex items-stretch overflow-x-auto gap-6 pb-8 snap-x snap-mandatory hide-scrollbar"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  {displayCerts.map((cert, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: (idx % 3) * 0.1 }}
                      className="min-w-full md:min-w-[calc(50%-12px)] lg:min-w-[calc(33.333%-16px)] w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] snap-center shrink-0 flex"
                    >
                      <CertificateCard cert={cert} className="w-full h-full" />
                    </motion.div>
                  ))}
                </div>

                <button 
                  onClick={scrollRight}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-12 z-20 p-3 bg-dark-navy/90 border border-white/10 text-white rounded-full hover:text-gold hover:border-gold/50 transition-colors shadow-lg hidden md:block"
                >
                  <ChevronRight size={24} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Certificates;
