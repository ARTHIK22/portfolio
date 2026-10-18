import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { siteConfig } from '../data/site.config';

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
      <div className="chrome-study" role="img" aria-label="Original abstract chrome hand study, a stylized SVG stand-in rather than a 3D model">
        <svg viewBox="0 0 420 560" aria-hidden="true" focusable="false">
          <defs>
            <linearGradient id="chrome-fill" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#fff"/><stop offset=".18" stopColor="#adb0b8"/><stop offset=".31" stopColor="#fdfdff"/><stop offset=".47" stopColor="#727681"/><stop offset=".62" stopColor="#eff0f3"/><stop offset=".79" stopColor="#888c96"/><stop offset="1" stopColor="#fff"/></linearGradient>
            <linearGradient id="chrome-edge" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#fff"/><stop offset="1" stopColor="#8d9099"/></linearGradient>
            <filter id="chrome-shadow" x="-30%" y="-20%" width="160%" height="160%"><feGaussianBlur stdDeviation="10"/></filter>
          </defs>
          <ellipse cx="215" cy="502" rx="112" ry="22" fill="#7d7d85" opacity=".22" filter="url(#chrome-shadow)"/>
          <path d="M115 442c-20-17-29-43-25-68l11-68c2-12 18-17 26-8 4 4 5 10 4 16l-6 42 13-143c1-13 19-20 29-10 5 5 6 11 5 18l-9 114 18-179c1-14 20-21 30-11 5 5 7 11 6 18l-11 170 20-195c1-14 20-21 30-10 5 5 7 11 6 18l-12 203 18-157c2-14 21-19 30-8 4 5 5 11 4 18l-15 184c-3 37-14 70-39 95l-18 18c-28 29-79 31-110 5z" fill="url(#chrome-fill)" stroke="url(#chrome-edge)" strokeWidth="7" strokeLinejoin="round"/>
          <path d="M149 358l-8 66m52-166-8 150m52-162-8 159m51-139-12 139" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" opacity=".7"/>
          <path d="M108 312c-3 34 1 58 16 76m62-204 4 85m56-102 2 91m51-55-8 61" fill="none" stroke="#6b6d75" strokeWidth="3" strokeLinecap="round" opacity=".45"/>
        </svg>
        <span>ABSTRACT CHROME STUDY · SVG STAND-IN</span>
      </div>
    </section>
  </>
);
