import React, { useEffect, useRef } from 'react';
import { ArrowUpRight, BrainCircuit, Database, PanelsTopLeft } from 'lucide-react';

export const StoryBreak: React.FC = () => {
  const workflowRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = workflowRef.current;
    if (!section || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        section.classList.add('is-visible');
        observer.disconnect();
      }
    }, { threshold: 0.2 });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section id="statement" className="statement-section" aria-labelledby="statement-heading">
        <p className="eyebrow">A QUESTION, THEN A BUILD</p>
        <h2 id="statement-heading"><span>Make the model</span><em>meet the real world.</em></h2>
        <span className="statement-mark" aria-hidden="true">AD</span>
      </section>

      <section
        id="light-story"
        ref={workflowRef}
        data-nav-theme="light"
        className="light-story"
        aria-labelledby="light-story-heading"
      >
        <div className="light-story-inner">
          <div className="light-story-copy">
            <div className="light-story-meta">
              <p className="eyebrow">FIELD NOTE · APPLIED AI</p>
              <span>02 / 08</span>
            </div>
            <h2 id="light-story-heading"><span>A model is only</span><em>one part of the work.</em></h2>
            <p>Useful AI reaches beyond the model. I enjoy preparing the data, shaping the API, and building the interface that makes a result useful to people.</p>
            <a className="text-link" href="#projects"><span>Explore the projects</span><ArrowUpRight aria-hidden="true" /></a>
          </div>

          <div className="workflow-visual" role="group" aria-labelledby="workflow-heading">
            <div className="workflow-heading-row">
              <div>
                <p className="eyebrow">FROM QUESTION TO TOOL</p>
                <h3 id="workflow-heading">The work around the model</h3>
              </div>
              <span className="workflow-count">01 — 03</span>
            </div>
            <ol className="workflow-steps">
              <li className="workflow-step">
                <span className="workflow-step-index">01 · INPUT</span>
                <span className="workflow-step-icon"><Database aria-hidden="true" /></span>
                <h4>Data</h4>
                <p>Clean and structure</p>
              </li>
              <li className="workflow-step">
                <span className="workflow-step-index">02 · PROCESS</span>
                <span className="workflow-step-icon"><BrainCircuit aria-hidden="true" /></span>
                <h4>Model</h4>
                <p>Train and evaluate</p>
              </li>
              <li className="workflow-step">
                <span className="workflow-step-index">03 · OUTPUT</span>
                <span className="workflow-step-icon"><PanelsTopLeft aria-hidden="true" /></span>
                <h4>Product</h4>
                <p>Build for people</p>
              </li>
            </ol>
            <div className="workflow-footer">
              <span><i aria-hidden="true" />A connected process</span>
              <span>DATA → MODEL → PRODUCT</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
