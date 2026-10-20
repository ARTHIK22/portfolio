import React, { useRef } from 'react';
import { Download, ExternalLink } from 'lucide-react';
import { useScrollReveal } from '../lib/useScrollReveal';

const resumePath = '/documents/Arthik_Dwivedi_Resume.pdf';
const resumeUrl = `${import.meta.env.BASE_URL}${resumePath
  .split('/')
  .filter(Boolean)
  .map(encodeURIComponent)
  .join('/')}`;

export const Resume: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef);

  return (
    <section
      id="resume"
      data-nav-theme="light"
      ref={sectionRef}
      aria-labelledby="resume-heading"
    >
      <div data-scroll-reveal>
        <p className="eyebrow">Resume</p>
        <h2 id="resume-heading">My&nbsp;Resume</h2>
        <p>A concise overview of my education, projects, and technical work.</p>
      </div>

      <article data-scroll-reveal>
        <div className="resume-file-icon" aria-hidden="true">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
            <polyline points="10 9 9 9 8 9"/>
          </svg>
        </div>
        <div className="resume-file-meta">
          <h3>Arthik Dwivedi — Resume</h3>
          <p>PDF · Arthik Dwivedi</p>
        </div>
        <div className="resume-actions">
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View Arthik Dwivedi's resume PDF in a new tab"
            data-hover-text="View Resume"
          >
            <ExternalLink aria-hidden="true" />
            <span>View Resume</span>
          </a>
          <a
            href={resumeUrl}
            download="Arthik_Dwivedi_Resume.pdf"
            aria-label="Download Arthik Dwivedi's resume as a PDF"
            data-hover-text="Download"
          >
            <Download aria-hidden="true" />
            <span>Download</span>
          </a>
        </div>
      </article>
    </section>
  );
};
