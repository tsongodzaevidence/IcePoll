import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

import Button from '../../../components/ui/Button';

const VotingResultsChart = ({ resultsData, chartType = 'bar' }) => {
  const [activeChart, setActiveChart] = useState(chartType);
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const chartTypes = [
    { id: 'bar', label: 'Bar Chart', icon: 'BarChart3' },
    { id: 'pie', label: 'Pie Chart', icon: 'PieChart' },
    { id: 'line', label: 'Trend', icon: 'TrendingUp' }
  ];

  const colors = ['#2563EB', '#059669', '#F59E0B', '#DC2626', '#7C3AED', '#EC4899'];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-modal">
          <p className="text-sm font-medium text-foreground">{label}</p>
          <p className="text-sm text-muted-foreground">
            Votes: <span className="font-semibold text-primary">{payload?.[0]?.value}</span>
          </p>
          <p className="text-xs text-muted-foreground">
            {((payload?.[0]?.value / resultsData?.reduce((sum, item) => sum + item?.votes, 0)) * 100)?.toFixed(1)}% of total
          </p>
        </div>
      );
    }
    return null;
  };

  const renderBarChart = () => (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={resultsData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
        <XAxis 
          dataKey="candidate" 
          stroke="var(--color-muted-foreground)"
          fontSize={12}
          angle={-45}
          textAnchor="end"
          height={80}
        />
        <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
        <Tooltip content={<CustomTooltip />} />
        <Bar 
          dataKey="votes" 
          fill="var(--color-primary)"
          radius={[4, 4, 0, 0]}
          onMouseEnter={(data) => setSelectedCandidate(data?.candidate)}
          onMouseLeave={() => setSelectedCandidate(null)}
        />
      </BarChart>
    </ResponsiveContainer>
  );

  const renderPieChart = () => (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          data={resultsData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ candidate, percent }) => `${candidate}: ${(percent * 100)?.toFixed(1)}%`}
          outerRadius={120}
          fill="#8884d8"
          dataKey="votes"
        >
          {resultsData?.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors?.[index % colors?.length]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
      </PieChart>
    </ResponsiveContainer>
  );

  const renderLineChart = () => (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={resultsData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
        <XAxis 
          dataKey="candidate" 
          stroke="var(--color-muted-foreground)"
          fontSize={12}
          angle={-45}
          textAnchor="end"
          height={80}
        />
        <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
        <Tooltip content={<CustomTooltip />} />
        <Line 
          type="monotone" 
          dataKey="votes" 
          stroke="var(--color-primary)" 
          strokeWidth={3}
          dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 6 }}
          activeDot={{ r: 8, stroke: 'var(--color-primary)', strokeWidth: 2 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );

  const renderChart = () => {
    switch (activeChart) {
      case 'pie':
        return renderPieChart();
      case 'line':
        return renderLineChart();
      default:
        return renderBarChart();
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-card">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-2">Voting Results</h2>
          <p className="text-sm text-muted-foreground">
            Real-time vote distribution across all candidates
          </p>
        </div>
        
        <div className="flex items-center space-x-2 mt-4 sm:mt-0">
          {chartTypes?.map((type) => (
            <Button
              key={type?.id}
              variant={activeChart === type?.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveChart(type?.id)}
              iconName={type?.icon}
              iconPosition="left"
            >
              {type?.label}
            </Button>
          ))}
        </div>
      </div>
      <div className="relative">
        {renderChart()}
        
        {selectedCandidate && (
          <div className="absolute top-4 right-4 bg-card border border-border rounded-lg p-3 shadow-modal">
            <p className="text-sm font-medium text-foreground">Selected: {selectedCandidate}</p>
          </div>
        )}
      </div>
      {/* Chart Legend for Pie Chart */}
      {activeChart === 'pie' && (
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {resultsData?.map((item, index) => (
            <div key={item?.candidate} className="flex items-center space-x-2">
              <div 
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: colors?.[index % colors?.length] }}
              />
              <span className="text-sm text-foreground truncate">{item?.candidate}</span>
            </div>
          ))}
        </div>
      )}
      {/* Real-time update indicator */}
      <div className="flex items-center justify-center mt-4 pt-4 border-t border-border">
        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
          <span>Live updates • Last updated: {new Date()?.toLocaleTimeString()}</span>
        </div>
      </div>
    </div>
  );
};

export default VotingResultsChart;