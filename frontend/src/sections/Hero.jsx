import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Mail, ArrowRight, ArrowDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { portfolioData } from '../data/portfolioData';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// All hero showcase images
const heroSlides = [
  { src: '/images/noah-naturals.png', alt: 'Noah Naturals Shopify storefront developed by Rani Rakesh Gangurde', label: 'Noah Naturals' },
  { src: '/images/shabari-naturals.png', alt: 'Shabari Naturals Shopify storefront developed by Rani Rakesh Gangurde', label: 'Shabari Naturals' },
  { src: '/images/niibhz-clothing.png', alt: 'Niibhz Clothing Shopify storefront customized by Rani Rakesh Gangurde', label: 'Niibhz Clothing' },
  { src: '/images/meru-store.png', alt: 'Meru fashion store designed by Rani Rakesh Gangurde', label: 'Meru Store' },
  { src: '/images/elanor-perfume.png', alt: 'Elanor Perfume store designed by Rani Rakesh Gangurde', label: 'Elanor Perfume' },
  { src: '/images/luminescence-store.png', alt: 'Luminescence luxury store designed by Rani Rakesh Gangurde', label: 'Luminescence' },
];

// Slide transition variants
const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 120 : -120,
    opacity: 0,
    scale: 0.94,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction) => ({
    x: direction > 0 ? -120 : 120,
    opacity: 0,
    scale: 0.94,
  }),
};

function ProjectShowcase() {
  const [[current, direction], setCurrent] = useState([0, 1]);
  const timerRef = useRef(null);
  const reduced = prefersReducedMotion();

  const goTo = useCallback((idx, dir) => {
    setCurrent([idx, dir]);
  }, []);

  const next = useCallback(() => {
    goTo((current + 1) % heroSlides.length, 1);
  }, [current, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + heroSlides.length) % heroSlides.length, -1);
  }, [current, goTo]);

  // Auto-advance every 4 seconds
  useEffect(() => {
    timerRef.current = setInterval(next, 4000);
    return () => clearInterval(timerRef.current);
  }, [next]);

  // Pause on hover
  const pause = () => clearInterval(timerRef.current);
  const resume = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(next, 4000);
  };

  const slide = heroSlides[current];

  return (
    <div
      className="relative w-full"
      onMouseEnter={pause}
      onMouseLeave={resume}
    >
      {/* Browser frame */}
      <div className="rounded-2xl overflow-hidden bg-slate-800/80 border border-slate-700/50 shadow-[0_30px_80px_rgba(0,0,0,0.5)]">
        {/* Chrome bar */}
        <div className="bg-slate-700/70 px-4 py-2.5 flex items-center gap-2.5 border-b border-slate-600/30">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
          </div>
          <div className="flex-1 bg-slate-600/40 rounded-md text-[11px] text-slate-400 px-3 py-1 font-mono truncate">
            {slide.label.toLowerCase().replace(/\s/g, '')}.com
          </div>
        </div>

        {/* Image area */}
        <div className="relative aspect-[16/9] overflow-hidden bg-slate-900">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.img
              key={current}
              src={slide.src}
              alt={slide.alt}
              custom={direction}
              variants={reduced ? {} : slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 w-full h-full object-cover object-top"
              loading={current === 0 ? 'eager' : 'lazy'}
              decoding="async"
            />
          </AnimatePresence>

          {/* Gradient overlay at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />

          {/* Project label */}
          <motion.div
            key={`label-${current}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.4 }}
            className="absolute bottom-4 left-5 bg-black/50 backdrop-blur-md rounded-lg px-3 py-1.5 text-white text-xs font-semibold border border-white/10"
          >
            {slide.label}
          </motion.div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mt-5">
        {/* Dots */}
        <div className="flex gap-2">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i, i > current ? 1 : -1)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === current
                  ? 'w-8 bg-blue-500'
                  : 'w-3 bg-slate-700 hover:bg-slate-600'
              }`}
            />
          ))}
        </div>

        {/* Arrows */}
        <div className="flex gap-2">
          <button
            onClick={prev}
            aria-label="Previous project"
            className="w-9 h-9 rounded-full border border-slate-700 hover:border-slate-500 flex items-center justify-center text-slate-400 hover:text-white transition-colors hover:bg-slate-800"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={next}
            aria-label="Next project"
            className="w-9 h-9 rounded-full border border-slate-700 hover:border-slate-500 flex items-center justify-center text-slate-400 hover:text-white transition-colors hover:bg-slate-800"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Counter */}
      <div className="mt-3 text-right text-xs text-slate-600 font-mono">
        <span className="text-blue-400">{String(current + 1).padStart(2, '0')}</span>
        <span className="mx-1">/</span>
        <span>{String(heroSlides.length).padStart(2, '0')}</span>
      </div>
    </div>
  );
}

// Mobile-only: simple horizontal scrolling strip
function MobileShowcase() {
  return (
    <div className="lg:hidden mt-10 -mx-6">
      <div className="flex gap-4 overflow-x-auto px-6 pb-4 snap-x snap-mandatory scrollbar-hide" style={{ scrollbarWidth: 'none' }}>
        {heroSlides.map((slide, i) => (
          <div
            key={i}
            className="snap-center flex-shrink-0 w-[85vw] max-w-sm rounded-xl overflow-hidden bg-slate-800 border border-slate-700/50 shadow-xl"
          >
            <div className="bg-slate-700/70 px-3 py-2 flex items-center gap-2 border-b border-slate-600/30">
              <div className="flex gap-1">
                <span className="w-2 h-2 rounded-full bg-red-400/60" />
                <span className="w-2 h-2 rounded-full bg-yellow-400/60" />
                <span className="w-2 h-2 rounded-full bg-green-400/60" />
              </div>
              <span className="text-[10px] text-slate-500 font-mono">{slide.label}</span>
            </div>
            <img
              src={slide.src}
              alt={slide.alt}
              loading="lazy"
              decoding="async"
              className="w-full aspect-[16/9] object-cover object-top"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Hero() {
  const { name, socials } = portfolioData.hero;
  const reduced = prefersReducedMotion();

  const { scrollY } = useScroll();
  const contentY = useTransform(scrollY, [0, 900], [0, -50]);
  const contentOpacity = useTransform(scrollY, [0, 700], [1, 0]);

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
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start min-h-[calc(100vh-96px)] pt-8 lg:pt-16">

          {/* LEFT — Personal introduction */}
          <motion.div
            style={reduced ? {} : { y: contentY, opacity: contentOpacity }}
            className="flex flex-col justify-center"
          >
            {/* Greeting */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 mb-6 w-max"
            >
              <span className="w-8 h-px bg-blue-500" />
              <span className="text-blue-400 text-sm font-medium tracking-widest uppercase">Hi, I'm Rani</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl md:text-5xl lg:text-[3.4rem] font-extrabold leading-[1.1] tracking-tight mb-6 text-white"
            >
              Software Developer
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-violet-400 to-blue-400">
                building web experiences,
              </span>
              <br />
              Shopify stores &amp;
              <br />
              AI-powered apps.
            </motion.h1>

            {/* Sub-text */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-slate-400 text-lg leading-relaxed mb-8 max-w-lg"
            >
              I turn ideas and Figma designs into responsive websites, Shopify experiences, and intelligent applications — with clean code and purposeful design.
            </motion.p>

            {/* SEO name */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-slate-600 text-xs font-medium tracking-widest uppercase mb-8"
            >
              Rani Rakesh Gangurde — Nashik, India
            </motion.p>

            {/* Specialty pills */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="flex flex-wrap gap-2 mb-10"
            >
              {[
                { t: 'Shopify', c: 'border-green-600/40 text-green-400 bg-green-500/5' },
                { t: 'React.js', c: 'border-blue-600/40 text-blue-400 bg-blue-500/5' },
                { t: 'Python', c: 'border-yellow-600/30 text-yellow-400 bg-yellow-500/5' },
                { t: 'AI / ML', c: 'border-violet-600/40 text-violet-400 bg-violet-500/5' },
                { t: 'Figma → Dev', c: 'border-pink-600/40 text-pink-400 bg-pink-500/5' },
              ].map(({ t, c }) => (
                <span key={t} className={`px-3 py-1 rounded-full text-xs font-semibold border ${c}`}>{t}</span>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="flex flex-wrap gap-4 items-center"
            >
              <a
                href="#projects"
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
              initial={{ opacity: 0 }}
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
              <span className="ml-auto text-xs text-slate-600 hidden sm:block">
                Available for freelance &amp; full-time
              </span>
            </motion.div>
          </motion.div>

          {/* RIGHT — Project Showcase Slider (desktop) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:block"
          >
            <ProjectShowcase />
          </motion.div>
        </div>

        {/* Mobile showcase */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <MobileShowcase />
        </motion.div>

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
