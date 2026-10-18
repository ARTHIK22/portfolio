import { useEffect, type RefObject } from 'react';
/** Reversible, scroll-position reveals. Content stays visible without JavaScript. */
export function useScrollReveal(sectionRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const targets = Array.from(section.querySelectorAll<HTMLElement>('[data-scroll-reveal]'));
    if (!targets.length || window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      targets.forEach((target) => target.classList.add('is-visible'));
      return;
    }
    section.classList.add('reveal-pending');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const target = entry.target as HTMLElement;
        const index = targets.indexOf(target);
        target.style.transitionDelay = `${Math.min(index, 7) * 65}ms`;
        target.classList.toggle('is-visible', entry.isIntersecting);
      });
    }, { threshold: 0.08 });

    targets.forEach((target) => observer.observe(target));
    return () => {
      observer.disconnect();
      section.classList.remove('reveal-pending');
      targets.forEach((target) => { target.style.transitionDelay = ''; });
    };
  }, [sectionRef]);
}
