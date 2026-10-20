import React, { useRef } from 'react';
import { ArrowDownRight, ArrowUpRight, Mail } from 'lucide-react';
import { siteConfig } from '../data/site.config';
import { developerProfiles } from '../data/profiles';
import { GithubIcon, LinkedinIcon } from './icons/BrandIcons';
import { useScrollReveal } from '../lib/useScrollReveal';

const resumeUrl = `${import.meta.env.BASE_URL}documents/Arthik_Dwivedi_Resume.pdf`;

export const Contact: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef);

  return (
    <section id="contact" data-nav-theme="light" ref={sectionRef} className="contact-section" aria-labelledby="contact-heading">
      <div className="contact-inner">
        <div className="contact-topline" data-scroll-reveal>
          <p className="eyebrow">OPEN CHANNEL</p>
          <h2 id="contact-heading"><span>Have a question?</span><em>Let's talk.</em></h2>
        </div>
        <div className="contact-closer" data-scroll-reveal>
          <p>For project questions, collaboration, or a quick hello, send me an email.</p>
          <a className="contact-primary-pill" data-hover-text="Start a conversation" href={`mailto:${siteConfig.profiles.email}`}>
            <span>Start a conversation</span><ArrowDownRight aria-hidden="true" />
          </a>
        </div>
        <nav className="contact-actions" aria-label="Contact and resume links">
          <a data-hover-text="LinkedIn" href={siteConfig.profiles.linkedin} target="_blank" rel="noopener noreferrer"><LinkedinIcon aria-hidden="true" /><span>LinkedIn</span><ArrowUpRight aria-hidden="true" /></a>
          <a data-hover-text="Email" href={`mailto:${siteConfig.profiles.email}`}><Mail aria-hidden="true" /><span>Email</span><ArrowUpRight aria-hidden="true" /></a>
          <a data-hover-text="Repositories" href={siteConfig.profiles.github} target="_blank" rel="noopener noreferrer"><GithubIcon aria-hidden="true" /><span>Repositories</span><ArrowUpRight aria-hidden="true" /></a>
          <a data-hover-text="View Resume" href={resumeUrl} target="_blank" rel="noopener noreferrer"><span>View Resume</span><ArrowUpRight aria-hidden="true" /></a>
          <a data-hover-text="Download Resume" href={resumeUrl} download="Arthik_Dwivedi_Resume.pdf"><span>Download Resume</span><ArrowDownRight aria-hidden="true" /></a>
        </nav>
        <div className="contact-footer-row">
          <span>CONTACT</span>
          <div>{developerProfiles.filter((profile) => ['github', 'linkedin'].includes(profile.id)).map((profile) => <a key={profile.id} href={profile.url} target="_blank" rel="noopener noreferrer">{profile.platform}<ArrowUpRight aria-hidden="true" /></a>)}</div>
          <a href={`mailto:${siteConfig.profiles.email}`}>{siteConfig.profiles.email}</a>
        </div>
      </div>
    </section>
  );
};
