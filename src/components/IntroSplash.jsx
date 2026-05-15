import { useState } from 'react';

export default function IntroSplash({ onEnter }) {
  const [isOpening, setIsOpening] = useState(false);

  const handleClick = () => {
    setIsOpening(true);
    // Wait for curtain animation to finish before calling onEnter
    setTimeout(() => {
      onEnter();
    }, 1200);
  };

  return (
    <div
      className="fixed inset-0 z-[100] pointer-events-auto"
    >
      {/* ── Single Full-Screen Splash Image ── */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          transition: 'transform 1.2s cubic-bezier(0.77, 0, 0.175, 1), opacity 1s cubic-bezier(0.77, 0, 0.175, 1)',
          transform: isOpening ? 'scale(1.15)' : 'scale(1)',
          opacity: isOpening ? 0 : 1,
        }}
      >
        <img
          src="/images/hands-splash.png"
          alt=""
          className="w-full h-full object-cover object-center"
          draggable={false}
        />
        {/* Dark overlay tint */}
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* ── CTA Button ── */}
      <div
        className="absolute inset-0 z-20 flex items-center justify-center transition-opacity duration-300"
        style={{ opacity: isOpening ? 0 : 1, pointerEvents: isOpening ? 'none' : 'auto' }}
      >
        <button
          onClick={handleClick}
          className="intro-btn"
        >
          View My Portfolio
        </button>
      </div>
    </div>
  );
}
