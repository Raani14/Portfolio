import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hovered, setHovered] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Detect touch device — disable cursor on mobile
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouch(true);
      return;
    }

    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', move);

    const addHover = () => {
      document.querySelectorAll('a, button, [data-cursor-hover]').forEach((el) => {
        el.addEventListener('mouseenter', () => setHovered(true));
        el.addEventListener('mouseleave', () => setHovered(false));
      });
    };
    addHover();

    return () => window.removeEventListener('mousemove', move);
  }, []);

  if (isTouch) return null;

  return (
    <>
      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full border border-blue-400/60 mix-blend-difference"
        animate={{
          x: pos.x - 20,
          y: pos.y - 20,
          width: hovered ? 44 : 40,
          height: hovered ? 44 : 40,
          opacity: hovered ? 0.8 : 0.5,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 25, mass: 0.5 }}
      />
      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-blue-400"
        animate={{
          x: pos.x - 4,
          y: pos.y - 4,
          scale: hovered ? 1.5 : 1,
        }}
        style={{ width: 8, height: 8 }}
        transition={{ type: 'spring', stiffness: 600, damping: 30 }}
      />
    </>
  );
}
