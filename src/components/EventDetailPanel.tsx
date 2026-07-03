import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { EventItem } from '../data/events';
import gsap from 'gsap';

interface EventDetailPanelProps {
  event: EventItem | null;
  onClose: () => void;
}

export function EventDetailPanel({ event, onClose }: EventDetailPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!event) return;

    // Entry animation
    gsap.fromTo(
      backdropRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.3 }
    );

    const isMobile = window.innerWidth <= 768;
    gsap.fromTo(
      panelRef.current,
      isMobile ? { y: '100%' } : { x: '100%' },
      {
        y: 0,
        x: 0,
        duration: 0.45,
        ease: 'power3.out',
      }
    );

    // ESC key handler
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [event, onClose]);

  const handleClose = () => {
    gsap.to(backdropRef.current, { opacity: 0, duration: 0.2 });

    const isMobile = window.innerWidth <= 768;
    gsap.to(panelRef.current, {
      [isMobile ? 'y' : 'x']: '100%',
      duration: 0.3,
      ease: 'power2.in',
      onComplete: onClose,
    });
  };

  if (!event) return null;

  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

  return (
    <>
      <div
        ref={backdropRef}
        className="fixed inset-0 bg-black/60 backdrop-blur-[6px] z-[299]"
        onClick={handleClose}
      />

      <div
        ref={panelRef}
        className={`event-detail-panel ${isMobile ? 'mobile' : 'desktop'}`}
      >
        <button
          className="panel-close-button"
          onClick={handleClose}
          data-cursor-hover
        >
          <X size={20} />
        </button>

        <div className="panel-content">
          <div className="panel-category-tag">{event.category}</div>

          <h2 className="panel-title">{event.name}</h2>

          <div className="panel-meta-row">
            <span>{event.date}</span>
            <span className="meta-separator">·</span>
            <span>{event.duration}</span>
            <span className="meta-separator">·</span>
            <span>{event.team}</span>
            <span className="meta-separator">·</span>
            <span>{event.venue}</span>
          </div>

          <div className="panel-divider" />

          <p className="panel-description">{event.desc}</p>

          <div className="panel-divider" />

          <div className="panel-tags">
            {event.tags.map((tag) => (
              <span key={tag} className="panel-tag-chip">
                {tag}
              </span>
            ))}
          </div>

          <div className="panel-prize-block">
            <div className="panel-prize-label">PRIZE POOL</div>
            <div className="panel-prize-amount">{event.prize}</div>
          </div>

          <button
            className="panel-register-button"
            data-cursor-hover
          >
            REGISTER NOW
          </button>
        </div>
      </div>
    </>
  );
}
