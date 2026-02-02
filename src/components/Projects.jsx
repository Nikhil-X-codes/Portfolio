import { ExternalLink } from 'lucide-react'
import { useMemo } from 'react'

export default function Projects() {
  const projects = useMemo(
    () => [
      {
        title: 'Vidcast',
        desc: 'A video streaming platform with Video Upload & search , Likes , Comments , Subscription and playlist Management.',
        tech: ['MongoDB','Express.js', 'React', 'Node.js'],
        link: 'https://vidcast12.vercel.app',
      },
      {
        title: 'BusEase',
        desc: 'A Bus Ticket Booking System with virtual credit card , seat selection , Booking and booking history features.',
        tech: ['MongoDB','Express.js', 'React', 'Node.js'],
        link: 'https://bus-ease-omega.vercel.app',
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
      {
        title: 'AI Blog Generation',
        desc: 'AI-powered blogging platform that generates complete blog posts with images, allows editing, tone control, and exports content in multiple formats.',
        tech: ['MongoDB','Express.js', 'React', 'Node.js'],
        link: 'https://ai-blog-generate.vercel.app',
      },
    ],
    []
  )

  return (
    <section id="projects" className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-12 scroll-animate from-bottom">
        <h2 className="text-3xl font-bold mb-3">Projects</h2>
        <div className="w-16 h-1.5 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((p, idx) => (
          <a 
            key={p.title}
            href={p.link}
            target="_blank"
            rel="noreferrer"
            className={`project-card-3d scroll-animate ${idx % 3 === 0 ? 'from-left' : idx % 3 === 1 ? 'from-bottom' : 'from-right'}`}
            style={{ transitionDelay: `${idx * 0.1}s` }}
          >
            <div className="project-card-container h-full">
              <div className="project-card h-full">
                <div className="relative z-10 h-full flex flex-col p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-bold text-white leading-tight max-w-xs">
                      {p.title}
                    </h3>
                    <div className="text-2xl opacity-20">✦</div>
                  </div>

                  {/* Description */}
                  <p className="text-white/75 text-sm leading-relaxed mb-4 line-clamp-3 min-h-[60px]">
                    {p.desc}
                  </p>

                  {/* Technologies */}
                  <div className="mb-4 mt-auto">
                    <div className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-2">
                      Tech
                    </div>
                    <div className="flex flex-wrap gap-2 min-h-[32px]">
                      {p.tech.map((t) => (
                        <span
                          key={t}
                          className="text-xs font-medium px-2.5 py-1 rounded-full bg-white/10 text-gray-300 border border-gray-500/30 hover:border-gray-400/60 hover:bg-white/20 transition-all duration-300"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Button */}
                  <div className="flex justify-end mt-auto">
                    <button className="btn btn-soft btn-accent inline-flex items-center gap-1.5 group text-sm">
                      View 
                      <ExternalLink className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </button>
                  </div>
                </div>

                {/* Gradient overlay - pure dark */}
                <div className="absolute inset-0 bg-black/20 rounded-2xl pointer-events-none"></div>
              </div>

              {/* 3D Shadow layers */}
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="absolute inset-0 rounded-2xl bg-black/20 pointer-events-none"
                  style={{
                    transform: `translateY(${(i + 1) * 3}px) translateX(${(i + 1) * 1.5}px)`,
                  }}
                ></div>
              ))}
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
