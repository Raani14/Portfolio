import React from 'react';
import { motion } from 'framer-motion';

const fadeSlide = (dir = 0, delay = 0) => ({
  hidden: { opacity: 0, x: dir, y: dir === 0 ? 20 : 0 },
  visible: {
    opacity: 1, x: 0, y: 0,
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
  },
});

const floatingTags = [
  { label: 'Shopify Dev', color: 'text-green-400 border-green-500/30 bg-green-500/8', pos: 'top-8 -right-4 md:-right-8' },
  { label: 'React.js', color: 'text-blue-400 border-blue-500/30 bg-blue-500/8', pos: '-bottom-2 right-4 md:right-0' },
  { label: 'Python', color: 'text-yellow-400 border-yellow-500/30 bg-yellow-500/8', pos: 'top-1/3 -left-4 md:-left-8' },
  { label: 'AI / ML', color: 'text-violet-400 border-violet-500/30 bg-violet-500/8', pos: 'bottom-20 -left-2 md:-left-6' },
];

export default function About() {
  return (
    <section id="about" className="py-28 border-b border-slate-800/60 relative overflow-hidden">
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-600/4 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          variants={fadeSlide(0, 0)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="mb-16"
        >
          <span className="text-blue-500 text-sm font-semibold tracking-widest uppercase mb-3 block">About Me</span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            About <span className="text-blue-400">Rani Rakesh Gangurde</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-violet-500 rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-5 gap-12 items-start">

          {/* LEFT — Transparent photo (2 cols) */}
          <motion.div
            variants={fadeSlide(-30, 0.15)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="md:col-span-2 relative flex justify-center"
          >
            <div className="relative">
              {/* Gradient backdrop */}
              <div className="absolute inset-x-4 bottom-0 h-3/4 bg-gradient-to-t from-blue-500/10 via-violet-500/5 to-transparent rounded-3xl -z-10" />

              {/* Grid pattern behind */}
              <div
                className="absolute inset-0 opacity-[0.04] rounded-3xl -z-10"
                style={{
                  backgroundImage: 'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)',
                  backgroundSize: '28px 28px',
                }}
              />

              {/* Photo */}
              <img
                src="/images/rani-about.jpg"
                alt="Rani Rakesh Gangurde — Software Developer"
                className="relative z-10 w-60 md:w-72 mx-auto rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] object-cover"
                style={{ aspectRatio: '3/4' }}
                loading="eager"
                decoding="async"
              />

              {/* Floating tags */}
              {floatingTags.map(({ label, color, pos }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.1, type: 'spring', stiffness: 200 }}
                  className={`absolute ${pos} z-20 px-3 py-1.5 rounded-xl border text-xs font-semibold backdrop-blur-md ${color} shadow-lg`}
                >
                  {label}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT — Story text (3 cols) */}
          <div className="md:col-span-3 space-y-6">
            {[
              { delay: 0.15, text: "I'm Rani, a Software Developer from Nashik, India with a passion for building things that look great and work even better. I enjoy the full journey — from a rough Figma design all the way to a live, polished website." },
              { delay: 0.25, text: "My work spans Shopify Online Store 2.0 development, full-stack web applications, and AI/ML-powered tools. I've built complete eCommerce storefronts for real clients, developed legal research AI systems, digital forensics platforms, and data visualization dashboards." },
              { delay: 0.35, text: "I hold an MCA from K. K. Wagh Institute of Engineering and Research, Nashik, and I'm driven by the belief that good software is both technically solid and genuinely enjoyable to use." },
            ].map(({ delay, text }, i) => (
              <motion.p
                key={i}
                variants={fadeSlide(0, delay)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                className="text-slate-300 text-lg leading-relaxed"
              >
                {text}
              </motion.p>
            ))}

            {/* Highlights grid */}
            <motion.div
              variants={fadeSlide(0, 0.45)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-3 mt-8 pt-8 border-t border-slate-800"
            >
              {[
                { label: 'MCA Graduate', sub: 'K. K. Wagh Institute, Nashik' },
                { label: 'Shopify Developer', sub: 'Online Store 2.0 + Liquid' },
                { label: 'Full Stack', sub: 'React · Node · Python' },
                { label: 'AI/ML', sub: 'TensorFlow · PyTorch · NLP' },
              ].map(({ label, sub }) => (
                <motion.div
                  key={label}
                  whileHover={{ y: -2 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="p-4 bg-slate-800/40 border border-slate-700/50 rounded-xl"
                >
                  <div className="text-white font-semibold text-sm mb-1">{label}</div>
                  <div className="text-slate-500 text-xs">{sub}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
