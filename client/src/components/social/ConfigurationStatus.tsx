
import React from 'react';
import { AlertTriangle, CheckCircle, Settings } from 'lucide-react';

interface ConfigurationStatusProps {
  isConfigured: boolean;
  service: string;
  className?: string;
}

export function ConfigurationStatus({ isConfigured, service, className = '' }: ConfigurationStatusProps) {
  if (isConfigured) {
    return null; // Don't show anything when properly configured
  }

  return (
    <div className={`bg-amber-50 border border-amber-200 rounded-lg p-4 ${className}`} data-testid="configuration-status">
      <div className="flex items-center gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />
        <div className="flex-1">
          <h4 className="text-sm font-medium text-amber-800">
            {service} Not Configured
          </h4>
          <p className="text-sm text-amber-700 mt-1">
            To enable full {service.toLowerCase()} features, add your API key to the environment variables.
            Currently showing demo data.
          </p>
        </div>
        <Settings className="w-4 h-4 text-amber-600" />
      </div>
      
      <div className="mt-3 text-xs text-amber-600">
        <details>
          <summary className="cursor-pointer hover:text-amber-800">
            Setup Instructions
          </summary>
          <div className="mt-2 pl-4 space-y-1">
            <p>1. Get your API key from {service}</p>
            <p>2. Add VITE_{service.toUpperCase()}_API_KEY to your .env file</p>
            <p>3. Restart the development server</p>
          </div>
        </details>
      </div>
    </div>
  );
}
