import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Sparkles, Activity, ShieldCheck, Cpu, ArrowUpRight } from 'lucide-react';
import { cosmicAudio } from '../utils/audio';

interface NavbarProps {
  onOpenEnterpriseModal: () => void;
  onOpenPhysicsLab: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenEnterpriseModal,
  onOpenPhysicsLab,
}) => {
  const [isAudioActive, setIsAudioActive] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    const active = cosmicAudio.toggle();
    setIsAudioActive(active);
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      id="main-nav"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#030308]/85 backdrop-blur-xl border-b border-purple-900/30 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.8)]'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand / Logo */}
        <div
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="relative w-9 h-9 rounded-full bg-gradient-to-tr from-purple-700 via-indigo-600 to-cyan-400 p-[1.5px] shadow-[0_0_20px_rgba(56,189,248,0.4)] group-hover:scale-105 transition-transform">
            <div className="w-full h-full rounded-full bg-[#030308] flex items-center justify-center relative overflow-hidden">
              {/* Spinning micro-singularity inside logo */}
              <div className="w-3.5 h-3.5 rounded-full bg-black border border-cyan-400/80 shadow-[0_0_8px_#38bdf8]" />
              <div className="absolute inset-0 border border-purple-500/40 rounded-full animate-spin [animation-duration:6s]" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-['Cinzel',serif] tracking-wider text-base font-bold bg-gradient-to-r from-slate-100 via-purple-200 to-cyan-300 bg-clip-text text-transparent">
                SINGULARIS
              </span>
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-purple-950/80 border border-purple-700/60 text-purple-300">
                DRIVE
              </span>
            </div>
            <p className="text-[10px] font-mono text-slate-400 tracking-tight hidden sm:block">
              THEORETICAL EXTREME-ENERGY PHYSICS
            </p>
          </div>
        </div>

        {/* Center Quick Navigation Anchors */}
        <nav className="hidden xl:flex items-center gap-5 text-xs font-mono tracking-wider uppercase text-slate-300">
          <button
            onClick={() => scrollTo('hero-section')}
            className="hover:text-cyan-300 transition-colors py-1 relative group"
          >
            01 // 3D Core
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-400 transition-all group-hover:w-full" />
          </button>
          <button
            onClick={() => scrollTo('problem-section')}
            className="hover:text-cyan-300 transition-colors py-1 relative group"
          >
            02 // The Problem
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-400 transition-all group-hover:w-full" />
          </button>
          <button
            onClick={() => scrollTo('spacetime-section')}
            className="hover:text-cyan-300 transition-colors py-1 relative group"
          >
            03 // Spacetime 3D
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-400 transition-all group-hover:w-full" />
          </button>
          <button
            onClick={() => scrollTo('concept-section')}
            className="hover:text-cyan-300 transition-colors py-1 relative group"
          >
            04 // Model v4.2
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-400 transition-all group-hover:w-full" />
          </button>
          <button
            onClick={() => scrollTo('hardware-section')}
            className="hover:text-cyan-300 transition-colors py-1 relative group"
          >
            05 // 3D Hardware
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-400 transition-all group-hover:w-full" />
          </button>
          <button
            onClick={() => scrollTo('enterprise-section')}
            className="hover:text-cyan-300 transition-colors py-1 relative group"
          >
            06 // Enterprise Grid
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-400 transition-all group-hover:w-full" />
          </button>
          <button
            onClick={() => scrollTo('buy-section')}
            className="text-cyan-300 hover:text-white transition-colors py-1 relative group font-bold"
          >
            07 // Buy Energy
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-cyan-400" />
          </button>
        </nav>

        {/* Action Controls & Sound Toggle */}
        <div className="flex items-center gap-3">
          {/* Cosmic Audio Ambience Synth */}
          <button
            id="audio-toggle-btn"
            onClick={toggleSound}
            aria-label={isAudioActive ? 'Mute cosmic sound' : 'Unmute cosmic sound'}
            title={isAudioActive ? 'Mute Deep Space Synthesizer' : 'Listen to Deep Space Drone'}
            className={`p-2 rounded-xl text-xs font-mono flex items-center gap-1.5 transition-all border ${
              isAudioActive
                ? 'bg-purple-900/40 text-cyan-300 border-cyan-500/50 shadow-[0_0_15px_rgba(56,189,248,0.3)]'
                : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border-slate-800'
            }`}
          >
            {isAudioActive ? (
              <>
                <Volume2 className="w-4 h-4 text-cyan-400 animate-pulse" />
                <span className="hidden sm:inline text-[11px]">AUDIO ON</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 text-slate-400" />
                <span className="hidden sm:inline text-[11px]">AUDIO</span>
              </>
            )}
          </button>

          {/* Physics Sandbox Lab Trigger */}
          <button
            id="open-lab-btn"
            onClick={onOpenPhysicsLab}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono bg-slate-900/80 hover:bg-slate-850 text-purple-300 border border-purple-500/30 hover:border-purple-400 transition-all shadow-[0_0_12px_rgba(168,85,247,0.15)]"
          >
            <Cpu className="w-3.5 h-3.5 text-purple-400" />
            <span>PHYSICS LAB</span>
          </button>

          {/* Buy Energy CTA button */}
          <button
            id="nav-buy-cta"
            onClick={() => scrollTo('buy-section')}
            className="relative group px-4 py-2 rounded-xl text-xs font-semibold tracking-wide uppercase overflow-hidden transition-all bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white shadow-[0_0_20px_rgba(6,182,212,0.4)] border border-cyan-400/40"
          >
            <span className="relative z-10 flex items-center gap-1.5 font-mono">
              <span>BUY ENERGY</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </button>
        </div>
      </div>
    </header>
  );
};
