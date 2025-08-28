import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BulkActionsToolbar = ({
  selectedCount = 0,
  onBulkDelete = () => {},
  onBulkExport = () => {},
  onBulkImport = () => {},
  onSendInvites = () => {},
  onClearSelection = () => {}
}) => {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(null);

  const handleBulkDelete = async () => {
    setShowConfirmDialog(false);
    setIsLoading('delete');
    try {
      await onBulkDelete();
    } catch (error) {
      console.error('Bulk delete failed:', error);
    } finally {
      setIsLoading(null);
    }
  };

  const handleAction = async (action, handler) => {
    setIsLoading(action);
    try {
      await handler();
    } catch (error) {
      console.error(`${action} failed:`, error);
    } finally {
      setIsLoading(null);
    }
  };

  if (selectedCount === 0) {
    return null;
  }

  return (
    <>
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <Icon name="CheckSquare" size={20} className="text-primary" />
              <span className="text-sm font-medium text-foreground">
                {selectedCount} student{selectedCount !== 1 ? 's' : ''} selected
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearSelection}
              className="text-muted-foreground hover:text-foreground"
            >
              Clear selection
            </Button>
          </div>

          <div className="flex items-center space-x-2">
            {/* Export Selected */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleAction('export', onBulkExport)}
              loading={isLoading === 'export'}
              iconName="Download"
              iconPosition="left"
            >
              Export Selected
            </Button>

            {/* Send Invites */}
            <Button
              variant="secondary"
              size="sm"
              onClick={() => handleAction('invites', onSendInvites)}
              loading={isLoading === 'invites'}
              iconName="Mail"
              iconPosition="left"
            >
              Send Invites
            </Button>

            {/* Delete Selected */}
            <Button
              variant="destructive"
              size="sm"
              onClick={() => setShowConfirmDialog(true)}
              loading={isLoading === 'delete'}
              iconName="Trash2"
              iconPosition="left"
            >
              Delete Selected
            </Button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-3 pt-3 border-t border-primary/20">
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <span>Quick actions:</span>
            <button
              onClick={() => handleAction('activate', () => console.log('Activate selected'))}
              className="text-success hover:text-success/80 transition-hover"
            >
              Activate all
            </button>
            <button
              onClick={() => handleAction('deactivate', () => console.log('Deactivate selected'))}
              className="text-warning hover:text-warning/80 transition-hover"
            >
              Deactivate all
            </button>
            <button
              onClick={() => handleAction('reset-votes', () => console.log('Reset votes'))}
              className="text-error hover:text-error/80 transition-hover"
            >
              Reset voting status
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      {showConfirmDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-120">
          <div className="bg-card border border-border rounded-lg p-6 max-w-md mx-4 animate-scale-in">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-error/10 rounded-full flex items-center justify-center">
                <Icon name="AlertTriangle" size={20} className="text-error" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Confirm Deletion</h3>
                <p className="text-sm text-muted-foreground">
                  Are you sure you want to delete {selectedCount} selected student{selectedCount !== 1 ? 's' : ''}? 
                  This action cannot be undone.
                </p>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowConfirmDialog(false)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleBulkDelete}
                loading={isLoading === 'delete'}
              >
                Delete {selectedCount} Student{selectedCount !== 1 ? 's' : ''}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BulkActionsToolbar;