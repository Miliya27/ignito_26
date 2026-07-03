import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { to: '/events', label: 'EVENTS' },
  { to: '/competitions', label: 'COMPETE' },
  { to: '/speakers', label: 'SPEAKERS' },
  { to: '/schedule', label: 'SCHEDULE' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const showBackground = scrolled || !isHome;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[500] transition-all duration-300 ${
        showBackground
          ? 'bg-black/92 backdrop-blur-xl border-b border-gold/12'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <NavLink to="/" className="flex items-center gap-1 group">
            <span className="font-orbitron font-black text-xl sm:text-2xl text-gradient-gold">
              IGNI
            </span>
            <span className="relative flex items-center justify-center w-3 h-3">
              <span className="absolute w-2 h-2 rounded-full bg-gold animate-pulse" />
              <span className="absolute w-1 h-1 rounded-full bg-gold-bright" />
            </span>
            <span className="font-orbitron font-black text-xl sm:text-2xl text-gradient-gold">
              TO
            </span>
          </NavLink>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `font-mono text-[0.7rem] tracking-[0.2em] relative py-2 transition-colors ${
                    isActive
                      ? 'text-gold-bright'
                      : 'text-gold/60 hover:text-gold-bright'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    <span
                      className={`absolute bottom-0 left-0 h-[1px] bg-gold-bright transition-all duration-300 ${
                        isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </div>

          <div className="hidden md:block">
            <NavLink
              to="/contact"
              className="relative px-6 py-2 font-mono text-[0.65rem] tracking-[0.15em] text-gold border border-gold/60 clip-corner-sm transition-all duration-300 hover:bg-gold hover:text-black hover:shadow-[0_0_25px_rgba(201,168,76,0.4)]"
            >
              REGISTER
            </NavLink>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-gold p-2"
            data-cursor-hover
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden fixed inset-0 top-16 bg-void/98 backdrop-blur-xl z-[400]">
          <div className="flex flex-col items-center justify-center h-full gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `font-mono text-sm tracking-[0.3em] transition-colors ${
                    isActive ? 'text-gold-bright' : 'text-gold/60'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <NavLink
              to="/contact"
              className="mt-4 px-8 py-3 font-mono text-sm tracking-[0.2em] text-gold border border-gold clip-corner"
            >
              REGISTER
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
}
