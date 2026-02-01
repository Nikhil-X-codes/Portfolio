import { useEffect, useRef } from 'react'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Projects from './components/Projects'
import Skills from './components/Skills'
import ContactUs from './components/ContactUs'

function ParticleBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animationId
    let particles = []
    let mouse = { x: null, y: null }

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    
    resize()
    window.addEventListener('resize', resize)

    window.addEventListener('mousemove', (e) => {
      mouse.x = e.x
      mouse.y = e.y
    })

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 4 + 2
        this.speedX = (Math.random() - 0.5) * 0.8
        this.speedY = (Math.random() - 0.5) * 0.8
        this.opacity = Math.random() * 0.6 + 0.4
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (mouse.x && mouse.y) {
          const dx = mouse.x - this.x
          const dy = mouse.y - this.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          if (distance < 150) {
            this.x -= dx * 0.03
            this.y -= dy * 0.03
          }
        }

        if (this.x > canvas.width) this.x = 0
        if (this.x < 0) this.x = canvas.width
        if (this.y > canvas.height) this.y = 0
        if (this.y < 0) this.y = canvas.height
      }

      draw() {
        ctx.fillStyle = `rgba(59, 130, 246, ${this.opacity})`
        ctx.shadowBlur = 15
        ctx.shadowColor = 'rgba(59, 130, 246, 0.5)'
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.shadowBlur = 0
      }
    }

    const particleCount = Math.min(100, Math.floor((canvas.width * canvas.height) / 15000))
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    function connectParticles() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 180) {
            const opacity = (1 - distance / 180) * 0.4
            ctx.strokeStyle = `rgba(59, 130, 246, ${opacity})`
            ctx.lineWidth = 1.5
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      particles.forEach(p => {
        p.update()
        p.draw()
      })
      connectParticles()

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
    />
  )
}

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
    <div className="relative overflow-x-hidden">
      {/* Animated Particle Background */}
      <ParticleBackground />
      
      <div className="relative z-10 min-h-dvh bg-white/80 text-gray-900 transition-colors duration-300 dark:bg-gray-900/80 dark:text-gray-100">
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
