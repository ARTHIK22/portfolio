import React, { useRef } from 'react';
import { Download, ExternalLink, FileText } from 'lucide-react';
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
    className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 md:py-24"
    aria-labelledby="resume-heading"
  >
    <div className="mb-8 max-w-3xl sm:mb-10" data-scroll-reveal>
      <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#D6B574]/35 bg-white/80 px-3.5 py-1.5 shadow-xs">
        <FileText className="h-3.5 w-3.5 text-[#B89246]" aria-hidden="true" />
        <span className="text-[11px] font-bold uppercase tracking-widest text-[#5B646B]">
          Resume
        </span>
      </div>
      <h2
        id="resume-heading"
        className="text-3xl font-serif leading-tight tracking-tight text-[#263238] sm:text-4xl md:text-5xl"
      >
        My <span className="champagne-gradient-text">Resume</span>
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-[#5B646B] sm:text-base">
        Explore my technical journey, experience, projects, and skills.
      </p>
    </div>

    <article data-scroll-reveal className="pearl-card flex min-w-0 flex-col gap-5 rounded-3xl p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
      <div className="flex min-w-0 items-center gap-4">
        <div
          role="img"
          aria-label="PDF document icon for Arthik Dwivedi’s resume"
          className="grid h-16 w-14 shrink-0 place-items-center rounded-2xl border border-[#D6B574]/35 bg-gradient-to-br from-[#FFFDF8] via-white to-[#DCD7F5]/30 shadow-xs"
        >
          <FileText className="h-8 w-8 text-[#B89246]" strokeWidth={1.6} aria-hidden="true" />
        </div>
        <div className="min-w-0">
          <h3 className="break-words text-base font-serif font-bold leading-snug text-[#263238] sm:text-lg">
            Arthik Dwivedi — Resume
          </h3>
          <p className="mt-1 text-xs font-medium uppercase tracking-wider text-[#5B646B]">
            PDF document
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2 sm:w-auto sm:min-w-[17rem] sm:flex-row">
        <a
          href={resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View Arthik Dwivedi’s resume PDF in a new tab"
          className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-full border border-[#D6B574]/50 bg-[#D6B574]/20 px-4 py-3 text-xs font-semibold text-[#263238] transition-colors hover:bg-[#D6B574]/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D6B574] focus-visible:ring-offset-2"
        >
          <span>View Resume</span>
          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
        <a
          href={resumeUrl}
          download="Arthik_Dwivedi_Resume.pdf"
          aria-label="Download Arthik Dwivedi’s resume as a PDF"
          className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-full border border-[#D6B574]/25 bg-white px-4 py-3 text-xs font-semibold text-[#5B646B] transition-colors hover:border-[#D6B574]/60 hover:text-[#263238] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D6B574] focus-visible:ring-offset-2"
        >
          <Download className="h-3.5 w-3.5" aria-hidden="true" />
          <span>Download Resume</span>
        </a>
      </div>
    </article>
  </section>
  );
};
