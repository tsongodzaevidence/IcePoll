import React, { useState, useMemo } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const StudentDataTable = ({ students = [], onAction = () => {} }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredAndSortedStudents = useMemo(() => {
    let filtered = students?.filter(student => {
      const matchesSearch = student?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                           student?.studentId?.toLowerCase()?.includes(searchTerm?.toLowerCase());
      const matchesStatus = filterStatus === 'all' || student?.votingStatus === filterStatus;
      return matchesSearch && matchesStatus;
    });

    filtered?.sort((a, b) => {
      let aValue = a?.[sortBy];
      let bValue = b?.[sortBy];
      
      if (sortBy === 'registrationDate') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [students, searchTerm, sortBy, sortOrder, filterStatus]);

  const paginatedStudents = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedStudents?.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSortedStudents, currentPage]);

  const totalPages = Math.ceil(filteredAndSortedStudents?.length / itemsPerPage);

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedStudents(paginatedStudents?.map(student => student?.id));
    } else {
      setSelectedStudents([]);
    }
  };

  const handleSelectStudent = (studentId, checked) => {
    if (checked) {
      setSelectedStudents([...selectedStudents, studentId]);
    } else {
      setSelectedStudents(selectedStudents?.filter(id => id !== studentId));
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'voted':
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-success/10 text-success">
            <Icon name="CheckCircle" size={12} className="mr-1" />
            Voted
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-warning/10 text-warning">
            <Icon name="Clock" size={12} className="mr-1" />
            Pending
          </span>
        );
      case 'ineligible':
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-error/10 text-error">
            <Icon name="XCircle" size={12} className="mr-1" />
            Ineligible
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground">
            <Icon name="Minus" size={12} className="mr-1" />
            Unknown
          </span>
        );
    }
  };

  const getSortIcon = (column) => {
    if (sortBy !== column) return 'ArrowUpDown';
    return sortOrder === 'asc' ? 'ArrowUp' : 'ArrowDown';
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Student Roster</h3>
            <p className="text-sm text-muted-foreground">
              {filteredAndSortedStudents?.length} of {students?.length} students
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
            <Input
              type="search"
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e?.target?.value)}
              className="w-full sm:w-64"
            />
            
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e?.target?.value)}
              className="px-3 py-2 border border-border rounded-md text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="all">All Status</option>
              <option value="voted">Voted</option>
              <option value="pending">Pending</option>
              <option value="ineligible">Ineligible</option>
            </select>
          </div>
        </div>
        
        {/* Bulk Actions */}
        {selectedStudents?.length > 0 && (
          <div className="mt-4 p-3 bg-muted/50 rounded-md">
            <div className="flex items-center justify-between">
              <span className="text-sm text-foreground">
                {selectedStudents?.length} student{selectedStudents?.length > 1 ? 's' : ''} selected
              </span>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={() => onAction('bulk-export', selectedStudents)}>
                  <Icon name="Download" size={14} className="mr-1" />
                  Export
                </Button>
                <Button variant="outline" size="sm" onClick={() => onAction('bulk-email', selectedStudents)}>
                  <Icon name="Mail" size={14} className="mr-1" />
                  Send Email
                </Button>
                <Button variant="destructive" size="sm" onClick={() => onAction('bulk-remove', selectedStudents)}>
                  <Icon name="Trash2" size={14} className="mr-1" />
                  Remove
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="w-12 p-4">
                <Checkbox
                  checked={selectedStudents?.length === paginatedStudents?.length && paginatedStudents?.length > 0}
                  onChange={(e) => handleSelectAll(e?.target?.checked)}
                />
              </th>
              <th className="text-left p-4">
                <button
                  onClick={() => handleSort('name')}
                  className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-primary transition-hover"
                >
                  <span>Student Name</span>
                  <Icon name={getSortIcon('name')} size={14} />
                </button>
              </th>
              <th className="text-left p-4">
                <button
                  onClick={() => handleSort('studentId')}
                  className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-primary transition-hover"
                >
                  <span>Student ID</span>
                  <Icon name={getSortIcon('studentId')} size={14} />
                </button>
              </th>
              <th className="text-left p-4">
                <button
                  onClick={() => handleSort('votingStatus')}
                  className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-primary transition-hover"
                >
                  <span>Status</span>
                  <Icon name={getSortIcon('votingStatus')} size={14} />
                </button>
              </th>
              <th className="text-left p-4">
                <button
                  onClick={() => handleSort('registrationDate')}
                  className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-primary transition-hover"
                >
                  <span>Registered</span>
                  <Icon name={getSortIcon('registrationDate')} size={14} />
                </button>
              </th>
              <th className="text-left p-4">
                <span className="text-sm font-medium text-foreground">Vote Time</span>
              </th>
              <th className="text-right p-4">
                <span className="text-sm font-medium text-foreground">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedStudents?.map((student) => (
              <tr key={student?.id} className="border-t border-border hover:bg-muted/30 transition-smooth">
                <td className="p-4">
                  <Checkbox
                    checked={selectedStudents?.includes(student?.id)}
                    onChange={(e) => handleSelectStudent(student?.id, e?.target?.checked)}
                  />
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium text-primary-foreground">
                        {student?.name?.charAt(0)?.toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-foreground">{student?.name}</div>
                      <div className="text-xs text-muted-foreground">{student?.email}</div>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <span className="text-sm text-foreground font-mono">{student?.studentId}</span>
                </td>
                <td className="p-4">
                  {getStatusBadge(student?.votingStatus)}
                </td>
                <td className="p-4">
                  <span className="text-sm text-muted-foreground">
                    {new Date(student.registrationDate)?.toLocaleDateString()}
                  </span>
                </td>
                <td className="p-4">
                  <span className="text-sm text-muted-foreground">
                    {student?.voteTime ? new Date(student.voteTime)?.toLocaleString() : '-'}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-end space-x-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onAction('view-student', student?.id)}
                    >
                      <Icon name="Eye" size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onAction('edit-student', student?.id)}
                    >
                      <Icon name="Edit" size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onAction('remove-student', student?.id)}
                    >
                      <Icon name="Trash2" size={16} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="p-4 border-t border-border">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredAndSortedStudents?.length)} of {filteredAndSortedStudents?.length} results
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                <Icon name="ChevronLeft" size={16} />
              </Button>
              <span className="text-sm text-foreground">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
              >
                <Icon name="ChevronRight" size={16} />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDataTable;