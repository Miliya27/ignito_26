import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface StarLayer {
  points: THREE.Points;
  rotationSpeed: number;
  scrollFactor: number;
  count: number;
  goldIndices: number[];
  twinklePhases: Float32Array;
}

export function Starfield() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const starLayersRef = useRef<StarLayer[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const scrollRef = useRef(0);
  const animationIdRef = useRef<number>(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = window.innerWidth;
    const height = window.innerHeight;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 2000);
    camera.position.z = 500;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const layers = [
      { count: 3000, size: 0.5, opacity: 0.6, rotSpeed: 0.0002, scrollFactor: 0.04, goldCount: 0 },
      { count: 1500, size: 1.0, opacity: 0.8, rotSpeed: -0.0003, scrollFactor: 0.07, goldCount: 0 },
      { count: 800, size: 1.8, opacity: 0.9, rotSpeed: 0.0004, scrollFactor: 0.10, goldCount: 0 },
      { count: 300, size: 2.5, opacity: 1.0, rotSpeed: -0.0005, scrollFactor: 0.13, goldCount: 10 },
      { count: 80, size: 4, opacity: 1.0, rotSpeed: 0.0006, scrollFactor: 0.18, goldCount: 80 },
    ];

    const starLayers: StarLayer[] = [];

    layers.forEach((layerConfig) => {
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(layerConfig.count * 3);
      const colors = new Float32Array(layerConfig.count * 3);

      const goldColor = new THREE.Color('#C9A84C');
      const warmWhite = new THREE.Color('#FFF8E7');

      const goldIndices: number[] = [];
      const twinklePhases = new Float32Array(layerConfig.count);

      for (let i = 0; i < layerConfig.count; i++) {
        const i3 = i * 3;
        positions[i3] = (Math.random() - 0.5) * 2000;
        positions[i3 + 1] = (Math.random() - 0.5) * 2000;
        positions[i3 + 2] = (Math.random() - 0.5) * 1000 - 200;

        twinklePhases[i] = Math.random() * Math.PI * 2;

        const isGold = i < layerConfig.goldCount;
        if (isGold) {
          goldIndices.push(i);
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
        size: layerConfig.size,
        vertexColors: true,
        transparent: true,
        opacity: layerConfig.opacity,
        sizeAttenuation: true,
        blending: THREE.AdditiveBlending,
      });

      const points = new THREE.Points(geometry, material);
      scene.add(points);

      starLayers.push({
        points,
        rotationSpeed: layerConfig.rotSpeed,
        scrollFactor: layerConfig.scrollFactor,
        count: layerConfig.count,
        goldIndices,
        twinklePhases,
      });
    });

    starLayersRef.current = starLayers;

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const handleScroll = () => {
      scrollRef.current = window.scrollY;
    };

    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const handleVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationIdRef.current);
      } else {
        animate();
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    document.addEventListener('visibilitychange', handleVisibility);

    let time = 0;

    const animate = () => {
      time += 0.016;

      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.03;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.03;

      camera.position.x += mouseRef.current.x * 6 - camera.position.x * 0.03;
      camera.position.y += -mouseRef.current.y * 4 - camera.position.y * 0.03;

      starLayers.forEach((layer) => {
        const positions = layer.points.geometry.attributes.position.array as Float32Array;
        const colors = layer.points.geometry.attributes.color.array as Float32Array;

        layer.points.rotation.y += layer.rotationSpeed;

        positions.forEach((_, i) => {
          if (i % 3 === 1) {
            positions[i] += scrollRef.current * layer.scrollFactor;
          }
        });

        if (layer.goldIndices.length > 0) {
          const goldColor = new THREE.Color('#C9A84C');
          const brightGold = new THREE.Color('#F0C040');

          layer.goldIndices.forEach((index) => {
            const i3 = index * 3;
            const phase = layer.twinklePhases[index];
            const twinkle = 0.4 + 0.6 * Math.abs(Math.sin(time * 2 + phase));

            const mixed = goldColor.clone().lerp(brightGold, twinkle * 0.5);
            (layer.points.material as THREE.PointsMaterial).opacity = twinkle;
            colors[i3] = mixed.r;
            colors[i3 + 1] = mixed.g;
            colors[i3 + 2] = mixed.b;
          });
        }
        layer.points.geometry.attributes.position.needsUpdate = true;
        layer.points.geometry.attributes.color.needsUpdate = true;
      });

      renderer.render(scene, camera);
      animationIdRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationIdRef.current);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibility);

      starLayers.forEach((layer) => {
        layer.points.geometry.dispose();
        (layer.points.material as THREE.Material).dispose();
        scene.remove(layer.points);
      });
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ background: 'transparent' }}
    />
  );
}
