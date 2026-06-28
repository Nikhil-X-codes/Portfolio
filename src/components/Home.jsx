import { useState, useEffect } from 'react';
import { ArrowRight, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import MagneticButton from './ui/MagneticButton';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.215, 0.61, 0.355, 1], // easeOutCubic
    },
  },
};

export default function Home({ isSplashActive = true }) {
  const roles = ['Keep Building', 'Lifelong Learner', 'AI/ML Enthusiast', 'Problem Solver'];
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[currentRoleIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentRole.length) {
          setDisplayText(currentRole.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 1500);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentRoleIndex, roles]);

  const handleRipple = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty('--ripple-x', `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty('--ripple-y', `${event.clientY - rect.top}px`);
  };

  return (
    <section id="home" className="relative ui-section min-h-screen flex items-center justify-center overflow-hidden">
      {/* Subtle Moving Mesh Gradient Background & Noise Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        <div className="absolute inset-0 bg-[#060610]" />
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(6,182,212,0.12),transparent_70%)] animate-mesh-orb-1" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(20,184,166,0.1),transparent_70%)] animate-mesh-orb-2" />
        <div className="absolute top-[20%] right-[10%] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.08),transparent_70%)] animate-mesh-orb-3" />
        <div className="noise-overlay" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="ui-card scroll-animate from-left backdrop-blur-lg p-6 sm:p-10 lg:p-12 hover:shadow-2xl transition-shadow duration-500 border border-slate-800/80 bg-slate-950/60">
          <div className="grid items-center gap-8 lg:gap-12 lg:grid-cols-[1fr_280px]">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isSplashActive ? "hidden" : "visible"}
            >
              <motion.div
                variants={itemVariants}
                className="relative inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-[11px] font-semibold tracking-[0.18em] text-emerald-400 uppercase shadow-[0_0_15px_rgba(16,185,129,0.1)]"
              >
                <span className="absolute inset-0 rounded-full bg-emerald-500/5 blur-sm animate-glow-pulse" />
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="relative z-10">Available for new projects</span>
              </motion.div>

              <h2 className="mt-7 text-3xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] text-slate-100">
                <motion.span variants={itemVariants} className="block">
                  Hi, I&apos;m Nikhil.
                </motion.span>
                <motion.span
                  variants={itemVariants}
                  className="block bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-500 bg-clip-text text-transparent mt-2 sm:mt-3"
                >
                  I build modern, scalable web experiences.
                </motion.span>
              </h2>

              <motion.p variants={itemVariants} className="mt-4 text-base sm:text-lg text-slate-300 font-medium h-8">
                <span>{displayText}</span>
                <span className="animate-pulse text-cyan-400">|</span>
              </motion.p>

              <motion.p variants={itemVariants} className="mt-5 text-base sm:text-lg leading-relaxed text-slate-400 max-w-2xl">
                I am an Information Technology student at IIIT Sonepat with strong experience in building web applications, a solid foundation in Data Structures and Algorithms, and a keen interest in Artificial Intelligence and Machine Learning.
              </motion.p>

              <motion.div variants={itemVariants} className="mt-8 sm:mt-10 flex flex-wrap gap-3 sm:gap-4">
                <MagneticButton
                  href="#projects"
                  className="rounded-2xl px-6 sm:px-7 py-3.5 text-base sm:text-lg font-semibold gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_35px_rgba(6,182,212,0.5)] transition-all duration-300 hover:scale-[1.03] active:scale-95 no-underline"
                >
                  View Projects
                  <ArrowRight className="h-5 w-5" />
                </MagneticButton>

                <MagneticButton
                  href="#contact"
                  className="rounded-2xl px-6 sm:px-7 py-3.5 text-base sm:text-lg font-semibold gap-2 border border-white/10 bg-slate-900/40 text-slate-300 hover:text-white hover:bg-slate-800/60 hover:border-white/20 transition-all duration-300 backdrop-blur-sm no-underline"
                >
                  Get in Touch
                  <Mail className="h-5 w-5" />
                </MagneticButton>
              </motion.div>
            </motion.div>

            {/* Premium Profile Portrait View */}
            <div className="mx-auto w-full lg:mt-0 scroll-animate from-scale flex flex-col items-center justify-center">
              <div className="animate-portrait-float relative w-56 h-56 sm:w-64 sm:h-64 rounded-full p-1 bg-gradient-to-b from-cyan-500/40 via-slate-800 to-cyan-500/10 shadow-[0_0_35px_rgba(6,182,212,0.15)] overflow-hidden group transition-all duration-500 hover:shadow-[0_0_45px_rgba(6,182,212,0.3)]">
                <img
                  src="/images/profile.jpg"
                  alt="Nikhil Nagar"
                  className="w-full h-full object-cover rounded-full transition-transform duration-500 group-hover:scale-105"
                />
                {/* Overlay Inner Glow Ring */}
                <div className="absolute inset-0 rounded-full border border-white/10 pointer-events-none group-hover:border-cyan-500/30 transition-colors duration-300" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
