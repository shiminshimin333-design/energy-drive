import React from 'react';
import { motion } from 'motion/react';
import { AlertTriangle, Flame, BatteryWarning, TrendingUp, Sparkles, Zap, ArrowDown } from 'lucide-react';
import { useCountUp } from '../utils/counter';

export const ProblemSection: React.FC = () => {
  const yearsOilLeft = useCountUp(47, 2400, 0);
  const globalTeraWattDemand = useCountUp(28.4, 2000, 1);
  const aiEnergyMultiplier = useCountUp(340, 2200, 0);

  return (
    <section
      id="problem-section"
      className="relative min-h-screen w-full bg-[#020207] text-white py-28 px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center overflow-hidden"
    >
      {/* Background ambient radial glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-br from-purple-950/20 via-blue-950/20 to-transparent rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto w-full flex flex-col items-center">
        {/* Phase 0: Section Index */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-800 text-xs font-mono text-purple-400">
            <span>02 // THE GLOBAL PARADOX</span>
          </div>
        </motion.div>

        {/* Large Text Appears One Line at a Time */}
        <div className="text-center space-y-6 md:space-y-8 w-full">
          {/* Line 1: The world runs on limited energy. */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9 }}
          >
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-['Cinzel',serif] font-bold text-slate-100 tracking-tight">
              The world runs on <span className="text-red-400/90 underline decoration-red-500/40 underline-offset-8">limited energy.</span>
            </h2>
          </motion.div>

          {/* Three cascading problematic pillars */}
          <div className="pt-4 pb-2 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto">
            {/* Line 2: Fossil fuels */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="p-6 rounded-2xl bg-slate-950/60 backdrop-blur-xl border border-red-900/30 hover:border-red-500/50 transition-all duration-300 shadow-[0_0_30px_rgba(239,68,68,0.08)] group"
            >
              <div className="w-12 h-12 rounded-xl bg-red-950/60 border border-red-800/40 flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform">
                <Flame className="w-6 h-6 text-red-400" />
              </div>
              <h3 className="text-2xl font-bold font-['Space_Grotesk'] text-slate-100 mb-2">
                Fossil fuels.
              </h3>
              <p className="text-sm font-['Space_Grotesk'] text-slate-400 leading-relaxed">
                Chemical combustion yields only 0.0000001% mass-to-energy conversion ($E = mc^2$).
              </p>
              <div className="mt-4 pt-3 border-t border-slate-900 text-xs font-mono text-red-400/90 flex items-center justify-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>~{yearsOilLeft} Years Proven Reserves</span>
              </div>
            </motion.div>

            {/* Line 3: Finite resources */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="p-6 rounded-2xl bg-slate-950/60 backdrop-blur-xl border border-amber-900/30 hover:border-amber-500/50 transition-all duration-300 shadow-[0_0_30px_rgba(245,158,11,0.08)] group"
            >
              <div className="w-12 h-12 rounded-xl bg-amber-950/60 border border-amber-800/40 flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform">
                <BatteryWarning className="w-6 h-6 text-amber-400" />
              </div>
              <h3 className="text-2xl font-bold font-['Space_Grotesk'] text-slate-100 mb-2">
                Finite resources.
              </h3>
              <p className="text-sm font-['Space_Grotesk'] text-slate-400 leading-relaxed">
                Rare earth mineral bottlenecks, grid saturation, and solar/wind intermittent ceilings.
              </p>
              <div className="mt-4 pt-3 border-t border-slate-900 text-xs font-mono text-amber-400/90 flex items-center justify-center gap-1.5">
                <BatteryWarning className="w-3.5 h-3.5" />
                <span>Intermittent Capacity Factor &lt; 32%</span>
              </div>
            </motion.div>

            {/* Line 4: Rising demand */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="p-6 rounded-2xl bg-slate-950/60 backdrop-blur-xl border border-purple-900/30 hover:border-purple-500/50 transition-all duration-300 shadow-[0_0_30px_rgba(168,85,247,0.08)] group"
            >
              <div className="w-12 h-12 rounded-xl bg-purple-950/60 border border-purple-800/40 flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform">
                <TrendingUp className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold font-['Space_Grotesk'] text-slate-100 mb-2">
                Rising demand.
              </h3>
              <p className="text-sm font-['Space_Grotesk'] text-slate-400 leading-relaxed">
                Hyper-scale AI compute, global 6G telecom networks, and planetary electrification.
              </p>
              <div className="mt-4 pt-3 border-t border-slate-900 text-xs font-mono text-purple-400 flex items-center justify-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>+{aiEnergyMultiplier}% Compute Power Curve</span>
              </div>
            </motion.div>
          </div>

          {/* Glowing blue line animation that shoots across */}
          <div className="py-8 w-full flex items-center justify-center relative">
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 1.4, ease: 'easeInOut' }}
              className="w-full max-w-3xl h-[2.5px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_25px_#38bdf8]"
            />
            {/* Pulsating photon spark at center */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: [0, 1.8, 1] }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="absolute w-4 h-4 rounded-full bg-cyan-200 shadow-[0_0_20px_#38bdf8] flex items-center justify-center"
            >
              <div className="w-2 h-2 rounded-full bg-white" />
            </motion.div>
          </div>

          {/* Climax question: What if we explored energy at the edge of physics? */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1.1, delay: 0.4 }}
            className="max-w-3xl mx-auto"
          >
            <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-['Cinzel',serif] font-bold leading-tight bg-gradient-to-r from-cyan-300 via-sky-200 to-purple-300 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(56,189,248,0.4)]">
              What if we explored energy at the edge of physics?
            </h3>
            <p className="mt-6 text-base sm:text-lg font-['Space_Grotesk'] text-slate-400 max-w-xl mx-auto">
              Tapping the most extreme gravitational gradients and quantum thermodynamic phenomena known to theoretical astrophysics.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
