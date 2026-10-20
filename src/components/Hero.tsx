import React from 'react';
import { ArrowDownRight, ArrowUpRight, Compass, Cpu, Layers3 } from 'lucide-react';
import { siteConfig } from '../data/site.config';
import { NeuralNetworkOrb } from './HandParticleHero';

export const Hero: React.FC = () => (
  <section id="hero" className="hero-section" aria-labelledby="hero-title">
    <div className="hero-stage">
      <div className="hero-copy">
        <p className="hero-kicker"><Compass aria-hidden="true" />{siteConfig.heroKicker}</p>
        <h1 id="hero-title">
          <span>{siteConfig.headlineLine1}</span>
          <em>{siteConfig.headlineLine2}</em>
        </h1>
        <p className="hero-intro">{siteConfig.introduction}</p>
        <div className="hero-actions">
          <a className="pill-link" href={siteConfig.primaryCta.href}>
            <span>{siteConfig.primaryCta.label}</span><ArrowDownRight aria-hidden="true" />
          </a>
          <a className="pill-link pill-link--quiet" href={siteConfig.secondaryCta.href}>
            <span>{siteConfig.secondaryCta.label}</span><ArrowUpRight aria-hidden="true" />
          </a>
        </div>
      </div>
      <div className="hero-visual">
        <div className="hero-orb"><NeuralNetworkOrb /></div>
        <aside className="orb-panel orb-panel--pipeline" aria-label="Illustrative model pipeline: data, train, validate, deploy">
          <div className="orb-panel-heading"><Layers3 aria-hidden="true" /><span>MODEL PIPELINE</span><small>FLOW</small></div>
          <ol className="pipeline-stages">
            <li>Data</li><li>Train</li><li>Validate</li><li>Deploy</li>
          </ol>
          <p>From structured data to a useful tool.</p>
        </aside>
        <aside className="orb-panel orb-panel--topology" aria-label="A conceptual graph showing connected data relationships">
          <div className="orb-panel-heading"><span className="topology-mark" aria-hidden="true">✳</span><span>GRAPH TOPOLOGY</span></div>
          <svg viewBox="0 0 116 54" aria-hidden="true">
            <path d="M12 28 34 12 53 29 77 9 103 27M34 12l3 31 16-14 26 20 24-22M53 29l26-20" />
            <g><circle cx="12" cy="28" r="3"/><circle cx="34" cy="12" r="3"/><circle cx="53" cy="29" r="4"/><circle cx="77" cy="9" r="3"/><circle cx="103" cy="27" r="3"/><circle cx="37" cy="43" r="3"/><circle cx="79" cy="50" r="3"/></g>
          </svg>
          <p>Relationships, represented as a connected system.</p>
        </aside>
        <span className="orb-caption"><Cpu aria-hidden="true" />Models · data · software</span>
        <div className="orb-data-rail" aria-hidden="true"><span>DATA</span><i /> <span>MODEL</span><i /> <strong>INTELLIGENCE</strong><i /> <span>IMPACT</span></div>
      </div>
    </div>
    <div className="hero-footer">
      <a href="#about" className="scroll-cue"><span className="scroll-line" />SCROLL TO EXPLORE</a>
      <p>{siteConfig.role}</p>
      <span className="hero-index">01 / 08</span>
    </div>
  </section>
);
