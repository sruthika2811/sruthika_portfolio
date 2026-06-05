import { motion } from 'framer-motion';
import { Code, Puzzle, BookOpen, Target, ArrowRight } from 'lucide-react';

const cards = [
  {
    title: 'Clean Code',
    desc: 'Writing maintainable, efficient and scalable code with best practices.',
    icon: Code,
    color: '#8b5cf6', // purple
    shadow: 'neon-glow-purple'
  },
  {
    title: 'Problem Solver',
    desc: 'Loves solving problems with logic, creativity and persistence.',
    icon: Puzzle,
    color: '#ec4899', // pink
    shadow: 'neon-glow-pink'
  },
  {
    title: 'Always Learning',
    desc: 'Exploring new technologies and continuously improving to build better solutions.',
    icon: BookOpen,
    color: '#3b82f6', // blue
    shadow: 'neon-glow-blue'
  },
  {
    title: 'Goal Oriented',
    desc: 'Focused on building impactful projects and achieving meaningful goals.',
    icon: Target,
    color: '#f59e0b', // amber
    shadow: 'neon-glow-amber'
  }
];

const FeatureCards = () => {
  return (
    <section className="feature-cards">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + (index * 0.1) }}
            className="glass feature-card"
            style={{ 
              '--hover-color': card.color,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = `0 0 20px ${card.color}40`;
              e.currentTarget.style.borderColor = `${card.color}80`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 8px 32px 0 rgba(0, 0, 0, 0.37)';
              e.currentTarget.style.borderColor = 'var(--glass-border)';
            }}
          >
            {/* Top accent line */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '2px', background: `linear-gradient(90deg, transparent, ${card.color}, transparent)`, opacity: 0.5 }} />
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '8px' }}>
              <div style={{ 
                width: '48px', 
                height: '48px', 
                borderRadius: '12px', 
                backgroundColor: `${card.color}20`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: card.color,
                boxShadow: `0 0 15px ${card.color}40`
              }}>
                <Icon size={24} />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '600' }}>{card.title}</h3>
            </div>
            
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.5', flex: 1 }}>
              {card.desc}
            </p>

            <div style={{ alignSelf: 'flex-end', marginTop: '16px' }}>
              <div style={{ 
                width: '32px', 
                height: '32px', 
                borderRadius: '50%', 
                backgroundColor: 'var(--glass-bg)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-secondary)',
                transition: 'all 0.3s'
              }} className="card-arrow">
                <ArrowRight size={16} />
              </div>
            </div>
          </motion.div>
        );
      })}
    </section>
  );
};

export default FeatureCards;
