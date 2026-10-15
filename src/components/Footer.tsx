// src/components/Footer.tsx
import React from 'react';
import { ArrowUp } from 'lucide-react';
import { siteConfig } from '../data/site.config';
import { GithubIcon, LinkedinIcon, InstagramIcon } from './icons/BrandIcons';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-[#D6B574]/25 bg-white/70 backdrop-blur-md relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center justify-between">
          <div className="md:col-span-5">
            <a
              href="#hero"
              className="text-lg font-serif font-bold tracking-tight text-[#263238] hover:text-[#B89246] transition-colors"
            >
              ARTHIK DWIVEDI
            </a>
            <p className="mt-2 text-xs sm:text-sm text-[#5B646B] max-w-sm leading-relaxed">
              Engineering intelligence with mathematical foundations, applied machine learning,
              and verifiable software systems.
            </p>
          </div>

          <div className="md:col-span-4 flex flex-wrap gap-x-6 gap-y-2 text-xs font-semibold uppercase tracking-wider text-[#5B646B]">
            <a href="#about" className="hover:text-[#263238] transition-colors">
              About
            </a>
            <a href="#projects" className="hover:text-[#263238] transition-colors">
              Projects
            </a>
            <a href="#skills" className="hover:text-[#263238] transition-colors">
              Skills
            </a>
            <a href="#github" className="hover:text-[#263238] transition-colors">
              GitHub
            </a>
            <a href="#contact" className="hover:text-[#263238] transition-colors">
              Contact
            </a>
          </div>

          <div className="md:col-span-3 flex items-center md:justify-end">
            <button
              onClick={scrollToTop}
              type="button"
              className="p-2 rounded-full text-[#5B646B] hover:text-[#263238] bg-white hover:bg-[#FFFDF8] border border-[#D6B574]/30 shadow-xs transition-all"
              title="Scroll back to top"
              aria-label="Scroll back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-black/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#5B646B]">
          <p>© {currentYear} Arthik Dwivedi. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a
              href={siteConfig.profiles.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#263238] transition-colors"
              aria-label="GitHub Profile"
            >
              <GithubIcon className="w-4 h-4 fill-current" />
            </a>
            <a
              href={siteConfig.profiles.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#263238] transition-colors"
              aria-label="LinkedIn Profile"
            >
              <LinkedinIcon className="w-4 h-4 fill-current" />
            </a>
            <a
              href={siteConfig.profiles.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#263238] transition-colors"
              aria-label="Instagram Profile"
            >
              <InstagramIcon className="w-4 h-4 fill-current" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
