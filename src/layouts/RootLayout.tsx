import { Outlet } from 'react-router-dom';
import { CustomCursor } from '../components/CustomCursor';
import { Starfield } from '../components/Starfield';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { FilmGrain } from '../components/FilmGrain';

export function RootLayout() {
  return (
    <div className="relative min-h-screen bg-void">
      <CustomCursor />
      <Starfield />
      <FilmGrain />
      <Navbar />
      <main className="relative z-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
