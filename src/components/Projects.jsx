import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, X } from 'lucide-react';
import { FiGithub } from 'react-icons/fi';

const projects = [
  {
    title: 'MediGuide – Intelligent Prescription Analyzer',
    desc: 'Web app that extracts medicine info from prescriptions using OCR.',
    tags: ['Python', 'OCR', 'Flask', 'Machine Learning'],
    github: 'https://github.com/sruthika2811/medi-guide',
  },
  {
    title: 'Student Placement Prediction',
    desc: 'ML model predicting student placement chances.',
    tags: ['Python', 'Streamlit', 'Scikit-learn'],
    github: 'https://github.com/sruthika2811/Student-Placement-Prediction',
  },
  {
    title: 'Puzzle-Based Portfolio Website',
    desc: 'Interactive portfolio with puzzle-based navigation.',
    tags: ['React', 'Framer Motion', 'Vite'],
    github: 'https://github.com/sruthika2811',
  }
];

const Projects = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [hoveredVideo, setHoveredVideo] = useState(null);

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
        <p className="section-subtitle">
          Showcase of my recent work.
        </p>
      </motion.div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '30px'
      }}>

        {projects.map((proj, idx) => (
          <motion.div
            key={proj.title}
            className="glass"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{
              padding: '24px',
              borderRadius: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}
          >

            <h3 style={{ color: '#fff' }}>{proj.title}</h3>

            <p style={{ color: '#aaa', fontSize: '0.9rem' }}>
              {proj.desc}
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {proj.tags.map(tag => (
                <span key={tag} style={{
                  fontSize: '0.75rem',
                  padding: '4px 8px',
                  border: '1px solid #333',
                  borderRadius: '6px',
                  color: '#8ab4ff'
                }}>
                  {tag}
                </span>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>

              <a
                href={proj.github}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: '#fff',
                  textDecoration: 'none'
                }}
              >
                <FiGithub /> Code
              </a>

            </div>

          </motion.div>
        ))}

      </div>

      {/* Video Modal Safe */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 9999
            }}
            onClick={() => setSelectedVideo(null)}
          >
            <div onClick={(e) => e.stopPropagation()}>
              <video
                src={selectedVideo}
                controls
                autoPlay
                style={{ width: '80vw', borderRadius: '10px' }}
              />
              <button
                onClick={() => setSelectedVideo(null)}
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  background: '#fff',
                  border: 'none',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px'
                }}
              >
                <X />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default Projects;
