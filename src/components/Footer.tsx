import { NavLink } from 'react-router-dom';

const navLinks = [
  { to: '/events', label: 'Events' },
  { to: '/competitions', label: 'Compete' },
  { to: '/speakers', label: 'Speakers' },
  { to: '/schedule', label: 'Schedule' },
  { to: '/contact', label: 'Contact' },
];

export function Footer() {
  return (
    <footer className="border-t border-gold/10 bg-void/95 py-10 md:py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 items-center gap-8 text-center md:text-left">
        <div className="flex items-center justify-center md:justify-start gap-1">
          <span className="font-orbitron font-black text-lg text-gradient-gold">IGNI</span>
          <span className="relative flex items-center justify-center w-2 h-2">
            <span className="w-1.5 h-1.5 rounded-full bg-gold" />
          </span>
          <span className="font-orbitron font-black text-lg text-gradient-gold">TO</span>
          <span className="font-space text-xs text-gold/40 ml-2">2025</span>
        </div>

        <div className="flex items-center justify-center gap-6">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className="font-mono text-[0.6rem] tracking-[0.15em] text-gold/40 hover:text-gold transition-colors"
            >
              {link.label.toLocaleUpperCase()}
            </NavLink>
          ))}
        </div>

        <div className="font-mono text-[0.55rem] tracking-[0.2em] text-gold/30 md:text-right">
          © 2025 Excel MEC · All systems nominal.
        </div>
      </div>
    </footer>
  );
}
