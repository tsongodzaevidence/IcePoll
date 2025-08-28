import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from '../../components/ui/AdminSidebar';
import AdminQuickActions from '../../components/ui/AdminQuickActions';
import ResultsMetricsCards from './components/ResultsMetricsCards';
import VotingResultsChart from './components/VotingResultsChart';
import DetailedResultsTable from './components/DetailedResultsTable';
import ResultsFilters from './components/ResultsFilters';
import ExportControls from './components/ExportControls';
import AuditTrailPanel from './components/AuditTrailPanel';
import Icon from '../../components/AppIcon';


const ResultsDashboard = () => {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [filters, setFilters] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Mock data for demonstration
  const mockMetricsData = {
    totalVotes: 1247,
    turnoutPercentage: 78.5,
    completionRate: 94.2,
    eligibleVoters: 1588,
    voteGrowth: 12.3,
    turnoutChange: 5.7,
    completionGrowth: 8.1
  };

  const mockResultsData = [
    { id: 1, candidate: "Sarah Johnson", votes: 423, party: "Progressive Student Alliance" },
    { id: 2, candidate: "Michael Chen", votes: 387, party: "Student Unity Coalition" },
    { id: 3, candidate: "Emma Rodriguez", votes: 298, party: "Campus Reform Party" },
    { id: 4, candidate: "David Thompson", votes: 139, party: "Independent" }
  ];

  const totalVotes = mockResultsData?.reduce((sum, candidate) => sum + candidate?.votes, 0);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'BarChart3' },
    { id: 'detailed', label: 'Detailed Results', icon: 'Table' },
    { id: 'export', label: 'Export & Reports', icon: 'Download' },
    { id: 'audit', label: 'Audit Trail', icon: 'Shield' }
  ];

  useEffect(() => {
    // Simulate loading data
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [filters]);

  const handleQuickAction = async (actionId) => {
    console.log(`Executing action: ${actionId}`);
    
    switch (actionId) {
      case 'export-results':
        setActiveTab('export');
        break;
      case 'generate-report':
        // Generate comprehensive report
        break;
      case 'audit-trail': setActiveTab('audit');
        break;
      case 'share-results':
        // Open share dialog
        break;
      default:
        break;
    }
  };

  const handleExport = async (exportData) => {
    console.log('Exporting data:', exportData);
    // Implement export functionality
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const renderTabContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Loading results data...</p>
          </div>
        </div>
      );
    }

    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-8">
            <ResultsMetricsCards metricsData={mockMetricsData} />
            <VotingResultsChart resultsData={mockResultsData} chartType="bar" />
            {/* Quick Summary */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-card border border-border rounded-lg p-6 shadow-card">
                <h3 className="text-lg font-semibold text-foreground mb-4">Election Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Winner:</span>
                    <span className="font-medium text-foreground">{mockResultsData?.[0]?.candidate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Winning Margin:</span>
                    <span className="font-medium text-foreground">
                      {mockResultsData?.[0]?.votes - mockResultsData?.[1]?.votes} votes
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Participation:</span>
                    <span className="font-medium text-foreground">{totalVotes} students</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Election Status:</span>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-success/10 text-success">
                      <Icon name="CheckCircle" size={12} className="mr-1" />
                      Completed
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="bg-card border border-border rounded-lg p-6 shadow-card">
                <h3 className="text-lg font-semibold text-foreground mb-4">Key Statistics</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Peak Voting Hour:</span>
                    <span className="font-medium text-foreground">2:00 PM - 3:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Average Vote Time:</span>
                    <span className="font-medium text-foreground">2.3 minutes</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Mobile Votes:</span>
                    <span className="font-medium text-foreground">67% (835 votes)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">System Uptime:</span>
                    <span className="font-medium text-success">99.8%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'detailed':
        return (
          <div className="space-y-6">
            <ResultsFilters onFilterChange={handleFilterChange} activeFilters={filters} />
            <DetailedResultsTable resultsData={mockResultsData} totalVotes={totalVotes} />
          </div>
        );

      case 'export':
        return (
          <div className="space-y-6">
            <ExportControls onExport={handleExport} />
          </div>
        );

      case 'audit':
        return (
          <div className="space-y-6">
            <AuditTrailPanel />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        userRole="Election Administrator"
        userName="Dr. Patricia Williams"
      />
      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'}`}>
        {/* Header */}
        <header className="bg-card border-b border-border px-6 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Results Dashboard</h1>
              <p className="text-muted-foreground mt-1">
                Comprehensive voting outcomes and analytics
              </p>
            </div>
            
            <div className="flex items-center space-x-3 mt-4 sm:mt-0">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                <span>Live Results</span>
              </div>
              <AdminQuickActions
                context="results"
                onAction={handleQuickAction}
              />
            </div>
          </div>
        </header>

        {/* Navigation Tabs */}
        <div className="bg-card border-b border-border px-6">
          <nav className="flex space-x-8">
            {tabs?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-hover ${
                  activeTab === tab?.id
                    ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'
                }`}
              >
                <Icon name={tab?.icon} size={16} />
                <span>{tab?.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <main className="p-6">
          {renderTabContent()}
        </main>

        {/* Footer */}
        <footer className="bg-card border-t border-border px-6 py-4 mt-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm text-muted-foreground">
            <div>
              <p>&copy; {new Date()?.getFullYear()} StudentVote. All rights reserved.</p>
            </div>
            <div className="flex items-center space-x-4 mt-2 sm:mt-0">
              <button
                onClick={() => navigate('/admin-dashboard')}
                className="hover:text-foreground transition-hover"
              >
                Back to Dashboard
              </button>
              <button
                onClick={() => navigate('/student-management')}
                className="hover:text-foreground transition-hover"
              >
                Manage Students
              </button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default ResultsDashboard;