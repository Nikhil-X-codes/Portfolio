import { useState, useEffect } from 'react'
import { ArrowRight, Mail, Github, Linkedin, Code2 } from 'lucide-react'

export default function Home() {
  const roles = ['Keep Building', 'Lifelong Learner', 'AI/ML Enthusiast', 'Problem Solver']
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentRole = roles[currentRoleIndex]
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentRole.length) {
          setDisplayText(currentRole.slice(0, displayText.length + 1))
        } else {
          setTimeout(() => setIsDeleting(true), 1500)
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1))
        } else {
          setIsDeleting(false)
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length)
        }
      }
    }, isDeleting ? 50 : 100)

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, currentRoleIndex, roles])

  const handleRipple = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    event.currentTarget.style.setProperty('--ripple-x', `${event.clientX - rect.left}px`)
    event.currentTarget.style.setProperty('--ripple-y', `${event.clientY - rect.top}px`)
  }

  return (
    <section id="home" className="relative ui-section min-h-screen flex items-center justify-center overflow-hidden">
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="ui-card scroll-animate from-left backdrop-blur-lg p-6 sm:p-10 lg:p-12 hover:shadow-2xl transition-shadow duration-500">
          <div className="grid items-start gap-8 lg:gap-12 lg:grid-cols-[1fr_220px]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-gray-400/35 bg-gray-500/10 px-4 py-1.5 text-[11px] font-semibold tracking-[0.18em] text-gray-200 uppercase">
                <span className="h-2 w-2 rounded-full bg-gray-300" />
                Available for new projects
              </div>

              <h2 className="mt-7 text-3xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] text-slate-100">
                Hi, I&apos;m Nikhil.
                <br />
                <span className="bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent">I build modern, scalable web experiences.</span>
              </h2>

              <p className="mt-4 text-base sm:text-lg text-gray-100/90 h-8">
                <span>{displayText}</span>
                <span className="animate-pulse">|</span>
              </p>

              <p className="mt-5 text-base sm:text-lg leading-relaxed text-slate-300 max-w-2xl">
               I am Information Technology student at IIIT Sonepat with strong experience in building web applications, a solid foundation in Data Structures and Algorithms, and a keen interest in Artificial Intelligence and Machine Learning.
              </p>

              <div className="mt-8 sm:mt-10 flex flex-wrap gap-3 sm:gap-4">
                <a
                  href="#projects"
                  onMouseMove={handleRipple}
                  className="btn rounded-2xl px-6 sm:px-7 py-3.5 text-base sm:text-lg font-semibold gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_35px_rgba(6,182,212,0.5)] transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  View Projects
                  <ArrowRight className="h-5 w-5" />
                </a>

                <a
                  href="#contact"
                  className="btn rounded-2xl px-6 sm:px-7 py-3.5 text-base sm:text-lg font-semibold gap-2 border border-white/10 bg-white/5 text-gray-200 hover:bg-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-sm"
                >
                  Get in Touch
                  <Mail className="h-5 w-5" />
                </a>
              </div>
            </div>

            <div className="mx-auto w-fit lg:mt-10 scroll-animate from-scale">
              <div className="rounded-3xl border border-gray-400/25 bg-slate-900/40 p-2 shadow-[0_0_34px_rgba(100,100,100,0.15)]">
                <img
                  src="/images/profile.jpg"
                  alt="Nikhil Nagar"
                  className="h-56 w-40 sm:h-60 sm:w-44 rounded-2xl object-cover grayscale"
                />
              </div>
              <div className="mt-6 flex items-center justify-center gap-4">
                <a
                  href="https://github.com/Nikhil-X-codes"
                  target="_blank"
                  rel="noreferrer"
                  className="social-link group relative"
                  aria-label="GitHub"
                >
                  <div className="social-icon">
                    <Github className="h-5 w-5" />
                  </div>
                  <span className="social-label">GitHub</span>
                </a>

                <a
                  href="https://www.linkedin.com/in/nikhil2310"
                  target="_blank"
                  rel="noreferrer"
                  className="social-link group relative"
                  aria-label="LinkedIn"
                >
                  <div className="social-icon">
                    <Linkedin className="h-5 w-5" />
                  </div>
                  <span className="social-label">LinkedIn</span>
                </a>

                <a
                  href="https://codolio.com/profile/J6G0HHGi"
                  target="_blank"
                  rel="noreferrer"
                  className="social-link group relative"
                  aria-label="Codolio"
                >
                  <div className="social-icon">
                    <Code2 className="h-5 w-5" />
                  </div>
                  <span className="social-label">Codolio</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
