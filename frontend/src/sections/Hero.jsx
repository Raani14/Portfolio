import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Mail, ArrowRight, ArrowDown } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { portfolioData } from '../data/portfolioData';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Mini browser frame wrapping a project screenshot
function BrowserCard({ src, alt, className, style }) {
  return (
    <div
      className={`rounded-xl overflow-hidden shadow-[0_24px_60px_rgba(0,0,0,0.55)] border border-white/10 bg-slate-800 ${className}`}
      style={style}
    >
      {/* Browser chrome */}
      <div className="bg-slate-700/90 px-3 py-2 flex items-center gap-2 border-b border-white/10">
        <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
        <div className="flex-1 mx-2 bg-slate-600/60 rounded text-[9px] text-slate-400 px-2 py-0.5 truncate">{alt.split(' ')[0].toLowerCase()}.com</div>
      </div>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="w-full block"
        style={{ display: 'block', objectFit: 'cover', objectPosition: 'top' }}
      />
    </div>
  );
}

export default function Hero() {
  const { name, description, socials, photo } = portfolioData.hero;
  const { shopifyWork } = portfolioData;

  const heroRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const reduced = prefersReducedMotion();

  const { scrollY } = useScroll();
  const contentY = useTransform(scrollY, [0, 500], [0, -60]);
  const contentOpacity = useTransform(scrollY, [0, 380], [1, 0]);
  const collageY = useTransform(scrollY, [0, 500], [0, -30]);

  useEffect(() => {
    if (reduced) return;
    let rafId;
    const onMove = (e) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth - 0.5),
        y: (e.clientY / window.innerHeight - 0.5),
      };
    };
    const tick = () => {
      setMouse((prev) => ({
        x: prev.x + (mouseRef.current.x - prev.x) * 0.06,
        y: prev.y + (mouseRef.current.y - prev.y) * 0.06,
      }));
      rafId = requestAnimationFrame(tick);
    };
    window.addEventListener('mousemove', onMove);
    rafId = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafId);
    };
  }, [reduced]);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[#080e1a]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_80%_40%,rgba(59,130,246,0.07),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_20%_70%,rgba(139,92,246,0.05),transparent)]" />
      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(white 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-[calc(100vh-96px)]">

          {/* LEFT — Personal introduction */}
          <motion.div
            style={reduced ? {} : { y: contentY, opacity: contentOpacity }}
            className="flex flex-col justify-center"
          >
            {/* Greeting tag */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 mb-6 w-max"
            >
              <span className="w-8 h-px bg-blue-500" />
              <span className="text-blue-400 text-sm font-medium tracking-widest uppercase">Hi, I'm Rani</span>
            </motion.div>

            {/* Main headline */}
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

            {/* Sub text */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-slate-400 text-lg leading-relaxed mb-8 max-w-lg"
            >
              I turn ideas and Figma designs into responsive websites, Shopify experiences, and intelligent applications — with clean code and purposeful design.
            </motion.p>

            {/* Name — for SEO */}
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
                Available for freelance & full-time
              </span>
            </motion.div>
          </motion.div>

          {/* RIGHT — Real project screenshot collage */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={reduced ? {} : { y: collageY }}
            className="relative hidden lg:flex items-center justify-center h-[580px]"
          >
            {/* Main card — Noah Naturals */}
            <motion.div
              className="absolute"
              style={
                reduced
                  ? { left: '0%', top: '5%', width: '72%', rotate: '-1deg' }
                  : {
                      left: '0%',
                      top: '5%',
                      width: '72%',
                      rotate: '-1deg',
                      x: mouse.x * -12,
                      y: mouse.y * -8,
                    }
              }
              transition={{ type: 'spring', stiffness: 80, damping: 20 }}
            >
              <BrowserCard
                src="/images/noah-naturals.png"
                alt="Noah Naturals Shopify storefront developed by Rani Rakesh Gangurde"
                style={{ height: '300px' }}
              />
            </motion.div>

            {/* Secondary card — Shabari Naturals */}
            <motion.div
              className="absolute"
              style={
                reduced
                  ? { right: '0%', top: '20%', width: '55%', rotate: '2deg' }
                  : {
                      right: '0%',
                      top: '20%',
                      width: '55%',
                      rotate: '2deg',
                      x: mouse.x * 10,
                      y: mouse.y * 6,
                    }
              }
              transition={{ type: 'spring', stiffness: 70, damping: 20 }}
            >
              <BrowserCard
                src="/images/shabari-naturals.png"
                alt="Shabari Naturals Shopify storefront developed by Rani Rakesh Gangurde"
                style={{ height: '200px' }}
              />
            </motion.div>

            {/* Third card — Niibhz */}
            <motion.div
              className="absolute"
              style={
                reduced
                  ? { left: '8%', bottom: '2%', width: '50%', rotate: '1.5deg' }
                  : {
                      left: '8%',
                      bottom: '2%',
                      width: '50%',
                      rotate: '1.5deg',
                      x: mouse.x * -8,
                      y: mouse.y * 10,
                    }
              }
              transition={{ type: 'spring', stiffness: 60, damping: 18 }}
            >
              <BrowserCard
                src="/images/niibhz-clothing.png"
                alt="Niibhz Clothing Shopify storefront customized by Rani Rakesh Gangurde"
                style={{ height: '180px' }}
              />
            </motion.div>

            {/* Floating tag — "3 Live Shopify Stores" */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              style={reduced ? {} : { x: mouse.x * 15, y: mouse.y * 10 }}
              className="absolute top-0 right-4 bg-green-500/10 border border-green-500/30 rounded-xl px-4 py-2 text-green-400 text-xs font-semibold backdrop-blur-sm z-10"
            >
              ✦ 3 Live Shopify Stores
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
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
