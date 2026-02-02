import { useState } from 'react'
import { Menu, X, Home, FolderGit2, Code2, Mail } from 'lucide-react'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'projects', label: 'Projects', icon: FolderGit2 },
    { id: 'about', label: 'Skills', icon: Code2 },
    { id: 'contact', label: 'Contact', icon: Mail }
  ]

  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-white/90 border-b border-gray-200/60 dark:bg-gray-900/90 dark:border-gray-800/60 shadow-sm">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <a href="#home" className="flex items-center gap-2 font-semibold">
            <span className="text-lg font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Nikhil Nagar</span>
          </a>

          <nav className="hidden md:flex items-center gap-6">
            {navItems.map(({ id, label, icon: Icon }) => (
              <a 
                key={id}
                href={`#${id}`} 
                className="flex items-center gap-2 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-300 group"
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </a>
            ))}
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
              {navItems.map(({ id, label, icon: Icon }) => (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={() => setMobileOpen(false)}
                  className="rounded px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-2"
                >
                  <Icon className="h-4 w-4" />
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
