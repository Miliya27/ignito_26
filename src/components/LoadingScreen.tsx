import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [phase, setPhase] = useState<'burst' | 'text' | 'terminal' | 'fade'>('burst');
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    if (!canvasRef.current) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 2000);
    camera.position.z = 400;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 1);

    const particleCount = 1500;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const goldColor = new THREE.Color('#C9A84C');
    const warmWhite = new THREE.Color('#FFF8E7');

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positions[i3] = 0;
      positions[i3 + 1] = 0;
      positions[i3 + 2] = 0;

      const isGold = Math.random() < 0.1;
      if (isGold) {
        colors[i3] = goldColor.r;
        colors[i3 + 1] = goldColor.g;
        colors[i3 + 2] = goldColor.b;
      } else {
        colors[i3] = warmWhite.r;
        colors[i3 + 1] = warmWhite.g;
        colors[i3 + 2] = warmWhite.b;
      }
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 2.5,
      vertexColors: true,
      transparent: true,
      opacity: 1,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    const particles: { x: number; y: number; z: number; vx: number; vy: number; vz: number; targetX: number; targetY: number }[] = [];

    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 150 + Math.random() * 500;
      particles.push({
        x: 0,
        y: 0,
        z: 0,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        vz: (Math.random() - 0.5) * speed * 0.3,
        targetX: (Math.random() - 0.5) * 800,
        targetY: (Math.random() - 0.5) * 600,
      });
    }

    let animTime = 0;
    let animId: number;

    const animate = () => {
      animTime += 0.016;
      const posArr = points.geometry.attributes.position.array as Float32Array;

      particles.forEach((p, i) => {
        const i3 = i * 3;
        if (animTime < 1.5) {
          p.x += p.vx * 0.016;
          p.y += p.vy * 0.016;
          p.z += p.vz * 0.016;
          p.vx *= 0.97;
          p.vy *= 0.97;
          p.vz *= 0.97;
        } else {
          p.x += (p.targetX - p.x) * 0.02;
          p.y += (p.targetY - p.y) * 0.02;
        }
        posArr[i3] = p.x;
        posArr[i3 + 1] = p.y;
        posArr[i3 + 2] = p.z;
      });

      points.geometry.attributes.position.needsUpdate = true;
      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animate();

    const timers: ReturnType<typeof setTimeout>[] = [];

    timers.push(setTimeout(() => setPhase('text'), 500));
    timers.push(setTimeout(() => setPhase('terminal'), 2000));
    timers.push(setTimeout(() => {
      setPhase('fade');
      setOpacity(0);
    }, 4500));
    timers.push(setTimeout(() => {
      cancelAnimationFrame(animId);
      points.geometry.dispose();
      material.dispose();
      renderer.dispose();
      onComplete();
    }, 4800));

    return () => {
      cancelAnimationFrame(animId);
      timers.forEach(clearTimeout);
    };
  }, [onComplete]);

  return (
    <div
      className="fixed inset-0 z-[1000] bg-black flex items-center justify-center"
      style={{ opacity, transition: 'opacity 0.3s ease-out' }}
    >
      <canvas ref={canvasRef} className="absolute inset-0" />

      <div
        className={`absolute inset-0 flex flex-col items-center justify-center pointer-events-none transition-opacity duration-500 ${
          phase === 'text' || phase === 'terminal' ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <h1 className="font-orbitron font-black text-5xl sm:text-7xl text-gradient-gold glow-text-gold mb-8">
          IGNITO
        </h1>

        {phase === 'terminal' && (
          <div className="text-center space-y-2">
            <div className="font-mono text-xs text-gold animate-pulse">{" > BOOTING IGNITO 2025..."}</div>
            <div className="font-mono text-xs text-gold/70">{" > CALIBRATING STAR MAPS... OK"}</div>
            <div className="font-mono text-xs text-gold/70">{" > ALIGNING ORBITAL SYSTEMS... OK"}</div>
            <div className="font-mono text-xs text-gold-bright">{" > IGNITION SEQUENCE READY... OK"}</div>
          </div>
        )}
      </div>

      <div className="absolute bottom-8 text-center">
        <div className="font-mono text-[10px] text-gold/40 tracking-[0.3em] animate-pulse">
          MOVE YOUR CURSOR TO EXPLORE
        </div>
      </div>
    </div>
  );
}
