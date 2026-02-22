import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Projects from './components/Projects'
import Skills from './components/Skills'
import ContactUs from './components/ContactUs'
import Lightning from './components/ui/Lightning'


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
    <div className="relative w-full min-h-screen overflow-x-hidden">
      {/* Global Lightning Background */}
      <div className="fixed inset-0 z-0 opacity-30">
        <Lightning
          hue={200}
          xOffset={0}
          speed={0.5}
          intensity={0.85}
          size={1}
        />
      </div>

      <div className="relative z-10 min-h-screen bg-white text-gray-900 transition-colors duration-300 dark:bg-gray-900 dark:text-gray-100">
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
