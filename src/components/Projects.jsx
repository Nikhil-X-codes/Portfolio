import { ExternalLink } from 'lucide-react'
import { useMemo } from 'react'

export default function Projects() {
  const projects = useMemo(
    () => [
      {
        title: 'Vidcast',
        desc: 'A video streaming platform with Video Upload & search, Likes, Comments, Subscription and Playlist Management.',
        tech: ['MongoDB', 'Express.js', 'React', 'Node.js'],
        link: 'https://vidcast12.vercel.app',
        image: '/images/default-project.png',
      },
      {
        title: 'BusEase',
        desc: 'A Bus Ticket Booking System with virtual credit card, seat selection, booking and booking history features.',
        tech: ['MongoDB', 'Express.js', 'React', 'Node.js'],
        link: 'https://bus-ease-omega.vercel.app',
        image: '/images/default-project.png',
      },
      {
        title: 'Bankruptcy Prediction',
        desc: 'A ML classification model to predict likelihood of company bankruptcy using financial ratios.',
        tech: ['Python', 'Machine Learning'],
        link: 'https://github.com/Nikhil-X-codes/Company-Bankruptcy-Prediction',
        image: '/images/default-project.png',
      },
      {
        title: 'AI Blog Generation',
        desc: 'AI-powered blogging platform generating complete blog posts with images, editing, tone control and exports.',
        tech: ['MongoDB', 'Express.js', 'React', 'Node.js'],
        link: 'https://ai-blog-generate.vercel.app',
        image: '/images/default-project.png',
      },
    ],
    []
  )

  return (
    <section id="projects" className="relative ui-section overflow-hidden">
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="mb-10 sm:mb-12 scroll-animate from-bottom">
          <p className="ui-kicker mb-2">Selected Work</p>
          <h2 className="ui-title mb-3">Projects</h2>
          <div className="ui-divider"></div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 auto-rows-fr">

          {projects.map((p, idx) => (
            <div
              key={p.title}
              className="scroll-animate h-full"
            >
              <article className="ui-card group h-full overflow-hidden transition-all duration-300 hover:-translate-y-1 rounded-[2.5rem]">
                <div className="relative overflow-hidden p-3 pb-0">
                  <div className="overflow-hidden rounded-t-[3.5rem] rounded-b-2xl border border-white/5 relative">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-1.5 bg-white/20 rounded-full z-10 mt-3 blur-[0.2px]" />
                    <img
                      src={p.image}
                      alt={p.title}
                      className="h-52 w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#061128]/80 via-transparent to-transparent" />
                </div>

                <div className="p-6 sm:p-7 flex flex-col">
                  <div className="mb-4 flex items-center justify-between">
                    <p className="text-[11px] tracking-[0.2em] uppercase font-semibold text-gray-400/95">
                      Case Study {String(idx + 1).padStart(2, '0')}
                    </p>
                    <button
                      onClick={() => window.open(p.link, '_blank')}
                      className="inline-flex items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 p-2.5 text-white shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-all duration-300 hover:scale-110 hover:shadow-[0_0_25px_rgba(34,211,238,0.5)] active:scale-95"
                      aria-label={`Open ${p.title}`}
                    >
                      <ExternalLink className="h-4.5 w-4.5" />
                    </button>
                  </div>

                  <h3 className="mb-4 text-3xl sm:text-4xl font-semibold leading-tight text-gray-200">
                    {p.title}
                  </h3>

                  <p className="mb-7 text-base sm:text-[1.1rem] leading-relaxed text-slate-300/90">
                    {p.desc}
                  </p>

                  <div className="flex flex-wrap gap-2.5 mt-auto">
                    {p.tech.map((t) => (
                      <span
                        key={t}
                        className="ui-pill px-4 py-1.5 text-xs font-semibold uppercase tracking-wide"
                      >
                        {t}
                      </span>
                    ))
                    }
                  </div>
                </div>
              </article>
            </div>
          ))}

        </div>
      </div>
    </section>
  )
}