import React from 'react';
import Icon from '../../../components/AppIcon';

const SuccessMessage = ({ studentName = "Student User" }) => {
  return (
    <div className="text-center mb-8">
      {/* Success Icon */}
      <div className="w-20 h-20 bg-success rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
        <Icon name="CheckCircle" size={40} color="white" />
      </div>
      
      {/* Success Message */}
      <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
        Vote Recorded Successfully!
      </h1>
      
      <p className="text-lg text-muted-foreground mb-2">
        Thank you, {studentName}
      </p>
      
      <p className="text-base text-muted-foreground max-w-md mx-auto">
        Your vote has been securely recorded and cannot be changed. You have completed the voting process.
      </p>
    </div>
  );
};

export default SuccessMessage;