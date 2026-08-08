import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Palette, Code2, RefreshCcw } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: Lightbulb,
    title: 'Think',
    description: 'Turning ideas into practical digital experiences — understanding the problem before writing a line of code.',
    color: 'text-amber-400',
    border: 'border-amber-500/20 hover:border-amber-500/50',
    glow: 'group-hover:bg-amber-500/5',
  },
  {
    number: '02',
    icon: Palette,
    title: 'Design',
    description: "Creating custom interfaces around the user's needs — visual hierarchy, spacing, color, and interaction design.",
    color: 'text-violet-400',
    border: 'border-violet-500/20 hover:border-violet-500/50',
    glow: 'group-hover:bg-violet-500/5',
  },
  {
    number: '03',
    icon: Code2,
    title: 'Build',
    description: 'Turning designs into responsive, production-ready experiences — clean, scalable, and maintainable code.',
    color: 'text-blue-400',
    border: 'border-blue-500/20 hover:border-blue-500/50',
    glow: 'group-hover:bg-blue-500/5',
  },
  {
    number: '04',
    icon: RefreshCcw,
    title: 'Refine',
    description: 'Improving responsiveness, performance, and usability — because shipping is only the beginning.',
    color: 'text-green-400',
    border: 'border-green-500/20 hover:border-green-500/50',
    glow: 'group-hover:bg-green-500/5',
  },
];

export default function DesignSection() {
  return (
    <section className="py-28 border-b border-slate-800/60 relative overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0b1120] to-slate-900" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,rgba(139,92,246,0.04),transparent)] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="text-violet-500 text-sm font-semibold tracking-widest uppercase mb-3 block">
            How I Work
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-5">More Than Just Code.</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-violet-500 to-blue-500 rounded-full mx-auto mb-6" />
          <p className="text-slate-400 max-w-xl mx-auto text-lg leading-relaxed">
            I enjoy turning ideas into interfaces that are not only functional, but also visual, responsive, and interactive.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6 }}
                className={`relative bg-slate-800/25 border rounded-2xl p-7 transition-all duration-300 ${step.border} group overflow-hidden`}
              >
                {/* Hover glow */}
                <div className={`absolute inset-0 ${step.glow} transition-colors duration-300`} />

                <div className="relative z-10">
                  {/* Number + Icon row */}
                  <div className="flex items-start justify-between mb-6">
                    <div className={`w-12 h-12 rounded-xl bg-slate-800/60 border border-slate-700/40 flex items-center justify-center`}>
                      <Icon className={`w-5 h-5 ${step.color}`} />
                    </div>
                    <span className={`text-4xl font-black ${step.color} opacity-15 leading-none`}>
                      {step.number}
                    </span>
                  </div>

                  {/* Connecting line */}
                  {index < 3 && (
                    <div className="hidden lg:block absolute top-[3.2rem] -right-3 w-6 h-px bg-slate-700/60 z-20" />
                  )}

                  <h3 className="text-lg font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
