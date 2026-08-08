import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Briefcase, Brain } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

function TimelineCard({ job, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const icons = [Briefcase, Brain];
  const Icon = icons[index % icons.length];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.65, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="mb-14 relative pl-10 md:pl-14"
    >
      {/* Timeline dot with glow */}
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.1, type: 'spring', stiffness: 200 }}
        className="absolute -left-[22px] top-0 bg-slate-900 border-[3px] border-blue-500 w-11 h-11 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.4)]"
      >
        <Icon className="w-4 h-4 text-blue-400" />
      </motion.div>

      <motion.div
        whileHover={{ y: -2 }}
        transition={{ type: 'spring', stiffness: 300 }}
        className="bg-slate-800/30 border border-slate-700/60 p-7 rounded-2xl hover:bg-slate-800/60 hover:border-slate-600/60 transition-colors"
      >
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-5">
          <div>
            <h3 className="text-xl font-bold text-white mb-1">{job.role}</h3>
            <div className="text-blue-400 font-semibold">{job.company}</div>
          </div>
          <span className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-sm text-blue-300 whitespace-nowrap w-max">
            {job.duration}
          </span>
        </div>

        <ul className="space-y-3 mb-6">
          {job.responsibilities.map((resp, idx) => (
            <li key={idx} className="flex items-start gap-3 text-slate-300 leading-relaxed">
              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
              {resp}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-700/40">
          {job.technologies.map((tech) => (
            <span key={tech} className="text-xs font-medium text-slate-400 bg-slate-900/80 px-2.5 py-1 rounded-lg border border-slate-700/50">
              {tech}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Experience() {
  const { experience } = portfolioData;
  const lineRef = useRef(null);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section id="experience" className="py-28 border-b border-slate-800">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-blue-500 text-sm font-semibold tracking-widest uppercase mb-3 block">
            Work History
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Experience</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-violet-500 rounded-full" />
        </motion.div>

        <div ref={containerRef} className="relative">
          {/* Animated timeline line */}
          <div className="absolute left-[0px] top-0 bottom-0 w-px bg-slate-800" />
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            style={{ originY: 0 }}
            className="absolute left-[0px] top-0 bottom-0 w-px bg-gradient-to-b from-blue-500 via-violet-500 to-transparent"
          />

          {experience.map((job, index) => (
            <TimelineCard key={index} job={job} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
