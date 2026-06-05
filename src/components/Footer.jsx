import { useState } from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.footer
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '30px 24px',
        borderRadius: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        width: '100%',
        background: 'rgba(255, 255, 255, 0.02)',
        backdropFilter: 'blur(16px)',
        border: '1px solid var(--glass-border)',
        borderTop: hovered ? '1px solid var(--accent-pink)' : '1px solid rgba(139, 92, 246, 0.4)',
        boxShadow: hovered 
          ? '0 -8px 25px -4px rgba(236, 72, 153, 0.25), 0 8px 32px 0 rgba(0, 0, 0, 0.37)' 
          : '0 -4px 20px -2px rgba(139, 92, 246, 0.12), 0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        textAlign: 'center',
        transition: 'all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)',
        marginTop: '20px',
        cursor: 'default'
      }}
    >
      <p style={{
        fontSize: '0.95rem',
        fontWeight: '500',
        color: '#fff',
        margin: 0,
        letterSpacing: '0.01em'
      }}>
        © 2026 <span className="text-gradient text-gradient-purple-pink" style={{ fontWeight: '600' }}>Sruthika</span>. All Rights Reserved.
      </p>
      <p style={{
        fontSize: '0.82rem',
        color: 'var(--text-secondary)',
        margin: 0,
        letterSpacing: '0.02em',
        lineHeight: '1.5'
      }}>
        Built with React, creativity, and continuous learning.
      </p>
    </motion.footer>
  );
};

export default Footer;
