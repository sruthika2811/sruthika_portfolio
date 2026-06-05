import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';

// Import resume PDF
import resumePdf from '../assets/resume/resume.pdf';

const Hero = () => {
  const [hoveredSocial, setHoveredSocial] = useState(null);

  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/sruthika2811',
      icon: FiGithub,
      tooltip: 'GitHub'
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/sruthika-paladhi',
      icon: FiLinkedin,
      tooltip: 'LinkedIn'
    },
    {
      name: 'Email',
      url: 'mailto:sruthikapaladhi28@gmail.com',
      icon: FiMail,
      tooltip: 'Email Me'
    }
  ];

  return (
    <section className="hero-section">
      <div className="hero-content">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '20px', marginBottom: '24px' }}
        >
          <span style={{ fontSize: '1.2rem' }}>👋</span>
          <span style={{ fontSize: '0.9rem', fontWeight: '500' }}>Hello, I'm</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{ fontSize: '4.5rem', lineHeight: '1.1', marginBottom: '16px', letterSpacing: '-0.02em', fontWeight: '700' }}
        >
          <div style={{ color: '#fff' }}>Paladhi</div>
          <div className="text-gradient text-gradient-purple-pink">Sruthika</div>
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{ color: 'var(--accent-blue)', fontSize: '1rem', letterSpacing: '0.1em', marginBottom: '24px', fontWeight: '600' }}
        >
          ASPIRING SOFTWARE DEVELOPER
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: '1.6', maxWidth: '500px', marginBottom: '32px' }}
        >
          Passionate about building scalable, efficient and impactful applications that solve real-world problems.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="social-icons"
          style={{ display: 'flex', gap: '16px', margin: '24px 0', position: 'relative' }}
        >
          {socialLinks.map((social) => {
            const Icon = social.icon;
            return (
              <div
                key={social.name}
                style={{ position: 'relative' }}
                onMouseEnter={() => setHoveredSocial(social.name)}
                onMouseLeave={() => setHoveredSocial(null)}
              >
                <motion.a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass social-icon"
                  whileHover={{
                    scale: 1.1,
                    boxShadow: '0 0 15px rgba(139, 92, 246, 0.4)',
                    borderColor: 'var(--accent-purple)',
                    color: '#ffffff'
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--text-secondary)',
                    cursor: 'pointer',
                    border: '1px solid var(--glass-border)',
                    textDecoration: 'none'
                  }}
                >
                  <Icon size={20} />
                </motion.a>

                <AnimatePresence>
                  {hoveredSocial === social.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="glass"
                      style={{
                        position: 'absolute',
                        top: '-40px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        padding: '6px 12px',
                        borderRadius: '8px',
                        fontSize: '0.8rem',
                        whiteSpace: 'nowrap',
                        color: '#fff',
                        pointerEvents: 'none',
                        zIndex: 10
                      }}
                    >
                      {social.tooltip}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="hero-actions"
        >
          <button 
            className="btn-primary"
            onClick={() => {
              const element = document.getElementById('projects');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            Explore My Work <ArrowRight size={18} />
          </button>
          <a 
            href={resumePdf}
            target="_blank"
            rel="noopener noreferrer"
            className="glass btn-secondary"
            style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          >
            View Resume <Download size={18} />
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="hero-image-container"
      >
        {/* Profile Image Ring */}
        <div style={{
          position: 'relative',
          width: '380px',
          height: '380px',
          borderRadius: '50%',
          padding: '4px',
          background: 'linear-gradient(135deg, var(--accent-purple), var(--accent-pink), var(--accent-blue))',
          boxShadow: '0 0 40px rgba(139, 92, 246, 0.4)'
        }}>
          <div style={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            overflow: 'hidden',
            backgroundColor: 'var(--bg-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <img
              src="/profile.jpg"
              alt="Paladhi Sruthika"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={(e) => { e.target.src = 'https://via.placeholder.com/380x380/0b0e14/ffffff?text=Add+/profile.jpg'; }}
            />
          </div>

          {/* Status Badge */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="glass"
            style={{
              position: 'absolute',
              bottom: '-10px',
              left: '50%',
              transform: 'translateX(-50%)',
              padding: '8px 20px',
              borderRadius: '24px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              whiteSpace: 'nowrap'
            }}
          >
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981', boxShadow: '0 0 10px #10b981' }} />
            <span style={{ fontSize: '0.9rem', fontWeight: '500', color: '#fff' }}>Available for opportunities</span>
          </motion.div>

          {/* Decorative dots */}
          <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 3, repeat: Infinity }} style={{ position: 'absolute', top: '10%', left: '-5%', width: '12px', height: '12px', borderRadius: '50%', backgroundColor: 'var(--accent-pink)', boxShadow: '0 0 15px var(--accent-pink)' }} />
          <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 4, repeat: Infinity, delay: 1 }} style={{ position: 'absolute', bottom: '20%', left: '-10%', width: '16px', height: '16px', borderRadius: '50%', backgroundColor: 'var(--accent-blue)', boxShadow: '0 0 15px var(--accent-blue)' }} />
          <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }} style={{ position: 'absolute', top: '40%', right: '-15%', width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'var(--accent-purple)', boxShadow: '0 0 15px var(--accent-purple)' }} />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
