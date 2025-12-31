import { useEffect, useMemo, useRef, useState } from 'react'
import {
  Github,
  Linkedin,
  Mail,
  Code,
  Menu,
  X,
  ExternalLink,
  Braces,
  Library,
  Server,
  Database,
  GitBranch,
  Palette,
  Brain,
  Cpu,
  BookOpen,
  Book
} from 'lucide-react'
import emailjs from '@emailjs/browser'

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState(null)
  const formRef = useRef(null)

  useEffect(() => {
    const timer = status === 'success' ? setTimeout(() => setStatus(null), 3000) : undefined
    return () => timer && clearTimeout(timer)
  }, [status])

  const profiles = useMemo(
    () => [
      { name: 'GitHub', url: 'https://github.com/Nikhil-X-codes', icon: Github },
      { name: 'LinkedIn', url: 'https://www.linkedin.com/in/nikhil2310', icon: Linkedin },
      { name: 'Email', url: 'mailto:nagarn2005@gmail.com', icon: Mail },
      { name: 'Codolio', url: 'https://codolio.com/profile/J6G0HHGi', icon: Code},
      { name: 'Research Paper', url: 'https://drive.google.com/drive/folders/1ETdlrfZtmvJTdfi4mo8kRuuqx8Cr6vMr?usp=drive_link', icon: Book},
    ],
    []
  )

  const projects = useMemo(
    () => [
      {
        title: 'Vidcast',
        desc: 'A video streaming platform with Video Upload & search , Likes , Comments , Subscription and playlist Management.',
        tech: ['MongoDB','Express.js', 'React', 'Node.js'],
        link: 'https://vidcast.vercel.app',
      },
      {
        title: 'BusEase',
        desc: 'A Bus Ticket Booking System with virtual credit card , seat selection , Booking and booking history features.',
        tech: ['MongoDB','Express.js', 'React', 'Node.js'],
        link: 'https://bus-ease-beta.vercel.app',
      },
      {
        title: 'AI-Driven Web Development',
        desc: 'A web application which integrate Two LLM Models through Hugging Face interferece to assist AI related tasks.',
        tech: ['Postgresql','Express.js', 'React', 'Node.js'],
        link: 'https://web-dev-with-ai-intergration.vercel.app',
      },
      {
        title: 'Whatsapp Chat Analyzer',
        desc: 'A Streamlit Application to analyze Whatsapp Chat Data with various visualizations and statistics at individual as well as group level.',
        tech: ['Python', 'Streamlit', 'Data Analysis'],
        link: 'https://wpchat-analysis.streamlit.app',
      },
      {
        title: 'Company Bankruptcy Prediction',
        desc: 'A Classification Machine Learning Model to predict the likelihood of a company going bankrupt based on its financial ratios and other relevant features.',
        tech: ['Python','Machine Learning'],
        link: 'https://github.com/Nikhil-X-codes/Company-Bankruptcy-Prediction',
      },

    ],
    []
  )

  const skills = useMemo(
    () => [
      { name: 'JavaScript', icon: Braces },
      { name: 'React', icon: Library },
      { name: 'Express.js', icon: Server },
      { name: 'Node.js', icon: Server },
      { name: 'MongoDB', icon: Database },
      { name: 'PostgreSQL', icon: Database },
      { name: 'MySQL', icon: Database },
      { name: 'Tailwind CSS', icon: Palette },
      { name: 'Git & GitHub', icon: GitBranch },
      { name: 'C++', icon: Cpu },
      { name: 'Python', icon: Cpu },
      { name: 'Machine Learning', icon: Brain },
      { name: 'Deep Learning', icon: Brain },
      { name: 'Deployment', icon: Server },
      { name: 'Data Structures & Algorithms', icon: Cpu },
      { name: 'Core Subjects', icon: BookOpen }
    ],
    []
  )

  const handleSubmit = async (e) => {
    e.preventDefault()
    const emailOk = /.+@.+\..+/.test(form.email)
    if (!form.name || !emailOk || !form.message) {
      setStatus('error')
      setTimeout(() => setStatus(null), 3000)
      return
    }

    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

      if (!serviceId || !templateId || !publicKey) {
        setStatus('success')
        setForm({ name: '', email: '', message: '' })
        return
      }

      await emailjs.sendForm(serviceId, templateId, formRef.current, {
        publicKey,
      })
      setStatus('success')
      setForm({ name: '', email: '', message: '' })
    } catch (err) {
      console.error('EmailJS error:', err)
      setStatus('error')
    }
  }

  return (
    <div>
      <div className="min-h-dvh bg-white text-gray-900 transition-colors duration-300 dark:bg-gray-900 dark:text-gray-100">
        <header className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b border-gray-200/60 dark:bg-gray-900/70 dark:border-gray-800/60">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <a href="#home" className="flex items-center gap-2 font-semibold">
                <span className="inline-block h-6 w-6 rounded bg-gradient-to-r" />
              </a>

              <nav className="hidden md:flex items-center gap-6">
                <a href="#home" className="hover:text-blue-600 transition-colors duration-300">Home</a>
                <a href="#projects" className="hover:text-blue-600 transition-colors duration-300">Projects</a>
                <a href="#about" className="hover:text-blue-600 transition-colors duration-300">Skills</a>
                <a href="#contact" className="hover:text-blue-600 transition-colors duration-300">Contact</a>
              </nav>

              <button
                aria-label="Open menu"
                className="md:hidden rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => setMobileOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>

          {mobileOpen && (
            <div className="md:hidden border-t border-gray-200 dark:border-gray-800">
              <div className="mx-auto max-w-6xl px-4 py-3">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">Menu</span>
                  <button
                    aria-label="Close menu"
                    className="rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                    onClick={() => setMobileOpen(false)}
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <div className="mt-3 grid gap-2">
                  {['home', 'projects', 'about', 'contact'].map((id) => (
                    <a
                      key={id}
                      href={`#${id}`}
                      onClick={() => setMobileOpen(false)}
                      className="rounded px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      {id[0].toUpperCase() + id.slice(1)}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          )}
        </header>

        <main>
          <section id="home" className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div className="slide-in-left">
                <h2 className="text-4xl sm:text-5xl font-bold mb-4">Hi, I&apos;m Nikhil Nagar</h2>
                <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300">
                  Software Developer | Lifelong Learner
                </p>
                <p className="mt-4 text-gray-600 dark:text-gray-400">
                  I am Third Year Information Technology Student at IIIT Sonepat. I Have Expertise in Building Web Applications , Machine Learning and Deep Learning Prediction Models.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  {profiles.map(({ name, url, icon: Icon }) => (
                    <a
                      key={name}
                      href={url}
                      target="_blank"
                      rel="noreferrer"
                      className="social-btn inline-flex items-center gap-2 rounded border border-gray-200 dark:border-gray-800 px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      <Icon className="h-5 w-5" />
                      <span>{name}</span>
                    </a>
                  ))}
                </div>
              </div>
        <img
  src={/images/profile.jpg}
  alt="Nikhil Nagar"
  className="profile-image w-80 h-80 rounded-full object-cover border-4 border-blue-500 slide-in-right"
/>
            </div>
          </section>

          <section id="projects" className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
            <div className="flex items-end justify-between fade-in-up">
              <h2 className="text-3xl font-bold">Projects</h2>
            </div>
            <div className="mt-8 grid sm:grid-cols-2 gap-6">
              {projects.map((p, idx) => (
                <div 
                  key={p.title} 
                  className="project-card rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden fade-in-up"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className="p-6">
                    <h3 className="text-xl font-semibold">{p.title}</h3>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">{p.desc}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {p.tech.map((t) => (
                        <span
                          key={t}
                          className="rounded bg-gray-100 dark:bg-gray-800 px-2 py-1 text-sm transition-all hover:bg-blue-500 hover:text-white"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="p-6 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between">
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 hover:text-blue-700 inline-flex items-center gap-2 transition-colors"
                    >
                      View Project <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section id="about" className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
            <h2 className="text-3xl font-bold fade-in-up">Skills</h2>
            <div className="mt-8 grid md:grid-cols-2 gap-6">
              {skills.map((skill, idx) => {
                const Icon = skill.icon
                return (
                  <div 
                    key={skill.name} 
                    className="skill-card fade-in-up"
                    style={{ animationDelay: `${idx * 0.05}s` }}
                  >
                    <div className="skill-card-inner bg-gray-900 px-4 py-4 flex items-center gap-3">
                      <Icon className="h-6 w-6 text-blue-400 flex-shrink-0" />
                      <span className="text-gray-100 font-medium">{skill.name}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>

          <section id="contact" className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
            <h2 className="text-3xl font-bold fade-in-up">Contact</h2>
            <form ref={formRef} className="mt-6 grid gap-4 sm:max-w-md fade-in-up" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Your Name"
                className="rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 dark:text-gray-100 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={form.name}
                name="user_name"
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                required
              />
              <input
                type="email"
                placeholder="you@example.com"
                className="rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 dark:text-gray-100 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={form.email}
                name="user_email"
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                required
              />
              <textarea
                placeholder="Message"
                rows={5}
                className="rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 dark:text-gray-100 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={form.message}
                name="message"
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                required
              />
              <button
                type="submit"
                className="rounded bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2 font-medium text-white hover:opacity-90 disabled:opacity-50 transition-all duration-300 transform hover:scale-105"
                disabled={status === 'loading'}
              >
                {status === 'loading' ? 'Sending...' : 'Send'}
              </button>
              {status === 'success' && (
                <p className="text-green-600 animate-bounce">Message sent! I&apos;ll get back to you soon.</p>
              )}
              {status === 'error' && (
                <p className="text-red-600">Please fill all fields with a valid email.</p>
              )}
            </form>
          </section>



        </main>


      </div>
    </div>
  )
}
