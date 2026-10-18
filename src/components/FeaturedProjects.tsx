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
          <div><p className="eyebrow">SELECTED ENGINEERING WORK</p><h2 id="projects-heading">Ideas into<br /><em>working systems</em></h2></div>
          <p>Five projects built around applied AI, machine learning, and useful software systems.</p>
          <span className="section-count">03 — 09</span>
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
          <p>Horizontal movement follows the page scroll · drag or swipe on touch screens</p>
          <span>SCROLL TO MOVE →</span>
        </div>
      </div>
      <ProjectDialog project={activeProject} onClose={() => setActiveProject(null)} />
    </section>
  );
};
