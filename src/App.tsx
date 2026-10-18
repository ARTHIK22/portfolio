// src/App.tsx
import React, { useEffect } from 'react';
import Lenis from 'lenis';
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

export const App: React.FC = () => {
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.085,
      wheelMultiplier: 0.95,
      anchors: { offset: -72, duration: 1.05 },
      respectReducedMotion: true,
      prevent: (node) => node.closest('[data-lenis-prevent]') !== null,
    });
    const projectSection = document.getElementById('projects');
    const projectTrack = projectSection?.querySelector<HTMLElement>('.showcase-track');
    const storySection = document.querySelector<HTMLElement>('.light-story');
    const heroSection = document.getElementById('hero');
    const siteHeader = document.querySelector<HTMLElement>('.site-header');
    const lightSections = Array.from(document.querySelectorAll<HTMLElement>('[data-nav-theme="light"]'));
    const activeLightSections = new Set<Element>();
    const applyHeaderTheme = () => {
      if (!siteHeader) return;
      const sectionLight = [...activeLightSections].some((section) => section !== storySection);
      const storyRect = storySection?.getBoundingClientRect();
      const storyClip = Number.parseFloat(storySection?.style.getPropertyValue('--light-clip') || '50');
      const storyHasReachedHeader = Boolean(storyRect && storyRect.top + storyRect.height * storyClip / 100 <= 0 && storyRect.bottom > 0);
      siteHeader.dataset.theme = sectionLight || storyHasReachedHeader ? 'light' : 'dark';
    };
    const themeObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.target === storySection) return;
        if (entry.isIntersecting) activeLightSections.add(entry.target);
        else activeLightSections.delete(entry.target);
      });
      applyHeaderTheme();
    }, { rootMargin: '0px 0px -78% 0px', threshold: 0 });
    lightSections.forEach((section) => themeObserver.observe(section));
    const cursorEnabled = window.matchMedia('(pointer: fine)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const onPointerMove = (event: PointerEvent) => {
      if (!cursorEnabled || event.pointerType !== 'mouse') return;
      document.documentElement.style.setProperty('--cursor-x', `${event.clientX}px`);
      document.documentElement.style.setProperty('--cursor-y', `${event.clientY}px`);
      const heroRect = heroSection?.getBoundingClientRect();
      if (heroRect && heroRect.width && heroRect.height) {
        heroSection?.style.setProperty('--hero-mouse-x', String((event.clientX - heroRect.left) / heroRect.width - 0.5));
        heroSection?.style.setProperty('--hero-mouse-y', String((event.clientY - heroRect.top) / heroRect.height - 0.5));
      }
      document.documentElement.dataset.cursorActive = 'true';
      if (event.target instanceof Element && event.target.closest('a, button')) document.documentElement.dataset.cursorHover = 'true';
      else delete document.documentElement.dataset.cursorHover;
    };
    const onPointerLeave = () => { delete document.documentElement.dataset.cursorActive; };
    if (cursorEnabled) {
      window.addEventListener('pointermove', onPointerMove, { passive: true });
      window.addEventListener('blur', onPointerLeave);
    }
    let projectStart = 0;
    let projectTravel = 1;
    let projectDistance = 0;
    let storyStart = 0;
    let storyTravel = 1;
    const updateGeometry = () => {
      projectStart = (projectSection?.getBoundingClientRect().top ?? 0) + window.scrollY;
      projectTravel = Math.max(1, (projectSection?.offsetHeight ?? 1) - window.innerHeight);
      projectDistance = Math.max(0, (projectTrack?.scrollWidth ?? 0) - window.innerWidth);
      storyStart = (storySection?.getBoundingClientRect().top ?? 0) + window.scrollY;
      storyTravel = Math.max(1, (storySection?.offsetHeight ?? window.innerHeight) - window.innerHeight);
    };
    updateGeometry();
    const resizeObserver = new ResizeObserver(updateGeometry);
    if (projectSection) resizeObserver.observe(projectSection);
    if (projectTrack) resizeObserver.observe(projectTrack);
    if (storySection) resizeObserver.observe(storySection);
    window.addEventListener('resize', updateGeometry, { passive: true });

    const syncScrollProgress = (instance: Lenis) => {
      document.documentElement.style.setProperty('--scroll-progress', `${instance.progress * 100}%`);
      const velocity = Math.min(1, Math.abs(instance.velocity) / 45);
      document.documentElement.style.setProperty('--marquee-duration', `${24 - velocity * 15}s`);
      const heroProgress = Math.min(1, Math.max(0, instance.animatedScroll / Math.max(window.innerHeight, 1)));
      document.documentElement.style.setProperty('--hero-progress', String(heroProgress));
      const projectProgress = Math.min(1, Math.max(0, (instance.animatedScroll - projectStart) / projectTravel));
      projectSection?.style.setProperty('--project-progress', String(projectProgress));
      projectSection?.style.setProperty('--project-x', `${-projectDistance * projectProgress}px`);
      const storyProgress = Math.min(1, Math.max(0, (instance.animatedScroll - storyStart) / storyTravel));
      storySection?.style.setProperty('--light-clip', `${50 * (1 - storyProgress)}%`);
      storySection?.style.setProperty('--hand-angle', `${storyProgress * 18 - 9}deg`);
      applyHeaderTheme();
    };
    lenis.on('scroll', syncScrollProgress);

    return () => {
      themeObserver.disconnect();
      if (siteHeader) delete siteHeader.dataset.theme;
      lenis.off('scroll', syncScrollProgress);
      lenis.destroy();
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateGeometry);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('blur', onPointerLeave);
      delete document.documentElement.dataset.cursorActive;
      delete document.documentElement.dataset.cursorHover;
      document.documentElement.style.removeProperty('--scroll-progress');
      document.documentElement.style.removeProperty('--hero-progress');
      document.documentElement.style.removeProperty('--marquee-duration');
      projectSection?.style.removeProperty('--project-progress');
      projectSection?.style.removeProperty('--project-x');
      storySection?.style.removeProperty('--light-clip');
      storySection?.style.removeProperty('--hand-angle');
      heroSection?.style.removeProperty('--hero-mouse-x');
      heroSection?.style.removeProperty('--hero-mouse-y');
    };
  }, []);

  return (
    <div className="portfolio-shell relative min-h-screen flex flex-col font-sans">
      <Navbar />

      {/* Main Content Landmarks */}
      <main id="main-content" className="flex-1 relative z-10">
        <Hero />
        <About />
        <FeaturedProjects />
        <StoryBreak />
        <Skills />
        <Certifications />
        <GitHubSection />
        <CodingProfiles />
        <Resume />
        <Contact />
      </main>

      {/* Editorial Footer */}
      <Footer />
      <span className="cursor-ring" aria-hidden="true" />
    </div>
  );
};

export default App;
