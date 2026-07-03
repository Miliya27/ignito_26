import { useState, useEffect } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function formatNumber(num: number) {
  return num.toString().padStart(2, '0');
}

export function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date('2025-10-17T09:00:00+05:30');

    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      };
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center justify-center gap-2 sm:gap-4 md:gap-6">
      <TimeUnit value={timeLeft.days} label="DAYS" />
      <span className="font-orbitron text-gold-bright text-2xl sm:text-4xl md:text-5xl glow-text-gold">:</span>
      <TimeUnit value={timeLeft.hours} label="HOURS" />
      <span className="font-orbitron text-gold-bright text-2xl sm:text-4xl md:text-5xl glow-text-gold">:</span>
      <TimeUnit value={timeLeft.minutes} label="MINS" />
      <span className="font-orbitron text-gold-bright text-2xl sm:text-4xl md:text-5xl glow-text-gold">:</span>
      <TimeUnit value={timeLeft.seconds} label="SECS" />
    </div>
  );
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="font-orbitron font-bold text-gold-bright glow-text-gold"
        style={{
          fontSize: 'clamp(2rem, 8vw, 5rem)',
          textShadow: '0 0 40px rgba(201,168,76,0.5)',
        }}
      >
        {formatNumber(value)}
      </div>
      <div className="font-mono text-[0.55rem] sm:text-[0.65rem] tracking-[0.25em] text-gold/30">
        {label}
      </div>
    </div>
  );
}
