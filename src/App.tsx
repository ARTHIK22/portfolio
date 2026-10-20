import React, { useLayoutEffect, useRef } from 'react';
import { Analytics } from '@vercel/analytics/react';
import Lenis from 'lenis';
import Tempus from 'tempus';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { FeaturedProjects } from './components/FeaturedProjects';
import { Skills } from './components/Skills';
import { Resume } from './components/Resume';
import { Certifications } from './components/Certifications';
import { GitHubSection } from './components/GitHubSection';
import { CodingProfiles } from './components/CodingProfiles';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { StoryBreak } from './components/StoryBreak';

declare global { interface Window { __portfolioLenis?: Lenis } }

export const App: React.FC = () => {
  const appRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = appRef.current;
    if (!root) return;

    Tempus.patch();
    gsap.registerPlugin(ScrollTrigger);
    gsap.ticker.remove(gsap.updateRoot);
    gsap.ticker.lagSmoothing(0);

    const lenis = new Lenis({
      autoRaf: false,
      wheel: { lerp: 0.085, multiplier: 0.95 },
      programmatic: { duration: 1.05 },
      anchors: { offset: -72, duration: 1.05 },
      respectReducedMotion: true,
    });
    window.__portfolioLenis = lenis;

    // One shared frame loop keeps native scrolling, Lenis, GSAP, and ScrollTrigger in sync.
    const stopLenis = Tempus.add(({ time }) => lenis.raf(time), { order: -100, label: 'lenis' });
    const stopGsap = Tempus.add(({ time }) => gsap.updateRoot(time / 1000), { order: -25, label: 'gsap' });
    const siteHeader = root.querySelector<HTMLElement>('.site-header');
    const lightSections = Array.from(root.querySelectorAll<HTMLElement>('[data-nav-theme="light"]'));

    const applyHeaderTheme = () => {
      if (!siteHeader) return;
      siteHeader.dataset.scrolled = lenis.scroll > 6 ? 'true' : 'false';
      const headerBottom = siteHeader.getBoundingClientRect().bottom;
      const lightUnderHeader = lightSections.some((section) => {
        const rect = section.getBoundingClientRect();
        return rect.top <= headerBottom && rect.bottom > 0;
      });
      siteHeader.dataset.theme = lightUnderHeader ? 'light' : 'dark';
    };
    const syncScroll = () => {
      document.documentElement.style.setProperty('--scroll-progress', `${lenis.progress * 100}%`);
      applyHeaderTheme();
    };
    // Lenis emits after each scroll update; ScrollTrigger reads the same native scroll position.
    lenis.on('scroll', ScrollTrigger.update);
    lenis.on('scroll', syncScroll);

    const motionAllowed = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const context = gsap.context(() => {
      const projects = root.querySelector<HTMLElement>('#projects');
      const trackWindow = projects?.querySelector<HTMLElement>('.showcase-track-window');
      const projectTrack = projects?.querySelector<HTMLElement>('.showcase-track');
      if (motionAllowed && projects && trackWindow && projectTrack && window.matchMedia('(min-width: 761px)').matches) {
        gsap.to(projectTrack, {
          x: () => Math.min(0, trackWindow.clientWidth - projectTrack.scrollWidth),
          ease: 'none',
          scrollTrigger: {
            trigger: projects,
            start: 'top top',
            end: () => `+=${Math.max(window.innerHeight, projectTrack.scrollWidth - trackWindow.clientWidth)}`,
            scrub: 0.6,
            pin: projects.querySelector('.showcase-pin'),
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onRefresh: (self) => {
              projects.dataset.scrollStart = String(self.start);
              projects.dataset.scrollEnd = String(self.end);
            },
          },
        });
      }
    }, root);

    const refreshAfterAssets = () => { Promise.resolve().then(() => ScrollTrigger.refresh()); };
    const fontsReady = document.fonts?.ready.then(refreshAfterAssets).catch(() => undefined);
    const images = Array.from(root.querySelectorAll('img'));
    images.forEach((image) => {
      if (image.complete) return;
      image.addEventListener('load', refreshAfterAssets, { once: true });
      image.addEventListener('error', refreshAfterAssets, { once: true });
    });
    window.addEventListener('load', refreshAfterAssets, { once: true });

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('resize', refresh, { passive: true });
    window.addEventListener('pageshow', refreshAfterAssets);
    syncScroll();

    return () => {
      context.revert();
      lenis.off('scroll', ScrollTrigger.update);
      lenis.off('scroll', syncScroll);
      lenis.destroy();
      if (window.__portfolioLenis === lenis) delete window.__portfolioLenis;
      stopLenis?.();
      stopGsap?.();
      Tempus.unpatch();
      window.removeEventListener('resize', refresh);
      window.removeEventListener('load', refreshAfterAssets);
      window.removeEventListener('pageshow', refreshAfterAssets);
      images.forEach((image) => {
        image.removeEventListener('load', refreshAfterAssets);
        image.removeEventListener('error', refreshAfterAssets);
      });
      if (siteHeader) { delete siteHeader.dataset.theme; delete siteHeader.dataset.scrolled; }
      document.documentElement.style.removeProperty('--scroll-progress');
      void fontsReady;
    };
  }, []);

  return (
    <div ref={appRef} className="portfolio-shell relative min-h-screen flex flex-col font-sans">
      <Navbar />
      <main id="main-content" className="flex-1 relative z-10">
        <Hero /><About /><FeaturedProjects /><StoryBreak /><Skills /><Certifications /><GitHubSection /><CodingProfiles /><Resume /><Contact />
      </main>
      <Footer />
      <Analytics />
    </div>
  );
};

export default App;
