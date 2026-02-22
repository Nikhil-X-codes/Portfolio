import { useState } from 'react';
import { Code2, Atom, Database, Cpu, GitBranch, Palette, Brain, Server, ArrowLeft, ArrowRight } from 'lucide-react';
import Lightning from './ui/Lightning';

export default function Skills() {
  const skills = [
    {
      id: 1,
      name: "Development",
      icon: Atom,
      angle: 30,
      description:
        "Building scalable full-stack web applications using modern frameworks and best practices.",
      tags: ["React.js", "Next.js", "Node.js", "Express.js", "MongoDB"],
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/10"
    },
    {
      id: 2,
      name: "Databases",
      icon: Database,
      angle: 100,
      description:
        "Designing efficient SQL and NoSQL databases with optimized queries and schemas.",
      tags: ["PostgreSQL", "MongoDB", "MySQL", "Database Design"],
      color: "text-teal-400",
      bgColor: "bg-teal-500/10"
    },
    {
      id: 3,
      name: "Languages",
      icon: Cpu,
      angle: 170,
      description:
        "Strong programming fundamentals with focus on algorithms, data structures, and problem solving.",
      tags: ["C++", "JavaScript", "Python"],
      color: "text-cyan-400",
      bgColor: "bg-cyan-500/10"
    },
    {
      id: 4,
      name: "Machine Learning & Libraries",
      icon: Brain,
      angle: 245,
      description:
        "Developing machine learning models and data-driven solutions using Python libraries.",
      tags: [
        "Scikit-learn",
        "Pandas",
        "NumPy",
        "Matplotlib",
        "Seaborn"
      ],
      color: "text-purple-400",
      bgColor: "bg-purple-500/10"
    },
    {
      id: 5,
      name: "Tools",
      icon: GitBranch,
      angle: 315,
      description:
        "Using modern developer tools for version control, testing, deployment, and collaboration.",
      tags: ["Git & GitHub", "Postman", "Deployment", "Hugging Face", "VS Code"],
      color: "text-orange-400",
      bgColor: "bg-orange-500/10"
    }
  ];

  const [selectedSkill, setSelectedSkill] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSkillClick = (skill) => {
    const index = skills.findIndex(s => s.id === skill.id);
    setCurrentIndex(index);
    setSelectedSkill(skill);
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % skills.length;
    setCurrentIndex(nextIndex);
    setSelectedSkill(skills[nextIndex]);
  };

  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + skills.length) % skills.length;
    setCurrentIndex(prevIndex);
    setSelectedSkill(skills[prevIndex]);
  };

  // Calculate position for icons inside segments
  const getIconPosition = (angle) => {
    const radius = 25; // percentage from center - reduced to position inside segments
    const radians = (angle - 90) * (Math.PI / 180);
    const x = 50 + radius * Math.cos(radians);
    const y = 50 + radius * Math.sin(radians);
    return { left: `${x}%`, top: `${y}%` };
  };

  return (
    <section id="about" className="relative py-8 overflow-hidden">
      {/* Lightning Background */}
      <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
        <Lightning
          hue={120}
          xOffset={0.2}
          speed={0.4}
          intensity={0.7}
          size={0.9}
        />
      </div>
      
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 scroll-animate from-bottom">
        <h2 className="text-3xl font-bold mb-3">Skills</h2>
        <div className="w-16 h-1.5 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full"></div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full z-10">
        
        {/* Left Column: Skills Wheel */}
        <div className="relative w-full max-w-[500px] aspect-square mx-auto flex items-center justify-center scroll-animate from-left">
          
          {/* Glow Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-full blur-3xl transform scale-110"></div>

          {/* SVG Wheel */}
          <svg viewBox="0 0 400 400" className="w-full h-full drop-shadow-2xl">
            {/* Segments */}
            {skills.map((skill, index) => {
              const rotation = index * 72;
              const isSelected = selectedSkill?.id === skill.id;
              return (
                <g 
                  key={skill.id}
                  className="cursor-pointer group"
                  transform={`rotate(${rotation}, 200, 200)`}
                  onClick={() => handleSkillClick(skill)}
                >
                  <path
                    d="M200,200 L200,5 A195,195 0 0,1 368.8,102.5 Z"
                    className={`stroke-[2px] transition-all duration-500 ${
                      isSelected 
                        ? 'fill-emerald-500/20 stroke-emerald-500/70 drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]' 
                        : 'fill-slate-900/50 stroke-emerald-500/20 group-hover:fill-slate-800/50 group-hover:stroke-emerald-500/50'
                    }`}
                  />
                </g>
              );
            })}
          </svg>

          {/* Icons Overlay */}
          {skills.map((skill) => {
            const position = getIconPosition(skill.angle);
            const Icon = skill.icon;
            const isSelected = selectedSkill?.id === skill.id;
            
            return (
              <div
                key={skill.id}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-14 h-14 rounded-full shadow-lg cursor-pointer transition-all duration-500 z-10 ${
                  isSelected 
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500 scale-125 shadow-emerald-500/50 animate-pulse' 
                    : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:scale-110 shadow-emerald-500/30 hover:shadow-emerald-500/50'
                }`}
                style={position}
                onClick={() => handleSkillClick(skill)}
              >
                <Icon className="w-8 h-8 stroke-[1.5] text-white" />
              </div>
            );
          })}

          {/* Center Hub */}
          <div className="absolute inset-0 m-auto w-40 h-40 rounded-full bg-gradient-to-br from-slate-900 to-slate-800 border-[3px] border-emerald-500/30 flex flex-col items-center justify-center z-20 shadow-[0_0_30px_-5px_rgba(0,0,0,0.5)]">
            <div className="w-12 h-12 rounded-full flex items-center justify-center mb-2 border border-emerald-500/30">
              <Code2 className="w-6 h-6 text-emerald-400 stroke-[2]" />
            </div>
            <span className="text-white font-semibold text-lg tracking-tight">Tech Stack</span>
          </div>
        </div>

        {/* Right Column: Info Card */}
        <div className="flex items-center justify-center w-full scroll-animate from-right">
          <div className="relative w-full max-w-md bg-gradient-to-br from-slate-900/60 to-slate-800/60 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-10 overflow-hidden group hover:border-emerald-500/30 transition-all duration-500 min-h-[450px]">
            
            {/* Ambient Glow inside card */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-full blur-[80px] pointer-events-none"></div>
            
            <div className="relative z-10 flex flex-col items-center text-center">
              
              {selectedSkill ? (
                // Skill Details View
                <div className="animate-fadeIn">
                  {/* Icon Container */}
                  <div className="relative mb-8">
                    <div className={`absolute inset-0 ${selectedSkill.bgColor} blur-xl rounded-full`}></div>
                    <div className={`relative w-24 h-24 bg-gradient-to-br from-slate-900 to-slate-800 border border-emerald-500/20 rounded-2xl flex items-center justify-center shadow-2xl`}>
                      <selectedSkill.icon className={`w-10 h-10 ${selectedSkill.color} stroke-[1.5]`} />
                    </div>
                    <div className="absolute -inset-4 rounded-full border border-dashed border-emerald-700/30 animate-[spin_16s_linear_infinite]"></div>
                  </div>

                  <h3 className="text-2xl font-semibold bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent mb-3 tracking-tight">
                    {selectedSkill.name}
                  </h3>
                  
                  <p className="text-base text-slate-300 font-light leading-relaxed max-w-xs mx-auto mb-6">
                    {selectedSkill.description}
                  </p>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-2 justify-center items-center mb-8">
                    {selectedSkill.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1.5 border border-emerald-500/30 rounded-full text-xs text-emerald-400 font-medium hover:border-emerald-400/50 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                </div>
              ) : (
                // Default Welcome View
                <div className="animate-fadeIn">
                  {/* Icon Container */}
                  <div className="relative mb-8">
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 blur-xl rounded-full"></div>
                    <div className="relative w-24 h-24 bg-gradient-to-br from-slate-900 to-slate-800 border border-emerald-500/20 rounded-2xl flex items-center justify-center shadow-2xl">
                      <Code2 className="w-10 h-10 text-emerald-400 stroke-[1.5]" />
                    </div>
                      <div className="absolute -inset-4 rounded-full border border-dashed border-emerald-700/30 animate-[spin_16s_linear_infinite]"></div>
                  </div>

                  <h3 className="text-2xl font-semibold bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent mb-3 tracking-tight">
                    Explore My Skills
                  </h3>
                  
                  <p className="text-lg text-slate-300 font-light leading-relaxed max-w-xs mx-auto">
                    Click on any skill segment in the wheel to discover my expertise and technical proficiencies
                  </p>
                </div>
              )}

              {/* Navigation Dots */}
              <div className="flex items-center gap-4 mt-10">
                <button 
                  onClick={handlePrev}
                  className="text-slate-600 hover:text-emerald-400 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  disabled={!selectedSkill}
                  aria-label="Previous skill"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <div className="flex gap-2">
                  {skills.map((skill) => (
                    <button
                      key={skill.id}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        selectedSkill?.id === skill.id
                          ? 'bg-gradient-to-r from-emerald-500 to-teal-500 w-6'
                          : 'bg-slate-700 hover:bg-slate-600 w-2'
                      }`}
                      onClick={() => handleSkillClick(skill)}
                      aria-label={`Select ${skill.name}`}
                    ></button>
                  ))}
                </div>
                <button 
                  onClick={handleNext}
                  className="text-slate-600 hover:text-emerald-400 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  disabled={!selectedSkill}
                  aria-label="Next skill"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
      </div>
    </section>
  );
}
