// src/components/About.tsx
import React, { useRef, useEffect } from 'react';
import { BookOpen, FlaskConical, Hammer } from 'lucide-react';
import { animate, stagger } from '../lib/motion';

export const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const bioRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate photo frame in
            if (photoRef.current) {
              animate(photoRef.current, {
                opacity: [0, 1],
                translateY: [30, 0],
                scale: [0.95, 1],
                duration: 900,
                ease: 'outQuart',
              });
            }

            // Animate bio panel in (slight delay)
            if (bioRef.current) {
              animate(bioRef.current, {
                opacity: [0, 1],
                translateY: [20, 0],
                duration: 800,
                delay: 150,
                ease: 'outQuart',
              });
            }

            // Animate principle cards
            if (cardsRef.current) {
              const children = cardsRef.current.children;
              animate(children, {
                opacity: [0, 1],
                translateY: [24, 0],
                delay: stagger(120),
                duration: 750,
                ease: 'outQuart',
              });
            }

            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const principles = [
    {
      title: 'Learning',
      subtitle: 'Continuous Foundational Depth',
      icon: BookOpen,
      iconColor: '#B89246',
      badgeBg: 'bg-[#D6B574]/20',
      description:
        'Engaged in computer science engineering with a specialization in AI/ML. Deepening mathematical foundations across linear algebra, calculus, and algorithms while following modern ML advancements.',
    },
    {
      title: 'Experimenting',
      subtitle: 'Empirical Prototyping',
      icon: FlaskConical,
      iconColor: '#368F83',
      badgeBg: 'bg-[#82DAD1]/20',
      description:
        'Testing ideas through reproducible code. From evaluating multi-tier dependency risk to clustering student behaviors and calibrating confidence scores in clinical agent pipelines.',
    },
    {
      title: 'Building',
      subtitle: 'Systems With Measurable Utility',
      icon: Hammer,
      iconColor: '#9C623C',
      badgeBg: 'bg-[#F2BFA7]/25',
      description:
        'Translating complex research into robust applications with clean FastAPI backends, typed React frontends, verifiable database migrations, and production cloud deployments.',
    },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative"
      aria-labelledby="about-heading"
    >
      {/* Ambient glow */}
      <div
        className="absolute top-1/2 -left-20 w-80 h-80 rounded-full blur-[100px] pointer-events-none -z-10"
        style={{
          background: 'radial-gradient(circle, rgba(200,233,215,0.2) 0%, rgba(214,181,116,0.15) 60%, transparent 80%)',
        }}
      />

      {/* Section Label */}
      <div className="mb-12 flex items-center gap-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/70 border border-[#D6B574]/30 shadow-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D6B574]" />
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#5B646B]">
            Philosophy &amp; Focus
          </span>
        </div>
        <div className="flex-1 h-px bg-gradient-to-r from-[#D6B574]/25 to-transparent" />
      </div>

      {/* MAIN PROFILE ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 mb-16 items-start">

        {/* PROFILE PHOTO COLUMN */}
        <div className="lg:col-span-4 flex justify-center lg:justify-start">
          <div
            ref={photoRef}
            className="relative group"
            style={{ opacity: 0 }}
          >
            {/* Outer glow ring */}
            <div
              className="absolute inset-0 rounded-[28px] blur-[18px] opacity-60 group-hover:opacity-80 transition-opacity duration-700 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(130,218,209,0.45) 0%, rgba(214,181,116,0.35) 60%, transparent 80%)',
                transform: 'scale(1.08)',
              }}
            />

            {/* Photo frame */}
            <div
              className="relative rounded-[26px] overflow-hidden shadow-xl"
              style={{
                padding: '3px',
                background: 'linear-gradient(135deg, #D6B574 0%, #F0D9A0 30%, #82DAD1 60%, #B89246 100%)',
              }}
            >
              <div className="relative rounded-[23px] overflow-hidden bg-[#F8F7F0] w-[240px] sm:w-[280px] lg:w-[300px] aspect-[4/5]">
                <img
                  src="/assets/arthik-profile.jpg"
                  alt="Arthik Dwivedi — B.Tech AI/ML Engineer"
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                  style={{ objectPosition: 'center 10%' }}
                  loading="lazy"
                  decoding="async"
                />
                {/* Subtle inner overlay for depth */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'linear-gradient(180deg, transparent 55%, rgba(38,50,56,0.08) 100%)',
                  }}
                />
              </div>
            </div>

            {/* Name badge below photo */}
            <div className="mt-4 text-center">
              <p className="text-[13px] font-bold text-[#263238] tracking-wide">Arthik Dwivedi</p>
              <p className="text-[11px] text-[#5B646B] font-medium mt-0.5">B.Tech CSE · AI &amp; ML</p>
            </div>

            {/* Decorative dot accent */}
            <div
              className="absolute -top-2 -right-2 w-5 h-5 rounded-full border-2 border-[#82DAD1] bg-white shadow-sm"
              style={{ boxShadow: '0 0 10px rgba(130,218,209,0.5)' }}
            />
            <div
              className="absolute -bottom-2 -left-2 w-3.5 h-3.5 rounded-full bg-[#D6B574] opacity-80"
              style={{ boxShadow: '0 0 8px rgba(214,181,116,0.6)' }}
            />
          </div>
        </div>

        {/* BIO COLUMN */}
        <div className="lg:col-span-8 flex flex-col justify-center">
          <h2
            id="about-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#263238] tracking-tight leading-[1.15] mb-2"
          >
            A Little About Me
          </h2>
          <p className="text-sm text-[#5B646B] mb-6">
            Engineering intelligence from principles to production.
          </p>

          <div
            ref={bioRef}
            className="glass-panel p-6 sm:p-8 rounded-3xl border border-[#D6B574]/35 shadow-sm bg-white/75 relative"
            style={{ opacity: 0 }}
          >
            <p className="text-base sm:text-lg text-[#263238] font-normal leading-relaxed mb-4">
              I am a B.Tech Computer Science student specializing in Artificial Intelligence and
              Machine Learning. My journey is defined by curiosity for how algorithms extract patterns
              from chaotic data, and how intelligent architectures can be engineered into reliable,
              human-centered tools.
            </p>
            <p className="text-sm sm:text-base text-[#5B646B] leading-relaxed">
              Rather than stopping at isolated models or toy notebooks, I focus on full-lifecycle
              engineering: structuring verifiable APIs with FastAPI, building responsive user interfaces
              with React and TypeScript, managing relational databases, and shipping end-to-end solutions.
            </p>

            <div className="mt-6 pt-5 border-t border-[#D6B574]/20 flex flex-wrap items-center gap-4 text-xs font-medium text-[#5B646B]">
              <span className="inline-flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#82DAD1]" />
                B.Tech CSE (AI &amp; ML)
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#D6B574]" />
                Practical Systems Architecture
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#C8E9D7]" />
                Open Source &amp; Public Research
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* PRINCIPLE CARDS */}
      <div
        ref={cardsRef}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8"
      >
        {principles.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="pearl-card p-6 sm:p-7 rounded-3xl relative overflow-hidden group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div
                    className={`w-11 h-11 rounded-2xl ${item.badgeBg} flex items-center justify-center border border-[#D6B574]/20 group-hover:scale-105 transition-transform`}
                  >
                    <Icon className="w-5 h-5" style={{ color: item.iconColor }} />
                  </div>
                  <span className="text-[11px] font-mono tracking-wider text-[#5B646B]/80 uppercase">
                    0{index + 1}
                  </span>
                </div>

                <h3 className="text-xl font-serif text-[#263238] font-bold tracking-tight mb-1">
                  {item.title}
                </h3>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#D6B574] mb-3">
                  {item.subtitle}
                </p>
                <p className="text-sm text-[#5B646B] leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-black/[0.04] flex items-center justify-between text-xs text-[#5B646B]">
                <span className="font-mono text-[11px]">PRINCIPLE</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#D6B574]/60" />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
