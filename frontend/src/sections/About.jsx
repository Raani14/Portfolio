import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Code2, Brain } from 'lucide-react';

/* ── animation helpers ──────────────────────────────── */
const fadeSlide = (dir = 0, delay = 0) => ({
  hidden: { opacity: 0, x: dir, y: dir === 0 ? 24 : 0 },
  visible: {
    opacity: 1, x: 0, y: 0,
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
  },
});

const scaleIn = (delay = 0) => ({
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1, scale: 1,
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
  },
});

/* ── floating tech labels ───────────────────────────── */
const floatingTags = [
  { label: 'Shopify', color: 'text-green-400 border-green-500/30 bg-green-500/8', pos: 'top-6 -right-3 md:-right-6' },
  { label: 'React', color: 'text-blue-400 border-blue-500/30 bg-blue-500/8', pos: '-bottom-3 right-6 md:right-2' },
  { label: 'Python', color: 'text-yellow-400 border-yellow-500/30 bg-yellow-500/8', pos: 'top-1/3 -left-3 md:-left-6' },
  { label: 'AI / ML', color: 'text-violet-400 border-violet-500/30 bg-violet-500/8', pos: 'bottom-16 -left-2 md:-left-5' },
];

/* ── capability cards ───────────────────────────────── */
const capabilities = [
  {
    icon: ShoppingBag,
    title: 'Shopify',
    desc: 'Custom storefronts & themes',
    accent: 'text-green-400',
    border: 'border-green-500/20 hover:border-green-500/40',
    bg: 'bg-green-500/5',
  },
  {
    icon: Code2,
    title: 'Full Stack',
    desc: 'Modern web applications',
    accent: 'text-blue-400',
    border: 'border-blue-500/20 hover:border-blue-500/40',
    bg: 'bg-blue-500/5',
  },
  {
    icon: Brain,
    title: 'AI / ML',
    desc: 'Intelligent applications & data-driven solutions',
    accent: 'text-violet-400',
    border: 'border-violet-500/20 hover:border-violet-500/40',
    bg: 'bg-violet-500/5',
  },
];

export default function About() {
  return (
    <section id="about" className="py-28 border-b border-slate-800/60 relative overflow-hidden">
      {/* Background accents */}
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
          <span className="text-blue-500 text-sm font-semibold tracking-widest uppercase mb-3 block">
            About Me
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            About <span className="text-blue-400">Rani Gangurde</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-violet-500 rounded-full" />
        </motion.div>

        {/* Two-column layout */}
        <div className="grid md:grid-cols-5 gap-12 items-start">

          {/* LEFT — Professional photo (2 cols) */}
          <motion.div
            variants={scaleIn(0.15)}
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

              {/* Photo — premium rectangular portrait */}
              <img
                src="/images/rani-about.jpg"
                alt="Rani Rakesh Gangurde — Software Developer"
                className="relative z-10 w-60 md:w-72 mx-auto rounded-2xl border border-slate-700/40 shadow-[0_20px_50px_rgba(0,0,0,0.5)] object-cover"
                style={{ aspectRatio: '3/4' }}
                loading="eager"
                decoding="async"
              />

              {/* Floating tech labels (understated) */}
              {floatingTags.map(({ label, color, pos }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.12, type: 'spring', stiffness: 200 }}
                  className={`absolute ${pos} z-20 px-2.5 py-1 rounded-lg border text-[11px] font-medium backdrop-blur-md ${color} shadow-md`}
                >
                  {label}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT — Text content (3 cols) */}
          <div className="md:col-span-3 space-y-6">

            {/* Who I am */}
            <motion.div
              variants={fadeSlide(30, 0.15)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
            >
              <h3 className="text-white font-semibold text-lg mb-2">Who I am</h3>
              <p className="text-slate-300 text-base leading-relaxed">
                I'm Rani, a Software Developer from Nashik, India. I enjoy the full journey — from
                a rough Figma design all the way to a live, polished website. I hold an MCA from
                K. K. Wagh Institute of Engineering and Research, and I believe great software
                should be both technically solid and genuinely enjoyable to use.
              </p>
            </motion.div>

            {/* What I build */}
            <motion.div
              variants={fadeSlide(30, 0.25)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
            >
              <h3 className="text-white font-semibold text-lg mb-2">What I build</h3>
              <p className="text-slate-300 text-base leading-relaxed">
                My work spans Shopify Online Store 2.0 development, full-stack web applications,
                and AI/ML-powered tools. I've built complete eCommerce storefronts for real clients,
                developed legal research AI systems, digital forensics platforms, and interactive
                data visualization dashboards — all with responsive design and clean architecture.
              </p>
            </motion.div>

            {/* Capability cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-8 pt-8 border-t border-slate-800">
              {capabilities.map(({ icon: Icon, title, desc, accent, border, bg }, i) => (
                <motion.div
                  key={title}
                  variants={fadeSlide(0, 0.35 + i * 0.1)}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  whileHover={{ y: -3 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className={`p-4 rounded-xl border ${border} ${bg} transition-colors cursor-default`}
                >
                  <Icon className={`w-5 h-5 ${accent} mb-2.5`} />
                  <div className="text-white font-semibold text-sm mb-1">{title}</div>
                  <div className="text-slate-500 text-xs leading-snug">{desc}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
