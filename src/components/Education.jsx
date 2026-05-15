import { motion } from 'framer-motion';
import { GraduationCap, School, CalendarDays, Award } from 'lucide-react';
import DecryptedText from './ui/DecryptedText';

const educationData = [
  {
    id: 'btech',
    degree: 'B.Tech in Information Technology',
    institution: 'IIIT Sonepat',
    period: '2023 – 2027',
    score: 'CGPA — 7.8',
    status: 'Pursuing',
    icon: GraduationCap,
    highlights: [
      'Data Structures & Algorithms',
      'Web Development',
      'Machine Learning',
    ],
  },
  {
    id: 'class12',
    degree: 'Class XII (CBSE)',
    institution: 'Shiv Jyoti Int. School',
    period: 'Completed',
    score: '75%',
    status: 'Completed',
    icon: School,
    highlights: ['Science Stream', 'Mathematics', 'Computer Science'],
  },
];

const timelineVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.25 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, x: -40, scale: 0.95 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Education() {
  return (
    <section
      id="education"
      className="relative ui-section py-16 sm:py-24 overflow-hidden"
    >
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 sm:mb-14 scroll-animate from-bottom">
          <p className="ui-kicker mb-2">Academic Journey</p>
          <h2 className="ui-title mb-3">
            <DecryptedText
              text="Education"
              animateOn="inViewHover"
              revealDirection="center"
              speed={55}
              maxIterations={12}
            />
          </h2>
          <div className="ui-divider mt-4"></div>
        </div>

        {/* Timeline */}
        <motion.div
          className="relative scroll-animate from-bottom"
          variants={timelineVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Vertical timeline line */}
          <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-orange-500/60 via-orange-500/20 to-transparent z-0" />

          <div className="flex flex-col gap-10 sm:gap-12">
            {educationData.map((edu, index) => {
              const Icon = edu.icon;
              return (
                <motion.div
                  key={edu.id}
                  variants={cardVariants}
                  className="relative pl-16 sm:pl-20 group"
                >
                  {/* Timeline node */}
                  <div className="absolute left-3 sm:left-5 top-4 z-10 flex items-center justify-center">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-orange-500/50 bg-[#0a0a0a] flex items-center justify-center group-hover:border-orange-500 group-hover:shadow-[0_0_16px_rgba(249,115,22,0.35)] transition-all duration-400">
                      <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-500" />
                    </div>
                  </div>

                  {/* Connecting dot pulse */}
                  <div className="absolute left-[1.15rem] sm:left-[1.4rem] top-[1.15rem] sm:top-[1.1rem] w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-orange-500/20 animate-ping pointer-events-none z-0" />

                  {/* Card */}
                  <div className="relative rounded-2xl border border-slate-800/80 bg-slate-950/60 p-5 sm:p-7 backdrop-blur-xl transition-all duration-300 hover:border-orange-500/40 hover:bg-slate-900/50 hover:shadow-[0_8px_40px_rgba(249,115,22,0.08)] overflow-hidden">
                    {/* Subtle grid texture */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#f9731604_1px,transparent_1px),linear-gradient(to_bottom,#f9731604_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

                    {/* Glow orb */}
                    <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-orange-500/5 blur-3xl pointer-events-none group-hover:bg-orange-500/10 transition-all duration-500" />

                    <div className="relative z-10">
                      {/* Top row: Status badge & period */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] sm:text-xs font-semibold tracking-wide border ${
                            edu.status === 'Pursuing'
                              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                              : 'bg-orange-500/10 text-orange-400 border-orange-500/15'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              edu.status === 'Pursuing'
                                ? 'bg-emerald-400 animate-pulse'
                                : 'bg-orange-400'
                            }`}
                          />
                          {edu.status}
                        </span>

                        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-mono">
                          <CalendarDays className="w-3.5 h-3.5" />
                          <span>{edu.period}</span>
                        </div>
                      </div>

                      {/* Degree */}
                      <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-orange-400 transition-colors tracking-tight mb-1">
                        {edu.degree}
                      </h3>

                      {/* Institution */}
                      <p className="text-sm text-slate-400 mb-4 flex items-center gap-1.5">
                        <School className="w-3.5 h-3.5 text-slate-500" />
                        {edu.institution}
                      </p>

                      {/* Score badge */}
                      <div className="flex items-center gap-3 mb-4">
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-orange-500/10 border border-orange-500/20">
                          <Award className="w-4 h-4 text-orange-500" />
                          <span className="text-sm font-bold text-orange-400 tracking-wide">
                            {edu.score}
                          </span>
                        </div>
                      </div>

                      {/* Key subjects */}
                      <div className="flex flex-wrap gap-2">
                        {edu.highlights.map((h, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-1 text-[10px] sm:text-xs font-medium rounded-full bg-white/5 text-slate-300 border border-white/5 hover:border-orange-500/30 hover:text-orange-400 transition-colors"
                          >
                            {h}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
