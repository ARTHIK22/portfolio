// src/components/Navbar.tsx
import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles, ArrowUpRight } from 'lucide-react';
import { siteConfig } from '../data/site.config';
import { useMotion } from '../context/MotionContext';

export const Navbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const { isMotionEnabled, toggleMotion } = useMotion();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sectionIds = ['hero', 'about', 'projects', 'skills', 'github', 'contact'];
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        { threshold: 0.25, rootMargin: '-10% 0px -40% 0px' }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  const navLinks = [
    { label: 'Home', href: '#hero', id: 'hero' },
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Projects', href: '#projects', id: 'projects' },
    { label: 'Skills', href: '#skills', id: 'skills' },
    { label: 'GitHub', href: '#github', id: 'github' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 py-4 md:py-6 transition-all duration-300 pointer-events-none">
      <nav
        aria-label="Main Navigation"
        className={`w-full max-w-6xl mx-auto flex items-center justify-between px-5 md:px-7 py-3 rounded-full transition-all duration-300 pointer-events-auto ${
          isScrolled
            ? 'glass-panel-elevated shadow-lg border-[#D6B574]/40 bg-white/90'
            : 'glass-panel border-[#D6B574]/30 bg-white/70'
        }`}
      >
        <a
          href="#hero"
          className="group flex items-center gap-2.5 text-sm md:text-base font-semibold tracking-wider text-[#263238] focus-visible:ring-2 focus-visible:ring-[#D6B574] rounded-full px-2 py-1"
          aria-label="Arthik Dwivedi - Home"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span
              className={`animate-ping absolute inline-flex h-full w-full rounded-full bg-[#82DAD1] opacity-75 ${
                !isMotionEnabled ? 'hidden' : ''
              }`}
            />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#D6B574]" />
          </span>
          <span className="font-medium tracking-tight text-[#263238] group-hover:text-[#B89246] transition-colors">
            ARTHIK DWIVEDI
          </span>
        </a>

        <div className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                className={`relative px-3.5 py-1.5 text-xs font-medium tracking-wide uppercase transition-all duration-200 rounded-full focus-visible:ring-2 focus-visible:ring-[#D6B574] ${
                  isActive
                    ? 'text-[#263238] font-semibold bg-[#D6B574]/20 border border-[#D6B574]/40 shadow-xs'
                    : 'text-[#5B646B] hover:text-[#263238] hover:bg-black/[0.03]'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={toggleMotion}
            type="button"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#5B646B] hover:text-[#263238] rounded-full border border-[#D6B574]/30 hover:border-[#D6B574]/60 bg-white/60 hover:bg-white transition-all shadow-xs"
            title={isMotionEnabled ? 'Disable decorative animations' : 'Enable animations'}
            aria-label={isMotionEnabled ? 'Disable animations' : 'Enable animations'}
          >
            <Sparkles className={`w-3.5 h-3.5 ${isMotionEnabled ? 'text-[#D6B574]' : 'text-gray-400'}`} />
            <span>Motion: {isMotionEnabled ? 'On' : 'Off'}</span>
          </button>

          <a
            href={siteConfig.profiles.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-3.5 py-1.5 text-xs font-semibold text-[#263238] bg-[#D6B574]/25 hover:bg-[#D6B574]/40 border border-[#D6B574]/50 rounded-full transition-all shadow-xs group"
          >
            <span>GitHub</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#263238] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={toggleMotion}
            type="button"
            className="p-2 text-[#5B646B] hover:text-[#263238] rounded-full border border-[#D6B574]/30 bg-white/60"
            aria-label={isMotionEnabled ? 'Disable animations' : 'Enable animations'}
          >
            <Sparkles className={`w-4 h-4 ${isMotionEnabled ? 'text-[#D6B574]' : 'text-gray-400'}`} />
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            type="button"
            className="p-2 text-[#263238] rounded-full border border-[#D6B574]/40 bg-white/80 focus-visible:ring-2 focus-visible:ring-[#D6B574]"
            aria-label={isMobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
          className="md:hidden fixed top-20 left-4 right-4 glass-panel-elevated p-6 rounded-3xl shadow-2xl border border-[#D6B574]/40 bg-white/95 backdrop-blur-2xl pointer-events-auto transition-all animate-fadeIn"
        >
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between pb-3 border-b border-[#D6B574]/20">
              <span className="text-xs font-bold uppercase tracking-wider text-[#D6B574]">Navigation</span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1 rounded-full text-gray-500 hover:text-gray-800"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  activeSection === link.id
                    ? 'bg-[#D6B574]/20 text-[#263238] font-bold border border-[#D6B574]/40'
                    : 'text-[#5B646B] hover:text-[#263238] hover:bg-black/[0.03]'
                }`}
              >
                <span>{link.label}</span>
                {activeSection === link.id && <span className="w-2 h-2 rounded-full bg-[#D6B574]" />}
              </a>
            ))}

            <div className="pt-3 border-t border-[#D6B574]/20 flex flex-col gap-2">
              <a
                href={siteConfig.profiles.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 py-3 text-sm font-semibold text-center text-[#263238] bg-[#D6B574]/30 rounded-xl border border-[#D6B574]/50"
              >
                <span>View GitHub Profile</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
