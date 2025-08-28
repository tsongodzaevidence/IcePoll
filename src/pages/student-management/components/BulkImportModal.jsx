import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BulkImportModal = ({ 
  isOpen = false, 
  onClose = () => {}, 
  onImport = () => {} 
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [importResults, setImportResults] = useState(null);
  const fileInputRef = useRef(null);

  const sampleData = `Name,Student ID,Email,Department,Year
John Smith,STU123456,john.smith@university.edu,Computer Science,3rd Year
Jane Doe,STU789012,jane.doe@university.edu,Engineering,2nd Year
Mike Johnson,STU345678,mike.johnson@university.edu,Business,4th Year`;

  const handleDrag = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (e?.type === "dragenter" || e?.type === "dragover") {
      setDragActive(true);
    } else if (e?.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setDragActive(false);
    
    if (e?.dataTransfer?.files && e?.dataTransfer?.files?.[0]) {
      handleFileSelect(e?.dataTransfer?.files?.[0]);
    }
  };

  const handleFileSelect = (file) => {
    if (file && file?.type === 'text/csv') {
      setSelectedFile(file);
      setImportResults(null);
    } else {
      alert('Please select a valid CSV file');
    }
  };

  const handleFileInputChange = (e) => {
    if (e?.target?.files && e?.target?.files?.[0]) {
      handleFileSelect(e?.target?.files?.[0]);
    }
  };

  const handleImport = async () => {
    if (!selectedFile) return;

    setIsLoading(true);
    try {
      // Simulate file processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockResults = {
        total: 150,
        successful: 145,
        failed: 5,
        errors: [
          'Row 23: Invalid email format for student STU456789',
          'Row 45: Duplicate Student ID STU123456',
          'Row 67: Missing department for Jane Wilson',
          'Row 89: Invalid year format for Mike Brown',
          'Row 112: Email already exists for Sarah Davis'
        ]
      };
      
      setImportResults(mockResults);
      await onImport(selectedFile, mockResults);
    } catch (error) {
      console.error('Import failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setSelectedFile(null);
    setImportResults(null);
    setDragActive(false);
    onClose();
  };

  const downloadSample = () => {
    const blob = new Blob([sampleData], { type: 'text/csv' });
    const url = window.URL?.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'student_import_sample.csv';
    a?.click();
    window.URL?.revokeObjectURL(url);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-120 p-4">
      <div className="bg-card border border-border rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">Bulk Import Students</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClose}
            className="h-8 w-8"
          >
            <Icon name="X" size={16} />
          </Button>
        </div>

        <div className="p-6">
          {!importResults ? (
            <>
              {/* Instructions */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-foreground mb-2">Import Instructions</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Upload a CSV file with student information</li>
                  <li>• Required columns: Name, Student ID, Email, Department, Year</li>
                  <li>• Maximum file size: 10MB</li>
                  <li>• Duplicate Student IDs will be skipped</li>
                </ul>
              </div>

              {/* Sample Download */}
              <div className="mb-6">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={downloadSample}
                  iconName="Download"
                  iconPosition="left"
                >
                  Download Sample CSV
                </Button>
              </div>

              {/* File Upload Area */}
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragActive 
                    ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv"
                  onChange={handleFileInputChange}
                  className="hidden"
                />
                
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                    <Icon name="Upload" size={24} className="text-muted-foreground" />
                  </div>
                  
                  {selectedFile ? (
                    <div>
                      <p className="text-sm font-medium text-foreground">{selectedFile?.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {(selectedFile?.size / 1024)?.toFixed(1)} KB
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-sm text-foreground mb-2">
                        Drag and drop your CSV file here, or click to browse
                      </p>
                      <Button
                        variant="outline"
                        onClick={() => fileInputRef?.current?.click()}
                      >
                        Choose File
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end space-x-3 mt-6">
                <Button variant="outline" onClick={handleClose}>
                  Cancel
                </Button>
                <Button
                  onClick={handleImport}
                  disabled={!selectedFile}
                  loading={isLoading}
                  iconName="Upload"
                  iconPosition="left"
                >
                  Import Students
                </Button>
              </div>
            </>
          ) : (
            /* Import Results */
            (<div className="space-y-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="CheckCircle" size={24} className="text-success" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Import Completed</h3>
                <p className="text-sm text-muted-foreground">
                  Your student data has been processed
                </p>
              </div>
              {/* Results Summary */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-muted/30 rounded-lg">
                  <div className="text-2xl font-bold text-foreground">{importResults?.total}</div>
                  <div className="text-sm text-muted-foreground">Total Records</div>
                </div>
                <div className="text-center p-4 bg-success/10 rounded-lg">
                  <div className="text-2xl font-bold text-success">{importResults?.successful}</div>
                  <div className="text-sm text-muted-foreground">Successful</div>
                </div>
                <div className="text-center p-4 bg-error/10 rounded-lg">
                  <div className="text-2xl font-bold text-error">{importResults?.failed}</div>
                  <div className="text-sm text-muted-foreground">Failed</div>
                </div>
              </div>
              {/* Error Details */}
              {importResults?.errors?.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-3">Import Errors</h4>
                  <div className="bg-error/5 border border-error/20 rounded-lg p-4 max-h-40 overflow-y-auto">
                    <ul className="space-y-1">
                      {importResults?.errors?.map((error, index) => (
                        <li key={index} className="text-sm text-error flex items-start">
                          <Icon name="AlertCircle" size={14} className="mr-2 mt-0.5 flex-shrink-0" />
                          {error}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
              <div className="flex justify-end">
                <Button onClick={handleClose}>
                  Close
                </Button>
              </div>
            </div>)
          )}
        </div>
      </div>
    </div>
  );
};

export default BulkImportModal;