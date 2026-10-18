import React from 'react';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import type { Project } from '../data/projects';
import { GithubIcon } from './icons/BrandIcons';

interface ProjectCardProps {
  project: Project;
  index: number;
  onOpenDetails: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, onOpenDetails }) => (
  <article className="showcase-card" aria-labelledby={`project-title-${project.id}`}>
    <div className={`project-cover project-cover--${project.id}`}>
      {project.liveDemoUrl && <img className="project-screenshot" src={`/projects/${project.id}.png`} alt={`${project.title} live project screenshot`} loading="lazy" onError={(event) => { event.currentTarget.hidden = true; }} />}
      <span className="cover-grid" />
      <span className="cover-index">0{index + 1}</span>
      <span className="cover-initial">{project.title.slice(0, 1)}</span>
      <span className="cover-orbit" />
      <span className="cover-bottom">{project.category}</span>
      <span className="project-cover-status">{project.status}</span>
      <button className="project-open-button" type="button" onClick={() => onOpenDetails(project)} aria-label={`Open details for ${project.title}`}><ArrowUpRight aria-hidden="true" /></button>
    </div>
    <div className="showcase-meta">
      <div className="showcase-titleline">
        <div><h3 id={`project-title-${project.id}`}>{project.title}</h3><p>{project.subtitle}</p></div>
      </div>
      <p className="showcase-description">{project.description}</p>
      <div className="showcase-tech">{project.technologies.slice(0, 4).map((technology) => <span key={technology}>{technology}</span>)}</div>
      <div className="showcase-links">
        {project.liveDemoUrl && <a href={project.liveDemoUrl} target="_blank" rel="noopener noreferrer" aria-label={`Open live demo for ${project.title}`}><ExternalLink aria-hidden="true" />Live demo</a>}
        <a href={project.repositoryUrl} target="_blank" rel="noopener noreferrer" aria-label={`Open GitHub repository for ${project.title}`}><GithubIcon aria-hidden="true" />Source <ArrowUpRight aria-hidden="true" /></a>
      </div>
    </div>
  </article>
);
