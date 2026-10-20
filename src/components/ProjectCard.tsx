import React from 'react';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import type { Project } from '../data/projects';
import { GithubIcon } from './icons/BrandIcons';

const ProjectArtwork: React.FC<{ project: Project }> = ({ project }) => {
  switch (project.id) {
    case 'projectsense-ai':
      return (
        <svg className="project-artwork project-artwork--review" viewBox="0 0 420 240" aria-hidden="true">
          <rect className="art-panel" x="54" y="36" width="102" height="142" rx="2" />
          <path className="art-line" d="M73 62h63M73 76h48M73 97h63M73 111h42M73 132h51" />
          <path className="art-line art-line--strong" d="M172 107h49m0 0 20-20m-20 20 20 20" />
          <rect className="art-panel art-panel--accent" x="262" y="56" width="104" height="102" rx="2" />
          <circle className="art-node" cx="281" cy="78" r="5" /><path className="art-line" d="M295 78h53M276 101h61M276 119h45" />
          <text className="art-label" x="54" y="208">REPORTS / RUBRIC / QUESTIONS</text>
        </svg>
      );
    case 'hidden-dependency-discovery':
      return (
        <svg className="project-artwork project-artwork--graph" viewBox="0 0 420 240" aria-hidden="true">
          <path className="art-line" d="M87 75 174 112 255 66 330 108M174 112l-5 75 86-31 75 32M255 66l0 90" />
          <path className="art-line art-line--soft" d="m87 75 82 112m86-31 75-48" />
          <circle className="art-node" cx="87" cy="75" r="10" /><circle className="art-node art-node--bright" cx="174" cy="112" r="13" />
          <circle className="art-node" cx="255" cy="66" r="9" /><circle className="art-node" cx="330" cy="108" r="10" />
          <circle className="art-node" cx="169" cy="187" r="8" /><circle className="art-node" cx="255" cy="156" r="8" /><circle className="art-node" cx="330" cy="188" r="8" />
          <text className="art-label" x="54" y="218">DEPENDENCY PATH / SOURCE EVIDENCE</text>
        </svg>
      );
    case 'neoestate-ai':
      return (
        <svg className="project-artwork project-artwork--valuation" viewBox="0 0 420 240" aria-hidden="true">
          <path className="art-line art-line--soft" d="M72 178h278M93 178V74m52 104V55m52 123V92m52 86V68m52 110v-48" />
          <rect className="art-bar" x="83" y="129" width="25" height="49" /><rect className="art-bar art-bar--bright" x="135" y="104" width="25" height="74" />
          <rect className="art-bar" x="187" y="137" width="25" height="41" /><rect className="art-bar art-bar--bright" x="239" y="89" width="25" height="89" />
          <rect className="art-bar" x="291" y="116" width="25" height="62" />
          <path className="art-line art-line--strong" d="m84 112 63-29 53 36 53-48 62 22" />
          <circle className="art-node" cx="84" cy="112" r="5" /><circle className="art-node" cx="147" cy="83" r="5" /><circle className="art-node" cx="200" cy="119" r="5" />
          <circle className="art-node art-node--bright" cx="253" cy="71" r="6" /><circle className="art-node" cx="315" cy="93" r="5" />
          <text className="art-label" x="54" y="218">FEATURES → PRICE ESTIMATE</text>
        </svg>
      );
    case 'student-performance-clustering':
      return (
        <svg className="project-artwork project-artwork--clusters" viewBox="0 0 420 240" aria-hidden="true">
          <path className="art-axis" d="M68 44v145h286M68 189l8-9m-8 9 9 7m277-7-9-8m9 8-9 8" />
          <ellipse className="art-cluster" cx="137" cy="139" rx="51" ry="34" /><ellipse className="art-cluster art-cluster--two" cx="252" cy="93" rx="57" ry="35" /><ellipse className="art-cluster art-cluster--three" cx="302" cy="159" rx="34" ry="22" />
          <g className="art-points"><circle cx="108" cy="142" r="4"/><circle cx="126" cy="120" r="4"/><circle cx="141" cy="153" r="4"/><circle cx="162" cy="130" r="4"/><circle cx="153" cy="166" r="4"/><circle cx="226" cy="93" r="4"/><circle cx="244" cy="74" r="4"/><circle cx="259" cy="105" r="4"/><circle cx="276" cy="83" r="4"/><circle cx="264" cy="119" r="4"/><circle cx="287" cy="154" r="4"/><circle cx="307" cy="146" r="4"/><circle cx="316" cy="166" r="4"/></g>
          <text className="art-label" x="54" y="218">K-MEANS / STUDENT GROUPS</text>
        </svg>
      );
    case 'rxpilot-ai':
      return (
        <svg className="project-artwork project-artwork--prescription" viewBox="0 0 420 240" aria-hidden="true">
          <path className="art-panel" d="M92 38h164l52 52v112H92z" /><path className="art-line art-line--soft" d="M256 39v52h51M118 109h120M118 127h104M118 145h83" />
          <circle className="art-node art-node--bright" cx="260" cy="146" r="29" /><path className="art-line art-line--strong" d="M260 132v17m0 10v1" />
          <path className="art-line" d="M290 146h42m-7-7 7 7-7 7" />
          <rect className="art-panel art-panel--accent" x="325" y="126" width="42" height="40" rx="2" />
          <path className="art-line art-line--soft" d="M335 138h22m-22 9h16" />
          <text className="art-label" x="54" y="218">STRUCTURE / UNCERTAINTY / REVIEW</text>
        </svg>
      );
    default:
      return null;
  }
};

interface ProjectCardProps {
  project: Project;
  index: number;
  onOpenDetails: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, onOpenDetails }) => (
  <article className="showcase-card" aria-labelledby={`project-title-${project.id}`}>
    <div className={`project-cover project-cover--${project.id}`}>
      {project.screenshotUrl && <img className="project-screenshot" src={project.screenshotUrl} alt={`${project.title} project preview`} loading="lazy" decoding="async" />}
      <span className="cover-grid" />
      <span className="cover-index">0{index + 1}</span>
      <ProjectArtwork project={project} />
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
