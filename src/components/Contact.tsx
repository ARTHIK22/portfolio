// src/components/Contact.tsx
import React from 'react';
import { ArrowUpRight, Mail, MessageSquare } from 'lucide-react';
import { siteConfig } from '../data/site.config';
import { GithubIcon, LinkedinIcon } from './icons/BrandIcons';

export const Contact: React.FC = () => {
  return (
    <section
      id="contact"
      className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto relative"
      aria-labelledby="contact-heading"
    >
      <div
        className="absolute inset-0 rounded-full blur-[110px] pointer-events-none -z-10"
        style={{
          background:
            'radial-gradient(circle, rgba(130,218,209,0.2) 0%, rgba(214,181,116,0.18) 50%, rgba(248,247,242,0) 75%)',
        }}
      />

      <div className="glass-panel-elevated p-8 sm:p-14 rounded-3xl border border-[#D6B574]/40 bg-white/90 shadow-2xl text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#D6B574]/20 via-[#82DAD1]/10 to-transparent rounded-bl-full pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#D6B574]/35 shadow-xs mb-4">
          <MessageSquare className="w-3.5 h-3.5 text-[#B89246]" />
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#5B646B]">
            Initiate Conversation
          </span>
        </div>

        <h2
          id="contact-heading"
          className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#263238] tracking-tight leading-tight max-w-2xl mx-auto mb-4"
        >
          Let's Build Something Meaningful
        </h2>

        <p className="text-base sm:text-lg text-[#5B646B] max-w-xl mx-auto leading-relaxed mb-10">
          Interested in AI, machine learning, and building practical technology solutions? Let's connect.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href={siteConfig.profiles.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold text-white bg-[#0A66C2] hover:bg-[#084e96] transition-all shadow-md hover:scale-105 group"
          >
            <LinkedinIcon className="w-4 h-4 fill-white" />
            <span>Connect on LinkedIn</span>
            <ArrowUpRight className="w-4 h-4 text-white/80 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>

          <a
            href={siteConfig.profiles.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold text-[#263238] bg-white hover:bg-[#FFFDF8] border border-[#D6B574]/50 hover:border-[#D6B574] transition-all shadow-xs hover:scale-105 group"
          >
            <GithubIcon className="w-4 h-4 fill-[#263238]" />
            <span>Explore Repositories</span>
            <ArrowUpRight className="w-4 h-4 text-[#B89246] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>

          <a
            href={`mailto:${siteConfig.profiles.email}`}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold text-[#263238] bg-white hover:bg-[#FFFDF8] border border-[#D6B574]/50 hover:border-[#D6B574] transition-all shadow-xs hover:scale-105 group"
          >
            <Mail className="w-4 h-4 text-[#B89246]" />
            <span>Email Me</span>
          </a>
        </div>

        <div className="mt-10 pt-6 border-t border-[#D6B574]/20 text-xs text-[#5B646B]">
          <span>Open to internships, research collaborations, and impactful AI/ML projects.</span>
        </div>
      </div>
    </section>
  );
};
