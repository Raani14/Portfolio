import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import axios from 'axios';
import { portfolioData } from '../data/portfolioData';

const inputClass = `w-full bg-slate-900/60 border border-slate-700/60 rounded-xl px-4 py-3.5 text-white placeholder-slate-600
  focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/60
  transition-all duration-200`;

export default function Contact() {
  const { socials } = portfolioData.hero;
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');
    try {
      const res = await axios.post('http://localhost:5000/api/contact', formData);
      if (res.data.success) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      }
    } catch (err) {
      setStatus('error');
      setErrorMessage(err.response?.data?.error || 'Something went wrong. Please try again.');
    }
  };

  return (
    <section id="contact" className="py-28 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-slate-900" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_100%,rgba(59,130,246,0.08),transparent)] pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="text-blue-500 text-sm font-semibold tracking-widest uppercase mb-3 block">
            Get In Touch
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Have an idea? Let's build it.</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-violet-500 rounded-full mx-auto mb-6" />
          <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Have a project, opportunity, or idea? I'd love to hear about it.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Left - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-2"
          >
            <div className="bg-slate-800/40 border border-slate-700/50 p-8 rounded-3xl h-full backdrop-blur-sm flex flex-col">
              <h3 className="text-xl font-bold text-white mb-8">Contact Information</h3>

              <div className="space-y-5 flex-grow">
                {[
                  { href: `mailto:${socials.email}`, icon: Mail, label: 'Email', value: socials.email, color: 'blue' },
                  { href: `tel:${socials.phone}`, icon: Phone, label: 'Phone', value: socials.phone, color: 'green' },
                ].map(({ href, icon: Icon, label, value, color }) => (
                  <a key={label} href={href} className={`flex items-start gap-4 group`}>
                    <div className={`w-12 h-12 bg-${color}-500/10 rounded-xl flex items-center justify-center border border-${color}-500/20 group-hover:bg-${color}-500/20 transition-colors flex-shrink-0`}>
                      <Icon className={`w-5 h-5 text-${color}-400`} />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-0.5">{label}</p>
                      <p className={`text-slate-200 group-hover:text-${color}-400 transition-colors text-sm`}>{value}</p>
                    </div>
                  </a>
                ))}

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center border border-purple-500/20 flex-shrink-0">
                    <MapPin className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-0.5">Location</p>
                    <p className="text-slate-200 text-sm">Nashik, Maharashtra, India</p>
                  </div>
                </div>
              </div>

              {/* Social links */}
              <div className="mt-10 pt-8 border-t border-slate-700/50">
                <p className="text-xs text-slate-500 uppercase tracking-widest mb-4">Find me on</p>
                <div className="flex gap-4">
                  <a href={socials.github} target="_blank" rel="noreferrer"
                    className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
                    aria-label="GitHub">
                    <FaGithub size={18} /> GitHub
                  </a>
                  <a href={socials.linkedin} target="_blank" rel="noreferrer"
                    className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
                    aria-label="LinkedIn">
                    <FaLinkedin size={18} /> LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right - Form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <div className="bg-slate-800/40 border border-slate-700/50 p-8 rounded-3xl backdrop-blur-sm">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label htmlFor="contact-name" className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Full Name *</label>
                    <input type="text" id="contact-name" name="name" required value={formData.name} onChange={handleChange} className={inputClass} placeholder="John Doe" />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="contact-email" className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Email *</label>
                    <input type="email" id="contact-email" name="email" required value={formData.email} onChange={handleChange} className={inputClass} placeholder="john@example.com" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label htmlFor="contact-phone" className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Phone</label>
                    <input type="tel" id="contact-phone" name="phone" value={formData.phone} onChange={handleChange} className={inputClass} placeholder="+91 XXXXX XXXXX" />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="contact-subject" className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Subject *</label>
                    <input type="text" id="contact-subject" name="subject" required value={formData.subject} onChange={handleChange} className={inputClass} placeholder="Project Inquiry" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="contact-message" className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Message *</label>
                  <textarea id="contact-message" name="message" required rows="5" value={formData.message} onChange={handleChange} className={`${inputClass} resize-none`} placeholder="Tell me about your project or idea..." />
                </div>

                {/* Status messages */}
                <AnimatePresence mode="wait">
                  {status === 'error' && (
                    <motion.div key="error" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                      className="p-4 bg-red-500/10 border border-red-500/25 rounded-xl flex items-start gap-3 text-red-400">
                      <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                      <p className="text-sm">{errorMessage}</p>
                    </motion.div>
                  )}
                  {status === 'success' && (
                    <motion.div key="success" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                      className="p-4 bg-green-500/10 border border-green-500/25 rounded-xl flex items-start gap-3 text-green-400">
                      <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
                      <p className="text-sm">Thank you! Your message has been sent successfully. I'll get back to you soon.</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.button
                  type="submit"
                  disabled={status === 'loading' || status === 'success'}
                  whileHover={status === 'idle' ? { scale: 1.01 } : {}}
                  whileTap={status === 'idle' ? { scale: 0.99 } : {}}
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-2.5 transition-colors disabled:opacity-60 disabled:cursor-not-allowed shadow-[0_0_24px_rgba(37,99,235,0.25)]"
                >
                  {status === 'loading' ? (
                    <><Loader2 className="w-5 h-5 animate-spin" /> Sending...</>
                  ) : status === 'success' ? (
                    <><CheckCircle2 className="w-5 h-5" /> Message Sent</>
                  ) : (
                    <><Send className="w-5 h-5" /> Send Message</>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
