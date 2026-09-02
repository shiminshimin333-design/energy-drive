/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { CosmicBackground } from './components/CosmicBackground';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProblemSection } from './components/ProblemSection';
import { ThreeSpacetimeCurvature } from './components/ThreeSpacetimeCurvature';
import { ConceptSection } from './components/ConceptSection';
import { ThreeReactorHardware3D } from './components/ThreeReactorHardware3D';
import { EnterpriseSection } from './components/EnterpriseSection';
import { CommercialBuySection } from './components/CommercialBuySection';
import { Footer } from './components/Footer';
import { PhysicsLabModal } from './components/PhysicsLabModal';
import { EnterpriseModal } from './components/EnterpriseModal';
import { BlackHoleParams } from './types';

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isPhysicsLabOpen, setIsPhysicsLabOpen] = useState(false);
  const [isEnterpriseModalOpen, setIsEnterpriseModalOpen] = useState(false);

  // Master physics simulation params
  const [physicsParams, setPhysicsParams] = useState<BlackHoleParams>({
    mass: 1.0,
    spin: 0.94,
    accretionRate: 85,
    particleDensity: 240,
    tiltAngle: 0.28,
    glowIntensity: 1.2,
    colorScheme: 'cyan-purple',
  });

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const heroHeight = window.innerHeight;
          const currentScroll = window.scrollY;
          const progress = Math.min(Math.max(currentScroll / heroHeight, 0), 1.5);
          setScrollProgress(progress);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#020206] text-slate-100 font-['Space_Grotesk',sans-serif] selection:bg-purple-600 selection:text-white relative">
      {/* Background Animated Twinkling Starfield & Cosmic Dust */}
      <CosmicBackground particleDensity={120} />

      {/* Top Fixed Navigation Header */}
      <Navbar
        onOpenEnterpriseModal={() => setIsEnterpriseModalOpen(true)}
        onOpenPhysicsLab={() => setIsPhysicsLabOpen(true)}
      />

      <main className="relative z-10">
        {/* ① SLIDE 01 // HERO SECTION — 3D RELATIVISTIC BLACK HOLE */}
        <HeroSection
          scrollProgress={scrollProgress}
          params={physicsParams}
          onExploreDrive={() => scrollToSection('problem-section')}
          onEnterpriseClick={() => scrollToSection('buy-section')}
        />

        {/* ② SLIDE 02 // THE PROBLEM — ENERGY CRISIS & RESOURCE CEILINGS */}
        <ProblemSection />

        {/* ③ SLIDE 03 // 3D SPACETIME CURVATURE & FRAME-DRAGGING METRIC */}
        <ThreeSpacetimeCurvature />

        {/* ④ SLIDE 04 // THEORETICAL MODEL v4.2 & PHYSICS CONVERSION PIPELINE */}
        <ConceptSection
          onOpenEnterpriseModal={() => setIsEnterpriseModalOpen(true)}
        />

        {/* ⑤ SLIDE 05 // 3D MODULAR REACTOR HARDWARE INSPECTOR (EXPLODED VIEW) */}
        <ThreeReactorHardware3D />

        {/* ⑥ SLIDE 06 // ENTERPRISE & TELECOM GRID DEPLOYMENT & TELEMETRY */}
        <EnterpriseSection
          onOpenEnterpriseModal={() => setIsEnterpriseModalOpen(true)}
        />

        {/* ⑦ SLIDE 07 // BUY UNLIMITED ENERGY FOR ENTERPRISES (COMMERCIAL PROCUREMENT) */}
        <CommercialBuySection
          onOpenEnterpriseModal={() => setIsEnterpriseModalOpen(true)}
        />
      </main>

      {/* Footer & Theoretical Foundations */}
      <Footer
        onOpenPhysicsLab={() => setIsPhysicsLabOpen(true)}
        onOpenEnterpriseModal={() => setIsEnterpriseModalOpen(true)}
      />

      {/* Interactive Physics Lab Modal */}
      <PhysicsLabModal
        isOpen={isPhysicsLabOpen}
        onClose={() => setIsPhysicsLabOpen(false)}
        params={physicsParams}
        setParams={setPhysicsParams}
      />

      {/* Enterprise Inquiry & Node Provisioning Simulation Modal */}
      <EnterpriseModal
        isOpen={isEnterpriseModalOpen}
        onClose={() => setIsEnterpriseModalOpen(false)}
      />
    </div>
  );
}
