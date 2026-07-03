import { useState, useRef } from 'react';
import { PageTransition } from '../components/PageTransition';
import { speakers, SpeakerItem } from '../data/events';
import { X, Linkedin, Twitter } from 'lucide-react';

function SpeakerCard({ speaker, onClick }: { speaker: SpeakerItem; onClick: () => void }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    setTilt({ x: Math.max(-8, Math.min(8, y * -10)), y: Math.max(-8, Math.min(8, x * 10)) });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative p-6 bg-deep/80 border border-gold/10 transition-all duration-300 cursor-pointer hover:border-gold/30"
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
      }}
      data-cursor-hover
    >
      <div className="flex flex-col items-center text-center">
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden mb-5 border-2 border-gold/30 shadow-[0_0_30px_rgba(201,168,76,0.1)] group-hover:border-gold/60 transition-colors">
          <img
            src={speaker.photo}
            alt={speaker.name}
            className="w-full h-full object-cover"
          />
        </div>

        <h3 className="font-orbitron font-semibold text-base sm:text-lg text-star-warm mb-1">
          {speaker.name}
        </h3>

        <p className="font-space text-xs text-gold/70 mb-1">{speaker.role}</p>
        <p className="font-mono text-[0.65rem] tracking-wider text-gold/50">{speaker.company}</p>

        <div className="flex items-center gap-3 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
          {speaker.socials.linkedin && (
            <a href={speaker.socials.linkedin} className="text-gold/60 hover:text-gold transition-colors" data-cursor-hover>
              <Linkedin size={16} />
            </a>
          )}
          {speaker.socials.twitter && (
            <a href={speaker.socials.twitter} className="text-gold/60 hover:text-gold transition-colors" data-cursor-hover>
              <Twitter size={16} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function SpeakerDetailPanel({ speaker, onClose }: { speaker: SpeakerItem; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[600] flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-2xl mx-4 mb-0 sm:mb-0 bg-deep/96 border border-gold/30 border-t-2 border-t-gold backdrop-blur-xl p-6 sm:p-8 clip-corner animate-in slide-in-from-bottom duration-400">
        <button onClick={onClose} className="absolute top-4 right-4 text-gold/60 hover:text-gold transition-colors" data-cursor-hover>
          <X size={20} />
        </button>

        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-6">
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-gold/50 shadow-[0_0_40px_rgba(201,168,76,0.2)]">
            <img src={speaker.photo} alt={speaker.name} className="w-full h-full object-cover" />
          </div>

          <div className="text-center sm:text-left">
            <h2 className="font-orbitron font-semibold text-xl sm:text-2xl text-star-warm mb-2">
              {speaker.name}
            </h2>
            <p className="font-space text-sm text-gold/80 mb-1">{speaker.role}</p>
            <p className="font-mono text-xs tracking-wider text-gold/60">{speaker.company}</p>

            <div className="flex items-center gap-3 mt-4 justify-center sm:justify-start">
              {speaker.socials.linkedin && (
                <a href={speaker.socials.linkedin} className="text-gold/60 hover:text-gold transition-colors" data-cursor-hover>
                  <Linkedin size={18} />
                </a>
              )}
              {speaker.socials.twitter && (
                <a href={speaker.socials.twitter} className="text-gold/60 hover:text-gold transition-colors" data-cursor-hover>
                  <Twitter size={18} />
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-orbitron text-sm text-gold mb-3">Bio</h3>
          <p className="font-space text-sm text-star-warm/70 leading-relaxed">{speaker.bio}</p>
        </div>

        <div className="p-4 bg-dark-gold/50 border border-gold/15 clip-corner-sm mb-6">
          <p className="font-mono text-[0.65rem] text-gold/60 mb-2">{speaker.talkTime}</p>
          <h4 className="font-orbitron font-semibold text-star-warm">{speaker.talkTitle}</h4>
        </div>

        <button
          onClick={onClose}
          className="w-full sm:w-auto px-6 py-2.5 font-mono text-[0.65rem] tracking-[0.15em] text-gold border border-gold/50 clip-corner transition-all duration-300 hover:border-gold"
        >
          BACK
        </button>
      </div>
    </div>
  );
}

export function Speakers() {
  const [selectedSpeaker, setSelectedSpeaker] = useState<SpeakerItem | null>(null);

  return (
    <PageTransition>
      <div className="min-h-screen pt-20 sm:pt-24">
        <div className="text-center px-6 mb-12">
          <h1 className="font-orbitron font-black text-4xl sm:text-5xl md:text-6xl text-gradient-gold mb-3">
            MISSION CONTROL
          </h1>
          <p className="font-mono text-[0.65rem] tracking-[0.2em] text-gold/50">
            The visionaries guiding your journey through the void
          </p>
        </div>

        <div className="max-w-6xl mx-auto px-6 pb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {speakers.map((speaker, index) => (
              <div
                key={speaker.id}
                className="animate-in fade-in slide-in-from-bottom-8"
                style={{ animationDelay: `${index * 0.12}s`, animationFillMode: 'backwards' }}
              >
                <SpeakerCard speaker={speaker} onClick={() => setSelectedSpeaker(speaker)} />
              </div>
            ))}
          </div>
        </div>

        {selectedSpeaker && (
          <SpeakerDetailPanel speaker={selectedSpeaker} onClose={() => setSelectedSpeaker(null)} />
        )}
      </div>
    </PageTransition>
  );
}
