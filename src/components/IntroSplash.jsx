import { useState, useCallback } from 'react'

export default function IntroSplash({ onEnter }) {
  const [opened, setOpened] = useState(false)
  const [hidden, setHidden] = useState(false)

  const handleClick = useCallback(() => {
    setOpened(true)
    // After hands finish animating apart, fade out the overlay then call onEnter
    setTimeout(() => {
      setHidden(true)
      onEnter?.()
    }, 1500)
  }, [onEnter])

  if (hidden) return null

  return (
    <div
      className={`intro-splash ${opened ? 'intro-opened' : ''}`}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        overflow: 'hidden',
        transition: 'opacity 0.8s ease',
        opacity: opened ? 0 : 1,
        transitionDelay: opened ? '1s' : '0s',
        pointerEvents: opened ? 'none' : 'auto',
      }}
    >
      {/* Left half */}
      <div
        className="intro-hand-left-container"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '50%',
          height: '100%',
          overflow: 'hidden',
          transform: opened ? 'translateX(-100%)' : 'translateX(0)',
          transition: 'transform 1.5s cubic-bezier(0.65, 0, 0.15, 1)',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundImage: 'url(/images/hands-splash.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        {/* Dark overlay for depth on outer edge */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to right, rgba(10,10,10,0.5), transparent)',
        }} />
      </div>

      {/* Right half */}
      <div
        className="intro-hand-right-container"
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '50%',
          height: '100%',
          overflow: 'hidden',
          transform: opened ? 'translateX(100%)' : 'translateX(0)',
          transition: 'transform 1.5s cubic-bezier(0.65, 0, 0.15, 1)',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '100vw',
            height: '100vh',
            backgroundImage: 'url(/images/hands-splash.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        {/* Dark overlay for depth on outer edge */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to left, rgba(10,10,10,0.5), transparent)',
        }} />
      </div>

      {/* Subtle grain overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'rgba(15,15,15,0.2)',
        pointerEvents: 'none',
        zIndex: 2,
        opacity: opened ? 0 : 1,
        transition: 'opacity 0.8s ease',
      }} />

      {/* Center split line glow */}
      <div
        className="intro-center-glow"
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: opened ? '100vw' : '2px',
          height: '100%',
          background: opened
            ? 'radial-gradient(ellipse at center, rgba(251,191,36,0.15), transparent 70%)'
            : 'linear-gradient(180deg, transparent, rgba(251,191,36,0.5), rgba(251,191,36,0.8), rgba(251,191,36,0.5), transparent)',
          transition: 'width 1.2s cubic-bezier(0.65, 0, 0.15, 1), background 1s ease',
          zIndex: 3,
          pointerEvents: 'none',
          opacity: opened ? 0 : 1,
        }}
      />

      {/* Button container */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10,
          opacity: opened ? 0 : 1,
          transform: opened ? 'scale(0.8)' : 'scale(1)',
          transition: 'opacity 0.5s ease, transform 0.8s ease',
        }}
      >
        <button
          onClick={handleClick}
          className="intro-btn"
        >
          View My Portfolio
        </button>
      </div>
    </div>
  )
}
