import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Heart } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { portfolioData } from '../data/portfolioData';

export default function Footer() {
  const { socials } = portfolioData.hero;

  return (
    <footer className="bg-slate-950 border-t border-slate-800/60 py-14">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-10">
          {/* Brand */}
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-extrabold text-white tracking-tight mb-1">
              Rani<span className="text-blue-500">.</span>
            </h3>
            <p className="text-slate-500 text-sm">
              Software Developer · Full Stack · Shopify · AI/ML
            </p>
          </div>

          {/* Navigation */}
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-slate-500">
            {[
              { name: 'About', href: '#about' },
              { name: 'Skills', href: '#skills' },
              { name: 'Experience', href: '#experience' },
              { name: 'Projects', href: '#projects' },
              { name: 'Shopify', href: '#shopifywork' },
              { name: 'Contact', href: '#contact' },
            ].map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Socials */}
          <div className="flex items-center gap-4">
            {[
              { href: socials.github, icon: FaGithub, label: 'GitHub profile of Rani Rakesh Gangurde' },
              { href: socials.linkedin, icon: FaLinkedin, label: 'LinkedIn profile of Rani Rakesh Gangurde' },
              { href: `mailto:${socials.email}`, icon: Mail, label: 'Email Rani Rakesh Gangurde' },
            ].map(({ href, icon: Icon, label }) => (
              <motion.a
                key={href}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noreferrer' : undefined}
                aria-label={label}
                whileHover={{ scale: 1.15, y: -2 }}
                className="w-10 h-10 bg-slate-800 hover:bg-slate-700 rounded-full flex items-center justify-center text-slate-400 hover:text-white transition-colors border border-slate-700/50"
              >
                <Icon size={17} />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-slate-800/60 mb-8" />

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
          <p>© 2026 Rani Gangurde. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Built with <Heart className="w-3.5 h-3.5 text-red-500" /> using React · Node.js · MongoDB
          </p>
        </div>
      </div>
    </footer>
  );
}
