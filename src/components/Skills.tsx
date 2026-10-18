import React, { type CSSProperties, useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { skills, skillCategories } from '../data/skills';
import { GithubIcon } from './icons/BrandIcons';
import { HandScene } from './HandScene';

export const Skills: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const cards = Array.from(section.querySelectorAll<HTMLElement>('[data-skill-card]'));
    let raf = 0;
    const updateFromScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const rect = section.getBoundingClientRect();
        const start = window.scrollY + rect.top;
        const travel = Math.max(1, section.offsetHeight - window.innerHeight);
        const progress = Math.min(1, Math.max(0, (window.scrollY - start) / travel));
        const activeIndex = Math.min(cards.length - 1, Math.round(progress * (cards.length - 1)));
        const stack = section.querySelector<HTMLElement>('.skills-stack');
        const stackTop = stack?.getBoundingClientRect().top ?? 96;
        const activeCard = cards[activeIndex];
        const anchorTransform = new DOMMatrixReadOnly(getComputedStyle(activeCard).transform);
        const untransformedTop = activeCard.getBoundingClientRect().top - anchorTransform.m42;
        const anchorOffset = stackTop - untransformedTop;
        section.style.setProperty('--skill-progress', String(progress));
        section.style.setProperty('--active-skill', String(activeIndex));
        section.style.setProperty('--skill-anchor-y', `${anchorOffset}px`);
        section.dataset.activeSkill = String(activeIndex);
        setActiveIndex((current) => current === activeIndex ? current : activeIndex);
        cards.forEach((card, index) => {
          const delta = index - activeIndex;
          card.style.setProperty('--skill-distance', String(delta));
          card.style.setProperty('--skill-depth', String(Math.abs(delta)));
          card.style.zIndex = delta === 0 ? '100' : String(delta > 0 ? 60 - Math.abs(delta) : 40 - Math.abs(delta));
          const active = index === activeIndex;
          card.classList.toggle('is-active', active);
          card.setAttribute('aria-current', active ? 'true' : 'false');
          card.inert = !active && window.innerWidth > 640;
        });
      });
    };
    window.addEventListener('scroll', updateFromScroll, { passive: true });
    window.addEventListener('resize', updateFromScroll, { passive: true });
    updateFromScroll();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', updateFromScroll);
      window.removeEventListener('resize', updateFromScroll);
    };
  }, []);

  return (
    <section id="skills" data-nav-theme="light" ref={sectionRef} className="skills-section" aria-labelledby="skills-heading">
      <header className="skills-heading">
        <p className="eyebrow">REPOSITORY-VERIFIED TECHNOLOGY STACK</p>
        <h2 id="skills-heading">Capabilities <em>in practice</em></h2>
        <p>Each technology and framework is verified through dependencies, imports, and source implementations across my public repositories.</p>
        <HandScene className="skills-hand-scene" pose={activeIndex} />
      </header>
      <div className="skills-stack">
        <div className="skills-stack-inner">
        {skillCategories.map((category, index) => {
          const categorySkills = skills.filter((skill) => skill.category === category.name);
          const repositories = Array.from(new Map(categorySkills.flatMap((skill) => skill.repositories).map((repo) => [repo.url, repo])).values()).slice(0, 3);
          return (
            <article className="skill-stack-card" data-skill-card key={category.name} style={{ '--card-index': index } as CSSProperties} aria-current="false" inert>
              <div className="skill-card-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</div>
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
      </div>
    </section>
  );
};
