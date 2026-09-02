import React, { useEffect, useRef, useState } from 'react';
import { Shield, Sparkles, Orbit, Radio, Zap, Layers } from 'lucide-react';

export type PhysicsMode = 'penrose' | 'hawking' | 'ergosphere' | 'jets';

interface ConceptVisualizerProps {
  activeMode?: PhysicsMode;
  onModeChange?: (mode: PhysicsMode) => void;
}

export const ConceptVisualizer: React.FC<ConceptVisualizerProps> = ({
  activeMode: controlledMode,
  onModeChange,
}) => {
  const [internalMode, setInternalMode] = useState<PhysicsMode>('penrose');
  const currentMode = controlledMode || internalMode;

  const handleSelectMode = (mode: PhysicsMode) => {
    setInternalMode(mode);
    onModeChange?.(mode);
  };

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 500);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 500);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || 500;
      height = canvas.height = canvas.parentElement?.clientHeight || 500;
    };

    window.addEventListener('resize', handleResize);

    // Mode-specific simulated particle packets
    interface EnergyWave {
      x: number;
      y: number;
      vx: number;
      vy: number;
      energy: number;
      type: 'infalling' | 'escaped' | 'hawking-positive' | 'hawking-negative' | 'jet-stream';
      size: number;
      life: number;
      maxLife: number;
    }

    const energyParticles: EnergyWave[] = [];

    const spawnParticles = () => {
      if (energyParticles.length > 80) return;
      const r = Math.min(width, height) * 0.22;
      const angle = Math.random() * Math.PI * 2;

      if (currentMode === 'penrose') {
        // Particles entering Ergosphere and splitting into negative mass infalling + amplified positive escaping
        const startX = width * 0.5 + Math.cos(angle) * (r * 1.8);
        const startY = height * 0.5 + Math.sin(angle) * (r * 1.8);
        const targetX = width * 0.5 + Math.cos(angle + 0.5) * (r * 1.1);
        const targetY = height * 0.5 + Math.sin(angle + 0.5) * (r * 1.1);
        const dx = targetX - startX;
        const dy = targetY - startY;
        const len = Math.hypot(dx, dy) || 1;

        energyParticles.push({
          x: startX,
          y: startY,
          vx: (dx / len) * 2.2,
          vy: (dy / len) * 2.2,
          energy: 100,
          type: 'infalling',
          size: 3,
          life: 0,
          maxLife: 180,
        });
      } else if (currentMode === 'hawking') {
        // Virtual particle pairs created near event horizon
        const ehX = width * 0.5 + Math.cos(angle) * (r * 0.98);
        const ehY = height * 0.5 + Math.sin(angle) * (r * 0.98);

        // Positive Hawking photon escapes
        energyParticles.push({
          x: ehX,
          y: ehY,
          vx: Math.cos(angle) * 2.8,
          vy: Math.sin(angle) * 2.8,
          energy: 140,
          type: 'hawking-positive',
          size: 2.8,
          life: 0,
          maxLife: 150,
        });

        // Negative virtual particle falls into singularity
        energyParticles.push({
          x: ehX,
          y: ehY,
          vx: -Math.cos(angle) * 1.4,
          vy: -Math.sin(angle) * 1.4,
          energy: -50,
          type: 'hawking-negative',
          size: 2.0,
          life: 0,
          maxLife: 60,
        });
      } else if (currentMode === 'jets') {
        // Relativistic magnetic jet ejection along polar axes
        const isNorth = Math.random() > 0.5;
        const jetY = height * 0.5 + (isNorth ? -r * 0.5 : r * 0.5);
        energyParticles.push({
          x: width * 0.5 + (Math.random() - 0.5) * 16,
          y: jetY,
          vx: (Math.random() - 0.5) * 0.8,
          vy: isNorth ? -3.8 - Math.random() * 2 : 3.8 + Math.random() * 2,
          energy: 220,
          type: 'jet-stream',
          size: 3.2,
          life: 0,
          maxLife: 120,
        });
      }
    };

    let frame = 0;
    let rotation = 0;

    const render = () => {
      frame++;
      rotation += 0.015;
      ctx.clearRect(0, 0, width, height);

      const centerX = width * 0.5;
      const centerY = height * 0.5;
      const baseR = Math.min(width, height) * 0.22;
      const eventHorizonR = baseR * 0.85;
      const ergosphereR = baseR * 1.45;

      if (frame % 8 === 0) {
        spawnParticles();
      }

      // 1. ERGOSPHERE BOUNDARY (Static Limit)
      ctx.save();
      ctx.translate(centerX, centerY);

      // Ergosphere oblate spheroid glow
      const ergoGrad = ctx.createRadialGradient(0, 0, eventHorizonR, 0, 0, ergosphereR);
      if (currentMode === 'ergosphere' || currentMode === 'penrose') {
        ergoGrad.addColorStop(0, 'rgba(147, 51, 234, 0.45)');
        ergoGrad.addColorStop(0.6, 'rgba(56, 189, 248, 0.25)');
        ergoGrad.addColorStop(1, 'rgba(30, 58, 138, 0.05)');
      } else {
        ergoGrad.addColorStop(0, 'rgba(147, 51, 234, 0.2)');
        ergoGrad.addColorStop(0.8, 'rgba(59, 130, 246, 0.05)');
        ergoGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      }

      ctx.fillStyle = ergoGrad;
      ctx.beginPath();
      ctx.ellipse(0, 0, ergosphereR * 1.15, ergosphereR * 0.85, 0, 0, Math.PI * 2);
      ctx.fill();

      // Ergosphere boundary dashed line
      ctx.strokeStyle = currentMode === 'ergosphere' ? '#38bdf8' : 'rgba(147, 197, 253, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 6]);
      ctx.beginPath();
      ctx.ellipse(0, 0, ergosphereR * 1.15, ergosphereR * 0.85, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();

      // 2. MAGNETIC FIELD LINES (Blandford-Znajek Process)
      if (currentMode === 'jets' || currentMode === 'ergosphere') {
        ctx.save();
        ctx.translate(centerX, centerY);
        for (let m = 0; m < 6; m++) {
          const mAngle = (m * Math.PI) / 3 + rotation * 0.5;
          ctx.strokeStyle = 'rgba(192, 132, 252, 0.35)';
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          const p1x = Math.cos(mAngle) * eventHorizonR;
          const p1y = Math.sin(mAngle) * eventHorizonR;
          const cp1x = Math.cos(mAngle) * ergosphereR * 1.8;
          const cp1y = mAngle > 0 && mAngle < Math.PI ? -baseR * 2.5 : baseR * 2.5;
          const p2x = 0;
          const p2y = mAngle > 0 && mAngle < Math.PI ? -height * 0.48 : height * 0.48;

          ctx.moveTo(p1x, p1y);
          ctx.quadraticCurveTo(cp1x, cp1y, p2x, p2y);
          ctx.stroke();
        }
        ctx.restore();
      }

      // 3. DRAW PARTICLES & ENERGY EXTRACTION TRAJECTORIES
      for (let i = energyParticles.length - 1; i >= 0; i--) {
        const p = energyParticles[i];
        p.life++;
        p.x += p.vx;
        p.y += p.vy;

        // In Penrose mode: particle splits inside ergosphere
        if (currentMode === 'penrose' && p.type === 'infalling') {
          const distToCenter = Math.hypot(p.x - centerX, p.y - centerY);
          if (distToCenter < ergosphereR * 1.05 && p.life > 20) {
            // Split into positive escaped packet (boosted to 129% energy) and negative absorbed packet
            energyParticles.push({
              x: p.x,
              y: p.y,
              vx: (p.x - centerX) * 0.05 + 1.8,
              vy: (p.y - centerY) * 0.05 - 1.2,
              energy: 129,
              type: 'escaped',
              size: 3.5,
              life: 0,
              maxLife: 100,
            });

            energyParticles.push({
              x: p.x,
              y: p.y,
              vx: (centerX - p.x) * 0.04,
              vy: (centerY - p.y) * 0.04,
              energy: -29,
              type: 'infalling',
              size: 2.0,
              life: 0,
              maxLife: 40,
            });

            energyParticles.splice(i, 1);
            continue;
          }
        }

        const alpha = Math.max(0, 1 - p.life / p.maxLife);
        ctx.save();
        ctx.globalAlpha = alpha;

        if (p.type === 'escaped') {
          ctx.fillStyle = '#38bdf8';
          ctx.shadowBlur = 12;
          ctx.shadowColor = '#38bdf8';
        } else if (p.type === 'hawking-positive') {
          ctx.fillStyle = '#c084fc';
          ctx.shadowBlur = 10;
          ctx.shadowColor = '#c084fc';
        } else if (p.type === 'hawking-negative') {
          ctx.fillStyle = '#ef4444';
          ctx.shadowBlur = 8;
          ctx.shadowColor = '#ef4444';
        } else if (p.type === 'jet-stream') {
          ctx.fillStyle = '#67e8f9';
          ctx.shadowBlur = 14;
          ctx.shadowColor = '#06b6d4';
        } else {
          ctx.fillStyle = '#a855f7';
          ctx.shadowBlur = 6;
          ctx.shadowColor = '#a855f7';
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        if (p.life >= p.maxLife) {
          energyParticles.splice(i, 1);
        }
      }

      // 4. EVENT HORIZON & SINGULARITY CENTER
      ctx.save();
      ctx.translate(centerX, centerY);

      // Event horizon ring glow
      ctx.shadowBlur = 24;
      ctx.shadowColor = '#38bdf8';
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.85)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(0, 0, eventHorizonR, 0, Math.PI * 2);
      ctx.stroke();

      // Black Void
      ctx.fillStyle = '#010103';
      ctx.beginPath();
      ctx.arc(0, 0, eventHorizonR - 1, 0, Math.PI * 2);
      ctx.fill();

      // Singularity point
      ctx.fillStyle = '#ffffff';
      ctx.shadowBlur = 16;
      ctx.shadowColor = '#c084fc';
      ctx.beginPath();
      ctx.arc(0, 0, 3, 0, Math.PI * 2);
      ctx.fill();

      // Coordinate axes & quantum indicators
      ctx.strokeStyle = 'rgba(168, 85, 247, 0.3)';
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.moveTo(-baseR * 1.6, 0);
      ctx.lineTo(baseR * 1.6, 0);
      ctx.moveTo(0, -baseR * 1.6);
      ctx.lineTo(0, baseR * 1.6);
      ctx.stroke();

      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [currentMode]);

  return (
    <div className="relative w-full h-full flex flex-col rounded-2xl bg-[#090914]/80 backdrop-blur-xl border border-purple-500/30 shadow-[0_0_50px_rgba(147,51,234,0.15)] overflow-hidden">
      {/* Top Bar with Mode Switcher */}
      <div className="p-4 border-b border-purple-500/20 bg-slate-950/60 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-xs font-mono tracking-wider uppercase text-cyan-300 font-semibold">
            THEORETICAL MODEL v4.2 • KERR METRIC
          </span>
        </div>
        <div className="text-[11px] font-mono text-purple-300/80 px-2 py-0.5 rounded bg-purple-950/50 border border-purple-800/50">
          SPIN a = 0.998 c
        </div>
      </div>

      {/* Physics Canvas Stage */}
      <div className="relative flex-1 min-h-[380px] w-full flex items-center justify-center">
        <canvas ref={canvasRef} className="w-full h-full block" />

        {/* Floating Physics Legend */}
        <div className="absolute top-3 left-3 p-2.5 rounded-xl bg-slate-950/80 backdrop-blur-md border border-slate-800 text-xs font-mono space-y-1.5 pointer-events-none">
          <div className="flex items-center gap-2 text-slate-300">
            <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
            <span>$r_+$ Event Horizon: 2GM/c²</span>
          </div>
          <div className="flex items-center gap-2 text-purple-300">
            <span className="w-2 h-2 rounded-full bg-purple-500"></span>
            <span>$r_E$ Ergosphere: Static Limit</span>
          </div>
          <div className="flex items-center gap-2 text-emerald-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>Superradiant Output: &gt;120%</span>
          </div>
        </div>

        {/* Live Physics Mode HUD Indicator */}
        <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-lg bg-purple-950/70 border border-purple-500/40 text-xs font-mono text-purple-200">
          ACTIVE PROCESS:{' '}
          <span className="text-cyan-300 font-bold uppercase">{currentMode}</span>
        </div>
      </div>

      {/* Mode Navigation Buttons */}
      <div className="p-3 bg-slate-950/80 border-t border-purple-500/20 grid grid-cols-2 sm:grid-cols-4 gap-2">
        <button
          id="mode-penrose-btn"
          onClick={() => handleSelectMode('penrose')}
          className={`px-3 py-2 rounded-xl text-xs font-medium font-mono flex items-center justify-center gap-1.5 transition-all ${
            currentMode === 'penrose'
              ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-[0_0_15px_rgba(6,182,212,0.4)] border border-cyan-400'
              : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800 hover:border-slate-700'
          }`}
        >
          <Zap className="w-3.5 h-3.5 text-cyan-400" />
          Penrose
        </button>

        <button
          id="mode-hawking-btn"
          onClick={() => handleSelectMode('hawking')}
          className={`px-3 py-2 rounded-xl text-xs font-medium font-mono flex items-center justify-center gap-1.5 transition-all ${
            currentMode === 'hawking'
              ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)] border border-purple-400'
              : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800 hover:border-slate-700'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          Hawking
        </button>

        <button
          id="mode-ergosphere-btn"
          onClick={() => handleSelectMode('ergosphere')}
          className={`px-3 py-2 rounded-xl text-xs font-medium font-mono flex items-center justify-center gap-1.5 transition-all ${
            currentMode === 'ergosphere'
              ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-[0_0_15px_rgba(99,102,241,0.4)] border border-indigo-400'
              : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800 hover:border-slate-700'
          }`}
        >
          <Orbit className="w-3.5 h-3.5 text-indigo-400" />
          Ergosphere
        </button>

        <button
          id="mode-jets-btn"
          onClick={() => handleSelectMode('jets')}
          className={`px-3 py-2 rounded-xl text-xs font-medium font-mono flex items-center justify-center gap-1.5 transition-all ${
            currentMode === 'jets'
              ? 'bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white shadow-[0_0_15px_rgba(217,70,239,0.4)] border border-fuchsia-400'
              : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800 hover:border-slate-700'
          }`}
        >
          <Radio className="w-3.5 h-3.5 text-pink-400" />
          B-Z Jets
        </button>
      </div>
    </div>
  );
};
