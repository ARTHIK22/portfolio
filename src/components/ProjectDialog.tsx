// src/components/ProjectDialog.tsx
import React, { useEffect, useRef } from 'react';
import { X, ExternalLink, CheckCircle2, AlertTriangle, Layers, Compass } from 'lucide-react';
import { Project } from '../data/projects';
import { GithubIcon } from './icons/BrandIcons';

interface ProjectDialogProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectDialog: React.FC<ProjectDialogProps> = ({ project, onClose }) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!project) return;

    closeBtnRef.current?.focus();

    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalStyle;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="dialog-title"
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/40 backdrop-blur-md overflow-y-auto animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        className="relative w-full max-w-3xl glass-panel-elevated bg-[#FFFDF8] rounded-3xl p-6 sm:p-10 border border-[#D6B574]/40 shadow-2xl my-auto max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-start justify-between gap-4 pb-6 border-b border-[#D6B574]/20">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#D6B574]/20 text-[#263238] border border-[#D6B574]/40">
                {project.category}
              </span>
              <span
                className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                  project.status === 'Complete'
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : project.status === 'Working Prototype'
                    ? 'bg-amber-100 text-amber-800 border border-amber-300'
                    : 'bg-blue-100 text-blue-800 border border-blue-300'
                }`}
              >
                {project.status}
              </span>
            </div>
            <h2 id="dialog-title" className="text-2xl sm:text-3xl font-serif font-bold text-[#263238]">
              {project.title}
            </h2>
            <p className="text-sm font-medium text-[#5B646B] mt-1">{project.subtitle}</p>
          </div>

          <button
            ref={closeBtnRef}
            onClick={onClose}
            type="button"
            className="p-2 rounded-full text-[#5B646B] hover:text-[#263238] hover:bg-black/[0.05] transition-all focus-visible:ring-2 focus-visible:ring-[#D6B574]"
            aria-label="Close project modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-6 space-y-7 text-sm text-[#263238]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="p-4 rounded-2xl bg-white border border-[#D6B574]/20">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#D6B574] mb-2 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" />
                Problem Statement
              </h3>
              <p className="text-xs sm:text-sm text-[#5B646B] leading-relaxed">
                {project.details.problem}
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-[#82DAD1]/30">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#368F83] mb-2 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5" />
                Engineering Objective
              </h3>
              <p className="text-xs sm:text-sm text-[#5B646B] leading-relaxed">
                {project.details.objective}
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#263238] mb-2">
              Technical Approach
            </h3>
            <p className="text-sm text-[#5B646B] leading-relaxed">
              {project.details.technicalApproach}
            </p>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#263238] mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#D6B574]" />
              Architectural Breakdown
            </h3>
            <ul className="space-y-2">
              {project.details.architecture.map((arch, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2.5 text-xs sm:text-sm text-[#5B646B] p-2.5 rounded-xl bg-white/70 border border-black/[0.04]"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D6B574] mt-2 shrink-0" />
                  <span>{arch}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#263238] mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Implemented Features
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {project.details.keyFeatures.map((feat, i) => (
                <div
                  key={i}
                  className="p-3 rounded-xl bg-white/80 border border-[#D6B574]/20 text-xs sm:text-sm text-[#5B646B]"
                >
                  {feat}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2 border-t border-[#D6B574]/20">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#263238] mb-2">
                Technical Challenges
              </h3>
              <ul className="space-y-2">
                {project.details.challenges.map((chal, i) => (
                  <li key={i} className="text-xs text-[#5B646B] leading-relaxed flex items-start gap-2">
                    <span className="text-[#D6B574] font-bold">•</span>
                    <span>{chal}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#263238] mb-2">
                Lessons Learned
              </h3>
              <ul className="space-y-2">
                {project.details.lessonsLearned.map((les, i) => (
                  <li key={i} className="text-xs text-[#5B646B] leading-relaxed flex items-start gap-2">
                    <span className="text-[#82DAD1] font-bold">•</span>
                    <span>{les}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#263238] mb-2.5">
              Technologies &amp; Libraries
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-full text-xs font-medium bg-white text-[#263238] border border-[#D6B574]/30 shadow-xs"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-[#D6B574]/20 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <a
              href={project.repositoryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-white bg-[#263238] hover:bg-[#1E272C] transition-all shadow-xs"
            >
              <GithubIcon className="w-4 h-4 fill-white" />
              <span>Explore Source Code</span>
            </a>

            {project.liveDemoUrl && (
              <a
                href={project.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-[#263238] bg-[#D6B574]/25 hover:bg-[#D6B574]/40 border border-[#D6B574]/50 transition-all shadow-xs"
              >
                <ExternalLink className="w-4 h-4 text-[#B89246]" />
                <span>Open Live Deployment</span>
              </a>
            )}
          </div>

          <button
            onClick={onClose}
            type="button"
            className="px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium text-[#5B646B] hover:text-[#263238] hover:bg-black/[0.04] transition-all"
          >
            Close Dialog
          </button>
        </div>
      </div>
    </div>
  );
};
