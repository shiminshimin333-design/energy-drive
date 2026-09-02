import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  CreditCard,
  Building2,
  Zap,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  TrendingDown,
  Sparkles,
  Server,
  Radio,
  Globe2,
  FileCheck2,
  Cpu,
  Download,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { cosmicAudio } from '../utils/audio';

interface CommercialBuySectionProps {
  onOpenEnterpriseModal: () => void;
}

export const CommercialBuySection: React.FC<CommercialBuySectionProps> = ({ onOpenEnterpriseModal }) => {
  const [selectedTier, setSelectedTier] = useState<'pod' | 'core' | 'macro'>('pod');
  const [billingModel, setBillingModel] = useState<'lease' | 'purchase'>('lease');
  const [customGigawatts, setCustomGigawatts] = useState<number>(10);
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState<boolean>(false);

  // Instant Checkout / Reservation Form State
  const [buyerName, setBuyerName] = useState('Global Telecom Infrastructure Group');
  const [buyerEmail, setBuyerEmail] = useState('grid-procurement@global-telecom.net');
  const [deploymentSite, setDeploymentSite] = useState('Tier-1 Hyperscale Node Alpha');
  const [isProcessingOrder, setIsProcessingOrder] = useState(false);
  const [allocatedCertificate, setAllocatedCertificate] = useState<string | null>(null);

  const tiers = [
    {
      id: 'pod',
      name: 'Micro-Singularity Pod',
      target: 'Telecom Operators & Edge Towers (5G/6G Networks)',
      basePowerGW: 5.0,
      monthlyLeaseMillions: 1.85,
      purchasePriceMillions: 140,
      footprint: '40-ft ISO Cryo-Containerized Module',
      uptime: '99.9999%',
      highlights: [
        'Direct 5.0 GW continuous clean baseload',
        'Eliminates diesel backup generators across 12,000+ cell towers',
        'Zero grid latency via High-Temperature Superconducting bus',
        '24/7 Automated vacuum magnetic containment telemetry',
      ],
      icon: Radio,
      badge: 'RECOMMENDED FOR TELECOM',
      badgeColor: 'border-cyan-400 text-cyan-300 bg-cyan-950/80',
    },
    {
      id: 'core',
      name: 'Enterprise Kugelblitz Core',
      target: 'AI Supercomputing Campuses & Hyperscale Cloud Farms',
      basePowerGW: 25.0,
      monthlyLeaseMillions: 5.2,
      purchasePriceMillions: 480,
      footprint: '200 m² Reinforced Campus Facility',
      uptime: '99.99999%',
      highlights: [
        '25.0 to 50.0 GW uninterrupted DC power feed',
        'Sub-microsecond transient load surge damping for GPU spikes',
        'Zero AC-DC transformer conversion losses',
        'Dedicated Singularis on-site quantum containment pit',
      ],
      icon: Server,
      badge: 'POPULAR FOR AI SUPERCLUSTERS',
      badgeColor: 'border-purple-400 text-purple-300 bg-purple-950/80',
    },
    {
      id: 'macro',
      name: 'Planetary Macro-Drive Array',
      target: 'Metropolitan Smart Cities & Heavy Industrial Corridors',
      basePowerGW: 100.0,
      monthlyLeaseMillions: 13.8,
      purchasePriceMillions: 1450,
      footprint: 'Multi-Quadrupole Grid Interconnect Facility',
      uptime: '100.000%',
      highlights: [
        '100.0+ GW municipal grid injection (Powers 25M+ residents)',
        'Replaces 80+ coal/gas generation stations permanently',
        'Zero carbon emissions, zero radioactive nuclear waste',
        'Direct integration with national transmission backbones',
      ],
      icon: Globe2,
      badge: 'PLANETARY BASELOAD SCALE',
      badgeColor: 'border-emerald-400 text-emerald-300 bg-emerald-950/80',
    },
  ];

  const currentTierData = tiers.find((t) => t.id === selectedTier) || tiers[0];

  // Financial ROI Calculations based on custom slider
  const annualEnergyDeliveredTWh = (customGigawatts * 8760) / 1000; // TWh/yr
  const traditionalGridCostBillions = (annualEnergyDeliveredTWh * 1e9 * 0.12) / 1e9; // at $0.12/kWh
  const singularisCostBillions =
    billingModel === 'lease'
      ? (currentTierData.monthlyLeaseMillions * (customGigawatts / currentTierData.basePowerGW) * 12) / 1000
      : (currentTierData.purchasePriceMillions * (customGigawatts / currentTierData.basePowerGW)) / 1000 / 20; // 20-yr amortized
  const annualSavingsBillions = Math.max(0.1, traditionalGridCostBillions - singularisCostBillions);
  const tenYearSavingsBillions = annualSavingsBillions * 10;
  const co2TonsSavedMillions = (annualEnergyDeliveredTWh * 0.42).toFixed(1);

  const handleStartPurchase = (tierId: 'pod' | 'core' | 'macro') => {
    setSelectedTier(tierId);
    const matched = tiers.find((t) => t.id === tierId);
    if (matched) {
      setCustomGigawatts(matched.basePowerGW);
    }
    setIsPurchaseModalOpen(true);
    cosmicAudio.playPulse(600);
  };

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessingOrder(true);
    cosmicAudio.playPulse(750);

    setTimeout(() => {
      setIsProcessingOrder(false);
      const serial = `SINGULARIS-${selectedTier.toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}-UAE`;
      setAllocatedCertificate(serial);
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#38bdf8', '#c084fc', '#34d399', '#f43f5e'],
        });
      } catch {
        // Safe fallback
      }
    }, 1400);
  };

  return (
    <section
      id="buy-section"
      className="relative min-h-screen w-full bg-[#020208] text-white py-24 px-4 sm:px-6 lg:px-8 overflow-hidden border-t border-purple-900/40"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/4 w-[650px] h-[650px] bg-cyan-950/20 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[650px] h-[650px] bg-purple-950/20 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-800/60 text-xs font-mono text-cyan-300 mb-4 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
            <CreditCard className="w-3.5 h-3.5" />
            <span>SLIDE 06 // ENTERPRISE COMMERCIAL PROCUREMENT</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-['Cinzel',serif] font-bold text-white tracking-tight">
            BUY UNLIMITED{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
              SINGULARIS ENERGY
            </span>
          </h2>

          <p className="mt-4 text-slate-300 font-['Space_Grotesk'] text-base max-w-2xl mx-auto">
            Procure dedicated continuous giga/terawatt clean power for your enterprise. Zero fuel costs, zero carbon emissions, and 100% uninterrupted baseload.
          </p>

          {/* Billing Switcher */}
          <div className="mt-8 inline-flex p-1.5 rounded-2xl bg-slate-950/90 border border-purple-500/30">
            <button
              onClick={() => setBillingModel('lease')}
              className={`px-5 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                billingModel === 'lease'
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              20-YEAR MANAGED SLA SUBSCRIPTION
            </button>
            <button
              onClick={() => setBillingModel('purchase')}
              className={`px-5 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                billingModel === 'purchase'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              OUTRIGHT CORE HARDWARE PURCHASE
            </button>
          </div>
        </div>

        {/* 3 Tier Purchase Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-16">
          {tiers.map((tier) => {
            const Icon = tier.icon;
            const isSelected = selectedTier === tier.id;
            return (
              <div
                key={tier.id}
                className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 relative overflow-hidden backdrop-blur-xl ${
                  isSelected
                    ? 'bg-slate-950/90 border-2 border-cyan-400 shadow-[0_0_40px_rgba(6,182,212,0.25)] -translate-y-2'
                    : 'bg-slate-950/60 border border-purple-900/40 hover:border-purple-500/40 hover:bg-slate-900/40'
                }`}
              >
                <div>
                  {/* Top Badge */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className={`text-[10px] font-mono px-2.5 py-1 rounded-full border ${tier.badgeColor}`}>
                      {tier.badge}
                    </span>
                    <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-cyan-300">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="font-['Cinzel',serif] text-xl sm:text-2xl font-bold text-white mb-1">
                    {tier.name}
                  </h3>

                  <p className="text-xs font-['Space_Grotesk'] text-slate-400 mb-6">
                    {tier.target}
                  </p>

                  {/* Pricing Header */}
                  <div className="p-4 rounded-2xl bg-black/50 border border-slate-800 mb-6 font-mono">
                    <div className="text-[11px] text-slate-400 uppercase">
                      {billingModel === 'lease' ? 'Monthly Managed SLA Lease' : 'Full Core Purchase (Turnkey)'}
                    </div>
                    <div className="text-3xl font-bold text-white mt-1 flex items-baseline gap-1">
                      <span className="text-cyan-400 font-sans">$</span>
                      {billingModel === 'lease'
                        ? `${tier.monthlyLeaseMillions}M`
                        : `${tier.purchasePriceMillions}M`}
                      <span className="text-xs text-slate-400 font-normal">
                        {billingModel === 'lease' ? '/ month' : 'one-time'}
                      </span>
                    </div>
                    <div className="text-xs text-purple-300 font-semibold mt-1">
                      Includes {tier.basePowerGW.toFixed(1)} GW continuous capacity
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="space-y-2.5 mb-6 text-xs font-['Space_Grotesk'] text-slate-300">
                    {tier.highlights.map((h, hIdx) => (
                      <div key={hIdx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-900 space-y-3">
                  <div className="flex justify-between text-[11px] font-mono text-slate-400">
                    <span>Footprint:</span>
                    <span className="text-slate-200">{tier.footprint}</span>
                  </div>
                  <div className="flex justify-between text-[11px] font-mono text-slate-400">
                    <span>Guaranteed Uptime:</span>
                    <span className="text-emerald-400 font-bold">{tier.uptime}</span>
                  </div>

                  <button
                    onClick={() => handleStartPurchase(tier.id as any)}
                    className="w-full py-3.5 px-4 rounded-xl font-mono text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all flex items-center justify-center gap-2"
                  >
                    <span>BUY / PROVISION {tier.name.toUpperCase()}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Custom Capacity & ROI Sizing Simulator */}
        <div className="rounded-3xl bg-slate-950/80 backdrop-blur-2xl border border-purple-500/30 p-6 sm:p-10 shadow-[0_0_50px_rgba(147,51,234,0.15)]">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4" />
            <span>CUSTOM GIGA/TERAWATT NODE CONFIGURATOR & FINANCIAL ROI CALCULATOR</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-['Cinzel',serif] font-bold text-white mb-6">
            Calculate Enterprise Savings vs. Fossil Fuel / Dirty Grid
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Custom Capacity Slider */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-slate-300">REQUESTED ENTERPRISE LOAD:</span>
                  <span className="text-cyan-300 font-bold text-lg">{customGigawatts.toFixed(1)} GigaWatts</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={150}
                  step={1}
                  value={customGigawatts}
                  onChange={(e) => setCustomGigawatts(parseFloat(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
                />
                <div className="flex justify-between text-[11px] font-mono text-slate-500">
                  <span>1 GW (Regional Switch)</span>
                  <span>25 GW (5G/6G Cloud Node)</span>
                  <span>150 GW (Full Megacity Grid)</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs font-mono space-y-2">
                <div className="flex justify-between text-slate-400">
                  <span>Annual Clean Energy Output:</span>
                  <span className="text-slate-200 font-bold">{annualEnergyDeliveredTWh.toFixed(1)} TWh / year</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Levelized Cost (LCOE):</span>
                  <span className="text-cyan-300 font-bold">$0.0004 / kWh</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Conventional Grid Comparison:</span>
                  <span className="text-slate-300">$0.1200 / kWh avg</span>
                </div>
              </div>
            </div>

            {/* Right: ROI Metrics Box */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-[#090915] border border-cyan-500/30 space-y-1 font-mono">
                <span className="text-[11px] text-cyan-400">ESTIMATED 10-YEAR SAVINGS</span>
                <div className="text-2xl sm:text-3xl font-bold text-white">
                  ${tenYearSavingsBillions.toFixed(2)}B
                </div>
                <p className="text-[11px] text-slate-400">Direct operational expenditure reduction</p>
              </div>

              <div className="p-5 rounded-2xl bg-[#090915] border border-emerald-500/30 space-y-1 font-mono">
                <span className="text-[11px] text-emerald-400">ANNUAL CO₂ DISPLACED</span>
                <div className="text-2xl sm:text-3xl font-bold text-emerald-300">
                  {co2TonsSavedMillions}M Tons
                </div>
                <p className="text-[11px] text-slate-400">100% emission-free radiation energy</p>
              </div>

              <div className="sm:col-span-2 pt-2">
                <button
                  onClick={() => handleStartPurchase(selectedTier)}
                  className="w-full py-4 px-6 rounded-2xl font-mono text-xs sm:text-sm font-bold uppercase tracking-wider bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white shadow-[0_0_25px_rgba(147,51,234,0.4)] transition-all flex items-center justify-center gap-2"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>SECURE SINGULARITY CORE ALLOCATION ({customGigawatts} GW)</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Direct Buy & Allocation Modal */}
      <AnimatePresence>
        {isPurchaseModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsPurchaseModalOpen(false)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative z-10 w-full max-w-2xl bg-[#080816] border border-cyan-500/40 rounded-3xl p-6 sm:p-8 shadow-[0_0_70px_rgba(6,182,212,0.3)] max-h-[90vh] overflow-y-auto"
            >
              {!allocatedCertificate ? (
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-purple-900/40">
                    <div>
                      <h3 className="font-['Cinzel',serif] text-xl font-bold text-white">
                        ORDER & PROVISION SINGULARIS CORE
                      </h3>
                      <p className="text-xs font-mono text-cyan-400 mt-0.5">
                        Selected Package: {currentTierData.name} ({customGigawatts} GW Feed)
                      </p>
                    </div>
                    <button
                      onClick={() => setIsPurchaseModalOpen(false)}
                      className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 transition-colors"
                    >
                      ✕
                    </button>
                  </div>

                  <form onSubmit={handleCompleteOrder} className="mt-6 space-y-4 font-mono text-xs">
                    <div>
                      <label className="block text-slate-300 mb-1 font-semibold">ENTERPRISE ENTITY:</label>
                      <input
                        type="text"
                        required
                        value={buyerName}
                        onChange={(e) => setBuyerName(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-400 focus:outline-none text-slate-100"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 mb-1 font-semibold">CHIEF INFRASTRUCTURE OFFICER EMAIL:</label>
                      <input
                        type="email"
                        required
                        value={buyerEmail}
                        onChange={(e) => setBuyerEmail(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-400 focus:outline-none text-slate-100"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 mb-1 font-semibold">FACILITY DEPLOYMENT SITE:</label>
                      <input
                        type="text"
                        required
                        value={deploymentSite}
                        onChange={(e) => setDeploymentSite(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-400 focus:outline-none text-slate-100"
                      />
                    </div>

                    <div className="p-4 rounded-xl bg-slate-950 border border-purple-800/40 space-y-2">
                      <div className="flex justify-between text-slate-300">
                        <span>Commercial Contract Type:</span>
                        <span className="text-cyan-300 font-bold uppercase">{billingModel === 'lease' ? '20-Year Managed SLA' : 'Direct Turnkey Purchase'}</span>
                      </div>
                      <div className="flex justify-between text-slate-300">
                        <span>Continuous Load Allocated:</span>
                        <span className="text-purple-300 font-bold">{customGigawatts} GigaWatts</span>
                      </div>
                      <div className="flex justify-between text-slate-300">
                        <span>Estimated Setup Period:</span>
                        <span className="text-emerald-400 font-bold">14 Days (Pre-stabilized Kugelblitz core)</span>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isProcessingOrder}
                      className="w-full py-4 px-6 rounded-xl font-mono text-xs sm:text-sm font-bold uppercase tracking-wider bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {isProcessingOrder ? (
                        <>
                          <Cpu className="w-4 h-4 animate-spin text-cyan-300" />
                          <span>SYNCHRONIZING QUANTUM ALLOCATION PROTOCOL...</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-cyan-300" />
                          <span>EXECUTE DIGITAL PURCHASE & ALLOCATE CORE</span>
                        </>
                      )}
                    </button>
                  </form>
                </div>
              ) : (
                <div className="text-center space-y-4 font-mono">
                  <div className="w-16 h-16 rounded-full bg-emerald-950/80 border border-emerald-400 flex items-center justify-center mx-auto text-emerald-300 shadow-[0_0_30px_#10b981]">
                    <FileCheck2 className="w-8 h-8" />
                  </div>

                  <h4 className="font-['Cinzel',serif] text-2xl font-bold text-white">
                    CORE ALLOCATION CONFIRMED
                  </h4>

                  <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                    A dedicated Singularis micro-singularity core has been reserved for{' '}
                    <span className="text-cyan-300 font-bold">{buyerName}</span>.
                  </p>

                  <div className="p-4 rounded-2xl bg-black/80 border border-cyan-500/40 text-left text-xs space-y-2">
                    <div className="flex justify-between text-slate-400">
                      <span>Allocation Serial Number:</span>
                      <span className="text-cyan-300 font-bold">{allocatedCertificate}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Allocated Baseload:</span>
                      <span className="text-purple-300 font-bold">{customGigawatts} GW continuous</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Deployment Site:</span>
                      <span className="text-slate-200">{deploymentSite}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Containment State:</span>
                      <span className="text-emerald-400 font-bold">VACUUM TORUS PRE-CHARGED</span>
                    </div>
                  </div>

                  <div className="pt-2 flex justify-center gap-3">
                    <button
                      onClick={() => setIsPurchaseModalOpen(false)}
                      className="px-6 py-2.5 rounded-xl text-xs font-mono font-bold bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 transition-colors"
                    >
                      CLOSE TERMINAL
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
