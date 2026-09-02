import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Building2, ShieldCheck, CheckCircle, Zap, Cpu, Sparkles, Send } from 'lucide-react';
import confetti from 'canvas-confetti';
import { cosmicAudio } from '../utils/audio';

interface EnterpriseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EnterpriseModal: React.FC<EnterpriseModalProps> = ({ isOpen, onClose }) => {
  const [companyName, setCompanyName] = useState('Global Telecom Infrastructure');
  const [contactEmail, setContactEmail] = useState('grid-procurement@global-telecom.net');
  const [loadRequirement, setLoadRequirement] = useState('25.0 GW Continuous (National 5G/6G & AI Cloud)');
  const [region, setRegion] = useState('North America & Europe Tier-1 Hub');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      cosmicAudio.playPulse(680);
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#38bdf8', '#c084fc', '#818cf8'],
        });
      } catch {
        // Safe fallback
      }
    }, 1200);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
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
          className="absolute inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative z-10 w-full max-w-xl bg-[#080814] border border-cyan-500/40 rounded-3xl p-6 sm:p-8 shadow-[0_0_60px_rgba(6,182,212,0.3)] overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-purple-900/40">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-cyan-950/80 border border-cyan-800 text-cyan-300">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-['Cinzel',serif] text-xl font-bold text-white">
                  ENTERPRISE NODE PROVISIONING
                </h3>
                <p className="text-xs font-mono text-cyan-400">
                  BLACK HOLE DRIVE • DEDICATED GIGA/TERAWATT FEED
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

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="mt-6 space-y-4 font-mono text-xs">
              <div>
                <label className="block text-slate-300 mb-1.5 font-semibold">
                  ENTERPRISE / ORGANIZATION:
                </label>
                <input
                  type="text"
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g. Global Telecom, Cloud Hyperscaler, National Grid"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-400 focus:outline-none text-slate-100 transition-colors"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1.5 font-semibold">
                  INFRASTRUCTURE LEAD EMAIL:
                </label>
                <input
                  type="email"
                  required
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="grid-architect@enterprise.com"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-400 focus:outline-none text-slate-100 transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 mb-1.5 font-semibold">
                    ESTIMATED POWER SCALE:
                  </label>
                  <select
                    value={loadRequirement}
                    onChange={(e) => setLoadRequirement(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-400 focus:outline-none text-slate-100 text-xs"
                  >
                    <option value="5.0 GW (Regional Telecom Backbone)">5.0 GW (Regional Telecom)</option>
                    <option value="25.0 GW Continuous (National 5G/6G & AI Cloud)">25.0 GW (National 5G/6G & AI Cloud)</option>
                    <option value="50.0 GW (Hyperscale AI Supercluster)">50.0 GW (Hyperscale AI Supercluster)</option>
                    <option value="100.0+ GW (Metropolitan Grid Interconnect)">100.0+ GW (Metropolitan Grid)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 mb-1.5 font-semibold">
                    DEPLOYMENT REGION:
                  </label>
                  <select
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-400 focus:outline-none text-slate-100 text-xs"
                  >
                    <option value="Middle East & North Africa (UAE Hub)">MENA (UAE Hub)</option>
                    <option value="North America Grid Interconnect">North America</option>
                    <option value="European Supergrid Backbone">European Supergrid</option>
                    <option value="Asia-Pacific Data Corridors">Asia-Pacific</option>
                  </select>
                </div>
              </div>

              {/* Speculative Guarantees Box */}
              <div className="p-3.5 rounded-xl bg-purple-950/40 border border-purple-800/40 space-y-1.5">
                <div className="flex items-center gap-2 text-cyan-300 text-[11px] font-bold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>SINGULARIS ENTERPRISE SLA PROTOCOL</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                  Zero blackouts, vacuum magnetic containment isolation, zero carbon footprint, and theoretical Penrose superradiant yields above 120.7%.
                </p>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-4 rounded-xl font-mono text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white shadow-[0_0_25px_rgba(6,182,212,0.4)] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Cpu className="w-4 h-4 animate-spin text-cyan-300" />
                      <span>COMPUTING KERR METRIC COUPLING...</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 text-cyan-300" />
                      <span>INITIALIZE PROVISIONING REQUEST</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          ) : (
            <div className="mt-8 text-center space-y-4 font-mono">
              <div className="w-16 h-16 rounded-full bg-cyan-950/80 border border-cyan-400 flex items-center justify-center mx-auto text-cyan-300 shadow-[0_0_30px_#38bdf8]">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h4 className="font-['Cinzel',serif] text-2xl font-bold text-white">
                ENTERPRISE NODE SIMULATED
              </h4>
              <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                A theoretical micro-singularity containment blueprint has been generated for{' '}
                <span className="text-cyan-300 font-bold">{companyName}</span> ({region}).
              </p>
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-left text-xs space-y-1 text-slate-400">
                <p>• Node Assigned: <span className="text-purple-300">SINGULARIS-KERR-GLOBAL-01</span></p>
                <p>• Output Capacity: <span className="text-cyan-300">{loadRequirement}</span></p>
                <p>• Status: <span className="text-emerald-400">CONTAINMENT TORUS LOCKED (STABLE)</span></p>
              </div>
              <button
                onClick={handleReset}
                className="mt-4 px-6 py-2.5 rounded-xl text-xs font-mono font-bold bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 transition-colors"
              >
                CLOSE TERMINAL
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
