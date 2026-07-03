import { useState, useEffect, useRef } from 'react';
import { PageTransition } from '../components/PageTransition';
import { schedule, ScheduleEventItem } from '../data/events';
import { MapPin } from 'lucide-react';

type Day = 1 | 2 | 3;

const dayLabels: Record<Day, { label: string; date: string }> = {
  1: { label: 'DAY 1', date: 'OCT 17' },
  2: { label: 'DAY 2', date: 'OCT 18' },
  3: { label: 'DAY 3', date: 'OCT 19' },
};

const typeColors: Record<string, string> = {
  ceremony: 'bg-gold text-black',
  workshop: 'border border-gold/30 text-gold',
  talk: 'bg-gold/10 text-gold',
  hackathon: 'border-2 border-gold-bright text-gold-bright',
  competition: 'border border-gold-dim text-gold-pale',
  gaming: 'bg-dark-gold text-gold-pale',
};

function TimelineNode({ event, index }: { event: ScheduleEventItem; index: number }) {
  const nodeRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (nodeRef.current) {
      observer.observe(nodeRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={nodeRef}
      className={`relative pl-8 sm:pl-12 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="absolute left-0 top-0 flex flex-col items-center">
        <div className={`relative w-3 h-3 rounded-full bg-gold shadow-[0_0_10px_rgba(201,168,76,0.5)] ${isVisible ? 'animate-pulse' : ''}`}>
          {isVisible && (
            <div className="absolute inset-0 rounded-full bg-gold animate-ping" style={{ animationDuration: '1.5s' }} />
          )}
        </div>
        {index < schedule.filter((e: ScheduleEventItem) => e.day === event.day).length - 1 && (
          <div className="w-[1px] bg-gradient-to-b from-gold to-gold/20 h-full min-h-[80px] mt-2" />
        )}
      </div>

      <div className="pb-8">
        <div className="font-mono text-xs text-gold-bright glow-text-gold mb-2">{event.time}</div>
        <h3 className="font-orbitron font-semibold text-lg text-star-warm mb-1">{event.name}</h3>
        <p className="font-space text-sm text-star-warm/60 mb-3">{event.description}</p>
        <div className="flex items-center gap-4">
          <span className={`px-2 py-0.5 font-mono text-[0.55rem] tracking-wider ${typeColors[event.type] || 'text-gold/60'}`}>
            {event.type.toUpperCase()}
          </span>
          <div className="flex items-center gap-1.5 text-gold/50">
            <MapPin size={12} />
            <span className="font-mono text-[0.6rem]">{event.venue}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Schedule() {
  const [activeDay, setActiveDay] = useState<Day>(1);

  const filteredEvents = schedule.filter((e: ScheduleEventItem) => e.day === activeDay);

  return (
    <PageTransition>
      <div className="min-h-screen pt-20 sm:pt-24">
        <div className="text-center px-6 mb-10">
          <h1 className="font-orbitron font-black text-4xl sm:text-5xl md:text-6xl text-gradient-gold mb-3">
            MISSION TIMELINE
          </h1>
          <p className="font-mono text-[0.65rem] tracking-[0.2em] text-gold/50">
            Your roadmap through three days of innovation
          </p>
        </div>

        <div className="flex items-center justify-center gap-2 sm:gap-4 px-6 mb-8">
          {([1, 2, 3] as Day[]).map((day) => (
            <button
              key={day}
              onClick={() => setActiveDay(day)}
              className={`relative px-6 sm:px-8 py-2.5 sm:py-3 font-orbitron font-semibold text-sm sm:text-base transition-all duration-300 ${
                activeDay === day
                  ? 'bg-gold text-black'
                  : 'border border-gold/30 text-gold hover:border-gold'
              }`}
              data-cursor-hover
            >
              <div className="font-mono text-[0.55rem] tracking-wider opacity-60 absolute -top-1 left-1/2 -translate-x-1/2 -translate-y-full text-inherit">
                {dayLabels[day].date}
              </div>
              {dayLabels[day].label}
            </button>
          ))}
        </div>

        <div className="max-w-3xl mx-auto px-6 py-8">
          {filteredEvents.map((event, index) => (
            <TimelineNode key={event.id} event={event} index={index} />
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
