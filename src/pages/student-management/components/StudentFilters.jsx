import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const StudentFilters = ({
  searchTerm = '',
  onSearchChange = () => {},
  statusFilter = 'all',
  onStatusFilterChange = () => {},
  dateFilter = 'all',
  onDateFilterChange = () => {},
  onClearFilters = () => {},
  totalStudents = 0,
  filteredStudents = 0
}) => {
  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'voted', label: 'Voted' },
    { value: 'pending', label: 'Pending' },
    { value: 'inactive', label: 'Inactive' }
  ];

  const dateOptions = [
    { value: 'all', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' }
  ];

  const hasActiveFilters = searchTerm || statusFilter !== 'all' || dateFilter !== 'all';

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
        {/* Search Input */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Icon 
              name="Search" 
              size={16} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
            />
            <Input
              type="text"
              placeholder="Search students by name, ID, or email..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e?.target?.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
          {/* Status Filter */}
          <div className="min-w-0 sm:min-w-[140px]">
            <select
              value={statusFilter}
              onChange={(e) => onStatusFilterChange(e?.target?.value)}
              className="w-full px-3 py-2 text-sm border border-border rounded-md bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-primary"
            >
              {statusOptions?.map(option => (
                <option key={option?.value} value={option?.value}>
                  {option?.label}
                </option>
              ))}
            </select>
          </div>

          {/* Date Filter */}
          <div className="min-w-0 sm:min-w-[140px]">
            <select
              value={dateFilter}
              onChange={(e) => onDateFilterChange(e?.target?.value)}
              className="w-full px-3 py-2 text-sm border border-border rounded-md bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-primary"
            >
              {dateOptions?.map(option => (
                <option key={option?.value} value={option?.value}>
                  {option?.label}
                </option>
              ))}
            </select>
          </div>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <Button
              variant="outline"
              size="sm"
              onClick={onClearFilters}
              iconName="X"
              iconPosition="left"
            >
              Clear
            </Button>
          )}
        </div>
      </div>
      {/* Results Summary */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
        <div className="text-sm text-muted-foreground">
          {hasActiveFilters ? (
            <>
              Showing <span className="font-medium text-foreground">{filteredStudents}</span> of{' '}
              <span className="font-medium text-foreground">{totalStudents}</span> students
            </>
          ) : (
            <>
              Total <span className="font-medium text-foreground">{totalStudents}</span> students
            </>
          )}
        </div>

        {/* Quick Filter Tags */}
        {hasActiveFilters && (
          <div className="flex items-center space-x-2">
            {searchTerm && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary/10 text-primary">
                Search: {searchTerm}
                <button
                  onClick={() => onSearchChange('')}
                  className="ml-1 hover:text-primary/80"
                >
                  <Icon name="X" size={12} />
                </button>
              </span>
            )}
            {statusFilter !== 'all' && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-secondary/10 text-secondary">
                Status: {statusOptions?.find(opt => opt?.value === statusFilter)?.label}
                <button
                  onClick={() => onStatusFilterChange('all')}
                  className="ml-1 hover:text-secondary/80"
                >
                  <Icon name="X" size={12} />
                </button>
              </span>
            )}
            {dateFilter !== 'all' && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-accent/10 text-accent">
                Period: {dateOptions?.find(opt => opt?.value === dateFilter)?.label}
                <button
                  onClick={() => onDateFilterChange('all')}
                  className="ml-1 hover:text-accent/80"
                >
                  <Icon name="X" size={12} />
                </button>
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentFilters;