import React from 'react';
import Icon from '../AppIcon';

const VotingProgressIndicator = ({ 
  currentStep = 1, 
  totalSteps = 3,
  steps = [
    { id: 1, title: 'Authentication', description: 'Verify your identity' },
    { id: 2, title: 'Cast Vote', description: 'Make your selection' },
    { id: 3, title: 'Confirmation', description: 'Review and submit' }
  ],
  showDescriptions = true,
  variant = 'default' // 'default', 'compact', 'minimal'
}) => {
  const getStepStatus = (stepId) => {
    if (stepId < currentStep) return 'completed';
    if (stepId === currentStep) return 'current';
    return 'upcoming';
  };

  const getStepClasses = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-success text-success-foreground border-success';
      case 'current':
        return 'bg-primary text-primary-foreground border-primary ring-2 ring-primary/20';
      case 'upcoming':
        return 'bg-muted text-muted-foreground border-border';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getConnectorClasses = (stepId) => {
    return stepId < currentStep ? 'bg-success' : 'bg-border';
  };

  if (variant === 'minimal') {
    return (
      <div className="flex items-center justify-center space-x-2 py-4">
        <span className="text-sm text-muted-foreground">
          Step {currentStep} of {totalSteps}
        </span>
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
    );
  }

  if (variant === 'compact') {
    return (
      <div className="bg-card border border-border rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              {steps?.map((step, index) => (
                <div key={step?.id} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-medium transition-smooth ${
                    getStepClasses(getStepStatus(step?.id))
                  }`}>
                    {getStepStatus(step?.id) === 'completed' ? (
                      <Icon name="Check" size={16} />
                    ) : (
                      step?.id
                    )}
                  </div>
                  {index < steps?.length - 1 && (
                    <div className={`w-8 h-0.5 mx-2 transition-smooth ${
                      getConnectorClasses(step?.id)
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm font-medium text-foreground">
              {steps?.find(step => step?.id === currentStep)?.title}
            </div>
            <div className="text-xs text-muted-foreground">
              Step {currentStep} of {totalSteps}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">Voting Progress</h2>
        <span className="text-sm text-muted-foreground">
          Step {currentStep} of {totalSteps}
        </span>
      </div>
      <div className="relative">
        {/* Progress Steps */}
        <div className="flex items-center justify-between">
          {steps?.map((step, index) => {
            const status = getStepStatus(step?.id);
            return (
              <div key={step?.id} className="flex flex-col items-center relative">
                {/* Step Circle */}
                <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center text-sm font-medium transition-smooth ${
                  getStepClasses(status)
                }`}>
                  {status === 'completed' ? (
                    <Icon name="Check" size={20} />
                  ) : (
                    step?.id
                  )}
                </div>
                {/* Step Info */}
                <div className="mt-3 text-center">
                  <div className={`text-sm font-medium transition-smooth ${
                    status === 'current' ? 'text-primary' : 
                    status === 'completed' ? 'text-success' : 'text-muted-foreground'
                  }`}>
                    {step?.title}
                  </div>
                  {showDescriptions && (
                    <div className="text-xs text-muted-foreground mt-1 max-w-24">
                      {step?.description}
                    </div>
                  )}
                </div>
                {/* Connector Line */}
                {index < steps?.length - 1 && (
                  <div className={`absolute top-6 left-12 w-full h-0.5 transition-smooth ${
                    getConnectorClasses(step?.id)
                  }`} style={{ width: 'calc(100vw / 3 - 3rem)' }} />
                )}
              </div>
            );
          })}
        </div>
      </div>
      {/* Current Step Details */}
      <div className="mt-6 p-4 bg-muted/50 rounded-md">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <Icon name="Info" size={16} color="white" />
          </div>
          <div>
            <div className="text-sm font-medium text-foreground">
              Current: {steps?.find(step => step?.id === currentStep)?.title}
            </div>
            <div className="text-xs text-muted-foreground">
              {steps?.find(step => step?.id === currentStep)?.description}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VotingProgressIndicator;