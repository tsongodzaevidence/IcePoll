import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../../components/ui/Button';
import AdminSidebar from '../../components/ui/AdminSidebar';
import VotingStatsCard from './components/VotingStatsCard';
import ActivityFeed from './components/ActivityFeed';
import QuickActionPanel from './components/QuickActionPanel';
import StudentDataTable from './components/StudentDataTable';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Mock data for voting statistics
  const [votingStats, setVotingStats] = useState({
    totalVotes: 0,
    participationRate: 0,
    remainingVoters: 0,
    totalStudents: 0
  });

  // Mock data for recent activities
  const [activities, setActivities] = useState([]);

  // Mock data for students
  const [students, setStudents] = useState([]);

  // Mock data initialization
  useEffect(() => {
    const initializeMockData = () => {
      // Mock students data
      const mockStudents = [
        {
          id: 1,
          name: "Sarah Johnson",
          email: "sarah.johnson@university.edu",
          studentId: "STU001",
          votingStatus: "voted",
          registrationDate: "2025-08-15T10:30:00Z",
          voteTime: "2025-08-28T09:15:00Z"
        },
        {
          id: 2,
          name: "Michael Chen",
          email: "michael.chen@university.edu",
          studentId: "STU002",
          votingStatus: "voted",
          registrationDate: "2025-08-16T14:20:00Z",
          voteTime: "2025-08-28T10:45:00Z"
        },
        {
          id: 3,
          name: "Emily Rodriguez",
          email: "emily.rodriguez@university.edu",
          studentId: "STU003",
          votingStatus: "pending",
          registrationDate: "2025-08-17T09:45:00Z",
          voteTime: null
        },
        {
          id: 4,
          name: "David Thompson",
          email: "david.thompson@university.edu",
          studentId: "STU004",
          votingStatus: "voted",
          registrationDate: "2025-08-18T11:15:00Z",
          voteTime: "2025-08-28T11:30:00Z"
        },
        {
          id: 5,
          name: "Jessica Wang",
          email: "jessica.wang@university.edu",
          studentId: "STU005",
          votingStatus: "pending",
          registrationDate: "2025-08-19T16:00:00Z",
          voteTime: null
        },
        {
          id: 6,
          name: "Robert Martinez",
          email: "robert.martinez@university.edu",
          studentId: "STU006",
          votingStatus: "voted",
          registrationDate: "2025-08-20T13:30:00Z",
          voteTime: "2025-08-28T12:15:00Z"
        },
        {
          id: 7,
          name: "Amanda Foster",
          email: "amanda.foster@university.edu",
          studentId: "STU007",
          votingStatus: "pending",
          registrationDate: "2025-08-21T08:45:00Z",
          voteTime: null
        },
        {
          id: 8,
          name: "James Wilson",
          email: "james.wilson@university.edu",
          studentId: "STU008",
          votingStatus: "ineligible",
          registrationDate: "2025-08-22T15:20:00Z",
          voteTime: null
        }
      ];

      // Mock activities data
      const mockActivities = [
        {
          id: 1,
          type: "vote_cast",
          description: "New vote submitted by student STU006",
          timestamp: new Date(Date.now() - 300000), // 5 minutes ago
          user: "System"
        },
        {
          id: 2,
          type: "student_added",
          description: "Student Amanda Foster added to roster",
          timestamp: new Date(Date.now() - 900000), // 15 minutes ago
          user: "Admin User"
        },
        {
          id: 3,
          type: "vote_cast",
          description: "New vote submitted by student STU004",
          timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
          user: "System"
        },
        {
          id: 4,
          type: "election_started",
          description: "Voting period has been started",
          timestamp: new Date(Date.now() - 3600000), // 1 hour ago
          user: "Admin User"
        },
        {
          id: 5,
          type: "data_exported",
          description: "Student roster exported to CSV",
          timestamp: new Date(Date.now() - 7200000), // 2 hours ago
          user: "Admin User"
        }
      ];

      setStudents(mockStudents);
      setActivities(mockActivities);

      // Calculate voting statistics
      const totalStudents = mockStudents?.length;
      const votedStudents = mockStudents?.filter(s => s?.votingStatus === 'voted')?.length;
      const participationRate = totalStudents > 0 ? Math.round((votedStudents / totalStudents) * 100) : 0;
      const remainingVoters = mockStudents?.filter(s => s?.votingStatus === 'pending')?.length;

      setVotingStats({
        totalVotes: votedStudents,
        participationRate,
        remainingVoters,
        totalStudents
      });

      setIsLoading(false);
    };

    // Simulate loading delay
    setTimeout(initializeMockData, 1000);
  }, []);

  // Auto-refresh data every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshing(true);
      // Simulate data refresh
      setTimeout(() => {
        setRefreshing(false);
      }, 1000);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleQuickAction = async (actionId, data = null) => {
    console.log('Quick action:', actionId, data);
    
    switch (actionId) {
      case 'add-student': navigate('/student-management?action=add');
        break;
      case 'bulk-import': navigate('/student-management?action=import');
        break;
      case 'manage-roster': navigate('/student-management');
        break;
      case 'export-results':
        navigate('/results-dashboard?action=export');
        break;
      case 'generate-report': navigate('/results-dashboard?action=report');
        break;
      case 'audit-trail': navigate('/results-dashboard?action=audit');
        break;
      case 'start-voting': case'pause-voting': case'end-voting':
        // Handle voting period management
        alert(`${actionId?.replace('-', ' ')} action would be implemented here`);
        break;
      default:
        console.log('Unhandled action:', actionId);
    }
  };

  const handleStudentAction = (action, studentId) => {
    console.log('Student action:', action, studentId);
    
    switch (action) {
      case 'view-student': case'edit-student':
        navigate(`/student-management?action=${action}&id=${studentId}`);
        break;
      case 'remove-student':
        if (confirm('Are you sure you want to remove this student?')) {
          setStudents(students?.filter(s => s?.id !== studentId));
        }
        break;
      case 'bulk-email': case 'bulk-remove':
        alert(`${action} for ${studentId?.length} students would be implemented here`);
        break;
      default:
        console.log('Unhandled student action:', action);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Admin Sidebar */}
      <AdminSidebar
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        userName="Admin User"
        userRole="System Administrator"
      />
      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'}`}>
        {/* Header */}
        <header className="bg-card border-b border-border px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
              <p className="text-sm text-muted-foreground">
                Monitor voting progress and manage election integrity
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                loading={refreshing}
                iconName="RefreshCw"
                iconPosition="left"
              >
                Refresh
              </Button>
              
              <Button
                variant="default"
                size="sm"
                onClick={() => handleQuickAction('add-student')}
                iconName="UserPlus"
                iconPosition="left"
              >
                Add Student
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleQuickAction('export-results')}
                iconName="Download"
                iconPosition="left"
              >
                Export Data
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="p-6">
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <VotingStatsCard
              title="Total Votes Cast"
              value={votingStats?.totalVotes}
              subtitle="Votes submitted today"
              icon="Vote"
              color="primary"
              trend="up"
              trendValue="+12%"
              isLoading={isLoading}
            />
            <VotingStatsCard
              title="Participation Rate"
              value={`${votingStats?.participationRate}%`}
              subtitle="Of eligible students"
              icon="TrendingUp"
              color="success"
              trend="up"
              trendValue="+5%"
              isLoading={isLoading}
            />
            <VotingStatsCard
              title="Remaining Voters"
              value={votingStats?.remainingVoters}
              subtitle="Yet to vote"
              icon="Clock"
              color="warning"
              trend="down"
              trendValue="-8%"
              isLoading={isLoading}
            />
            <VotingStatsCard
              title="Total Students"
              value={votingStats?.totalStudents}
              subtitle="Registered voters"
              icon="Users"
              color="secondary"
              trend=""
              trendValue=""
              isLoading={isLoading}
            />
          </div>

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
            {/* Activity Feed - Left Section */}
            <div className="lg:col-span-5">
              <ActivityFeed activities={activities} isLoading={isLoading} />
            </div>

            {/* Quick Actions - Right Section */}
            <div className="lg:col-span-7">
              <QuickActionPanel onAction={handleQuickAction} />
            </div>
          </div>

          {/* Student Data Table */}
          <div className="mb-8">
            <StudentDataTable
              students={students}
              onAction={handleStudentAction}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;