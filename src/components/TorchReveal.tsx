import { useEffect, useRef, useState, ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

interface TorchRevealProps {
  children: ReactNode;
}

export function TorchReveal({ children }: TorchRevealProps) {
  const maskRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [hasInteracted, setHasInteracted] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [isOverTitle, setIsOverTitle] = useState(false);

  const mousePos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: -100, y: -100 });
  const animationIdRef = useRef<number>(0);
  const timeRef = useRef(0);
  const radiusRef = useRef(0);

  const baseRadius = 180;

  useEffect(() => {
    const showHintTimeout = setTimeout(() => {
      if (!hasInteracted) {
        setShowHint(true);
      }
    }, 2000);

    return () => clearTimeout(showHintTimeout);
  }, [hasInteracted]);

  useEffect(() => {
    let lastTime = performance.now();

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!hasInteracted) {
        setHasInteracted(true);
        setShowHint(false);
      }

      const titleEl = document.querySelector('[data-ignito-title]');
      if (titleEl) {
        const rect = titleEl.getBoundingClientRect();
        const isOver =
          e.clientX >= rect.left - 50 &&
          e.clientX <= rect.right + 50 &&
          e.clientY >= rect.top - 50 &&
          e.clientY <= rect.bottom + 50;
        setIsOverTitle(isOver);
      }
    };

    const handleMouseLeave = () => {
      mousePos.current = { x: window.innerWidth / 2, y: -100 };
    };

    const handleResize = () => {
      if (!hasInteracted) {
        mousePos.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
      }
    };

    const animate = () => {
      const now = performance.now();
      const delta = (now - lastTime) / 16;
      lastTime = now;

      timeRef.current += 0.016;

      const targetRadius = isOverTitle ? 240 : baseRadius;
      const breathing = Math.sin(timeRef.current * 1.2) * 8;
      radiusRef.current += (targetRadius + breathing - radiusRef.current) * 0.05;

      const lerpFactor = 0.12 * delta;
      currentPos.current.x += (mousePos.current.x - currentPos.current.x) * lerpFactor;
      currentPos.current.y += (mousePos.current.y - currentPos.current.y) * lerpFactor;

      if (maskRef.current && glowRef.current) {
        const radius = Math.max(radiusRef.current, 0);
        const x = currentPos.current.x;
        const y = currentPos.current.y;

        maskRef.current.style.background = `
          radial-gradient(
            circle ${radius}px at ${x}px ${y}px,
            transparent 0%,
            transparent ${radius * 0.55}px,
            rgba(0,0,0,0.35) ${radius * 0.75}px,
            rgba(0,0,0,0.85) ${radius * 0.9}px,
            rgba(0,0,0,0.97) ${radius}px,
            #000000 ${radius + 80}px
          )
        `;

        glowRef.current.style.background = `
          radial-gradient(
            circle at ${x}px ${y}px,
            rgba(201,168,76,0.18) 0%,
            rgba(201,168,76,0.06) 40%,
            rgba(201,168,76,0.02) 70%,
            transparent 100%
          )
        `;
      }

      animationIdRef.current = requestAnimationFrame(animate);
    };

    handleResize();
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);

    animationIdRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationIdRef.current);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, [hasInteracted, isOverTitle]);

  return (
    <div ref={containerRef} className="relative min-h-screen overflow-hidden">
      <div className="relative z-[1]">{children}</div>

      <div
        ref={glowRef}
        className="fixed inset-0 z-[2] pointer-events-none"
        style={{
          background: !hasInteracted
            ? `radial-gradient(circle at 50% 50%, rgba(201,168,76,0.1) 0%, transparent 50%)`
            : undefined,
        }}
      />

      <div
        ref={maskRef}
        className="fixed inset-0 z-[3] pointer-events-none transition-opacity duration-300"
        style={{
          background: '#000000',
        }}
      />

      {!hasInteracted && (
        <div className="fixed inset-0 z-[4] pointer-events-none flex items-center justify-center">
          <div
            className="w-20 h-20 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(201,168,76,0.3) 0%, transparent 70%)',
              animation: 'pulse 2s ease-in-out infinite',
            }}
          />
        </div>
      )}

      {showHint && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[5] font-mono text-[0.55rem] sm:text-[0.6rem] tracking-[0.3em] text-gold/50 animate-pulse pointer-events-none">
          MOVE YOUR CURSOR TO EXPLORE
        </div>
      )}
    </div>
  );
}

export function HeroContent() {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
        timeZone: 'Asia/Kolkata',
      };
      setCurrentTime(now.toLocaleTimeString('en-IN', options) + ' IST');
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 relative">
      <div className="absolute top-20 sm:top-24 left-4 sm:left-8 font-mono text-[0.6rem] sm:text-[0.7rem] tracking-[0.25em] text-gold-dim">
        OCT 17–19 · 2025
      </div>

      <div className="absolute top-20 sm:top-24 right-4 sm:right-8">
        <div className="relative w-8 sm:w-10 h-8 sm:h-10">
          <div
            className="absolute inset-0 border border-gold/20 rounded-full"
            style={{ animation: 'spin 8s linear infinite' }}
          />
          <div
            className="absolute inset-1 border border-gold/30 rounded-full"
            style={{ animation: 'spin 5s linear infinite reverse' }}
          />
          <div className="absolute inset-[45%] rounded-full bg-gold/50" />
        </div>
      </div>

      <div className="text-center max-w-4xl mx-auto px-4">
        <div className="font-mono text-[0.55rem] sm:text-[0.65rem] tracking-[0.4em] text-gold/60 mb-4 sm:mb-6">
          EXCEL MEC PRESENTS · EDITION XII
        </div>

        <h1
          data-ignito-title
          className="font-orbitron font-black text-gradient-gold glow-text-gold mb-2 sm:mb-4"
          style={{
            fontSize: 'clamp(5rem, 14vw, 11rem)',
            lineHeight: 0.9,
          }}
        >
          IGNITO
        </h1>

        <div className="font-orbitron text-[0.8rem] sm:text-[1rem] tracking-[0.5em] text-gold-pale/60 mb-6 sm:mb-8">
          INTO THE VOID
        </div>

        <div className="font-space text-base sm:text-lg text-star-warm/70 mb-8 sm:mb-10 max-w-md mx-auto">
          Three days. Twenty missions. One universe.
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <NavLink
            to="/events"
            className="px-6 sm:px-8 py-2.5 sm:py-3 font-mono text-[0.65rem] sm:text-[0.7rem] tracking-[0.15em] bg-gold text-black clip-corner-sm transition-all duration-300 hover:bg-gold-bright hover:shadow-[0_0_30px_rgba(201,168,76,0.4)]"
            data-cursor-hover
          >
            EXPLORE EVENTS →
          </NavLink>
          <NavLink
            to="/contact"
            className="px-6 sm:px-8 py-2.5 sm:py-3 font-mono text-[0.65rem] sm:text-[0.7rem] tracking-[0.15em] text-gold border border-gold/50 clip-corner-sm transition-all duration-300 hover:border-gold hover:shadow-[0_0_20px_rgba(201,168,76,0.2)]"
            data-cursor-hover
          >
            REGISTER NOW
          </NavLink>
        </div>
      </div>

      <div className="absolute bottom-8 sm:bottom-12 left-4 sm:left-8 font-mono text-[0.55rem] sm:text-[0.6rem] tracking-[0.2em] text-gold-dim">
        MEC · THRIKKAKARA · KERALA
      </div>

      <div className="absolute bottom-8 sm:bottom-12 right-4 sm:right-8 font-mono text-[0.55rem] sm:text-[0.6rem] tracking-[0.1em] text-gold-dim">
        {currentTime}
      </div>
    </div>
  );
}
