import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
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
  )
}
