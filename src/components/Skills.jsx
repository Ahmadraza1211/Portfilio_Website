import { motion } from 'framer-motion';
import { 
  FaHtml5, FaCss3Alt, FaBootstrap, FaJsSquare, FaReact, 
  FaPython, FaNodeJs, FaDatabase, FaBrain, FaLink
} from 'react-icons/fa';
import { 
  SiPytorch, SiTensorflow, SiNumpy, SiPandas, SiExpress, 
  SiLangchain
} from 'react-icons/si';
import { Server, Cpu, Rocket } from 'lucide-react';

const Skills = () => {
  const skillCategories = [
    {
      title: "Front-End Development",
      icon: "🌐",
      skills: [
        { name: "HTML", icon: FaHtml5, color: "#E34F26" },
        { name: "CSS", icon: FaCss3Alt, color: "#1572B6" },
        { name: "BootStrap", icon: FaBootstrap, color: "#7952B3" },
        { name: "JavaScript", icon: FaJsSquare, color: "#F7DF1E" },
        { name: "React", icon: FaReact, color: "#61DAFB" },
      ]
    },
    {
      title: "Python Development",
      icon: "🐍",
      skills: [
        { name: "Python", icon: FaPython, color: "#3776AB" },
        { name: "PyTorch", icon: SiPytorch, color: "#EE4C2C" },
        { name: "TensorFlow", icon: SiTensorflow, color: "#FF6F00" },
        { name: "NumPy", icon: SiNumpy, color: "#013243" },
        { name: "Pandas", icon: SiPandas, color: "#150458" },
      ]
    },
    {
      title: "Backend / Database",
      icon: "⚙️",
      skills: [
        { name: "Node.js", icon: FaNodeJs, color: "#339933" },
        { name: "Express.js", icon: SiExpress, color: "#FFFFFF" },
        { name: "REST API", icon: FaLink, color: "#C5A880" },
        { name: "MongoDB", icon: FaDatabase, color: "#47A248" },
      ]
    },
    {
      title: "AI Engineering",
      icon: "🤖",
      skills: [
        { name: "RAG Pipeline", icon: Cpu, color: "#C5A880" },
        { name: "LangChain", icon: SiLangchain, color: "#1C3C3C" },
        { name: "Model Deploy", icon: Rocket, color: "#FF6F61" },
        { name: "Deep Learning", icon: FaBrain, color: "#A855F7" },
      ]
    }
  ];

  return (
    <section id="skills" className="min-h-screen py-20 px-6 flex items-center justify-center">
      <div className="max-w-6xl w-full">
        <div className="text-center mb-16 flex flex-col items-center">
          <div className="relative inline-flex items-center justify-center p-[2px] mb-4 overflow-hidden rounded-xl">
            <div className="absolute w-[200%] h-[500%] bg-[conic-gradient(#C5A880_0deg,transparent_60deg,transparent_360deg)] animate-[spin_8s_linear_infinite]" />
            <h2 className="relative text-4xl font-bold bg-dark-navy px-8 py-3 rounded-xl text-center z-10">Technical <span className="gold-accent-text">Arsenal</span></h2>
          </div>
          <p className="text-silver/60">A comprehensive overview of my technical proficiencies and ongoing learning journey.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((category, catIdx) => (
            <motion.div 
              key={catIdx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: catIdx * 0.1 }}
              className="glass-card p-8 border-t-2 border-t-gold/30"
            >
              <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                <span className="text-2xl">{category.icon}</span>
                {category.title}
              </h3>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {category.skills.map((skill, skillIdx) => {
                  const IconComp = skill.icon;
                  return (
                    <motion.div
                      key={skillIdx}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.1 + skillIdx * 0.07 }}
                      whileHover={{ y: -6, scale: 1.05 }}
                      className="flex flex-col items-center gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:border-gold/30 hover:bg-white/[0.06] transition-colors cursor-default group"
                    >
                      <div 
                        className="p-3 rounded-xl bg-dark-navy/80 group-hover:shadow-[0_0_20px_rgba(197,168,128,0.3)] transition-shadow"
                      >
                        <IconComp size={28} style={{ color: skill.color }} />
                      </div>
                      <span className="text-sm font-medium text-silver/80 group-hover:text-white transition-colors text-center">
                        {skill.name}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
