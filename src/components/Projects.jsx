import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, X } from 'lucide-react';
import { FiGithub } from 'react-icons/fi';

// Explicitly import each project walkthrough video
import mediguideDemo from '../assets/videos/mediguide-demo.mp4';
import placementDemo from '../assets/videos/placement-demo.mp4';

const projects = [
  {
    title: 'MediGuide – Intelligent Prescription Analyzer',
    desc: 'MediGuide is a web-based healthcare application that helps users understand medical prescriptions by extracting medicine information from prescription images using OCR technology. The system analyzes prescriptions and provides medicine details, dosage information, diet recommendations, safety suggestions, and multilingual support.',
    tags: ['Python', 'OCR', 'Machine Learning', 'Flask', 'HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/sruthika2811/medi-guide',
    video: mediguideDemo
  },
  {
    title: 'Student Placement Prediction',
    desc: 'An intelligent machine learning application that predicts student placement opportunities based on academic and skill-related factors. Built with a user-friendly Streamlit interface and interactive visualizations to help analyze placement outcomes and trends.',
    tags: ['Python', 'Streamlit', 'Scikit-learn', 'Pandas', 'Plotly', 'Joblib', 'Jupyter Notebook'],
    github: 'https://github.com/sruthika2811/Student-Placement-Prediction',
    video: placementDemo
  },
  {
    title: 'Puzzle-Based Portfolio Website',
    desc: 'An interactive developer portfolio where visitors unlock sections by solving engaging technology-based puzzles such as debugging challenges, code output prediction, logo matching, memory puzzles, and drag-and-drop challenges, creating a unique recruiter experience.',
    tags: ['HTML5', 'CSS3', 'React.js', 'JavaScript', 'Framer Motion', 'Vite'],
    github: 'https://github.com/sruthika2811',
    video: null
  }
];

const Projects = () => {
  const [hoveredVideo, setHoveredVideo] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);

  // Close lightbox on Escape keypress
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedVideo(null);
      }
    };
    if (selectedVideo) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedVideo]);

  return (
    <section id="projects" className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="section-title">
          Featured <span className="text-gradient text-gradient-purple-pink">Projects</span>
        </h2>
        <p className="section-subtitle">A showcase of recently built applications highlighting code quality and interface design.</p>
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
        {projects.map((proj, idx) => (
          <motion.div
            key={proj.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            className="glass"
            style={{
              padding: '28px',
              borderRadius: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              transition: 'transform 0.3s, border-color 0.3s, box-shadow 0.3s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-6px)';
              e.currentTarget.style.borderColor = 'var(--accent-purple)';
              e.currentTarget.style.boxShadow = '0 0 20px rgba(139, 92, 246, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.borderColor = 'var(--glass-border)';
              e.currentTarget.style.boxShadow = '0 8px 32px 0 rgba(0, 0, 0, 0.37)';
            }}
          >
            <h3 style={{ fontSize: '1.3rem', fontWeight: '600', color: '#fff' }}>{proj.title}</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6', flex: 1 }}>{proj.desc}</p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', margin: '8px 0' }}>
              {proj.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontSize: '0.8rem',
                    padding: '4px 10px',
                    borderRadius: '6px',
                    backgroundColor: 'rgba(255,255,255,0.03)',
                    border: '1px solid var(--glass-border)',
                    color: 'var(--accent-blue)'
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '12px', marginTop: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
              <a
                href={proj.github}
                target="_blank"
                rel="noopener noreferrer"
                className="glass"
                style={{
                  padding: '10px 18px',
                  borderRadius: '10px',
                  color: '#fff',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  fontWeight: '500',
                  transition: 'background 0.3s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                <FiGithub size={16} /> Code
              </a>

              {proj.video && (
                <div style={{ position: 'relative' }}>
                  <button
                    onClick={() => setSelectedVideo(proj.video)}
                    onMouseEnter={() => setHoveredVideo(idx)}
                    onMouseLeave={() => setHoveredVideo(null)}
                    style={{
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid var(--glass-border)',
                      padding: '10px 18px',
                      borderRadius: '10px',
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '0.9rem',
                      fontWeight: '500',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      borderColor: hoveredVideo === idx ? 'var(--accent-purple)' : 'var(--glass-border)',
                      boxShadow: hoveredVideo === idx ? '0 0 15px rgba(139, 92, 246, 0.4)' : 'none',
                      transform: hoveredVideo === idx ? 'translateY(-2px)' : 'none'
                    }}
                  >
                    <ExternalLink size={16} /> Watch Project
                  </button>

                  <AnimatePresence>
                    {hoveredVideo === idx && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        style={{
                          position: 'absolute',
                          bottom: '100%',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          marginBottom: '10px',
                          backgroundColor: 'rgba(10, 10, 15, 0.95)',
                          border: '1px solid var(--glass-border)',
                          boxShadow: '0 0 10px rgba(139, 92, 246, 0.2)',
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
                        View Project Walkthrough
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Premium Video Lightbox Overlay */}
      <AnimatePresence>
        {selectedVideo && (
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
            onClick={() => setSelectedVideo(null)}
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
                maxWidth: '960px',
                maxHeight: '85vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden'
              }}
            >
              {/* HTML5 video player with customized controls */}
              <video 
                src={selectedVideo}
                controls
                autoPlay
                style={{
                  width: '100%',
                  maxHeight: '75vh',
                  borderRadius: '16px',
                  border: '1px solid var(--glass-border)',
                  boxShadow: '0 0 45px rgba(139, 92, 246, 0.25)',
                  backgroundColor: '#000'
                }}
              />

              {/* Close Button floating at top-right */}
              <button 
                onClick={() => setSelectedVideo(null)}
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

export default Projects;
