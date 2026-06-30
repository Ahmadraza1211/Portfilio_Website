import { ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

const ProjectCard = ({ project, className = "" }) => {
  return (
    <div className={`glass-card group flex flex-col ${className}`}>
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-dark-navy/50 group-hover:bg-transparent transition-all z-10"></div>
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-4 right-4 z-20">
          <span className="px-3 py-1 text-xs font-semibold bg-dark-navy/80 backdrop-blur-md text-gold rounded-full border border-gold/30">
            {project.category}
          </span>
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-gold transition-colors">{project.title}</h3>
        <p className="text-silver/60 text-sm mb-6 flex-grow">{project.desc}</p>
        
        <div className="flex items-center gap-4 pt-4 border-t border-white/10">
          <a 
            href={project.github} 
            target="_blank" 
            rel="noreferrer"
            className="flex items-center gap-2 text-sm text-silver hover:text-white transition-colors"
          >
            <FaGithub size={16} /> Code
          </a>
          <a 
            href={project.preview} 
            target="_blank" 
            rel="noreferrer"
            className="flex items-center gap-2 text-sm text-silver hover:text-white transition-colors ml-auto"
          >
            <ExternalLink size={16} /> View
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
