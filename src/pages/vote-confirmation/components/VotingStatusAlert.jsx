import React from 'react';
import Icon from '../../../components/AppIcon';

const VotingStatusAlert = () => {
  return (
    <div className="bg-warning/10 border border-warning/20 rounded-lg p-4 mb-6">
      <div className="flex items-start space-x-3">
        <div className="w-8 h-8 bg-warning/20 rounded-full flex items-center justify-center flex-shrink-0">
          <Icon name="AlertCircle" size={16} className="text-warning" />
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-foreground mb-1">Voting Complete</h3>
          <p className="text-sm text-muted-foreground">
            You have successfully completed voting and cannot vote again. 
            Each student is allowed only one vote per election to ensure fairness and integrity.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VotingStatusAlert;