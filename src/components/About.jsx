import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="section-title">
          About <span className="text-gradient text-gradient-purple-pink">Me</span>
        </h2>
        <p className="section-subtitle">A brief introduction to my background, passion, and aspirations.</p>
      </motion.div>

      <div className="grid-2">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glass"
          style={{ padding: '32px', borderRadius: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}
        >
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', fontSize: '1.05rem' }}>
            Hello! I'm <strong style={{ color: '#fff' }}>Paladhi Sruthika</strong>, an aspiring software developer with a strong passion for crafting modern, highly responsive, and impactful web applications. I love solving complex technical challenges with clean code and structured thinking.
          </p>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', fontSize: '1.05rem' }}>
            My journey into software development is driven by a deep curiosity about how systems scale and how technology can be leveraged to address real-world problems. I am continuously exploring modern frontend frameworks, cloud platforms, and clean backend designs.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="glass"
          style={{ padding: '32px', borderRadius: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}
        >
          <h3 style={{ fontSize: '1.4rem', fontWeight: '600', color: '#fff' }}>Quick Facts</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { label: 'Role', value: 'Aspiring Software Developer' },
              { label: 'Location', value: 'India' },
              {
                label: 'Interests', value: 'Web Apps, AI, Cloud Computing'
              },
              { label: 'Approach', value: 'Clean Code, Logic, User First' }
            ].map((fact, idx) => (
              <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--glass-border)', paddingBottom: '8px' }}>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>{fact.label}</span>
                <span style={{ color: 'var(--accent-blue)', fontWeight: '500', fontSize: '0.95rem' }}>{fact.value}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
