import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import VotingHeader from './components/VotingHeader';
import VotingInstructions from './components/VotingInstructions';
import CandidateCard from './components/CandidateCard';
import VotingActions from './components/VotingActions';
import VotingSecurityBadge from './components/VotingSecurityBadge';
import Icon from '../../components/AppIcon';


const VotingInterface = () => {
  const navigate = useNavigate();
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [studentName, setStudentName] = useState("Sarah Johnson");

  // Mock candidates data
  const candidates = [
    {
      id: "candidate-1",
      name: "Alex Chen",
      grade: "Grade 12 - Senior Class",
      description: "Passionate about student rights and environmental sustainability. I believe in creating a more inclusive and eco-friendly campus for all students.",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      experience: "2 years Student Council",
      platform: [
        "Implement campus-wide recycling program",
        "Extend library hours during exam periods",
        "Create mental health support groups",
        "Organize monthly student feedback sessions"
      ]
    },
    {
      id: "candidate-2", 
      name: "Maria Rodriguez",
      grade: "Grade 11 - Junior Class",
      description: "Dedicated to improving student life through better facilities and more engaging activities. Let's make our school experience unforgettable!",
      photo: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      experience: "Class Representative",
      platform: [
        "Upgrade cafeteria food options",
        "Install more study spaces around campus",
        "Host quarterly talent shows and events",
        "Improve Wi-Fi connectivity in all buildings"
      ]
    },
    {
      id: "candidate-3",
      name: "James Thompson", 
      grade: "Grade 12 - Senior Class",
      description: "Focused on academic excellence and preparing students for their future careers. Together, we can build a stronger academic community.",
      photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      experience: "Debate Team Captain",
      platform: [
        "Establish peer tutoring programs",
        "Create career guidance workshops",
        "Partner with local businesses for internships",
        "Launch academic achievement recognition program"
      ]
    },
    {
      id: "candidate-4",
      name: "Emily Davis",
      grade: "Grade 11 - Junior Class", 
      description: "Committed to fostering school spirit and building stronger connections between students, teachers, and the community.",
      photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      experience: "Drama Club President",
      platform: [
        "Organize inter-grade collaboration events",
        "Create student-teacher mentorship program",
        "Establish community service initiatives",
        "Launch school spirit week activities"
      ]
    }
  ];

  // Check authentication on component mount
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('studentAuthenticated');
    const authenticatedStudent = localStorage.getItem('authenticatedStudentName');
    
    if (!isAuthenticated || !authenticatedStudent) {
      navigate('/student-authentication');
      return;
    }
    
    setStudentName(authenticatedStudent);
  }, [navigate]);

  const handleCandidateSelect = (candidateId) => {
    const candidate = candidates?.find(c => c?.id === candidateId);
    setSelectedCandidate(candidate);
  };

  const handleSubmitVote = async (candidate) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Store vote data
      const voteData = {
        studentName,
        candidateId: candidate?.id,
        candidateName: candidate?.name,
        timestamp: new Date()?.toISOString(),
        sessionId: `VS-2025-${Date.now()}`
      };
      
      localStorage.setItem('voteSubmitted', 'true');
      localStorage.setItem('voteData', JSON.stringify(voteData));
      
      // Navigate to confirmation page
      navigate('/vote-confirmation');
      
    } catch (error) {
      console.error('Vote submission failed:', error);
      alert('Failed to submit vote. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('studentAuthenticated');
    localStorage.removeItem('authenticatedStudentName');
    navigate('/student-authentication');
  };

  const handleGoBack = () => {
    navigate('/student-authentication');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <VotingHeader 
        studentName={studentName}
        onLogout={handleLogout}
        showProgress={true}
        currentStep={2}
        totalSteps={3}
      />
      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-32">
        {/* Security Badge */}
        <VotingSecurityBadge 
          sessionId={`VS-2025-${Date.now()?.toString()?.slice(-6)}`}
          timestamp={new Date()?.toLocaleString()}
        />

        {/* Voting Instructions */}
        <VotingInstructions 
          title="Student Council President Election 2025"
          description="Select one candidate for Student Council President. Review each candidate's platform carefully before making your choice."
          instructions={[
            "Review all candidates and their platforms",
            "Click on a candidate card to select them",
            "Only one selection is allowed per student",
            "Click 'Submit Vote' to cast your ballot",
            "Your vote cannot be changed once submitted"
          ]}
        />

        {/* Candidates Grid */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Choose Your Candidate
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {candidates?.map((candidate) => (
              <CandidateCard
                key={candidate?.id}
                candidate={candidate}
                isSelected={selectedCandidate?.id === candidate?.id}
                onSelect={handleCandidateSelect}
                disabled={isSubmitting}
              />
            ))}
          </div>
        </div>

        {/* Vote Summary */}
        {selectedCandidate && (
          <div className="mt-8 bg-primary/5 border border-primary/20 rounded-lg p-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Icon name="CheckCircle" size={20} className="text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Your Selection</h3>
                <p className="text-sm text-muted-foreground">
                  You have selected <span className="font-medium text-primary">{selectedCandidate?.name}</span> for Student Council President
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
      {/* Voting Actions */}
      <VotingActions
        selectedCandidate={selectedCandidate}
        onSubmitVote={handleSubmitVote}
        onGoBack={handleGoBack}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default VotingInterface;