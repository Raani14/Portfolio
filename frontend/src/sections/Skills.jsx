import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';

const chipVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 10 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.35, delay: i * 0.04, ease: 'easeOut' },
  }),
};

const CATEGORY_COLORS = {
  'Shopify & Commerce': { accent: 'border-green-500/50 bg-green-500/5', chip: 'border-green-800/40 text-green-400 hover:border-green-500/60 hover:bg-green-500/10', icon: '🛒' },
  'AI / Machine Learning': { accent: 'border-violet-500/50 bg-violet-500/5', chip: 'border-violet-800/40 text-violet-400 hover:border-violet-500/60 hover:bg-violet-500/10', icon: '🧠' },
  'Languages': { accent: 'border-blue-500/50 bg-blue-500/5', chip: 'border-blue-800/40 text-blue-400 hover:border-blue-500/60 hover:bg-blue-500/10', icon: '</>' },
  'Frontend': { accent: 'border-pink-500/50 bg-pink-500/5', chip: 'border-pink-800/40 text-pink-400 hover:border-pink-500/60 hover:bg-pink-500/10', icon: '🎨' },
  'Backend': { accent: 'border-orange-500/50 bg-orange-500/5', chip: 'border-orange-800/40 text-orange-400 hover:border-orange-500/60 hover:bg-orange-500/10', icon: '⚙️' },
  'Databases': { accent: 'border-cyan-500/50 bg-cyan-500/5', chip: 'border-cyan-800/40 text-cyan-400 hover:border-cyan-500/60 hover:bg-cyan-500/10', icon: '🗄️' },
  'Tools & IDEs': { accent: 'border-slate-500/50 bg-slate-500/5', chip: 'border-slate-600/40 text-slate-400 hover:border-slate-400/60 hover:bg-slate-500/10', icon: '🔧' },
  'Operating Systems': { accent: 'border-indigo-500/50 bg-indigo-500/5', chip: 'border-indigo-800/40 text-indigo-400 hover:border-indigo-500/60 hover:bg-indigo-500/10', icon: '💻' },
};

function CategoryCard({ title, skills, delay, colors }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -4 }}
      className={`relative bg-slate-800/40 border rounded-2xl p-6 transition-all duration-300 cursor-default ${
        isHovered ? colors.accent : 'border-slate-700/50'
      }`}
    >
      <div className="flex items-center gap-3 mb-4">
        <span className="text-xl leading-none">{colors.icon}</span>
        <h3 className="text-base font-semibold text-slate-200">{title}</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        <AnimatePresence>
          {skills.map((skill, idx) => (
            <motion.span
              key={skill}
              variants={chipVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={idx}
              className={`px-3 py-1 bg-slate-900/80 text-xs rounded-lg border transition-all duration-200 ${colors.chip}`}
            >
              {skill}
            </motion.span>
          ))}
        </AnimatePresence>
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

  return (
    <section id="skills" className="py-28 border-b border-slate-800 bg-[#0b1120] relative">
      {/* Subtle background gradient */}
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
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Technical Skills</h2>
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
