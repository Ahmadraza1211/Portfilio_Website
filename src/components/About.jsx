import { motion, AnimatePresence } from 'framer-motion';
import { Code, Rocket, Users, Laptop, Brain, GraduationCap, Building, BookOpen, ZoomIn, X, ZoomOut } from 'lucide-react';
import cvImage from '../../legacy/images/Ahmad_CV_1_page-0001.jpg';
import { useState, useRef, useCallback } from 'react';

/* ── Lightbox component ─────────────────────────────────────────── */
const CVLightbox = ({ onClose }) => {
  const [scale, setScale] = useState(1);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const dragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const posRef = useRef({ x: 0, y: 0 });

  const handleWheel = useCallback((e) => {
    e.preventDefault();
    setScale(prev => Math.min(5, Math.max(1, prev - e.deltaY * 0.002)));
  }, []);

  const handleMouseDown = (e) => {
    dragging.current = true;
    dragStart.current = { x: e.clientX - posRef.current.x, y: e.clientY - posRef.current.y };
  };

  const handleMouseMove = (e) => {
    if (!dragging.current) return;
    const newPos = { x: e.clientX - dragStart.current.x, y: e.clientY - dragStart.current.y };
    posRef.current = newPos;
    setPos(newPos);
  };

  const handleMouseUp = () => { dragging.current = false; };

  const zoomIn  = () => setScale(prev => Math.min(5, prev + 0.5));
  const zoomOut = () => { setScale(prev => { const n = Math.max(1, prev - 0.5); if (n === 1) setPos({ x: 0, y: 0 }); return n; }); };
  const reset   = () => { setScale(1); setPos({ x: 0, y: 0 }); posRef.current = { x: 0, y: 0 }; };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm"
      onWheel={handleWheel}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 py-4 z-10">
        <span className="text-silver/60 text-sm select-none">
          Scroll to zoom · Drag to pan
        </span>
        <div className="flex items-center gap-3">
          {/* Zoom controls */}
          <button
            onClick={zoomOut}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            title="Zoom out"
          >
            <ZoomOut size={20} />
          </button>
          <span className="text-white text-sm w-12 text-center select-none">{Math.round(scale * 100)}%</span>
          <button
            onClick={zoomIn}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            title="Zoom in"
          >
            <ZoomIn size={20} />
          </button>
          <button
            onClick={reset}
            className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs transition-colors"
          >
            Reset
          </button>
          {/* Close */}
          <button
            onClick={onClose}
            className="ml-2 p-2 rounded-full bg-red-500/80 hover:bg-red-500 text-white transition-colors shadow-[0_0_15px_rgba(239,68,68,0.4)]"
            title="Close"
          >
            <X size={22} />
          </button>
        </div>
      </div>

      {/* Image */}
      <div
        className="overflow-hidden w-full h-full flex items-center justify-center"
        style={{ cursor: scale > 1 ? 'grab' : 'zoom-in' }}
        onMouseDown={handleMouseDown}
      >
        <img
          src={cvImage}
          alt="Resume Full View"
          draggable={false}
          style={{
            transform: `translate(${pos.x}px, ${pos.y}px) scale(${scale})`,
            transformOrigin: 'center center',
            transition: dragging.current ? 'none' : 'transform 0.15s ease',
            maxHeight: '90vh',
            maxWidth: '90vw',
            userSelect: 'none',
            pointerEvents: 'none',
          }}
        />
      </div>
    </motion.div>
  );
};

/* ── Main About component ───────────────────────────────────────── */
const About = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const points = [
    { icon: Rocket, title: 'MERN Stack',     desc: 'Building responsive & impactful web Applications.' },
    { icon: Code,   title: 'Strong  Foundation',  desc: 'Expertise in C++, C, DS & Algo and Python.' },
    { icon: Laptop, title: 'AI Engineering',      desc: 'Make Machine Learning and Deep Learning models.' },
    { icon: Brain,  title: 'Data Scientist',    desc: 'Works on Different types of ML Models.' },
    { icon: Users, title: 'Other Skills',     desc: 'DataBase, RestAPI , VMware , Information Security.' },
  ];

  const education = [
    { icon: Building,     title: 'University', desc: 'FAST National University (NUCES)' },
    { icon: BookOpen,     title: 'Department', desc: 'Computer Science' },
    { icon: GraduationCap, title: 'Timeline',   desc: 'August 2022 - June 2026' },
  ];

  const stats = [
    { value: '4',   label: 'Years CS Experience' },
    { value: 'CGPA',  label: '3.08/4.00' },
    { value: '100%', label: 'Commitment' },
  ];

  return (
    <>
      {/* ── Lightbox portal ── */}
      <AnimatePresence>
        {lightboxOpen && <CVLightbox onClose={() => setLightboxOpen(false)} />}
      </AnimatePresence>

      <section id="about" className="min-h-screen py-20 px-6 flex items-center justify-center relative">
        <div className="max-w-6xl w-full">

          {/* Heading */}
          <div className="text-center mb-16 flex flex-col items-center">
            <div className="relative inline-flex items-center justify-center p-[2px] mb-4 overflow-hidden rounded-xl">
              <div className="absolute w-[200%] h-[500%] bg-[conic-gradient(#C5A880_0deg,transparent_60deg,transparent_360deg)] animate-[spin_8s_linear_infinite]" />
              <h2 className="relative text-4xl font-bold bg-dark-navy px-8 py-3 rounded-xl text-center z-10">
                Why <span className="gold-accent-text">Choose Me?</span>
              </h2>
            </div>
            <p className="text-silver/60 max-w-2xl mx-auto">
              I combine academic rigor from FAST NUCES CFD with hands-on experience in
              development, analytics, and data science to build robust, scalable solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">
            {/* Left – Education */}
            <div className="lg:col-span-7 space-y-4">
              <h3 className="text-2xl font-bold mb-6">Education &amp; Background</h3>
              {education.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="glass-card p-6 flex items-start gap-4 hover:-translate-y-1 transition-transform"
                >
                  <div className="p-3 rounded-xl bg-gold/10 text-gold border border-gold/20">
                    <item.icon size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-1">{item.title}</h3>
                    <p className="text-silver/70">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Right – CV Viewer */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glass-card p-6 flex-grow flex flex-col h-full min-h-[500px]"
              >
                <h3 className="text-2xl font-bold mb-6 text-center">
                  My <span className="gold-accent-text">Resume</span>
                </h3>

                {/* CV thumbnail — click opens lightbox */}
                <div
                  onClick={() => setLightboxOpen(true)}
                  className="group relative w-full flex-grow bg-dark-navy/50 rounded-lg overflow-hidden border border-gold/20 hover:border-gold/60 transition-colors flex items-center justify-center cursor-zoom-in"
                >
                  <img
                    src={cvImage}
                    alt="Resume Preview"
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500 select-none"
                    draggable={false}
                  />
                  {/* Overlay hint */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 bg-black/40 pointer-events-none">
                    <div className="p-4 bg-dark-navy/80 rounded-full text-gold shadow-[0_0_20px_rgba(197,168,128,0.6)] mb-3">
                      <ZoomIn size={40} />
                    </div>
                    <span className="text-white text-sm font-semibold tracking-wide">Click to View Full Size</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Core Competencies */}
          <div className="mb-16 flex flex-col items-center">
            <h3 className="text-2xl font-bold mb-8 text-center">
              My <span className="gold-accent-text">Core Competencies</span>
            </h3>
            <div className="grid w-full grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {points.map((point, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="glass-card p-5 text-center flex flex-col items-center hover:-translate-y-2 transition-transform"
                >
                  <div className="p-3 rounded-full bg-gold/10 text-gold mb-4">
                    <point.icon size={24} />
                  </div>
                  <h4 className="font-semibold text-white mb-2 text-sm">{point.title}</h4>
                  <p className="text-silver/60 text-xs">{point.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + idx * 0.1 }}
                className="glass-card p-6 text-center border-gold/20 flex flex-col justify-center items-center hover:border-gold/50 transition-colors"
              >
                <span className="text-4xl font-bold text-white mb-2 block">{stat.value}</span>
                <span className="text-sm text-silver/60 uppercase tracking-wider">{stat.label}</span>
              </motion.div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
};

export default About;
