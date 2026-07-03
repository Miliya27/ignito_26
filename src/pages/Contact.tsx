import { useState, useEffect } from 'react';
import { PageTransition } from '../components/PageTransition';
import { Instagram, Linkedin } from 'lucide-react';
import { events } from '../data/events';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    event: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [cascading, setCascading] = useState(false);
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('en-IN', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        }) + ' IST'
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setCascading(true);

      setTimeout(() => {
        setCascading(false);
      }, 300);
    }, 1500);
  };

  return (
    <PageTransition>
      <div className="min-h-screen pt-20 sm:pt-24 pb-16">
        <div className="text-center px-6 mb-12">
          <h1 className="font-orbitron font-black text-4xl sm:text-5xl md:text-6xl text-gradient-gold mb-3">
            GROUND CONTROL
          </h1>
          <p className="font-mono text-[0.65rem] tracking-[0.2em] text-gold/50">
            Transmit your signal. We are listening.
          </p>
        </div>

        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="font-orbitron font-semibold text-xl text-gold mb-6">Contact Info</h2>

            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 rounded-full bg-gold mt-2" />
                <div>
                  <p className="font-space text-sm text-star-warm mb-1">Location</p>
                  <p className="font-mono text-xs text-gold/70">Model Engineering College, Thrikkakara, Kochi, Kerala 682021</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-2 h-2 rounded-full bg-gold mt-2" />
                <div>
                  <p className="font-space text-sm text-star-warm mb-1">Email</p>
                  <a href="mailto:ignito@excellmec.in" className="font-mono text-xs text-gold hover:text-gold-bright transition-colors" data-cursor-hover>
                    ignito@excelmec.in
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-2 h-2 rounded-full bg-gold mt-2" />
                <div>
                  <p className="font-space text-sm text-star-warm mb-1">Phone</p>
                  <a href="tel:+919876543210" className="font-mono text-xs text-gold hover:text-gold-bright transition-colors" data-cursor-hover>
                    +91 98765 43210
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="font-mono text-[0.7rem] tracking-[0.2em] text-gold/50 mb-4">Connect</h3>
              <div className="flex items-center gap-4">
                <a href="#" className="flex items-center gap-2 font-mono text-xs text-gold/60 hover:text-gold transition-colors" data-cursor-hover>
                  <Instagram size={16} />
                  Instagram
                </a>
                <a href="#" className="flex items-center gap-2 font-mono text-xs text-gold/60 hover:text-gold transition-colors" data-cursor-hover>
                  <Linkedin size={16} />
                  LinkedIn
                </a>
                <a href="#" className="font-mono text-xs text-gold/60 hover:text-gold transition-colors" data-cursor-hover>
                  Discord
                </a>
              </div>
            </div>
          </div>

          <div>
            <div className="relative bg-deep/95 border border-gold/20 clip-corner overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-gold/15 bg-dark-gold/30">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-gold-dim" />
                  <span className="w-2.5 h-2.5 rounded-full bg-gold/50" />
                  <span className="w-2.5 h-2.5 rounded-full bg-gold-bright/70" />
                </div>
                <span className="font-mono text-[0.6rem] text-gold/60 ml-2">ignito://register · {time}</span>
              </div>

              {cascading && (
                <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
                  {Array.from({ length: 30 }).map((_, i) => (
                    <span
                      key={i}
                      className="absolute font-mono text-gold/40 text-xs"
                      style={{
                        left: `${Math.random() * 100}%`,
                        animation: `cascade 0.3s linear forwards`,
                        animationDelay: `${i * 0.01}s`,
                        opacity: 0,
                      }}
                    >
                      {String.fromCharCode(33 + Math.floor(Math.random() * 94))}
                    </span>
                  ))}
                </div>
              )}

              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                <div>
                  <label className="block font-mono text-[0.65rem] text-gold/70 mb-1.5">NAME</label>
                  <div className="relative">
                    <span className="absolute left-0 font-mono text-gold text-sm">{'>'}</span>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-transparent border-none border-b border-gold/20 focus:border-gold px-4 py-1.5 font-mono text-sm text-star-warm outline-none transition-colors"
                      placeholder="Enter your name"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-[0.65rem] text-golf/70 mb-1.5">EMAIL</label>
                  <div className="relative">
                    <span className="absolute left-0 font-mono text-gold text-sm">{'>'}</span>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-transparent border-none border-b border-gold/20 focus:border-gold px-4 py-1.5 font-mono text-sm text-star-warm outline-none transition-colors"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-[0.65rem] text-gold/70 mb-1.5">EVENT INTEREST</label>
                  <div className="relative">
                    <span className="absolute left-0 font-mono text-gold text-sm">{'>'}</span>
                    <select
                      value={formData.event}
                      onChange={(e) => setFormData({ ...formData, event: e.target.value })}
                      className="w-full bg-transparent border-none border-b border-gold/20 focus:border-gold px-4 py-1.5 font-mono text-sm text-star-warm outline-none transition-colors appearance-none cursor-pointer"
                      style={{ colorScheme: 'dark' }}
                    >
                      <option value="" className="bg-deep text-star-warm">Select an event</option>
                      {events.map((event) => (
                        <option key={event.id} value={event.id} className="bg-deep text-star-warm">
                          {event.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-[0.65rem] text-gold/70 mb-1.5">MESSAGE</label>
                  <div className="relative">
                    <span className="absolute left-0 font-mono text-gold text-sm">{'>'}</span>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-transparent border-none border-b border-gold/20 focus:border-gold px-4 py-1.5 font-mono text-sm text-star-warm outline-none transition-colors min-h-[80px] resize-none"
                      placeholder="Your message..."
                      rows={3}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || isSubmitted}
                  className="w-full py-3 font-mono text-[0.7rem] tracking-[0.15em] transition-all duration-300 clip-corner disabled:opacity-80"
                  style={{
                    background: isSubmitted ? 'transparent' : '#C9A84C',
                    color: isSubmitted ? '#C9A84C' : '#000000',
                    border: isSubmitted ? '1px solid #C9A84C' : 'none',
                  }}
                  data-cursor-hover
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      TRANSMITTING...
                      <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
                    </span>
                  ) : isSubmitted ? (
                    <span className="flex items-center justify-center gap-2">
                      ✓ SIGNAL RECEIVED
                    </span>
                  ) : (
                    'TRANSMIT →'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
