import { Award, FileText } from 'lucide-react';

const CertificateCard = ({ cert, className = "" }) => {
  const href = cert.isPdf ? encodeURI(cert.link) : cert.link;

  return (
    <div className={`glass-card group hover:border-silver/40 transition-colors ${className}`}>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="block p-6 h-full flex flex-col"
      >
        <div className="flex justify-between items-start mb-6">
          <div className="p-3 bg-silver/5 rounded-xl text-silver group-hover:scale-110 group-hover:bg-silver/20 transition-all">
            {cert.isPdf ? <FileText size={32} /> : <Award size={32} />}
          </div>
          <span className="text-xs font-semibold text-silver/50 uppercase tracking-wider">{cert.date}</span>
        </div>

        <h3 className="text-xl font-bold text-white mb-2">{cert.title}</h3>
        <p className="text-silver/70 text-sm flex-grow">{cert.desc}</p>

        <div className="mt-6 pt-4 border-t border-silver/10 text-silver text-sm font-semibold flex items-center gap-2 group-hover:translate-x-2 transition-transform">
          {cert.isPdf ? 'Open Certificate' : 'View Credential'} <span aria-hidden="true">&rarr;</span>
        </div>
      </a>
    </div>
  );
};

export default CertificateCard;
