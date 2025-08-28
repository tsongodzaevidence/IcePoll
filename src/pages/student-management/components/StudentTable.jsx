import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const StudentTable = ({ 
  students = [], 
  onEdit = () => {}, 
  onDelete = () => {},
  onBulkAction = () => {},
  selectedStudents = [],
  onSelectStudent = () => {},
  onSelectAll = () => {},
  currentPage = 1,
  totalPages = 1,
  onPageChange = () => {},
  pageSize = 10,
  onPageSizeChange = () => {}
}) => {
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getSortIcon = (field) => {
    if (sortField !== field) return 'ArrowUpDown';
    return sortDirection === 'asc' ? 'ArrowUp' : 'ArrowDown';
  };

  const getVotingStatusBadge = (status) => {
    const statusConfig = {
      voted: { color: 'bg-success text-success-foreground', label: 'Voted' },
      pending: { color: 'bg-warning text-warning-foreground', label: 'Pending' },
      inactive: { color: 'bg-muted text-muted-foreground', label: 'Inactive' }
    };
    
    const config = statusConfig?.[status] || statusConfig?.pending;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config?.color}`}>
        {config?.label}
      </span>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const isAllSelected = students?.length > 0 && selectedStudents?.length === students?.length;
  const isIndeterminate = selectedStudents?.length > 0 && selectedStudents?.length < students?.length;

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="w-12 px-4 py-3 text-left">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  ref={(el) => {
                    if (el) el.indeterminate = isIndeterminate;
                  }}
                  onChange={onSelectAll}
                  className="rounded border-border focus:ring-2 focus:ring-primary"
                />
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => handleSort('name')}
                  className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-primary transition-hover"
                >
                  <span>Student Name</span>
                  <Icon name={getSortIcon('name')} size={14} />
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => handleSort('studentId')}
                  className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-primary transition-hover"
                >
                  <span>Student ID</span>
                  <Icon name={getSortIcon('studentId')} size={14} />
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => handleSort('registrationDate')}
                  className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-primary transition-hover"
                >
                  <span>Registration Date</span>
                  <Icon name={getSortIcon('registrationDate')} size={14} />
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => handleSort('votingStatus')}
                  className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-primary transition-hover"
                >
                  <span>Voting Status</span>
                  <Icon name={getSortIcon('votingStatus')} size={14} />
                </button>
              </th>
              <th className="px-4 py-3 text-right text-sm font-medium text-foreground">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {students?.map((student) => (
              <tr key={student?.id} className="hover:bg-muted/30 transition-hover">
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selectedStudents?.includes(student?.id)}
                    onChange={() => onSelectStudent(student?.id)}
                    className="rounded border-border focus:ring-2 focus:ring-primary"
                  />
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-primary-foreground">
                        {student?.name?.charAt(0)?.toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-foreground">{student?.name}</div>
                      <div className="text-xs text-muted-foreground">{student?.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-foreground">{student?.studentId}</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">
                  {formatDate(student?.registrationDate)}
                </td>
                <td className="px-4 py-3">
                  {getVotingStatusBadge(student?.votingStatus)}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit(student)}
                      className="h-8 w-8"
                    >
                      <Icon name="Edit2" size={14} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDelete(student?.id)}
                      className="h-8 w-8 text-error hover:text-error"
                    >
                      <Icon name="Trash2" size={14} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile Card View */}
      <div className="md:hidden divide-y divide-border">
        {students?.map((student) => (
          <div key={student?.id} className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={selectedStudents?.includes(student?.id)}
                  onChange={() => onSelectStudent(student?.id)}
                  className="rounded border-border focus:ring-2 focus:ring-primary mt-1"
                />
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-primary-foreground">
                    {student?.name?.charAt(0)?.toUpperCase()}
                  </span>
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground">{student?.name}</div>
                  <div className="text-xs text-muted-foreground">{student?.studentId}</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onEdit(student)}
                  className="h-8 w-8"
                >
                  <Icon name="Edit2" size={14} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDelete(student?.id)}
                  className="h-8 w-8 text-error hover:text-error"
                >
                  <Icon name="Trash2" size={14} />
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">Email:</span>
                <span className="text-xs text-foreground">{student?.email}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">Registered:</span>
                <span className="text-xs text-foreground">{formatDate(student?.registrationDate)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">Status:</span>
                {getVotingStatusBadge(student?.votingStatus)}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Pagination */}
      <div className="px-4 py-3 border-t border-border bg-muted/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">Show</span>
            <select
              value={pageSize}
              onChange={(e) => onPageSizeChange(Number(e?.target?.value))}
              className="px-2 py-1 text-sm border border-border rounded bg-background text-foreground focus:ring-2 focus:ring-primary"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
            <span className="text-sm text-muted-foreground">entries</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <Icon name="ChevronLeft" size={16} />
              Previous
            </Button>
            
            <div className="flex items-center space-x-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const page = i + 1;
                return (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "ghost"}
                    size="sm"
                    onClick={() => onPageChange(page)}
                    className="w-8 h-8"
                  >
                    {page}
                  </Button>
                );
              })}
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
              <Icon name="ChevronRight" size={16} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentTable;