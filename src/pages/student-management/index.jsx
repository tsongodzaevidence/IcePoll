import React, { useState, useEffect } from 'react';
import AdminSidebar from '../../components/ui/AdminSidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import StudentTable from './components/StudentTable';
import StudentFilters from './components/StudentFilters';
import BulkActionsToolbar from './components/BulkActionsToolbar';
import AddStudentModal from './components/AddStudentModal';
import BulkImportModal from './components/BulkImportModal';

const StudentManagement = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);

  // Mock student data
  const mockStudents = [
    {
      id: 1,
      name: "Alice Johnson",
      studentId: "STU001234",
      email: "alice.johnson@university.edu",
      department: "Computer Science",
      year: "3rd Year",
      registrationDate: "2024-08-15T10:30:00Z",
      votingStatus: "voted",
      status: "active"
    },
    {
      id: 2,
      name: "Bob Smith",
      studentId: "STU002345",
      email: "bob.smith@university.edu",
      department: "Engineering",
      year: "2nd Year",
      registrationDate: "2024-08-16T14:20:00Z",
      votingStatus: "pending",
      status: "active"
    },
    {
      id: 3,
      name: "Carol Davis",
      studentId: "STU003456",
      email: "carol.davis@university.edu",
      department: "Business",
      year: "4th Year",
      registrationDate: "2024-08-17T09:15:00Z",
      votingStatus: "voted",
      status: "active"
    },
    {
      id: 4,
      name: "David Wilson",
      studentId: "STU004567",
      email: "david.wilson@university.edu",
      department: "Arts & Sciences",
      year: "1st Year",
      registrationDate: "2024-08-18T11:45:00Z",
      votingStatus: "pending",
      status: "active"
    },
    {
      id: 5,
      name: "Emma Brown",
      studentId: "STU005678",
      email: "emma.brown@university.edu",
      department: "Medicine",
      year: "Graduate",
      registrationDate: "2024-08-19T16:30:00Z",
      votingStatus: "inactive",
      status: "inactive"
    },
    {
      id: 6,
      name: "Frank Miller",
      studentId: "STU006789",
      email: "frank.miller@university.edu",
      department: "Law",
      year: "2nd Year",
      registrationDate: "2024-08-20T13:20:00Z",
      votingStatus: "voted",
      status: "active"
    },
    {
      id: 7,
      name: "Grace Lee",
      studentId: "STU007890",
      email: "grace.lee@university.edu",
      department: "Computer Science",
      year: "3rd Year",
      registrationDate: "2024-08-21T08:10:00Z",
      votingStatus: "pending",
      status: "active"
    },
    {
      id: 8,
      name: "Henry Taylor",
      studentId: "STU008901",
      email: "henry.taylor@university.edu",
      department: "Engineering",
      year: "4th Year",
      registrationDate: "2024-08-22T15:40:00Z",
      votingStatus: "voted",
      status: "active"
    }
  ];

  useEffect(() => {
    setStudents(mockStudents);
    setFilteredStudents(mockStudents);
  }, []);

  // Filter students based on search and filters
  useEffect(() => {
    let filtered = students?.filter(student => {
      const matchesSearch = !searchTerm || 
        student?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        student?.studentId?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        student?.email?.toLowerCase()?.includes(searchTerm?.toLowerCase());

      const matchesStatus = statusFilter === 'all' || student?.votingStatus === statusFilter;

      const matchesDate = dateFilter === 'all' || (() => {
        const regDate = new Date(student.registrationDate);
        const now = new Date();
        
        switch (dateFilter) {
          case 'today':
            return regDate?.toDateString() === now?.toDateString();
          case 'week':
            const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            return regDate >= weekAgo;
          case 'month':
            const monthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
            return regDate >= monthAgo;
          case 'quarter':
            const quarterAgo = new Date(now.getFullYear(), now.getMonth() - 3, now.getDate());
            return regDate >= quarterAgo;
          default:
            return true;
        }
      })();

      return matchesSearch && matchesStatus && matchesDate;
    });

    setFilteredStudents(filtered);
    setCurrentPage(1);
  }, [students, searchTerm, statusFilter, dateFilter]);

  const handleSelectStudent = (studentId) => {
    setSelectedStudents(prev => 
      prev?.includes(studentId) 
        ? prev?.filter(id => id !== studentId)
        : [...prev, studentId]
    );
  };

  const handleSelectAll = () => {
    const currentPageStudents = getCurrentPageStudents();
    const currentPageIds = currentPageStudents?.map(s => s?.id);
    const allSelected = currentPageIds?.every(id => selectedStudents?.includes(id));
    
    if (allSelected) {
      setSelectedStudents(prev => prev?.filter(id => !currentPageIds?.includes(id)));
    } else {
      setSelectedStudents(prev => [...new Set([...prev, ...currentPageIds])]);
    }
  };

  const handleEditStudent = (student) => {
    setEditingStudent(student);
    setShowAddModal(true);
  };

  const handleDeleteStudent = (studentId) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      setStudents(prev => prev?.filter(s => s?.id !== studentId));
      setSelectedStudents(prev => prev?.filter(id => id !== studentId));
    }
  };

  const handleAddStudent = (studentData) => {
    if (editingStudent) {
      setStudents(prev => prev?.map(s => 
        s?.id === editingStudent?.id ? { ...studentData, id: editingStudent?.id } : s
      ));
      setEditingStudent(null);
    } else {
      setStudents(prev => [...prev, { ...studentData, id: Date.now() }]);
    }
    setShowAddModal(false);
  };

  const handleBulkDelete = () => {
    setStudents(prev => prev?.filter(s => !selectedStudents?.includes(s?.id)));
    setSelectedStudents([]);
  };

  const handleBulkExport = () => {
    const selectedData = students?.filter(s => selectedStudents?.includes(s?.id));
    const csvContent = [
      'Name,Student ID,Email,Department,Year,Registration Date,Voting Status',
      ...selectedData?.map(s => 
        `"${s?.name}","${s?.studentId}","${s?.email}","${s?.department}","${s?.year}","${new Date(s.registrationDate)?.toLocaleDateString()}","${s?.votingStatus}"`
      )
    ]?.join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL?.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `students_export_${new Date()?.toISOString()?.split('T')?.[0]}.csv`;
    a?.click();
    window.URL?.revokeObjectURL(url);
  };

  const handleBulkImport = (file, results) => {
    console.log('Importing file:', file?.name, 'Results:', results);
    // In a real app, this would process the CSV and add students
    setShowImportModal(false);
  };

  const handleSendInvites = () => {
    console.log('Sending invites to selected students:', selectedStudents);
    alert(`Invites sent to ${selectedStudents?.length} students`);
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setDateFilter('all');
  };

  const getCurrentPageStudents = () => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredStudents?.slice(startIndex, endIndex);
  };

  const totalPages = Math.ceil(filteredStudents?.length / pageSize);

  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar 
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'}`}>
        {/* Header */}
        <header className="bg-card border-b border-border px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Student Management</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Manage eligible voters and participation tracking
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowImportModal(true)}
                iconName="Upload"
                iconPosition="left"
              >
                Bulk Import
              </Button>
              <Button
                onClick={() => {
                  setEditingStudent(null);
                  setShowAddModal(true);
                }}
                iconName="UserPlus"
                iconPosition="left"
              >
                Add Student
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-6">
          {/* Filters */}
          <StudentFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
            dateFilter={dateFilter}
            onDateFilterChange={setDateFilter}
            onClearFilters={handleClearFilters}
            totalStudents={students?.length}
            filteredStudents={filteredStudents?.length}
          />

          {/* Bulk Actions */}
          <BulkActionsToolbar
            selectedCount={selectedStudents?.length}
            onBulkDelete={handleBulkDelete}
            onBulkExport={handleBulkExport}
            onSendInvites={handleSendInvites}
            onClearSelection={() => setSelectedStudents([])}
          />

          {/* Students Table */}
          <StudentTable
            students={getCurrentPageStudents()}
            onEdit={handleEditStudent}
            onDelete={handleDeleteStudent}
            selectedStudents={selectedStudents}
            onSelectStudent={handleSelectStudent}
            onSelectAll={handleSelectAll}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            pageSize={pageSize}
            onPageSizeChange={setPageSize}
          />

          {/* Empty State */}
          {filteredStudents?.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Users" size={24} className="text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">No students found</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {searchTerm || statusFilter !== 'all' || dateFilter !== 'all' ?'Try adjusting your search criteria or filters' :'Get started by adding your first student'
                }
              </p>
              {(!searchTerm && statusFilter === 'all' && dateFilter === 'all') && (
                <Button
                  onClick={() => {
                    setEditingStudent(null);
                    setShowAddModal(true);
                  }}
                  iconName="UserPlus"
                  iconPosition="left"
                >
                  Add First Student
                </Button>
              )}
            </div>
          )}
        </main>
      </div>
      {/* Modals */}
      <AddStudentModal
        isOpen={showAddModal}
        onClose={() => {
          setShowAddModal(false);
          setEditingStudent(null);
        }}
        onSubmit={handleAddStudent}
        editingStudent={editingStudent}
      />
      <BulkImportModal
        isOpen={showImportModal}
        onClose={() => setShowImportModal(false)}
        onImport={handleBulkImport}
      />
    </div>
  );
};

export default StudentManagement;