import { motion } from 'framer-motion';
import { Home, FolderGit2, Code2, Trophy, Mail, Github, Linkedin, GraduationCap } from 'lucide-react';

// Custom Codolio brackets icon as SVG — matches lucide icon sizing
const CodeBracketsIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polyline points="7 8 3 12 7 16" />
    <polyline points="17 8 21 12 17 16" />
    <line x1="14" y1="4" x2="10" y2="20" />
  </svg>
);

export default function Navbar() {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home, type: 'nav' },
    { id: 'projects', label: 'Projects', icon: FolderGit2, type: 'nav' },
    { id: 'about', label: 'Tech Stack', icon: Code2, type: 'nav' },
    { id: 'achievements', label: 'Achievements', icon: Trophy, type: 'nav' },
    { id: 'education', label: 'Education', icon: GraduationCap, type: 'nav' },
    { id: 'contact', label: 'Contact', icon: Mail, type: 'nav' },
  ];

  const socialItems = [
    { id: 'github', label: 'GitHub', icon: Github, type: 'social', href: 'https://github.com/Nikhil-X-codes' },
    { id: 'linkedin', label: 'LinkedIn', icon: Linkedin, type: 'social', href: 'https://www.linkedin.com/in/nikhil2310' },
    { id: 'codolio', label: 'Codolio', icon: CodeBracketsIcon, type: 'social', href: 'https://codolio.com/profile/J6G0HHGi' },
  ];

  return (
    <header className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none transition-all duration-500 max-w-[95vw]">
      {/* Floating Glass Bar Container featuring persistent stacked label format */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-4 py-2 rounded-2xl sm:rounded-full bg-slate-950/90 backdrop-blur-xl border border-white/10 shadow-[0_0_30px_rgba(6,182,212,0.15)] pointer-events-auto transition-all duration-300 hover:border-cyan-500/30 hover:bg-slate-950/95 hover:shadow-[0_0_40px_rgba(6,182,212,0.3)] overflow-x-auto scrollbar-none"
      >
        {/* Navigation Section */}
        <div className="flex items-center gap-0.5 sm:gap-1">
          {navItems.map((item) => (
            <DockItem key={item.id} item={item} />
          ))}
        </div>

        {/* Vertical Glass Divider */}
        <div className="w-[1px] h-8 bg-gradient-to-b from-transparent via-slate-700 to-transparent mx-1 sm:mx-2 shrink-0" />

        {/* Social Dock Links */}
        <div className="flex items-center gap-0.5 sm:gap-1">
          {socialItems.map((item) => (
            <DockItem key={item.id} item={item} />
          ))}
        </div>
      </motion.div>
    </header>
  );
}

function DockItem({ item }) {
  const Icon = item.icon;

  const content = (
    <motion.div
      whileHover={{ scale: 1.12, y: -3 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
      className="flex flex-col items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-transparent hover:bg-slate-900/60 border border-transparent hover:border-white/5 text-slate-400 hover:text-cyan-400 transition-all duration-200 cursor-pointer px-1 group shrink-0"
    >
      <div className="flex items-center justify-center h-4 sm:h-5">
        <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300" />
      </div>
      <span className="text-[9px] sm:text-[10px] font-medium tracking-tight mt-1 text-slate-300 group-hover:text-cyan-300 transition-colors leading-none">
        {item.label}
      </span>
    </motion.div>
  );

  if (item.type === 'social') {
    return (
      <a href={item.href} target="_blank" rel="noopener noreferrer" aria-label={item.label} className="block shrink-0">
        {content}
      </a>
    );
  }

  return (
    <a href={`#${item.id}`} aria-label={item.label} className="block shrink-0">
      {content}
    </a>
  );
}
