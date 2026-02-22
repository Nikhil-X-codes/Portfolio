import { ExternalLink } from 'lucide-react'
import { useMemo, useState } from 'react'
import Lightning from './ui/Lightning'

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState(null)

  const projects = useMemo(
    () => [
      {
        title: 'Vidcast',
        desc: 'A video streaming platform with Video Upload & search, Likes, Comments, Subscription and Playlist Management.',
        tech: ['MongoDB','Express.js', 'React', 'Node.js'],
        link: 'https://vidcast12.vercel.app',
        image: '/images/vidcast.png',
      },
      {
        title: 'BusEase',
        desc: 'A Bus Ticket Booking System with virtual credit card, seat selection, booking and booking history features.',
        tech: ['MongoDB','Express.js', 'React', 'Node.js'],
        link: 'https://bus-ease-omega.vercel.app',
        image: '/images/busease.png',
      },
      {
        title: 'AI-Driven Web Development',
        desc: 'A web application integrating two LLM models through Hugging Face inference to assist AI-related tasks.',
        tech: ['PostgreSQL','Express.js', 'React', 'Node.js'],
        link: 'https://web-dev-with-ai-intergration.vercel.app',
        image: '/images/content.png',
      },
      {
        title: 'Whatsapp Chat Analyzer',
        desc: 'A Streamlit app to analyze WhatsApp chat data with visualizations and statistics at individual and group level.',
        tech: ['Python', 'Streamlit', 'Data Analysis'],
        link: 'https://wpchat-analysis.streamlit.app',
        image: '/images/wpchat.png',
      },
      {
        title: 'Bankruptcy Prediction',
        desc: 'A ML classification model to predict likelihood of company bankruptcy using financial ratios.',
        tech: ['Python','Machine Learning'],
        link: 'https://github.com/Nikhil-X-codes/Company-Bankruptcy-Prediction',
        image: '/images/company.png',
      },
      {
        title: 'AI Blog Generation',
        desc: 'AI-powered blogging platform generating complete blog posts with images, editing, tone control and exports.',
        tech: ['MongoDB','Express.js', 'React', 'Node.js'],
        link: 'https://ai-blog-generate.vercel.app',
        image: '/images/blog.png',
      },
    ],
    []
  )

  return (
    <section id="projects" className="relative py-8 overflow-hidden">
      
      {/* Lightning Background */}
      <div className="absolute inset-0 flex items-center justify-center opacity-35 pointer-events-none">
        <Lightning
          hue={180}
          xOffset={0}
          speed={0.6}
          intensity={0.9}
          size={1.2}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        
        {/* Heading */}
        <div className="mb-12 scroll-animate from-bottom">
          <h2 className="text-3xl font-bold mb-3">Projects</h2>
          <div className="w-16 h-1.5 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"></div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
          
          {projects.map((p, idx) => (
            <div
              key={p.title}
              onClick={() =>
                setActiveIndex(activeIndex === idx ? null : idx)
              }
              className="project-card-3d scroll-animate cursor-pointer h-full"
            >
              <div className="project-card-container h-full relative">
                <div className="project-card h-full flex flex-col relative rounded-2xl overflow-hidden">

                  <div className="relative z-10 flex flex-col h-full p-6">

                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-xl font-bold text-white leading-tight max-w-xs">
                        {p.title}
                      </h3>
                      <div className="text-2xl opacity-20">✦</div>
                    </div>

                    {/* Description */}
                    <p className="text-white/75 text-sm leading-relaxed mb-4 min-h-[72px]">
                      {p.desc}
                    </p>

                    {/* Image Toggle Section */}
<div
  className={`transition-all duration-500 ease-in-out overflow-hidden ${
    activeIndex === idx ? 'max-h-[500px] mb-4 opacity-100' : 'max-h-0 opacity-0'
  }`}
>
  <img
    src={p.image}
    alt={p.title}
    className="w-full h-auto rounded-xl object-contain border border-white/10"
    style={{ display: 'block' }} 
  />
</div>

                    {/* Tech Stack */}
                    <div className="mb-4">
                      <div className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-2">
                        Tech
                      </div>
                      <div className="flex flex-wrap gap-2">
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

                    {/* View Button */}
                    <div className="flex justify-end mt-auto">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          window.open(p.link, '_blank')
                        }}
                        className="btn btn-soft btn-accent inline-flex items-center gap-1.5 group text-sm"
                      >
                        View
                        <ExternalLink className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </button>
                    </div>

                  </div>

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/20 rounded-2xl pointer-events-none"></div>
                </div>

                {/* 3D Shadow Layers */}
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute inset-0 rounded-2xl bg-black/20 pointer-events-none"
                    style={{
                      transform: `translateY(${(i + 1) * 3}px) translateX(${(i + 1) * 1.5}px)`,
                    }}
                  />
                ))}
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  )
}