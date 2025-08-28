import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActionPanel = ({ onAction = () => {} }) => {
  const quickActions = [
    {
      id: 'manage-voting',
      title: 'Manage Voting Period',
      description: 'Start, pause, or end voting',
      icon: 'Clock',
      color: 'primary',
      actions: [
        { id: 'start-voting', label: 'Start Voting', icon: 'Play', variant: 'default' },
        { id: 'pause-voting', label: 'Pause', icon: 'Pause', variant: 'warning' },
        { id: 'end-voting', label: 'End', icon: 'Square', variant: 'destructive' }
      ]
    },
    {
      id: 'student-management',
      title: 'Student Management',
      description: 'Add or manage students',
      icon: 'Users',
      color: 'secondary',
      actions: [
        { id: 'add-student', label: 'Add Student', icon: 'UserPlus', variant: 'default' },
        { id: 'bulk-import', label: 'Bulk Import', icon: 'Upload', variant: 'outline' },
        { id: 'manage-roster', label: 'Manage Roster', icon: 'Settings', variant: 'ghost' }
      ]
    },
    {
      id: 'data-export',
      title: 'Data & Reports',
      description: 'Export data and generate reports',
      icon: 'FileText',
      color: 'accent',
      actions: [
        { id: 'export-results', label: 'Export Results', icon: 'Download', variant: 'default' },
        { id: 'generate-report', label: 'Generate Report', icon: 'FileText', variant: 'outline' },
        { id: 'audit-trail', label: 'Audit Trail', icon: 'Shield', variant: 'ghost' }
      ]
    }
  ];

  const getColorClasses = (color) => {
    switch (color) {
      case 'primary':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'secondary':
        return 'bg-secondary/10 text-secondary border-secondary/20';
      case 'accent':
        return 'bg-accent/10 text-accent border-accent/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-foreground">Quick Actions</h3>
      {quickActions?.map((section) => (
        <div key={section?.id} className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getColorClasses(section?.color)}`}>
              <Icon name={section?.icon} size={20} />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground">{section?.title}</h4>
              <p className="text-xs text-muted-foreground">{section?.description}</p>
            </div>
          </div>
          
          <div className="space-y-2">
            {section?.actions?.map((action) => (
              <Button
                key={action?.id}
                variant={action?.variant}
                size="sm"
                fullWidth
                iconName={action?.icon}
                iconPosition="left"
                onClick={() => onAction(action?.id)}
                className="justify-start"
              >
                {action?.label}
              </Button>
            ))}
          </div>
        </div>
      ))}
      {/* System Status */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-success/10 text-success border-success/20">
            <Icon name="Shield" size={20} />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground">System Status</h4>
            <p className="text-xs text-muted-foreground">All systems operational</p>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Database</span>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span className="text-xs text-success">Online</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Authentication</span>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span className="text-xs text-success">Active</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Vote Processing</span>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span className="text-xs text-success">Ready</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActionPanel;