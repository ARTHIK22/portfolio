import React from 'react';
import { BookOpen, FlaskConical, Hammer } from 'lucide-react';
import { siteConfig } from '../data/site.config';

const principles = [
  {
    title: 'Learning',
    subtitle: 'Continuous Foundational Depth',
    description: 'Engaged in computer science engineering with a specialization in AI/ML. Deepening mathematical foundations across linear algebra, calculus, and algorithms while following modern ML advancements.',
    icon: BookOpen,
  },
  {
    title: 'Experimenting',
    subtitle: 'Empirical Prototyping',
    description: 'Testing ideas through reproducible code. From evaluating multi-tier dependency risk to clustering student behaviors and calibrating confidence scores in clinical agent pipelines.',
    icon: FlaskConical,
  },
  {
    title: 'Building',
    subtitle: 'Systems With Measurable Utility',
    description: 'Translating complex research into robust applications with clean FastAPI backends, typed React frontends, verifiable database migrations, and production cloud deployments.',
    icon: Hammer,
  },
];

const bio = 'I am a B.Tech Computer Science student specializing in Artificial Intelligence and Machine Learning. My journey is defined by curiosity for how algorithms extract patterns from chaotic data, and how intelligent architectures can be engineered into reliable, human-centered tools.';

export const About: React.FC = () => (
  <section id="about" className="about-section" aria-labelledby="about-heading">
    <div className="about-story-grid">
      <aside className="about-sticky">
        <div className="about-portrait">
          <img src="/assets/arthik-profile.jpg" alt="Arthik Dwivedi — B.Tech AI/ML Engineer" loading="lazy" decoding="async" />
          <div className="portrait-caption"><strong>Arthik Dwivedi</strong><span>B.Tech CSE · AI &amp; ML</span></div>
        </div>
        <p className="eyebrow">PHILOSOPHY &amp; FOCUS</p>
        <h2 id="about-heading">Why I build<br /><em>intelligent systems</em></h2>
        <p className="about-lead">Engineering intelligence from principles to production.</p>
      </aside>
      <div className="about-swap-list" aria-label="About Arthik and his learning, experimenting, and building principles">
        <article className="about-swap about-swap--bio">
          <span className="number">01</span><div><p className="eyebrow">A PRACTICAL MINDSET</p><h3>From patterns<br />to useful tools</h3><p>{bio}</p></div>
        </article>
        {principles.map(({ title, subtitle, description, icon: Icon }, index) => (
          <article className="about-swap" key={title}>
            <span className="number">0{index + 2}</span>
            <div><div className="about-swap-title"><Icon aria-hidden="true" /><p className="eyebrow">{subtitle}</p><h3>{title}</h3></div><p>{description}</p></div>
          </article>
        ))}
      </div>
    </div>
    <div className="interest-strip">
      <p className="eyebrow">CURRENT TECHNICAL INTERESTS</p>
      <ul>{siteConfig.verifiedTechnicalInterests.map((interest) => <li key={interest}>{interest}</li>)}</ul>
    </div>
  </section>
);
