import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const CandidateCard = ({ 
  candidate,
  isSelected = false,
  onSelect = () => {},
  disabled = false
}) => {
  const {
    id,
    name,
    grade,
    description,
    photo,
    platform,
    experience
  } = candidate;

  return (
    <div 
      className={`bg-card border-2 rounded-lg p-6 cursor-pointer transition-all duration-200 ${
        isSelected 
          ? 'border-primary bg-primary/5 shadow-md' 
          : 'border-border hover:border-primary/50 hover:shadow-sm'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      onClick={() => !disabled && onSelect(id)}
    >
      {/* Selection Radio */}
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0 pt-1">
          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
            isSelected 
              ? 'border-primary bg-primary' :'border-muted-foreground'
          }`}>
            {isSelected && (
              <div className="w-2 h-2 bg-white rounded-full" />
            )}
          </div>
        </div>

        <div className="flex-1">
          {/* Candidate Photo and Basic Info */}
          <div className="flex items-start space-x-4 mb-4">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-muted flex-shrink-0">
              {photo ? (
                <Image 
                  src={photo} 
                  alt={`${name} profile photo`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Icon name="User" size={24} className="text-muted-foreground" />
                </div>
              )}
            </div>
            
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-foreground">{name}</h3>
              <p className="text-sm text-muted-foreground">{grade}</p>
              {experience && (
                <div className="flex items-center space-x-1 mt-1">
                  <Icon name="Award" size={14} className="text-accent" />
                  <span className="text-xs text-muted-foreground">{experience}</span>
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          {description && (
            <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
              {description}
            </p>
          )}

          {/* Platform/Promises */}
          {platform && platform?.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-foreground mb-2">Key Promises:</h4>
              <ul className="space-y-1">
                {platform?.slice(0, 3)?.map((promise, index) => (
                  <li key={index} className="flex items-start space-x-2 text-sm text-muted-foreground">
                    <Icon name="CheckCircle" size={14} className="text-success mt-0.5 flex-shrink-0" />
                    <span>{promise}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      {/* Selection Indicator */}
      {isSelected && (
        <div className="mt-4 pt-4 border-t border-primary/20">
          <div className="flex items-center justify-center space-x-2 text-primary">
            <Icon name="CheckCircle" size={16} />
            <span className="text-sm font-medium">Selected</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CandidateCard;