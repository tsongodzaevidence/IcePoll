import React from 'react';
import Icon from '../../../components/AppIcon';

const ResultsMetricsCards = ({ metricsData }) => {
  const metrics = [
    {
      id: 'total-votes',
      title: 'Total Votes Cast',
      value: metricsData?.totalVotes,
      icon: 'Vote',
      color: 'bg-primary',
      textColor: 'text-primary',
      bgColor: 'bg-primary/10',
      change: `+${metricsData?.voteGrowth}%`,
      changeType: 'positive'
    },
    {
      id: 'turnout-rate',
      title: 'Voter Turnout',
      value: `${metricsData?.turnoutPercentage}%`,
      icon: 'Users',
      color: 'bg-success',
      textColor: 'text-success',
      bgColor: 'bg-success/10',
      change: `${metricsData?.turnoutChange}%`,
      changeType: metricsData?.turnoutChange > 0 ? 'positive' : 'negative'
    },
    {
      id: 'completion-rate',
      title: 'Completion Rate',
      value: `${metricsData?.completionRate}%`,
      icon: 'CheckCircle',
      color: 'bg-accent',
      textColor: 'text-accent',
      bgColor: 'bg-accent/10',
      change: `+${metricsData?.completionGrowth}%`,
      changeType: 'positive'
    },
    {
      id: 'eligible-voters',
      title: 'Eligible Voters',
      value: metricsData?.eligibleVoters,
      icon: 'UserCheck',
      color: 'bg-secondary',
      textColor: 'text-secondary',
      bgColor: 'bg-secondary/10',
      change: 'Total registered',
      changeType: 'neutral'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {metrics?.map((metric) => (
        <div key={metric?.id} className="bg-card border border-border rounded-lg p-6 shadow-card hover:shadow-modal transition-smooth">
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 rounded-lg ${metric?.bgColor} flex items-center justify-center`}>
              <Icon name={metric?.icon} size={24} className={metric?.textColor} />
            </div>
            <div className={`px-2 py-1 rounded-full text-xs font-medium ${
              metric?.changeType === 'positive' ? 'bg-success/10 text-success' :
              metric?.changeType === 'negative'? 'bg-error/10 text-error' : 'bg-muted text-muted-foreground'
            }`}>
              {metric?.change}
            </div>
          </div>
          
          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-foreground">{metric?.value}</h3>
            <p className="text-sm text-muted-foreground">{metric?.title}</p>
          </div>
          
          {/* Progress indicator for percentage metrics */}
          {metric?.value?.includes('%') && (
            <div className="mt-4">
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-smooth ${metric?.color}`}
                  style={{ width: `${parseInt(metric?.value)}%` }}
                />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ResultsMetricsCards;