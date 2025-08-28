import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const ExportControls = ({ onExport, exportOptions = {} }) => {
  const [isExporting, setIsExporting] = useState(false);
  const [exportFormat, setExportFormat] = useState('pdf');
  const [exportScope, setExportScope] = useState('all');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const formatOptions = [
    { value: 'pdf', label: 'PDF Report', description: 'Professional formatted report' },
    { value: 'excel', label: 'Excel Spreadsheet', description: 'Detailed data with charts' },
    { value: 'csv', label: 'CSV Data', description: 'Raw data for analysis' },
    { value: 'json', label: 'JSON Data', description: 'Structured data format' }
  ];

  const scopeOptions = [
    { value: 'all', label: 'Complete Results', description: 'All candidates and data' },
    { value: 'summary', label: 'Summary Only', description: 'Key metrics and winners' },
    { value: 'detailed', label: 'Detailed Analysis', description: 'Full breakdown with charts' },
    { value: 'custom', label: 'Custom Selection', description: 'Choose specific data' }
  ];

  const handleExport = async (format = exportFormat) => {
    setIsExporting(true);
    try {
      const exportData = {
        format,
        scope: exportScope,
        timestamp: new Date()?.toISOString(),
        includeCharts: showAdvanced,
        ...exportOptions
      };
      
      await onExport(exportData);
      
      // Simulate export process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const getFormatIcon = (format) => {
    switch (format) {
      case 'pdf': return 'FileText';
      case 'excel': return 'Sheet';
      case 'csv': return 'Database';
      case 'json': return 'Code';
      default: return 'Download';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-card">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-2">Export Results</h2>
          <p className="text-sm text-muted-foreground">
            Download voting results in various formats for reporting and analysis
          </p>
        </div>
        <Icon name="Download" size={24} className="text-muted-foreground" />
      </div>
      <div className="space-y-6">
        {/* Quick Export Buttons */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {formatOptions?.map((format) => (
            <Button
              key={format?.value}
              variant={exportFormat === format?.value ? 'default' : 'outline'}
              onClick={() => {
                setExportFormat(format?.value);
                handleExport(format?.value);
              }}
              loading={isExporting && exportFormat === format?.value}
              iconName={getFormatIcon(format?.value)}
              iconPosition="left"
              className="h-auto p-4 flex-col items-start text-left"
            >
              <span className="font-medium">{format?.label}</span>
              <span className="text-xs text-muted-foreground mt-1">
                {format?.description}
              </span>
            </Button>
          ))}
        </div>

        {/* Advanced Options */}
        <div className="border-t border-border pt-6">
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center space-x-2 text-sm font-medium text-foreground hover:text-primary transition-hover mb-4"
          >
            <Icon name={showAdvanced ? "ChevronUp" : "ChevronDown"} size={16} />
            <span>Advanced Export Options</span>
          </button>

          {showAdvanced && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select
                  label="Export Format"
                  options={formatOptions}
                  value={exportFormat}
                  onChange={setExportFormat}
                />
                
                <Select
                  label="Export Scope"
                  options={scopeOptions}
                  value={exportScope}
                  onChange={setExportScope}
                />
              </div>

              {/* Additional Options */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="rounded border-border"
                    defaultChecked
                  />
                  <span className="text-sm text-foreground">Include Charts</span>
                </label>
                
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="rounded border-border"
                    defaultChecked
                  />
                  <span className="text-sm text-foreground">Include Timestamps</span>
                </label>
                
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="rounded border-border"
                  />
                  <span className="text-sm text-foreground">Include Audit Trail</span>
                </label>
              </div>

              <div className="flex items-center justify-between pt-4">
                <div className="text-sm text-muted-foreground">
                  Estimated file size: ~2.5 MB
                </div>
                <Button
                  variant="default"
                  onClick={() => handleExport()}
                  loading={isExporting}
                  iconName="Download"
                  iconPosition="left"
                >
                  Generate Export
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Recent Exports */}
        <div className="border-t border-border pt-6">
          <h3 className="text-sm font-medium text-foreground mb-3">Recent Exports</h3>
          <div className="space-y-2">
            {[
              { name: 'Complete_Results_2025-08-28.pdf', size: '2.1 MB', time: '2 minutes ago' },
              { name: 'Summary_Report_2025-08-28.xlsx', size: '1.8 MB', time: '15 minutes ago' },
              { name: 'Raw_Data_2025-08-28.csv', size: '0.5 MB', time: '1 hour ago' }
            ]?.map((file, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-md">
                <div className="flex items-center space-x-3">
                  <Icon name="File" size={16} className="text-muted-foreground" />
                  <div>
                    <div className="text-sm font-medium text-foreground">{file?.name}</div>
                    <div className="text-xs text-muted-foreground">{file?.size} • {file?.time}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" iconName="Download">
                    Download
                  </Button>
                  <Button variant="ghost" size="sm" iconName="Trash2">
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportControls;