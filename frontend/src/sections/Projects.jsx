import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { portfolioData } from '../data/portfolioData';

// Abstract SVG visual backgrounds per project
const ProjectVisuals = {
  'Indian Legal AI Assistant': () => (
    <svg viewBox="0 0 300 160" className="w-full h-full opacity-60" aria-hidden="true">
      <defs>
        <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3"/>
          <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.1"/>
        </linearGradient>
      </defs>
      <rect width="300" height="160" fill="url(#g1)"/>
      {/* Document lines */}
      {[30,45,60,75,90].map((y,i)=> <rect key={i} x="20" y={y} width={80+i*10} height="3" rx="1.5" fill="#3b82f6" opacity="0.3"/>)}
      {/* Neural nodes */}
      {[[160,40],[200,60],[240,35],[180,90],[220,110],[260,80]].map(([cx,cy],i)=>(
        <g key={i}>
          <circle cx={cx} cy={cy} r="5" fill="#8b5cf6" opacity="0.6"/>
          {i>0 && <line x1={cx} y1={cy} x2={[[160,40],[200,60],[240,35],[180,90],[220,110]][i-1][0]} y2={[[160,40],[200,60],[240,35],[180,90],[220,110]][i-1][1]} stroke="#8b5cf6" strokeWidth="1" opacity="0.25"/>}
        </g>
      ))}
      <circle cx="160" cy="40" r="12" fill="none" stroke="#3b82f6" strokeWidth="1" opacity="0.4"/>
      <text x="155" y="44" fontSize="10" fill="#3b82f6" opacity="0.8">AI</text>
    </svg>
  ),
  'Digital Forensics Platform': () => (
    <svg viewBox="0 0 300 160" className="w-full h-full opacity-60" aria-hidden="true">
      <defs>
        <linearGradient id="g2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.2"/>
          <stop offset="100%" stopColor="#10b981" stopOpacity="0.1"/>
        </linearGradient>
      </defs>
      <rect width="300" height="160" fill="url(#g2)"/>
      {/* Image grid */}
      <rect x="20" y="20" width="80" height="60" rx="4" fill="none" stroke="#06b6d4" strokeWidth="1" opacity="0.4"/>
      {/* ELA heatmap bands */}
      {[0,1,2,3,4].map(i=> <rect key={i} x={22+i*15} y={22} width="13" height={56} rx="2" fill="#06b6d4" opacity={0.05+i*0.04}/>)}
      {/* Hash line */}
      <text x="115" y="35" fontSize="7" fontFamily="monospace" fill="#10b981" opacity="0.7">SHA-256</text>
      <text x="115" y="47" fontSize="6" fontFamily="monospace" fill="#10b981" opacity="0.5">3f4a9b2e1c...</text>
      {/* Scan lines */}
      {[70,85,100,115,130].map((y,i)=> <rect key={i} x="115" y={y} width={140-i*8} height="2" rx="1" fill="#06b6d4" opacity="0.2"/>)}
    </svg>
  ),
  'Transformer Attention Visualizer': () => (
    <svg viewBox="0 0 300 160" className="w-full h-full opacity-60" aria-hidden="true">
      <defs>
        <linearGradient id="g3" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.2"/>
          <stop offset="100%" stopColor="#ec4899" stopOpacity="0.1"/>
        </linearGradient>
      </defs>
      <rect width="300" height="160" fill="url(#g3)"/>
      {/* Attention arc tokens */}
      {[40,80,120,160,200,240].map((x,i)=>(
        <g key={i}>
          <circle cx={x} cy="120" r="6" fill="#8b5cf6" opacity="0.7"/>
          <rect x={x-15} y="130" width="30" height="3" rx="1" fill="#8b5cf6" opacity="0.25"/>
        </g>
      ))}
      {/* Arcs */}
      {[[40,160,0.6],[80,200,0.4],[40,240,0.2],[120,200,0.5],[80,240,0.3]].map(([x1,x2,op],i)=>(
        <path key={i} d={`M${x1} 120 Q${(x1+x2)/2} 60 ${x2} 120`} fill="none" stroke="#8b5cf6" strokeWidth={op*3} opacity={op*0.7}/>
      ))}
      <text x="20" y="25" fontSize="9" fill="#8b5cf6" opacity="0.6" fontFamily="monospace">BERT Attention</text>
    </svg>
  ),
  'PCOD Trend Prediction & Visualization': () => (
    <svg viewBox="0 0 300 160" className="w-full h-full opacity-60" aria-hidden="true">
      <defs>
        <linearGradient id="g4" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.2"/>
          <stop offset="100%" stopColor="#ef4444" stopOpacity="0.1"/>
        </linearGradient>
      </defs>
      <rect width="300" height="160" fill="url(#g4)"/>
      {/* Chart axes */}
      <line x1="30" y1="20" x2="30" y2="130" stroke="#f59e0b" strokeWidth="1.5" opacity="0.4"/>
      <line x1="30" y1="130" x2="280" y2="130" stroke="#f59e0b" strokeWidth="1.5" opacity="0.4"/>
      {/* Data line */}
      <polyline points="30,100 70,85 110,90 150,60 190,70 230,45 270,55" fill="none" stroke="#f59e0b" strokeWidth="2.5" opacity="0.7"/>
      {/* Area fill */}
      <polygon points="30,100 70,85 110,90 150,60 190,70 230,45 270,55 270,130 30,130" fill="#f59e0b" opacity="0.08"/>
      {/* Data points */}
      {[[30,100],[70,85],[110,90],[150,60],[190,70],[230,45],[270,55]].map(([cx,cy],i)=>
        <circle key={i} cx={cx} cy={cy} r="3.5" fill="#f59e0b" opacity="0.8"/>
      )}
    </svg>
  ),
};

const ALL_CATEGORIES = ['All', 'Full Stack', 'AI / ML', 'Python'];

export default function Projects() {
  const { projects } = portfolioData;
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter((p) => p.category.includes(activeFilter));

  const Visual = ({ title }) => {
    const Component = ProjectVisuals[title];
    return Component ? (
      <div className="h-44 bg-slate-900/80 rounded-xl overflow-hidden border border-slate-700/40 mb-6">
        <Component />
      </div>
    ) : null;
  };

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
            {filteredProjects.map((project) => (
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
                {/* Project visual */}
                <div className="px-6 pt-6">
                  <Visual title={project.title} />
                </div>

                <div className="px-6 pb-6 flex-grow flex flex-col">
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors flex items-center gap-2">
                    {project.title}
                    <motion.span
                      initial={{ x: 0, opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <ArrowRight className="w-4 h-4 text-blue-400" />
                    </motion.span>
                  </h3>
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
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
