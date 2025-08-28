import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const AdminSidebar = ({ 
  isCollapsed = false, 
  onToggleCollapse = () => {},
  userRole = "Administrator",
  userName = "Admin User"
}) => {
  const location = useLocation();
  const [expandedSections, setExpandedSections] = useState({
    dashboard: true,
    management: true,
    reports: true
  });

  const navigationItems = [
    {
      section: 'dashboard',
      title: 'Dashboard',
      items: [
        {
          name: 'Admin Dashboard',
          path: '/admin-dashboard',
          icon: 'LayoutDashboard',
          description: 'Election overview and monitoring'
        }
      ]
    },
    {
      section: 'management',
      title: 'Management',
      items: [
        {
          name: 'Student Management',
          path: '/student-management',
          icon: 'Users',
          description: 'Manage eligible voters and participation'
        }
      ]
    },
    {
      section: 'reports',
      title: 'Reports & Analytics',
      items: [
        {
          name: 'Results Dashboard',
          path: '/results-dashboard',
          icon: 'BarChart3',
          description: 'Voting results and analytics'
        }
      ]
    }
  ];

  const quickActions = [
    { name: 'Add Students', icon: 'UserPlus', action: 'add-students' },
    { name: 'Export Data', icon: 'Download', action: 'export-data' },
    { name: 'System Settings', icon: 'Settings', action: 'settings' }
  ];

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev?.[section]
    }));
  };

  const handleQuickAction = (action) => {
    console.log(`Quick action: ${action}`);
    // Implement quick action handlers
  };

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  return (
    <>
      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 h-full bg-card border-r border-border z-90 transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-64'
      } lg:translate-x-0`}>
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          {!isCollapsed && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                <Icon name="Vote" size={20} color="white" />
              </div>
              <span className="text-xl font-semibold text-foreground">StudentVote</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleCollapse}
            className="h-8 w-8"
          >
            <Icon name={isCollapsed ? "ChevronRight" : "ChevronLeft"} size={16} />
          </Button>
        </div>

        {/* User Info */}
        {!isCollapsed && (
          <div className="p-4 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <Icon name="Shield" size={20} color="white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{userName}</p>
                <p className="text-xs text-muted-foreground">{userRole}</p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4">
          <div className="space-y-6">
            {navigationItems?.map((section) => (
              <div key={section?.section}>
                {!isCollapsed && (
                  <button
                    onClick={() => toggleSection(section?.section)}
                    className="flex items-center justify-between w-full text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 hover:text-foreground transition-hover"
                  >
                    {section?.title}
                    <Icon 
                      name="ChevronDown" 
                      size={12} 
                      className={`transition-transform ${expandedSections?.[section?.section] ? 'rotate-180' : ''}`}
                    />
                  </button>
                )}
                
                {(isCollapsed || expandedSections?.[section?.section]) && (
                  <div className="space-y-1">
                    {section?.items?.map((item) => (
                      <a
                        key={item?.path}
                        href={item?.path}
                        className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-hover group ${
                          isActivePath(item?.path)
                            ? 'bg-primary text-primary-foreground'
                            : 'text-foreground hover:bg-muted'
                        }`}
                        title={isCollapsed ? item?.name : ''}
                      >
                        <Icon 
                          name={item?.icon} 
                          size={18} 
                          className={`${isCollapsed ? '' : 'mr-3'} ${
                            isActivePath(item?.path) ? 'text-primary-foreground' : ''
                          }`}
                        />
                        {!isCollapsed && (
                          <div className="flex-1">
                            <div>{item?.name}</div>
                            <div className="text-xs text-muted-foreground group-hover:text-foreground">
                              {item?.description}
                            </div>
                          </div>
                        )}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </nav>

        {/* Quick Actions */}
        {!isCollapsed && (
          <div className="p-4 border-t border-border">
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              Quick Actions
            </div>
            <div className="space-y-1">
              {quickActions?.map((action) => (
                <button
                  key={action?.action}
                  onClick={() => handleQuickAction(action?.action)}
                  className="flex items-center w-full px-3 py-2 text-sm text-foreground hover:bg-muted rounded-md transition-hover"
                >
                  <Icon name={action?.icon} size={16} className="mr-3" />
                  {action?.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Collapsed Quick Actions */}
        {isCollapsed && (
          <div className="p-2 border-t border-border">
            {quickActions?.map((action) => (
              <button
                key={action?.action}
                onClick={() => handleQuickAction(action?.action)}
                className="flex items-center justify-center w-full p-2 text-foreground hover:bg-muted rounded-md transition-hover mb-1"
                title={action?.name}
              >
                <Icon name={action?.icon} size={16} />
              </button>
            ))}
          </div>
        )}
      </aside>
      {/* Main Content Offset */}
      <div className={`transition-all duration-300 ${isCollapsed ? 'lg:ml-16' : 'lg:ml-64'}`}>
        {/* Content goes here */}
      </div>
    </>
  );
};

export default AdminSidebar;