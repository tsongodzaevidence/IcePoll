import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const VotingHeader = ({ 
  studentName = "Student User",
  onLogout = () => {},
  showProgress = true,
  currentStep = 2,
  totalSteps = 3
}) => {
  return (
    <header className="bg-card border-b border-border sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
              <Icon name="Vote" size={20} color="white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-foreground">Ice Poll</h1>
              <p className="text-xs text-muted-foreground hidden sm:block">Cast Your Vote</p>
            </div>
          </div>

          {/* Student Info and Logout */}
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <Icon name="User" size={16} className="text-primary" />
              </div>
              <span className="text-sm font-medium text-foreground">{studentName}</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onLogout}
              iconName="LogOut"
              iconPosition="left"
              className="text-muted-foreground hover:text-foreground"
            >
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>

        {/* Progress Indicator */}
        {showProgress && (
          <div className="pb-4">
            <div className="flex items-center justify-center space-x-2">
              <span className="text-xs text-muted-foreground">Step {currentStep} of {totalSteps}</span>
              <div className="flex space-x-1">
                {Array.from({ length: totalSteps }, (_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-smooth ${
                      index + 1 <= currentStep ? 'bg-primary' : 'bg-muted'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default VotingHeader;