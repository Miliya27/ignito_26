import { useState } from 'react';

interface ViewToggleButtonProps {
  currentView: 'orbit' | 'scroll';
  onViewChange: (view: 'orbit' | 'scroll') => void;
}

export function ViewToggleButton({ currentView, onViewChange }: ViewToggleButtonProps) {
  const [isClicking, setIsClicking] = useState(false);

  const handleClick = () => {
    setIsClicking(true);
    setTimeout(() => setIsClicking(false), 150);
    onViewChange(currentView === 'orbit' ? 'scroll' : 'orbit');
  };

  return (
    <button
      className={`view-toggle-button ${isClicking ? 'clicking' : ''}`}
      onClick={handleClick}
      data-cursor-hover
    >
      {currentView === 'orbit' ? (
        <span className="toggle-content">
          <span className="toggle-icon">☰</span>
          <span className="toggle-text">LIST VIEW</span>
        </span>
      ) : (
        <span className="toggle-content">
          <span className="toggle-icon">◎</span>
          <span className="toggle-text">ORBIT VIEW</span>
        </span>
      )}
    </button>
  );
}
