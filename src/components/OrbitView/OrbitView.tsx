import { useEffect, useRef, useCallback, useState } from 'react';
import { EventItem } from '../../data/events';
import './OrbitView.css';

interface OrbitViewProps {
  items: EventItem[];
  activeCategory: string;
  onItemClick: (item: EventItem) => void;
  isFrozen: boolean;
}

export function OrbitView({ items, activeCategory, onItemClick, isFrozen }: OrbitViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);

  const rotationRef = useRef(0);      // current Y rotation in degrees
  const targetRotRef = useRef(0);     // target (what user dragged to)
  const isDraggingRef = useRef(false);
  const lastXRef = useRef(0);
  const velocityRef = useRef(0);
  const rafRef = useRef<number>(0);

  const [radius, setRadius] = useState(420);

  // Recompute radius on resize so the circle fits the viewport
  useEffect(() => {
    const recalc = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      const shorter = Math.min(w, h);
      setRadius(Math.max(200, shorter * 0.42));
    };
    recalc();
    window.addEventListener('resize', recalc);
    return () => window.removeEventListener('resize', recalc);
  }, []);

  // Animation loop — lerp rotation toward target, apply momentum
  useEffect(() => {
    const loop = () => {
      if (!isFrozen) {
        // Momentum after drag
        targetRotRef.current += velocityRef.current;
        velocityRef.current *= 0.93;
        if (Math.abs(velocityRef.current) < 0.02) velocityRef.current = 0;

        // Smooth lerp toward target
        rotationRef.current += (targetRotRef.current - rotationRef.current) * 0.12;
      }

      if (sceneRef.current) {
        sceneRef.current.style.transform = `rotateX(10deg) rotateY(${rotationRef.current}deg)`;
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isFrozen]);

  // Drag handlers
  const onPointerDown = useCallback((e: React.PointerEvent) => {
    if (isFrozen) return;
    isDraggingRef.current = true;
    lastXRef.current = e.clientX;
    velocityRef.current = 0;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    if (containerRef.current) containerRef.current.style.cursor = 'grabbing';
  }, [isFrozen]);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDraggingRef.current || isFrozen) return;
    const dx = e.clientX - lastXRef.current;
    lastXRef.current = e.clientX;
    const step = dx * 0.3; // degrees per pixel
    targetRotRef.current += step;
    velocityRef.current = step;
  }, [isFrozen]);

  const onPointerUp = useCallback(() => {
    isDraggingRef.current = false;
    if (containerRef.current) containerRef.current.style.cursor = 'grab';
  }, []);

  const total = items.length;
  const angleStep = total > 0 ? 360 / total : 0;

  return (
    <div
      ref={containerRef}
      className="css-carousel-container"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      style={{ cursor: 'grab' }}
    >
      <div className="css-carousel-scene" ref={sceneRef}>
        {items.map((item, i) => {
          const angle = i * angleStep;
          const isVisible = activeCategory === 'ALL' || item.category?.toUpperCase() === activeCategory.toUpperCase();
          return (
            <div
              key={item.id}
              className={`css-carousel-card ${!isVisible ? 'dimmed' : ''}`}
              style={{
                transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
              }}
              onClick={() => isVisible && onItemClick(item)}
            >
              <div className="card-glow-border" />
              <div className="card-tag">{item.category}</div>
              <div className="card-name">{item.name}</div>
              <div className="card-desc">{item.short}</div>
              <div className="card-footer">
                <span className="card-prize">{item.prize}</span>
                <span className="card-meta">{item.duration} · {item.team}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
