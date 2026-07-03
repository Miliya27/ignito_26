import { StrictMode, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Lenis from 'lenis';
import './index.css';

import { RootLayout } from './layouts/RootLayout';
import { Home } from './pages/Home';
import { Events } from './pages/Events';
import { Competitions } from './pages/Competitions';
import { Speakers } from './pages/Speakers';
import { Schedule } from './pages/Schedule';
import { Contact } from './pages/Contact';
import { LoadingScreen } from './components/LoadingScreen';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'events', element: <Events /> },
      { path: 'competitions', element: <Competitions /> },
      { path: 'speakers', element: <Speakers /> },
      { path: 'schedule', element: <Schedule /> },
      { path: 'contact', element: <Contact /> },
    ],
  },
]);

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasLoaded, setHasLoaded] = useState(() => {
    return sessionStorage.getItem('ignito_loaded') === 'true';
  });

  useEffect(() => {
    if (hasLoaded) {
      setIsLoading(false);
      return;
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [hasLoaded]);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    setHasLoaded(true);
    sessionStorage.setItem('ignito_loaded', 'true');
  };

  if (isLoading && !hasLoaded) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  return (
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
}

createRoot(document.getElementById('root')!).render(<App />);
