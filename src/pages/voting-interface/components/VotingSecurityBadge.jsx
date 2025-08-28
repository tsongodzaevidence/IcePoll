import React from 'react';
import Icon from '../../../components/AppIcon';

const VotingSecurityBadge = ({ 
  sessionId = "VS-2025-001",
  timestamp = new Date()?.toLocaleString(),
  showDetails = true
}) => {
  return (
    <div className="bg-success/5 border border-success/20 rounded-lg p-4 mb-6">
      <div className="flex items-start space-x-3">
        <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center flex-shrink-0">
          <Icon name="Shield" size={16} className="text-success" />
        </div>
        
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <h3 className="text-sm font-semibold text-success">Secure Voting Session</h3>
            <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
          </div>
          
          <p className="text-xs text-muted-foreground mb-3">
            Your vote is encrypted and anonymous. This session is monitored for security.
          </p>

          {showDetails && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="flex items-center space-x-2">
                <Icon name="Clock" size={12} className="text-muted-foreground" />
                <span className="text-muted-foreground">Session: {timestamp}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Hash" size={12} className="text-muted-foreground" />
                <span className="text-muted-foreground">ID: {sessionId}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VotingSecurityBadge;