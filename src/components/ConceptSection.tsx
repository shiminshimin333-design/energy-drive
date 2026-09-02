import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Zap,
  Radio,
  Orbit,
  Cpu,
  Layers,
  ShieldCheck,
  CheckCircle2,
  Atom,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { ConceptVisualizer, PhysicsMode } from './ConceptVisualizer';
import { PhysicsStep } from '../types';

interface ConceptSectionProps {
  onOpenEnterpriseModal: () => void;
}

export const ConceptSection: React.FC<ConceptSectionProps> = ({ onOpenEnterpriseModal }) => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [physicsMode, setPhysicsMode] = useState<PhysicsMode>('penrose');

  const steps: PhysicsStep[] = [
    {
      stepNumber: '01',
      title: 'Micro Singularity Containment & Magnetic Torus Trap',
      tag: 'Kugelblitz Genesis',
      formula: 'r_s = \\frac{2GM}{c^2} \\approx 10^{-18} \\text{ m}',
      description:
        'A synthetic micro black hole generated via ultra-relativistic laser compression (Kugelblitz). Held securely in absolute vacuum suspension inside a superconducting magnetic quadrupole torus trap.',
      keyAspects: [
        'Zero mass leakage through active magnetic levitation',
        'Quark-gluon plasma barrier shielding',
        'Sub-femtometer stabilization feedback loop',
      ],
      color: 'cyan',
    },
    {
      stepNumber: '02',
      title: 'Superradiant Penrose Scattering & Ergosphere Energy Extraction',
      tag: 'Kerr Frame Dragging',
      formula: '\\eta = 1 - \\sqrt{\\frac{1 + \\sqrt{1-a^2}}{2}} \\approx 120.7\\%',
      description:
        'Electromagnetic wave packets are injected into the rotating Ergosphere ($a = 0.998$). Through superradiant wave scattering, escaping packets extract rotational kinetic energy from the spacetime frame-dragging vortex with theoretical efficiency exceeding 120%.',
      keyAspects: [
        'Frame-dragging rotational kinetic harvesting',
        'Negative energy orbits sink into the event horizon',
        'Continuous spin-deceleration power coupling',
      ],
      color: 'purple',
    },
    {
      stepNumber: '03',
      title: 'Hawking Quantum Radiation Collector',
      tag: 'Quantum Evaporation',
      formula: 'P = \\frac{\\hbar c^6}{15360 \\pi G^2 M^2}',
      description:
        'Near the event horizon, virtual particle-antiparticle pairs split due to quantum tidal forces. Outgoing Hawking radiation in the hard gamma-ray spectrum is captured by parabolic resonant metamaterial photovoltaic arrays.',
      keyAspects: [
        'Subatomic pair production harnessing',
        'Direct gamma-to-electron quantum photovoltaic conversion',
        'Continuous replenishment via controlled matter ingestion',
      ],
      color: 'blue',
    },
    {
      stepNumber: '04',
      title: 'Enterprise Grid Coupling (Hyperscale & Global Infrastructure)',
      tag: 'Unlimited Clean Energy Source',
      formula: 'P_{net} \\ge 100 \\text{ TW continuous}',
      description:
        'Zero-loss high-temperature superconducting (HTS) busbars feed continuous, gigawatt/terawatt-scale clean energy directly to critical telecom backbones (5G/6G cell towers & data centers), hyperscale AI compute clusters, and smart city grids.',
      keyAspects: [
        'Zero carbon, zero nuclear waste, 100% uptime',
        'Dedicated high-capacity interconnects for telecom & datacenter infrastructure',
        'Decentralized or containerized enterprise installations',
      ],
      color: 'emerald',
    },
  ];

  const handleStepClick = (index: number) => {
    setActiveStep(index);
    if (index === 0) setPhysicsMode('ergosphere');
    if (index === 1) setPhysicsMode('penrose');
    if (index === 2) setPhysicsMode('hawking');
    if (index === 3) setPhysicsMode('jets');
  };

  return (
    <section
      id="concept-section"
      className="relative min-h-screen w-full bg-[#03030b] text-white py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 right-0 w-[550px] h-[550px] bg-purple-950/20 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-[550px] h-[550px] bg-cyan-950/20 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/60 border border-purple-800/60 text-xs font-mono text-purple-300 mb-4 shadow-[0_0_15px_rgba(168,85,247,0.2)]"
          >
            <span>🕳️ SECTION 03 // THE SPECULATIVE CONCEPT</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-['Cinzel',serif] font-bold tracking-tight text-white drop-shadow-md"
          >
            THE BLACK HOLE{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-indigo-300 bg-clip-text text-transparent">
              ENERGY DRIVE
            </span>
          </motion.h2>
        </div>

        {/* Two-Column Core Layout: Left Visualizer | Right Concept Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* LEFT: Theoretical Black Hole Animated Visualization */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="lg:col-span-6 flex flex-col"
          >
            <div className="flex-1 min-h-[460px] lg:min-h-[560px]">
              <ConceptVisualizer
                activeMode={physicsMode}
                onModeChange={(m) => setPhysicsMode(m)}
              />
            </div>
          </motion.div>

          {/* RIGHT: Speculative Energy Research Concept & Text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="lg:col-span-6 flex flex-col justify-between space-y-6"
          >
            {/* Concept Core Text Card */}
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-950/70 backdrop-blur-xl border border-purple-500/30 shadow-[0_0_35px_rgba(147,51,234,0.12)]">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-3 uppercase tracking-wider">
                <Atom className="w-4 h-4" />
                <span>Theoretical Physics & Extreme Thermodynamics</span>
              </div>

              {/* Exact user-requested text snippet */}
              <blockquote className="text-base sm:text-lg font-['Space_Grotesk'] text-slate-200 leading-relaxed font-light border-l-2 border-cyan-400 pl-4 py-1 italic">
                “The Black Hole Energy Drive explores theoretical physics concepts surrounding black holes, quantum effects, and Hawking radiation to imagine future pathways for extreme-energy research.”
              </blockquote>

              <p className="mt-4 text-sm font-['Space_Grotesk'] text-slate-400 leading-relaxed">
                By uniting Einstein’s General Relativity (Kerr metric frame dragging) with Hawking’s Quantum Field Theory in curved spacetime, we blueprint an infinite, continuous, non-emitting energy source engineered for modern enterprise infrastructure and telecom backbones like <span className="text-cyan-300 font-semibold">5G/6G hyperscale networks</span>.
              </p>

              {/* Theoretical Physics Verification Dossier */}
              <div className="mt-5 pt-4 border-t border-purple-900/40 flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-2 text-xs font-mono text-purple-300">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Theoretical Model v4.2 • Verified Kerr Metric Equations</span>
                </div>
                <div className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-300 bg-cyan-950/60 px-2.5 py-1 rounded-lg border border-cyan-800/60">
                  <span>η &gt; 120.7% SUPERRADIANT SCATTERING</span>
                </div>
              </div>
            </div>

            {/* Quick Enterprise Bridge CTA Banner */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-950/60 via-slate-950/70 to-cyan-950/60 border border-purple-500/30 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-mono text-cyan-300 font-bold uppercase">
                  UNLIMITED ENERGY SOURCE FOR ENTERPRISES
                </p>
                <p className="text-xs text-slate-400 mt-0.5">
                  Scalable power nodes for telecom operators, AI cloud farms, & heavy industry.
                </p>
              </div>
              <button
                onClick={onOpenEnterpriseModal}
                className="px-4 py-2 rounded-xl text-xs font-mono font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-all shadow-[0_0_15px_rgba(6,182,212,0.4)] whitespace-nowrap"
              >
                REQUEST AUDIT
              </button>
            </div>
          </motion.div>
        </div>

        {/* Animated 4 Steps Pipeline */}
        <div className="mt-20">
          <div className="text-center mb-10">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-cyan-400">
              PHYSICAL CONVERSION PIPELINE
            </span>
            <h3 className="text-2xl sm:text-3xl font-['Cinzel',serif] font-bold text-white mt-1">
              From Singularity to Enterprise Power
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {steps.map((step, idx) => {
              const isSelected = activeStep === idx;
              return (
                <motion.div
                  key={step.stepNumber}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                  onClick={() => handleStepClick(idx)}
                  className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 flex flex-col justify-between ${
                    isSelected
                      ? 'bg-slate-900/90 border-2 border-cyan-400 shadow-[0_0_30px_rgba(56,189,248,0.25)] -translate-y-1'
                      : 'bg-slate-950/60 border border-purple-900/40 hover:border-purple-500/50 hover:bg-slate-900/40'
                  }`}
                >
                  <div>
                    {/* Step Header */}
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                          isSelected
                            ? 'bg-cyan-400 text-slate-950'
                            : 'bg-purple-950 text-purple-300 border border-purple-800'
                        }`}
                      >
                        STEP {step.stepNumber}
                      </span>
                      <span className="text-[11px] font-mono text-slate-400">{step.tag}</span>
                    </div>

                    <h4 className="text-base font-bold font-['Space_Grotesk'] text-slate-100 mb-2 leading-snug">
                      {step.title}
                    </h4>

                    {/* Formula Pill */}
                    <div className="my-2 p-2 rounded-lg bg-black/50 border border-slate-800 font-mono text-xs text-cyan-300/90 overflow-x-auto">
                      {step.formula}
                    </div>

                    <p className="text-xs font-['Space_Grotesk'] text-slate-400 leading-relaxed mt-2">
                      {step.description}
                    </p>
                  </div>

                  {/* Highlights */}
                  <div className="mt-4 pt-3 border-t border-slate-900 space-y-1.5">
                    {step.keyAspects.map((aspect, aIdx) => (
                      <div key={aIdx} className="flex items-start gap-1.5 text-[11px] text-slate-300">
                        <CheckCircle2 className="w-3 h-3 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{aspect}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
