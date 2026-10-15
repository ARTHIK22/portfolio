// src/components/FeaturedProjects.tsx
import React, { useState, useRef, useEffect } from 'react';
import { Code2 } from 'lucide-react';
import { projects, Project } from '../data/projects';
import { ProjectCard } from './ProjectCard';
import { ProjectDialog } from './ProjectDialog';
import { animate, stagger } from '../lib/motion';

export const FeaturedProjects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (gridRef.current) {
              const cards = gridRef.current.children;
              animate(cards, {
                opacity: [0, 1],
                translateY: [28, 0],
                delay: stagger(100),
                duration: 800,
                ease: 'outQuart',
              });
            }
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [selectedCategory]);

  const categories = ['All', 'Generative AI', 'Graph & Risk Systems', 'Applied ML', 'Unsupervised Analytics', 'Agentic Systems'];

  const filteredProjects =
    selectedCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative"
      aria-labelledby="projects-heading"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-[#D6B574]/35 shadow-xs mb-3">
            <Code2 className="w-3.5 h-3.5 text-[#B89246]" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#5B646B]">
              Verified Engineering Inventory
            </span>
          </div>
          <h2
            id="projects-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#263238] tracking-tight leading-tight"
          >
            Selected Work
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#5B646B]">
            Exploring ideas. Building intelligent solutions.
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5 p-1 rounded-2xl bg-white/60 border border-[#D6B574]/30 backdrop-blur-sm">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-[#263238] text-white shadow-xs'
                  : 'text-[#5B646B] hover:text-[#263238] hover:bg-black/[0.03]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onOpenDetails={(p) => setActiveProject(p)}
          />
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-xs text-[#5B646B] font-mono">
          ✓ Sourced from public GitHub commits under{' '}
          <a
            href="https://github.com/ARTHIK22"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-[#263238] hover:text-[#D6B574]"
          >
            github.com/ARTHIK22
          </a>{' '}
          • Zero synthetic projects
        </p>
      </div>

      <ProjectDialog
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </section>
  );
};
