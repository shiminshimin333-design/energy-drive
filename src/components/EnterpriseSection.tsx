import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Building2,
  Radio,
  Cpu,
  Zap,
  ShieldCheck,
  Globe2,
  Activity,
  Layers,
  ArrowRight,
  TrendingDown,
  Sparkles,
  Server,
} from 'lucide-react';
import { useCountUp } from '../utils/counter';
import { EnterpriseArchetype } from '../types';

interface EnterpriseSectionProps {
  onOpenEnterpriseModal: () => void;
}

export const EnterpriseSection: React.FC<EnterpriseSectionProps> = ({ onOpenEnterpriseModal }) => {
  const [selectedArchetypeIndex, setSelectedArchetypeIndex] = useState(0);
  const [powerScaleGigaWatts, setPowerScaleGigaWatts] = useState(12.5);

  const archetypes: EnterpriseArchetype[] = [
    {
      id: 'telecom-carrier',
      name: 'Tier-1 & Global Telecom Infrastructure',
      entity: 'National & Global 5G/6G Carrier Network',
      badge: 'Telecom Network Case',
      description:
        'Powering hundreds of thousands of cell towers, terrestrial fibre repeater stations, satellite uplink gateways, and tier-IV edge computing data centers with 100% uninterrupted singularity power.',
      requiredPowerTeraWatts: 8.4,
      singularityMassMicroGrams: 420,
      efficiencyGain: '+99.999%',
      co2ReductionTons: '4,850,000 / yr',
      features: [
        'Decentralized Micro-Singularity Pods deployed at regional telco interchanges',
        'Zero grid latency with direct high-temperature superconducting (HTS) coupling',
        'Elimination of diesel backup generator logistics across remote towers',
      ],
    },
    {
      id: 'ai-hyperscale',
      name: 'Hyperscale AI Supercomputing Campuses',
      entity: 'Next-Gen 1,000,000 GPU Cluster Data Farms',
      badge: 'Compute Cluster Node',
      description:
        'Uncapped continuous electrical capacity delivering uninterrupted Terawatt feeds directly to gigawatt-scale liquid-cooled transformer inference campuses.',
      requiredPowerTeraWatts: 24.0,
      singularityMassMicroGrams: 1200,
      efficiencyGain: '+320.0%',
      co2ReductionTons: '12,400,000 / yr',
      features: [
        'Dedicated Singularity Drive enclosure on campus grounds',
        'Microsecond transient load compensation via magnetic flux buffers',
        'Pure DC bus architecture eliminating AC-DC transformer losses',
      ],
    },
    {
      id: 'planetary-grid',
      name: 'Metropolitan & Smart City Macro Grid',
      entity: 'National Megacity Grid Networks',
      badge: 'Grid Base Load',
      description:
        'Replacing entire coal, gas, and aging nuclear power plants with a clean, sub-femtometer footprint singularity generator delivering baseline energy to 20+ million residents.',
      requiredPowerTeraWatts: 65.0,
      singularityMassMicroGrams: 3250,
      efficiencyGain: '+850.0%',
      co2ReductionTons: '58,900,000 / yr',
      features: [
        'Zero-emissions continuous baseload operating 24/7/365 without refueling',
        'Fail-safe rapid magnetic decompression dissipation protocol',
        'Scalable output dynamically modulated via controlled laser infusion',
      ],
    },
  ];

  const currentArch = archetypes[selectedArchetypeIndex];

  // Animated Live Counters
  const countEnergyDelivered = useCountUp(142.8, 2000, 1);
  const countUptime = useCountUp(99.9999, 1800, 4);
  const countBarrelsSaved = useCountUp(48290, 2200, 0);

  return (
    <section
      id="enterprise-section"
      className="relative min-h-screen w-full bg-[#020208] text-white py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Glow rings & backdrop */}
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-cyan-950/20 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-purple-950/20 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-800/60 text-xs font-mono text-cyan-300 mb-4 shadow-[0_0_15px_rgba(6,182,212,0.2)]"
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>04 // ENTERPRISE & TELECOM DEPLOYMENT</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-3xl sm:text-5xl font-['Cinzel',serif] font-bold text-white tracking-tight"
          >
            UNLIMITED POWER FOR{' '}
            <span className="bg-gradient-to-r from-purple-400 via-indigo-300 to-cyan-400 bg-clip-text text-transparent">
              GLOBAL ENTERPRISE
            </span>
          </motion.h2>

          <p className="mt-4 text-slate-400 font-['Space_Grotesk'] text-base max-w-2xl mx-auto">
            Tailor-engineered for national telecom operators, critical cloud infrastructures, and high-density industrial corridors requiring guaranteed non-fluctuating clean energy.
          </p>
        </div>

        {/* Big Live Counting Telemetry Board */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16">
          {/* Stat 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-6 rounded-2xl bg-slate-950/70 backdrop-blur-xl border border-cyan-500/30 shadow-[0_0_25px_rgba(6,182,212,0.1)] relative overflow-hidden group"
          >
            <div className="flex items-center justify-between text-xs font-mono text-cyan-400 mb-2">
              <span>ENERGY OUTPUT</span>
              <Zap className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-3xl sm:text-4xl font-mono font-bold text-slate-100 tracking-tight">
              {countEnergyDelivered} <span className="text-lg text-cyan-300 font-normal">ExaJoules</span>
            </div>
            <p className="text-xs text-slate-400 mt-2 font-mono">Continuous baseline generation</p>
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
          </motion.div>

          {/* Stat 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="p-6 rounded-2xl bg-slate-950/70 backdrop-blur-xl border border-purple-500/30 shadow-[0_0_25px_rgba(168,85,247,0.1)] relative overflow-hidden group"
          >
            <div className="flex items-center justify-between text-xs font-mono text-purple-400 mb-2">
              <span>SYSTEM UPTIME</span>
              <Activity className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-3xl sm:text-4xl font-mono font-bold text-slate-100 tracking-tight">
              {countUptime}<span className="text-lg text-purple-300 font-normal">%</span>
            </div>
            <p className="text-xs text-slate-400 mt-2 font-mono">Zero refueling downtime</p>
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-purple-400 to-transparent" />
          </motion.div>

          {/* Stat 3 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="p-6 rounded-2xl bg-slate-950/70 backdrop-blur-xl border border-emerald-500/30 shadow-[0_0_25px_rgba(16,185,129,0.1)] relative overflow-hidden group"
          >
            <div className="flex items-center justify-between text-xs font-mono text-emerald-400 mb-2">
              <span>CARBON EMISSIONS</span>
              <TrendingDown className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-3xl sm:text-4xl font-mono font-bold text-emerald-400 tracking-tight">
              0.000 <span className="text-lg text-emerald-300 font-normal">g CO₂/kWh</span>
            </div>
            <p className="text-xs text-slate-400 mt-2 font-mono">Pure gravitational radiation</p>
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent" />
          </motion.div>

          {/* Stat 4 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="p-6 rounded-2xl bg-slate-950/70 backdrop-blur-xl border border-blue-500/30 shadow-[0_0_25px_rgba(59,130,246,0.1)] relative overflow-hidden group"
          >
            <div className="flex items-center justify-between text-xs font-mono text-blue-400 mb-2">
              <span>BARRELS SAVED / DAY</span>
              <Globe2 className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-3xl sm:text-4xl font-mono font-bold text-slate-100 tracking-tight">
              {countBarrelsSaved} <span className="text-lg text-blue-300 font-normal">k</span>
            </div>
            <p className="text-xs text-slate-400 mt-2 font-mono">Global fossil substitution</p>
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-400 to-transparent" />
          </motion.div>
        </div>

        {/* Interactive Archetype Selector & Simulator Card */}
        <div className="rounded-3xl bg-slate-950/80 backdrop-blur-2xl border border-purple-500/30 p-6 sm:p-10 shadow-[0_0_50px_rgba(147,51,234,0.15)]">
          {/* Top Tabs */}
          <div className="flex flex-wrap items-center gap-3 border-b border-purple-900/30 pb-6 mb-8">
            <span className="text-xs font-mono text-slate-400 mr-2 uppercase tracking-wider">
              ENTERPRISE DEPLOYMENT ARCHETYPE:
            </span>
            {archetypes.map((arch, idx) => (
              <button
                key={arch.id}
                onClick={() => setSelectedArchetypeIndex(idx)}
                className={`px-4 py-2 rounded-xl text-xs font-mono transition-all flex items-center gap-2 ${
                  selectedArchetypeIndex === idx
                    ? 'bg-gradient-to-r from-cyan-600 to-purple-600 text-white shadow-[0_0_15px_rgba(56,189,248,0.4)] border border-cyan-400'
                    : 'bg-slate-900/80 text-slate-300 hover:text-white border border-slate-800'
                }`}
              >
                {idx === 0 && <Radio className="w-3.5 h-3.5 text-cyan-300" />}
                {idx === 1 && <Server className="w-3.5 h-3.5 text-purple-300" />}
                {idx === 2 && <Building2 className="w-3.5 h-3.5 text-emerald-300" />}
                <span>{arch.name}</span>
              </button>
            ))}
          </div>

          {/* Archetype Details & Interactive Load Scaler */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Narrative */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-700/60 text-xs font-mono text-purple-300">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>{currentArch.badge}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-['Cinzel',serif] font-bold text-white">
                {currentArch.name}
              </h3>

              <p className="text-sm font-['Space_Grotesk'] text-slate-300 leading-relaxed">
                {currentArch.description}
              </p>

              <div className="space-y-2.5 pt-2">
                {currentArch.features.map((feat, fIdx) => (
                  <div key={fIdx} className="flex items-start gap-2.5 text-xs font-['Space_Grotesk'] text-slate-200">
                    <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              {/* Power Slider */}
              <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2 mt-4">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-slate-300">CONFIGURED CONTINUOUS FEED:</span>
                  <span className="text-cyan-300 font-bold text-sm">{powerScaleGigaWatts.toFixed(1)} GigaWatts</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={100}
                  step={0.5}
                  value={powerScaleGigaWatts}
                  onChange={(e) => setPowerScaleGigaWatts(parseFloat(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-500">
                  <span>1.0 GW (Base Hub)</span>
                  <span>50 GW (Metropolitan Grid)</span>
                  <span>100 GW (Full Planetary Array)</span>
                </div>
              </div>
            </div>

            {/* Right Telemetry Widget */}
            <div className="lg:col-span-5 p-6 rounded-2xl bg-[#090915] border border-purple-500/30 shadow-[0_0_30px_rgba(147,51,234,0.2)] space-y-4">
              <div className="flex items-center justify-between border-b border-purple-900/40 pb-3">
                <span className="text-xs font-mono text-slate-400">SPECULATIVE DEPLOYMENT METRICS</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div className="flex justify-between items-center p-2.5 rounded-lg bg-slate-950/80 border border-slate-800">
                  <span className="text-slate-400">Micro Singularity Mass:</span>
                  <span className="text-cyan-300 font-bold">
                    {(currentArch.singularityMassMicroGrams * (powerScaleGigaWatts / 12.5)).toFixed(1)} μg
                  </span>
                </div>

                <div className="flex justify-between items-center p-2.5 rounded-lg bg-slate-950/80 border border-slate-800">
                  <span className="text-slate-400">Calculated Hawking Flux:</span>
                  <span className="text-purple-300 font-bold">
                    {(powerScaleGigaWatts * 1.08).toFixed(2)} GW Thermal
                  </span>
                </div>

                <div className="flex justify-between items-center p-2.5 rounded-lg bg-slate-950/80 border border-slate-800">
                  <span className="text-slate-400">CO₂ Avoidance:</span>
                  <span className="text-emerald-400 font-bold">{currentArch.co2ReductionTons}</span>
                </div>

                <div className="flex justify-between items-center p-2.5 rounded-lg bg-slate-950/80 border border-slate-800">
                  <span className="text-slate-400">Grid Levelized Cost (LCOE):</span>
                  <span className="text-cyan-400 font-bold">$0.0004 / kWh</span>
                </div>
              </div>

              <button
                id="enterprise-provision-btn"
                onClick={onOpenEnterpriseModal}
                className="w-full mt-4 py-3 px-4 rounded-xl font-mono text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white shadow-[0_0_20px_rgba(147,51,234,0.4)] transition-all flex items-center justify-center gap-2"
              >
                <span>INITIATE ENTERPRISE PROVISIONING</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
