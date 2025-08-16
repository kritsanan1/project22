
export const typographyTokens = {
  fontFamilies: {
    sans: ['Inter', 'system-ui', 'sans-serif'],
    mono: ['JetBrains Mono', 'Consolas', 'monospace'],
    serif: ['Merriweather', 'Georgia', 'serif'],
  },
  
  fontSizes: {
    xs: '0.75rem',      // 12px
    sm: '0.875rem',     // 14px
    base: '1rem',       // 16px
    lg: '1.125rem',     // 18px
    xl: '1.25rem',      // 20px
    '2xl': '1.5rem',    // 24px
    '3xl': '1.875rem',  // 30px
    '4xl': '2.25rem',   // 36px
    '5xl': '3rem',      // 48px
    '6xl': '3.75rem',   // 60px
    '7xl': '4.5rem',    // 72px
    '8xl': '6rem',      // 96px
    '9xl': '8rem',      // 128px
  },
  
  fontWeights: {
    thin: '100',
    extralight: '200',
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900',
  },
  
  lineHeights: {
    none: '1',
    tight: '1.25',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.625',
    loose: '2',
  },
  
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0em',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
} as const;

export const textStyles = {
  h1: {
    fontSize: typographyTokens.fontSizes['4xl'],
    fontWeight: typographyTokens.fontWeights.bold,
    lineHeight: typographyTokens.lineHeights.tight,
    letterSpacing: typographyTokens.letterSpacing.tight,
  },
  h2: {
    fontSize: typographyTokens.fontSizes['3xl'],
    fontWeight: typographyTokens.fontWeights.semibold,
    lineHeight: typographyTokens.lineHeights.tight,
    letterSpacing: typographyTokens.letterSpacing.tight,
  },
  h3: {
    fontSize: typographyTokens.fontSizes['2xl'],
    fontWeight: typographyTokens.fontWeights.semibold,
    lineHeight: typographyTokens.lineHeights.snug,
  },
  h4: {
    fontSize: typographyTokens.fontSizes.xl,
    fontWeight: typographyTokens.fontWeights.semibold,
    lineHeight: typographyTokens.lineHeights.snug,
  },
  h5: {
    fontSize: typographyTokens.fontSizes.lg,
    fontWeight: typographyTokens.fontWeights.medium,
    lineHeight: typographyTokens.lineHeights.snug,
  },
  h6: {
    fontSize: typographyTokens.fontSizes.base,
    fontWeight: typographyTokens.fontWeights.medium,
    lineHeight: typographyTokens.lineHeights.normal,
  },
  body: {
    fontSize: typographyTokens.fontSizes.base,
    fontWeight: typographyTokens.fontWeights.normal,
    lineHeight: typographyTokens.lineHeights.normal,
  },
  caption: {
    fontSize: typographyTokens.fontSizes.sm,
    fontWeight: typographyTokens.fontWeights.normal,
    lineHeight: typographyTokens.lineHeights.normal,
  },
  overline: {
    fontSize: typographyTokens.fontSizes.xs,
    fontWeight: typographyTokens.fontWeights.semibold,
    lineHeight: typographyTokens.lineHeights.normal,
    letterSpacing: typographyTokens.letterSpacing.wider,
    textTransform: 'uppercase' as const,
  },
} as const;

export type TypographyToken = keyof typeof typographyTokens;
export type TextStyle = keyof typeof textStyles;
