import React, { useState } from 'react';
import { ArrowDownRight } from 'lucide-react';
import { projects, type Project } from '../data/projects';
import { ProjectCard } from './ProjectCard';
import { ProjectDialog } from './ProjectDialog';

export const FeaturedProjects: React.FC = () => {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  return (
    <section id="projects" className="showcase-section" aria-labelledby="projects-heading">
      <div className="showcase-pin">
        <div className="showcase-heading">
          <div><p className="eyebrow">SELECTED WORK · 2025—26</p><h2 id="projects-heading">Projects with<br /><em>working parts.</em></h2></div>
          <p>Five builds across applied ML, generative AI, and software systems. Open a card for the technical notes.</p>
          <span className="section-count">03 / WORK</span>
        </div>
        <div className="showcase-track-window">
          <div className="showcase-track">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} onOpenDetails={setActiveProject} />
            ))}
          </div>
        </div>
        <div className="showcase-footer">
          <a className="pill-link" data-hover-text="Explore all on GitHub" href="https://github.com/ARTHIK22" target="_blank" rel="noopener noreferrer"><span>Explore all on GitHub</span><ArrowDownRight aria-hidden="true" /></a>
          <p>Scroll to move through the work</p>
          <span>01—05</span>
        </div>
      </div>
      <ProjectDialog project={activeProject} onClose={() => setActiveProject(null)} />
    </section>
  );
};
