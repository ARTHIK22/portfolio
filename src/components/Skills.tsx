import React, { type CSSProperties, useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { skills, skillCategories } from '../data/skills';
import { GithubIcon } from './icons/BrandIcons';

export const Skills: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const cards = Array.from(section.querySelectorAll<HTMLElement>('[data-skill-card]'));
    const activateNearest = () => {
      const center = window.innerHeight / 2;
      const candidates = cards.map((card) => ({ card, rect: card.getBoundingClientRect() })).filter(({ rect }) => rect.bottom > 0 && rect.top < window.innerHeight);
      const active = candidates.sort((a, b) => Math.abs((a.rect.top + a.rect.bottom) / 2 - center) - Math.abs((b.rect.top + b.rect.bottom) / 2 - center))[0]?.card;
      cards.forEach((card) => {
        const selected = card === active;
        card.classList.toggle('is-active', selected);
        card.setAttribute('aria-current', selected ? 'true' : 'false');
      });
    };
    const observer = new IntersectionObserver(activateNearest, { rootMargin: '-25% 0px -25% 0px', threshold: 0 });
    cards.forEach((card) => observer.observe(card));
    window.addEventListener('scroll', activateNearest, { passive: true });
    window.addEventListener('resize', activateNearest, { passive: true });
    activateNearest();
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', activateNearest);
      window.removeEventListener('resize', activateNearest);
    };
  }, []);

  return (
    <section id="skills" data-nav-theme="light" ref={sectionRef} className="skills-section" aria-labelledby="skills-heading">
      <header className="skills-heading">
        <p className="eyebrow">REPOSITORY-VERIFIED TECHNOLOGY STACK</p>
        <h2 id="skills-heading">Capabilities <span>/</span><em>in practice</em></h2>
        <p>Each technology and framework is verified through dependencies, imports, and source implementations across my public repositories.</p>
      </header>
      <div className="skills-stack">
        {skillCategories.map((category, index) => {
          const categorySkills = skills.filter((skill) => skill.category === category.name);
          const repositories = Array.from(new Map(categorySkills.flatMap((skill) => skill.repositories).map((repo) => [repo.url, repo])).values()).slice(0, 3);
          return (
            <article className="skill-stack-card" data-skill-card key={category.name} style={{ '--card-index': index } as CSSProperties} aria-current="false">
              <div className="skill-card-number">{String(index + 1).padStart(2, '0')}</div>
              <div className="skill-card-copy">
                <p className="eyebrow">CAPABILITY {String(index + 1).padStart(2, '0')} / 09</p>
                <h3>{category.name}</h3>
                <div className="skill-active-details">
                  <p className="skill-description">{category.description}</p>
                  <ul className="skill-tags">{categorySkills.map((skill) => <li key={skill.id}>{skill.name}</li>)}</ul>
                  <div className="skill-evidence">
                    <span>REPOSITORY EVIDENCE</span>
                    <div>{repositories.map((repo) => <a key={repo.url} href={repo.url} target="_blank" rel="noopener noreferrer"><GithubIcon aria-hidden="true" />{repo.name}<ArrowUpRight aria-hidden="true" /></a>)}</div>
                  </div>
                  <details className="skill-evidence-details">
                    <summary>Evidence by skill · {categorySkills.length} skills</summary>
                    <div className="skill-evidence-entries">
                      {categorySkills.map((skill) => (
                        <article key={skill.id}>
                          <h4>{skill.name}</h4><p>{skill.evidence.join(' ')}</p>
                          <div>{skill.repositories.map((repo) => <a key={repo.url} href={repo.url} target="_blank" rel="noopener noreferrer"><GithubIcon aria-hidden="true" />{repo.name}<ArrowUpRight aria-hidden="true" /></a>)}</div>
                        </article>
                      ))}
                    </div>
                  </details>
                </div>
              </div>
              <div className="skill-card-side">{String(index + 1).padStart(2, '0')}<span> / 09</span></div>
            </article>
          );
        })}
      </div>
    </section>
  );
};
