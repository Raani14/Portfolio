import React, { useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';

const chipVariants = {
  hidden: { opacity: 0, scale: 0.7, y: 12, filter: 'blur(4px)' },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.4, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] },
  }),
};

const CATEGORY_COLORS = {
  'Shopify & Commerce': { accent: 'border-green-500/50 bg-green-500/5', chip: 'border-green-800/40 text-green-400 hover:border-green-500/60 hover:bg-green-500/10', icon: '🛒', glow: 'from-green-500/20' },
  'AI / Machine Learning': { accent: 'border-violet-500/50 bg-violet-500/5', chip: 'border-violet-800/40 text-violet-400 hover:border-violet-500/60 hover:bg-violet-500/10', icon: '🧠', glow: 'from-violet-500/20' },
  'Languages': { accent: 'border-blue-500/50 bg-blue-500/5', chip: 'border-blue-800/40 text-blue-400 hover:border-blue-500/60 hover:bg-blue-500/10', icon: '</>', glow: 'from-blue-500/20' },
  'Frontend': { accent: 'border-pink-500/50 bg-pink-500/5', chip: 'border-pink-800/40 text-pink-400 hover:border-pink-500/60 hover:bg-pink-500/10', icon: '🎨', glow: 'from-pink-500/20' },
  'Backend': { accent: 'border-orange-500/50 bg-orange-500/5', chip: 'border-orange-800/40 text-orange-400 hover:border-orange-500/60 hover:bg-orange-500/10', icon: '⚙️', glow: 'from-orange-500/20' },
  'Databases': { accent: 'border-cyan-500/50 bg-cyan-500/5', chip: 'border-cyan-800/40 text-cyan-400 hover:border-cyan-500/60 hover:bg-cyan-500/10', icon: '🗄️', glow: 'from-cyan-500/20' },
  'Tools & IDEs': { accent: 'border-slate-500/50 bg-slate-500/5', chip: 'border-slate-600/40 text-slate-400 hover:border-slate-400/60 hover:bg-slate-500/10', icon: '🔧', glow: 'from-slate-500/20' },
  'Operating Systems': { accent: 'border-indigo-500/50 bg-indigo-500/5', chip: 'border-indigo-800/40 text-indigo-400 hover:border-indigo-500/60 hover:bg-indigo-500/10', icon: '💻', glow: 'from-indigo-500/20' },
};

function CategoryCard({ title, skills, delay, colors }) {
  const [isHovered, setIsHovered] = useState(false);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -6, scale: 1.02 }}
      className={`relative bg-slate-800/40 border rounded-2xl p-6 transition-all duration-300 cursor-default overflow-hidden group ${
        isHovered ? colors.accent : 'border-slate-700/50'
      }`}
    >
      {/* Hover glow */}
      <div className={`absolute -top-12 -right-12 w-32 h-32 bg-gradient-to-br ${colors.glow} to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

      <div className="relative z-10">
        {/* Header with icon + title + count */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <motion.span
              animate={isHovered ? { rotate: [0, -10, 10, 0], scale: [1, 1.15, 1] } : {}}
              transition={{ duration: 0.5 }}
              className="text-xl leading-none"
            >
              {colors.icon}
            </motion.span>
            <h3 className="text-base font-semibold text-slate-200">{title}</h3>
          </div>
          <motion.span
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: delay + 0.3, type: 'spring', stiffness: 200 }}
            className="text-[10px] font-bold text-slate-600 bg-slate-800 border border-slate-700/60 rounded-full px-2 py-0.5"
          >
            {skills.length}
          </motion.span>
        </div>

        {/* Progress bar */}
        <div className="h-0.5 bg-slate-700/40 rounded-full mb-4 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '100%' }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: delay + 0.2, ease: [0.22, 1, 0.36, 1] }}
            className={`h-full rounded-full ${isHovered ? 'bg-current opacity-40' : 'bg-slate-600/60'}`}
            style={{ color: title.includes('Shopify') ? '#22c55e' : title.includes('AI') ? '#8b5cf6' : title.includes('Frontend') ? '#ec4899' : title.includes('Backend') ? '#f97316' : '#3b82f6' }}
          />
        </div>

        {/* Skills chips */}
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, idx) => (
            <motion.span
              key={skill}
              variants={chipVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={idx}
              whileHover={{ scale: 1.08, y: -2 }}
              className={`px-3 py-1 bg-slate-900/80 text-xs rounded-lg border transition-all duration-200 cursor-default ${colors.chip}`}
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const { languages, frontend, backend, shopify, databases, ai_ml, tools, os } = portfolioData.skills;

  const categories = [
    { title: 'Shopify & Commerce', skills: shopify, delay: 0.05 },
    { title: 'AI / Machine Learning', skills: ai_ml, delay: 0.1 },
    { title: 'Languages', skills: languages, delay: 0.15 },
    { title: 'Frontend', skills: frontend, delay: 0.2 },
    { title: 'Backend', skills: backend, delay: 0.25 },
    { title: 'Databases', skills: databases, delay: 0.3 },
    { title: 'Tools & IDEs', skills: tools, delay: 0.35 },
    { title: 'Operating Systems', skills: os, delay: 0.4 },
  ];

  // Total skill count
  const totalSkills = categories.reduce((sum, c) => sum + c.skills.length, 0);

  return (
    <section id="skills" className="py-28 border-b border-slate-800 bg-[#0b1120] relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_100%,rgba(59,130,246,0.06),transparent)] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-blue-500 text-sm font-semibold tracking-widest uppercase mb-3 block">
            Technologies
          </span>
          <div className="flex items-end gap-4 mb-4">
            <h2 className="text-3xl md:text-5xl font-bold">Technical Skills</h2>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-slate-600 text-sm font-mono mb-1"
            >
              {totalSkills} technologies
            </motion.span>
          </div>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-violet-500 rounded-full mb-5" />
          <p className="text-slate-400 max-w-2xl text-lg leading-relaxed">
            Technologies and tools I use to build scalable web applications, eCommerce storefronts, and AI-driven solutions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {categories.map((cat) => (
            <CategoryCard
              key={cat.title}
              title={cat.title}
              skills={cat.skills}
              delay={cat.delay}
              colors={CATEGORY_COLORS[cat.title]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
