import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { motion } from 'motion/react';
import { Orbit, Compass, Zap, Activity, Info, RefreshCw } from 'lucide-react';

export const ThreeSpacetimeCurvature: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [spin, setSpin] = useState<number>(0.92);
  const [mass, setMass] = useState<number>(1.2);
  const [frameDraggingEnabled, setFrameDraggingEnabled] = useState<boolean>(true);
  const [photonTracerActive, setPhotonTracerActive] = useState<boolean>(true);

  const spinRef = useRef(spin);
  const massRef = useRef(mass);
  const frameDraggingRef = useRef(frameDraggingEnabled);

  useEffect(() => {
    spinRef.current = spin;
    massRef.current = mass;
    frameDraggingRef.current = frameDraggingEnabled;
  }, [spin, mass, frameDraggingEnabled]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth || 600;
    let height = container.clientHeight || 450;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 18, 22);
    camera.lookAt(0, -2, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // 1. Spacetime Curvature Grid (Deformable Plane Mesh)
    const gridSize = 32;
    const gridSegments = 64;
    const planeGeo = new THREE.PlaneGeometry(gridSize, gridSize, gridSegments, gridSegments);
    planeGeo.rotateX(-Math.PI / 2);

    const originalPositions = planeGeo.attributes.position.clone();

    // Wireframe glowing grid material
    const planeMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const gridMesh = new THREE.Mesh(planeGeo, planeMat);
    scene.add(gridMesh);

    // 2. Central Singularity & Event Horizon
    const singularityGeo = new THREE.SphereGeometry(1.6, 32, 32);
    const singularityMat = new THREE.MeshBasicMaterial({ color: 0x010103 });
    const singularityMesh = new THREE.Mesh(singularityGeo, singularityMat);
    singularityMesh.position.y = -3.8;
    scene.add(singularityMesh);

    // Singularity glow ring
    const ringGeo = new THREE.RingGeometry(1.6, 2.3, 64);
    ringGeo.rotateX(-Math.PI / 2);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xc084fc,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.position.y = -3.7;
    scene.add(ringMesh);

    // 3. Orbiting Test Photons (Geodesics)
    const photonCount = 48;
    const photonsGeo = new THREE.BufferGeometry();
    const photonPositions = new Float32Array(photonCount * 3);
    const photonColors = new Float32Array(photonCount * 3);

    const photonData: { angle: number; radius: number; speed: number; trail: THREE.Vector3[] }[] = [];

    for (let i = 0; i < photonCount; i++) {
      const r = 3.2 + Math.random() * 8.5;
      const angle = Math.random() * Math.PI * 2;
      photonData.push({
        angle,
        radius: r,
        speed: (0.02 + 0.08 / Math.sqrt(r)),
        trail: [],
      });
      const col = new THREE.Color(0x67e8f9).lerp(new THREE.Color(0xf43f5e), 1 - r / 12);
      photonColors[i * 3] = col.r;
      photonColors[i * 3 + 1] = col.g;
      photonColors[i * 3 + 2] = col.b;
    }

    photonsGeo.setAttribute('position', new THREE.BufferAttribute(photonPositions, 3));
    photonsGeo.setAttribute('color', new THREE.BufferAttribute(photonColors, 3));

    const photonMat = new THREE.PointsMaterial({
      size: 0.45,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
    });
    const photonSystem = new THREE.Points(photonsGeo, photonMat);
    scene.add(photonSystem);

    // Resize
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || 600;
      height = container.clientHeight || 450;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // Drag to rotate camera around grid
    let isDragging = false;
    let prevMouse = { x: 0, y: 0 };
    let cameraAngle = { x: 0.65, y: 0 };

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouse = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - prevMouse.x;
      const dy = e.clientY - prevMouse.y;
      cameraAngle.y += dx * 0.006;
      cameraAngle.x = Math.max(0.2, Math.min(1.2, cameraAngle.x + dy * 0.006));
      prevMouse = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const dom = renderer.domElement;
    dom.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Animation Loop
    let animationFrameId: number;
    let time = 0;

    const animate = () => {
      time += 0.02;

      // Camera positioning
      if (!isDragging) {
        cameraAngle.y += 0.003;
      }
      const dist = 26;
      camera.position.x = Math.sin(cameraAngle.y) * Math.cos(cameraAngle.x) * dist;
      camera.position.y = Math.sin(cameraAngle.x) * dist;
      camera.position.z = Math.cos(cameraAngle.y) * Math.cos(cameraAngle.x) * dist;
      camera.lookAt(0, -2.5, 0);

      const m = massRef.current;
      const s = spinRef.current;
      const fd = frameDraggingRef.current;

      // Update Spacetime Mesh Vertices
      const posAttr = planeGeo.attributes.position;
      const origPos = originalPositions.array as Float32Array;
      const curPos = posAttr.array as Float32Array;

      for (let i = 0; i < posAttr.count; i++) {
        const ox = origPos[i * 3];
        const oz = origPos[i * 3 + 2];
        const r = Math.sqrt(ox * ox + oz * oz);

        // Gravitational Well Metric Dip z = - A / (r + eps)
        const dip = - (m * 8.5) / (r * 0.55 + 1.2);

        // Frame Dragging Kerr Vortex Swirl around Singularity
        let swirlAngle = 0;
        if (fd && r > 0.1) {
          swirlAngle = (s * 4.5) / (r * r * 0.25 + 1.8) + time * (s * 0.5);
        }

        const cosS = Math.cos(swirlAngle);
        const sinS = Math.sin(swirlAngle);

        curPos[i * 3] = ox * cosS - oz * sinS;
        curPos[i * 3 + 1] = dip;
        curPos[i * 3 + 2] = ox * sinS + oz * cosS;
      }
      posAttr.needsUpdate = true;

      // Update Singularity position & scale
      singularityMesh.scale.set(m, m, m);
      singularityMesh.position.y = - (m * 8.5) / 1.4;
      ringMesh.position.y = singularityMesh.position.y + 0.1;
      ringMesh.rotation.z += 0.02 * (1 + s);

      // Animate Test Photons
      const pPos = photonsGeo.attributes.position.array as Float32Array;
      for (let p = 0; p < photonCount; p++) {
        const pd = photonData[p];
        pd.angle += pd.speed * (1 + s * 0.8);

        const px = Math.cos(pd.angle) * pd.radius;
        const pz = Math.sin(pd.angle) * pd.radius;
        const dip = - (m * 8.5) / (pd.radius * 0.55 + 1.2);

        pPos[p * 3] = px;
        pPos[p * 3 + 1] = dip + 0.2;
        pPos[p * 3 + 2] = pz;
      }
      photonsGeo.attributes.position.needsUpdate = true;

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
      planeGeo.dispose();
      planeMat.dispose();
      singularityGeo.dispose();
      singularityMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
    };
  }, []);

  return (
    <section
      id="spacetime-section"
      className="relative min-h-screen w-full bg-[#030309] text-white py-24 px-4 sm:px-6 lg:px-8 overflow-hidden border-t border-purple-950/40"
    >
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/3 w-[600px] h-[600px] bg-cyan-950/20 rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-800/60 text-xs font-mono text-cyan-300 mb-4 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
            <Orbit className="w-3.5 h-3.5" />
            <span>SLIDE 03 // RIEMANNIAN METRIC & FRAME DRAGGING</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-['Cinzel',serif] font-bold text-white tracking-tight">
            SPACETIME WARP &{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
              ERGOSPHERE VORTEX
            </span>
          </h2>

          <p className="mt-3 text-slate-400 font-['Space_Grotesk'] text-sm sm:text-base max-w-2xl mx-auto">
            A spinning Kerr black hole drags the very fabric of spacetime around itself (Lense-Thirring effect), creating the Ergosphere—a cosmic dynamo from which energy can be actively extracted.
          </p>
        </div>

        {/* 3D Simulation Grid & Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: 3D Spacetime Mesh Canvas */}
          <div className="lg:col-span-8 rounded-3xl bg-slate-950/80 backdrop-blur-xl border border-cyan-500/30 p-2 sm:p-4 shadow-[0_0_40px_rgba(6,182,212,0.15)] relative min-h-[460px] lg:min-h-[560px] flex flex-col justify-between overflow-hidden">
            <div ref={containerRef} className="w-full h-[420px] lg:h-[500px] cursor-grab active:cursor-grabbing" />

            {/* In-canvas HUD */}
            <div className="absolute top-6 left-6 p-3 rounded-2xl bg-slate-950/80 backdrop-blur-md border border-slate-800 text-xs font-mono space-y-1">
              <div className="text-cyan-300 font-bold flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5" />
                <span>KERR SPACETIME GEOMETRY</span>
              </div>
              <p className="text-slate-400 text-[11px]">
                Rotating Frame Dragging & Gravitational Ergosphere Vortex
              </p>
            </div>

            <div className="absolute bottom-6 right-6 px-3 py-1.5 rounded-xl bg-purple-950/80 border border-purple-600/40 text-[11px] font-mono text-purple-200">
              CLICK & DRAG TO ORBIT 3D SPACETIME GRID
            </div>
          </div>

          {/* Right: Live Parameter Sliders & Mathematical Breakdown */}
          <div className="lg:col-span-4 space-y-5">
            {/* Live Sliders Card */}
            <div className="p-6 rounded-2xl bg-slate-950/80 backdrop-blur-xl border border-purple-500/30 shadow-[0_0_25px_rgba(147,51,234,0.15)] space-y-5 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-purple-900/40 pb-3">
                <span className="font-bold text-slate-200 uppercase">METRIC CONTROLS</span>
                <span className="text-cyan-400 flex items-center gap-1">
                  <Activity className="w-3.5 h-3.5" /> LIVE
                </span>
              </div>

              {/* Spin Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-slate-300">
                  <span>KERR SPIN PARAMETER:</span>
                  <span className="text-cyan-300 font-bold text-sm">{spin.toFixed(2)} c</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={0.998}
                  step={0.01}
                  value={spin}
                  onChange={(e) => setSpin(parseFloat(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
                />
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>0.0 (Static)</span>
                  <span>0.998 (Near-Light Limit)</span>
                </div>
              </div>

              {/* Mass Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-slate-300">
                  <span>GRAVITATIONAL MASS:</span>
                  <span className="text-purple-300 font-bold text-sm">{mass.toFixed(1)} M₀</span>
                </div>
                <input
                  type="range"
                  min={0.5}
                  max={2.5}
                  step={0.1}
                  value={mass}
                  onChange={(e) => setMass(parseFloat(e.target.value))}
                  className="w-full accent-purple-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
                />
              </div>

              {/* Toggles */}
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                <span className="text-slate-300">FRAME-DRAGGING VORTEX:</span>
                <button
                  onClick={() => setFrameDraggingEnabled(!frameDraggingEnabled)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    frameDraggingEnabled
                      ? 'bg-cyan-500 text-slate-950 shadow-[0_0_10px_#38bdf8]'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {frameDraggingEnabled ? 'ACTIVE' : 'OFF'}
                </button>
              </div>
            </div>

            {/* Theoretical Physics Takeaway Card */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-purple-950/50 to-slate-950/70 border border-purple-500/30 space-y-3">
              <div className="flex items-center gap-2 text-cyan-300 text-xs font-mono font-bold">
                <Zap className="w-4 h-4" />
                <span>WHY FRAME DRAGGING ENABLES INFINITE POWER</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-['Space_Grotesk']">
                Inside the Ergosphere, spacetime rotates faster than light relative to distant observers. Nothing can remain stationary. By firing matter/light into counter-rotating trajectories, negative energy states fall into the singularity while positive energy escapes boosted up to <strong>120.7%</strong> via superradiance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
