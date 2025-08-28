import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import StudentHeader from '../../components/ui/StudentHeader';
import SuccessMessage from './components/SuccessMessage';
import VoteSummaryCard from './components/VoteSummaryCard';
import VotingStatusAlert from './components/VotingStatusAlert';
import ReceiptActions from './components/ReceiptActions';
import AutoLogoutTimer from './components/AutoLogoutTimer';
import NavigationOptions from './components/NavigationOptions';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';



const VoteConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Mock student data - in real app, this would come from authentication state
  const [studentData] = useState({
    name: "Sarah Johnson",
    id: "STU-2025-5678",
    isAuthenticated: true
  });

  // Mock vote data - in real app, this would come from the voting process
  const [voteData] = useState({
    selectedCandidate: "Emily Rodriguez",
    position: "Student Body President",
    timestamp: new Date(),
    confirmationNumber: "VT-2025-001234"
  });

  const [showHelpModal, setShowHelpModal] = useState(false);

  // Redirect if user tries to access this page without completing voting
  useEffect(() => {
    // In real app, check if user has actually completed voting
    const hasCompletedVoting = location?.state?.hasCompletedVoting || true; // Mock as true for demo
    
    if (!hasCompletedVoting) {
      navigate('/student-authentication');
    }
  }, [navigate, location?.state]);

  const handleLogout = () => {
    // Clear authentication state and redirect
    navigate('/student-authentication');
  };

  const handleExtendSession = () => {
    console.log('Session extended');
    // In real app, refresh authentication token
  };

  const handleHelpClick = () => {
    setShowHelpModal(true);
  };

  const confirmationData = {
    studentName: studentData?.name,
    selectedCandidate: voteData?.selectedCandidate,
    position: voteData?.position,
    timestamp: voteData?.timestamp,
    confirmationNumber: voteData?.confirmationNumber
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <StudentHeader
        studentName={studentData?.name}
        isAuthenticated={studentData?.isAuthenticated}
        onLogout={handleLogout}
        showProgress={false}
      />
      {/* Main Content */}
      <main className="pt-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Success Message */}
          <SuccessMessage studentName={studentData?.name} />

          {/* Voting Status Alert */}
          <VotingStatusAlert />

          {/* Vote Summary */}
          <VoteSummaryCard
            selectedCandidate={voteData?.selectedCandidate}
            position={voteData?.position}
            timestamp={voteData?.timestamp}
            confirmationNumber={voteData?.confirmationNumber}
          />

          {/* Receipt Actions */}
          <div className="mb-8">
            <ReceiptActions confirmationData={confirmationData} />
          </div>

          {/* Auto Logout Timer */}
          <div className="mb-8">
            <AutoLogoutTimer
              initialTime={300} // 5 minutes
              onLogout={handleLogout}
              onExtendSession={handleExtendSession}
            />
          </div>

          {/* Navigation Options */}
          <NavigationOptions
            onHelpClick={handleHelpClick}
            showReturnHome={true}
          />
        </div>
      </main>
      {/* Help Modal */}
      {showHelpModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-120 p-4">
          <div className="bg-card border border-border rounded-lg max-w-md w-full max-h-[80vh] overflow-y-auto animate-scale-in">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-foreground">Help & Support</h2>
                <button
                  onClick={() => setShowHelpModal(false)}
                  className="p-1 hover:bg-muted rounded-md transition-hover"
                >
                  <Icon name="X" size={20} />
                </button>
              </div>
              
              <div className="space-y-4 text-sm">
                <div>
                  <h3 className="font-medium text-foreground mb-2">Voting Confirmation</h3>
                  <p className="text-muted-foreground">
                    Your vote has been successfully recorded. The confirmation number serves as proof of your participation.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium text-foreground mb-2">Receipt Download</h3>
                  <p className="text-muted-foreground">
                    Download your voting receipt for your records. This receipt does not reveal your vote choice.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium text-foreground mb-2">Session Security</h3>
                  <p className="text-muted-foreground">
                    For security, you will be automatically logged out after 5 minutes of inactivity.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium text-foreground mb-2">Contact Support</h3>
                  <p className="text-muted-foreground">
                    For technical issues or questions, contact the Election Committee at elections@school.edu
                  </p>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <Button
                  variant="default"
                  onClick={() => setShowHelpModal(false)}
                >
                  Got it
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Overlay for modal */}
      {showHelpModal && (
        <div 
          className="fixed inset-0 z-110" 
          onClick={() => setShowHelpModal(false)}
        />
      )}
    </div>
  );
};

export default VoteConfirmation;