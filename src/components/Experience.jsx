import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Briefcase } from 'lucide-react';

// Explicitly import the offer letter
import offerLetter from '../assets/documents/edunet-offer-letter.jpeg';

const experiences = [
  {
    role: 'Artificial Intelligence Intern',
    company: 'Edunet Foundation | IBM SkillsBuild | AICTE',
    period: 'May 2026 – June 2026',
    desc: [
      'Selected for a 6-week Artificial Intelligence Internship under the IBM SkillsBuild Program in collaboration with AICTE.',
      'Completed hands-on training in Artificial Intelligence, Machine Learning, and data-driven problem solving.',
      'Worked on AI-based project development under mentor guidance.',
      'Participated in mentor-led technical sessions, workshops, project reviews, and presentations.',
      'Strengthened skills in Python, AI Fundamentals, Machine Learning Basics, Data Analysis, and Problem Solving.'
    ],
    skills: ['Python', 'Artificial Intelligence', 'Machine Learning Basics', 'Data Analysis', 'Problem Solving'],
    color: '#8b5cf6'
  }
];

const Experience = () => {
  const [hoveredDoc, setHoveredDoc] = useState(false);

  return (
    <section id="experience" className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="section-title">
          My <span className="text-gradient text-gradient-purple-pink">Experience</span>
        </h2>
        <p className="section-subtitle">My professional journey, key learning opportunities, and team integrations.</p>
      </motion.div>

      <div className="timeline-container">
        {experiences.map((exp, idx) => (
          <motion.div
            key={exp.role}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.15 }}
            className="timeline-item"
          >
            <div className="timeline-dot" style={{ color: exp.color, backgroundColor: exp.color }} />
            <div 
              className="glass timeline-card"
              style={{ borderLeft: `3px solid ${exp.color}`, padding: '28px', borderRadius: '20px' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Briefcase size={20} color={exp.color} /> {exp.role}
                </h3>
                <span style={{ fontSize: '0.9rem', color: exp.color, fontWeight: '500' }}>{exp.period}</span>
              </div>
              <h4 style={{ fontSize: '1rem', color: 'var(--accent-blue)', fontWeight: '500', marginTop: '6px' }}>{exp.company}</h4>
              
              {/* Bulleted Description */}
              <ul style={{ listStyleType: 'disc', paddingLeft: '20px', marginTop: '14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {exp.desc.map((bullet, bIdx) => (
                  <li key={bIdx} style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                    {bullet}
                  </li>
                ))}
              </ul>

              {/* Skills Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '20px' }}>
                {exp.skills.map((skill) => (
                  <span
                    key={skill}
                    style={{
                      fontSize: '0.8rem',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      backgroundColor: 'rgba(255,255,255,0.02)',
                      border: '1px solid var(--glass-border)',
                      color: exp.color
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Document Action Button */}
              <div style={{ display: 'flex', gap: '14px', marginTop: '24px', flexWrap: 'wrap' }}>
                <div style={{ position: 'relative' }}>
                  <a
                    href={offerLetter}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => setHoveredDoc(true)}
                    onMouseLeave={() => setHoveredDoc(false)}
                    style={{
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid var(--glass-border)',
                      padding: '10px 18px',
                      borderRadius: '10px',
                      color: '#fff',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '0.9rem',
                      fontWeight: '500',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      textDecoration: 'none',
                      borderColor: hoveredDoc ? exp.color : 'var(--glass-border)',
                      boxShadow: hoveredDoc ? `0 0 15px ${exp.color}40` : 'none',
                      transform: hoveredDoc ? 'translateY(-2px)' : 'none'
                    }}
                  >
                    <FileText size={16} color={exp.color} /> View Offer Letter
                  </a>

                  <AnimatePresence>
                    {hoveredDoc && (
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
                          boxShadow: `0 0 10px ${exp.color}20`,
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
                        View Document
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
