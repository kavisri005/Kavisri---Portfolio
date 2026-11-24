import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  color: string;
  type: 'node' | 'symbol' | 'packet';
  symbol?: string;
  alpha: number;
  pulseSpeed: number;
  pulseAngle: number;
}

interface DataPacket {
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  progress: number;
  speed: number;
  color: string;
}

const DEV_SYMBOLS = ['</>', '{ }', '01', 'λ', '=>', 'SQL', 'AI', 'API', 'git', '&&', '||', '++'];

export const TechCanvasBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { isDark } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates
    const mouse = {
      x: -1000,
      y: -1000,
      radius: 160,
      active: false,
    };

    // Color palette based on theme
    const getNodeColors = () => {
      if (isDark) {
        return [
          'rgba(56, 189, 248, ',  // Sky 400
          'rgba(6, 182, 212, ',   // Cyan 500
          'rgba(168, 85, 247, ',  // Purple 500
          'rgba(52, 211, 153, ',  // Emerald 400
          'rgba(96, 165, 250, ',  // Blue 400
        ];
      } else {
        return [
          'rgba(2, 132, 199, ',   // Sky 600
          'rgba(8, 145, 178, ',   // Cyan 600
          'rgba(126, 34, 206, ',  // Purple 700
          'rgba(5, 150, 105, ',   // Emerald 600
          'rgba(37, 99, 235, ',   // Blue 600
        ];
      }
    };

    let colors = getNodeColors();

    // Generate particles
    const particleCount = Math.min(Math.floor((width * height) / 22000) + 25, 65);
    const particles: Particle[] = [];
    const packets: DataPacket[] = [];

    for (let i = 0; i < particleCount; i++) {
      const isSymbol = i % 7 === 0;
      const baseRadius = isSymbol ? 0 : Math.random() * 2 + 1.2;
      const colorPrefix = colors[Math.floor(Math.random() * colors.length)];

      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.55,
        vy: (Math.random() - 0.5) * 0.55,
        radius: baseRadius,
        baseRadius,
        color: colorPrefix,
        type: isSymbol ? 'symbol' : 'node',
        symbol: isSymbol ? DEV_SYMBOLS[Math.floor(Math.random() * DEV_SYMBOLS.length)] : undefined,
        alpha: Math.random() * 0.5 + 0.3,
        pulseSpeed: Math.random() * 0.03 + 0.01,
        pulseAngle: Math.random() * Math.PI * 2,
      });
    }

    // Spawn occasional data packets between nearby connected nodes
    const spawnPacket = (p1: Particle, p2: Particle) => {
      if (packets.length > 12) return;
      packets.push({
        fromX: p1.x,
        fromY: p1.y,
        toX: p2.x,
        toY: p2.y,
        progress: 0,
        speed: Math.random() * 0.015 + 0.008,
        color: isDark ? 'rgba(56, 189, 248, 0.9)' : 'rgba(2, 132, 199, 0.95)',
      });
    };

    let lastPacketSpawn = Date.now();

    // Mouse handlers
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
      mouse.active = false;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
        mouse.active = true;
      }
    };

    const handleTouchEnd = () => {
      mouse.active = false;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    // Handle resize
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      colors = getNodeColors();
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    const maxConnectionDistance = 140;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const now = Date.now();
      const shouldSpawnPacket = now - lastPacketSpawn > 900;

      // Draw particle nodes and compute distances
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Update position
        p.x += p.vx;
        p.y += p.vy;

        // Bounce at boundaries
        if (p.x < 0) {
          p.x = 0;
          p.vx *= -1;
        } else if (p.x > width) {
          p.x = width;
          p.vx *= -1;
        }

        if (p.y < 0) {
          p.y = 0;
          p.vy *= -1;
        } else if (p.y > height) {
          p.y = height;
          p.vy *= -1;
        }

        // Pulse size
        p.pulseAngle += p.pulseSpeed;
        const currentAlpha = p.alpha + Math.sin(p.pulseAngle) * 0.15;

        // Mouse interaction (gentle attraction / repulsion)
        if (mouse.active) {
          const dxMouse = p.x - mouse.x;
          const dyMouse = p.y - mouse.y;
          const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

          if (distMouse < mouse.radius && distMouse > 0) {
            const force = (mouse.radius - distMouse) / mouse.radius;
            // Draw interactive constellation line to mouse
            const mouseLineAlpha = (1 - distMouse / mouse.radius) * (isDark ? 0.45 : 0.35);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = isDark
              ? `rgba(56, 189, 248, ${mouseLineAlpha})`
              : `rgba(2, 132, 199, ${mouseLineAlpha})`;
            ctx.lineWidth = 1.2;
            ctx.stroke();

            p.x += (dxMouse / distMouse) * force * 1.5;
            p.y += (dyMouse / distMouse) * force * 1.5;
          }
        }

        // Render Symbol or Node
        if (p.type === 'symbol' && p.symbol) {
          ctx.font = '10px "JetBrains Mono", monospace';
          ctx.fillStyle = `${p.color}${Math.max(0.15, currentAlpha * (isDark ? 0.7 : 0.6))})`;
          ctx.fillText(p.symbol, p.x - 8, p.y + 4);
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.baseRadius + Math.sin(p.pulseAngle) * 0.4, 0, Math.PI * 2);
          ctx.fillStyle = `${p.color}${Math.max(0.2, currentAlpha)})`;
          ctx.fill();

          // Outer halo
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.baseRadius * 2.8, 0, Math.PI * 2);
          ctx.fillStyle = `${p.color}${Math.max(0.04, currentAlpha * 0.15)})`;
          ctx.fill();
        }

        // Draw connections between nearby nodes
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxConnectionDistance) {
            const lineAlpha = (1 - dist / maxConnectionDistance) * (isDark ? 0.22 : 0.16);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = isDark
              ? `rgba(56, 189, 248, ${lineAlpha})`
              : `rgba(2, 132, 199, ${lineAlpha})`;
            ctx.lineWidth = 0.85;
            ctx.stroke();

            // Randomly spawn data packet
            if (shouldSpawnPacket && Math.random() < 0.05 && dist < 100) {
              spawnPacket(p, p2);
              lastPacketSpawn = now;
            }
          }
        }
      }

      // Draw & update moving data packets
      for (let k = packets.length - 1; k >= 0; k--) {
        const pkt = packets[k];
        pkt.progress += pkt.speed;

        if (pkt.progress >= 1) {
          packets.splice(k, 1);
          continue;
        }

        const currX = pkt.fromX + (pkt.toX - pkt.fromX) * pkt.progress;
        const currY = pkt.fromY + (pkt.toY - pkt.fromY) * pkt.progress;

        ctx.beginPath();
        ctx.arc(currX, currY, isDark ? 2.5 : 2.2, 0, Math.PI * 2);
        ctx.fillStyle = pkt.color;
        ctx.shadowColor = isDark ? '#38bdf8' : '#0284c7';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDark]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Dynamic ambient gradient orbs */}
      <div 
        className={`absolute -top-32 left-1/4 w-[600px] h-[600px] rounded-full blur-[140px] transition-all duration-700 pointer-events-none ${
          isDark ? 'bg-cyan-500/15' : 'bg-sky-400/25'
        }`} 
      />
      <div 
        className={`absolute top-[28%] -right-40 w-[550px] h-[550px] rounded-full blur-[150px] transition-all duration-700 pointer-events-none ${
          isDark ? 'bg-blue-600/12' : 'bg-cyan-300/25'
        }`} 
      />
      <div 
        className={`absolute top-[55%] -left-40 w-[600px] h-[600px] rounded-full blur-[160px] transition-all duration-700 pointer-events-none ${
          isDark ? 'bg-purple-600/10' : 'bg-indigo-300/20'
        }`} 
      />
      <div 
        className={`absolute top-[80%] right-1/4 w-[500px] h-[500px] rounded-full blur-[150px] transition-all duration-700 pointer-events-none ${
          isDark ? 'bg-teal-500/10' : 'bg-emerald-300/20'
        }`} 
      />

      {/* Grid texture */}
      <div 
        className={`absolute inset-0 transition-opacity duration-700 ${
          isDark ? 'bg-grid-pattern opacity-60' : 'bg-grid-pattern-light opacity-40'
        }`} 
      />

      {/* Interactive Neural Constellation Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
};
