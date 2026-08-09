import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ArrowRight, Scale, Shield, Brain, BarChart3 } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { portfolioData } from '../data/portfolioData';

// Project color/icon mapping
const PROJECT_META = {
  'Indian Legal AI Assistant': { icon: Scale, accent: 'text-amber-400', bgAccent: 'bg-amber-500/10', borderAccent: 'border-amber-500/20' },
  'Digital Forensics Platform': { icon: Shield, accent: 'text-blue-400', bgAccent: 'bg-blue-500/10', borderAccent: 'border-blue-500/20' },
  'Transformer Attention Visualizer': { icon: Brain, accent: 'text-violet-400', bgAccent: 'bg-violet-500/10', borderAccent: 'border-violet-500/20' },
  'PCOD Trend Prediction & Visualization': { icon: BarChart3, accent: 'text-amber-400', bgAccent: 'bg-amber-500/10', borderAccent: 'border-amber-500/20' },
};

// Fallback SVG illustration for PCOD (no screenshot)
function PCODIllustration() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 160">
        {[40,65,90,115].map(y => <line key={y} x1="30" y1={y} x2="275" y2={y} stroke="rgba(245,158,11,0.08)" strokeWidth="1" />)}
        <line x1="30" y1="25" x2="30" y2="135" stroke="rgba(245,158,11,0.3)" strokeWidth="1.5" />
        <line x1="30" y1="135" x2="275" y2="135" stroke="rgba(245,158,11,0.3)" strokeWidth="1.5" />
        <polygon points="30,105 70,90 110,95 150,65 190,75 230,50 270,60 270,135 30,135" fill="rgba(245,158,11,0.06)" />
        <polyline points="30,105 70,90 110,95 150,65 190,75 230,50 270,60" fill="none" stroke="#f59e0b" strokeWidth="2.5" opacity="0.7" strokeLinejoin="round" />
        {[[30,105],[70,90],[110,95],[150,65],[190,75],[230,50],[270,60]].map(([cx,cy],i) => (
          <circle key={i} cx={cx} cy={cy} r="3.5" fill="#f59e0b" opacity="0.9" />
        ))}
        <polyline points="230,50 270,60 290,52" fill="none" stroke="#f59e0b" strokeWidth="1.5" opacity="0.4" strokeDasharray="4 3" />
      </svg>
      <div className="absolute top-3 left-5 flex items-center gap-2">
        <BarChart3 className="w-4 h-4 text-amber-400/50" />
        <span className="text-[9px] font-mono text-amber-400/50">TREND ANALYSIS</span>
      </div>
      <div className="absolute top-3 right-5 flex gap-3">
        <div className="flex items-center gap-1">
          <div className="w-3 h-1 bg-amber-500/70 rounded" />
          <span className="text-[7px] text-amber-400/40">Actual</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-1 bg-amber-500/30 rounded" />
          <span className="text-[7px] text-amber-400/40">Predicted</span>
        </div>
      </div>
    </div>
  );
}

const ALL_CATEGORIES = ['All', 'Full Stack', 'AI / ML', 'Python'];

export default function Projects() {
  const { projects } = portfolioData;
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter((p) => p.category.includes(activeFilter));

  return (
    <section id="projects" className="py-28 border-b border-slate-800 bg-[#0b1120] relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_0%,rgba(139,92,246,0.06),transparent)] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <span className="text-blue-500 text-sm font-semibold tracking-widest uppercase mb-3 block">
            Portfolio
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Featured Projects</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-violet-500 rounded-full mx-auto mb-10" />

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-2">
            {ALL_CATEGORIES.map((cat) => (
              <motion.button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  activeFilter === cat
                    ? 'bg-blue-600 text-white shadow-[0_0_16px_rgba(37,99,235,0.4)]'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </div>
        </motion.div>

        <motion.div layout className="grid md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => {
              const meta = PROJECT_META[project.title] || {};
              const Icon = meta.icon;
              const hasImage = !!project.image;

              return (
                <motion.div
                  key={project.title}
                  layout
                  initial={{ opacity: 0, scale: 0.92, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.92, y: 10 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  whileHover={{ y: -4 }}
                  className="bg-slate-800/30 border border-slate-700/60 rounded-2xl overflow-hidden hover:border-slate-600/60 hover:bg-slate-800/60 transition-colors group flex flex-col"
                >
                  {/* Project visual — real screenshot or fallback illustration */}
                  <div className="px-5 pt-5">
                    {hasImage ? (
                      <div className={`rounded-xl overflow-hidden border ${meta.borderAccent || 'border-slate-700/40'} bg-slate-900 shadow-lg`}>
                        {/* Browser chrome */}
                        <div className="bg-slate-700/60 px-3 py-2 flex items-center gap-2 border-b border-slate-600/30">
                          <div className="flex gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-red-400/60" />
                            <span className="w-2 h-2 rounded-full bg-yellow-400/60" />
                            <span className="w-2 h-2 rounded-full bg-green-400/60" />
                          </div>
                          <span className="text-[10px] text-slate-500 font-mono truncate">{project.title}</span>
                        </div>
                        <img
                          src={project.image}
                          alt={project.alt}
                          loading="lazy"
                          decoding="async"
                          className="w-full aspect-[16/9] object-cover object-top"
                        />
                      </div>
                    ) : (
                      <div className={`h-44 rounded-xl overflow-hidden border ${meta.borderAccent || 'border-slate-700/40'} bg-gradient-to-br from-amber-600/15 to-slate-900 relative`}>
                        <PCODIllustration />
                      </div>
                    )}
                  </div>

                  <div className="px-6 pb-3 pt-5 flex-grow flex flex-col">
                    <div className="flex items-center gap-2.5 mb-3">
                      {Icon && (
                        <div className={`w-8 h-8 rounded-lg ${meta.bgAccent} border ${meta.borderAccent} flex items-center justify-center`}>
                          <Icon className={`w-4 h-4 ${meta.accent}`} />
                        </div>
                      )}
                      <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors flex items-center gap-2">
                        {project.title}
                        <motion.span className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <ArrowRight className="w-4 h-4 text-blue-400" />
                        </motion.span>
                      </h3>
                    </div>
                    <p className="text-slate-400 mb-5 leading-relaxed text-sm flex-grow">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 bg-slate-900/80 text-blue-300/80 text-xs rounded-lg border border-blue-900/30 hover:border-blue-500/40 hover:text-blue-300 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {(project.github || project.demo) && (
                    <div className="px-6 py-4 bg-slate-900/50 border-t border-slate-700/50 flex gap-4">
                      {project.github && (
                        <a href={project.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
                          <FaGithub className="w-4 h-4" /> Code
                        </a>
                      )}
                      {project.demo && (
                        <a href={project.demo} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
                          <ExternalLink className="w-4 h-4" /> Live Demo
                        </a>
                      )}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
