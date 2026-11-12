import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Layers, Cpu, ChartNoAxesCombined } from 'lucide-react';
import ProjectCard from './ui/ProjectCard';
import DecryptedText from './ui/DecryptedText';

const projectSections = [
  { id: 'full-stack', title: 'Full Stack', icon: Layers, ids: [1, 2, 13] },
  { id: 'ai', title: 'AI', icon: Cpu, ids: [3 ,4 , 10, 11, 12] },
  { id: 'data-science', title: 'Data Science / Analytics', icon: ChartNoAxesCombined, ids: [8, 14, 15] },
];

export default function Projects() {
  const projects = useMemo(
    () => [
      {
        id: 1,
        title: 'Vidcast',
        displayText: 'Vidcast Platform',
        category: 'Web',
        description:
          'A full-stack video sharing and streaming platform where users can upload videos, discover content through search, and follow their favorite creators. Features personal playlists, watch history, likes, and comments.',
        techStack: ['React', 'Node.js', 'MongoDB', 'Tailwind'],
      },
      {
        id: 2,
        title: 'BusEase',
        displayText: 'Ticket System',
        category: 'Web',
        description:
          'A full-stack bus booking platform for searching trips by route , choosing seats, and completing a simulated payment flow. Generates PDF tickets and email confirmations, with booking history for passengers and role-based dashboards for managing buses, routes. Atomic seat allocation prevents double bookings, while Redis supports search caching and rate limiting.',
        href: 'https://github.com/Nikhil-X-codes/BusEase',
        techStack: ['React', 'Tailwind', 'MongoDB', 'Express'],
      },
      {
        id: 13,
        title: 'CollectIQ Platform',
        displayText: 'CollectIQ Mobile',
        category: 'Full Stack',
        description: 'Mobile-first loan collections platform with officer and manager workflows, loan assignment, collection logging, payment promises, and branch analytics. Includes CSV imports, offline loan caching and queued feedback, plus role-scoped APIs backed by PostgreSQL.',
        href: 'https://github.com/Nikhil-X-codes/Collectiq-platform',
        techStack: ['React Native', 'Expo', 'Node.js', 'Express', 'Prisma', 'PostgreSQL'],
      },
      {
        id: 3,
        title: 'AI Blog Generation',
        displayText: 'AI Auto Blog',
        category: 'AI',
        description:
          'An AI-assisted content creation platform that turns topics into complete blog posts using Groq and Llama 3. Users can choose a writing tone, add relevant or uploaded images, and refine content in a Markdown editor with live preview. A selected-text AI copilot supports rewrites, SEO improvements, and tone changes, with account-based content management and export to PDF, Word, and Markdown.',
        href: 'https://github.com/Nikhil-X-codes/AI-Blog',
        techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Groq', 'LangChain', 'Tailwind'],
      },
      {
        id: 4,
        title: 'Multi-Agent CLI Orchestration',
        displayText: 'Multi-Agent CLI Orchestration',
        category: 'AI',
        description:
          'Production-grade multi-agent AI system with 6 specialized agents orchestrated via ThreadPoolExecutor for autonomous end-to-end code generation, review, and self-healing debug loops.',
        href: 'https://github.com/Nikhil-X-codes/Multi-Agent-AI-Coding-System',
        techStack: ['Python', 'ChromaDB', 'Groq'],
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
        id: 10,
        title: 'Medzee.ai',
        displayText: 'Medzee.AI',
        category: 'AI',
        description:
          'AI-powered healthcare assistant that analyzes medical reports and prescriptions using OCR, LLMs, and RAG. Features report interpretation, medicine explanations, health analytics dashboard, voice-enabled AI chat, and personalized medical insights.',
        href: 'https://github.com/Nikhil-X-codes/AI-Powered-Health',
        techStack: ['Next.js', 'FastAPI', 'PostgreSQL', 'Prisma', 'LangChain', 'RAG', 'Docker'],
      },
      {
        id: 11,
        title: 'VoiceAI Knowledge Agent',
        displayText: 'Voice & Knowledge AI',
        category: 'AI',
        description: 'Voice assistant combining speech recognition, spoken responses, and hybrid knowledge retrieval. Supports localized conversations for the Philippines and Indonesia, with live in-call signals and a WebSocket dashboard.',
        href: 'https://github.com/Nikhil-X-codes/VoiceAI-Knowledge-agent',
        techStack: ['Python', 'FastAPI', 'Groq', 'Whisper', 'ChromaDB', 'BM25', 'Edge-TTS'],
      },
      {
        id: 12,
        title: 'Finance Agent',
        displayText: 'Agentic Finance AI',
        category: 'AI',
        description: 'AI-powered finance assistant that uses multi-step reasoning and connected tools to handle financial tasks and analysis. Combines an interactive JavaScript frontend with a modular Python backend and agent workflows built with LangGraph and LangChain.',
        href: 'https://github.com/Nikhil-X-codes/Finance-Agent',
        techStack: ['Python', 'JavaScript', 'LangGraph', 'LangChain', 'CSS'],
      },
      {
        id: 14,
        title: 'WhatsApp Chat Analysis',
        displayText: 'Chat Analytics',
        category: 'Data Science / Analytics',
        description: 'Analyzes exported WhatsApp conversations with overall and participant-level statistics, message and media counts, shared links, word clouds, and emoji insights. Visualizes monthly and weekly trends and activity heatmaps in a Streamlit dashboard.',
        href: 'https://github.com/Nikhil-X-codes/Whatsapp-chat-analysis',
        techStack: ['Python', 'Streamlit', 'Pandas', 'Matplotlib', 'Seaborn'],
      },
      {
        id: 15,
        title: 'Route Optimizer',
        displayText: 'Last-Mile Route Optimizer',
        category: 'Data Science / Analytics',
        description: 'Optimizes last-mile delivery routes by solving the Traveling Salesperson Problem with Google OR-Tools and real-world road distances and durations from OSRM. Displays the optimized stop sequence, route, and travel time on an interactive Leaflet map.',
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
          viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6 }} className="mb-10 sm:mb-14">
          <p className="ui-kicker mb-2 text-orange-500/80 font-mono tracking-widest">Selected Portfolios</p>
          <h2 className="ui-title mb-3 text-white">
            <DecryptedText text="Featured Work" animateOn="inViewHover" revealDirection="center" speed={55} maxIterations={12} />
          </h2>
          <div className="h-1 w-16 rounded-full bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500" />
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {projectSections.map(({ id, title, icon: Icon, ids }) => {
            const sectionProjects = projects.filter((project) => ids.includes(project.id));
            return (
              <motion.section key={id} aria-labelledby={id + '-heading'}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.6 }}
                className="min-w-0 rounded-2xl border border-white/10 bg-[#0d0d0d]/95 p-4 shadow-2xl">
                <div className="flex min-h-16 items-center gap-3 border-b border-white/5 pb-4 mb-4">
                  <Icon size={20} className="shrink-0 text-orange-500" aria-hidden="true" />
                  <h3 id={id + '-heading'} className="text-lg font-bold text-white">{title}</h3>
                  <span className="ml-auto text-xs font-mono text-slate-400">{sectionProjects.length}</span>
                </div>
                <div className="project-film-window">
                  <div className="project-film-tilt">
                    <div className="project-film-track" style={{ animationDuration: (sectionProjects.length * 20) + 's' }}>
                      {[0, 1].map((copy) => (
                        <div key={copy} className="project-film-group" aria-hidden={copy === 1 ? true : undefined} inert={copy === 1 ? true : undefined}>
                          {sectionProjects.map((project) => (
                            <div className="project-film-frame" key={project.id}>
                              <ProjectCard project={{ ...project, category: title }} />
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.section>
            );
          })}
        </div>
      </div>
    </section>
  );
}
