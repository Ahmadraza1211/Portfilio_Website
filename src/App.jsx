import { useState, useEffect } from 'react';
import { Home, User, Lightbulb, FolderOpen, Award, Mail } from 'lucide-react';
import { FaGithub, FaLinkedin, FaMedium } from 'react-icons/fa';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Certificates from './components/Certificates';
import Contact from './components/Contact';

function App() {
  const [activeSection, setActiveSection] = useState('home');

  // Intersection Observer for updating active section
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, { threshold: 0.3 });

    document.querySelectorAll('section[id]').forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'about', icon: User, label: 'About' },
    { id: 'skills', icon: Lightbulb, label: 'Skills' },
    { id: 'projects', icon: FolderOpen, label: 'Projects' },
    { id: 'certificates', icon: Award, label: 'Certifications' },
    { id: 'contact', icon: Mail, label: 'Contact' },
  ];

  return (
    <div className="min-h-screen relative selection:bg-gold/30 selection:text-white">
      {/* Background gradients */}
      <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-dark-purple/80 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#35254A]/40 blur-[120px]"></div>
      </div>

      {/* Left Sidebar - Socials */}
      <div className="hidden xl:flex flex-col items-center fixed left-8 z-40 gap-6 animate-scroll-down">
        <a href="https://github.com/Ahmadraza1211" target="_blank" rel="noreferrer" className="text-silver/50 hover:text-gold hover:-translate-y-1 transition-all">
          <FaGithub size={22} />
        </a>
        <a href="https://www.linkedin.com/in/ahmad-raza-3938382a7" target="_blank" rel="noreferrer" className="text-silver/50 hover:text-gold hover:-translate-y-1 transition-all">
          <FaLinkedin size={22} />
        </a>
        <a href="https://medium.com/@ahmadraza2607" target="_blank" rel="noreferrer" className="text-silver/50 hover:text-gold hover:-translate-y-1 transition-all">
          <FaMedium size={22} />
        </a>
      </div>

      {/* Right Sidebar - Email */}
      <div className="hidden xl:flex flex-col items-center fixed right-8 z-40 gap-6 animate-scroll-down" style={{ animationDelay: '12s' }}>
        <a href="mailto:ahmadraza2607@gmail.com" className="text-silver/50 hover:text-gold hover:-translate-y-1 transition-all" style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}>
          <span className="font-mono text-sm tracking-widest">ahmadraza2607@gmail.com</span>
        </a>
      </div>

      <main className="pb-24">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Certificates />
        <Contact />
      </main>

      {/* Floating Dock Navigation */}
      <nav className="floating-dock">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollTo(item.id)}
            className={`dock-item ${activeSection === item.id ? 'active' : ''}`}
            aria-label={item.label}
          >
            <item.icon size={20} />
            <span className="dock-tooltip">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}

export default App;
