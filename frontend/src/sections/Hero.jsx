import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Mail, ArrowRight, ArrowDown } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { portfolioData } from '../data/portfolioData';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const BrowserFrame = ({ src, alt, label, className = '', style = {}, whileHover, initial, animate, transition }) => {
  return (
    <motion.div
      initial={initial}
      animate={animate}
      transition={transition}
      whileHover={whileHover}
      style={style}
      className={`rounded-2xl overflow-hidden bg-slate-800/80 border border-slate-700/50 shadow-[0_30px_80px_rgba(0,0,0,0.5)] ${className}`}
    >
      {/* Chrome bar */}
      <div className="bg-slate-700/70 px-4 py-2.5 flex items-center gap-2.5 border-b border-slate-600/30">
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
        </div>
        <div className="flex-1 bg-slate-600/40 rounded-md text-[11px] text-slate-400 px-3 py-1 font-mono truncate">
          {label.toLowerCase().replace(/\s/g, '')}.com
        </div>
      </div>

      {/* Image area */}
      <div className="relative aspect-[16/9] overflow-hidden bg-slate-900">
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover object-top"
          loading="eager"
          decoding="async"
        />
        {/* Gradient overlay at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
      </div>
    </motion.div>
  );
};

export default function Hero() {
  const { socials } = portfolioData.hero;
  const reduced = prefersReducedMotion();

  const { scrollY } = useScroll();
  const textY = useTransform(scrollY, [0, 900], [0, -50]);
  const textOpacity = useTransform(scrollY, [0, 700], [1, 0]);
  const visualsY = useTransform(scrollY, [0, 900], [0, -30]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[#080e1a]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_75%_40%,rgba(59,130,246,0.07),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_20%_70%,rgba(139,92,246,0.05),transparent)]" />
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: 'radial-gradient(white 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[calc(100vh-96px)] pt-8 lg:pt-16">

          {/* LEFT — Personal introduction */}
          <motion.div
            style={reduced ? {} : { y: textY, opacity: textOpacity }}
            className="flex flex-col justify-center"
          >
            {/* Greeting */}
            <motion.div
              initial={reduced ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0 }}
              className="inline-flex items-center gap-2 mb-6 w-max"
            >
              <span className="w-8 h-px bg-blue-500" />
              <span className="text-blue-400 text-sm font-medium tracking-widest uppercase">Hi, I'm Rani.</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl md:text-5xl lg:text-[3.4rem] font-extrabold leading-[1.1] tracking-tight mb-6 text-white"
            >
              I turn ideas into
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-violet-400 to-blue-400">
                interactive digital experiences.
              </span>
            </motion.h1>

            {/* Specialization line */}
            <motion.p
              initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-slate-400 text-sm md:text-base tracking-widest uppercase mb-6 font-medium"
            >
              Websites &middot; Shopify &middot; Full Stack &middot; AI/ML
            </motion.p>

            {/* Supporting text */}
            <motion.p
              initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="text-slate-400 text-lg leading-relaxed mb-8 max-w-lg"
            >
              I build responsive websites, custom Shopify experiences, and AI-powered applications — with clean code, thoughtful design, and purposeful interactions.
            </motion.p>

            {/* Name line & Badge */}
            <motion.div
              initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex flex-col sm:flex-row sm:items-center gap-4 mb-10"
            >
              <p className="text-slate-600 text-xs font-medium tracking-widest uppercase">
                RANI GANGURDE — NASHIK, INDIA
              </p>
              <span className="hidden sm:block w-1.5 h-1.5 rounded-full bg-slate-700"></span>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold border border-blue-600/40 text-blue-400 bg-blue-500/5 w-max">
                Real work. Real storefronts.
              </span>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="flex flex-wrap gap-4 items-center"
            >
              <a
                href="#shopifywork"
                className="group inline-flex items-center gap-2 px-7 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all shadow-[0_0_24px_rgba(37,99,235,0.3)] hover:shadow-[0_0_36px_rgba(37,99,235,0.5)] hover:-translate-y-0.5"
              >
                Explore My Work
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white font-semibold rounded-xl transition-all hover:-translate-y-0.5"
              >
                Let's Connect
              </a>
            </motion.div>

            {/* Social links */}
            <motion.div
              initial={reduced ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.65 }}
              className="flex items-center gap-6 mt-10 pt-8 border-t border-slate-800"
            >
              <a href={socials.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="text-slate-500 hover:text-white transition-colors">
                <FaGithub size={20} />
              </a>
              <a href={socials.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="text-slate-500 hover:text-white transition-colors">
                <FaLinkedin size={20} />
              </a>
              <a href={`mailto:${socials.email}`} aria-label="Email" className="text-slate-500 hover:text-white transition-colors">
                <Mail size={20} />
              </a>
            </motion.div>
          </motion.div>

          {/* RIGHT — Layered Composition (Desktop) & Primary Image (Mobile) */}
          <motion.div
            style={reduced ? {} : { y: visualsY }}
            className="relative w-full h-full min-h-[300px] sm:min-h-[400px] lg:min-h-[500px] flex items-center justify-center mt-10 lg:mt-0"
          >
            {/* Tertiary: Niibhz Clothing (behind-right) - Hidden on mobile */}
            <BrowserFrame
              src="/images/niibhz-clothing.png"
              alt="Niibhz Clothing"
              label="Niibhz Clothing"
              className="hidden lg:block absolute z-0"
              style={{ 
                right: '-5%', 
                top: '5%', 
                rotate: 2, 
                width: '65%' 
              }}
              initial={reduced ? { opacity: 1, scale: 0.8 } : { opacity: 0, scale: 0.75 }}
              animate={{ opacity: 0.6, scale: 0.8 }}
              transition={{ duration: 0.8, delay: 0.75 }}
              whileHover={reduced ? {} : { y: -4, opacity: 0.9, zIndex: 30 }}
            />

            {/* Secondary: Shabari Naturals (behind-left) - Hidden on mobile */}
            <BrowserFrame
              src="/images/shabari-naturals.png"
              alt="Shabari Naturals"
              label="Shabari Naturals"
              className="hidden lg:block absolute z-10"
              style={{ 
                left: '-5%', 
                top: '-5%', 
                rotate: -3, 
                width: '65%' 
              }}
              initial={reduced ? { opacity: 1, scale: 0.85 } : { opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.8, scale: 0.85 }}
              transition={{ duration: 0.8, delay: 0.65 }}
              whileHover={reduced ? {} : { y: -4, opacity: 1, zIndex: 30 }}
            />

            {/* Primary: Noah Naturals (front-center) - Visible everywhere */}
            <BrowserFrame
              src="/images/noah-naturals.png"
              alt="Noah Naturals"
              label="Noah Naturals"
              className="relative lg:absolute lg:left-[15%] lg:top-[15%] w-full lg:w-[70%] z-20 shadow-2xl"
              initial={reduced ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              whileHover={reduced ? {} : { y: -4 }}
            />
          </motion.div>

        </div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-600"
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}>
            <ArrowDown size={14} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
