import { useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import gsap from 'gsap';
import { TorchReveal, HeroContent } from '../components/TorchReveal';
import { CountdownTimer } from '../components/CountdownTimer';
import { TickerCounter } from '../components/TickerCounter';
import { PageTransition } from '../components/PageTransition';
import { events, stats } from '../data/events';
import { ArrowRight } from 'lucide-react';

export function Home() {
  const aboutRef = useRef<HTMLDivElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
  const countdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.revealed-section',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          scrollTrigger: {
            trigger: '.revealed-section',
            start: 'top 80%',
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const featuredEvents = events.slice(0, 3);

  return (
    <PageTransition>
      <TorchReveal>
        <HeroContent />
      </TorchReveal>

      <div ref={aboutRef} className="revealed-section bg-dark-gold border-y border-gold/15">
        <div className="max-w-7xl mx-auto px-6 py-8 sm:py-12 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="font-space text-sm sm:text-base text-star-warm/80 leading-relaxed">
            <p className="mb-3">
              IGNITO is Excel MEC's annual flagship tech fest — a convergence of innovation, competition, and creativity. Now in its 12th edition, IGNITO 2025 brings together students, professionals, and tech enthusiasts for three days of workshops, hackathons, competitions, and talks.
            </p>
            <p className="text-gold-pale/60">
              From AI enthusiasts to space engineers, from competitive coders to game developers — there's a mission for everyone.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <TickerCounter
                  value={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                />
                <div className="font-mono text-[0.55rem] sm:text-[0.6rem] tracking-[0.15em] text-star-warm/40 mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section ref={featuredRef} className="revealed-section py-16 sm:py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="font-orbitron font-bold text-gold text-2xl sm:text-3xl mb-3">
              FEATURED MISSIONS
            </h2>
            <NavLink to="/events" className="inline-flex items-center gap-2 font-mono text-[0.65rem] tracking-[0.2em] text-gold/60 hover:text-gold transition-colors" data-cursor-hover>
              A glimpse of what awaits <ArrowRight size={14} />
            </NavLink>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredEvents.map((event, index) => (
              <div
                key={event.id || index}
                className="group relative p-6 bg-deep/90 border border-gold/20 clip-corner transition-all duration-300 hover:border-gold/60 hover:bg-dark-gold/95 hover:translate-y-[-6px] hover:shadow-[0_20px_60px_rgba(201,168,76,0.12)]"
                data-cursor-hover
              >
                <div className="font-mono text-[0.55rem] tracking-[0.15em] text-gold/70 mb-3">
                  {event.category.toUpperCase()}
                </div>
                <h3 className="font-orbitron font-semibold text-lg text-star-warm mb-2">
                  {event.name}
                </h3>
                <p className="font-space text-sm text-star-warm/55 mb-4 line-clamp-2">
                  {event.short}
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-orbitron text-lg text-gold-bright glow-text-gold">
                    {event.prize}
                  </span>
                  <ArrowRight size={16} className="text-gold/40 group-hover:text-gold transition-colors" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section ref={countdownRef} className="revealed-section py-20 sm:py-32 px-6 bg-gradient-to-b from-transparent via-dark-gold/30 to-transparent">
        <div className="max-w-4xl mx-auto text-center">
          <div className="font-mono text-[0.6rem] tracking-[0.3em] text-gold/50 mb-8">
            COUNTDOWN TO IGNITION
          </div>
          <CountdownTimer />
        </div>
      </section>
    </PageTransition>
  );
}
