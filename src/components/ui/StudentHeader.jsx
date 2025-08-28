import React, { useState } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const StudentHeader = ({ 
  studentName = "Student User", 
  isAuthenticated = false,
  onLogout = () => {},
  showProgress = false,
  currentStep = 1,
  totalSteps = 3
}) => {
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = () => {
    setShowUserMenu(false);
    onLogout();
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-card border-b border-border z-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                  <Icon name="Vote" size={20} color="white" />
                </div>
                <span className="text-xl font-semibold text-foreground">StudentVote</span>
              </div>
            </div>
          </div>

          {/* Progress Indicator - Only show during voting flow */}
          {showProgress && (
            <div className="hidden sm:flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                {Array.from({ length: totalSteps }, (_, index) => (
                  <div key={index} className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-smooth ${
                      index + 1 < currentStep 
                        ? 'bg-success text-success-foreground' 
                        : index + 1 === currentStep
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {index + 1 < currentStep ? (
                        <Icon name="Check" size={16} />
                      ) : (
                        index + 1
                      )}
                    </div>
                    {index < totalSteps - 1 && (
                      <div className={`w-8 h-0.5 mx-1 transition-smooth ${
                        index + 1 < currentStep ? 'bg-success' : 'bg-muted'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* User Menu */}
          {isAuthenticated && (
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-foreground hover:bg-muted transition-hover focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <Icon name="User" size={16} color="white" />
                </div>
                <span className="hidden sm:block">{studentName}</span>
                <Icon name="ChevronDown" size={16} className={`transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-popover border border-border rounded-md shadow-modal z-110 animate-fade-in">
                  <div className="py-1">
                    <div className="px-4 py-2 text-sm text-muted-foreground border-b border-border">
                      Signed in as
                      <div className="font-medium text-foreground">{studentName}</div>
                    </div>
                    <button
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center w-full px-4 py-2 text-sm text-foreground hover:bg-muted transition-hover"
                    >
                      <Icon name="HelpCircle" size={16} className="mr-2" />
                      Help & Support
                    </button>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-error hover:bg-muted transition-hover"
                    >
                      <Icon name="LogOut" size={16} className="mr-2" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Help Button for non-authenticated users */}
          {!isAuthenticated && (
            <Button variant="ghost" size="sm">
              <Icon name="HelpCircle" size={16} className="mr-2" />
              Help
            </Button>
          )}
        </div>
      </div>

      {/* Mobile Progress Indicator */}
      {showProgress && (
        <div className="sm:hidden px-4 pb-3">
          <div className="flex items-center justify-center space-x-1">
            {Array.from({ length: totalSteps }, (_, index) => (
              <div key={index} className="flex items-center">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium transition-smooth ${
                  index + 1 < currentStep 
                    ? 'bg-success text-success-foreground' 
                    : index + 1 === currentStep
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {index + 1 < currentStep ? (
                    <Icon name="Check" size={12} />
                  ) : (
                    index + 1
                  )}
                </div>
                {index < totalSteps - 1 && (
                  <div className={`w-4 h-0.5 mx-1 transition-smooth ${
                    index + 1 < currentStep ? 'bg-success' : 'bg-muted'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Overlay for mobile menu */}
      {showUserMenu && (
        <div 
          className="fixed inset-0 z-90" 
          onClick={() => setShowUserMenu(false)}
        />
      )}
    </header>
  );
};

export default StudentHeader;