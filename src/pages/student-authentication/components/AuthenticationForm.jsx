import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import StudentNameSelector from './StudentNameSelector';

const AuthenticationForm = () => {
  const navigate = useNavigate();
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authError, setAuthError] = useState(null);

  const handleStudentSelect = (student) => {
    setSelectedStudent(student);
    setAuthError(null);
  };

  const handleContinueToVote = async () => {
    if (!selectedStudent) {
      setAuthError('Please select your name to continue');
      return;
    }

    setIsAuthenticating(true);
    setAuthError(null);

    try {
      // Simulate authentication process
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Check if student has already voted (mock check)
      const hasVoted = Math.random() < 0.1; // 10% chance student has already voted
      
      if (hasVoted) {
        setAuthError('You have already cast your vote. Each student can only vote once.');
        setIsAuthenticating(false);
        return;
      }

      // Store authentication in localStorage
      localStorage.setItem('authenticatedStudent', JSON.stringify({
        id: selectedStudent?.id,
        name: selectedStudent?.name,
        class: selectedStudent?.class,
        rollNumber: selectedStudent?.rollNumber,
        authenticatedAt: new Date()?.toISOString()
      }));

      // Navigate to voting interface
      navigate('/voting-interface');
      
    } catch (error) {
      setAuthError('Authentication failed. Please try again.');
      setIsAuthenticating(false);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <StudentNameSelector
        onStudentSelect={handleStudentSelect}
        selectedStudent={selectedStudent}
        isLoading={false}
        error={authError}
      />

      <div className="mt-8">
        <Button
          variant="default"
          size="lg"
          fullWidth
          onClick={handleContinueToVote}
          disabled={!selectedStudent || isAuthenticating}
          loading={isAuthenticating}
          iconName="ArrowRight"
          iconPosition="right"
        >
          {isAuthenticating ? 'Authenticating...' : 'Continue to Vote'}
        </Button>
      </div>

      {authError && (
        <div className="mt-4 bg-error/10 border border-error/20 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-error/20 rounded-full flex items-center justify-center">
              <Icon name="AlertCircle" size={16} className="text-error" />
            </div>
            <div className="text-sm text-error">
              {authError}
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 text-center">
        <p className="text-xs text-muted-foreground">
          Having trouble finding your name?{' '}
          <button className="text-primary hover:underline">
            Contact support
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthenticationForm;