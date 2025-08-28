import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import AuthenticationForm from './components/AuthenticationForm';
import SecurityIndicators from './components/SecurityIndicators';





const StudentAuthentication = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if student is already authenticated
    const authenticatedStudent = localStorage.getItem('authenticatedStudent');
    if (authenticatedStudent) {
      const student = JSON.parse(authenticatedStudent);
      const authTime = new Date(student.authenticatedAt);
      const now = new Date();
      const timeDiff = now - authTime;
      
      // If authenticated within last 30 minutes, redirect to voting
      if (timeDiff < 30 * 60 * 1000) {
        navigate('/voting-interface');
      } else {
        // Clear expired authentication
        localStorage.removeItem('authenticatedStudent');
      }
    }
  }, [navigate]);

  const handleHelpClick = () => {
    // Mock help functionality
    alert('For assistance, please contact your teacher or administrator.');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Simple Header */}
      <header className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                  <Icon name="Vote" size={20} color="white" />
                </div>
                <span className="text-xl font-semibold text-foreground">Ice Poll</span>
              </div>
            </div>

            {/* Help Button */}
            <Button variant="ghost" size="sm" onClick={handleHelpClick}>
              <Icon name="HelpCircle" size={16} className="mr-2" />
              Help
            </Button>
          </div>
        </div>
      </header>
      {/* Main Content */}
      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          {/* Welcome Section */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-6">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                <Icon name="Users" size={40} className="text-primary" />
              </div>
            </div>
            
            <h1 className="text-3xl font-bold text-foreground mb-4">
              Welcome to Student Voting
            </h1>
            
            <p className="text-muted-foreground text-lg max-w-md mx-auto">
              Your voice matters. Participate in the democratic process by casting your vote securely and anonymously.
            </p>
          </div>

          {/* Authentication Form */}
          <div className="bg-card border border-border rounded-lg p-6 sm:p-8 shadow-card">
            <AuthenticationForm />
          </div>

          {/* Security Indicators */}
          <SecurityIndicators />

          {/* Additional Information */}
          <div className="mt-8 text-center">
            <div className="bg-muted/50 rounded-lg p-4">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Icon name="Clock" size={16} className="text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">
                  Voting Period Active
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                Voting closes on December 15, 2024 at 5:00 PM
              </p>
            </div>
          </div>
        </div>
      </main>
      {/* Footer */}
      <footer className="bg-card border-t border-border py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <div className="flex items-center space-x-4 mb-4 sm:mb-0">
              <div className="flex items-center space-x-2">
                <Icon name="Shield" size={16} className="text-success" />
                <span className="text-sm text-muted-foreground">Secure & Anonymous</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Lock" size={16} className="text-success" />
                <span className="text-sm text-muted-foreground">SSL Protected</span>
              </div>
            </div>
            
            <div className="text-sm text-muted-foreground">
              © {new Date()?.getFullYear()} Ice Poll. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default StudentAuthentication;