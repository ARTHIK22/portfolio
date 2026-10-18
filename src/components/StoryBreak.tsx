import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { siteConfig } from '../data/site.config';
import { HandScene } from './HandScene';

export const StoryBreak: React.FC = () => (
  <>
    <section id="statement" className="statement-section" aria-label="Engineering intelligence statement">
      <p className="eyebrow">MAKING IDEAS USEFUL</p>
      <h2><span>{siteConfig.headlineLine1}</span><em>{siteConfig.headlineLine2}</em></h2>
      <span className="statement-mark" aria-hidden="true">AD</span>
    </section>
    <section id="light-story" className="light-story" data-nav-theme="light" aria-labelledby="light-story-heading">
      <div className="light-story-copy">
        <p className="eyebrow">RESEARCH INTO PRACTICE</p>
        <h2 id="light-story-heading">Full-lifecycle<br />engineering.</h2>
        <p>Rather than stopping at isolated models or toy notebooks, I focus on full-lifecycle engineering: structuring verifiable APIs with FastAPI, building responsive user interfaces with React and TypeScript, managing relational databases, and shipping end-to-end solutions.</p>
        <p>Interested in AI, machine learning, and building practical technology solutions? <a href={siteConfig.profiles.linkedin} target="_blank" rel="noopener noreferrer">Let's connect <ArrowUpRight aria-hidden="true" /></a> or <a href={`mailto:${siteConfig.profiles.email}`}>send me an email <ArrowUpRight aria-hidden="true" /></a>.</p>
        <div className="interest-strip interest-strip--light">
          <p className="eyebrow">VERIFIED TECHNICAL INTERESTS</p>
          <ul>{siteConfig.verifiedTechnicalInterests.map((interest) => <li key={interest}>{interest}</li>)}</ul>
        </div>
      </div>
      <HandScene className="chrome-study" pose={0} />
    </section>
  </>
);
