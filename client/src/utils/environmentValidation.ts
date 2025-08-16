
interface EnvironmentConfig {
  key: string;
  required: boolean;
  description: string;
  validationPattern?: RegExp;
}

const ENVIRONMENT_CONFIGS: EnvironmentConfig[] = [
  {
    key: 'VITE_AYRSHARE_API_KEY',
    required: true,
    description: 'Ayrshare API key for social media management',
    validationPattern: /^[a-zA-Z0-9_-]+$/,
  },
  {
    key: 'VITE_GEMINI_API_KEY',
    required: false,
    description: 'Google Gemini API key for AI features',
    validationPattern: /^[a-zA-Z0-9_-]+$/,
  },
];

export interface ValidationResult {
  key: string;
  configured: boolean;
  valid: boolean;
  message: string;
  required: boolean;
}

export function validateEnvironment(): ValidationResult[] {
  return ENVIRONMENT_CONFIGS.map(config => {
    const value = import.meta.env[config.key];
    const configured = !!value && value !== '';
    const placeholder = value === 'your_ayrshare_api_key_here' || value === 'your_gemini_api_key_here';
    
    let valid = false;
    let message = '';

    if (!configured) {
      message = config.required ? 'Required but not configured' : 'Optional - not configured';
    } else if (placeholder) {
      message = 'Placeholder value detected - please set real API key';
    } else if (config.validationPattern && !config.validationPattern.test(value)) {
      message = 'Invalid format detected';
    } else {
      valid = true;
      message = 'Configured and valid';
    }

    return {
      key: config.key,
      configured: configured && !placeholder,
      valid,
      message,
      required: config.required,
    };
  });
}

export function getEnvironmentStatus() {
  const results = validateEnvironment();
  const required = results.filter(r => r.required);
  const configured = required.filter(r => r.configured);
  const valid = configured.filter(r => r.valid);

  return {
    totalRequired: required.length,
    totalConfigured: configured.length,
    totalValid: valid.length,
    allRequiredConfigured: required.length === configured.length,
    allRequiredValid: required.length === valid.length,
    results,
  };
}
