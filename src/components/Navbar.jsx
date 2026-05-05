import { useEffect, useState } from 'react'
import { Menu, X, Home, FolderGit2, Code2, Mail } from 'lucide-react'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 14)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navItems = [
    { id: 'home',     label: 'Home',       icon: Home },
    { id: 'projects', label: 'Projects',   icon: FolderGit2 },
    { id: 'about',    label: 'Tech Stack', icon: Code2 },
    { id: 'contact',  label: 'Contact',    icon: Mail },
  ]

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ease-in-out ${
        scrolled
          ? 'border-b border-teal-500/20 bg-black/40 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,210,180,0.08)]'
          : 'border-b border-transparent bg-transparent backdrop-blur-none'
      }`}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">

          {/* Logo */}
          <a href="#home" className="flex items-center gap-2 font-semibold group">
            <span className="relative text-lg font-bold bg-gradient-to-r from-teal-300 via-cyan-200 to-teal-400 bg-clip-text text-transparent transition-all duration-300 group-hover:from-teal-200 group-hover:to-cyan-300">
              Nikhil Nagar
            </span>
            {/* teal underline glow on hover */}
            <span className="absolute bottom-0 left-0 h-px w-0 bg-teal-400/60 transition-all duration-300 group-hover:w-full" />
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map(({ id, label, icon: Icon }) => (
              <a
                key={id}
                href={`#${id}`}
                className="group relative flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm text-teal-100/70 transition-all duration-300 hover:text-teal-300 hover:bg-teal-500/10"
              >
                <Icon className="h-4 w-4 text-teal-400/50 transition-all duration-300 group-hover:text-teal-400 group-hover:-translate-y-0.5" />
                <span>{label}</span>
                {/* active glow dot */}
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 w-0 rounded-full bg-teal-400/70 transition-all duration-300 group-hover:w-4" />
              </a>
            ))}
          </nav>

          {/* Mobile toggle */}
          <button
            aria-label="Open menu"
            className="md:hidden rounded-lg p-2 text-teal-200 hover:bg-teal-500/10 transition-colors duration-200"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden border-t border-teal-500/15 bg-black/75 backdrop-blur-xl">
          <div className="mx-auto max-w-6xl px-4 py-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-semibold text-teal-300/80 tracking-widest uppercase">Menu</span>
              <button
                aria-label="Close menu"
                className="rounded-lg p-2 text-teal-200 hover:bg-teal-500/10 transition-colors duration-200"
                onClick={() => setMobileOpen(false)}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="grid gap-1">
              {navItems.map(({ id, label, icon: Icon }) => (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-teal-100/80 hover:text-teal-300 hover:bg-teal-500/10 transition-all duration-200"
                >
                  <Icon className="h-4 w-4 text-teal-400/60" />
                  <span className="text-sm font-medium">{label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
