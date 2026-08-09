import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ShoppingBag, X, ChevronDown } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

// Browser mockup wrapping a real screenshot
function BrowserFrame({ src, alt, className = '' }) {
  return (
    <div className={`rounded-xl overflow-hidden bg-slate-800 border border-slate-700/60 shadow-2xl ${className}`}>
      <div className="bg-slate-700/80 px-4 py-2.5 flex items-center gap-2.5 border-b border-slate-600/40">
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
        </div>
        <div className="flex-1 bg-slate-600/50 rounded-md text-[11px] text-slate-400 px-3 py-1 truncate font-mono">
          {alt.split(' ')[0].toLowerCase()}.com
        </div>
      </div>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="w-full block"
        style={{ objectFit: 'cover', objectPosition: 'top' }}
      />
    </div>
  );
}

// Detail modal
function ProjectModal({ project, onClose }) {
  if (!project) return null;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} project details`}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="bg-slate-900 border border-slate-700/60 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-slate-900/95 backdrop-blur-sm p-6 border-b border-slate-800 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-5 h-5 text-green-400" />
            <h3 className="text-xl font-bold text-white">{project.title}</h3>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors" aria-label="Close modal">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 space-y-8">
          <BrowserFrame src={project.image} alt={project.alt} />
          <div>
            <h4 className="text-white font-semibold mb-3">About This Project</h4>
            <p className="text-slate-300 leading-relaxed">{project.description}</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Technologies Used</h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span key={tech} className="px-3 py-1.5 bg-green-500/10 border border-green-500/30 text-green-400 text-sm font-medium rounded-lg">{tech}</span>
              ))}
            </div>
          </div>
          {project.url && (
            <a href={project.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-8 py-4 bg-green-600 hover:bg-green-500 text-white font-semibold rounded-xl transition-all shadow-[0_0_20px_rgba(22,163,74,0.3)] hover:shadow-[0_0_32px_rgba(22,163,74,0.45)] hover:-translate-y-0.5">
              View Live Store <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

// Single project card
function ProjectCard({ project, index, onSelect }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.75, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className={`grid md:grid-cols-12 gap-8 md:gap-12 items-center`}
    >
      {/* Screenshot */}
      <motion.div
        className={`md:col-span-7 ${index % 2 === 1 ? 'md:order-2' : ''}`}
        whileHover={{ y: -6 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      >
        <div
          className="cursor-pointer group relative"
          onClick={() => onSelect(project)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && onSelect(project)}
          aria-label={`View ${project.title} project details`}
        >
          <BrowserFrame src={project.image} alt={project.alt} className="group-hover:border-green-500/40 transition-colors" />
          <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none flex items-end p-6">
            <span className="text-white/90 text-sm font-medium flex items-center gap-2">
              View Details <ExternalLink className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <div className={`md:col-span-5 ${index % 2 === 1 ? 'md:order-1' : ''}`}>
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-green-400 text-xs font-semibold uppercase tracking-wider">
            {project.url ? 'Live Store' : 'Shopify Project'}
          </span>
        </div>
        <h3 className="text-3xl md:text-4xl font-bold text-white mb-5">{project.title}</h3>
        <p className="text-slate-400 leading-relaxed mb-6">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-8">
          {project.technologies.map((tech) => (
            <span key={tech} className="px-3 py-1 bg-slate-800/80 text-green-400/90 text-sm font-medium rounded-lg border border-green-900/30">{tech}</span>
          ))}
        </div>
        <div className="flex flex-wrap gap-3">
          {project.url && (
            <a href={project.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-500 text-white font-semibold rounded-xl transition-all shadow-[0_0_20px_rgba(22,163,74,0.25)] hover:shadow-[0_0_30px_rgba(22,163,74,0.4)] hover:-translate-y-0.5" aria-label={`View ${project.title} live store`}>
              View Live Store <ExternalLink className="w-4 h-4" />
            </a>
          )}
          <button onClick={() => onSelect(project)} className="inline-flex items-center gap-2 px-6 py-3 border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white rounded-xl transition-all hover:-translate-y-0.5 text-sm font-medium">
            View Details
          </button>
        </div>
      </div>
    </motion.div>
  );
}

const INITIAL_COUNT = 3;

export default function ShopifyWork() {
  const { shopifyWork } = portfolioData;
  const [showAll, setShowAll] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const visibleProjects = showAll ? shopifyWork : shopifyWork.slice(0, INITIAL_COUNT);
  const hasMore = shopifyWork.length > INITIAL_COUNT;

  return (
    <section id="shopifywork" className="py-28 border-b border-slate-800 relative overflow-hidden">
      <div className="absolute inset-0 bg-[#070d18]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_100%,rgba(16,185,129,0.06),transparent)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="w-8 h-px bg-green-500" />
            <span className="text-green-500 text-sm font-semibold tracking-widest uppercase">eCommerce</span>
          </div>
          <div className="flex items-end gap-4 mb-4">
            <div className="flex items-center gap-4">
              <ShoppingBag className="w-8 h-8 text-green-400" />
              <h2 className="text-3xl md:text-5xl font-bold text-white">Selected Shopify Work</h2>
            </div>
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-slate-600 text-sm font-mono mb-1 hidden sm:block"
            >
              {shopifyWork.length} projects
            </motion.span>
          </div>
          <div className="w-20 h-1 bg-gradient-to-r from-green-500 to-emerald-400 rounded-full mb-6" />
          <p className="text-slate-400 max-w-2xl text-lg leading-relaxed">
            Real-world eCommerce storefronts I designed and built with Shopify Online Store 2.0 and Liquid — each one responsive and serving real customers.
          </p>
        </motion.div>

        {/* Projects */}
        <div className="space-y-24">
          {visibleProjects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
              onSelect={setSelectedProject}
            />
          ))}
        </div>

        {/* View More / View Less */}
        {hasMore && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex justify-center mt-20"
          >
            <button
              onClick={() => setShowAll(!showAll)}
              className="group inline-flex items-center gap-3 px-8 py-4 bg-slate-800/60 hover:bg-slate-800 border border-slate-700 hover:border-green-500/40 text-slate-300 hover:text-white font-semibold rounded-xl transition-all hover:-translate-y-0.5"
            >
              {showAll ? 'Show Less' : `View All ${shopifyWork.length} Projects`}
              <motion.div
                animate={{ rotate: showAll ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="w-4 h-4" />
              </motion.div>
            </button>
          </motion.div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
