import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Layout,
  Code2,
  Wrench,
  Database,
  BrainCircuit,
  Cpu,
  Lock,
  Unlock,
  CheckCircle2,
  RefreshCw
} from "lucide-react";
import { FaReact, FaPython, FaGitAlt, FaJava, FaAws } from 'react-icons/fa';
import { SiMysql } from 'react-icons/si';

const categories = [
  {
    title: 'Frontend Development',
    icon: Layout,
    color: '#8b5cf6', // Purple
    skills: ['HTML5', 'CSS3', 'JavaScript', 'React.js', 'Responsive Design']
  },
  {
    title: 'Programming Languages',
    icon: Code2,
    color: '#3b82f6', // Blue
    skills: ['Python', 'Java', 'C']
  },
  {
    title: 'Tools & Platforms',
    icon: Wrench,
    color: '#ec4899', // Pink
    skills: ['Git', 'GitHub', 'VS Code', 'Jupyter Notebook', 'Vercel', 'Netlify']
  },
  {
    title: 'Databases',
    icon: Database,
    color: '#10b981', // Green
    skills: ['MySQL', 'SQL Queries', 'Database Design']
  },
  {
    title: 'Core Concepts',
    icon: BrainCircuit,
    color: '#f59e0b', // Amber/Gold
    skills: ['Data Structures & Algorithms', 'Object-Oriented Programming', 'Problem Solving']
  },
  {
    title: 'AI & Cloud',
    icon: Cpu,
    color: '#06b6d4', // Cyan
    skills: ['Machine Learning Basics', 'Generative AI', 'AWS Basics', 'Cloud Computing']
  }
];

// Master Technology Pool (6 items)
const masterPool = [
  { id: 'react', name: 'React.js', icon: FaReact, color: '#61dafb' },
  { id: 'python', name: 'Python', icon: FaPython, color: '#3776ab' },
  { id: 'git', name: 'Git', icon: FaGitAlt, color: '#f05032' },
  { id: 'mysql', name: 'MySQL', icon: SiMysql, color: '#00758f' },
  { id: 'java', name: 'Java', icon: FaJava, color: '#e76f51' },
  { id: 'aws', name: 'AWS', icon: FaAws, color: '#ff9900' }
];

// Fisher-Yates Shuffle Algorithm
const shuffleArray = (array) => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

// Reveal variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { 
      type: 'spring', 
      stiffness: 100, 
      damping: 15 
    } 
  }
};

const Skills = () => {
  const [unlocked, setUnlocked] = useState(false);
  const [showChallengeModal, setShowChallengeModal] = useState(false);

  useEffect(() => {
    const isSavedUnlocked = localStorage.getItem('skills_unlocked') === 'true';
    if (isSavedUnlocked) setUnlocked(true);
  }, []);

  // States for active puzzle selection
  const [activeChallengePool, setActiveChallengePool] = useState([]);
  const [shuffledLogos, setShuffledLogos] = useState([]);
  const [shuffledTargets, setShuffledTargets] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [selectedLogo, setSelectedLogo] = useState(null);
  const [selectedTarget, setSelectedTarget] = useState(null);
  
  // Feedback states
  const [shakeLogoId, setShakeLogoId] = useState(null);
  const [errorTargetId, setErrorTargetId] = useState(null);
  const [showUnlockScreen, setShowUnlockScreen] = useState(false);
  const [particles, setParticles] = useState([]);
  const [lines, setLines] = useState([]);

  // Skills cards hover states
  const [hoveredCard, setHoveredCard] = useState(null);
  const [hoveredSkill, setHoveredSkill] = useState(null);

  const skillsContainerRef = useRef(null);
  const puzzleContainerRef = useRef(null);

  // Randomly select 4 out of 6 items, then shuffle logos and names
  const initializePuzzle = () => {
    // 1. Shuffle master pool
    const shuffledPool = shuffleArray(masterPool);
    
    // 2. Select first 4
    const selected4 = shuffledPool.slice(0, 4);
    setActiveChallengePool(selected4);

    // 3. Shuffle logos and names independently
    let logos = shuffleArray(selected4);
    let targets = shuffleArray(selected4);
    
    // Minimize direct matches
    let matchesCount = 0;
    for (let i = 0; i < logos.length; i++) {
      if (logos[i].id === targets[i].id) {
        matchesCount++;
      }
    }
    if (matchesCount > 1) {
      targets = shuffleArray(selected4);
    }

    setShuffledLogos(logos);
    setShuffledTargets(targets);
    setMatchedPairs([]);
    setSelectedLogo(null);
    setSelectedTarget(null);
    setShakeLogoId(null);
    setErrorTargetId(null);
    setLines([]);
  };

  useEffect(() => {
    if (showChallengeModal) {
      initializePuzzle();
    }
  }, [showChallengeModal]);

  // Handle connection line coordinate updates
  const updateLines = () => {
    const puzzleContainer = document.getElementById('puzzle-container');
    if (!puzzleContainer) return;
    const containerRect = puzzleContainer.getBoundingClientRect();
    
    const newLines = [];
    matchedPairs.forEach(techId => {
      const logoEl = document.querySelector(`[data-matched-logo="${techId}"]`);
      const targetEl = document.querySelector(`[data-target-tech="${techId}"]`);
      
      if (logoEl && targetEl) {
        const logoRect = logoEl.getBoundingClientRect();
        const targetRect = targetEl.getBoundingClientRect();
        
        const isStacked = logoRect.bottom < targetRect.top;
        let x1, y1, x2, y2;
        
        if (isStacked) {
          x1 = logoRect.left + logoRect.width / 2 - containerRect.left;
          y1 = logoRect.bottom - containerRect.top;
          x2 = targetRect.left + targetRect.width / 2 - containerRect.left;
          y2 = targetRect.top - containerRect.top;
        } else {
          x1 = logoRect.right - containerRect.left;
          y1 = logoRect.top + logoRect.height / 2 - containerRect.top;
          x2 = targetRect.left - containerRect.left;
          y2 = targetRect.top + targetRect.height / 2 - containerRect.top;
        }
        
        const color = masterPool.find(item => item.id === techId)?.color || '#fff';
        newLines.push({ techId, x1, y1, x2, y2, color });
      }
    });
    setLines(newLines);
  };

  useEffect(() => {
    const timer = setTimeout(updateLines, 80);
    return () => clearTimeout(timer);
  }, [matchedPairs]);

  useEffect(() => {
    if (showChallengeModal) {
      window.addEventListener('resize', updateLines);
      window.addEventListener('scroll', updateLines);
    }
    return () => {
      window.removeEventListener('resize', updateLines);
      window.removeEventListener('scroll', updateLines);
    };
  }, [matchedPairs, showChallengeModal]);

  // Trigger particle burst on match
  const triggerParticles = (techId, color) => {
    const targetElement = document.querySelector(`[data-target-tech="${techId}"]`);
    if (targetElement) {
      const rect = targetElement.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      
      const newParticles = Array.from({ length: 15 }).map((_, i) => ({
        id: Math.random(),
        x,
        y,
        color,
        angle: (i * 360) / 15 + Math.random() * 20,
        speed: 2 + Math.random() * 4
      }));

      setParticles(prev => [...prev, ...newParticles]);
      setTimeout(() => {
        setParticles(prev => prev.filter(p => !newParticles.includes(p)));
      }, 1000);
    }
  };

  // Process Match logic
  const handleMatch = (techId) => {
    if (matchedPairs.includes(techId)) return;
    
    const matchedColor = masterPool.find(item => item.id === techId)?.color || '#10b981';
    const nextMatches = [...matchedPairs, techId];
    
    setMatchedPairs(nextMatches);
    triggerParticles(techId, matchedColor);
    
    // Clear selections
    setSelectedLogo(null);
    setSelectedTarget(null);

    // If 4 pairs matched, play final unlock sequence
    if (nextMatches.length === 4) {
      setShowUnlockScreen(true);
      setTimeout(() => {
        setShowChallengeModal(false);
        setUnlocked(true);
        localStorage.setItem('skills_unlocked', 'true');
        setShowUnlockScreen(false);
        
        // Success effect trigger (Global burst)
        const element = skillsContainerRef.current;
        if (element) {
          const rect = element.getBoundingClientRect();
          const cx = window.innerWidth / 2;
          const cy = rect.top + 100;
          const endParticles = Array.from({ length: 30 }).map((_, i) => ({
            id: Math.random(),
            x: cx,
            y: cy,
            color: i % 2 === 0 ? 'var(--accent-purple)' : 'var(--accent-pink)',
            angle: (i * 360) / 30 + Math.random() * 10,
            speed: 3 + Math.random() * 5
          }));
          setParticles(prev => [...prev, ...endParticles]);
          setTimeout(() => {
            setParticles(prev => prev.filter(p => !endParticles.includes(p)));
          }, 1000);
        }

        setTimeout(() => {
          skillsContainerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 150);
      }, 1500);
    }
  };

  // Mismatch logic
  const handleMismatch = (logoId, targetId) => {
    setShakeLogoId(logoId);
    setErrorTargetId(targetId);
    
    // Clear selections
    setSelectedLogo(null);
    setSelectedTarget(null);

    setTimeout(() => {
      setShakeLogoId(null);
      setErrorTargetId(null);
    }, 800);
  };

  // Tap interaction matching
  const handleLogoTap = (logoId) => {
    if (matchedPairs.includes(logoId)) return;
    
    if (selectedTarget) {
      if (selectedTarget === logoId) {
        handleMatch(logoId);
      } else {
        handleMismatch(logoId, selectedTarget);
      }
    } else {
      setSelectedLogo(logoId);
    }
  };

  const handleTargetTap = (targetId) => {
    if (matchedPairs.includes(targetId)) return;
    
    if (selectedLogo) {
      if (selectedLogo === targetId) {
        handleMatch(targetId);
      } else {
        handleMismatch(selectedLogo, targetId);
      }
    } else {
      setSelectedTarget(targetId);
    }
  };

  // Framer Motion Drag and Drop handler
  const handleDragEnd = (event, info, logoId) => {
    if (matchedPairs.includes(logoId)) return;

    const draggedElement = event.target.closest('[data-draggable-tech]');
    if (draggedElement) {
      const originalPointerEvents = draggedElement.style.pointerEvents;
      draggedElement.style.pointerEvents = 'none';
      
      const elemUnderPointer = document.elementFromPoint(info.point.x, info.point.y);
      draggedElement.style.pointerEvents = originalPointerEvents;
      
      const targetCard = elemUnderPointer?.closest('[data-target-tech]');
      if (targetCard) {
        const targetId = targetCard.getAttribute('data-target-tech');
        if (targetId === logoId) {
          handleMatch(logoId);
        } else {
          handleMismatch(logoId, targetId);
        }
      }
    }
  };

  const performUnlock = () => {
    setUnlocked(true);
    localStorage.setItem('skills_unlocked', 'true');
    setTimeout(() => {
      skillsContainerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  return (
    <section id="skills" className="section-container" ref={skillsContainerRef} style={{ position: 'relative' }}>
      {/* Particle Layer */}
      {particles.map(p => (
        <motion.div
          key={p.id}
          style={{
            position: 'fixed',
            left: p.x,
            top: p.y,
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: p.color,
            boxShadow: `0 0 8px ${p.color}`,
            pointerEvents: 'none',
            zIndex: 9999
          }}
          initial={{ scale: 1, opacity: 1 }}
          animate={{
            x: Math.cos((p.angle * Math.PI) / 180) * 100 * p.speed * 0.4,
            y: Math.sin((p.angle * Math.PI) / 180) * 100 * p.speed * 0.4,
            scale: 0,
            opacity: 0
          }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      ))}

      {/* Section Header */}
      <div>
        <h2 className="section-title">
          Skills & <span className="text-gradient text-gradient-purple-pink">Technologies</span>
        </h2>
        <p className="section-subtitle">
          Technologies, tools, and concepts I use to build modern software solutions.
        </p>
      </div>

      {/* Grid container with lock overlays */}
      <div style={{ position: 'relative', marginTop: '40px' }}>
        
        {/* Skills Cards Grid - blurred when locked */}
        <div style={{ 
          filter: unlocked ? 'none' : 'blur(14px)', 
          opacity: unlocked ? 1 : 0.12,
          transition: 'filter 0.8s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.8s cubic-bezier(0.25, 1, 0.5, 1)', 
          pointerEvents: unlocked ? 'auto' : 'none',
          userSelect: unlocked ? 'auto' : 'none'
        }}>
          <motion.div 
            className="skills-grid"
            variants={containerVariants}
            initial="hidden"
            animate={unlocked ? "visible" : "hidden"}
          >
            {categories.map((cat, idx) => {
              const Icon = cat.icon;
              const isCardHovered = hoveredCard === idx;

              return (
                <motion.div
                  key={cat.title}
                  variants={cardVariants}
                  className="glass"
                  style={{
                    padding: '30px',
                    borderRadius: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '24px',
                    height: '100%',
                    cursor: 'default',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), border-color 0.4s, box-shadow 0.4s',
                    transform: isCardHovered ? 'translateY(-6px)' : 'none',
                    borderColor: isCardHovered ? cat.color : 'var(--glass-border)',
                    boxShadow: isCardHovered 
                      ? `0 10px 30px -10px ${cat.color}35, 0 0 15px ${cat.color}20` 
                      : '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
                  }}
                  onMouseEnter={() => setHoveredCard(idx)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div 
                    style={{
                      position: 'absolute',
                      top: '-15%',
                      right: '-15%',
                      width: '120px',
                      height: '120px',
                      borderRadius: '50%',
                      background: `radial-gradient(circle, ${cat.color}25 0%, transparent 70%)`,
                      pointerEvents: 'none',
                      transition: 'opacity 0.4s ease',
                      opacity: isCardHovered ? 1 : 0.4
                    }}
                  />

                  {/* Header */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ 
                      width: '52px', 
                      height: '52px', 
                      borderRadius: '14px', 
                      backgroundColor: isCardHovered ? `${cat.color}25` : `${cat.color}15`,
                      border: isCardHovered ? `1px solid ${cat.color}50` : '1px solid rgba(255, 255, 255, 0.05)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: cat.color,
                      transition: 'all 0.4s ease',
                      boxShadow: isCardHovered ? `0 0 15px ${cat.color}40` : 'none',
                      transform: isCardHovered ? 'scale(1.05) rotate(5deg)' : 'none'
                    }}>
                      <Icon size={26} style={{ filter: isCardHovered ? `drop-shadow(0 0 4px ${cat.color})` : 'none', transition: 'all 0.3s ease' }} />
                    </div>
                    <h3 style={{ 
                      fontSize: '1.25rem', 
                      fontWeight: '600', 
                      color: '#fff',
                      letterSpacing: '-0.01em',
                      transition: 'color 0.3s ease'
                    }}>{cat.title}</h3>
                  </div>

                  {/* Skills tags */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: 'auto' }}>
                    {cat.skills.map((skill) => {
                      const skillKey = `${cat.title}-${skill}`;
                      const isSkillHovered = hoveredSkill === skillKey;

                      return (
                        <motion.span
                          key={skill}
                          onMouseEnter={() => setHoveredSkill(skillKey)}
                          onMouseLeave={() => setHoveredSkill(null)}
                          style={{
                            fontSize: '0.82rem',
                            padding: '6px 14px',
                            borderRadius: '30px',
                            backgroundColor: isSkillHovered ? `${cat.color}15` : 'rgba(255, 255, 255, 0.02)',
                            border: '1px solid var(--glass-border)',
                            borderColor: isSkillHovered ? cat.color : 'rgba(255, 255, 255, 0.08)',
                            color: isSkillHovered ? '#fff' : 'var(--text-secondary)',
                            cursor: 'default',
                            fontWeight: '500',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
                            transform: isSkillHovered ? 'scale(1.06)' : 'none',
                            boxShadow: isSkillHovered ? `0 0 12px ${cat.color}45` : 'none'
                          }}
                        >
                          {skill}
                        </motion.span>
                      );
                    })}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
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
                  maxWidth: '380px',
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
                  backgroundColor: 'rgba(236, 72, 153, 0.1)',
                  border: '1px solid var(--accent-pink)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--accent-pink)',
                  boxShadow: '0 0 15px rgba(236, 72, 153, 0.3)'
                }}>
                  <Lock size={28} />
                </div>
                <h3 style={{ fontSize: '1.45rem', fontWeight: '700', color: '#fff', margin: 0 }}>
                  🔒 Skills Locked
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', margin: 0, lineHeight: '1.5' }}>
                  Solve a quick challenge to unlock this section.
                </p>
                <button 
                  onClick={() => setShowChallengeModal(true)}
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
                  onClick={performUnlock}
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

      {/* Modal Popup with matching game */}
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
              backgroundColor: 'rgba(11, 14, 20, 0.88)',
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
              ref={puzzleContainerRef}
              id="puzzle-container"
              style={{
                width: '100%',
                maxWidth: '680px',
                padding: '35px 30px',
                borderRadius: '24px',
                position: 'relative',
                overflow: 'visible',
                boxShadow: '0 30px 60px rgba(0, 0, 0, 0.6)',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}
            >
              {/* SVG connection lines */}
              <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }}>
                {lines.map(line => {
                  const dx = Math.abs(line.x2 - line.x1) * 0.45;
                  const path = `M ${line.x1} ${line.y1} C ${line.x1 + dx} ${line.y1}, ${line.x2 - dx} ${line.y2}, ${line.x2} ${line.y2}`;
                  return (
                    <g key={line.techId}>
                      <motion.path
                        d={path}
                        stroke={line.color}
                        strokeWidth="5"
                        fill="none"
                        opacity="0.22"
                        style={{ filter: 'blur(3px)' }}
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                      />
                      <motion.path
                        d={path}
                        stroke={line.color}
                        strokeWidth="2.5"
                        fill="none"
                        opacity="0.85"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                      />
                    </g>
                  );
                })}
              </svg>

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
                  zIndex: 10,
                  transition: 'color 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.color = '#fff'}
                onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}
              >
                ✕
              </button>

              {/* HUD */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 3, borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '14px', marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Lock size={16} style={{ color: 'var(--accent-pink)', filter: 'drop-shadow(0 0 3px rgba(236,72,153,0.4))' }} />
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: '600', letterSpacing: '0.05em' }}>
                    MATCH 4 TECHNOLOGIES
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <span style={{ fontSize: '0.85rem', color: '#fff', fontWeight: '500' }}>
                    Progress: <span style={{ color: '#10b981' }}>{matchedPairs.length}</span>/4
                  </span>
                  <button 
                    onClick={initializePuzzle}
                    className="glass"
                    style={{ 
                      padding: '6px', 
                      borderRadius: '6px', 
                      cursor: 'pointer', 
                      color: 'var(--text-secondary)',
                      display: 'flex',
                      alignItems: 'center',
                      border: '1px solid var(--glass-border)'
                    }}
                  >
                    <RefreshCw size={12} />
                  </button>
                </div>
              </div>

              {/* Matching Columns Grid */}
              <div 
                style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
                  gap: '40px', 
                  zIndex: 2, 
                  position: 'relative'
                }}
              >
                {/* Column 1: Technology Logos (Large Floating Cards, Only Icon Visible) */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-secondary)', letterSpacing: '0.05em', marginBottom: '2px' }}>
                    DRAG OR CLICK LOGO
                  </span>

                  {shuffledLogos.map((item, idx) => {
                    const isMatched = matchedPairs.includes(item.id);
                    const isSelected = selectedLogo === item.id;
                    const Icon = item.icon;
                    
                    return (
                      <div key={item.id} style={{ position: 'relative' }}>
                        {isMatched ? (
                          // Matched Locked Card
                          <div
                            data-matched-logo={item.id}
                            style={{
                              height: '105px',
                              borderRadius: '16px',
                              border: `1px solid ${item.color}35`,
                              background: 'rgba(255,255,255,0.01)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              opacity: 0.35,
                              cursor: 'not-allowed'
                            }}
                          >
                            <div style={{ color: item.color }}>
                              <Icon size={38} />
                            </div>
                          </div>
                        ) : (
                          // Interactive Floating Card (Name labels removed)
                          <motion.div
                            data-draggable-tech={item.id}
                            drag
                            dragSnapToOrigin
                            whileDrag={{ scale: 1.08, zIndex: 100 }}
                            onDragEnd={(e, info) => handleDragEnd(e, info, item.id)}
                            onClick={() => handleLogoTap(item.id)}
                            animate={
                              shakeLogoId === item.id 
                                ? { x: [-8, 8, -8, 8, 0], transition: { duration: 0.4 } } 
                                : { y: [0, -5, 0] }
                            }
                            transition={
                              shakeLogoId === item.id 
                                ? {} 
                                : {
                                    duration: 3 + (idx * 0.4),
                                    repeat: Infinity,
                                    ease: 'easeInOut'
                                  }
                            }
                            style={{
                              height: '105px',
                              borderRadius: '16px',
                              border: isSelected 
                                ? `1px solid ${item.color}` 
                                : '1px solid var(--glass-border)',
                              background: isSelected 
                                ? `radial-gradient(circle at center, ${item.color}15 0%, rgba(255,255,255,0.01) 80%)` 
                                : 'rgba(255, 255, 255, 0.02)',
                              boxShadow: isSelected 
                                ? `0 0 20px ${item.color}25` 
                                : 'none',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              cursor: 'grab',
                              touchAction: 'none',
                              userSelect: 'none',
                              transition: 'border-color 0.3s, background-color 0.3s, box-shadow 0.3s'
                            }}
                            whileHover={{ 
                              scale: 1.05, 
                              borderColor: item.color, 
                              boxShadow: `0 0 15px ${item.color}35`,
                              background: `radial-gradient(circle at center, ${item.color}10 0%, rgba(255,255,255,0.02) 80%)` 
                            }}
                          >
                            <div style={{ 
                              color: item.color, 
                              display: 'flex', 
                              alignItems: 'center',
                              filter: `drop-shadow(0 0 4px ${item.color}50)`
                            }}>
                              <Icon size={44} />
                            </div>
                          </motion.div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Column 2: Technology Names */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-secondary)', letterSpacing: '0.05em', marginBottom: '2px' }}>
                    DROP LOGO OR CLICK NAME
                  </span>

                  {shuffledTargets.map((item) => {
                    const isMatched = matchedPairs.includes(item.id);
                    const isSelected = selectedTarget === item.id;
                    const isError = errorTargetId === item.id;
                    const Icon = item.icon;
                    
                    return (
                      <motion.div
                        key={item.id}
                        data-target-tech={item.id}
                        onClick={() => handleTargetTap(item.id)}
                        animate={
                          isError 
                            ? { scale: [1, 1.02, 1], borderColor: '#ef4444', boxShadow: '0 0 15px rgba(239, 68, 68, 0.3)' } 
                            : isMatched 
                              ? { borderColor: '#10b981', boxShadow: '0 0 15px rgba(16, 185, 129, 0.15)' }
                              : {}
                        }
                        style={{
                          height: '105px',
                          borderRadius: '16px',
                          border: isMatched 
                            ? '1px solid rgba(16, 185, 129, 0.5)' 
                            : isSelected 
                              ? `1px solid ${item.color}`
                              : '1px dashed rgba(255,255,255,0.15)',
                          background: isMatched 
                            ? 'rgba(16, 185, 129, 0.05)' 
                            : isSelected
                              ? `${item.color}08`
                              : 'rgba(255, 255, 255, 0.01)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '0 24px',
                          cursor: isMatched ? 'default' : 'pointer',
                          transition: 'border-color 0.3s, background-color 0.3s'
                        }}
                        whileHover={!isMatched ? { scale: 1.02, borderColor: item.color, background: 'rgba(255,255,255,0.02)' } : {}}
                      >
                        <span style={{ 
                          color: isMatched ? '#fff' : 'var(--text-secondary)', 
                          fontWeight: isMatched ? '600' : '500',
                          fontSize: '0.92rem',
                          letterSpacing: '0.02em'
                        }}>
                          {item.name}
                        </span>

                        {/* Large Slot Ring */}
                        <div style={{
                          width: '46px',
                          height: '46px',
                          borderRadius: '50%',
                          border: isMatched ? 'none' : '1px dashed rgba(255,255,255,0.25)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: isMatched ? '#10b981' : 'rgba(255,255,255,0.15)',
                          backgroundColor: isMatched ? `${item.color}15` : 'transparent',
                          boxShadow: isMatched ? `0 0 10px ${item.color}30` : 'none',
                          transition: 'all 0.3s ease'
                        }}>
                          {isMatched ? <Icon size={24} style={{ color: item.color }} /> : null}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Complete Overlay inside the Modal */}
              <AnimatePresence>
                {showUnlockScreen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      backgroundColor: 'rgba(11, 14, 20, 0.95)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: 10,
                      borderRadius: '24px',
                      padding: '20px',
                      textAlign: 'center',
                      backdropFilter: 'blur(8px)',
                      border: '1px solid rgba(255, 255, 255, 0.1)'
                    }}
                  >
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
                      <CheckCircle2 size={32} style={{ filter: 'drop-shadow(0 0 4px #10b981)' }} />
                    </motion.div>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#fff', marginBottom: '8px' }}>
                      🎉 Skills Unlocked
                    </h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: '340px' }}>
                      Explore my technical expertise and development toolkit.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Skills;
