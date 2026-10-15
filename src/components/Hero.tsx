// src/components/Hero.tsx
import React, { useEffect, useRef, useCallback } from 'react';
import { ArrowDownRight, Compass, Cpu, Network } from 'lucide-react';
import { siteConfig } from '../data/site.config';
import { animate, createTimeline, stagger } from '../lib/motion';

// ─── Neural-Network Canvas Visualization ────────────────────────────────────
interface NNNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  color: string;
  glowColor: string;
  pulsePhase: number;
  pulseSpeed: number;
}

interface NNEdge {
  a: number;
  b: number;
  pulseOffset: number;
  pulseSpeed: number;
  opacity: number;
}

const COLORS = {
  nodes: ['#D6B574', '#82DAD1', '#B89246', '#4FA399', '#F2BFA7', '#DCD7F5'],
  glows: ['rgba(214,181,116,0.7)', 'rgba(130,218,209,0.7)', 'rgba(184,146,70,0.7)', 'rgba(79,163,153,0.7)', 'rgba(242,191,167,0.6)', 'rgba(220,215,245,0.6)'],
  lines: 'rgba(214,181,116,0.22)',
  pulse: ['rgba(214,181,116,', 'rgba(130,218,209,', 'rgba(184,146,70,'],
};

const NODE_COUNT = 28;
const EDGE_MAX_DIST = 140;

function buildGraph(w: number, h: number): { nodes: NNNode[]; edges: NNEdge[] } {
  const cx = w / 2;
  const cy = h / 2;
  const nodes: NNNode[] = [];

  // Central hub node
  nodes.push({
    x: cx, y: cy, vx: 0, vy: 0,
    r: 8, color: '#D6B574', glowColor: 'rgba(214,181,116,0.8)',
    pulsePhase: 0, pulseSpeed: 0.018,
  });

  // Inner orbital ring
  for (let i = 0; i < 7; i++) {
    const angle = (i / 7) * Math.PI * 2;
    const rad = 70 + Math.random() * 20;
    const ci = i % COLORS.nodes.length;
    nodes.push({
      x: cx + Math.cos(angle) * rad,
      y: cy + Math.sin(angle) * rad,
      vx: (Math.random() - 0.5) * 0.18,
      vy: (Math.random() - 0.5) * 0.18,
      r: 4 + Math.random() * 3,
      color: COLORS.nodes[ci],
      glowColor: COLORS.glows[ci],
      pulsePhase: Math.random() * Math.PI * 2,
      pulseSpeed: 0.012 + Math.random() * 0.01,
    });
  }

  // Outer orbital ring
  for (let i = 0; i < 12; i++) {
    const angle = (i / 12) * Math.PI * 2 + 0.2;
    const rad = 130 + Math.random() * 35;
    const ci = (i + 2) % COLORS.nodes.length;
    nodes.push({
      x: cx + Math.cos(angle) * rad,
      y: cy + Math.sin(angle) * rad,
      vx: (Math.random() - 0.5) * 0.14,
      vy: (Math.random() - 0.5) * 0.14,
      r: 3 + Math.random() * 2.5,
      color: COLORS.nodes[ci],
      glowColor: COLORS.glows[ci],
      pulsePhase: Math.random() * Math.PI * 2,
      pulseSpeed: 0.008 + Math.random() * 0.008,
    });
  }

  // Scattered peripheral nodes
  for (let i = 0; i < NODE_COUNT - 20; i++) {
    const angle = Math.random() * Math.PI * 2;
    const rad = 155 + Math.random() * 50;
    const ci = i % COLORS.nodes.length;
    nodes.push({
      x: cx + Math.cos(angle) * rad,
      y: cy + Math.sin(angle) * rad,
      vx: (Math.random() - 0.5) * 0.1,
      vy: (Math.random() - 0.5) * 0.1,
      r: 2 + Math.random() * 2,
      color: COLORS.nodes[ci],
      glowColor: COLORS.glows[ci],
      pulsePhase: Math.random() * Math.PI * 2,
      pulseSpeed: 0.006 + Math.random() * 0.007,
    });
  }

  // Build edges for nearby pairs
  const edges: NNEdge[] = [];
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < EDGE_MAX_DIST) {
        edges.push({
          a: i, b: j,
          pulseOffset: Math.random() * Math.PI * 2,
          pulseSpeed: 0.012 + Math.random() * 0.015,
          opacity: 0.12 + (1 - dist / EDGE_MAX_DIST) * 0.35,
        });
      }
    }
  }

  return { nodes, edges };
}

const NeuralOrb: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);
  const timeRef = useRef<number>(0);
  const graphRef = useRef<{ nodes: NNNode[]; edges: NNEdge[] } | null>(null);
  const sizeRef = useRef({ w: 400, h: 400 });

  const draw = useCallback((ctx: CanvasRenderingContext2D, t: number) => {
    const { w, h } = sizeRef.current;
    const graph = graphRef.current;
    if (!graph) return;
    const { nodes, edges } = graph;
    const cx = w / 2;
    const cy = h / 2;

    ctx.clearRect(0, 0, w, h);

    // ── Background ambient glow ──────────────────────────────────────────────
    const bgGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, w * 0.52);
    bgGrad.addColorStop(0, 'rgba(130,218,209,0.10)');
    bgGrad.addColorStop(0.45, 'rgba(214,181,116,0.08)');
    bgGrad.addColorStop(0.75, 'rgba(200,233,215,0.05)');
    bgGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, w, h);

    // ── Orbital rings (slow rotation) ────────────────────────────────────────
    const ringAngle1 = t * 0.00018;
    const ringAngle2 = -t * 0.00013;

    // Outer ring
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(ringAngle1);
    ctx.strokeStyle = 'rgba(214,181,116,0.18)';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 8]);
    ctx.beginPath();
    ctx.ellipse(0, 0, 175, 95, 0.3, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    // Inner ring
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(ringAngle2);
    ctx.strokeStyle = 'rgba(130,218,209,0.20)';
    ctx.lineWidth = 1;
    ctx.setLineDash([3, 10]);
    ctx.beginPath();
    ctx.ellipse(0, 0, 115, 60, -0.2, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    ctx.setLineDash([]);

    // ── Animate node positions (gentle drift, bounded) ───────────────────────
    for (let i = 1; i < nodes.length; i++) {
      const nd = nodes[i];
      nd.x += nd.vx;
      nd.y += nd.vy;
      const dx = nd.x - cx;
      const dy = nd.y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const maxDist = i < 8 ? 100 : i < 20 ? 165 : 215;
      if (dist > maxDist) {
        nd.vx -= dx / dist * 0.04;
        nd.vy -= dy / dist * 0.04;
      }
      // Gentle damping
      nd.vx *= 0.995;
      nd.vy *= 0.995;
      // Tiny random nudge to keep movement alive
      nd.vx += (Math.random() - 0.5) * 0.025;
      nd.vy += (Math.random() - 0.5) * 0.025;
    }

    // ── Draw edges ──────────────────────────────────────────────────────────
    for (const edge of edges) {
      const na = nodes[edge.a];
      const nb = nodes[edge.b];
      const dx = na.x - nb.x;
      const dy = na.y - nb.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist > EDGE_MAX_DIST + 30) continue;

      // Pulse alpha along edge
      const pulse = 0.5 + 0.5 * Math.sin(t * edge.pulseSpeed * 0.04 + edge.pulseOffset);
      const alpha = edge.opacity * pulse;

      const grad = ctx.createLinearGradient(na.x, na.y, nb.x, nb.y);
      grad.addColorStop(0, na.color + Math.floor(alpha * 255).toString(16).padStart(2, '0'));
      grad.addColorStop(1, nb.color + Math.floor(alpha * 255).toString(16).padStart(2, '0'));

      ctx.strokeStyle = grad;
      ctx.lineWidth = 0.7 + alpha * 0.6;
      ctx.beginPath();
      ctx.moveTo(na.x, na.y);
      ctx.lineTo(nb.x, nb.y);
      ctx.stroke();
    }

    // ── Draw nodes ──────────────────────────────────────────────────────────
    for (let i = 0; i < nodes.length; i++) {
      const nd = nodes[i];
      const pulse = 0.6 + 0.4 * Math.sin(t * nd.pulseSpeed * 0.04 + nd.pulsePhase);
      const r = nd.r * (0.9 + 0.15 * pulse);

      // Glow halo
      const glow = ctx.createRadialGradient(nd.x, nd.y, 0, nd.x, nd.y, r * 4);
      glow.addColorStop(0, nd.glowColor.replace('0.7', `${(0.45 * pulse).toFixed(2)}`));
      glow.addColorStop(0.5, nd.glowColor.replace('0.7', `${(0.15 * pulse).toFixed(2)}`));
      glow.addColorStop(1, 'transparent');
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(nd.x, nd.y, r * 4, 0, Math.PI * 2);
      ctx.fill();

      // Core node
      ctx.fillStyle = nd.color;
      ctx.globalAlpha = 0.88 + 0.12 * pulse;
      ctx.beginPath();
      ctx.arc(nd.x, nd.y, r, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;

      // White highlight
      ctx.fillStyle = 'rgba(255,255,255,0.55)';
      ctx.beginPath();
      ctx.arc(nd.x - r * 0.3, nd.y - r * 0.3, r * 0.38, 0, Math.PI * 2);
      ctx.fill();
    }

    // ── Traveling data pulse on a random edge ────────────────────────────────
    if (edges.length > 0) {
      const edgeIdx = Math.floor((t * 0.004) % edges.length);
      const edge = edges[edgeIdx];
      const progress = (t * 0.003 + edge.pulseOffset) % 1;
      const na = nodes[edge.a];
      const nb = nodes[edge.b];
      const px = na.x + (nb.x - na.x) * progress;
      const py = na.y + (nb.y - na.y) * progress;
      const pulseGlow = ctx.createRadialGradient(px, py, 0, px, py, 8);
      pulseGlow.addColorStop(0, 'rgba(255,255,255,0.9)');
      pulseGlow.addColorStop(0.4, 'rgba(130,218,209,0.6)');
      pulseGlow.addColorStop(1, 'transparent');
      ctx.fillStyle = pulseGlow;
      ctx.beginPath();
      ctx.arc(px, py, 8, 0, Math.PI * 2);
      ctx.fill();
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const size = Math.min(canvas.parentElement?.clientWidth ?? 400, 420);
      sizeRef.current = { w: size, h: size };
      canvas.width = size * dpr;
      canvas.height = size * dpr;
      canvas.style.width = `${size}px`;
      canvas.style.height = `${size}px`;
      const ctx2 = canvas.getContext('2d');
      if (ctx2) ctx2.scale(dpr, dpr);
      graphRef.current = buildGraph(size, size);
    };

    resize();
    const ro = new ResizeObserver(resize);
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const loop = (ts: number) => {
      timeRef.current = ts;
      draw(ctx, ts);
      frameRef.current = requestAnimationFrame(loop);
    };
    frameRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frameRef.current);
      ro.disconnect();
    };
  }, [draw]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ display: 'block' }}
    />
  );
};

// ─── Hero Section ────────────────────────────────────────────────────────────
export const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const kickerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const introRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const tagsRef = useRef<HTMLDivElement>(null);
  const floatCard1Ref = useRef<HTMLDivElement>(null);
  const floatCard2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Anime.js coordinated entrance timeline
    const tl = createTimeline({
      defaults: {
        ease: 'outQuart',
        duration: 900,
      },
    });

    if (kickerRef.current) {
      tl.add(kickerRef.current, {
        opacity: [0, 1],
        translateY: [-15, 0],
        duration: 600,
      });
    }

    if (headlineRef.current) {
      tl.add(headlineRef.current, {
        opacity: [0, 1],
        translateY: [25, 0],
        duration: 800,
      }, '-=400');
    }

    if (introRef.current) {
      tl.add(introRef.current, {
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 700,
      }, '-=500');
    }

    if (ctaRef.current) {
      tl.add(ctaRef.current, {
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 700,
      }, '-=500');
    }

    if (tagsRef.current) {
      const pills = tagsRef.current.children;
      tl.add(pills, {
        opacity: [0, 1],
        translateY: [15, 0],
        delay: stagger(60),
        duration: 600,
      }, '-=400');
    }

    if (orbRef.current) {
      tl.add(orbRef.current, {
        opacity: [0, 1],
        scale: [0.85, 1],
        duration: 1000,
        ease: 'outExpo',
      }, '-=800');
    }

    if (floatCard1Ref.current) {
      tl.add(floatCard1Ref.current, {
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 700,
      }, '-=600');
    }

    if (floatCard2Ref.current) {
      tl.add(floatCard2Ref.current, {
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 700,
      }, '-=500');
    }

    // Ambient floating animation for glass panels
    let float1: any = null;
    let float2: any = null;

    if (floatCard1Ref.current) {
      float1 = animate(floatCard1Ref.current, {
        translateY: ['-6px', '6px'],
        duration: 3200,
        direction: 'alternate',
        loop: true,
        ease: 'inOutSine',
      });
    }

    if (floatCard2Ref.current) {
      float2 = animate(floatCard2Ref.current, {
        translateY: ['6px', '-6px'],
        duration: 3600,
        direction: 'alternate',
        loop: true,
        ease: 'inOutSine',
      });
    }

    return () => {
      float1?.pause();
      float2?.pause();
    };
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 md:pt-36 md:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden"
      aria-label="Hero Introduction"
    >
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* LEFT COLUMN: Narrative & Primary CTAs */}
        <div className="lg:col-span-7 flex flex-col justify-center z-10">
          <div ref={kickerRef} className="mb-4 inline-flex items-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-[#D6B574]/40 shadow-xs backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#D6B574] animate-pulse" />
              <span className="text-[11px] sm:text-xs font-semibold tracking-widest uppercase text-[#5B646B]">
                {siteConfig.heroKicker}
              </span>
            </div>
          </div>

          <h1
            ref={headlineRef}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif tracking-tight leading-[1.08] text-[#263238] mb-6"
          >
            <span className="block">{siteConfig.headlineLine1}</span>
            <span className="block mt-1 aurora-gradient-text font-serif italic">
              {siteConfig.headlineLine2}
            </span>
          </h1>

          <p
            ref={introRef}
            className="text-base sm:text-lg md:text-xl text-[#5B646B] max-w-2xl font-normal leading-relaxed mb-8"
          >
            {siteConfig.introduction}
          </p>

          <div
            ref={ctaRef}
            className="flex flex-wrap items-center gap-4 mb-10"
          >
            <a
              href={siteConfig.primaryCta.href}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold tracking-wide text-white bg-gradient-to-r from-[#263238] via-[#37474F] to-[#263238] hover:from-[#1E272C] hover:to-[#1E272C] shadow-md hover:shadow-lg transition-all duration-300 border border-[#D6B574]/30 hover:scale-[1.02] group"
            >
              <span>{siteConfig.primaryCta.label}</span>
              <ArrowDownRight className="w-4 h-4 text-[#D6B574] group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
            </a>

            <a
              href={siteConfig.secondaryCta.href}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold tracking-wide text-[#263238] bg-white/80 hover:bg-white border border-[#D6B574]/50 hover:border-[#D6B574] shadow-xs hover:shadow-sm transition-all duration-300 hover:scale-[1.02]"
            >
              <span>{siteConfig.secondaryCta.label}</span>
              <Compass className="w-4 h-4 text-[#B89246]" />
            </a>
          </div>

          <div ref={tagsRef} className="pt-4 border-t border-[#D6B574]/20">
            <p className="text-xs uppercase font-medium tracking-wider text-[#5B646B] mb-3">
              Verified Focus Areas &amp; Systems
            </p>
            <div className="flex flex-wrap gap-2">
              {siteConfig.verifiedTechnicalInterests.map((interest, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium text-[#263238] bg-white/70 border border-[#D6B574]/30 backdrop-blur-sm"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#82DAD1]" />
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Neural-Network Orb & Spatial Panels */}
        <div className="lg:col-span-5 relative flex items-center justify-center min-h-[420px] sm:min-h-[500px]">
          {/* Ambient glow behind orb */}
          <div
            className="absolute w-[360px] sm:w-[460px] h-[360px] sm:h-[460px] rounded-full blur-[80px] pointer-events-none"
            style={{
              background:
                'radial-gradient(circle, rgba(130,218,209,0.22) 0%, rgba(214,181,116,0.2) 45%, rgba(200,233,215,0.12) 70%, transparent 85%)',
            }}
          />

          <div
            ref={orbRef}
            className="relative flex items-center justify-center"
          >
            {/* ── Neural-network canvas orb ── */}
            <div
              className="relative rounded-full overflow-visible flex items-center justify-center"
              style={{
                width: 'clamp(300px, 38vw, 420px)',
                height: 'clamp(300px, 38vw, 420px)',
              }}
              aria-label="Animated AI neural-network visualization"
              role="img"
            >
              {/* Soft circular clip + border glow */}
              <div
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{
                  background: 'radial-gradient(circle at 38% 35%, rgba(255,255,255,0.18) 0%, rgba(248,247,242,0.10) 60%, transparent 80%)',
                  border: '1.5px solid rgba(214,181,116,0.28)',
                  boxShadow: '0 0 60px rgba(130,218,209,0.18), 0 0 30px rgba(214,181,116,0.14), inset 0 0 40px rgba(248,247,242,0.08)',
                }}
              />

              {/* Canvas neural network */}
              <NeuralOrb />

              {/* SVG decorative orbital arcs layered over canvas */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                aria-hidden="true"
                viewBox="0 0 420 420"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Outer dashed arc */}
                <ellipse
                  cx="210" cy="210" rx="195" ry="105"
                  stroke="rgba(214,181,116,0.14)"
                  strokeWidth="1"
                  strokeDasharray="5 10"
                  transform="rotate(15 210 210)"
                />
                {/* Inner dashed arc */}
                <ellipse
                  cx="210" cy="210" rx="130" ry="68"
                  stroke="rgba(130,218,209,0.16)"
                  strokeWidth="1"
                  strokeDasharray="3 9"
                  transform="rotate(-10 210 210)"
                />
                {/* Central cross-hair hint */}
                <circle cx="210" cy="210" r="6"
                  fill="rgba(214,181,116,0.25)"
                  stroke="rgba(214,181,116,0.5)"
                  strokeWidth="1.5"
                />
                <circle cx="210" cy="210" r="3"
                  fill="#D6B574"
                />
              </svg>
            </div>

            {/* Aqua accent dot top-right */}
            <div
              className="absolute -top-2.5 -right-2.5 w-5 h-5 rounded-full bg-white border-2 border-[#82DAD1] z-10"
              style={{ boxShadow: '0 0 12px rgba(130,218,209,0.6)' }}
            />
            {/* Gold accent dot bottom-left */}
            <div
              className="absolute -bottom-2 -left-2 w-3.5 h-3.5 rounded-full bg-[#D6B574] z-10"
              style={{ boxShadow: '0 0 10px rgba(214,181,116,0.65)' }}
            />

            {/* FLOATING GLASS PANEL 1 — Model Pipeline */}
            <div
              ref={floatCard1Ref}
              className="absolute -top-6 -left-6 sm:-left-10 glass-panel-elevated p-3.5 rounded-2xl shadow-lg border border-[#D6B574]/40 max-w-[190px] sm:max-w-[210px] pointer-events-auto z-20"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <div className="p-1 rounded-md bg-[#82DAD1]/20 text-[#263238]">
                  <Cpu className="w-3.5 h-3.5 text-[#263238]" />
                </div>
                <span className="text-[11px] font-bold text-[#263238] uppercase tracking-wider">
                  Model Pipeline
                </span>
              </div>
              <p className="text-[11px] text-[#5B646B] leading-tight font-mono">
                f(x) = σ(Wᵀ·x + b)
              </p>
              <div className="mt-2 flex items-center justify-between text-[10px] text-[#5B646B]">
                <span>Inference</span>
                <span className="text-emerald-700 font-semibold">Ready</span>
              </div>
            </div>

            {/* FLOATING GLASS PANEL 2 — Graph Topology */}
            <div
              ref={floatCard2Ref}
              className="absolute -bottom-8 -right-4 sm:-right-10 glass-panel-elevated p-3.5 rounded-2xl shadow-lg border border-[#D6B574]/40 max-w-[200px] sm:max-w-[220px] pointer-events-auto z-20"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <div className="p-1 rounded-md bg-[#D6B574]/20 text-[#263238]">
                  <Network className="w-3.5 h-3.5 text-[#B89246]" />
                </div>
                <span className="text-[11px] font-bold text-[#263238] uppercase tracking-wider">
                  Graph Topology
                </span>
              </div>
              <p className="text-[11px] text-[#5B646B] leading-tight font-mono">
                min Σ ||xᵢ - μₖ||²
              </p>
              <div className="mt-2 flex items-center justify-between text-[10px] text-[#5B646B]">
                <span>Clusters</span>
                <span className="text-[#263238] font-semibold">K-Means Optimal</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
