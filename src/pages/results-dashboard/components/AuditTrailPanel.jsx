import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AuditTrailPanel = ({ auditData = [] }) => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [filterType, setFilterType] = useState('all');

  const mockAuditData = [
    {
      id: 1,
      timestamp: new Date(Date.now() - 300000),
      event: 'Vote Cast',
      user: 'Student ID: 2025001',
      details: 'Vote successfully recorded for Student Council President',
      type: 'vote',
      severity: 'info',
      ipAddress: '192.168.1.100',
      userAgent: 'Chrome/119.0.0.0'
    },
    {
      id: 2,
      timestamp: new Date(Date.now() - 600000),
      event: 'Authentication Success',
      user: 'Student ID: 2025002',
      details: 'Student successfully authenticated via name selection',
      type: 'auth',
      severity: 'info',
      ipAddress: '192.168.1.101',
      userAgent: 'Safari/17.0'
    },
    {
      id: 3,
      timestamp: new Date(Date.now() - 900000),
      event: 'Duplicate Vote Attempt',
      user: 'Student ID: 2025001',
      details: 'Attempted to vote again - blocked by system',
      type: 'security',
      severity: 'warning',
      ipAddress: '192.168.1.100',
      userAgent: 'Chrome/119.0.0.0'
    },
    {
      id: 4,
      timestamp: new Date(Date.now() - 1200000),
      event: 'Admin Access',
      user: 'admin@university.edu',
      details: 'Administrator accessed results dashboard',
      type: 'admin',
      severity: 'info',
      ipAddress: '192.168.1.50',
      userAgent: 'Firefox/119.0'
    },
    {
      id: 5,
      timestamp: new Date(Date.now() - 1800000),
      event: 'System Backup',
      user: 'System',
      details: 'Automated backup of voting data completed',
      type: 'system',
      severity: 'info',
      ipAddress: 'localhost',
      userAgent: 'System Process'
    }
  ];

  const auditEvents = auditData?.length > 0 ? auditData : mockAuditData;

  const eventTypes = [
    { value: 'all', label: 'All Events', count: auditEvents?.length },
    { value: 'vote', label: 'Votes', count: auditEvents?.filter(e => e?.type === 'vote')?.length },
    { value: 'auth', label: 'Authentication', count: auditEvents?.filter(e => e?.type === 'auth')?.length },
    { value: 'security', label: 'Security', count: auditEvents?.filter(e => e?.type === 'security')?.length },
    { value: 'admin', label: 'Admin Actions', count: auditEvents?.filter(e => e?.type === 'admin')?.length },
    { value: 'system', label: 'System', count: auditEvents?.filter(e => e?.type === 'system')?.length }
  ];

  const filteredEvents = filterType === 'all' 
    ? auditEvents 
    : auditEvents?.filter(event => event?.type === filterType);

  const getEventIcon = (type) => {
    switch (type) {
      case 'vote': return 'Vote';
      case 'auth': return 'UserCheck';
      case 'security': return 'Shield';
      case 'admin': return 'Settings';
      case 'system': return 'Server';
      default: return 'Activity';
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'error': return 'text-error bg-error/10';
      case 'warning': return 'text-warning bg-warning/10';
      case 'success': return 'text-success bg-success/10';
      default: return 'text-primary bg-primary/10';
    }
  };

  const formatTimestamp = (timestamp) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })?.format(timestamp);
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-card">
      <div className="px-6 py-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Audit Trail</h2>
            <p className="text-sm text-muted-foreground mt-1">
              System activity and security logs
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" iconName="Download">
              Export Logs
            </Button>
            <Button variant="outline" size="sm" iconName="RefreshCw">
              Refresh
            </Button>
          </div>
        </div>
      </div>
      {/* Event Type Filters */}
      <div className="px-6 py-4 border-b border-border">
        <div className="flex flex-wrap gap-2">
          {eventTypes?.map((type) => (
            <button
              key={type?.value}
              onClick={() => setFilterType(type?.value)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-hover ${
                filterType === type?.value
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {type?.label} ({type?.count})
            </button>
          ))}
        </div>
      </div>
      {/* Events List */}
      <div className="max-h-96 overflow-y-auto">
        {filteredEvents?.map((event) => (
          <div
            key={event?.id}
            className="px-6 py-4 border-b border-border hover:bg-muted/30 transition-hover cursor-pointer"
            onClick={() => setSelectedEvent(event)}
          >
            <div className="flex items-start space-x-4">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getSeverityColor(event?.severity)}`}>
                <Icon name={getEventIcon(event?.type)} size={16} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-foreground">{event?.event}</h3>
                  <span className="text-xs text-muted-foreground">
                    {formatTimestamp(event?.timestamp)}
                  </span>
                </div>
                
                <p className="text-sm text-muted-foreground mt-1">{event?.details}</p>
                
                <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                  <span>User: {event?.user}</span>
                  <span>IP: {event?.ipAddress}</span>
                </div>
              </div>
              
              <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
            </div>
          </div>
        ))}
      </div>
      {/* Event Details Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-120">
          <div className="bg-card border border-border rounded-lg p-6 max-w-2xl mx-4 animate-scale-in">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Event Details</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedEvent(null)}
                iconName="X"
              />
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground">Event Type</label>
                  <div className="flex items-center space-x-2 mt-1">
                    <Icon name={getEventIcon(selectedEvent?.type)} size={16} />
                    <span className="text-sm text-muted-foreground">{selectedEvent?.event}</span>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-foreground">Timestamp</label>
                  <p className="text-sm text-muted-foreground mt-1">
                    {selectedEvent?.timestamp?.toLocaleString()}
                  </p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-foreground">User</label>
                  <p className="text-sm text-muted-foreground mt-1">{selectedEvent?.user}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-foreground">Severity</label>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 ${getSeverityColor(selectedEvent?.severity)}`}>
                    {selectedEvent?.severity?.toUpperCase()}
                  </span>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-foreground">Details</label>
                <p className="text-sm text-muted-foreground mt-1 p-3 bg-muted/30 rounded-md">
                  {selectedEvent?.details}
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground">IP Address</label>
                  <p className="text-sm text-muted-foreground mt-1">{selectedEvent?.ipAddress}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-foreground">User Agent</label>
                  <p className="text-sm text-muted-foreground mt-1 truncate">{selectedEvent?.userAgent}</p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <Button variant="outline" onClick={() => setSelectedEvent(null)}>
                Close
              </Button>
              <Button variant="default" iconName="Download">
                Export Event
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Empty State */}
      {filteredEvents?.length === 0 && (
        <div className="px-6 py-12 text-center">
          <Icon name="FileSearch" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No Events Found</h3>
          <p className="text-sm text-muted-foreground">
            No audit events match the selected filter criteria.
          </p>
        </div>
      )}
    </div>
  );
};

export default AuditTrailPanel;