import React from 'react';
import { BookOpen, FlaskConical, Hammer } from 'lucide-react';
import { siteConfig } from '../data/site.config';

const principles = [
  {
    number: '01',
    title: 'Learn the fundamentals',
    text: 'I am studying computer science and AI/ML, with a particular interest in how data and algorithms shape useful software.',
    Icon: BookOpen,
  },
  {
    number: '02',
    title: 'Test ideas in code',
    text: 'Recent work spans clustering, LLM-assisted evaluation, and dependency risk mapping. Each project starts with a question worth testing.',
    Icon: FlaskConical,
  },
  {
    number: '03',
    title: 'Make the whole thing work',
    text: 'I enjoy connecting model code to APIs, data storage, and interfaces, then documenting how the pieces fit together.',
    Icon: Hammer,
  },
];

export const About: React.FC = () => (
  <section id="about" className="about-section" aria-labelledby="about-heading">
    <div className="about-layout">
      <div className="about-profile">
        <figure className="about-portrait">
          <img src="/assets/arthik-profile.jpg" alt="Arthik Dwivedi" loading="lazy" decoding="async" />
          <figcaption className="portrait-caption"><strong>Arthik Dwivedi</strong><span>B.Tech · Computer Science</span></figcaption>
        </figure>
        <p className="eyebrow">ABOUT</p>
        <h2 id="about-heading">Curious about how <em>systems work.</em></h2>
        <p className="about-lead">I am a computer science student specializing in artificial intelligence and machine learning. I like moving between the theory, the code, and the interface.</p>
        <div className="interest-strip">
          <p className="eyebrow">CURRENT INTERESTS</p>
          <ul>{siteConfig.verifiedTechnicalInterests.map((interest) => <li key={interest}>{interest}</li>)}</ul>
        </div>
      </div>
      <div className="about-principles" aria-label="How Arthik approaches learning and project work">
        {principles.map(({ number, title, text, Icon }) => (
          <article className="about-principle" key={number}>
            <span className="about-principle-number">{number}</span>
            <div className="about-principle-copy">
              <Icon aria-hidden="true" />
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);
