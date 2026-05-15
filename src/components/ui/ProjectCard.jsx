import { useState } from 'react';
import { ExternalLink, Github, Globe, Cpu, Layers, Sparkles } from 'lucide-react';

export default function ProjectCard({ project }) {
  const [isHovered, setIsHovered] = useState(false);

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Web':
        return <Globe size={13} className="text-orange-500" />;
      case 'AI':
        return <Cpu size={13} className="text-orange-500" />;
      case 'Full Stack':
        return <Layers size={13} className="text-orange-500" />;
      default:
        return <Sparkles size={13} className="text-orange-500" />;
    }
  };

  const isGithub = project.href?.includes('github.com');

  return (
    <a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col rounded-xl bg-[#121212] border border-white/5 transition-all duration-300 hover:border-orange-500/30 hover:bg-[#161616] shadow-xl overflow-hidden select-none cursor-pointer no-underline"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top Accent line on hover */}
      <div className="absolute top-0 left-1/4 right-1/4 h-[2px] bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />

      {/* Project Screenshot Area (16:9 ratio) with pan-up effect on hover */}
      <div className="relative w-full aspect-video overflow-hidden bg-gradient-to-br from-slate-950 via-[#0d0d0d] to-[#141414] border-b border-white/5 flex items-center justify-center">
        {/* Subtle high-tech grid overlay */}
        <div
          className="absolute inset-0 bg-[linear-gradient(to_right,#f9731608_1px,transparent_1px),linear-gradient(to_bottom,#f9731608_1px,transparent_1px)] bg-[size:14px_14px] transition-transform duration-[1.8s] ease-out"
          style={{
            transform: isHovered ? 'translateY(-18px)' : 'translateY(0px)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 z-[1]" />

        {/* Window dots */}
        <div className="absolute top-2.5 left-2.5 z-10 flex gap-1.5 opacity-30 group-hover:opacity-60 transition-opacity">
          <span className="w-2 h-2 rounded-full bg-red-500/80" />
          <span className="w-2 h-2 rounded-full bg-yellow-500/80" />
          <span className="w-2 h-2 rounded-full bg-green-500/80" />
        </div>

        {/* Project Display Text — pans up on hover */}
        <div
          className="relative z-10 flex flex-col items-center justify-center px-6 text-center w-full transition-transform duration-[1.8s] ease-out"
          style={{
            transform: isHovered ? 'translateY(-12px)' : 'translateY(0px)',
          }}
        >
          <span className="text-[10px] sm:text-xs uppercase tracking-widest text-orange-500/90 font-mono font-semibold mb-1.5 bg-orange-500/10 px-2 py-0.5 rounded border border-orange-500/20 backdrop-blur-xs">
            {project.category || 'Web'}
          </span>
          <h4 className="text-lg sm:text-xl font-bold text-white tracking-wide max-w-sm drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
            {project.displayText}
          </h4>
        </div>

        {/* Glowing background orb */}
        <div className="absolute w-28 h-28 rounded-full bg-orange-500/10 blur-2xl group-hover:bg-orange-500/20 transition-all duration-500 pointer-events-none" />
      </div>

      {/* Card Body */}
      <div className="flex flex-col flex-grow p-4 sm:p-5">
        {/* Category Tag & Link Row */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/5 border border-white/5 text-xs font-medium text-slate-300">
            {getCategoryIcon(project.category || 'Web')}
            <span>{project.category || 'Web'}</span>
          </div>

          {project.href && (
            <span className="flex items-center gap-1 text-xs font-medium text-slate-400 group-hover:text-orange-500 transition-colors">
              <span>{isGithub ? 'Source' : 'Live Demo'}</span>
              {isGithub ? <Github size={12} /> : <ExternalLink size={12} />}
            </span>
          )}
        </div>

        {/* Title & Description */}
        <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-orange-500 transition-colors tracking-tight">
          {project.title}
        </h3>
        <p className="text-xs sm:text-sm text-slate-400 mt-1.5 line-clamp-2 leading-relaxed flex-grow">
          {project.description}
        </p>

        {/* Tech Stack Pill Badges */}
        {project.techStack && project.techStack.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-white/5">
            {project.techStack.map((tech, i) => (
              <span
                key={i}
                className="px-2.5 py-0.5 text-[10px] font-mono rounded-full bg-orange-500/10 text-orange-500 border border-orange-500/20 font-medium tracking-wide"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </a>
  );
}
