import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const AddStudentModal = ({ 
  isOpen = false, 
  onClose = () => {}, 
  onSubmit = () => {},
  editingStudent = null 
}) => {
  const [formData, setFormData] = useState({
    name: editingStudent?.name || '',
    studentId: editingStudent?.studentId || '',
    email: editingStudent?.email || '',
    department: editingStudent?.department || '',
    year: editingStudent?.year || '',
    status: editingStudent?.status || 'active'
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.name?.trim()) {
      newErrors.name = 'Student name is required';
    }
    
    if (!formData?.studentId?.trim()) {
      newErrors.studentId = 'Student ID is required';
    } else if (!/^[A-Z0-9]{6,12}$/?.test(formData?.studentId)) {
      newErrors.studentId = 'Student ID must be 6-12 alphanumeric characters';
    }
    
    if (!formData?.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData?.department?.trim()) {
      newErrors.department = 'Department is required';
    }
    
    if (!formData?.year?.trim()) {
      newErrors.year = 'Academic year is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      await onSubmit({
        ...formData,
        id: editingStudent?.id || Date.now(),
        registrationDate: editingStudent?.registrationDate || new Date()?.toISOString(),
        votingStatus: editingStudent?.votingStatus || 'pending'
      });
      handleClose();
    } catch (error) {
      console.error('Failed to save student:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      name: '',
      studentId: '',
      email: '',
      department: '',
      year: '',
      status: 'active'
    });
    setErrors({});
    onClose();
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-120 p-4">
      <div className="bg-card border border-border rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">
            {editingStudent ? 'Edit Student' : 'Add New Student'}
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClose}
            className="h-8 w-8"
          >
            <Icon name="X" size={16} />
          </Button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <Input
            label="Full Name"
            type="text"
            placeholder="Enter student's full name"
            value={formData?.name}
            onChange={(e) => handleInputChange('name', e?.target?.value)}
            error={errors?.name}
            required
          />

          <Input
            label="Student ID"
            type="text"
            placeholder="e.g., STU123456"
            value={formData?.studentId}
            onChange={(e) => handleInputChange('studentId', e?.target?.value?.toUpperCase())}
            error={errors?.studentId}
            description="6-12 alphanumeric characters"
            required
          />

          <Input
            label="Email Address"
            type="email"
            placeholder="student@university.edu"
            value={formData?.email}
            onChange={(e) => handleInputChange('email', e?.target?.value)}
            error={errors?.email}
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Department
              </label>
              <select
                value={formData?.department}
                onChange={(e) => handleInputChange('department', e?.target?.value)}
                className={`w-full px-3 py-2 border rounded-md bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-primary ${
                  errors?.department ? 'border-error' : 'border-border'
                }`}
                required
              >
                <option value="">Select Department</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Engineering">Engineering</option>
                <option value="Business">Business</option>
                <option value="Arts & Sciences">Arts & Sciences</option>
                <option value="Medicine">Medicine</option>
                <option value="Law">Law</option>
              </select>
              {errors?.department && (
                <p className="mt-1 text-xs text-error">{errors?.department}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Academic Year
              </label>
              <select
                value={formData?.year}
                onChange={(e) => handleInputChange('year', e?.target?.value)}
                className={`w-full px-3 py-2 border rounded-md bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-primary ${
                  errors?.year ? 'border-error' : 'border-border'
                }`}
                required
              >
                <option value="">Select Year</option>
                <option value="1st Year">1st Year</option>
                <option value="2nd Year">2nd Year</option>
                <option value="3rd Year">3rd Year</option>
                <option value="4th Year">4th Year</option>
                <option value="Graduate">Graduate</option>
              </select>
              {errors?.year && (
                <p className="mt-1 text-xs text-error">{errors?.year}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Status
            </label>
            <select
              value={formData?.status}
              onChange={(e) => handleInputChange('status', e?.target?.value)}
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-primary"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              loading={isLoading}
              iconName={editingStudent ? "Save" : "Plus"}
              iconPosition="left"
            >
              {editingStudent ? 'Update Student' : 'Add Student'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStudentModal;