import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function MagneticButton({ children, href, className, onClick }) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [ripples, setRipples] = useState([]);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    
    // Calculate cursor distance from button center
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    
    // Move slightly toward cursor (20% weight)
    setPosition({ x: x * 0.20, y: y * 0.20 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const handleClick = (e) => {
    const { left, top } = ref.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    const newRipple = {
      id: Date.now(),
      x,
      y
    };

    setRipples((prev) => [...prev, newRipple]);
    
    if (onClick) onClick(e);
  };

  const cleanRipple = (id) => {
    setRipples((prev) => prev.filter((r) => r.id !== id));
  };

  const content = (
    <motion.span
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 180, damping: 14, mass: 0.15 }}
      className="relative z-10 flex items-center justify-center gap-2 pointer-events-none"
    >
      {children}
    </motion.span>
  );

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className={`relative overflow-hidden inline-flex items-center justify-center ${className}`}
      style={{ willChange: 'transform' }}
    >
      {/* Ripple elements */}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          onAnimationEnd={() => cleanRipple(ripple.id)}
          className="absolute rounded-full bg-white/25 pointer-events-none animate-ripple"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: '80px',
            height: '80px',
            transform: 'translate(-50%, -50%) scale(0)',
          }}
        />
      ))}
      {content}
    </motion.a>
  );
}
