import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { skills, skillCategories } from '../data/skills';
import { GithubIcon } from './icons/BrandIcons';

export const Skills: React.FC = () => (
  <section id="skills" data-nav-theme="light" className="skills-section" aria-labelledby="skills-heading">
    <header className="skills-heading">
      <div>
        <p className="eyebrow">TOOLS IN THE REPOSITORIES</p>
        <h2 id="skills-heading">Skills, with <em>receipts.</em></h2>
      </div>
      <p>Grouped by the work they support. Repository links point to the projects behind each area.</p>
    </header>
    <div className="skills-grid">
      {skillCategories.map((category, index) => {
        const categorySkills = skills.filter((skill) => skill.category === category.name);
        const repositories = Array.from(new Map(categorySkills.flatMap((skill) => skill.repositories).map((repo) => [repo.url, repo])).values()).slice(0, 2);
        return (
          <article className="skill-category" key={category.name}>
            <span className="skill-category-index">{String(index + 1).padStart(2, '0')}</span>
            <h3>{category.name}</h3>
            <p className="skill-category-description">{category.description}</p>
            <ul className="skill-tags">{categorySkills.map((skill) => <li key={skill.id}>{skill.name}</li>)}</ul>
            <div className="skill-evidence">
              {repositories.map((repo) => (
                <a key={repo.url} href={repo.url} target="_blank" rel="noopener noreferrer">
                  <GithubIcon aria-hidden="true" /><span>{repo.name}</span><ArrowUpRight aria-hidden="true" />
                </a>
              ))}
            </div>
          </article>
        );
      })}
    </div>
  </section>
);
