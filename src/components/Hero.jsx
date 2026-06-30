import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { FaLinkedin, FaGithub } from 'react-icons/fa';

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-6 pt-20 pb-10">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Content */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col space-y-6"
        >
          <div className="inline-block px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm w-max">
            <span className="gold-accent-text text-sm font-semibold tracking-wider uppercase">Welcome to my universe</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Hi, I'm <br />
            <span className="neon-text">Ahmad Raza</span>
          </h1>
          
          <h2 className="text-xl md:text-2xl text-silver/80 font-medium h-8">
            Web Developer & AI Engineer
          </h2>
          
          <p className="text-silver/60 max-w-lg leading-relaxed text-lg">
           A Computer Scince student and a AI Engineer specializing in MERN Stack, AI Engineer and Data Science.I work on real world Project during my internship at <strong style={{ color: '#e0c568' }}>Nexium</strong> and <strong style={{ color: '#e0c568' }}>Serve IT Pro</strong>.
          </p>

          <div className="flex gap-4 pt-4">
            <a href="https://www.linkedin.com/in/ahmad-raza-3938382a7/" target="_blank" rel="noreferrer" className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-gold/20 hover:border-gold/50 transition-all text-white">
              <FaLinkedin size={24} />
            </a>
            <a href="https://github.com/Ahmadraza1211" target="_blank" rel="noreferrer" className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-gold/20 hover:border-gold/50 transition-all text-white">
              <FaGithub size={24} />
            </a>
            <a href="mailto:ahmadraza2607@gmail.com" className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-gold/20 hover:border-gold/50 transition-all text-white">
              <Mail size={24} />
            </a>
          </div>
        </motion.div>

        {/* Right Content - Hero Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative flex justify-center"
        >
          <div className="relative w-72 h-72 md:w-96 md:h-96">
            {/* Glowing orb behind */}
            <div className="absolute inset-0 bg-gold/20 blur-[60px] rounded-full"></div>
            
            {/* Main image container */}
            <div className="glass-card w-full h-full rounded-full p-2 border-gold/30 flex items-center justify-center overflow-hidden z-10">
              <img 
                src="/images/hero/Ahmad_Img.png" 
                alt="Ahmad Raza" 
                className="w-full h-full object-cover rounded-full opacity-90 hover:opacity-100 hover:scale-105 transition-all duration-500"
              />
            </div>

            {/* Floating badges */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="absolute -top-4 -right-4 glass-card px-4 py-2 rounded-xl border border-white/10 flex items-center gap-2 z-20"
            >
              <span className="text-xl">🌐</span>
              <span className="text-sm font-semibold text-silver">MERN Stack</span>
            </motion.div>

            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -bottom-4 -left-4 glass-card px-4 py-2 rounded-xl border border-white/10 flex items-center gap-2 z-20"
            >
              <span className="text-xl">🤖</span>
              <span className="text-sm font-semibold text-silver">AI Engineer</span>
            </motion.div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
