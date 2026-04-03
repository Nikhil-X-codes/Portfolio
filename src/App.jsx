import { useEffect, useState } from 'react'
import { StarfieldBackground } from './components/ui/Starfield'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Projects from './components/Projects'
import Skills from './components/Skills'
import ContactUs from './components/ContactUs'


export default function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 850)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in')
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -30px 0px' }
    )

    document.querySelectorAll('.scroll-animate').forEach((el) => {
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

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
      <StarfieldBackground 
      count={650}
      speed={0.4}
      starColor="#ffffff"
      twinkle={true}
        className="pointer-events-none"
      />

      {isLoading && (
        <div className="loading-screen">
          <div className="loading-track">
            <div className="loading-bar" />
          </div>
        </div>
      )}

      <div className="site-bg" aria-hidden="true">
        <div className="bg-mesh" />
        <div className="bg-orb bg-orb-purple parallax-layer" />
        <div className="bg-orb bg-orb-cyan parallax-layer parallax-layer-fast" />
      </div>

      <div className="app-shell relative z-10 bg-transparent text-slate-100 transition-colors duration-500 ease-in-out">
        <Navbar />

        <main>
          <Home />
          <Projects />
          <Skills />
          <ContactUs />
        </main>
      </div>
    </div>
  )
}
