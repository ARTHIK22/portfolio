// src/components/ProjectCard.tsx
import React from 'react';
import { ExternalLink, Info } from 'lucide-react';
import { Project } from '../data/projects';
import { GithubIcon } from './icons/BrandIcons';

interface ProjectCardProps {
  project: Project;
  onOpenDetails: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onOpenDetails }) => {
  return (
    <article
      className="pearl-card rounded-3xl p-6 sm:p-7 flex flex-col justify-between relative group focus-within:ring-2 focus-within:ring-[#D6B574] transition-all duration-300"
      aria-labelledby={`project-title-${project.id}`}
    >
      <div>
        <div className="flex items-center justify-between gap-3 mb-4">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#D6B574]">
            {project.category}
          </span>
          <span
            className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase ${
              project.status === 'Complete'
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-300/60'
                : project.status === 'Working Prototype'
                ? 'bg-amber-50 text-amber-800 border border-amber-300/60'
                : 'bg-blue-50 text-blue-800 border border-blue-300/60'
            }`}
          >
            {project.status}
          </span>
        </div>

        {/* Abstract Purpose-Driven Geometric Art Frame */}
        <div
          className={`w-full h-36 rounded-2xl bg-gradient-to-br ${project.accentGradient} border border-[#D6B574]/20 mb-5 relative overflow-hidden flex items-center justify-center select-none`}
          aria-hidden="true"
        >
          {project.id === 'projectsense-ai' && (
            <svg viewBox="0 0 200 100" className="w-full h-full opacity-60">
              <circle cx="100" cy="50" r="32" fill="none" stroke="#D6B574" strokeWidth="1.5" strokeDasharray="3 3" />
              <circle cx="100" cy="50" r="14" fill="#82DAD1" opacity="0.7" />
              <path d="M 50,50 L 86,50 M 114,50 L 150,50" stroke="#263238" strokeWidth="1" />
              <text x="100" y="53" textAnchor="middle" fontSize="8" fill="#263238" fontFamily="monospace">xAI GROK</text>
            </svg>
          )}

          {project.id === 'hidden-dependency-discovery' && (
            <svg viewBox="0 0 200 100" className="w-full h-full opacity-60">
              <circle cx="60" cy="35" r="10" fill="#D6B574" />
              <circle cx="140" cy="35" r="10" fill="#82DAD1" />
              <circle cx="100" cy="70" r="12" fill="#263238" opacity="0.8" />
              <line x1="60" y1="35" x2="100" y2="70" stroke="#D6B574" strokeWidth="1.5" />
              <line x1="140" y1="35" x2="100" y2="70" stroke="#82DAD1" strokeWidth="1.5" />
              <line x1="60" y1="35" x2="140" y2="35" stroke="#C8E9D7" strokeWidth="1" strokeDasharray="2 4" />
            </svg>
          )}

          {project.id === 'neoestate-ai' && (
            <svg viewBox="0 0 200 100" className="w-full h-full opacity-60">
              <path d="M 40,80 L 80,45 L 120,60 L 160,25" fill="none" stroke="#D6B574" strokeWidth="2" />
              <circle cx="160" cy="25" r="5" fill="#F2BFA7" />
              <text x="160" y="16" textAnchor="middle" fontSize="8" fill="#263238" fontFamily="monospace">RF FIT</text>
              <line x1="30" y1="85" x2="170" y2="85" stroke="#263238" strokeWidth="0.75" />
            </svg>
          )}

          {project.id === 'student-performance-clustering' && (
            <svg viewBox="0 0 200 100" className="w-full h-full opacity-60">
              <circle cx="65" cy="50" r="22" fill="#82DAD1" opacity="0.3" stroke="#82DAD1" strokeWidth="1" />
              <circle cx="135" cy="50" r="22" fill="#DCD7F5" opacity="0.3" stroke="#DCD7F5" strokeWidth="1" />
              <circle cx="65" cy="50" r="4" fill="#263238" />
              <circle cx="135" cy="50" r="4" fill="#263238" />
              <text x="100" y="54" textAnchor="middle" fontSize="8" fill="#5B646B" fontFamily="monospace">K=2</text>
            </svg>
          )}

          {project.id === 'rxpilot-ai' && (
            <svg viewBox="0 0 200 100" className="w-full h-full opacity-60">
              <rect x="70" y="25" width="60" height="50" rx="8" fill="none" stroke="#D6B574" strokeWidth="1.5" />
              <line x1="80" y1="40" x2="120" y2="40" stroke="#82DAD1" strokeWidth="2" />
              <line x1="80" y1="52" x2="110" y2="52" stroke="#F2BFA7" strokeWidth="2" />
              <text x="100" y="65" textAnchor="middle" fontSize="7" fill="#263238" fontFamily="monospace">Rx AGENT</text>
            </svg>
          )}
        </div>

        <h3
          id={`project-title-${project.id}`}
          className="text-xl sm:text-2xl font-serif font-bold text-[#263238] tracking-tight group-hover:text-[#B89246] transition-colors"
        >
          {project.title}
        </h3>
        <p className="text-xs font-medium text-[#D6B574] mt-0.5 mb-2.5">
          {project.subtitle}
        </p>

        <p className="text-xs sm:text-sm text-[#5B646B] leading-relaxed mb-5 line-clamp-3">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.technologies.slice(0, 5).map((tech, i) => (
            <span
              key={i}
              className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#FFFDF8] text-[#263238] border border-[#D6B574]/30"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 5 && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-medium text-[#5B646B] bg-black/[0.03]">
              +{project.technologies.length - 5}
            </span>
          )}
        </div>
      </div>

      <div className="pt-4 border-t border-[#D6B574]/20 flex items-center justify-between gap-2 relative z-10">
        <button
          id={`project-details-btn-${project.id}`}
          onClick={(e) => {
            e.stopPropagation();
            onOpenDetails(project);
          }}
          type="button"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#263238] hover:text-[#B89246] focus-visible:ring-2 focus-visible:ring-[#D6B574] rounded-lg py-1.5 px-2.5 bg-black/[0.03] hover:bg-black/[0.06] transition-colors cursor-pointer"
        >
          <Info className="w-3.5 h-3.5 text-[#D6B574]" />
          <span>Architecture &amp; Specs</span>
        </button>

        <div className="flex items-center gap-2">
          {project.liveDemoUrl && (
            <a
              href={project.liveDemoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full text-[#263238] bg-[#D6B574]/20 hover:bg-[#D6B574]/40 border border-[#D6B574]/40 transition-all shadow-xs"
              title="Open Live Deployment"
              aria-label={`Open live deployment for ${project.title}`}
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
          <a
            href={project.repositoryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full text-white bg-[#263238] hover:bg-[#1E272C] transition-all shadow-xs group/btn"
            title="View GitHub Repository"
            aria-label={`View GitHub repository for ${project.title}`}
          >
            <GithubIcon className="w-3.5 h-3.5 fill-white" />
          </a>
        </div>
      </div>
    </article>
  );
};
