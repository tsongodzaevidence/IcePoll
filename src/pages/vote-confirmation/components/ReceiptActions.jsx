import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ReceiptActions = ({ 
  confirmationData = {
    studentName: "Student User",
    selectedCandidate: "John Smith",
    position: "Student Body President",
    timestamp: new Date(),
    confirmationNumber: "VT-2025-001234"
  }
}) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);

  const handleDownloadReceipt = async () => {
    setIsDownloading(true);
    
    // Simulate download process
    setTimeout(() => {
      // Create receipt content
      const receiptContent = `
STUDENTVOTE - VOTING RECEIPT
============================

Student: ${confirmationData?.studentName}
Selection: ${confirmationData?.selectedCandidate}
Position: ${confirmationData?.position}
Timestamp: ${confirmationData?.timestamp?.toLocaleString()}
Confirmation: ${confirmationData?.confirmationNumber}

This receipt confirms your participation in the election.
Your vote is private and secure.

Generated on: ${new Date()?.toLocaleString()}
      `?.trim();

      // Create and download file
      const blob = new Blob([receiptContent], { type: 'text/plain' });
      const url = window.URL?.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `voting-receipt-${confirmationData?.confirmationNumber}.txt`;
      document.body?.appendChild(a);
      a?.click();
      document.body?.removeChild(a);
      window.URL?.revokeObjectURL(url);
      
      setIsDownloading(false);
    }, 2000);
  };

  const handleShare = (platform) => {
    const shareText = `I just participated in the student election! 🗳️ Every vote counts! #StudentVote #Democracy`;
    
    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`, '_blank');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location?.origin)}&quote=${encodeURIComponent(shareText)}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location?.origin)}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard?.writeText(shareText);
        // Show copied feedback
        break;
    }
    setShowShareOptions(false);
  };

  return (
    <div className="space-y-4">
      {/* Download Receipt */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          variant="default"
          size="lg"
          onClick={handleDownloadReceipt}
          loading={isDownloading}
          iconName="Download"
          iconPosition="left"
          className="flex-1"
        >
          {isDownloading ? 'Generating Receipt...' : 'Download Receipt'}
        </Button>
        
        <Button
          variant="outline"
          size="lg"
          onClick={() => setShowShareOptions(!showShareOptions)}
          iconName="Share2"
          iconPosition="left"
          className="flex-1 sm:flex-none"
        >
          Share Participation
        </Button>
      </div>

      {/* Share Options */}
      {showShareOptions && (
        <div className="bg-card border border-border rounded-lg p-4 animate-fade-in">
          <h3 className="text-sm font-medium text-foreground mb-3">Share Your Participation</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <button
              onClick={() => handleShare('twitter')}
              className="flex items-center justify-center space-x-2 p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-hover"
            >
              <Icon name="Twitter" size={16} />
              <span className="text-sm">Twitter</span>
            </button>
            
            <button
              onClick={() => handleShare('facebook')}
              className="flex items-center justify-center space-x-2 p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-hover"
            >
              <Icon name="Facebook" size={16} />
              <span className="text-sm">Facebook</span>
            </button>
            
            <button
              onClick={() => handleShare('linkedin')}
              className="flex items-center justify-center space-x-2 p-3 bg-blue-700 text-white rounded-md hover:bg-blue-800 transition-hover"
            >
              <Icon name="Linkedin" size={16} />
              <span className="text-sm">LinkedIn</span>
            </button>
            
            <button
              onClick={() => handleShare('copy')}
              className="flex items-center justify-center space-x-2 p-3 bg-muted text-foreground rounded-md hover:bg-muted/80 transition-hover"
            >
              <Icon name="Copy" size={16} />
              <span className="text-sm">Copy</span>
            </button>
          </div>
          
          <p className="text-xs text-muted-foreground mt-3 text-center">
            Share that you participated without revealing your vote choice
          </p>
        </div>
      )}
    </div>
  );
};

export default ReceiptActions;