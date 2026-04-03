import { Code2, Database, Cloud, Palette, Sparkles, Brain, Terminal, FlaskConical } from 'lucide-react'
import { 
  SiJavascript, SiPython, SiPostgresql, SiCplusplus, 
  SiReact, SiNextdotjs, SiNodedotjs, SiExpress, SiTailwindcss,
  SiMongodb, SiSupabase, SiNumpy, SiPandas, SiScikitlearn, SiPytorch,
  SiPostman, SiHuggingface, SiJest, SiGit, SiGithub, SiFigma,
  SiOpenai, SiDiagramsdotnet
} from 'react-icons/si'

export default function Skills() {
  const stackColumns = [
    {
      title: 'Languages',
      icon: Terminal,
      tags: [
        { name: 'JavaScript', icon: SiJavascript },
        { name: 'Python', icon: SiPython },
        { name: 'SQL', icon: SiPostgresql },
        { name: 'C++', icon: SiCplusplus },
      ],
    },
    {
      title: 'Development',
      icon: Code2,
      tags: [
        { name: 'React', icon: SiReact },
        { name: 'Next.js', icon: SiNextdotjs },
        { name: 'Node.js', icon: SiNodedotjs },
        { name: 'Express.js', icon: SiExpress },
        { name: 'Tailwind CSS', icon: SiTailwindcss },
      ],
    },
    {
      title: 'Databases',
      icon: Database,
      tags: [
        { name: 'PostgreSQL', icon: SiPostgresql },
        { name: 'MongoDB', icon: SiMongodb },
        { name: 'Supabase', icon: SiSupabase },
      ],
    },
    {
      title: 'Data Science',
      icon: Brain,
      tags: [
        { name: 'NumPy', icon: SiNumpy },
        { name: 'Pandas', icon: SiPandas },
        { name: 'scikit-learn', icon: SiScikitlearn },
        { name: 'PyTorch', icon: SiPytorch },
      ],
    },
    {
      title: 'Tools & Platforms',
      icon: Cloud,
      tags: [
        { name: 'Postman', icon: SiPostman },
        { name: 'HuggingFace', icon: SiHuggingface },
        { name: 'Jest', icon: SiJest },
        { name: 'Git', icon: SiGit },
        { name: 'GitHub', icon: SiGithub },
      ],
    },
  ]

  const exploring = [
    { name: 'AI/ML', icon: SiOpenai },
    { name: 'Scalable System Design', icon: SiDiagramsdotnet }
  ]

  return (
    <section id="about" className="relative ui-section overflow-hidden">
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 sm:mb-12 scroll-animate from-bottom">
          <p className="ui-kicker mb-2">Technical Stack</p>
          <h2 className="ui-title mb-3">The Toolkit</h2>
          <div className="ui-divider"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
          {stackColumns.map((column) => {
            const Icon = column.icon
            return (
              <article
                key={column.title}
                className="ui-card scroll-animate from-bottom p-6 min-h-[320px]"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="rounded-lg border border-gray-600/40 bg-gray-900/30 p-2">
                    <Icon className="h-5 w-5 text-gray-300" />
                  </div>
                  <h3 className="text-2xl font-semibold text-slate-100 leading-tight">
                    {column.title}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2.5">
                  {column.tags.map((tag) => {
                    const TagIcon = tag.icon
                    return (
                      <span
                        key={tag.name}
                        className="ui-pill flex items-center gap-2 px-3 py-1.5 text-sm font-medium"
                      >
                        <TagIcon className="h-3.5 w-3.5" />
                        {tag.name}
                      </span>
                    )
                  })}
                </div>
              </article>
            )
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <article className="ui-card scroll-animate from-left md:col-span-2 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="rounded-lg border border-gray-600/40 bg-gray-900/30 p-2">
                <Palette className="h-5 w-5 text-gray-300" />
              </div>
              <h3 className="text-2xl font-semibold text-slate-100">Engineering Philosophy</h3>
            </div>

            <div className="rounded-2xl border border-gray-700/30 bg-black/75 p-4">
              <div className="mb-3 flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-orange-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-gray-500" />
              </div>
              <code className="text-sm sm:text-base text-gray-300 whitespace-pre">
                {`
while (!success) {
  learn();
  build();
  improve();
}`}
              </code>
            </div>
          </article>

          <article className="ui-card scroll-animate from-right p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="rounded-lg border border-gray-600/40 bg-gray-900/30 p-2">
                <Sparkles className="h-5 w-5 text-gray-300" />
              </div>
              <h3 className="text-2xl font-semibold text-slate-100">Currently Exploring</h3>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {exploring.map((item) => {
                const ItemIcon = item.icon
                return (
                  <span
                    key={item.name}
                    className="ui-pill flex items-center gap-2 px-4 py-1.5 text-sm font-medium"
                  >
                    <ItemIcon className="h-4 w-4" />
                    {item.name}
                  </span>
                )
              })}
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
