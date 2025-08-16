
export const colorTokens = {
  // Primary Brand Colors
  primary: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8',
    500: '#0ea5e9',
    600: '#0284c7',
    700: '#0369a1',
    800: '#075985',
    900: '#0c4a6e',
    950: '#082f49',
  },
  
  // Secondary Colors
  secondary: {
    50: '#fafaf9',
    100: '#f5f5f4',
    200: '#e7e5e4',
    300: '#d6d3d1',
    400: '#a8a29e',
    500: '#78716c',
    600: '#57534e',
    700: '#44403c',
    800: '#292524',
    900: '#1c1917',
    950: '#0c0a09',
  },
  
  // Success Colors
  success: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
    950: '#052e16',
  },
  
  // Warning Colors
  warning: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
    950: '#451a03',
  },
  
  // Error Colors
  error: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
    950: '#450a0a',
  },
  
  // Neutral Colors
  neutral: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e5e5e5',
    300: '#d4d4d4',
    400: '#a3a3a3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
    950: '#0a0a0a',
  },
  
  // Semantic Colors
  background: '#ffffff',
  surface: '#f8fafc',
  surfaceVariant: '#f1f5f9',
  outline: '#e2e8f0',
  onBackground: '#1e293b',
  onSurface: '#334155',
  onSurfaceVariant: '#64748b',
  
  // Interactive States
  hover: '#f1f5f9',
  pressed: '#e2e8f0',
  focus: '#3b82f6',
  disabled: '#f1f5f9',
  disabledText: '#9ca3af',
} as const;

export const darkColorTokens = {
  ...colorTokens,
  background: '#0f172a',
  surface: '#1e293b',
  surfaceVariant: '#334155',
  outline: '#475569',
  onBackground: '#f1f5f9',
  onSurface: '#e2e8f0',
  onSurfaceVariant: '#cbd5e1',
  hover: '#334155',
  pressed: '#475569',
  disabled: '#1e293b',
  disabledText: '#64748b',
};

export type ColorToken = keyof typeof colorTokens;
export type ColorScale = keyof typeof colorTokens.primary;
