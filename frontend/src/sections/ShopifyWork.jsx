import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ShoppingBag, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

// Browser mockup wrapping a real screenshot
function BrowserFrame({ src, alt, className = '' }) {
  return (
    <div className={`rounded-xl overflow-hidden bg-slate-800 border border-slate-700/60 shadow-2xl ${className}`}>
      {/* Chrome bar */}
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
      {/* Screenshot */}
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
        {/* Header */}
        <div className="sticky top-0 bg-slate-900/95 backdrop-blur-sm p-6 border-b border-slate-800 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-5 h-5 text-green-400" />
            <h3 className="text-xl font-bold text-white">{project.title}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8">
          {/* Large screenshot */}
          <BrowserFrame src={project.image} alt={project.alt} />

          {/* Description */}
          <div>
            <h4 className="text-white font-semibold mb-3">About This Project</h4>
            <p className="text-slate-300 leading-relaxed">{project.description}</p>
          </div>

          {/* Tech stack */}
          <div>
            <h4 className="text-white font-semibold mb-3">Technologies Used</h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span key={tech} className="px-3 py-1.5 bg-green-500/10 border border-green-500/30 text-green-400 text-sm font-medium rounded-lg">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <a
            href={project.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-green-600 hover:bg-green-500 text-white font-semibold rounded-xl transition-all shadow-[0_0_20px_rgba(22,163,74,0.3)] hover:shadow-[0_0_32px_rgba(22,163,74,0.45)] hover:-translate-y-0.5"
          >
            View Live Store <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ShopifyWork() {
  const { shopifyWork } = portfolioData;
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section id="shopifywork" className="py-28 border-b border-slate-800 relative overflow-hidden">
      {/* Background */}
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
          <div className="flex items-center gap-4 mb-4">
            <ShoppingBag className="w-8 h-8 text-green-400" />
            <h2 className="text-3xl md:text-5xl font-bold text-white">Selected Shopify Work</h2>
          </div>
          <div className="w-20 h-1 bg-gradient-to-r from-green-500 to-emerald-400 rounded-full mb-6" />
          <p className="text-slate-400 max-w-2xl text-lg leading-relaxed">
            Real-world eCommerce storefronts I designed and built with Shopify Online Store 2.0 and Liquid — each one live, responsive, and serving real customers.
          </p>
        </motion.div>

        {/* Projects */}
        <div className="space-y-24">
          {shopifyWork.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className={`grid md:grid-cols-12 gap-8 md:gap-12 items-center ${
                index % 2 === 1 ? 'md:direction-rtl' : ''
              }`}
            >
              {/* Screenshot — takes 7 cols */}
              <motion.div
                className={`md:col-span-7 ${index % 2 === 1 ? 'md:order-2' : ''}`}
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              >
                <div
                  className="cursor-pointer group"
                  onClick={() => setSelectedProject(project)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && setSelectedProject(project)}
                  aria-label={`View ${project.title} project details`}
                >
                  <BrowserFrame src={project.image} alt={project.alt} className="group-hover:border-green-500/40 transition-colors" />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none flex items-end p-6">
                    <span className="text-white/90 text-sm font-medium flex items-center gap-2">
                      View Details <ExternalLink className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Content — takes 5 cols */}
              <div className={`md:col-span-5 ${index % 2 === 1 ? 'md:order-1' : ''}`}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-green-400 text-xs font-semibold uppercase tracking-wider">Live Store</span>
                </div>

                <h3 className="text-3xl md:text-4xl font-bold text-white mb-5">{project.title}</h3>

                <p className="text-slate-400 leading-relaxed mb-6">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-slate-800/80 text-green-400/90 text-sm font-medium rounded-lg border border-green-900/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-500 text-white font-semibold rounded-xl transition-all shadow-[0_0_20px_rgba(22,163,74,0.25)] hover:shadow-[0_0_30px_rgba(22,163,74,0.4)] hover:-translate-y-0.5"
                    aria-label={`View ${project.title} live store`}
                  >
                    View Live Store <ExternalLink className="w-4 h-4" />
                  </a>
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="inline-flex items-center gap-2 px-6 py-3 border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white rounded-xl transition-all hover:-translate-y-0.5 text-sm font-medium"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
