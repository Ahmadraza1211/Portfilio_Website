import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef, useState } from 'react';
import ProjectCard from './ProjectCard';

const Projects = () => {
  const scrollRef = useRef(null);
  const [showAll, setShowAll] = useState(false);

  const projects = [
    {
      title: "ML Model Training",
      category: "Data Science",
      desc: "Analyze the Algeria forest fire dataset by performing EDA and training a predictive model using regression techniques.",
      image: "/images/projects/ML.jpg",
      github: "https://github.com/Ahmadraza1211/Algeria_Forest_Analysis",
      preview: "https://medium.com/@ahmadraza2607/algeria-forest-fires-analysis-01b367f382c6"
    },
    {
      title: "Dictionary Search",
      category: "C++ / DSA",
      desc: "Dictionary Search Project using C++ based upon Data Structure Algorithms and File Handling.",
      image: "/images/projects/ds.jpg",
      github: "https://github.com/Ahmadraza1211/Dictionary_Search",
      preview: "https://medium.com/@ahmadraza2607/airline-management-system-6c8a918e7ab4"
    },
    {
      title: "Gear Glide Rally",
      category: "Game Dev",
      desc: "A basic car racing game where the objective is to navigate through obstacles and hurdles.",
      image: "/images/projects/p5.jpg",
      github: "https://github.com/Ahmadraza1211/Dictionary_Search",
      preview: "https://medium.com/@ahmadraza2607/gear-glide-rally-b9ba94ba88d8"
    },
    {
      title: "Desi Dhool Drum Kit",
      category: "Front-End",
      desc: "A simple HTML/CSS/JS project focusing on JS EventListeners. Inspired by Dr. Angela Yu.",
      image: "/images/projects/Drum.jpg",
      github: "https://github.com",
      preview: "https://medium.com/@ahmadraza2607/desi-dhool-drum-kit-2a798092066a"
    },
    {
      title: "Portfolio v1.0",
      category: "Front-End",
      desc: "A responsive portfolio website showcasing my projects, skills, and experience, built with HTML/CSS/JS.",
      image: "/images/projects/p2.jpg",
      github: "https://github.com",
      preview: "https://medium.com/@ahmadraza2607/portfolio-website-1dc0e31712b7"
    },
    {
      title: "Full-Stack Web App",
      category: "React & Node.js",
      desc: "An end-to-end web application featuring user authentication, real-time database syncing, and a modern dashboard.",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800",
      github: "#",
      preview: "#"
    },
    {
      title: "Data Visualization Dashboard",
      category: "Data Analyst",
      desc: "An interactive dashboard visualizing complex datasets using Python, Pandas, and Plotly for actionable business insights.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
      github: "#",
      preview: "#"
    },
    {
      title: "AI Chatbot Assistant",
      category: "AI & ML",
      desc: "A conversational AI assistant utilizing natural language processing models to help users navigate support documentation.",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
      github: "#",
      preview: "#"
    }
  ];

  // Duplicate for seamless infinite scroll
  const displayProjects = [...projects, ...projects];

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
    <section id="projects" className="min-h-screen py-20 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 flex flex-col items-center">
          <div className="relative inline-flex items-center justify-center p-[2px] mb-4 overflow-hidden rounded-xl">
            <div className="absolute w-[200%] h-[500%] bg-[conic-gradient(#C5A880_0deg,transparent_60deg,transparent_360deg)] animate-[spin_8s_linear_infinite]" />
            <h2 className="relative text-4xl font-bold bg-dark-navy px-8 py-3 rounded-xl text-center z-10">Featured <span className="gold-accent-text">Projects</span></h2>
          </div>
          <p className="text-silver/60 max-w-2xl mx-auto mb-8">A selection of my best work across Front-end, Python, and Data Science.</p>
          
          <div className="flex items-center justify-center gap-4">
            <button
              onMouseEnter={() => setShowAll(true)}
              onMouseLeave={() => setShowAll(false)}
              className="flex items-center gap-2 px-5 py-2 bg-dark-purple/60 border border-gold/30 text-gold rounded-full hover:bg-gold/10 transition-colors shadow-[0_0_15px_rgba(197,168,128,0.2)]"
            >
              <span className="text-sm font-semibold">See All</span>
            </button>
          </div>
        </div>

        <div className="relative min-h-[400px]">
          <AnimatePresence mode="wait">
            {showAll ? (
              <motion.div
                key="grid"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-8"
                onMouseEnter={() => setShowAll(true)}
                onMouseLeave={() => setShowAll(false)}
              >
                {projects.map((project, idx) => (
                  <ProjectCard key={idx} project={project} className="h-full" />
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
                  {displayProjects.map((project, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: (idx % 4) * 0.1 }}
                      className="min-w-full md:min-w-[calc(50%-12px)] lg:min-w-[calc(50%-12px)] w-full md:w-[calc(50%-12px)] lg:w-[calc(50%-12px)] snap-center shrink-0 flex"
                    >
                      <ProjectCard project={project} className="w-full h-full" />
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

export default Projects;
