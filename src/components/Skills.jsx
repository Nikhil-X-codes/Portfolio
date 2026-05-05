import { useEffect, useState } from 'react'
import { Sparkles, Palette } from 'lucide-react'
import {
  SiJavascript, SiPython, SiPostgresql, SiCplusplus,
  SiReact, SiNextdotjs, SiNodedotjs, SiExpress, SiTailwindcss,
  SiMongodb, SiSupabase, SiNumpy, SiPandas, SiScikitlearn, SiPytorch,
  SiPostman, SiHuggingface, SiJest, SiGit, SiGithub,
  SiOpenai, SiDiagramsdotnet
} from 'react-icons/si'

/* ── layout constants ── */
const CX = 300, CY = 300, SVG_SIZE = 600

/* ── categories as "planets" on separate orbits ── */
const categories = [
  {
    id: 'languages',
    label: 'Languages',
    color: '#5DCAA5',
    orbitR: 80,
    angle: 300,
    dotDur: 18,
    skills: [
      { name: 'JavaScript', icon: SiJavascript },
      { name: 'Python',     icon: SiPython },
      { name: 'SQL',        icon: SiPostgresql },
      { name: 'C++',        icon: SiCplusplus },
    ],
  },
  {
    id: 'frontend',
    label: 'Development',
    color: '#AFA9EC',
    orbitR: 125,
    angle: 55,
    dotDur: 26,
    skills: [
      { name: 'React',        icon: SiReact },
      { name: 'Next.js',      icon: SiNextdotjs },
      { name: 'Node.js',      icon: SiNodedotjs },
      { name: 'Express',      icon: SiExpress },
      { name: 'Tailwind CSS', icon: SiTailwindcss },
    ],
  },
  {
    id: 'databases',
    label: 'Databases',
    color: '#F0997B',
    orbitR: 170,
    angle: 150,
    dotDur: 34,
    skills: [
      { name: 'PostgreSQL', icon: SiPostgresql },
      { name: 'MongoDB',    icon: SiMongodb },
      { name: 'Supabase',   icon: SiSupabase },
    ],
  },
  {
    id: 'datascience',
    label: 'Data Science',
    color: '#85B7EB',
    orbitR: 215,
    angle: 230,
    dotDur: 42,
    skills: [
      { name: 'NumPy',        icon: SiNumpy },
      { name: 'Pandas',       icon: SiPandas },
      { name: 'scikit-learn', icon: SiScikitlearn },
      { name: 'PyTorch',      icon: SiPytorch },
    ],
  },
  {
    id: 'tools',
    label: 'Tools & Platforms',
    color: '#FAC775',
    orbitR: 260,
    angle: 340,
    dotDur: 52,
    skills: [
      { name: 'Postman',     icon: SiPostman },
      { name: 'HuggingFace', icon: SiHuggingface },
      { name: 'Jest',        icon: SiJest },
      { name: 'Git',         icon: SiGit },
      { name: 'GitHub',      icon: SiGithub },
    ],
  },
]

const exploring = [
  { name: 'AI/ML',                  icon: SiOpenai },
  { name: 'Scalable System Design', icon: SiDiagramsdotnet },
]

/* ── helpers ── */
const rad = d => (d * Math.PI) / 180
const px  = (r, a) => CX + r * Math.sin(rad(a))
const py  = (r, a) => CY - r * Math.cos(rad(a))

/* SVG circular path for animateMotion (two-arc full circle) */
function orbitPathD(r) {
  return `M ${CX} ${CY - r} A ${r} ${r} 0 1 1 ${CX} ${CY + r} A ${r} ${r} 0 1 1 ${CX} ${CY - r}`
}

/* ── Planet node ── */
function Planet({ cat, isActive, onClick }) {
  const x = px(cat.orbitR, cat.angle)
  const y = py(cat.orbitR, cat.angle)
  const R = 22

  return (
    <g onClick={() => onClick(cat.id)} style={{ cursor: 'pointer' }}>
      {/* outer glow when active */}
      {isActive && (
        <circle cx={x} cy={y} r={R + 16} fill={cat.color + '18'} className="solar-pulse" />
      )}
      {/* planet body */}
      <circle
        cx={x} cy={y} r={R}
        fill={isActive ? cat.color : 'rgba(255,255,255,0.04)'}
        stroke={cat.color}
        strokeWidth={isActive ? 2 : 1}
        style={{ transition: 'fill .35s, stroke-width .35s' }}
      />
      {/* abbreviation */}
      <text
        x={x} y={y + 4.5}
        textAnchor="middle"
        fill={isActive ? '#0a0e14' : cat.color}
        fontSize={11} fontWeight={700}
        fontFamily="Inter, sans-serif"
        style={{ transition: 'fill .35s', pointerEvents: 'none', userSelect: 'none' }}
      >
        {cat.label.slice(0, 2).toUpperCase()}
      </text>
      {/* label */}
      <text
        x={x} y={y + R + 18}
        textAnchor="middle"
        fill={isActive ? cat.color : 'rgba(255,255,255,0.38)'}
        fontSize={10} fontWeight={500}
        fontFamily="Inter, sans-serif"
        style={{ transition: 'fill .35s', letterSpacing: '.04em' }}
      >
        {cat.label}
      </text>
    </g>
  )
}

/* ────────────────────────────────────────── */
export default function Skills() {
  const [active, setActive]     = useState('frontend')
  const [mounted, setMounted]   = useState(false)
  const [prevActive, setPrevActive] = useState(null)

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 120)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (prevActive !== active) {
      setMounted(false)
      const t = setTimeout(() => setMounted(true), 60)
      setPrevActive(active)
      return () => clearTimeout(t)
    }
  }, [active])

  const activeCat = categories.find(c => c.id === active)

  return (
    <section id="about" className="relative ui-section overflow-hidden">
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-10 sm:mb-12 scroll-animate from-bottom">
          <p className="ui-kicker mb-2">Technical Stack</p>
          <h2 className="ui-title mb-3">The Toolkit</h2>
          <div className="ui-divider"></div>
        </div>

        {/* Solar system + detail panel */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 mb-6">

          {/* ── SVG solar system ── */}
          <div className="w-full lg:w-auto flex-shrink-0 scroll-animate from-left" style={{ maxWidth: 600 }}>
            <svg
              viewBox={`0 0 ${SVG_SIZE} ${SVG_SIZE}`}
              width="100%"
              style={{ display: 'block', overflow: 'visible' }}
            >
              <defs>
                {/* sun glow gradient */}
                <radialGradient id="solar-glow">
                  <stop offset="0%"   stopColor="rgba(251,191,36,0.18)" />
                  <stop offset="100%" stopColor="rgba(251,191,36,0)" />
                </radialGradient>
                <radialGradient id="solar-core">
                  <stop offset="0%"   stopColor="#fbbf24" />
                  <stop offset="60%"  stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#d97706" />
                </radialGradient>
                {/* orbit paths for traveling dots */}
                {categories.map(cat => (
                  <path key={cat.id} id={`orbit-${cat.id}`} d={orbitPathD(cat.orbitR)} fill="none" />
                ))}
              </defs>

              {/* ── orbit rings ── */}
              {categories.map((cat, i) => (
                <circle
                  key={cat.id}
                  cx={CX} cy={CY} r={cat.orbitR}
                  fill="none"
                  stroke={active === cat.id ? cat.color + '30' : 'rgba(255,255,255,0.06)'}
                  strokeWidth={active === cat.id ? 1.2 : 0.6}
                  strokeDasharray={active === cat.id ? 'none' : `${3 + i} ${7 + i * 2}`}
                  style={{ transition: 'stroke .4s, stroke-width .4s' }}
                />
              ))}

              {/* ── traveling particle dots ── */}
              {categories.map(cat => (
                <g key={`dot-${cat.id}`}>
                  <circle r={2.2} fill={cat.color} opacity={0.55}>
                    <animateMotion dur={`${cat.dotDur}s`} repeatCount="indefinite">
                      <mpath href={`#orbit-${cat.id}`} />
                    </animateMotion>
                  </circle>
                  {/* second dot offset */}
                  <circle r={1.5} fill={cat.color} opacity={0.3}>
                    <animateMotion dur={`${cat.dotDur}s`} begin={`${cat.dotDur / 2}s`} repeatCount="indefinite">
                      <mpath href={`#orbit-${cat.id}`} />
                    </animateMotion>
                  </circle>
                </g>
              ))}

              {/* ── planet nodes ── */}
              {categories.map(cat => (
                <Planet
                  key={cat.id}
                  cat={cat}
                  isActive={active === cat.id}
                  onClick={id => setActive(prev => (prev === id ? null : id))}
                />
              ))}

              {/* ── sun centre ── */}
              <circle cx={CX} cy={CY} r={52} fill="url(#solar-glow)" className="solar-breathe" />
              <circle cx={CX} cy={CY} r={26} fill="url(#solar-core)" />
              <circle cx={CX} cy={CY} r={26} fill="none" stroke="rgba(251,191,36,0.25)" strokeWidth={1} />
              <text x={CX} y={CY - 4} textAnchor="middle"
                fill="rgba(15,10,5,0.85)" fontSize={8.5}
                fontFamily="Inter, sans-serif" fontWeight={700} letterSpacing="0.14em"
              >STACK</text>
              <text x={CX} y={CY + 8} textAnchor="middle"
                fill="rgba(15,10,5,0.5)" fontSize={7}
                fontFamily="Inter, sans-serif"
              >click a planet</text>
            </svg>
          </div>

          {/* ── Detail panel ── */}
          <div className="flex-1 w-full scroll-animate from-right">
            {activeCat ? (
              <div
                key={activeCat.id}
                className="ui-card p-6 h-full skills-panel-enter"
                style={{ borderColor: activeCat.color + '33', minHeight: 360 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-2 h-8 rounded-full flex-shrink-0"
                    style={{ background: activeCat.color, boxShadow: `0 0 14px ${activeCat.color}66` }}
                  />
                  <h3 className="text-xl font-semibold text-slate-100">{activeCat.label}</h3>
                </div>

                <div className="flex flex-col gap-3.5">
                  {activeCat.skills.map((skill, i) => {
                    const Icon = skill.icon
                    return (
                      <div
                        key={skill.name}
                        className="flex items-center gap-3"
                        style={{
                          opacity: mounted ? 1 : 0,
                          transform: mounted ? 'translateX(0)' : 'translateX(-14px)',
                          transition: `opacity .38s ${i * .08}s, transform .38s ${i * .08}s`,
                        }}
                      >
                        <div
                          className="flex items-center justify-center w-8 h-8 rounded-lg flex-shrink-0"
                          style={{ background: activeCat.color + '18', border: `1px solid ${activeCat.color}44` }}
                        >
                          <Icon style={{ width: 15, height: 15, color: activeCat.color }} />
                        </div>
                        <span className="text-slate-200 text-sm font-medium w-28 flex-shrink-0">{skill.name}</span>
                        <div className="flex-1 h-px bg-white/5 relative overflow-hidden rounded-full">
                          <div style={{
                            position: 'absolute', inset: 0,
                            background: `linear-gradient(90deg, ${activeCat.color}, ${activeCat.color}88)`,
                            width: mounted ? '100%' : '0%',
                            transition: `width .65s ${i * .08 + .18}s cubic-bezier(.22,1,.36,1)`,
                          }} />
                        </div>
                      </div>
                    )
                  })}
                </div>

                <p className="mt-6 text-xs text-slate-500 tracking-widest uppercase">
                  {activeCat.skills.length} technologies
                </p>
              </div>
            ) : (
              <div className="ui-card p-6 flex items-center justify-center min-h-[360px]">
                <p className="text-slate-500 text-sm">Select a planet to explore</p>
              </div>
            )}
          </div>
        </div>

        {/* ── Bottom row ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <article className="ui-card scroll-animate from-left md:col-span-2 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="rounded-lg border border-gray-600/40 bg-gray-900/30 p-2">
                <Palette className="h-5 w-5 text-gray-300" />
              </div>
              <h3 className="text-xl font-semibold text-slate-100">Engineering Philosophy</h3>
            </div>
            <div className="rounded-2xl border border-gray-700/30 bg-black/75 p-4">
              <div className="mb-3 flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-orange-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-gray-500" />
              </div>
              <code className="text-sm sm:text-base text-gray-300 whitespace-pre">
                {`while (!success) {\n  learn();\n  build();\n  improve();\n}`}
              </code>
            </div>
          </article>

          <article className="ui-card scroll-animate from-right p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="rounded-lg border border-gray-600/40 bg-gray-900/30 p-2">
                <Sparkles className="h-5 w-5 text-gray-300" />
              </div>
              <h3 className="text-xl font-semibold text-slate-100">Currently Exploring</h3>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {exploring.map(item => {
                const ItemIcon = item.icon
                return (
                  <span key={item.name} className="ui-pill flex items-center gap-2 px-4 py-1.5 text-sm font-medium">
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
