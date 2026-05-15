import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Projects from './components/Projects'
import Skills from './components/Skills'
import ContactUs from './components/ContactUs'
import Achievements from './components/Achievements'
import Education from './components/Education'
import SplashCursor from './components/SplashCursor'
import IntroSplash from './components/IntroSplash'
import { DarkMultiplierGrid } from './components/ui/grid-background'


export default function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [showSplash, setShowSplash] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 850)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (showSplash) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add stagger delay based on sibling index for grouped reveals
            const parent = entry.target.parentElement;
            if (parent) {
              const siblings = Array.from(parent.querySelectorAll(':scope > .scroll-animate'));
              const idx = siblings.indexOf(entry.target);
              if (idx > 0) {
                entry.target.style.transitionDelay = `${idx * 120}ms`;
              }
            }
            entry.target.classList.add('animate-in');
          }
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    )

    // Small delay to ensure DOM is fully ready after splash removal
    const timer = setTimeout(() => {
      document.querySelectorAll('.scroll-animate').forEach((el) => {
        observer.observe(el)
      })
    }, 100)

    return () => {
      clearTimeout(timer)
      observer.disconnect()
    }
  }, [showSplash])

  useEffect(() => {
    const onScroll = () => {
      document.documentElement.style.setProperty('--scroll-y', String(window.scrollY))
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden">

      {/* Fixed Dark Grid Background – covers entire viewport */}
      <DarkMultiplierGrid className="!fixed inset-0 z-0 !min-h-0 h-screen" />

      {/* Intro Splash Curtain */}
      {showSplash && <IntroSplash onEnter={() => setShowSplash(false)} />}

      {/* Interactive fluid splash cursor overlay */}
      <SplashCursor
        SIM_RESOLUTION={128}
        DYE_RESOLUTION={1440}
        COLOR="#EF4444"
        RAINBOW_MODE={true}
      />

      {isLoading && (
        <div className="loading-screen">
          <div className="loading-track">
            <div className="loading-bar" />
          </div>
        </div>
      )}

      <div className="app-shell relative z-10 bg-transparent text-slate-100 transition-colors duration-500 ease-in-out">
        <main>
          <Home />
          <Projects />
          <Skills />
          <Achievements />
          <Education />
          <ContactUs />
        </main>
      </div>

      {/* Persistent Floating Bottom Dock Navbar */}
      <Navbar />
    </div>
  )
}
