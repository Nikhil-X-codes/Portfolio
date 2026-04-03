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
    { id: 'home', label: 'Home', icon: Home },
    { id: 'projects', label: 'Projects', icon: FolderGit2 },
    { id: 'about', label: 'Tech Stack', icon: Code2 },
    { id: 'contact', label: 'Contact', icon: Mail }
  ]

  return (
    <header
      className={`sticky top-0 z-100 transition-all duration-500 ease-in-out ${scrolled
          ? 'border-b border-white/10 bg-black/25 backdrop-blur-xl shadow-[0_18px_45px_rgba(0,0,0,0.4)]'
          : 'border-b border-transparent bg-transparent backdrop-blur-none'
        }`}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <a href="#home" className="flex items-center gap-2 font-semibold">
            <span className="text-lg font-bold bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400 bg-clip-text text-transparent">Nikhil Nagar</span>
          </a>

          <nav className="hidden md:flex items-center gap-6">
            {navItems.map(({ id, label, icon: Icon }) => (
              <a
                key={id}
                href={`#${id}`}
                className="group flex items-center gap-2 text-slate-200/90 transition-all duration-300 hover:text-gray-300"
              >
                <Icon className="h-4 w-4 text-gray-400/80 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:text-gray-300" />
                <span>{label}</span>
              </a>
            ))}
          </nav>

          <button
            aria-label="Open menu"
            className="md:hidden rounded-lg p-2 text-slate-200 hover:bg-gray-700/20"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-gray-700/30 bg-slate-950/95">
          <div className="mx-auto max-w-6xl px-4 py-3">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-100">Menu</span>
              <button
                aria-label="Close menu"
                className="rounded-lg p-2 text-slate-200 hover:bg-gray-700/20"
                onClick={() => setMobileOpen(false)}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-3 grid gap-2">
              {navItems.map(({ id, label, icon: Icon }) => (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl px-3 py-2 text-slate-200 hover:bg-gray-700/20 flex items-center gap-2"
                >
                  <Icon className="h-4 w-4 text-gray-400" />
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
