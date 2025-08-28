import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AutoLogoutTimer = ({ 
  initialTime = 300, // 5 minutes in seconds
  onLogout = () => {},
  onExtendSession = () => {}
}) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [showWarning, setShowWarning] = useState(false);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (!isActive) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsActive(false);
          onLogout();
          return 0;
        }
        
        // Show warning when 2 minutes left
        if (prev <= 120 && !showWarning) {
          setShowWarning(true);
        }
        
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, showWarning, onLogout]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds?.toString()?.padStart(2, '0')}`;
  };

  const handleExtendSession = () => {
    setTimeLeft(initialTime);
    setShowWarning(false);
    onExtendSession();
  };

  const handleLogoutNow = () => {
    setIsActive(false);
    onLogout();
  };

  if (!isActive && timeLeft === 0) {
    return null; // Component will be unmounted after logout
  }

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="Clock" size={16} className="text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">Session Timer</span>
        </div>
        <div className={`text-lg font-mono font-bold ${
          timeLeft <= 60 ? 'text-error' : timeLeft <= 120 ? 'text-warning' : 'text-foreground'
        }`}>
          {formatTime(timeLeft)}
        </div>
      </div>

      {showWarning && (
        <div className="bg-warning/10 border border-warning/20 rounded-md p-3 mb-4">
          <div className="flex items-start space-x-2">
            <Icon name="AlertTriangle" size={16} className="text-warning mt-0.5" />
            <div className="flex-1">
              <p className="text-sm text-foreground font-medium">Session Expiring Soon</p>
              <p className="text-xs text-muted-foreground">
                You will be automatically logged out in {formatTime(timeLeft)} for security.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleExtendSession}
          iconName="RefreshCw"
          iconPosition="left"
          className="flex-1"
        >
          Extend Session
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLogoutNow}
          iconName="LogOut"
          iconPosition="left"
          className="flex-1 sm:flex-none"
        >
          Logout Now
        </Button>
      </div>

      <p className="text-xs text-muted-foreground mt-3 text-center">
        Automatic logout helps protect your voting privacy and account security
      </p>
    </div>
  );
};

export default AutoLogoutTimer;