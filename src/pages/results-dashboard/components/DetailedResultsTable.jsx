import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DetailedResultsTable = ({ resultsData, totalVotes }) => {
  const [sortBy, setSortBy] = useState('votes');
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedRows, setSelectedRows] = useState([]);

  const sortedData = [...resultsData]?.sort((a, b) => {
    const aValue = sortBy === 'percentage' ? (a?.votes / totalVotes) * 100 : a?.[sortBy];
    const bValue = sortBy === 'percentage' ? (b?.votes / totalVotes) * 100 : b?.[sortBy];
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    }
    return aValue < bValue ? 1 : -1;
  });

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('desc');
    }
  };

  const handleRowSelect = (candidateId) => {
    setSelectedRows(prev => 
      prev?.includes(candidateId) 
        ? prev?.filter(id => id !== candidateId)
        : [...prev, candidateId]
    );
  };

  const handleSelectAll = () => {
    if (selectedRows?.length === resultsData?.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(resultsData?.map(item => item?.id));
    }
  };

  const getSortIcon = (column) => {
    if (sortBy !== column) return 'ArrowUpDown';
    return sortOrder === 'asc' ? 'ArrowUp' : 'ArrowDown';
  };

  const getPositionBadge = (index) => {
    const position = index + 1;
    let badgeClass = 'bg-muted text-muted-foreground';
    
    if (position === 1) badgeClass = 'bg-success text-success-foreground';
    else if (position === 2) badgeClass = 'bg-accent text-accent-foreground';
    else if (position === 3) badgeClass = 'bg-warning text-warning-foreground';
    
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${badgeClass}`}>
        #{position}
      </span>
    );
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-card overflow-hidden">
      <div className="px-6 py-4 border-b border-border">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Detailed Results</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Complete breakdown of all votes cast
            </p>
          </div>
          
          <div className="flex items-center space-x-2 mt-4 sm:mt-0">
            <Button variant="outline" size="sm" iconName="Download">
              Export Table
            </Button>
            <Button variant="outline" size="sm" iconName="Printer">
              Print
            </Button>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="px-6 py-3 text-left">
                <input
                  type="checkbox"
                  checked={selectedRows?.length === resultsData?.length}
                  onChange={handleSelectAll}
                  className="rounded border-border"
                />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Position
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                <button
                  onClick={() => handleSort('candidate')}
                  className="flex items-center space-x-1 hover:text-foreground transition-hover"
                >
                  <span>Candidate</span>
                  <Icon name={getSortIcon('candidate')} size={14} />
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                <button
                  onClick={() => handleSort('votes')}
                  className="flex items-center space-x-1 hover:text-foreground transition-hover"
                >
                  <span>Votes</span>
                  <Icon name={getSortIcon('votes')} size={14} />
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                <button
                  onClick={() => handleSort('percentage')}
                  className="flex items-center space-x-1 hover:text-foreground transition-hover"
                >
                  <span>Percentage</span>
                  <Icon name={getSortIcon('percentage')} size={14} />
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Progress
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {sortedData?.map((candidate, index) => {
              const percentage = ((candidate?.votes / totalVotes) * 100)?.toFixed(1);
              const isSelected = selectedRows?.includes(candidate?.id);
              
              return (
                <tr 
                  key={candidate?.id}
                  className={`hover:bg-muted/30 transition-hover ${isSelected ? 'bg-primary/5' : ''}`}
                >
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleRowSelect(candidate?.id)}
                      className="rounded border-border"
                    />
                  </td>
                  <td className="px-6 py-4">
                    {getPositionBadge(index)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <Icon name="User" size={16} className="text-primary" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-foreground">
                          {candidate?.candidate}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {candidate?.party || 'Independent'}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-semibold text-foreground">
                      {candidate?.votes?.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-foreground">
                      {percentage}%
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-smooth"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {percentage}% of {totalVotes?.toLocaleString()} votes
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm" iconName="Eye">
                        View
                      </Button>
                      <Button variant="ghost" size="sm" iconName="MoreHorizontal">
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {/* Table Footer */}
      <div className="px-6 py-4 border-t border-border bg-muted/20">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {resultsData?.length} candidates • Total votes: {totalVotes?.toLocaleString()}
          </div>
          <div className="flex items-center space-x-2 mt-2 sm:mt-0">
            <span className="text-xs text-muted-foreground">
              {selectedRows?.length} selected
            </span>
            {selectedRows?.length > 0 && (
              <Button variant="outline" size="sm" iconName="Download">
                Export Selected
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedResultsTable;