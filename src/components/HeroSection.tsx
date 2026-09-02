import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowDown, Zap, Shield, Sparkles, Orbit, Radio, Box, Layers } from 'lucide-react';
import { ThreeBlackHoleHero } from './ThreeBlackHoleHero';
import { HeroBlackHoleCanvas } from './HeroBlackHoleCanvas';
import { BlackHoleParams } from '../types';

interface HeroSectionProps {
  scrollProgress: number;
  params: BlackHoleParams;
  onExploreDrive: () => void;
  onEnterpriseClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  scrollProgress,
  params,
  onExploreDrive,
  onEnterpriseClick,
}) => {
  const [use3DThree, setUse3DThree] = useState(true);

  return (
    <section
      id="hero-section"
      className="relative min-h-screen w-full flex flex-col items-center justify-between overflow-hidden pt-20 pb-12 bg-black"
    >
      {/* 3D WebGL Three.js Black Hole Engine Background / Stage */}
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        {use3DThree ? (
          <ThreeBlackHoleHero scrollProgress={scrollProgress} params={params} />
        ) : (
          <HeroBlackHoleCanvas scrollProgress={scrollProgress} params={params} />
        )}
      </div>

      {/* Deep Space radial vignette for cinematic contrast */}
      <div
        className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.6)_70%,#010104_100%)]"
        aria-hidden="true"
      />

      {/* Top Telemetry Floating Badge & Engine Switcher */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="relative z-10 pt-4 flex flex-wrap items-center justify-center gap-3"
      >
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-950/70 backdrop-blur-md border border-purple-500/30 text-xs font-mono text-slate-300 shadow-[0_0_20px_rgba(147,51,234,0.2)]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
          </span>
          <span className="text-cyan-300 font-semibold tracking-wider">3D KERR SINGULARITY</span>
          <span className="text-slate-600">|</span>
          <span className="text-purple-300">HAWKING FLUX ACTIVE</span>
          <span className="text-slate-600">|</span>
          <span className="text-emerald-400">STABILITY 99.999%</span>
        </div>

        <button
          onClick={() => setUse3DThree(!use3DThree)}
          className="px-3 py-1 rounded-full bg-slate-950/80 border border-slate-800 text-[11px] font-mono text-slate-400 hover:text-cyan-300 hover:border-cyan-500/50 transition-all flex items-center gap-1.5"
        >
          <Box className="w-3 h-3 text-cyan-400" />
          <span>{use3DThree ? 'RENDER: 3D THREE.JS (INTERACTIVE)' : 'RENDER: 2D RELATIVISTIC'}</span>
        </button>
      </motion.div>

      {/* Main Center Typography & Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center my-auto flex flex-col items-center">
        {/* Sub-headline / Eyebrow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mb-3"
        >
          <span className="text-xs sm:text-sm font-mono tracking-[0.3em] uppercase text-cyan-400 font-semibold bg-cyan-950/40 px-3.5 py-1 rounded-full border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.25)]">
            Theoretical Astrophysical Propulsion & Power
          </span>
        </motion.div>

        {/* Primary Title */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6 }}
          className="font-['Cinzel',serif] text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.05] text-white drop-shadow-[0_0_45px_rgba(168,85,247,0.45)]"
        >
          ENERGY WITHOUT{' '}
          <span className="bg-gradient-to-r from-cyan-400 via-purple-300 to-indigo-400 bg-clip-text text-transparent">
            BOUNDARIES.
          </span>
        </motion.h1>

        {/* Supporting Narrative */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="mt-6 text-lg sm:text-xl md:text-2xl font-['Space_Grotesk',sans-serif] text-slate-300 max-w-2xl font-light leading-relaxed drop-shadow-md"
        >
          Exploring the future of extreme-energy physics.
        </motion.p>

        {/* Action Buttons as requested: 🔵 EXPLORE THE DRIVE / 🟣 FOR ENTERPRISE */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
        >
          {/* 🔵 EXPLORE THE DRIVE */}
          <button
            id="hero-explore-btn"
            onClick={onExploreDrive}
            className="w-full sm:w-auto group relative px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-700 hover:from-blue-500 hover:to-cyan-400 text-white font-mono font-bold text-sm tracking-wider uppercase transition-all duration-300 shadow-[0_0_30px_rgba(56,189,248,0.5)] hover:shadow-[0_0_45px_rgba(56,189,248,0.8)] border border-cyan-300/40 active:scale-95"
          >
            <span className="relative z-10 flex items-center justify-center gap-2.5">
              <span className="text-cyan-200">🔵</span>
              <span>EXPLORE THE DRIVE</span>
            </span>
            <div className="absolute inset-0 rounded-2xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>

          {/* 🟣 FOR ENTERPRISE */}
          <button
            id="hero-enterprise-btn"
            onClick={onEnterpriseClick}
            className="w-full sm:w-auto group relative px-8 py-4 rounded-2xl bg-slate-950/80 hover:bg-purple-950/80 text-purple-200 hover:text-white font-mono font-bold text-sm tracking-wider uppercase transition-all duration-300 shadow-[0_0_25px_rgba(147,51,234,0.3)] hover:shadow-[0_0_40px_rgba(168,85,247,0.6)] border border-purple-500/50 hover:border-purple-400 active:scale-95 backdrop-blur-xl"
          >
            <span className="relative z-10 flex items-center justify-center gap-2.5">
              <span className="text-purple-300">🟣</span>
              <span>FOR ENTERPRISE</span>
            </span>
          </button>
        </motion.div>

        {/* Quick Spec Highlights */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.4 }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 w-full max-w-4xl"
        >
          <div className="p-3 sm:p-4 rounded-xl bg-slate-950/60 backdrop-blur-md border border-purple-900/40 text-center">
            <p className="text-[11px] font-mono text-slate-400">ENERGY DENSITY</p>
            <p className="text-base sm:text-lg font-mono font-bold text-cyan-300">10¹⁸ J/kg</p>
          </div>
          <div className="p-3 sm:p-4 rounded-xl bg-slate-950/60 backdrop-blur-md border border-purple-900/40 text-center">
            <p className="text-[11px] font-mono text-slate-400">PENROSE EFFICIENCY</p>
            <p className="text-base sm:text-lg font-mono font-bold text-purple-300">&gt; 120.7%</p>
          </div>
          <div className="p-3 sm:p-4 rounded-xl bg-slate-950/60 backdrop-blur-md border border-purple-900/40 text-center">
            <p className="text-[11px] font-mono text-slate-400">EMISSIONS</p>
            <p className="text-base sm:text-lg font-mono font-bold text-emerald-400">0.000 g/TW</p>
          </div>
          <div className="p-3 sm:p-4 rounded-xl bg-slate-950/60 backdrop-blur-md border border-purple-900/40 text-center">
            <p className="text-[11px] font-mono text-slate-400">KERR ROTATION</p>
            <p className="text-base sm:text-lg font-mono font-bold text-blue-400">a = 0.998 c</p>
          </div>
        </motion.div>
      </div>

      {/* Scroll Down Cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.6 }}
        className="relative z-10 flex flex-col items-center gap-2 cursor-pointer pt-4"
        onClick={onExploreDrive}
      >
        <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-slate-400">
          SCROLL TO INITIATE EVENT HORIZON TRANSITION
        </span>
        <div className="w-6 h-10 rounded-full border border-purple-500/50 flex items-start justify-center p-1 bg-slate-950/50">
          <motion.div
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#38bdf8]"
          />
        </div>
      </motion.div>
    </section>
  );
};
