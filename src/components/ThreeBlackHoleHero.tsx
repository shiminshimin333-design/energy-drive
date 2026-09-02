import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { BlackHoleParams } from '../types';

interface ThreeBlackHoleHeroProps {
  scrollProgress: number; // 0 to 1
  params?: Partial<BlackHoleParams>;
}

export const ThreeBlackHoleHero: React.FC<ThreeBlackHoleHeroProps> = ({
  scrollProgress,
  params,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isDraggingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });
  const cameraRotationRef = useRef({ x: 0.25, y: 0 });
  const [viewMode, setViewMode] = useState<'relativistic' | 'magnetic' | 'photons'>('relativistic');

  // Resolved parameters
  const currentParams: BlackHoleParams = {
    mass: params?.mass ?? 1.0,
    spin: params?.spin ?? 0.94,
    accretionRate: params?.accretionRate ?? 85,
    particleDensity: params?.particleDensity ?? 240,
    tiltAngle: params?.tiltAngle ?? 0.28,
    glowIntensity: params?.glowIntensity ?? 1.2,
    colorScheme: params?.colorScheme ?? 'cyan-purple',
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 2000);
    camera.position.set(0, 4, 28);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Master Group for smooth interactive rotation and scroll transformations
    const blackHoleGroup = new THREE.Group();
    scene.add(blackHoleGroup);

    // 2. CENTRAL SINGULARITY & EVENT HORIZON (Absolute Black Void Sphere)
    const horizonRadius = 3.2 * currentParams.mass;
    const horizonGeo = new THREE.SphereGeometry(horizonRadius, 64, 64);
    const horizonMat = new THREE.MeshBasicMaterial({
      color: 0x010103,
    });
    const horizonMesh = new THREE.Mesh(horizonGeo, horizonMat);
    blackHoleGroup.add(horizonMesh);

    // 3. PHOTON SPHERE & INNER GLOW RIM (Razor-sharp relativistic light ring)
    const photonRingRadius = horizonRadius * 1.38;
    const photonGeo = new THREE.RingGeometry(horizonRadius * 0.99, photonRingRadius, 128);
    const photonMat = new THREE.MeshBasicMaterial({
      color: 0x67e8f9,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });
    const photonRing = new THREE.Mesh(photonGeo, photonMat);
    photonRing.rotation.x = Math.PI / 2;
    blackHoleGroup.add(photonRing);

    // Additional tilted photon halo
    const photonHaloGeo = new THREE.RingGeometry(horizonRadius * 1.05, photonRingRadius * 1.15, 96);
    const photonHaloMat = new THREE.MeshBasicMaterial({
      color: 0xc084fc,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
    });
    const photonHalo = new THREE.Mesh(photonHaloGeo, photonHaloMat);
    photonHalo.rotation.x = Math.PI / 2.3;
    blackHoleGroup.add(photonHalo);

    // 4. VOLUMETRIC GRAVITATIONAL LENSING ARC (Upper Warp Hemisphere)
    const lensArcGeo = new THREE.TorusGeometry(horizonRadius * 2.1, 0.45, 32, 128, Math.PI);
    const lensArcMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
    });
    const lensArc = new THREE.Mesh(lensArcGeo, lensArcMat);
    lensArc.rotation.x = Math.PI * 0.45;
    lensArc.position.y = horizonRadius * 0.4;
    blackHoleGroup.add(lensArc);

    // Lower counter-lens arc
    const lensArcLowerGeo = new THREE.TorusGeometry(horizonRadius * 1.8, 0.35, 32, 128, Math.PI);
    const lensArcLowerMat = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      transparent: true,
      opacity: 0.3,
      blending: THREE.AdditiveBlending,
    });
    const lensArcLower = new THREE.Mesh(lensArcLowerGeo, lensArcLowerMat);
    lensArcLower.rotation.x = -Math.PI * 0.45;
    lensArcLower.rotation.z = Math.PI;
    lensArcLower.position.y = -horizonRadius * 0.4;
    blackHoleGroup.add(lensArcLower);

    // 5. 3D ACCRETION DISK PARTICLE SYSTEM (3,500 High-Speed Relativistic Particles)
    const particleCount = 3500;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const particleData: {
      radius: number;
      angle: number;
      speed: number;
      radialSpeed: number;
      height: number;
      baseColor: THREE.Color;
    }[] = [];

    const minR = horizonRadius * 1.15;
    const maxR = horizonRadius * 4.8;

    for (let i = 0; i < particleCount; i++) {
      // Exponential density toward inner edge
      const u = Math.random();
      const r = minR + Math.pow(u, 1.8) * (maxR - minR);
      const angle = Math.random() * Math.PI * 2;
      const h = (Math.random() - 0.5) * (0.15 + (r / maxR) * 0.85);

      const isCyan = Math.random() > 0.45;
      const baseColor = isCyan
        ? new THREE.Color(0x38bdf8).lerp(new THREE.Color(0xffffff), Math.random() * 0.5)
        : new THREE.Color(0xa855f7).lerp(new THREE.Color(0xe879f9), Math.random() * 0.6);

      particleData.push({
        radius: r,
        angle: angle,
        speed: (0.012 + (1 / Math.sqrt(r)) * 0.04) * (1 + currentParams.spin * 0.8),
        radialSpeed: 0.005 + Math.random() * 0.01,
        height: h,
        baseColor,
      });

      positions[i * 3] = Math.cos(angle) * r;
      positions[i * 3 + 1] = h;
      positions[i * 3 + 2] = Math.sin(angle) * r;

      colors[i * 3] = baseColor.r;
      colors[i * 3 + 1] = baseColor.g;
      colors[i * 3 + 2] = baseColor.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Particle texture
    const particleCanvas = document.createElement('canvas');
    particleCanvas.width = 32;
    particleCanvas.height = 32;
    const pCtx = particleCanvas.getContext('2d');
    if (pCtx) {
      const grad = pCtx.createRadialGradient(16, 16, 0, 16, 16, 16);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(0.3, 'rgba(103, 232, 249, 0.8)');
      grad.addColorStop(0.7, 'rgba(168, 85, 247, 0.3)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      pCtx.fillStyle = grad;
      pCtx.fillRect(0, 0, 32, 32);
    }
    const particleTexture = new THREE.CanvasTexture(particleCanvas);

    const particleMat = new THREE.PointsMaterial({
      size: 0.35,
      map: particleTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particleSystem = new THREE.Points(particleGeo, particleMat);
    blackHoleGroup.add(particleSystem);

    // 6. POLAR RELATIVISTIC JETS (Blandford-Znajek Energy Jets along ±Y axis)
    const jetCount = 800;
    const jetGeo = new THREE.BufferGeometry();
    const jetPositions = new Float32Array(jetCount * 3);
    const jetColors = new Float32Array(jetCount * 3);
    const jetData: { y: number; maxDist: number; speed: number; angle: number; isNorth: boolean }[] = [];

    for (let j = 0; j < jetCount; j++) {
      const isNorth = j % 2 === 0;
      const y = (Math.random() * 20 + 2) * (isNorth ? 1 : -1);
      const angle = Math.random() * Math.PI * 2;
      const spread = (Math.abs(y) / 20) * 1.8;
      const r = Math.random() * spread;

      jetData.push({
        y,
        maxDist: 22 * (isNorth ? 1 : -1),
        speed: (0.15 + Math.random() * 0.2) * (isNorth ? 1 : -1),
        angle,
        isNorth,
      });

      jetPositions[j * 3] = Math.cos(angle) * r;
      jetPositions[j * 3 + 1] = y;
      jetPositions[j * 3 + 2] = Math.sin(angle) * r;

      const cyan = new THREE.Color(0x38bdf8);
      jetColors[j * 3] = cyan.r;
      jetColors[j * 3 + 1] = cyan.g;
      jetColors[j * 3 + 2] = cyan.b;
    }

    jetGeo.setAttribute('position', new THREE.BufferAttribute(jetPositions, 3));
    jetGeo.setAttribute('color', new THREE.BufferAttribute(jetColors, 3));

    const jetMat = new THREE.PointsMaterial({
      size: 0.28,
      map: particleTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const jetSystem = new THREE.Points(jetGeo, jetMat);
    blackHoleGroup.add(jetSystem);

    // 7. MAGNETIC ERGOSPHERE WIREFRAME (Kerr Static Limit Oblate Shell)
    const ergoGeo = new THREE.SphereGeometry(horizonRadius * 1.7, 32, 24);
    ergoGeo.scale(1.25, 0.8, 1.25);
    const ergoMat = new THREE.MeshBasicMaterial({
      color: 0x818cf8,
      wireframe: true,
      transparent: true,
      opacity: 0.12,
    });
    const ergoMesh = new THREE.Mesh(ergoGeo, ergoMat);
    blackHoleGroup.add(ergoMesh);

    // Initial Tilt
    blackHoleGroup.rotation.x = currentParams.tiltAngle;
    blackHoleGroup.rotation.z = -0.12;

    // Mouse / Touch Drag Controls
    const onMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      const deltaX = e.clientX - previousMousePositionRef.current.x;
      const deltaY = e.clientY - previousMousePositionRef.current.y;

      cameraRotationRef.current.y += deltaX * 0.005;
      cameraRotationRef.current.x += deltaY * 0.005;

      // Clamp X tilt
      cameraRotationRef.current.x = Math.max(-0.6, Math.min(0.8, cameraRotationRef.current.x));

      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDraggingRef.current = false;
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDraggingRef.current = true;
        previousMousePositionRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDraggingRef.current || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - previousMousePositionRef.current.x;
      const deltaY = e.touches[0].clientY - previousMousePositionRef.current.y;

      cameraRotationRef.current.y += deltaX * 0.006;
      cameraRotationRef.current.x += deltaY * 0.006;
      cameraRotationRef.current.x = Math.max(-0.6, Math.min(0.8, cameraRotationRef.current.x));

      previousMousePositionRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const onTouchEnd = () => {
      isDraggingRef.current = false;
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    domElement.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Auto rotation + interactive camera rotation
      if (!isDraggingRef.current) {
        cameraRotationRef.current.y += 0.002 * (1 + currentParams.spin);
      }

      // Smooth camera orbit
      const targetRadius = 28 - scrollProgress * 12; // Zoom in smoothly on scroll
      camera.position.x = Math.sin(cameraRotationRef.current.y) * Math.cos(cameraRotationRef.current.x) * targetRadius;
      camera.position.y = Math.sin(cameraRotationRef.current.x) * targetRadius + 2;
      camera.position.z = Math.cos(cameraRotationRef.current.y) * Math.cos(cameraRotationRef.current.x) * targetRadius;
      camera.lookAt(0, 0, 0);

      // Spin rings and elements
      photonRing.rotation.z += 0.015;
      photonHalo.rotation.z -= 0.01;
      ergoMesh.rotation.y += 0.008;

      // Animate Accretion Disk Particles
      const pPositions = particleGeo.attributes.position.array as Float32Array;
      const pColors = particleGeo.attributes.color.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        const p = particleData[i];
        p.angle += p.speed * (1 + (maxR - p.radius) / maxR);
        p.radius -= p.radialSpeed;

        // Respawn if swallowed
        if (p.radius <= minR) {
          p.radius = maxR * (0.8 + Math.random() * 0.2);
          p.angle = Math.random() * Math.PI * 2;
        }

        const px = Math.cos(p.angle) * p.radius;
        const py = p.height + Math.sin(elapsed * 2 + p.radius) * 0.05;
        const pz = Math.sin(p.angle) * p.radius;

        pPositions[i * 3] = px;
        pPositions[i * 3 + 1] = py;
        pPositions[i * 3 + 2] = pz;

        // Relativistic Doppler Beaming Color shift based on orbital direction relative to camera
        const toCam = new THREE.Vector3().subVectors(camera.position, new THREE.Vector3(px, py, pz)).normalize();
        const velocity = new THREE.Vector3(-Math.sin(p.angle), 0, Math.cos(p.angle));
        const dot = velocity.dot(toCam); // > 0 moving toward camera (blueshift)

        const dopplerMultiplier = dot > 0 ? 1.4 : 0.6;
        pColors[i * 3] = Math.min(1, p.baseColor.r * dopplerMultiplier);
        pColors[i * 3 + 1] = Math.min(1, p.baseColor.g * dopplerMultiplier);
        pColors[i * 3 + 2] = Math.min(1, p.baseColor.b * dopplerMultiplier);
      }

      particleGeo.attributes.position.needsUpdate = true;
      particleGeo.attributes.color.needsUpdate = true;

      // Animate Polar Jet Particles
      const jPositions = jetGeo.attributes.position.array as Float32Array;
      for (let j = 0; j < jetCount; j++) {
        const jd = jetData[j];
        jd.y += jd.speed;

        if (Math.abs(jd.y) > Math.abs(jd.maxDist)) {
          jd.y = (horizonRadius * 0.5 + Math.random()) * (jd.isNorth ? 1 : -1);
        }

        const spread = (Math.abs(jd.y) / 22) * 2.2;
        const r = Math.random() * spread;
        jPositions[j * 3] = Math.cos(jd.angle) * r;
        jPositions[j * 3 + 1] = jd.y;
        jPositions[j * 3 + 2] = Math.sin(jd.angle) * r;
      }
      jetGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      domElement.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      domElement.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);

      if (container.contains(domElement)) {
        container.removeChild(domElement);
      }
      renderer.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      horizonGeo.dispose();
      horizonMat.dispose();
      photonGeo.dispose();
      photonMat.dispose();
    };
  }, [scrollProgress, currentParams.spin, currentParams.mass, currentParams.tiltAngle, currentParams.glowIntensity]);

  return (
    <div className="relative w-full h-full">
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* 3D Viewport Controls Overlay */}
      <div className="absolute bottom-6 left-6 p-3 rounded-2xl bg-slate-950/80 backdrop-blur-md border border-purple-500/30 text-xs font-mono flex items-center gap-3 z-20 pointer-events-auto">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span className="text-cyan-300 font-bold uppercase tracking-wider">3D WEBGL ENGINE ACTIVE</span>
        </div>
        <span className="text-slate-500">|</span>
        <span className="text-slate-400 hidden sm:inline">Drag to Orbit / Rotate 3D Black Hole</span>
      </div>
    </div>
  );
};
