import React from 'react';
import { ArrowUp } from 'lucide-react';
import { siteConfig } from '../data/site.config';
import { developerProfiles } from '../data/profiles';

export const Footer: React.FC = () => (
  <footer className="site-footer">
    <div className="footer-top">
      <a className="footer-wordmark" href="#hero">Arthik Dwivedi</a>
      <nav className="footer-nav" aria-label="Footer navigation">
        <a href="#projects">Projects</a><a href="#skills">Skills</a><a href="#certifications">Certificates</a><a href="#resume">Resume</a><a href="#contact">Contact</a>
      </nav>
      <a href="#hero" className="back-to-top" aria-label="Back to top"><ArrowUp aria-hidden="true" /></a>
    </div>
    <div className="footer-bottom">
      <p>© {new Date().getFullYear()} Arthik Dwivedi</p>
      <div className="footer-socials">
        {developerProfiles.map((profile) => <a key={profile.id} href={profile.url} target="_blank" rel="noopener noreferrer">{profile.platform}</a>)}
        <a href={`mailto:${siteConfig.profiles.email}`}>Email</a>
      </div>
      <span className="build-stamp" aria-label={`Build ${import.meta.env.VITE_BUILD_ID || 'development'}`}>
        Build <code>{import.meta.env.VITE_BUILD_ID || 'development'}</code>
      </span>
    </div>
  </footer>
);
