// src/components/Hero.tsx
import React, { useEffect, useRef, useCallback } from 'react';
import { ArrowDownRight, Compass, Cpu } from 'lucide-react';
import { siteConfig } from '../data/site.config';

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
  nodes: ['#FF98A2', '#FFC0C5', '#DC8BC3', '#F8D1D4', '#D9C7FF', '#FFB2BA'],
  glows: ['rgba(255,152,162,0.7)', 'rgba(255,192,197,0.7)', 'rgba(220,139,195,0.7)', 'rgba(248,209,212,0.7)', 'rgba(217,199,255,0.6)', 'rgba(255,178,186,0.6)'],
  lines: 'rgba(255,152,162,0.24)',
  pulse: ['rgba(255,152,162,', 'rgba(220,139,195,', 'rgba(255,192,197,'],
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
    r: 8, color: '#FF98A2', glowColor: 'rgba(255,152,162,0.8)',
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
    bgGrad.addColorStop(0, 'rgba(255,152,162,0.11)');
    bgGrad.addColorStop(0.45, 'rgba(220,139,195,0.08)');
    bgGrad.addColorStop(0.75, 'rgba(217,199,255,0.05)');
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
    ctx.strokeStyle = 'rgba(255,152,162,0.24)';
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
    ctx.strokeStyle = 'rgba(217,199,255,0.2)';
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
      pulseGlow.addColorStop(0.4, 'rgba(255,152,162,0.65)');
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
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const size = Math.min(canvas.parentElement?.clientWidth ?? 400, 420);
      sizeRef.current = { w: size, h: size };
      canvas.width = size * dpr;
      canvas.height = size * dpr;
      canvas.style.width = `${size}px`;
      canvas.style.height = `${size}px`;
      const ctx2 = canvas.getContext('2d');
      if (ctx2) ctx2.setTransform(dpr, 0, 0, dpr, 0, 0);
      graphRef.current = buildGraph(size, size);
      if (ctx2 && reducedMotion) draw(ctx2, 0);
    };

    resize();
    const ro = new ResizeObserver(resize);
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    if (reducedMotion) return () => ro.disconnect();

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
export const Hero: React.FC = () => (
  <section id="hero" className="hero-section" aria-labelledby="hero-title">
    <div className="intro-wipe" aria-hidden="true">
      <span>ARTHIK</span><span>DWIVEDI</span>
    </div>
    <div className="hero-wordmark" aria-hidden="true">
      <span>{siteConfig.name}</span>
    </div>
    <p className="hero-subtitle">{siteConfig.headlineLine1}</p>
    <div className="hero-stage">
      <div className="hero-copy">
        <p className="hero-kicker"><Compass aria-hidden="true" />{siteConfig.heroKicker}</p>
        <h1 id="hero-title">
          {siteConfig.headlineLine1}<br />
          <span>{siteConfig.headlineLine2}</span>
        </h1>
        <p className="hero-intro">{siteConfig.introduction}</p>
      </div>
      <div className="hero-visual" aria-label="Animated neural network visualization">
        <svg className="hero-streak-hand" viewBox="0 0 620 500" aria-hidden="true" focusable="false">
          <defs>
            <linearGradient id="streak-pink" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#f68da6" stopOpacity="0"/><stop offset=".42" stopColor="#f68da6" stopOpacity=".95"/><stop offset="1" stopColor="#ffc4d2" stopOpacity="0"/></linearGradient>
            <radialGradient id="streak-glow"><stop stopColor="#f68da6" stopOpacity=".46"/><stop offset="1" stopColor="#f68da6" stopOpacity="0"/></radialGradient>
          </defs>
          <ellipse cx="355" cy="410" rx="245" ry="120" fill="url(#streak-glow)" />
          <g fill="none" stroke="url(#streak-pink)" strokeWidth="1.4" strokeLinecap="round">
            <path d="M184 412c-40-25-55-59-49-102l18-123c4-25 20-43 36-39 15 3 21 19 17 39l-12 76 29-178c4-24 22-39 38-35 16 4 21 20 17 43l-25 183 49-221c6-24 23-37 39-31 15 6 19 22 13 45l-40 212 63-186c8-22 25-32 40-24 15 8 16 24 8 45L375 331c-25 72-74 109-134 107-23-1-42-10-57-26z" />
            <path d="M165 392c-25-22-35-48-29-80l20-125c3-17 13-28 23-26 12 3 14 13 12 27l-14 91 33-205c3-16 13-27 24-24 12 3 15 14 12 30l-28 209 52-251c4-17 15-25 26-21 12 5 14 16 10 32l-44 245 69-214c5-16 16-22 26-16 11 6 12 17 6 33l-61 193c-24 74-65 114-122 110-18-1-31-9-45-22z" />
            <path d="M144 371c-13-18-17-39-12-65l24-111m42 148 21-200m24 179 41-221m11 231 52-175m-183 197c39 31 90 33 127 9" opacity=".56" />
          </g>
          <g fill="#ffd2dc">
            <circle cx="178" cy="190" r="2"/><circle cx="195" cy="151" r="1.7"/><circle cx="247" cy="103" r="1.8"/><circle cx="290" cy="77" r="1.5"/><circle cx="348" cy="70" r="2"/><circle cx="399" cy="110" r="1.7"/><circle cx="440" cy="146" r="1.5"/><circle cx="153" cy="297" r="1.6"/><circle cx="200" cy="255" r="1.4"/><circle cx="321" cy="186" r="1.5"/><circle cx="372" cy="246" r="1.8"/><circle cx="421" cy="219" r="1.5"/><circle cx="458" cy="273" r="1.6"/><circle cx="166" cy="375" r="1.6"/><circle cx="248" cy="414" r="1.7"/><circle cx="332" cy="395" r="1.8"/><circle cx="399" cy="346" r="1.4"/>
          </g>
        </svg>
        <div className="hero-orb"><NeuralOrb /></div>
        <span className="orb-caption"><Cpu aria-hidden="true" />AI systems · connected ideas</span>
      </div>
    </div>
    <div className="hero-footer">
      <a href="#about" className="scroll-cue"><span className="scroll-line" />SCROLL TO EXPLORE</a>
      <p>{siteConfig.role}</p>
      <div className="hero-footer-actions">
        <a className="pill-link" data-hover-text={siteConfig.primaryCta.label} href={siteConfig.primaryCta.href}><span>{siteConfig.primaryCta.label}</span><ArrowDownRight aria-hidden="true" /></a>
        <a className="pill-link pill-link--quiet" data-hover-text={siteConfig.secondaryCta.label} href={siteConfig.secondaryCta.href}><span>{siteConfig.secondaryCta.label}</span><ArrowDownRight aria-hidden="true" /></a>
      </div>
    </div>
  </section>
);
