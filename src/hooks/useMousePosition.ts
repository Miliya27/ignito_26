import { useState, useEffect, useCallback } from 'react';

interface MousePosition {
  x: number;
  y: number;
  normalizedX: number;
  normalizedY: number;
}

export function useMousePosition() {
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
    normalizedX: 0.5,
    normalizedY: 0.5,
  });

  const updateMousePosition = useCallback((ev: MouseEvent) => {
    setMousePosition({
      x: ev.clientX,
      y: ev.clientY,
      normalizedX: ev.clientX / window.innerWidth,
      normalizedY: ev.clientY / window.innerHeight,
    });
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, [updateMousePosition]);

  return mousePosition;
}

export function useMouseVelocity() {
  const [velocity, setVelocity] = useState({ x: 0, y: 0, speed: 0 });
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0, time: 0 });

  useEffect(() => {
    const handleMouseMove = (ev: MouseEvent) => {
      const now = performance.now();
      const dx = ev.clientX - lastPosition.x;
      const dy = ev.clientY - lastPosition.y;
      const dt = now - lastPosition.time || 16;
      const speed = Math.sqrt(dx * dx + dy * dy) / dt * 16;

      setVelocity({ x: dx, y: dy, speed: Math.min(speed, 50) });
      setLastPosition({ x: ev.clientX, y: ev.clientY, time: now });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [lastPosition]);

  return velocity;
}
