import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [hovered, setHovered] = useState(false);
  const [hidden, setHidden] = useState(true);

  // Motion values for instant tracking
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Springs for the outer ring
  const ringX = useSpring(cursorX, { stiffness: 450, damping: 28 });
  const ringY = useSpring(cursorY, { stiffness: 450, damping: 28 });

  useEffect(() => {
    // Check if it's a touch device
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) {
      setHidden(true);
      return;
    }

    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (hidden) setHidden(false);
    };

    const handleMouseLeave = () => setHidden(true);
    const handleMouseEnter = () => setHidden(false);

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    const addHoverListeners = () => {
      const clickables = document.querySelectorAll(
        'a, button, [role="button"], input, select, textarea, [onClick], .skill-satellite-node, .planet'
      );
      
      clickables.forEach((el) => {
        el.addEventListener('mouseenter', () => setHovered(true));
        el.addEventListener('mouseleave', () => setHovered(false));
      });
    };

    // Initial binding
    addHoverListeners();

    // Re-bind listeners on DOM updates
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      observer.disconnect();
    };
  }, [cursorX, cursorY, hidden]);

  if (hidden) return null;

  return (
    <>
      {/* Central 4px dot */}
      <motion.div
        className="fixed top-0 left-0 w-[4px] h-[4px] bg-orange-500 rounded-full pointer-events-none z-[9999]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
      {/* 20px outer ring (scales to 32px on hover) */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-orange-500/50 pointer-events-none z-[9998]"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          width: hovered ? 32 : 20,
          height: hovered ? 32 : 20,
        }}
        animate={{
          scale: hovered ? 1.25 : 1,
          backgroundColor: hovered ? 'rgba(249, 115, 22, 0.08)' : 'rgba(249, 115, 22, 0)',
        }}
        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      />
    </>
  );
}
