import { useEffect, useRef, useState } from 'react';

interface TickerCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}

export function TickerCounter({ value, prefix = '', suffix = '', duration = 2000 }: TickerCounterProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;

          const startTime = performance.now();
          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(value * easeOut);

            setDisplayValue(current);

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [value, duration]);

  return (
    <div ref={ref} className="flex flex-col items-center">
      <span className="font-orbitron font-bold text-2xl sm:text-3xl text-gold">
        {prefix}{displayValue}{suffix}
      </span>
    </div>
  );
}
