import { useMemo, useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import ProjectCard from './ui/ProjectCard';
import DecryptedText from './ui/DecryptedText';

export default function Projects() {
  const [activeDeckIndex, setActiveDeckIndex] = useState(0);
  const carouselLeftRef = useRef(null);
  const carouselRightRef = useRef(null);
  const scrollIntervalLeftRef = useRef(null);
  const scrollIntervalRightRef = useRef(null);

  const projects = useMemo(
    () => [
      {
        id: 1,
        title: 'Vidcast',
        displayText: 'Vidcast Platform',
        category: 'Web',
        description:
          'A full-stack video streaming platform with upload, search, likes, comments, subscriptions and playlist management.',
        href: 'https://github.com/Nikhil-X-codes/Vidcast',
        techStack: ['React', 'Node.js', 'MongoDB', 'Tailwind',],
      },
      {
        id: 2,
        title: 'BusEase',
        displayText: 'Ticket System',
        category: 'Web',
        description:
          'A bus ticket booking system with virtual credit cards, interactive seat selection and full booking history.',
        href: 'https://github.com/Nikhil-X-codes/BusEase',
        techStack: ['React', 'Tailwind', 'MongoDB','Express'],
      },
      {
        id: 3,
        title: 'Bankruptcy Prediction',
        displayText: 'ML Predictor',
        category: 'AI',
        description:
          'ML classification model predicting company bankruptcy likelihood using financial ratios and ensemble methods.',
        href: 'https://github.com/Nikhil-X-codes/Company-Bankruptcy-Prediction',
        techStack: ['Python', 'Scikit-Learn', 'Core ML'],
      },
      {
        id: 4,
        title: 'AI Blog Generation',
        displayText: 'AI Auto Blog',
        category: 'AI',
        description:
          'AI-powered blogging platform generating complete posts with images, tone control, live editing and export.',
        href: 'https://github.com/Nikhil-X-codes/AI-Blog',
        techStack: ['React', 'HuggingFace', 'Tailwind'],
      },
      {
  id: 5,
  title: 'AI Content & Utility Suite',
  displayText: 'AI Utility Suite',
  category: 'AI',
  description:
    'Unified AI toolkit for content generation, resume analysis, sentiment analysis, and AI-content detection with lightweight PERN architecture.',
  href: 'https://github.com/Nikhil-X-codes/WebDev-with-AI-Intergration',
  techStack: ['React', 'Node.js', 'Express', 'PostgreSQL', 'HuggingFace'],
},
{
  id: 6,
  title: 'WhatsApp Chat Analysis',
  displayText: 'Chat Analyzer',
  category: 'Data Analytics',
  description:
    'WhatsApp chat analytics platform providing message insights, activity trends, word frequency, emoji analysis, and participant statistics through interactive visualizations.',
  href: 'https://github.com/Nikhil-X-codes/Whatsapp-chat-analysis',
  techStack: ['Python', 'Streamlit', 'ML Library'],
},
{
  id: 7,
  title: 'Neutrosophic Traffic Management',
  displayText: 'Smart Traffic AI',
  category: 'AI',
  description:
    'AI-powered traffic management system using Neutrosophic Logic and deep learning models to analyze vehicle density, detect obstacles, and automate traffic signal decisions.',
  href: 'https://github.com/Nikhil-X-codes/Neutrosophic_logic_based_Traffic_Management_System',
  techStack: ['Python','YOLO', 'OpenCV', 'Neutrosophic Logic'],
},
{
  id: 8,
  title: 'LSTEM IoT Attack Detection',
  displayText: 'LSTEM Security',
  category: 'Cybersecurity',
  description:
    'Trust-aware IoT attack detection framework combining behavioral trust scoring with machine learning to improve malicious traffic classification in resource-constrained networks.',
  href: 'https://github.com/Nikhil-X-codes/LSTEM',
  techStack: ['Python', 'Machine Learning', 'IoT', 'Scikit-learn'],
},
{
  id: 9,
  title: 'Iris Recognition System',
  displayText: 'Iris AI',
  category: 'AI',
  description:
    'Deep learning-based biometric authentication system using EfficientNetV2-S for high-accuracy iris recognition, real-time verification, and secure user identification.',
  href: 'https://github.com/Nikhil-X-codes/Iris-Detection',
  techStack: ['Python', 'PyTorch', 'OpenCV'],
},
{
  id: 10,
  title: 'Medzee.ai',
  displayText: 'Medzee.AI',
  category: 'AI',
  description:
    'AI-powered healthcare assistant that analyzes medical reports and prescriptions using OCR, LLMs, and RAG. Features report interpretation, medicine explanations, health analytics dashboard, voice-enabled AI chat, and personalized medical insights.',
  href: 'https://github.com/Nikhil-X-codes/AI-Powered-Health',
  techStack: [
    'Next.js',
    'FastAPI',
    'PostgreSQL',
    'Prisma',
    'LangChain',
    'RAG',
    'Docker'
  ],
},
    ],
    []
  );

  // ── LEFT PANEL: Continuous vertical carousel scroll ──
  useEffect(() => {
    const carousel = carouselLeftRef.current;
    if (!carousel) return;

    let rafId;
    const scrollStep = 0.6; // pixels per frame at ~60fps

    const tick = () => {
      if (carousel.scrollTop + carousel.clientHeight >= carousel.scrollHeight - 10) {
        carousel.scrollTop = 0;
      } else {
        carousel.scrollTop += scrollStep;
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(rafId);
  }, [projects]);

  // ── RIGHT PANEL: Continuous horizontal carousel rotation ──
  useEffect(() => {
    const rotationInterval = 4000; // milliseconds per card
    
    scrollIntervalRightRef.current = setInterval(() => {
      setActiveDeckIndex((prev) => (prev + 1) % projects.length);
    }, rotationInterval);

    return () => {
      if (scrollIntervalRightRef.current) {
        clearInterval(scrollIntervalRightRef.current);
      }
    };
  }, [projects.length]);

  const handleDeckClick = (idx) => {
    setActiveDeckIndex(idx);
  };

  const getVisualOffset = (idx) => {
    let diff = idx - activeDeckIndex;
    if (diff < 0) diff += projects.length;
    return diff;
  };

  const getFanTransform = (visualOffset) => {
    const totalCards = projects.length;
    switch (visualOffset) {
      case 0:
        return {
          rotateZ: 0,
          x: 0,
          y: 0,
          scale: 1,
          opacity: 1,
          zIndex: totalCards + 1,
        };
      case 1:
        return {
          rotateZ: 6,
          x: 30,
          y: -18,
          scale: 0.93,
          opacity: 0.88,
          zIndex: totalCards,
        };
      case 2:
        return {
          rotateZ: 12,
          x: 58,
          y: -36,
          scale: 0.86,
          opacity: 0.68,
          zIndex: totalCards - 1,
        };
      default:
        return {
          rotateZ: 17,
          x: 82,
          y: -52,
          scale: 0.78,
          opacity: 0.48,
          zIndex: totalCards - 2,
        };
    }
  };

  const isGithubLink = (url) => url?.includes('github.com');

  return (
    <section id="projects" className="relative ui-section overflow-hidden py-16 sm:py-24 bg-transparent">
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading with scroll reveal */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-10 sm:mb-14"
        >
          <p className="ui-kicker mb-2 text-orange-500/80 font-mono tracking-widest">Selected Portfolios</p>
          <h2 className="ui-title mb-3 text-white">
            <DecryptedText text="Featured Work" animateOn="inViewHover" revealDirection="center" speed={55} maxIterations={12} />
          </h2>
          <div className="h-1 w-16 rounded-full bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500" />
        </motion.div>

        {/* ═══════════════ Two-Panel Layout with scroll reveal stagger ═══════════════ */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.15
              }
            }
          }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-start"
        >

          {/* ─── LEFT PANEL: Continuous Vertical Carousel ─── */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
            }}
            className="flex flex-col border border-white/10 rounded-2xl bg-[#0d0d0d]/95 p-4 sm:p-6 shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/5">
              <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 tracking-wide">
                <span role="img" aria-label="flame">🔥</span> Recent Work
              </h3>
            </div>

            {/* Continuous Vertical Carousel Container */}
            <div
              ref={carouselLeftRef}
              className="relative overflow-hidden rounded-lg"
              style={{ height: 520 }}
            >
              {/* Fade-out masks top & bottom */}
              <div className="pointer-events-none absolute top-0 left-0 right-0 h-12 z-20 bg-gradient-to-b from-[#0d0d0d]/90 to-transparent" />
              <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-12 z-20 bg-gradient-to-t from-[#0d0d0d]/90 to-transparent" />

              {/* Duplicated projects for seamless infinite loop */}
              <div className="flex flex-col gap-6 pb-6">
                {/* First copy */}
                {projects.map((project) => (
                  <ProjectCard key={`a-${project.id}`} project={project} />
                ))}
                {/* Second copy for seamless loop */}
                {projects.map((project) => (
                  <ProjectCard key={`b-${project.id}`} project={project} />
                ))}
              </div>
            </div>
          </motion.div>

          {/* ─── RIGHT PANEL: Continuous 3D Fanned Deck Carousel ─── */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
            }}
            className="flex flex-col border border-white/10 rounded-2xl bg-[#0d0d0d]/95 p-4 sm:p-6 shadow-2xl h-full justify-between"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/5">
              <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 tracking-wide">
                <span role="img" aria-label="fire">🔥</span> Spotlight Projects
              </h3>
            </div>

            {/* 3D Stage with subtle perspective tilt */}
            <div
              className="relative w-full h-[440px] sm:h-[480px] flex items-center justify-center select-none"
              style={{
                perspective: 1000,
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Subtle static 3D tilt wrapper for depth feel */}
              <div
                className="relative w-full h-full flex items-center justify-center"
                style={{
                  transform: 'rotateX(4deg) rotateY(-3deg)',
                  transformStyle: 'preserve-3d',
                }}
              >
                {projects.map((project, idx) => {
                  const visualOffset = getVisualOffset(idx);
                  const fan = getFanTransform(visualOffset);
                  const isFront = visualOffset === 0;
                  const isGithub = isGithubLink(project.href);

                  return (
                    <SpotlightCard
                      key={project.id}
                      project={project}
                      idx={idx}
                      isFront={isFront}
                      isGithub={isGithub}
                      fan={fan}
                      handleDeckClick={handleDeckClick}
                      projectsLength={projects.length}
                      activeDeckIndex={activeDeckIndex}
                    />
                  );
                })}
              </div>
            </div>

            {/* Dot Indicators */}
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/5">
              <div className="flex gap-2">
                {projects.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleDeckClick(idx)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 border ${
                      idx === activeDeckIndex
                        ? 'bg-orange-500 border-orange-500 scale-125 shadow-[0_0_8px_rgba(249,115,22,0.5)]'
                        : 'bg-white/10 border-white/10 hover:bg-white/30'
                    }`}
                    aria-label={`Select project ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}

/* ── Interactive Spotlight Card with 3D Tilt and Cursor Border Glowing Spotlight ── */
function SpotlightCard({
  project,
  idx,
  isFront,
  isGithub,
  fan,
  handleDeckClick,
  projectsLength,
  activeDeckIndex
}) {
  const cardRef = useRef(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e) => {
    if (!cardRef.current || !isFront) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCoords({ x, y });

    // Calculate rotation: center of card is 0, edges tilt max 8deg
    const width = rect.width;
    const height = rect.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const rotX = -((y - centerY) / centerY) * 8;
    const rotY = ((x - centerX) / centerX) * 8;
    setRotateX(rotX);
    setRotateY(rotY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={() => {
        if (isFront && project.href) {
          window.open(project.href, '_blank', 'noopener,noreferrer');
        } else {
          handleDeckClick(idx);
        }
      }}
      animate={{
        rotateZ: fan.rotateZ,
        x: fan.x,
        y: fan.y,
        scale: fan.scale,
        opacity: fan.opacity,
        zIndex: fan.zIndex,
        rotateX: isFront ? rotateX : 0,
        rotateY: isFront ? rotateY : 0,
      }}
      transition={{
        duration: 0.85,
        ease: [0.22, 1.2, 0.36, 1],
        rotateX: { duration: 0.08, ease: 'easeOut' }, // fast mouse tracking
        rotateY: { duration: 0.08, ease: 'easeOut' }
      }}
      className={`absolute w-[280px] sm:w-[310px] rounded-2xl overflow-hidden border shadow-[0_24px_50px_-12px_rgba(0,0,0,0.95)] cursor-pointer ${
        isFront
          ? 'border-orange-500/30 bg-gradient-to-b from-[#181818] via-[#111] to-[#0a0a0a]'
          : 'border-white/8 bg-gradient-to-b from-[#151515] via-[#0e0e0e] to-[#080808]'
      }`}
      style={{
        transformOrigin: 'bottom left',
        aspectRatio: '3/4',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Spotlight cursor-following radial glow background */}
      {isFront && isHovered && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-10"
          style={{
            background: `radial-gradient(circle 180px at ${coords.x}px ${coords.y}px, rgba(249, 115, 22, 0.15), transparent)`,
          }}
        />
      )}

      {/* Spotlight border glow overlay */}
      {isFront && isHovered && (
        <div
          className="absolute inset-0 pointer-events-none rounded-2xl z-30"
          style={{
            border: '1px solid transparent',
            backgroundImage: `radial-gradient(circle 120px at ${coords.x}px ${coords.y}px, rgba(249, 115, 22, 0.5), transparent 80%)`,
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
          }}
        />
      )}

      {/* Grid background texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f9731605_1px,transparent_1px),linear-gradient(to_bottom,#f9731605_1px,transparent_1px)] bg-[size:14px_14px]" />

      {/* Glow orb behind content */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full bg-orange-500/10 blur-3xl pointer-events-none" />

      {/* Floating tech tags */}
      <div className="absolute top-3 left-3 right-3 flex flex-wrap gap-1.5 z-20 pointer-events-none">
        {project.techStack?.slice(0, 3).map((tech, i) => (
          <span
            key={i}
            className="px-2 py-0.5 text-[9px] sm:text-[10px] font-mono rounded-full bg-black/80 backdrop-blur-md text-orange-500 border border-orange-500/30 font-semibold tracking-wide"
          >
            {tech}
          </span>
        ))}
        <span className="ml-auto px-2 py-0.5 text-[9px] font-bold uppercase rounded bg-orange-500 text-black tracking-wider">
          {project.category || 'Web'}
        </span>
      </div>

      {/* Simulated screenshot — centered display text area */}
      <div className="absolute inset-x-3 top-12 bottom-32 rounded-xl border border-white/5 bg-black/50 flex flex-col items-center justify-center p-4 overflow-hidden z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#f9731610,transparent_70%)]" />
        <span className="text-lg sm:text-xl font-black text-white/95 tracking-wider text-center drop-shadow-[0_0_12px_rgba(249,115,22,0.4)] px-2">
          {project.displayText}
        </span>
        <span className="text-[8px] sm:text-[9px] text-orange-500/60 font-mono mt-1.5 uppercase tracking-widest">
          Preview
        </span>
      </div>

      {/* Bottom gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent z-10 pointer-events-none" />

      {/* Bottom content — always visible on front card */}
      <div className="absolute bottom-0 inset-x-0 p-4 z-20 flex flex-col pointer-events-auto">
        <span className="text-[9px] font-mono text-orange-500 mb-0.5 tracking-widest uppercase font-semibold">
          Project #{idx + 1}
        </span>
        <h4 className="text-base sm:text-lg font-extrabold text-white tracking-tight drop-shadow">
          {project.title}
        </h4>
        {isFront && (
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="text-[11px] text-slate-300 mt-1 line-clamp-2 leading-relaxed drop-shadow"
          >
            {project.description}
          </motion.p>
        )}

        {/* Action row — only on front card */}
        {isFront && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.25 }}
            className="flex items-center justify-between mt-2.5 pt-2 border-t border-white/10"
          >
            {project.href && (
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-orange-500 hover:bg-orange-600 text-black font-bold text-[11px] transition-all hover:scale-105"
              >
                <span>{isGithub ? 'Source' : 'Launch'}</span>
                {isGithub ? <Github size={11} /> : <ExternalLink size={11} />}
              </a>
            )}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDeckClick((activeDeckIndex + 1) % projectsLength);
              }}
              className="text-[10px] font-medium text-slate-400 hover:text-white transition-colors flex items-center gap-1"
            >
              Next <span className="text-orange-500 font-bold">→</span>
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}