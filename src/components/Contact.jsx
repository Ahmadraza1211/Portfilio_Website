import { motion } from 'framer-motion';
import { MapPin, Mail, Clock, Send } from 'lucide-react';
import { FaLinkedin } from 'react-icons/fa';

const Contact = () => {
  return (
    <section id="contact" className="min-h-screen py-20 px-6 flex items-center justify-center">
      <div className="max-w-6xl w-full">
        <div className="text-center mb-16 flex flex-col items-center">
          <div className="relative inline-flex items-center justify-center p-[2px] mb-4 overflow-hidden rounded-xl">
            <div className="absolute w-[200%] h-[500%] bg-[conic-gradient(#C5A880_0deg,transparent_60deg,transparent_360deg)] animate-[spin_8s_linear_infinite]" />
            <h2 className="relative text-4xl font-bold bg-dark-navy px-8 py-3 rounded-xl text-center z-10">Get In <span className="gold-accent-text">Touch</span></h2>
          </div>
          <p className="text-silver/60">Feel free to reach out to me for any questions or opportunities!</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center space-y-8"
          >
            <div className="flex items-center gap-6 p-4 glass-card border-l-4 border-l-gold hover:-translate-y-1 transition-transform">
              <div className="p-4 bg-white/5 rounded-full text-gold">
                <MapPin size={28} />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white">Location</h4>
                <p className="text-silver/70">FAST NUCES Cfd-chiniot Campus</p>
              </div>
            </div>

            <div className="flex items-center gap-6 p-4 glass-card border-l-4 border-l-gold hover:-translate-y-1 transition-transform">
              <div className="p-4 bg-white/5 rounded-full text-gold">
                <Mail size={28} />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white">Email</h4>
                <a href="mailto:ahmadraza2607@gmail.com" className="text-silver/70 hover:text-gold transition-colors">
                  ahmadraza2607@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-center gap-6 p-4 glass-card border-l-4 border-l-gold hover:-translate-y-1 transition-transform">
              <div className="p-4 bg-white/5 rounded-full text-gold">
                <Clock size={28} />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white">Available</h4>
                <p className="text-silver/70">9 AM - 6 PM (Mon-Fri)</p>
              </div>
            </div>
            
            <div className="flex items-center gap-6 p-4 glass-card border-l-4 border-l-gold hover:-translate-y-1 transition-transform">
              <div className="p-4 bg-white/5 rounded-full text-gold">
                <FaLinkedin size={28} />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white">LinkedIn</h4>
                <a href="https://www.linkedin.com/in/ahmad-raza-3938382a7" target="_blank" rel="noreferrer" className="text-silver/70 hover:text-gold transition-colors">
                  linkedin.com/in/ahmad-raza-3938382a7
                </a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8"
          >
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-sm font-medium text-silver mb-2">Your Name</label>
                <input 
                  type="text" 
                  className="w-full bg-dark-navy/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors"
                  placeholder="John Doe"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-silver mb-2">Your Email</label>
                <input 
                  type="email" 
                  className="w-full bg-dark-navy/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-silver mb-2">Message</label>
                <textarea 
                  rows="5"
                  className="w-full bg-dark-navy/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors resize-none"
                  placeholder="How can I help you?"
                ></textarea>
              </div>

              <button 
                type="submit"
                className="w-full py-4 rounded-lg bg-gradient-to-r from-gold to-[#E2C792] text-dark-navy font-bold hover:shadow-[0_0_20px_rgba(197,168,128,0.5)] transition-all flex items-center justify-center gap-2"
              >
                <Send size={20} />
                Send Message
              </button>
            </form>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default Contact;
