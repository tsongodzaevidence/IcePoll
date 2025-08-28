import React, { useState, useEffect, useMemo } from 'react';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const StudentNameSelector = ({ 
  onStudentSelect = () => {},
  selectedStudent = null,
  isLoading = false,
  error = null
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock student data - in production this would come from API
  const mockStudents = [
    { id: 'STU001', name: 'Alexander Johnson', class: '12A', rollNumber: '001' },
    { id: 'STU002', name: 'Emily Rodriguez', class: '12B', rollNumber: '002' },
    { id: 'STU003', name: 'Michael Chen', class: '12A', rollNumber: '003' },
    { id: 'STU004', name: 'Sarah Williams', class: '12C', rollNumber: '004' },
    { id: 'STU005', name: 'David Thompson', class: '12B', rollNumber: '005' },
    { id: 'STU006', name: 'Jessica Martinez', class: '12A', rollNumber: '006' },
    { id: 'STU007', name: 'Christopher Lee', class: '12C', rollNumber: '007' },
    { id: 'STU008', name: 'Amanda Davis', class: '12B', rollNumber: '008' },
    { id: 'STU009', name: 'James Wilson', class: '12A', rollNumber: '009' },
    { id: 'STU010', name: 'Rachel Brown', class: '12C', rollNumber: '010' },
    { id: 'STU011', name: 'Kevin Anderson', class: '12B', rollNumber: '011' },
    { id: 'STU012', name: 'Lisa Garcia', class: '12A', rollNumber: '012' },
    { id: 'STU013', name: 'Robert Taylor', class: '12C', rollNumber: '013' },
    { id: 'STU014', name: 'Michelle White', class: '12B', rollNumber: '014' },
    { id: 'STU015', name: 'Daniel Harris', class: '12A', rollNumber: '015' },
    { id: 'STU016', name: 'Jennifer Clark', class: '12C', rollNumber: '016' },
    { id: 'STU017', name: 'Matthew Lewis', class: '12B', rollNumber: '017' },
    { id: 'STU018', name: 'Ashley Walker', class: '12A', rollNumber: '018' },
    { id: 'STU019', name: 'Andrew Hall', class: '12C', rollNumber: '019' },
    { id: 'STU020', name: 'Stephanie Young', class: '12B', rollNumber: '020' }
  ];

  // Convert students to select options format
  const studentOptions = useMemo(() => {
    return mockStudents?.map(student => ({
      value: student?.id,
      label: student?.name,
      description: `Class ${student?.class} • Roll No. ${student?.rollNumber}`
    }));
  }, []);

  // Filter options based on search term
  const filteredOptions = useMemo(() => {
    if (!searchTerm?.trim()) return studentOptions;
    
    return studentOptions?.filter(option =>
      option?.label?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      option?.description?.toLowerCase()?.includes(searchTerm?.toLowerCase())
    );
  }, [studentOptions, searchTerm]);

  const handleStudentChange = (studentId) => {
    const student = mockStudents?.find(s => s?.id === studentId);
    onStudentSelect(student);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="mb-6">
        <div className="flex items-center justify-center mb-4">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <Icon name="User" size={32} className="text-primary" />
          </div>
        </div>
        
        <h2 className="text-2xl font-semibold text-foreground text-center mb-2">
          Student Authentication
        </h2>
        
        <p className="text-muted-foreground text-center text-sm">
          Select your name to begin voting
        </p>
      </div>
      <div className="space-y-4">
        <Select
          label="Select Your Name"
          placeholder="Search and select your name..."
          options={filteredOptions}
          value={selectedStudent?.id || ''}
          onChange={handleStudentChange}
          searchable
          clearable
          loading={isLoading}
          error={error}
          required
          description="Type to search for your name in the student roster"
          className="mb-4"
        />

        {selectedStudent && (
          <div className="bg-success/10 border border-success/20 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-success rounded-full flex items-center justify-center">
                <Icon name="Check" size={20} color="white" />
              </div>
              <div>
                <div className="font-medium text-foreground">
                  {selectedStudent?.name}
                </div>
                <div className="text-sm text-muted-foreground">
                  Class {selectedStudent?.class} • Roll No. {selectedStudent?.rollNumber}
                </div>
              </div>
            </div>
          </div>
        )}

        {filteredOptions?.length === 0 && searchTerm && (
          <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-warning/20 rounded-full flex items-center justify-center">
                <Icon name="Search" size={20} className="text-warning" />
              </div>
              <div>
                <div className="font-medium text-foreground">
                  No students found
                </div>
                <div className="text-sm text-muted-foreground">
                  Try adjusting your search term
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentNameSelector;