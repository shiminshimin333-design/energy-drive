import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sliders, RefreshCw, Sparkles, Orbit, Zap } from 'lucide-react';
import { BlackHoleParams } from '../types';

interface PhysicsLabModalProps {
  isOpen: boolean;
  onClose: () => void;
  params: BlackHoleParams;
  setParams: React.Dispatch<React.SetStateAction<BlackHoleParams>>;
}

export const PhysicsLabModal: React.FC<PhysicsLabModalProps> = ({
  isOpen,
  onClose,
  params,
  setParams,
}) => {
  if (!isOpen) return null;

  const handleReset = () => {
    setParams({
      mass: 1.0,
      spin: 0.94,
      accretionRate: 85,
      particleDensity: 240,
      tiltAngle: 0.28,
      glowIntensity: 1.2,
      colorScheme: 'cyan-purple',
    });
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative z-10 w-full max-w-2xl bg-[#090915] border border-purple-500/40 rounded-3xl p-6 sm:p-8 shadow-[0_0_60px_rgba(147,51,234,0.35)] overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-purple-900/40">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-purple-950/80 border border-purple-800 text-cyan-400">
                <Sliders className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-['Cinzel',serif] text-xl font-bold text-white">
                  ASTROPHYSICS SIMULATION LAB
                </h3>
                <p className="text-xs font-mono text-slate-400">
                  REAL-TIME RELATIVISTIC PARAMETERS CONTROL
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Sliders Grid */}
          <div className="mt-6 space-y-5 font-mono text-xs">
            {/* Kerr Spin parameter */}
            <div className="space-y-2 p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
              <div className="flex justify-between items-center">
                <span className="text-slate-300 font-semibold">KERR SPIN PARAMETER:</span>
                <span className="text-cyan-400 font-bold text-sm">{params.spin.toFixed(3)} c</span>
              </div>
              <input
                type="range"
                min="0.0"
                max="0.998"
                step="0.01"
                value={params.spin}
                onChange={(e) =>
                  setParams((prev) => ({ ...prev, spin: parseFloat(e.target.value) }))
                }
                className="w-full accent-cyan-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>0.0 (Schwarzschild)</span>
                <span>0.50 (Moderate)</span>
                <span>0.998 (Extremal Kerr Limit)</span>
              </div>
            </div>

            {/* Infalling Particle Suction Density */}
            <div className="space-y-2 p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
              <div className="flex justify-between items-center">
                <span className="text-slate-300 font-semibold">INFALLING PARTICLE DENSITY:</span>
                <span className="text-purple-400 font-bold text-sm">{params.particleDensity} PARTICLES</span>
              </div>
              <input
                type="range"
                min="60"
                max="450"
                step="10"
                value={params.particleDensity}
                onChange={(e) =>
                  setParams((prev) => ({ ...prev, particleDensity: parseInt(e.target.value, 10) }))
                }
                className="w-full accent-purple-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>60 (Sparse)</span>
                <span>240 (Standard)</span>
                <span>450 (Hyper-Dense Stream)</span>
              </div>
            </div>

            {/* Accretion Disk Glow Intensity */}
            <div className="space-y-2 p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
              <div className="flex justify-between items-center">
                <span className="text-slate-300 font-semibold">PHOTON RING GLOW INTENSITY:</span>
                <span className="text-blue-400 font-bold text-sm">{params.glowIntensity.toFixed(2)}x</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="2.2"
                step="0.1"
                value={params.glowIntensity}
                onChange={(e) =>
                  setParams((prev) => ({ ...prev, glowIntensity: parseFloat(e.target.value) }))
                }
                className="w-full accent-blue-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
              />
            </div>

            {/* 3D Disk Tilt Angle */}
            <div className="space-y-2 p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
              <div className="flex justify-between items-center">
                <span className="text-slate-300 font-semibold">ACCRETION DISK TILT ANGLE:</span>
                <span className="text-indigo-400 font-bold text-sm">{(params.tiltAngle * (180 / Math.PI)).toFixed(1)}°</span>
              </div>
              <input
                type="range"
                min="0.05"
                max="0.9"
                step="0.02"
                value={params.tiltAngle}
                onChange={(e) =>
                  setParams((prev) => ({ ...prev, tiltAngle: parseFloat(e.target.value) }))
                }
                className="w-full accent-indigo-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
              />
            </div>
          </div>

          {/* Footer Controls */}
          <div className="mt-8 pt-4 border-t border-purple-900/40 flex items-center justify-between">
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono text-slate-400 hover:text-white bg-slate-900/80 hover:bg-slate-850 border border-slate-800 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>RESET DEFAULTS</span>
            </button>

            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl text-xs font-mono font-bold bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white shadow-[0_0_20px_rgba(147,51,234,0.4)] transition-all"
            >
              APPLY TO SIMULATION
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
