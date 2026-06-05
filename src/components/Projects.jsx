import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGithub } from 'react-icons/fi';
import { Lock, HelpCircle, Clock, CheckCircle2 } from 'lucide-react';
import { 
  FaReact, 
  FaPython, 
  FaHtml5, 
  FaCss3Alt, 
  FaGitAlt, 
  FaGithub, 
  FaBootstrap,
  FaJs
} from 'react-icons/fa';
import { 
  SiMongodb, 
  SiMysql, 
  SiTailwindcss, 
  SiVite, 
  SiFirebase 
} from 'react-icons/si';

const projects = [
  {
    title: 'MediGuide – Intelligent Prescription Analyzer',
    desc: 'MediGuide is a web-based healthcare application that helps users understand medical prescriptions by extracting medicine information from prescription images using OCR technology. The system analyzes prescriptions and provides medicine details, dosage information, diet recommendations, safety suggestions, and multilingual support.',
    tags: ['Python', 'OCR', 'Machine Learning', 'Flask', 'HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/sruthika2811/medi-guide'
  },
  {
    title: 'Student Placement Prediction',
    desc: 'An intelligent machine learning application that predicts student placement opportunities based on academic and skill-related factors. Built with a user-friendly Streamlit interface and interactive visualizations to help analyze placement outcomes and trends.',
    tags: ['Python', 'Streamlit', 'Scikit-learn', 'Pandas', 'Plotly', 'Joblib', 'Jupyter Notebook'],
    github: 'https://github.com/sruthika2811/Student-Placement-Prediction'
  },
  {
    title: 'Puzzle-Based Portfolio Website',
    desc: 'An interactive developer portfolio where visitors unlock sections by solving engaging technology-based puzzles such as debugging challenges, code output prediction, logo matching, memory puzzles, and drag-and-drop challenges, creating a unique recruiter experience.',
    tags: ['HTML5', 'CSS3', 'React.js', 'JavaScript', 'Framer Motion', 'Vite'],
    github: 'https://github.com/sruthika2811/sruthika_portfolio.git'
  }
];

const techPool = [
  { name: 'React', icon: FaReact, color: '#61dafb' },
  { name: 'JavaScript', icon: FaJs, color: '#f7df1e' },
  { name: 'Python', icon: FaPython, color: '#3776ab' },
  { name: 'HTML', icon: FaHtml5, color: '#e34f26' },
  { name: 'CSS', icon: FaCss3Alt, color: '#1572b6' },
  { name: 'Git', icon: FaGitAlt, color: '#f05032' },
  { name: 'GitHub', icon: FaGithub, color: '#ffffff' },
  { name: 'MongoDB', icon: SiMongodb, color: '#47a248' },
  { name: 'MySQL', icon: SiMysql, color: '#00758f' },
  { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06b6d4' },
  { name: 'Bootstrap', icon: FaBootstrap, color: '#7952b3' },
  { name: 'Vite', icon: SiVite, color: '#646cff' },
  { name: 'Firebase', icon: SiFirebase, color: '#ffca28' }
];

const shuffleArray = (array) => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const Projects = () => {
  const [unlocked, setUnlocked] = useState(false);
  const [showChallengeModal, setShowChallengeModal] = useState(false);
  
  // Memory Challenge states
  const [selectedTechs, setSelectedTechs] = useState([]);
  const [stage, setStage] = useState('memorize'); // 'memorize', 'question', 'success', 'failure'
  const [question, setQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  
  const projectsContainerRef = useRef(null);

  // Initialize lock state from localStorage
  useEffect(() => {
    const isSavedUnlocked = localStorage.getItem('projects_unlocked') === 'true';
    if (isSavedUnlocked) {
      setUnlocked(true);
    }
  }, []);

  const startChallenge = () => {
    // Choose 4 random techs from pool
    const shuffledPool = shuffleArray(techPool);
    const chosen = shuffledPool.slice(0, 4);
    setSelectedTechs(chosen);
    setStage('memorize');
    setSelectedAnswer(null);
    setShowChallengeModal(true);
  };

  // Ref to always get the freshest selectedTechs in the setTimeout closure
  const selectedTechsRef = useRef([]);
  useEffect(() => {
    selectedTechsRef.current = selectedTechs;
  }, [selectedTechs]);

  // Switch to question stage after 4 seconds
  useEffect(() => {
    if (showChallengeModal && stage === 'memorize' && selectedTechs.length === 4) {
      const timer = setTimeout(() => {
        const techs = selectedTechsRef.current;
        if (!techs || techs.length < 4) return;

        // Generate question based on chosen techs
        const qType = Math.floor(Math.random() * 4);
        let text = '';
        let correctAnswer = '';
        
        if (qType === 0) {
          text = 'Which technology appeared in the top-left position?';
          correctAnswer = techs[0].name;
        } else if (qType === 1) {
          text = 'Which icon was shown in the bottom-right corner?';
          correctAnswer = techs[3].name;
        } else if (qType === 2) {
          text = 'Which technology was NOT displayed?';
          const notDisplayedPool = techPool.filter(t => !techs.some(s => s.name === t.name));
          const chosenNotDisplayed = notDisplayedPool[Math.floor(Math.random() * notDisplayedPool.length)];
          correctAnswer = chosenNotDisplayed.name;
        } else {
          text = 'What was the third technology shown?';
          correctAnswer = techs[2].name;
        }

        // Generate options: 1 correct + 3 incorrect
        let options = [];
        if (qType === 2) {
          const displayedNames = techs.map(s => s.name);
          const shuffledDisplayed = shuffleArray(displayedNames).slice(0, 3);
          options = [correctAnswer, ...shuffledDisplayed];
        } else {
          const incorrectPool = techPool.filter(t => t.name !== correctAnswer);
          const chosenIncorrect = shuffleArray(incorrectPool).slice(0, 3).map(t => t.name);
          options = [correctAnswer, ...chosenIncorrect];
        }

        setQuestion({
          text,
          correctAnswer,
          options: shuffleArray(options)
        });
        setStage('question');
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [stage, showChallengeModal, selectedTechs]);

  const handleAnswerClick = (option) => {
    setSelectedAnswer(option);
    if (option === question.correctAnswer) {
      setStage('success');
      localStorage.setItem('projects_unlocked', 'true');
      setTimeout(() => {
        setShowChallengeModal(false);
        setUnlocked(true);
        // Smooth scroll to projects
        setTimeout(() => {
          projectsContainerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 300);
      }, 2000);
    } else {
      setStage('failure');
    }
  };

  const handleRetry = () => {
    // Generate a fresh set of technologies
    const shuffledPool = shuffleArray(techPool);
    const chosen = shuffledPool.slice(0, 4);
    setSelectedTechs(chosen);
    setSelectedAnswer(null);
    setStage('memorize');
  };

  const performSkip = () => {
    localStorage.setItem('projects_unlocked', 'true');
    setUnlocked(true);
    setTimeout(() => {
      projectsContainerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  return (
    <section id="projects" className="section-container" ref={projectsContainerRef} style={{ position: 'relative' }}>
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

      {/* Grid container with lock overlays */}
      <div style={{ position: 'relative', marginTop: '40px' }}>
        
        {/* Projects Cards Grid - blurred when locked */}
        <div style={{ 
          filter: unlocked ? 'none' : 'blur(16px)', 
          opacity: unlocked ? 1 : 0.15,
          transition: 'filter 0.8s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.8s cubic-bezier(0.25, 1, 0.5, 1)', 
          pointerEvents: unlocked ? 'auto' : 'none',
          userSelect: unlocked ? 'auto' : 'none'
        }}>
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
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Lock Overlay (Initial State) */}
        <AnimatePresence>
          {!unlocked && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 5
              }}
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="glass"
                style={{
                  padding: '40px',
                  borderRadius: '20px',
                  textAlign: 'center',
                  maxWidth: '400px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '20px',
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  cursor: 'default'
                }}
              >
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(139, 92, 246, 0.1)',
                  border: '1px solid var(--accent-purple)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--accent-purple)',
                  boxShadow: '0 0 15px rgba(139, 92, 246, 0.3)'
                }}>
                  <Lock size={28} />
                </div>
                <h3 style={{ fontSize: '1.45rem', fontWeight: '700', color: '#fff', margin: 0 }}>
                  🔒 Solve the puzzle to unlock this section
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', margin: 0, lineHeight: '1.5' }}>
                  Memorize the technologies before they disappear.
                </p>
                <button 
                  onClick={startChallenge}
                  className="btn-primary"
                  style={{ 
                    marginTop: '8px', 
                    padding: '12px 30px', 
                    fontSize: '0.95rem',
                    boxShadow: '0 0 15px rgba(139, 92, 246, 0.4)'
                  }}
                >
                  Start Challenge
                </button>

                <button 
                  onClick={performSkip}
                  style={{ 
                    background: 'none', 
                    border: 'none', 
                    color: 'var(--text-secondary)', 
                    fontSize: '0.8rem', 
                    textDecoration: 'underline', 
                    cursor: 'pointer',
                    opacity: 0.6
                  }}
                  onMouseEnter={(e) => e.target.style.opacity = 1}
                  onMouseLeave={(e) => e.target.style.opacity = 0.6}
                >
                  Skip challenge
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Memory Flash Challenge Modal */}
      <AnimatePresence>
        {showChallengeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              backgroundColor: 'rgba(11, 14, 20, 0.9)',
              backdropFilter: 'blur(10px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
              padding: '20px'
            }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="glass"
              style={{
                width: '100%',
                maxWidth: '520px',
                padding: '30px',
                borderRadius: '24px',
                position: 'relative',
                boxShadow: '0 30px 60px rgba(0, 0, 0, 0.6)',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}
            >
              {/* Close Button */}
              <button 
                onClick={() => setShowChallengeModal(false)}
                style={{
                  position: 'absolute',
                  top: '18px',
                  right: '18px',
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-secondary)',
                  cursor: 'pointer',
                  fontSize: '1.2rem',
                  zIndex: 10
                }}
              >
                ✕
              </button>

              {/* Header HUD */}
              <div style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '14px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Clock size={16} style={{ color: 'var(--accent-purple)' }} />
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: '600', letterSpacing: '0.05em' }}>
                  MEMORY FLASH CHALLENGE
                </span>
              </div>

              {/* Stage 1: Memorization */}
              {stage === 'memorize' && (
                <div>
                  <h4 style={{ color: '#fff', fontSize: '1.1rem', fontWeight: '600', marginBottom: '14px', textAlign: 'center' }}>
                    Memorize these 4 technologies!
                  </h4>
                  
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '20px',
                    marginBottom: '24px'
                  }}>
                    {selectedTechs.map((tech, idx) => {
                      const Icon = tech.icon;
                      const positions = ['Top-Left', 'Top-Right', 'Bottom-Left', 'Bottom-Right'];
                      return (
                        <motion.div
                          key={tech.name}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: idx * 0.1 }}
                          className="glass"
                          style={{
                            padding: '20px',
                            borderRadius: '16px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '12px',
                            position: 'relative',
                            height: '120px',
                            border: '1px solid var(--glass-border)',
                            boxShadow: `0 0 15px ${tech.color}15`
                          }}
                        >
                          <span style={{
                            position: 'absolute',
                            top: '8px',
                            left: '8px',
                            fontSize: '0.6rem',
                            color: 'var(--text-secondary)',
                            fontWeight: '600',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em'
                          }}>
                            {positions[idx]}
                          </span>
                          <div style={{ color: tech.color, display: 'flex', alignItems: 'center' }}>
                            <Icon size={40} />
                          </div>
                          <span style={{ color: '#fff', fontSize: '0.9rem', fontWeight: '500' }}>
                            {tech.name}
                          </span>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Countdown bar */}
                  <div style={{ width: '100%', background: 'rgba(255,255,255,0.05)', height: '4px', borderRadius: '2px', overflow: 'hidden' }}>
                    <motion.div
                      key={selectedTechs.map(t => t.name).join('-')} // Force re-render on retry
                      initial={{ width: '100%' }}
                      animate={{ width: '0%' }}
                      transition={{ duration: 4, ease: 'linear' }}
                      style={{ height: '100%', background: 'var(--accent-purple)', borderRadius: '2px' }}
                    />
                  </div>
                </div>
              )}

              {/* Stage 2: Question */}
              {stage === 'question' && question && (
                <div>
                  <h4 style={{ color: '#fff', fontSize: '1.1rem', fontWeight: '600', marginBottom: '8px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                    <HelpCircle size={18} style={{ color: 'var(--accent-purple)' }} />
                    Question
                  </h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '20px', textAlign: 'center' }}>
                    {question.text}
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {question.options.map((option) => (
                      <button
                        key={option}
                        onClick={() => handleAnswerClick(option)}
                        className="glass"
                        style={{
                          width: '100%',
                          padding: '14px',
                          borderRadius: '12px',
                          border: '1px solid var(--glass-border)',
                          color: '#fff',
                          textAlign: 'left',
                          fontSize: '0.95rem',
                          fontWeight: '500',
                          cursor: 'pointer',
                          backgroundColor: 'rgba(255, 255, 255, 0.02)',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                          e.currentTarget.style.borderColor = 'var(--accent-purple)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.02)';
                          e.currentTarget.style.borderColor = 'var(--glass-border)';
                        }}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Stage 3: Success */}
              {stage === 'success' && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px 0', textAlign: 'center' }}>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.2, 1] }}
                    transition={{ duration: 0.5 }}
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(16, 185, 129, 0.1)',
                      border: '2px solid #10b981',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#10b981',
                      marginBottom: '16px',
                      boxShadow: '0 0 20px rgba(16, 185, 129, 0.4)'
                    }}
                  >
                    <CheckCircle2 size={32} />
                  </motion.div>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: '700', color: '#fff', marginBottom: '8px' }}>
                    ✅ Memory Check Passed
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                    🚀 Projects Unlocked
                  </p>
                </div>
              )}

              {/* Stage 4: Failure */}
              {stage === 'failure' && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px 0', textAlign: 'center' }}>
                  <motion.div
                    animate={{ x: [-8, 8, -8, 8, 0] }}
                    transition={{ duration: 0.4 }}
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(239, 68, 68, 0.1)',
                      border: '2px solid #ef4444',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#ef4444',
                      marginBottom: '16px',
                      boxShadow: '0 0 20px rgba(239, 68, 68, 0.4)'
                    }}
                  >
                    <span style={{ fontSize: '2rem', fontWeight: '300', lineHeight: 1 }}>✕</span>
                  </motion.div>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: '700', color: '#fff', marginBottom: '8px' }}>
                    ❌ Incorrect Answer
                  </h3>
                  <button 
                    onClick={handleRetry}
                    className="btn-primary"
                    style={{ 
                      marginTop: '16px', 
                      padding: '10px 24px', 
                      fontSize: '0.9rem',
                      boxShadow: '0 0 15px rgba(139, 92, 246, 0.4)'
                    }}
                  >
                    Try Again
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
