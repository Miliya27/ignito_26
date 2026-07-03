import { useEffect, useRef, useState } from 'react';
import { EventItem } from '../../data/events';

interface ScrollViewProps {
  items: EventItem[];
  activeCategory: string;
  onItemClick: (item: EventItem) => void;
  isFrozen: boolean;
}

export function ScrollView({ items, activeCategory, onItemClick, isFrozen }: ScrollViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const targetOffsetRef = useRef(0);
  const currentOffsetRef = useRef(0);
  const animationIdRef = useRef<number>(0);
  const timeRef = useRef(0);

  const [localHoveredId, setLocalHoveredId] = useState<string | null>(null);

  const filteredItems = activeCategory === 'ALL'
    ? items
    : items.filter(item => item.category.toUpperCase() === activeCategory.toUpperCase());

  useEffect(() => {
    if (!trackRef.current) return;

    const animate = () => {
      if (!isFrozen && trackRef.current) {
        const totalWidth = trackRef.current.scrollWidth;
        const viewportW = window.innerWidth;
        const maxOffset = totalWidth - viewportW;

        const target = Math.max(0, Math.min(maxOffset, targetOffsetRef.current));
        currentOffsetRef.current += (target - currentOffsetRef.current) * 0.06;

        if (maxOffset > 0) {
          trackRef.current.style.transform = `translateX(${-currentOffsetRef.current}px)`;
        }
      }

      timeRef.current += 0.016;

      animationIdRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationIdRef.current);
    };
  }, [isFrozen]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (isFrozen) return;

      const viewportW = window.innerWidth;

      // Dead zone in center 20%
      const t = e.clientX / viewportW;
      if (t > 0.4 && t < 0.6) return;

      if (!trackRef.current) return;
      const totalWidth = trackRef.current.scrollWidth;
      const maxOffset = totalWidth - viewportW;

      targetOffsetRef.current = t * maxOffset;
    };

    container.addEventListener('mousemove', handleMouseMove);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isFrozen]);

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--gx', ((e.clientX - rect.left) / rect.width * 100) + '%');
    card.style.setProperty('--gy', ((e.clientY - rect.top) / rect.height * 100) + '%');
  };

  const getFloatY = (index: number) => {
    return Math.sin(timeRef.current * 0.9 + index * 0.75) * 10;
  };

  return (
    <div ref={containerRef} className="scroll-view-container">
      <div ref={trackRef} className="scroll-view-track">
        {filteredItems.map((item, index) => {
          const floatY = !isFrozen ? getFloatY(index) : 0;

          return (
            <div
              key={item.id}
              className={`scroll-card ${localHoveredId === item.id ? 'hovered' : ''} ${isFrozen ? 'frozen' : ''}`}
              style={{
                transform: `translateY(${floatY}px)`,
              }}
              onClick={() => onItemClick(item)}
              onMouseEnter={() => setLocalHoveredId(item.id)}
              onMouseLeave={() => setLocalHoveredId(null)}
              onMouseMove={handleCardMouseMove}
              data-cursor-hover
            >
              <div className="card-glow-border" />
              {item.badge && (
                <div className={`card-badge ${item.badge === 'FLAGSHIP' ? 'flagship' : 'new'}`}>
                  {item.badge}
                </div>
              )}
              <div className="card-tag">{item.category}</div>
              <div className="card-name">{item.name}</div>
              <div className="card-desc">{item.short}</div>
              <div className="card-footer">
                <span className="card-prize">{item.prize}</span>
                <span className="card-meta">{item.duration}</span>
              </div>
            </div>
          );
        })}
      </div>
      <div className="edge-fade-left" />
      <div className="edge-fade-right" />
    </div>
  );
}
