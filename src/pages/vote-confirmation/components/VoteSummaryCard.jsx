import React from 'react';
import Icon from '../../../components/AppIcon';

const VoteSummaryCard = ({ 
  selectedCandidate = "John Smith",
  position = "Student Body President",
  timestamp = new Date(),
  confirmationNumber = "VT-2025-001234"
}) => {
  const formatTimestamp = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })?.format(date);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6 shadow-card">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">Vote Summary</h2>
        <div className="flex items-center space-x-2 text-success">
          <Icon name="Shield" size={16} />
          <span className="text-sm font-medium">Verified</span>
        </div>
      </div>
      
      <div className="space-y-4">
        {/* Selected Candidate */}
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
            <Icon name="User" size={16} className="text-primary" />
          </div>
          <div className="flex-1">
            <div className="text-sm text-muted-foreground">Your Selection</div>
            <div className="font-medium text-foreground">{selectedCandidate}</div>
            <div className="text-sm text-muted-foreground">{position}</div>
          </div>
        </div>
        
        {/* Timestamp */}
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
            <Icon name="Clock" size={16} className="text-accent" />
          </div>
          <div className="flex-1">
            <div className="text-sm text-muted-foreground">Submitted At</div>
            <div className="font-medium text-foreground">{formatTimestamp(timestamp)}</div>
          </div>
        </div>
        
        {/* Confirmation Number */}
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
            <Icon name="Hash" size={16} className="text-secondary" />
          </div>
          <div className="flex-1">
            <div className="text-sm text-muted-foreground">Confirmation Number</div>
            <div className="font-mono font-medium text-foreground bg-muted px-2 py-1 rounded text-sm inline-block">
              {confirmationNumber}
            </div>
          </div>
        </div>
      </div>
      
      {/* Security Notice */}
      <div className="mt-6 p-4 bg-muted/50 rounded-md">
        <div className="flex items-start space-x-3">
          <Icon name="Lock" size={16} className="text-muted-foreground mt-0.5" />
          <div className="text-sm text-muted-foreground">
            <strong className="text-foreground">Vote Privacy:</strong> Your vote is encrypted and anonymous. 
            This confirmation only verifies that you participated in the election.
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoteSummaryCard;