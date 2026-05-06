import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Projects from './components/Projects'
import Skills from './components/Skills'
import ContactUs from './components/ContactUs'
import ShaderBackground from './components/ui/ShaderBackground'
import IntroSplash from './components/IntroSplash'


export default function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [splashDone, setSplashDone] = useState(false)

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
      {/* WebGL Shader — full-screen fixed background for all sections */}
      <ShaderBackground />

      {/* Intro splash — hands that part to reveal portfolio */}
      {!splashDone && <IntroSplash onEnter={() => setSplashDone(true)} />}

      {isLoading && (
        <div className="loading-screen">
          <div className="loading-track">
            <div className="loading-bar" />
          </div>
        </div>
      )}

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
