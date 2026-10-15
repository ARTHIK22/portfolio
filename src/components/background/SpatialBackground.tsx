// src/components/background/SpatialBackground.tsx
import React, { useEffect, useRef } from 'react';

export const SpatialBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initNodes();
    };

    window.addEventListener('resize', handleResize);

    // Node count adjusted for performance (sparse & elegant)
    const nodeCount = Math.min(Math.floor((width * height) / 32000), 45);
    interface Node {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
      alpha: number;
      pulseSpeed: number;
      pulseOffset: number;
    }

    const palette = [
      'rgba(214, 181, 116, ', // Champagne gold
      'rgba(130, 218, 209, ', // Aqua
      'rgba(200, 233, 215, ', // Mint
      'rgba(242, 191, 167, ', // Peach
    ];

    let nodes: Node[] = [];

    const initNodes = () => {
      nodes = [];
      for (let i = 0; i < nodeCount; i++) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          radius: Math.random() * 2 + 1.2,
          color: palette[Math.floor(Math.random() * palette.length)],
          alpha: Math.random() * 0.4 + 0.3,
          pulseSpeed: Math.random() * 0.02 + 0.01,
          pulseOffset: Math.random() * Math.PI * 2,
        });
      }
    };

    initNodes();

    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      time += 0.015;

      // Draw connections
      const maxDistance = 150;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const proximityAlpha = (1 - dist / maxDistance) * 0.15;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(214, 181, 116, ${proximityAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Draw and update nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0) node.x = width;
        if (node.x > width) node.x = 0;
        if (node.y < 0) node.y = height;
        if (node.y > height) node.y = 0;

        const currentAlpha = node.alpha + Math.sin(time * node.pulseSpeed * 20 + node.pulseOffset) * 0.15;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${node.color}${Math.max(0.1, currentAlpha)})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    // Render initial frame
    render();

    // Visibility change handler to save battery & GPU
    const handleVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationFrameId);
      } else {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibility);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* LAYER 1: AURORA ATMOSPHERE */}
      <div className="absolute inset-0 opacity-70">
        <div
          className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full blur-[120px] transition-transform duration-1000 animate-pulse"
          style={{
            background: 'radial-gradient(circle, rgba(130, 218, 209, 0.25) 0%, rgba(200, 233, 215, 0.15) 50%, transparent 75%)',
          }}
        />
        <div
          className="absolute top-1/3 -right-40 w-[650px] h-[650px] rounded-full blur-[140px] transition-transform duration-1000 animate-pulse"
          style={{
            background: 'radial-gradient(circle, rgba(214, 181, 116, 0.2) 0%, rgba(242, 191, 167, 0.15) 50%, transparent 75%)',
            animationDelay: '2s',
          }}
        />
        <div
          className="absolute -bottom-40 left-1/4 w-[700px] h-[700px] rounded-full blur-[150px]"
          style={{
            background: 'radial-gradient(circle, rgba(220, 215, 245, 0.2) 0%, rgba(130, 218, 209, 0.15) 50%, transparent 80%)',
          }}
        />
      </div>

      {/* LAYER 2: NEURAL CONSTELLATION CANVAS */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* LAYER 3: SPATIAL GEOMETRY (SVG Rings & Floating Frames) */}
      <svg
        className="absolute inset-0 w-full h-full opacity-35"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="85%"
          cy="20%"
          r="180"
          fill="none"
          stroke="#D6B574"
          strokeWidth="0.75"
          strokeDasharray="4 8"
        />
        <circle
          cx="85%"
          cy="20%"
          r="260"
          fill="none"
          stroke="#82DAD1"
          strokeWidth="0.5"
          strokeDasharray="2 6"
        />
        <circle
          cx="12%"
          cy="75%"
          r="140"
          fill="none"
          stroke="#D6B574"
          strokeWidth="0.75"
          strokeDasharray="3 6"
        />
        <rect
          x="8%"
          y="25%"
          width="70"
          height="70"
          rx="18"
          fill="none"
          stroke="#C8E9D7"
          strokeWidth="0.75"
          transform="rotate(15 110 250)"
        />
        <rect
          x="90%"
          y="70%"
          width="80"
          height="80"
          rx="20"
          fill="none"
          stroke="#F2BFA7"
          strokeWidth="0.75"
          transform="rotate(-20 900 700)"
        />
      </svg>
    </div>
  );
};
