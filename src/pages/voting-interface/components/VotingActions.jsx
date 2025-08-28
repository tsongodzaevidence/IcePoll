import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const VotingActions = ({ 
  selectedCandidate = null,
  onSubmitVote = () => {},
  onGoBack = () => {},
  isSubmitting = false,
  disabled = false
}) => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleSubmitClick = () => {
    if (!selectedCandidate) return;
    setShowConfirmation(true);
  };

  const handleConfirmSubmit = () => {
    setShowConfirmation(false);
    onSubmitVote(selectedCandidate);
  };

  const handleCancelSubmit = () => {
    setShowConfirmation(false);
  };

  return (
    <>
      {/* Action Buttons */}
      <div className="sticky bottom-0 bg-background border-t border-border p-4 mt-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0 sm:space-x-4">
            {/* Back Button */}
            <Button
              variant="outline"
              onClick={onGoBack}
              disabled={isSubmitting}
              iconName="ArrowLeft"
              iconPosition="left"
              className="w-full sm:w-auto"
            >
              Go Back
            </Button>

            {/* Vote Status and Submit */}
            <div className="flex items-center space-x-4 w-full sm:w-auto">
              {/* Selection Status */}
              <div className="flex items-center space-x-2 text-sm">
                {selectedCandidate ? (
                  <>
                    <Icon name="CheckCircle" size={16} className="text-success" />
                    <span className="text-success font-medium">Candidate Selected</span>
                  </>
                ) : (
                  <>
                    <Icon name="AlertCircle" size={16} className="text-warning" />
                    <span className="text-muted-foreground">Select a candidate</span>
                  </>
                )}
              </div>

              {/* Submit Button */}
              <Button
                variant="default"
                onClick={handleSubmitClick}
                disabled={!selectedCandidate || isSubmitting || disabled}
                loading={isSubmitting}
                iconName="Send"
                iconPosition="right"
                className="w-full sm:w-auto"
              >
                Submit Vote
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-100 p-4">
          <div className="bg-card border border-border rounded-lg max-w-md w-full p-6 animate-scale-in">
            <div className="text-center">
              <div className="w-12 h-12 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="AlertTriangle" size={24} className="text-warning" />
              </div>
              
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Confirm Your Vote
              </h3>
              
              <p className="text-muted-foreground mb-6">
                Are you sure you want to submit your vote? This action cannot be undone.
              </p>

              {/* Selected Candidate Summary */}
              {selectedCandidate && (
                <div className="bg-muted/50 rounded-lg p-4 mb-6">
                  <div className="flex items-center space-x-3">
                    <Icon name="User" size={20} className="text-primary" />
                    <div className="text-left">
                      <p className="font-medium text-foreground">Selected Candidate:</p>
                      <p className="text-sm text-muted-foreground">{selectedCandidate?.name}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={handleCancelSubmit}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  variant="default"
                  onClick={handleConfirmSubmit}
                  className="flex-1"
                  iconName="Check"
                  iconPosition="left"
                >
                  Confirm Vote
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VotingActions;