
import React from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { Button } from '../components/Button/Button';
import { colorTokens } from '../tokens/colors';
import { typographyTokens, textStyles } from '../tokens/typography';
import { spacingTokens } from '../tokens/spacing';

export const DesignSystemDocs: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="max-w-6xl mx-auto p-8 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">Design System</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          A comprehensive design system built for scalable, accessible, and internationalized applications.
          This system provides reusable components, design tokens, and guidelines for consistent user experiences.
        </p>
      </div>

      {/* Colors */}
      <section className="space-y-6">
        <h2 className="text-3xl font-semibold text-gray-900">Color Palette</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(colorTokens).map(([name, value]) => {
            if (typeof value === 'object') {
              return (
                <div key={name} className="space-y-3">
                  <h3 className="text-lg font-medium capitalize">{name}</h3>
                  <div className="space-y-2">
                    {Object.entries(value).map(([shade, color]) => (
                      <div key={shade} className="flex items-center space-x-3">
                        <div
                          className="w-12 h-8 rounded border"
                          style={{ backgroundColor: color }}
                        />
                        <div className="text-sm">
                          <div className="font-medium">{shade}</div>
                          <div className="text-gray-500">{color}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            }
            return null;
          })}
        </div>
      </section>

      {/* Typography */}
      <section className="space-y-6">
        <h2 className="text-3xl font-semibold text-gray-900">Typography</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-medium mb-4">Text Styles</h3>
            <div className="space-y-4">
              {Object.entries(textStyles).map(([style, config]) => (
                <div key={style} className="border-b pb-4">
                  <div
                    className="mb-2"
                    style={{
                      fontSize: config.fontSize,
                      fontWeight: config.fontWeight,
                      lineHeight: config.lineHeight,
                      letterSpacing: config.letterSpacing,
                      textTransform: config.textTransform,
                    }}
                  >
                    {style.charAt(0).toUpperCase() + style.slice(1)} Text Example
                  </div>
                  <div className="text-sm text-gray-500">
                    {style} • {config.fontSize} • {config.fontWeight}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Spacing */}
      <section className="space-y-6">
        <h2 className="text-3xl font-semibold text-gray-900">Spacing Scale</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {Object.entries(spacingTokens).slice(0, 20).map(([token, value]) => (
            <div key={token} className="text-center">
              <div
                className="bg-blue-200 rounded mx-auto mb-2"
                style={{ 
                  width: value === '0' ? '2px' : value, 
                  height: value === '0' ? '2px' : value,
                  maxWidth: '4rem',
                  maxHeight: '4rem'
                }}
              />
              <div className="text-sm">
                <div className="font-medium">{token}</div>
                <div className="text-gray-500">{value}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Components */}
      <section className="space-y-6">
        <h2 className="text-3xl font-semibold text-gray-900">Components</h2>
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-medium mb-4">Buttons</h3>
            <div className="flex flex-wrap gap-4">
              <Button variant="default">Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="success">Success</Button>
              <Button variant="warning">Warning</Button>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-medium mb-4">Button Sizes</h3>
            <div className="flex flex-wrap items-center gap-4">
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
              <Button size="xl">Extra Large</Button>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-medium mb-4">Button States</h3>
            <div className="flex flex-wrap gap-4">
              <Button>Normal</Button>
              <Button loading>Loading</Button>
              <Button disabled>Disabled</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Accessibility */}
      <section className="space-y-6">
        <h2 className="text-3xl font-semibold text-gray-900">Accessibility</h2>
        <div className="bg-blue-50 rounded-lg p-6 space-y-4">
          <h3 className="text-xl font-medium">Guidelines</h3>
          <ul className="space-y-2 text-gray-700">
            <li>• All colors meet WCAG AA contrast ratio requirements (4.5:1)</li>
            <li>• Components include proper ARIA labels and roles</li>
            <li>• Keyboard navigation is supported throughout</li>
            <li>• Focus indicators are clearly visible</li>
            <li>• Screen reader compatible markup</li>
            <li>• Motion can be reduced via prefers-reduced-motion</li>
          </ul>
        </div>
      </section>

      {/* Internationalization */}
      <section className="space-y-6">
        <h2 className="text-3xl font-semibold text-gray-900">Internationalization</h2>
        <div className="bg-green-50 rounded-lg p-6 space-y-4">
          <h3 className="text-xl font-medium">Features</h3>
          <ul className="space-y-2 text-gray-700">
            <li>• Automatic language detection based on browser settings</li>
            <li>• Local storage for language preferences</li>
            <li>• Supabase integration for translation management</li>
            <li>• Right-to-left (RTL) language support</li>
            <li>• Number, date, and currency formatting</li>
            <li>• Pluralization rules support</li>
          </ul>
        </div>
      </section>
    </div>
  );
};
