import React from 'react';
import Icon from '../../../components/AppIcon';

const ActivityFeed = ({ activities = [], isLoading = false }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'vote_cast':
        return 'Vote';
      case 'student_added':
        return 'UserPlus';
      case 'student_removed':
        return 'UserMinus';
      case 'election_started':
        return 'Play';
      case 'election_paused':
        return 'Pause';
      case 'election_ended':
        return 'Square';
      case 'data_exported':
        return 'Download';
      default:
        return 'Activity';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'vote_cast':
        return 'text-success';
      case 'student_added':
        return 'text-primary';
      case 'student_removed':
        return 'text-warning';
      case 'election_started':
        return 'text-success';
      case 'election_paused':
        return 'text-warning';
      case 'election_ended':
        return 'text-error';
      case 'data_exported':
        return 'text-secondary';
      default:
        return 'text-muted-foreground';
    }
  };

  const formatTime = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now - time) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return time?.toLocaleDateString();
  };

  if (isLoading) {
    return (
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Live Activity</h3>
          <div className="animate-spin">
            <Icon name="Loader2" size={16} />
          </div>
        </div>
        <div className="space-y-4">
          {Array.from({ length: 5 }, (_, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-muted animate-pulse rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-muted animate-pulse rounded w-3/4"></div>
                <div className="h-3 bg-muted animate-pulse rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Live Activity</h3>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
          <span className="text-xs text-muted-foreground">Live</span>
        </div>
      </div>
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {activities?.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="Activity" size={48} className="text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">No recent activity</p>
          </div>
        ) : (
          activities?.map((activity) => (
            <div key={activity?.id} className="flex items-start space-x-3 p-3 hover:bg-muted/50 rounded-md transition-smooth">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-muted ${getActivityColor(activity?.type)}`}>
                <Icon name={getActivityIcon(activity?.type)} size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground font-medium">{activity?.description}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-xs text-muted-foreground">{formatTime(activity?.timestamp)}</span>
                  {activity?.user && (
                    <>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs text-muted-foreground">{activity?.user}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      {activities?.length > 0 && (
        <div className="mt-4 pt-4 border-t border-border">
          <button className="text-sm text-primary hover:text-primary/80 transition-hover">
            View all activity
          </button>
        </div>
      )}
    </div>
  );
};

export default ActivityFeed;