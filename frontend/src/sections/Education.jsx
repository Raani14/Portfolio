import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award, Trophy } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Education() {
  const { education, certifications, award } = portfolioData;

  return (
    <section id="education" className="py-28 border-b border-slate-800 bg-[#0b1120] relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(59,130,246,0.05),transparent)] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative">
        <div className="grid lg:grid-cols-2 gap-20">

          {/* Education */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6 }}
              className="mb-10"
            >
              <span className="text-blue-500 text-sm font-semibold tracking-widest uppercase mb-3 block">Academic</span>
              <div className="flex items-center gap-3 mb-4">
                <GraduationCap className="w-7 h-7 text-blue-400" />
                <h2 className="text-3xl md:text-4xl font-bold">Education</h2>
              </div>
              <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-violet-500 rounded-full" />
            </motion.div>

            <div className="relative border-l border-slate-700/60 ml-3 space-y-2">
              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-40px' }}
                  custom={index * 0.15}
                  className="relative pl-8 pb-10"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                    className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-blue-500 border-4 border-slate-900 shadow-[0_0_12px_rgba(59,130,246,0.5)]"
                  />
                  <motion.div
                    whileHover={{ y: -2 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className="bg-slate-800/40 border border-slate-700/50 p-6 rounded-2xl hover:bg-slate-800/70 transition-colors"
                  >
                    <h3 className="text-lg font-bold text-white mb-1">{edu.degree}</h3>
                    <p className="text-blue-400 font-medium text-sm mb-4">{edu.institution}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs bg-blue-500/10 border border-blue-500/20 text-blue-300 px-3 py-1 rounded-full">
                        {edu.duration}
                      </span>
                      <span className="text-sm font-semibold text-slate-300">CGPA: <span className="text-white">{edu.cgpa}</span></span>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Awards + Certifications */}
          <div>
            {/* Best Paper Award */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6 }}
              className="mb-10"
            >
              <span className="text-yellow-500 text-sm font-semibold tracking-widest uppercase mb-3 block">Recognition</span>
              <div className="flex items-center gap-3 mb-4">
                <Trophy className="w-7 h-7 text-yellow-400" />
                <h2 className="text-3xl md:text-4xl font-bold">Achievement</h2>
              </div>
              <div className="w-16 h-1 bg-gradient-to-r from-yellow-500 to-orange-400 rounded-full" />
            </motion.div>

            <motion.div
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              custom={0}
              whileHover={{ y: -3 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="mb-12 relative bg-gradient-to-br from-yellow-500/10 to-orange-500/5 border border-yellow-500/30 hover:border-yellow-500/50 p-7 rounded-2xl overflow-hidden"
            >
              <div className="absolute right-4 top-4 opacity-10">
                <Trophy className="w-28 h-28 text-yellow-400" />
              </div>
              <div className="relative z-10">
                <div className="text-yellow-400 text-xs font-bold tracking-widest uppercase mb-3">
                  🏆 Award Winner
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{award.title}</h3>
                <p className="text-yellow-300/80 font-semibold mb-2">{award.event}</p>
                <p className="text-slate-400 text-sm">{award.description}</p>
              </div>
            </motion.div>

            {/* Certifications */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-8 flex items-center gap-3"
            >
              <Award className="w-6 h-6 text-blue-400" />
              <h2 className="text-2xl font-bold">Certifications</h2>
            </motion.div>

            <div className="grid gap-3">
              {certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={index * 0.08}
                  whileHover={{ x: 4 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="flex justify-between items-start bg-slate-800/30 border border-slate-700/50 p-4 rounded-xl hover:border-slate-600/70 hover:bg-slate-800/50 transition-colors"
                >
                  <div>
                    <h4 className="text-white font-medium text-sm">{cert.title}</h4>
                    {cert.issuer && <p className="text-slate-500 text-xs mt-1">{cert.issuer}</p>}
                  </div>
                  <span className="text-xs font-semibold text-slate-500 bg-slate-900/60 px-2 py-1 rounded-full border border-slate-700/50 ml-4 flex-shrink-0">
                    {cert.year}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
