import React, { useEffect, useRef } from 'react';
import { BlackHoleParams } from '../types';

interface HeroBlackHoleCanvasProps {
  scrollProgress: number; // 0 to 1
  params?: Partial<BlackHoleParams>;
  interactive?: boolean;
}

export const HeroBlackHoleCanvas: React.FC<HeroBlackHoleCanvasProps> = ({
  scrollProgress,
  params,
  interactive = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, isHovered: false });

  // Merge default parameters
  const currentParams: BlackHoleParams = {
    mass: params?.mass ?? 1.0,
    spin: params?.spin ?? 0.94,
    accretionRate: params?.accretionRate ?? 85,
    particleDensity: params?.particleDensity ?? 240,
    tiltAngle: params?.tiltAngle ?? 0.28,
    glowIntensity: params?.glowIntensity ?? 1.2,
    colorScheme: params?.colorScheme ?? 'cyan-purple',
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
      initInfallingParticles();
    };

    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / width - 0.5) * 2;
      const ny = ((e.clientY - rect.top) / height - 0.5) * 2;
      mouseRef.current.targetX = nx;
      mouseRef.current.targetY = ny;
      mouseRef.current.isHovered = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.targetX = 0;
      mouseRef.current.targetY = 0;
      mouseRef.current.isHovered = false;
    };

    if (interactive) {
      window.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseleave', handleMouseLeave);
    }

    // Infalling accretion particles
    interface InfallingParticle {
      radius: number; // distance from singularity
      angle: number; // orbital angle
      speed: number; // angular velocity
      radialSpeed: number; // inward suction speed
      size: number;
      hue: number; // base hue in degrees
      opacity: number;
      tail: { x: number; y: number }[];
      z: number;
      pulseOffset: number;
    }

    const particles: InfallingParticle[] = [];

    const initInfallingParticles = () => {
      particles.length = 0;
      const count = currentParams.particleDensity;
      const maxRadius = Math.min(width, height) * 0.75;
      const minRadius = Math.min(width, height) * 0.12;

      for (let i = 0; i < count; i++) {
        const r = minRadius + Math.random() * (maxRadius - minRadius);
        particles.push({
          radius: r,
          angle: Math.random() * Math.PI * 2,
          speed: (0.015 + Math.random() * 0.02) * (1 + currentParams.spin * 0.8),
          radialSpeed: 0.35 + Math.random() * 0.65,
          size: Math.random() * 2.2 + 0.8,
          hue: Math.random() > 0.4 ? 260 + Math.random() * 40 : 190 + Math.random() * 30, // purple / cyan
          opacity: Math.random() * 0.8 + 0.2,
          tail: [],
          z: (Math.random() - 0.5) * 40,
          pulseOffset: Math.random() * Math.PI * 2,
        });
      }
    };

    initInfallingParticles();

    let rotationAngle = 0;
    let time = 0;

    const render = () => {
      time += 0.018;
      // Smooth mouse lerp
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // Calculate center and dynamic scale from scroll
      // As scrollProgress goes up (e.g. 0 to 0.4 in Hero), black hole expands smoothly
      const baseScale = 1 + scrollProgress * 1.8;
      const centerX = width * 0.5 + mouseRef.current.x * 25;
      const centerY = height * 0.5 + mouseRef.current.y * 20;

      const baseRadius = Math.min(width, height) * 0.14 * baseScale;
      const eventHorizonRadius = baseRadius;
      const photonRingRadius = baseRadius * 1.35;
      const outerAccretionRadius = baseRadius * 3.4;

      rotationAngle += (0.008 + currentParams.spin * 0.012);

      // Tilt matrix parameters
      const tilt = currentParams.tiltAngle + mouseRef.current.y * 0.15;
      const aspectY = Math.cos(tilt) * 0.38; // foreshortening for tilted 3D accretion disk

      ctx.save();
      ctx.translate(centerX, centerY);

      // 1. BACK ACCRETION DISK (Behind Event Horizon) & Gravitational Lensing Upper Arc
      // Lensing creates a luminous warp over the top of the black hole
      ctx.save();
      const lensGradTop = ctx.createRadialGradient(
        0,
        -eventHorizonRadius * 0.65,
        eventHorizonRadius * 0.9,
        0,
        -eventHorizonRadius * 0.8,
        outerAccretionRadius * 0.95
      );
      lensGradTop.addColorStop(0, 'rgba(56, 189, 248, 0)');
      lensGradTop.addColorStop(0.3, 'rgba(147, 51, 234, 0.45)');
      lensGradTop.addColorStop(0.65, 'rgba(59, 130, 246, 0.35)');
      lensGradTop.addColorStop(0.9, 'rgba(168, 85, 247, 0.15)');
      lensGradTop.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = lensGradTop;
      ctx.beginPath();
      ctx.ellipse(0, -eventHorizonRadius * 0.75, outerAccretionRadius * 0.9, eventHorizonRadius * 0.95, 0, Math.PI, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // 2. BACK HALF OF ACCRETION DISK
      ctx.save();
      ctx.beginPath();
      ctx.ellipse(0, 0, outerAccretionRadius, outerAccretionRadius * aspectY, 0, Math.PI, Math.PI * 2);
      const backDiskGrad = ctx.createRadialGradient(0, 0, eventHorizonRadius * 1.1, 0, 0, outerAccretionRadius);
      backDiskGrad.addColorStop(0, 'rgba(168, 85, 247, 0.65)');
      backDiskGrad.addColorStop(0.4, 'rgba(59, 130, 246, 0.5)');
      backDiskGrad.addColorStop(0.8, 'rgba(147, 51, 234, 0.25)');
      backDiskGrad.addColorStop(1, 'rgba(3, 7, 18, 0)');
      ctx.fillStyle = backDiskGrad;
      ctx.fill();
      ctx.restore();

      // 3. SWIRLING ENERGY RINGS (Blue and Purple dynamic vortex arcs)
      for (let ring = 0; ring < 4; ring++) {
        const ringRadius = eventHorizonRadius * (1.5 + ring * 0.45);
        const ringAspect = aspectY * (1 + ring * 0.06);
        const ringAngle = rotationAngle * (ring % 2 === 0 ? 1.2 : -0.9) + ring * 1.3;

        ctx.save();
        ctx.lineWidth = 2.5 + ring * 1.2;
        const strokeGrad = ctx.createLinearGradient(
          -ringRadius,
          -ringRadius * ringAspect,
          ringRadius,
          ringRadius * ringAspect
        );
        strokeGrad.addColorStop(0, 'rgba(56, 189, 248, 0.9)'); // Cyan Doppler approached
        strokeGrad.addColorStop(0.35, 'rgba(147, 51, 234, 0.85)'); // Vibrant Purple
        strokeGrad.addColorStop(0.7, 'rgba(217, 70, 239, 0.6)'); // Fuchsia
        strokeGrad.addColorStop(1, 'rgba(37, 99, 235, 0.2)'); // Receding Blue

        ctx.strokeStyle = strokeGrad;
        ctx.shadowBlur = 18 * currentParams.glowIntensity;
        ctx.shadowColor = ring % 2 === 0 ? '#38bdf8' : '#a855f7';

        ctx.beginPath();
        ctx.ellipse(0, 0, ringRadius, ringRadius * ringAspect, ringAngle * 0.15, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      // 4. DRAW INFALLING PARTICLES & STREAMERS
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Orbit speed increases dramatically as radius decreases (Keplerian / relativistic orbital acceleration)
        const orbitalSpeed = p.speed * Math.pow(outerAccretionRadius / Math.max(p.radius, eventHorizonRadius * 0.8), 1.4);
        p.angle += orbitalSpeed;

        // Gravitational suction pulls particle inward
        p.radius -= p.radialSpeed * (1 + (outerAccretionRadius - p.radius) / outerAccretionRadius * 3);

        // Respawn if swallowed by Event Horizon or drifted too far
        if (p.radius <= eventHorizonRadius * 0.98) {
          p.radius = outerAccretionRadius * (0.85 + Math.random() * 0.35);
          p.angle = Math.random() * Math.PI * 2;
          p.tail = [];
        }

        // 3D Projection onto tilted plane
        const px = Math.cos(p.angle) * p.radius;
        const py = Math.sin(p.angle) * p.radius * aspectY + p.z * 0.2;

        // Save tail for glowing trajectory trail
        p.tail.unshift({ x: px, y: py });
        if (p.tail.length > 6) p.tail.pop();

        // Doppler beaming: particles on left side moving toward observer are boosted in brightness and bluer
        const dopplerShift = Math.sin(p.angle); // -1 (moving toward) to +1 (moving away)
        const isApproaching = dopplerShift < 0;
        const dopplerBrightness = isApproaching ? 1.4 : 0.6;

        ctx.save();
        ctx.beginPath();
        if (p.tail.length > 1) {
          ctx.moveTo(p.tail[0].x, p.tail[0].y);
          for (let t = 1; t < p.tail.length; t++) {
            ctx.lineTo(p.tail[t].x, p.tail[t].y);
          }
          ctx.strokeStyle = isApproaching
            ? `rgba(56, 189, 248, ${p.opacity * dopplerBrightness * 0.6})`
            : `rgba(168, 85, 247, ${p.opacity * dopplerBrightness * 0.4})`;
          ctx.lineWidth = p.size * 0.8;
          ctx.stroke();
        }

        ctx.fillStyle = isApproaching ? '#38bdf8' : '#c084fc';
        ctx.shadowBlur = p.size * 4 * currentParams.glowIntensity;
        ctx.shadowColor = isApproaching ? '#38bdf8' : '#a855f7';
        ctx.beginPath();
        ctx.arc(px, py, p.size * (isApproaching ? 1.2 : 0.85), 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // 5. PHOTON SPHERE RING (The ultra-bright razor sharp light orbit ring)
      ctx.save();
      const photonGrad = ctx.createRadialGradient(
        0,
        0,
        eventHorizonRadius * 0.98,
        0,
        0,
        photonRingRadius
      );
      photonGrad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
      photonGrad.addColorStop(0.2, 'rgba(147, 197, 253, 0.85)');
      photonGrad.addColorStop(0.5, 'rgba(192, 132, 252, 0.7)');
      photonGrad.addColorStop(0.85, 'rgba(99, 102, 241, 0.3)');
      photonGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.shadowBlur = 32 * currentParams.glowIntensity;
      ctx.shadowColor = '#60a5fa';
      ctx.fillStyle = photonGrad;
      ctx.beginPath();
      ctx.arc(0, 0, photonRingRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // 6. EVENT HORIZON (Absolute Black Void with slight dark edge falloff)
      ctx.save();
      ctx.shadowBlur = 40;
      ctx.shadowColor = '#000000';
      ctx.fillStyle = '#010103';
      ctx.beginPath();
      ctx.arc(0, 0, eventHorizonRadius, 0, Math.PI * 2);
      ctx.fill();

      // Inner shadow edge of the singularity
      const innerShadow = ctx.createRadialGradient(
        0,
        0,
        eventHorizonRadius * 0.7,
        0,
        0,
        eventHorizonRadius
      );
      innerShadow.addColorStop(0, '#000000');
      innerShadow.addColorStop(0.9, '#020205');
      innerShadow.addColorStop(1, 'rgba(56, 189, 248, 0.15)');
      ctx.fillStyle = innerShadow;
      ctx.beginPath();
      ctx.arc(0, 0, eventHorizonRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // 7. FOREGROUND ACCRETION DISK (Front hemisphere crossing in front of Event Horizon)
      ctx.save();
      ctx.beginPath();
      ctx.ellipse(0, 0, outerAccretionRadius, outerAccretionRadius * aspectY, 0, 0, Math.PI);
      const frontDiskGrad = ctx.createRadialGradient(0, 0, eventHorizonRadius, 0, 0, outerAccretionRadius);
      frontDiskGrad.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
      frontDiskGrad.addColorStop(0.15, 'rgba(56, 189, 248, 0.85)');
      frontDiskGrad.addColorStop(0.45, 'rgba(147, 51, 234, 0.75)');
      frontDiskGrad.addColorStop(0.75, 'rgba(79, 70, 229, 0.35)');
      frontDiskGrad.addColorStop(1, 'rgba(2, 6, 23, 0)');
      ctx.fillStyle = frontDiskGrad;
      ctx.shadowBlur = 24 * currentParams.glowIntensity;
      ctx.shadowColor = '#38bdf8';
      ctx.fill();
      ctx.restore();

      // 8. RELATIVISTIC JETS / MAGNETIC HARMONIC GLOW
      // Ethereal vertical energy filament column
      ctx.save();
      const jetGradTop = ctx.createLinearGradient(0, 0, 0, -height * 0.45);
      jetGradTop.addColorStop(0, 'rgba(147, 197, 253, 0.4)');
      jetGradTop.addColorStop(0.3, 'rgba(168, 85, 247, 0.25)');
      jetGradTop.addColorStop(0.7, 'rgba(56, 189, 248, 0.08)');
      jetGradTop.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = jetGradTop;
      ctx.beginPath();
      ctx.moveTo(-eventHorizonRadius * 0.25, 0);
      ctx.lineTo(eventHorizonRadius * 0.25, 0);
      ctx.lineTo(eventHorizonRadius * 0.7, -height * 0.45);
      ctx.lineTo(-eventHorizonRadius * 0.7, -height * 0.45);
      ctx.closePath();
      ctx.fill();

      // Bottom jet
      const jetGradBottom = ctx.createLinearGradient(0, 0, 0, height * 0.45);
      jetGradBottom.addColorStop(0, 'rgba(147, 197, 253, 0.4)');
      jetGradBottom.addColorStop(0.3, 'rgba(168, 85, 247, 0.25)');
      jetGradBottom.addColorStop(0.7, 'rgba(56, 189, 248, 0.08)');
      jetGradBottom.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = jetGradBottom;
      ctx.beginPath();
      ctx.moveTo(-eventHorizonRadius * 0.25, 0);
      ctx.lineTo(eventHorizonRadius * 0.25, 0);
      ctx.lineTo(eventHorizonRadius * 0.7, height * 0.45);
      ctx.lineTo(-eventHorizonRadius * 0.7, height * 0.45);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (interactive) {
        window.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseleave', handleMouseLeave);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, [scrollProgress, currentParams.spin, currentParams.particleDensity, currentParams.glowIntensity, currentParams.tiltAngle, interactive]);

  return (
    <canvas
      ref={canvasRef}
      id="hero-black-hole-canvas"
      className="w-full h-full block touch-none"
    />
  );
};
