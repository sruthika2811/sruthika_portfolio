import { motion } from 'framer-motion';

const educationList = [
  {
    degree: 'Bachelor of Technology (B.Tech)',
    field: 'Artificial Intelligence and Data Science',
    institution: 'Vignan Institute Of Technology And Science',
    period: '2023 - 2027',
    grade: 'CGPA: 8.67/10.0',
    color: '#3b82f6'
  },
  {
    degree: 'Higher Secondary Education',
    field: 'MPC',
    institution: 'S R Junior College',
    period: '2021 - 2023',
    grade: 'Percentage: 96%',
    color: '#8b5cf6'
  },
  {
    degree: 'Secondary School Certificate (10th)',
    field: 'SSC',
    institution: 'Sri Vidya Vihar High School',
    period: '2020 - 2021',
    grade: 'GPA: 9.8/10.0',
    color: '#ec4899'
  }
];

const Education = () => {
  return (
    <section id="education" className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="section-title">
          My <span className="text-gradient text-gradient-purple-pink">Education</span>
        </h2>
        <p className="section-subtitle">Academic foundations, specializations, and educational achievements.</p>
      </motion.div>

      <div className="timeline-container">
        {educationList.map((edu, idx) => (
          <motion.div
            key={edu.degree}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.15 }}
            className="timeline-item"
          >
            <div className="timeline-dot" style={{ color: edu.color, backgroundColor: edu.color }} />
            <div
              className="glass timeline-card"
              style={{ borderLeft: `3px solid ${edu.color}` }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#fff' }}>{edu.degree}</h3>
                <span style={{ fontSize: '0.9rem', color: edu.color, fontWeight: '500' }}>{edu.period}</span>
              </div>
              <h4 style={{ fontSize: '1rem', color: 'var(--accent-pink)', fontWeight: '500' }}>{edu.institution}</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', fontWeight: '500', marginTop: '4px' }}>{edu.field}</p>
              <div style={{
                alignSelf: 'flex-start',
                fontSize: '0.85rem',
                padding: '4px 10px',
                borderRadius: '6px',
                backgroundColor: 'rgba(255,255,255,0.03)',
                border: '1px solid var(--glass-border)',
                color: edu.color,
                marginTop: '6px'
              }}>
                {edu.grade}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Education;
