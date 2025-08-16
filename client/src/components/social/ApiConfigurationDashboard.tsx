
import React, { useState, useEffect } from 'react';
import { CheckCircle, AlertCircle, RefreshCw, Settings, ExternalLink } from 'lucide-react';
import { ayrshareService } from '../../services/ayrshareService';

interface ApiStatus {
  service: string;
  configured: boolean;
  connected: boolean;
  lastTested: Date | null;
  message: string;
  testInProgress: boolean;
}

export function ApiConfigurationDashboard() {
  const [apiStatuses, setApiStatuses] = useState<ApiStatus[]>([
    {
      service: 'Ayrshare',
      configured: !!import.meta.env.VITE_AYRSHARE_API_KEY,
      connected: false,
      lastTested: null,
      message: '',
      testInProgress: false,
    },
  ]);

  const testApiConnection = async (serviceIndex: number) => {
    const updatedStatuses = [...apiStatuses];
    updatedStatuses[serviceIndex].testInProgress = true;
    setApiStatuses(updatedStatuses);

    try {
      const result = await ayrshareService.testConnection();
      updatedStatuses[serviceIndex] = {
        ...updatedStatuses[serviceIndex],
        connected: result.success,
        message: result.message,
        lastTested: new Date(),
        testInProgress: false,
      };
    } catch (error) {
      updatedStatuses[serviceIndex] = {
        ...updatedStatuses[serviceIndex],
        connected: false,
        message: (error as Error).message,
        lastTested: new Date(),
        testInProgress: false,
      };
    }

    setApiStatuses(updatedStatuses);
  };

  const testAllConnections = async () => {
    for (let i = 0; i < apiStatuses.length; i++) {
      if (apiStatuses[i].configured) {
        await testApiConnection(i);
      }
    }
  };

  useEffect(() => {
    // Test connections on component mount
    testAllConnections();
  }, []);

  const getStatusIcon = (status: ApiStatus) => {
    if (status.testInProgress) {
      return <RefreshCw className="w-5 h-5 text-blue-500 animate-spin" />;
    }
    if (!status.configured) {
      return <AlertCircle className="w-5 h-5 text-amber-500" />;
    }
    if (status.connected) {
      return <CheckCircle className="w-5 h-5 text-green-500" />;
    }
    return <AlertCircle className="w-5 h-5 text-red-500" />;
  };

  const getStatusText = (status: ApiStatus) => {
    if (!status.configured) return 'Not Configured';
    if (status.testInProgress) return 'Testing...';
    if (status.connected) return 'Connected';
    return 'Connection Failed';
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">API Configuration Status</h3>
        <button
          onClick={testAllConnections}
          className="flex items-center gap-2 px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Test All
        </button>
      </div>

      <div className="space-y-4">
        {apiStatuses.map((status, index) => (
          <div key={status.service} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center gap-3">
              {getStatusIcon(status)}
              <div>
                <h4 className="font-medium text-gray-900">{status.service} API</h4>
                <p className="text-sm text-gray-600">{getStatusText(status)}</p>
                {status.message && (
                  <p className="text-xs text-gray-500 mt-1">{status.message}</p>
                )}
                {status.lastTested && (
                  <p className="text-xs text-gray-400 mt-1">
                    Last tested: {status.lastTested.toLocaleTimeString()}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              {status.configured && (
                <button
                  onClick={() => testApiConnection(index)}
                  disabled={status.testInProgress}
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <RefreshCw className={`w-4 h-4 ${status.testInProgress ? 'animate-spin' : ''}`} />
                </button>
              )}
              <a
                href="https://replit.com/~ Secrets"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                title="Configure in Replit Secrets"
              >
                <Settings className="w-4 h-4" />
              </a>
              <a
                href="https://www.ayrshare.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                title="Visit Ayrshare"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {!apiStatuses.some(s => s.configured) && (
        <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <h4 className="font-medium text-amber-900 mb-2">Quick Setup Guide</h4>
          <ol className="text-sm text-amber-800 space-y-1 list-decimal list-inside">
            <li>Sign up for an Ayrshare account at ayrshare.com</li>
            <li>Get your API key from the Ayrshare dashboard</li>
            <li>Add VITE_AYRSHARE_API_KEY to Replit Secrets</li>
            <li>Restart your development server</li>
            <li>Click "Test All" to verify the connection</li>
          </ol>
        </div>
      )}
    </div>
  );
}
