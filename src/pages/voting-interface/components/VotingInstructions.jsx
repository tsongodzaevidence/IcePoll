import React from 'react';
import Icon from '../../../components/AppIcon';

const VotingInstructions = ({ 
  title = "Student Council Election 2025",
  description = "Select one candidate for Student Council President",
  instructions = [
    "Review all candidates carefully",
    "Select one option by clicking the radio button",
    "Click 'Submit Vote' to cast your ballot",
    "Your vote cannot be changed once submitted"
  ]
}) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex items-start space-x-4">
        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
          <Icon name="Info" size={20} className="text-primary" />
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-foreground mb-2">{title}</h2>
          <p className="text-muted-foreground mb-4">{description}</p>
          
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-foreground">Instructions:</h3>
            <ul className="space-y-1">
              {instructions?.map((instruction, index) => (
                <li key={index} className="flex items-start space-x-2 text-sm text-muted-foreground">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <span>{instruction}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VotingInstructions;