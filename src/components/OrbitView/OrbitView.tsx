import { useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';
import { EventItem } from '../../data/events';

interface OrbitViewProps {
  items: EventItem[];
  activeCategory: string;
  onItemClick: (item: EventItem) => void;
  isFrozen: boolean;
}

const RING_RADII = [280, 400, 520, 640];
const RING_TILTS = [0.25, 0.18, 0.30, 0.22];
const ORBIT_SPEEDS = [0.004, 0.003, 0.002, 0.0015];

export function OrbitView({ items, activeCategory, onItemClick, isFrozen }: OrbitViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const css3dRef = useRef<HTMLDivElement>(null);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const css3dRendererRef = useRef<CSS3DRenderer | null>(null);
  const systemGroupRef = useRef<THREE.Group | null>(null);
  const animationIdRef = useRef<number>(0);

  const cardObjectsRef = useRef<CSS3DObject[]>([]);
  const cardDataRef = useRef<{ angle: number; radius: number; ringTilt: number; orbitSpeed: number }[]>([]);

  const isDraggingRef = useRef(false);
  const lastMouseXRef = useRef(0);
  const dragVelocityRef = useRef(0);

  const timeRef = useRef(0);

  const createCardElement = useCallback((item: EventItem) => {
    const card = document.createElement('div');
    card.className = 'orbit-card';
    card.dataset.id = item.id;

    card.innerHTML = `
      <div class="card-glow-border"></div>
      <div class="card-tag">${item.category}</div>
      <div class="card-name">${item.name}</div>
      <div class="card-desc">${item.short}</div>
      <div class="card-footer">
        <span class="card-prize">${item.prize}</span>
        <span class="card-meta">${item.duration} · ${item.team}</span>
      </div>
    `;

    card.addEventListener('click', () => onItemClick(item));
    card.addEventListener('mousemove', (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--gx', ((e.clientX - rect.left) / rect.width * 100) + '%');
      card.style.setProperty('--gy', ((e.clientY - rect.top) / rect.height * 100) + '%');
    });

    return card;
  }, [onItemClick]);

  useEffect(() => {
    if (!containerRef.current || !css3dRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 5000);
    camera.position.set(0, 180, 900);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // CSS3D Renderer
    const css3dRenderer = new CSS3DRenderer();
    css3dRenderer.setSize(width, height);
    css3dRenderer.domElement.style.position = 'absolute';
    css3dRenderer.domElement.style.top = '0';
    css3dRenderer.domElement.style.left = '0';
    css3dRenderer.domElement.style.pointerEvents = 'none';
    css3dRef.current.appendChild(css3dRenderer.domElement);
    css3dRendererRef.current = css3dRenderer;

    // System Group
    const systemGroup = new THREE.Group();
    scene.add(systemGroup);
    systemGroupRef.current = systemGroup;

    // Event Cards
    const cardsPerRing = Math.ceil(items.length / 4);

    items.forEach((item, index) => {
      const ringIndex = Math.floor(index / cardsPerRing);
      const positionInRing = index % cardsPerRing;
      const totalInRing = Math.min(cardsPerRing, items.length - ringIndex * cardsPerRing);

      const radius = RING_RADII[ringIndex % 4];
      const angle = (positionInRing / totalInRing) * Math.PI * 2;
      const ringTilt = RING_TILTS[ringIndex % 4];
      const orbitSpeed = ORBIT_SPEEDS[ringIndex % 4] * (0.8 + Math.random() * 0.4);

      const cardElement = createCardElement(item);
      cardElement.style.pointerEvents = 'auto';

      const css3dObject = new CSS3DObject(cardElement);
      css3dObject.scale.set(0.6, 0.6, 1);

      cardObjectsRef.current.push(css3dObject);
      cardDataRef.current.push({ angle, radius, ringTilt, orbitSpeed });

      systemGroup.add(css3dObject);
    });

    // Animation Loop
    const animate = () => {
      timeRef.current += 0.016;

      // Update card positions
      cardObjectsRef.current.forEach((obj, i) => {
        const data = cardDataRef.current[i];
        if (!isFrozen) {
          data.angle += data.orbitSpeed;
        }

        const x = data.radius * Math.cos(data.angle);
        const z = data.radius * Math.sin(data.angle);
        const y = z * Math.sin(data.ringTilt);

        obj.position.set(x, y, z * Math.cos(data.ringTilt));
        obj.position.y += Math.sin(timeRef.current * 1.5 + data.angle) * 5;
        obj.quaternion.copy(camera.quaternion);
      });

      // Auto-rotation
      if (!isDraggingRef.current && Math.abs(dragVelocityRef.current) < 0.001 && !isFrozen) {
        systemGroup.rotation.y += 0.0008;
      }

      // Drag inertia
      systemGroup.rotation.y += dragVelocityRef.current;
      dragVelocityRef.current *= 0.93;
      if (Math.abs(dragVelocityRef.current) < 0.00005) {
        dragVelocityRef.current = 0;
      }

      css3dRenderer.render(scene, camera);

      animationIdRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      css3dRenderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationIdRef.current);
      window.removeEventListener('resize', handleResize);
      scene.clear();
      if (css3dRef.current && css3dRenderer.domElement) {
        css3dRef.current.removeChild(css3dRenderer.domElement);
      }
    };
  }, [items, createCardElement, isFrozen]);

  // Filter visibility
  useEffect(() => {
    cardObjectsRef.current.forEach((obj, i) => {
      const item = items[i];
      const isVisible = activeCategory === 'ALL' || item?.category?.toUpperCase() === activeCategory.toUpperCase();
      const card = obj.element as HTMLDivElement;

      if (isVisible) {
        card.style.opacity = '1';
        card.style.transform = 'scale(1)';
        card.style.pointerEvents = 'auto';
      } else {
        card.style.opacity = '0.12';
        card.style.transform = 'scale(0.85)';
        card.style.pointerEvents = 'none';
      }
    });
  }, [activeCategory, items]);

  // Drag handlers
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      lastMouseXRef.current = e.clientX;
      dragVelocityRef.current = 0;
      document.body.style.cursor = 'grabbing';
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      if (!systemGroupRef.current) return;

      const delta = e.clientX - lastMouseXRef.current;
      lastMouseXRef.current = e.clientX;
      systemGroupRef.current.rotation.y += delta * 0.007;
      dragVelocityRef.current = delta * 0.007;
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
      document.body.style.cursor = 'none';
    };

    container.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      container.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <div ref={containerRef} className="orbit-view-container">
      <div ref={css3dRef} className="orbit-css3d-layer" />
    </div>
  );
}
