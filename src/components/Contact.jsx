import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, MapPin, Mail, Calendar } from 'lucide-react';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const [formData, setFormData] = useState({
    sender_name: '',
    sender_email: '',
    message: ''
  });
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState({ type: null, message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Front-end validation
    if (!formData.sender_name.trim() || !formData.sender_email.trim() || !formData.message.trim()) {
      setStatus({ type: 'error', message: 'All fields are required.' });
      return;
    }

    setIsSending(true);
    setStatus({ type: null, message: '' });

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    // Check if configuration is missing or still contains placeholder values
    if (
      !serviceId || serviceId.includes('your_') ||
      !templateId || templateId.includes('your_') ||
      !publicKey || publicKey.includes('your_')
    ) {
      setStatus({ 
        type: 'error', 
        message: 'Please configure your active EmailJS credentials in the .env file first.' 
      });
      setIsSending(false);
      return;
    }

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          sender_name: formData.sender_name,
          sender_email: formData.sender_email,
          message: formData.message
        },
        {
          publicKey: publicKey
        }
      );

      setStatus({ type: 'success', message: 'Message sent successfully!' });
      setFormData({ sender_name: '', sender_email: '', message: '' });
      
      // Auto-clear success message after 5 seconds
      setTimeout(() => {
        setStatus({ type: null, message: '' });
      }, 5000);
    } catch (error) {
      console.error('EmailJS Error:', error);
      setStatus({ 
        type: 'error', 
        message: 'Failed to send message. Please check your credentials or try again later.' 
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="contact" className="section-container" style={{ paddingBottom: '120px' }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="section-title">
          Contact <span className="text-gradient text-gradient-purple-pink">Me</span>
        </h2>
        <p className="section-subtitle">Have a project, opportunity, or simply want to say hello? Send a message.</p>
      </motion.div>

      <div className="grid-2">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glass"
          style={{ padding: '32px', borderRadius: '20px' }}
        >
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: '500' }}>Name</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="Your Name" 
                required 
                value={formData.sender_name}
                onChange={(e) => setFormData({ ...formData, sender_name: e.target.value })}
                disabled={isSending}
              />
            </div>

            <div className="form-group">
              <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: '500' }}>Email Address</label>
              <input 
                type="email" 
                className="form-input" 
                placeholder="yourname@example.com" 
                required 
                value={formData.sender_email}
                onChange={(e) => setFormData({ ...formData, sender_email: e.target.value })}
                disabled={isSending}
              />
            </div>

            <div className="form-group">
              <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: '500' }}>Message</label>
              <textarea 
                className="form-input" 
                rows="4" 
                placeholder="Your message..." 
                required 
                style={{ resize: 'none' }}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                disabled={isSending}
              ></textarea>
            </div>

            <button 
              className="btn-primary" 
              type="submit"
              disabled={isSending}
              style={{ 
                width: '100%', 
                justifyContent: 'center', 
                marginTop: '12px',
                opacity: isSending ? 0.7 : 1,
                cursor: isSending ? 'not-allowed' : 'pointer'
              }}
            >
              {isSending ? 'Sending...' : 'Send Message'} <Send size={16} />
            </button>

            {/* Notification message box */}
            <AnimatePresence>
              {status.message && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  style={{
                    marginTop: '16px',
                    padding: '12px',
                    borderRadius: '8px',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    textAlign: 'center',
                    backgroundColor: status.type === 'success' ? 'rgba(16, 185, 129, 0.08)' : 'rgba(239, 68, 68, 0.08)',
                    border: status.type === 'success' ? '1px solid rgba(16, 185, 129, 0.25)' : '1px solid rgba(239, 68, 68, 0.25)',
                    color: status.type === 'success' ? '#10b981' : '#ef4444',
                    boxShadow: status.type === 'success' ? '0 0 10px rgba(16, 185, 129, 0.1)' : '0 0 10px rgba(239, 68, 68, 0.1)'
                  }}
                >
                  {status.message}
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
        >
          <div className="glass" style={{ padding: '24px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ color: 'var(--accent-purple)' }}>
              <Mail size={24} />
            </div>
            <div>
              <h4 style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: '500' }}>Direct Email</h4>
              <a href="mailto:sruthikapaladhi28@gmail.com" style={{ fontSize: '1rem', color: '#fff', textDecoration: 'none', fontWeight: '500' }}>
                sruthikapaladhi28@gmail.com
              </a>
            </div>
          </div>

          <div className="glass" style={{ padding: '24px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ color: 'var(--accent-blue)' }}>
              <MapPin size={24} />
            </div>
            <div>
              <h4 style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: '500' }}>Location</h4>
              <span style={{ fontSize: '1rem', color: '#fff', fontWeight: '500' }}>India</span>
            </div>
          </div>

          <div className="glass" style={{ padding: '24px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ color: 'var(--accent-pink)' }}>
              <Calendar size={24} />
            </div>
            <div>
              <h4 style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: '500' }}>Working Style</h4>
              <span style={{ fontSize: '1rem', color: '#fff', fontWeight: '500' }}>Full-time / Remote / Freelance</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
