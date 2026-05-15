import { useEffect, useState } from 'react'
import { Palette } from 'lucide-react'
import DecryptedText from './ui/DecryptedText'
import {
  SiJavascript, SiPython, SiPostgresql, SiCplusplus,
  SiReact, SiNextdotjs, SiNodedotjs, SiExpress, SiTailwindcss,
  SiMongodb, SiSupabase, SiNumpy, SiPandas, SiScikitlearn, SiPytorch,
  SiPostman, SiHuggingface, SiJest, SiGit, SiGithub,
} from 'react-icons/si'

/* ── layout constants ── */
const CX = 480, CY = 480, SVG_SIZE = 960

/* ── categories as "planets" on separate orbits ── */
const categories = [
  {
    id: 'languages',
    label: 'Languages',
    color: '#5DCAA5',
    orbitR: 100,
    angle: 300,
    dotDur: 18,
    skills: [
      { name: 'JavaScript', icon: SiJavascript, repo: 'https://github.com/tc39/ecma262' },
      { name: 'Python',     icon: SiPython,     repo: 'https://github.com/python/cpython' },
      { name: 'SQL',        icon: SiPostgresql },
      { name: 'C++',        icon: SiCplusplus },
    ],
  },
  {
    id: 'frontend',
    label: 'Development',
    color: '#AFA9EC',
    orbitR: 160,
    angle: 55,
    dotDur: 26,
    skills: [
      { name: 'React',        icon: SiReact,        repo: 'https://github.com/facebook/react' },
      { name: 'Next.js',      icon: SiNextdotjs,    repo: 'https://github.com/vercel/next.js' },
      { name: 'Node.js',      icon: SiNodedotjs,    repo: 'https://github.com/nodejs/node' },
      { name: 'Express',      icon: SiExpress,      repo: 'https://github.com/expressjs/express' },
      { name: 'Tailwind CSS', icon: SiTailwindcss, repo: 'https://github.com/tailwindlabs/tailwindcss' },
    ],
  },
  {
    id: 'databases',
    label: 'Databases',
    color: '#F0997B',
    orbitR: 215,
    angle: 150,
    dotDur: 34,
    skills: [
      { name: 'PostgreSQL', icon: SiPostgresql, repo: 'https://github.com/postgres/postgres' },
      { name: 'MongoDB',    icon: SiMongodb,    repo: 'https://github.com/mongodb/mongo' },
      { name: 'Supabase',   icon: SiSupabase,   repo: 'https://github.com/supabase/supabase' },
    ],
  },
  {
    id: 'datascience',
    label: 'Data Science',
    color: '#85B7EB',
    orbitR: 270,
    angle: 230,
    dotDur: 42,
    skills: [
      { name: 'NumPy',        icon: SiNumpy,        repo: 'https://github.com/numpy/numpy' },
      { name: 'Pandas',       icon: SiPandas,       repo: 'https://github.com/pandas-dev/pandas' },
      { name: 'scikit-learn', icon: SiScikitlearn, repo: 'https://github.com/scikit-learn/scikit-learn' },
      { name: 'PyTorch',      icon: SiPytorch,      repo: 'https://github.com/pytorch/pytorch' },
    ],
  },
  {
    id: 'tools',
    label: 'Tools & Platforms',
    color: '#FAC775',
    orbitR: 325,
    angle: 340,
    dotDur: 52,
    skills: [
      { name: 'Postman',     icon: SiPostman },
      { name: 'HuggingFace', icon: SiHuggingface, repo: 'https://github.com/huggingface/transformers' },
      { name: 'Jest',        icon: SiJest,        repo: 'https://github.com/jestjs/jest' },
      { name: 'Git',         icon: SiGit,         repo: 'https://github.com/git/git' },
      { name: 'GitHub',      icon: SiGithub },
    ],
  },
]



/* ── helpers ── */
const rad = d => (d * Math.PI) / 180
const ptX = (r, a) => CX + r * Math.sin(rad(a))
const ptY = (r, a) => CY - r * Math.cos(rad(a))

/* SVG circular path for animateMotion (two-arc full circle) */
function orbitPathD(r) {
  return `M ${CX} ${CY - r} A ${r} ${r} 0 1 1 ${CX} ${CY + r} A ${r} ${r} 0 1 1 ${CX} ${CY - r}`
}

/* ── Planet node ── */
function Planet({ cat, isActive, onClick }) {
  const x = ptX(cat.orbitR, cat.angle);
  const y = ptY(cat.orbitR, cat.angle);
  const R = isActive ? 38 : 24;

  return (
    <g onClick={() => onClick(cat.id)} style={{ cursor: 'pointer' }}>
      {/* outer glow when active */}
      {isActive && (
        <circle cx={x} cy={y} r={R + 22} fill={cat.color + '18'} className="solar-pulse" />
      )}
      {/* planet body */}
      <circle
        cx={x} cy={y} r={R}
        fill={isActive ? cat.color : 'rgba(255,255,255,0.04)'}
        stroke={cat.color}
        strokeWidth={isActive ? 3 : 1}
        style={{ transition: 'all .4s cubic-bezier(.22,1,.36,1)' }}
      />
      {/* abbreviation */}
      <text
        x={x} y={y + (isActive ? 5.5 : 4.5)}
        textAnchor="middle"
        fill={isActive ? '#0a0e14' : cat.color}
        fontSize={isActive ? 15 : 11} fontWeight={800}
        fontFamily="Inter, sans-serif"
        style={{ transition: 'all .35s', pointerEvents: 'none', userSelect: 'none' }}
      >
        {cat.label.slice(0, 2).toUpperCase()}
      </text>
      {/* label */}
      <text
        x={x} y={y + (isActive ? 38 : 24) + 18}
        textAnchor="middle"
        fill={isActive ? cat.color : 'rgba(255,255,255,0.38)'}
        fontSize={isActive ? 12 : 10} fontWeight={600}
        fontFamily="Inter, sans-serif"
        style={{ transition: 'all .35s', letterSpacing: '.04em' }}
      >
        {cat.label}
      </text>
    </g>
  );
}

/* ── Skill satellite nodes scaled up for absolute clarity and visual prominence ── */
function SkillSatellites({ cat, mounted }) {
  const planetX = ptX(cat.orbitR, cat.angle);
  const planetY = ptY(cat.orbitR, cat.angle);
  const satDist = 95;
  const skills = cat.skills;
  const angleStep = 360 / skills.length;
  const nodeR = 26;

  return (
    <g>
      {skills.map((skill, i) => {
        const Icon = skill.icon;
        const angleDeg = -90 + i * angleStep;
        const angleR = (angleDeg * Math.PI) / 180;
        const sx = planetX + satDist * Math.cos(angleR);
        const sy = planetY + satDist * Math.sin(angleR);

        return (
          <g
            key={skill.name}
            className="skill-satellite-node"
            onClick={() => skill.repo && window.open(skill.repo, '_blank')}
            style={{
              transformOrigin: `${planetX}px ${planetY}px`,
              transformBox: 'view-box',
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'scale(1)' : 'scale(0)',
              transition: `opacity .35s ${i * 0.07}s, transform .45s ${i * 0.07}s cubic-bezier(0.34, 1.56, 0.64, 1)`,
              cursor: skill.repo ? 'pointer' : 'default',
            }}
          >
            {/* connection line */}
            <line
              x1={planetX} y1={planetY} x2={sx} y2={sy}
              stroke={cat.color} strokeWidth={1} opacity={0.35}
              strokeDasharray="3 2"
            />
            {/* glow */}
            <circle cx={sx} cy={sy} r={nodeR + 6} fill={cat.color + '12'} />
            {/* node body */}
            <circle
              cx={sx} cy={sy} r={nodeR}
              fill="rgba(10,14,20,0.95)"
              stroke={cat.color + '80'}
              strokeWidth={1.5}
            />
            {/* icon via foreignObject */}
            <foreignObject
              x={sx - 13} y={sy - 13}
              width={26} height={26}
              style={{ overflow: 'visible' }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '100%',
              }}>
                <Icon style={{ width: 17, height: 17, color: cat.color }} />
              </div>
            </foreignObject>
            {/* label */}
            <text
              x={sx} y={sy + nodeR + 15}
              textAnchor="middle"
              fill={cat.color}
              fontSize={11} fontWeight={700}
              fontFamily="Inter, sans-serif"
              opacity={1}
              style={{ letterSpacing: '0.03em' }}
            >
              {skill.name}
            </text>
          </g>
        );
      })}
    </g>
  );
}

/* ────────────────────────────────────────── */
export default function Skills() {
  const [active, setActive]     = useState(null)
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
          <h2 className="ui-title mb-3">
            <DecryptedText text="The Toolkit" animateOn="inViewHover" revealDirection="center" speed={55} maxIterations={12} />
          </h2>
          <div className="ui-divider"></div>
        </div>

        {/* Solar system — centered, full width */}
        <div className="mx-auto mb-8 scroll-animate from-scale" style={{ maxWidth: 780 }}>
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
                stroke={active === cat.id ? cat.color + '55' : 'rgba(255,255,255,0.12)'}
                strokeWidth={active === cat.id ? 1.8 : 1}
                strokeDasharray={active === cat.id ? 'none' : `${5 + i} ${9 + i * 2}`}
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

            {/* ── skill satellites around the active planet ── */}
            {activeCat && (
              <SkillSatellites key={activeCat.id} cat={activeCat} mounted={mounted} />
            )}

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

        {/* ── Bottom row ── */}
        <div className="max-w-2xl mx-auto">
          <article className="ui-card scroll-animate from-bottom p-6">
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
        </div>

      </div>
    </section>
  )
}
