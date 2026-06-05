import { motion } from 'framer-motion';
import { FiGithub } from 'react-icons/fi';

const projects = [
  {
    title: 'MediGuide – Intelligent Prescription Analyzer',
    desc: 'MediGuide is a web-based healthcare application that helps users understand medical prescriptions by extracting medicine information from prescription images using OCR technology. The system analyzes prescriptions and provides medicine details, dosage information, diet recommendations, safety suggestions, and multilingual support.',
    tags: ['Python', 'OCR', 'Machine Learning', 'Flask', 'HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/sruthika2811/medi-guide'
  },
  {
    title: 'Student Placement Prediction',
    desc: 'An intelligent machine learning application that predicts student placement opportunities based on academic and skill-related factors. Built with a user-friendly Streamlit interface and interactive visualizations.',
    tags: ['Python', 'Streamlit', 'Scikit-learn', 'Pandas', 'Plotly', 'Joblib', 'Jupyter Notebook'],
    github: 'https://github.com/sruthika2811/Student-Placement-Prediction'
  },
  {
    title: 'Puzzle-Based Portfolio Website',
    desc: 'An interactive developer portfolio where visitors unlock sections by solving engaging technology-based puzzles.',
    tags: ['HTML5', 'CSS3', 'React.js', 'JavaScript', 'Framer Motion', 'Vite'],
    github: 'https://github.com/sruthika2811'
  }
];

const Projects = () => {
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
          A showcase of recently built applications highlighting code quality and interface design.
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
            
            <h3 style={{
              fontSize: '1.3rem',
              fontWeight: '600',
              color: '#fff'
            }}>
              {proj.title}
            </h3>

            <p style={{
              color: 'var(--text-secondary)',
              fontSize: '0.95rem',
              lineHeight: '1.6',
              flex: 1
            }}>
              {proj.desc}
            </p>

            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
              margin: '8px 0'
            }}>
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

            <div style={{
              display: 'flex',
              gap: '12px',
              marginTop: '12px',
              flexWrap: 'wrap',
              alignItems: 'center'
            }}>
              
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
                  fontWeight: '500'
                }}
              >
                <FiGithub size={16} /> Code
              </a>

            </div>

          </motion.div>
        ))}

      </div>
    </section>
  );
};

export default Projects;
   
              
           
