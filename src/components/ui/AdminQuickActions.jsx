import React, { useState } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const AdminQuickActions = ({ 
  context = 'header', // 'header', 'dashboard', 'students', 'results'
  onAction = () => {},
  className = ""
}) => {
  const [showConfirmDialog, setShowConfirmDialog] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const getActionsForContext = () => {
    switch (context) {
      case 'header':
        return [
          { id: 'add-student', label: 'Add Student', icon: 'UserPlus', variant: 'default' },
          { id: 'export-data', label: 'Export', icon: 'Download', variant: 'outline' },
          { id: 'settings', label: 'Settings', icon: 'Settings', variant: 'ghost' }
        ];
      case 'dashboard':
        return [
          { id: 'start-election', label: 'Start Election', icon: 'Play', variant: 'default', confirm: true },
          { id: 'pause-election', label: 'Pause Voting', icon: 'Pause', variant: 'warning', confirm: true },
          { id: 'end-election', label: 'End Election', icon: 'Square', variant: 'destructive', confirm: true },
          { id: 'refresh-data', label: 'Refresh', icon: 'RefreshCw', variant: 'outline' }
        ];
      case 'students':
        return [
          { id: 'add-student', label: 'Add Student', icon: 'UserPlus', variant: 'default' },
          { id: 'bulk-import', label: 'Bulk Import', icon: 'Upload', variant: 'outline' },
          { id: 'export-list', label: 'Export List', icon: 'Download', variant: 'outline' },
          { id: 'send-invites', label: 'Send Invites', icon: 'Mail', variant: 'secondary' }
        ];
      case 'results':
        return [
          { id: 'export-results', label: 'Export Results', icon: 'Download', variant: 'default' },
          { id: 'generate-report', label: 'Generate Report', icon: 'FileText', variant: 'outline' },
          { id: 'audit-trail', label: 'Audit Trail', icon: 'Shield', variant: 'outline' },
          { id: 'share-results', label: 'Share', icon: 'Share2', variant: 'secondary' }
        ];
      default:
        return [];
    }
  };

  const handleAction = async (actionId) => {
    const action = getActionsForContext()?.find(a => a?.id === actionId);
    
    if (action?.confirm) {
      setShowConfirmDialog(actionId);
      return;
    }

    setIsLoading(actionId);
    try {
      await onAction(actionId);
    } catch (error) {
      console.error('Action failed:', error);
    } finally {
      setIsLoading(null);
    }
  };

  const handleConfirm = async (actionId) => {
    setShowConfirmDialog(null);
    setIsLoading(actionId);
    try {
      await onAction(actionId);
    } catch (error) {
      console.error('Action failed:', error);
    } finally {
      setIsLoading(null);
    }
  };

  const getConfirmMessage = (actionId) => {
    switch (actionId) {
      case 'start-election':
        return 'Are you sure you want to start the election? Students will be able to vote once started.';
      case 'pause-election':
        return 'Are you sure you want to pause voting? Students will not be able to vote while paused.';
      case 'end-election':
        return 'Are you sure you want to end the election? This action cannot be undone and voting will be permanently closed.';
      default:
        return 'Are you sure you want to perform this action?';
    }
  };

  const actions = getActionsForContext();

  if (actions?.length === 0) return null;

  return (
    <>
      <div className={`flex items-center space-x-2 ${className}`}>
        {actions?.map((action) => (
          <Button
            key={action?.id}
            variant={action?.variant}
            size={context === 'header' ? 'sm' : 'default'}
            onClick={() => handleAction(action?.id)}
            loading={isLoading === action?.id}
            iconName={action?.icon}
            iconPosition="left"
            className={context === 'header' ? 'hidden sm:flex' : ''}
          >
            {action?.label}
          </Button>
        ))}
        
        {/* Mobile overflow menu for header context */}
        {context === 'header' && (
          <div className="sm:hidden">
            <Button variant="ghost" size="sm">
              <Icon name="MoreVertical" size={16} />
            </Button>
          </div>
        )}
      </div>
      {/* Confirmation Dialog */}
      {showConfirmDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-120">
          <div className="bg-card border border-border rounded-lg p-6 max-w-md mx-4 animate-scale-in">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-warning/10 rounded-full flex items-center justify-center">
                <Icon name="AlertTriangle" size={20} className="text-warning" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Confirm Action</h3>
                <p className="text-sm text-muted-foreground">
                  {getConfirmMessage(showConfirmDialog)}
                </p>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowConfirmDialog(null)}
              >
                Cancel
              </Button>
              <Button
                variant={showConfirmDialog === 'end-election' ? 'destructive' : 'default'}
                onClick={() => handleConfirm(showConfirmDialog)}
                loading={isLoading === showConfirmDialog}
              >
                Confirm
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminQuickActions;