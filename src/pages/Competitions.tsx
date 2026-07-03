import { useState, useCallback, useEffect } from 'react';
import { PageTransition } from '../components/PageTransition';
import { OrbitView } from '../components/OrbitView';
import { ScrollView } from '../components/ScrollView';
import { EventDetailPanel } from '../components/EventDetailPanel';
import { CategoryFilter } from '../components/CategoryFilter';
import { ViewToggleButton } from '../components/ViewToggleButton';
import { competitions, EventItem } from '../data/events';

const COMPETITION_CATEGORIES = ['ALL', 'CODING', 'ROBOTICS', 'DESIGN', 'CTF', 'GAMING'];

export function Competitions() {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [currentView, setCurrentView] = useState<'orbit' | 'scroll'>('orbit');
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const handleCategoryChange = useCallback((category: string) => {
    setActiveCategory(category);
  }, []);

  const handleViewChange = useCallback((view: 'orbit' | 'scroll') => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentView(view);
      setIsTransitioning(false);
    }, 400);
  }, []);

  const handleItemClick = useCallback((item: EventItem) => {
    setSelectedEvent(item);
    setIsPanelOpen(true);
  }, []);

  const handlePanelClose = useCallback(() => {
    setIsPanelOpen(false);
    setTimeout(() => {
      setSelectedEvent(null);
    }, 300);
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isPanelOpen) {
        handlePanelClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isPanelOpen, handlePanelClose]);

  return (
    <PageTransition>
      <div className="page-wrapper">
        <header className="page-header">
          <h1 className="page-title">COMPETE</h1>
          <p className="page-subtitle">
            Choose your mission · Drag the orbit · Click to enter
          </p>
        </header>

        <CategoryFilter
          categories={COMPETITION_CATEGORIES}
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />

        <div className="view-container">
          {!isTransitioning && currentView === 'orbit' && (
            <OrbitView
              items={competitions}
              activeCategory={activeCategory}
              onItemClick={handleItemClick}
              isFrozen={isPanelOpen}
            />
          )}

          {!isTransitioning && currentView === 'scroll' && (
            <ScrollView
              items={competitions}
              activeCategory={activeCategory}
              onItemClick={handleItemClick}
              isFrozen={isPanelOpen}
            />
          )}

          <ViewToggleButton
            currentView={currentView}
            onViewChange={handleViewChange}
          />
        </div>

        <EventDetailPanel
          event={selectedEvent}
          onClose={handlePanelClose}
        />
      </div>
    </PageTransition>
  );
}
