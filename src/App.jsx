import { useEffect } from 'react'
import Navbar from './components/Navbar'
import { Vortex } from './components/ui/vortex.jsx'
import Home from './components/Home'
import Projects from './components/Projects'
import Skills from './components/Skills'
import ContactUs from './components/ContactUs'

export default function App() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    document.querySelectorAll('.scroll-animate').forEach((el) => {
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <Vortex
      backgroundColor="#000000"
      rangeY={800}
      particleCount={500}
      baseHue={120}
      containerClassName="min-h-dvh w-full"
      className="min-h-dvh w-full"
    >
      <div className="relative w-full overflow-x-hidden">
        <div className="relative z-10 min-h-dvh text-gray-100">
          <Navbar />

          <main>
            <Home />
            <Projects />
            <Skills />
            <ContactUs />
          </main>
        </div>
      </div>
    </Vortex>
  )
}
