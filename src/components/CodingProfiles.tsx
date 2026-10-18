// src/components/CodingProfiles.tsx
import React, { useRef } from 'react';
import { ArrowUpRight, Share2 } from 'lucide-react';
import { developerProfiles } from '../data/profiles';
import { useScrollReveal } from '../lib/useScrollReveal';

export const CodingProfiles: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef);

  return (
    <section
      id="profiles"
      data-nav-theme="light"
      ref={sectionRef}
      className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative"
      aria-labelledby="profiles-heading"
    >
      <div className="max-w-2xl mb-12" data-scroll-reveal>
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-[#D6B574]/35 shadow-xs mb-3">
          <Share2 className="w-3.5 h-3.5 text-[#B89246]" />
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#5B646B]">
            Ecosystem Handles
          </span>
        </div>
        <h2
          id="profiles-heading"
          className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#263238] tracking-tight leading-tight"
        >
          Find Me Across the Developer Community
        </h2>
        <p className="mt-3 text-sm sm:text-base text-[#5B646B] leading-relaxed">
          Active coding platforms, problem-solving handles, and professional networks.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {developerProfiles.map((p) => (
          <a
            key={p.id}
            data-scroll-reveal
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className="pearl-card rounded-2xl p-6 flex flex-col justify-between group transition-all"
            aria-label={`Visit ${p.platform} profile: ${p.handle}`}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white border border-[#D6B574]/30 shadow-xs flex items-center justify-center group-hover:scale-105 transition-transform">
                    {p.id === 'github' && (
                      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#263238]">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                      </svg>
                    )}
                    {p.id === 'linkedin' && (
                      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#0A66C2]">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    )}
                    {p.id === 'leetcode' && (
                      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#FFA116]">
                        <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .271 4.735 5.765 5.765 0 0 0 4.26 2.732 5.86 5.86 0 0 0 4.965-1.74l3.854-4.127 5.405-5.788a1.373 1.373 0 0 0-.96-2.327l-5.405.002-1.239.001zm-3.047 8.874a1.442 1.442 0 0 1 2.039.034 1.442 1.442 0 0 1-.034 2.039l-3.854 4.126a2.88 2.88 0 0 1-2.438.855 2.827 2.827 0 0 1-2.091-1.341 2.709 2.709 0 0 1-.132-2.321 2.58 2.58 0 0 1 .593-1.03l3.854-4.126 2.063-2.236z" />
                      </svg>
                    )}
                    {p.id === 'hackerrank' && (
                      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#00EA64]">
                        <path d="M12 0a12 12 0 1 0 12 12A12.013 12.013 0 0 0 12 0zm3.87 16.5h-1.52v-3.79H9.65v3.79H8.13V7.5h1.52v3.83h4.7V7.5h1.52z" />
                      </svg>
                    )}
                    {p.id === 'geeksforgeeks' && (
                      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#2F8D46]">
                        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm4.27 16.5c-1.32 0-2.3-.54-2.94-1.62-.64 1.08-1.62 1.62-2.94 1.62-1.92 0-3.39-1.47-3.39-3.39 0-1.92 1.47-3.39 3.39-3.39 1.32 0 2.3.54 2.94 1.62.64-1.08 1.62-1.62 2.94-1.62 1.92 0 3.39 1.47 3.39 3.39 0 1.92-1.47 3.39-3.39 3.39z" />
                      </svg>
                    )}
                    {p.id === 'instagram' && (
                      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#E4405F]">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <h3 className="text-sm font-serif font-bold text-[#263238] group-hover:text-[#B89246] transition-colors">
                      {p.platform}
                    </h3>
                    <span className="text-xs font-mono text-[#5B646B]">{p.handle}</span>
                  </div>
                </div>

                <ArrowUpRight className="w-4 h-4 text-[#5B646B] group-hover:text-[#263238] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>

              <p className="text-xs text-[#5B646B] leading-relaxed mb-4">
                {p.description}
              </p>
            </div>

            <div className="pt-3 border-t border-black/[0.04] flex items-center justify-between text-[11px] text-[#5B646B] font-mono">
              <span>View Profile</span>
              <span className="text-[#D6B574]">↗</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};
