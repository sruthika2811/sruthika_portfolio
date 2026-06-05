import { motion } from 'framer-motion';

const BackgroundEffects = () => {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none" style={{ position: 'fixed', inset: 0, zIndex: -1, overflow: 'hidden', pointerEvents: 'none' }}>
      {/* Top Left Orb */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: 'absolute',
          top: '-20%',
          left: '-10%',
          width: '50vw',
          height: '50vw',
          background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, rgba(11,14,20,0) 70%)',
          borderRadius: '50%',
          filter: 'blur(60px)',
        }}
      />

      {/* Bottom Right Orb */}
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        style={{
          position: 'absolute',
          bottom: '-20%',
          right: '-10%',
          width: '60vw',
          height: '60vw',
          background: 'radial-gradient(circle, rgba(236,72,153,0.1) 0%, rgba(11,14,20,0) 70%)',
          borderRadius: '50%',
          filter: 'blur(80px)',
        }}
      />
      
      {/* Subtle Grid overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
        opacity: 0.5
      }} />
    </div>
  );
};

export default BackgroundEffects;
