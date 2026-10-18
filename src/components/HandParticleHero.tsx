import React, { useEffect, useRef } from 'react';
import { HAND_OUTLINE_PATH, HandIllustration, getHandSamplePoints } from '../lib/handSource';

export const HandParticleHero: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = document.getElementById('hero');
    const parent = canvas?.parentElement;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx || !parent || !section) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let points: Array<{ x: number; y: number; phase: number; size: number }> = [];
    let frame = 0;
    let bounds = { width: 1, height: 1 };
    let pointer = { x: 0, y: 0 };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = parent.getBoundingClientRect();
      bounds = { width: Math.max(1, rect.width), height: Math.max(1, rect.height) };
      canvas.width = bounds.width * dpr;
      canvas.height = bounds.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const makePoints = async () => {
      const outline = await getHandSamplePoints();
      const source = new Path2D(HAND_OUTLINE_PATH);
      const seed = (n: number) => { const value = Math.sin(n * 127.1 + 311.7) * 43758.5453; return value - Math.floor(value); };
      const fill: typeof points = [];
      for (let y = 80, n = 0; y < 655; y += 9) for (let x = 110; x < 555; x += 9, n += 1) {
        const jitterX = x + (seed(n) - .5) * 6;
        const jitterY = y + (seed(n + 99) - .5) * 6;
        if (ctx.isPointInPath(source, jitterX, jitterY, 'evenodd') && seed(n + 201) > .12) {
          fill.push({ x: jitterX, y: jitterY, phase: seed(n + 303) * Math.PI * 2, size: .45 + seed(n + 405) * 1.05 });
        }
      }
      const edge = outline.map(([x, y], index) => ({ x, y, phase: index * .11, size: 1 + seed(index + 91) * 1.25 }));
      points = [...fill, ...edge];
      if (reduced) draw(0);
    };

    const draw = (time: number) => {
      const { width, height } = bounds;
      const scale = Math.min(width / 640, height / 700);
      const offsetX = (width - 640 * scale) / 2;
      const offsetY = (height - 700 * scale) / 2;
      const scroll = Number.parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--hero-progress')) || 0;
      const parallaxX = pointer.x * 18;
      const parallaxY = pointer.y * 13 - scroll * 12;
      ctx.clearRect(0, 0, width, height);
      const glow = ctx.createRadialGradient(width * .57, height * .86, 0, width * .57, height * .86, width * .43);
      glow.addColorStop(0, 'rgba(246, 92, 133, .38)');
      glow.addColorStop(.45, 'rgba(246, 92, 133, .11)');
      glow.addColorStop(1, 'rgba(246, 92, 133, 0)');
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);
      const progressScale = 1 - scroll * .055;
      for (let i = 0; i < points.length; i += 1) {
        const point = points[i];
        const pulse = reduced ? .62 : .4 + .6 * (.5 + .5 * Math.sin(time * .0025 + point.phase));
        const x = offsetX + (point.x - 320) * scale * progressScale + 320 * scale + parallaxX;
        const y = offsetY + (point.y - 350) * scale * progressScale + 350 * scale + parallaxY;
        ctx.fillStyle = `rgba(255, 157, 183, ${.22 + pulse * .7})`;
        ctx.beginPath();
        ctx.arc(x, y, point.size * scale * (0.65 + pulse * .65), 0, Math.PI * 2);
        ctx.fill();
        if (i % 61 === 0) {
          ctx.strokeStyle = `rgba(255, 174, 194, ${.16 + pulse * .25})`;
          ctx.lineWidth = .7;
          ctx.beginPath();
          ctx.moveTo(x - 7 * scale, y + 4 * scale);
          ctx.lineTo(x + 7 * scale, y - 4 * scale);
          ctx.stroke();
        }
      }
    };

    const onPointer = (event: PointerEvent) => {
      const rect = parent.getBoundingClientRect();
      pointer = { x: (event.clientX - rect.left) / rect.width - .5, y: (event.clientY - rect.top) / rect.height - .5 };
    };
    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(parent);
    void makePoints();
    window.addEventListener('pointermove', onPointer, { passive: true });
    if (!reduced) {
      const tick = (time: number) => { draw(time); frame = requestAnimationFrame(tick); };
      frame = requestAnimationFrame(tick);
    }
    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      window.removeEventListener('pointermove', onPointer);
    };
  }, []);

  return (
    <div className="hero-hand-art" role="img" aria-label="Pink particle silhouette of a hand, responding to pointer movement and scrolling">
      <canvas ref={canvasRef} aria-hidden="true" />
      <HandIllustration className="hero-hand-static" />
    </div>
  );
};
