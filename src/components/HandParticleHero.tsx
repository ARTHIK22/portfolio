import React, { useEffect, useRef } from 'react';
import Tempus from 'tempus';

type Point3D = { x: number; y: number; z: number };
type ProjectedPoint = Point3D & { depth: number };

const makeNetwork = () => {
  const nodes: Point3D[] = [];
  const links: Array<[number, number]> = [];
  const rows = 15;
  const columns = 32;

  for (let row = 0; row <= rows; row += 1) {
    const latitude = -Math.PI / 2 + (Math.PI * row) / rows;
    for (let column = 0; column < columns; column += 1) {
      const longitude = (Math.PI * 2 * column) / columns;
      nodes.push({
        x: Math.cos(latitude) * Math.cos(longitude),
        y: Math.sin(latitude),
        z: Math.cos(latitude) * Math.sin(longitude),
      });
      const index = row * columns + column;
      links.push([index, row * columns + ((column + 1) % columns)]);
      if (row < rows) links.push([index, (row + 1) * columns + column]);
      if (row < rows && column % 2 === 0) links.push([index, (row + 1) * columns + ((column + 1) % columns)]);
    }
  }

  const surfaceDots: Point3D[] = [];
  const dotCount = 620;
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  for (let index = 0; index < dotCount; index += 1) {
    const y = 1 - (index / (dotCount - 1)) * 2;
    const ring = Math.sqrt(1 - y * y);
    const angle = goldenAngle * index;
    surfaceDots.push({ x: Math.cos(angle) * ring, y, z: Math.sin(angle) * ring });
  }

  const particleLinks = links.filter((_, index) => index % 89 === 7).slice(0, 11);
  return { nodes, links, surfaceDots, particleLinks };
};

const ORBITS = [
  { tilt: 0.24, angle: -0.34, radius: 1.12, phase: 0.12 },
  { tilt: 0.82, angle: 0.46, radius: 1.2, phase: 0.52 },
  { tilt: -0.66, angle: -0.72, radius: 1.08, phase: 0.82 },
];

export const NeuralNetworkOrb: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    const context = canvas?.getContext('2d', { alpha: true });
    if (!canvas || !parent || !context) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const { nodes, links, surfaceDots, particleLinks } = makeNetwork();
    let size = 1;
    let visible = !document.hidden;
    let pointerX = 0;
    let pointerY = 0;
    let removeFrame: (() => void) | undefined;

    const project = (point: Point3D, rotation: number, tilt: number, center: number, radius: number): ProjectedPoint => {
      const rotatedX = point.x * Math.cos(rotation) - point.z * Math.sin(rotation);
      const rotatedZ = point.x * Math.sin(rotation) + point.z * Math.cos(rotation);
      const rotatedY = point.y * Math.cos(tilt) - rotatedZ * Math.sin(tilt);
      const depth = point.y * Math.sin(tilt) + rotatedZ * Math.cos(tilt);
      const perspective = 1 + depth * 0.045;
      return {
        x: center + rotatedX * radius * perspective + pointerX * size * 0.018,
        y: center - rotatedY * radius * perspective + pointerY * size * 0.018,
        z: depth,
        depth,
      };
    };

    const draw = (time: number) => {
      context.clearRect(0, 0, size, size);
      const rotation = reducedMotion ? 0.38 : time * 0.00012 + 0.38;
      const tilt = -0.2 + pointerY * (reducedMotion ? 0 : -0.12);
      const radius = size * 0.385;
      const center = size / 2;
      const projected = nodes.map((node) => project(node, rotation, tilt, center, radius));
      const projectedDots = surfaceDots.map((dot) => project(dot, rotation, tilt, center, radius));
      const pulse = reducedMotion ? 0 : (Math.sin(time * 0.0008) + 1) / 2;

      const glow = context.createRadialGradient(center, center, radius * 0.08, center, center, radius * 1.28);
      glow.addColorStop(0, `rgba(214, 104, 139, ${0.12 + pulse * 0.035})`);
      glow.addColorStop(0.42, 'rgba(112, 34, 63, .085)');
      glow.addColorStop(1, 'rgba(11, 11, 13, 0)');
      context.fillStyle = glow;
      context.fillRect(0, 0, size, size);

      // Orbital paths sit behind the network and give the sphere a wider, layered silhouette.
      ORBITS.forEach((orbit, orbitIndex) => {
        const steps = 150;
        context.beginPath();
        for (let step = 0; step <= steps; step += 1) {
          const angle = (step / steps) * Math.PI * 2;
          const x = Math.cos(angle) * orbit.radius;
          const y = Math.sin(angle) * orbit.radius;
          const tiltedY = y * Math.cos(orbit.tilt) - x * Math.sin(orbit.tilt) * 0.16;
          const tiltedZ = y * Math.sin(orbit.tilt) + x * Math.cos(orbit.tilt) * 0.16;
          const orbitalPoint = { x: x * Math.cos(orbit.angle) - tiltedZ * Math.sin(orbit.angle), y: tiltedY, z: x * Math.sin(orbit.angle) + tiltedZ * Math.cos(orbit.angle) };
          const point = project(orbitalPoint, rotation * (orbitIndex % 2 ? -0.62 : 0.62), tilt, center, radius);
          if (step === 0) context.moveTo(point.x, point.y);
          else context.lineTo(point.x, point.y);
        }
        context.closePath();
        context.strokeStyle = `rgba(204, 91, 127, ${0.11 + orbitIndex * 0.035})`;
        context.lineWidth = Math.max(0.7, size / 850);
        context.setLineDash(orbitIndex === 1 ? [size * 0.009, size * 0.014] : []);
        context.stroke();
        context.setLineDash([]);

        const angle = time * 0.00019 + orbit.phase * Math.PI * 2;
        const x = Math.cos(angle) * orbit.radius;
        const y = Math.sin(angle) * orbit.radius;
        const tiltedY = y * Math.cos(orbit.tilt) - x * Math.sin(orbit.tilt) * 0.16;
        const tiltedZ = y * Math.sin(orbit.tilt) + x * Math.cos(orbit.tilt) * 0.16;
        const movingPoint = project({ x: x * Math.cos(orbit.angle) - tiltedZ * Math.sin(orbit.angle), y: tiltedY, z: x * Math.sin(orbit.angle) + tiltedZ * Math.cos(orbit.angle) }, rotation * (orbitIndex % 2 ? -0.62 : 0.62), tilt, center, radius);
        const particleRadius = Math.max(1.5, size * 0.0042);
        const particleGlow = context.createRadialGradient(movingPoint.x, movingPoint.y, 0, movingPoint.x, movingPoint.y, particleRadius * 4.5);
        particleGlow.addColorStop(0, 'rgba(255, 192, 211, .9)');
        particleGlow.addColorStop(1, 'rgba(198, 72, 111, 0)');
        context.fillStyle = particleGlow;
        context.beginPath();
        context.arc(movingPoint.x, movingPoint.y, particleRadius * 4.5, 0, Math.PI * 2);
        context.fill();
        context.fillStyle = orbitIndex === 1 ? '#c8c4ff' : '#ffc0d3';
        context.beginPath();
        context.arc(movingPoint.x, movingPoint.y, particleRadius, 0, Math.PI * 2);
        context.fill();
      });

      // Fine surface points create the dotted data-sphere texture; far-side dots stay faint.
      projectedDots.sort((a, b) => a.depth - b.depth);
      for (let index = 0; index < projectedDots.length; index += 1) {
        const point = projectedDots[index];
        const frontness = Math.max(0, (point.depth + 1) / 2);
        const alpha = 0.035 + frontness * 0.26;
        context.fillStyle = `rgba(255, 190, 207, ${alpha})`;
        context.beginPath();
        context.arc(point.x, point.y, Math.max(0.55, size * 0.00145), 0, Math.PI * 2);
        context.fill();
      }

      context.lineWidth = Math.max(0.42, size / 960);
      for (const [from, to] of links) {
        const a = projected[from];
        const b = projected[to];
        const depth = Math.max(0, (a.depth + b.depth + 2) / 4);
        context.strokeStyle = `rgba(211, 128, 153, ${0.055 + depth * 0.28})`;
        context.beginPath();
        context.moveTo(a.x, a.y);
        context.lineTo(b.x, b.y);
        context.stroke();
      }

      particleLinks.forEach(([from, to], index) => {
        const a = projected[from];
        const b = projected[to];
        const progress = reducedMotion ? 0.5 : (time * 0.00017 + index * 0.173) % 1;
        const x = a.x + (b.x - a.x) * progress;
        const y = a.y + (b.y - a.y) * progress;
        context.fillStyle = index % 4 === 0 ? 'rgba(198, 196, 255, .95)' : 'rgba(255, 189, 208, .92)';
        context.beginPath();
        context.arc(x, y, Math.max(1, size * 0.0022), 0, Math.PI * 2);
        context.fill();
      });

      projected.forEach((point, index) => {
        const phase = reducedMotion ? 0.76 : 0.68 + 0.32 * Math.sin(time * 0.0015 + index * 0.77);
        const highlighted = index % 79 === 11;
        const lavender = highlighted && index % 2 === 1;
        const nodeRadius = Math.max(0.85, size * (highlighted ? 0.0064 : 0.0025) * phase);
        const alpha = 0.2 + Math.max(0, point.depth + 1) * 0.36;
        context.fillStyle = lavender ? `rgba(195, 187, 255, ${alpha})` : `rgba(255, 190, 209, ${alpha})`;
        context.beginPath();
        context.arc(point.x, point.y, nodeRadius, 0, Math.PI * 2);
        context.fill();
        if (highlighted && point.depth > -0.1) {
          context.strokeStyle = lavender ? 'rgba(195,187,255,.44)' : 'rgba(255,190,209,.48)';
          context.lineWidth = Math.max(0.7, size * 0.0015);
          context.beginPath();
          context.arc(point.x, point.y, nodeRadius * 2.3, 0, Math.PI * 2);
          context.stroke();
        }
      });

      // A restrained center pulse anchors the surrounding motion.
      const core = center + Math.sin(time * 0.00024) * radius * 0.018;
      const coreRadius = radius * (0.09 + pulse * 0.008);
      const coreGlow = context.createRadialGradient(core, center, 0, core, center, coreRadius * 4.2);
      coreGlow.addColorStop(0, 'rgba(255, 215, 226, .72)');
      coreGlow.addColorStop(0.2, 'rgba(213, 92, 132, .24)');
      coreGlow.addColorStop(1, 'rgba(166, 66, 94, 0)');
      context.fillStyle = coreGlow;
      context.beginPath();
      context.arc(core, center, coreRadius * 4.2, 0, Math.PI * 2);
      context.fill();
      for (let ring = 0; ring < 3; ring += 1) {
        const ringRadius = coreRadius * (1.2 + ring * 0.72 + pulse * 0.12);
        context.strokeStyle = `rgba(221, 119, 151, ${0.25 - ring * 0.055})`;
        context.lineWidth = Math.max(0.65, size * 0.0012);
        context.beginPath();
        context.arc(core, center, ringRadius, 0, Math.PI * 2);
        context.stroke();
      }
      context.fillStyle = 'rgba(255, 224, 232, .92)';
      context.beginPath();
      context.arc(core, center, Math.max(1.3, size * 0.006), 0, Math.PI * 2);
      context.fill();
    };

    const resize = () => {
      const rect = parent.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 1.75);
      size = Math.max(1, Math.min(rect.width, rect.height));
      canvas.width = Math.round(size * ratio);
      canvas.height = Math.round(size * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      if (reducedMotion || !visible) draw(0);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (reducedMotion) return;
      const rect = parent.getBoundingClientRect();
      const within = event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom;
      pointerX = within ? Math.max(-0.5, Math.min(0.5, (event.clientX - rect.left) / rect.width - 0.5)) : 0;
      pointerY = within ? Math.max(-0.5, Math.min(0.5, (event.clientY - rect.top) / rect.height - 0.5)) : 0;
    };
    const onVisibilityChange = () => { visible = !document.hidden; };
    const resizeObserver = new ResizeObserver(resize);
    const intersectionObserver = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting && !document.hidden; });
    resizeObserver.observe(parent);
    intersectionObserver.observe(parent);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('visibilitychange', onVisibilityChange);
    resize();
    draw(0);
    canvas.dataset.rendered = 'true';
    if (!reducedMotion) removeFrame = Tempus.add(({ time }) => { if (visible) draw(time); }, { order: 0, label: 'hero-neural-orb' });

    return () => {
      removeFrame?.();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      delete canvas.dataset.rendered;
    };
  }, []);

  return (
    <div className="hero-neural-art" role="img" aria-label="Animated neural intelligence globe with connected nodes, orbiting particles, and a rose-lit center">
      <svg className="hero-neural-fallback" viewBox="0 0 100 100" aria-hidden="true">
        <circle cx="50" cy="50" r="41" fill="none" stroke="currentColor" strokeOpacity=".18" />
        <ellipse cx="50" cy="50" rx="42" ry="14" fill="none" stroke="currentColor" strokeOpacity=".3" transform="rotate(-22 50 50)" />
        <path d="M17 42 31 28l16 8 15-13 19 16M18 59l17-12 15 14 17-9 16 12M31 28l4 19m12-11 3 25m12-40 3 31m19-15-2 18" fill="none" stroke="currentColor" strokeOpacity=".3" />
        <g fill="currentColor"><circle cx="17" cy="42" r="1.5"/><circle cx="31" cy="28" r="1.8"/><circle cx="47" cy="36" r="1.6"/><circle cx="62" cy="23" r="1.8"/><circle cx="81" cy="39" r="1.6"/><circle cx="18" cy="59" r="1.4"/><circle cx="35" cy="47" r="1.8"/><circle cx="50" cy="61" r="1.7"/><circle cx="67" cy="52" r="1.8"/><circle cx="83" cy="64" r="1.5"/></g>
      </svg>
      <canvas ref={canvasRef} aria-hidden="true" />
    </div>
  );
};
