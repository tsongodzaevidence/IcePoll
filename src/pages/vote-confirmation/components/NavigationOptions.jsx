import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NavigationOptions = ({ 
  onHelpClick = () => {},
  showReturnHome = true 
}) => {
  const navigate = useNavigate();

  const handleReturnHome = () => {
    // Navigate to main landing page or student authentication
    navigate('/student-authentication');
  };

  const handleHelp = () => {
    onHelpClick();
  };

  return (
    <div className="space-y-4">
      {/* Primary Navigation */}
      <div className="flex flex-col sm:flex-row gap-3">
        {showReturnHome && (
          <Button
            variant="outline"
            size="lg"
            onClick={handleReturnHome}
            iconName="Home"
            iconPosition="left"
            className="flex-1"
          >
            Return to Home
          </Button>
        )}
        
        <Button
          variant="ghost"
          size="lg"
          onClick={handleHelp}
          iconName="HelpCircle"
          iconPosition="left"
          className="flex-1 sm:flex-none"
        >
          Help & Support
        </Button>
      </div>

      {/* Additional Information */}
      <div className="bg-muted/50 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={16} className="text-muted-foreground mt-0.5" />
          <div className="flex-1 text-sm text-muted-foreground">
            <p className="mb-2">
              <strong className="text-foreground">What happens next?</strong>
            </p>
            <ul className="space-y-1 text-xs">
              <li>• Your vote has been securely recorded and encrypted</li>
              <li>• Results will be announced after the voting period ends</li>
              <li>• You will receive an email notification when results are available</li>
              <li>• Keep your confirmation number for any future reference</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="text-center">
        <p className="text-xs text-muted-foreground">
          Questions about voting? Contact the Election Committee at{' '}
          <a href="mailto:elections@school.edu" className="text-primary hover:underline">
            elections@school.edu
          </a>
        </p>
      </div>
    </div>
  );
};

export default NavigationOptions;