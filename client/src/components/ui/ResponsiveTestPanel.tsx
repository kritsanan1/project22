import React, { useState, useEffect } from 'react';
import { Monitor, Smartphone, Tablet, Maximize2, Minimize2 } from 'lucide-react';

interface ViewportSize {
  width: number;
  height: number;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
}

const ResponsiveTestPanel = () => {
  const [currentViewport, setCurrentViewport] = useState<ViewportSize | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const viewportSizes: ViewportSize[] = [
    { width: 375, height: 667, name: 'iPhone SE', icon: Smartphone },
    { width: 390, height: 844, name: 'iPhone 12', icon: Smartphone },
    { width: 414, height: 896, name: 'iPhone 11 Pro Max', icon: Smartphone },
    { width: 768, height: 1024, name: 'iPad', icon: Tablet },
    { width: 1024, height: 768, name: 'iPad Landscape', icon: Tablet },
    { width: 1280, height: 800, name: 'Desktop Small', icon: Monitor },
    { width: 1920, height: 1080, name: 'Desktop Large', icon: Monitor },
  ];

  const [screenInfo, setScreenInfo] = useState({
    width: window.screen.width,
    height: window.screen.height,
    availWidth: window.screen.availWidth,
    availHeight: window.screen.availHeight,
    devicePixelRatio: window.devicePixelRatio,
  });

  useEffect(() => {
    const updateScreenInfo = () => {
      setScreenInfo({
        width: window.screen.width,
        height: window.screen.height,
        availWidth: window.screen.availWidth,
        availHeight: window.screen.availHeight,
        devicePixelRatio: window.devicePixelRatio,
      });
    };

    window.addEventListener('resize', updateScreenInfo);
    return () => window.removeEventListener('resize', updateScreenInfo);
  }, []);

  const handleViewportChange = (viewport: ViewportSize) => {
    setCurrentViewport(viewport);
    // In a real implementation, this would trigger responsive design testing
    console.log(`Testing responsive design for ${viewport.name}: ${viewport.width}x${viewport.height}`);
  };

  const resetViewport = () => {
    setCurrentViewport(null);
  };

  return (
    <div className="bg-white rounded-xl border border-neutral-200 shadow-soft" data-testid="responsive-test-panel">
      <div className="p-4 border-b border-neutral-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <Monitor className="w-4 h-4 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-neutral-900">Responsive Design Tester</h3>
              <p className="text-sm text-neutral-600">Test mobile responsiveness across devices</p>
            </div>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 text-neutral-600 hover:text-neutral-900 transition-colors"
            data-testid="toggle-responsive-panel"
          >
            {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="p-4 space-y-4">
          {/* Current Screen Information */}
          <div className="p-4 bg-neutral-50 rounded-lg">
            <h4 className="font-medium text-neutral-900 mb-3">Current Device Information</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-neutral-600">Screen Size:</span>
                <span className="ml-2 font-medium">{screenInfo.width}×{screenInfo.height}</span>
              </div>
              <div>
                <span className="text-neutral-600">Available:</span>
                <span className="ml-2 font-medium">{screenInfo.availWidth}×{screenInfo.availHeight}</span>
              </div>
              <div>
                <span className="text-neutral-600">Pixel Ratio:</span>
                <span className="ml-2 font-medium">{screenInfo.devicePixelRatio}x</span>
              </div>
              <div>
                <span className="text-neutral-600">Viewport:</span>
                <span className="ml-2 font-medium">{window.innerWidth}×{window.innerHeight}</span>
              </div>
            </div>
          </div>

          {/* Viewport Test Buttons */}
          <div>
            <h4 className="font-medium text-neutral-900 mb-3">Test Viewports</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {viewportSizes.map((viewport) => {
                const Icon = viewport.icon;
                const isActive = currentViewport?.name === viewport.name;
                
                return (
                  <button
                    key={viewport.name}
                    onClick={() => handleViewportChange(viewport)}
                    className={`p-3 rounded-lg border transition-all duration-200 text-left ${
                      isActive
                        ? 'border-purple-200 bg-purple-50 text-purple-900'
                        : 'border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50'
                    }`}
                    data-testid={`viewport-${viewport.name.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-purple-600' : 'text-neutral-600'}`} />
                      <span className="font-medium text-sm">{viewport.name}</span>
                    </div>
                    <div className="text-xs text-neutral-500">
                      {viewport.width}×{viewport.height}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Current Test Information */}
          {currentViewport && (
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-purple-900">Testing: {currentViewport.name}</h4>
                <button
                  onClick={resetViewport}
                  className="text-sm text-purple-600 hover:text-purple-800 transition-colors"
                  data-testid="reset-viewport"
                >
                  Reset
                </button>
              </div>
              <div className="text-sm text-purple-700">
                Simulating viewport size: {currentViewport.width}×{currentViewport.height}px
              </div>
              <div className="mt-3 text-xs text-purple-600">
                ℹ️ In development, responsive testing happens through browser dev tools. 
                This component tracks viewport preferences and would integrate with testing APIs in production.
              </div>
            </div>
          )}

          {/* Responsive Breakpoints */}
          <div>
            <h4 className="font-medium text-neutral-900 mb-3">CSS Breakpoints</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center p-2 bg-neutral-50 rounded">
                <span className="text-neutral-600">Small (sm)</span>
                <span className="font-mono text-neutral-900">640px+</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-neutral-50 rounded">
                <span className="text-neutral-600">Medium (md)</span>
                <span className="font-mono text-neutral-900">768px+</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-neutral-50 rounded">
                <span className="text-neutral-600">Large (lg)</span>
                <span className="font-mono text-neutral-900">1024px+</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-neutral-50 rounded">
                <span className="text-neutral-600">Extra Large (xl)</span>
                <span className="font-mono text-neutral-900">1280px+</span>
              </div>
            </div>
          </div>

          {/* Touch Target Guidelines */}
          <div>
            <h4 className="font-medium text-neutral-900 mb-3">Mobile UX Guidelines</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between p-2 bg-emerald-50 rounded border border-emerald-200">
                <span className="text-emerald-800">✓ Touch targets</span>
                <span className="font-mono text-emerald-700">44px minimum</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-emerald-50 rounded border border-emerald-200">
                <span className="text-emerald-800">✓ Font size</span>
                <span className="font-mono text-emerald-700">16px minimum</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-emerald-50 rounded border border-emerald-200">
                <span className="text-emerald-800">✓ Contrast ratio</span>
                <span className="font-mono text-emerald-700">4.5:1 minimum</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-emerald-50 rounded border border-emerald-200">
                <span className="text-emerald-800">✓ Viewport meta</span>
                <span className="font-mono text-emerald-700">Configured</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResponsiveTestPanel;