import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'motion/react';
import { Cpu, ShieldCheck, Zap, Layers, Maximize2, Sparkles, Activity, CheckCircle2 } from 'lucide-react';

export const ThreeReactorHardware3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [explosionProgress, setExplosionProgress] = useState<number>(0);
  const [selectedComponentIndex, setSelectedComponentIndex] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);

  const explosionRef = useRef(explosionProgress);
  useEffect(() => {
    explosionRef.current = explosionProgress;
  }, [explosionProgress]);

  const hardwareComponents = [
    {
      id: 'torus-coils',
      name: 'Superconducting Magnetic Quadrupole Torus',
      subtitle: 'Vacuum Magnetic Suspension & Ergosphere Confinement',
      specs: '120 Tesla Magnetic Field • YBCO High-Temp Superconductors',
      description:
        'Dual counter-rotating magnetic toroids that establish a sub-femtometer levitation well, keeping the micro-singularity centered without physical contact in ultra-high vacuum (<10⁻¹⁴ Torr).',
      color: '#38bdf8',
    },
    {
      id: 'laser-ring',
      name: 'Ultra-Relativistic Laser Compression Array',
      subtitle: 'Kugelblitz Mass Genesis & Infall Injection Ring',
      specs: '8 Petawatt Pulsed Lasers • Femtosecond Optical Synchronization',
      description:
        'Focuses ultra-intense coherent photon packets to create and replenish the event horizon mass while actively driving the Kerr spin parameter ($a = 0.998$).',
      color: '#c084fc',
    },
    {
      id: 'photovoltaic-shell',
      name: 'Resonant Gamma-Ray Photovoltaic Shell',
      subtitle: 'Hawking Radiation Direct Quantum Conversion',
      specs: 'Metamaterial Graphene-Diamond Diodes • 94.6% Thermal-to-Electric',
      description:
        'Captures high-frequency Hawking gamma emissions and relativistic superradiant wave reflections, converting extreme-frequency photon flux directly into DC electric current.',
      color: '#34d399',
    },
    {
      id: 'hts-busbars',
      name: 'High-Temperature Superconducting (HTS) Busbars',
      subtitle: 'Zero-Resistance Giga/Terawatt Grid Export Core',
      specs: 'Zero Joule Losses • 100 kV DC Direct Interconnect',
      description:
        'Liquid nitrogen-cooled HTS busbars channel continuous gigawatt-scale power directly into enterprise grids (such as carrier-grade telecom switching nodes and AI supercomputer clusters).',
      color: '#f43f5e',
    },
    {
      id: 'cryo-hull',
      name: 'Cryogenic Graphene Hex-Shield Outer Hull',
      subtitle: 'Triple-Layer Containment & Kinetic Shock Barrier',
      specs: 'Boron Nitride Aerogel • Microsecond Thermal Dissipation',
      description:
        'Hermetically seals the entire reactor assembly, guaranteeing zero external radiation leakage and rapid fail-safe decompression in the event of magnetic instability.',
      color: '#818cf8',
    },
  ];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth || 600;
    let height = container.clientHeight || 450;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 5, 20);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const reactorMasterGroup = new THREE.Group();
    scene.add(reactorMasterGroup);

    // 1. Central Singularity Core (Layer 0)
    const coreGeo = new THREE.SphereGeometry(1.2, 32, 32);
    const coreMat = new THREE.MeshBasicMaterial({ color: 0x010103 });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    reactorMasterGroup.add(coreMesh);

    // Core Glow Aura
    const coreGlowGeo = new THREE.SphereGeometry(1.35, 32, 32);
    const coreGlowMat = new THREE.MeshBasicMaterial({
      color: 0x67e8f9,
      transparent: true,
      opacity: 0.65,
      wireframe: true,
    });
    const coreGlowMesh = new THREE.Mesh(coreGlowGeo, coreGlowMat);
    reactorMasterGroup.add(coreGlowMesh);

    // 2. Magnetic Torus Quadrupole Coils (Layer 1)
    const torusGroup = new THREE.Group();
    reactorMasterGroup.add(torusGroup);

    const coilCount = 8;
    for (let c = 0; c < coilCount; c++) {
      const angle = (c * Math.PI * 2) / coilCount;
      const coilGeo = new THREE.TorusGeometry(2.4, 0.22, 16, 32);
      const coilMat = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        wireframe: true,
        transparent: true,
        opacity: 0.85,
      });
      const coilMesh = new THREE.Mesh(coilGeo, coilMat);
      coilMesh.position.set(Math.cos(angle) * 3.2, 0, Math.sin(angle) * 3.2);
      coilMesh.rotation.y = angle;
      coilMesh.rotation.x = Math.PI / 2;
      torusGroup.add(coilMesh);
    }

    // 3. Laser Injection Ring Array (Layer 2)
    const laserGroup = new THREE.Group();
    reactorMasterGroup.add(laserGroup);

    const laserRingGeo = new THREE.TorusGeometry(4.8, 0.15, 16, 64);
    const laserRingMat = new THREE.MeshBasicMaterial({
      color: 0xc084fc,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });
    const laserRing = new THREE.Mesh(laserRingGeo, laserRingMat);
    laserRing.rotation.x = Math.PI / 2;
    laserGroup.add(laserRing);

    // 8 Laser Beam Emitters pointing to center
    for (let b = 0; b < 8; b++) {
      const bAngle = (b * Math.PI * 2) / 8;
      const beamGeo = new THREE.CylinderGeometry(0.06, 0.06, 3.4, 8);
      const beamMat = new THREE.MeshBasicMaterial({
        color: 0xe879f9,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending,
      });
      const beamMesh = new THREE.Mesh(beamGeo, beamMat);
      beamMesh.position.set(Math.cos(bAngle) * 3.1, 0, Math.sin(bAngle) * 3.1);
      beamMesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), new THREE.Vector3(-Math.cos(bAngle), 0, -Math.sin(bAngle)));
      laserGroup.add(beamMesh);
    }

    // 4. Resonant Photovoltaic Shell (Layer 3)
    const pvGroup = new THREE.Group();
    reactorMasterGroup.add(pvGroup);

    const pvGeo = new THREE.IcosahedronGeometry(6.2, 2);
    const pvMat = new THREE.MeshBasicMaterial({
      color: 0x34d399,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const pvMesh = new THREE.Mesh(pvGeo, pvMat);
    pvGroup.add(pvMesh);

    // 5. HTS Busbars Export Core (Layer 4)
    const busbarGroup = new THREE.Group();
    reactorMasterGroup.add(busbarGroup);

    const busbarGeo1 = new THREE.TorusGeometry(7.2, 0.28, 16, 48);
    const busbarMat = new THREE.MeshBasicMaterial({
      color: 0xf43f5e,
      wireframe: true,
      transparent: true,
      opacity: 0.8,
    });
    const busbarMesh1 = new THREE.Mesh(busbarGeo1, busbarMat);
    busbarMesh1.rotation.x = Math.PI / 2;
    busbarGroup.add(busbarMesh1);

    // 4 Output conduit pillars
    for (let cp = 0; cp < 4; cp++) {
      const cpAngle = (cp * Math.PI) / 2;
      const conduitGeo = new THREE.CylinderGeometry(0.2, 0.2, 6, 8);
      const conduitMesh = new THREE.Mesh(conduitGeo, busbarMat);
      conduitMesh.position.set(Math.cos(cpAngle) * 7.2, 0, Math.sin(cpAngle) * 7.2);
      busbarGroup.add(conduitMesh);
    }

    // 6. Cryogenic Outer Hull (Layer 5)
    const hullGroup = new THREE.Group();
    reactorMasterGroup.add(hullGroup);

    const hullGeo = new THREE.SphereGeometry(8.8, 24, 18);
    const hullMat = new THREE.MeshBasicMaterial({
      color: 0x818cf8,
      wireframe: true,
      transparent: true,
      opacity: 0.2,
    });
    const hullMesh = new THREE.Mesh(hullGeo, hullMat);
    hullGroup.add(hullMesh);

    // Mouse Drag Controls
    let isDragging = false;
    let prevMouse = { x: 0, y: 0 };
    let cameraAngle = { x: 0.3, y: 0 };

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouse = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - prevMouse.x;
      const dy = e.clientY - prevMouse.y;
      cameraAngle.y += dx * 0.006;
      cameraAngle.x = Math.max(-0.6, Math.min(0.8, cameraAngle.x + dy * 0.006));
      prevMouse = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const dom = renderer.domElement;
    dom.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || 600;
      height = container.clientHeight || 450;
      camera.aspect = width / height;
      camera.updateProjectionMatrix;
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    let time = 0;

    const animate = () => {
      time += 0.015;

      if (!isDragging) {
        cameraAngle.y += 0.004;
      }

      const dist = 22 + explosionRef.current * 8;
      camera.position.x = Math.sin(cameraAngle.y) * Math.cos(cameraAngle.x) * dist;
      camera.position.y = Math.sin(cameraAngle.x) * dist + 2;
      camera.position.z = Math.cos(cameraAngle.y) * Math.cos(cameraAngle.x) * dist;
      camera.lookAt(0, 0, 0);

      // Core spin
      coreGlowMesh.rotation.y += 0.03;
      coreGlowMesh.rotation.z += 0.015;

      // Magnetic Coils spin
      torusGroup.rotation.y -= 0.01;

      // Laser Ring Pulse
      laserGroup.rotation.y += 0.012;

      // PV Mesh spin
      pvGroup.rotation.x += 0.005;
      pvGroup.rotation.y += 0.008;

      // Apply Explode View translation offsets based on explosionProgress
      const exp = explosionRef.current;
      torusGroup.position.y = exp * 2.8;
      laserGroup.position.y = -exp * 2.8;
      pvGroup.position.y = exp * 5.6;
      busbarGroup.position.y = -exp * 5.6;
      hullGroup.position.y = exp * 8.4;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      dom.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      if (container.contains(dom)) {
        container.removeChild(dom);
      }
      renderer.dispose();
    };
  }, []);

  const curComp = hardwareComponents[selectedComponentIndex];

  return (
    <section
      id="hardware-section"
      className="relative min-h-screen w-full bg-[#020207] text-white py-24 px-4 sm:px-6 lg:px-8 overflow-hidden border-t border-cyan-950/40"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 right-1/4 w-[550px] h-[550px] bg-purple-950/20 rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/60 border border-purple-800/60 text-xs font-mono text-purple-300 mb-4 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
            <Cpu className="w-3.5 h-3.5" />
            <span>SLIDE 04 // 3D MODULAR REACTOR HARDWARE INSPECTOR</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-['Cinzel',serif] font-bold text-white tracking-tight">
            THE SINGULARIS{' '}
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              REACTOR CORE
            </span>
          </h2>

          <p className="mt-3 text-slate-400 font-['Space_Grotesk'] text-sm sm:text-base max-w-2xl mx-auto">
            Interact with the 3D containment unit engineered to isolate, energize, and convert sub-femtometer micro black holes into continuous terawatt power feeds.
          </p>
        </div>

        {/* 3D Hardware Canvas + Explode Slider + Component Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: 3D Hardware Viewport */}
          <div className="lg:col-span-7 rounded-3xl bg-slate-950/80 backdrop-blur-xl border border-purple-500/30 p-2 sm:p-4 shadow-[0_0_50px_rgba(147,51,234,0.15)] flex flex-col justify-between relative min-h-[460px] lg:min-h-[560px] overflow-hidden">
            <div ref={containerRef} className="w-full h-[400px] lg:h-[480px] cursor-grab active:cursor-grabbing" />

            {/* In-canvas HUD */}
            <div className="absolute top-6 left-6 p-3 rounded-2xl bg-slate-950/85 backdrop-blur-md border border-slate-800 text-xs font-mono space-y-1">
              <div className="text-purple-300 font-bold flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" />
                <span>3D MODULAR HARDWARE CORE</span>
              </div>
              <p className="text-slate-400 text-[11px]">Exploded Assembly Inspection Mode</p>
            </div>

            {/* Explode View Slider Control */}
            <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800 flex flex-col gap-2 z-10">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-slate-300 font-bold flex items-center gap-1.5">
                  <Maximize2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>3D EXPLODED VIEW EXPANSION:</span>
                </span>
                <span className="text-cyan-300 font-bold">{(explosionProgress * 100).toFixed(0)}%</span>
              </div>
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={explosionProgress}
                onChange={(e) => setExplosionProgress(parseFloat(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-500">
                <span>0% (Assembled Core)</span>
                <span>50% (Layer Inspection)</span>
                <span>100% (Full Volumetric Spread)</span>
              </div>
            </div>
          </div>

          {/* Right: Component Selectors & Technical Spec Dossier */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            {/* Component Tabs */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-1">
                SELECT SUBSYSTEM LAYER:
              </span>
              {hardwareComponents.map((comp, idx) => {
                const isSelected = selectedComponentIndex === idx;
                return (
                  <button
                    key={comp.id}
                    onClick={() => setSelectedComponentIndex(idx)}
                    className={`w-full text-left p-3.5 rounded-xl text-xs font-mono transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-slate-900 border-2 border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.3)] text-white'
                        : 'bg-slate-950/70 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: comp.color }}
                      />
                      <span className="font-bold">{comp.name}</span>
                    </div>
                    <span className="text-[10px] text-slate-500">LAYER 0{idx + 1}</span>
                  </button>
                );
              })}
            </div>

            {/* Selected Component Technical Detail Card */}
            <div className="p-6 rounded-2xl bg-[#090915] border border-purple-500/30 shadow-[0_0_30px_rgba(147,51,234,0.15)] space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-purple-900/40 pb-3">
                <span className="text-cyan-300 font-bold uppercase">{curComp.subtitle}</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-purple-950 border border-purple-800 text-purple-300">
                  ACTIVE SPEC
                </span>
              </div>

              <h4 className="font-['Space_Grotesk'] text-base font-bold text-white leading-snug">
                {curComp.name}
              </h4>

              <div className="p-2.5 rounded-lg bg-black/60 border border-slate-800 text-cyan-300 text-[11px]">
                {curComp.specs}
              </div>

              <p className="text-xs text-slate-300 leading-relaxed font-sans font-light">
                {curComp.description}
              </p>

              <div className="pt-2 border-t border-slate-900 flex items-center gap-2 text-[11px] text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Zero-Wear Solid State Quantum Magnetic Architecture</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
