import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Sun, Menu } from 'lucide-react';

const Navbar = () => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [activeSection, setActiveSection] = useState('Home');
  
  const navItems = [
    'Home',
    'About',
    'Skills',
    'Projects',
    'Experience',
    'Education',
    'Certifications',
    'Contact'
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'experience', 'education', 'certifications', 'contact'];
      const scrollPosition = window.scrollY + 250;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            const matched = navItems.find(item => item.toLowerCase() === section);
            if (matched) {
              setActiveSection(matched);
            }
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (item) => {
    setActiveSection(item);
    const element = document.getElementById(item.toLowerCase());
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav style={{
      position: 'fixed',
      top: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '90%',
      maxWidth: '1200px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '12px 24px',
      borderRadius: '50px',
      zIndex: 100,
    }} className="glass">
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Code2 color="#ec4899" size={24} />
        <span className="brand" style={{ fontSize: '1.2rem', fontWeight: '600' }}>Sruthika | Portfolio</span>
      </div>

      {/* Nav Items */}
      <div style={{ display: 'flex', gap: '20px', position: 'relative' }} className="nav-links">
        {navItems.map((item) => (
          <div 
            key={item} 
            style={{ position: 'relative', cursor: 'pointer' }}
            onMouseEnter={() => setHoveredItem(item)}
            onMouseLeave={() => setHoveredItem(null)}
            onClick={() => handleNavClick(item)}
          >
            <span style={{ 
              fontSize: '0.9rem', 
              color: activeSection === item ? '#fff' : 'var(--text-secondary)',
              fontWeight: activeSection === item ? '500' : '400',
              transition: 'color 0.3s'
            }}>
              {item}
            </span>
            
            {/* Active Indicator */}
            {activeSection === item && (
              <motion.div
                layoutId="activeIndicator"
                style={{
                  position: 'absolute',
                  bottom: '-8px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '4px',
                  height: '4px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--accent-purple)',
                  boxShadow: '0 0 10px var(--accent-purple)'
                }}
              />
            )}

            {/* Tooltip */}
            <AnimatePresence>
              {hoveredItem === item && item !== 'Home' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="glass"
                  style={{
                    position: 'absolute',
                    top: '30px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    fontSize: '0.8rem',
                    whiteSpace: 'nowrap',
                    color: '#fff',
                    pointerEvents: 'none'
                  }}
                >
                  👉 Solve puzzles to unlock this section
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* Right Icons */}
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <button style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}>
          <Sun size={20} />
        </button>
        <button style={{ 
          background: 'var(--accent-purple)', 
          border: 'none', 
          width: '40px', 
          height: '40px', 
          borderRadius: '50%', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          cursor: 'pointer',
          color: '#fff'
        }}>
          <Menu size={20} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
