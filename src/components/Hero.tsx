import React from 'react';
import { ArrowDownRight, Compass, Cpu } from 'lucide-react';
import { siteConfig } from '../data/site.config';
import { HandParticleHero } from './HandParticleHero';
// ─── Hero Section ────────────────────────────────────────────────────────────
export const Hero: React.FC = () => (
  <section id="hero" className="hero-section" aria-labelledby="hero-title">
    <div className="intro-wipe" aria-hidden="true">
      <span>ARTHIK</span><span>DWIVEDI</span>
    </div>
    <div className="hero-wordmark" aria-hidden="true">
      <span>{siteConfig.name}</span>
    </div>
    <p className="hero-subtitle">{siteConfig.headlineLine1}</p>
    <div className="hero-stage">
      <div className="hero-copy">
        <p className="hero-kicker"><Compass aria-hidden="true" />{siteConfig.heroKicker}</p>
        <h1 id="hero-title">
          {siteConfig.headlineLine1}<br />
          <span>{siteConfig.headlineLine2}</span>
        </h1>
        <p className="hero-intro">{siteConfig.introduction}</p>
      </div>
      <div className="hero-visual"><div className="hero-orb"><HandParticleHero /></div>
        <span className="orb-caption"><Cpu aria-hidden="true" />AI systems · connected ideas</span>
      </div>
    </div>
    <div className="hero-footer">
      <a href="#about" className="scroll-cue"><span className="scroll-line" />SCROLL TO EXPLORE</a>
      <p>{siteConfig.role}</p>
      <div className="hero-footer-actions">
        <a className="pill-link" data-hover-text={siteConfig.primaryCta.label} href={siteConfig.primaryCta.href}><span>{siteConfig.primaryCta.label}</span><ArrowDownRight aria-hidden="true" /></a>
        <a className="pill-link pill-link--quiet" data-hover-text={siteConfig.secondaryCta.label} href={siteConfig.secondaryCta.href}><span>{siteConfig.secondaryCta.label}</span><ArrowDownRight aria-hidden="true" /></a>
      </div>
    </div>
  </section>
);
