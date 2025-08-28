import React from 'react';
import Icon from '../../../components/AppIcon';

const SecurityIndicators = () => {
  const securityFeatures = [
    {
      icon: 'Shield',
      title: 'Secure Authentication',
      description: 'Your identity is verified through our secure system'
    },
    {
      icon: 'Lock',
      title: 'One Vote Per Student',
      description: 'Each student can only vote once to ensure fairness'
    },
    {
      icon: 'Eye',
      title: 'Anonymous Voting',
      description: 'Your vote choices remain completely private'
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6 mt-8">
      <div className="flex items-center justify-center mb-4">
        <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center">
          <Icon name="ShieldCheck" size={24} className="text-success" />
        </div>
      </div>
      <h3 className="text-lg font-semibold text-foreground text-center mb-4">
        Secure Voting Process
      </h3>
      <div className="space-y-4">
        {securityFeatures?.map((feature, index) => (
          <div key={index} className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <Icon name={feature?.icon} size={16} className="text-primary" />
            </div>
            <div>
              <div className="font-medium text-foreground text-sm">
                {feature?.title}
              </div>
              <div className="text-xs text-muted-foreground">
                {feature?.description}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-center space-x-2">
          <Icon name="Lock" size={16} className="text-success" />
          <span className="text-sm font-medium text-success">SSL Secured</span>
        </div>
      </div>
    </div>
  );
};

export default SecurityIndicators;