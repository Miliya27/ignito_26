import { useEffect, useRef, useState } from 'react';

interface CursorState {
  x: number;
  y: number;
  isHovering: boolean;
  isClicking: boolean;
}

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<CursorState>({
    x: -100,
    y: -100,
    isHovering: false,
    isClicking: false,
  });

  const currentPos = useRef({ x: -100, y: -100 });
  const targetPos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    let animationFrameId: number;
    let lastTime = performance.now();

    const handleMouseMove = (e: MouseEvent) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.matches('a, button, [data-cursor-hover]')) {
        setState(prev => ({ ...prev, isHovering: true }));
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.matches('a, button, [data-cursor-hover]')) {
        setState(prev => ({ ...prev, isHovering: false }));
      }
    };

    const handleMouseDown = () => setState(prev => ({ ...prev, isClicking: true }));
    const handleMouseUp = () => setState(prev => ({ ...prev, isClicking: false }));

    const handleMouseOut = () => {
      targetPos.current = { x: -100, y: -100 };
    };

    const animate = () => {
      const now = performance.now();
      const delta = Math.min((now - lastTime) / 16, 2);
      lastTime = now;

      const lerpFactor = 0.12 * delta;

      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * lerpFactor;
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * lerpFactor;

      setState(prev => ({
        ...prev,
        x: currentPos.current.x,
        y: currentPos.current.y,
      }));

      animationFrameId = requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseEnter);
    document.addEventListener('mouseout', handleMouseLeave);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseOut);

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseEnter);
      document.removeEventListener('mouseout', handleMouseLeave);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseOut);
    };
  }, []);

  const ringSize = state.isHovering ? 56 : 32;
  const ringScale = state.isClicking ? 'scaleX(1.4) scaleY(0.7)' : 'scale(1)';

  return (
    <div className="pointer-events-none fixed inset-0 z-[9998]" style={{ cursor: 'none' }}>
      <div
        ref={dotRef}
        className="fixed rounded-full pointer-events-none"
        style={{
          left: state.x,
          top: state.y,
          width: 6,
          height: 6,
          background: state.isHovering ? 'transparent' : '#F0C040',
          transform: 'translate(-50%, -50%)',
          transition: 'background 0.2s ease, opacity 0.2s ease',
          opacity: state.x < 0 ? 0 : 1,
        }}
      />
      <div
        ref={ringRef}
        className="fixed rounded-full pointer-events-none transition-[width,height] duration-200"
        style={{
          left: state.x,
          top: state.y,
          width: ringSize,
          height: ringSize,
          border: `1px solid ${state.isHovering ? 'rgba(201,168,76,0.8)' : 'rgba(201,168,76,0.6)'}`,
          background: state.isHovering ? 'rgba(201,168,76,0.1)' : 'transparent',
          transform: `translate(-50%, -50%) ${ringScale}`,
          transition: state.isClicking
            ? 'none'
            : 'width 0.2s ease, height 0.2s ease, background 0.2s ease, border-color 0.2s ease',
          opacity: state.x < 0 ? 0 : 1,
        }}
      />
    </div>
  );
}
