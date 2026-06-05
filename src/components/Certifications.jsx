import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, FileBadge, Eye, X } from 'lucide-react';

// Explicitly import each certificate image
import javaNptel from '../assets/certificates/java-nptel.jpg.jpeg';
import aiInfosys from '../assets/certificates/ai-infosys.jpg.jpeg';
import pythonInfosys from '../assets/certificates/python-infosys.jpg.jpeg';
import oracleCloud from '../assets/certificates/oracle-cloud.jpg.jpeg';
import azureAi from '../assets/certificates/azure-ai.jpg.jpeg';
import dataScienceHp from '../assets/certificates/data-science-hp.jpg.jpeg';
import tcsIon from '../assets/certificates/tcs-ion.jpg.jpeg';
import mlWorkshop from '../assets/certificates/ml-workshop.jpg.jpeg';

const certs = [
  {
    name: 'Programming in Java',
    issuer: 'NPTEL',
    date: 'October 2024',
    credId: 'NPTEL24CS105S650204540',
    image: javaNptel,
    status: 'Verified',
    color: '#ef4444'
  },
  {
    name: 'Introduction to Artificial Intelligence',
    issuer: 'Infosys Springboard',
    date: 'December 2024',
    image: aiInfosys,
    status: 'Verified',
    color: '#ec4899'
  },
  {
    name: 'Learning Python',
    issuer: 'Infosys Springboard',
    date: 'November 2024',
    image: pythonInfosys,
    status: 'Verified',
    color: '#6366f1'
  },
  {
    name: 'Oracle Certified Professional – Oracle Cloud Database Services 2025',
    issuer: 'Oracle',
    date: 'September 2025',
    image: oracleCloud,
    status: 'Verified',
    color: '#c026d3'
  },
  {
    name: 'Microsoft Azure AI Essentials',
    issuer: 'Microsoft & LinkedIn Learning',
    date: 'August 2025',
    image: azureAi,
    status: 'Verified',
    color: '#3b82f6'
  },
  {
    name: 'Data Science and Analytics',
    issuer: 'HP LIFE',
    date: 'July 2025',
    credId: '84a876ea-64cc-4620-a65d-fee6f9f75716',
    image: dataScienceHp,
    status: 'Verified',
    color: '#06b6d4'
  },
  {
    name: 'TCS iON Career Edge – Young Professional',
    issuer: 'Tata Consultancy Services',
    date: 'March 2025',
    image: tcsIon,
    status: 'Verified',
    color: '#f59e0b'
  },
  {
    name: '5 Days Hands-On Workshop on Machine Learning',
    issuer: 'Innomatics Research Labs',
    date: 'October 2025',
    image: mlWorkshop,
    status: 'Verified',
    color: '#10b981'
  }
];

const Certifications = () => {
  const [hoveredIcon, setHoveredIcon] = useState(null);
  const [selectedCert, setSelectedCert] = useState(null);

  // Close lightbox on Escape keypress
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedCert(null);
      }
    };
    if (selectedCert) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedCert]);

  return (
    <section id="certifications" className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="section-title">
          My <span className="text-gradient text-gradient-purple-pink">Certifications</span>
        </h2>
        <p className="section-subtitle">
          A collection of certifications, workshops, and professional learning achievements that reflect my continuous growth in software development, cloud computing, artificial intelligence, machine learning, and data science.
        </p>
      </motion.div>

      <div className="certifications-grid">
        {certs.map((cert, idx) => (
          <motion.div
            key={cert.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.05 }}
            onClick={() => setSelectedCert(cert)}
            className="glass"
            style={{ 
              padding: '24px', 
              borderRadius: '16px', 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'space-between',
              gap: '16px',
              borderTop: `3px solid ${cert.color}`,
              transition: 'transform 0.3s, border-color 0.3s, box-shadow 0.3s',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-6px)';
              e.currentTarget.style.borderColor = cert.color;
              e.currentTarget.style.boxShadow = `0 0 25px ${cert.color}30`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.borderColor = 'var(--glass-border)';
              e.currentTarget.style.boxShadow = '0 8px 32px 0 rgba(0, 0, 0, 0.37)';
            }}
          >
            {/* Top-Right Action: Eye Icon with Tooltip */}
            <div 
              style={{ 
                position: 'absolute', 
                top: '16px', 
                right: '16px', 
                zIndex: 10 
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ position: 'relative' }}>
                <button
                  onClick={() => setSelectedCert(cert)}
                  onMouseEnter={() => setHoveredIcon(idx)}
                  onMouseLeave={() => setHoveredIcon(null)}
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid var(--glass-border)',
                    width: '34px',
                    height: '34px',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: hoveredIcon === idx ? cert.color : 'var(--text-secondary)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: hoveredIcon === idx ? `0 0 12px ${cert.color}60` : 'none',
                    borderColor: hoveredIcon === idx ? cert.color : 'var(--glass-border)',
                    transform: hoveredIcon === idx ? 'scale(1.1)' : 'scale(1)'
                  }}
                >
                  <Eye size={17} />
                </button>

                {/* Side-floating Tooltip to prevent overflow clipping */}
                <AnimatePresence>
                  {hoveredIcon === idx && (
                    <motion.div
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      style={{
                        position: 'absolute',
                        right: '100%',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        marginRight: '10px',
                        backgroundColor: 'rgba(10, 10, 15, 0.95)',
                        border: '1px solid var(--glass-border)',
                        boxShadow: `0 0 10px ${cert.color}20`,
                        color: '#fff',
                        padding: '4px 10px',
                        borderRadius: '6px',
                        fontSize: '0.75rem',
                        fontWeight: '500',
                        whiteSpace: 'nowrap',
                        pointerEvents: 'none',
                        zIndex: 100
                      }}
                    >
                      View Certificate
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ 
                  width: '44px', 
                  height: '44px', 
                  borderRadius: '10px', 
                  backgroundColor: `${cert.color}15`, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  color: cert.color 
                }}>
                  <FileBadge size={24} />
                </div>
                <div style={{ flex: 1, paddingRight: '48px' }}>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: '600', color: '#fff', lineHeight: '1.4' }}>{cert.name}</h3>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'block', marginTop: '2px' }}>{cert.issuer}</span>
                </div>
              </div>

              {cert.credId && (
                <div style={{
                  alignSelf: 'flex-start',
                  fontSize: '0.75rem',
                  padding: '3px 8px',
                  borderRadius: '4px',
                  backgroundColor: 'rgba(255,255,255,0.02)',
                  border: '1px solid var(--glass-border)',
                  color: 'var(--text-secondary)',
                  fontFamily: 'monospace'
                }}>
                  ID: {cert.credId}
                </div>
              )}
            </div>

            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              marginTop: '8px', 
              borderTop: '1px solid var(--glass-border)', 
              paddingTop: '14px' 
            }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <CheckCircle size={12} color="#10b981" /> {cert.status}
              </span>
              <span style={{ fontSize: '0.8rem', color: cert.color, fontWeight: '500' }}>{cert.date}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Premium Glassmorphism Lightbox Overlay */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9999,
              backgroundColor: 'rgba(3, 3, 6, 0.85)',
              backdropFilter: 'blur(12px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px'
            }}
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              initial={{ scale: 0.93, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.93, opacity: 0 }}
              transition={{ type: 'spring', duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '900px',
                maxHeight: '85vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {/* Image Frame */}
              <img 
                src={selectedCert.image}
                alt={`${selectedCert.name} Certificate`}
                style={{
                  maxWidth: '100%',
                  maxHeight: '75vh',
                  objectFit: 'contain',
                  borderRadius: '16px',
                  border: '1px solid var(--glass-border)',
                  boxShadow: `0 0 40px ${selectedCert.color}25`
                }}
              />

              {/* Dynamic Header details below image inside the lightbox */}
              <div style={{
                marginTop: '16px',
                textAlign: 'center',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid var(--glass-border)',
                backdropFilter: 'blur(8px)',
                padding: '12px 24px',
                borderRadius: '12px',
                color: '#fff',
                maxWidth: '600px'
              }}>
                <h4 style={{ fontSize: '1.05rem', fontWeight: '600' }}>{selectedCert.name}</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                  {selectedCert.issuer} • {selectedCert.date}
                </p>
              </div>

              {/* Close Button floating at the top-right */}
              <button 
                onClick={() => setSelectedCert(null)}
                style={{
                  position: 'fixed',
                  top: '24px',
                  right: '24px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid var(--glass-border)',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  cursor: 'pointer',
                  transition: 'background 0.3s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
              >
                <X size={20} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Certifications;
