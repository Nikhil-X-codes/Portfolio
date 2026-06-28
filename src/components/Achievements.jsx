import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, CheckCircle, Calendar } from 'lucide-react';
import DecryptedText from './ui/DecryptedText';

const achievementsData = [
  // Hackathons
  {
    id: 'adobe-hackathon',
    title: 'Adobe India Hackathon – Round 1 Participant',
    year: '2025',
    category: 'hackathons',
    description:
      'Participated in Adobe India Hackathon Round 1 featuring Online MCQ Assessment and Coding challenges as part of Team CoderTrio.',
  },
  {
    id: 'tvs-epic',
    title: 'TVS Credit EPIC 7.0 Participant',
    year: '2025',
    category: 'hackathons',
    description:
      'Participated in TVS Credit EPIC 7.0 IT Challenge representing CODE-Mania from IIIT Sonepat.',
  },
  {
    id: 'techexpo-iitg',
    title: 'TechExpo IIT Guwahati Participant',
    year: '2025',
    category: 'hackathons',
    description:
      'Participated in TechExpo organized by IIT Guwahati, showcasing technical and problem-solving skills.',
  },
  {
    id: 'hackorbit-2025',
    title: 'HackOrbit 2025 National Hackathon',
    year: '2025',
    category: 'hackathons',
    description:
      'Finalist in HackOrbit 2025 National Hackathon organized by Madhav Institute of Technology and Science (MITS), Gwalior as Team Trinity.Codes.',
  },

  // Certifications
  {
    id: 'ibm-ai',
    title: 'IBM Artificial Intelligence Fundamentals',
    year: '2025',
    category: 'certifications',
    description:
      'Earned IBM SkillsBuild certification in Artificial Intelligence Fundamentals covering core AI concepts and applications.',
  },
  {
    id: 'cisco-data-science',
    title: 'Cisco Introduction to Data Science',
    year: '2025',
    category: 'certifications',
    description:
      'Completed Cisco Networking Academy certification covering fundamentals of Data Science and analytical concepts.',
  },
  {
    id: 'python-essentials',
    title: 'Python Essentials 1',
    year: '2024',
    category: 'certifications',
    description:
      'Completed Python Essentials 1 by Cisco Networking Academy and OpenEDG Python Institute focusing on Python programming fundamentals.',
  },
  {
    id: 'generative-ai',
    title: 'What Is Generative AI?',
    year: '2024',
    category: 'certifications',
    description:
      'Completed LinkedIn Learning certification on Generative AI covering AI tools, concepts, and practical applications.',
  },
];

export default function Achievements() {
  const [activeTab, setActiveTab] = useState('hackathons');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const filteredAchievements = achievementsData.filter((item) => {
    if (activeTab === 'all') return true;
    return item.category === activeTab;
  });

  const tabs = [
    { id: 'hackathons', label: 'Hackathons', icon: Star },
    { id: 'certifications', label: 'Certifications', icon: CheckCircle },
  ];

  return (
    <section id="achievements" className="relative ui-section py-16 sm:py-24 overflow-hidden">
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        
        {/* Header section with scroll-triggered fade-up */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-10 sm:mb-14"
        >
          <p className="ui-kicker mb-2">Milestones</p>
          <h2 className="ui-title mb-3">
            <DecryptedText text="Achievements" animateOn="inViewHover" revealDirection="center" speed={55} maxIterations={12} />
          </h2>
          <div className="ui-divider mt-4"></div>
        </motion.div>

        {/* Custom Category Filter Tabs with scroll-triggered fade-up */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.08 }}
          className="flex flex-wrap items-center gap-2.5 sm:gap-4 mb-12"
        >
          {tabs.map(({ id, label, icon: Icon }) => {
            const isActive = activeTab === id;
            return (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-r from-orange-500 to-amber-600 text-white shadow-[0_4px_20px_rgba(249,115,22,0.3)] scale-[1.02]'
                    : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700 hover:bg-slate-900'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                <span>{label}</span>
              </button>
            );
          })}
        </motion.div>

        {/* Vertical Timeline Layout */}
        <div className="relative mt-12 w-full">
          {/* Vertical connecting line that draws itself */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            style={{ originY: 0 }}
            className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-orange-500 via-orange-500/30 to-transparent z-0 transform -translate-x-1/2"
          />

          <div className="flex flex-col w-full relative z-10 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredAchievements.map((item, idx) => {
                const isLeft = idx % 2 === 0;
                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, x: isMobile ? 30 : (isLeft ? -50 : 50) }}
                    whileInView={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className={`relative flex flex-col md:flex-row items-center md:justify-between w-full ${
                      isLeft ? 'md:flex-row-reverse' : ''
                    }`}
                  >
                    {/* Timeline Dot (pops in sequentially) */}
                    <div className="absolute left-6 md:left-1/2 top-6 md:top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ type: "spring", stiffness: 300, damping: 15, delay: idx * 0.08 }}
                        className="w-4.5 h-4.5 rounded-full border-4 border-orange-500 bg-[#0a0a0a] shadow-[0_0_12px_rgba(249,115,22,0.6)]"
                      />
                    </div>

                    {/* Timeline Card */}
                    <motion.article
                      className={`w-full md:w-[calc(50%-2rem)] pl-16 md:pl-0 ${
                        isLeft ? 'md:pr-6' : 'md:pl-6'
                      }`}
                    >
                      <div className="group relative rounded-2xl border border-slate-800/80 bg-slate-950/60 p-6 backdrop-blur-xl transition-all duration-300 hover:border-orange-500/40 hover:bg-slate-900/50 hover:shadow-[0_8px_32px_rgba(249,115,22,0.08)] flex flex-col justify-between">
                        <div>
                          {/* Top line: Icon, Title & Year Badge */}
                          <div className="flex items-start gap-4 mb-4">
                            <div className="flex-shrink-0 w-12 h-12 rounded-xl border border-slate-700/60 bg-slate-900/90 flex items-center justify-center text-orange-400 group-hover:border-orange-500/40 group-hover:scale-105 transition-all duration-300">
                              <Star className="w-5 h-5" />
                            </div>
                            <div className="flex-grow">
                              <div className="flex items-center justify-between flex-wrap gap-2">
                                <h3 className="text-base sm:text-lg font-bold text-slate-100 group-hover:text-orange-400 transition-colors">
                                  {item.title}
                                </h3>
                                {/* Year Badge with Scale/Rotation pop */}
                                <motion.span
                                  initial={{ scale: 0.8, rotate: 0 }}
                                  whileInView={{ scale: [0.8, 1.15, 1], rotate: [0, 6, 0] }}
                                  viewport={{ once: true, amount: 0.3 }}
                                  transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
                                  className="px-2.5 py-0.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 font-mono text-[10px] font-bold tracking-wider"
                                >
                                  {item.year}
                                </motion.span>
                              </div>
                            </div>
                          </div>

                          {/* Body description */}
                          <p className="text-sm text-slate-300 leading-relaxed mb-4">
                            {item.description}
                          </p>
                        </div>

                        {/* Bottom row: Category badge */}
                        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-900">
                          <span
                            className="px-2.5 py-1 rounded-md text-[10px] sm:text-xs font-semibold bg-orange-500/10 text-orange-400 border border-orange-500/15 capitalize"
                          >
                            {item.category}
                          </span>
                        </div>
                      </div>
                    </motion.article>

                    {/* Spacer to balance timeline on desktop */}
                    <div className="hidden md:block w-[calc(50%-2rem)]" />
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  );
}

