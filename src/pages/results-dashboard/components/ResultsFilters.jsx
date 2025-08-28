import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const ResultsFilters = ({ onFilterChange, activeFilters = {} }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState({
    timeRange: activeFilters?.timeRange || 'all',
    department: activeFilters?.department || 'all',
    year: activeFilters?.year || 'all',
    votingMethod: activeFilters?.votingMethod || 'all',
    searchQuery: activeFilters?.searchQuery || ''
  });

  const timeRangeOptions = [
    { value: 'all', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'yesterday', label: 'Yesterday' },
    { value: 'last-7-days', label: 'Last 7 Days' },
    { value: 'last-30-days', label: 'Last 30 Days' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const departmentOptions = [
    { value: 'all', label: 'All Departments' },
    { value: 'computer-science', label: 'Computer Science' },
    { value: 'engineering', label: 'Engineering' },
    { value: 'business', label: 'Business Administration' },
    { value: 'arts', label: 'Liberal Arts' },
    { value: 'sciences', label: 'Natural Sciences' },
    { value: 'medicine', label: 'Medicine' }
  ];

  const yearOptions = [
    { value: 'all', label: 'All Years' },
    { value: 'freshman', label: 'Freshman' },
    { value: 'sophomore', label: 'Sophomore' },
    { value: 'junior', label: 'Junior' },
    { value: 'senior', label: 'Senior' },
    { value: 'graduate', label: 'Graduate' }
  ];

  const votingMethodOptions = [
    { value: 'all', label: 'All Methods' },
    { value: 'online', label: 'Online Voting' },
    { value: 'mobile', label: 'Mobile App' },
    { value: 'kiosk', label: 'Campus Kiosk' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleReset = () => {
    const resetFilters = {
      timeRange: 'all',
      department: 'all',
      year: 'all',
      votingMethod: 'all',
      searchQuery: ''
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  const getActiveFilterCount = () => {
    return Object.values(filters)?.filter(value => value !== 'all' && value !== '')?.length;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-card mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Icon name="Filter" size={20} className="text-muted-foreground" />
          <h3 className="text-lg font-semibold text-foreground">Filters</h3>
          {getActiveFilterCount() > 0 && (
            <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
              {getActiveFilterCount()} active
            </span>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleReset}
            iconName="RotateCcw"
            disabled={getActiveFilterCount() === 0}
          >
            Reset
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
          >
            {isExpanded ? 'Collapse' : 'Expand'}
          </Button>
        </div>
      </div>
      {/* Always visible filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <Select
          label="Time Range"
          options={timeRangeOptions}
          value={filters?.timeRange}
          onChange={(value) => handleFilterChange('timeRange', value)}
        />
        
        <Select
          label="Department"
          options={departmentOptions}
          value={filters?.department}
          onChange={(value) => handleFilterChange('department', value)}
        />
        
        <Input
          label="Search Candidates"
          type="search"
          placeholder="Search by name..."
          value={filters?.searchQuery}
          onChange={(e) => handleFilterChange('searchQuery', e?.target?.value)}
        />
        
        <div className="flex items-end">
          <Button
            variant="default"
            iconName="Search"
            iconPosition="left"
            className="w-full"
          >
            Apply Filters
          </Button>
        </div>
      </div>
      {/* Expandable advanced filters */}
      {isExpanded && (
        <div className="border-t border-border pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Select
              label="Academic Year"
              options={yearOptions}
              value={filters?.year}
              onChange={(value) => handleFilterChange('year', value)}
            />
            
            <Select
              label="Voting Method"
              options={votingMethodOptions}
              value={filters?.votingMethod}
              onChange={(value) => handleFilterChange('votingMethod', value)}
            />
            
            {filters?.timeRange === 'custom' && (
              <div className="grid grid-cols-2 gap-2">
                <Input
                  label="Start Date"
                  type="date"
                  onChange={(e) => handleFilterChange('startDate', e?.target?.value)}
                />
                <Input
                  label="End Date"
                  type="date"
                  onChange={(e) => handleFilterChange('endDate', e?.target?.value)}
                />
              </div>
            )}
          </div>
          
          {/* Quick filter buttons */}
          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Zap" size={16} className="text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">Quick Filters</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleFilterChange('timeRange', 'today')}
              >
                Today's Votes
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  handleFilterChange('department', 'computer-science');
                  handleFilterChange('year', 'senior');
                }}
              >
                CS Seniors
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleFilterChange('votingMethod', 'mobile')}
              >
                Mobile Voters
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleFilterChange('year', 'freshman')}
              >
                First-Year Students
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Active filters display */}
      {getActiveFilterCount() > 0 && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Tag" size={16} className="text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">Active Filters</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {Object.entries(filters)?.map(([key, value]) => {
              if (value === 'all' || value === '') return null;
              
              const getFilterLabel = () => {
                switch (key) {
                  case 'timeRange':
                    return timeRangeOptions?.find(opt => opt?.value === value)?.label;
                  case 'department':
                    return departmentOptions?.find(opt => opt?.value === value)?.label;
                  case 'year':
                    return yearOptions?.find(opt => opt?.value === value)?.label;
                  case 'votingMethod':
                    return votingMethodOptions?.find(opt => opt?.value === value)?.label;
                  case 'searchQuery':
                    return `Search: "${value}"`;
                  default:
                    return value;
                }
              };
              
              return (
                <span
                  key={key}
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary"
                >
                  {getFilterLabel()}
                  <button
                    onClick={() => handleFilterChange(key, key === 'searchQuery' ? '' : 'all')}
                    className="ml-2 hover:text-primary/80"
                  >
                    <Icon name="X" size={12} />
                  </button>
                </span>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultsFilters;