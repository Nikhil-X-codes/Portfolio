import { useMemo } from 'react'
import { CardStack } from './ui/animated-card'

export default function Projects() {
  const projects = useMemo(
    () => [
      {
        id: 1,
        title: 'Vidcast',
        description:
          'A full-stack video streaming platform with upload, search, likes, comments, subscriptions and playlist management.',
        imageSrc:
          'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=800&q=80',
        href: 'https://vidcast12.vercel.app',
        tag: 'Full Stack',
      },
      {
        id: 2,
        title: 'BusEase',
        description:
          'A bus ticket booking system with virtual credit cards, interactive seat selection and full booking history.',
        imageSrc:
          'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&q=80',
        href: 'https://bus-ease-omega.vercel.app',
        tag: 'Full Stack',
      },
      {
        id: 3,
        title: 'Bankruptcy Prediction',
        description:
          'ML classification model predicting company bankruptcy likelihood using financial ratios and ensemble methods.',
        imageSrc:
          'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800&q=80',
        href: 'https://github.com/Nikhil-X-codes/Company-Bankruptcy-Prediction',
        tag: 'Machine Learning',
      },
      {
        id: 4,
        title: 'AI Blog Generation',
        description:
          'AI-powered blogging platform generating complete posts with images, tone control, live editing and export.',
        imageSrc:
          'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80',
        href: 'https://ai-blog-generate.vercel.app',
        tag: 'AI / Full Stack',
      },
    ],
    []
  )

  return (
    <section id="projects" className="relative ui-section overflow-hidden">
      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="mb-10 sm:mb-14 scroll-animate from-bottom">
          <p className="ui-kicker mb-2">Selected Work</p>
          <h2 className="ui-title mb-3">Projects</h2>
          <div className="ui-divider" />
        </div>

        {/* Card Stack */}
        <div className="scroll-animate from-bottom">
          <CardStack
            items={projects}
            initialIndex={0}
            cardWidth={500}
            cardHeight={310}
            overlap={0.45}
            spreadDeg={44}
            autoAdvance
            intervalMs={3000}
            pauseOnHover
            showDots
            loop
          />
        </div>

        {/* Hint */}
        <p className="mt-4 text-center text-xs text-slate-500 tracking-wide">
          Click a card to bring it forward · Drag or use ← → keys to navigate
        </p>
      </div>
    </section>
  )
}