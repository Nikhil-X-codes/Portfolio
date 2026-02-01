import { useMemo } from 'react'
import {
  Braces,
  Library,
  Server,
  Database,
  GitBranch,
  Palette,
  Brain,
  Cpu,
  BookOpen
} from 'lucide-react'

export default function Skills() {
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

  return (
    <section id="about" className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-12 scroll-animate from-bottom">
        <h2 className="text-3xl font-bold mb-3">Skills</h2>
        <div className="w-16 h-1.5 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full"></div>
      </div>
      <div className="mt-8 grid md:grid-cols-2 gap-6">
        {skills.map((skill, idx) => {
          const Icon = skill.icon
          return (
            <div 
              key={skill.name} 
              className={`skill-card-green scroll-animate ${idx % 2 === 0 ? 'from-left' : 'from-right'}`}
              style={{ transitionDelay: `${idx * 0.05}s` }}
            >
              <div className="skill-card-inner-green bg-gradient-to-r from-emerald-900/30 to-teal-900/30 px-4 py-4 flex items-center gap-3 border border-emerald-500/40 rounded-lg hover:border-emerald-400/70 transition-all duration-300">
                <Icon className="h-6 w-6 text-emerald-400 flex-shrink-0" />
                <span className="text-white font-medium">{skill.name}</span>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
