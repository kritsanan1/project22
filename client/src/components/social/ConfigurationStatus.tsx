
import React, { useState, useEffect } from 'react';
import { AlertTriangle, CheckCircle, Settings, RefreshCw } from 'lucide-react';
import { ayrshareService } from '../../services/ayrshareService';

interface ConfigurationStatusProps {
  isConfigured: boolean;
  service: string;
  className?: string;
}

export function ConfigurationStatus({ isConfigured, service, className = '' }: ConfigurationStatusProps) {
  const [connectionStatus, setConnectionStatus] = useState<'unknown' | 'testing' | 'success' | 'failed'>('unknown');
  const [testMessage, setTestMessage] = useState<string>('');

  const testConnection = async () => {
    setConnectionStatus('testing');
    try {
      const result = await ayrshareService.testConnection();
      setConnectionStatus(result.success ? 'success' : 'failed');
      setTestMessage(result.message);
    } catch (error) {
      setConnectionStatus('failed');
      setTestMessage((error as Error).message);
    }
  };

  useEffect(() => {
    if (isConfigured && connectionStatus === 'unknown') {
      testConnection();
    }
  }, [isConfigured]);

  if (isConfigured && connectionStatus === 'success') {
    return (
      <div className={`bg-green-50 border border-green-200 rounded-lg p-3 ${className}`}>
        <div className="flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-green-600" />
          <span className="text-sm font-medium text-green-800">{service} Connected</span>
        </div>
      </div>
    );
  }

  const getStatusColor = () => {
    if (connectionStatus === 'failed') return 'red';
    if (connectionStatus === 'success') return 'green';
    return 'amber';
  };

  const statusColor = getStatusColor();

  return (
    <div className={`bg-${statusColor}-50 border border-${statusColor}-200 rounded-lg p-4 ${className}`} data-testid="configuration-status">
      <div className="flex items-center gap-3">
        {connectionStatus === 'failed' ? (
          <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0" />
        ) : (
          <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />
        )}
        <div className="flex-1">
          <h4 className={`text-sm font-medium text-${statusColor}-800`}>
            {!isConfigured ? `${service} Not Configured` : `${service} Connection Issue`}
          </h4>
          <p className={`text-sm text-${statusColor}-700 mt-1`}>
            {!isConfigured ? 
              `To enable full ${service.toLowerCase()} features, add your API key to the environment variables. Currently showing demo data.` :
              testMessage || 'Testing connection...'
            }
          </p>
        </div>
        <div className="flex items-center gap-2">
          {isConfigured && (
            <button
              onClick={testConnection}
              disabled={connectionStatus === 'testing'}
              className={`p-1 rounded hover:bg-${statusColor}-100 text-${statusColor}-600`}
            >
              <RefreshCw className={`w-4 h-4 ${connectionStatus === 'testing' ? 'animate-spin' : ''}`} />
            </button>
          )}
          <Settings className={`w-4 h-4 text-${statusColor}-600`} />
        </div>
      </div>
      
      <div className={`mt-3 text-xs text-${statusColor}-600`}>
        <details>
          <summary className={`cursor-pointer hover:text-${statusColor}-800`}>
            Setup Instructions
          </summary>
          <div className="mt-2 pl-4 space-y-1">
            <p>1. Get your API key from {service}</p>
            <p>2. Add VITE_{service.toUpperCase()}_API_KEY to Replit Secrets</p>
            <p>3. Restart the development server</p>
            <p>4. Click the refresh button to test connection</p>
          </div>
        </details>
      </div>
    </div>
  );
}
