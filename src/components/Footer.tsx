import React from 'react';
import { ArrowUp, Sparkles, Orbit, ExternalLink, ShieldCheck, Atom } from 'lucide-react';

interface FooterProps {
  onOpenPhysicsLab: () => void;
  onOpenEnterpriseModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenPhysicsLab,
  onOpenEnterpriseModal,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#010105] text-white border-t border-purple-900/30 pt-16 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background flare */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_20px_#38bdf8]" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-900">
          {/* Brand & Purpose */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-600 to-cyan-400 p-[1.5px]">
                <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                </div>
              </div>
              <span className="font-['Cinzel',serif] text-lg font-bold tracking-wider text-slate-100">
                SINGULARIS // BLACK HOLE DRIVE
              </span>
            </div>

            <p className="text-xs font-['Space_Grotesk'] text-slate-400 leading-relaxed max-w-sm">
              Exploring the extreme frontiers of speculative theoretical physics, quantum field theory in curved spacetime, and enterprise clean energy architectures for global telecoms and compute hubs.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={onOpenPhysicsLab}
                className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-850 text-xs font-mono text-purple-300 border border-purple-800/60 transition-colors"
              >
                Launch Physics Lab
              </button>
              <button
                onClick={onOpenEnterpriseModal}
                className="px-3 py-1.5 rounded-lg bg-cyan-950/60 hover:bg-cyan-900/60 text-xs font-mono text-cyan-300 border border-cyan-800/60 transition-colors"
              >
                Enterprise Inquiries
              </button>
            </div>
          </div>

          {/* Theoretical Foundations */}
          <div className="md:col-span-4 space-y-3 font-mono text-xs">
            <h4 className="text-cyan-400 font-bold uppercase tracking-wider">
              THEORETICAL CITATIONS & PAPERS
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li className="hover:text-slate-200 transition-colors">
                • <strong>Penrose, R. (1969)</strong>: <em>Gravitational Collapse and Space-Time Singularities</em>
              </li>
              <li className="hover:text-slate-200 transition-colors">
                • <strong>Hawking, S. W. (1974)</strong>: <em>Black Hole Explosions & Quantum Particle Creation</em>
              </li>
              <li className="hover:text-slate-200 transition-colors">
                • <strong>Blandford, R. D. & Znajek, R. L. (1977)</strong>: <em>Electromagnetic Extraction of Energy from Kerr Black Holes</em>
              </li>
              <li className="hover:text-slate-200 transition-colors">
                • <strong>Kerr, R. P. (1963)</strong>: <em>Gravitational Field of a Spinning Mass as an Example of Algebraically Special Metrics</em>
              </li>
            </ul>
          </div>

          {/* Quick Links & References */}
          <div className="md:col-span-3 space-y-3 font-mono text-xs">
            <h4 className="text-purple-400 font-bold uppercase tracking-wider">
              RESOURCES & EXPLORATION
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <a
                  href="https://youtube.com/shorts/5Ixzs8jJpn0?si=s7EsvIUt-Suu6O6P"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-cyan-300 transition-colors"
                >
                  <span>Concept Video Reference</span>
                  <ExternalLink className="w-3 h-3 text-cyan-400" />
                </a>
              </li>
              <li>
                <a
                  href="#hero-section"
                  className="hover:text-slate-200 transition-colors"
                >
                  01. The Singularity Hero
                </a>
              </li>
              <li>
                <a
                  href="#problem-section"
                  className="hover:text-slate-200 transition-colors"
                >
                  02. The Energy Paradox
                </a>
              </li>
              <li>
                <a
                  href="#concept-section"
                  className="hover:text-slate-200 transition-colors"
                >
                  03. The Energy Drive
                </a>
              </li>
              <li>
                <a
                  href="#enterprise-section"
                  className="hover:text-slate-200 transition-colors"
                >
                  04. Enterprise & Telecom Deployment
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <p>© 2026 Singularis Physics Lab • Theoretical & Speculative Energy Exploration</p>
          <div className="flex items-center gap-4">
            <span className="text-[11px] text-purple-400">STATUS: VACUUM LOCK ACTIVE</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:border-purple-500 transition-colors flex items-center gap-1"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>TOP</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
