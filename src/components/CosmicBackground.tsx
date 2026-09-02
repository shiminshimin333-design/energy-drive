import React, { useEffect, useRef } from 'react';

interface CosmicBackgroundProps {
  particleDensity?: number;
}

export const CosmicBackground: React.FC<CosmicBackgroundProps> = ({ particleDensity = 140 }) => {
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
      initStars();
    };

    window.addEventListener('resize', handleResize);

    interface Star {
      x: number;
      y: number;
      size: number;
      color: string;
      alpha: number;
      baseAlpha: number;
      pulseSpeed: number;
      pulseOffset: number;
      driftX: number;
      driftY: number;
      depth: number;
    }

    const stars: Star[] = [];
    const colors = [
      '#ffffff',
      '#a5b4fc', // indigo 300
      '#c084fc', // purple 400
      '#38bdf8', // sky 400
      '#e0e7ff', // indigo 100
      '#818cf8', // indigo 400
    ];

    const initStars = () => {
      stars.length = 0;
      const count = Math.floor((width * height) / 9000) * (particleDensity / 100);
      for (let i = 0; i < count; i++) {
        const depth = Math.random();
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 1.8 * (depth + 0.3),
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: Math.random() * 0.8 + 0.2,
          baseAlpha: Math.random() * 0.7 + 0.3,
          pulseSpeed: Math.random() * 0.03 + 0.008,
          pulseOffset: Math.random() * Math.PI * 2,
          driftX: (Math.random() - 0.5) * 0.15 * depth,
          driftY: (Math.random() - 0.5) * 0.15 * depth,
          depth,
        });
      }
    };

    initStars();

    let time = 0;
    const render = () => {
      time += 0.016;
      ctx.clearRect(0, 0, width, height);

      // Deep space background with subtle nebula gradients
      const grad1 = ctx.createRadialGradient(
        width * 0.25,
        height * 0.3,
        20,
        width * 0.25,
        height * 0.3,
        width * 0.6
      );
      grad1.addColorStop(0, 'rgba(49, 10, 107, 0.08)');
      grad1.addColorStop(0.6, 'rgba(15, 23, 42, 0.02)');
      grad1.addColorStop(1, 'rgba(2, 2, 6, 0)');
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, width, height);

      const grad2 = ctx.createRadialGradient(
        width * 0.8,
        height * 0.7,
        10,
        width * 0.8,
        height * 0.7,
        width * 0.5
      );
      grad2.addColorStop(0, 'rgba(30, 58, 138, 0.07)');
      grad2.addColorStop(0.5, 'rgba(76, 29, 149, 0.03)');
      grad2.addColorStop(1, 'rgba(2, 2, 6, 0)');
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, width, height);

      // Draw and update stars
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        star.x += star.driftX;
        star.y += star.driftY;

        if (star.x < 0) star.x = width;
        if (star.x > width) star.x = 0;
        if (star.y < 0) star.y = height;
        if (star.y > height) star.y = 0;

        const currentAlpha =
          star.baseAlpha *
          (0.6 + 0.4 * Math.sin(time * (star.pulseSpeed * 60) + star.pulseOffset));

        ctx.save();
        ctx.globalAlpha = Math.max(0.1, Math.min(1, currentAlpha));
        ctx.fillStyle = star.color;

        // Glowing halo for larger stars
        if (star.size > 1.4) {
          ctx.shadowBlur = star.size * 5;
          ctx.shadowColor = star.color;
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [particleDensity]);

  return (
    <canvas
      ref={canvasRef}
      id="cosmic-canvas"
      className="fixed inset-0 pointer-events-none z-0 opacity-90"
      aria-hidden="true"
    />
  );
};
