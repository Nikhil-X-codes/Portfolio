import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Layers, Cpu, ChartNoAxesCombined } from 'lucide-react';
import ProjectCard from './ui/ProjectCard';
import DecryptedText from './ui/DecryptedText';

const projectSections = [
  { id: 'full-stack', title: 'Full Stack', icon: Layers, ids: [1, 2, 13, 16] },
  { id: 'ai', title: 'AI', icon: Cpu, ids: [3 ,4 , 10, 11, 12] },
  { id: 'data-science', title: 'Data Science / Analytics', icon: ChartNoAxesCombined, ids: [8, 14, 15] },
];

const reelSpeed = 36; // Pixels per second.

function ProjectReel({ id, projects, category, paused }) {
  const trackRef = useRef(null);
  const firstGroupRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    const group = firstGroupRef.current;
    const observer = new ResizeObserver(([entry]) => {
      const height = entry.borderBoxSize?.[0]?.blockSize ?? group.offsetHeight;
      track.style.setProperty('--project-film-duration', `${height / reelSpeed}s`);
    });

    observer.observe(group, { box: 'border-box' });
    return () => observer.disconnect();
  }, []);

  return (
    <div id={id} className="project-film-window mx-3 my-3 rounded-lg sm:mx-4 sm:my-4" data-paused={paused || undefined}>
      <div className="project-film-tilt">
        <div className="project-film-track" ref={trackRef}>
          {[false, true].map((isCopy) => (
            <div key={String(isCopy)} className="project-film-group"
              ref={isCopy ? null : firstGroupRef} aria-hidden={isCopy || undefined}>
              {projects.map((project) => (
                <div className="project-film-frame" key={project.id}>
                  <ProjectCard project={{ ...project, category }} tabIndex={isCopy ? -1 : undefined} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const [scrollPaused, setScrollPaused] = useState(false);
  const projects = useMemo(
    () => [
      {
        id: 1,
        title: 'Vidcast',
        displayText: 'Vidcast Platform',
        category: 'Web',
        description:
          'Upload and stream videos, discover content through search, and follow your favorite creators. Vidcast also supports personal playlists, watch history, likes, and comments so viewers can engage with the community.',
        href: 'https://github.com/Nikhil-X-codes/Vidcast',
        techStack: ['React', 'Node.js', 'MongoDB', 'Tailwind'],
      },
      {
        id: 2,
        title: 'BusEase',
        displayText: 'Ticket System',
        category: 'Web',
        description:
          'Search routes, select seats, and simulate payments on a bus booking platform. Passengers receive PDF tickets and email confirmations, while operators manage buses and routes with protections against double bookings.',
        href: 'https://github.com/Nikhil-X-codes/BusEase',
        techStack: ['React', 'Tailwind', 'MongoDB', 'Express'],
      },
      {
        id: 13,
        title: 'CollectIQ Platform',
        displayText: 'CollectIQ Mobile',
        category: 'Full Stack',
        description:
          'Manage loan collections from a mobile app with views for officers and managers. Teams can assign loans, log collections, track payment promises, import CSV files, and access cached loans offline.',
        href: 'https://github.com/Nikhil-X-codes/Collectiq-platform',
        techStack: ['React Native', 'Expo', 'Node.js', 'Express', 'Prisma', 'PostgreSQL'],
      },
      {
        id: 16,
        title: 'Job Observability',
        displayText: 'JobFlow',
        category: 'Full Stack',
        description:
          'Schedule and process background jobs across distributed workers with RabbitMQ and PostgreSQL. A live dashboard shows job attempts, while monitoring and replay tools help operators investigate failures and recover jobs.',
        href: 'https://github.com/Nikhil-X-codes/Job-Observability',
        techStack: ['React', 'Node.js', 'RabbitMQ', 'PostgreSQL', 'Prometheus', 'Grafana'],
      },
      {
        id: 3,
        title: 'AI Blog Generation',
        displayText: 'AI Auto Blog',
        category: 'AI',
        description:
          'Generate blog posts from a topic, choose a writing tone, and refine drafts in a Markdown editor with live preview. An AI copilot helps rewrite passages and improve search visibility.',
        href: 'https://github.com/Nikhil-X-codes/AI-Blog',
        techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Groq', 'LangChain', 'Tailwind'],
      },
      {
        id: 4,
        title: 'Multi-Agent CLI Orchestration',
        displayText: 'Multi-Agent CLI Orchestration',
        category: 'AI',
        description:
          'Coordinate six specialized AI agents from the command line to generate, review, and debug code. A thread pool runs agents concurrently, while automated feedback loops help identify and fix errors.',
        href: 'https://github.com/Nikhil-X-codes/Swarnyam-AI-Agent',
        techStack: ['Python', 'ChromaDB', 'Groq'],
      },
      {
        id: 8,
        title: 'LSTEM IoT Attack Detection',
        displayText: 'LSTEM Security',
        category: 'Cybersecurity',
        description:
          'Detect malicious traffic in IoT networks with limited resources using behavioral trust scores and machine learning. The framework combines both signals to improve how it classifies traffic from connected devices.',
        href: 'https://github.com/Nikhil-X-codes/LSTEM',
        techStack: ['Python', 'Machine Learning', 'IoT', 'Scikit-learn'],
      },
      {
        id: 10,
        title: 'Medzee.ai',
        displayText: 'Medzee.AI',
        category: 'AI',
        description:
          'Analyze medical reports and prescriptions with an AI assistant that combines OCR and retrieval. The app explains medicines, surfaces health trends in a dashboard, and supports follow-up questions by voice.',
        href: 'https://github.com/Nikhil-X-codes/AI-Powered-Health',
        techStack: ['Next.js', 'FastAPI', 'PostgreSQL', 'Prisma', 'LangChain', 'RAG', 'Docker'],
      },
      {
        id: 11,
        title: 'VoiceAI Knowledge Agent',
        displayText: 'Voice & Knowledge AI',
        category: 'AI',
        description:
          'Handle voice conversations with speech recognition, spoken replies, and hybrid knowledge retrieval. The assistant supports localized conversations in the Philippines and Indonesia and surfaces live signals on a WebSocket dashboard.',
        href: 'https://github.com/Nikhil-X-codes/VoiceAI-Knowledge-agent',
        techStack: ['Python', 'FastAPI', 'Groq', 'Whisper', 'ChromaDB', 'BM25', 'Edge-TTS'],
      },
      {
        id: 12,
        title: 'Finance Agent',
        displayText: 'Agentic Finance AI',
        category: 'AI',
        description:
          'Analyze financial questions with an AI assistant that uses connected tools and multi-step reasoning. A JavaScript frontend connects to a modular Python backend with workflows built using LangGraph and LangChain.',
        href: 'https://github.com/Nikhil-X-codes/Finance-Agent',
        techStack: ['Python', 'JavaScript', 'LangGraph', 'LangChain', 'CSS'],
      },
      {
        id: 14,
        title: 'WhatsApp Chat Analysis',
        displayText: 'Chat Analytics',
        category: 'Data Science / Analytics',
        description:
          'Explore exported WhatsApp chats in a Streamlit dashboard with overall and per-person statistics. Visualizations show message and media counts, shared links, common words, emoji usage, heatmaps, and trends over time.',
        href: 'https://github.com/Nikhil-X-codes/Whatsapp-chat-analysis',
        techStack: ['Python', 'Streamlit', 'Pandas', 'Matplotlib', 'Seaborn'],
      },
      {
        id: 15,
        title: 'Route Optimizer',
        displayText: 'Last-Mile Route Optimizer',
        category: 'Data Science / Analytics',
        description:
          'Plan last-mile delivery routes with OR-Tools and road distances and travel times from OSRM. An interactive Leaflet map shows the optimized route, stop sequence, and estimated duration for the trip.',
        href: 'https://github.com/Nikhil-X-codes/Route-optimize',
        techStack: ['Python', 'FastAPI', 'OR-Tools', 'OSRM', 'React', 'Leaflet', 'Tailwind'],
      },
    ],
    []
  );


  return (
    <section id="projects" className="relative ui-section overflow-hidden py-16 sm:py-24 bg-transparent">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6 }} className="mb-10 flex flex-wrap items-end justify-between gap-4 sm:mb-14">
          <div>
            <p className="ui-kicker mb-2 text-orange-500/80 font-mono tracking-widest">Selected Portfolios</p>
            <h2 className="ui-title mb-3 text-white">
              <DecryptedText text="Featured Work" animateOn="inViewHover" revealDirection="center" speed={55} maxIterations={12} />
            </h2>
            <div className="h-1 w-16 rounded-full bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500" />
          </div>
          <button type="button"
            aria-controls={projectSections.map(({ id }) => `${id}-reel`).join(' ')}
            onClick={() => setScrollPaused((paused) => !paused)}
            className="rounded-lg border border-white/15 px-3 py-2 text-sm text-slate-300 transition-colors hover:border-orange-500/40 hover:text-white focus-visible:outline-2 focus-visible:outline-orange-500">
            {scrollPaused ? 'Resume scrolling' : 'Pause scrolling'}
          </button>
        </motion.div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {projectSections.map(({ id, title, icon: Icon, ids }) => {
            const sectionProjects = projects.filter((project) => ids.includes(project.id));
            return (
              <motion.section key={id} aria-labelledby={id + '-heading'}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.6 }}
                className="min-w-0 overflow-hidden rounded-xl border border-white/5 bg-[#121212] shadow-2xl">
                <div className="flex min-h-16 items-center gap-3 border-b border-white/5 bg-gradient-to-br from-slate-950 via-[#0d0d0d] to-[#141414] px-4 py-3 sm:px-5">
                  <Icon size={20} className="shrink-0 text-orange-500" aria-hidden="true" />
                  <h3 id={id + '-heading'} className="min-w-0 flex-1 text-lg font-bold text-white">{title}</h3>
                  <span className="shrink-0 font-mono text-xs text-slate-400">{sectionProjects.length}</span>
                </div>
                <ProjectReel id={`${id}-reel`} projects={sectionProjects} category={title} paused={scrollPaused} />
              </motion.section>
            );
          })}
        </div>
      </div>
    </section>
  );
}
